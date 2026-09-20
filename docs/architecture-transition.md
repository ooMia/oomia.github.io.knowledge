# Architecture Transition — DB-backed CMS → Git-backed Content Workspace

상태: **Active migration directive**  
기준일: 2026-09-21

이 문서는 2026-09-21에 확정된 급진적인 architecture 변경을 구현자가 안전하게 이어받기 위한 **전환 전용 canonical guide**다.

장기 제품 계약 자체는 [Architecture](architecture.md), [Content Authoring & Publishing Contract](content-authoring-contract.md), [Release 1.0](release-1.0.md)이 소유한다. 이 문서는 **기존 구현에서 새 target으로 이동하는 동안 무엇을 중단·보존·재구성해야 하는가**를 소유한다.

전환이 완료되면 이 문서의 상태를 종료하고 필요한 규칙만 장기 canonical 문서에 남긴다.

## 1. 왜 전환하는가

기존 1.0 구현은 다음 모델을 중심으로 발전했다.

```text
Payload / Lexical
       ↓
PostgreSQL
       ↓
Markdown export / codec validation
       ↓
oomia.github.io.docs
       ↓
Astro Site
```

이 구조는 raw Markdown/MDX를 최종 콘텐츠 형태로 사용하는 제품에 비해 다음 책임을 추가했다.

- DB schema와 lifecycle
- Payload user/auth 및 CRUD
- Lexical ↔ Markdown conversion
- visual editor representability와 source preservation 사이의 codec
- DB snapshot → Markdown projection
- 별도 DB backup/restore와 dev/prod persistence 운영

2026-09-21 이후 1.0은 다음 모델을 목표로 한다.

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
                                 │
                                 ▼
                           GitHub Pages
