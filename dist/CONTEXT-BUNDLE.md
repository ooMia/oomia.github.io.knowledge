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

- canonical Article source는 CMS/Visual Editor와 독립적으로 보존한다.
- storage / visual editing / publishing 가능성을 동일시하지 않는다.
- 공식 MDX component는 versioned public content-component contract를 공유하고 CMS는 authoring adapter, Site는 rendering consumer로 취급한다.
- 실제 구현 수준은 [Implementation Map](docs/implementation-map.md)의 기준 revision과 책임 레포 Evidence로 판정한다.

확정 수준은 [Provenance](provenance/README.md), 남은 결정은 [Open Questions](docs/open-questions.md)을 따른다. 이전 작업을 이어받는 경우에는 먼저 [Current Handoff](handoff/current.md)를 읽되, handoff는 volatile checkpoint이며 canonical policy가 아님을 전제로 한다.

## 작업별 읽기

| 작업 | 읽을 문서 |
|---|---|
| 이전 세션 이어받기 | [Current Handoff](handoff/current.md) → 필요한 canonical 문서와 live GitHub 상태 재검증 |
| 전체 이해 | [Architecture](docs/architecture.md), [Release 1.0](docs/release-1.0.md) |
| Markdown/MDX authoring·storage·publish 정책 | [Content Authoring & Publishing Contract](docs/content-authoring-contract.md) |
| MDX component package / Agent-readable manifest | [Content Component Manifest Schema](docs/content-component-schema.md), [JSON Schema](schemas/content-component-manifest.schema.json) |
| 현재 1.0 구현 수준·gap | [Implementation Map](docs/implementation-map.md) → 기준 revision의 구현 레포 코드·테스트 |
| Item 작성·분류·완료 검토 | [Planning](docs/planning-model.md), [Fields](docs/fields.md), 관련 release, 실제 Item의 Outcome/AC/Evidence |
| Issue activation / Project field / Development branch 자동화 | [Project Orchestration](docs/project-orchestration.md), [Planning](docs/planning-model.md) |
| 구현 논의 | Architecture → 관련 contract → Implementation Map → 소유 레포의 최신 문서·코드·테스트 |
| 주간 계획·발표 | [Operating Rhythm](docs/operating-rhythm.md), 실제 Project Status Update, 실제 Evidence |
| 설계 수정 | 해당 원본 문서, [Decisions](docs/decisions.md), [CONTRIBUTING](CONTRIBUTING.md) |
| GitHub Project README 정리 | [Project README 템플릿](templates/project-readme.md) |
| 과거 발언 확인 | [Provenance](provenance/README.md)의 source/turn metadata → 필요 시 원본 대화 링크 |

## Agent 작업 원칙

Content 관련 구현을 계획하거나 수정할 때:

1. CMS editor capability를 canonical syntax requirement로 확대하지 않는다.
2. unsupported Visual syntax를 삭제/정규화해서 손실시키기보다 Source fallback을 우선한다.
3. 저장 가능성과 publishability를 분리한다.
4. 공식 MDX component 변경은 Site가 소유하는 shared component contract의 영향부터 확인한다.
5. TypeScript type만으로 runtime contract가 충분하다고 가정하지 않는다. 필요한 경우 component manifest/schema를 사용한다.
6. 최종 Publishability는 실제 Site consumer 검증을 포함해 판단한다.

## 사용할 요청 예시

> Content Authoring & Publishing Contract에 따라 이 Markdown/MDX 표현의 Editing, Storage, Publishing 수준을 판정하고 필요한 구현 delta를 나눠줘.

> Implementation Map의 기준 revision보다 구현 레포가 진행되었는지 확인하고, 1.0 capability 상태와 남은 delta를 갱신해줘.

> 공식 MDX component를 추가할 때 Site package contract, Engine authoring adapter, consumer build Evidence를 각각 어떤 Item/Issue로 나눌지 검토해줘.

> 이 설계 변경을 원본 문서에 반영하고, 영향받는 규칙과 미결 사항을 확인한 뒤 통합 문서를 다시 생성해줘.

세션을 종료하기 전에는 장기적으로 남아야 할 결정과 정책을 먼저 owning canonical 문서에 반영하고, 아직 진행 중인 live 상태와 다음 안전한 행동만 `handoff/current.md`에 남긴다. handoff는 매번 overwrite하며 과거 세션 로그를 누적하지 않는다. raw conversation transcript는 Knowledge에 복제하지 않고 provenance에는 source/turn metadata만 유지한다.

설계 정의 Item의 Evidence에는 canonical 문서의 immutable commit/permalink를 사용할 수 있다. 기능 구현·배포 Item은 구현 레포의 재현 가능한 Evidence가 별도로 필요하다. 파일을 수정할 수 없는 Chat은 변경할 **원본 파일 전체**를 제공하고, 통합본 수정이나 대화상 합의만으로 원본이 갱신되었다고 표현하지 않는다.

<!-- END SOURCE: CONTEXT.md -->


---

<!-- BEGIN SOURCE: docs/architecture.md -->

# Architecture

상태: 사용자 명시 사항 및 이후 README 기준을 종합. 2026-09-20 Content Authoring & Publishing Contract를 반영.

## 원칙

- 구현 작업보다 제품 결과와 시스템 책임을 기준으로 계획한다.
- 매 Iteration에 시연 가능한 결과를 남긴다.
- 핵심이 아닌 문제는 검증된 도구를 우선 활용한다.
- 안정된 경계가 필요해질 때까지 설계 선택의 변경 가능성을 유지한다.
- 레포와 프레임워크를 영구적인 제품 경계로 취급하지 않는다.
- canonical source는 특정 CMS/Visual Editor의 표현 능력에 종속되지 않는다.
- 저장 가능성, authoring surface의 편집 가능성, 실제 Site의 publishability를 서로 다른 계약으로 취급한다.

