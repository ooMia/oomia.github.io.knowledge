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

[Content Component Manifest Schema](../schemas/content-component-manifest.schema.json)는 custom component contract가 실제로 필요해질 때 사용할 수 있는 planning schema다.

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
