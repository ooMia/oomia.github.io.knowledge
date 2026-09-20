# Publishing Platform — Chat Context Bundle

GENERATED FILE — 원본은 각 문서 경계에 적힌 경로입니다. 직접 수정하지 마세요.
Implementation Map은 문서에 적힌 repository revision의 검증 스냅샷이며 live Project 상태가 아닙니다.
상대 링크는 원본 레포 기준입니다. JSON Schema와 템플릿은 별도로 참조하며, provenance에는 raw transcript가 아닌 source/turn metadata만 포함됩니다.


---

<!-- BEGIN SOURCE: CONTEXT.md -->

# Context entry point

## 먼저 이해할 것

이 저장소는 Publishing Platform의 제품·아키텍처·계획 지식에 대한 canonical source다. 설계가 존재한다는 사실과 구현 완료를 구분한다.

콘텐츠 작업에서는 특히 다음 원칙을 먼저 적용한다.

- canonical Article content는 Git-backed local filesystem workspace의 Markdown/MDX + frontmatter/assets로 보존한다.
- local working tree는 authoring/draft state이며, 공유·재현 가능한 durable canonical revision은 `ooMia/oomia.github.io.docs` Git commit이다.
- Obsidian과 Fumadocs Editor는 동일 content workspace를 편집하는 authoring client다.
- Engine은 DB-backed CMS가 아니라 workspace validation / Git / publishing orchestration을 담당하는 containerizable runtime을 목표로 한다.
- storage / visual editing / publishing / presentation 가능성을 동일시하지 않는다.
- Fumadocs built-in component/tooling을 우선 재사용하며 custom component/shared package는 실제 필요가 생길 때만 도입한다.
- 실제 구현 수준은 Implementation Map (`docs/implementation-map.md`)의 기준 revision과 책임 레포 Evidence로 판정한다.

확정 수준은 Provenance (`provenance/README.md`), 남은 결정은 Open Questions (`docs/open-questions.md`)을 따른다. 이전 작업을 이어받는 경우에는 먼저 Current Handoff (`handoff/current.md`)를 읽되, handoff는 volatile checkpoint이며 canonical policy가 아님을 전제로 한다.

## 작업별 읽기

| 작업 | 읽을 문서 |
|---|---|
| 이전 세션 이어받기 | Current Handoff (`handoff/current.md`) → 필요한 canonical 문서와 live GitHub 상태 재검증 |
| 전체 이해 | Architecture (`docs/architecture.md`), Release 1.0 (`docs/release-1.0.md`) |
| Markdown/MDX authoring·storage·publish 정책 | Content Authoring & Publishing Contract (`docs/content-authoring-contract.md`) |
| custom MDX component profile/manifest | Content Component Manifest Schema (`docs/content-component-schema.md`), JSON Schema (`schemas/content-component-manifest.schema.json`) |
| 현재 1.0 구현 수준·migration gap | Implementation Map (`docs/implementation-map.md`) → 기준 revision의 구현 레포 코드·테스트 |
| Item 작성·분류·완료 검토 | Planning (`docs/planning-model.md`), Fields (`docs/fields.md`), 관련 release, 실제 Item의 Outcome/AC/Evidence |
| Issue activation / Project field / Development branch 자동화 | Project Orchestration (`docs/project-orchestration.md`), Planning (`docs/planning-model.md`) |
| 구현 논의 | Architecture → 관련 contract → Implementation Map → 소유 레포의 최신 문서·코드·테스트 |
| 주간 계획·발표 | Operating Rhythm (`docs/operating-rhythm.md`), 실제 Project Status Update, 실제 Evidence |
| 설계 수정 | 해당 원본 문서, Decisions (`docs/decisions.md`), CONTRIBUTING (`CONTRIBUTING.md`) |
| GitHub Project README 정리 | Project README 템플릿 (`templates/project-readme.md`) |
| 과거 발언 확인 | Provenance (`provenance/README.md`)의 source/turn metadata → 필요 시 원본 대화 링크 |

## Agent 작업 원칙

Content 관련 구현을 계획하거나 수정할 때:

1. PostgreSQL/Payload 같은 특정 persistence/CMS 구현을 canonical content requirement로 확대하지 않는다.
2. content file과 frontmatter를 직접 다루는 Git-backed workspace contract를 우선한다.
3. Fumadocs Editor가 표현하지 못하는 syntax를 삭제/정규화해서 손실시키기보다 Obsidian/IDE Source path를 유지한다.
4. uncommitted working tree와 committed docs canonical revision을 구분한다.
5. publish는 DB export보다 validation / Git revision / Site consumer verification에 집중한다.
6. Fumadocs built-in component를 우선 사용하고 custom wrapper/library를 불필요하게 만들지 않는다.
7. TypeScript type이나 editor spec만으로 Publishability가 증명된다고 가정하지 않는다. 최종 Site consumer 검증을 포함한다.
8. legacy Payload/PostgreSQL code의 성공 Evidence를 새 target architecture 완료로 해석하지 않는다.

## 프로젝트 협업·응답 원칙

이 프로젝트의 Chat/Agent 세션은 아래 협업 규칙을 공통으로 적용한다. 사용자가 특정 지침을 **프로젝트 전체 세션에 적용**한다고 명시하면 현재 대화에만 묶어두지 않고 이 문서 또는 해당 규칙의 owning canonical 문서에 반영한다.

1. 작업은 검증 가능한 작은 단계로 나눈다. 한 번에 지나치게 많은 live 변경을 묶지 않고, 의미 있는 단계가 끝날 때 상태를 검증해 보고한 뒤 다음 단계로 진행한다.
2. 실제 사용자 선택이 필요한 분기점에서는 그 선택에 의존하는 변경을 진행하지 않고 멈춘다. 판단에 필요한 사실과 선택지를 제시하고 사용자 결정을 기다린다. 이미 확정된 규칙으로 결정할 수 있는 사안은 불필요하게 다시 묻지 않는다.
3. GitHub 관련 핵심 객체의 주소를 알고 있다면 답변에서 **처음 소개할 때 plain text 식별자만 쓰지 말고 클릭 가능한 링크로 제시한다.** 대상에는 repository, GitHub Project, Issue, Pull Request, branch, commit, workflow run/artifact 등 작업 이해에 직접 필요한 객체가 포함된다. 이후 같은 답변에서 문맥이 명확하면 짧은 이름이나 번호로 다시 언급할 수 있다.
4. 현재 작업 결과에 영향을 주지 않는 주변 metadata나 live field 검증은 본 작업의 blocker로 만들지 않는다. 필요하면 deferred verification으로 기록하고 핵심 작업을 계속한다.
5. 세션별 임시 상태는 `handoff/current.md`에 두되, 여러 세션에 지속 적용할 사용자 작업 방식·응답 방식은 volatile handoff가 아니라 durable context에 둔다.

## 사용할 요청 예시

> Git-backed Content Authoring Contract에 따라 이 Markdown/MDX 표현의 Editing, Storage, Publishing 수준을 판정하고 필요한 구현 delta를 나눠줘.

> Implementation Map 기준 revision보다 구현 레포가 진행되었는지 확인하고, filesystem workspace target에 대한 1.0 capability 상태를 갱신해줘.

> Fumadocs built-in으로 해결 가능한지 먼저 확인하고, custom component가 정말 필요할 때만 Engine editor spec과 Site renderer contract를 분리해줘.

> 이 설계 변경을 원본 문서에 반영하고, 영향받는 규칙과 미결 사항을 확인한 뒤 통합 문서를 다시 생성해줘.

세션을 종료하기 전에는 장기적으로 남아야 할 결정과 정책을 먼저 owning canonical 문서에 반영하고, 아직 진행 중인 live 상태와 다음 안전한 행동만 `handoff/current.md`에 남긴다. handoff는 매번 overwrite하며 과거 세션 로그를 누적하지 않는다. raw conversation transcript는 Knowledge에 복제하지 않고 provenance에는 source/turn metadata만 유지한다.

설계 정의 Item의 Evidence에는 canonical 문서의 immutable commit/permalink를 사용할 수 있다. 기능 구현·배포 Item은 구현 레포의 재현 가능한 Evidence가 별도로 필요하다.

<!-- END SOURCE: CONTEXT.md -->


---

<!-- BEGIN SOURCE: docs/architecture.md -->

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

Content Component Manifest Schema (`docs/content-component-schema.md`)는 custom component 공유가 실제로 필요해질 때 사용할 수 있는 planning vocabulary로 유지하되 1.0 bootstrap의 필수 artifact는 아니다.

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

<!-- END SOURCE: docs/architecture.md -->


---

<!-- BEGIN SOURCE: docs/content-authoring-contract.md -->

# Content Authoring & Publishing Contract

