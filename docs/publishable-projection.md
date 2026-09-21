# Publishable Projection & Metadata Enrichment Contract

상태: 2026-09-21 canonical design contract.

## 목적

Publishing Platform은 **사람이 작성하는 원본 문서**와 **Site가 실제로 소비하는 publishable document**가 같다고 가정하지 않는다.

핵심 모델:

```text
Authoring Draft
        │
        │ engine prepare
        │  ├─ frontmatter defaults/generation
        │  ├─ missing user-owned metadata detection
        │  └─ source validation
        ▼
Prepared Canonical Source
        │
        │ user review + git commit
        ▼
Committed Canonical Revision
        │
        │ deterministic projection
        ▼
Publishable Projection
        │
        ▼
Site Consumer
```

DB-backed export는 제거하지만, **pre-commit canonical-source enrichment와 post-commit deterministic projection은 모두 플랫폼의 핵심 기능**으로 유지한다.

## 1. Authoring Draft / Prepared Canonical Source

사람이 Obsidian, Fumadocs Editor, IDE/Agent에서 직접 다루는 working-tree document는 아직 commit 전일 수 있다.

### Authoring Draft

- body와 일부 frontmatter가 존재할 수 있다.
- required persistent metadata가 아직 없거나 불완전할 수 있다.
- Git commit으로 durable canonical revision이 되기 전 상태다.

### Prepared Canonical Source

Engine의 `prepare` operation을 통과해 **commit하기에 충분한 persistent metadata와 source contract**를 만족한 working-tree document다.

- `prepare`는 source file, 특히 frontmatter를 수정할 수 있다.
- Git stage/commit/push는 하지 않는다.
- 사용자가 diff를 검토하고 필요하면 값을 수정한 뒤 직접 commit한다.
- committed docs SHA가 durable canonical source revision이다.

따라서 canonical source의 authoritative shared state는 여전히 Git commit이지만, **Engine enrichment는 commit 전에 선행될 수 있고 때로는 반드시 선행되어야 한다.**

## 2. Metadata Storage — Frontmatter First

1.0 기본값은 **document frontmatter**다.

사람이 확인·수정하거나 문서와 함께 장기 보존해야 하는 metadata는 가능한 한 문서 frontmatter에 저장한다.

예:

```yaml
---
title: Example
description: ...
author: oomia
tags:
  - architecture
createdAt: 2026-09-21T12:00:00+09:00
---
```

이 선택은 다음 이유를 가진다.

- metadata가 문서와 함께 rename/move/clone된다.
- Obsidian Properties 같은 editor UI에서 통합 관리하기 쉽다.
- Agent/Engine 변경이 일반 Git diff로 드러난다.
- 별도의 metadata registry와 referential-integrity 문제를 기본 경로에서 제거한다.

### Sidecar / reference metadata

sidecar는 금지하지 않지만 기본 경로가 아니다.

다음과 같이 frontmatter에 넣기 부적절한 실제 사례가 생길 때 extension으로 도입한다.

- 매우 크거나 반복적인 consumer-specific data
- document와 lifecycle이 다른 generated artifact
- 여러 document가 공유하는 metadata
- binary/media metadata
- source file을 과도하게 오염시키는 structured data

sidecar를 도입하면 별도의 identity/linkage contract가 필요하다.

### Repository / consumer defaults

document마다 반복할 가치가 없는 기본값은 config/default layer에서 제공할 수 있다. 다만 **사용자가 장기적으로 의미를 부여한 값이 frontmatter에 존재하면 이를 임의로 덮어쓰지 않는다.**

### Derived metadata

source에서 언제든 재현 가능하고 사람이 보존·수정할 이유가 없는 값은 projection에서 계산하는 것을 우선한다.

예:

- reading time
- content hash
- generated TOC
- heading index
- consumer-specific normalized route

반대로 LLM/Agent output처럼 비결정적이거나 사람이 검토해야 하는 결과를 canonical metadata로 사용할 경우, publish 시 매번 재생성하지 않고 **prepare 단계에서 frontmatter에 materialize → review → commit**하는 방향을 우선한다.

