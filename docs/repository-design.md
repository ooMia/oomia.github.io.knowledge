# Repository Design

> **Authority:** POLICY  
> **Owner:** cross-repository path semantics, repository/document ownership, policy interpretation and change coordination, and source/generated-state boundaries  
> **Scope:** Publishing Platform repository structure, canonical policy ownership, and policy discovery/change  
> **Read when:** choosing repository structure, finding or interpreting policy, or adding/changing/removing a canonical rule  
> **Enforced by:** repository review and owning repository code/config; exact framework/package layout remains repository-local

이 문서는 repository마다 같은 경로 이름이 서로 다른 의미를 갖거나, 같은 concern의 owner가 여러 위치로 분산되는 것을 방지한다. 정책을 발견·해석·변경할 때도 같은 ownership 경계를 사용한다. 구조 선택에 대한 best practice는 같은 reference unit에서 **GUIDANCE**로 구분한다.

## POLICY — Common repository scheme

경로를 사용한다면 다음 의미를 유지한다. 모든 repository가 모든 경로를 만들 필요는 없다.

| Path | Shared meaning |
|---|---|
| `docs/` | 해당 repository가 소유하는 설계·계약·reference 문서 |
| `apps/` | 독립적으로 실행·배포되는 program/runtime entrypoint |
| `packages/` | 실제 재사용·dependency/API boundary를 가진 library |
| `tools/` | product runtime 밖의 repository development tool/generator |
| `scripts/` | repository operation을 실행하는 작은 script entrypoint |
| `templates/` | 반복 생성하는 문서·artifact의 입력 형상 |
| `schemas/` | 해당 repository가 소유하는 machine-readable contract |
| `config/` | 해당 repository가 소유하는 declarative setting/registry |
| `tests/` | owning code/contract의 verification 및 fixture; app/package 내부에도 같은 의미 |
| `.github/` | GitHub automation과 GitHub-specific configuration |
| `.vite-hooks/` | repository-owned Vite+ Git hook |
| `dist/` | source에서 재생성되는 build/delivery/generated artifact |

- 같은 path를 repository마다 다른 semantic role로 재정의하지 않는다.
- 새 cross-repository common path가 필요하면 이 POLICY에서 의미를 먼저 정의한다.
- framework-required subdirectory와 실제 package composition은 owning repository가 소유한다.
- `ooMia/oomia.github.io.docs`라는 repository 이름과 각 repository의 `docs/` path는 별개다. content repository라는 이유로 `docs/` 의미를 canonical article tree로 바꾸지 않는다.
- `.github/ISSUE_TEMPLATE/`을 사용하는 repository는 실제 template 파일, frontmatter, marker, section wording과 ordering을 **그 repository의 구현 책임**으로 소유한다.
- cross-repository requirement는 특정 template 파일 형상이 아니라 [Planning Model](planning-model.md)의 Issue completion semantics다. 다른 repository의 template을 scaffold 시작점으로 복사할 수 있지만 materialize된 뒤에는 destination repository가 그 파일을 소유한다.
- repository-local contract가 별도로 요구하지 않는 한 `.github/ISSUE_TEMPLATE/`의 부재 자체를 project-wide policy violation으로 해석하지 않는다.

## POLICY — Ownership boundaries

- Knowledge의 `docs/`는 project-wide coordination/policy/reference를, implementation repository의 `docs/`는 해당 implementation이 소유하는 technical contract/reference를 둔다.
- 여러 repository가 같은 technical semantics를 소비해도 계약 전체를 자동으로 Knowledge가 소유하지 않는다. 실제 semantic owner를 하나 정하고 다른 repository는 그 원본을 참조한다.
- 같은 concern의 configuration source를 여러 위치에 복제하지 않는다. repository-wide shared config, framework/runtime config, CI, repository-local exception은 각각 명시적인 owner를 갖는다.
- generated/local/runtime state를 canonical source와 혼동하지 않는다. `dist/`, caches, temporary workspace, container state, credentials 같은 값은 source-of-truth가 아니다.
- canonical content는 Engine repository의 generated output이 아니라 external/shared Docs workspace와 its Git revision이 소유한다.
- repository-specific runtime, command, branch topology, tool version, framework API는 owning repository가 소유한다.

작업별 canonical source routing은 [CONTEXT](../CONTEXT.md), toolchain defaults는 [Development Toolchain](development-toolchain.md), integration rules는 [Git Workflow](git-workflow.md)이 소유한다.

## POLICY — Document authority

문서의 Authority는 내용을 어떤 강도로 해석하는지 나타낸다. 파일 위치나 이름만으로 적용 범위와 우선순위를 정하지 않는다.