상태: 2026-09-21 Git-backed filesystem workspace + Obsidian + Fumadocs Editor architecture를 canonical policy로 반영.

## 목적

Publishing Platform의 canonical content는 특정 CMS, database, Visual Editor의 내부 표현에 종속되지 않는다.

공식 정책:

> Canonical content는 Markdown/MDX + frontmatter/assets로 구성된 Git-backed filesystem workspace에 보존한다. Obsidian과 Fumadocs Editor는 동일 source를 편집하는 authoring client이며, durable shared canonical revision은 `oomia.github.io.docs` Git commit으로 식별한다. Publishability는 특정 editor의 round-trip 가능 여부가 아니라 content contract와 실제 Site consumer 검증으로 판정한다.

이 문서는 **Editing, Storage, Canonical Revision, Publishing**을 분리해 정의한다.

## Editing

| 수준 | 보장 |
|---|---|
| Visual | Fumadocs Editor 등 구조화된 visual authoring surface에서 생성·수정할 수 있다. |
| Source | Obsidian, IDE, Agent 등 source-oriented client에서 raw Markdown/MDX를 손실 없이 수정할 수 있다. |
| Unsupported | 특정 authoring client에서는 편집하지 못하지만 canonical source 자체가 반드시 거부되는 것은 아니다. |

Visual 지원 실패가 content 지원 실패를 뜻하지 않는다.

- Fumadocs Editor가 무손실로 표현하지 못하는 source는 Obsidian/IDE 등 source client에서 유지할 수 있어야 한다.
- 외부 editor에서 수정한 source를 Visual Editor가 다시 열었을 때 표현 불가능한 내용을 조용히 삭제하거나 재작성해서는 안 된다.
- 최종 Site와 동일한 WYSIWYG preview는 authoring contract의 필수조건이 아니다.

## Storage

| 수준 | 보장 |
|---|---|
| Exact | source-oriented client가 저장한 Markdown/MDX bytes와 의미 있는 frontmatter를 불필요하게 재작성하지 않는다. |
| Normalized | Visual Editor에서 실제 content를 수정한 경우 해당 editor가 의미를 유지하는 범위에서 source formatting을 정규화할 수 있다. |
| Reject | workspace/file contract 자체를 만족하지 못하거나 안전하게 파일로 보존할 수 없는 경우에만 저장을 거부한다. |

기본 원칙:

- Obsidian/IDE/Agent 같은 Source editing은 **Exact**를 우선한다.
- Fumadocs Editor에서 실제 수정한 부분은 **Normalized 허용**이다.
- Markdown/MDX 문법 오류나 현재 Site가 지원하지 않는 expression은 draft file로 저장할 수 있고 publish 단계에서 Blocked될 수 있다.
- storage contract는 DB schema나 rich-text serialization compatibility를 요구하지 않는다.

## Canonical revision

canonical content의 물리적 표현은 local Git working tree의 files다.

- Markdown/MDX body는 파일 내용 자체다.
- title, description, author, draft 등 문서 metadata는 1.0에서 YAML frontmatter를 canonical representation으로 사용한다.
- asset은 workspace-relative file 또는 정책상 허용된 durable external reference로 표현한다.
- uncommitted working tree는 작성 중 draft state다.
- 다른 환경과 공유·재현하는 durable canonical state는 `ooMia/oomia.github.io.docs`의 commit SHA다.
- Git commit/history가 기본 revision, diff, rollback, provenance mechanism이다.

따라서 `oomia.github.io.docs`는 generated projection이 아니라 **canonical content remote**다.

## Publishing

| 수준 | 보장 |
|---|---|
| Publishable | 현재 workspace content가 validation과 실제 Site consumer 검증을 통과하고 canonical docs revision으로 확정될 수 있다. |
| Blocked | source는 workspace에 보존되지만 현재 publishing contract를 만족하지 않는다. 실패 이유를 관찰 가능하게 제공한다. |

Visual editing compatibility는 Publishability의 필수조건이 아니다.

목표 흐름:

```text
local Git working tree
        ↓
source / frontmatter / component validation
        ↓
Site sync / typecheck / build
        ↓
git commit + push
        ↓
oomia.github.io.docs canonical revision
        ↓
Site revision linkage / delivery
```

Publishing은 DB snapshot을 Markdown으로 export하는 transformation이 아니다. canonical source가 이미 Markdown/MDX이므로 **validation, revision finalization, consumer verification**이 핵심이다.

## 1.0 목표 정책 테이블

| 콘텐츠 유형 | Editing | Storage | Publishing | 1.0 기본 정책 |
|---|---|---|---|---|
| 기본 Markdown | Visual + Source | Exact / Normalized | Publishable | Obsidian과 Fumadocs Editor가 같은 file을 편집할 수 있어야 한다. |
| 일반 GFM table | Visual 또는 Source | Exact / Normalized | Publishable | Visual 지원 수준이 source 보존 범위를 제한하지 않는다. |
| Fumadocs Editor가 표현하지 못하는 Markdown | Source | Exact | Publishable | 실제 Site가 지원하면 발행할 수 있다. |
| 임의 code fence language | Visual 또는 Source | Exact | Publishable | syntax highlighting 지원 여부와 storage/publishability를 분리한다. |
| 일반 Markdown image | Visual 또는 Source | Exact | Publishable | 별도 Media DB object로 강제 변환하지 않는다. |
| workspace-relative asset | Visual 또는 Source | Exact | Publishable | repository portability와 Site asset resolution contract를 따라야 한다. |
| durable external asset URL | Visual 또는 Source | Exact | Publishable | 허용 scheme/domain과 portability policy를 따른다. |
| raw HTML | Source | Exact | Site policy에 따라 Publishable/Blocked | Visual 지원과 실행 허용을 분리한다. |
| Fumadocs built-in MDX component | Visual 또는 Source | Exact / Normalized | Publishable | Fumadocs Editor/Site 지원을 우선 활용한다. |
| custom MDX component + visual spec | Visual | Normalized | Publishable | 명시된 component contract와 Site consumer 검증을 통과해야 한다. |
| custom MDX component + visual spec 없음 | Source | Exact | Publishable 가능 | visual adapter 부재만으로 차단하지 않는다. |
| contract에 없는 MDX component | Source | Exact | Blocked | source는 보존하되 현재 Site contract가 없으면 발행하지 않는다. |
| 잘못된 component props | Source | Exact | Blocked | file 저장과 publish validation을 분리한다. |
| arbitrary JavaScript expression | Source | Exact | Blocked by default | 명시적 지원 계약 전에는 executable content를 publish contract 밖에 둔다. |
| 문서 내부 임의 import/export | Source | Exact | Blocked by default | document별 arbitrary dependency를 기본 허용하지 않는다. |
| 문법 오류가 있는 draft | Source | Exact | Blocked | draft source는 저장 가능하며 publish에서 차단한다. |

## Authoring clients

### Obsidian

Obsidian은 source/file-oriented authoring client다.

- canonical workspace를 vault로 직접 열 수 있다.
- Markdown source와 YAML frontmatter를 직접 수정한다.
- file navigation, rename/create/delete, properties UX를 활용할 수 있다.
- Obsidian 전용 metadata/database를 canonical platform state로 요구하지 않는다.
- Obsidian-specific syntax/plugin 기능을 canonical syntax로 승격할 때는 Site/Fumadocs compatibility를 별도 검증한다.

### Fumadocs Editor

Fumadocs Editor는 visual MDX authoring client다.

- canonical workspace의 Markdown/MDX file을 직접 편집한다.
- 지원되는 Markdown/MDX component를 structured visual editing으로 제공한다.
- external file changes와 공존할 수 있어야 한다.
- Fumadocs Editor 내부 state는 canonical source를 대체하지 않는다.
- custom component editing이 필요한 경우 Fumadocs component spec을 우선 활용한다.

### Engine

Engine은 1.0에서 full CMS가 아니다.

- workspace discovery / file-level validation
- content/frontmatter/component validation
- Git status / revision linkage
- explicit publish action
- Site consumer verification
- 필요 시 얇은 file operation UI

를 담당한다.

Payload/PostgreSQL/Lexical 기반 CMS는 target architecture가 아니며 기존 실험/legacy implementation으로만 취급한다.

## Metadata contract

1.0 Article metadata는 frontmatter에 둔다.

최소 공통 예:

```yaml
---
title: Example
description: Optional summary
author: mia
draft: true
---
```

정확한 required/optional field schema는 implementation contract에서 정의하되, DB field와 frontmatter를 서로 변환하는 dual-SoT 모델을 만들지 않는다.

외부 source에서 import할 경우 canonical frontmatter로 normalize할 수 있지만 import adapter의 source-specific metadata를 장기 SoT로 유지하지 않는다.

## Component contract

