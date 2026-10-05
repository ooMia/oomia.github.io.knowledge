# Planning Model

## 계획 단위

| 개념 | 정의 / 작성 규칙 |
|---|---|
| Release Goal | 릴리스가 달성할 제품 상태 한 문장. 기술·작업 나열은 Product Boundary로 분리 |
| Product Boundary | 해당 릴리스에 필요한 capability 및 제외 범위. 구현 순서가 아님 |
| Iteration Goal | 이번 Iteration에서 달라질 가장 중요한 상태 한 문장 |
| Iteration Commitment | Goal을 위해 선택한 Item 집합. 대화 기준 통상 2–5개 |
| Project Item | 독립적으로 검증 가능한 하나의 변화(delta) |
| Repository Issue | 해당 결과를 실현하는 특정 레포의 구현 단위 |

이전 Item을 다음 버전용으로 복제하지 말고 새로 달라지는 결과만 Item으로 만든다. 릴리스 계획은 Project Item의 필수 분류 field로 복제하지 않고 release 문서와 실제 integration evidence에서 관리한다.

## Item / Issue 작성

Project Item에는 Outcome, binary하게 판정 가능한 Acceptance Criteria, Evidence를 둔다. Repository가 작업의 1차 영역을 제공하고 Work Type이 Issue 전체의 주된 delta를 분류한다. Work Type/Labels 판정은 [Work Classification](work-classification.md)을 따른다.

불확실한 작업은 Draft로 포착한다. 레포 소유권과 실행 범위가 분명한 구현 작업은 Repository Issue로 구체화한다. 전역 조정 Item을 억지로 하나의 레포에 귀속하지 않는다. Issue에는 실행·검증에 필요한 context만 남기고, 적용되는 Quality Requirements가 있다면 Acceptance Criteria 또는 Context에서 식별해 Evidence로 검증한다. 한 Iteration에 끝내기 어렵거나 독립 검증이 필요한 결과는 분해한다.

### Repository Issue template 선택

Repository Issue template은 Work Type 이름이 아니라 **완료를 무엇으로 증명하는가**에 따라 선택한다.

| Template | 핵심 질문 | 완료 모델 |
|---|---|---|
| Change | 무엇이 달라져야 하는가? | repository의 canonical 또는 observable state가 의도대로 바뀌고 검증됨 |
| Investigation | 무엇을 알아내야 하는가? | 질문에 대한 결론과 재현 가능한 Evidence가 확보됨 |

- Issue 생성 전에 둘 중 하나를 선택하고 template marker와 핵심 section을 유지한다.
- Context와 Scope처럼 상황에 따라 불필요한 section은 제거할 수 있다. 빈 칸을 채우기 위해 정보를 만들지 않는다.
- Investigation에서 production 또는 normative behavior 변경이 필요하다는 결론이 나오면 조사 scope를 확장하지 않고 Change Issue로 분리한다. 반복 가능한 benchmark harness나 durable Evidence처럼 Investigation 자체의 산출물은 Work Classification 기준에 따라 Investigation에 남을 수 있다.
- 단일 repository가 소유하지 않는 cross-repository coordination은 Repository Issue template을 추가하지 않고 Project Item으로 유지한다.
- 둘 중 어느 template도 목적을 왜곡하지 않고 표현할 수 없다면 ad-hoc 형식을 만들기보다 canonical template set을 먼저 보완한다.


### Development branch 초기 구현

Issue와 연관된 구현을 development branch에서 시작할 때는 **green scaffold**를 기본값으로 사용한다.

- 첫 변경은 완성 구현보다 핵심 flow와 dependency boundary를 실행 가능한 구조로 연결하는 데 집중할 수 있다.
- prompt·정규화·세부 validation처럼 아직 사용자 정책이 필요한 custom logic은 명시적인 `TODO` placeholder로 남길 수 있다.
- scaffold 단계의 최소 contract test는 통과해야 한다. 의도적인 red scaffold는 Issue 자체가 failing test를 요구하거나 사용자가 명시적으로 요청한 경우에만 사용한다.
- 첫 branch update는 가능하면 하나의 응집된 commit으로 유지한다.
- scaffold는 착수 방식일 뿐이며 Issue의 최종 Acceptance Criteria나 Definition of Done을 축소하지 않는다.

### Draft와 활성화

