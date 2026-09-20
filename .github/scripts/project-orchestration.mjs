#!/usr/bin/env node

const API_URL = "https://api.github.com/graphql";
const EMPTY_VALUES = new Set(["", "none", "null", "비움", "미설정", "n/a", "-"]);

function annotation(level, message) {
  console.log(`::${level}::${String(message).replaceAll("\n", "%0A")}`);
}

function splitRepository(nameWithOwner) {
  const [owner, repo] = String(nameWithOwner ?? "").split("/");
  if (!owner || !repo) throw new Error(`Invalid repository: ${nameWithOwner}`);
  return { owner, repo };
}

async function graphql(token, query, variables = {}) {
  if (!token) throw new Error("A GitHub token is required for this operation.");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      "user-agent": "publishing-platform-project-orchestration",
    },
    body: JSON.stringify({ query, variables }),
  });

  const payload = await response.json();
  if (!response.ok || payload.errors?.length) {
    const detail = payload.errors?.map((error) => error.message).join("; ") ?? response.statusText;
    throw new Error(`GitHub GraphQL request failed: ${detail}`);
  }
  return payload.data;
}

function cleanMarkdownValue(raw) {
  if (raw == null) return null;
  let value = String(raw).trim().replace(/^`|`$/g, "");
  value = value.split(/\s+[—–]\s+/)[0].trim();
  if (EMPTY_VALUES.has(value.toLowerCase())) return null;
  return value;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function markdownField(body, name) {
  const match = body.match(new RegExp(`^-\\s+\\*\\*${escapeRegex(name)}:\\*\\*\\s*(.+)$`, "mi"));
  return cleanMarkdownValue(match?.[1]);
}

function parseSeed(body) {
  const marker = body.match(/<!--\s*project-seed\s*([\s\S]*?)-->/i);
  if (marker) {
    try {
      return JSON.parse(marker[1].trim());
    } catch (error) {
      throw new Error(`Invalid project-seed JSON: ${error.message}`);
    }
  }

  const scope = markdownField(body, "Scope");
  return {
    status: markdownField(body, "Status") ?? markdownField(body, "Project Status"),
    iteration: markdownField(body, "Iteration"),
    workType: markdownField(body, "Work Type"),
    scope: scope ? scope.split(",").map((value) => value.trim()).filter(Boolean) : [],
    objective: markdownField(body, "Objective"),
    targetRelease: markdownField(body, "Target Release"),
  };
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 80);
}

function defaultBranchName(issue) {
  const title = issue.title.replace(/^draft:\s*/i, "").trim();
  const conventional = title.match(/^(feat|fix|chore|docs|refactor|test|experiment):\s*(.+)$/i);
  if (conventional) {
    return `${issue.number}-${conventional[1].toLowerCase()}-${slugify(conventional[2])}`;
  }
  return `${issue.number}-${slugify(title)}`;
}

function normalizeDevelopment(seed, currentRepository, baseBranch, issue) {
  if (Array.isArray(seed.development)) {
    return seed.development.map((entry) => ({
      repository: entry.repository ?? currentRepository,
      base: entry.base ?? baseBranch,
      branch: entry.branch ?? defaultBranchName(issue),
    }));
  }
  if (seed.development === false || process.env.NO_DEVELOPMENT_BRANCH === "true") return [];
  return [{
    repository: currentRepository,
    base: baseBranch,
    branch: seed.branch ?? defaultBranchName(issue),
  }];
}

async function fetchIssue(token, repository, issueNumber) {
  const { owner, repo } = splitRepository(repository);
  const data = await graphql(token, `
    query($owner: String!, $repo: String!, $number: Int!) {
      repository(owner: $owner, name: $repo) {
        issue(number: $number) {
          id
          number
          title
          body
          state
          linkedBranches(first: 100) {
            nodes {
              ref {
                name
                repository { nameWithOwner }
              }
            }
          }
        }
      }
    }
  `, { owner, repo, number: issueNumber });

  if (!data.repository?.issue) throw new Error(`Issue #${issueNumber} not found in ${repository}`);
  return data.repository.issue;
}

