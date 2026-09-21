# Current Handoff

Updated: 2026-09-21 (Asia/Seoul)

이 파일은 다음 작업 세션을 위한 **volatile checkpoint**다. 장기 정책은 `docs/*`와 Decision Log를 우선한다.

## Read first

Architecture migration 관련 작업은 다음 순서로 읽는다.

1. [Architecture Transition](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/architecture-transition.md)
2. [Architecture](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/architecture.md)
3. [Development Toolchain](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/development-toolchain.md)
4. [Repository Design & Maintenance](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/repository-design.md)
5. [Implementation Map](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/implementation-map.md)
6. 이 handoff와 live repository state

## Current target

```text
authoring editor(s)
        │
        ▼
Authoring Draft
        │ engine prepare
        ▼
Prepared Canonical Source
        │ user review + commit
        ▼
oomia.github.io.docs
 canonical source revision
        │ deterministic projection
        │
        ▼
Site-consumable documents
        │
        ▼
oomia.github.io Site
        │
        ▼
GitHub Pages
```

현재 핵심 결정:

- canonical authoring content는 Git-backed filesystem document workspace다. Engine `prepare`가 commit 전에 frontmatter-first persistent metadata를 보완하며, 사용자가 검토·commit한 상태가 durable canonical revision이다. Site가 실제 소비하는 문서는 이후 deterministic projection일 수 있다.
- [Docs repository](https://github.com/ooMia/oomia.github.io.docs)의 Git commit이 durable shared canonical revision이다.
- docs layout은 아직 결정하지 않았다. free-form tree, consumer discovery convention, strict repository-wide layout을 모두 허용하며 strict layout도 유효한 후보다.
- 기존 content는 이미 Obsidian에서 작성된 corpus이므로 basic Obsidian authoring compatibility는 1.0의 핵심 불확실성이 아니다.
- editor 역할은 아직 확정하지 않는다. Fumadocs Editor가 custom component 주입·structured editing에서 실제 UX/DX 이점을 주는지가 핵심 비교점이다.
- Obsidian-native custom syntax/CSS/plugin bridge는 1.0 필수 고려사항이 아니다.
- Fumadocs UI/Core/MDX는 Site integration의 주요 재사용 후보다.
- Engine은 DB-backed CMS가 아니라 stateless, invocation-driven CLI-first one-shot workspace validation / Git / publish / Site verification orchestrator다.
- Payload/PostgreSQL/Lexical은 legacy implementation/Evidence다.
- Engine의 새 target implementation은 **greenfield scratch build**를 기본 전략으로 한다.
- JavaScript/TypeScript repository는 **VP-first** toolchain과 **monorepo-ready, package-light** 구조를 기본값으로 사용한다.

## Engine legacy / Issue #13

[Engine Issue #13](https://github.com/ooMia/oomia.github.io.engine/issues/13)은 별도 Codex 앱에서 Payload-oriented raw-source save path 구현이 진행되다가 중단됐다.

현재 target에서는 기존 AC 대부분이 filesystem boundary로 이동한다.

- raw source create/update → filesystem editing
- source preservation → filesystem/source semantics
- unsupported visual content fallback → source editor
- broken draft storage → working tree
- metadata preservation → file/frontmatter operation

따라서 **#13 구현을 그대로 재개하지 않는다.**

다음 live mutation 전에 Codex local/unpushed work를 반드시 확인하고 보존 가치가 있는 generic behavior/evidence만 추출한다.

[Engine Issue #14](https://github.com/ooMia/oomia.github.io.engine/issues/14)의 “Visual codec을 global publish gate로 사용하지 않는다”는 목적은 유지하되 filesystem validation + actual Site consumer verification으로 다시 설계한다.

## Engine live toolchain findings

현재 remote `main`을 2026-09-21에 확인한 결과:

- root workspace: `apps/*`, `packages/*`, `tools/*`
- Vite+: `0.3.3`
- package manager declaration: pnpm `12.3.4`
- root `vite.config.ts`는 VP lint/fmt/check와 Vite Task를 이미 사용
- 그러나 task taxonomy가 legacy architecture에 강하게 결합:
  - `db:*`
  - `cms:*`
  - DB-based `docs:publish`
  - `release:evidence`
- `apps/cms-lab`, `packages/infra`, `packages/utils`, `content/docs` submodule 등 현재 tree는 scratch target template로 사용하지 않는다.
- **중요:** `.github/copilot-instructions.md`가 아직 “PostgreSQL이 콘텐츠 SoT”, DB commands, Payload-era workflow를 지시한다. Codex scratch build를 시작하기 전에 해당 branch에서 반드시 교체해야 한다.

VP 자체는 폐기 대상이 아니다. scratch build에서 toolchain policy는 유지하고 legacy product task taxonomy만 복제하지 않는다.

## Site live toolchain findings

현재 [Site repository](https://github.com/ooMia/oomia.github.io) `main`은:

- Astro app: `apps/web`
- internal packages: `packages/md`, `packages/ui`
- pnpm `12.3.4`
- Node policy: `24.20.0` workspace setting / `>=24`
- Vite+ `0.3.0`
- Turbo `2.10.12`
- Vite+ native `.vite-hooks`와 root lint/fmt/staged config 사용
- root task execution은 아직 Turbo scripts가 중심

**새 workflow에서 Turbo 의존성을 확대하지 않는다.** Turbo 제거는 Q021에 따라 VP recursive/filter/cache parity와 existing Site build/deploy Evidence를 보존하는 별도 Maintenance change로 수행한다.

Site는 이미 docs → Astro → GitHub Pages delivery Evidence가 있으므로 Engine과 달리 greenfield scratch를 기본값으로 하지 않는다.

## VP global policy

Canonical: [Development Toolchain](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/development-toolchain.md)

핵심:

- `vp` = project-wide JS/TS primary command surface
- `vpr` = `vp run` shorthand
- `vp <built-in>`과 `vp run <script/task>`을 구분
- package management도 `vp install/add/remove/why/...` 우선
- root `vite.config.ts`가 lint/fmt/check/staged/shared task policy 소유
- stateful Git/publish/external mutation은 `cache: false`
- evidence boundary는 `NO_COLOR=1`
- new repo에서는 Vite+ native hooks + `vp staged` 우선
- `vp migrate`, `vp upgrade`, agent-modifying `vp config`는 명시적인 Maintenance 작업에서만 수행
- GitHub Actions는 exact-pinned `setup-vp` 사용
- production container는 VP image 자체를 runtime으로 사용하지 않고 multi-stage build

## Repository structure policy

Canonical: [Repository Design & Maintenance](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/repository-design.md)

Engine scratch 기본 shape:

```text
/
├─ apps/
│  └─ engine/
│     ├─ src/
│     └─ tests/
├─ .github/
├─ .vite-hooks/
├─ package.json
├─ pnpm-workspace.yaml
├─ tsconfig.json
└─ vite.config.ts
```

`packages/*`, `tools/*`는 실제 extraction point가 생길 때만 추가한다.

처음부터 `core`, `git`, `workspace`, `process`, `validation`, `utils`, `infra` package를 architecture diagram만 보고 생성하지 않는다.

## Fumadocs / editor decision

이미 확정:

- Obsidian basic authoring은 기존 corpus 때문에 blocker가 아니다.
- Obsidian-native custom syntax bridge는 1.0 비목표.
- Site에서 Fumadocs UI/Core/MDX를 적극 검토한다.

아직 미결:

- Obsidian primary-only
- Obsidian + optional Fumadocs Editor
- Fumadocs Editor 중심 authoring

판정 기준:

- existing corpus source preservation
- Fumadocs Site integration complexity
- custom component 정의/주입/편집 UX
- external edit ↔ visual edit normalization behavior
- maintenance/dependency cost

## Docs layout decision

어떤 docs layout도 현재 선결하지 않는다.

후보 예:

1. free-form tree + consumer discovery
2. publishable subtree만 convention 적용
3. repository-wide strict directory/frontmatter convention

strict layout을 선택하는 것도 완전히 유효하다. 선택 기준은 Fumadocs/Site integration, authoring UX, validation 단순성, maintenance cost다.

## Verified current Site/docs coupling

2026-09-21 live `main` 확인:

- Docs repository는 현재 `.engine-export.json`과 `article-7.mdx`만 가진 매우 작은 generated-era state다.
- Site는 docs repo를 `apps/web/data/articles`에 Git submodule로 mount한다.
- Astro content collection은 submodule root의 `**/*.{md,mdx}`를 모두 `articles`로 읽는다.
- current schema는 `title`, `description`, `author`를 요구하고 추가 frontmatter는 허용하는 loose schema다.
- 현재 Article route는 MDX renderer에 local `Callout.astro`를 component map으로 주입한다.
- legacy publish는 docs commit/push → Site submodule을 exact docs SHA로 checkout → Site commit/push → Engine submodule pointer commit/push 순으로 세 repo를 갱신했다.

새 architecture에서 강한 재사용 후보:

- Site가 exact docs SHA를 pin하는 submodule revision linkage
- actual Astro consumer verification
- docs SHA를 Site commit에 기록하는 commit message/evidence pattern

재검토 대상:

- docs 전체를 하나의 Article collection으로 간주하는 current consumer assumption
- Engine이 자신의 docs submodule pointer까지 매 publish마다 commit하는 self-recording
- Engine이 authoring working tree를 자동으로 생성/교체/commit하는 legacy export ownership

## Metadata enrichment / projection boundary

사용자 정정으로 다음을 명시적으로 구분한다.

```text
Authoring Draft
        ↓ engine prepare
frontmatter-first persistent metadata
        ↓ user review + commit
Canonical Revision
        ↓ deterministic derived metadata
Publishable Projection
        ↓
Site
```

핵심:

- DB export를 제거한다고 publish-time transformation까지 제거하는 것이 아니다.
- 다양한 metadata를 배포 전에 주입하는 것은 Publishing Platform의 핵심 product behavior다.
- persistent/user-meaningful metadata는 commit 전에 source frontmatter에 materialize할 수 있다. projection-only derived metadata 때문에 committed source를 다시 mutation하지 않는다.
- same source revision + same metadata inputs + same projection contract에서는 same projection을 재현해야 한다.
- projection은 derived artifact이며 canonical source를 대체하지 않는다.

Canonical: [Publishable Projection & Metadata Enrichment](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/publishable-projection.md)

현재 미결:

- metadata 세부 구현(timestamp derivation, staged/file/all selection, prompt UX, formatting)은 Engine implementation responsibility
- projection을 ephemeral staging / Site working tree / artifact 중 어디에 materialize할지(Q024)
- sidecar/stable identity는 실제 필요 시(Q025)

## Current capability status

[Implementation Map](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/implementation-map.md) 기준:

- Authoring: **미충족**
- Canonical Content: **부분 충족**
- Extensibility: **부분 충족**
- Automation: **부분 충족**
- Publishing: **부분 충족**
- Presentation: **충족**
- Delivery: **충족**

legacy Payload E2E는 새 target Authoring 완료 Evidence가 아니다.

## Open implementation decisions

[Open Questions](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/open-questions.md) 참조.

현재 중요한 gate:

- projection materialization location
- docs layout / consumer convention
- actual editor role
- Engine container mount/credential contract — committed-revision publish + one-shot CLI 기준으로 다음 설계 대상
- custom component shared profile/package 필요 시점
- Site Turbo retirement timing
- Site incremental migration 범위

## Resolved bootstrap gates

### Q022 — Engine execution surface — 결정됨

**stateless, invocation-driven CLI-first one-shot runtime/container**를 사용한다.

- command invocation마다 Engine process가 시작·종료한다.
- 1.0 public adapter는 CLI다.
- persistent state는 filesystem/Git/Site/Evidence에 둔다.
- HTTP server, job queue, server-side session/status lifecycle은 1.0 비목표다.
- core operations는 CLI parsing/stdout/process exit와 분리해 향후 다른 adapter를 추가할 수 있게 한다.

### Q016 — Git publish ownership — 결정됨

**committed-revision publish**를 사용한다.

- Engine은 dirty docs working tree를 자동 stage/commit하지 않는다.
- 사용자가 확정한 docs commit을 publish candidate로 받는다.
- Engine은 해당 revision을 검증하고 필요 시 docs push → Site exact docs SHA linkage → Site commit/push → delivery verification을 orchestration한다.
- branch/PR publish는 1.0 기본 mode가 아니며 실제 review workflow 필요 시 별도 확장한다.

## Next safe action

코드 삭제나 #13 재개부터 시작하지 않는다.

1. Engine #13 Codex local/unpushed state와 live Issue/branch를 재확인한다.
2. Docs repository current tree와 Site consumption path를 live로 조사한다.
3. 기존 Obsidian corpus 중 대표 content를 사용해 Fumadocs UI/Core/MDX Site integration spike의 Outcome/AC를 정의한다.
4. 같은 spike에서 Fumadocs Editor custom-component authoring의 추가 가치를 측정한다.
5. docs layout 후보(free/discovery/strict)를 integration 결과로 비교한다.
6. Engine scratch bootstrap Issue를 설계한다.
   - first change: stale Copilot instructions 교체
   - Node.js 24.20.0 / pnpm 12.3.4 / Vite+ 0.3.3 baseline 적용
   - CLI-first one-shot skeleton
   - public command contract(`doctor` / `prepare` / `verify` / `publish`) 구체화
   - frontmatter-first pre-commit `prepare` 반영
   - missing-only frontmatter enrichment로 시작하고 timestamp/selection/formatting은 구현 레포에서 실험
   - Q008 mount / Git credential contract 구체화
   - legacy product dependency/task 없음
7. #13/#14와 관련 Project Items를 새 architecture에 맞춰 supersede/re-scope한다.
8. 그 이후 Engine scratch implementation을 Codex에 handoff한다.

## Reverify before live mutations

- Engine Codex local/unpushed work
- Engine #13/#14 latest body/state/comments/linked branches
- Engine main/develop HEAD
- docs actual tree/history
- Site docs consumption/submodule state
- Site/Engine current Vite+ and package-manager versions
- Project #11 related active Items
- branch 삭제 전 미병합 work

## Do not assume

- PostgreSQL/Payload가 target architecture라고 가정하지 않는다.
- current Engine Copilot instructions가 유효하다고 가정하지 않는다.
- docs layout이 반드시 free-form 또는 strict라고 가정하지 않는다.
- Fumadocs Editor가 반드시 필요하거나 불필요하다고 가정하지 않는다.
- Obsidian-native custom syntax bridge를 1.0 요구사항으로 만들지 않는다.
- `vp dev`가 package `dev` script를 실행한다고 가정하지 않는다.
- existing Site Turbo를 새 workflow의 기본 task runner로 확대하지 않는다.
- `packages/utils` / `packages/infra` 같은 legacy package를 scratch structure로 복제하지 않는다.
- 이전 #13 구현 가설을 next action으로 사용하지 않는다.
