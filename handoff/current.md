# Current Handoff

Updated: 2026-09-28

## Current checkpoint

- canonical Docs → Site direct consumption: [Site #12](https://github.com/ooMia/oomia.github.io/issues/12) / [PR #13](https://github.com/ooMia/oomia.github.io/pull/13)
- PR build / live Pages mutation boundary: [Site #14](https://github.com/ooMia/oomia.github.io/issues/14) / [PR #15](https://github.com/ooMia/oomia.github.io/pull/15)
- Site `develop` remains intentionally ahead of `main`; final Q003 release Evidence still requires explicit `develop → main` promotion and a new main delivery run.
- [Engine #15](https://github.com/ooMia/oomia.github.io.engine/issues/15) is closed `not_planned`. #23 already covers the concrete metadata-generation need and there is no current consumer for a separate three-line summary suggestion lifecycle.
- [Engine #24](https://github.com/ooMia/oomia.github.io.engine/issues/24) is the next priority and now defines an opt-in MCP-assisted metadata enrichment feature.

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

## #24 feature plan

The first slice makes MCP context an optional extension of the existing #23 enrichment path.

- current #23 `body + explicit metadata → title / description / tags` remains the default behavior
- MCP context is independently opt-in/out and does not become a prerequisite for ordinary enrichment
- LilysAI/provider-specific details stay behind a replaceable context-provider adapter
- first integration uses read-only MCP operations; no automatic LilysAI project/note/Git mutation
- hosted CI uses a fake provider to verify enabled, disabled, failure and source-non-mutation contracts without credentials
- completion requires a real LilysAI MCP read followed by successful structured `title / description / tags` generation for at least one canonical Article
- quality ranking, A/B scoring, latency benchmarking and adopt/hold/reject evaluation are not completion gates
- authentication, token or secret material stays user-controlled and is never written to source, Issue, logs or Evidence
- implementation proceeds credential-free as far as possible; when a real MCP connection is blocked by missing local/repository configuration, stop and ask the user to inject the required secret/configuration

Official remote MCP endpoint: `https://mcp.lilys.ai/mcp` (Streamable HTTP + OAuth 2.1).

## Next action

1. delete the cancelled #15 branch manually
2. activate #24
3. verify the restored Issue activation workflow: Project #11 sync + linked Development branch
4. implement the optional context-provider boundary, fake-provider contract tests and LilysAI read adapter
5. when real MCP authentication/configuration becomes the blocking dependency, stop and request the necessary user-controlled local or repository-level secret/configuration
6. verify one real MCP-assisted metadata generation path and record Evidence

Project-level canonical entry point remains [CONTEXT.md](../CONTEXT.md).
