# Project Orchestration

> **Authority:** POLICY  
> **Owner:** Repository Issue activation, observable-signal materialization, and Project #11 reconciliation semantics  
> **Scope:** common coordination between Issue-driven Publishing Platform repositories and Project #11  
> **Read when:** admitting/replaying an Issue, interpreting Development signals, or reconciling Project state  
> **Enforced by:** Knowledge shared Project-admission workflow/action and repository-local integrations where implemented

이 문서는 [Planning Model](planning-model.md)이 정의한 lifecycle **meaning**을 Project/native state에 materialize하는 공통 contract를 소유한다. 실제 Project field 값은 Project #11, Issue/PR relation은 GitHub repository native state가 소유한다.

## Scope and ownership

- Repository Issue가 활성화되면 Project #11 Item과 필요한 initial fields를 materialize할 수 있다.
- activation 이후 current state는 live Project fields와 repository-native Issue/PR relation이 source of truth다.
- Docs처럼 Issue-driven implementation이 중심이 아닌 repository에는 동일 orchestration을 강제하지 않는다.
- branch/PR integration invariant는 [Git Workflow](git-workflow.md)이 소유한다.
- caller event wiring, branch base/name, token/runner/runtime, webhook process 같은 implementation detail은 owning repository가 소유한다.

## Issue activation

Common admission은 활성 Repository Issue에 대해 다음 결과를 materialize할 수 있다.

1. Project #11 Item membership
2. initial Iteration / Work Type
3. Iteration 존재 여부에 따른 initial Status

Issue activation 자체는 actual work start나 Development relation을 의미하지 않는다. Draft 또는 실행 범위가 아직 확정되지 않은 candidate의 planning meaning은 [Planning Model](planning-model.md)을 따른다.

공통 admission implementation의 parser, API calls, field lookup, pagination, retries와 token handling은 Knowledge의 workflow/action/tests가 소유한다. 이 문서는 그 알고리즘을 복제하지 않는다.

## Project seed

Repository Issue는 first admission을 위한 machine-readable `project-seed`를 제공할 수 있다.

```md
<!-- project-seed
{
  "iteration": null,
  "workType": "Feature"
}
-->
```

Common semantic inputs:

- `iteration` → initial Iteration; commitment가 아직 없으면 `null`
- `workType` → Issue Outcome의 Work Type

`status`는 authoritative seed input이 아니다. initial Status는 Iteration이 없으면 `Backlog`, 있으면 `Todo`로 materialize한다.

replay에서 existing live Project value를 stale seed로 덮어쓰지 않는다. live Work Type이 비어 있을 때 validated `workType`을 사용할 수 있지만 live/seed 모두 없으면 의미를 추론하지 않고 fail closed한다.

branch name, Development start suppression 등 Project field가 아닌 repository-local hints가 같은 comment에 존재할 수 있지만, 그 의미는 해당 owning integration이 소유하며 이 공통 contract가 정의하지 않는다.

seed 값은 [Planning Model](planning-model.md), [Project Fields](fields.md), [Work Classification](work-classification.md)의 semantics를 위반하지 않아야 한다.

## Development signals

Development relation은 actual work start를 관찰할 수 있는 **signal**이다. `Backlog / Todo / In progress`의 의미 자체는 [Planning Model](planning-model.md)이 소유한다.

- 새 linked PR은 open Item의 work-start signal로 사용해 `In progress`를 materialize할 수 있다.
- Development branch도 owning integration이 relation을 신뢰성 있게 관찰할 수 있을 때 같은 signal로 사용할 수 있다.
- branch/PR 없이 진행되는 Investigation, coordination, documentation은 사람 또는 해당 execution interface가 work start를 명시적으로 materialize할 수 있다.
- commitment와 work start가 동시에 확인되면 Iteration과 `In progress`를 함께 materialize할 수 있으며 `Todo` intermediate write를 강제하지 않는다.
- work-start signal이 있는데 Iteration commitment가 없다면 arbitrary Iteration을 추론하지 않고 inconsistency로 드러낸다.
- branch/Issue relation이 불명확하면 이름이나 타이밍만으로 임의 연결하지 않고 repository-local recovery가 소유한다.

