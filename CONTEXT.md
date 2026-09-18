# Context entry point

## 먼저 이해할 것

이 저장소는 Publishing Platform의 제품·아키텍처·계획 지식에 대한 canonical source다. 설계가 존재한다는 사실과 구현 완료를 구분한다. 구현 수준은 [Implementation Map](docs/implementation-map.md)의 기준 revision과 실제 구현 레포를 확인하고, 확정 수준은 [Provenance](provenance/README.md), 남은 결정은 [Open Questions](docs/open-questions.md)을 따른다.

## 작업별 읽기

| 작업 | 읽을 문서 |
|---|---|
| 전체 이해 | [Architecture](docs/architecture.md), [Release 1.0](docs/release-1.0.md) |
| 현재 1.0 구현 수준·gap | [Implementation Map](docs/implementation-map.md) → 기준 revision의 구현 레포 코드·테스트 |
| Item 작성·분류·완료 검토 | [Planning](docs/planning-model.md), [Fields](docs/fields.md), 관련 release, 실제 Item의 Outcome/AC/Evidence |
| 구현 논의 | Architecture → Implementation Map → 소유 레포의 최신 문서·코드·테스트 |
| 주간 계획·발표 | [Operating Rhythm](docs/operating-rhythm.md), 실제 Project Status Update, 실제 Evidence |
| 설계 수정 | 해당 원본 문서, [Decisions](docs/decisions.md), [CONTRIBUTING](CONTRIBUTING.md) |
| GitHub Project README 정리 | [Project README 템플릿](templates/project-readme.md) |
| 과거 발언 확인 | provenance/README.md의 source/turn → provenance/conversations.json |

## 사용할 요청 예시

> CONTEXT.md에 따라 필요한 문서를 읽고 다음 Item의 Scope, Objective, AC를 검토해줘. 실제 구현과 설계 의도를 구분해줘.

> Implementation Map의 기준 revision보다 구현 레포가 진행되었는지 확인하고, 1.0 capability 상태와 남은 delta를 갱신해줘.

> 이 설계 변경을 원본 문서에 반영하고, 영향받는 규칙과 미결 사항을 확인한 뒤 통합 문서를 다시 생성해줘.

설계 정의 Item의 Evidence에는 canonical 문서의 immutable commit/permalink를 사용할 수 있다. 기능 구현·배포 Item은 구현 레포의 재현 가능한 Evidence가 별도로 필요하다. 파일을 수정할 수 없는 Chat은 변경할 **원본 파일 전체**를 제공하고, 통합본 수정이나 대화상 합의만으로 원본이 갱신되었다고 표현하지 않는다.
