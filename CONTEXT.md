# Context entry point

> **Authority:** REFERENCE  
> **Owner:** task-to-source routing for Publishing Platform work  
> **Scope:** Knowledge, Project #11, and the Engine/Site/Docs owning repositories  
> **Read when:** a Chat/Agent task needs project context, canonical policy, implementation ownership, or live state  
> **Source of truth:** the routed canonical owner; live Project/Issue/PR/code/workflow state for current operational claims

Knowledge는 Publishing Platform의 **PM/coordination layer**이며, 이 문서는 Agent/Chat 작업의 canonical router다. 먼저 현재 작업 유형을 식별하고 필요한 최소 원본만 읽는다. 이 문서가 specialist policy를 다시 정의하지 않는다.

작업을 이어받을 때는 여기서 필요한 원본을 찾는다. 현재 실행 상태에 의존하는 판단이면 live GitHub Project #11과 관련 Issue/PR, owning repository의 code/workflow/Evidence를 조회해 상태를 복구한다. 세션별 handoff 문서를 별도 상태 원장으로 유지하지 않는다.

## 자주 하는 작업

| 작업 | 참조 순서 |
|---|---|
| 공통·로컬 정책의 적용 범위·강도·충돌 해석 | [Repository Design — Policy discovery and interpretation](docs/repository-design.md#policy--policy-discovery-and-interpretation) → 해당 semantic owner; 사용자 결정·진행 범위는 [Agent Conventions](docs/agent-conventions.md#policy-mismatch-and-recovery) |
| 정책 추가·수정·삭제 | [Repository Design — Policy changes](docs/repository-design.md#policy--policy-changes) → 실제 owner와 영향받는 consumer; Knowledge 문서이면 [Knowledge Maintenance](docs/maintenance.md) |
| Agent/Chat approval·resume·tool failure·capability fallback·remote-state operation | [Agent Conventions](docs/agent-conventions.md) → 필요한 canonical/live owner |
| 새 기능·의미 있는 동작 변경 | [Feature Change Protocol](docs/change-protocol.md) → 해당 owner의 contract/code → 필요한 경우 live Project/Issue lifecycle |
| Issue 생성·수정·활성화 | [lifecycle·completion](docs/planning-model.md) → owning repository가 제공하는 `.github/ISSUE_TEMPLATE/`이 있으면 그 local authoring surface 적용 → [Work Type·Labels](docs/work-classification.md) → [activation·materialization](docs/project-orchestration.md) |
| 작업 branch 시작 | [Git Workflow](docs/git-workflow.md) → [Development relation](docs/project-orchestration.md#development-signals) → 해당 Issue와 owning repository 운영 |
| Issue 구현 시작·첫 integration slice | [Implementation Practices](docs/implementation-practices.md) → owning repository contract/code/tests; branch/PR 경계가 필요하면 [Git Workflow](docs/git-workflow.md) |
| PR 작성·검토·통합 | [Git Workflow](docs/git-workflow.md) → [완료·Evidence](docs/planning-model.md#completion-and-evidence) → 해당 Issue 및 구현 레포의 검증 방법 |
| major/minor release | [Release lifecycle](docs/planning-model.md#release-lifecycle) → live Project #11 roadmap → 해당 version-scoped release document → [Git Workflow](docs/git-workflow.md) |
| 새 레포 scaffolding·디렉토리 역할 | [Repository Design](docs/repository-design.md) → Node/JS/TS 또는 Python이면 [Development Toolchain](docs/development-toolchain.md) |
| 기술 설계·구현 조사 | 아래 레포별 참조 → 해당 레포 `/docs/`와 code·Issue·tests |
| Knowledge 문서 수정 | [Knowledge Maintenance](docs/maintenance.md) → 해당 semantic owner |
| 계획·분류·완료 검토 | [Work Classification](docs/work-classification.md) → [Planning](docs/planning-model.md) → [Fields](docs/fields.md) → 실제 Item의 Outcome/AC/Evidence |
| 기록·발표·주간 회고 | live Project #11 Status Update → owning Issue/PR/commit/workflow/deployment Evidence |
| 제품/cross-repository 미결 사항 | live Project #11 → [Planning](docs/planning-model.md)의 readiness/completion 의미에 따라 Draft Item / Investigation / Change |

## 레포별 원본 참조

| 대상 | 현재 확인 가능한 참조 |
|---|---|
| Engine | [README](https://github.com/ooMia/oomia.github.io.engine/blob/main/README.md), [수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/content-modification-contract.md), [Issues](https://github.com/ooMia/oomia.github.io.engine/issues) |
| Site | [README](https://github.com/ooMia/oomia.github.io/blob/main/README.md), [소비 계약](https://github.com/ooMia/oomia.github.io/blob/main/docs/content-consumption-contract.md), [Issues](https://github.com/ooMia/oomia.github.io/issues) |
| Docs 콘텐츠 remote | [Repository](https://github.com/ooMia/oomia.github.io.docs) |

각 repository에서 작업할 때는 그 repository의 `AGENTS.md`와 README를 통해 필요한 local owner를 찾는다. 수정·소비 계약은 각각 owning repository가 소유한다. current implementation은 owner code/docs에서 확인한다. 완료된 1.0의 historical integration Evidence만 [Publishing Platform 1.0](docs/release-1.0.md) RECORD의 pinned scope를 사용한다.

## PM-level 원본

- [Architecture](docs/architecture.md): repository 역할과 제품 경계
- [Feature Change Protocol](docs/change-protocol.md): 새 기능·의미 있는 동작 변경의 ownership·contract·side-effect routing
- [Architecture Transition](docs/architecture-transition.md): 완료된 DB-backed CMS → Git-backed workspace 전환의 historical provenance
- [Release 1.0](docs/release-1.0.md): 완료된 1.0 목표·수용 기준·immutable Evidence archive

component 종류, editor 구현, parser/schema 세부사항, package API, adapter shape 같은 구현 정보는 Knowledge에 복제하지 않는다. 실제 code/package가 계약을 충분히 설명하면 별도의 Knowledge 원본을 만들지 않는다.

## 문서 사용

Repository source에 직접 접근할 수 있으면 이 routing을 따라 canonical owner를 직접 읽는다. 공통 문서 Authority와 정책 해석은 [Repository Design](docs/repository-design.md#policy--document-authority), Knowledge 문서 작성·구조와 generated bundle 규칙은 [Knowledge Maintenance](docs/maintenance.md)가 소유한다.

`dist/CONTEXT-BUNDLE.md`를 사용하는 환경에서도 embedded `CONTEXT.md`를 router로 사용하고 필요한 source section만 읽는다. bundle은 canonical source나 live Project/Issue/PR state를 대체하지 않는다.