## Hierarchical materialization

Parent/sub-issue relation과 scoped integration branch를 사용하는 경우 common orchestration은 [Planning Model](planning-model.md#hierarchical-completion)의 scope-local completion semantics를 따른다.

- explicit GitHub parent/sub-issue relation을 hierarchy source로 사용한다. title, branch name, timing만으로 parent를 추론하지 않는다.
- parent integration branch는 owning workflow/state가 명시적으로 선택한 ref를 사용한다. branch 이름 패턴만으로 integration target을 추론하지 않는다.
- linked child PR이 선언된 parent integration branch에 merge된 사실은 child completion의 강한 integration Evidence가 될 수 있다.
- PR merge 하나만으로 arbitrary child를 자동 `Done`으로 만들지 않는다. child Outcome/AC 검증과 repository Issue completion decision이 함께 있어야 한다.
- non-default parent integration branch에서는 closing keyword auto-close에 의존하지 않는다. child Issue completion은 명시적으로 materialize한다.
- parent의 decommit/cancel은 아직 terminal이 아닌 descendant에 propagation할 수 있다. 실제 commitment, active Development relation, parent decision을 함께 읽는다.
- 이미 `Done`인 descendant는 parent Status 변화만으로 재작성하지 않는다.
- terminal child를 다시 materialize하려면 child Outcome invalidation을 보여주는 explicit Evidence가 필요하다. merge revert/drop, explicit rejection/supersession, failed Acceptance Evidence 등이 이에 해당한다.
- sub-issue completion ratio는 progress signal이지 parent Status의 source of truth가 아니다. parent `Done`은 parent-level Outcome/AC/Evidence에 따라 별도로 materialize한다.

## Lifecycle reconciliation

Reconciliation은 canonical meaning을 새로 정의하지 않고 명확한 invariant와 관찰 가능한 event를 live state에 반영한다.

- uncommitted candidate가 Iteration commitment를 얻고 더 강한 work-start signal이 없으면 `Todo`를 materialize할 수 있다.
- existing `In progress`를 replay convenience만으로 `Todo`로 낮추지 않는다.
- 실제로 관찰된 work-start signal은 `In progress`를 materialize할 수 있다.
- `Todo / In progress`에서 commitment가 제거되면 `Backlog` invariant를 복구하되 남아 있는 active Development relation은 별도 inconsistency로 드러낸다.
- `closed / completed`는 `Done`, `closed / not_planned` 또는 명확한 cancellation은 `Cancelled`로 materialize할 수 있다.
- close/cancel transition만으로 기존 Iteration을 지우지 않는다.
- durable product/platform Git-tree implementation이 확인되는데 Iteration이 비어 있으면 reconciliation 대상으로 드러낸다. historical Iteration은 Issue 생성/종료 날짜만으로 자동 추론하지 않는다.
- substantive reopen과 administrative reopen을 automation이 신뢰성 있게 구분할 수 없다면 Iteration을 일괄 clear하지 않고 review 대상으로 남긴다.
- unknown/conflicting state나 concurrent change는 임의 overwrite보다 fail/re-read/review를 우선한다.

Work Type, historical Iteration처럼 semantic interpretation이 필요한 값을 automation이 제목·날짜·repository 종류만으로 추론하지 않는다. field completeness 자체는 [Project Fields](fields.md)가 소유한다.

## Ownership boundary

| Concern | Owner |
|---|---|
| Status/Iteration lifecycle meaning, DoD, Evidence | [Planning Model](planning-model.md) |
| field schema/cardinality/completeness | [Project Fields](fields.md) |
| Work Type / Label meaning | [Work Classification](work-classification.md) |
| activation / signal / reconciliation materialization contract | 이 문서 |
| live Project field values | GitHub Project #11 |
| Issue / PR / Development relation | GitHub repository native state |
| common Project admission implementation | Knowledge workflow/action/tests |
| caller wiring / branch implementation / runtime | executing owning repository |

공통 implementation은 하나의 owner에 두고 caller repository에 복제하지 않는다. 여러 repository-local 차이가 반복되어 실제 coordination invariant가 될 때만 이 POLICY를 확장한다.
