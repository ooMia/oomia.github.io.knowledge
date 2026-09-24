# Context entry point

Knowledge는 Publishing Platform의 **PM/coordination layer**다. 공통 workflow·개발 기준·통합 목표·수용 기준·검수 연결을 관리하고, 구현 상세는 책임 repository의 문서와 코드가 소유한다.

이전 작업을 이어받을 때는 [Current Handoff](handoff/current.md)를 먼저 읽는다. handoff는 현재 checkpoint이며 정책이나 최신 구현 완료의 증거가 아니다.

## 자주 하는 작업

| 작업 | 참조 순서 |
|---|---|
| Issue 생성·수정·활성화 | [Issue 형식](templates/repository-issue.md) → [lifecycle·DoD](docs/planning-model.md) → 필요한 [Fields](docs/fields.md) / [Labels](docs/labels.md) → [activation·Project seed](docs/project-orchestration.md) |
| 작업 branch 시작 | [Git Workflow](docs/git-workflow.md) → [Issue-linked branch](docs/project-orchestration.md#development-branch-naming) → 해당 Issue |
| PR 작성·검토·통합 | [Git Workflow](docs/git-workflow.md) → [완료·Evidence](docs/planning-model.md#완료-판정) → 해당 Issue 및 구현 레포의 검증 방법 |
| major/minor release | [Git Workflow](docs/git-workflow.md) → [통합 목표](docs/release-1.0.md) → [검수 연결](docs/implementation-map.md) |
| 새 레포 scaffolding·디렉토리 역할 | [Repository Design](docs/repository-design.md) → JS/TS이면 [Development Toolchain](docs/development-toolchain.md) |
| 기술 설계·구현 조사 | 아래 레포별 참조 → 해당 레포 `/docs/`와 코드·Issue·tests |
| Knowledge 문서 수정 | [소유권](docs/repository-design.md#11-repository-documentation) → 해당 원본 → [CONTRIBUTING](CONTRIBUTING.md) |
| 계획·분류·완료 검토 | [Planning](docs/planning-model.md) → [Fields](docs/fields.md) → 실제 Item의 Outcome/AC/Evidence |
| 기록·발표·주간 회고 | [Operating Rhythm](docs/operating-rhythm.md) → 실제 Project Status Update·Evidence |
| 제품/cross-repository 미결 사항 | [Open Questions](docs/open-questions.md) |

## 레포별 원본 참조

| 대상 | 현재 확인 가능한 참조 |
|---|---|
| Engine | [README](https://github.com/ooMia/oomia.github.io.engine/blob/main/README.md), [수정 계약 — 이관 PR](https://github.com/ooMia/oomia.github.io.engine/blob/develop/docs/content-modification-contract.md), [Issues](https://github.com/ooMia/oomia.github.io.engine/issues) |
| Site | [README](https://github.com/ooMia/oomia.github.io/blob/main/README.md), [소비 계약 — 이관 PR](https://github.com/ooMia/oomia.github.io/blob/develop/docs/content-consumption-contract.md), [Issues](https://github.com/ooMia/oomia.github.io/issues) |
| Docs 콘텐츠 remote | [Repository](https://github.com/ooMia/oomia.github.io.docs) |

수정·소비 계약 링크는 현재 이관 branch를 가리킨다. PR 통합 전이며 아직 main 적용 완료로 보고하지 않는다.

## PM-level 원본

- [Architecture](docs/architecture.md): repository 역할과 제품 경계
- [Architecture Transition](docs/architecture-transition.md): cross-repository 전환 순서·안전 규칙
- [Release 1.0](docs/release-1.0.md): 통합 목표·수용 기준
- [Implementation Map](docs/implementation-map.md): revision-bound Evidence와 통합 검수 연결
- [Current Decisions](docs/decisions.md): 원본 탐색 인덱스
- [Open Questions](docs/open-questions.md): 아직 실제 제품/coordination 결정이 필요한 항목

component 종류, editor 구현, parser/schema 세부사항, package API, adapter shape 같은 구현 정보는 Knowledge에 복제하지 않는다. 실제 code/package가 계약을 충분히 설명하면 별도의 Knowledge 문서를 만들지 않는다.

설계가 있다는 사실과 구현 완료를 구분한다. Implementation Map의 Evidence는 기록된 revision에만 해당하며 현재 구현은 책임 레포에서 확인한다. 과거 상세 history는 `archive/main-before-cleanup-20260921`에서 필요할 때만 조사한다.

## 프로젝트 협업·응답 원칙

1. 작업은 검증 가능한 작은 단계로 나눈다.
2. 이미 확정된 정책의 문서 반영·참조 정리·검증은 주도적으로 수행한다. 새로운 제품 정책 선택이나 실제 cross-repository ownership이 불확실한 경우만 질문한다.
3. GitHub 관련 핵심 객체의 주소를 알고 있다면 처음 소개할 때 클릭 가능한 링크로 제시한다.
4. 현재 작업 결과에 영향을 주지 않는 주변 metadata나 live field 검증은 blocker로 만들지 않는다.
5. 세션별 임시 상태는 `handoff/current.md`에 두고, 지속할 규칙은 owning canonical source에 둔다.

## 문서 사용

원본 문서를 수정하고 `python3 scripts/bundle.py`로 Chat 첨부물을 재생성한다. 생성된 `dist/CONTEXT-BUNDLE.md`를 직접 수정하지 않는다.
