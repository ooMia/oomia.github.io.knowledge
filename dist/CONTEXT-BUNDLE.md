# Publishing Platform — Chat Context Bundle

GENERATED FILE — 원본은 각 문서 경계에 적힌 경로입니다. 직접 수정하지 마세요.
Implementation Map은 문서에 적힌 repository revision의 검증 스냅샷이며 live Project 상태가 아닙니다.
상대 링크는 원본 레포 기준입니다. 과거 변경 근거는 Git history와 연결된 immutable Evidence에서 추적합니다.


---

<!-- BEGIN SOURCE: CONTEXT.md -->

# Context entry point

Knowledge는 Publishing Platform의 **PM/coordination layer**이며, 이 문서는 Agent/Chat 작업의 **canonical entry point**다. 먼저 현재 작업 유형을 식별하고 아래 routing에서 필요한 최소 원본만 읽는다. 구현 상세는 책임 repository의 문서와 코드가 소유한다.

작업을 이어받을 때는 이 문서에서 필요한 원본을 확인한 뒤 **live GitHub Project #11과 관련 Issue/PR를 조회해 현재 실행 상태를 복구한다.** 세션별 handoff 문서를 별도 상태 원장으로 유지하지 않는다.

## 자주 하는 작업

| 작업 | 참조 순서 |
|---|---|
| Issue 생성·수정·활성화 | .github/ISSUE_TEMPLATE (`.github/ISSUE_TEMPLATE`)에서 작업 성격에 맞는 template 선택 → Work Type·Labels (`docs/work-classification.md`) → lifecycle·DoD (`docs/planning-model.md`) → activation·Project seed (`docs/project-orchestration.md`) |
| 작업 branch 시작 | Git Workflow (`docs/git-workflow.md`) → Development relation (`docs/project-orchestration.md`) → 해당 Issue와 owning repository 운영 |
| PR 작성·검토·통합 | Git Workflow (`docs/git-workflow.md`) → 완료·Evidence (`docs/planning-model.md`) → 해당 Issue 및 구현 레포의 검증 방법 |
| major/minor release | Git Workflow (`docs/git-workflow.md`) → 통합 목표 (`docs/release-1.0.md`) → 검수 연결 (`docs/implementation-map.md`) |
| 새 레포 scaffolding·디렉토리 역할 | Repository Design (`docs/repository-design.md`) → Node/JS/TS 또는 Python이면 Development Toolchain (`docs/development-toolchain.md`) |
| 기술 설계·구현 조사 | 아래 레포별 참조 → 해당 레포 `/docs/`와 코드·Issue·tests |
| Knowledge 문서 수정 | Knowledge Maintenance (`docs/maintenance.md`) → 소유권 (`docs/repository-design.md`) → 해당 원본 |
| 계획·분류·완료 검토 | Work Classification (`docs/work-classification.md`) → Planning (`docs/planning-model.md`) → Fields (`docs/fields.md`) → 실제 Item의 Outcome/AC/Evidence |
| 기록·발표·주간 회고 | Operating Rhythm (`docs/operating-rhythm.md`) → 실제 Project Status Update·Evidence |
| 제품/cross-repository 미결 사항 | Open Questions (`docs/open-questions.md`) |

## 레포별 원본 참조

