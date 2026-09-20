# Current Handoff

Updated: 2026-09-21 (Asia/Seoul)

이 파일은 다음 작업 세션을 위한 **volatile checkpoint**다. 장기 정책은 `docs/*`와 Decision Log를 우선한다.

## Active architecture transition

사용자는 1.0 content architecture를 다음으로 확정했다.

```text
Obsidian ──────────┐
                   │
Fumadocs Editor ───┼──> local Git content workspace
                   │             │
IDE / Agent ───────┘             │ validate / commit / push
                                 ▼
                        oomia.github.io.docs
                         canonical revision
                                 │
                                 ▼
                         oomia.github.io Site
```

핵심 결정:

- canonical content는 Markdown/MDX + frontmatter/assets인 Git-backed filesystem workspace다.
- local working tree는 draft/authoring state다.
- [Docs repository](https://github.com/ooMia/oomia.github.io.docs)의 Git commit이 durable shared canonical revision이다.
- Obsidian과 Fumadocs Editor가 동일 workspace를 직접 편집한다.
- [Engine](https://github.com/ooMia/oomia.github.io.engine)은 DB-backed CMS가 아니라 validation / Git / publishing orchestration을 담당하는 containerizable runtime으로 단순화한다.
- Payload/PostgreSQL/Lexical은 target architecture가 아니라 legacy implementation/Evidence다.
- publishing은 DB → Markdown projection이 아니라 workspace validation → Site consumer verification → docs commit/push → revision linkage다.
- Fumadocs built-in component/tooling을 우선 사용한다.
- 독립 `@oomia/content-components` React library bootstrap 계획은 1.0 선행 과제에서 제거했다. custom component 공유 수요가 생기면 얇은 profile/package를 다시 검토한다.

Canonical references:

- [Architecture](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/architecture.md)
- [Content Authoring & Publishing Contract](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/content-authoring-contract.md)
- [Release 1.0](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/release-1.0.md)
- [Implementation Map](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/implementation-map.md)
- [Decision Log](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/decisions.md)

## Issue #13 / Codex work

[Engine Issue #13](https://github.com/ooMia/oomia.github.io.engine/issues/13)은 별도 Codex 앱에서 Payload 기반 raw-source save path 구현이 진행되다가 사용량 제한으로 중단되었다.

**현재 architecture에서는 그 구현을 그대로 재개하면 안 된다.**

Issue #13의 기존 AC 상당수는 filesystem model에서 구조적으로 해결된다.

- raw source create/update → filesystem editing
- Exact preservation → source client/file semantics
- visual unsupported fallback → Obsidian/IDE
- broken draft storage → working tree
- metadata-only preservation → frontmatter/file editing

다음 Engine 변경 전에 반드시 Codex 로컬/remote branch의 미push 작업을 확인하고, 보존 가치가 있는 generic code/evidence만 선별한다. 대화 기록이나 원격 SHA만 보고 “변경 없음”으로 판단하지 않는다.

[Engine Issue #14](https://github.com/ooMia/oomia.github.io.engine/issues/14)의 “Visual codec을 global publish gate에서 제거”라는 목적은 여전히 유효하지만, 새 구현은 filesystem validation + actual Site build를 기준으로 재설계한다.

## Legacy implementation에서 재사용할 후보

재사용 가능성이 높은 것:

- process/command runner
- publish concurrency guard
- failure propagation
- Evidence capture
- docs/site/engine revision linkage
- Site sync/lint/test/typecheck/build verification
- Git/main-only publishing policy

제거/격리 대상:

- Payload collection CRUD
- Payload user/auth를 1.0 필수조건으로 두는 부분
- PostgreSQL canonical persistence
- Lexical round-trip storage/publish gate
- DB snapshot → docs projection
- Payload-specific publish endpoint/UI

재사용은 코드 보존 자체가 목적이 아니다. 새 workspace flow를 실제로 단순화할 때만 가져온다.

## Docs repository role transition

[Docs repository](https://github.com/ooMia/oomia.github.io.docs)는 기존 generated projection에서 canonical content remote로 승격된다.

아직 실제 repository layout/workflow가 새 정책으로 migration되었다고 가정하지 않는다.

다음 구현에서 확인할 사항:

- current docs tree와 기존 generated artifacts
- canonical content directory layout
- frontmatter schema
- assets location/reference policy
- local clone을 Obsidian vault로 직접 사용할 수 있는지
- Fumadocs Editor가 같은 workspace를 안전하게 편집하는지
- Site가 docs revision을 어떤 방식(submodule/checkout 등)으로 소비하는지
- publish 시 commit/push를 Engine이 수행할지 사용자 Git action을 입력으로 받을지

## Current implementation status

[Implementation Map](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/implementation-map.md)을 새 boundary로 재평가했다.

- Authoring: **미충족** — legacy Payload UI는 새 Obsidian/Fumadocs target Evidence가 아님.
- Canonical Content: **부분 충족** — docs에 Markdown/MDX + Git history는 존재하지만 아직 authority migration 전.
- Extensibility: **부분 충족** — 기존 Callout evidence는 있으나 Fumadocs-first policy로 재구성 필요.
- Automation: **부분 충족** — legacy publish trigger는 있으나 workspace publish로 migration 필요.
- Publishing: **부분 충족** — downstream Site verification은 재사용 가능, DB export path는 제거 대상.
- Presentation: **충족** — Site가 docs Markdown/MDX를 이미 렌더함.
- Delivery: **충족** — 실제 GitHub Pages deployment evidence 존재.

## Open implementation decisions

[Open Questions](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/open-questions.md)에 남김.

주요 항목:

- Engine container image / mount / Git credential contract
- asset policy
- `.md` vs `.mdx` 및 directory convention
- Git publish semantics: auto commit/push vs user-managed commit
- Fumadocs Studio standalone vs embedded Editor UI
- raw HTML / executable MDX security policy
- custom component shared manifest/package가 실제로 필요한 시점

## Next safe action

다음 세션은 **코드 삭제부터 시작하지 않는다.**

1. [Docs repository](https://github.com/ooMia/oomia.github.io.docs)의 현재 tree와 Site consumption path를 live로 조사한다.
2. 최소 canonical workspace fixture를 정의한다.
   - frontmatter
   - Markdown
   - Fumadocs built-in component 1개
   - image/asset
   - intentionally broken draft
3. 같은 checkout을 Obsidian과 Fumadocs Editor에서 편집하는 spike의 AC를 만든다.
4. 현재 Engine에서 새 flow에 재사용할 generic publishing/evidence code와 Payload-specific code를 분류한다.
5. #13/#14 및 기존 Project Item을 새 architecture에 맞게 supersede/re-scope한다.
6. 그 이후에만 Payload/PostgreSQL 제거와 workspace-oriented Engine 구현 Issue를 활성화한다.

## Reverify before live mutations

- Engine Codex 작업의 local/unpushed state
- Issue #13/#14의 최신 body/state/comments/linked branches
- docs repository의 actual current content/layout
- Site가 docs repo를 현재 어떻게 연결하는지
- Project #11의 관련 active Items
- branch 삭제 전 미병합 work

## Do not assume

- Payload/PostgreSQL이 여전히 target architecture라고 가정하지 않는다.
- docs repository를 generated projection이라고 부르지 않는다.
- uncommitted local files를 durable canonical revision과 동일시하지 않는다.
- Fumadocs Editor가 모든 MDX syntax를 visual edit할 수 있다고 가정하지 않는다.
- Obsidian-specific syntax/plugin state를 자동으로 Site-supported canonical syntax로 간주하지 않는다.
- standalone `@oomia/content-components` package를 이미 필요한 dependency라고 가정하지 않는다.
- 이전 #13 구현 가설을 현재 next action으로 사용하지 않는다.
