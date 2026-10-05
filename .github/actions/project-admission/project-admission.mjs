#!/usr/bin/env node

import { pathToFileURL } from "node:url";

const API_URL = "https://api.github.com/graphql";
const REST_URL = "https://api.github.com";
const DEFAULT_ASSIGNEE = "ooMia";
const PROJECT_OWNER = "ooMia";
const PROJECT_NUMBER = 11;

function clean(value) {
  if (value == null) return null;
  const text = String(value).trim();
  return text.length ? text : null;
}

export function parseSeed(body) {
  const match = String(body ?? "").match(/<!--\s*project-seed\s*([\s\S]*?)-->/i);
  if (!match) return {};
  try {
    return JSON.parse(match[1].trim());
  } catch (error) {
    throw new Error(`Invalid project-seed JSON: ${error.message}`);
  }
}

export function deriveAdmissionStatus(iteration) {
  return clean(iteration) ? "Todo" : "Backlog";
}

function sameOption(actual, expected) {
  return String(actual ?? "").trim().toLowerCase() === String(expected ?? "").trim().toLowerCase();
}

export function planAdmission({
  item = null,
  seed = {},
  initialEvent = false,
  assignees = [],
} = {}) {
  if (item?.isArchived) {
    throw new Error("Archived Project item cannot be reconciled by admission.");
  }

  const firstAdmission = Boolean(initialEvent || !item);
  const seedIteration = clean(seed.iteration);
  const seedWorkType = clean(seed.workType);
  const liveStatus = clean(item?.status?.name);
  const liveIterationId = clean(item?.iteration?.iterationId);
  const liveWorkType = clean(item?.workType?.name);

  if (!liveWorkType && !seedWorkType) {
    throw new Error("Work Type is required for an executable repository Issue.");
  }

  const iterationToSet = firstAdmission && !liveIterationId ? seedIteration : null;
  const effectiveIteration = liveIterationId || iterationToSet;
  const derivedStatus = deriveAdmissionStatus(effectiveIteration);

  let statusToSet = null;
  if (!liveStatus || (firstAdmission && !sameOption(liveStatus, derivedStatus))) {
    statusToSet = derivedStatus;
  }

  return {
    firstAdmission,
    statusToSet,
    iterationToSet,
    workTypeToSet: liveWorkType ? null : seedWorkType,
    assignDefault: !Array.isArray(assignees) || assignees.length === 0,
    seedStatusIgnored: Object.prototype.hasOwnProperty.call(seed, "status"),
  };
}

async function graphql(token, query, variables = {}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      "user-agent": "publishing-platform-project-admission",
    },
    body: JSON.stringify({ query, variables }),
  });
  const payload = await response.json();
  if (!response.ok || payload.errors?.length) {
    throw new Error(payload.errors?.map((error) => error.message).join("; ") || response.statusText);
  }
  return payload.data;
}

function splitRepo(fullName) {
  const [owner, repo] = String(fullName ?? "").split("/");
  if (!owner || !repo) throw new Error(`Invalid repository: ${fullName}`);
  return { owner, repo };
}

async function fetchIssue(token, repository, number) {
  const { owner, repo } = splitRepo(repository);
  const data = await graphql(
    token,
    `
      query IssueForAdmission($owner: String!, $repo: String!, $number: Int!) {
        repository(owner: $owner, name: $repo) {
          issue(number: $number) {
            id
            number
            title
            body
            state
            assignees(first: 100) {
              nodes { login }
              pageInfo { hasNextPage }
            }
          }
        }
      }
    `,
    { owner, repo, number },
  );
  const issue = data.repository?.issue;
  if (!issue) throw new Error(`Issue #${number} not found in ${repository}`);
  if (issue.assignees.pageInfo.hasNextPage) {
    throw new Error("Issue assignee read exceeded supported limit.");
  }
  return issue;
}

async function fetchProject(token) {
  const data = await graphql(
    token,
    `
      query AdmissionProject($owner: String!, $number: Int!) {
        user(login: $owner) {
          projectV2(number: $number) {
            id
            fields(first: 100) {
              pageInfo { hasNextPage }
              nodes {
                __typename
                ... on ProjectV2FieldCommon { id name dataType }
                ... on ProjectV2SingleSelectField { options { id name } }
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
    `,
    { owner: PROJECT_OWNER, number: PROJECT_NUMBER },
  );
  const project = data.user?.projectV2;
  if (!project) throw new Error(`Project not found: ${PROJECT_OWNER}/projects/${PROJECT_NUMBER}`);
  if (project.fields.pageInfo.hasNextPage) {
    throw new Error("Project field read exceeded supported limit.");
  }
  return project;
}

