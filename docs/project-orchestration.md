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

## Admission inputs

Repository Issue를 Project #11에 first admission할 때 implementation은 initial materialization에 필요한 입력을 machine-readable source에서 받을 수 있다.

Common semantic inputs:

- **Iteration** — initial commitment. 아직 commitment가 없으면 비어 있을 수 있다.
- **Work Type** — Issue Outcome의 주된 delta를 [Work Classification](work-classification.md)에 따라 분류한 값.

initial `Status`를 caller-provided authoritative input으로 취급하지 않는다. Iteration commitment가 없으면 `Backlog`, 있으면 `Todo`로 materialize하며 실제 work-start signal이 동시에 확인되면 [Planning Model](planning-model.md)의 의미에 따라 `In progress`를 직접 materialize할 수 있다.

Issue body metadata, HTML comment, JSON shape, workflow input, API payload 등 **입력의 transport와 encoding은 common admission implementation 또는 repository-local integration이 소유하는 implementation detail**이다. 이 POLICY는 `project-seed`라는 marker 이름이나 특정 JSON/document shape를 cross-repository authoring contract로 요구하지 않는다.

replay에서는 existing live Project value를 stale admission input으로 덮어쓰지 않는다. live Work Type이 비어 있을 때 validated Work Type input을 사용할 수 있지만 live/input 모두 없으면 제목이나 repository 종류로 의미를 추론하지 않고 fail closed한다.

branch name, Development start suppression 같은 Project field가 아닌 repository-local hints가 함께 전달될 수 있지만 그 의미와 encoding은 해당 owning integration이 소유한다.

admission input의 의미는 [Planning Model](planning-model.md), [Project Fields](fields.md), [Work Classification](work-classification.md)의 semantics를 위반하지 않아야 한다.

## Development signals

Development relation은 actual work start를 관찰할 수 있는 **signal**이다. `Backlog / Todo / In progress`의 의미 자체는 [Planning Model](planning-model.md)이 소유한다.

- 새 linked PR은 open Item의 work-start signal로 사용해 `In progress`를 materialize할 수 있다.
- Development branch도 owning integration이 relation을 신뢰성 있게 관찰할 수 있을 때 같은 signal로 사용할 수 있다.
- branch/PR 없이 진행되는 Investigation, coordination, documentation은 사람 또는 해당 execution interface가 work start를 명시적으로 materialize할 수 있다.
- commitment와 work start가 동시에 확인되면 Iteration과 `In progress`를 함께 materialize할 수 있으며 `Todo` intermediate write를 강제하지 않는다.
- work-start signal이 있는데 Iteration commitment가 없다면 arbitrary Iteration을 추론하지 않고 inconsistency로 드러낸다.
- branch/Issue relation이 불명확하면 이름이나 타이밍만으로 임의 연결하지 않고 repository-local recovery가 소유한다.

## Relationship materialization

GitHub relationship은 planning context와 dependency를 materialize하는 source이며 lifecycle inheritance를 의미하지 않는다.

- parent/sub-issue, blocks/blocked-by, relates-to는 GitHub가 제공하는 explicit relation을 source로 사용하고 title, branch name, timing만으로 관계를 추론하지 않는다.
- related Item의 Status 변화만으로 다른 Item의 Status를 자동 변경하지 않는다.
- Issue completion은 [Planning Model](planning-model.md#issue-local-completion-and-relationships)의 issue-local semantics를 따른다.
- PR merge는 해당 Issue가 선언한 integration target과 AC에 부합할 때 completion Evidence가 될 수 있다. non-default integration branch에 merge됐다는 사실만으로 모든 Issue를 일률적으로 `Done` 처리하지 않는다.
- terminal Status를 변경하려면 해당 Item 자신의 Outcome/AC/Evidence 변화 또는 명시적인 planning decision이 필요하다.

Relationship별 automatic scheduling/propagation이 실제 반복 요구가 되기 전에는 common orchestration policy로 추가하지 않는다.

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
