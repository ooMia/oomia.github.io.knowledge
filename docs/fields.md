# Project Fields

상태: 대화 기준 설계 정의. 실제 GitHub 설정을 조회한 스냅샷이 아니다. 출처: S2 `138f8f89`, `178bf729`, `82ef0a72`; S3 `5a382a65`, `f4b8c972`, `f55d6e75`.

## 필드

| 이름 | 답하는 질문 | 설계상 형태 |
|---|---|---|
| Status | 지금 어떤 작업 상태인가? | 단일 값, 실제 옵션 미확인 |
| Iteration | 언제 수행하는가? | Iteration |
| Work Type | 어떤 종류의 일인가? | 단일 선택 |
| Scope | 완료를 위해 어떤 시스템 책임이 바뀌는가? | 다중 선택 방향 |
| Target Release | 어느 통합 제품 버전에 포함할 것인가? | 단일 버전 값 |
| Objective | 어떤 지속적인 제품 결과를 발전시키는가? | 주된 결과 하나 |

## Scope

Field description:
> Platform responsibilities that must change for the item's Outcome and Acceptance Criteria to be satisfied. Select only directly affected scopes, not incidental dependencies.

판정 질문: **해당 Scope의 동작이나 계약이 전혀 바뀌지 않아도 AC를 만족할 수 있는가?** 가능하면 선택하지 않는다. 하나가 기본이며 두 책임의 독립적인 변화가 필요하면 복수 선택한다. 3개 이상이면 Item 분해를 검토한다. 관련 레포, 사용 기술, 단순 의존성을 태그로 붙이지 않는다.

| Option | Description |
|---|---|
| Content | Article semantics, authoring, validation, and user/developer-facing content operations. |
| Persistence | Durable storage, retrieval, consistency, and lifecycle of canonical platform state. |
| Automation | Agent-assisted, scheduled, triggered, or background execution of platform workflows. |
| Publishing | Deterministic transformation of canonical content into contracted publishable documents. |
| Presentation | Rendering, composition, navigation, and visual presentation of publishable content as a user-facing site. |
| Delivery | Propagation, deployment, and verification of validated site output in the live environment. |

예: 기존 DB를 읽어 export 로직만 개선하면 Publishing. API 수정 기능과 영속화 계약을 함께 추가하면 Content + Persistence. 기존 build 결과를 배포하는 경로만 바꾸면 Delivery. 단순 수동 CLI 호출은 자동으로 Automation에 해당하지 않는다.

최신 Scope 제안은 6개 옵션과 다중 선택이다. 사용자가 초기에 확인한 옵션은 Delivery를 제외한 5개였으므로 Delivery의 실제 등록 여부와 다중 선택 적용 여부는 미확인이다.

## Objective

Field description:
> Select the Objective that best represents the primary product outcome advanced by this item, based on its Outcome and Acceptance Criteria rather than its implementation area or dependencies.

사용자가 최신 메시지에서 실제 필드에 존재한다고 제시한 5개 옵션을 유지한다. 아래 description은 그 메시지에 대한 최신 제안이다.

| Option | Description |
|---|---|
| Authoring Experience | Select when the item improves how authors create, edit, inspect, or validate content through tooling or user-facing authoring interactions. |
| Canonical Content | Select when the item improves the authoritative content model, persistence, lifecycle, or rules governing canonical state. |
| Publishable Projection | Select when the item improves how canonical content is deterministically transformed into publishable artifacts. |
| Extensible Workflow | Select when the item adds or improves supported extension points, custom logic, components, or automation in the publishing workflow. |
| Live Delivery | Select when the item improves how publishable artifacts are rendered, deployed, or propagated to the live user-facing site. |

Authoring Experience는 CMS UI에 한정되지 않는다. CLI, IDE, form, agent-assisted authoring도 포함할 수 있다. Scope는 책임 영역, Objective는 개선된 제품 결과이므로 서로 일대일 대응하지 않는다.

## Work Type

이름은 사용자가 `Category`에서 `Work Type`으로 정정했다. 옵션은 대화에 나온 5개를 보존한다. 아래 짧은 선택 설명은 이번 정리에서 편집한 요약이며 실제 필드 description의 복제본이 아니다.

| Option | 선택 기준 |
|---|---|
| Feature | 사용 가능한 새로운 기능 또는 동작 개선을 제공한다. |
| Experiment | 불확실한 가설을 검증하고 관찰 결과를 남긴다. |
| Decision | 대안을 판단하고 선택한 방향과 이유를 확정한다. |
| Documentation | 지속적으로 참조할 지식과 설명을 정리한다. |
| Maintenance | 기존 시스템의 유지·정비를 수행한다. |

작업의 주된 결과를 기준으로 하나를 고른다. `Validation` 추가는 대화에서 보류된 제안이며 기본 옵션에 넣지 않는다.

## Target Release

`1.0.0`처럼 통합 버전만 사용한다. `1.0 / Canonical Content` 같은 버전+목표 결합 값은 사용하지 않는다. 하나의 릴리스에 여러 Objective가 포함되고 동일 Objective가 여러 릴리스에서 발전할 수 있다. 실제 릴리스 옵션과 Item별 할당은 Project에서 확인한다.