async function findProjectItem(token, issueId, projectId) {
  let after = null;

  do {
    const data = await graphql(
      token,
      `
        query IssueProjectItem($issue: ID!, $after: String) {
          node(id: $issue) {
            ... on Issue {
              projectItems(first: 100, after: $after, includeArchived: true) {
                nodes {
                  id
                  isArchived
                  project { id }
                  status: fieldValueByName(name: "Status") {
                    ... on ProjectV2ItemFieldSingleSelectValue { name }
                  }
                  iteration: fieldValueByName(name: "Iteration") {
                    ... on ProjectV2ItemFieldIterationValue { iterationId }
                  }
                  workType: fieldValueByName(name: "Work Type") {
                    ... on ProjectV2ItemFieldSingleSelectValue { name }
                  }
                }
                pageInfo { hasNextPage endCursor }
              }
            }
          }
        }
      `,
      { issue: issueId, after },
    );

    const items = data.node?.projectItems;
    if (!items) throw new Error("Cannot verify Project membership.");
    const matches = items.nodes.filter((item) => item.project?.id === projectId);
    if (matches.length > 1) {
      throw new Error("Issue has multiple items in the same Project.");
    }
    if (matches.length === 1) return matches[0];
    if (!items.pageInfo.hasNextPage) return null;
    if (!items.pageInfo.endCursor || items.pageInfo.endCursor === after) {
      throw new Error("Invalid Project membership pagination.");
    }
    after = items.pageInfo.endCursor;
  } while (after);

  return null;
}

async function addProjectItem(token, projectId, contentId) {
  const data = await graphql(
    token,
    `
      mutation AddAdmissionItem($project: ID!, $content: ID!) {
        addProjectV2ItemById(input: { projectId: $project, contentId: $content }) {
          item { id }
        }
      }
    `,
    { project: projectId, content: contentId },
  );
  return data.addProjectV2ItemById.item.id;
}

function optionId(options, wanted, fieldName) {
  const match = options.find((option) => sameOption(option.name, wanted));
  if (!match) {
    throw new Error(
      `Field "${fieldName}" has no option "${wanted}". Available: ${options.map((option) => option.name).join(", ")}`,
    );
  }
  return match.id;
}

function field(project, name) {
  const found = project.fields.nodes.find((candidate) => candidate?.name === name);
  if (!found) throw new Error(`Project field not found: ${name}`);
  return found;
}

function makeFieldValue(projectField, wanted) {
  if (projectField.__typename === "ProjectV2SingleSelectField") {
    return { singleSelectOptionId: optionId(projectField.options, wanted, projectField.name) };
  }
  if (projectField.__typename === "ProjectV2IterationField") {
    const iterations = [
      ...projectField.configuration.iterations,
      ...projectField.configuration.completedIterations,
    ].map(({ id, title }) => ({ id, name: title }));
    return { iterationId: optionId(iterations, wanted, projectField.name) };
  }
  throw new Error(
    `Unsupported field type for "${projectField.name}": ${projectField.__typename}/${projectField.dataType}`,
  );
}

async function updateField(token, projectId, itemId, fieldId, value) {
  await graphql(
    token,
    `
      mutation SetAdmissionField($project: ID!, $item: ID!, $field: ID!, $value: ProjectV2FieldValue!) {
        updateProjectV2ItemFieldValue(
          input: { projectId: $project, itemId: $item, fieldId: $field, value: $value }
        ) {
          projectV2Item { id }
        }
      }
    `,
    { project: projectId, item: itemId, field: fieldId, value },
  );
}

async function ensureProjectItem(token, project, issue) {
  const existing = await findProjectItem(token, issue.id, project.id);
  if (existing) return { item: existing, created: false };

  try {
    await addProjectItem(token, project.id, issue.id);
  } catch (error) {
    const raced = await findProjectItem(token, issue.id, project.id);
    if (!raced) throw error;
    return { item: raced, created: false };
  }

  const created = await findProjectItem(token, issue.id, project.id);
  if (!created) throw new Error("Project admission mutation was not observable after write.");
  return { item: created, created: true };
}

async function addDefaultAssignee(token, repository, issueNumber) {
  const response = await fetch(`${REST_URL}/repos/${repository}/issues/${issueNumber}/assignees`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      accept: "application/vnd.github+json",
      "content-type": "application/json",
      "x-github-api-version": "2022-11-28",
      "user-agent": "publishing-platform-project-admission",
    },
    body: JSON.stringify({ assignees: [DEFAULT_ASSIGNEE] }),
  });
  if (!response.ok) {
    throw new Error(`Failed to assign ${DEFAULT_ASSIGNEE}: ${response.status} ${response.statusText}`);
  }
}

function boolEnv(value) {
  return String(value ?? "").trim().toLowerCase() === "true";
}