## 레포의 역할

유일한 최상위 구현 레포는 없다. 이 지식 레포도 다른 레포를 포함하는 super-repository가 아니다.

| 레포 | 책임 |
|---|---|
| `oomia.github.io.engine` | canonical content를 다루는 authoring 환경과 CMS adapter, persistence 접근, publishing workflow orchestration |
| `oomia.github.io.docs` | downstream이 소비할 계약된 generated document set |
| `oomia.github.io` | generated documents를 소비해 사이트를 빌드하고 GitHub Pages로 전달하며, 공식 Article MDX content component의 rendering implementation을 소유 |

`mono`는 사용자가 로컬에서 붙인 별칭이며 실제 레포 이름의 일부가 아니다. docs는 현재 engine과 site 사이의 generated projection으로 사용된다.

```text
Authoring Adapter → Canonical Content → Generated Documents → Site Output → Live Site
      engine              engine              docs              site
```

Canonical content가 콘텐츠의 권위 있는 상태다. Article body는 Markdown/MDX raw source string으로 보존하고, CMS editor state는 derived/virtual representation으로 취급한다. docs는 재생성 가능한 projection이며 수동 수정이 canonical state를 대체하지 않는다.

제품 수준 계약은 특정 DB/CMS를 강제하지 않는다. 현재 구현이 PostgreSQL과 Payload를 사용하더라도 해당 구현 선택이 canonical content syntax를 제한하는 근거가 되어서는 안 된다.

## Authoring boundary

Authoring surface는 canonical content의 adapter다.

```text
                canonical raw source
                       |
          +------------+------------+
          |                         |
    Visual Editor               Source Editor
  supported subset             lossless fallback
```

- Visual Editor가 무손실로 표현 가능한 content에는 구조화 편집을 제공할 수 있다.
- Visual Editor가 표현하지 못하는 content는 Source mode로 fallback할 수 있어야 한다.
- unsupported source를 Visual Editor가 조용히 삭제하거나 재작성해서는 안 된다.
- 최종 Site와 동일한 WYSIWYG Preview는 authoring contract의 필수조건이 아니다.
- 자세한 수준 정의와 정책 테이블은 Content Authoring & Publishing Contract (`docs/content-authoring-contract.md`)가 소유한다.

## Official MDX component boundary

공식 Article MDX component의 계약은 Site repository에서 소스 변경을 소유하고, versioned public content-component package를 통해 공유하는 방향을 canonical architecture로 둔다.

```text
                 public content-component package
                     contract + implementation
                         /             \
                        /               \
               Engine / CMS          Site
              authoring adapter   rendering consumer
```

책임은 다음과 같이 나눈다.

- **Site repository**: component source, rendering implementation, public component contract 변경을 소유한다.
- **Site**: package의 runtime implementation을 사용한다.
- **Engine**: rendering implementation에 직접 결합하지 않고 exported type/runtime contract를 참조해 Payload authoring adapter를 구성한다.
- **Visual adapter**: 공식 component의 편집 편의를 제공하지만 존재 여부가 publishability를 결정하지 않는다.
- **Publishing**: package compatibility와 실제 Site consumer build를 최종 gate로 사용한다.

현재 `@workspace/ui`처럼 Site 전체 UI를 담는 package를 그대로 공개 계약으로 승격하지 않는다. Article MDX에서 허용할 content component surface는 일반 Site UI와 별도 경계로 둔다. 실제 package name, registry, release transport는 구현 단계에서 확정한다.

## Contract surfaces

source-level 결합보다 명시적인 artifact/runtime contract를 우선한다.

| Surface | 소유 위치 |
|---|---|
| Content authoring/storage/publish 정책 | knowledge repository |
| 공식 MDX component 의미와 버전 | versioned content-component package |
| Payload-specific authoring adapter | engine |
| generated document set | docs |
| final rendering / consumer compatibility | site |
| 구현별 API·테스트·runtime details | 해당 구현 repository |

TypeScript type은 compile-time contract로 사용하고, Agent/runtime가 component surface를 읽어야 할 경우 machine-readable manifest를 함께 둘 수 있다. 계획용 초안은 Content Component Manifest Schema (`docs/content-component-schema.md`)에 둔다.

engine을 container image 등으로 배포하는 것은 가능한 방향이며 확정된 구현 과제가 아니다. API와 generated document의 세부 runtime contract는 소유 레포에 두고, 이 레포에서 코드 구현 여부를 추론하지 않는다.

<!-- END SOURCE: docs/architecture.md -->


---

<!-- BEGIN SOURCE: docs/content-authoring-contract.md -->

# Content Authoring & Publishing Contract

상태: 2026-09-20 사용자 승인 방향을 canonical policy로 정리.

## 목적

Publishing Platform의 canonical content는 특정 CMS나 Visual Editor의 표현 능력에 종속되지 않는다.

공식 정책:

> Canonical source는 CMS와 독립적으로 보존한다. 공식 MDX component의 계약은 versioned public component package가 소유하며, CMS는 그 계약의 authoring adapter이고 Site는 rendering consumer다. Visual adapter가 없는 공식 component도 Source로 편집할 수 있으며, 최종 Publish 가능 여부는 Site가 소비하는 component contract와 실제 consumer build가 결정한다.

이 문서는 **저장 가능성, CMS 편집 가능성, 실제 발행 가능성**을 분리해 정의한다.

## 세 가지 독립된 판정 축

### Editing