## 3. Prepare-time Metadata Resolution

`prepare`는 frontmatter-first metadata를 검사하고 필요한 경우 source에 materialize한다.

필수 원칙:

1. **explicit frontmatter value가 있으면 authoritative**하며 Engine은 해당 field를 재계산하거나 덮어쓰지 않는다.
2. Engine enrichment는 unset/missing field를 보완하는 방향으로 시작한다.
3. unknown frontmatter key와 사용자가 명시한 metadata 의미를 보존한다.
4. `prepare`는 Git stage/commit/push를 하지 않는다.
5. formatting/serialization normalization 자체는 금지하지 않는다. VP formatter/linter나 선택한 YAML/Markdown tooling이 일관된 형식으로 정리할 수 있다.
6. metadata enrichment/formatting이 unrelated semantic content를 임의로 변경해서는 안 된다.

field generator, timestamp derivation, file/staged/all selection, prompt/diagnostic UX, normalization 수준은 초기 Knowledge contract로 고정하지 않고 Engine 구현 레포에 위임한다.

## 4. Publishable Projection

Publishable Projection은 Site consumer contract를 만족하도록 materialize한 document set이다.

projection은 source와 다음이 달라질 수 있다.

- projection-only derived metadata 추가/정규화
- consumer-specific metadata 주입
- route/slug metadata 추가
- component registry 정보 주입
- asset reference 정규화
- consumer-specific metadata 변환
- publish-only/generated field 추가
- 필요 시 body-level deterministic transform

그러나 projection은 **새 SoT가 아니다**.

- canonical input은 prepared source를 확정한 docs commit + projection contract/config다.
- projection은 재생성 가능해야 한다.
- projection 수정 사항을 다시 source에 수동 merge하는 workflow를 기본으로 만들지 않는다.

## 5. Reproducibility

최소 invariant:

> 동일한 prepared source revision + 동일한 projection contract/config/version은 동일한 publishable projection을 만든다.

Engine Evidence에는 가능하면 다음을 연결한다.

- source docs SHA
- projection contract/version
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

Engine operations는 source mutation boundary를 명확히 나눈다.

```text
prepare (working tree, source-mutating)
        ↓
user review / commit
        ↓
verify (read-only)
        ↓
publish (committed revision, source read-only, remote side effects)
```

### `doctor`

environment/workspace prerequisites를 진단한다.

### `prepare`

- working-tree documents를 대상으로 한다.
- persistent metadata/frontmatter를 보완·검증한다.
- 자동 생성 가능한 값을 materialize할 수 있다.
- 사용자 판단이 필요한 누락값은 해결되지 않은 상태로 명확히 보고한다.
- Git stage/commit/push는 하지 않는다.

### `verify`

- source를 수정하지 않는다.
- working tree 또는 committed revision에서 projection을 만들고 consumer validation을 수행할 수 있다.
- external mutation이 없어야 한다.

### `publish`

- D034에 따라 committed revision만 대상으로 한다.
- source를 수정하거나 새 canonical metadata를 생성하지 않는다.
- verify를 재현한 뒤 remote push, exact Site revision linkage, delivery를 수행한다.

## 9. Non-goals

1.0에서 다음을 강제하지 않는다.

- projection-only derived metadata까지 source frontmatter에 영구 기록
- frontmatter가 충분한 metadata를 sidecar file로 강제 분리
- projection을 canonical source로 승격
- projection을 반드시 Git commit으로 저장
- DB를 metadata SoT로 재도입
- authoring editor가 모든 publish metadata를 표시/편집

## 10. 다음 결정

Engine scratch의 `prepare` 구현 전에:

- actual Site/Fumadocs integration에서 projection materialization 위치
- public publish 전에 필요한 security/credential contract

Vertical slice의 Site integration 전에:

- projection materialization location
- Site가 projection을 어떤 directory/loader contract로 소비할지
- projection manifest/hash Evidence 형식

실제 sidecar 필요가 생길 때:

- document stable identity
- sidecar linkage / precedence
