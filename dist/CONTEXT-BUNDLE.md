# Publishing Platform — Chat Context Bundle

GENERATED FILE — 원본은 각 문서 경계에 적힌 경로입니다. 직접 수정하지 마세요.
수집 기준일: 2026-09-18. 실시간 Project 상태나 구현 완료 증거가 아닙니다.
상대 링크는 원본 레포 기준입니다. 템플릿과 대화 원문 아카이브는 별도로 참조합니다.


---

<!-- BEGIN SOURCE: CONTEXT.md -->

# Context entry point

## 먼저 이해할 것

이 저장소는 Publishing Platform의 제품·아키텍처·계획 지식이다. 모든 설계가 구현되어 있다는 의미는 아니다. 확정 수준은 출처 (`provenance/README.md`), 남은 검증은 미결 사항 (`docs/open-questions.md`)을 따른다.

## 작업별 읽기

| 작업 | 읽을 문서 |
|---|---|
| 전체 이해 | Architecture (`docs/architecture.md`), Release 1.0 (`docs/release-1.0.md`) |
| Item 작성·분류·완료 검토 | Planning (`docs/planning-model.md`), Fields (`docs/fields.md`), 관련 release, 실제 Item의 Outcome/AC/Evidence |
| 구현 논의 | Architecture → 소유 레포의 최신 문서·코드·테스트 |
| 주간 계획·발표 | Operating Rhythm (`docs/operating-rhythm.md`), 실제 Project Status Update, 실제 Evidence |
| 설계 수정 | 해당 원본 문서, Decisions (`docs/decisions.md`), CONTRIBUTING (`CONTRIBUTING.md`) |
| 과거 발언 확인 | provenance/README.md의 source/turn → provenance/conversations.json |

## 사용할 요청 예시

> CONTEXT.md에 따라 필요한 문서를 읽고 다음 Item의 Scope, Objective, AC를 검토해줘. 실제 구현과 설계 의도를 구분해줘.

> 이 설계 변경을 원본 문서에 반영하고, 영향받는 규칙과 미결 사항을 확인한 뒤 통합 문서를 다시 생성해줘.

파일을 수정할 수 없는 Chat은 변경할 **원본 파일 전체**를 제공한다. 통합본의 문서 경계에 적힌 경로로 원본을 찾는다. 통합본 수정이나 대화상 합의만으로 원본이 갱신되었다고 표현하지 않는다.

<!-- END SOURCE: CONTEXT.md -->


---

<!-- BEGIN SOURCE: docs/architecture.md -->

# Architecture

상태: 사용자 명시 사항 및 이후 README 기준을 종합. 출처: S2 `138f8f89`, `4c1f839e`, `d7815342`; S3 `924e880a` (전체 ID는 출처 색인).

## 원칙

- 구현 작업보다 제품 결과와 시스템 책임을 기준으로 계획한다.
- 매 Iteration에 시연 가능한 결과를 남긴다.
- 핵심이 아닌 문제는 검증된 도구를 우선 활용한다.
- 안정된 경계가 필요해질 때까지 설계 선택의 변경 가능성을 유지한다.
- 레포와 프레임워크를 영구적인 제품 경계로 취급하지 않는다.

## 레포의 역할

유일한 최상위 구현 레포는 없다. 이 지식 레포도 다른 레포를 포함하는 super-repository가 아니다.

| 레포 | 대화에서 설명된 책임 |
|---|---|
| `oomia.github.io.engine` | 로컬에서 콘텐츠를 생성·수정하기 위한 환경과 처리 기능 |
| `oomia.github.io.docs` | downstream이 소비할 계약된 generated document set |
| `oomia.github.io` | generated documents를 소비해 사이트를 빌드하고 GitHub Pages로 전달 |

`mono`는 사용자가 로컬에서 붙인 별칭이며 실제 레포 이름의 일부가 아니다. 대화 당시 docs는 engine과 사이트 양쪽의 submodule이었다. 현재 checkout을 검사한 사실로 해석하지 않는다.

```text
Authoring → Canonical Content → Generated Documents → Site Output → Live Site
                    engine         docs                 site
```

Canonical content가 콘텐츠의 권위 있는 상태다. docs는 재생성 가능한 projection이며 수동 수정이 canonical state를 대체하지 않는다. 대화에는 PostgreSQL이 현재 canonical 저장소라는 설명이 있지만 제품 수준 계약은 특정 DB/프레임워크를 강제하지 않는다.

## 경계의 발전 방향

