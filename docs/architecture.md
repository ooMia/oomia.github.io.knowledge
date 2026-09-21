# Architecture

상태: 2026-09-21 Git-backed document workspace와 editor/integration 재검토 방향을 반영.

## 원칙

- 구현 작업보다 제품 결과와 시스템 책임을 기준으로 계획한다.
- 매 Iteration에 시연 가능한 결과를 남긴다.
- 핵심이 아닌 문제는 검증된 도구를 우선 활용한다.
- 안정된 경계가 필요해질 때까지 설계 선택의 변경 가능성을 유지한다.
- 레포와 프레임워크를 영구적인 제품 경계로 취급하지 않는다.
- canonical source는 특정 CMS/Visual Editor의 표현 능력에 종속되지 않는다.
- storage / editing / publishing / presentation을 서로 다른 계약으로 취급한다.
- canonical content를 표현하기 위해 별도 DB가 필요하지 않으면 도입하지 않는다.
- content authoring 도구는 canonical workspace 위의 교체 가능한 client로 취급한다.

## 레포의 역할

유일한 최상위 구현 레포는 없다. 이 지식 레포도 다른 레포를 포함하는 super-repository가 아니다.

| 레포 | 책임 |
|---|---|
| `oomia.github.io.engine` | local content workspace를 열고 검증하며 publish/Git/Site 검증 workflow를 orchestration하는 Engine |
| `oomia.github.io.docs` | document directory/tree와 assets의 durable Git remote 및 shared revision history. layout은 자유 tree부터 strict path/schema까지 구현 목적에 맞게 선택 가능하며 현재 Knowledge가 한 형태를 선결하지 않음 |
| `oomia.github.io` | canonical authoring revision에서 materialize된 publishable projection을 소비해 사이트를 빌드하고 GitHub Pages로 전달 |
| `oomia.github.io.knowledge` | 제품·아키텍처·계획 계약의 canonical knowledge |

`mono`는 사용자가 Site repository에 붙인 로컬 별칭이며 실제 원격 repository 이름의 일부가 아니다.

## Canonical content workspace

1.0의 canonical content representation은 **Git-backed filesystem document workspace**다. docs repository의 directory/path/layout 정책은 아직 확정하지 않는다. 완전 자유 tree, consumer별 discovery convention, strict application-specific layout 모두 유효한 구현 선택지다.

```text
Obsidian ──────────────┐
                      │
Fumadocs Editor ───────┼──> local content working tree
                      │      Markdown / MDX
Source editor / Agent ┘      frontmatter / assets
                                  │
                                  │ git commit / push
                                  ▼
                       oomia.github.io.docs
                        canonical Git revision
                                  │
                                  ▼
                            Site consumer
                                  │
                                  ▼
                             Live Site
```

- local working tree는 작성 중인 draft와 uncommitted state를 포함할 수 있다.
- 다른 환경과 공유·재현할 canonical revision은 `oomia.github.io.docs`의 Git commit으로 식별한다.
- 일반적인 publishable document는 Markdown/MDX와 frontmatter를 사용할 수 있다.
- consumer 또는 repository 자체가 필요하면 subtree 또는 repository-wide directory/path/frontmatter convention을 강제할 수 있다. 핵심은 어떤 layout도 사전에 금지하지 않고 실제 integration/maintenance 비용을 근거로 선택하는 것이다.
- asset은 workspace에서 참조 가능한 파일 또는 명시적으로 허용된 durable external reference로 관리한다. 상세 asset policy는 별도 contract로 발전시킬 수 있다.
- Git history가 content revision history, diff, rollback의 기본 수단이다.
- PostgreSQL/Payload state를 canonical content로 사용하지 않는다.

## Authoring boundary

authoring client 선택은 아직 확정하지 않는다. 기존 content corpus는 이미 Obsidian에서 작성되어 왔으므로 **Obsidian에서 기본 Markdown/file authoring이 가능한가**는 1.0의 주요 불확실성이 아니다.

현재 비교의 핵심은 다음이다.

- Obsidian을 primary editor로 유지했을 때 전체 authoring UX가 충분한가.
- Fumadocs Editor가 custom MDX component를 더 쉽게 주입·편집하는 데 실질적인 우위를 제공하는가.
- 선택한 editor와 Site/Fumadocs rendering layer가 동일 filesystem source를 불필요한 conversion 없이 공유할 수 있는가.
- editor 선택이 docs repository의 layout이나 canonical source를 과도하게 제한하지 않는가.

```text
                         Git-backed docs workspace
                      /              |              \
                     /               |               \
               Obsidian        Fumadocs Editor      IDE / Agent
             proven source UX   component-aware UX    source UX
                     \               |               /
                      \              |              /
                          integration boundary
                                |
                                v
                           Site consumer
```

Obsidian-specific custom syntax/CSS bridge는 1.0 필수 고려사항이 아니다. 향후 필요하면 별도 extension 문제로 다룬다.

Engine은 full CMS나 editor framework를 재구현하지 않는다.

## Engine boundary

Engine의 1.0 목표는 DB-backed CMS가 아니라 **stateless, invocation-driven, CLI-first one-shot workspace orchestrator**다.