```

변경의 목적은 기능을 포기하는 것이 아니라 **canonical source와 authoring 도구 사이의 불필요한 persistence/conversion layer를 제거하는 것**이다.

## 2. 구현자가 가장 먼저 버려야 하는 전제

다음 전제를 현재 요구사항으로 사용하지 않는다.

1. PostgreSQL이 canonical content source다.
2. Payload collection이 Article lifecycle의 owner다.
3. Visual editor state를 Markdown으로 변환해야만 content를 저장할 수 있다.
4. `oomia.github.io.docs`는 DB snapshot에서 생성되는 read-only projection이다.
5. publish는 DB를 Markdown으로 export하는 작업이다.
6. 모든 공식 content component를 Oomia가 직접 React package로 구현해야 한다.
7. Engine Issue #13의 기존 Payload-oriented 구현 계획이 여전히 현재 next step이다.
8. 기존 코드에 많은 투자가 들어갔다는 이유만으로 새 architecture가 legacy abstraction을 보존해야 한다.

위 전제에 의존하는 구현은 **현재 target과의 compatibility를 먼저 증명하기 전에는 확장하지 않는다.**

## 3. 현재 non-negotiable target

### Canonical content

- content는 Markdown/MDX + YAML frontmatter + assets의 filesystem representation을 사용한다.
- local Git working tree는 authoring/draft state를 포함할 수 있다.
- durable shared canonical revision은 [`ooMia/oomia.github.io.docs`](https://github.com/ooMia/oomia.github.io.docs)의 Git commit SHA로 식별한다.
- Git history가 기본 revision/diff/rollback mechanism이다.
- DB를 추가하더라도 derived index/cache여야 하며 canonical content를 대체하지 않는다.

### Authoring

- editor는 아직 확정하지 않는다. Obsidian은 broad file/Markdown UX의 primary candidate이고, Fumadocs Editor는 MDX/custom-component-aware visual editing candidate다.
- 핵심 검증 대상은 두 editor를 모두 필수로 만드는 것이 아니라, 동일 docs workspace를 authoring tool과 Site가 손실 없이 공유하는 integration framework다.
- Fumadocs Editor가 표현하지 못하는 source 때문에 canonical syntax 범위를 줄이지 않는다.
- Source-level editing은 Obsidian/IDE/Agent로 항상 가능해야 한다.
- full CMS나 자체 editor framework를 직접 재구현하지 않는다.

### Engine

Engine은 **workspace-oriented orchestrator**다.

필수 책임 후보:

- workspace discovery
- file/frontmatter/content validation
- Git status/revision handling
- explicit publish orchestration
- Site consumer verification
- Evidence/revision linkage
- containerized execution + mounted workspace

1.0 필수가 아닌 책임:

- DB CRUD
- application-level CMS user management
- rich-text canonical state
- 자체 visual editor framework
- DB migration/backup lifecycle

### Site

Site는 단순 migration 대상이 아니다. 새 target의 핵심 consumer이므로 함께 변경된다.

- canonical docs revision을 직접 소비하는 boundary는 유지한다.
- 현재 Astro 기반은 별도 이유가 없는 한 유지할 수 있다.
- Fumadocs UI/content tooling을 우선 검토한다.
- 기존 custom Callout 같은 예시 구현을 보존하기 위해 Fumadocs built-in을 재구현하지 않는다.
- actual Site typecheck/test/build는 Publishability의 최종 gate 중 하나로 계속 유지한다.

### Docs

Docs repository는 ownership이 가장 크게 바뀐다.

기존:
> generated document projection

현재:
> 자유롭게 변형 가능한 document directory/tree + durable Git revision history

Docs는 특정 `content/` path, Article schema, route 구조를 repository 전체에 강제하지 않는다. Site/Engine 같은 consumer가 필요한 subtree/path convention은 정의할 수 있지만 이는 consumer contract다. 일반 document edit 자체를 repository implementation Issue로 다룰 필요는 없고, shared tooling/policy/convention 변경만 구현 작업으로 추적할 수 있다.

## 4. Repository별 migration impact

| Repository | 기존 중심 책임 | 새 책임 / 변화 |
|---|---|---|
| `oomia.github.io.engine` | Payload CMS, PostgreSQL persistence, export/publish | mounted workspace validation, Git/publish orchestration, Site verification |
| `oomia.github.io.docs` | generated projection | canonical content remote, history, assets/frontmatter |
| `oomia.github.io` | generated docs renderer | canonical docs consumer + Fumadocs-oriented presentation |
| `oomia.github.io.knowledge` | architecture/planning SoT | transition policy와 migration Evidence mapping |

## 5. 기존 코드의 분류 규칙

기존 코드를 `keep`, `adapt`, `retire`로 분류한다.

### Keep 가능성이 높은 코드

- command/process execution
- concurrency/idempotency guard
- exit-code/failure propagation
- Evidence capture
- Git revision linkage
- Site checkout/sync/test/typecheck/build verification
- repository/main-only policy checks

### Adapt가 필요한 코드

- publish orchestration
- docs revision handling
- content validation
- explicit publish trigger
- integration/E2E fixture

### Retire 가능성이 높은 코드

- Payload collection CRUD
- Payload-specific Admin UI
- PostgreSQL adapter/schema/init
- Lexical ↔ Markdown codec을 canonical save gate로 쓰는 코드
- DB snapshot exporter
- DB-only integration tests
- CMS user/auth가 local authoring에 필수라는 전제

분류는 파일 이름이나 과거 투자량이 아니라 **새 target에서 실제 책임을 수행하는가**로 결정한다.

## 6. Issue #13 / #14 처리 원칙

### Engine Issue #13

[Issue #13](https://github.com/ooMia/oomia.github.io.engine/issues/13)의 기존 방향은 Payload 내부에서 canonical source를 visual editor constraint에서 분리하는 것이었다.

새 architecture에서는 목표 대부분이 filesystem boundary로 이동한다.

따라서:

- 기존 branch의 미push/local work를 먼저 보존·검토한다.
- branch를 자동으로 merge하거나 버리지 않는다.
- generic test/contract/evidence 중 재사용 가능한 부분을 추출한다.
- 기존 AC를 그대로 완료하려고 하지 않는다.
- live Issue는 새 architecture를 기준으로 supersede/re-scope한 뒤 진행한다.

### Engine Issue #14

[Issue #14](https://github.com/ooMia/oomia.github.io.engine/issues/14)의 핵심 의도인 **Visual codec을 global publish gate로 사용하지 않는다**는 원칙은 유지한다.

단 구현은:

```text
DB body → codec round-trip → export
```

가 아니라:

```text
workspace files
      ↓
