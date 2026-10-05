# Project Fields

Project #11은 repository가 이미 제공하는 1차 분류를 반복하지 않는다. custom field는 실제 운영과 통계에 지속적으로 쓰이는 최소 축만 유지한다.

## Core fields

| 이름 | 질문 | 규칙 |
|---|---|---|
| Status | 지금 어떤 실행 상태인가? | Backlog / Todo / In progress / Done / Cancelled |
| Iteration | 언제 수행하는가? | committed 또는 historical work에 사용 |
| Work Type | 왜 이 Issue가 존재하는가? | 정확히 하나. [Work Classification](work-classification.md) 기준 |

Repository, Labels, Linked pull requests, Parent issue, Sub-issues progress, Assignees 등은 GitHub native field를 그대로 사용한다.

Objective, Scope, Target Release, Deadline, Estimate custom field는 repository와 중복되거나 일관된 판정·운영 사용이 부족하여 Project taxonomy에서 제거한다.

## Field ownership

- `Status` option의 의미와 lifecycle은 [Planning Model](planning-model.md)이 소유한다.
- `Work Type` option의 의미와 판정은 [Work Classification](work-classification.md)이 소유한다.
- 이 문서는 Project #11에 어떤 field가 존재하고 언제 값이 필요한지에 대한 schema/cardinality/completeness만 소유한다.

## Completeness

Field completeness는 “모든 칸을 채운다”가 아니라 **의미상 필요한 값이 비어 있지 않게 한다**는 뜻이다.

- `Status`: Project Item이면 항상 하나의 유효한 값이 있어야 한다.
- `Work Type`: 실행 가능한 repository Issue이면 정확히 하나여야 한다.
- `Iteration`: `Todo / In progress`에는 현재 commitment가 반드시 있어야 한다. 실제 수행된 historical work(`Done / Cancelled`)는 수행 주차가 확인되는 경우 유지한다. 아직 수행하지 않은 `Backlog`와 Draft는 비운다.
- `Assignees`: 실제 작업 책임자가 정해진 executable Item에는 native field를 사용한다. 현재 개인 프로젝트의 executable Repository Issue는 별도 owner가 명시되지 않으면 `ooMia`를 기본 책임자로 materialize한다.
- `Linked pull requests`: 구현 PR이 존재하면 GitHub native Development relation을 우선한다. historical relation을 connector 제약 때문에 복구할 수 없으면 Issue/PR Evidence 링크로 사실을 보존하고 임의 metadata를 만들지 않는다.
- Labels, Milestone, Parent/Sub-issues 등 optional native field는 실제 의미가 있을 때만 채운다.

자동화는 확실한 invariant만 materialize한다. historical Iteration, Work Type, Assignee처럼 문맥 해석이 필요한 값은 현재 Project state와 Evidence를 확인해 보정한다.