async function fetchRepositoryRef(token, repository, base, branch) {
  const { owner, repo } = splitRepository(repository);
  const data = await graphql(token, `
    query($owner: String!, $repo: String!, $base: String!, $branch: String!) {
      repository(owner: $owner, name: $repo) {
        id
        base: ref(qualifiedName: $base) {
          target { oid }
        }
        branch: ref(qualifiedName: $branch) {
          name
        }
      }
    }
  `, {
    owner,
    repo,
    base: `refs/heads/${base}`,
    branch: `refs/heads/${branch}`,
  });

  if (!data.repository) throw new Error(`Repository not found or inaccessible: ${repository}`);
  if (!data.repository.base?.target?.oid) throw new Error(`Base branch not found: ${repository}#${base}`);
  return {
    repositoryId: data.repository.id,
    oid: data.repository.base.target.oid,
    branchExists: Boolean(data.repository.branch),
  };
}

async function ensureLinkedBranch(issue, target, currentRepository, githubToken, projectsToken) {
  const alreadyLinked = issue.linkedBranches.nodes.some((node) =>
    node.ref?.name === target.branch &&
    node.ref?.repository?.nameWithOwner?.toLowerCase() === target.repository.toLowerCase()
  );
  if (alreadyLinked) {
    console.log(`Development branch already linked: ${target.repository}#${target.branch}`);
    return;
  }

  const isLocal = target.repository.toLowerCase() === currentRepository.toLowerCase();
  const token = isLocal ? githubToken : projectsToken;
  if (!token) {
    annotation("warning", `Skipping cross-repository Development branch ${target.repository}#${target.branch}: PROJECTS_TOKEN is not configured.`);
    return;
  }

  const ref = await fetchRepositoryRef(token, target.repository, target.base, target.branch);
  if (ref.branchExists) {
    annotation("warning", `Branch already exists but is not linked to the Issue: ${target.repository}#${target.branch}. GitHub createLinkedBranch cannot attach an existing branch; keep this as a one-time migration case.`);
    return;
  }

  const data = await graphql(token, `
    mutation($issue: ID!, $repository: ID!, $oid: GitObjectID!, $name: String!) {
      createLinkedBranch(input: {
        issueId: $issue
        repositoryId: $repository
        oid: $oid
        name: $name
      }) {
        linkedBranch { ref { name repository { nameWithOwner } } }
      }
    }
  `, {
    issue: issue.id,
    repository: ref.repositoryId,
    oid: ref.oid,
    name: target.branch,
  });

  const linked = data.createLinkedBranch?.linkedBranch?.ref;
  if (!linked) throw new Error(`GitHub did not create linked branch ${target.repository}#${target.branch}`);
  console.log(`Created linked Development branch: ${linked.repository.nameWithOwner}#${linked.name}`);
}

async function fetchProject(token, owner, number) {
  const data = await graphql(token, `
    query($owner: String!, $number: Int!) {
      user(login: $owner) {
        projectV2(number: $number) {
          id
          title
          fields(first: 100) {
            nodes {
              __typename
              ... on ProjectV2FieldCommon {
                id
                name
                dataType
              }
              ... on ProjectV2SingleSelectField {
                options { id name }
              }
              ... on ProjectV2MultiSelectField {
                multiSelectOptions { id name }
              }
              ... on ProjectV2IterationField {
                configuration {
                  iterations { id title }
                  completedIterations { id title }
                }
              }
            }
          }
        }
      }
    }
  `, { owner, number });

  const project = data.user?.projectV2;
  if (!project) throw new Error(`User project not found: ${owner}/projects/${number}`);
  return project;
}

async function ensureProjectItem(token, projectId, contentId) {
  const data = await graphql(token, `
    mutation($project: ID!, $content: ID!) {
      addProjectV2ItemById(input: { projectId: $project, contentId: $content }) {
        item { id }
      }
    }
  `, { project: projectId, content: contentId });
  return data.addProjectV2ItemById.item.id;
}

function findOption(options, wanted, fieldName) {
  const option = options.find((candidate) => candidate.name.toLowerCase() === String(wanted).toLowerCase());
  if (!option) {
    throw new Error(`Project field "${fieldName}" has no option named "${wanted}". Available: ${options.map((value) => value.name).join(", ")}`);
  }
  return option.id;
}

