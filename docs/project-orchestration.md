# Project Orchestration

Publishing Platform Project #11과 repository Issue 사이의 **공통 coordination semantics**를 소유한다. Project admission의 공통 materialization 구현은 이 repository의 shared workflow/action이 소유하고, 각 caller repository는 event wiring·secret 전달과 repository-specific Development start를 소유한다. 장기 webhook runtime, branch base, branch 생성 방식 같은 실행 세부사항은 해당 owning repository가 소유한다.

## Scope

- Repository Issue가 활성화되면 Project #11의 실행 상태와 연결될 수 있다.
- activation 이후의 current state는 GitHub Project fields와 repository-native Issue/PR relation이 소유한다.
- Docs처럼 Issue-driven implementation repository가 아닌 저장소는 동일한 orchestration을 강제하지 않는다.
- 공통 branch/PR/change-management invariant는 [Git Workflow](git-workflow.md)를 따른다.

## Issue activation semantics

활성 Repository Issue는 다음 초기화를 요청할 수 있다.

1. Project #11 Item 등록
2. 초기 `Iteration / Work Type` materialization
3. Iteration이 없으면 `Backlog`, 있으면 `Todo`로 초기 Status 파생

Issue activation 자체는 Development relation을 만들지 않는다. Development branch/PR은 planning activation이 아니라 실제 작업 시작을 표현한다.

Project admission은 Knowledge의 shared workflow/action을 하나의 구현 원본으로 사용한다. caller repository는 Issue event 또는 explicit replay를 이 workflow에 연결하고 자기 `PROJECT_TOKEN`과 repository-scoped `GITHUB_TOKEN`을 전달한다. Development start, branch base와 branch 생성 방식은 계속 repository-local automation이 소유한다.

Draft 또는 아직 실행 범위가 확정되지 않은 Item은 [Planning Model](planning-model.md)의 lifecycle을 따른다. 활성화되지 않은 Draft 때문에 implementation branch를 만들지 않는다.

## Project seed

Repository Issue는 first admission에 필요한 machine-readable `project-seed`를 사용할 수 있다.

```md
<!-- project-seed
{
  "iteration": null,
  "workType": "Feature"
}
-->
```

Project admission에 사용되는 공통 값:

- `iteration`: 초기 Iteration. 아직 commitment가 아니면 `null`
- `workType`: Issue Outcome의 Work Type

초기 Status는 seed 입력이 아니다. activation automation은 Iteration이 없으면 `Backlog`, 있으면 `Todo`로 파생한다.

현재 repository-local Development automation은 같은 marker에서 다음 optional hint를 읽을 수 있다.

- `development: false`: explicit Development start에서 branch를 만들지 않음
- `branch`: explicit Development start가 지원할 때 사용할 branch name override

이 hint는 Project field나 lifecycle state가 아니며 activation 이후 current state를 대체하지 않는다. Project field의 current state는 GitHub Project가 source of truth다.

`workType`은 executable Repository Issue admission의 필수 semantic input이다. 이미 live Project Work Type이 있으면 replay가 seed로 덮어쓰지 않고, live 값이 비어 있을 때만 seed 값을 materialize한다. live 값과 seed가 모두 없으면 의미를 추론하지 않고 fail closed한다. 기존 `status` key가 남아 있어도 admission은 이를 무시하고 Iteration에서 초기 Status를 파생한다.

seed 값은 [Planning Model](planning-model.md)과 [Work Classification](work-classification.md)을 위반하지 않아야 한다.

## Development relation

Development relation은 actual work start를 관찰할 수 있는 **signal**이며 Status 의미 자체의 정의는 [Planning Model](planning-model.md)이 소유한다.