| 수준 | 보장 |
|---|---|
| Visual | CMS의 구조화된 Visual Editor에서 생성·수정할 수 있다. |
| Source | Visual Editor가 표현하지 못해도 raw Markdown/MDX source로 안전하게 수정할 수 있다. |
| Unsupported | 해당 authoring surface에서는 편집 대상으로 제공하지 않는다. |

Visual 지원 실패가 콘텐츠 지원 실패를 뜻하지 않는다. Visual adapter가 없거나 무손실 왕복이 불가능한 문서는 Source editor로 fallback할 수 있어야 한다.

### Storage

| 수준 | 보장 |
|---|---|
| Exact | 사용자가 저장한 raw source를 의미 없는 재작성 없이 보존한다. |
| Normalized | Visual Editor에서 실제 내용을 수정한 경우 의미를 유지하는 범위에서 Markdown/MDX formatting normalization을 허용한다. |
| Reject | 문자열/크기/플랫폼 불변식 등 storage contract 자체를 만족하지 못한 경우에만 저장을 거부한다. |

기본 원칙은 **Source에서 직접 저장한 content는 Exact**, Visual Editor에서 실제 수정한 content는 **Normalized 허용**이다.

문법 오류나 현재 renderer가 지원하지 않는 표현은 storage rejection의 기본 사유가 아니다. 작성 중 source는 저장할 수 있고 publish 단계에서 차단될 수 있다.

### Publishing

| 수준 | 보장 |
|---|---|
| Publishable | generated docs 생성과 실제 Site consumer 검증을 통과해 발행할 수 있다. |
| Blocked | canonical source에는 보존되지만 현재 publishing contract로는 발행하지 않는다. 실패 이유를 관찰 가능하게 제공한다. |

Visual Editor compatibility는 Publishability의 필수조건이 아니다.

## 1.0 목표 정책 테이블

| 콘텐츠 유형 | Editing | Storage | Publishing | 1.0 기본 정책 |
|---|---|---|---|---|
| 기본 Markdown | Visual | Exact / Normalized | Publishable | Visual 편집 전 원문을 보존하고, 실제 Visual 수정 후 normalization을 허용한다. |
| 일반 GFM table | Visual | Normalized | Publishable | CMS가 구조적으로 편집 가능한 범위는 Visual을 제공한다. |
| Visual Editor가 지원하지 않는 일반 Markdown 표현 | Source | Exact | Publishable | CMS 한계 때문에 저장·발행 범위를 줄이지 않는다. 실제 Site가 지원하면 발행한다. |
| 임의 code fence language | Visual 또는 Source | Exact | Publishable | syntax highlighting 지원 여부와 저장/발행 가능성을 분리한다. |
| 일반 Markdown image | Visual 또는 Source | Exact | Publishable | Payload Media 모델로 강제 변환하지 않는다. asset resolution 규칙은 별도 contract로 발전시킬 수 있다. |
| Site가 허용하는 raw HTML | Source | Exact | Publishable | Visual 지원은 요구하지 않는다. 실제 consumer/build가 허용해야 한다. |
| 실행·보안상 허용하지 않는 HTML | Source | Exact | Blocked | source 보존과 실행 허용을 분리한다. |
| HTML comment 등 비렌더링 source 정보 | Source | Exact | Publishable | Visual Editor가 표현하지 못하더라도 삭제하지 않는다. |
| 공식 MDX component + Visual adapter | Visual | Normalized | Publishable | shared component contract를 기준으로 구조화 편집한다. |
| 공식 MDX component + Visual adapter 없음 | Source | Exact | Publishable | 공식 component임을 CMS visual support와 별개로 인정한다. |
| 공식 contract에 없는 MDX component | Source | Exact | Blocked | source는 보존하되 현재 consumer contract에 없으면 발행하지 않는다. |
| 잘못된 component props | Source | Exact | Blocked | source 저장은 허용하고 component contract 검증에서 차단한다. |
| arbitrary JavaScript expression | Source | Exact | Blocked by default | 명시적으로 지원 계약이 추가되기 전에는 executable content를 publish contract 밖에 둔다. |
| 문서 내부 MDX import/export | Source | Exact | Blocked by default | Article이 임의 module dependency를 소유하지 않도록 기본 차단한다. |
| 문법 오류가 있는 draft | Source | Exact | Blocked | 작성 중 상태는 저장할 수 있지만 publish validation을 통과해야 한다. |

## Canonical source와 metadata

Article body의 canonical representation은 Markdown/MDX raw source string이다. CMS editor state는 derived/virtual representation이며 canonical source를 대체하지 않는다.

title, description, author 등 구조화 metadata와 import된 frontmatter의 상세 매핑 정책은 별도 결정 대상이다. generated document의 frontmatter는 canonical DB state에서 생성되는 projection으로 취급한다.

## Visual Editor contract

Visual Editor는 authoring convenience layer다.

- Visual Editor가 source를 무손실로 표현할 수 있을 때 구조화 편집을 제공한다.
- 표현할 수 없는 source를 조용히 삭제하거나 변경해서는 안 된다.
- 문서 전체가 안전하게 왕복되지 않는 경우 Source mode로 fallback하는 것을 1.0의 허용 가능한 UX로 본다.
- 최종 Site와 동일한 WYSIWYG Preview는 Visual Editing contract에 포함하지 않는다.
- registered component를 Payload Block으로 편집할 수 있어도 실제 Site renderer의 preview 제공은 별도 capability다.

## Official MDX component contract

공식 MDX component는 Site repository에서 소스와 rendering implementation을 관리하고, **versioned public component package**를 통해 계약을 배포한다.

논리적 의존 방향:

```text
                versioned component contract
                         /           \
                        /             \
               Engine / CMS       Site / renderer
              authoring adapter    runtime consumer
```