Fumadocs built-in component를 우선 활용한다.

- built-in component의 이름/props를 그대로 canonical syntax로 사용할 수 있는 경우 불필요한 wrapper를 만들지 않는다.
- 플랫폼에서 허용할 component subset이 필요하면 supported profile을 명시한다.
- custom component가 필요하면 name / props / children / source semantics를 먼저 정의한다.
- Engine authoring spec과 Site renderer가 shared runtime contract를 필요로 할 때만 manifest 또는 shared package를 도입한다.
- 별도 `@oomia/content-components` renderer library는 1.0 필수조건이 아니다.

Content Component Manifest Schema (`schemas/content-component-manifest.schema.json`)는 custom component contract가 실제로 필요해질 때 사용할 수 있는 planning schema다.

## Publish validation 원칙

Publish validation은 editor round-trip 여부가 아니라 **현재 canonical files가 Site에서 안전하고 재현 가능하게 소비되는가**를 판정한다.

최소 검증:

1. workspace/file layout와 frontmatter schema
2. Markdown/MDX parse
3. component contract / dangerous expression policy
4. asset resolution
5. Site sync/typecheck/test/build
6. canonical docs commit과 Site revision linkage

Source를 publish 전에 visual editor codec으로 decode/encode하는 절차는 요구하지 않는다.

## 1.0 비목표

- PostgreSQL/Payload를 canonical content store로 유지
- DB migration/backup을 content revision mechanism으로 사용
- production-grade multi-user CMS
- complete WYSIWYG preview
- 모든 Markdown/MDX 표현의 Visual Editing
- arbitrary JavaScript execution in Article MDX
- 문서별 임의 module import를 기본 지원
- 모든 Site UI component를 content syntax로 노출
- custom component library를 실제 수요 전에 선행 구축

<!-- END SOURCE: docs/content-authoring-contract.md -->


---

<!-- BEGIN SOURCE: docs/content-component-schema.md -->

# Content Component Manifest Schema

상태: 2026-09-21 deferred planning draft. Fumadocs built-in components를 우선 재사용하며, custom component의 cross-repository contract가 실제로 필요해질 때 활성화한다.

## 목적

1.0에서는 Fumadocs Editor/UI가 이미 제공하는 built-in component capability를 우선 사용한다. 따라서 별도 content-component library와 manifest를 선행 구축하지 않는다.

다만 다음 상황이 생기면 machine-readable component profile이 필요할 수 있다.

- canonical MDX에 custom component를 추가한다.
- Engine/Fumadocs Editor와 Site가 같은 component semantics를 공유해야 한다.
- Agent가 component name / props / children policy를 runtime에 조사해야 한다.
- publish validation이 component contract를 programmatically 검증해야 한다.

이 경우 content-component-manifest.schema.json (`schemas/content-component-manifest.schema.json`)을 planning vocabulary로 사용할 수 있다.

## Fumadocs 우선 원칙

component 지원 순서는 다음과 같다.

1. Fumadocs built-in component로 요구사항을 충족하는지 확인한다.
2. built-in component라면 불필요한 Oomia wrapper를 만들지 않는다.
3. 플랫폼에서 허용할 subset만 명시해야 한다면 얇은 supported profile을 둔다.
4. custom component가 필요한 경우 Fumadocs Editor component spec과 Site renderer semantics를 함께 정의한다.
5. cross-repository runtime contract가 실제로 필요해질 때만 manifest/shared package를 도입한다.

과거 계획한 public `@oomia/content-components` React renderer package는 1.0 prerequisite가 아니다.

## 최소 manifest 정보

manifest가 필요해질 경우 각 component는 다음을 기술한다.

| 필드 | 의미 |
|---|---|
| name | canonical Markdown/MDX source에서 사용하는 component 이름 |
| kind | block 또는 inline |
| props | 공개 prop 이름, 타입, required 여부, enum 값 |
| children | none / text / markdown / mdx 중 허용 children model |

이 정보는 특정 renderer 구현을 설명하지 않는다.

- Fumadocs internal React tree
- CSS/theme implementation
- Astro layout
- Editor UI implementation
- deployment state

등은 manifest의 필수 contract가 아니다.

## Authoring integration

custom component가 생겼을 때:

1. canonical source syntax를 먼저 정의한다.
2. Fumadocs Editor component spec으로 visual editing 가능 범위를 정의한다.
3. Site에서 같은 source semantics를 렌더링한다.
4. Visual editing을 지원하지 못하는 source는 Obsidian/IDE 등 Source client에서 유지한다.
5. Site consumer build가 Publishability를 검증한다.

Visual adapter의 존재는 component의 canonical 지원 여부와 동일하지 않다.

## Agent/runtime 사용

manifest/profile이 필요해진 경우 Agent는 다음을 할 수 있다.

1. source에서 사용된 component를 식별한다.
2. supported profile에 존재하는지 확인한다.
3. props/children contract를 검증한다.
4. Fumadocs Editor visual spec 존재 여부와 canonical support를 분리한다.
5. publish validation에서 Site consumer compatibility를 확인한다.

## 독립 package 도입 기준

다음 중 하나 이상이 실제로 발생하기 전에는 shared npm package를 만들지 않는다.

- Engine과 Site가 같은 custom component runtime/type definition을 반복 복제한다.
- manifest/profile을 여러 repository가 package dependency로 소비할 필요가 있다.
- custom renderer implementation을 Site 외부 consumer도 재사용해야 한다.

package가 필요해지면 package name, registry, version policy를 그 시점의 요구사항에 맞춰 다시 결정한다. 과거의 `@oomia/content-components@0.1.0` bootstrap 계획을 현재 확정된 implementation requirement로 간주하지 않는다.

## Schema status

JSON Schema는 삭제하지 않고 planning artifact로 유지한다.

- 현재 1.0 release gate의 필수 artifact가 아니다.
- Fumadocs built-in component를 복제하는 catalog를 만들기 위한 용도가 아니다.
- custom component contract가 생기면 실제 source/API에 맞춰 schema를 재검증하고 필요하면 변경한다.

<!-- END SOURCE: docs/content-component-schema.md -->


---

<!-- BEGIN SOURCE: docs/planning-model.md -->

# Planning Model

상태: 사용자 제시 규칙에 최신 필드 분리와 delta 모델을 반영. 출처: S2 `d7815342`, `4a49654f`; S3 `5a382a65`, `924e880a`.

## 계획 단위

| 개념 | 정의 / 작성 규칙 |
|---|---|
| Release Goal | 릴리스가 달성할 제품 상태 한 문장. 기술·작업 나열은 Product Boundary로 분리 |
| Product Boundary | 해당 릴리스에 필요한 capability 및 제외 범위. 구현 순서가 아님 |
| Target Release | Item의 결과를 포함할 통합 제품 버전 |
| Objective | 여러 릴리스에서 반복 발전시키는 제품 결과 축 |
| Iteration Goal | 이번 Iteration에서 달라질 가장 중요한 상태 한 문장 |
| Iteration Commitment | Goal을 위해 선택한 Item 집합. 대화 기준 통상 2–5개 |
| Project Item | 독립적으로 검증 가능한 하나의 변화(delta) |
| Repository Issue | 해당 결과를 실현하는 특정 레포의 구현 단위 |

Objective와 capability 자체를 영구적으로 Done 처리하지 않는다. 이전 Item을 다음 버전용으로 복제하지 말고 새로 달라지는 결과만 Item으로 만든다. 특정 릴리스가 요구하는 capability 수준은 릴리스 기준으로 검증한다.

## Item / Issue 작성

Project Item에는 Outcome, binary하게 판정 가능한 Acceptance Criteria, Evidence를 둔다. 시스템 변경에는 직접 바뀌는 Scope를 지정하고, 계획·분류 규칙 작업에는 Scope를 비울 수 있다. 구현 레포 이름이나 프레임워크만으로 제품 결과를 정의하지 않는다.

불확실한 작업은 Draft로 포착한다. 레포 소유권과 실행 범위가 분명한 구현 작업은 Repository Issue로 구체화한다. 전역 조정 Item을 억지로 하나의 레포에 귀속하지 않는다. Issue에는 부모 Item 링크, 구현 기술, 필요한 Quality Requirements를 명시한다. 한 Iteration에 끝내기 어렵거나 독립 검증이 필요한 결과는 분해한다.

### Draft와 활성화

