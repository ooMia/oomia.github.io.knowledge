import assert from "node:assert/strict";
import test from "node:test";

import {
  deriveAdmissionStatus,
  parseSeed,
  planAdmission,
} from "./project-admission.mjs";

test("derives initial Status only from Iteration", () => {
  assert.equal(deriveAdmissionStatus(null), "Backlog");
  assert.equal(deriveAdmissionStatus(""), "Backlog");
  assert.equal(deriveAdmissionStatus("C1-W4 · Major Review"), "Todo");
});

test("parses project-seed while treating status as non-authoritative", () => {
  const seed = parseSeed(`<!-- project-seed\n{"iteration":null,"workType":"Fix","status":"Todo"}\n-->`);
  const plan = planAdmission({ item: null, seed, initialEvent: true, assignees: [] });
  assert.equal(plan.statusToSet, "Backlog");
  assert.equal(plan.workTypeToSet, "Fix");
  assert.equal(plan.seedStatusIgnored, true);
  assert.equal(plan.assignDefault, true);
});

test("repairs a native auto-add race instead of early-returning", () => {
  const item = {
    isArchived: false,
    status: { name: "Todo" },
    iteration: null,
    workType: null,
  };
  const plan = planAdmission({
    item,
    seed: { iteration: null, workType: "Feature" },
    initialEvent: true,
    assignees: [{ login: "ooMia" }],
  });
  assert.equal(plan.statusToSet, "Backlog");
  assert.equal(plan.workTypeToSet, "Feature");
  assert.equal(plan.iterationToSet, null);
});

test("materializes initial Iteration and derives Todo", () => {
  const item = {
    isArchived: false,
    status: { name: "Backlog" },
    iteration: null,
    workType: null,
  };
  const plan = planAdmission({
    item,
    seed: { iteration: "C1-W4 · Major Review", workType: "Feature" },
    initialEvent: true,
    assignees: [{ login: "ooMia" }],
  });
  assert.equal(plan.iterationToSet, "C1-W4 · Major Review");
  assert.equal(plan.statusToSet, "Todo");
  assert.equal(plan.workTypeToSet, "Feature");
});

test("replay preserves existing live lifecycle fields", () => {
  const item = {
    isArchived: false,
    status: { name: "In progress" },
    iteration: { iterationId: "live-iteration" },
    workType: { name: "Fix" },
  };
  const plan = planAdmission({
    item,
    seed: { iteration: "stale-iteration", workType: "Feature", status: "Backlog" },
    initialEvent: false,
    assignees: [{ login: "ooMia" }],
  });
  assert.equal(plan.statusToSet, null);
  assert.equal(plan.iterationToSet, null);
  assert.equal(plan.workTypeToSet, null);
  assert.equal(plan.seedStatusIgnored, true);
});

test("replay can fill missing Work Type from seed without replaying Iteration", () => {
  const item = {
    isArchived: false,
    status: { name: "Backlog" },
    iteration: null,
    workType: null,
  };
  const plan = planAdmission({
    item,
    seed: { iteration: "stale-iteration", workType: "Fix" },
    initialEvent: false,
    assignees: [],
  });
  assert.equal(plan.statusToSet, null);
  assert.equal(plan.iterationToSet, null);
  assert.equal(plan.workTypeToSet, "Fix");
  assert.equal(plan.assignDefault, true);
});

test("fails closed when Work Type cannot be established", () => {
  assert.throws(
    () =>
      planAdmission({
        item: {
          isArchived: false,
          status: { name: "Backlog" },
          iteration: null,
          workType: null,
        },
        seed: {},
        initialEvent: false,
        assignees: [{ login: "ooMia" }],
      }),
    /Work Type is required/,
  );
});

test("rejects archived Project items", () => {
  assert.throws(
    () =>
      planAdmission({
        item: { isArchived: true },
        seed: { workType: "Fix" },
        initialEvent: true,
        assignees: [],
      }),
    /Archived Project item/,
  );
});
