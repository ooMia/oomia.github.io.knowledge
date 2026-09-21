# Context entry point

## 먼저 이해할 것

이 저장소는 Publishing Platform의 제품·아키텍처·계획 지식에 대한 canonical source다. 설계가 존재한다는 사실과 구현 완료를 구분한다.

콘텐츠 작업에서는 특히 다음 원칙을 먼저 적용한다.

- canonical content는 Git-backed local filesystem document workspace에 보존한다. publishable 문서는 Markdown/MDX + frontmatter/assets를 사용할 수 있고, docs layout은 free-form부터 strict convention까지 아직 열려 있다.
- local working tree는 authoring/draft state이며, 공유·재현 가능한 durable canonical revision은 `ooMia/oomia.github.io.docs` Git commit이다.
- authoring editor는 아직 확정하지 않는다. Obsidian을 primary candidate로, Fumadocs Editor를 component-aware candidate로 두고 동일 docs workspace + Site integration을 실제 corpus로 비교한다.
- Engine은 DB-backed CMS가 아니라 workspace validation / Git / publishing orchestration을 담당하는 stateless, invocation-driven CLI-first one-shot runtime을 목표로 한다.
- storage / visual editing / publishing / presentation 가능성을 동일시하지 않는다.
- Fumadocs UI/Core/MDX를 Site에서 우선 재사용하고, Fumadocs Editor는 custom-component authoring 이점이 실제로 필요한지 비교한다. Obsidian-native custom syntax bridge는 1.0 필수 고려사항이 아니다.
- JavaScript/TypeScript 구현에서는 [Development Toolchain](docs/development-toolchain.md)의 VP-first 정책과 [Repository Design](docs/repository-design.md)의 monorepo-ready/package-light 원칙을 적용한다.
- 실제 구현 수준은 [Implementation Map](docs/implementation-map.md)의 기준 revision과 책임 레포 Evidence로 판정한다.

현재 Engine/Site/Docs는 architecture migration 중이다. 해당 repository의 구현·리팩터링·Issue 재범위화 작업은 먼저 [Architecture Transition](docs/architecture-transition.md)을 읽는다. 확정 수준은 [Provenance](provenance/README.md), 남은 결정은 [Open Questions](docs/open-questions.md)을 따른다. 이전 작업을 이어받는 경우에는 [Architecture Transition](docs/architecture-transition.md) → [Current Handoff](handoff/current.md) 순으로 읽되, handoff는 volatile checkpoint이며 canonical policy가 아님을 전제로 한다.

## 작업별 읽기

| 작업 | 읽을 문서 |
|---|---|
| architecture migration 구현/이어받기 | [Architecture Transition](docs/architecture-transition.md) → [Current Handoff](handoff/current.md) → 필요한 canonical 문서와 live GitHub 상태 재검증 |
| 전체 이해 | [Architecture](docs/architecture.md), [Release 1.0](docs/release-1.0.md) |
| legacy → new target migration 판단 | [Architecture Transition](docs/architecture-transition.md), [Implementation Map](docs/implementation-map.md) |
| VP 명령·환경·CI·hooks 정책 | [Development Toolchain](docs/development-toolchain.md) |
| monorepo/package/repository 구조 | [Repository Design](docs/repository-design.md) |
| Markdown/MDX authoring·storage·publish 정책 | [Content Authoring & Publishing Contract](docs/content-authoring-contract.md) |
| custom MDX component profile/manifest | [Content Component Manifest Schema](docs/content-component-schema.md), [JSON Schema](schemas/content-component-manifest.schema.json) |
| 현재 1.0 구현 수준·migration gap | [Implementation Map](docs/implementation-map.md) → 기준 revision의 구현 레포 코드·테스트 |
| Item 작성·분류·완료 검토 | [Planning](docs/planning-model.md), [Fields](docs/fields.md), 관련 release, 실제 Item의 Outcome/AC/Evidence |
| Issue activation / Project field / Development branch 자동화 | [Project Orchestration](docs/project-orchestration.md), [Planning](docs/planning-model.md) |
| 구현 논의 | Architecture → 관련 contract → Implementation Map → 소유 레포의 최신 문서·코드·테스트 |
| 주간 계획·발표 | [Operating Rhythm](docs/operating-rhythm.md), 실제 Project Status Update, 실제 Evidence |
| 설계 수정 | 해당 원본 문서, [Decisions](docs/decisions.md), [CONTRIBUTING](CONTRIBUTING.md) |
| GitHub Project README 정리 | [Project README 템플릿](templates/project-readme.md) |
| 과거 발언 확인 | [Provenance](provenance/README.md)의 source/turn metadata → 필요 시 원본 대화 링크 |

## Agent 작업 원칙

Content 관련 구현을 계획하거나 수정할 때:

