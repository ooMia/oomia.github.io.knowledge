#!/usr/bin/env node

const API_URL = "https://api.github.com/graphql";

function fail(message) {
  console.error(`::error::${String(message).replaceAll("\n", "%0A")}`);
  process.exit(1);
}

async function graphql(token, query, variables = {}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      "user-agent": "publishing-platform-development-state",
    },
    body: JSON.stringify({ query, variables }),
  });
  const payload = await response.json();
  if (!response.ok || payload.errors?.length) {
    throw new Error(payload.errors?.map((e) => e.message).join("; ") || response.statusText);
  }
  return payload.data;
}

function splitRepo(fullName) {
  const [owner, repo] = String(fullName ?? "").split("/");
  if (!owner || !repo) throw new Error(`Invalid repository: ${fullName}`);
  return { owner, repo };
}

async function fetchState(token, repository, issueNumber, projectOwner, projectNumber) {
  const { owner, repo } = splitRepo(repository);
  const data = await graphql(token, `
    query LifecycleContext(
      $owner: String!,
      $repo: String!,
      $issueNumber: Int!,
      $projectOwner: String!,
      $projectNumber: Int!
    ) {
      repository(owner: $owner, name: $repo) {
        issue(number: $issueNumber) {
          id
          number
          title
          state
          projectItems(first: 100, includeArchived: true) {
            pageInfo { hasNextPage }
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
            }
          }
        }
      }
      user(login: $projectOwner) {
        projectV2(number: $projectNumber) {
          id
          fields(first: 100) {
            pageInfo { hasNextPage }
            nodes {
              ... on ProjectV2SingleSelectField { id name options { id name } }
              ... on ProjectV2IterationField { id name }
            }
          }
        }
      }
    }
  `, { owner, repo, issueNumber, projectOwner, projectNumber });

  const issue = data.repository?.issue;
  const project = data.user?.projectV2;
  if (!issue) throw new Error(`Issue #${issueNumber} not found in ${repository}`);
  if (!project) throw new Error(`Project not found: ${projectOwner}/projects/${projectNumber}`);
  if (issue.state !== "OPEN" || /^draft:\s*/i.test(issue.title)) {
    throw new Error("Development start requires an active non-draft Issue");
  }
  if (issue.projectItems.pageInfo.hasNextPage || project.fields.pageInfo.hasNextPage) {
    throw new Error("Project state exceeds supported read limit");
  }

  const matches = issue.projectItems.nodes.filter((item) => item.project?.id === project.id);
  if (matches.length !== 1) {
    throw new Error(`Expected exactly one Project item; found ${matches.length}`);
  }
  const item = matches[0];
  if (item.isArchived) throw new Error("Archived Project item cannot start Development");
  if (!item.iteration?.iterationId) {
    throw new Error("Iteration commitment is required before starting Development");
  }
  if (!item.status?.name) throw new Error("Project Status is missing");
  if (item.status.name === "Done" || item.status.name === "Cancelled") {
    throw new Error(`Cannot start Development from terminal Status "${item.status.name}"`);
  }

  const statusField = project.fields.nodes.find((field) => field?.name === "Status" && field.options);
  if (!statusField) throw new Error("Project Status field not found");
  const inProgress = statusField.options.find((option) => option.name === "In progress");
  if (!inProgress) throw new Error("Project Status has no In progress option");

  return {
    projectId: project.id,
    itemId: item.id,
    status: item.status.name,
    iterationId: item.iteration.iterationId,
    statusFieldId: statusField.id,
    inProgressOptionId: inProgress.id,
  };
}

async function setInProgress(token, state) {
  await graphql(token, `
    mutation SetDevelopmentStatus(
      $project: ID!,
      $item: ID!,
      $field: ID!,
      $option: String!
    ) {
      updateProjectV2ItemFieldValue(input: {
        projectId: $project
        itemId: $item
        fieldId: $field
        value: { singleSelectOptionId: $option }
      }) { projectV2Item { id } }
    }
  `, {
    project: state.projectId,
    item: state.itemId,
    field: state.statusFieldId,
    option: state.inProgressOptionId,
  });
}

async function main() {
  const action = process.argv[2] ?? "verify";
  const token = process.env.PROJECT_TOKEN;
  const repository = process.env.GITHUB_REPOSITORY;
  const issueNumber = Number(process.env.ISSUE_NUMBER);
  const projectOwner = process.env.PROJECT_OWNER ?? "ooMia";
  const projectNumber = Number(process.env.PROJECT_NUMBER ?? "11");

  if (!token) throw new Error("PROJECT_TOKEN is required");
  if (!repository || !Number.isInteger(issueNumber) || issueNumber <= 0) {
    throw new Error("GITHUB_REPOSITORY and positive ISSUE_NUMBER are required");
  }
  if (!Number.isInteger(projectNumber) || projectNumber <= 0) {
    throw new Error("PROJECT_NUMBER must be a positive integer");
  }
  if (action !== "verify" && action !== "start") {
    throw new Error(`Unsupported action: ${action}`);
  }

  const state = await fetchState(token, repository, issueNumber, projectOwner, projectNumber);
  if (action === "verify") {
    console.log(`Iteration commitment verified; current Status=${state.status}.`);
    return;
  }

  if (state.status !== "In progress") {
    await setInProgress(token, state);
  }
  const after = await fetchState(token, repository, issueNumber, projectOwner, projectNumber);
  if (after.status !== "In progress") {
    throw new Error(`Development Status verification failed: ${after.status}`);
  }
  console.log("Project Status: In progress");
}

main().catch((error) => fail(error.stack ?? error.message ?? String(error)));
