# GitHub labels

GitHub labels는 Project #11의 필드 체계를 복제하지 않고, Issue/PR을 여러 repository에서 빠르게 찾기 위한 **횡단 관심사 metadata**로만 사용한다.

## 원칙

- Status / Iteration / Work Type / Scope / Objective / Target Release는 GitHub Project가 SoT다.
- label은 Project field로 자연스럽게 표현되지 않는 운영 의미만 담는다.
- orchestration 전용 label은 `orchestration:*` namespace를 사용한다.
- 하나의 Issue/PR에 여러 orchestration label을 함께 붙일 수 있다.
- Issue 대상 repository의 범위는 [Project Orchestration](project-orchestration.md#적용-범위)이 소유한다.

## Registry

label의 **이름과 의미**는 [config/labels.json](../config/labels.json)을 canonical source로 사용한다. 색상은 UI 구분을 위한 표시 힌트이며 repository별 실제 색과 달라도 semantics가 바뀌지 않는다.

## 사용 기준

주된 Outcome이 자동화 구현이면 `orchestration:automation`을 붙인다. 여러 repository에 걸치면 `orchestration:cross-repo`를 추가한다. 정책 자체를 변경할 때만 `orchestration:policy`, 검증 자체가 독립적인 Outcome일 때만 `orchestration:evidence`를 사용한다.

예를 들어 repository Issue activation을 구축하는 coordination Issue에는 다음 조합이 적합하다.

```text
orchestration:automation
orchestration:cross-repo
```

단순히 Acceptance Criteria에 검증 단계가 있다는 이유만으로 `orchestration:evidence`를 추가하지 않는다.
