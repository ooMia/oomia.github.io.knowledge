# Publishable Projection & Metadata Enrichment Contract

상태: 2026-09-21 canonical design contract.

## 목적

Publishing Platform은 **사람이 작성하는 원본 문서**와 **Site가 실제로 소비하는 publishable document**가 같다고 가정하지 않는다.

핵심 모델:

```text
Canonical Authoring Source
        │
        ├─ inline metadata
        ├─ sidecar/reference metadata
        ├─ repository/consumer defaults
        └─ deterministic derived metadata
        │
        ▼
Metadata Resolution / Enrichment
        │
        ▼
Publishable Projection
        │
        ▼
Site Consumer
```

DB-backed export는 제거하지만, **publish-time enrichment/transformation은 플랫폼의 핵심 기능**으로 유지한다.

## 1. Canonical Authoring Source

Canonical Authoring Source는 사람이 Obsidian, Fumadocs Editor, IDE/Agent 등에서 직접 다루는 문서와 관련 입력이다.

- durable shared revision은 `ooMia/oomia.github.io.docs`의 Git commit으로 식별한다.
- source document는 Site contract를 만족하는 모든 metadata를 직접 포함할 필요가 없다.
- authoring 편의를 위해 source frontmatter를 최소화할 수 있다.
- publish-only metadata를 source body에 강제로 섞지 않는다.
- source revision을 publish하기 위해 Engine이 dirty working tree를 자동 commit하지 않는다(D034).

## 2. Metadata Inputs

metadata는 한 가지 저장 위치로 강제하지 않는다.

후보:

### Inline frontmatter

```yaml
---
title: Example
tags: [java, architecture]
---
```

장점:
- 문서와 함께 이동
- Obsidian Properties와 직접 호환
- 이해하기 쉬움

단점:
- publish-only/generated metadata가 authoring source를 오염시킬 수 있음
- 자동 생성 값 변경이 문서 diff를 크게 만들 수 있음

### Sidecar / reference file

예:

```text
article.md
article.meta.yaml
```

또는:

```text
metadata/
└─ article.yaml
```

장점:
- author-written source와 publish metadata 분리
- Agent/automation이 metadata만 갱신하기 쉬움
- 같은 source를 여러 consumer projection에 재사용하기 쉬움

단점:
- source와 metadata의 linkage rule이 필요
- rename/move 시 referential integrity를 관리해야 함

### Repository / consumer defaults

예:

- 기본 author
- 기본 locale
- route prefix
- taxonomy defaults
- Site-specific rendering option

document마다 반복하지 않아도 되는 값에 사용한다.

### Deterministic derived metadata

source revision이나 content에서 재현 가능하게 계산할 수 있는 값.

예:

- slug / route
- reading time
- content hash
- Git-derived created/updated revision metadata
- summary/description
- normalized tags
- heading index / TOC input

Agent/LLM이 값을 생성하는 경우에도 publish reproducibility를 위해 결과를 고정된 input으로 기록할지, build-time deterministic generation으로 취급할지 별도 정책이 필요하다.

## 3. Metadata Resolution

projection 생성 전에 metadata input을 하나의 resolved model로 합친다.

필수 원칙:

1. metadata source precedence가 명시적이어야 한다.
2. 같은 입력에서 같은 resolved metadata가 나와야 한다.
3. conflict가 silent overwrite되지 않아야 한다.
4. required publish metadata가 누락되면 document-level diagnostic을 제공한다.
5. source document를 mutation해야만 resolution이 가능한 구조를 피한다.

정확한 precedence는 아직 미결이다.

예시 후보:

```text
consumer defaults
      ↓
repository defaults
      ↓
sidecar/reference metadata
      ↓
inline frontmatter
      ↓
explicit publish override
```

이 순서는 예시이며 현재 확정된 policy가 아니다.

## 4. Publishable Projection