```text
Engine CLI / one-shot container
├─ doctor / verify / publish
├─ workspace discovery
├─ content/frontmatter validation
├─ authoring-tool integration hooks
├─ publish validation
├─ Git/revision linkage
└─ Site consumer verification
          │
          └── bind mount / volume
                 local content repository
```

- Engine process는 command invocation마다 시작·종료하며 persistent application/job/session state를 소유하지 않는다.
- Engine image 자체의 ephemeral filesystem을 canonical storage로 사용하지 않는다.
- content repository는 host bind mount 또는 durable volume로 Engine에 제공한다.
- application-level user/database/auth model, HTTP server, job queue, long-running service lifecycle은 1.0의 필수조건이 아니다. 외부 공개나 remote control이 필요해질 때 같은 operation API 위에 별도 adapter를 추가한다.
- 검색·인덱싱·복잡한 query가 필요해지면 DB를 **derived index**로 추가할 수 있지만 canonical source를 대체하지 않는다.
- Payload, PostgreSQL, Lexical 기반 `cms-lab` 구현은 기존 실험/legacy Evidence로 취급하며 새 target architecture의 전제가 아니다.

## Publishing boundary

Publishing은 DB state를 Markdown으로 export하는 작업이 아니지만, **canonical authoring source를 Site-ready projection으로 enrich/transform하는 작업은 핵심 책임**이다.

```text
committed docs source revision
        ↓
metadata discovery / resolution
        ↓
publishable projection materialization
        ↓
projection validation
        ↓
actual Site sync / typecheck / build
        ↓
docs remote / exact source SHA
        ↓
Site revision linkage / delivery
```

- canonical authoring source와 Site-consumed projection은 다를 수 있다. DB snapshot export는 제거하지만 metadata enrichment와 deterministic projection은 유지한다.
- publish 과정은 dirty source working tree를 자동 commit하지 않는다. committed docs revision과 선언된 metadata inputs를 입력으로 **projection 생성 + 검증 + remote/revision linkage + delivery**를 수행한다.
- `oomia.github.io.docs`의 commit SHA가 published content revision의 핵심 Evidence다.
- Site가 실제 docs revision을 소비해 성공적으로 빌드되는지가 최종 Publishability gate의 일부다.
- 동일 content revision의 재발행이 필요한 경우 idempotent하게 처리할 수 있어야 한다.

## Fumadocs boundary

Fumadocs는 **Site presentation/content processing**의 주요 재사용 후보이며, authoring에서는 custom component 주입과 structured visual editing의 편의 때문에 Obsidian과 비교 중인 후보다.

- Fumadocs UI/Core/MDX가 Site의 layout, search, Markdown/MDX processing, built-in/custom components를 단순화하면 우선 활용한다.
- Fumadocs Editor는 files를 source of truth로 유지하고 custom component specs를 제공하므로 Oomia-specific component authoring이 늘어날 경우 중요한 이점이 될 수 있다.
- Obsidian 기반 기존 corpus의 일반 authoring 호환성은 이미 확보되어 있으므로 1.0 spike의 초점은 Fumadocs integration과 editor 역할 결정에 둔다.
- Fumadocs Editor를 1.0 필수 editor로 미리 확정하지 않는다.

Fumadocs 자체 API가 canonical content contract는 아니다. canonical source와 docs layout은 editor 선택과 분리한다.

## Component contract

official/custom component 지원은 다음 순서로 판단한다.

1. Fumadocs built-in component로 요구사항을 충족할 수 있는지 확인한다.
2. built-in component라면 Engine/Fumadocs Editor/Site에서 필요한 integration만 구성한다.
3. custom component가 필요하면 canonical source에서 사용할 이름·props·children policy를 명시한다.
4. Engine authoring spec과 Site renderer가 동일 계약을 공유해야 할 정도가 되면 machine-readable profile 또는 shared package를 도입한다.
5. Visual adapter 유무와 Publishability를 동일시하지 않는다.

[Content Component Manifest Schema](content-component-schema.md)는 custom component 공유가 실제로 필요해질 때 사용할 수 있는 planning vocabulary로 유지하되 1.0 bootstrap의 필수 artifact는 아니다.

## Contract surfaces

| Surface | 소유 위치 |
|---|---|
| Content workspace / authoring / storage / publish 정책 | knowledge repository |
| Metadata enrichment / publishable projection contract | [Publishable Projection](publishable-projection.md) |
| Canonical content revision | `oomia.github.io.docs` Git history |
| Workspace validation / Git / publish orchestration | engine |
| Authoring UX | editor selection 미확정: Obsidian primary candidate, Fumadocs Editor component-aware candidate, IDE/Agent source client |
| Authoring/Site integration | shared filesystem source + 필요한 parser/remark/rehype/plugin adapters |
| final rendering / consumer compatibility | site |
| custom component shared contract | 필요 시 별도 profile/package |
| 구현별 API·테스트·runtime details | 해당 구현 repository |

Engine을 container image로 배포하는 방향은 이 architecture와 정합적이다. container는 실행 환경이고 canonical state는 mount된 Git-backed content workspace에 남긴다.
