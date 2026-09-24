# Context entry point

Knowledge는 Chat/Agent의 공통 workflow·coordination·개발 기준과 작업별 원본 참조 경로를 제공한다. 정보 소유권과 공통 디렉토리 역할은 [Repository Design](docs/repository-design.md)이 정의한다. 기술 설계는 구현되는 레포의 `/docs/`에서 관리하고 여기서는 링크로 참조한다.

이전 작업을 이어받을 때는 [Current Handoff](handoff/current.md)를 먼저 읽는다. handoff는 현재 checkpoint이며 정책이나 최신 구현 완료의 증거가 아니다.

## 자주 하는 작업

| 작업 | 참조 순서 |
|---|---|
| Issue 생성·수정·활성화 | [Issue 형식](templates/repository-issue.md) → [lifecycle·DoD](docs/planning-model.md) → 필요한 [Fields](docs/fields.md) / [Labels](docs/labels.md) → [activation·Project seed](docs/project-orchestration.md) |
| 작업 branch 시작 | [Git Workflow](docs/git-workflow.md) → [Issue-linked branch](docs/project-orchestration.md#development-branch-naming) → 해당 Issue |
| PR 작성·검토·통합 | [Git Workflow](docs/git-workflow.md) → [완료·Evidence](docs/planning-model.md#완료-판정) → 해당 Issue 및 구현 레포의 검증 방법 |
| major/minor release | [Git Workflow](docs/git-workflow.md) → [통합 목표](docs/release-1.0.md) → [검수 연결](docs/implementation-map.md) |
| 새 레포 scaffolding·디렉토리 역할 | [Repository Design](docs/repository-design.md) → JS/TS이면 [Development Toolchain](docs/development-toolchain.md) |
| 기술 설계·구현 조사 | 아래 레포별 참조 → 해당 레포 `/docs/`와 Issue·코드·테스트 |
| Knowledge 문서 수정 | [소유권](docs/repository-design.md#11-repository-documentation) → 해당 원본 → [CONTRIBUTING](CONTRIBUTING.md) |
| 계획·분류·완료 검토 | [Planning](docs/planning-model.md) → [Fields](docs/fields.md) → 실제 Item의 Outcome/AC/Evidence |
| 기록·발표·주간 회고 | [Operating Rhythm](docs/operating-rhythm.md) → 실제 Project Status Update·Evidence |
| Project README 정리 | [Project README 형식](templates/project-readme.md) |
| 미결 소유권·이관 판단 | [Open Questions](docs/open-questions.md#문서-소유권-검토) |

## 레포별 원본 참조

| 대상 | 현재 확인 가능한 참조 |
|---|---|
| Engine | [README](https://github.com/ooMia/oomia.github.io.engine/blob/main/README.md), [수정 계약 — 이관 PR](https://github.com/ooMia/oomia.github.io.engine/blob/docs/content-modification-contract/docs/content-modification-contract.md), [docs](https://github.com/ooMia/oomia.github.io.engine/tree/main/docs), [Issues](https://github.com/ooMia/oomia.github.io.engine/issues) |
| Site | [README](https://github.com/ooMia/oomia.github.io/blob/main/README.md), [소비 계약 — 이관 PR](https://github.com/ooMia/oomia.github.io/blob/docs/content-consumption-contract/docs/content-consumption-contract.md), [Issues](https://github.com/ooMia/oomia.github.io/issues) |
| Docs 콘텐츠 remote | [Repository](https://github.com/ooMia/oomia.github.io.docs); 현재 Issue 작업 대상은 [Orchestration 적용 범위](docs/project-orchestration.md#적용-범위) 참고 |

수정·소비 계약 링크는 각각 문서 이관 branch의 원본이다. PR 통합 전이며, 아직 main에서 사용할 수 있는 것으로 보고하지 않는다. 남은 editor·projection 설계는 아래 기존 문서에서 검토한다.

## 이관 전 기존 문서

아래 문서는 삭제·이관 전 검토를 위해 유지한다. 목록에 있다는 사실은 Knowledge의 영구 소유권을 뜻하지 않는다. 규칙 변경은 소유권을 확인한 뒤 원본 한 곳에 반영한다.

| 조사 대상 | 기존 참조 |
|---|---|
| 레포 관계·콘텐츠 흐름 | [Architecture](docs/architecture.md) |
| 기존 architecture 전환·legacy 보존 | [Architecture Transition](docs/architecture-transition.md) |
| 편집·파일 수정·발행 계약 | [Content Authoring Contract](docs/content-authoring-contract.md) |
| metadata·projection | [Publishable Projection](docs/publishable-projection.md) |
| 보류된 component 계약 | [Component Schema](docs/content-component-schema.md), [JSON Schema](schemas/content-component-manifest.schema.json) |
| 결정 탐색 | [Current Decisions](docs/decisions.md) |

설계가 있다는 사실과 구현 완료를 구분한다. Implementation Map의 Evidence는 기록된 revision에만 해당하며, 현재 구현은 책임 레포에서 확인한다. 과거 상세 history는 `archive/main-before-cleanup-20260921`에서 필요할 때만 조사한다.

## 프로젝트 협업·응답 원칙

이 프로젝트의 Chat/Agent 세션은 아래 협업 규칙을 공통으로 적용한다. 사용자가 특정 지침을 **프로젝트 전체 세션에 적용**한다고 명시하면 현재 대화에만 묶어두지 않고 이 문서 또는 해당 규칙의 owning canonical 문서에 반영한다.

1. 작업은 검증 가능한 작은 단계로 나눈다. 한 번에 지나치게 많은 live 변경을 묶지 않고, 의미 있는 단계가 끝날 때 상태를 검증해 보고한 뒤 다음 단계로 진행한다.
2. 실제 사용자 선택이 필요한 분기점에서는 그 선택에 의존하는 변경을 진행하지 않고 멈춘다. 판단에 필요한 사실과 선택지를 제시하고 사용자 결정을 기다린다. 이미 확정된 정책을 문서에 반영하는 편집·참조 정리·검증은 주도적으로 수행한다. 새로운 정책 선택이나 불확실한 소유권 판단만 질문하며, 그 답변과 독립적인 작업은 계속한다.
3. GitHub 관련 핵심 객체의 주소를 알고 있다면 답변에서 **처음 소개할 때 plain text 식별자만 쓰지 말고 클릭 가능한 링크로 제시한다.** 대상에는 repository, GitHub Project, Issue, Pull Request, branch, commit, workflow run/artifact 등 작업 이해에 직접 필요한 객체가 포함된다. 이후 같은 답변에서 문맥이 명확하면 짧은 이름이나 번호로 다시 언급할 수 있다.
4. 현재 작업 결과에 영향을 주지 않는 주변 metadata나 live field 검증은 본 작업의 blocker로 만들지 않는다. 필요하면 deferred verification으로 기록하고 핵심 작업을 계속한다.
5. 세션별 임시 상태는 `handoff/current.md`에 두되, 여러 세션에 지속 적용할 사용자 작업 방식·응답 방식은 volatile handoff가 아니라 durable context에 둔다.

## 문서 사용

원본 문서를 수정하고 `python3 scripts/bundle.py`로 Chat 첨부물을 재생성한다. 생성된 `dist/CONTEXT-BUNDLE.md`를 직접 수정하지 않는다. 지속할 규칙은 소유 문서에, 현재 작업 상태와 다음 행동은 handoff에 둔다.