1. PostgreSQL/Payload 같은 특정 persistence/CMS 구현을 canonical content requirement로 확대하지 않는다.
2. content file과 frontmatter를 직접 다루는 Git-backed workspace contract를 우선한다.
3. Fumadocs Editor가 표현하지 못하는 syntax를 삭제/정규화해서 손실시키기보다 Obsidian/IDE Source path를 유지한다.
4. uncommitted working tree와 committed docs canonical revision을 구분한다.
5. publish는 DB export보다 validation / Git revision / Site consumer verification에 집중한다.
6. Fumadocs UI/Core/MDX는 Site에서 우선 재사용하되 Fumadocs Editor를 필수 authoring client로 가정하지 않는다. custom component authoring UX/DX가 editor 선택의 핵심 비교점이며 Obsidian-native custom syntax bridge는 1.0 범위 밖이다.
7. TypeScript type이나 editor spec만으로 Publishability가 증명된다고 가정하지 않는다. 최종 Site consumer 검증을 포함한다.
8. legacy Payload/PostgreSQL code의 성공 Evidence를 새 target architecture 완료로 해석하지 않는다.
9. migration 중에는 기존 코드를 `keep / adapt / retire`로 분류하고 새 vertical slice가 검증되기 전 big-bang delete를 하지 않는다. Engine은 D032에 따라 greenfield scratch build를 기본 전략으로 하고 Site는 별도 Evidence로 판단한다.
10. 과거 Issue/branch의 목표가 현재 Knowledge와 충돌하면 현재 canonical Knowledge를 target으로, 과거 구현을 migration input으로 취급한다.
11. JS/TS 작업은 VP-first command surface를 사용하고, `vp` built-in과 `vp run`/`vpr` task를 구분한다. 새 Engine에 Turbo/Husky 등 동등 역할 wrapper를 다시 추가하지 않는다.
12. Engine 1.0은 one-shot CLI adapter를 사용한다. core operation 안에 HTTP request/session/job lifecycle이나 CLI parsing/stdout/process-exit concerns를 섞지 않는다.

## 프로젝트 협업·응답 원칙

이 프로젝트의 Chat/Agent 세션은 아래 협업 규칙을 공통으로 적용한다. 사용자가 특정 지침을 **프로젝트 전체 세션에 적용**한다고 명시하면 현재 대화에만 묶어두지 않고 이 문서 또는 해당 규칙의 owning canonical 문서에 반영한다.

1. 작업은 검증 가능한 작은 단계로 나눈다. 한 번에 지나치게 많은 live 변경을 묶지 않고, 의미 있는 단계가 끝날 때 상태를 검증해 보고한 뒤 다음 단계로 진행한다.
2. 실제 사용자 선택이 필요한 분기점에서는 그 선택에 의존하는 변경을 진행하지 않고 멈춘다. 판단에 필요한 사실과 선택지를 제시하고 사용자 결정을 기다린다. 이미 확정된 규칙으로 결정할 수 있는 사안은 불필요하게 다시 묻지 않는다.
3. GitHub 관련 핵심 객체의 주소를 알고 있다면 답변에서 **처음 소개할 때 plain text 식별자만 쓰지 말고 클릭 가능한 링크로 제시한다.** 대상에는 repository, GitHub Project, Issue, Pull Request, branch, commit, workflow run/artifact 등 작업 이해에 직접 필요한 객체가 포함된다. 이후 같은 답변에서 문맥이 명확하면 짧은 이름이나 번호로 다시 언급할 수 있다.
4. 현재 작업 결과에 영향을 주지 않는 주변 metadata나 live field 검증은 본 작업의 blocker로 만들지 않는다. 필요하면 deferred verification으로 기록하고 핵심 작업을 계속한다.
5. 세션별 임시 상태는 `handoff/current.md`에 두되, 여러 세션에 지속 적용할 사용자 작업 방식·응답 방식은 volatile handoff가 아니라 durable context에 둔다.

## 사용할 요청 예시

> Git-backed Content Authoring Contract에 따라 이 Markdown/MDX 표현의 Editing, Storage, Publishing 수준을 판정하고 필요한 구현 delta를 나눠줘.

> Implementation Map 기준 revision보다 구현 레포가 진행되었는지 확인하고, filesystem workspace target에 대한 1.0 capability 상태를 갱신해줘.

> Fumadocs built-in으로 해결 가능한지 먼저 확인하고, custom component가 정말 필요할 때만 Engine editor spec과 Site renderer contract를 분리해줘.

> 이 설계 변경을 원본 문서에 반영하고, 영향받는 규칙과 미결 사항을 확인한 뒤 통합 문서를 다시 생성해줘.

세션을 종료하기 전에는 장기적으로 남아야 할 결정과 정책을 먼저 owning canonical 문서에 반영하고, 아직 진행 중인 live 상태와 다음 안전한 행동만 `handoff/current.md`에 남긴다. handoff는 매번 overwrite하며 과거 세션 로그를 누적하지 않는다. raw conversation transcript는 Knowledge에 복제하지 않고 provenance에는 source/turn metadata만 유지한다.

설계 정의 Item의 Evidence에는 canonical 문서의 immutable commit/permalink를 사용할 수 있다. 기능 구현·배포 Item은 구현 레포의 재현 가능한 Evidence가 별도로 필요하다.
