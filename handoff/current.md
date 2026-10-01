# Current Handoff

Updated: 2026-10-01

## Current checkpoint

Project/automation baseline normalization is complete in repository state.

- [Knowledge #22](https://github.com/ooMia/oomia.github.io.knowledge/issues/22) owns the normalization record.
- [Knowledge PR #23](https://github.com/ooMia/oomia.github.io.knowledge/pull/23) merged into `develop` at `83d0fba87d2f75b2f72a14825cf07ecfebcab768`.
- Knowledge `develop` now contains current canonical `main` policy plus the lean #21 Project sync behavior.
- Project #11 audit covered 26 Items. Every Item has Status / Work Type / Assignee.
- Engine #56 was corrected to `Done / C1-W3 / Maintenance`.
- #16 and #24 remain fallback Draft Backlog candidates; empty Iteration is intentional.
- #62 remains long-term Backlog; empty Iteration is intentional.

Direct Project Iteration edits must use the concrete iteration identifier. GitHub CLI does not support setting Iteration by name; use `--iteration-id` after resolving the Project metadata.

## GitHub automation runtime

The migrated automation runtime is integrated into Engine `develop`.

- [Engine #56](https://github.com/ooMia/oomia.github.io.engine/issues/56) / [PR #58](https://github.com/ooMia/oomia.github.io.engine/pull/58) — integrated at `59580b90957cdc7e820542271bf9702a02fdebfc`
- post-merge develop validation: [run 36833139081](https://github.com/ooMia/oomia.github.io.engine/actions/runs/36833139081) — PASS
- [Engine #59](https://github.com/ooMia/oomia.github.io.engine/issues/59) — real read-only runtime validation complete
- [Engine #60](https://github.com/ooMia/oomia.github.io.engine/issues/60) — Project FSM alignment complete
- [Engine #62](https://github.com/ooMia/oomia.github.io.engine/issues/62) — long-term E2E investigation remains Backlog and does not block write cutover

Persistent write mode is not yet the normal development baseline.

## Next action: controlled webhook APPLY canary

Use the normalized Project baseline before feature work resumes.

1. run the merged webhook runtime with `GITHUB_AUTOMATION_APPLY=false`
2. confirm the full reconciliation decision set is expected
3. run exactly one applying worker with `GITHUB_AUTOMATION_APPLY=true`
4. close Knowledge #22 as `completed`
5. independently verify that Project #22 transitions from `In progress` to `Done`
6. if correct, keep webhook write reconciliation in the normal `./dev` flow
7. if any invariant is violated, immediately return to `GITHUB_AUTOMATION_APPLY=false` and split the defect into a focused Fix/Investigation

Credentials, account settings, webhook secret and Cloudflare authentication remain operator-owned.

## Active feature after canary

[Engine #42](https://github.com/ooMia/oomia.github.io.engine/issues/42) remains the active product feature and [PR #43](https://github.com/ooMia/oomia.github.io.engine/pull/43) remains Draft.

- Engine `develop`: `59580b90957cdc7e820542271bf9702a02fdebfc`
- #43 is currently diverged from `develop` and must be synchronized after the canary
- #42 Project fields are consistent: `In progress / C1-W3 / Feature`, Assignee `ooMia`, linked PR #43
- source CLI authenticated LilysAI E2E: PASS
- bundled `dist/cli.mjs` authenticated E2E remains the final runtime check before #43 review/integration

Do not expand #42 into generic MCP enrichment, rich preview rendering, background service or automatic canonical mutation.

Project-level canonical entry point remains [CONTEXT.md](../CONTEXT.md).