Publishable Projection은 Site consumer contract를 만족하도록 materialize한 document set이다.

projection은 source와 다음이 달라질 수 있다.

- frontmatter field 추가/정규화
- derived metadata 주입
- route/slug metadata 추가
- component registry 정보 주입
- asset reference 정규화
- consumer-specific metadata 변환
- publish-only/generated field 추가
- 필요 시 body-level deterministic transform

그러나 projection은 **새 SoT가 아니다**.

- canonical input은 docs source revision + declared metadata inputs다.
- projection은 재생성 가능해야 한다.
- projection 수정 사항을 다시 source에 수동 merge하는 workflow를 기본으로 만들지 않는다.

## 5. Reproducibility

최소 invariant:

> 동일한 source revision + 동일한 declared metadata inputs + 동일한 projection contract/version은 동일한 publishable projection을 만든다.

Engine Evidence에는 가능하면 다음을 연결한다.

- source docs SHA
- projection contract/version
- metadata input revision/hash
- projection hash 또는 manifest
- Site revision/build result

## 6. Materialization Location

projection을 어디에 materialize할지는 아직 확정하지 않는다.

후보:

### A. Ephemeral staging projection

```text
docs source SHA
     ↓
Engine temp/staging
     ↓
Site build
```

장점:
- generated files를 Git에 남기지 않음
- source/projection dual-SoT 위험 낮음

### B. Site working-tree projection

```text
docs source SHA
     ↓
Engine materialize
     ↓
Site generated/content directory
     ↓
Site commit/build
```

장점:
- Site revision에서 실제 consumed files를 그대로 확인 가능
- deployment artifact provenance 단순

단점:
- generated diff가 Site repository에 누적될 수 있음

### C. Dedicated projection artifact/repository

별도 artifact 또는 projection repo를 둘 수 있으나 1.0에는 비용 대비 필요성이 증명되지 않았다.

현재는 A/B를 Site/Fumadocs integration과 함께 비교한다.

## 7. Site Consumer Boundary

Site는 canonical authoring source 자체가 아니라 **projection contract**를 소비한다.

현재 live Site가 docs submodule의 모든 `md/mdx`를 직접 Article collection으로 읽는 것은 기존 implementation detail이다.

새 target에서는 다음 두 방식이 모두 가능하다.

- Site loader가 source + metadata inputs를 직접 resolve
- Engine이 projection을 먼저 materialize하고 Site는 projection만 읽음

Engine이 projection ownership을 가진다는 제품 목표를 고려하면 후자가 더 명시적일 수 있으나, 실제 Fumadocs/Astro integration complexity를 보고 결정한다.

## 8. Engine Responsibility

Engine의 핵심 operation은 단순 validate/push 이상이다.

```text
resolve source revision
        ↓
discover publishable documents
        ↓
resolve metadata
        ↓
materialize projection
        ↓
validate projection
        ↓
run actual Site consumer verification
        ↓
publish revision linkage / delivery
```

따라서 public command 후보는 이후 다음 semantics를 중심으로 정의한다.

- `doctor`: environment/workspace prerequisites 진단
- `verify`: source + metadata → projection materialization + Site consumer validation, external mutation 없음
- `publish`: committed source revision을 verify한 뒤 remote/revision linkage/delivery 수행

## 9. Non-goals

1.0에서 다음을 강제하지 않는다.

- 모든 metadata를 source frontmatter에 직접 기록
- 모든 metadata를 sidecar file로 분리
- projection을 canonical source로 승격
- projection을 반드시 Git commit으로 저장
- DB를 metadata SoT로 재도입
- authoring editor가 모든 publish metadata를 표시/편집

## 10. 다음 결정

- metadata location / precedence
- document identity와 sidecar linkage rule
- generated/LLM metadata를 재현 가능 input으로 만드는 방식
- projection materialization location
- Site가 source를 직접 resolve할지 projection만 소비할지
- projection manifest schema