- Site repository가 component implementation과 contract의 변경을 소유한다.
- Site는 package의 runtime component implementation을 사용한다.
- Engine은 가능한 한 rendering implementation 대신 exported type/runtime contract만 사용해 Payload authoring adapter를 구성한다.
- 공식 component인데 Visual adapter가 아직 없어도 Source mode로 authoring할 수 있다.
- package version compatibility와 실제 Site build가 최종 Publishability를 결정한다.
- 일반 Site UI package 전체를 공개 계약으로 만들지 않는다. Article MDX에서 사용할 content component surface만 별도 경계로 둔다.
- 실제 package name, registry, release transport는 구현 결정으로 남긴다.

## Component contract에 필요한 정보

TypeScript type만으로는 runtime validation이나 Agent automation을 수행할 수 없으므로, 공식 package는 장기적으로 다음 두 surface를 제공하는 것을 목표로 한다.

1. TypeScript types: 구현자와 CMS adapter의 compile-time contract.
2. Machine-readable manifest: component name, block/inline kind, props, children policy 등 runtime/Agent가 읽을 수 있는 최소 계약.

knowledge repository의 Content Component Manifest Schema (`schemas/content-component-manifest.schema.json`)는 이 manifest의 계획용 draft다. 실제 published package API가 확정되기 전에는 implementation contract로 간주하지 않는다.

## Publish validation 원칙

Publish validation은 Visual Editor round-trip 여부가 아니라 **canonical source가 현재 publishable projection과 Site consumer에서 유효한가**를 판정해야 한다.

최종 검증 흐름의 목표:

```text
canonical raw source
        ↓
component / content contract validation
        ↓
generated docs
        ↓
Site sync / typecheck / build
        ↓
publishable result
```

따라서 현재 CMS codec의 무손실 round-trip 검사는 장기적으로 **Visual editability 판별**에 사용될 수 있지만, 모든 source의 storage/publishing gate로 사용하지 않는다.

## 1.0 비목표

- 모든 Markdown/MDX 표현의 Visual Editing
- complete WYSIWYG preview
- arbitrary JavaScript execution in Article MDX
- 문서가 임의 module import를 소유하는 모델
- 모든 Site UI component를 Article content contract로 노출
- 범용 CMS-independent visual editor framework 구현

<!-- END SOURCE: docs/content-authoring-contract.md -->


---

<!-- BEGIN SOURCE: docs/content-component-schema.md -->

# Content Component Manifest Schema

상태: 2026-09-20 planning draft. Agent와 구현 작업의 공통 어휘를 제공하기 위한 schema이며 아직 published package API는 아니다.

## 목적

공식 MDX component contract를 TypeScript 타입에만 의존하면 runtime과 Agent가 component surface를 안정적으로 조사하기 어렵다.

따라서 public content-component package가 장기적으로 다음 두 표현을 함께 제공할 수 있도록 계획한다.

- TypeScript types: compile-time contract
- component manifest: runtime/Agent-readable contract

manifest의 JSON 형태는 content-component-manifest.schema.json (`schemas/content-component-manifest.schema.json`)으로 검증한다.

## 최소 정보

각 component는 다음을 기술한다.

| 필드 | 의미 |
|---|---|
| name | MDX source에서 사용하는 공식 component 이름 |
| kind | block 또는 inline |
| props | 공개 prop 이름, 타입, required 여부, enum 값 |
| children | none / text / markdown / mdx 중 허용 children model |

이 정보는 rendering implementation을 설명하지 않는다. CSS, React/Astro 내부 구조, Payload field implementation은 manifest 밖이다.

## Agent 사용 예

Agent가 새로운 component를 추가할 때:

1. Site repository의 component implementation을 수정한다.
2. package의 TypeScript contract와 manifest를 함께 수정한다.
3. schema validation을 통과시킨다.
4. Engine의 Payload adapter가 필요한 경우 같은 manifest/type을 기준으로 구현한다.
5. 실제 Site consumer build로 Publishability를 검증한다.

Agent가 Article source를 분석할 때:

1. source에서 사용된 공식 MDX component를 식별한다.
2. 현재 package manifest에 존재하는지 확인한다.
3. props/children contract 위반을 진단한다.
4. CMS Visual adapter 유무와 관계없이 공식 component 여부를 판정한다.
5. 최종 Site build 결과를 publish gate로 사용한다.

## 의도적으로 포함하지 않는 정보

- Payload 전용 field config
- React/Astro component import path
- CSS/theme 정보
- final preview renderer
- arbitrary JavaScript expression semantics
- deployment state

이 정보까지 manifest에 넣으면 shared content contract가 특정 authoring/rendering framework에 다시 결합된다.

## 버전 정책

manifest 자체는 `schemaVersion`을 가진다. component package도 별도의 semantic version을 가진다.

정확한 package compatibility policy와 registry/publishing 방식은 아직 미결이며 Open Questions (`docs/open-questions.md`)에서 추적한다.

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

상태: 2026-09-20 Content Authoring & Publishing Contract를 반영한 1.0 제품 경계.

## Release Goal

Deliver a usable and extensible workflow for authoring Articles and publishing them to a live site.

## Product Boundary

