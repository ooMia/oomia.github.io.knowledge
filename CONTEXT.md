# Context entry point

## 먼저 이해할 것

이 저장소는 Publishing Platform의 제품·아키텍처·계획 지식에 대한 canonical source다. 설계가 존재한다는 사실과 구현 완료를 구분한다.

콘텐츠 작업에서는 특히 다음 원칙을 먼저 적용한다.

- canonical Article source는 CMS/Visual Editor와 독립적으로 보존한다.
- storage / visual editing / publishing 가능성을 동일시하지 않는다.
- 공식 MDX component는 versioned public content-component contract를 공유하고 CMS는 authoring adapter, Site는 rendering consumer로 취급한다.
- 실제 구현 수준은 [Implementation Map](docs/implementation-map.md)의 기준 revision과 책임 레포 Evidence로 판정한다.

확정 수준은 [Provenance](provenance/README.md), 남은 결정은 [Open Questions](docs/open-questions.md)을 따른다. 이전 작업을 이어받는 경우에는 먼저 [Current Handoff](handoff/current.md)를 읽되, handoff는 volatile checkpoint이며 canonical policy가 아님을 전제로 한다.

## 작업별 읽기

| 작업 | 읽을 문서 |
|---|---|
| 이전 세션 이어받기 | [Current Handoff](handoff/current.md) → 필요한 canonical 문서와 live GitHub 상태 재검증 |
| 전체 이해 | [Architecture](docs/architecture.md), [Release 1.0](docs/release-1.0.md) |
| Markdown/MDX authoring·storage·publish 정책 | [Content Authoring & Publishing Contract](docs/content-authoring-contract.md) |
| MDX component package / Agent-readable manifest | [Content Component Manifest Schema](docs/content-component-schema.md), [JSON Schema](schemas/content-component-manifest.schema.json) |
| 현재 1.0 구현 수준·gap | [Implementation Map](docs/implementation-map.md) → 기준 revision의 구현 레포 코드·테스트 |
| Item 작성·분류·완료 검토 | [Planning](docs/planning-model.md), [Fields](docs/fields.md), 관련 release, 실제 Item의 Outcome/AC/Evidence |
| Issue activation / Project field / Development branch 자동화 | [Project Orchestration](docs/project-orchestration.md), [Planning](docs/planning-model.md) |
| 구현 논의 | Architecture → 관련 contract → Implementation Map → 소유 레포의 최신 문서·코드·테스트 |
| 주간 계획·발표 | [Operating Rhythm](docs/operating-rhythm.md), 실제 Project Status Update, 실제 Evidence |
| 설계 수정 | 해당 원본 문서, [Decisions](docs/decisions.md), [CONTRIBUTING](CONTRIBUTING.md) |
| GitHub Project README 정리 | [Project README 템플릿](templates/project-readme.md) |
| 과거 발언 확인 | [Provenance](provenance/README.md)의 source/turn metadata → 필요 시 원본 대화 링크 |

## Agent 작업 원칙

Content 관련 구현을 계획하거나 수정할 때:

1. CMS editor capability를 canonical syntax requirement로 확대하지 않는다.
2. unsupported Visual syntax를 삭제/정규화해서 손실시키기보다 Source fallback을 우선한다.
3. 저장 가능성과 publishability를 분리한다.
4. 공식 MDX component 변경은 Site가 소유하는 shared component contract의 영향부터 확인한다.
5. TypeScript type만으로 runtime contract가 충분하다고 가정하지 않는다. 필요한 경우 component manifest/schema를 사용한다.
6. 최종 Publishability는 실제 Site consumer 검증을 포함해 판단한다.

## 프로젝트 협업·응답 원칙

이 프로젝트의 Chat/Agent 세션은 아래 협업 규칙을 공통으로 적용한다. 사용자가 특정 지침을 **프로젝트 전체 세션에 적용**한다고 명시하면 현재 대화에만 묶어두지 않고 이 문서 또는 해당 규칙의 owning canonical 문서에 반영한다.

1. 작업은 검증 가능한 작은 단계로 나눈다. 한 번에 지나치게 많은 live 변경을 묶지 않고, 의미 있는 단계가 끝날 때 상태를 검증해 보고한 뒤 다음 단계로 진행한다.
2. 실제 사용자 선택이 필요한 분기점에서는 그 선택에 의존하는 변경을 진행하지 않고 멈춘다. 판단에 필요한 사실과 선택지를 제시하고 사용자 결정을 기다린다. 이미 확정된 규칙으로 결정할 수 있는 사안은 불필요하게 다시 묻지 않는다.
3. GitHub 관련 핵심 객체의 주소를 알고 있다면 답변에서 **처음 소개할 때 plain text 식별자만 쓰지 말고 클릭 가능한 링크로 제시한다.** 대상에는 repository, GitHub Project, Issue, Pull Request, branch, commit, workflow run/artifact 등 작업 이해에 직접 필요한 객체가 포함된다. 이후 같은 답변에서 문맥이 명확하면 짧은 이름이나 번호로 다시 언급할 수 있다.
4. 현재 작업 결과에 영향을 주지 않는 주변 metadata나 live field 검증은 본 작업의 blocker로 만들지 않는다. 필요하면 deferred verification으로 기록하고 핵심 작업을 계속한다.
5. 세션별 임시 상태는 `handoff/current.md`에 두되, 여러 세션에 지속 적용할 사용자 작업 방식·응답 방식은 volatile handoff가 아니라 durable context에 둔다.

## 사용할 요청 예시

> Content Authoring & Publishing Contract에 따라 이 Markdown/MDX 표현의 Editing, Storage, Publishing 수준을 판정하고 필요한 구현 delta를 나눠줘.

> Implementation Map의 기준 revision보다 구현 레포가 진행되었는지 확인하고, 1.0 capability 상태와 남은 delta를 갱신해줘.

> 공식 MDX component를 추가할 때 Site package contract, Engine authoring adapter, consumer build Evidence를 각각 어떤 Item/Issue로 나눌지 검토해줘.

> 이 설계 변경을 원본 문서에 반영하고, 영향받는 규칙과 미결 사항을 확인한 뒤 통합 문서를 다시 생성해줘.

세션을 종료하기 전에는 장기적으로 남아야 할 결정과 정책을 먼저 owning canonical 문서에 반영하고, 아직 진행 중인 live 상태와 다음 안전한 행동만 `handoff/current.md`에 남긴다. handoff는 매번 overwrite하며 과거 세션 로그를 누적하지 않는다. raw conversation transcript는 Knowledge에 복제하지 않고 provenance에는 source/turn metadata만 유지한다.

설계 정의 Item의 Evidence에는 canonical 문서의 immutable commit/permalink를 사용할 수 있다. 기능 구현·배포 Item은 구현 레포의 재현 가능한 Evidence가 별도로 필요하다. 파일을 수정할 수 없는 Chat은 변경할 **원본 파일 전체**를 제공하고, 통합본 수정이나 대화상 합의만으로 원본이 갱신되었다고 표현하지 않는다.