| 대상 | 현재 확인 가능한 참조 |
|---|---|
| Engine | [README](https://github.com/ooMia/oomia.github.io.engine/blob/main/README.md), [수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/content-modification-contract.md), [Issues](https://github.com/ooMia/oomia.github.io.engine/issues) |
| Site | [README](https://github.com/ooMia/oomia.github.io/blob/main/README.md), [소비 계약](https://github.com/ooMia/oomia.github.io/blob/develop/docs/content-consumption-contract.md), [Issues](https://github.com/ooMia/oomia.github.io/issues) |
| Docs 콘텐츠 remote | [Repository](https://github.com/ooMia/oomia.github.io.docs) |

수정·소비 계약은 각각 owning repository에 통합되어 있다. Engine 수정 계약은 검증된 runtime과 함께 `main`에 승격되었다. Site 소비 계약은 현재 `develop` integration state를 가리키며, 다음 Site vertical slice에서 현재 Docs layout과 함께 재검증한다.

## PM-level 원본

- Architecture (`docs/architecture.md`): repository 역할과 제품 경계
- Architecture Transition (`docs/architecture-transition.md`): cross-repository 전환 순서·안전 규칙
- Release 1.0 (`docs/release-1.0.md`): 통합 목표·수용 기준
- Implementation Map (`docs/implementation-map.md`): revision-bound Evidence와 통합 검수 연결
- Open Questions (`docs/open-questions.md`): 아직 실제 제품/coordination 결정이 필요한 항목

component 종류, editor 구현, parser/schema 세부사항, package API, adapter shape 같은 구현 정보는 Knowledge에 복제하지 않는다. 실제 code/package가 계약을 충분히 설명하면 별도의 Knowledge 문서를 만들지 않는다.

설계가 있다는 사실과 구현 완료를 구분한다. Implementation Map의 Evidence는 기록된 revision에만 해당하며 현재 구현은 책임 레포에서 확인한다. 과거 설계 맥락은 Architecture Transition (`docs/architecture-transition.md`)과 owning repository의 migration 기록에서 추적한다.

## 프로젝트 협업·응답 원칙

1. 작업은 검증 가능한 작은 단계로 나눈다.
2. 이미 확정된 정책의 문서 반영·참조 정리·검증은 주도적으로 수행한다. 새로운 제품 정책 선택이나 실제 cross-repository ownership이 불확실한 경우만 질문한다.
3. GitHub 관련 핵심 객체의 주소를 알고 있다면 처음 소개할 때 클릭 가능한 링크로 제시한다.
4. 현재 작업 결과에 영향을 주지 않는 주변 metadata나 live field 검증은 blocker로 만들지 않는다.
5. 다음 세션에서도 이어져야 하는 작업 상태는 Project Item, Issue, PR 또는 owning repository Evidence에 남긴다. Chat 세션 전용 handoff를 별도 원장으로 만들지 않는다.

## 문서 사용

Repository/Agent 진입점은 README (`README.md`)와 AGENTS (`AGENTS.md`)이며, 둘 모두 이 문서로 수렴한다.

원본 문서를 수정하고 `python3 scripts/bundle.py`로 Chat 첨부물을 재생성한다. 생성된 `dist/CONTEXT-BUNDLE.md`를 직접 수정하지 않는다.

<!-- END SOURCE: CONTEXT.md -->


---

<!-- BEGIN SOURCE: docs/architecture-transition.md -->

# Architecture Transition — DB-backed CMS → Git-backed Content Workspace

상태: **Active migration directive**  
기준일: 2026-09-21

이 문서는 DB-backed CMS 중심 구현에서 Git-backed document workspace로 이동하는 동안 필요한 **cross-repository 전환 순서·안전 규칙·Evidence 연결**만 소유한다. Engine/Site 내부 구현 전략은 각 repository의 문서와 코드가 소유한다.

장기 제품 경계는 Architecture (`docs/architecture.md`), 통합 목표는 Release 1.0 (`docs/release-1.0.md`)을 따른다.

## 1. 전환 목적

기존 경로는 Payload/PostgreSQL/Lexical과 DB→Markdown export를 canonical publishing path로 사용했다. 새 경로는 다음 책임을 분리한다.

```text
authoring tool
     ↓
Git-backed Docs workspace
     ↓
Site consumer
     ↓
Live Site

optional Engine mutation → same Docs workspace
```

변경 목적은 canonical content와 authoring 도구 사이의 불필요한 persistence/conversion layer를 제거하는 것이다.

## 2. 현재 요구사항으로 사용하지 않는 전제

- PostgreSQL 또는 Payload가 canonical content source다.
- visual editor state를 변환해야만 content를 저장할 수 있다.
- Docs는 DB snapshot에서만 생성되는 projection이다.
- Engine 실행 또는 특정 editor 사용이 commit/Site 소비의 선행 조건이다.
- 과거 Issue·branch 구현 계획이 현재 owner code/docs보다 우선한다.
- 기존 코드 투자량이 새 architecture의 책임 경계를 결정한다.

과거 구현에서 지속 가치가 있는 결정·전환 맥락은 migration 기록과 Knowledge 문서에 흡수한다. 일회성 legacy/archive branch 자체는 장기 archive로 유지하지 않는다.

## 3. Cross-repository target

- canonical content는 md-like filesystem documents + frontmatter + assets다.
- durable shared revision은 `oomia.github.io.docs` commit SHA다.
- Site는 자신의 실제 consumer implementation으로 Docs를 판정한다.
- Engine은 선택 기능이며 실행 여부를 Site가 요구하지 않는다.
- editor 종류, component catalog, adapter 형식, Site 내부 layout/toolchain은 Knowledge-level gate가 아니다.
- 실제 component/syntax support는 Site와 관련 package/code가 소유한다.

## 4. Repository별 migration source

- Engine: [수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/content-modification-contract.md), [migration record](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/migration.md)
- Site: [소비 계약](https://github.com/ooMia/oomia.github.io/blob/develop/docs/content-consumption-contract.md)
- Docs: canonical content remote와 history
- Knowledge: 통합 목표, 전환 순서, acceptance, Evidence linkage

## 5. Migration order

### Phase A — Observe and preserve

- legacy history와 미병합 작업을 임의로 덮어쓰거나 삭제하지 않는다.
- Engine/Site/Docs의 live state와 owner code/docs를 확인한다.
- 기존 Evidence가 어느 revision과 architecture를 검증했는지 구분한다.

### Phase B — Prove direct Docs consumption

- 사용자가 직접 작성·commit한 실제 corpus를 Site가 소비할 수 있음을 검증한다.
- source 보존과 rendering 사이에 불필요한 mandatory conversion이 없음을 확인한다.
- editor 또는 component integration이 필요하면 owning implementation에서 검증한다.

### Phase C — Rewire publishing Evidence

- DB snapshot export를 공통 publish 선행 조건에서 제거한다.
- Docs canonical revision과 Site revision·delivery result를 연결한다.
- Engine을 사용한 경우 그 Evidence는 Engine 기능 검수에 별도로 연결한다.
- 문서 검증과 runtime/build/deployment 검증을 서로 대체하지 않는다.

### Phase D — Retire legacy

대체 경로가 필요한 acceptance를 충족한 이후에만 legacy runtime/scripts/tests/config를 owning repository 판단과 Evidence에 따라 제거하거나 archive한다.

## 6. Safety rules

- **Big-bang delete 금지**
- **Dual-SoT 장기 운영 금지**
- **Silent source loss 금지**
- **Site verification 생략 금지**
- **Owner 우회 금지**
- **Evidence 범위 확대 금지**

Knowledge는 구현 파일 목록, package boundary, editor 종류, component manifest, toolchain migration 방법을 결정하지 않는다.

## 7. Completion criteria

- Docs repository가 canonical content remote로 실제 운영된다.
- Site가 직접 작성된 canonical Docs revision을 실제 build/deploy한다.
- publish Evidence가 Docs SHA + Site revision + delivery result를 연결한다.
- 선택적으로 사용한 Engine 기능은 별도 Evidence로 검증된다.
- legacy Payload/PostgreSQL runtime은 owner repository에서 제거되거나 archive된다.
- Implementation Map (`docs/implementation-map.md`)이 새 기준 revisions로 재검증된다.

문서 정리만으로 이 조건을 충족했다고 판정하지 않는다.

<!-- END SOURCE: docs/architecture-transition.md -->


---

<!-- BEGIN SOURCE: docs/architecture.md -->

# Architecture

상태: Publishing Platform의 repository 역할과 PM-level 제품 경계를 설명하는 canonical 문서.

## 원칙

- 구현 작업보다 제품 결과와 시스템 책임을 기준으로 계획한다.
- canonical content는 **frontmatter를 포함할 수 있는 md-like filesystem documents + assets**다.
- authoring client는 canonical source 위의 교체 가능한 도구다. Obsidian, visual editor, IDE, Agent 등 어떤 구현을 선택하는지는 Knowledge의 제품 경계가 아니다.
- 사용자가 작성한 파일은 선택적 Engine 후처리 없이도 commit할 수 있다.
- Site는 생산 도구나 처리 이력이 아니라 실제 입력과 자신의 consumer contract로 Publishability를 판정한다.
- 실제 지원 syntax·schema·component semantics는 이를 구현·소비하는 code/package가 source of truth다. Knowledge는 구현 catalog나 manifest를 복제하지 않는다.
- storage / editing / mutation / publishing / presentation을 서로 다른 책임으로 취급한다.
- canonical content를 표현하기 위해 별도 DB가 필요하지 않으면 도입하지 않는다.

## 레포의 역할

| 레포 | 책임 |
|---|---|
| `oomia.github.io.engine` | md-like document에 대한 선택적 in-place 수정·후처리 기능 |
| `oomia.github.io.docs` | canonical content remote와 shared Git revision history |
| `oomia.github.io` | Docs 입력을 실제 구현 계약에 따라 소비·렌더링·검증하고 전달 |
| `oomia.github.io.knowledge` | 공통 workflow·coordination·개발 기준·통합 목표·acceptance·Evidence linkage |

`mono`는 Site repository의 로컬 별칭이며 별도 원격 repository가 아니다.

## Canonical content workspace

```text
Compatible authoring tool
          ↓
md-like document + frontmatter + assets
          ↓
      user commit
          ↓
      Docs revision
          ↓
       Site consumer
          ↓
        Live Site

optional Engine mutation ──→ same document workspace
```

Docs commit SHA가 공유·재현 가능한 canonical revision을 식별한다. Git history가 기본 revision/diff/rollback mechanism이다.

어떤 editor 구현을 사용할지는 이 경계를 바꾸지 않는다. 필요한 editor가 frontmatter를 포함한 동일 source를 관리할 수 있고 의미를 보존하면 충분하다. 실제 editor UI를 Site repository 안에 둘지, 별도 app으로 둘지 역시 구현 owner가 결정한다.

## Implementation source of truth

유효한 콘텐츠를 외부 planning 문서가 code에 강제하지 않는다.

- Markdown/MDX parser, frontmatter schema, component renderer와 실제 tests가 현재 Site 소비 능력을 정의한다.
- 외부 component package를 사용하면 해당 package와 Site integration이 component semantics의 원본이다.
- custom component가 필요하면 renderer와 authoring surface가 가능한 한 동일 package/codebase를 소비한다.
- editor API가 별도 component metadata 형식을 요구하면 얇은 adapter를 둘 수 있지만, adapter는 두 번째 semantics 원본이 아니다.
- Knowledge는 지원 component 목록, props schema, editor adapter 형식, manifest catalog를 소유하지 않는다.

코드가 계약을 충분히 표현하는 경우 별도 문서화를 요구하지 않는다. 문서는 제품 경계, 사용자가 관찰할 계약, 검증 방법처럼 코드만으로 찾기 어려운 정보를 설명한다.

## Engine boundary

문서 mutation의 기술 설계는 [Engine 수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/content-modification-contract.md)이 소유한다. Agent 후처리를 포함한 선택 기능은 Docs commit이나 Site 소비의 필수 단계가 아니다.

## Publishing boundary

[Site 소비 계약](https://github.com/ooMia/oomia.github.io/blob/develop/docs/content-consumption-contract.md)이 실제 입력·렌더링·component integration·publishability 검증을 소유한다.

- 입력 계약을 만족하는 사용자 작성 파일은 그대로 소비할 수 있다.
- Engine 후처리나 별도 projection은 공통 발행 선행 조건이 아니다.
- 통합 검수는 Docs revision, Site revision과 delivery result를 연결한다.
- Engine을 사용한 경우 실행 Evidence는 해당 Engine 기능 검수에 별도로 연결한다.

## Contract surfaces

| Surface | owner |
|---|---|
| 제품 수준 repository 역할·통합 경계 | Knowledge |
| 문서 mutation | Engine code + Engine contract |
| canonical content revision | Docs Git history |
| 실제 콘텐츠 소비 가능성·component semantics | Site code/packages + Site contract |
| authoring UI/editor integration | 실제 구현 repository의 code/docs |
| release acceptance·cross-repository Evidence linkage | Knowledge |

상호 링크는 원본 탐색을 위한 것이며 상대 runtime 실행을 요구하는 의존성을 뜻하지 않는다.

<!-- END SOURCE: docs/architecture.md -->


---

<!-- BEGIN SOURCE: docs/development-toolchain.md -->

# Development Toolchain — Vite+ / uv First

Publishing Platform repository의 **project-wide toolchain 기본값과 선택 원칙**을 소유한다. exact runtime/tool version, framework command, root config, CI job, hook, IDE 설정과 repository-specific 예외는 각 owning repository가 소유한다.

## 기본값

| Repository / project type | 기본 toolchain |
|---|---|
| Node.js / JavaScript / TypeScript | Vite+ (`vp`) first |
| Python | `uv` first |

다른 도구가 실제 기술적 요구 때문에 필요하면 사용할 수 있지만, 같은 책임을 가진 도구를 단순 선호나 과거 습관 때문에 중복 표준으로 유지하지 않는다.

## Node / JS / TS — Vite+ first

- Vite+가 제공하는 package management, static checks, test/build/task, environment, hook 기능은 가능한 한 `vp` command surface를 우선한다.
- package/framework 고유 command가 필요하면 owning repository가 명시적인 task/script로 노출한다.
- Vite+가 이미 소유하는 역할을 위해 Turbo, Husky, ESLint/Prettier wrapper 등 동등 책임 도구를 기본값으로 병행하지 않는다.
- runtime/package-manager/tool version은 repository 안에서 재현 가능하게 선언한다. global latest behavior를 repository contract로 간주하지 않는다.
- stateful publish/deploy/Git mutation처럼 외부 상태를 바꾸는 작업은 cacheable pure task처럼 다루지 않는다.

정확한 `vp` command, `vite.config.*`, package-manager pinning, hook, cache, CI setup은 owning repository의 README/config/workflow가 현재 구현을 설명한다.

## Python — uv first

- project metadata와 dependency declaration은 `pyproject.toml`을 중심으로 관리한다.
- dependency synchronization, lock, add/remove, project command 실행은 `uv`를 기본 interface로 사용한다.
- 재현 가능한 dependency state가 필요하면 `uv.lock`을 repository가 관리한다.
- Python/runtime requirement와 exact version은 owning repository 설정이 선언한다.
- `pip`, Poetry, Pipenv, Conda 등은 실제 runtime/distribution 제약이 있을 때 예외로 사용할 수 있지만 `uv`와 같은 책임의 기본 project manager로 병행하지 않는다.

정확한 `uv` command, Python version, environment/CI setup은 owning repository가 소유한다.

## 공통 원칙

- **Single owner:** 같은 concern의 formatter, linter, task runner, package/project manager를 여러 계층에서 중복 소유하지 않는다.
- **Reproducibility:** developer machine의 전역 환경이 우연히 맞는다고 가정하지 않고 repository-declared state로 재현한다.
- **Repository-local application:** 공통 기본값을 실제로 어떻게 적용했는지는 각 repository code/config/docs가 소유한다.
- **Explicit exception:** project-wide 기본값과 다른 선택은 실제 기술적 이유와 검증 방법을 owning repository에 남긴다.
- **Side-effect boundary:** build/check와 publish/deploy/Git mutation 같은 side-effect operation을 명확히 구분한다.

## Repository-local references

- Engine: [README](https://github.com/ooMia/oomia.github.io.engine/blob/main/README.md), [migration](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/migration.md)
- Site: [README](https://github.com/ooMia/oomia.github.io/blob/main/README.md), [content consumption contract](https://github.com/ooMia/oomia.github.io/blob/develop/docs/content-consumption-contract.md)
- Docs: repository workflow/config가 실제 content preparation과 runner/tool 사용을 소유한다.

## External references

- Vite+: https://viteplus.dev/guide/
- uv: https://docs.astral.sh/uv/

<!-- END SOURCE: docs/development-toolchain.md -->


---

<!-- BEGIN SOURCE: docs/repository-design.md -->

# Repository Design

상태: 공통 repository scheme과 문서 소유권의 원본. Engine/Site 고유 설계 절은 책임 레포의 원본을 참조한다.

이 문서는 모든 repository가 공유하는 디렉토리 역할과 scaffolding 기준을 소유한다. repository의 성격은 안에 들어가는 내용으로 표현하며, 같은 이름의 디렉토리를 repository마다 다른 역할로 정의하지 않는다.

## 1. Common repository scheme

| 경로 | 모든 repository에서 동일한 역할 |
|---|---|
| `docs/` | 해당 repository가 소유하는 설계·계약·참조 문서 |
| `apps/` | 독립적으로 실행·배포하는 프로그램 |
| `packages/` | 실제 재사용·의존성 경계를 가진 라이브러리 |
| `tools/` | 제품 runtime 밖의 repository 개발 도구·generator |
| `scripts/` | repository 작업을 실행하는 작은 script entry point |
| `templates/` | 반복 생성할 문서·산출물의 입력 형상 |
| `schemas/` | 해당 repository가 소유하는 기계 판독 가능한 계약 |
| `config/` | 해당 repository가 소유하는 선언적 설정·registry |
| `tests/` | 소유 코드·계약의 검증과 fixture; app/package 내부에도 같은 역할 적용 |
| `.github/` | GitHub automation 및 GitHub용 설정 |
| `.vite-hooks/` | repository가 관리하는 Vite+ Git hook |
| `dist/` | 원본에서 재생성하는 build·배포 산출물 |

동일한 scheme은 사용하지 않는 빈 디렉토리를 모두 만들라는 의미가 아니다. 필요한 경로를 사용할 때 위 역할을 유지한다. 새로운 공통 경로가 필요하면 여기서 의미를 먼저 정의한다. framework가 요구하는 하위 경로와 실제 package 구성은 구현 레포가 설명한다.

`oomia.github.io.docs`는 repository 이름이며, 각 repository의 `/docs/` 경로와 다르다. 콘텐츠 저장 레포라는 이유로 `/docs/`의 의미를 발행용 콘텐츠로 재정의하지 않는다. 콘텐츠 tree의 세부 배치는 별도 domain contract이며 이번 공통 scheme 정리에서 이동하지 않는다.

Knowledge의 `docs/`에는 공통 workflow·coordination·개발 기준을, Engine/Site의 `docs/`에는 각 구현이 소유한 기술 설계를 둔다. 디렉토리의 역할은 같고 문서가 다루는 대상만 다르다.

JavaScript/TypeScript workspace는 필요한 경우 `apps/`, `packages/`, `tools/`와 root 설정 파일을 사용한다. 비실행 레포에 JS/TS package 파일을 의무적으로 추가하지 않는다.

### apps

`apps/*`에 둘 조건:

- 독립적으로 실행할 수 있음
- container/process/UI/CLI처럼 runtime entry point가 있음
- 다른 app과 lifecycle이 다름

### packages

`packages/*`에 둘 조건 중 하나 이상:

- 두 개 이상의 app/package가 실제로 사용함
- 독립 dependency boundary가 중요함
- 별도 unit/API contract로 검증하는 것이 명확함
- library artifact로 pack/publish할 가능성이 실제로 있음
- execution context를 분리해야 함

단순히 파일이 많아졌다는 이유로 package를 만들지 않는다.

### tools

`tools/*`는 제품 runtime에 포함되지 않는 repository 개발 도구다.

예:

- code generator
- fixture generator
- migration helper
- release/evidence utility
- local developer diagnostics

한 번만 쓰는 20줄 script를 전부 package로 만들 필요는 없지만, root `scripts/`가 장기적으로 기능 dump가 되지 않게 한다.

## 2. Monorepo-ready, package-light

scratch repository는 처음부터 workspace를 사용할 수 있지만 package proliferation은 피한다.

예를 들어 새 Engine은 다음처럼 시작할 수 있다.

```text
/
├─ apps/
│  └─ engine/
├─ packages/   # initially empty or absent
└─ tools/      # actual need appears later
```

이 구조는 향후 package 분리를 쉽게 하면서도 첫날부터 `core`, `utils`, `infra`, `shared`를 추측해 만들지 않는다.

## 3. Avoid catch-all packages

다음 이름은 쉽게 책임이 흐려지므로 기본적으로 만들지 않는다.

- `utils`
- `common`
- `shared`
- `helpers`
- `infra`

이름 자체가 금지되는 것은 아니다. 다만 생성하려면 “어떤 dependency boundary를 소유하는가?”에 명확히 답할 수 있어야 한다.

예를 들어 process execution이 Engine과 별도 tool에서 모두 필요해 실제 contract가 생겼다면 `packages/process`처럼 구체적인 capability package를 고려할 수 있다.

두 번째 consumer가 아직 없다면 app 내부에 둔다.

## 4. Dependency direction

dependency는 실제 consumer → provider 관계가 source/config에서 명시적으로 드러나야 한다.

- workspace 내부 의존성은 package/project manager가 이해할 수 있는 정식 dependency로 표현한다.
- task ordering만을 위해 별도의 가상 dependency graph를 만들지 않는다.
- 순환 dependency가 생기면 task runner 설정으로 감추지 않고 package boundary를 다시 검토한다.
- Node/JS/TS workspace의 구체적인 package-manager 표기와 실행 방식은 Development Toolchain (`docs/development-toolchain.md`)을 따른다.

## 5. Dependency versions

여러 package가 같은 compatibility/version policy를 공유하면 한 곳에서 관리하는 것을 우선한다.

- 같은 version constraint를 여러 package에 반복해 drift를 만들지 않는다.
- 한 consumer에만 필요한 dependency까지 공통 registry로 끌어올리지 않는다.
- 실제 catalog/lockfile/version pinning 방식은 Development Toolchain (`docs/development-toolchain.md`)과 owning repository 설정이 소유한다.

## 6. Root package responsibility

workspace root는 orchestration/configuration boundary이며 제품 business logic의 기본 owner가 아니다.

root가 소유할 수 있는 것:

- workspace/project metadata
- shared compiler/tool configuration
- repository-wide tasks
- package/project-manager policy
- CI/hook integration

정확한 command surface와 tool-specific config는 Development Toolchain (`docs/development-toolchain.md`)이 소유한다.

## 7. Configuration ownership

같은 concern의 config source를 가능한 한 하나로 만든다.

- repository-wide development/tool policy → root 또는 명시된 shared config
- framework/runtime config → owning app/package
- CI → `.github/workflows`
- repository-local 예외 → 해당 repository code/docs

동일 설정을 여러 위치에 복사해 Agent나 개발자가 적용 우선순위를 추론하게 만들지 않는다. Vite+/uv/package manager 등 구체 도구 선택과 명령은 Development Toolchain (`docs/development-toolchain.md`)을 따른다.

## 8. Co-location

코드는 소비 책임과 가까이 둔다.

package 내부 기본 예:

```text
src/
tests/
package.json
tsconfig.json
```

작은 package는 과도한 layer directory를 만들지 않는다.

다음과 같은 layer를 구현 전에 생성하지 않는다.

```text
controllers/
services/
repositories/
domain/
application/
infrastructure/
adapters/
ports/
```

실제 책임이 분리될 때 이름을 부여한다.

## 9. Execution-context boundaries

Astro repository의 구조에서 참고할 수 있는 좋은 원칙은 **같은 제품이라도 실행되는 context가 다르면 코드 경계를 분명히 하는 것**이다.

구현 repository에서도 다음 차이가 실제로 생기면 directory/package boundary 후보가 된다.

- host filesystem / Git access
- container runtime
- pure validation/domain logic
- child process execution
- browser/editor integration
- Site verification adapter

기술 패턴 이름을 먼저 선택하지 않고 “이 코드는 어디에서 실행되고 어떤 capability를 허용하는가?”로 분리한다.

## 10. Tests

test는 가능한 한 owning code와 가까이 둔다.

권장:

- unit test → app/package 내부
- package integration → package 내부
- cross-repository/system integration → 명확한 integration/e2e location
- fixture → 해당 test의 owner와 가까이

root `tests` 하나에 모든 레벨의 test를 섞지 않는다.

실제 content corpus는 authoring/Site integration Evidence로 사용할 수 있지만, edge-case regression fixture와 역할을 구분한다.

## 11. Repository documentation

Knowledge는 Chat/Agent의 일관된 작업을 위한 공통 지침과 참조 경로를 소유한다.

| 내용 | 단일 원본의 소유자 |
|---|---|
| 공통 디렉토리 scheme·scaffolding 기준 | 이 문서 |
| 공통 개발 도구 지침 | Development Toolchain (`docs/development-toolchain.md`) |
| 공통 change-management invariant | Git Workflow (`docs/git-workflow.md`) |
| Issue lifecycle·계획·완료 의미 | Planning Model (`docs/planning-model.md`) |
| Project/Issue 공통 orchestration semantics | Project Orchestration (`docs/project-orchestration.md`) |
| 구현되는 기술 설계·API·동작 계약·실행·재현 방법 | 책임 구현 repository의 `docs/` 및 코드 |
| 작업별 읽기 경로 | CONTEXT (`CONTEXT.md`) |

기술 설계는 구현되는 레포에 두고 Knowledge는 해당 문서를 링크로 참조한다. 두 레포가 함께 소비한다는 이유만으로 기술 계약 전체를 Knowledge 소유로 정하지 않는다. Engine의 파일 수정 계약과 Site의 소비 계약은 각 레포가 소유하고 서로의 원본을 참조한다. 그 밖의 producer/consumer 계약에서 원본 소유자가 불분명하면 사용자에게 질문하고 이동을 보류한다.

공통 규칙은 각 레포에 다시 작성하지 않는다. scaffolding 시 공통 개발 지침을 참조해 해당 레포에 적용한 설정·명령·제약을 명시할 수는 있다. 이 문서는 적용 결과이며 공통 기준의 별도 원본이 아니다. 공통 change-management invariant나 디렉토리 역할을 반복 복사할 필요는 없다.

새 문서는 새로운 정보 소유권이 필요할 때만 만든다. 편의를 위한 요약·템플릿은 정책을 복제하지 않고 원본을 참조한다. 참조 경로는 작업 진입점 → 소유 문서 → 구현 근거 순으로 구성하고, 서로를 읽어야 정의를 이해할 수 있는 순환 의존을 만들지 않는다.

구현 상세가 책임 repository의 code/docs로 충분히 표현되면 Knowledge에 compatibility 문서를 중복 유지하지 않는다. 삭제된 과거 설계는 Git history에서 조사한다.

## 12. Agent context

Agent용 root instruction은 짧고 실행 가능해야 한다.

포함:

- Knowledge canonical link / transition guide
- repository role
- standard Vite+ / uv commands
- current verification gate
- destructive migration safety
- local code ownership rules

포함하지 않음:

- 장문의 오래된 product history
- superseded architecture
- copy-pasted entire Knowledge
- 이미 존재하지 않는 service/DB commands

repository-local Agent 지침에 superseded architecture나 존재하지 않는 service/task가 남아 있으면 scratch/migration 구현 전에 먼저 교체한다. 현재 실행 상태는 live Project/Issue/PR와 owning repository Evidence에서 확인한다.

## 13. Generated and local state

generated/local state를 source tree와 섞지 않는다.

예:

- `dist/`
- caches
- evidence runtime output
- temporary cloned workspace
- container state
- credentials

필요한 경우 `.state/`, temporary directory 또는 configured external workspace를 사용하고 `.gitignore` ownership을 명확히 한다.

canonical content 자체는 Engine repository 내부 generated directory가 아니라 external/mounted docs workspace로 취급한다.


## 14. Maintenance checklist

새 directory/package/tool을 추가하기 전에 묻는다.

1. 독립 runtime인가?
2. 둘 이상의 consumer가 있는가?
3. dependency boundary가 필요한가?
4. 별도 test/build/release lifecycle이 있는가?
5. 기존 owner 안에 두면 실제 문제가 생기는가?

5개 모두 아니라면 새 package를 만들 이유가 약하다.

새 tool을 추가하기 전에 묻는다.

1. Node 계열이면 Vite+가 이미 제공하는가?
2. Python이면 uv가 이미 제공하는가?
3. package/workspace manager의 기존 기능으로 충분한가?
4. platform-native Git/GitHub 기능으로 충분한가?
5. 기존 dependency를 재사용할 수 있는가?

비핵심 문제는 새 구현보다 기존 도구와 요구사항 조정을 우선한다.

## External references reviewed

- Vite+ Monorepo: https://viteplus.dev/guide/monorepo
- Vite+ Run: https://viteplus.dev/guide/run
- Vite+ Create/Generators: https://viteplus.dev/guide/create
- pnpm Workspaces: https://pnpm.io/workspaces
- pnpm Catalogs: https://pnpm.io/catalogs
- Astro CONTRIBUTING / code structure: https://github.com/withastro/astro/blob/main/CONTRIBUTING.md
- Vite+ repository: https://github.com/voidzero-dev/vite-plus
- Payload monorepo (large-repo comparison, not target architecture): https://github.com/payloadcms/payload

<!-- END SOURCE: docs/repository-design.md -->


---

<!-- BEGIN SOURCE: docs/maintenance.md -->

# Knowledge Maintenance

이 문서는 `ooMia/oomia.github.io.knowledge` **자체를 수정·유지하는 방법**을 설명하는 repository-local guide다. 외부 contributor를 위한 기여 정책이 아니며, 프로젝트 전체의 공통 정책을 새로 정의하지 않는다.

## 수정 절차

1. CONTEXT (`CONTEXT.md`)에서 현재 작업에 필요한 canonical source를 찾는다.
2. 규칙을 바꿀 때는 실제 owner 문서만 수정한다. 같은 정책을 다른 문서에 복제하지 않는다.
3. 아직 확정되지 않은 제품/cross-repository 판단은 Open Questions (`docs/open-questions.md`)에 남긴다.
4. 구현 상태나 완료 Evidence를 바꾸려면 owning repository의 live code, Issue, PR, workflow/deployment 결과를 확인한다.
5. Knowledge 수정 후 `python3 scripts/bundle.py`를 실행해 내부 링크를 검증하고 `dist/CONTEXT-BUNDLE.md`를 재생성한다.
6. 최종 diff가 하나의 명확한 정책/문서 변화로 읽히는지 확인한다.

## 작업 상태

- 다음 세션까지 이어져야 하는 실행 상태는 GitHub Project #11, Issue, PR 또는 owning repository Evidence에 남긴다.
- 별도 handoff 파일이나 세션 로그를 현재 상태의 원장으로 유지하지 않는다.
- 과거 변경 근거가 필요하면 Git history와 immutable Evidence를 사용한다.

## Issue / PR

- Repository Issue를 생성하거나 크게 수정할 때는 `.github/ISSUE_TEMPLATE/`에서 작업 성격에 맞는 template을 먼저 선택한다. 현재 일반 repository work 형식은 Repository work template (`.github/ISSUE_TEMPLATE/repository-work.md`)이다.
- Issue의 operational metadata는 GitHub Project/native fields가 소유하며 body에 현재값을 중복 기록하지 않는다.
- branch/PR/lifecycle 의미는 Planning Model (`docs/planning-model.md`), Project Orchestration (`docs/project-orchestration.md`), Git Workflow (`docs/git-workflow.md`)을 따른다.

## 문서 경계

- Knowledge는 공통 semantics와 project-wide invariant를 소유한다.
- repository-specific runtime, workflow, API, token, runner, branch topology와 구현 상세는 owning repository가 소유한다.
- 새 문서는 새로운 정보 소유권이 필요할 때만 만든다. 편의를 위한 요약 문서는 canonical source를 대체하지 않는다.

<!-- END SOURCE: docs/maintenance.md -->


---

<!-- BEGIN SOURCE: docs/planning-model.md -->

# Planning Model

## 계획 단위

| 개념 | 정의 / 작성 규칙 |
|---|---|
| Release Goal | 릴리스가 달성할 제품 상태 한 문장. 기술·작업 나열은 Product Boundary로 분리 |
| Product Boundary | 해당 릴리스에 필요한 capability 및 제외 범위. 구현 순서가 아님 |
| Iteration Goal | 이번 Iteration에서 달라질 가장 중요한 상태 한 문장 |
| Iteration Commitment | Goal을 위해 선택한 Item 집합. 대화 기준 통상 2–5개 |
| Project Item | 독립적으로 검증 가능한 하나의 변화(delta) |
| Repository Issue | 해당 결과를 실현하는 특정 레포의 구현 단위 |

이전 Item을 다음 버전용으로 복제하지 말고 새로 달라지는 결과만 Item으로 만든다. 릴리스 계획은 Project Item의 필수 분류 field로 복제하지 않고 release 문서와 실제 integration evidence에서 관리한다.

## Item / Issue 작성

Project Item에는 Outcome, binary하게 판정 가능한 Acceptance Criteria, Evidence를 둔다. Repository가 작업의 1차 영역을 제공하고 Work Type이 Issue 전체의 주된 delta를 분류한다. Work Type/Labels 판정은 Work Classification (`docs/work-classification.md`)을 따른다.

불확실한 작업은 Draft로 포착한다. 레포 소유권과 실행 범위가 분명한 구현 작업은 Repository Issue로 구체화한다. 전역 조정 Item을 억지로 하나의 레포에 귀속하지 않는다. Issue에는 부모 Item 링크, 구현 기술, 필요한 Quality Requirements를 명시한다. 한 Iteration에 끝내기 어렵거나 독립 검증이 필요한 결과는 분해한다.

### Development branch 초기 구현

Issue와 연관된 구현을 development branch에서 시작할 때는 **green scaffold**를 기본값으로 사용한다.

- 첫 변경은 완성 구현보다 핵심 flow와 dependency boundary를 실행 가능한 구조로 연결하는 데 집중할 수 있다.
- prompt·정규화·세부 validation처럼 아직 사용자 정책이 필요한 custom logic은 명시적인 `TODO` placeholder로 남길 수 있다.
- scaffold 단계의 최소 contract test는 통과해야 한다. 의도적인 red scaffold는 Issue 자체가 failing test를 요구하거나 사용자가 명시적으로 요청한 경우에만 사용한다.
- 첫 branch update는 가능하면 하나의 응집된 commit으로 유지한다.
- scaffold는 착수 방식일 뿐이며 Issue의 최종 Acceptance Criteria나 Definition of Done을 축소하지 않는다.

### Draft와 활성화

- 실행 범위가 확정되지 않은 후보 작업은 Draft 또는 이에 준하는 비활성 planning state로 포착한다. 구체적인 UI/API 표현 방식은 이를 관리하는 interface/owner가 소유한다.
- Draft 단계에서는 implementation branch를 만들지 않는다.
- Draft를 활성화하거나 일반 Repository Issue를 생성했다고 해서 Development branch를 즉시 만들지 않는다.
- 아직 Iteration commitment가 없으면 `Backlog`다. 실행 주차가 정해지면 Iteration을 설정하고 `Todo`로 전환한다.
- `Todo`는 실행 가능하지만 아직 실제 작업이 시작되지 않은 상태다.
- 실제 구현을 시작하며 Development branch를 생성·연결하는 순간 `In progress`로 전환한다.
- linked PR이 등록되면 branch 생성 여부와 무관하게 실제 작업이 시작된 것으로 보고 `In progress`로 전환한다.
- branch/PR 없이 수행하는 조사·coordination·문서 작업도 실행 전에 최소한 Iteration commitment와 `Todo` 상태를 가져야 한다. 실제 작업이 진행 중이면 필요에 따라 `In progress`로 명시한다.
- Development branch는 실제 구현 책임을 소유하는 repository에 둔다. 하나의 Issue가 여러 구현 레포에 걸치면 1:N 관계를 명시한다.

- Project orchestration이 적용된 repository에서는 Issue activation이 Project #11 등록과 초기 field materialization을 수행할 수 있다. Development relation은 activation이 아니라 실제 작업 시작을 표현한다.
- 새 Repository Issue에는 machine-readable `project-seed`를 함께 둘 수 있다. 이는 Project field의 **초기값 전달용**이며 활성화 이후의 SoT는 계속 GitHub Project다.
- activation과 lifecycle materialization의 공통 의미는 Project Orchestration (`docs/project-orchestration.md`)을 따른다. workflow, token, runner, branch base 같은 실행 세부사항은 owning repository가 소유한다.

## Project Status lifecycle

Project의 `Status`는 repository Issue의 open/closed 여부를 복제하지 않고 **실행 상태와 결과 의미**를 나타낸다.

| Status | 의미 |
|---|---|
| Backlog | 유효한 후보 작업이지만 아직 Iteration commitment가 아니다. Iteration과 Development relation을 두지 않는다. |
| Todo | Iteration에 commit되었고 착수 가능하지만 실제 작업은 아직 시작되지 않았다. Development branch/PR은 없다. |
| In progress | 실제 구현·조사·검증이 진행 중이다. Development branch 생성 또는 linked PR 등록은 이 상태의 명시적 신호다. |
| Done | Outcome, Acceptance Criteria, 적용되는 Quality Requirements와 Evidence를 충족했다. |
| Cancelled | 더 이상 수행하지 않기로 결정한 작업이다. superseded, rejected, invalidated 등을 포함하며 완료 성과로 계산하지 않는다. |

- repository Issue의 `closed / completed`는 일반적으로 `Done`, `closed / not_planned`는 `Cancelled`와 대응한다.
- Draft 표현 방식과 repository state는 planning 의미를 임의로 바꾸지 않는다. `Cancelled`는 superseded/rejected/invalidated 등 더 이상 추진하지 않기로 한 planning decision일 때만 사용하며, 그 판단의 SoT는 Project Status다.
- Development branch나 linked PR이 존재하는 open Item은 `Backlog`나 `Todo`에 머물지 않는다.
- branch/PR 없이 수행되는 작업도 실제 실행 전에 Iteration commitment를 가져야 하며, Backlog 상태에서 작업하지 않는다.
- 실제 수행된 작업은 완료·취소 여부와 관계없이 해당 Iteration을 historical accounting으로 유지할 수 있다.
- Iteration Goal 변경·회고는 Project Status Update에 기록하고, repository Issue는 자기 Outcome/AC/Evidence를 유지한다.
- `project-seed`는 activation 초기값일 뿐이며 activation 이후 Project field가 current state의 SoT다.
- activation/reconciliation automation은 이 lifecycle을 materialize하는 실행 메커니즘이다. automation은 명확한 Status/Iteration invariant만 적용하고 Work Type·Assignee·historical Iteration처럼 문맥 판단이 필요한 값을 추론하지 않는다. automation ownership boundary는 Project Orchestration (`docs/project-orchestration.md`)을 따른다.

## 완료 판정

- **Acceptance Criteria**: 이번 변화가 제공해야 하는 관찰 가능한 결과.
- **Quality Requirements**: 적용되는 성능·신뢰성·품질 제약. 근거 없는 수치를 만들지 않는다.
- **Global Definition of Done**: AC 충족, 적용 품질 검증, 필요한 코드와 지속 문서 통합, 관련 자동 검사 통과, 재현 가능한 Evidence 연결.

### Evidence 규칙

Evidence는 **Item의 Outcome이 실제로 달성되었음을 재현 가능하게 보여주는 자료**다.

- 설계·계획 정의 자체가 Outcome이면 이 레포의 canonical 문서가 Evidence가 될 수 있다. `Publishing Platform 1.0 Definition`, `Project Planning Model`처럼 장기 규칙을 확정하는 Item은 관련 문서의 **immutable commit/permalink**를 연결한다.
- `main` 문서 링크는 현재 canonical reference를 찾는 데 사용하고, 완료 시점의 증거를 고정해야 할 때는 commit SHA가 포함된 permalink나 해당 변경 commit/PR을 우선한다.
- 기능 구현, 품질 검증, 실제 발행, deployment 성공은 설계 문서로 증명하지 않는다. 코드·테스트·PR/commit·실행 결과·배포 URL 등 책임 레포의 Evidence가 필요하다.
- Implementation Map (`docs/implementation-map.md`)은 여러 implementation Evidence를 1.0 capability에 대응시킨 검증 스냅샷이다. 기준 revision 이후 코드가 바뀌면 재검증하기 전까지 최신 상태라고 가정하지 않는다.

## Source of Truth

| 정보 | 소유 위치 |
|---|---|
| 공통 workflow·coordination·개발 지침·계획 규칙·필드 의미·전역 DoD | 이 레포의 docs |
| 구현되는 기술 설계 | 책임 구현 레포의 docs; Knowledge는 원본 링크로 참조 |
| 1.0 capability별 검증 스냅샷 | 이 레포의 Implementation Map (`docs/implementation-map.md`) |
| Iteration Goal 및 회고 | GitHub Project Status Update |
| Status / Iteration / Work Type 값 | GitHub Project fields |
| Labels | repository-native GitHub labels; canonical registry는 `config/labels.json` |
| Outcome / AC / Evidence | 실제 Project Item 또는 Repository Issue |
| canonical content draft/working state | local Git working tree |
| durable shared content revision | `ooMia/oomia.github.io.docs` Git commit |
| 구현·테스트·구체적인 계약 | 책임을 소유한 구현 레포 |

Architecture migration이 Active인 동안 Engine/Site/Docs 관련 Item은 Architecture Transition (`docs/architecture-transition.md`)의 phase와 safety rule을 위반하지 않는지 먼저 확인한다. GitHub Project README는 위 정보를 복제하는 원본이 아니라 **탐색용 인덱스**다. 장기 정의는 소유 문서에 두고 Project README에는 원본 링크와 Project 운영 진입점만 남긴다.

## 릴리스와 시간

Iteration과 제품 버전은 별개다. 매주 자동으로 버전을 올리지 않는다. release 목표와 readiness는 release 문서와 integration Evidence에서 관리하며 개별 Item의 필수 custom field로 복제하지 않는다.

## 생성과 검증의 피드백

Chat/Agent workflow는 결과를 수정할 수 있는 인터페이스와 권한을 함께 고려해 설계한다.

- 생성 이후 수정하기 어렵다면 생성 전에 필요한 맥락을 확보하고 정확한 결과를 만드는 데 우선 투자한다.
- 쉽게 수정할 수 있다면 과도한 생성 제약보다 생성 → 검증 → 피드백 → 수정의 짧은 반복을 활용할 수 있다.
- 불일치를 발견해도 조치할 수 없는 검사는 추가 비용과 실제 효용을 먼저 검토한다. 주변 metadata 검사를 본 작업의 blocker로 만들지 않는다.
- 이 원칙은 기능 구현이나 배포의 완료 Evidence를 생략하는 근거가 아니다. 완료 주장은 실제 수행한 검증 범위에 맞춘다.

<!-- END SOURCE: docs/planning-model.md -->


---

<!-- BEGIN SOURCE: docs/fields.md -->

# Project Fields

Project #11은 repository가 이미 제공하는 1차 분류를 반복하지 않는다. custom field는 실제 운영과 통계에 지속적으로 쓰이는 최소 축만 유지한다.

## Core fields

| 이름 | 질문 | 규칙 |
|---|---|---|
| Status | 지금 어떤 실행 상태인가? | Backlog / Todo / In progress / Done / Cancelled |
| Iteration | 언제 수행하는가? | committed 또는 historical work에 사용 |
| Work Type | 왜 이 Issue가 존재하는가? | 정확히 하나. Work Classification (`docs/work-classification.md`) 기준 |

Repository, Labels, Linked pull requests, Parent issue, Sub-issues progress, Assignees 등은 GitHub native field를 그대로 사용한다.

Objective, Scope, Target Release, Deadline, Estimate custom field는 repository와 중복되거나 일관된 판정·운영 사용이 부족하여 Project taxonomy에서 제거한다.

## Field ownership

- `Status` option의 의미와 lifecycle은 Planning Model (`docs/planning-model.md`)이 소유한다.
- `Work Type` option의 의미와 판정은 Work Classification (`docs/work-classification.md`)이 소유한다.
- 이 문서는 Project #11에 어떤 field가 존재하고 언제 값이 필요한지에 대한 schema/cardinality/completeness만 소유한다.

## Completeness

Field completeness는 “모든 칸을 채운다”가 아니라 **의미상 필요한 값이 비어 있지 않게 한다**는 뜻이다.

- `Status`: Project Item이면 항상 하나의 유효한 값이 있어야 한다.
- `Work Type`: 실행 가능한 repository Issue이면 정확히 하나여야 한다.
- `Iteration`: `Todo / In progress`에는 현재 commitment가 반드시 있어야 한다. 실제 수행된 historical work(`Done / Cancelled`)는 수행 주차가 확인되는 경우 유지한다. 아직 수행하지 않은 `Backlog`와 Draft는 비운다.
- `Assignees`: 실제 작업 책임자가 정해진 executable Item에는 native field를 사용한다. 의미 없이 placeholder를 넣지 않는다.
- `Linked pull requests`: 구현 PR이 존재하면 GitHub native Development relation을 우선한다. historical relation을 connector 제약 때문에 복구할 수 없으면 Issue/PR Evidence 링크로 사실을 보존하고 임의 metadata를 만들지 않는다.
- Labels, Milestone, Parent/Sub-issues 등 optional native field는 실제 의미가 있을 때만 채운다.

자동화는 확실한 invariant만 materialize한다. historical Iteration, Work Type, Assignee처럼 문맥 해석이 필요한 값은 현재 Project state와 Evidence를 확인해 보정한다.

<!-- END SOURCE: docs/fields.md -->


---

<!-- BEGIN SOURCE: docs/git-workflow.md -->

# Git Workflow

Publishing Platform repository가 공유하는 **변경 관리 invariant**의 단일 원본이다. 기본 source integration model은 Trunk-Based Development (`docs/trunk-based-development.md`)다. 구체적인 runner 선택, CI matrix, release trigger와 repository-specific exception은 owning repository가 정의한다.

## 공통 통합 원칙

- canonical trunk는 기본적으로 `main`이다.
- 장기 `develop` 또는 shared development/integration branch를 정상 개발 경로로 두지 않는다.
- 실제 변경은 `main`에서 만든 short-lived change branch에서 수행하고 `X -> main` PR로 통합한다.
- agent 작업은 별도 branch에서 격리하고, PR validation과 사용자 review/approval을 거쳐 trunk에 반영한다.
- 한 Issue가 여러 branch/PR로 분해될 수 있다. Outcome 전체가 끝날 때까지 branch 하나를 유지하는 것보다 작은 integration batch를 우선한다.
- merge 후 change branch는 삭제한다.
- merge method는 공통으로 하나를 강제하지 않는다. 최종 diff와 history의 검토 가치에 따라 owning repository 또는 해당 PR에서 선택한다.

문서를 수정했다고 실제 branch protection, workflow, repository setting까지 변경된 것으로 간주하지 않는다. 현재 동작은 owning repository의 live workflow/settings를 확인한다.

## Issue branch와 PR

Issue lifecycle은 Planning Model (`docs/planning-model.md`), 공통 activation semantics와 Project 연결은 Project Orchestration (`docs/project-orchestration.md`)이 소유한다.

PR은 trunk에 들어갈 하나의 reviewable change를 표현한다.

- PR의 fast remote validation은 merge gate다.
- 가능한 경우 self-hosted runner와 aggressive concurrency/caching을 사용해 feedback latency를 낮춘다.
- merge gate가 성공하기 전에는 merge하지 않는다.
- agent 변경은 사용자의 review/approval을 거친 뒤 merge한다.
- branch naming, branch creation mechanism, required status check의 실제 enforcement는 owning repository가 소유한다.

PR에는 결과와 변경 이유, 관련 Issue, 실제 수행한 검증과 남은 제한을 적는다. merge 완료 전에는 완료된 integration으로 보고하지 않는다.

## 검증과 runner

- PR validation은 빠른 pre-integration confidence를 제공한다. platform 폭은 좁힐 수 있지만 merge safety를 판단할 수 있는 충분한 검증 깊이를 유지한다.
- `main` push는 repository가 지원하는 주요 OS/platform에 대해 full validation을 수행한다.
- formatting, static checks, tests, build, artifact verification, cross-platform matrix는 실제 repository 책임과 failure risk에 따라 선택한다.
- runner 선택은 security, cost, platform dependency, local capability를 고려한다.
- 동일 PR의 오래된 run은 새 commit으로 대체되면 취소할 수 있다.
- `main` validation이 실패하면 새 feature integration보다 fix-forward 또는 revert를 통한 trunk 복구를 우선한다.
- 완료 Evidence는 문서에 적힌 기대가 아니라 실제 owning repository workflow run과 결과를 기준으로 한다.

## 긴 변경과 release

- short-lived branch 안에 끝나지 않는 변경은 먼저 더 작은 integration slice로 나눈다.
- slicing만으로 해결하기 어려운 장기 교체에는 Feature Flag 또는 Branch by Abstraction 같은 TBD 기법을 제한적으로 고려한다.
- release source는 가능한 한 검증된 trunk revision/tag를 사용한다.
- release branch가 필요한 경우 필요 시점에 만들고 일반 development branch로 사용하지 않는다.

구체적인 코드 격리 방식과 release/deployment gate는 Trunk-Based Development (`docs/trunk-based-development.md`)의 공통 원칙 안에서 owning repository가 정의한다.

## History와 archive

- Git branch를 장기 지식 archive로 사용하지 않는다.
- merge된 short-lived branch는 삭제한다.
- 과거 맥락은 Git history, immutable commit/permalink, 필요한 migration 문서와 revision-bound Evidence에서 추적한다.
- legacy/archive/backup branch는 현재 운영 경로가 아니며, 지속 가치가 canonical 문서와 Git history에 흡수되면 제거한다.
- forensic 재현을 위해 특정 ref를 고정할 필요가 있으면 owning repository가 명시적인 tag 또는 immutable Evidence를 선택할 수 있다.

## 정책 적용 범위

Knowledge는 공통 TBD/Git invariant만 소유한다. 다음은 owning repository가 구체화한다.

- branch naming convention과 branch creation mechanism
- required checks와 enforcement 방식
- runner 종류와 label
- CI job 구성과 OS matrix
- Feature Flag/abstraction의 실제 구현
- release/tag/deploy trigger
- repository-specific hotfix/backport 경로
- TBD 예외가 필요한 경우 그 이유와 종료 조건

공통 정책과 repository-local 운영이 충돌하면 먼저 migration 중인 일시적 drift인지 실제 repository 역할상 필요한 예외인지 구분한다.

<!-- END SOURCE: docs/git-workflow.md -->


---

<!-- BEGIN SOURCE: docs/trunk-based-development.md -->

# Trunk-Based Development

Publishing Platform의 기본 source integration model은 **Trunk-Based Development (TBD)** 다.

TBD는 하나의 trunk를 중심으로 개발하고, 다른 장기 development branch를 만들려는 압력에 저항하는 branching model이다. 이 프로젝트에서는 Git의 `main`을 trunk로 사용한다.

이 문서는 [Trunk Based Development](https://trunkbaseddevelopment.com/)의 원칙을 기준으로, Publishing Platform에 필요한 adaptation만 정의한다. Project lifecycle, 현재 migration 상태, repository별 workflow 파일과 CI 구현은 각 owning source가 소유한다.

## One trunk

- `main`은 repository의 canonical trunk다.
- `develop` 같은 장기 shared development/integration branch를 정상 개발 경로로 두지 않는다.
- release 또는 migration 때문에 별도 장기 branch가 필요한 경우에는 repository-local 예외로 다루고 목적과 종료 조건을 명시한다.
- branch 이름만 `main`으로 바꾸는 것으로 TBD가 되지는 않는다. 중요한 것은 trunk와 미통합 작업 사이의 거리를 작게 유지하는 것이다.

## Short-lived change branches

Publishing Platform은 agent 작업의 격리와 사용자 review를 위해 **short-lived change branch + PR** 방식을 사용한다.

- 실제 변경은 `main`에서 별도 branch X를 만든 뒤 `X -> main` PR로 통합한다.
- agent는 `main`에 직접 작업하지 않는다.
- PR은 사용자가 diff와 Evidence를 검토하고 승인할 수 있는 안전 경계다.
- merge 후 change branch는 삭제한다.
- branch는 하나의 developer/agent 작업 경계다. 여러 작업자가 part-complete branch를 shared integration branch처럼 사용하지 않는다.

Issue와 branch는 1:1 관계가 아니다. 하나의 Issue가 여러 개의 독립적인 short-lived branch/PR로 나뉠 수 있다. 큰 Outcome을 branch 하나에 오래 보관하는 것보다, 각 조각을 안전하게 trunk에 통합하는 것을 우선한다.

[Short-Lived Feature Branches](https://trunkbaseddevelopment.com/short-lived-feature-branches/)의 핵심처럼, branch가 여러 날 유지되기 시작하면 이름이나 중간 integration branch를 추가하기보다 작업을 더 작게 나눌 수 있는지 먼저 재검토한다.

## Frequent integration and small batches

작업은 가능한 한 자주 trunk에 통합할 수 있는 크기로 나눈다.

좋은 integration slice는 다음 속성을 가진다.

- trunk의 기존 동작을 깨뜨리지 않는다.
- 필요한 검증을 독립적으로 통과할 수 있다.
- 이후 작업이 취소되어도 이미 통합된 상태가 유효하다.
- 다른 part-complete branch와의 중간 merge를 필요로 하지 않는다.

한 Issue 안에서도 refactor, abstraction 도입, 기능 구현, cleanup을 각각 별도 PR로 통합할 수 있다. PR 수를 줄이는 것보다 integration distance를 줄이는 것이 우선이다.

## PR merge gate

`X -> main` PR의 fast remote validation은 **merge gate**다.

- 가능한 경우 self-hosted runner를 사용한다.
- 동일 PR/branch의 오래된 validation은 aggressive concurrency policy로 취소할 수 있다.
- cache와 병렬화를 활용해 feedback latency를 낮춘다.
- platform coverage는 좁힐 수 있지만, merge safety를 판단할 수 있을 정도의 lint/typecheck/test/build 및 필요한 contract/artifact validation은 수행한다.
- merge gate가 성공하기 전에는 merge하지 않는다.
- 기술적으로 required status check를 강제할 수 있는 환경에서는 GitHub branch protection/ruleset으로 이를 enforce한다. 그렇지 않은 경우에도 동일 규칙을 workflow policy로 지킨다.
- agent가 만든 변경은 검증 성공 후 사용자 review와 approval을 거쳐 merge한다.

PR validation의 목적은 release 전체를 재현하는 것이 아니라 **빠른 pre-integration confidence**를 제공하는 것이다.

## Trunk validation and health

`main` push는 canonical state에 대한 **full validation**을 수행한다.

- repository가 지원하는 주요 OS/platform runner에서 full validation을 수행한다.
- portability, artifact, delivery 등 repository 책임에 필요한 검증을 포함한다.
- 현재 단계에서 모든 `main` commit이 즉시 production release 가능하다고 가정하지 않는다. 최소 invariant는 canonical validation을 만족하는 건강한 integration state를 유지하는 것이다.

`main` validation이 실패하면 새 feature integration보다 trunk 복구를 우선한다. 상황에 따라 fix-forward 또는 revert를 선택하며, trunk가 다시 green이 된 뒤 정상 integration을 계속한다.

이 구분은 의도적이다.

```text
PR -> main
  fast self-hosted validation
  + user review / approval
          ↓
        merge
          ↓
main push
  full multi-platform validation
```

## Longer-running changes

short-lived branch 안에서 안전하게 끝나지 않을 정도로 큰 변경은 먼저 **더 작은 integration slice**로 나눈다.

slicing만으로 해결하기 어려운 장기 교체나 disruptive migration에는 TBD가 제시하는 다음 기법을 제한적으로 사용할 수 있다.

- [Branch by Abstraction](https://trunkbaseddevelopment.com/branch-by-abstraction/)
- [Feature Flags](https://trunkbaseddevelopment.com/feature-flags/)

이 기법들은 일상적인 모든 변경의 기본값이 아니다. 목적은 long-lived feature branch를 만드는 대신, part-complete 상태에서도 trunk를 깨뜨리지 않도록 변경을 점진적으로 통합하는 것이다.

temporary abstraction이나 flag는 migration이 끝난 뒤 정리한다. 구체적인 구현 방식과 test strategy는 owning repository가 정의한다.

## Release

높은 release cadence에서는 [Release from Trunk](https://trunkbaseddevelopment.com/release-from-trunk/)를 기본 방향으로 삼는다.

- release source는 가능한 한 검증된 trunk revision 또는 tag다.
- release branch가 필요하다면 미리 장기 유지하지 않고 필요 시 trunk revision에서 만든다.
- release line의 fix는 가능한 한 trunk에서 먼저 수정한 뒤 필요한 release branch로 backport한다.
- release/deployment 필요 때문에 장기 development branch를 다시 만들지 않는다.

현재 repository별 release readiness와 deployment gate는 owning repository의 실제 workflow와 Evidence로 판단한다. TBD 문서가 존재한다는 사실만으로 Continuous Delivery가 완성되었다고 간주하지 않는다.

## Project adaptation summary

Publishing Platform에서 TBD는 다음 형태로 적용한다.

```text
Issue / task
    ↓
short-lived branch X from main
    ↓
agent implementation + local checks
    ↓
X -> main PR
    ↓
fast self-hosted merge gate
    ↓
user review / approval
    ↓
merge
    ↓
main full multi-platform validation
```

한 Issue가 여러 branch/PR을 가질 수 있다. 긴 작업은 branch 수명을 늘리기보다 integration slice를 작게 만드는 방향을 우선한다.

## References

- [Trunk Based Development — Introduction](https://trunkbaseddevelopment.com/)
- [Five-minute overview](https://trunkbaseddevelopment.com/5-min-overview/)
- [Styles and Trade-offs](https://trunkbaseddevelopment.com/styles/)
- [Short-Lived Feature Branches](https://trunkbaseddevelopment.com/short-lived-feature-branches/)
- [Branch by Abstraction](https://trunkbaseddevelopment.com/branch-by-abstraction/)
- [Feature Flags](https://trunkbaseddevelopment.com/feature-flags/)
- [Release from Trunk](https://trunkbaseddevelopment.com/release-from-trunk/)

<!-- END SOURCE: docs/trunk-based-development.md -->


---

<!-- BEGIN SOURCE: docs/project-orchestration.md -->

# Project Orchestration

Publishing Platform Project #11과 repository Issue 사이의 **공통 coordination semantics**를 소유한다. 실제 workflow 파일, script, token/permission, runner, webhook process, branch base와 같은 실행 세부사항은 이를 구현하는 owning repository가 소유한다.

## Scope

- Repository Issue가 활성화되면 Project #11의 실행 상태와 연결될 수 있다.
- activation 이후의 current state는 GitHub Project fields와 repository-native Issue/PR relation이 소유한다.
- Docs처럼 Issue-driven implementation repository가 아닌 저장소는 동일한 orchestration을 강제하지 않는다.
- 공통 branch/PR/change-management invariant는 Git Workflow (`docs/git-workflow.md`)를 따른다.

## Issue activation semantics

활성 Repository Issue는 다음 초기화를 요청할 수 있다.

1. Project #11 Item 등록
2. 초기 `Status / Iteration / Work Type` materialization

Issue activation 자체는 Development relation을 만들지 않는다. Development branch/PR은 planning activation이 아니라 실제 작업 시작을 표현한다.

activation mechanism은 repository별 automation이 구현한다. Knowledge는 event 이름, workflow filename, runner, API 호출 방식이나 token 구성을 규정하지 않는다.

Draft 또는 아직 실행 범위가 확정되지 않은 Item은 Planning Model (`docs/planning-model.md`)의 lifecycle을 따른다. 활성화되지 않은 Draft 때문에 implementation branch를 만들지 않는다.

## Project seed

Repository Issue는 activation 초기값을 전달하기 위해 machine-readable `project-seed`를 사용할 수 있다.

```md
<!-- project-seed
{
  "iteration": null,
  "workType": "Feature",
  "status": "Backlog"
}
-->
```

지원되는 공통 의미:

- `status`: activation 시 요청할 초기 Project Status
- `iteration`: 초기 Iteration. 아직 commitment가 아니면 `null`
- `workType`: Issue Outcome의 Work Type
- `development: false`: branch가 필요하지 않은 coordination/document-only work임을 명시
- `branch`: 특정 repository implementation이 explicit override를 지원할 때 사용할 수 있는 optional hint

`project-seed`는 초기화 요청일 뿐이다. activation 이후 Project field가 current state의 source of truth이며, seed를 장기 상태 원장으로 사용하지 않는다.

seed 값은 Planning Model (`docs/planning-model.md`)과 Work Classification (`docs/work-classification.md`)을 위반하지 않아야 한다. 예를 들어 Iteration commitment가 없는 작업은 일반적으로 `Backlog`이며, `Todo`는 실제 Iteration commitment가 있는 상태다.

## Development relation

Development relation은 **실제 작업 시작의 signal**이다.

- `Backlog`: Iteration commitment와 Development branch/linked PR이 없다.
- `Todo`: Iteration commitment는 있지만 Development branch/linked PR은 아직 없다.
- Development branch를 생성·연결하면 `In progress`로 전환한다.
- linked PR이 등록되면 branch 생성 경로와 무관하게 `In progress`로 전환한다.
- branch/PR 없이 수행하는 작업은 실행 전에 최소한 Iteration commitment와 `Todo` 상태를 가져야 한다.
- Development relation이 생겼는데 Iteration이 없다면 automation이 임의의 Iteration을 추론하지 않는다. 불일치로 드러내고 commitment를 먼저 정한다.
- 실제 branch 이름, base branch, 생성 API, branch protection과 Status mutation 구현은 owning repository가 소유한다.
- 이미 존재하는 branch와 Issue relation이 불일치하면 automation이 임의로 추론해 연결하지 않고 repository-local recovery 절차를 따른다.

## Lifecycle reconciliation

Status의 의미와 canonical lifecycle은 Planning Model (`docs/planning-model.md`)이 소유한다. orchestration automation은 그 의미를 materialize할 뿐 두 번째 lifecycle 원본이 아니다.

공통적으로 자동화할 수 있는 것은 명확한 invariant에 한정한다.

- active candidate가 Iteration commitment를 얻으면 `Todo`로 진행할 수 있다.
- Development branch 생성 또는 linked PR 등록은 `In progress`를 의미한다.
- `Todo / In progress` 상태에서 commitment가 제거되면 실행 상태와 Development relation을 함께 재검토한다. active Development relation이 있는 상태를 자동으로 `Backlog`로 낮추지 않는다.
- `closed / completed` 결과는 `Done`과 연결할 수 있다.
- `closed / not_planned` 또는 명확한 cancellation 결과는 `Cancelled`와 연결할 수 있다.

Work Type, Assignee, historical Iteration처럼 해석이 필요한 값은 자동화가 임의로 추론하지 않는다. unknown state나 concurrent change를 발견하면 덮어쓰기보다 실패/검토 대상으로 남긴다.

## Ownership boundary

| Concern | Owner |
|---|---|
| Status/Iteration/Work Type 의미와 DoD | Planning Model (`docs/planning-model.md`), Work Classification (`docs/work-classification.md`) |
| activation 및 reconciliation의 공통 의미 | 이 문서 |
| 실제 Project field 값 | GitHub Project #11 |
| Issue/PR/Development relation | GitHub repository native state |
| workflow/script/API/token/runner 구현 | 실행하는 owning repository |
| 장기 webhook/runtime implementation | 해당 implementation repository의 code/docs |

공통 구현 상세를 Knowledge에 복제하지 않는다. 여러 repository에서 반복되는 실행 차이가 실제 coordination invariant로 승격될 때만 이 문서를 확장한다.

<!-- END SOURCE: docs/project-orchestration.md -->


---

<!-- BEGIN SOURCE: docs/release-1.0.md -->

# Publishing Platform 1.0

Knowledge가 소유하는 통합 제품 목표와 수용 기준이다. 기술 선택·schema·component catalog·명령·runtime 구성은 책임 repository의 code/docs가 소유한다.

## Release Goal

Deliver a usable workflow for authoring Git-backed md-like content and publishing a verified canonical revision to a live site.

## Product Boundary

| Capability | 요구되는 관찰 가능한 결과 | 상세 원본 |
|---|---|---|
| Authoring | frontmatter를 포함한 md-like document를 호환되는 authoring tool로 작성·수정하고 source 의미를 보존할 수 있다. 특정 editor 종류는 acceptance가 아니다. | Architecture (`docs/architecture.md`) |
| Canonical Content | 사용자가 작성하거나 선택한 도구로 수정한 source를 Git commit으로 공유·재현 가능한 revision으로 식별한다. | Architecture (`docs/architecture.md`) |
| Extensibility | 실제 Site implementation/package가 지원하는 콘텐츠 표현을 동일 codebase와 검증으로 확장할 수 있다. | [Site 소비 계약](https://github.com/ooMia/oomia.github.io/blob/develop/docs/content-consumption-contract.md) |
| Automation | 최소 하나의 automated 또는 agent-assisted workflow가 validation, Git revision finalization, publish 또는 delivery process에 참여한다. | 책임 구현 Issue/Evidence |
| Publishing | canonical revision이 실제 Site consumer 검증을 통과하고 발행 입력과 결과의 관계를 재현할 수 있다. | [Site 소비 계약](https://github.com/ooMia/oomia.github.io/blob/develop/docs/content-consumption-contract.md#publishing) |
| Presentation | Site가 해당 콘텐츠 revision을 사용자에게 렌더링한다. | Site code/tests |
| Delivery | Docs revision과 Site revision이 연결되어 GitHub Pages에 배포되고 성공 Evidence가 남는다. | Implementation Map (`docs/implementation-map.md`) |

사용자 작성 콘텐츠의 commit·Site 소비는 Engine 사용과 독립적이다. editor 종류, component manifest, package layout은 release-level 필수 정책이 아니다.

## 명시적 제외 범위

- production-grade multi-user CMS, RBAC, transactional collaborative editing
- advanced agent orchestration

그 밖의 구현 범위는 owner repository가 실제 필요와 Evidence로 결정한다.

## 검증

각 capability의 요구 결과를 책임 repository의 재현 가능한 Evidence와 연결한다. 문서나 planning schema가 구현 완료 Evidence를 대신하지 않는다.

Implementation Map (`docs/implementation-map.md`)은 기준 revision과 capability별 검수 연결을 소유한다. 실제 final release gate의 남은 결정은 Q003으로 추적한다.

<!-- END SOURCE: docs/release-1.0.md -->


---

<!-- BEGIN SOURCE: docs/implementation-map.md -->

# Implementation Map

Publishing Platform 1.0의 **현재 검증 snapshot**과 cross-repository Evidence 연결을 소유한다. live branch 상태나 작업 로그를 복제하지 않으며, 판정은 아래에 고정한 revision/Evidence 범위에서만 유효하다.

새 Evidence가 기존 판정을 대체할 만큼 충분하면 날짜별 checkpoint를 추가하지 않고 이 snapshot의 기준 revision과 capability 판정을 갱신한다. 과거 판정은 Git history와 연결된 Issue/PR/run Evidence에서 추적한다.

## 현재 검증 범위

| 역할 | Repository / revision | 검증 의미 |
|---|---|---|
| canonical content | [`ooMia/oomia.github.io.docs@c5826802`](https://github.com/ooMia/oomia.github.io.docs/commit/c5826802be296f4ad84193119729be77a2d52c3c) | 현재 article corpus layout을 Site가 직접 소비한 canonical Docs revision |
| Site direct consumption | [`ooMia/oomia.github.io@f50ba57b`](https://github.com/ooMia/oomia.github.io/commit/f50ba57b9d1e270b286794cb9a7998f7df780648) | Site #12 / PR #13에서 canonical Docs Article corpus 직접 소비 |
| Site release boundary | [`ooMia/oomia.github.io@6d8cc03f`](https://github.com/ooMia/oomia.github.io/commit/6d8cc03f2f28df28e31a97a38b31b06fd8148b25) | Site #14 / PR #15의 release-only live mutation boundary |
| Engine optional mutation | [`ooMia/oomia.github.io.engine#23`](https://github.com/ooMia/oomia.github.io.engine/issues/23) / [PR #30](https://github.com/ooMia/oomia.github.io.engine/pull/30) | model-assisted metadata enrichment의 선택적 mutation Evidence |
| portable Engine artifact | [Engine PR #34](https://github.com/ooMia/oomia.github.io.engine/pull/34) / [run 36257543854](https://github.com/ooMia/oomia.github.io.engine/actions/runs/36257543854) | portable CLI artifact verification |
| Docs trusted consumer | [Docs run 36260957694](https://github.com/ooMia/oomia.github.io.docs/actions/runs/36260957694) | Engine artifact를 사용한 Docs-side trusted workflow Evidence |

Site build/render Evidence는 [run 36406348962](https://github.com/ooMia/oomia.github.io/actions/runs/36406348962)에서 canonical Docs revision으로 11 Article pages가 생성된 것으로 연결된다. release-only gate 이후 PR 검증은 [run 36418285983](https://github.com/ooMia/oomia.github.io/actions/runs/36418285983)에서 `build=success`, `deploy=skipped`로 확인됐다.

위 Evidence는 Phase B의 direct Docs consumption과 integration-level release boundary를 검증하지만 **최종 1.0 release Evidence는 아니다.** 최종 gate는 Site `develop → main` promotion 후 새 `main` build/deploy에서 canonical Docs revision + Site revision + delivery result를 다시 연결해야 한다.

## Architecture transition

장기 제품 경계는 Architecture (`docs/architecture.md`), 전환 순서와 safety rule은 Architecture Transition (`docs/architecture-transition.md`), release acceptance는 Release 1.0 (`docs/release-1.0.md`)이 소유한다.

이 Map은 구현 순서·package 구조·workflow 운영을 별도로 정의하지 않는다. 각 capability의 **검증된 결과와 남은 release gap**만 연결한다.

## 1.0 capability 상태

상태는 **미검증 / 미충족 / 부분 충족 / 충족**만 사용한다.

| Capability | 현재 판정 | 검증된 Evidence | 다음 통합 검수 |
|---|---|---|---|
| Authoring | **미충족** | legacy Payload visual authoring Evidence는 있으나 현재 Git-backed md-like source를 호환 authoring tool로 수정·보존하는 target Evidence로 재검증되지 않았다. | 실제 canonical source 수정·보존 → Site 소비 Evidence |
| Canonical Content | **부분 충족** | Docs Git revision이 canonical corpus를 식별하고 Site가 `c5826802` corpus를 직접 소비했다. 선택적 Engine enrichment도 Docs-side workflow에서 검증됐다. | 현재 authoring/source-preservation path와 final release revision 연결 |
| Extensibility | **부분 충족** | 과거 custom component opt-in Evidence는 존재하나 현재 Site/package source of truth 기준의 end-to-end authoring/consumer Evidence는 아직 release snapshot에 연결되지 않았다. | 실제 component implementation/package + consumer + 필요한 authoring integration Evidence |
| Automation | **부분 충족** | Engine enrichment, portable CLI artifact, Docs trusted consumer workflow가 실제 자동화 경로로 검증됐다. | 현재 publishing/delivery path에 필요한 automation Evidence를 final release revision에 연결 |
| Publishing | **부분 충족** | canonical Docs revision → Site direct consumption/build/render는 검증됐다. release-only live mutation boundary도 integration state에서 검증됐다. | Site `main` promotion 후 canonical Docs SHA + Site SHA + deploy result 연결 |
| Presentation | **충족** | Site run 36406348962에서 canonical corpus로 11 Article pages build/render 성공. | final release revision에서 재확인 |
| Delivery | **부분 충족** | 과거 live delivery Evidence는 있으나 현재 Git-backed target의 release-only gate 이후 새 `main` deploy Evidence는 아직 없다. | Site `develop → main` 후 새 GitHub Pages delivery Evidence |

## 다음 release gap

현재 Map에서 가장 중요한 통합 gap은 하나다.

```text
canonical Docs revision
        ↓
Site develop → main promotion
        ↓
new main build/render
        ↓
GitHub Pages delivery
        ↓
Docs SHA + Site SHA + delivery result 연결
```

이 Evidence가 확보되면 Publishing / Presentation / Delivery 판정을 새 release snapshot으로 다시 평가한다. 별도 checkpoint section을 추가하지 않는다.

## 갱신 규칙

- 이 문서는 **한 개의 현재 검증 snapshot**만 유지한다.
- 판정은 명시된 revision과 immutable Evidence에만 적용한다.
- 새 Evidence가 생겼다고 즉시 로그를 추가하지 않는다. capability 판정을 바꿀 만큼 충분할 때 revision/Evidence/판정을 함께 갱신한다.
- historical snapshot과 판정 변화는 Git history에서 추적한다.
- live Project/Issue/PR status는 이 문서에 복제하지 않는다.
- 문서 정리만으로 runtime/build/deployment 완료를 판정하지 않는다.

<!-- END SOURCE: docs/implementation-map.md -->


---

<!-- BEGIN SOURCE: docs/operating-rhythm.md -->

# Operating Rhythm

## 목표와 리듬

Publishing Platform 완성과 계획·실행 습관을 중심에 둔다. 앰버서더 활동과 포트폴리오 개발의 기록을 하나의 흐름으로 연결한다.

- 매주 작은 발표, 매 4주 큰 발표 또는 working system review를 기본 cadence로 둔다.
- Daily는 짧은 Evidence capture에 집중하고, 주말 review에서 한 주의 결과를 재구성한다.
- Daily 기록은 비공개 작업 기록으로 두고, 공개할 가치가 있는 결과는 주간 review에서 별도 산출물로 만든다.

## Evidence → Story

매일 목표, 실제 결과, screenshot/GIF/video/voice/commit 등 Evidence, 배운 점, 다음 행동을 남긴다. Evidence는 나중에 다시 열 수 있는 durable link나 immutable revision에 연결한다.

주말에는 일별 기록을 목표 → 시도 → 장애·판단 → 결과 → 다음 행동의 A-Z 스토리로 재구성한다. Agent/LilysAI는 정리 부담을 낮추는 도구이며 모든 개발을 Agent가 수행한다고 가정하지 않는다. 공개 결과물은 발표·블로그 등 목적에 맞는 채널로 발행하되, 특정 플랫폼 선택을 이 공통 리듬의 정책으로 고정하지 않는다.

## 기능 실험 참조

기능 실험의 활성/폐기 상태와 AC는 책임 구현 repository의 live Issue/Project에서 관리한다. 완료되거나 `not_planned`로 종료된 실험 목록을 이 문서에 별도 catalog로 복제하지 않는다.

현재 반복 가능한 automation Evidence가 필요하면 Engine/Docs의 최신 Issue·PR·workflow run을 직접 확인한다. 이 문서는 활동 리듬과 Evidence → Story 원칙만 유지한다.

자료 수집 → 요약·통합 → 발표/글 초안 → 플랫폼 발행의 흐름에서 실제 정리 부담이 큰 단계를 선택해 활용한다.

<!-- END SOURCE: docs/operating-rhythm.md -->


---

<!-- BEGIN SOURCE: docs/open-questions.md -->

# Open Questions / Verification Gaps

현재 canonical 정책에서 **제품 경계·release acceptance·공통 Project 운영 수준에서 실제 결정이 필요한 항목**만 유지한다. 구현 repository가 code로 결정할 수 있는 세부사항은 이 목록에 올리지 않는다.

| ID | 항목 | 현재 처리 |
|---|---|---|
| Q003 | 1.0 final release gate | Site `develop → main` promotion 후 새 main build/deploy에서 canonical Docs revision + Site revision + delivery result를 연결해 확정 |
| Q010 | 미디어 공개 범위·asset 저장 정책 | public/private와 large/binary policy가 제품 운영에 필요해질 때 결정 |
| Q014 | raw HTML 및 executable MDX public publish policy | public publish security boundary가 필요해질 때 결정 |
| Q025 | stable document identity / sidecar linkage | path-independent identity가 제품 수준 요구가 될 때 결정 |
| Q026 | Wiki / public reference graph layer | 불변에 가까운 공개 설명을 GitHub Wiki 등으로 분리할 가치가 생기면 source/docs와의 ownership·linking·local clone 정책을 결정 |

## Knowledge-level Open Question이 아닌 것

다음은 책임 구현 repository와 code가 결정한다.

- Obsidian/Fumadocs/기타 editor 중 어떤 구현을 사용하는지
- editor를 Site 내부 app으로 둘지 별도 app으로 둘지
- docs layout / consumer discovery convention
- 지원 component 종류·props·children model
- component manifest/catalog 존재 여부와 editor adapter 형식
- Site의 Astro/Fumadocs integration 방식과 Turbo retirement
- Engine container/runtime, workspace mount, Git credential 방식
- metadata field 추가 시점, timestamp 계산, prepare input surface, formatting/normalization
- 구현 package/module boundary와 내부 API

여러 repository가 같은 component를 사용해야 하면 가능한 한 동일 package/codebase를 소비한다. editor integration이 별도 형식의 metadata를 요구해도 그 adapter는 owning implementation에서 관리하며 Knowledge가 별도 semantics 원본을 만들지 않는다.

구현 과정에서 반복되는 제약이 실제 제품 또는 cross-repository coordination 문제로 승격될 때만 새 Knowledge decision을 만든다.

<!-- END SOURCE: docs/open-questions.md -->
