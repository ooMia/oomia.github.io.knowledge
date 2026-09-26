# Agent instructions

1. Read CONTEXT.md before planning or editing. While `docs/architecture-transition.md` is Active, read it before migration-sensitive work across Engine, Site, or Docs.
2. Knowledge acts as the project coordination/PM layer: shared workflow, engineering guidance, integration goals, acceptance, and Evidence linkage belong here. Repository-specific technical design belongs to the implementing repository and code.
3. Keep product direction, repository implementation, and live Project state separate.
4. Treat current canonical documents as authoritative. Historical decision/provenance context belongs to `archive/main-before-cleanup-20260921`, not current `main`.
5. Preserve implementation/release Evidence, but do not maintain historical decision IDs or source-turn chronology in current canonical documents. Only unresolved product or cross-repository questions belong in `docs/open-questions.md`.
6. Edit only the owning source for a rule. Do not keep compatibility documents solely to duplicate implementation details that are already expressed by repository code or owner docs.
7. Do not mark work Done or invent GitHub field IDs, issue links, implementation evidence, or release dates.
8. Use Korean prose and retain exact English field/option names.
9. Run `python3 scripts/bundle.py` after Knowledge edits. Report changed files and unresolved questions.
10. When resuming work, read `handoff/current.md` before inspecting live state; treat it as a volatile checkpoint, not canonical policy.
11. Before ending substantial work, promote durable decisions to their owning canonical sources and keep `handoff/current.md` limited to remaining live state and the next safe action.
12. Do not accumulate session transcripts, historical handoffs, or implementation inventories in Knowledge.
13. During the active architecture transition, preserve unmerged work before superseding, adapting, or retiring legacy implementation.
14. Do not treat document cleanup as runtime/build/deployment verification. Preserve revision-scoped Evidence and re-verify implementation claims in the owning repository.
15. Follow `docs/git-workflow.md` for the common branch, PR, and release policy.
16. For issue-linked implementation starts, follow the green-scaffold rule in `docs/planning-model.md`; keep the initial executable boundary green without weakening final AC/DoD.
