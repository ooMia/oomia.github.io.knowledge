# Agent instructions

1. Read [CONTEXT.md](CONTEXT.md) before planning or editing. While `docs/architecture-transition.md` is Active, read it before migration-sensitive work across Engine, Site, or Docs.
2. Knowledge acts as the project coordination/PM layer: shared workflow, engineering guidance, integration goals, acceptance, and Evidence linkage belong here. Repository-specific technical design belongs to the implementing repository and code.
3. Keep product direction, repository implementation, and live Project state separate.
4. Treat current canonical documents as authoritative. Historical context is recovered from Git history and immutable Evidence when needed; do not maintain a separate provenance branch as a second policy source.
5. Preserve implementation/release Evidence, but do not maintain historical decision IDs or source-turn chronology in current canonical documents. Only unresolved product or cross-repository questions belong in `docs/open-questions.md`.
6. Edit only the owning source for a rule. Do not keep compatibility documents solely to duplicate implementation details that are already expressed by repository code or owner docs.
7. Do not mark work Done or invent GitHub field IDs, issue links, implementation evidence, or release dates.
8. When creating or materially rewriting a repository Issue, inspect `.github/ISSUE_TEMPLATE/` first and use the template that best matches the work. The GitHub-native location serves Web UI, Chat, and Agent workflows alike; moving a template does not change the Issue protocol.
9. Use Korean prose and retain exact English field/option names.
10. Run `python3 scripts/bundle.py` after Knowledge edits. Report changed files and unresolved questions.
11. When resuming work, use `CONTEXT.md` to identify the relevant sources, then inspect live Project #11 and linked Issue/PR state before relying on historical documents.
12. Before ending substantial work, promote durable decisions to their owning canonical sources and ensure unfinished work is represented by a Project Item, Issue, PR, or owning-repository Evidence.
13. Do not maintain session handoff files, transcripts, or implementation inventories as a parallel state source in Knowledge.
14. During the active architecture transition, preserve unmerged work before superseding, adapting, or retiring legacy implementation.
15. Do not treat document cleanup as runtime/build/deployment verification. Preserve revision-scoped Evidence and re-verify implementation claims in the owning repository.
16. Follow `docs/git-workflow.md` for common change-management invariants; verify repository-specific branch, runner, CI, and release details in the owning repository.
17. For issue-linked implementation starts, follow the green-scaffold rule in `docs/planning-model.md`; keep the initial executable boundary green without weakening final AC/DoD.