function fieldValue(field, wanted) {
  if (wanted == null || wanted === "" || (Array.isArray(wanted) && wanted.length === 0)) return null;

  if (field.__typename === "ProjectV2SingleSelectField") {
    const scalar = Array.isArray(wanted) ? wanted[0] : wanted;
    return { singleSelectOptionId: findOption(field.options, scalar, field.name) };
  }

  if (field.__typename === "ProjectV2MultiSelectField") {
    const values = Array.isArray(wanted) ? wanted : [wanted];
    return {
      multiSelectOptionIds: values.map((value) => findOption(field.multiSelectOptions, value, field.name)),
    };
  }

  if (field.__typename === "ProjectV2IterationField") {
    const iterations = [
      ...field.configuration.iterations,
      ...field.configuration.completedIterations,
    ];
    const normalized = iterations.map(({ id, title }) => ({ id, name: title }));
    return { iterationId: findOption(normalized, wanted, field.name) };
  }

  if (field.__typename === "ProjectV2Field" && field.dataType === "TEXT") {
    return { text: Array.isArray(wanted) ? wanted.join(", ") : String(wanted) };
  }

  throw new Error(`Unsupported Project field type for "${field.name}": ${field.__typename}/${field.dataType}`);
}

async function updateProjectField(token, projectId, itemId, field, value) {
  const data = await graphql(token, `
    mutation($project: ID!, $item: ID!, $field: ID!, $value: ProjectV2FieldValue!) {
      updateProjectV2ItemFieldValue(input: {
        projectId: $project
        itemId: $item
        fieldId: $field
        value: $value
      }) {
        projectV2Item { id }
      }
    }
  `, { project: projectId, item: itemId, field: field.id, value });
  return data.updateProjectV2ItemFieldValue.projectV2Item.id;
}

async function syncProject(issue, seed, token) {
  if (!token) {
    annotation("warning", "PROJECTS_TOKEN is not configured. Skipping Project #11 item/field synchronization.");
    return;
  }

  const projectOwner = process.env.PROJECT_OWNER ?? "ooMia";
  const projectNumber = Number(process.env.PROJECT_NUMBER ?? "11");
  const project = await fetchProject(token, projectOwner, projectNumber);
  const itemId = await ensureProjectItem(token, project.id, issue.id);
  console.log(`Project item ready: ${project.title} / ${itemId}`);

  const desired = new Map([
    ["Status", seed.status ?? "Todo"],
    ["Iteration", seed.iteration],
    ["Work Type", seed.workType],
    ["Scope", seed.scope],
    ["Target Release", seed.targetRelease],
    ["Objective", seed.objective],
  ]);

  for (const [name, wanted] of desired) {
    if (wanted == null || wanted === "" || (Array.isArray(wanted) && wanted.length === 0)) {
      console.log(`Project field skipped (no seed): ${name}`);
      continue;
    }

    const field = project.fields.nodes.find((candidate) => candidate?.name === name);
    if (!field) throw new Error(`Project field not found: ${name}`);

    const value = fieldValue(field, wanted);
    if (!value) continue;
    await updateProjectField(token, project.id, itemId, field, value);
    console.log(`Project field synchronized: ${name} = ${Array.isArray(wanted) ? wanted.join(", ") : wanted}`);
  }
}

async function main() {
  const repository = process.env.GITHUB_REPOSITORY;
  const issueNumber = Number(process.env.ISSUE_NUMBER);
  const githubToken = process.env.GITHUB_TOKEN;
  const projectsToken = process.env.PROJECTS_TOKEN || "";
  const baseBranch = process.env.DEFAULT_DEVELOPMENT_BASE || "main";

  if (!repository) throw new Error("GITHUB_REPOSITORY is required.");
  if (!Number.isInteger(issueNumber) || issueNumber <= 0) throw new Error("ISSUE_NUMBER must be a positive integer.");
  if (!githubToken) throw new Error("GITHUB_TOKEN is required.");

  const issue = await fetchIssue(githubToken, repository, issueNumber);
  if (issue.state !== "OPEN") {
    annotation("notice", `Issue #${issue.number} is ${issue.state}; orchestration is skipped.`);
    return;
  }
  if (/^draft:\s*/i.test(issue.title)) {
    annotation("notice", `Issue #${issue.number} is still a draft candidate; orchestration is skipped.`);
    return;
  }

  const seed = parseSeed(issue.body ?? "");
  console.log(`Orchestrating Issue #${issue.number}: ${issue.title}`);

  await syncProject(issue, seed, projectsToken);

  const targets = normalizeDevelopment(seed, repository, baseBranch, issue);
  for (const target of targets) {
    await ensureLinkedBranch(issue, target, repository, githubToken, projectsToken);
  }
}

main().catch((error) => {
  annotation("error", error.stack ?? error.message ?? String(error));
  process.exitCode = 1;
});
