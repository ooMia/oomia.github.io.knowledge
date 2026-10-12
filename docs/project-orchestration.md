# Project Orchestration

> **Authority:** POLICY  
> **Owner:** Repository Issue activation, normal-event materialization, and Project #11 reconciliation semantics
> **Scope:** Issue/PR/native metadata coordination between Publishing Platform repositories and Project #11
> **Read when:** admitting an Issue, observing actual work start or close, reconciling related work, or judging recovery and runtime boundaries
> **Enforced by:** Engine GitHub integration/runtime where implemented; repository workflows remain transition consumers until verified cutover

이 문서는 [Planning Model](planning-model.md)의 lifecycle **meaning**을 materialize하는 공통 contract를 소유한다. 실제 Project field 값은 Project #11, Issue/PR relation과 Issue open/closed 상태는 GitHub native state가 소유한다. Python/MCP/Webhook/DB/Timer/API의 실제 구현은 Engine의 code/docs/tests가 소유한다.

## Scope and ownership

- 활성 Repository Issue는 Project #11 membership과 initial fields를 materialize한다. Draft candidate는 repository owner와 실행 범위가 확정되어 활성화될 때 admission하며, Draft 자체를 work-start signal로 사용하지 않는다.
- activation 이후 live Project/native state를 authoritative input으로 사용한다. stale Issue body seed나 local snapshot으로 사용자 변경을 덮어쓰지 않는다.
- Docs처럼 Issue-driven implementation이 중심이 아닌 repository에는 같은 activation을 강제하지 않는다.
- branch/PR integration과 `Refs / Closes` completion convention은 [Git Workflow](git-workflow.md)이 소유한다.
- webhook process, event transport, persistence, timer, pagination, token/runner, branch naming과 API shape는 Engine 또는 해당 repository-local consumer가 소유한다. Knowledge는 그 알고리즘을 복제하지 않는다.

## Admission and metadata

최초 admission은 Project #11 membership, 유효한 `Status / Work Type`, 필요한 initial `Iteration`과 [Fields](fields.md)의 Default를 적용한다.

- initial Iteration은 명시 commitment가 있으면 validated input을 사용하고, 없으면 비운다. Iteration이 없으면 `Backlog`, 있으면 `Todo`이며 최초 실제 work-start가 동시에 확인되면 아래의 시작 event를 적용할 수 있다.
- executable Repository Issue의 Work Type은 live value 또는 validated explicit admission input을 사용한다. 둘 다 없거나 유효하지 않으면 제목·repository·file type으로 추론하지 않고 fail closed한다.
- initial Status는 caller-provided authoritative input으로 받지 않는다. admission input의 transport/encoding, Issue body marker와 JSON shape는 구현 owner가 결정한다.
- 이미 존재하는 Item의 빈 Iteration은 아래 suppression 규칙을 먼저 적용한다. membership이 있다는 이유로 first admission을 반복해 Default를 재적용하지 않는다.
- native Assignees의 기본 책임자와 optional Labels/Milestone/Reviewers 등의 의미는 [Fields](fields.md)를 따른다. 선택적 metadata를 절차 충족만을 위해 채우거나 새 category를 자동 생성하지 않는다.

## Development signals

Development relation은 actual work start를 관찰할 수 있는 **signal**이며 lifecycle 의미 자체를 정의하지 않는다.

- 최초 Issue-linked branch 또는 open linked/explicitly referenced PR은 신뢰성 있게 Issue와 연결되고 실제 작업 시작을 나타낼 때 work-start event로 사용할 수 있다. relation의 종류와 native auto-close 의미는 Git Workflow를 따른다.
- branch/PR 없이 진행되는 Investigation, coordination, documentation은 사람 또는 execution interface가 실제 시작 event를 명시적으로 제공한다.
- 최초 정상 work-start는 **event 발생 시각**이 속한 유효 Iteration을 먼저 설정한 뒤 `In progress`를 materialize한다. 재시도·지연 처리 시각으로 시작 기간을 이동하지 않으며 `Todo` intermediate write를 강제하지 않는다.
- unknown/ambiguous relation은 branch name, title, timing으로 임의 연결하지 않는다. terminal Issue, reopen 또는 이미 진행 중인 Item의 새 PR을 최초 시작으로 추론하지 않고 Agent 판단 또는 related-event 검사로 처리한다.
- 동일 event의 중복 delivery나 과거 event replay를 새로운 work-start로 적용해 사용자가 비운 Iteration을 다시 채우지 않는다.

## Iteration period selection