- 가능한 경우 GitHub Project의 native Draft Issue를 사용한다. 현재 사용하는 connector가 이를 지원하지 않으면 repository issue를 `draft:` prefix + `closed / not_planned` 상태로 보관하는 fallback을 사용할 수 있으며, 이를 native Draft와 혼동하지 않는다.
- Draft 단계에서는 implementation branch를 만들지 않는다.
- 사용자가 Draft Issue를 명시적으로 발행/활성화하면 **같은 작업에서 Development branch를 반드시 생성·연결한다.** branch 생성은 별도 사용자 요청을 기다리지 않는다.
- 활성화 시 제목의 draft 표기를 제거하고 Project Status를 `Todo`로 전환한 뒤, 실제 구현 착수 시 `In Progress`로 이동한다.
- Development branch는 실제 구현 책임을 소유하는 repository에 둔다. 하나의 Issue가 여러 구현 레포에 걸치면 1:N 관계를 명시한다.
- 코드 변경을 직접 소유하지 않는 cross-repo coordination Item은 branch를 만들지 않을 수 있다. 대신 연결된 각 repository implementation issue가 활성화되는 순간 각각의 branch를 생성한다.

- Project orchestration Action이 설치된 repository에서는 Issue 활성화 이벤트가 Project #11 등록·field 초기화·Development linked branch 생성을 수행한다. 사용자는 별도 branch 생성 요청을 반복할 필요가 없다.
- 새 Repository Issue에는 machine-readable `project-seed`를 함께 둔다. 이는 Project field의 **초기값 전달용**이며 활성화 이후의 SoT는 계속 GitHub Project다.
- Project field/option ID는 Issue나 문서에 저장하지 않고 Action이 이름으로 조회한다. schema drift가 있으면 자동화 실패로 드러내고 임의 값을 추론하지 않는다.
- 상세 동작과 PAT 설정은 Project Orchestration (`docs/project-orchestration.md`)을 따른다.

## 완료 판정

- **Acceptance Criteria**: 이번 변화가 제공해야 하는 관찰 가능한 결과.
- **Quality Requirements**: 적용되는 성능·신뢰성·품질 제약. 근거 없는 수치를 만들지 않는다.
- **Global Definition of Done**: AC 충족, 적용 품질 검증, 필요한 코드와 지속 문서 통합, 관련 자동 검사 통과, 재현 가능한 Evidence 연결.

### Evidence 규칙

Evidence는 **Item의 Outcome이 실제로 달성되었음을 재현 가능하게 보여주는 자료**다.

- 설계·계획 정의 자체가 Outcome이면 이 레포의 canonical 문서가 Evidence가 될 수 있다. `Publishing Platform 1.0 Definition`, `Project Planning Model`처럼 장기 규칙을 확정하는 Item은 관련 문서의 **immutable commit/permalink**를 연결한다.
- `main` 문서 링크는 현재 canonical reference를 찾는 데 사용하고, 완료 시점의 증거를 고정해야 할 때는 commit SHA가 포함된 permalink나 해당 변경 commit/PR을 우선한다.
- 기능 구현, 품질 검증, 실제 발행, deployment 성공은 설계 문서로 증명하지 않는다. 코드·테스트·PR/commit·실행 결과·배포 URL 등 책임 레포의 Evidence가 필요하다.
- Implementation Map (`docs/implementation-map.md`)은 여러 implementation Evidence를 1.0 capability에 대응시킨 검증 스냅샷이다. 기준 revision 이후 코드가 바뀌면 재검증하기 전까지 최신 상태라고 가정하지 않는다.

## Source of Truth

| 정보 | 소유 위치 |
|---|---|
| 제품 경계·설계 방향·계획 규칙·필드 의미·전역 DoD | 이 레포의 docs |
| 1.0 capability별 검증 스냅샷 | 이 레포의 Implementation Map (`docs/implementation-map.md`) |
| Iteration Goal 및 회고 | GitHub Project Status Update |
| Status / Iteration / Work Type / Scope / Target Release / Objective 값 | GitHub Project fields |
| Outcome / AC / Evidence | 실제 Project Item 또는 Repository Issue |
| 구현·테스트·구체적인 계약 | 책임을 소유한 구현 레포 |

GitHub Project README는 위 정보를 복제하는 원본이 아니라 **탐색용 인덱스**다. 장기 정의는 knowledge repository에 두고 Project README에는 canonical 문서 링크와 Project 운영 원칙만 남긴다.

## 릴리스와 시간

Iteration과 제품 버전은 별개다. 매주 자동으로 버전을 올리거나 Objective마다 버전을 고정 배정하지 않는다. 대화에서 0.x → 1.0 → 1.x 발전을 제안했지만 실제 버전 목록과 공개 계약의 호환성 범위는 미결이다. Definition과 Readiness는 정의/검증 활동이며 Objective나 버전 값이 아니다.

`System view`는 과거에 제안된 사용자 정의 View 이름이다. Scope별 변경 이력을 보는 `By Scope`라는 이름으로 정리하며, 실제 View가 생성되어 있다는 의미는 아니다.

<!-- END SOURCE: docs/planning-model.md -->


---

<!-- BEGIN SOURCE: docs/fields.md -->

# Project Fields

상태: 대화 기준 설계 정의. 실제 GitHub 설정을 조회한 스냅샷이 아니다. 출처: S2 `138f8f89`, `178bf729`, `82ef0a72`; S3 `5a382a65`, `f4b8c972`, `f55d6e75`.

## 필드

| 이름 | 답하는 질문 | 설계상 형태 |
|---|---|---|
| Status | 지금 어떤 작업 상태인가? | 단일 값, 실제 옵션 미확인 |
| Iteration | 언제 수행하는가? | Iteration |
| Work Type | 어떤 종류의 일인가? | 단일 선택 |
| Scope | 완료를 위해 어떤 시스템 책임이 바뀌는가? | 다중 선택 방향 |
| Target Release | 어느 통합 제품 버전에 포함할 것인가? | 단일 버전 값 |
| Objective | 어떤 지속적인 제품 결과를 발전시키는가? | 주된 결과 하나 |

## Scope

Field description:
> Platform responsibilities that must change for the item's Outcome and Acceptance Criteria to be satisfied. Select only directly affected scopes, not incidental dependencies.

판정 질문: **해당 Scope의 동작이나 계약이 전혀 바뀌지 않아도 AC를 만족할 수 있는가?** 가능하면 선택하지 않는다. 하나가 기본이며 두 책임의 독립적인 변화가 필요하면 복수 선택한다. 3개 이상이면 Item 분해를 검토한다. 관련 레포, 사용 기술, 단순 의존성을 태그로 붙이지 않는다.

| Option | Description |
|---|---|
| Content | Article semantics, authoring, validation, and user/developer-facing content operations. |
| Persistence | Durable storage, retrieval, consistency, and lifecycle of canonical platform state. |
| Automation | Agent-assisted, scheduled, triggered, or background execution of platform workflows. |
| Publishing | Deterministic transformation of canonical content into contracted publishable documents. |
| Presentation | Rendering, composition, navigation, and visual presentation of publishable content as a user-facing site. |
| Delivery | Propagation, deployment, and verification of validated site output in the live environment. |

예: 기존 DB를 읽어 export 로직만 개선하면 Publishing. API 수정 기능과 영속화 계약을 함께 추가하면 Content + Persistence. 기존 build 결과를 배포하는 경로만 바꾸면 Delivery. 단순 수동 CLI 호출은 자동으로 Automation에 해당하지 않는다.

최신 Scope 제안은 6개 옵션과 다중 선택이다. 사용자가 초기에 확인한 옵션은 Delivery를 제외한 5개였으므로 Delivery의 실제 등록 여부와 다중 선택 적용 여부는 미확인이다.

## Objective

Field description:
> Select the Objective that best represents the primary product outcome advanced by this item, based on its Outcome and Acceptance Criteria rather than its implementation area or dependencies.

사용자가 최신 메시지에서 실제 필드에 존재한다고 제시한 5개 옵션을 유지한다. 아래 description은 그 메시지에 대한 최신 제안이다.

| Option | Description |
|---|---|
| Authoring Experience | Select when the item improves how authors create, edit, inspect, or validate content through tooling or user-facing authoring interactions. |
| Canonical Content | Select when the item improves the authoritative content model, persistence, lifecycle, or rules governing canonical state. |
| Publishable Projection | Select when the item improves how canonical content is deterministically transformed into publishable artifacts. |
| Extensible Workflow | Select when the item adds or improves supported extension points, custom logic, components, or automation in the publishing workflow. |
| Live Delivery | Select when the item improves how publishable artifacts are rendered, deployed, or propagated to the live user-facing site. |

Authoring Experience는 CMS UI에 한정되지 않는다. CLI, IDE, form, agent-assisted authoring도 포함할 수 있다. Scope는 책임 영역, Objective는 개선된 제품 결과이므로 서로 일대일 대응하지 않는다.

## Work Type

이름은 사용자가 `Category`에서 `Work Type`으로 정정했다. 옵션은 대화에 나온 5개를 보존한다. 아래 짧은 선택 설명은 이번 정리에서 편집한 요약이며 실제 필드 description의 복제본이 아니다.