| Capability | 요구되는 관찰 가능한 결과 |
|---|---|
| Authoring | Article을 생성·수정할 실용적인 UX 또는 DX가 있다. 지원되는 content는 Visual Editor에서 편집할 수 있고, Visual Editor가 무손실로 표현하지 못하는 source는 손실 없는 Source editing path로 다룰 수 있다. 최종 Site와 동일한 WYSIWYG Preview는 필수가 아니다. |
| Canonical Content | Article을 생성·조회·수정할 수 있고 authoritative raw Markdown/MDX source가 CMS editor state와 독립적으로 지속된다. Visual Editor의 표현 한계가 canonical source의 저장 가능 범위를 결정하지 않는다. |
| Extensibility | 공식 MDX component가 명시적인 versioned content-component contract를 통해 정의된다. Site는 rendering consumer이고 CMS는 authoring adapter이며, Visual adapter가 없어도 공식 source는 보존·발행할 수 있다. |
| Automation | 최소 하나의 automated 또는 agent-assisted workflow가 실제 publishing process에 참여한다. |
| Publishing | canonical content를 계약된 generated document set으로 결정적으로 투영한다. Publishability는 CMS Visual Editor round-trip이 아니라 content/component contract와 실제 Site consumer 검증으로 판정한다. |
| Presentation | generated documents와 공식 content components를 최종 사용자용 사이트로 렌더링한다. 프레임워크는 구현 레포에서 결정한다. |
| Delivery | 검증된 publishable 결과가 발행 경로를 거쳐 실제 GitHub Pages 사이트에 배포되고 성공 Evidence를 남길 수 있다. |

세부 Markdown/MDX 지원 수준은 Content Authoring & Publishing Contract (`docs/content-authoring-contract.md`)가 소유한다.

## 명시적 제외 범위

- canonical database backup / restore
- production-grade availability / HA
- advanced agent orchestration
- full-featured visual CMS
- complete WYSIWYG preview
- 모든 Markdown/MDX 표현의 Visual Editing
- arbitrary JavaScript execution 또는 문서별 임의 module import를 기본 MDX contract로 지원
- 일반 Site UI 전체를 Article content component contract로 공개

## 검증

각 capability의 요구 수준을 실제 구현과 대조하고 재현 가능한 Evidence를 연결한다. 부분 구현·완료·미검증을 구분한다. 모든 capability를 이름 그대로 Item으로 생성하지 말고, 발견된 gap에 대해 독립적인 delta Item을 만든다.

현재 검증 스냅샷과 기준 revision은 Implementation Map (`docs/implementation-map.md`)에 둔다. 2026-09-20 authoring/content contract를 구체화하면서 일부 기존 capability 판정을 재평가했다. 상태 하향은 구현 regression이 아니라 **1.0 요구 수준이 CMS-independent canonical source와 consumer-based publishability까지 명시적으로 확장된 결과**일 수 있다.

이 문서 자체는 **1.0 Definition을 확정하는 설계 Item의 Evidence**가 될 수 있지만, 1.0 구현 완료 Evidence는 아니다. 실제 구현 상태는 Implementation Map과 책임 레포의 immutable Evidence로 판정한다.

<!-- END SOURCE: docs/release-1.0.md -->


---

<!-- BEGIN SOURCE: docs/implementation-map.md -->

# Implementation Map

기준일: 2026-09-20. 이 문서는 Publishing Platform 1.0의 제품 경계를 실제 구현과 대조한 **revision-bound 검증 스냅샷**이다. 설계 정의는 Release 1.0 (`docs/release-1.0.md`)과 Content Authoring & Publishing Contract (`docs/content-authoring-contract.md`)를 따르고, 상태 판정은 아래 revision과 연결된 immutable Evidence를 근거로 한다.

## 기준 revision

