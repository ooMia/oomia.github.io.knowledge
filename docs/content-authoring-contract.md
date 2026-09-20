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

knowledge repository의 [Content Component Manifest Schema](../schemas/content-component-manifest.schema.json)는 이 manifest의 계획용 draft다. 실제 published package API가 확정되기 전에는 implementation contract로 간주하지 않는다.

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
