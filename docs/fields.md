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

## Status

| Option | Description |
|---|---|
| Backlog | Valid candidate not yet committed to an Iteration. |
| Todo | Committed to an Iteration and ready to start. |
| In progress | Actively being worked on. |
| Done | Outcome and acceptance criteria are satisfied with reproducible evidence. |
| Cancelled | Intentionally not pursued; superseded, rejected, or invalidated. |

Lifecycle 의미는 [Planning Model](planning-model.md)을 따른다.

## Work Type

GitHub Project option description은 아래 문구를 사용한다.

| Option | Field description |
|---|---|
| Feature | Adds or extends an intended behavior or rule within the owning repository. |
| Fix | Restores behavior or rules that were already intended or defined. |
| Refactor | Changes internal structure while preserving intended observable or normative behavior. |
| Maintenance | Keeps the repository healthy without a meaningful behavior, rule, or structural redesign. |
| Documentation | Improves communication of existing behavior, rules, or knowledge without changing the normative state. |
| Investigation | Reduces uncertainty through conclusions and evidence rather than making a production change the outcome. |

Work Type은 commit type이나 기술 영역이 아니다. 상세 decision tree, Investigation 승격 정책, few-shot examples는 [Work Classification](work-classification.md)을 따른다.