Project #11의 live Iteration definition에 있는 실제 `startDate / duration`으로 기간을 판정한다. upcoming/completed definition을 포함한 완전한 조회가 필요하며 title, week number, Issue 생성 날짜나 일률적인 7일 주기를 사용하지 않는다.

- `startDate`는 UTC `00:00:00`의 날짜 경계로 해석하고 `duration`은 양의 정수 calendar day다. 기간은 half-open **`[startDate, startDate + duration)`**다. 이는 project의 결정적 machine interpretation이며 사용자 화면의 locale로 경계를 바꾸지 않는다.
- 대상 event 시각을 포함하는 유효 기간이 정확히 하나일 때만 그 Iteration을 선택한다. 실제 기간을 포함한 정의가 없거나 malformed, 겹침, gap, 불완전 조회 때문에 선택이 모호하면 field를 임의 변경하지 않고 review 대상으로 남긴다.
- future commitment처럼 아직 끝나지 않은 유효 Iteration을 현재 기간이라는 이유만으로 일반 검사에서 옮기지 않는다.

## Iteration Boundary Recommitment

Iteration boundary는 현재 valid Iteration의 exclusive end 시각이다. event가 없더라도 이 경계의 trigger로 Recommitment를 수행한다.

- 대상은 boundary 처리 직전 live state를 다시 읽었을 때 **open Issue + `In progress` + non-empty valid Iteration**인 Item이다. `Todo`, `Backlog`, terminal/archived Item, 비어 있거나 invalid한 Iteration은 대상이 아니다.
- stored Iteration의 end를 지났고 그 경계 시각을 포함하는 다음 유효 Iteration이 정확히 하나이면 Iteration만 갱신한다. `In progress`는 유지한다. gap/overlap/unknown definition을 건너뛰어 임의로 가장 가까운 Iteration에 귀속하지 않는다.
- 재시작 등으로 경계를 놓쳤으면 동일 eligibility를 재검증하며 지난 경계를 시간순으로 따라잡는다. 현재 기간까지의 경로 중 유효한 다음 기간이 없으면 중단하고 판단 대상으로 남긴다. past boundary를 처리하기 위해 이전 Item 상태를 추측하거나 terminal Issue를 다시 활성화하지 않는다.
- 준비와 적용 사이에 Status, Iteration, Issue state 또는 기간 정의가 바뀌면 기존 intent를 중단하고 다시 읽는다. 재검증 실패를 stale 값으로 강제 적용하지 않는다.

## Completion and related work

- 하나의 Issue에 여러 PR이 기여할 수 있다. PR event는 native Development/closing relation과 명시적 Issue references로 확인되는 관련 Issue만 검사한다. PR merge 자체로 Issue를 닫거나 모든 related Item에 `Done`을 전파하지 않는다.
- 최초의 명시적 `closed / completed` event는 `Done`, `closed / not_planned` event는 `Cancelled`를 materialize할 수 있다. GitHub closing keyword의 native auto-close도 이 close event 경계를 따른다.
- close event를 처리할 때 existing Iteration이 non-empty이고 유효한 완료 기간을 선택할 수 있으면 **event의 완료 시각**이 속한 Iteration으로 최종 귀속한 뒤 terminal Status를 쓴다. 완료 기간이 없거나 모호하면 전체 transition을 판단 대상으로 남긴다.
- empty Iteration을 발견한 close 처리에는 아래 suppression 규칙을 적용한다. 완료 event라는 이유로 의도적 empty 값을 보충하지 않는다.
- parent/sub-issue, blocks/blocked-by, relates-to는 explicit GitHub relation의 planning context다. related Issue의 Status를 상속·전파하지 않는다. completion은 각 Issue 자신의 Outcome / AC / Evidence가 결정한다.

## Reconciliation and exception boundary

Reconciliation은 정상 event와 명확한 Invariant / Default를 검사하며 의미적 선택을 대신하지 않는다.