- `Backlog`: 아직 Iteration commitment가 없다.
- `Todo`: Iteration commitment는 있지만 실제 작업은 시작되지 않았다.
- `In progress`: Iteration commitment가 있고 실제 작업이 시작됐다.
- 새 linked PR은 실제 작업 시작의 명확한 observable signal이므로 `In progress`로 materialize한다. closed Issue에 새 PR link가 생기는 경우의 reopen semantics는 owning automation이 명시적으로 처리할 수 있다.
- Development branch도 owning repository integration이 그 relation을 신뢰성 있게 관찰할 수 있다면 `In progress` signal로 사용할 수 있다. 공통 automation이 관찰할 수 없는 branch event를 억지로 추론하지 않는다.
- branch/PR 없이 수행하는 조사·coordination·문서 작업도 실제 수행을 시작하면 `In progress`일 수 있다.
- commitment와 actual work start가 동시에 일어나면 Iteration과 `In progress`를 함께 materialize할 수 있으며, `Todo`를 중간 write로 강제하지 않는다.
- Development relation이 생겼는데 Iteration이 없다면 automation이 임의의 Iteration을 추론하지 않는다. 불일치로 드러내고 commitment를 먼저 정한다.
- 실제 branch 이름, base branch, 생성 API, branch protection과 Status mutation 구현은 owning repository가 소유한다.
- 이미 존재하는 branch와 Issue relation이 불일치하면 automation이 임의로 추론해 연결하지 않고 repository-local recovery 절차를 따른다.

## Lifecycle reconciliation

Status의 의미와 canonical lifecycle은 [Planning Model](planning-model.md)이 소유한다. orchestration automation은 그 의미를 materialize할 뿐 두 번째 lifecycle 원본이 아니다.

공통적으로 자동화할 수 있는 것은 명확한 invariant와 실제로 관찰 가능한 signal에 한정한다.

- `Backlog` candidate가 Iteration commitment를 얻고 더 강한 work-start signal이 없으면 `Todo`로 materialize할 수 있다.
- 이미 `In progress`이고 Iteration이 유지되는 Item을 단순히 `Todo`로 낮추지 않는다.
- 새 linked PR처럼 automation이 실제로 관찰한 work-start signal은 `In progress`로 materialize할 수 있다.
- `Todo / In progress` 상태에서 Iteration commitment가 제거되면 `Backlog` invariant를 복구한다. active Development relation이 남아 있다면 이를 정상 상태로 추론하지 않고 불일치로 드러내 별도 검토할 수 있다.
- `closed / completed` 결과는 `Done`과 연결할 수 있다.
- `closed / not_planned` 또는 명확한 cancellation 결과는 `Cancelled`와 연결할 수 있다.

Automation parity는 개별 transition의 존재뿐 아니라 transition priority와 resulting invariant까지 owning implementation에서 검증한다. Knowledge 문서만으로 runtime parity를 가정하지 않는다.

Work Type과 historical Iteration처럼 해석이 필요한 값은 자동화가 임의로 추론하지 않는다. admission은 missing Work Type을 validated `project-seed.workType`에서만 materialize하고 기존 live 값은 보존한다. 현재 개인 프로젝트의 executable Repository Issue에서 assignee가 비어 있으면 기본 책임자 `ooMia`를 deterministic하게 materialize할 수 있다. unknown state, conflicting semantic value나 concurrent change를 발견하면 덮어쓰기보다 실패/검토 대상으로 남긴다.

## Ownership boundary

| Concern | Owner |
|---|---|
| Status/Iteration/Work Type 의미와 DoD | [Planning Model](planning-model.md), [Work Classification](work-classification.md) |
| activation 및 reconciliation의 공통 의미 | 이 문서 |
| 실제 Project field 값 | GitHub Project #11 |
| Issue/PR/Development relation | GitHub repository native state |
| 공통 Project admission workflow/action | Knowledge `.github/workflows/project-admission.yml`, `.github/actions/project-admission/` |
| caller event wiring / Development start / branch base | 실행하는 owning repository |
| 장기 webhook/runtime implementation | 해당 implementation repository의 code/docs |

공통 Project admission 구현은 Knowledge에 한 번만 두고 caller repository에 복제하지 않는다. repository-local 실행 차이는 그 owning source에 두며, 여러 repository에서 반복되는 차이가 실제 coordination invariant로 승격될 때만 이 문서를 확장한다.