| Option | 선택 기준 |
|---|---|
| Feature | 사용 가능한 새로운 기능 또는 동작 개선을 제공한다. |
| Experiment | 불확실한 가설을 검증하고 관찰 결과를 남긴다. |
| Decision | 대안을 판단하고 선택한 방향과 이유를 확정한다. |
| Documentation | 지속적으로 참조할 지식과 설명을 정리한다. |
| Maintenance | 기존 시스템의 유지·정비를 수행한다. |

작업의 주된 결과를 기준으로 하나를 고른다. `Validation` 추가는 대화에서 보류된 제안이며 기본 옵션에 넣지 않는다.

## Target Release

`1.0.0`처럼 통합 버전만 사용한다. `1.0 / Canonical Content` 같은 버전+목표 결합 값은 사용하지 않는다. 하나의 릴리스에 여러 Objective가 포함되고 동일 Objective가 여러 릴리스에서 발전할 수 있다. 실제 릴리스 옵션과 Item별 할당은 Project에서 확인한다.

<!-- END SOURCE: docs/fields.md -->


---

<!-- BEGIN SOURCE: docs/release-1.0.md -->

# Publishing Platform 1.0

상태: 2026-09-21 Git-backed content workspace와 Obsidian + Fumadocs Editor authoring 모델을 반영한 1.0 제품 경계.

## Release Goal

Deliver a usable and extensible workflow for authoring Git-backed Markdown/MDX content and publishing a verified canonical revision to a live site.

## Product Boundary

| Capability | 요구되는 관찰 가능한 결과 |
|---|---|
| Authoring | Obsidian과 Fumadocs Editor가 같은 local content workspace를 편집할 수 있다. Visual Editor가 표현하지 못하는 source는 Obsidian/IDE 등 Source path에서 손실 없이 유지할 수 있다. |
| Canonical Content | Markdown/MDX body, frontmatter metadata, assets가 Git-backed filesystem workspace에 존재한다. 공유·재현 가능한 canonical state는 `oomia.github.io.docs` Git commit으로 식별된다. |
| Extensibility | Fumadocs built-in content component를 우선 재사용하고 custom component가 필요한 경우 source semantics와 editor/renderer integration을 명시할 수 있다. Visual adapter 유무가 canonical support를 결정하지 않는다. |
| Automation | 최소 하나의 automated 또는 agent-assisted workflow가 validation, Git revision finalization, publish 또는 delivery process에 참여한다. |
| Publishing | local workspace를 검증하고 실제 Site consumer build를 통과시킨 뒤 canonical docs revision으로 확정한다. DB → Markdown export나 Visual Editor codec round-trip을 publish prerequisite로 요구하지 않는다. |
| Presentation | Site가 canonical docs revision의 Markdown/MDX를 렌더링한다. Fumadocs UI/content tooling을 우선 재사용하되 Site framework 자체는 implementation detail이다. |
| Delivery | 검증된 canonical docs revision이 Site revision과 연결되어 GitHub Pages에 배포되고 성공 Evidence를 남길 수 있다. |

세부 Markdown/MDX 지원 수준은 Content Authoring & Publishing Contract (`docs/content-authoring-contract.md`)가 소유한다.

## 1.0 Target Architecture

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

Engine은 workspace validation, Git/publish orchestration, Site consumer verification을 담당하는 containerizable tool/runtime이다.

## 명시적 제외 범위

- PostgreSQL/Payload를 canonical content store로 유지
- canonical database backup / restore
- production-grade multi-user CMS, RBAC, transactional collaborative editing
- advanced agent orchestration
- complete WYSIWYG preview
- 모든 Markdown/MDX 표현의 Visual Editing
- arbitrary JavaScript execution 또는 문서별 임의 module import를 기본 MDX contract로 지원
- Fumadocs built-in으로 충분한 component를 자체 library로 재구현
- custom content-component npm package를 실제 공유 수요 전에 선행 구축
- derived search/index DB를 1.0 필수 persistence로 도입

## 검증

각 capability의 요구 수준을 실제 구현과 대조하고 재현 가능한 Evidence를 연결한다. 부분 구현·완료·미검증을 구분한다. 모든 capability를 이름 그대로 Item으로 생성하지 말고, 발견된 gap에 대해 독립적인 delta Item을 만든다.

현재 검증 스냅샷과 기준 revision은 Implementation Map (`docs/implementation-map.md`)에 둔다.

2026-09-21 Product Boundary가 Payload/PostgreSQL 기반 CMS에서 Git-backed filesystem workspace로 변경되었다. 따라서 기존 Payload E2E와 DB publishing Evidence는 역사적 구현 Evidence로는 유효하지만 **현재 1.0 target 충족 Evidence로 자동 승계되지 않는다.** 상태 변화는 regression이 아니라 target architecture 변경에 따른 재평가일 수 있다.

이 문서 자체는 **1.0 Definition을 확정하는 설계 Item의 Evidence**가 될 수 있지만, 1.0 구현 완료 Evidence는 아니다. 실제 구현 상태는 Implementation Map과 책임 레포의 immutable Evidence로 판정한다.

<!-- END SOURCE: docs/release-1.0.md -->


---

<!-- BEGIN SOURCE: docs/implementation-map.md -->

# Implementation Map

기준일: 2026-09-21. 이 문서는 Publishing Platform 1.0의 **현재 Product Boundary**를 기존 검증 revision과 대조한 revision-bound snapshot이다.

2026-09-21 target architecture가 Payload/PostgreSQL 기반 CMS에서 **Git-backed filesystem workspace + Obsidian + Fumadocs Editor**로 변경되었다. 아래 기존 구현 revision은 역사적/재사용 가능 Evidence이며 새 target을 자동 충족하지 않는다.

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
Obsidian / Fumadocs Editor
          ↓
