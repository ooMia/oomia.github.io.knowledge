# Planning Model

상태: 사용자 제시 규칙에 최신 필드 분리와 delta 모델을 반영. 출처: S2 `d7815342`, `4a49654f`; S3 `5a382a65`, `924e880a`.

## 계획 단위

| 개념 | 정의 / 작성 규칙 |
|---|---|
| Release Goal | 릴리스가 달성할 제품 상태 한 문장. 기술·작업 나열은 Product Boundary로 분리 |
| Product Boundary | 해당 릴리스에 필요한 capability 및 제외 범위. 구현 순서가 아님 |
| Target Release | Item의 결과를 포함할 통합 제품 버전 |
| Objective | 여러 릴리스에서 반복 발전시키는 제품 결과 축 |
| Iteration Goal | 이번 Iteration에서 달라질 가장 중요한 상태 한 문장 |
| Iteration Commitment | Goal을 위해 선택한 Item 집합. 대화 기준 통상 2–5개 |
| Project Item | 독립적으로 검증 가능한 하나의 변화(delta) |
| Repository Issue | 해당 결과를 실현하는 특정 레포의 구현 단위 |

Objective와 capability 자체를 영구적으로 Done 처리하지 않는다. 이전 Item을 다음 버전용으로 복제하지 말고 새로 달라지는 결과만 Item으로 만든다. 특정 릴리스가 요구하는 capability 수준은 릴리스 기준으로 검증한다.

## Item / Issue 작성

Project Item에는 Outcome, binary하게 판정 가능한 Acceptance Criteria, Evidence를 둔다. 시스템 변경에는 직접 바뀌는 Scope를 지정하고, 계획·분류 규칙 작업에는 Scope를 비울 수 있다. 구현 레포 이름이나 프레임워크만으로 제품 결과를 정의하지 않는다.

불확실한 작업은 Draft로 포착한다. 레포 소유권과 실행 범위가 분명한 구현 작업은 Repository Issue로 구체화한다. 전역 조정 Item을 억지로 하나의 레포에 귀속하지 않는다. Issue에는 부모 Item 링크, 구현 기술, 필요한 Quality Requirements를 명시한다. 한 Iteration에 끝내기 어렵거나 독립 검증이 필요한 결과는 분해한다.

### Draft와 활성화

- 가능한 경우 GitHub Project의 native Draft Issue를 사용한다. 현재 사용하는 connector가 이를 지원하지 않으면 repository issue를 `draft:` prefix + `closed / not_planned` 상태로 보관하는 fallback을 사용할 수 있으며, 이를 native Draft와 혼동하지 않는다.
- Draft 단계에서는 implementation branch를 만들지 않는다.
- 사용자가 Draft Issue를 명시적으로 발행/활성화하면 **같은 작업에서 Development branch를 반드시 생성·연결한다.** branch 생성은 별도 사용자 요청을 기다리지 않는다.
- 활성화 시 제목의 draft 표기를 제거하고 Project Status를 `Todo`로 전환한 뒤, 실제 구현 착수 시 `In Progress`로 이동한다.
- Development branch는 실제 구현 책임을 소유하는 repository에 둔다. 하나의 Issue가 여러 구현 레포에 걸치면 1:N 관계를 명시한다.
- 코드 변경을 직접 소유하지 않는 cross-repo coordination Item은 branch를 만들지 않을 수 있다. 대신 연결된 각 repository implementation issue가 활성화되는 순간 각각의 branch를 생성한다.

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
| 제품 경계·설계 방향·계획 규칙·필드 의미·전역 DoD | 이 레포의 docs |
| 1.0 capability별 검증 스냅샷 | 이 레포의 [Implementation Map](implementation-map.md) |
| Iteration Goal 및 회고 | GitHub Project Status Update |
| Status / Iteration / Work Type / Scope / Target Release / Objective 값 | GitHub Project fields |
| Outcome / AC / Evidence | 실제 Project Item 또는 Repository Issue |
| 구현·테스트·구체적인 계약 | 책임을 소유한 구현 레포 |

GitHub Project README는 위 정보를 복제하는 원본이 아니라 **탐색용 인덱스**다. 장기 정의는 knowledge repository에 두고 Project README에는 canonical 문서 링크와 Project 운영 원칙만 남긴다.

## 릴리스와 시간

Iteration과 제품 버전은 별개다. 매주 자동으로 버전을 올리거나 Objective마다 버전을 고정 배정하지 않는다. 대화에서 0.x → 1.0 → 1.x 발전을 제안했지만 실제 버전 목록과 공개 계약의 호환성 범위는 미결이다. Definition과 Readiness는 정의/검증 활동이며 Objective나 버전 값이 아니다.

`System view`는 과거에 제안된 사용자 정의 View 이름이다. Scope별 변경 이력을 보는 `By Scope`라는 이름으로 정리하며, 실제 View가 생성되어 있다는 의미는 아니다.
