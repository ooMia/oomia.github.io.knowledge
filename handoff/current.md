# Current Handoff

Updated: 2026-09-28

## Current checkpoint

- canonical Docs → Site direct consumption: [Site #12](https://github.com/ooMia/oomia.github.io/issues/12) / [PR #13](https://github.com/ooMia/oomia.github.io/pull/13)
- PR build / live Pages mutation boundary: [Site #14](https://github.com/ooMia/oomia.github.io/issues/14) / [PR #15](https://github.com/ooMia/oomia.github.io/pull/15)
- Site `develop` remains intentionally ahead of `main`; final Q003 release Evidence still requires explicit `develop → main` promotion and a new main delivery run.
- [Engine #15](https://github.com/ooMia/oomia.github.io.engine/issues/15) is closed `not_planned`. #23 already covers the concrete metadata-generation need and there is no current consumer for a separate three-line summary suggestion lifecycle.
- [Engine #24](https://github.com/ooMia/oomia.github.io.engine/issues/24) is the next priority and now contains the current LilysAI MCP experiment plan.

## Pre-MCP cleanup completed

### Engine

- removed repository-local `docs/TODO.md` pseudo-backlog
- reconciled migration/AGENTS guidance with current branch state and canonical Knowledge `main`
- restored repository Issue activation automation
- verified hosted Linux/macOS/Windows checks and packaged artifact
- promoted cleanup/automation through `main`
- `main` / `develop`: `bbebc64ae327ff23060b9859aa5970c02b201b4d`

One cancelled-work branch remains because the current Chat GitHub connector exposes no branch-delete action:

`15-experiment-add-agent-assisted-article-summary-suggestions`

Delete it manually before #24 implementation.

### Site

- replaced the stale generic template README with the current canonical Docs consumer/delivery responsibility
- attempted removal of `notion.css`, but CI proved it remains an active `Article.astro` runtime dependency; restored it
- active Notion-era Article presentation (hard-coded cover/icon/style) is therefore not treated as dead cleanup. Changing it is a separate Presentation decision.
- `develop`: `6f3ae9902c5832eb49372979e39adf2c367468b0`
- `main`: `0f6e38a502cccf085312bedb1d7c7c1d77fba295`

### Docs

- removed obsolete `docs/.gitkeep`
- preserved the active self-hosted enrichment workflow documentation
- `main`: `dfdbe6f74b5eb70e4dd09bca589b4ee01b8da8ca`

### Knowledge

- absorbed the durable Project Status lifecycle that had been stranded on stale `develop`
- refreshed field definitions, Site integration Evidence, Q003 and handoff
- intentionally did not preserve fast-changing tool/plugin capability prose as canonical policy
- `main` / `develop`: `0a039727e0afea44644e4173e676e0992bc20e63` before this handoff refresh

## #24 experiment plan

The first slice evaluates value before production integration.

- baseline: current #23 `body + explicit metadata → title / description / tags`
- MCP-assisted: same body/metadata/model/temperature/schema plus LilysAI note/summary context
- actual canonical files are never mutated by the comparison harness
- LilysAI-specific types stay outside the enrichment core
- first MCP connection is read-only; no `create_project`, `create_note`, upload, rename, move or trash operations
- hosted CI uses a fake MCP context reader and does not require OAuth or a self-hosted runner
- actual LilysAI OAuth approval and note/project preparation remain user-controlled
- OAuth credentials/tokens are not stored in repository, Actions secrets, fixtures or Evidence artifacts
- fixtures are actual canonical Docs Articles fixed by immutable Docs SHA
- compare quality, MCP read latency, local generation latency, failure behavior, reproducibility and context size
- only evidence of material benefit creates a follow-up production-integration Issue

Official remote MCP endpoint: `https://mcp.lilys.ai/mcp` (Streamable HTTP + OAuth 2.1).

## Next action

1. delete the cancelled #15 branch manually
2. activate #24
3. verify the restored Issue activation workflow: Project #11 sync + linked Development branch
4. implement the experiment-only context-reader/comparison harness
5. stop for user-controlled read-only LilysAI OAuth when real MCP Evidence is required

Project-level canonical entry point remains [CONTEXT.md](../CONTEXT.md).
