# Implementation Map

기준일: 2026-09-21. 이 문서는 Publishing Platform 1.0의 **현재 Product Boundary**를 기존 검증 revision과 대조한 revision-bound snapshot이다.

2026-09-21 target architecture가 Payload/PostgreSQL 기반 CMS에서 **Git-backed filesystem document workspace + editor/integration 재검토**로 변경되었다. 아래 기존 구현 revision은 역사적/재사용 가능 Evidence이며 새 target을 자동 충족하지 않는다.

## 기준 revision

| 역할 | Repository | Revision | 의미 |
|---|---|---|---|
| legacy authoring / publishing | [`ooMia/oomia.github.io.engine`](https://github.com/ooMia/oomia.github.io.engine) | [`6ba2f950a78eef18c2efa305b96a1c8d0443252e`](https://github.com/ooMia/oomia.github.io.engine/commit/6ba2f950a78eef18c2efa305b96a1c8d0443252e) | Payload/PostgreSQL CMS와 DB→docs publish Evidence |
| content repository snapshot | [`ooMia/oomia.github.io.docs`](https://github.com/ooMia/oomia.github.io.docs) | [`50d89a4cb1c5d6476444e29454e12b523e99231b`](https://github.com/ooMia/oomia.github.io.docs/commit/50d89a4cb1c5d6476444e29454e12b523e99231b) | 현재는 generated snapshot이지만 새 architecture에서 canonical remote로 승격 대상 |
| presentation / delivery | [`ooMia/oomia.github.io`](https://github.com/ooMia/oomia.github.io) | [`a3b2e182563458636b7b8186a4cd2201894b2a65`](https://github.com/ooMia/oomia.github.io/commit/a3b2e182563458636b7b8186a4cd2201894b2a65) | docs content를 Site에서 실제 build/deploy한 Evidence |

`oomia.github.io`의 package name은 `oomia.github.io.mono`이고 일부 engine 문서에서는 이를 `mono`라고 부른다. 별도 원격 `oomia.github.io.mono`가 있다는 뜻은 아니다.

## Architecture transition

기존 구현:

```text
Payload/Lexical
      ↓
PostgreSQL
      ↓
DB snapshot/export
      ↓
oomia.github.io.docs
      ↓
Site
```

현재 target:

```text
Obsidian / Fumadocs Editor / IDE
          ↓
local Git document workspace
(editor role under evaluation)
          ↓
validation + commit/push
          ↓
oomia.github.io.docs
 canonical content revision
          ↓
Site
```

따라서 기존 Payload/PostgreSQL 구현을 제거하기 전에도 재사용 가능한 요소와 폐기할 coupling을 구분해야 한다.

## 1.0 capability 상태

상태는 **미검증 / 미충족 / 부분 충족 / 충족**만 사용한다.

| Capability | 상태 | 현재 Evidence | 새 target에 남은 delta |
|---|---|---|---|
| Authoring | **미충족** | Payload Admin에서 visual create/edit/save가 E2E로 검증된 legacy implementation은 존재한다. [e2e.ts](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/scripts/e2e.ts) | 기존 corpus가 이미 Obsidian 기반이므로 basic authoring 호환성보다 Fumadocs/Site integration과 custom-component authoring 경험을 검증해야 한다. Obsidian-only, Obsidian + optional Fumadocs Editor, Fumadocs-heavy 역할 중 하나를 Evidence로 결정한다. |
| Canonical Content | **부분 충족** | docs repository에는 실제 Markdown/MDX files와 Git history가 있고 Site가 이를 소비할 수 있다. 기존 Engine DB에도 raw body string 보존 Evidence가 있다. | authority를 PostgreSQL에서 docs-backed Git workspace로 이동하고 Git revision semantics를 확정해야 한다. layout은 free-form/discovery/strict convention 모두 후보이며 integration/maintenance Evidence로 의도적으로 선택한다. |
| Extensibility | **부분 충족** | 기존 custom `Callout`이 engine/site 양쪽에서 opt-in되고 consumer build를 통과한 Evidence가 있다. | Fumadocs built-in/custom component와 Editor component-spec workflow를 실제 Site integration에서 검증한다. Obsidian-native custom syntax bridge는 1.0 범위 밖이며 별도 component package는 실제 cross-repo 공유 수요 전까지 만들지 않는다. |
| Automation | **부분 충족** | legacy Payload publish action과 docs workflow가 explicit trigger, failure propagation, idempotent no-op을 검증했다. [Issue #8](https://github.com/ooMia/oomia.github.io.engine/issues/8) | trigger를 Payload endpoint에서 Git workspace publish action으로 옮기고 validation→commit/push→Site verification 흐름을 재검증해야 한다. |
| Publishing | **부분 충족** | legacy workflow는 DB snapshot을 docs repo에 materialize하고 실제 Site sync/lint/test/typecheck/build를 통과시켰다. [docs workflow](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/scripts/docs-workflow.ts) | DB export/Visual codec gate는 제거하되, canonical authoring source + metadata inputs → deterministic publishable projection이라는 핵심 transformation을 새로 정의해야 한다. downstream Site verification은 재사용 가능성이 높다. |
| Presentation | **충족** | Site가 docs repository의 Markdown/MDX를 Astro content collection으로 읽어 렌더한다. [content config](https://github.com/ooMia/oomia.github.io/blob/a3b2e182563458636b7b8186a4cd2201894b2a65/apps/web/src/content.config.ts) | Fumadocs UI/content tooling 도입은 UX/DX 개선 과제로 진행할 수 있으나 canonical docs content를 렌더한다는 1.0 기본 결과는 이미 충족한다. |
| Delivery | **충족** | docs SHA를 소비하는 Site revision의 GitHub Pages build/deploy가 성공했다. [run 35472028484](https://github.com/ooMia/oomia.github.io/actions/runs/35472028484) / [artifact 10593195312](https://github.com/ooMia/oomia.github.io/actions/runs/35472028484/artifacts/10593195312) | 새 canonical workspace에서 content delta를 publish한 뒤 동일 delivery chain이 유지되는 regression Evidence를 추가한다. |

## 폐기 또는 재사용 판단

### Target에서 제거

- PostgreSQL을 canonical content persistence로 사용하는 모델
- Payload collection CRUD를 1.0 authoring contract로 사용하는 모델
- Lexical editor state ↔ Markdown codec을 모든 content의 storage/publish gate로 사용하는 모델
- DB snapshot → generated docs projection이라는 ownership
- Payload user/auth model을 local 1.0 authoring의 필수조건으로 두는 모델

### 재사용 후보

- process execution / command runner
- publish concurrency/idempotency guard
- failure propagation과 Evidence 수집
- docs/site revision linkage
- Site sync/lint/test/typecheck/build verification
- main-only publish guard 등 Git policy
- existing docs repository와 Site consumer linkage

재사용 여부는 새 workspace flow에서 코드 복잡도를 줄이는 경우에만 결정한다. legacy abstraction을 유지하기 위해 새 architecture를 왜곡하지 않는다.

## 1.0 구현 delta

우선순위는 다음과 같다.

1. **Workspace / Docs Contract**
   - docs repository를 canonical content remote로 재정의
   - free-form/discovery-based/strict docs layout 후보를 실제 corpus와 Site/Fumadocs integration으로 비교하고 하나를 의도적으로 선택
   - working tree draft vs committed canonical revision 구분

2. **Authoring + Site Integration**
   - 기존 작성 content corpus를 docs workspace에 import
   - 기존 Obsidian corpus를 Fumadocs UI/Core/MDX Site에 통합
   - Fumadocs Editor의 MDX/custom-component-aware editing 이점과 비용 비교
   - custom component 주입/편집 경험과 source round-trip 검증
   - 최종 editor 역할을 Evidence로 결정

3. **Engine Simplification**
   - Payload/PostgreSQL 의존 경로를 target implementation에서 제거
   - container + mounted workspace model
   - validation / Git / publishing orchestration만 유지

4. **Projection / Publishing Rewrite**
   - source discovery + metadata resolution
   - deterministic publishable projection materialization
   - projection validation + actual Site consumer verification
   - committed docs revision push와 Site revision linkage
   - projection manifest/hash와 idempotent publish semantics

5. **Fumadocs / Obsidian Integration**
   - Site에서 Fumadocs UI/Core/MDX를 재사용할 범위 검증
   - Obsidian-native source syntax를 Site에서 richer UI로 변환하는 plugin/remark boundary 검증
   - Fumadocs Editor가 실제로 필요한 component-aware editing gap만 식별
   - custom component는 실제 수요가 있을 때만 shared profile/spec 추가

6. **Engine Scratch Bootstrap**
   - D032에 따라 greenfield skeleton 생성
   - [Development Toolchain](development-toolchain.md)과 [Repository Design](repository-design.md) 적용
   - legacy code는 keep/adapt/retire review 후 필요한 generic behavior만 port

7. **Site migration strategy**
   - 현재 Astro/docs/Pages Evidence를 보존하면서 Fumadocs integration을 incremental로 검증
   - Turbo → VP task-runner parity는 별도 Maintenance delta

8. **Regression / Migration**
   - legacy DB content가 있다면 canonical files로 일회성 migration
   - 기존 Site delivery chain 유지
   - obsolete Payload/PostgreSQL code와 infra 제거

## Issue #13 / #14 영향

기존 [Engine Issue #13](https://github.com/ooMia/oomia.github.io.engine/issues/13)의 “Payload 안에서 raw source save path 확보” 구현은 새 architecture에서 대부분 구조적으로 불필요해진다.

- raw source create/update → filesystem 직접 편집
- exact preservation → Source client/file semantics
- visual unsupported fallback → Obsidian/IDE source editing
- metadata-only preservation → frontmatter/file patch
- broken draft storage → working tree file

따라서 #13을 그대로 계속 구현하지 말고 새 architecture 기준으로 **supersede 또는 migration/evidence Issue로 재범위화**해야 한다.

기존 #14의 “Visual codec을 global publish gate에서 제거” 목적은 유지되지만 구현 방식은 file workspace validation + Site consumer build로 다시 설계해야 한다.

## 갱신 규칙

- 이 문서는 live branch 상태가 아니라 immutable Evidence 기반 snapshot이다.
- architecture가 변경되면 같은 코드 revision도 새 Product Boundary에 대해 다시 평가할 수 있다.
- legacy implementation 성공을 현재 target 완료로 간주하지 않는다.
- 새 Engine/docs/Site integration이 main에 들어간 뒤 기준 revision과 capability 상태를 다시 갱신한다.
