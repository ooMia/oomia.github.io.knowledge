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
| Iteration | 언제 수행·완료에 귀속되는가? | 정상 lifecycle에서는 유효한 period 하나; intentional empty 허용 |
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

### Invariant, Default, and optional metadata

| Kind | Fields / requirement | Materialization boundary |
|---|---|---|
| Invariant | Project Item의 `Status`는 유효 option 하나; executable Repository Issue의 `Work Type`은 유효 option 하나 | live schema와 explicit input으로 검증한다. 의미를 추론하거나 intentional empty Iteration gate를 우회하여 자동 repair하지 않는다. |
| Normal lifecycle | `Iteration`은 Planning Model의 시작·진행·완료 기간 귀속 | 실제 period 선택과 빈 값의 suppression은 Project Orchestration을 따른다. |
| Default | 별도 책임자가 없는 executable Repository Issue의 native `Assignees`는 `ooMia` | admission 또는 허용된 reconciliation에서 빈 값만 채운다. 명시 owner를 교체하지 않는다. |
| Optional | Labels, Milestone, Reviewers, Issue type, Parent/Sub-issues, blocking 관계 등 | 실제 의미·요청·Evidence가 있을 때만 사용한다. 필수 completeness로 승격하거나 자동 생성하지 않는다. |

- 정상 `Todo / In progress`는 current commitment를 가지며, 명시적 close/cancel은 유효한 완료 period로 최종 귀속한다. 아직 commit되지 않은 `Backlog`/Draft는 Iteration을 비워둘 수 있다.
- existing Item의 empty Iteration은 자동 write를 억제하는 의도적 상태다. 다른 Invariant/Default가 불완전해 보여도 Status·Work Type·Assignees 등을 일반 reconciliation으로 채우지 않는다. 필요한 explicit correction은 Agent가 canonical context와 live Evidence를 읽고 판단한다.
- 구현 PR의 관계는 native Development relation 또는 명시적인 Issue/PR Evidence reference로 보존한다. 부분 기여 PR에 closing relation을 강제하지 않는다. historical relation을 복구할 수 없으면 실제 Evidence 링크를 사용하며 임의 metadata를 만들지 않는다. native auto-close와 `Refs / Closes`는 [Git Workflow](git-workflow.md#policy--issue-reference-and-completion-convention)를 따른다.
- Labels는 [Work Classification](work-classification.md)의 registry와 의미를 사용하며, 필요하지 않은 Label/Milestone/Reviewer를 자동 추가·생성하지 않는다.

Invariant는 필요한 의미를 정의하지만 불확실한 값을 overwrite할 권한을 뜻하지 않는다. automation은 분류·historical recovery·reopen처럼 Evidence/문맥 해석이 필요한 선택을 제목·날짜·repository 종류만으로 추론하지 않는다.
