# Architecture

상태: 2026-09-21 Git-backed content workspace와 Obsidian + Fumadocs Editor authoring 모델을 반영.

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
| `oomia.github.io.docs` | canonical Markdown/MDX content와 metadata/assets의 durable Git remote 및 shared revision history |
| `oomia.github.io` | docs repository의 canonical content revision을 소비해 사이트를 빌드하고 GitHub Pages로 전달 |
| `oomia.github.io.knowledge` | 제품·아키텍처·계획 계약의 canonical knowledge |

`mono`는 사용자가 Site repository에 붙인 로컬 별칭이며 실제 원격 repository 이름의 일부가 아니다.

## Canonical content workspace

1.0의 canonical content representation은 **Git-backed filesystem workspace**다.

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
- Article body는 Markdown/MDX source 자체다.
- title, description, author, draft 등 문서 단위 metadata는 1.0에서 frontmatter를 canonical representation으로 사용한다.
- asset은 content workspace에서 참조 가능한 파일 또는 명시적으로 허용된 durable external reference로 관리한다. 상세 asset policy는 별도 contract로 발전시킬 수 있다.
- Git history가 content revision history, diff, rollback의 기본 수단이다.
- PostgreSQL/Payload state를 canonical content로 사용하지 않는다.

## Authoring boundary

Obsidian과 Fumadocs Editor는 같은 canonical workspace를 바라보는 서로 다른 authoring client다.

```text
                   Git-backed content workspace
                         /               \
                        /                 \
                 Obsidian             Fumadocs Editor
              source/file UX          visual MDX UX
                        \                 /
                         \               /
                           Engine shell
                   validate / publish / Git
```

- **Obsidian**은 file navigation, Markdown/source editing, frontmatter Properties 등 source-oriented authoring을 담당할 수 있다.
- **Fumadocs Editor**는 지원되는 Markdown/MDX와 component를 구조적으로 편집하는 visual authoring surface다.
- 두 client는 별도의 content database를 유지하지 않고 동일한 filesystem source를 수정한다.
- Visual Editor가 표현하지 못하는 source는 Obsidian 또는 다른 source editor에서 그대로 유지할 수 있어야 한다.
- 특정 authoring client가 지원하지 않는 syntax를 canonical workspace에서 삭제하거나 제한하는 근거로 사용하지 않는다.
- Engine은 full CMS를 재구현하지 않는다. 필요한 경우 file discovery, create/rename/delete, validation, Git/publish action 같은 얇은 workspace shell만 제공한다.

## Engine boundary

Engine의 1.0 목표는 DB-backed CMS가 아니라 **containerizable workspace orchestrator**다.

```text
Engine container
├─ workspace discovery
├─ content/frontmatter validation
├─ optional Fumadocs Editor integration
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

Fumadocs는 현재 두 책임에서 우선 재사용한다.

1. **Fumadocs Editor**: visual Markdown/MDX authoring.
2. **Fumadocs UI / content tooling**: Site에서 문서/content rendering과 관련 기능을 구현할 때 우선 고려하는 presentation layer.

Fumadocs 자체 API가 canonical content contract는 아니다. canonical source는 Markdown/MDX + frontmatter/filesystem contract다.

built-in component는 우선 그대로 사용하고, 실제 custom component가 필요해질 때만 별도 shared profile/adapter를 추가한다. 과거 계획했던 독립 `@oomia/content-components` React component library는 1.0 선행 과제가 아니다.

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
| Visual MDX authoring | Fumadocs Editor integration |
| Source-oriented authoring | Obsidian / filesystem clients |
| final rendering / consumer compatibility | site |
| custom component shared contract | 필요 시 별도 profile/package |
| 구현별 API·테스트·runtime details | 해당 구현 repository |

Engine을 container image로 배포하는 방향은 이 architecture와 정합적이다. container는 실행 환경이고 canonical state는 mount된 Git-backed content workspace에 남긴다.
