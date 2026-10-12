# Planning Model

> **Authority:** POLICY  
> **Owner:** Project planning units, lifecycle meaning, completion, and Evidence semantics  
> **Scope:** Publishing Platform Project #11 Items and repository Issues across the owning repositories  
> **Read when:** creating or activating work, interpreting Status/Iteration, deciding completion, or evaluating Evidence  
> **Enforced by:** live Project #11 fields and repository Issue/PR state; materialization behavior is owned by Project Orchestration

## Planning units

| Concept | Meaning |
|---|---|
| Release Goal | 릴리스가 달성할 제품 상태 한 문장. 기술·작업 나열은 Product Boundary로 분리한다. |
| Product Boundary | 해당 릴리스에 필요한 capability와 제외 범위. 구현 순서가 아니다. |
| Iteration Goal | 이번 Iteration에서 달라질 가장 중요한 상태 한 문장. |
| Iteration Commitment | Goal을 위해 선택한 Item 집합. |
| Project Item | 독립적으로 검증 가능한 하나의 변화(delta). |
| Repository Issue | 해당 결과를 실현하는 특정 repository의 실행 단위. |

이전 Item을 다음 release용으로 복제하지 않고 새로 달라지는 결과만 Item으로 만든다. Iteration과 제품 release는 별도 planning axis이며, release association이 실제 운영 요구가 되기 전까지 각 Item의 필수 custom field로 복제하지 않는다.

## Item and Issue completion model

Project Item은 **Outcome / Acceptance Criteria / Evidence**로 완료 가능성을 설명한다. Repository가 작업의 1차 영역을 제공하고 Work Type이 Issue 전체의 주된 delta를 분류한다. Work Type과 Labels는 [Work Classification](work-classification.md)이 소유한다.

불확실한 작업은 Draft로 포착한다. repository owner와 실행 범위가 분명한 작업은 Repository Issue로 구체화한다. cross-repository coordination 자체가 결과라면 억지로 하나의 repository에 귀속하지 않고 Project Item으로 유지할 수 있다.

Repository Issue는 사용하는 GitHub template 형식과 무관하게 자신의 **completion contract**를 읽을 수 있게 해야 한다.

- **Outcome** — 이 Issue가 완료되면 무엇이 달라지거나 무엇을 알게 되는가.
- **Acceptance Criteria** — Outcome 충족 여부를 관찰 가능하게 판정하는 기준.
- **Evidence boundary** — 완료 주장을 어떤 code, test, PR/commit, workflow/deployment result, immutable document/permalink 등으로 검증할 것인가.

완료 모델은 다음 두 유형으로 구분한다.

| Completion model | Requirement |
|---|---|
| Change | canonical 또는 observable state가 의도대로 달라지고 Acceptance Criteria와 Evidence로 검증된다. |
| Investigation | 질문·불확실성에 대해 판단 기준과 재현 가능한 Evidence를 확보하고 결론을 남긴다. |

Investigation에서 production 또는 normative change가 필요하다는 결론이 나오면 별도 Change Issue로 분리한다.

`.github/ISSUE_TEMPLATE/`의 파일명, frontmatter, marker, section heading, ordering과 표현 방식은 **각 repository가 소유하는 GitHub authoring implementation**이다. Repository가 template을 제공한다면 위 completion semantics를 구현해야 하지만, Knowledge는 동일한 파일 형상이나 marker syntax를 cross-repository contract로 강제하지 않는다.

## Draft, commitment, and work start