async function main() {
  const projectToken = process.env.PROJECT_TOKEN;
  const repositoryToken = process.env.REPOSITORY_TOKEN;
  const repository = process.env.GITHUB_REPOSITORY;
  const issueNumber = Number(process.env.ISSUE_NUMBER);
  const initialEvent = boolEnv(process.env.INITIAL_EVENT);

  if (!projectToken) throw new Error("PROJECT_TOKEN is required.");
  if (!repositoryToken) throw new Error("REPOSITORY_TOKEN is required.");
  if (!repository || !Number.isInteger(issueNumber) || issueNumber <= 0) {
    throw new Error("GITHUB_REPOSITORY and positive ISSUE_NUMBER are required.");
  }

  let issue = await fetchIssue(projectToken, repository, issueNumber);
  if (issue.state !== "OPEN" || /^draft:\s*/i.test(issue.title)) {
    console.log("Issue is not active; Project admission skipped.");
    return;
  }

  const seed = parseSeed(issue.body);
  const project = await fetchProject(projectToken);
  const statusField = field(project, "Status");
  const iterationField = field(project, "Iteration");
  const workTypeField = field(project, "Work Type");

  if (clean(seed.workType)) makeFieldValue(workTypeField, seed.workType);
  if (clean(seed.iteration)) makeFieldValue(iterationField, seed.iteration);

  const before = await findProjectItem(projectToken, issue.id, project.id);
  planAdmission({
    item: before,
    seed,
    initialEvent,
    assignees: issue.assignees.nodes,
  });

  const ensured = await ensureProjectItem(projectToken, project, issue);
  const plan = planAdmission({
    item: ensured.item,
    seed,
    initialEvent: initialEvent || ensured.created,
    assignees: issue.assignees.nodes,
  });

  if (plan.seedStatusIgnored) {
    console.log("project-seed.status is ignored; Status is derived from live/initial Iteration.");
  }

  let expectedIterationId = ensured.item.iteration?.iterationId ?? null;
  if (plan.iterationToSet) {
    const value = makeFieldValue(iterationField, plan.iterationToSet);
    expectedIterationId = value.iterationId;
    await updateField(projectToken, project.id, ensured.item.id, iterationField.id, value);
    console.log(`Iteration: ${plan.iterationToSet}`);
  }

  if (plan.workTypeToSet) {
    const value = makeFieldValue(workTypeField, plan.workTypeToSet);
    await updateField(projectToken, project.id, ensured.item.id, workTypeField.id, value);
    console.log(`Work Type: ${plan.workTypeToSet}`);
  }

  if (plan.statusToSet) {
    const value = makeFieldValue(statusField, plan.statusToSet);
    await updateField(projectToken, project.id, ensured.item.id, statusField.id, value);
    console.log(`Status: ${plan.statusToSet}`);
  }

  if (plan.assignDefault) {
    issue = await fetchIssue(projectToken, repository, issueNumber);
    if (issue.assignees.nodes.length === 0) {
      await addDefaultAssignee(repositoryToken, repository, issueNumber);
      console.log(`Assignee: ${DEFAULT_ASSIGNEE}`);
    }
  }

  const after = await findProjectItem(projectToken, issue.id, project.id);
  if (!after || after.isArchived) {
    throw new Error("Project admission verification failed.");
  }
  if (!clean(after.status?.name)) {
    throw new Error("Project Status completeness verification failed.");
  }
  if (!clean(after.workType?.name)) {
    throw new Error("Project Work Type completeness verification failed.");
  }
  if (plan.statusToSet && !sameOption(after.status?.name, plan.statusToSet)) {
    throw new Error(`Project Status verification failed: expected ${plan.statusToSet}, got ${after.status?.name ?? "unset"}.`);
  }
  if (plan.workTypeToSet && !sameOption(after.workType?.name, plan.workTypeToSet)) {
    throw new Error(`Project Work Type verification failed: expected ${plan.workTypeToSet}, got ${after.workType?.name ?? "unset"}.`);
  }
  if (plan.iterationToSet && after.iteration?.iterationId !== expectedIterationId) {
    throw new Error("Project Iteration verification failed.");
  }

  issue = await fetchIssue(projectToken, repository, issueNumber);
  if (issue.assignees.nodes.length === 0) {
    throw new Error("Issue assignee completeness verification failed.");
  }

  console.log(
    `Project admission reconciled for ${repository}#${issueNumber}: ` +
      `status=${after.status?.name}, workType=${after.workType?.name}, ` +
      `iteration=${after.iteration?.iterationId ?? "none"}, assignees=${issue.assignees.nodes.map((node) => node.login).join(",")}.`,
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(`::error::${String(error.stack ?? error.message ?? error).replaceAll("\n", "%0A")}`);
    process.exit(1);
  });
}
