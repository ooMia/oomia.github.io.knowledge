# GitHub labels

GitHub labels는 Project #11의 필드 체계를 복제하지 않고, Issue/PR을 여러 repository에서 빠르게 찾기 위한 **횡단 관심사 metadata**로만 사용한다.

## 원칙

- Status / Iteration / Work Type / Scope / Objective / Target Release는 GitHub Project가 SoT다.
- label은 Project field로 자연스럽게 표현되지 않는 운영 의미만 담는다.
- orchestration 전용 label은 `orchestration:*` namespace를 사용한다.
- 하나의 Issue/PR에 여러 orchestration label을 함께 붙일 수 있다.
- `oomia.github.io.docs`는 generated projection이므로 개발 Issue label 체계의 적용 대상이 아니다.

## Registry

| Label | 의미 | 적용 예 |
|---|---|---|
| `orchestration:automation` | GitHub Actions, scripts, Project/branch 동기화 등 자동화 동작 변경 | Issue activation workflow |
| `orchestration:policy` | repository 운영 규칙, lifecycle, 권한·token 정책 변경 | branch/merge policy |
| `orchestration:cross-repo` | 두 개 이상의 repository를 함께 조정하는 작업 | knowledge + engine + site 동기화 |
| `orchestration:evidence` | automation 자체보다 검증·재현·evidence 수집이 Outcome인 작업 | idempotency/E2E 검증 |

색상·설명까지 포함한 machine-readable registry는 [config/labels.json](../config/labels.json)을 canonical source로 사용한다.

## 사용 기준

주된 Outcome이 자동화 구현이면 `orchestration:automation`을 붙인다. 여러 repository에 걸치면 `orchestration:cross-repo`를 추가한다. 정책 자체를 변경할 때만 `orchestration:policy`, 검증 자체가 독립적인 Outcome일 때만 `orchestration:evidence`를 사용한다.

예를 들어 repository Issue activation을 구축하는 coordination Issue에는 다음 조합이 적합하다.

```text
orchestration:automation
orchestration:cross-repo
```

단순히 Acceptance Criteria에 검증 단계가 있다는 이유만으로 `orchestration:evidence`를 추가하지 않는다.