- **Draft**는 아직 실행 범위가 확정되지 않은 후보이며 Iteration commitment와 implementation branch를 요구하지 않는다.
- **Backlog**는 유효한 후보 Item이지만 아직 Iteration commitment가 없는 상태다.
- **Todo**는 Iteration에 commit되었고 착수 가능하지만 실제 구현·조사·검증은 시작되지 않은 상태다.
- **In progress**는 Iteration에 commit되었고 실제 구현·조사·검증이 진행 중인 상태다.
- activation 또는 Repository Issue 생성 자체는 actual work start가 아니다.
- Development branch 또는 linked PR은 work start를 관찰할 수 있는 강한 signal이지만 `In progress`의 의미를 정의하지 않는다.
- branch/PR 없이 수행하는 Investigation, coordination, documentation도 실제 수행을 시작하면 `In progress`일 수 있다.
- commitment와 work start가 동시에 일어나면 `Todo`를 의례적인 중간 write로 강제하지 않는다.

Issue activation, initial admission inputs, observable signal과 Project field materialization은 [Project Orchestration](project-orchestration.md)이 소유한다. 구현 시작 방식은 [Implementation Practices](implementation-practices.md)의 GUIDANCE를 참고한다.

## Normal Issue lifecycle

정상 경로는 **Issue 생성 → 실제 작업 시작 → 진행 → 명시적 Issue 완료**다. 시스템은 명확한 Invariant / Default와 이 경로의 관찰 가능한 event만 집행한다.