source-level 결합보다 명시적인 artifact/runtime contract를 우선한다. engine을 container image 등으로 배포하는 것은 가능한 방향이며 확정된 구현 과제가 아니다. API, generated documents, extensions 등의 계약 세부사항은 소유 레포에 둔다. 이 레포에서 코드의 구현 여부를 추론하지 않는다.

<!-- END SOURCE: docs/architecture.md -->


---

<!-- BEGIN SOURCE: docs/planning-model.md -->

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

## 완료 판정

- **Acceptance Criteria**: 이번 변화가 제공해야 하는 관찰 가능한 결과.
- **Quality Requirements**: 적용되는 성능·신뢰성·품질 제약. 근거 없는 수치를 만들지 않는다.
- **Global Definition of Done**: AC 충족, 적용 품질 검증, 필요한 코드와 지속 문서 통합, 관련 자동 검사 통과, 재현 가능한 Evidence 연결.

설계 문서는 설계 정의 작업의 Evidence가 될 수 있다. 기능 구현이나 배포 성공은 코드·PR·테스트·실행 결과·배포 URL 등 별도 증거가 필요하다. README만으로 Implementation Map을 완료 처리하지 않는다.

## Source of Truth

| 정보 | 소유 위치 |
|---|---|
| 제품 경계·설계 방향·계획 규칙·필드 의미·전역 DoD | 이 레포의 docs |
| Iteration Goal 및 회고 | GitHub Project Status Update |
| Status / Iteration / Work Type / Scope / Target Release / Objective 값 | GitHub Project fields |
| Outcome / AC / Evidence | 실제 Project Item 또는 Repository Issue |
| 구현·테스트·구체적인 계약 | 책임을 소유한 구현 레포 |

## 릴리스와 시간

Iteration과 제품 버전은 별개다. 매주 자동으로 버전을 올리거나 Objective마다 버전을 고정 배정하지 않는다. 대화에서 0.x → 1.0 → 1.x 발전을 제안했지만 실제 버전 목록과 공개 계약의 호환성 범위는 미결이다. Definition과 Readiness는 정의/검증 활동이며 Objective나 버전 값이 아니다.

`System view`는 과거에 제안된 사용자 정의 View 이름이다. Scope별 변경 이력을 보는 `By Scope`라는 이름으로 정리하며, 실제 View가 생성되어 있다는 의미는 아니다.

<!-- END SOURCE: docs/planning-model.md -->


---

<!-- BEGIN SOURCE: docs/fields.md -->

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

<!-- END SOURCE: docs/fields.md -->


---

<!-- BEGIN SOURCE: docs/release-1.0.md -->

# Publishing Platform 1.0

상태: 사용자가 제공한 README와 명시적 요구사항을 최신 용어로 정리. 출처: S2 `4c1f839e`, `3e786a51`; S3 `924e880a`, `5a382a65`.

## Release Goal

Deliver a usable and extensible workflow for authoring Articles and publishing them to a live site.

## Product Boundary

| Capability | 요구되는 관찰 가능한 결과 |
|---|---|
| Authoring | Article을 생성·수정할 실용적인 UX 또는 DX가 있다. raw data의 도움 없는 직접 편집만으로 끝나지 않는다. |
| Canonical Content | Article을 API로 생성·조회·수정할 수 있고 authoritative state가 canonical content로 지속된다. |
| Extensibility | 명시적인 extension contract를 통해 custom logic과 component를 사용하고 작성자가 결과를 합리적으로 예측할 수 있다. |
| Automation | 최소 하나의 automated 또는 agent-assisted workflow가 실제 publishing process에 참여한다. |
| Publishing | canonical content를 계약된 generated document set으로 결정적으로 투영한다. docs는 generated projection이다. |
| Presentation | generated documents를 최종 사용자용 사이트로 렌더링한다. 프레임워크는 구현 레포에서 결정한다. |
| Delivery | 콘텐츠 변경이 발행 경로를 거쳐 실제 GitHub Pages 사이트 업데이트로 이어진다. |

## 명시적 제외 범위

- canonical database backup / restore
- production-grade availability / HA
- advanced agent orchestration
- full-featured visual CMS
- complete WYSIWYG preview

## 검증

각 capability의 요구 수준을 실제 구현과 대조하고 재현 가능한 Evidence를 연결한다. 부분 구현·완료·미검증을 구분한다. 모든 capability를 이름 그대로 Item으로 생성하지 말고, 발견된 gap에 대해 독립적인 delta Item을 만든다.