- 실행 범위가 확정되지 않은 후보 작업은 Draft 또는 이에 준하는 비활성 planning state로 포착한다. 구체적인 UI/API 표현 방식은 이를 관리하는 interface/owner가 소유한다.
- Draft 단계에서는 implementation branch를 만들지 않는다.
- Draft를 활성화하거나 일반 Repository Issue를 생성했다고 해서 작업이 시작된 것은 아니다.
- 아직 Iteration commitment가 없으면 `Backlog`다.
- Iteration에 commit되었지만 실제 구현·조사·검증을 시작하지 않았으면 `Todo`다.
- Iteration에 commit된 작업을 실제로 시작하면 `In progress`다. commitment와 착수가 동시에 일어나면 `Todo`를 의례적으로 거치지 않고 Iteration과 `In progress`를 함께 materialize할 수 있다.
- Development branch 또는 linked PR은 실제 작업 시작을 관찰할 수 있는 강한 signal이지만 `In progress`의 의미 자체를 정의하지 않는다. branch/PR 없이 수행하는 조사·coordination·문서 작업도 실제 수행을 시작하면 `In progress`일 수 있다.
- Development branch는 실제 구현 책임을 소유하는 repository에 둔다. 하나의 Issue가 여러 구현 레포에 걸치면 1:N 관계를 명시한다.
- Project orchestration이 적용된 repository에서는 Issue activation이 Project #11 등록과 초기 field materialization을 수행할 수 있다. activation 자체는 actual work start나 Development relation을 의미하지 않는다.
- 새 Repository Issue에는 machine-readable `project-seed`를 함께 둘 수 있다. admission 시 Iteration과 Work Type의 초기값을 전달하며, 초기 Status는 Iteration 존재 여부에서 파생한다. 활성화 이후의 SoT는 계속 GitHub Project다.
- activation과 lifecycle materialization의 공통 의미는 [Project Orchestration](project-orchestration.md)을 따른다. workflow, token, runner, branch base 같은 실행 세부사항은 owning repository가 소유한다.

## Project Status lifecycle

Project의 `Status`는 repository Issue의 open/closed 여부를 복제하지 않고 **실행 상태와 결과 의미**를 나타낸다.

| Status | 의미 |
|---|---|
| Backlog | 유효한 후보 작업이지만 아직 Iteration commitment가 아니다. |
| Todo | Iteration에 commit되었고 착수 가능하지만 실제 작업은 아직 시작되지 않았다. |
| In progress | Iteration에 commit되었고 실제 구현·조사·검증이 진행 중이다. |
| Done | Outcome, Acceptance Criteria, 적용되는 Quality Requirements와 Evidence를 충족했다. |
| Cancelled | 더 이상 수행하지 않기로 결정한 작업이다. superseded, rejected, invalidated 등을 포함하며 완료 성과로 계산하지 않는다. |