| 역할 | Repository | Revision |
|---|---|---|
| Authoring / canonical state / publishing | [`ooMia/oomia.github.io.engine`](https://github.com/ooMia/oomia.github.io.engine) | [`6ba2f950a78eef18c2efa305b96a1c8d0443252e`](https://github.com/ooMia/oomia.github.io.engine/commit/6ba2f950a78eef18c2efa305b96a1c8d0443252e) |
| Generated documents | [`ooMia/oomia.github.io.docs`](https://github.com/ooMia/oomia.github.io.docs) | [`50d89a4cb1c5d6476444e29454e12b523e99231b`](https://github.com/ooMia/oomia.github.io.docs/commit/50d89a4cb1c5d6476444e29454e12b523e99231b) |
| Presentation / delivery | [`ooMia/oomia.github.io`](https://github.com/ooMia/oomia.github.io) | [`a3b2e182563458636b7b8186a4cd2201894b2a65`](https://github.com/ooMia/oomia.github.io/commit/a3b2e182563458636b7b8186a4cd2201894b2a65) |

`oomia.github.io`의 package name은 `oomia.github.io.mono`이고 engine 문서에서는 이를 `mono`라고 부른다. 별도 원격 `oomia.github.io.mono` 레포가 있다는 뜻은 아니다.

## 이번 재평가의 의미

2026-09-20에 두 가지 기준 변화와 새로운 Evidence를 반영했다.

1. canonical raw source를 CMS Visual Editor의 표현 능력에서 분리하고, storage / editing / publishing을 독립 계약으로 정의했다.
2. 공식 MDX component의 장기 경계를 versioned public content-component package로 정의했다.
3. site revision `a3b2e182...`에 대한 GitHub Pages run [35472028484](https://github.com/ooMia/oomia.github.io/actions/runs/35472028484)에서 build와 deploy가 모두 성공했고, [Pages artifact 10593195312](https://github.com/ooMia/oomia.github.io/actions/runs/35472028484/artifacts/10593195312)가 생성된 것을 확인했다.

따라서 일부 capability의 상태가 바뀐다. Canonical Content와 Publishing의 하향은 코드 regression이 아니라 **1.0 contract가 더 강하게 정의된 결과**다. Delivery의 상향은 실제 deployment Evidence가 추가된 결과다.

## 1.0 capability 상태

상태는 **미검증 / 미충족 / 부분 충족 / 충족**만 사용한다. `충족`은 현재 1.0 Product Boundary의 요구를 충족한다는 의미이며, 전체 제품 완성이나 production-grade 품질을 뜻하지 않는다.

| Capability | 상태 | 확인한 Evidence | 남은 delta |
|---|---|---|---|
| Authoring | **부분 충족** | Payload self-hosted CMS에서 로그인, 시각적 작성, 저장, 재편집, 재조회가 E2E로 검증되어 있다. 현재 Article body는 hidden string이고 editor는 virtual RichText다. [e2e.ts](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/scripts/e2e.ts), [Payload config](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/src/payload.config.ts) | 현재 일반 save path는 raw `body` 직접 저장을 거부하고 모든 편집 문서를 Lexical round-trip 가능한 subset으로 제한한다. Visual에서 무손실 표현할 수 없는 Markdown/MDX를 위한 Source editing fallback과 안전한 capability 판별이 필요하다. |
| Canonical Content | **부분 충족** | PostgreSQL에는 Article `body`가 문자열로 저장되고 virtual editor state는 DB 열이 아니다. metadata-only update와 기존 raw body 보존도 integration test로 검증되어 있다. [integration.ts](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/scripts/integration.ts), [content contract](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/src/content-contract.ts) | 저장소 내부 표현은 raw string이지만 public/application save contract는 editor state를 요구하고 direct raw update를 차단한다. CMS-independent raw source create/update path와 Exact preservation contract를 구현해야 한다. |
| Extensibility | **부분 충족** | 등록된 MDX `Callout`을 CMS 변환 계약과 site renderer 양쪽에서 opt-in 처리하며 실제 consumer build에서 렌더를 검증한다. [engine editor](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/src/editor.ts), [site renderer commit](https://github.com/ooMia/oomia.github.io/commit/75a3235068dc77b0d99cc8b5391f4a84329177aa) | component spec이 engine/site에 분산되어 있다. Site가 소유하는 versioned public content-component package와 shared type/runtime manifest를 도입하고, Visual adapter 유무와 공식 component 여부를 분리해야 한다. |
| Automation | **충족** | Payload Admin의 명시적 `사이트 발행` action이 `POST /api/publish`를 통해 기존 `vp run docs:publish`를 호출한다. 중복 실행 거부와 non-zero 실패 전파가 테스트되었고 실제 path가 main-only guard까지 도달했다. 동일 snapshot의 idempotent no-op도 정상 publishing result다. [Publish action](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/src/components/PublishAction.tsx), [publish adapter](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/src/publish.ts), [Issue #8](https://github.com/ooMia/oomia.github.io.engine/issues/8) | 현재 1.0 boundary의 최소 triggered automation 요구는 충족한다. |
| Publishing | **부분 충족** | 운영 DB snapshot을 결정적인 md/mdx + manifest로 만들고 실제 Astro consumer의 sync/lint/test/typecheck/build를 통과시킨 뒤 docs/site/engine revision을 필요한 경우 갱신하는 verified workflow가 존재한다. [docs workflow](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/scripts/docs-workflow.ts), [docs snapshot](https://github.com/ooMia/oomia.github.io.docs/commit/50d89a4cb1c5d6476444e29454e12b523e99231b) | publish 전에 모든 DB body를 CMS codec으로 decode/encode해 Visual Editor representability를 사실상 gate로 사용한다. 이를 content/component contract + actual consumer build 기반 검증으로 분리해 Source-only지만 Site에서 지원되는 content도 publish 가능하게 해야 한다. |
| Presentation | **충족** | site가 docs submodule의 md/mdx를 Astro content collection으로 읽고 article page에서 렌더한다. engine의 격리 통합 검증은 실제 site build와 등록 Callout HTML까지 확인한다. [content config](https://github.com/ooMia/oomia.github.io/blob/a3b2e182563458636b7b8186a4cd2201894b2a65/apps/web/src/content.config.ts), [article page](https://github.com/ooMia/oomia.github.io/blob/a3b2e182563458636b7b8186a4cd2201894b2a65/apps/web/src/pages/articles/%5B...id%5D.astro) | 일반 Site UI와 Article content component의 package boundary를 분리하는 것은 Extensibility delta에서 다룬다. |
| Delivery | **충족** | verified docs SHA를 소비하는 site main revision이 존재하고, 해당 revision `a3b2e182...`에 대한 GitHub Pages run [35472028484](https://github.com/ooMia/oomia.github.io/actions/runs/35472028484)에서 build와 deploy가 모두 성공했다. [Pages artifact 10593195312](https://github.com/ooMia/oomia.github.io/actions/runs/35472028484/artifacts/10593195312)도 생성되었다. | 현재 1.0 boundary의 실제 deployment Evidence 요구는 충족한다. 향후 content delta가 있는 publish에 대한 end-to-end deployment 관찰은 regression/evidence 강화 항목이다. |

## 기준 revision에서 확인된 1.0 gap

우선 추적할 구현 delta는 다음과 같다.

1. **Canonical Authoring Contract:** raw Markdown/MDX source를 CMS adapter와 독립적으로 create/update하고 Source mode에서 Exact 보존할 수 있게 한다.
2. **Editing compatibility:** Visual round-trip 가능 여부를 storage/publish gate가 아니라 authoring capability로 분리하고 안전한 Source fallback을 제공한다.
3. **Content Component Contract:** Site repository가 소유하는 versioned public content-component package의 최소 surface를 만들고 engine/site가 같은 계약을 소비하게 한다.
4. **Publishing validation:** CMS codec round-trip을 global publish gate에서 제거하고 component/content contract + real Site consumer validation으로 책임을 이동한다.
5. **Release gate:** package compatibility policy, generated document public contract, 최종 1.0 release gate AC를 확정한다.

draft/public lifecycle, preview 고도화, revision history는 위 contract를 안정화한 뒤 독립 delta로 다룬다.

## 갱신 규칙

이 문서는 현재 작업 세션이나 live branch 상태를 추적하지 않는다. 그런 정보는 Current Handoff (`handoff/current.md`)에 두고, 구현 상태를 말할 때는 이 문서의 기준 revision을 먼저 확인한다. 구현 레포의 `main`이 기준 revision보다 진행되었으면 최신 코드·테스트를 다시 조사한 뒤 이 문서를 갱신한다. 설계 문서만으로 구현 상태를 올리지 않으며, `충족` 판정에는 재현 가능한 코드·테스트·commit·deployment 등의 Evidence가 필요하다.

Product Boundary 자체가 변경되면 기존 구현이 그대로여도 capability 판정이 바뀔 수 있다. 이 경우 regression과 contract 강화에 따른 재평가를 구분해 기록한다.

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
| D002 | docs는 generated projection | 사용자 명시, S2 `4c1f839e` | docs를 canonical authoring source로 취급 |
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
| D014 | 공식 MDX component contract는 Site 쪽에서 소스 변경을 소유하는 versioned public content-component package로 공유한다 | 사용자 제안 및 승인, 2026-09-20 | engine과 site가 component spec을 각각 암묵적으로 복제 |
| D015 | CMS는 공식 component의 authoring adapter이고 Site는 rendering consumer다. Visual adapter 유무는 publishability를 결정하지 않는다 | 사용자 승인, 2026-09-20 | CMS registry가 플랫폼 전체 MDX 지원 범위를 결정 |
| D016 | Publishability는 CMS codec round-trip이 아니라 content/component contract와 실제 Site consumer 검증으로 판정한다 | D012–D015의 구현 원칙, 2026-09-20 | 모든 DB body에 Visual Editor representability를 요구하는 global publish gate |
| D017 | Knowledge에는 raw conversation transcript를 저장하지 않고 source/turn provenance metadata와 canonical knowledge만 유지한다 | 사용자 위임에 따른 agent 결정, 2026-09-20 | `provenance/conversations.json`에 원문 대화를 장기 보존하거나 handoff와 세션 transcript archive를 결합 |

D005의 다중 선택 설정, Delivery 옵션 등록은 실제 Project에서 확인되지 않았다. D007 등 초기 assistant 제안을 사용자의 명시적 승인 발언으로 인용하지 않는다. engine container 배포 및 Validation 옵션은 결정이 아니라 미결 제안이다.

D010은 **설계 정의가 Outcome인 경우에만** 적용한다. 기능 구현·품질·배포 성공은 구현 레포의 코드·테스트·commit/PR·실행/deployment Evidence가 별도로 필요하다.

D011의 현재 기준 revision과 capability 판정은 [Implementation Map](implementation-map.md)에 기록한다. Product Boundary가 변경되면 동일한 구현 revision도 다시 판정할 수 있으며, contract 강화에 따른 상태 하향을 regression과 구분한다.

D012–D016의 세부 정책과 예제별 지원 수준은 [Content Authoring & Publishing Contract](content-authoring-contract.md)가 소유한다. machine-readable component manifest는 현재 [planning schema](content-component-schema.md) 단계이며 published package API가 확정되었다는 뜻은 아니다.

D017에 따라 세션의 장기 의미는 canonical 문서·Decision Log로 승격하고, 일시적인 실행 상태만 `handoff/current.md`에 유지한다. 원문 대화가 필요하면 원래 대화 시스템을 참조하며 Knowledge repository는 transcript archive 역할을 맡지 않는다.

<!-- END SOURCE: docs/decisions.md -->


---

<!-- BEGIN SOURCE: docs/open-questions.md -->

# Open Questions / Verification Gaps

현재 canonical 정책에서 **사용자 결정이나 설계 선택이 아직 필요한 항목**만 유지한다. GitHub live 상태처럼 조회로 해결되는 운영 확인 사항은 [Current Handoff](../handoff/current.md)에 두고, 구현 수준과 revision-bound Evidence는 [Implementation Map](implementation-map.md)이 소유한다.

| ID | 항목 | 현재 처리 |
|---|---|---|
| Q003 | 1.0 public contract 목록·compatibility policy·release gate | Content authoring/component 방향은 확정. generated document public contract, package compatibility, 최종 release gate는 추가 결정 필요 |
| Q006 | Status 옵션 및 계획 Item의 Objective/Target Release 빈 값 허용 규칙 | 명시적으로 확정할 필요 있음 |
| Q007 | Work Type Validation 추가 | 보류. 현재 기본값은 5개 유지 |
| Q008 | engine container/artifact 배포 | 방향성 후보. 필요 시 별도 결정 |
| Q010 | 미디어 공개 범위·저장 위치와 임시 블로그 채널 | 운영 필요 시 결정 |
| Q011 | public content-component package의 실제 이름, registry, release transport, semantic compatibility policy | architecture는 versioned public package를 요구하지만 npm registry/package name/version coupling은 구현 시 결정 |
| Q012 | component manifest schema의 최종 runtime API | [planning schema](content-component-schema.md)를 추가했으나 실제 package export shape와 generator 사용 여부는 구현 전 검증 필요 |
| Q013 | 외부 Markdown/MDX import 시 frontmatter와 canonical structured metadata의 매핑 | body raw source 원칙은 확정. imported frontmatter를 DB field로 흡수할지, import-only contract로 둘지 미결 |
| Q014 | raw HTML 및 asset resolution의 구체적인 publish security/portability policy | Source 저장은 허용하는 방향. 어떤 HTML/asset reference를 consumer가 허용할지는 site contract에서 구체화 필요 |
| Q015 | 공식 MDX component의 rich Markdown/MDX children 범위 | manifest는 children model을 표현할 수 있게 계획했으나 1.0 component별 실제 허용 범위는 implementation에서 결정 |

## 분리 원칙

- **결정이 필요한 질문** → 이 문서
- **현재 GitHub/branch/Project 상태를 다시 확인해야 하는 항목** → [Current Handoff](../handoff/current.md)
- **특정 revision에서 검증된 capability와 남은 구현 delta** → [Implementation Map](implementation-map.md)
- **이미 확정된 방향과 대체된 결정** → [Decision Log](decisions.md)

초기 지식 레포 구성에 사용한 대화의 source/turn metadata는 provenance에 역사적 근거로 남기되 raw transcript는 저장하지 않는다. 현재 정책과 실제 repository 검증 결과가 있는 항목은 canonical 문서와 Implementation Map을 우선한다.

<!-- END SOURCE: docs/open-questions.md -->


---

<!-- BEGIN SOURCE: CONTRIBUTING.md -->

# 수정 방법

1. [CONTEXT.md](CONTEXT.md)에서 해당 규칙을 소유하는 파일을 찾는다.
2. 원본 Markdown을 수정한다. 새로운 제안은 확정된 규칙으로 섞지 말고 [open-questions.md](docs/open-questions.md)에 기록한다.
3. 의미 있는 방향 변경에는 [decisions.md](docs/decisions.md)에 stable ID, 상태, 이유, 출처, 대체한 결정을 남긴다. 과거 기록을 삭제하지 않는다.
4. 구현 상태를 변경하려면 [Implementation Map](docs/implementation-map.md)의 기준 revision보다 구현 레포가 진행되었는지 확인하고 실제 코드·테스트·commit/deployment Evidence를 다시 조사한다.
5. [CHANGELOG.md](CHANGELOG.md)를 갱신하고 `python3 scripts/bundle.py`를 실행한다.
6. 변경 내용을 Git diff로 검토하고 커밋한다.

규칙의 중복 복사는 피한다. GitHub Project README와 필드 description은 이 레포의 canonical 정의를 가리키는 탐색 계층으로 유지한다. 별도 레포의 코드와 계약을 함께 바꾸는 경우 관련 PR/commit을 서로 연결한다.

## Evidence

설계·계획 정의 자체가 Outcome이면 관련 canonical 문서의 immutable commit/permalink를 완료 Evidence로 사용할 수 있다. `main` 링크는 최신 정의를 찾는 reference로 사용한다.

기능 구현, 성능·신뢰성 검증, 실제 publishing/deployment 완료에는 설계 링크를 대체 Evidence로 사용하지 않는다. 책임 레포의 코드·테스트·실행 결과·commit/PR·deployment처럼 재현 가능한 자료가 필요하다.

## 세션 인계

의미 있는 작업 세션을 종료할 때 장기적으로 남아야 할 규칙·결정은 먼저 owning canonical 문서에 반영한다. 아직 진행 중인 branch/Issue/Project 상태, 재검증 항목, 다음 안전한 행동은 `handoff/current.md`에 기록한다.

`handoff/current.md`는 세션 로그나 의사결정 원장이 아니다. 매번 최신 checkpoint로 overwrite하고, 과거 상태는 Git history에 맡긴다. 구현 수준은 handoff가 아니라 revision-bound [Implementation Map](docs/implementation-map.md)과 책임 레포 Evidence로 판정한다.

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
| `b0174bce-6fff-4f18-bd3a-d931088e34c7` | [@GitHub](plugin://github@openai-curated-remote) [https://github.com/users/ooMia/projects/11/](… |
| `72f26f1b-8a12-4af1-b990-b95223fb8d41` | GitHub Project에 README로 설계안을 기록해두는 게 LLM을 사용하는 동안 컨텍스트 전달이 불편한데, Notion이나 다른 MCP 붙이고 별도로 정리해두는 … |
| `f55d6e75-29f6-4b53-a2b8-121a27384873` | 실제 필드에 **Authoring Experience가 있는데, 이건 유지하는 게 좋을까 삭제해도 좋나** - **Authoring Experience** - **Cano… |
| `353c6aa1-89d0-450f-b803-f87a069dfbd8` | 1. Canonical Content&#x20; 2. Publishable Projection&#x20; 3. Extensible Workflow&#x20; 4… |
| `f4b8c972-620f-4473-aaf9-4624d9f04f3e` | Objectives는 필드입니다. 해당 필드의 존재 목적에 따라 item에 어떤 속성을 선택해야 할 지에 대한 설명을 작성하시오… |
| `9368804c-56e9-4f34-bbc7-22ecc603e441` | ## Objectives 각각에 대한 description이 필요하다. 그리고 다음부터는 README처럼 문서를 변경할 때, 수정이 용이하도록 파편화된 부분을 제공하기보단… |
| `5a382a65-6b1f-495a-8055-ec48dd9122ec` | 현재의 Objective는 description이 없는데, GitHub Project 초안 작성 채팅 세션 내용을 참고해서 작성해보자&#x20; Release Targ… |
| `924e880a-e689-486a-bdf2-c6fb19248b6c` | markdown # Publishing Platform Turn structured content into customizable, deployable sites t… |

## 수집 한계

초기 대화 수집 자체는 GitHub Project 실제 설정과 구현 소스를 검증하지 않았다. 이후 2026-09-18에 engine/docs/site 구현 레포를 별도로 조사했으며 그 결과는 [Implementation Map](../docs/implementation-map.md)에 기록한다. GitHub Project의 live 필드·Item·Status Update는 여전히 이 provenance 수집 범위가 아니다. 최신 canonical 문서에 승격되지 않은 초기 제안은 현재 정책으로 간주하지 않는다.

<!-- END SOURCE: provenance/README.md -->
