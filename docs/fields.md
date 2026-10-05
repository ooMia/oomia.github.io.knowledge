# Project Fields

> **Authority:** POLICY  
> **Owner:** Project #11 field schema, cardinality, and completeness  
> **Scope:** custom and native fields used to represent Publishing Platform execution state  
> **Read when:** defining Project fields, checking field completeness, or deciding whether a value belongs in Project metadata  
> **Enforced by:** live Project #11 schema plus admission/reconciliation validation where implemented

Project #11은 repository가 이미 제공하는 1차 분류를 반복하지 않는다. custom field는 실제 운영과 통계에 지속적으로 쓰이는 최소 축만 유지한다.

## Core fields

| 이름 | 질문 | Cardinality / completeness |
|---|---|---|
| Status | 지금 어떤 실행 상태인가? | Project Item이면 정확히 하나 |
| Iteration | 언제 수행하는가? | lifecycle 의미상 필요한 경우 하나 |
| Work Type | 왜 이 Issue가 존재하는가? | executable Repository Issue이면 정확히 하나 |

Repository, Labels, Linked pull requests, Parent issue, Sub-issues progress, Assignees 등은 GitHub native field를 그대로 사용한다.

Objective, Scope, Target Release, Deadline, Estimate custom field는 repository와 중복되거나 일관된 판정·운영 사용이 부족하여 Project taxonomy에서 제거했다. 실제 repeated use-case가 생기기 전에는 단순 분류 편의를 위해 되살리지 않는다.

## Semantic owners

- `Status`와 `Iteration`의 lifecycle 의미 → [Planning Model](planning-model.md)
- `Work Type`과 Labels의 의미·선택 → [Work Classification](work-classification.md)
- activation/reconciliation materialization → [Project Orchestration](project-orchestration.md)
- 실제 current values → live GitHub Project #11 / repository-native state

이 문서는 위 의미를 다시 정의하지 않는다.

## Completeness rules

Field completeness는 “모든 칸을 채운다”가 아니라 **해당 lifecycle과 execution state에 필요한 값이 비어 있지 않게 한다**는 뜻이다.

- `Status`: Project Item이면 항상 하나의 유효한 option이 있어야 한다.
- `Work Type`: executable Repository Issue이면 정확히 하나여야 한다.
- `Iteration`:
  - `Todo / In progress`에는 current commitment가 있어야 한다.
  - explicit commitment가 있었거나 durable product/platform Git tree에 실제 구현이 남았다면 terminal Item에서도 Planning Model의 historical Iteration rule을 따른다.
  - 아직 commit되지 않았고 실제 구현도 없는 `Backlog`/Draft는 비운다.
  - substantive reopen 후 새 commitment가 없으면 Planning Model의 reopen rule에 따라 기존 historical Iteration을 비운다.
- `Assignees`: 실제 작업 책임자가 정해진 executable Item에는 native field를 사용한다. 현재 개인 프로젝트의 executable Repository Issue는 별도 owner가 없으면 `ooMia`를 기본 책임자로 materialize할 수 있다.
- `Linked pull requests`: 구현 PR이 존재하면 GitHub native Development relation을 우선한다. historical relation을 복구할 수 없으면 실제 Issue/PR Evidence 링크로 사실을 보존하고 임의 metadata를 만들지 않는다.
- Labels, Milestone, Parent/Sub-issues 등 optional native field는 실제 의미가 있을 때만 채운다.

automation은 이 completeness policy를 소비할 수 있지만, historical Iteration이나 classification처럼 Evidence/문맥 해석이 필요한 값을 날짜나 제목만으로 추론하지 않는다.