현재 이 레포는 구현 레포와 live deployment를 검증하지 않았다. Implementation Map 템플릿 (`templates/implementation-map.md`)의 미검증 상태를 완료로 해석하지 않는다. 1.0의 public contract 범위와 최종 release gate 세부 AC는 아직 명시적으로 결정할 필요가 있다.

<!-- END SOURCE: docs/release-1.0.md -->


---

<!-- BEGIN SOURCE: docs/operating-rhythm.md -->

# Operating Rhythm

상태: 활동 계획의 사용자 명시 사항 중심. 출처: S1 `e0a335ad`, `1f288b42`, `33b898b1`.

## 목표와 리듬

Publishing Platform 완성과 계획·실행 습관을 중심에 둔다. 앰버서더 활동과 포트폴리오 개발의 기록을 하나의 흐름으로 연결한다.

- 매주 작은 발표, 매 4주 큰 발표 또는 working system review.
- 가용 시간은 대화 당시 주 50시간, 첫 주 25시간의 계획 가정. 현재 주의 실시간 예산이 아니다.
- Daily 기록은 20–30분 버퍼를 둔다. 주말 정리는 초기 60분을 잡고 실제 소요 시간을 기록해 조정한다.
- 주말 이전에 발표 일정을 잡는다. 통상 토요일 밤 또는 일요일 낮이며 확정 일정은 아니다.
- Daily는 비공개, 주말 정리 결과를 공개하는 방향에 사용자가 동의했다.

## Evidence → Story

매일 목표, 실제 결과, screenshot/GIF/video/voice/commit 등 Evidence, 배운 점, 다음 행동을 남긴다. 미디어는 GitHub에 업로드해 링크로 연결하는 방향을 선호했다. 구체적인 공개 범위와 저장 위치는 확정되지 않았다.

주말에는 일별 기록을 목표 → 시도 → 장애·판단 → 결과 → 다음 행동의 A-Z 스토리로 재구성한다. Agent/LilysAI는 정리 부담을 낮추는 도구이며 모든 개발을 Agent가 수행한다고 가정하지 않는다. 공개 결과물은 발표·블로그를 중심으로 하고 LinkedIn을 초기 후보로 둔다. 자체 블로그가 준비되기 전 발행 채널은 미결이다.

## LilysAI 활용 후보

글 전체 기반 description/metadata, 내용 기반 외부 링크 preview, 태그 후보, 3줄 요약을 실험할 수 있다. 이는 사용자가 제시한 관심 기능이며 네 기능 모두가 1.0 필수라는 의미는 아니다. 1.0은 최소 하나의 실제 automation 경로를 요구한다.

자동화는 자료 수집 → 요약·통합 → 발표/글 초안 → 플랫폼 발행의 순서로 필요에 맞게 확장한다. 현재 연결된 서비스나 구현 완료된 자동화를 의미하지 않는다.

<!-- END SOURCE: docs/operating-rhythm.md -->


---

<!-- BEGIN SOURCE: docs/decisions.md -->

# Decision Log

과거 제안과 현재 정리 기준을 구분한다. 아래 날짜는 모두 수집일 2026-09-18이며 원래 결정일을 추정하지 않는다.

| ID | 현재 기준 | 상태 / 근거 | 대체하거나 제한한 과거 안 |
|---|---|---|---|
| D001 | 유일한 최상위 구현 레포를 만들지 않는다 | 사용자 명시, S2 `138f8f89` | 임의의 root repository 및 submodule 집합으로 제품 계층을 표현 |
| D002 | docs는 generated projection | 사용자 명시, S2 `4c1f839e` | docs를 canonical authoring source로 취급 |
| D003 | 필드 이름은 Work Type | 사용자 명시, S2 `178bf729` | Category / Type |
| D004 | Target Release와 Objective를 분리 | 사용자 후속 확인, S3 `5a382a65` | Release Target에 버전/목표를 결합 |
| D005 | Scope는 직접 바뀌는 책임만 최소 선택 | 사용자 README 반영 + 최신 제안, S3 `924e880a`, S2 `82ef0a72` | 단일 주영역만 선택하던 중간 제안; 모든 dependency 태깅 |
| D006 | Objective 5개와 Authoring Experience를 보존 | 실제 옵션은 사용자 명시, description/유지는 최신 제안, S3 `f55d6e75` | 4개만 적힌 이전 답변 |
| D007 | Item은 완료 가능한 delta | 최신 설계 제안, S2 `4a49654f` | 영구 capability를 릴리스마다 복제해 Done 처리 |
| D008 | 지식은 Markdown 레포, 운영 상태는 Project | 이번 레포 생성 요청으로 실행한 구조, S3 `72f26f1b` 및 현재 요청 | Project README가 모든 장기 지식을 소유 |

