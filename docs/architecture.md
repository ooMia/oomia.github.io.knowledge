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
| `oomia.github.io.docs` | 변형 가능한 document directory/tree와 assets의 durable Git remote 및 shared revision history. consumer별 path convention은 허용하지만 repository 자체의 고정 application schema는 강제하지 않음 |
| `oomia.github.io` | docs repository의 canonical content revision을 소비해 사이트를 빌드하고 GitHub Pages로 전달 |
| `oomia.github.io.knowledge` | 제품·아키텍처·계획 계약의 canonical knowledge |

`mono`는 사용자가 Site repository에 붙인 로컬 별칭이며 실제 원격 repository 이름의 일부가 아니다.

## Canonical content workspace

1.0의 canonical content representation은 **Git-backed filesystem document workspace**다. docs repository는 특정 framework나 route 구조를 위해 설계된 고정 `content/` tree가 아니라, 다양한 Markdown-like 문서와 관련 자산을 담을 수 있는 유연한 directory tree다.

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
- 일반적인 publishable document는 Markdown/MDX와 frontmatter를 사용할 수 있지만 모든 docs path가 Article schema를 따라야 하는 것은 아니다.
- consumer가 필요하면 특정 subtree/path에 frontmatter 또는 naming convention을 요구할 수 있다. 이 규약은 consumer contract이지 docs repository 전체의 절대 layout contract가 아니다.
- asset은 workspace에서 참조 가능한 파일 또는 명시적으로 허용된 durable external reference로 관리한다. 상세 asset policy는 별도 contract로 발전시킬 수 있다.
- Git history가 content revision history, diff, rollback의 기본 수단이다.
- PostgreSQL/Payload state를 canonical content로 사용하지 않는다.

## Authoring boundary

authoring client 선택은 아직 확정하지 않는다. 현재 핵심은 특정 Editor를 제품 경계로 고정하는 것이 아니라 **동일한 자유로운 docs workspace를 여러 authoring/rendering tool이 손실 없이 공유하는 integration framework**를 검증하는 것이다.

```text
                         Git-backed docs workspace
                      /              |              \
                     /               |               \
               Obsidian        Fumadocs Editor      IDE / Agent
             broad file UX      MDX-aware visual      source UX
                     \               |               /
                      \              |              /
                          integration boundary
                                |
                                v
                           Site consumer
```

- **Obsidian**은 현재 primary editor 후보다. file navigation, Markdown/source editing, Properties/frontmatter, Live Preview, CSS snippets/theme/plugin ecosystem을 활용할 수 있다.
- **Fumadocs Editor**는 MDX와 Fumadocs/custom component를 구조적으로 visual-edit하는 데 강점이 있는 후보다. editor 자체가 필수 architecture component라는 뜻은 아니다.
- Obsidian의 CSS snippets와 custom callout은 스타일/Markdown primitive 확장에는 충분히 강력하지만, CSS만으로 arbitrary MDX/JSX component semantics를 구현하지는 못한다. 필요한 경우 Obsidian plugin Markdown post-processing 같은 별도 extension이 필요하다.
- 따라서 가능한 경우 portable Markdown/Obsidian-friendly syntax를 canonical source로 두고 Site/Fumadocs 쪽 remark/rehype transformation으로 richer UI를 만드는 경로를 우선 검토한다.
- 특정 authoring client가 지원하지 않는 syntax를 canonical workspace에서 삭제하거나 제한하는 근거로 사용하지 않는다.
- 실제 editor 선정은 기존 content corpus를 import한 integration spike에서 authoring UX, component extensibility, source preservation, Site rendering 비용을 비교한 뒤 확정한다.
- Engine은 full CMS나 editor framework를 재구현하지 않는다.

## Engine boundary

Engine의 1.0 목표는 DB-backed CMS가 아니라 **containerizable workspace orchestrator**다.

```text
Engine container
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

- Engine image 자체의 ephemeral filesystem을 canonical storage로 사용하지 않는다.
- content repository는 host bind mount 또는 durable volume로 Engine에 제공한다.
- application-level user/database/auth model은 1.0의 필수조건이 아니다. 외부 공개가 필요해질 때 별도 access boundary를 추가한다.
- 검색·인덱싱·복잡한 query가 필요해지면 DB를 **derived index**로 추가할 수 있지만 canonical source를 대체하지 않는다.
- Payload, PostgreSQL, Lexical 기반 `cms-lab` 구현은 기존 실험/legacy Evidence로 취급하며 새 target architecture의 전제가 아니다.

## Publishing boundary

Publishing은 더 이상 DB state를 generated Markdown으로 변환하는 작업이 아니다.

```text
local content workspace
        ↓
content / frontmatter / component validation
        ↓
Site sync / typecheck / build
        ↓
git commit + push to oomia.github.io.docs
        ↓
canonical docs revision
        ↓
Site revision linkage / delivery
```

- source content 자체가 이미 publishable document form이므로 별도 DB → docs projection은 제거한다.
- publish 과정은 source를 의미 없이 재작성하지 않고 **검증 + revision 확정 + delivery linkage**에 집중한다.
- `oomia.github.io.docs`의 commit SHA가 published content revision의 핵심 Evidence다.
- Site가 실제 docs revision을 소비해 성공적으로 빌드되는지가 최종 Publishability gate의 일부다.
- 동일 content revision의 재발행이 필요한 경우 idempotent하게 처리할 수 있어야 한다.

## Fumadocs boundary

Fumadocs는 **Site presentation/content processing**에서는 적극적인 재사용 후보이고, **authoring editor**로서는 Obsidian과 비교 중인 후보다.

- Fumadocs UI/Core/MDX가 Site의 layout, search, Markdown/MDX processing, built-in components를 단순화하면 우선 활용한다.
- Fumadocs MDX는 custom remark/rehype plugin을 허용하므로, Obsidian-friendly source syntax를 Site에서 richer component로 변환하는 adapter layer를 만들 수 있다.
- Fumadocs Editor는 files를 source of truth로 유지하고 custom component specs를 제공하므로 component-aware visual editing이 실제 요구가 될 때 가치가 크다.
- 반면 일반 document/file authoring과 styling만 필요하다면 Obsidian의 Live Preview, CSS snippets, custom callout, plugin ecosystem으로 충분할 수 있다.
- 따라서 Fumadocs Editor를 1.0 필수 editor로 두지 않는다. Site integration과 Editor selection을 서로 분리해 판단한다.

Fumadocs 자체 API가 canonical content contract는 아니다. canonical source는 자유로운 filesystem document tree와 consumer별 최소 contract다.

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
| Canonical content revision | `oomia.github.io.docs` Git history |
| Workspace validation / Git / publish orchestration | engine |
| Authoring UX | editor selection 미확정: Obsidian primary candidate, Fumadocs Editor component-aware candidate, IDE/Agent source client |
| Authoring/Site integration | shared filesystem source + 필요한 parser/remark/rehype/plugin adapters |
| final rendering / consumer compatibility | site |
| custom component shared contract | 필요 시 별도 profile/package |
| 구현별 API·테스트·runtime details | 해당 구현 repository |

Engine을 container image로 배포하는 방향은 이 architecture와 정합적이다. container는 실행 환경이고 canonical state는 mount된 Git-backed content workspace에 남긴다.