content / frontmatter / component / asset validation
      ↓
actual Site consumer verification
```

로 바꾼다.

## 7. Site migration 원칙

Site 구현자가 과거 component-package 계획을 보고 별도 library부터 만들지 않도록 한다.

우선순위:

1. 현재 docs consumption contract를 확인한다.
2. canonical docs repository가 직접 authored source가 되어도 현재 Site pipeline이 유지되는지 검증한다.
3. Fumadocs UI/content tooling 도입 범위를 spike한다.
4. Fumadocs built-in component를 우선 활용한다.
5. 실제 Oomia-specific custom component가 생긴 경우에만 adapter/profile/shared package를 도입한다.
6. 기존 Astro/Fumadocs integration이 충분하면 framework migration을 별도 목표로 만들지 않는다.

## 8. Migration order

코드를 대량 삭제하기 전에 아래 순서를 따른다.

### Phase A — Observe

- Engine #13 branch/local Codex work 보존 상태 확인
- Engine main/develop과 relevant Issue live state 확인
- Docs repository tree/layout/history 조사
- Site의 docs consumption 방식 조사
- 현재 publish workflow에서 generic 부분과 Payload coupling 분리

### Phase B — Prove the authoring/rendering integration

synthetic 최소 fixture를 먼저 설계하지 않는다. 기존에 작성한 실제 content corpus를 docs workspace로 import하여 다양한 Markdown 구조, frontmatter, links, assets, code blocks, legacy syntax를 한 번에 노출시킨다.

검증 목표:

- existing corpus를 Obsidian vault로 열었을 때 별도 migration 없이 유용한 authoring UX가 나오는가
- Obsidian의 Properties / Live Preview / CSS snippets / custom callout만으로 필요한 visual authoring 수준을 어디까지 충족하는가
- arbitrary MDX/custom component가 필요할 때 Obsidian plugin extension과 Fumadocs Editor 중 어느 쪽이 더 단순한가
- Fumadocs UI/Core/MDX가 동일 source를 Site에서 자연스럽게 소비하는가
- Obsidian-friendly Markdown syntax를 remark/rehype adapter로 richer Fumadocs UI에 mapping할 수 있는가
- external edits가 source loss나 강제 normalization을 일으키지 않는가
- docs tree의 기존 자유도를 유지하면서 consumer-specific path convention만 최소로 둘 수 있는가

synthetic fixture는 intentionally broken source, edge-case component, encoding/path edge case처럼 실제 corpus로 재현하기 어려운 regression에만 추가한다.

### Phase C — Rewire publishing

- DB export를 publish input에서 제거
- workspace validation 도입
- Site consumer verification 재사용
- canonical docs commit/push semantics 구현
- revision linkage와 idempotency 재검증

### Phase D — Remove legacy

새 path가 동등하거나 더 나은 Evidence를 확보한 이후에만:

- Payload/PostgreSQL runtime 제거
- obsolete scripts/tests/config 제거
- container image에서 DB dependency 제거
- legacy Issue/branch 정리

## 9. Migration safety rules

- **Big-bang delete 금지**: 새 path가 최소 vertical slice를 통과하기 전에 legacy code를 대량 삭제하지 않는다.
- **Dual-SoT 장기 운영 금지**: migration 중 일시적 coexistence는 가능하지만 DB와 files를 동시에 authoritative하게 두지 않는다.
- **Silent normalization 금지**: Fumadocs/Obsidian 간 이동에서 unsupported source가 조용히 손실되면 migration 실패다.
- **Site verification 생략 금지**: file parse 성공만으로 Publishable 판정을 내리지 않는다.
- **Framework rewrite 금지**: Fumadocs 도입을 이유로 Astro 등 이미 동작하는 Site 기반을 불필요하게 전면 교체하지 않는다.
- **Editor lock-in 금지**: Obsidian/Fumadocs Editor 중 하나를 integration evidence 없이 canonical editor로 고정하지 않는다.
- **Repository layout overconstraint 금지**: docs 전체에 단일 application-specific directory/frontmatter schema를 강제하지 않는다.
- **Legacy sunk-cost bias 금지**: 과거 구현 유지가 새 모델을 더 복잡하게 만들면 제거를 우선 검토한다.
- **Unverified convenience assumption 금지**: Obsidian plugin/Fumadocs 기능을 문서나 실제 spike 없이 canonical capability로 가정하지 않는다.

## 10. Implementation session bootstrap

Engine/Site/Docs의 architecture migration을 수행하는 Agent는 다음 순서로 읽는다.

1. 이 문서
2. [Architecture](architecture.md)
3. [Open Questions](open-questions.md)에서 editor / layout / rebuild decision gate 확인
4. [Content Authoring & Publishing Contract](content-authoring-contract.md)
5. [Release 1.0](release-1.0.md)
6. [Implementation Map](implementation-map.md)
7. [Current Handoff](../handoff/current.md)
8. 변경 대상 repository의 최신 Issue/branch/code/test

과거 Issue body나 branch code가 위 문서와 충돌하면 **현재 canonical Knowledge가 목표를 소유하고, 과거 구현은 migration input**으로 취급한다.

단, 실제 live repository state와 미push local work는 임의로 덮어쓰지 않는다.

## 10.5 Greenfield rebuild option

Engine 또는 Site를 기존 구조에서 점진적으로 뜯어고치는 것만이 정답은 아니다.

다음 조건이면 **새 target을 기준으로 greenfield skeleton을 만들고 legacy에서 필요한 부분만 가져오는 방식**을 허용한다.

- legacy abstraction을 제거하는 비용이 새 구현보다 크다.
- Payload/PostgreSQL coupling 때문에 workspace boundary를 검증하기 어렵다.
- 재사용 가능한 코드가 command runner, evidence, Git verification처럼 작고 독립적이다.
- 기존 테스트 대부분이 target behavior보다 legacy implementation detail을 고정한다.

반대로 Site처럼 이미 canonical docs rendering/delivery Evidence가 있고 새 target과 구조적 충돌이 적다면 incremental migration을 우선한다.

greenfield 여부는 아직 결정되지 않았다. Phase A에서 repository별 keep/adapt/retire 비율과 dependency graph를 확인한 뒤 결정한다.

## 11. Transition completion criteria

다음이 모두 충족되면 이 transition guide를 Active에서 Completed/Archived 상태로 바꿀 수 있다.

- Docs repository가 canonical content remote로 실제 운영된다.
- 선택된 authoring workflow가 실제 기존 content corpus에서 검증되고, Obsidian/Fumadocs Editor의 역할이 명확히 결정된다.
- Engine target path가 Payload/PostgreSQL 없이 workspace를 검증·publish할 수 있다.
- Site가 새 canonical content revision을 실제 build/deploy한다.
- publish Evidence가 docs SHA + Engine/Site revision + delivery result로 연결된다.
- #13/#14와 관련 active backlog가 새 architecture로 re-scope되었다.
- legacy Payload/PostgreSQL runtime이 제거되거나 명시적으로 archive 상태로 격리되었다.
- Implementation Map이 새 main revisions 기준으로 다시 검증되었다.