- repository Issue의 `closed / completed`는 일반적으로 `Done`, `closed / not_planned`는 `Cancelled`와 대응한다.
- Draft 표현 방식과 repository state는 planning 의미를 임의로 바꾸지 않는다. `Cancelled`는 superseded/rejected/invalidated 등 더 이상 추진하지 않기로 한 planning decision일 때만 사용하며, 그 판단의 SoT는 Project Status다.
- `Todo`와 `In progress`는 Iteration commitment를 전제로 한다. Iteration이 제거되면 active Development relation과 실제 실행 상태를 함께 재검토하되, commitment 없는 실행 상태를 정상 상태로 두지 않는다.
- 새 linked PR은 실제 작업 시작의 명확한 observable signal이므로 open Item을 `In progress`로 materialize할 수 있다. Development branch 역시 owning integration이 관찰할 수 있다면 같은 signal로 사용할 수 있다.
- branch/PR이 없는 작업도 실제 수행을 시작했다면 `In progress`가 맞다. 이 경우 Status는 사람 또는 해당 실행 인터페이스가 명시적으로 materialize할 수 있다.
- 상태 관계는 `Backlog → Todo → In progress`지만 UI/API가 반드시 모든 중간 상태를 순차적으로 기록할 필요는 없다. 현재 Iteration에 commit하면서 즉시 착수하는 작업은 `Backlog → In progress`로 직접 materialize할 수 있다.
- Iteration은 시간적 의미를 갖는다. active Item에서는 current commitment를 나타내고, terminal Item에서는 해당 Item이 처음 명시적으로 commit되었거나 durable repository Git tree에 영향을 주는 실제 구현이 시작된 Iteration을 압축해 보존한다.
- Item이 명시적으로 Iteration commitment를 얻었다면 결과가 `Cancelled`이더라도 해당 Iteration을 유지한다. cancellation 자체는 Iteration clear trigger가 아니다.
- 명시 commitment가 없더라도 Item에 귀속되는 durable product/platform Git tree에 남는 code/docs/workflow/configuration 등 실제 구현이 발생했다면 Iteration은 필수다. 값은 close/merge 시점이 아니라 실제 작업이 시작된 기간을 기준으로 한다.
- 독립 branch에서 수행되었지만 durable product/platform Git tree에 편입되지 않고 branch와 함께 폐기된 작업은 당시 current Iteration을 기록해도 되지만 필수는 아니다.
- terminal Item을 substantive하게 reopen하는 것은 새로운 live-planning 결정이다. 즉시 새 Iteration에 recommit하지 않는다면 기존 Iteration을 `null`로 비우고 `Backlog`로 재평가하는 것을 권고한다. 과거 Iteration provenance는 Issue/Project history, Status Updates, Git Evidence에서 복구한다. metadata 정리처럼 잠시 reopen했다가 다시 닫는 임시 변경에는 Iteration clear를 권고하지 않는다.
- Iteration은 single-value field이므로 여러 Iteration에 걸친 carry-over/recommit history 전체를 표현하지 않는다. Project field는 현재 commitment 또는 대표 historical slot만 보존하고, 나머지 시간적 이력은 Status Updates와 Issue/PR/Git Evidence가 보완한다.
- Iteration Goal 변경·회고는 Project Status Update에 기록하고, repository Issue는 자기 Outcome/AC/Evidence를 유지한다.
- `project-seed`는 activation 초기값일 뿐이며 activation 이후 Project field가 current state의 SoT다.
- activation/reconciliation automation은 이 lifecycle을 materialize하는 실행 메커니즘이다. automation은 명확한 Status/Iteration invariant만 적용하고 Work Type·Assignee·historical Iteration처럼 문맥 판단이 필요한 값을 추론하지 않는다. automation ownership boundary는 [Project Orchestration](project-orchestration.md#ownership-boundary)을 따른다.

## 완료 판정

- **Acceptance Criteria**: 이번 변화가 제공해야 하는 관찰 가능한 결과.
- **Quality Requirements**: 적용되는 성능·신뢰성·품질 제약. 근거 없는 수치를 만들지 않는다.
- **Global Definition of Done**: AC 충족, 적용 품질 검증, 필요한 코드와 지속 문서 통합, 관련 자동 검사 통과, 재현 가능한 Evidence 연결.

### Evidence 규칙

Evidence는 **Item의 Outcome이 실제로 달성되었음을 재현 가능하게 보여주는 자료**다.

- 설계·계획 정의 자체가 Outcome이면 이 레포의 canonical 문서가 Evidence가 될 수 있다. `Publishing Platform 1.0 Definition`, `Project Planning Model`처럼 장기 규칙을 확정하는 Item은 관련 문서의 **immutable commit/permalink**를 연결한다.
- `main` 문서 링크는 현재 canonical reference를 찾는 데 사용하고, 완료 시점의 증거를 고정해야 할 때는 commit SHA가 포함된 permalink나 해당 변경 commit/PR을 우선한다.
- 기능 구현, 품질 검증, 실제 발행, deployment 성공은 설계 문서로 증명하지 않는다. 코드·테스트·PR/commit·실행 결과·배포 URL 등 책임 레포의 Evidence가 필요하다.
- [Implementation Map](implementation-map.md)은 여러 implementation Evidence를 1.0 capability에 대응시킨 검증 스냅샷이다. 기준 revision 이후 코드가 바뀌면 재검증하기 전까지 최신 상태라고 가정하지 않는다.

## Source of Truth

| 정보 | 소유 위치 |
|---|---|
| 공통 workflow·coordination·개발 지침·계획 규칙·필드 의미·전역 DoD | 이 레포의 docs |
| 구현되는 기술 설계 | 책임 구현 레포의 docs; Knowledge는 원본 링크로 참조 |
| 1.0 capability별 검증 스냅샷 | 이 레포의 [Implementation Map](implementation-map.md) |
| Iteration Goal 및 회고 | GitHub Project Status Update |
| Status / Iteration / Work Type 값 | GitHub Project fields |
| Labels | repository-native GitHub labels; canonical registry는 `config/labels.json` |
| Outcome / AC / Evidence | 실제 Project Item 또는 Repository Issue |
| canonical content draft/working state | local Git working tree |
| durable shared content revision | `ooMia/oomia.github.io.docs` Git commit |
| 구현·테스트·구체적인 계약 | 책임을 소유한 구현 레포 |

완료된 architecture migration의 provenance나 transition-time safety context가 필요한 경우 [Architecture Transition](architecture-transition.md)을 참조한다. 현재 Item의 계획·구현 판단은 current Architecture와 owning repository의 live code/docs/state를 우선한다. GitHub Project README는 위 정보를 복제하는 원본이 아니라 **탐색용 인덱스**다. 장기 정의는 소유 문서에 두고 Project README에는 원본 링크와 Project 운영 진입점만 남긴다.

## 릴리스와 시간

Iteration과 제품 버전은 별개다. 매주 자동으로 버전을 올리지 않는다. release 목표와 readiness는 release 문서와 integration Evidence에서 관리하며 개별 Item의 필수 custom field로 복제하지 않는다.

## 생성과 검증의 피드백

Chat/Agent workflow는 결과를 수정할 수 있는 인터페이스와 권한을 함께 고려해 설계한다.

- 생성 이후 수정하기 어렵다면 생성 전에 필요한 맥락을 확보하고 정확한 결과를 만드는 데 우선 투자한다.
- 쉽게 수정할 수 있다면 과도한 생성 제약보다 생성 → 검증 → 피드백 → 수정의 짧은 반복을 활용할 수 있다.
- 불일치를 발견해도 조치할 수 없는 검사는 추가 비용과 실제 효용을 먼저 검토한다. 주변 metadata 검사를 본 작업의 blocker로 만들지 않는다.
- 이 원칙은 기능 구현이나 배포의 완료 Evidence를 생략하는 근거가 아니다. 완료 주장은 실제 수행한 검증 범위에 맞춘다.