- Issue 생성·activation은 후보를 등록한다. Iteration commitment가 없으면 `Backlog`, 명시 commitment가 있고 아직 시작하지 않았으면 `Todo`다.
- 최초 실제 작업 시작은 시작 시점이 속한 Project #11의 유효 Iteration에 귀속한 뒤 `In progress`로 materialize한다. 미리 지정한 commitment가 다른 기간이면 실제 시작 기간으로 바꾼다. 유효 기간이 없거나 모호하면 임의 Iteration이나 `In progress`를 쓰지 않고 판단 대상으로 남긴다.
- 진행 중에는 새 GitHub 활동이 없어도 Iteration 경계에서 자동 Recommitment한다. 대상은 `In progress`와 유효한 non-empty Iteration을 유지하는 open Issue이며, 경계 판단·재검증은 [Project Orchestration](project-orchestration.md#iteration-boundary-recommitment)을 따른다.
- 완료는 Issue 자신의 Outcome / Acceptance Criteria / Evidence를 충족한 뒤 명시적으로 Issue를 닫는 경계다. `closed / completed`는 `Done`, 명시 cancellation의 `closed / not_planned`는 `Cancelled`로 materialize한다. GitHub의 closing keyword로 발생한 native close도 명시적 완료 event로 취급하므로 그 keyword는 완료 조건을 충족할 변경에만 사용한다.
- Reconciliation에서 이미 Iteration이 비어 있으면 원인과 무관하게 의도적 변경으로 취급한다. 자동 보충이나 Status를 포함한 metadata 재정규화를 하지 않는다. 최초 정상 work-start의 Iteration 설정 책임과 이 관찰 경계는 별개다.
- Reopen, terminal Status와 native Issue state 충돌, 과거 작업의 귀속 복구, 사용자 변경의 의미처럼 정상 경로 밖의 선택은 Knowledge를 읽는 Agent가 직접 판단한다. 이를 새로운 자동 FSM 전이로 추론하지 않는다.

## Project Status lifecycle

Project `Status`는 repository Issue의 open/closed 여부를 복제하지 않고 **실행 상태와 결과 의미**를 나타낸다.

| Status | Meaning |
|---|---|
| Backlog | 유효한 후보 작업이지만 아직 Iteration commitment가 아니다. |
| Todo | Iteration에 commit되었고 아직 실제 작업은 시작되지 않았다. |
| In progress | Iteration에 commit되었고 실제 작업이 진행 중이다. |
| Done | Outcome, Acceptance Criteria, 적용되는 Quality Requirements와 Evidence를 충족했다. |
| Cancelled | 더 이상 수행하지 않기로 결정한 작업이다. superseded, rejected, invalidated 등을 포함하며 완료 성과로 계산하지 않는다. |

- repository Issue의 `closed / completed`는 일반적으로 `Done`, `closed / not_planned`는 `Cancelled`와 대응한다.
- `Cancelled`는 실제 planning decision이며 repository state나 automation convenience 때문에 임의로 사용하지 않는다.
- `Todo`와 `In progress`는 Iteration commitment를 전제로 한다. commitment가 제거되면 Agent가 active Development relation과 실제 실행 상태를 함께 재검토하며, automation은 빈 Iteration을 발견했다는 이유로 Status를 바꾸지 않는다.
- `Backlog → Todo → In progress`는 의미 관계이지 모든 UI/API write가 중간 상태를 반드시 순차 기록해야 한다는 뜻이 아니다.
- Project field의 current `Status`가 lifecycle state의 source of truth다. observable event를 어떤 Status로 materialize하는지는 Orchestration이 이 의미를 소비해 정의한다.

## Issue-local completion and relationships

Issue `Status`는 **각 Issue가 선언한 자기 scope의 Outcome / Acceptance Criteria / Evidence**로 판단한다.

- parent/sub-issue, blocks/blocked-by, relates-to 같은 relationship은 context·composition·dependency를 표현하지만 descendant/related Issue의 Status를 자동 상속하거나 전파하지 않는다.
- parent와 child는 각각 독립적인 completion unit이다. 따라서 `parent=In progress, child=Done` 또는 `parent=Cancelled, child=Done`은 각 Issue의 Outcome이 독립적으로 성립한다면 정상이다.
- Issue가 어떤 integration target까지 포함해야 완료인지도 그 Issue의 Outcome/AC가 결정한다. parent integration branch merge가 충분한 Issue도 있고, canonical/default branch 또는 production delivery까지 요구하는 Issue도 있을 수 있다.
- relationship의 변경이나 관련 Issue의 Status 변화만으로 terminal Issue를 자동 reopen/demote하지 않는다.
- 기존 `Done` 판정을 바꾸려면 해당 Issue 자신의 Outcome/AC/Evidence가 더 이상 성립하지 않는다는 새 Evidence가 필요하다.
- 하나의 Issue를 여러 PR이 나누어 실현할 수 있고 하나의 PR이 여러 Issue에 기여할 수 있다. PR merge는 관련 Issue의 AC/Evidence 검토 계기이며 자체로 Issue completion을 강제하지 않는다. 부분 기여와 최종 완료의 `Refs / Closes` 경계는 [Git Workflow](git-workflow.md#policy--issue-reference-and-completion-convention)를 따른다.

Relationship 종류별 추가 scheduling/propagation semantics가 실제 운영상 필요해지면 별도 policy로 확장한다. 현재는 relationship을 lifecycle inheritance mechanism으로 사용하지 않는다.

## Iteration semantics

Iteration은 active Item에서는 **current commitment**, terminal Item에서는 **최종 execution/commitment 귀속**을 나타낸다.

- 정상 최초 work-start는 실제 시작 시점이 속한 Iteration을 설정한다. Issue 생성·branch 생성 날짜나 Iteration title의 week number로 기간을 대체하지 않는다.
- 진행 중 정상 Recommitment는 마지막 commitment를 갱신한다. 명시적 close/cancel event는 완료 시점이 속한 유효 Iteration으로 최종 귀속하고 그 값을 terminal 상태에서 유지한다. 기존 값이 비어 있거나 유효한 완료 기간이 없으면 자동 귀속하지 않는다.
- 일반 Reconciliation은 non-empty terminal Iteration을 현재 기간으로 이동하지 않는다. 재생·복구에 필요한 시작·완료 event Evidence가 없으면 과거 기간을 추측하지 않는다.
- 빈 Iteration은 자동 변경을 억제하는 의도적 상태다. durable Git-tree 구현이나 다른 field와의 불일치가 있어도 보충하지 않고 Agent가 필요한 Evidence와 사용자의 변경 의도를 판단한다.
- substantive reopen은 새로운 live-planning decision이다. Agent가 새 commitment, 빈 Iteration으로의 해제, 실제 work start와 Status를 판단한다. 단순 metadata 정리를 위한 임시 reopen을 새로운 실행으로 간주하지 않는다.
- Iteration은 single-value field이므로 여러 Iteration에 걸친 전체 carry-over/recommit history를 표현하지 않는다. 나머지 이력은 Project Status Updates와 Issue/PR/Git Evidence가 보완한다.
- Iteration Goal과 회고는 Project Status Update가 소유한다.

field cardinality와 completeness는 [Project Fields](fields.md)가 소유한다.

## Release lifecycle

Project #11은 cross-repository **live roadmap / commitment / execution state**를 소유한다. versioned release document는 실제 product boundary와 acceptance를 별도로 고정할 필요가 생겼을 때만 만든다.

- active version-scoped release document는 해당 version의 Goal / Product Boundary / Acceptance Criteria를 정의하는 **POLICY**다.
- release가 완료되면 같은 reference unit에 immutable fulfillment Evidence를 연결하고 문서를 **RECORD**로 전환해 freeze한다.
- 완료된 release RECORD는 요구사항과 그 충족 Evidence를 함께 보존하며 post-release roadmap이나 current implementation snapshot으로 갱신하지 않는다.
- 다음 major/minor boundary가 실제로 생기면 기존 RECORD를 재활성화하지 않고 새 version-scoped release document를 만든다.
- weekly Iteration을 자동 version으로 취급하지 않는다.
- `Target Release` 같은 Project metadata는 반복적인 filtering/coordination 필요가 실제로 생기기 전에는 다시 도입하지 않는다.
- 별도 changelog도 concrete consumer/use-case가 생기기 전에는 수기 planning ledger로 만들지 않는다. 필요해지면 completed Project/Issue/PR state에서 재구성하거나 생성할 수 있는 방식을 우선한다.

현재 완료된 예시는 [Publishing Platform 1.0](release-1.0.md) RECORD다.

## Completion and Evidence

- **Acceptance Criteria**는 이번 변화가 제공해야 하는 관찰 가능한 결과다.
- **Quality Requirements**는 적용되는 성능·신뢰성·품질 제약이며 근거 없는 수치를 만들지 않는다.
- **Global Definition of Done**은 AC 충족, 적용 품질 검증, 필요한 코드와 지속 문서 통합, 관련 자동 검사 통과, 재현 가능한 Evidence 연결을 요구한다.

Evidence는 **Outcome이 실제로 달성되었음을 재현 가능하게 보여주는 자료**다.

- 설계·계획 정의 자체가 Outcome이면 canonical policy/document의 immutable commit 또는 permalink가 Evidence가 될 수 있다.
- `main` 링크는 current reference 탐색에 사용할 수 있지만 완료 시점의 증거를 고정해야 할 때는 commit SHA가 포함된 permalink나 해당 변경 commit/PR을 우선한다.
- 기능 구현, 품질 검증, 실제 발행, deployment 성공은 planning 문서로 증명하지 않는다. 책임 repository의 code, tests, PR/commit, workflow run, deployment result 등 실제 Evidence가 필요하다.
- release acceptance Evidence는 해당 release record가 명시한 immutable scope에서만 유효하며 current implementation state로 자동 확장하지 않는다.

## Ownership boundaries

- live `Status / Iteration / Work Type` 값 → GitHub Project #11
- Work Type / Label meaning → [Work Classification](work-classification.md)
- field schema / cardinality / completeness → [Project Fields](fields.md)
- activation / signal / reconciliation materialization → [Project Orchestration](project-orchestration.md)
- Iteration Goal / review narrative → Project Status Updates
- Outcome / Acceptance Criteria / work-specific Evidence → 실제 Project Item 또는 Repository Issue
- implementation contract / code / tests → owning repository

완료된 migration이나 release의 historical provenance는 해당 RECORD를 사용한다. current planning과 implementation 판단은 current policy와 live owning source를 우선한다.
