# Context entry point

## 먼저 이해할 것

이 저장소는 Publishing Platform의 제품·아키텍처·계획 지식에 대한 canonical source다. 설계가 존재한다는 사실과 구현 완료를 구분한다.

콘텐츠 작업에서는 특히 다음 원칙을 먼저 적용한다.

- canonical Article source는 CMS/Visual Editor와 독립적으로 보존한다.
- storage / visual editing / publishing 가능성을 동일시하지 않는다.
- 공식 MDX component는 versioned public content-component contract를 공유하고 CMS는 authoring adapter, Site는 rendering consumer로 취급한다.
- 실제 구현 수준은 [Implementation Map](docs/implementation-map.md)의 기준 revision과 책임 레포 Evidence로 판정한다.

확정 수준은 [Provenance](provenance/README.md), 남은 결정은 [Open Questions](docs/open-questions.md)을 따른다.

## 작업별 읽기

| 작업 | 읽을 문서 |
|---|---|
| 전체 이해 | [Architecture](docs/architecture.md), [Release 1.0](docs/release-1.0.md) |
| Markdown/MDX authoring·storage·publish 정책 | [Content Authoring & Publishing Contract](docs/content-authoring-contract.md) |
| MDX component package / Agent-readable manifest | [Content Component Manifest Schema](docs/content-component-schema.md), [JSON Schema](schemas/content-component-manifest.schema.json) |
| 현재 1.0 구현 수준·gap | [Implementation Map](docs/implementation-map.md) → 기준 revision의 구현 레포 코드·테스트 |
| Item 작성·분류·완료 검토 | [Planning](docs/planning-model.md), [Fields](docs/fields.md), 관련 release, 실제 Item의 Outcome/AC/Evidence |
| 구현 논의 | Architecture → 관련 contract → Implementation Map → 소유 레포의 최신 문서·코드·테스트 |
| 주간 계획·발표 | [Operating Rhythm](docs/operating-rhythm.md), 실제 Project Status Update, 실제 Evidence |
| 설계 수정 | 해당 원본 문서, [Decisions](docs/decisions.md), [CONTRIBUTING](CONTRIBUTING.md) |
| GitHub Project README 정리 | [Project README 템플릿](templates/project-readme.md) |
| 과거 발언 확인 | provenance/README.md의 source/turn → provenance/conversations.json |

## Agent 작업 원칙

Content 관련 구현을 계획하거나 수정할 때:

1. CMS editor capability를 canonical syntax requirement로 확대하지 않는다.
2. unsupported Visual syntax를 삭제/정규화해서 손실시키기보다 Source fallback을 우선한다.
3. 저장 가능성과 publishability를 분리한다.
4. 공식 MDX component 변경은 Site가 소유하는 shared component contract의 영향부터 확인한다.
5. TypeScript type만으로 runtime contract가 충분하다고 가정하지 않는다. 필요한 경우 component manifest/schema를 사용한다.
6. 최종 Publishability는 실제 Site consumer 검증을 포함해 판단한다.

## 사용할 요청 예시

> Content Authoring & Publishing Contract에 따라 이 Markdown/MDX 표현의 Editing, Storage, Publishing 수준을 판정하고 필요한 구현 delta를 나눠줘.

> Implementation Map의 기준 revision보다 구현 레포가 진행되었는지 확인하고, 1.0 capability 상태와 남은 delta를 갱신해줘.

> 공식 MDX component를 추가할 때 Site package contract, Engine authoring adapter, consumer build Evidence를 각각 어떤 Item/Issue로 나눌지 검토해줘.

> 이 설계 변경을 원본 문서에 반영하고, 영향받는 규칙과 미결 사항을 확인한 뒤 통합 문서를 다시 생성해줘.

설계 정의 Item의 Evidence에는 canonical 문서의 immutable commit/permalink를 사용할 수 있다. 기능 구현·배포 Item은 구현 레포의 재현 가능한 Evidence가 별도로 필요하다. 파일을 수정할 수 없는 Chat은 변경할 **원본 파일 전체**를 제공하고, 통합본 수정이나 대화상 합의만으로 원본이 갱신되었다고 표현하지 않는다.