D005의 다중 선택 설정, Delivery 옵션 등록은 실제 Project에서 확인되지 않았다. D007 등 제안을 사용자의 명시적 승인 발언으로 인용하지 않는다. engine container 배포 및 Validation 옵션은 결정이 아니라 미결 제안이다.

<!-- END SOURCE: docs/decisions.md -->


---

<!-- BEGIN SOURCE: docs/open-questions.md -->

# Open Questions / Verification Gaps

| ID | 항목 | 현재 처리 |
|---|---|---|
| Q001 | GitHub Project #11의 실제 필드·옵션·View·Item·Status Update | 현재 조회하지 않았으므로 대화 기준 설계와 분리 |
| Q002 | Scope 다중 선택 및 Delivery 옵션의 실제 적용 | 최신 제안에 포함, 실제 설정 미확인 |
| Q003 | 1.0 public contract 목록·호환성 정책·release gate | 구현 소유 레포의 계약을 조사한 후 구체화 |
| Q004 | 각 capability의 구현 수준과 재현 증거 | 전부 미검증, Implementation Map 템플릿 제공 |
| Q005 | 실제 Target Release 옵션·Iteration 일정·현재 Goal | Project 운영 상태에서 조회 필요; 예시를 실데이터로 만들지 않음 |
| Q006 | Status 옵션 및 계획 Item의 Objective/Target Release 빈 값 허용 규칙 | 명시적으로 확정할 필요 있음 |
| Q007 | Work Type Validation 추가 | 보류. 현재 기본값은 5개 유지 |
| Q008 | engine container/artifact 배포 | 방향성 후보. 필요 시 별도 결정 |
| Q009 | 원격 레포 이름·공개 범위·Project README 링크 전환 | 로컬 레포만 생성; 원격 연결 없음 |
| Q010 | 미디어 공개 범위·저장 위치와 임시 블로그 채널 | 운영 필요 시 결정 |

## 이번 수집 범위

동일 ChatGPT 프로젝트에서 목록에 나타난 관련 대화 3개를 마지막 페이지까지 조회했다. 현재 로컬 sources/는 비어 있다. 다른 프로젝트의 대화, 실제 구현 레포, 외부 서비스 최신 기능, live GitHub Project는 검증 범위에 포함하지 않았다. 대화의 외부 인용은 역사적 원문으로만 보존한다.

<!-- END SOURCE: docs/open-questions.md -->


---

<!-- BEGIN SOURCE: CONTRIBUTING.md -->

# 수정 방법

1. CONTEXT.md에서 해당 규칙을 소유하는 파일을 찾는다.
2. 원본 Markdown을 수정한다. 새로운 제안은 확정된 규칙으로 섞지 말고 open-questions.md에 기록한다.
3. 의미 있는 방향 변경에는 decisions.md에 ID, 상태, 이유, 출처, 대체한 결정을 남긴다. 과거 기록을 삭제하지 않는다.
4. CHANGELOG.md를 갱신하고 `python3 scripts/bundle.py`를 실행한다.
5. 변경 내용을 Git diff로 검토하고 커밋한다. 원격 게시 시 공개 범위를 확인한다.

규칙의 중복 복사는 피한다. Project 필드 설명에 복사한 내용은 이 레포의 정의를 기준으로 다시 맞춘다. 별도 레포의 코드와 계약을 함께 바꾸는 경우 관련 PR을 서로 연결한다.

## 대화에서 변경을 가져올 때

사용자의 명시적 정정 → 이후 사용자 메시지에 반영된 규칙 → 최신 assistant 제안 → 오래된 초안 순으로 근거를 판단한다. 시간상 최신이라는 이유만으로 제안을 사용자 승인으로 바꾸지 않는다. 출처에는 대화 제목, URL, turn ID를 남긴다.

## 공유

이 레포에는 대화 원문 아카이브가 포함되어 있다. 원격 공개 전 아카이브의 공유 범위를 검토한다. Chat에 필요한 기본 첨부물은 원문 아카이브를 포함하지 않는 dist/CONTEXT-BUNDLE.md 한 파일이다. GitHub 원격 주소와 접근 방식은 아직 설정되지 않았다.