- **existing Item의 Iteration이 비어 있으면 원인과 무관하게 의도적 변경으로 취급해 자동 보충과 모든 metadata normalization을 억제한다.** Status, Work Type, native Defaults도 자동 write하지 않는다. 이 gate는 최초 admission과 최초 정상 work-start의 explicit 설정 경로와 구분한다.
- non-empty 상태에서는 live Invariant / Default와 정상 경로가 확정하는 delta만 계산한다. 이미 충족한 상태는 no-op이며, replay 편의로 `In progress`를 `Todo`로 낮추거나 terminal Iteration을 현재 기간으로 옮기지 않는다.
- Reopen, state/Status 충돌, historical Iteration 복구, Work Type의 의미 선택, cancellation 여부, 관계의 scheduling 의미와 unknown event는 Knowledge를 읽는 Agent가 직접 판단한다. 예외를 자동 FSM 전이로 확장하지 않는다.
- write 전에 canonical state와 schema를 읽고 delta를 검증한다. 적용 직전에 기대 state를 재검증하며, 적용 뒤에는 독립적인 canonical read-back으로 결과를 확인한다. 중복 delivery, event 유실, concurrent change, ambiguous write 결과를 새로운 사용자 의도나 완료 Evidence로 추론하지 않는다.
- 명시적 Agent/사용자 변경은 요청된 정확한 field만 검증·적용하고 read-back한다. 빈 Iteration suppression은 사용자가 지시한 explicit field write를 금지하는 규칙이 아니다.

## Runtime triggers and recovery

공통 실행 책임은 **Engine의 단일 GitHub reconciliation runtime**에 둔다. Plugin의 semantic mutation, webhook processing과 timer가 같은 validation/write boundary를 재사용하며 caller repository에 lifecycle 구현을 복제하지 않는다.

- Repository Issue event는 해당 Issue만 대상으로 한다. PR event는 확인 가능한 관련 Issue만 targeted reconciliation한다.
- 서버 시작 후 **최초 idle에서 전체 검사 1회**를 수행한다. webhook 처리와 안전한 iteration boundary 작업이 끝나 runtime이 idle인 시점의 live snapshot으로 검사한다. 프로세스 재시작은 새 startup 검사 경계다.
- 이후 정상 운영은 webhook과 Iteration Boundary Trigger를 사용한다. 기존 5분 주기 전체 스캔은 폐기 대상이며 정상 trigger로 유지하지 않는다.
- event 유실·중복·재시작의 recovery는 durable delivery/처리 Evidence와 current live state를 사용한다. 이미 처리된 event나 startup 검사를 무조건 재실행하지 않는다. full rescan은 startup 1회 또는 명시적인 복구 요청으로 수행한다.
- user-owned Project #11의 UI field 변경은 repository webhook으로 직접 감지되지 않는다. GitHub의 [`projects_v2_item` webhook](https://docs.github.com/en/webhooks/webhook-events-and-payloads#projects_v2_item)은 organization-level Project event다. Plugin을 통한 field 변경은 즉시 read-back하고, UI 변경 뒤의 전체 상태 확인은 다음 startup 검사 또는 명시적 재검사 경로를 사용한다. Repository event가 없는 UI 변경에 실시간 관찰을 보장한다고 주장하지 않는다.

## Transition and verification boundary

이 정책의 완료 Evidence는 canonical 문서 변경·검증이며 Engine runtime의 구현·배포·remote mutation Evidence와 구분한다.

- [Engine #122](https://github.com/ooMia/oomia.github.io.engine/issues/122)가 admission/metadata/targeted reconciliation을, [Engine #123](https://github.com/ooMia/oomia.github.io.engine/issues/123)이 startup idle/iteration boundary/recovery를 소유한다. 실제 supported interface와 verification은 Engine 원본을 읽는다.
- 기존 Knowledge shared Project-admission action, development-state script와 repository별 activation/native workflow는 이 정책으로 구현 완료되었다고 간주하지 않는다. 새 경로의 검증과 repository별 cutover 판단 전에는 기존 code/config를 이 문서 변경만으로 삭제·활성화하지 않는다.
- cutover에는 남아 있는 conflicting writer와 native Project workflows를 함께 확인하고 실행 책임이 중복되지 않음을 검증한다. 폐기·설정 변경과 남은 작업은 owning Issue/PR에 기록한다. credentials, secrets, account/permission 변경은 [Agent Conventions](agent-conventions.md#user-owned-security-boundary)의 사용자 경계를 따른다.

## Ownership boundary

| Concern | Owner |
|---|---|
| Status/Iteration lifecycle meaning, DoD, Evidence | [Planning Model](planning-model.md) |
| field Invariant / Default / optional metadata | [Project Fields](fields.md) |
| Work Type / Label meaning | [Work Classification](work-classification.md) |
| normal-event materialization, trigger and exception semantics | 이 문서 |
| live Project field values | GitHub Project #11 |
| native Issue / PR / Development relation | GitHub repository native state |
| common admission/reconciliation implementation and runtime | Engine code/docs/tests |
| repository-local wiring and verified cutover | 해당 owning repository |