local Git content workspace
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
| Authoring | **미충족** | Payload Admin에서 visual create/edit/save가 E2E로 검증된 legacy implementation은 존재한다. [e2e.ts](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/scripts/e2e.ts) | 동일 Git workspace를 Obsidian과 Fumadocs Editor에서 편집하는 workflow, external edit interoperability, source fallback을 검증해야 한다. Payload Admin 성공은 새 target 완료 Evidence가 아니다. |
| Canonical Content | **부분 충족** | docs repository에는 실제 Markdown/MDX files와 Git history가 있고 Site가 이를 소비할 수 있다. 기존 Engine DB에도 raw body string 보존 Evidence가 있다. | authority를 PostgreSQL에서 docs-backed Git workspace로 이동해야 한다. frontmatter metadata, workspace layout, Git revision semantics를 구현하고 DB dual-SoT를 제거해야 한다. |
| Extensibility | **부분 충족** | 기존 custom `Callout`이 engine/site 양쪽에서 opt-in되고 consumer build를 통과한 Evidence가 있다. | Fumadocs built-in component 우선 정책으로 재구성하고, 필요한 custom component만 Editor spec + Site semantics로 검증한다. 별도 component package는 실제 필요 전까지 만들지 않는다. |
| Automation | **부분 충족** | legacy Payload publish action과 docs workflow가 explicit trigger, failure propagation, idempotent no-op을 검증했다. [Issue #8](https://github.com/ooMia/oomia.github.io.engine/issues/8) | trigger를 Payload endpoint에서 Git workspace publish action으로 옮기고 validation→commit/push→Site verification 흐름을 재검증해야 한다. |
| Publishing | **부분 충족** | DB snapshot을 docs repo에 반영하고 실제 Site sync/lint/test/typecheck/build를 통과시키는 workflow가 있다. [docs workflow](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/scripts/docs-workflow.ts) | DB export/Visual codec gate를 제거하고 canonical workspace 자체를 검증한 뒤 docs commit으로 확정하는 publish path가 필요하다. 기존 downstream Site verification은 재사용 가능성이 높다. |
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

1. **Workspace Contract**
   - docs repository를 canonical content remote로 재정의
   - local checkout/mount 위치와 directory/frontmatter contract 정의
   - working tree draft vs committed canonical revision 구분

2. **Authoring Clients**
   - 동일 fixture를 Obsidian과 Fumadocs Editor에서 편집
   - create/update/rename/delete, frontmatter, external edit, unsupported source preservation 확인
   - 필요 최소 수준에서만 Engine shell 추가

3. **Engine Simplification**
   - Payload/PostgreSQL 의존 경로를 target implementation에서 제거
   - container + mounted workspace model
   - validation / Git / publishing orchestration만 유지

4. **Publishing Rewrite**
   - source/frontmatter/component/assets validation
   - actual Site consumer verification
   - docs commit/push와 revision linkage
   - idempotent publish semantics

5. **Fumadocs Integration**
   - Fumadocs Editor component support
   - Site에서 Fumadocs UI/content tooling을 재사용할 범위 검증
   - custom component는 실제 수요가 있을 때만 shared profile/spec 추가

6. **Regression / Migration**
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

<!-- END SOURCE: docs/implementation-map.md -->


---

<!-- BEGIN SOURCE: docs/operating-rhythm.md -->

# Operating Rhythm

상태: 활동 계획의 사용자 명시 사항 중심. 출처: S1 `e0a335ad`, `1f288b42`, `33b898b1`.

## 목표와 리듬

Publishing Platform 완성과 계획·실행 습관을 중심에 둔다. 앰버서더 활동과 포트폴리오 개발의 기록을 하나의 흐름으로 연결한다.

- 매주 작은 발표, 매 4주 큰 발표 또는 working system review.
- 가용 시간은 대화 당시 주 50시간, 첫 주 25시간의 계획 가정. 현재 주의 실시간 예산이 아니다.
- Daily 기록은 20–30분 버퍼를 둔다. 주말 정리는 초기 60분을 잡고 실제 소요 시간을 기록해 조정한다.
- 주말 이전에 발표 일정을 잡는다. 통상 토요일 밤 또는 일요일 낮이며 확정 일정은 아니다.
- Daily는 비공개, 주말 정리 결과를 공개하는 방향에 사용자가 동의했다.

## Evidence → Story

매일 목표, 실제 결과, screenshot/GIF/video/voice/commit 등 Evidence, 배운 점, 다음 행동을 남긴다. 미디어는 GitHub에 업로드해 링크로 연결하는 방향을 선호했다. 구체적인 공개 범위와 저장 위치는 확정되지 않았다.

주말에는 일별 기록을 목표 → 시도 → 장애·판단 → 결과 → 다음 행동의 A-Z 스토리로 재구성한다. Agent/LilysAI는 정리 부담을 낮추는 도구이며 모든 개발을 Agent가 수행한다고 가정하지 않는다. 공개 결과물은 발표·블로그를 중심으로 하고 LinkedIn을 초기 후보로 둔다. 자체 블로그가 준비되기 전 발행 채널은 미결이다.

## LilysAI 활용 후보

글 전체 기반 description/metadata, 내용 기반 외부 링크 preview, 태그 후보, 3줄 요약을 실험할 수 있다. 이는 사용자가 제시한 관심 기능이며 네 기능 모두가 1.0 필수라는 의미는 아니다. 1.0은 최소 하나의 실제 automation 경로를 요구한다.

자동화는 자료 수집 → 요약·통합 → 발표/글 초안 → 플랫폼 발행의 순서로 필요에 맞게 확장한다. 현재 연결된 서비스나 구현 완료된 자동화를 의미하지 않는다.

<!-- END SOURCE: docs/operating-rhythm.md -->


---

<!-- BEGIN SOURCE: docs/decisions.md -->

# Decision Log

과거 제안과 현재 정리 기준을 구분한다. D001–D008의 날짜는 최초 수집일 2026-09-18이며 원래 결정일을 추정하지 않는다. 이후 결정은 실제 반영일을 기준으로 기록한다.

| ID | 현재 기준 | 상태 / 근거 | 대체하거나 제한한 과거 안 |
|---|---|---|---|
| D001 | 유일한 최상위 구현 레포를 만들지 않는다 | 사용자 명시, S2 `138f8f89` | 임의의 root repository 및 submodule 집합으로 제품 계층을 표현 |
| D002 | docs는 generated projection | **대체됨: D021**, 사용자 명시, S2 `4c1f839e` | docs를 canonical authoring source로 취급 |
| D003 | 필드 이름은 Work Type | 사용자 명시, S2 `178bf729` | Category / Type |
| D004 | Target Release와 Objective를 분리 | 사용자 후속 확인, S3 `5a382a65` | Release Target에 버전/목표를 결합 |
| D005 | Scope는 직접 바뀌는 책임만 최소 선택 | 사용자 README 반영 + 최신 제안, S3 `924e880a`, S2 `82ef0a72` | 단일 주영역만 선택하던 중간 제안; 모든 dependency 태깅 |
| D006 | Objective 5개와 Authoring Experience를 보존 | 실제 옵션은 사용자 명시, description/유지는 최신 제안, S3 `f55d6e75` | 4개만 적힌 이전 답변 |
| D007 | Item은 완료 가능한 delta | 최신 설계 제안, S2 `4a49654f` | 영구 capability를 릴리스마다 복제해 Done 처리 |
| D008 | 지식은 Markdown 레포, 운영 상태는 Project | knowledge repo 생성 및 현재 운영 방식 | Project README가 모든 장기 지식을 소유 |
| D009 | Project README는 canonical 문서의 짧은 인덱스로 유지한다 | 사용자 명시, 2026-09-18 | Product Boundary·Planning Model·필드 정의를 README에 중복 보관 |
| D010 | 설계 정의 Item은 canonical 문서의 immutable permalink를 Evidence로 사용할 수 있다 | 사용자 명시, 2026-09-18 | 설계 정의 완료에도 별도 산출물을 중복 생성 |
| D011 | 1.0 구현 수준은 revision이 고정된 Implementation Map으로 관리한다 | 사용자 요청 + 구현 레포 검증, 2026-09-18 | 설계 문서 또는 대화만으로 구현 완료 여부 추론 |
| D012 | canonical Article source는 CMS/Visual Editor와 독립적인 raw Markdown/MDX string으로 보존한다 | 사용자 승인, 2026-09-20 | Visual Editor가 무손실 표현 가능한 Markdown subset을 canonical 저장 범위로 취급 |
| D013 | Storage, Editing, Publishing 가능성을 서로 독립된 계약으로 판정한다 | 사용자 승인, 2026-09-20 | 저장 가능 = Visual 편집 가능 = 발행 가능으로 묶는 모델 |
| D014 | 공식 MDX component contract는 Site 쪽에서 소스 변경을 소유하는 versioned public content-component package로 공유한다 | **대체됨: D018**, 사용자 제안 및 승인, 2026-09-20 | engine과 site가 component spec을 각각 암묵적으로 복제 |
| D015 | CMS는 공식 component의 authoring adapter이고 Site는 rendering consumer다. Visual adapter 유무는 publishability를 결정하지 않는다 | 사용자 승인, 2026-09-20 | CMS registry가 플랫폼 전체 MDX 지원 범위를 결정 |
| D016 | Publishability는 CMS codec round-trip이 아니라 content/component contract와 실제 Site consumer 검증으로 판정한다 | D012–D015의 구현 원칙, 2026-09-20 | 모든 DB body에 Visual Editor representability를 요구하는 global publish gate |
| D017 | Knowledge에는 raw conversation transcript를 저장하지 않고 source/turn provenance metadata와 canonical knowledge만 유지한다 | 사용자 위임에 따른 agent 결정, 2026-09-20 | `provenance/conversations.json`에 원문 대화를 장기 보존하거나 handoff와 세션 transcript archive를 결합 |
| D018 | 공식 content component는 독립 repository가 소유하고 npm public package `@oomia/content-components`로 배포한다. framework-neutral contract/manifest와 React renderer surface를 분리하며 Site와 Engine은 각각 consumer다 | **대체됨: D024**, 사용자 명시, 2026-09-21 | D014의 Site-owned source 모델; `.astro` 기반 public renderer; 개인 unscoped package |
| D019 | content-component source repository는 public `ooMia/content-components`로 둔다. npm organization scope `@oomia`와 GitHub owner를 억지로 일치시키지 않고, 기존 프로젝트 repository ownership과 일관성을 우선한다 | **대체됨: D024**, 사용자 위임에 따른 agent 결정, 2026-09-21 | 별도 GitHub organization으로 즉시 이동하거나 Site/Engine 내부 package로 유지 |
| D020 | React content components는 semantic markup과 optional baseline CSS를 제공한다. 기본 스타일은 `@oomia/content-components/styles.css`를 소비자가 명시적으로 import하고, CSS custom properties·stable class/data hooks·`className`/`style` passthrough로 override한다 | **대체됨: D024**, 사용자 요구 + Fumadocs/Nextra/Docusaurus 패턴 조사, 2026-09-21 | CSS 자동 주입, Tailwind/runtime theme 강제, 완전 unstyled-only package |
| D021 | canonical Article content는 Markdown/MDX와 frontmatter/assets로 구성된 Git-backed filesystem workspace다. local working tree는 authoring/draft state이고 `ooMia/oomia.github.io.docs`의 commit이 durable shared canonical revision이다 | 사용자 명시, 2026-09-21 | D002의 generated projection 모델; PostgreSQL을 canonical content store로 사용하는 모델 |
| D022 | 1.0 기본 authoring client는 Obsidian과 Fumadocs Editor다. 둘은 같은 local content workspace를 직접 편집하며 Engine은 DB-backed CMS가 아니라 workspace validation/publishing orchestration을 담당한다 | 사용자 명시, 2026-09-21 | Payload + PostgreSQL + Lexical을 1.0 CMS/persistence로 유지 |
| D023 | publishing은 DB를 Markdown으로 export하는 작업이 아니라 content workspace를 검증하고 canonical docs revision으로 commit/push한 뒤 실제 Site consumer build/delivery를 검증하는 흐름이다 | D021–D022의 직접 결과, 2026-09-21 | DB snapshot → generated docs projection → Site 흐름 |
| D024 | Fumadocs의 built-in UI/Editor component capability를 우선 재사용한다. 독립 `@oomia/content-components` React library는 1.0 선행 과제에서 제거하고, 실제 custom component가 생겨 cross-repository contract가 필요할 때 얇은 profile/adapter package를 도입한다 | 사용자 방향 전환 및 오버엔지니어링 회피, 2026-09-21 | D018–D020의 독립 renderer/component library 선행 구축 |


D005의 다중 선택 설정, Delivery 옵션 등록은 실제 Project에서 확인되지 않았다. D007 등 초기 assistant 제안을 사용자의 명시적 승인 발언으로 인용하지 않는다. engine container 배포 및 Validation 옵션은 결정이 아니라 미결 제안이다.

D010은 **설계 정의가 Outcome인 경우에만** 적용한다. 기능 구현·품질·배포 성공은 구현 레포의 코드·테스트·commit/PR·실행/deployment Evidence가 별도로 필요하다.

D011의 현재 기준 revision과 capability 판정은 Implementation Map (`docs/implementation-map.md`)에 기록한다. Product Boundary가 변경되면 동일한 구현 revision도 다시 판정할 수 있으며, contract 강화에 따른 상태 하향을 regression과 구분한다.

D012–D016의 세부 정책과 예제별 지원 수준은 Content Authoring & Publishing Contract (`docs/content-authoring-contract.md`)가 소유한다. D021–D023이 현재 1.0 persistence/authoring/publishing 기준이며, D024에 따라 Fumadocs가 제공하는 component/editor capability를 먼저 사용한다. 별도 content-component package와 manifest는 실제 custom component의 공유 계약이 필요해질 때만 다시 활성화한다.

D017에 따라 세션의 장기 의미는 canonical 문서·Decision Log로 승격하고, 일시적인 실행 상태만 `handoff/current.md`에 유지한다. 원문 대화가 필요하면 원래 대화 시스템을 참조하며 Knowledge repository는 transcript archive 역할을 맡지 않는다.

<!-- END SOURCE: docs/decisions.md -->


---

<!-- BEGIN SOURCE: docs/open-questions.md -->

# Open Questions / Verification Gaps

현재 canonical 정책에서 **사용자 결정이나 설계 선택이 아직 필요한 항목**만 유지한다. GitHub live 상태처럼 조회로 해결되는 운영 확인 사항은 Current Handoff (`handoff/current.md`)에 두고, 구현 수준과 revision-bound Evidence는 Implementation Map (`docs/implementation-map.md`)이 소유한다.

| ID | 항목 | 현재 처리 |
|---|---|---|
| Q003 | 1.0 final release gate | Git-backed authoring/publishing boundary는 확정. 실제 acceptance/evidence chain과 최종 release gate를 구현 과정에서 구체화해야 함 |
| Q006 | Status 옵션 및 계획 Item의 Objective/Target Release 빈 값 허용 규칙 | 명시적으로 확정할 필요 있음 |
| Q007 | Work Type Validation 추가 | 보류. 현재 기본값은 5개 유지 |
| Q008 | Engine container artifact와 workspace mount contract | containerization 방향은 확정적이지만 image distribution, bind mount/volume CLI contract, host Git credential 전달 방식은 구현 시 결정 |
| Q010 | 미디어 공개 범위·asset 저장 위치 | workspace-relative asset과 durable external URL을 허용하는 방향. public/private 범위와 large/binary asset policy는 추가 결정 필요 |
| Q012 | custom component shared profile/manifest 필요 여부 | Fumadocs built-in을 우선 사용. 실제 custom component가 생겨 Engine/Site 간 계약 공유가 필요할 때만 schema/package를 활성화 |
| Q014 | raw HTML 및 executable MDX의 구체적인 publish security policy | Source 저장은 허용 가능. Site/publish 단계에서 허용할 HTML/expression 범위를 구체화해야 함 |
| Q015 | canonical file extension/layout convention | Markdown/MDX + frontmatter/filesystem 원칙은 확정. Obsidian interoperability와 Fumadocs component 사용을 고려해 `.md` / `.mdx` 선택 및 directory naming을 implementation spike에서 확정 |
| Q016 | Git publish semantics | durable canonical revision은 docs commit으로 확정. Engine이 auto-commit/push할지, 사용자 commit을 publish 입력으로 받을지, branch/PR를 사용할지 세부 UX 결정 필요 |
| Q017 | Fumadocs Editor embedding 수준 | standalone Studio를 기본으로 쓸지 Engine shell에 `@fumadocs-editor/ui`를 embed할지는 최소 구현을 먼저 검증한 뒤 결정 |

## 분리 원칙

- **결정이 필요한 질문** → 이 문서
- **현재 GitHub/branch/Project 상태를 다시 확인해야 하는 항목** → Current Handoff (`handoff/current.md`)
- **특정 revision에서 검증된 capability와 남은 구현 delta** → Implementation Map (`docs/implementation-map.md`)
- **이미 확정된 방향과 대체된 결정** → Decision Log (`docs/decisions.md`)

초기 지식 레포 구성에 사용한 대화의 source/turn metadata는 provenance에 역사적 근거로 남기되 raw transcript는 저장하지 않는다. 현재 정책과 실제 repository 검증 결과가 있는 항목은 canonical 문서와 Implementation Map을 우선한다.

<!-- END SOURCE: docs/open-questions.md -->


---

<!-- BEGIN SOURCE: CONTRIBUTING.md -->

# 수정 방법

1. CONTEXT.md (`CONTEXT.md`)에서 해당 규칙을 소유하는 파일을 찾는다.
2. 원본 Markdown을 수정한다. 새로운 제안은 확정된 규칙으로 섞지 말고 open-questions.md (`docs/open-questions.md`)에 기록한다.
3. 의미 있는 방향 변경에는 decisions.md (`docs/decisions.md`)에 stable ID, 상태, 이유, 출처, 대체한 결정을 남긴다. 과거 기록을 삭제하지 않는다.
4. 구현 상태를 변경하려면 Implementation Map (`docs/implementation-map.md`)의 기준 revision보다 구현 레포가 진행되었는지 확인하고 실제 코드·테스트·commit/deployment Evidence를 다시 조사한다.
5. CHANGELOG.md (`CHANGELOG.md`)를 갱신하고 `python3 scripts/bundle.py`를 실행한다.
6. 변경 내용을 Git diff로 검토하고 커밋한다.

규칙의 중복 복사는 피한다. GitHub Project README와 필드 description은 이 레포의 canonical 정의를 가리키는 탐색 계층으로 유지한다. 별도 레포의 코드와 계약을 함께 바꾸는 경우 관련 PR/commit을 서로 연결한다.

## Evidence

설계·계획 정의 자체가 Outcome이면 관련 canonical 문서의 immutable commit/permalink를 완료 Evidence로 사용할 수 있다. `main` 링크는 최신 정의를 찾는 reference로 사용한다.

기능 구현, 성능·신뢰성 검증, 실제 publishing/deployment 완료에는 설계 링크를 대체 Evidence로 사용하지 않는다. 책임 레포의 코드·테스트·실행 결과·commit/PR·deployment처럼 재현 가능한 자료가 필요하다.

## 세션 인계

의미 있는 작업 세션을 종료할 때 장기적으로 남아야 할 규칙·결정은 먼저 owning canonical 문서에 반영한다. 아직 진행 중인 branch/Issue/Project 상태, 재검증 항목, 다음 안전한 행동은 `handoff/current.md`에 기록한다.

`handoff/current.md`는 세션 로그나 의사결정 원장이 아니다. 매번 최신 checkpoint로 overwrite하고, 과거 상태는 Git history에 맡긴다. 구현 수준은 handoff가 아니라 revision-bound Implementation Map (`docs/implementation-map.md`)과 책임 레포 Evidence로 판정한다.

## 대화에서 변경을 가져올 때

사용자의 명시적 정정 → 이후 사용자 메시지에 반영된 규칙 → 최신 assistant 제안 → 오래된 초안 순으로 근거를 판단한다. 시간상 최신이라는 이유만으로 제안을 사용자 승인으로 바꾸지 않는다. 과거 대화에 근거하는 항목은 provenance의 source/turn metadata를 유지하고, 현재 요청으로 새로 확정한 내용은 실제 날짜와 변경 commit으로 추적한다. raw transcript는 repository에 복제하지 않는다.

## 공유

이 레포는 raw conversation transcript를 보관하지 않는다. provenance에는 source/turn metadata와 최소 요약만 남기고, Chat에 필요한 기본 첨부물은 `dist/CONTEXT-BUNDLE.md`다.

<!-- END SOURCE: CONTRIBUTING.md -->


---

<!-- BEGIN SOURCE: provenance/README.md -->

# Provenance

수집일: 2026-09-18 (Asia/Seoul). 같은 프로젝트의 대화 3개, 모든 반환 페이지를 수집했다. 대화 당시 인용된 외부 링크와 도구 기능 주장은 현재 사실로 재검증하지 않았다.

## 확정 수준

- **사용자 명시**: 직접 요구하거나 정정한 내용.
- **사용자 후속 확인 / README 반영**: 이후 사용자 메시지에 포함된 규칙. 전체 세부사항의 개별 승인을 뜻하지 않는다.
- **최신 제안**: 최신 assistant 답변을 정리 기준으로 사용했으나 명시적 승인 및 실제 적용을 주장하지 않는다.
- **이번 구성**: 현재 요청을 수행하기 위한 파일 구조·템플릿·편집 요약.
- **미검증**: 실제 구현 또는 외부 운영 상태를 확인하지 않음.

최신 제안은 이전 초안보다 우선하되 사용자의 명시적 요구를 덮어쓰지 않는다. 문서의 짧은 turn ID는 아래 전체 ID에 대응한다.

Knowledge repository에는 **raw conversation transcript를 보존하지 않는다.** 아래 source/turn index와 최소 발언 요약만 provenance metadata로 유지한다. 장기적으로 필요한 내용은 owning canonical 문서와 Decision Log에 승격하고, 아직 진행 중인 실행 상태는 `handoff/current.md`가 담당한다. 원문이 꼭 필요한 경우에는 아래 원본 대화 링크처럼 원래 시스템의 source를 확인하며, Knowledge 자체를 대화 archive로 사용하지 않는다.

## Sources and Turns

### S1 — 활동 계획 수립

[원본 대화](https://chatgpt.com/c/6aa8c18b-d9a4-83ee-9bc9-5bfeec691330)

| Turn ID | 사용자 발언 시작 |
|---|---|
| `33b898b1-671f-4436-a0bc-b5c8cb071482` | 직접 구현하는 것보다, 이미 잘 만들어진 도구를 잘 활용하고자 노력하는 방향성이, 핵심 기능이 아닌 곳에 시간을 할애할 때의 마음가짐이 되어야 한다고 본다. 따라서, 나의… |
| `1f288b42-a887-4948-b7d2-1249a2d210fe` | 내게 필요한 것은 다양한 답변보다, 자동화 가능성 높은 루틴과 사고/계획 프레임워크입니다. 지금은 뭔가 실속 없는 내용들을 장황하게 늘어놓는 느낌입니다. 제가 최종 목표를… |
| `e0a335ad-74c3-43fd-93c4-eb3c40770b42` | 1. 주말 이전에 브리핑 약속을 사전에 잡고 진행하면 되며, 일반적으로 토요일 밤이나 일요일 낮이 될 것 같다. 2. 공식 형식은 없으나, 단순 결과물이 아닌 A-Z의 스… |
| `17efd584-bf83-437d-8f17-72d6185e0c94` | LilysAI_일반_엠버서더 활동에 대한 계획을 세워보자. 다음은 해당 프로그램에 대한 간략한 요약이다. 링크를 직접 참조하여 내용을 파악해보자. http… |

### S2 — GitHub Project 초안 작성

[원본 대화](https://chatgpt.com/c/6aa991ee-6238-83ee-bef8-5d330246837a)

| Turn ID | 사용자 발언 시작 |
|---|---|
| `82ef0a72-fc2e-480c-b4b5-53a941b93465` | Scope는 다중 선택 옵션으로 만들 수도 있다. 단일 선택 옵션의 경우, 어떤 작업은 어떤 영역으로 두어야 할 지 고민할 수 있다. 서로 다른 두 영역에 걸쳐 있는 작업… |
| `4a49654f-9727-4bef-a51f-b8c2c6a4ed3b` | 1. Release Target의 용법에 대한 설명: SemVer 뒤에 붙는 context를 별도의 필드로 추출하지 않아야만 하는 이유는? 2. Scope 필드는 sing… |
| `3e786a51-3bc0-4c70-af4c-a726b8d5adb4` | - application boundary와 관련된 답변에서 표현을 \Article을 API를 통해 생성·조회·수정할 수 있고, 그 상태가 canonical state로 … |
| `d7815342-69e8-47ae-9512-15aff0ec8cb7` | - 1.0 Product Boundary와 Release Target에서 1.0과 관련된 용어들 사이의 차이 (1.0 Definition부터 1.0 Readiness까지)… |
| `178bf729-4b1d-4bc9-ab65-203481022f60` | 1. Category 대신 Work Type을 사용했으니 앞으로의 표현에 참고하도록. 2. milestone을 목표처럼 사용하는 것에 대한 의견. 의견을 내기 전에 Git… |
| `4c1f839e-0f53-4803-99ca-f84cd5724030` | - Type은 예약되어있는 필드명이라 Category로 바꿨는데, 대안이 있을까? - Acceptance Criteria와 DoD의 혼용에 혼란스럽다. 간단한 예시를 통해… |
| `138f8f89-0c4a-450e-9abd-677215c6d8de` | GOAL: Make the canonical content persistence path executable through the existing application c… |
| `2877a148-8c99-425b-8896-d738308e239a` | Area와 Component를 만드는 것 자체는 좋지만,Area A에 Component A1, A2, A3가 속하는 느낌이라면, 차라리 A:A1 같이 합치는 것이 유지보수… |
| `9e4fc270-7151-4b7d-8044-ce625803cd70` | 사용자/시스템 기능보다는 기술 구조가 더 편하게 느껴진다. 그러나 Database, CMS와는 달리, Astro는 Web App 중 실제 문서와 기타 기술 블로그를 구성하… |
| `5b7f689f-9eb1-410a-8c62-549b49124eb1` | 이슈 생성 시, default assignee, default label, 그리고 Milestone 설정을 할 수 있어? 할 수 있다면 하는 게 좋을까? 또 모든 작업에 … |
| `ab0703f8-90a7-4e66-b788-12e8a81acf63` | Project의 각 아이템은 레포의 이슈인지, Item을 할당하려면 반드시 특정한 레포를 명시해야하는지, 그리고 기본적으로 모든 이슈는 draft로 생성되도록 강제할 수 … |
| `d7f1bf49-931a-4fd8-b056-a873fcfba13f` | 일단 나도 Iteration 스타일을 선호한다. 이에 맞는 방식을 처음부터 진행하는 것이 적응에 도움이 되리라 본다. 그리고 현재의 README는 다소 장황하다. 핵심 가… |
| `833044bb-289f-454c-b891-cc9fe77cca17` | 기본 레포지토리 설정 없이 GitHub Project의 이름을 \Publishing Platform\로 설정하고, 거의 처음으로 본격적으로 GitHub Project를… |

### S3 — README Evidence Planning

[원본 대화](https://chatgpt.com/c/6aac4ab0-1e38-83e8-a671-8cbbfa4173ae)

| Turn ID | 사용자 발언 시작 |
|---|---|
| `b0174bce-6fff-4f18-bd3a-d931088e34c7` | [@GitHub](plugin://github@openai-curated-remote) https://github.com/users/ooMia/projects/11/ (`provenance/… |
| `72f26f1b-8a12-4af1-b990-b95223fb8d41` | GitHub Project에 README로 설계안을 기록해두는 게 LLM을 사용하는 동안 컨텍스트 전달이 불편한데, Notion이나 다른 MCP 붙이고 별도로 정리해두는 … |
| `f55d6e75-29f6-4b53-a2b8-121a27384873` | 실제 필드에 **Authoring Experience가 있는데, 이건 유지하는 게 좋을까 삭제해도 좋나** - **Authoring Experience** - **Cano… |
| `353c6aa1-89d0-450f-b803-f87a069dfbd8` | 1. Canonical Content&`)에 기록한다. GitHub Project의 live 필드·Item·Status Update는 여전히 이 provenance 수집 범위가 아니다. 최신 canonical 문서에 승격되지 않은 초기 제안은 현재 정책으로 간주하지 않는다.

<!-- END SOURCE: provenance/README.md -->