<!-- END SOURCE: CONTRIBUTING.md -->


---

<!-- BEGIN SOURCE: provenance/README.md -->

# Provenance

수집일: 2026-09-18 (Asia/Seoul). 같은 프로젝트의 대화 3개, 모든 반환 페이지를 수집했다. 대화 당시 인용된 외부 링크와 도구 기능 주장은 현재 사실로 재검증하지 않았다.

## 확정 수준

- **사용자 명시**: 직접 요구하거나 정정한 내용.
- **사용자 후속 확인 / README 반영**: 이후 사용자 메시지에 포함된 규칙. 전체 세부사항의 개별 승인을 뜻하지 않는다.
- **최신 제안**: 최신 assistant 답변을 정리 기준으로 사용했으나 명시적 승인 및 실제 적용을 주장하지 않는다.
- **이번 구성**: 현재 요청을 수행하기 위한 파일 구조·템플릿·편집 요약.
- **미검증**: 실제 구현 또는 외부 운영 상태를 확인하지 않음.

최신 제안은 이전 초안보다 우선하되 사용자의 명시적 요구를 덮어쓰지 않는다. 문서의 짧은 turn ID는 아래 전체 ID에 대응한다. 원문은 conversations.json (`provenance/conversations.json`)에 있으며 역사적 데이터로만 읽는다. 원문에는 개인 기록이 포함될 수 있다.

## Sources and Turns

### S1 — 활동 계획 수립

