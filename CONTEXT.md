# Context entry point

## 먼저 이해할 것

이 저장소는 Publishing Platform의 제품·아키텍처·계획 지식이다. 모든 설계가 구현되어 있다는 의미는 아니다. 확정 수준은 [출처](provenance/README.md), 남은 검증은 [미결 사항](docs/open-questions.md)을 따른다.

## 작업별 읽기

| 작업 | 읽을 문서 |
|---|---|
| 전체 이해 | [Architecture](docs/architecture.md), [Release 1.0](docs/release-1.0.md) |
| Item 작성·분류·완료 검토 | [Planning](docs/planning-model.md), [Fields](docs/fields.md), 관련 release, 실제 Item의 Outcome/AC/Evidence |
| 구현 논의 | Architecture → 소유 레포의 최신 문서·코드·테스트 |
| 주간 계획·발표 | [Operating Rhythm](docs/operating-rhythm.md), 실제 Project Status Update, 실제 Evidence |
| 설계 수정 | 해당 원본 문서, [Decisions](docs/decisions.md), [CONTRIBUTING](CONTRIBUTING.md) |
| 과거 발언 확인 | provenance/README.md의 source/turn → provenance/conversations.json |

## 사용할 요청 예시

> CONTEXT.md에 따라 필요한 문서를 읽고 다음 Item의 Scope, Objective, AC를 검토해줘. 실제 구현과 설계 의도를 구분해줘.

> 이 설계 변경을 원본 문서에 반영하고, 영향받는 규칙과 미결 사항을 확인한 뒤 통합 문서를 다시 생성해줘.

파일을 수정할 수 없는 Chat은 변경할 **원본 파일 전체**를 제공한다. 통합본의 문서 경계에 적힌 경로로 원본을 찾는다. 통합본 수정이나 대화상 합의만으로 원본이 갱신되었다고 표현하지 않는다.
