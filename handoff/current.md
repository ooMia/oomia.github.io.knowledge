# Current Handoff

Updated: 2026-09-29

## Active thread

The current Engine work is the external URL summary vertical slice:

- [Engine #42](https://github.com/ooMia/oomia.github.io.engine/issues/42) — external URL → editable Markdown summary through LilysAI MCP
- [Engine PR #43](https://github.com/ooMia/oomia.github.io.engine/pull/43) — implementation PR, still Draft
- latest PR head: `76dc6f913aa580fe20f26ff5fd74d5af5d92a9c6`
- latest develop-gate Actions run #76: Windows compatibility PASS, including `vp check --no-fmt`, tests, build/pack and isolated artifact smoke

The implementation currently covers the provider-neutral summary contract, LilysAI MCP transport binding, observed response decoding, project/note reuse, uncertain-create recovery, asynchronous polling, Markdown preservation and minimal provenance identifiers. A real 2026-09-29 LilysAI URL → project → note → editable Markdown flow is recorded in #42 without credentials.

The next meaningful action is to review #43 against #42 Acceptance Criteria and decide whether it is ready to leave Draft and integrate into `develop`. Do not add broader MCP abstraction, persistence, background workers, canonical mutation or rich-preview work to this slice unless a concrete gap requires it.

## Completed side track: Engine CI

CI optimization branched away from the MCP URL work and is now complete.

- [PR #44](https://github.com/ooMia/oomia.github.io.engine/pull/44) established the tiered CI policy: work PRs to `develop` use Windows compatibility without formatting; `develop → main` retains full Linux/macOS/Windows `vp check`.
- [PR #47](https://github.com/ooMia/oomia.github.io.engine/pull/47) was a benchmark-only experiment and is closed without merge.
- [PR #48](https://github.com/ooMia/oomia.github.io.engine/pull/48) adopted the faster project-local Vite+ path.
- [PR #51](https://github.com/ooMia/oomia.github.io.engine/pull/51) replaced that bootstrap with the faster cached `pnpm/setup@v3` develop gate; current `develop` is based on this result.
- [PR #52](https://github.com/ooMia/oomia.github.io.engine/pull/52) compared alternative `pnpm/action-setup` / `setup-node` cache strategies and confirmed the current `pnpm/setup@v3` path remains faster. It is closed without merge.

Do not revisit CI bootstrap optimization unless a new requirement or observed bottleneck appears.

## Context correction

[Engine #24](https://github.com/ooMia/oomia.github.io.engine/issues/24) is closed `not_planned` and is not the active implementation thread. Its broader MCP-enrichment plan should not be used as the current handoff.

Start any resumed work from [CONTEXT.md](../CONTEXT.md), then verify #42 / #43 and the owning repository's live state before acting.