[원본 대화](https://chatgpt.com/c/6aa8c18b-d9a4-83ee-9bc9-5bfeec691330)

| Turn ID | 사용자 발언 시작 |
|---|---|
| `33b898b1-671f-4436-a0bc-b5c8cb071482` | 직접 구현하는 것보다, 이미 잘 만들어진 도구를 잘 활용하고자 노력하는 방향성이, 핵심 기능이 아닌 곳에 시간을 할애할 때의 마음가짐이 되어야 한다고 본다. 따라서, 나의… |
| `1f288b42-a887-4948-b7d2-1249a2d210fe` | 내게 필요한 것은 다양한 답변보다, 자동화 가능성 높은 루틴과 사고/계획 프레임워크입니다. 지금은 뭔가 실속 없는 내용들을 장황하게 늘어놓는 느낌입니다. 제가 최종 목표를… |
| `e0a335ad-74c3-43fd-93c4-eb3c40770b42` | 1. 주말 이전에 브리핑 약속을 사전에 잡고 진행하면 되며, 일반적으로 토요일 밤이나 일요일 낮이 될 것 같다. 2. 공식 형식은 없으나, 단순 결과물이 아닌 A-Z의 스… |
| `17efd584-bf83-437d-8f17-72d6185e0c94` | LilysAI_일반_엠버서더 활동에 대한 계획을 세워보자. 다음은 해당 프로그램에 대한 간략한 요약이다. 링크를 직접 참조하여 내용을 파악해보자. http… |

### S2 — GitHub Project 초안 작성

[원본 대화](https://chatgpt.com/c/6aa991ee-6238-83ee-bef8-5d330246837a)

| Turn ID | 사용자 발언 시작 |
|---|---|
| `82ef0a72-fc2e-480c-b4b5-53a941b93465` | Scope는 다중 선택 옵션으로 만들 수도 있다. 단일 선택 옵션의 경우, 어떤 작업은 어떤 영역으로 두어야 할 지 고민할 수 있다. 서로 다른 두 영역에 걸쳐 있는 작업… |
| `4a49654f-9727-4bef-a51f-b8c2c6a4ed3b` | 1. Release Target의 용법에 대한 설명: SemVer 뒤에 붙는 context를 별도의 필드로 추출하지 않아야만 하는 이유는? 2. Scope 필드는 sing… |
| `3e786a51-3bc0-4c70-af4c-a726b8d5adb4` | - application boundary와 관련된 답변에서 표현을 \Article을 API를 통해 생성·조회·수정할 수 있고, 그 상태가 canonical state로 … |
| `d7815342-69e8-47ae-9512-15aff0ec8cb7` | - 1.0 Product Boundary와 Release Target에서 1.0과 관련된 용어들 사이의 차이 (1.0 Definition부터 1.0 Readiness까지)… |
| `178bf729-4b1d-4bc9-ab65-203481022f60` | 1. Category 대신 Work Type을 사용했으니 앞으로의 표현에 참고하도록. 2. milestone을 목표처럼 사용하는 것에 대한 의견. 의견을 내기 전에 Git… |
| `4c1f839e-0f53-4803-99ca-f84cd5724030` | - Type은 예약되어있는 필드명이라 Category로 바꿨는데, 대안이 있을까? - Acceptance Criteria와 DoD의 혼용에 혼란스럽다. 간단한 예시를 통해… |
| `138f8f89-0c4a-450e-9abd-677215c6d8de` | GOAL: Make the canonical content persistence path executable through the existing application c… |
| `2877a148-8c99-425b-8896-d738308e239a` | Area와 Component를 만드는 것 자체는 좋지만,Area A에 Component A1, A2, A3가 속하는 느낌이라면, 차라리 A:A1 같이 합치는 것이 유지보수… |
| `9e4fc270-7151-4b7d-8044-ce625803cd70` | 사용자/시스템 기능보다는 기술 구조가 더 편하게 느껴진다. 그러나 Database, CMS와는 달리, Astro는 Web App 중 실제 문서와 기타 기술 블로그를 구성하… |
| `5b7f689f-9eb1-410a-8c62-549b49124eb1` | 이슈 생성 시, default assignee, default label, 그리고 Milestone 설정을 할 수 있어? 할 수 있다면 하는 게 좋을까? 또 모든 작업에 … |
| `ab0703f8-90a7-4e66-b788-12e8a81acf63` | Project의 각 아이템은 레포의 이슈인지, Item을 할당하려면 반드시 특정한 레포를 명시해야하는지, 그리고 기본적으로 모든 이슈는 draft로 생성되도록 강제할 수 … |
| `d7f1bf49-931a-4fd8-b056-a873fcfba13f` | 일단 나도 Iteration 스타일을 선호한다. 이에 맞는 방식을 처음부터 진행하는 것이 적응에 도움이 되리라 본다. 그리고 현재의 README는 다소 장황하다. 핵심 가… |
| `833044bb-289f-454c-b891-cc9fe77cca17` | 기본 레포지토리 설정 없이 GitHub Project의 이름을 \Publishing Platform\로 설정하고, 거의 처음으로 본격적으로 GitHub Project를… |

### S3 — README Evidence Planning

[원본 대화](https://chatgpt.com/c/6aac4ab0-1e38-83e8-a671-8cbbfa4173ae)

| Turn ID | 사용자 발언 시작 |
|---|---|
| `b0174bce-6fff-4f18-bd3a-d931088e34c7` | [@GitHub](plugin://github@openai-curated-remote) [https://github.com/users/ooMia/projects/11/](… |
| `72f26f1b-8a12-4af1-b990-b95223fb8d41` | GitHub Project에 README로 설계안을 기록해두는 게 LLM을 사용하는 동안 컨텍스트 전달이 불편한데, Notion이나 다른 MCP 붙이고 별도로 정리해두는 … |
| `f55d6e75-29f6-4b53-a2b8-121a27384873` | 실제 필드에 **Authoring Experience가 있는데, 이건 유지하는 게 좋을까 삭제해도 좋나** - **Authoring Experience** - **Cano… |
| `353c6aa1-89d0-450f-b803-f87a069dfbd8` | 1. Canonical Content&#x20; 2. Publishable Projection&#x20; 3. Extensible Workflow&#x20; 4… |
| `f4b8c972-620f-4473-aaf9-4624d9f04f3e` | Objectives는 필드입니다. 해당 필드의 존재 목적에 따라 item에 어떤 속성을 선택해야 할 지에 대한 설명을 작성하시오… |
| `9368804c-56e9-4f34-bbc7-22ecc603e441` | ## Objectives 각각에 대한 description이 필요하다. 그리고 다음부터는 README처럼 문서를 변경할 때, 수정이 용이하도록 파편화된 부분을 제공하기보단… |
| `5a382a65-6b1f-495a-8055-ec48dd9122ec` | 현재의 Objective는 description이 없는데, GitHub Project 초안 작성 채팅 세션 내용을 참고해서 작성해보자&#x20; Release Targ… |
| `924e880a-e689-486a-bdf2-c6fb19248b6c` | markdown # Publishing Platform Turn structured content into customizable, deployable sites t… |

## 수집 한계

GitHub Project 실제 설정 및 구현 소스는 미조회다. 최신 문서에 없는 초기 제안은 원문 아카이브에서만 유지한다. 아카이브는 향후 규칙 수정 시 출처 비교용이며 기본 Chat 통합본에 포함하지 않는다.

<!-- END SOURCE: provenance/README.md -->