| Authority | 의미 |
|---|---|
| `POLICY` | project/repository가 해당 Scope에서 준수해야 하는 invariant, contract, normative meaning |
| `GUIDANCE` | 공통적으로 적용되는 default, best practice, caution, heuristic; 구체적 이유가 있으면 일탈할 수 있음 |
| `REFERENCE` | 사용법, 현재 interface, 상세 설명, lookup material; 독립적인 normative force를 만들지 않음 |
| `RECORD` | revision-scoped Evidence, historical provenance, completed migration/release snapshot; 현재 정책을 정의하지 않음 |

Machine-readable schema, workflow/action/test, code/config, live GitHub Project/Issue/PR state는 prose Authority와 별개의 operational source다. 문서는 이들을 설명하거나 연결할 수 있지만 실제 live state나 executable behavior를 대신하지 않는다.

Knowledge 문서의 header·작성 형식·renewal과 generated bundle은 [Knowledge Maintenance](maintenance.md)가 소유한다. 해당 repository-local 형식을 다른 repository의 필수 문서 형식으로 확대하지 않는다.

## POLICY — Policy discovery and interpretation

- repository-local Agent 지침은 [Knowledge CONTEXT](../CONTEXT.md)와 해당 repository의 local 원본으로 연결한다. 공통 specialist policy나 변하기 쉬운 기능·작업 상태를 진입점에 복제하지 않는다.
- 작업에 필요한 규칙은 Authority, 적용 Scope와 semantic owner를 함께 확인한다. Knowledge의 공통 `POLICY`가 정한 경계 안에서 owning repository가 local contract와 구현 방법을 구체화한다.
- local 구체화는 공통 `POLICY`와 모순되는 규칙을 암묵적으로 허용하지 않는다. 반대로 공통 문서의 존재만으로 repository-local 구현 재량이나 `GUIDANCE`를 의무로 바꾸지 않는다.
- `GUIDANCE`에서 벗어나는 선택에 별도 예외 승인을 요구하지 않는다. 이유와 영향이 작업 판단에 중요하면 기존 Issue·PR 등에서 설명한다.
- 코드와 계약이 다르면 현재 동작과 의도된 동작의 불일치로 구분한다. 구현의 존재나 배포 사실 자체를 정책 변경의 승인 근거로 해석하지 않는다.
- 과거 `RECORD`, 미병합 제안, generated bundle이나 배포 사본의 설명은 현재 canonical policy와 구분한다. 현재 상태에 의존하는 판단에는 해당 owning source와 필요한 live state를 확인한다.
- 같은 Scope의 `POLICY`가 충돌하거나 적용 의미가 불명확하면 현재 원본과 승인된 변경 범위를 확인한다. 그 뒤에도 남는 사용자 결정과 진행 가능한 범위를 나누는 행동은 [Agent Conventions](agent-conventions.md#policy-mismatch-and-recovery)을 따른다.

## POLICY — Policy changes

정책을 추가·수정·삭제할 때는 원본 문장뿐 아니라 영향을 받는 consumer와 참조까지 같은 변경 범위로 검토한다.

1. **변경 의미와 승인 범위:** 설명·링크·중복 정리인지 의무·계약·소유권이 달라지는 변경인지 구분한다. 검토 요청이나 Agent 제안을 확정 정책으로 승격하지 않는다. 이미 승인된 범위는 진행하며, 기존 정책과 승인으로 결정할 수 없는 의미 있는 선택만 [Agent Conventions](agent-conventions.md#decision-boundary)에 따라 확인한다.
2. **원본과 영향:** 실제 semantic owner를 수정한다. 영향을 받는 참조 문서와 소비하는 contract/schema/code/config/test/automation을 필요한 범위에서 찾는다. 여러 repository가 관련된다는 이유만으로 기술 계약을 Knowledge로 옮기거나 복제하지 않는다.
3. **적용과 전환:** owner와 영향을 받는 consumer를 맞춘다. 동시에 적용할 수 없으면 적용 범위·전환 조건·남은 작업을 기존 Issue·PR 등 owning work에 명시하고 완료된 범위를 구분한다.
4. **폐기와 생성물:** 더 이상 현재 규칙이 아닌 문장·중복·진입 링크를 정리하고, 영향을 받는 generated artifact는 해당 owner의 생성 절차로 갱신한다. 필요한 과거 근거는 Git history와 revision이 고정된 Evidence로 찾을 수 있게 한다. 삭제된 정책을 다른 문서에서 계속 현재 규칙으로 안내하지 않는다.
5. **검증:** 변경에 맞는 문서·링크·생성물 검증과 영향을 받은 동작 검증을 구분한다. 설명 정리만으로 runtime 검증이나 모든 repository 조사를 요구하지 않는다. 완료·Evidence의 의미는 [Planning Model](planning-model.md#completion-and-evidence)을 따른다.

이 절차는 별도 정책 목록·결정 원장이나 일괄 형식 변경을 요구하지 않는다. canonical owner, 기존 Issue·PR와 Git history의 역할을 유지한다.

## GUIDANCE — Package and directory boundaries

새 boundary는 미리 추측하기보다 실제 responsibility/dependency가 생겼을 때 만든다.

### Apps, packages, and tools

`apps/*`가 적합한 신호:

- 독립적으로 실행하거나 배포할 수 있다.
- process/container/UI/CLI 같은 runtime entrypoint가 있다.
- 다른 app과 lifecycle이 분리된다.

`packages/*`가 적합한 신호:

- 둘 이상의 실제 consumer가 있다.
- 독립 dependency/API boundary가 중요하다.
- 별도 unit contract로 검증하는 편이 명확하다.
- artifact로 pack/publish할 실제 가능성이 있다.
- execution context를 분리할 필요가 있다.

`tools/*`는 product runtime 밖의 generator, migration helper, fixture/evidence utility, local diagnostic 등에 적합하다.

파일 수가 많아졌다는 이유만으로 package를 만들지 않는다.

### Package-light by default

workspace 사용 자체와 package proliferation을 구분한다. 처음부터 `core`, `utils`, `infra`, `shared` 같은 추상 경계를 예측해 만들기보다 실제 consumer/contract가 생길 때 capability 기반 이름을 부여한다.

catch-all 이름 자체가 금지되는 것은 아니지만 “어떤 dependency boundary를 소유하는가?”에 명확히 답할 수 있어야 한다.

### Dependency direction and versions

- dependency는 consumer → provider 관계가 source/config에서 명시적으로 드러나게 한다.
- task ordering을 표현하려고 가상의 dependency graph를 만들지 않는다.
- cycle이 생기면 task-runner 설정으로 숨기기보다 boundary를 재검토한다.
- 여러 package가 동일 compatibility policy를 실제로 공유하면 version constraint를 한 곳에서 관리하는 편을 우선한다.
- 한 consumer만 사용하는 dependency까지 공통 registry로 끌어올리지 않는다.

exact package-manager/catelog/lockfile 방식은 [Development Toolchain](development-toolchain.md)과 owning repository config가 소유한다.

### Root responsibility

workspace root는 orchestration/configuration boundary로 두고 product business logic의 기본 owner로 사용하지 않는 편을 권장한다.

적절한 root concern은 workspace metadata, shared compiler/tool config, repository-wide tasks, package-manager policy, CI/hook integration 등이다.

### Co-location and execution context

코드는 소비 책임과 가까이 둔다. 작은 package에 layer directory를 미리 만들기보다 책임이 실제로 분리될 때 이름을 부여한다.

directory/package 분리를 고려할 신호:

- host filesystem / Git capability
- container/process runtime
- pure validation/domain logic
- child process execution
- browser/editor integration
- Site verification adapter처럼 실행 권한·환경이 다른 context

기술 패턴 이름보다 “어디에서 실행되고 어떤 capability를 허용하는가?”를 우선한다.

### Tests

test는 가능한 한 owning code/contract와 가까이 둔다.

- unit/package integration → owning app/package
- cross-repository/system integration → 명확한 integration/e2e owner
- fixture → 해당 test owner와 가까운 위치

root `tests/` 하나에 모든 레벨의 test를 모으거나 실제 content corpus와 regression fixture의 역할을 섞지 않는 편을 권장한다.

## GUIDANCE — Boundary checklist

새 directory/package를 만들기 전에 확인한다.

1. 독립 runtime인가?
2. 둘 이상의 실제 consumer가 있는가?
3. dependency/API boundary가 필요한가?
4. 별도 test/build/release lifecycle이 있는가?
5. 기존 owner 안에 두면 실제 문제가 생기는가?

대부분 아니면 새 package가 문제를 줄이기보다 새 owner를 늘릴 가능성이 높다.

새 tool 선택은 [Development Toolchain](development-toolchain.md)이 소유한다. implementation 시작 방식과 green scaffold는 [Implementation Practices](implementation-practices.md)가 별도 reference unit으로 소유한다.

## Composition

이 문서는 **repository structure와 canonical policy ownership/해석/변경** 판단의 reference unit이다. 필요한 section부터 읽는다.

- Knowledge 전용 문서 형식·bootstrap guard·bundle materialization은 [Knowledge Maintenance](maintenance.md)를 읽는다.
- 정책 불일치에서의 사용자 결정·진행 범위는 [Agent Conventions](agent-conventions.md#policy-mismatch-and-recovery)를 읽는다.
- toolchain 선택만 필요하면 [Development Toolchain](development-toolchain.md)을 직접 읽는다.
- 이미 구조가 정해진 Issue 구현을 시작할 때는 [Implementation Practices](implementation-practices.md)를 직접 읽는다.
- branch/PR/release integration은 [Git Workflow](git-workflow.md)을 직접 읽는다.
- technical API/runtime contract는 owning repository docs/code를 읽는다.

서로 독립적으로 참조되는 concern을 이 문서에 단순히 “engineering”이라는 이유로 합치지 않는다.
