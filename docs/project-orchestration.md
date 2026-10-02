# Project Orchestration

Publishing Platform Project #11과 repository Issue 사이의 **공통 coordination semantics**를 소유한다. 실제 workflow 파일, script, token/permission, runner, webhook process, branch base와 같은 실행 세부사항은 이를 구현하는 owning repository가 소유한다.

## Scope

- Repository Issue가 활성화되면 Project #11의 실행 상태와 연결될 수 있다.
- activation 이후의 current state는 GitHub Project fields와 repository-native Issue/PR relation이 소유한다.
- Docs처럼 Issue-driven implementation repository가 아닌 저장소는 동일한 orchestration을 강제하지 않는다.
- 공통 branch/PR/change-management invariant는 [Git Workflow](git-workflow.md)를 따른다.

## Issue activation semantics

활성 Repository Issue는 다음 초기화를 요청할 수 있다.

1. Project #11 Item 등록
2. 초기 `Status / Iteration / Work Type` materialization

Issue activation 자체는 Development relation을 만들지 않는다. Development branch/PR은 planning activation이 아니라 실제 작업 시작을 표현한다.

activation mechanism은 repository별 automation이 구현한다. Knowledge는 event 이름, workflow filename, runner, API 호출 방식이나 token 구성을 규정하지 않는다.

Draft 또는 아직 실행 범위가 확정되지 않은 Item은 [Planning Model](planning-model.md)의 lifecycle을 따른다. 활성화되지 않은 Draft 때문에 implementation branch를 만들지 않는다.

## Project seed

Repository Issue는 activation 초기값을 전달하기 위해 machine-readable `project-seed`를 사용할 수 있다.

```md
<!-- project-seed
{
  "iteration": null,
  "workType": "Feature",
  "status": "Backlog"
}
-->
```

지원되는 공통 의미:

- `status`: activation 시 요청할 초기 Project Status
- `iteration`: 초기 Iteration. 아직 commitment가 아니면 `null`
- `workType`: Issue Outcome의 Work Type
- `development: false`: branch가 필요하지 않은 coordination/document-only work임을 명시
- `branch`: 특정 repository implementation이 explicit override를 지원할 때 사용할 수 있는 optional hint

`project-seed`는 초기화 요청일 뿐이다. activation 이후 Project field가 current state의 source of truth이며, seed를 장기 상태 원장으로 사용하지 않는다.

seed 값은 [Planning Model](planning-model.md)과 [Work Classification](work-classification.md)을 위반하지 않아야 한다. 예를 들어 Iteration commitment가 없는 작업은 일반적으로 `Backlog`이며, `Todo`는 실제 Iteration commitment가 있는 상태다.

## Development relation

Development relation은 **실제 작업 시작의 signal**이다.

- `Backlog`: Iteration commitment와 Development branch/linked PR이 없다.
- `Todo`: Iteration commitment는 있지만 Development branch/linked PR은 아직 없다.
- Development branch를 생성·연결하면 `In progress`로 전환한다.
- linked PR이 등록되면 branch 생성 경로와 무관하게 `In progress`로 전환한다.
- branch/PR 없이 수행하는 작업은 실행 전에 최소한 Iteration commitment와 `Todo` 상태를 가져야 한다.
- Development relation이 생겼는데 Iteration이 없다면 automation이 임의의 Iteration을 추론하지 않는다. 불일치로 드러내고 commitment를 먼저 정한다.
- 실제 branch 이름, base branch, 생성 API, branch protection과 Status mutation 구현은 owning repository가 소유한다.
- 이미 존재하는 branch와 Issue relation이 불일치하면 automation이 임의로 추론해 연결하지 않고 repository-local recovery 절차를 따른다.

## Lifecycle reconciliation

Status의 의미와 canonical lifecycle은 [Planning Model](planning-model.md)이 소유한다. orchestration automation은 그 의미를 materialize할 뿐 두 번째 lifecycle 원본이 아니다.

공통적으로 자동화할 수 있는 것은 명확한 invariant에 한정한다.

- active candidate가 Iteration commitment를 얻으면 `Todo`로 진행할 수 있다.
- Development branch 생성 또는 linked PR 등록은 `In progress`를 의미한다.
- `Todo / In progress` 상태에서 commitment가 제거되면 실행 상태와 Development relation을 함께 재검토한다. active Development relation이 있는 상태를 자동으로 `Backlog`로 낮추지 않는다.
- `closed / completed` 결과는 `Done`과 연결할 수 있다.
- `closed / not_planned` 또는 명확한 cancellation 결과는 `Cancelled`와 연결할 수 있다.

Work Type, Assignee, historical Iteration처럼 해석이 필요한 값은 자동화가 임의로 추론하지 않는다. unknown state나 concurrent change를 발견하면 덮어쓰기보다 실패/검토 대상으로 남긴다.

## Ownership boundary

| Concern | Owner |
|---|---|
| Status/Iteration/Work Type 의미와 DoD | [Planning Model](planning-model.md), [Work Classification](work-classification.md) |
| activation 및 reconciliation의 공통 의미 | 이 문서 |
| 실제 Project field 값 | GitHub Project #11 |
| Issue/PR/Development relation | GitHub repository native state |
| workflow/script/API/token/runner 구현 | 실행하는 owning repository |
| 장기 webhook/runtime implementation | 해당 implementation repository의 code/docs |

공통 구현 상세를 Knowledge에 복제하지 않는다. 여러 repository에서 반복되는 실행 차이가 실제 coordination invariant로 승격될 때만 이 문서를 확장한다.
