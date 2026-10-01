# Current Handoff

Updated: 2026-10-01

## Current checkpoint

Feature work is intentionally paused while the Project/automation baseline is normalized.

- [Knowledge #22](https://github.com/ooMia/oomia.github.io.knowledge/issues/22) owns the baseline normalization.
- Knowledge `main` contains the current lean Project taxonomy; the previous `develop` had drifted behind those policy changes while carrying the useful #21 lean sync-script fix.
- #22 reconciles those two states before further feature integration.
- Project #11 core custom fields are `Status / Iteration / Work Type`. Repository/native fields such as Assignees, Labels and Linked pull requests are used only when meaningful.

## GitHub automation runtime

The migrated automation runtime is now integrated into Engine `develop`.

- [Engine #56](https://github.com/ooMia/oomia.github.io.engine/issues/56) / [PR #58](https://github.com/ooMia/oomia.github.io.engine/pull/58) — integrated into `develop` at `59580b90957cdc7e820542271bf9702a02fdebfc`
- post-merge develop validation: [run 36833139081](https://github.com/ooMia/oomia.github.io.engine/actions/runs/36833139081) — PASS
- [Engine #59](https://github.com/ooMia/oomia.github.io.engine/issues/59) — real read-only webhook/runtime validation complete
- [Engine #60](https://github.com/ooMia/oomia.github.io.engine/issues/60) — canonical Project FSM alignment complete
- [Engine #62](https://github.com/ooMia/oomia.github.io.engine/issues/62) — long-term reproducible E2E investigation remains Backlog and does not block APPLY cutover

Persistent write mode has **not** been adopted as the normal development baseline yet. After #22 normalizes Project state:

1. run the merged webhook runtime against the normalized Project with `GITHUB_AUTOMATION_APPLY=false`
2. confirm the full reconciliation decision set is expected
3. run one applying worker with `GITHUB_AUTOMATION_APPLY=true`
4. independently verify the first Project mutation
5. keep it in the normal `./dev` flow only after the canary succeeds
6. rollback by setting `GITHUB_AUTOMATION_APPLY=false` if any invariant is violated

Credentials, account settings, webhook secret and Cloudflare authentication remain operator-owned.

## Active feature after baseline

[Engine #42](https://github.com/ooMia/oomia.github.io.engine/issues/42) remains the active product feature and [PR #43](https://github.com/ooMia/oomia.github.io.engine/pull/43) remains Draft.

Current repository state after #58 integration:

- Engine `develop`: `59580b90957cdc7e820542271bf9702a02fdebfc`
- #43 branch is one commit ahead and one commit behind `develop`; resynchronize it after baseline normalization
- source CLI authenticated LilysAI E2E: PASS
- bundled `dist/cli.mjs` authenticated E2E remains the final runtime check before #43 review/integration
- #42 stays `In progress / C1-W3 / Feature` with Assignee `ooMia` and linked PR #43

Do not expand #42 into generic MCP enrichment, rich preview rendering, background service or automatic canonical mutation.

## Project baseline rules

Use the live Project fields as the current SoT, not historical `project-seed` values.

- ordinary `closed/completed` → `Done`
- ordinary `closed/not_planned` or duplicate → `Cancelled`
- fallback `draft:` + `closed/not_planned` may remain `Backlog`
- `Todo / In progress` require an Iteration commitment
- Backlog normally has no Iteration
- performed historical work may retain its actual Iteration after Done/Cancelled
- Work Type is exactly one for executable repository Issues
- Assignee and Linked PR are native fields and should be present when there is a real responsible user / implementation PR, not filled with placeholders

Known normalization target: Engine #56 was performed during C1-W3 and its Project Iteration should be C1-W3. Engine #16/#24 are fallback Draft candidates and #62 is long-term Backlog, so their empty Iteration is intentional.

## Next action

1. complete Knowledge #22 and integrate it into Knowledge `develop`
2. finish the live Project field correction for #56
3. perform the controlled webhook APPLY canary against the normalized baseline
4. resynchronize Engine #43 with current `develop`
5. complete bundled LilysAI E2E, review #43 against #42 AC/DoD, and integrate the feature

Project-level canonical entry point remains [CONTEXT.md](../CONTEXT.md).
