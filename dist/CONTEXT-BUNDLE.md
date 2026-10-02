# Publishing Platform — Chat Context Bundle

GENERATED FILE — 원본은 각 문서 경계에 적힌 경로입니다. 직접 수정하지 마세요.
Implementation Map은 문서에 적힌 repository revision의 검증 스냅샷이며 live Project 상태가 아닙니다.
상대 링크는 원본 레포 기준입니다. 템플릿은 별도로 참조합니다. 과거 변경 근거는 Git history와 연결된 immutable Evidence에서 추적합니다.


---

<!-- BEGIN SOURCE: CONTEXT.md -->

# Context entry point

Knowledge는 Publishing Platform의 **PM/coordination layer**이며, 이 문서는 Agent/Chat 작업의 **canonical entry point**다. 먼저 현재 작업 유형을 식별하고 아래 routing에서 필요한 최소 원본만 읽는다. 구현 상세는 책임 repository의 문서와 코드가 소유한다.

작업을 이어받을 때는 이 문서에서 필요한 원본을 확인한 뒤 **live GitHub Project #11과 관련 Issue/PR를 조회해 현재 실행 상태를 복구한다.** 세션별 handoff 문서를 별도 상태 원장으로 유지하지 않는다.

## 자주 하는 작업

| 작업 | 참조 순서 |
|---|---|
| Issue 생성·수정·활성화 | Issue 형식 (`templates/repository-issue.md`) → Work Type·Labels (`docs/work-classification.md`) → lifecycle·DoD (`docs/planning-model.md`) → activation·Project seed (`docs/project-orchestration.md`) |
| 작업 branch 시작 | Git Workflow (`docs/git-workflow.md`) → Development relation (`docs/project-orchestration.md`) → 해당 Issue와 owning repository 운영 |
| PR 작성·검토·통합 | Git Workflow (`docs/git-workflow.md`) → 완료·Evidence (`docs/planning-model.md`) → 해당 Issue 및 구현 레포의 검증 방법 |
| major/minor release | Git Workflow (`docs/git-workflow.md`) → 통합 목표 (`docs/release-1.0.md`) → 검수 연결 (`docs/implementation-map.md`) |
| 새 레포 scaffolding·디렉토리 역할 | Repository Design (`docs/repository-design.md`) → Node/JS/TS 또는 Python이면 Development Toolchain (`docs/development-toolchain.md`) |
| 기술 설계·구현 조사 | 아래 레포별 참조 → 해당 레포 `/docs/`와 코드·Issue·tests |
| Knowledge 문서 수정 | 소유권 (`docs/repository-design.md`) → 해당 원본 → CONTRIBUTING (`CONTRIBUTING.md`) |
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
- Current Decisions (`docs/decisions.md`): 원본 탐색 인덱스
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

상태: 2026-09-21 project-wide engineering policy.

이 문서는 Publishing Platform repository의 **개발 도구에 대한 project-wide 기본값**을 소유한다. 정확한 runtime/tool version, framework command, CI job 구성과 repository-specific 예외는 각 owning repository가 소유한다.

핵심 원칙:

- **Node.js / JavaScript / TypeScript:** Vite+의 `vp`를 runtime, package management, static checks, tests, builds, workspace task orchestration, staged checks의 기본 진입점으로 사용한다. Vite+가 이미 제공하는 기능을 위해 같은 역할의 wrapper/tool을 추가하지 않는다.
- **Python:** `uv`를 project/dependency/environment/lock/run 관리의 기본 진입점으로 사용한다. 동일 역할을 위해 pip/Poetry/Pipenv 등을 중복 표준으로 두지 않는다.

repository가 다른 도구를 사용해야 한다면 실제 기술적 필요와 차이를 해당 repository code/docs에서 설명한다.

Vite+ official documentation:
- https://viteplus.dev/guide/
- https://viteplus.dev/guide/monorepo
- https://viteplus.dev/guide/run
- https://viteplus.dev/guide/env
- https://viteplus.dev/guide/commit-hooks
- https://viteplus.dev/guide/ci
- https://viteplus.dev/guide/docker

## 1. Command surface

### VP-first

가능하면 다음 명령을 직접 사용한다.

| 목적 | 표준 |
|---|---|
| environment 진단 | `vp env current`, `vp env doctor` |
| dependency install | `vp install` |
| dependency 추가/삭제 | `vp add`, `vp remove` |
| dependency 조사 | `vp why`, `vp info`, `vp outdated`, `vp list` |
| local binary | `vp exec` |
| one-shot package binary | `vp dlx` / `vpx` |
| static checks | `vp check` |
| formatting | `vp fmt` |
| lint | `vp lint` |
| Vitest | `vp test` |
| Vite app dev/build/preview | `vp dev`, `vp build`, `vp preview` |
| library/executable packaging | `vp pack` |
| repository task/script | `vp run <task>` / `vpr <task>` |
| staged checks | `vp staged` |

package-manager-specific 동작이 정말 필요할 때만 `vp pm <command>`을 escape hatch로 사용한다.

직접 `pnpm`, `npm`, `bun`, `yarn` 명령을 문서·스크립트·CI의 표준 interface로 만들지 않는다. 단, Vite+가 정상화하지 않는 package-manager-specific feature를 의도적으로 사용할 때는 예외를 허용한다.

### `vp <command>`와 `vp run <command>`을 혼동하지 않는다

Vite+ built-in command는 package script로 override되지 않는다.

예:

- `vp dev` → built-in Vite dev server
- `vp run dev` / `vpr dev` → package.json script 또는 Vite Task
- `vp build` → built-in Vite build
- `vp run build` → package-specific build script/task
- `vp test` → built-in Vitest
- `vp run test` → package-specific test script/task

따라서 Astro처럼 package script가 `astro dev` / `astro build`를 소유한다면 **`vpr dev` / `vpr build`**를 사용한다. bare `vp dev` / `vp build`가 framework script를 실행한다고 가정하지 않는다.

### `vpr`

`vpr`는 `vp run`의 공식 shorthand다.

프로젝트에서는 다음처럼 사용한다.

- 개발자가 반복적으로 실행하는 task: `vpr <task>`을 표준 shorthand로 허용한다.
- 설명 문서에서 task runner semantics를 처음 설명할 때는 `vp run`을 명시하고 이후 `vpr`를 사용할 수 있다.
- agent는 task 이름이 built-in과 충돌할 수 있으면 반드시 `vp run` / `vpr` 여부를 확인한다.

## 2. Runtime / package manager pinning

전역 VP 환경 관리와 repository reproducibility를 함께 사용한다.

- 개발자 machine에서는 Vite+ managed environment를 사용할 수 있다.
- 각 repository는 runtime과 package manager requirement를 repository 안에 선언한다.
- `vp env current` / `vp env doctor`가 실제 선택을 설명할 수 있어야 한다.
- CI와 Agent는 system Node/pnpm이 우연히 맞는다고 가정하지 않는다.

권장 우선순위:

1. Node 개발 runtime은 `.node-version` 또는 `devEngines.runtime`으로 명확하게 pin한다.
2. consumer support range가 필요하면 `engines.node`은 별도로 유지한다.
3. package manager는 가능한 한 top-level `packageManager`에 exact version을 pin한다.
4. `devEngines.packageManager`는 개발 환경 constraint 설명에 사용할 수 있다.
5. 두 declaration이 함께 있다면 서로 모순되지 않게 한다.

Vite+ global CLI가 project-local toolchain보다 새로울 수 있으므로 **global latest를 project behavior로 간주하지 않는다**.

## 3. Vite+ version policy

- `vite-plus` project dependency는 exact version을 사용한다.
- pnpm workspace에서는 root catalog에서 한 번만 pin하는 것을 기본으로 한다.
- Vite alias가 필요하면 Vite+가 요구하는 bundled core alias와 version을 함께 관리한다.
- toolchain version upgrade는 독립 Maintenance change로 수행한다.
- `vp migrate`를 일상적인 setup/repair command로 사용하지 않는다.

### `vp migrate` guard

`vp migrate`는 monorepo root의 dependency/config/catalog/lockfile/agent integration까지 변경할 수 있다. global VP가 더 최신이면 project Vite+를 그 버전으로 올릴 수도 있다.

따라서 Agent는 다음 경우에만 실행한다.

- Outcome이 Vite+ migration/upgrade 자체인 Issue
- 변경 전 Git 상태가 clean하거나 별도 branch에서 보존됨
- 변경 후 diff를 검토할 계획이 있음

단순 dependency install, lint 문제, PATH 문제를 해결하기 위해 `vp migrate`를 먼저 실행하지 않는다.

## 4. Root `vite.config.ts` ownership

Vite+ monorepo에서는 root `vite.config.ts`를 **toolchain policy의 단일 중심**으로 사용한다.

root가 우선 소유할 항목:

- `lint`
- `fmt`
- `check`
- `staged`
- shared `run.tasks`
- optional `create`
- shared cache policy

Vite+는 현재 nested lint/format config를 자동 적용하지 않으므로 package별 차이는 root의 `lint.overrides` / `fmt.overrides`로 표현한다.

package-level `vite.config.ts`는 다음과 같은 **실제 package/runtime config**를 소유할 수 있다.

- framework/Vite app config
- package-specific Vitest config
- package-specific build/pack config
- package runtime plugin

lint/fmt policy를 package마다 중복하지 않는다.

root config가 커지면 pure configuration object를 별도 file에서 import할 수 있지만, 모든 VP command가 config를 읽는다는 점을 고려해 top-level import에 side effect나 heavy plugin initialization을 넣지 않는다.

## 5. Task ownership

repository가 지저분해지는 가장 흔한 원인은 task가 여러 layer에 중복되는 것이다.

### package script가 적합한 경우

- package/framework가 고유 command를 요구함
- 예: `astro build`, custom Node service start
- task가 그 package의 public development interface임

### root Vite Task가 적합한 경우

- 여러 package를 orchestration함
- dependency ordering이 필요함
- cache/input/output/env contract가 필요함
- repository-wide verification/publishing/evidence workflow임

Vite Task는 workspace package의 실제 `dependencies` graph를 ordering에 사용한다. 별도의 가상 dependency graph를 만들지 않는다.

### naming

새 repository에서는 의미가 겹치는 alias를 늘리지 않는다.

권장 vocabulary:

- `check`: formatting + lint + type static gate
- `test`: automated behavior tests
- `build`: buildable artifact validation
- `verify`: repository-wide aggregate gate가 실제로 필요할 때만
- `publish`: external/repository state를 변경하는 explicit side-effect task
- `evidence`: verification result capture가 독립 outcome일 때

`ready`, `quality`, `validate`, `ci`, `check:all`처럼 같은 의미의 aggregate alias를 동시에 만들지 않는다.

## 6. Workspace task execution

표준 패턴:

- 현재 package: `vpr test`
- 모든 package: `vp run -r test`
- 특정 package: `vp run @scope/name#build`
- dependencies 포함: `vp run -t @scope/app#build`
- filter: `vp run --filter ./apps/engine test`
- package cwd에서 실행: `vp -C apps/engine <command>`

package를 실제 cwd처럼 취급해야 하면 positional Vite root 인자보다 `-C`를 우선한다.

## 7. Caching

cache는 **순수하거나 재현 가능한 task에 적극 사용**한다.

기본 cache 후보:

- compile/build
- unit test
- lint/static analysis
- deterministic code generation

기본 `cache: false` 후보:

- Git commit/push/tag
- publishing/deployment
- external service mutation
- interactive server
- environment setup
- credential-dependent state check
- Evidence가 현재 external state를 관찰해야 하는 task

Vite Task는 task config는 기본 cache 대상이고 package.json script는 기본적으로 cache되지 않는다.

cacheable task가 environment에 의존하면 `env`를 cache fingerprint에 명시한다. 단순 전달만 필요하고 output 의미를 바꾸지 않는 변수는 `untrackedEnv`를 검토한다.

CI에서 Vite Task cache 공유는 현재 experimental이므로, 먼저 local immediate second-run cache hit가 재현되는지 확인한 후 도입한다.

## 8. Static quality gate

`vp check`를 JavaScript/TypeScript static gate의 기본으로 사용한다.

root config에서 기본적으로:

- Oxfmt
- Oxlint
- type-aware lint
- type checking

을 함께 사용한다.

Vite+가 권장하는 `lint.options.typeAware: true`, `typeCheck: true`를 기본값으로 삼되 실제 TypeScript project structure가 호환되는지 검증한다.

Prettier/ESLint를 Vite+가 처리할 수 있는 영역에 병렬로 유지하지 않는다.

예외:

- Oxfmt가 지원하지 않는 plugin behavior가 실제 requirement일 때
- framework file support가 실제로 부족하다고 검증됐을 때

Oxfmt는 현재 Markdown/MDX를 포함한 다수 format을 지원한다. 별도 Prettier 사용은 “예전에 필요했다”가 아니라 **현재 gap**으로 증명한다.

## 9. Git hooks

새 repository에서는 Husky + lint-staged 대신 Vite+ native path를 기본으로 한다.

```text
.vite-hooks/pre-commit
  -> vp staged
```

`vite.config.ts`의 `staged` block이 staged checks를 소유한다.

- `vp hooks status`로 local clone 상태를 확인한다.
- `vp hooks enable` / `disable`로 dispatcher를 관리한다.
- generated dispatcher는 commit하지 않고 project-owned hook만 commit한다.
- automation/content commit처럼 hook을 의도적으로 건너뛰어야 할 때는 `VP_GIT_HOOKS=0`을 명시적으로 사용한다.

기존 Husky repository는 한 번에 강제 migration하지 않는다. parity를 검증한 뒤 기존 hook dependency/config를 제거한다.

## 10. Evidence output

재현 가능한 evidence/log 수집 task는 ANSI/color에 의존하지 않는다.

프로젝트 기존 정책대로 evidence collector/task 내부에서 `NO_COLOR=1`을 강제한다. Vite+도 `NO_COLOR`를 지원한다.

개발자의 일반 shell 전체에서 color를 끄는 것이 아니라 **evidence-producing boundary에서만** 적용한다.

## 11. CI

GitHub Actions에서는 Vite+ official `voidzero-dev/setup-vp`를 사용한다.

규칙:

- action version은 exact release 또는 commit SHA로 pin한다.
- obsolete floating `v1` tag를 사용하지 않는다.
- 별도 `setup-node` + pnpm setup + package cache chain이 필요하지 않으면 중복하지 않는다.
- install은 `vp install --frozen-lockfile`을 기본으로 한다.
- static gate는 `vp check`.
- package tests/build는 monorepo task ownership에 따라 `vp test` 또는 `vp run -r test/build`를 사용한다.

Vite Task result cache의 cross-run restore는 experimental이므로 correctness보다 먼저 최적화하지 않는다.

## 12. Container builds

Vite+ official image는 build/CI/devcontainer에 사용할 수 있지만 production runtime image로 사용하지 않는다.

runtime image를 제공하는 repository는 build toolchain과 production runtime surface를 분리한다. multi-stage build는 기본 후보이며, 실제 stage 구성·artifact·runtime dependency·mount/credential 계약은 해당 구현 repository가 소유한다.

Engine의 현재 container/runtime 설계는 [Engine 원본](https://github.com/ooMia/oomia.github.io.engine/blob/develop/docs/content-modification-contract.md)과 [migration record](https://github.com/ooMia/oomia.github.io.engine/blob/develop/docs/migration.md)를 참조한다.

## 13. IDE

VS Code 계열에서는 Vite+ / Oxc workspace integration을 우선한다.

- Oxc formatter/linter
- nested config disable
- format on save
- 필요하면 `npm.scriptRunner: "vp"`

목표는 CLI, editor, CI가 서로 다른 formatter/linter 설정을 읽지 않게 하는 것이다.

## 14. Agent instructions

Agent가 Vite+ repository를 다룰 때 최소한 다음을 알아야 한다.

1. `vp <built-in>`과 `vp run <script/task>`의 차이
2. 작업 시작 전 `vp install`
3. 환경 이상 시 `vp env doctor`
4. static gate는 `vp check`
5. package-specific 추가 gate는 `vp run` / `vpr`
6. direct package-manager/tool binary 호출보다 VP command surface 우선

Vite+의 `vp config`는 agent integration까지 변경할 수 있다. Publishing Platform은 Knowledge와 repository-specific Agent 지침을 별도로 관리하므로 단순 hook setup을 위해 agent file을 자동 수정하지 않는다.

필요하면:

```sh
vp config --no-agent
```

처럼 실행하고 agent integration 변경은 별도 diff로 검토한다.

## 15. Anti-patterns

새 구현에서 피한다.

- Vite+ + Turbo를 같은 역할의 root task runner로 중복 도입
- Vite+ hooks + Husky를 같은 pre-commit 경로에 중복 유지
- root lint/fmt와 package별 lint/fmt config drift
- 모든 command를 package.json wrapper script로 다시 감싸기
- `vp dev`가 package의 `dev` script라고 가정
- stateful publish/Git mutation task를 cache
- global latest Vite+ behavior에 기대고 project version을 pin하지 않기
- troubleshooting을 위해 무조건 `vp migrate` 실행
- repo-specific agent instructions를 `vp config`가 무검토로 덮어쓰게 두기
- Python project에서 `uv`와 pip/Poetry/Pipenv를 같은 책임의 기본 project manager로 병행

## 16. Python projects — uv first

Python repository 또는 Python application/package가 생기면 `uv`를 기본 project manager로 사용한다.

기본 원칙:

- project metadata와 dependency declaration은 `pyproject.toml`을 중심으로 관리한다.
- 재현 가능한 dependency state가 필요하면 `uv.lock`을 repository에 유지한다.
- dependency install/synchronization은 `uv sync`를 우선한다.
- dependency 추가·삭제는 `uv add` / `uv remove`를 우선한다.
- repository command와 tool 실행은 `uv run <command>`을 우선해 project environment를 명시적으로 사용한다.
- lock 갱신이 목적이면 `uv lock`을 사용한다.
- system Python 또는 전역 site-packages가 우연히 맞는다고 가정하지 않는다.
- Python runtime requirement와 exact version policy는 owning repository가 `pyproject.toml`, `.python-version` 등 실제 설정으로 선언한다.
- CI/Agent는 repository가 선언한 Python/uv 환경을 재현하고, 별도 package manager bootstrap을 중복 기본값으로 만들지 않는다.

`pip`, `pip-tools`, Poetry, Pipenv, Conda 등이 실제 runtime/distribution 제약 때문에 필요할 수는 있지만, 단순 선호나 기존 습관만으로 `uv`와 같은 책임을 중복 소유하게 하지 않는다. 예외가 필요하면 해당 repository가 이유와 검증 방법을 소유한다.

## 17. Current repository implications

공통 기준을 적용한 실제 구성은 각 레포의 문서와 설정이 소유한다. 현행 버전·명령·전환 상태를 이 공통 지침에 복제하지 않는다.

- Engine: [개발 명령과 버전](https://github.com/ooMia/oomia.github.io.engine/blob/develop/README.md#development), [독립 이력 전환](https://github.com/ooMia/oomia.github.io.engine/blob/develop/docs/migration.md). legacy의 `db:*` / `cms:*` task 설명을 현재 Engine 상태로 사용하지 않는다.
- Site: [consumer integration / Turbo 전환](https://github.com/ooMia/oomia.github.io/blob/develop/docs/content-consumption-contract.md#toolchain-전환).

## External references reviewed

- Vite+ Getting Started: https://viteplus.dev/guide/
- Vite+ Monorepo: https://viteplus.dev/guide/monorepo
- Vite+ Run: https://viteplus.dev/guide/run
- Vite+ Task Caching: https://viteplus.dev/guide/cache
- Vite+ Environment: https://viteplus.dev/guide/env
- Vite+ Package Management: https://viteplus.dev/guide/install
- Vite+ Check: https://viteplus.dev/guide/check
- Vite+ Commit Hooks: https://viteplus.dev/guide/commit-hooks
- Vite+ CI: https://viteplus.dev/guide/ci
- Vite+ Docker: https://viteplus.dev/guide/docker
- Vite+ IDE Integration: https://viteplus.dev/guide/ide-integration
- Vite+ Migrate: https://viteplus.dev/guide/migrate
- Oxfmt language support: https://oxc.rs/docs/guide/usage/formatter/language-support
- uv documentation: https://docs.astral.sh/uv/

<!-- END SOURCE: docs/development-toolchain.md -->


---

<!-- BEGIN SOURCE: docs/repository-design.md -->

# Repository Design & Maintenance

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

Project Item에는 Outcome, binary하게 판정 가능한 Acceptance Criteria, Evidence를 둔다. Repository가 작업의 1차 영역을 제공하고 Work Type이 Issue 전체의 주된 delta를 분류한다. Work Type/Labels 판정은 Work Classification (`docs/work-classification.md`)을 따른다. Project Item 초안에는 Project Item template (`templates/project-item.md`)을 사용할 수 있다.

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

Architecture migration이 Active인 동안 Engine/Site/Docs 관련 Item은 Architecture Transition (`docs/architecture-transition.md`)의 phase와 safety rule을 위반하지 않는지 먼저 확인한다. GitHub Project README는 위 정보를 복제하는 원본이 아니라 **탐색용 인덱스**다. 장기 정의는 소유 문서에 두고 Project README에는 원본 링크와 Project 운영 진입점만 남긴다. 형식 기준은 Project README template (`templates/project-readme.md`)을 사용한다.

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

Publishing Platform repository가 공유하는 **변경 관리 invariant**의 단일 원본이다. 구체적인 branch 이름, integration topology, runner 선택, CI matrix, release trigger는 각 repository의 역할·보안·비용·platform 제약에 따라 owning repository가 정의한다.

## 공통 통합 원칙

- 각 repository는 durable/canonical branch와 필요한 integration path를 명확히 정의한다. `main`/`develop` 같은 이름을 모든 repository에 공통으로 강제하지 않는다.
- 한 번의 작은 변화가 아닌 repository 작업은 해당 repository가 Issue orchestration 대상이면 Issue-linked branch에서 수행한다.
- 변경은 owning repository가 정의한 PR/review/integration 경로를 거쳐 canonical state에 반영한다. repository가 정한 integration 단계나 release gate를 임의로 우회하지 않는다.
- branch topology와 release promotion 방식은 repository 역할에 맞게 결정한다. 콘텐츠 remote, implementation repository, coordination repository가 동일한 topology를 가질 필요는 없다.
- merge method는 공통 강제 정책으로 고정하지 않는다. 최종 diff와 history의 검토 가치에 따라 owning repository 또는 해당 PR에서 선택한다.

문서를 수정했다고 실제 branch protection, workflow, repository setting까지 변경된 것으로 간주하지 않는다. 현재 동작은 owning repository의 live workflow/settings를 확인한다.

## Issue branch와 PR

Issue lifecycle은 Planning Model (`docs/planning-model.md`), 공통 activation semantics와 Project 연결은 Project Orchestration (`docs/project-orchestration.md`)이 소유한다. 실제 branch base, workflow file, script, token/permission 구성은 실행 repository가 소유한다.

PR에는 결과와 변경 이유, 관련 Issue, 실제 수행한 검증과 남은 제한을 적는다. 여러 commit을 사용한 작업도 최종 diff가 하나의 검토 가능한 변화로 읽혀야 한다. merge 완료 전에는 완료된 integration으로 보고하지 않는다.

## 검증과 runner

- repository는 자신의 역할과 trust boundary에 맞는 검증 단계를 정의한다.
- 빠른 development feedback과 release/canonical integration 검증은 필요한 경우 서로 다른 강도로 운영할 수 있다.
- formatting, static checks, tests, build, artifact verification, cross-platform matrix는 실제 repository 책임과 failure risk에 따라 선택한다. 모든 repository에 동일 matrix를 강제하지 않는다.
- runner 선택은 security, cost, platform dependency, local capability를 고려한다. private repository나 local inference처럼 특정 trust/resource boundary가 필요한 작업은 self-hosted runner를 우선할 수 있고, GitHub-hosted runner는 필요한 검증에만 사용한다.
- 동일한 고비용 검증을 여러 runner에서 중복 수행하는 것을 기본값으로 삼지 않는다. 추가 matrix는 실제 portability 또는 release risk를 검증할 때 사용한다.
- 완료 Evidence는 문서에 적힌 기대가 아니라 실제 owning repository workflow run과 결과를 기준으로 한다.

## History와 archive

- Git branch를 장기 지식 archive로 사용하지 않는다.
- 과거 맥락은 Git history, immutable commit/permalink, 필요한 migration 문서와 revision-bound Evidence에서 추적한다.
- legacy/archive/backup branch는 현재 운영 경로가 아니며, 지속 가치가 canonical 문서와 Git history에 흡수되면 별도 장기 보존 정책으로 간주하지 않는다.
- forensic 재현을 위해 특정 ref를 고정할 필요가 있으면 owning repository가 명시적인 tag 또는 immutable Evidence를 선택할 수 있다.

## 정책 적용 범위

Knowledge는 공통 invariant만 소유한다. 다음은 owning repository가 구체화한다.

- canonical/integration branch 이름과 topology
- issue branch의 실제 base ref
- PR/release promotion 경로
- runner 종류와 label
- CI job 구성과 OS matrix
- repository-specific hotfix/patch 경로

공통 정책과 repository-local 운영이 충돌하면 먼저 repository 역할상 필요한 차이인지 확인한다. 반복되는 차이가 여러 repository에 공통 invariant로 승격될 때만 Knowledge 정책을 확장한다.

<!-- END SOURCE: docs/git-workflow.md -->


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

검증 기준일: 2026-09-21. Knowledge가 소유하는 통합 검수 연결이다. 아래 상태 판정과 immutable Evidence는 당시 snapshot이며, 이번 문서 소유권 정리에서 구현·배포를 재검증하거나 최신 상태로 갱신하지 않았다.

2026-09-21 target architecture가 Payload/PostgreSQL 기반 CMS에서 **Git-backed filesystem document workspace + repository-owned consumer/mutation implementation**으로 변경되었다. 아래 기존 구현 revision은 역사적/재사용 가능 Evidence이며 새 target을 자동 충족하지 않는다.

## Post-snapshot checkpoint — 2026-09-27

2026-09-21 판정표 자체는 immutable snapshot으로 유지한다. 이후 다음 새 Evidence가 생겼다.

- Engine model-assisted metadata enrichment: [Issue #23](https://github.com/ooMia/oomia.github.io.engine/issues/23), [PR #30](https://github.com/ooMia/oomia.github.io.engine/pull/30).
- portable Engine artifact verification: [PR #34](https://github.com/ooMia/oomia.github.io.engine/pull/34), [Engine run 36257543854](https://github.com/ooMia/oomia.github.io.engine/actions/runs/36257543854).
- Docs trusted consumer E2E: [Docs run 36260957694](https://github.com/ooMia/oomia.github.io.docs/actions/runs/36260957694).
- resulting canonical Docs revision: [`bf93bb5`](https://github.com/ooMia/oomia.github.io.docs/commit/bf93bb536b8a4e3a7149737b15723514ce1bdfd8).

이는 **Automation과 Canonical Content 경로의 새로운 Evidence**지만, 현재 Docs layout을 Site가 직접 소비해 build/render/deploy했다는 증거는 아니다. 따라서 아래 2026-09-21 capability 판정을 여기서 소급 변경하지 않고, 다음 Site vertical slice에서 current Docs revision → Site revision → delivery result가 연결된 뒤 새 기준 revision으로 재평가한다.

## Post-snapshot checkpoint — 2026-09-28

2026-09-27 checkpoint 이후 canonical Docs의 현재 layout을 Site가 직접 소비하는 Evidence가 확보됐다.

- canonical Docs revision: [`c5826802`](https://github.com/ooMia/oomia.github.io.docs/commit/c5826802be296f4ad84193119729be77a2d52c3c)
- direct Article corpus consumption: [Site #12](https://github.com/ooMia/oomia.github.io/issues/12) / [PR #13](https://github.com/ooMia/oomia.github.io/pull/13), integrated develop revision [`f50ba57b`](https://github.com/ooMia/oomia.github.io/commit/f50ba57b9d1e270b286794cb9a7998f7df780648)
- current Docs → Site build/render Evidence: [Site run 36406348962](https://github.com/ooMia/oomia.github.io/actions/runs/36406348962). 11 Article pages were built from the canonical corpus.
- release-only live mutation boundary: [Site #14](https://github.com/ooMia/oomia.github.io/issues/14) / [PR #15](https://github.com/ooMia/oomia.github.io/pull/15), integrated develop revision [`6d8cc03f`](https://github.com/ooMia/oomia.github.io/commit/6d8cc03f2f28df28e31a97a38b31b06fd8148b25)
- PR gate Evidence: [Site run 36418285983](https://github.com/ooMia/oomia.github.io/actions/runs/36418285983), `build=success`, `deploy=skipped`.

Run 36406348962 occurred before the release-only deployment gate and therefore proves direct consumption/build/render but is not treated as final release-boundary Evidence. Phase B의 direct Docs consumption은 integration state에서 검증됐고, Phase C의 최종 release Evidence는 Site `develop → main` promotion 후 새 `main` build/deploy로 Docs revision + Site revision + delivery result를 다시 연결해야 한다.

## 기준 revision

| 역할 | Repository | Revision | 의미 |
|---|---|---|---|
| legacy authoring / publishing | [`ooMia/oomia.github.io.engine`](https://github.com/ooMia/oomia.github.io.engine) | [`6ba2f950a78eef18c2efa305b96a1c8d0443252e`](https://github.com/ooMia/oomia.github.io.engine/commit/6ba2f950a78eef18c2efa305b96a1c8d0443252e) | Payload/PostgreSQL CMS와 DB→docs publish Evidence |
| content repository snapshot | [`ooMia/oomia.github.io.docs`](https://github.com/ooMia/oomia.github.io.docs) | [`50d89a4cb1c5d6476444e29454e12b523e99231b`](https://github.com/ooMia/oomia.github.io.docs/commit/50d89a4cb1c5d6476444e29454e12b523e99231b) | 해당 revision은 당시 generated snapshot; 현재 레포 전체 상태에 대한 판정은 아님 |
| presentation / delivery | [`ooMia/oomia.github.io`](https://github.com/ooMia/oomia.github.io) | [`a3b2e182563458636b7b8186a4cd2201894b2a65`](https://github.com/ooMia/oomia.github.io/commit/a3b2e182563458636b7b8186a4cd2201894b2a65) | docs content를 Site에서 실제 build/deploy한 Evidence |

`oomia.github.io`의 package name은 `oomia.github.io.mono`이고 일부 engine 문서에서는 이를 `mono`라고 부른다. 별도 원격 `oomia.github.io.mono`가 있다는 뜻은 아니다.

## Architecture transition

기술 전환 상세는 전환 guide (`docs/architecture-transition.md`), [Engine migration record](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/migration.md), [Site integration 전환](https://github.com/ooMia/oomia.github.io/blob/develop/docs/content-consumption-contract.md#consumer-integration-전환)을 참조한다. 이 문서는 구현 순서·코드 이관 계획을 별도로 소유하지 않는다.

## 1.0 capability 상태

상태는 **미검증 / 미충족 / 부분 충족 / 충족**만 사용한다.

| Capability | 당시 판정 | 기준 revision의 Evidence | 다음 통합 검수 연결 |
|---|---|---|---|
| Authoring | **미충족** | Payload Admin에서 visual create/edit/save가 E2E로 검증된 legacy implementation은 존재한다. [e2e.ts](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/scripts/e2e.ts) | 실제 md-like source를 호환 authoring tool로 수정·보존하고 Site가 소비하는 Evidence. editor 종류 자체는 판정 대상이 아니다. |
| Canonical Content | **부분 충족** | docs repository에는 실제 Markdown/MDX files와 Git history가 있고 Site가 이를 소비할 수 있다. 기존 Engine DB에도 raw body string 보존 Evidence가 있다. | 사용자 작성 파일의 보존과 Git revision 관계. 선택적 후처리는 별도 기능으로 검수한다. [Engine 수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/content-modification-contract.md). |
| Extensibility | **부분 충족** | 기존 custom `Callout`이 engine/site 양쪽에서 opt-in되고 consumer build를 통과한 Evidence가 있다. | 동일 component implementation/package를 사용하는 실제 Site consumer와 필요한 authoring integration Evidence. 지원 catalog는 Knowledge가 별도로 판정하지 않는다. |
| Automation | **부분 충족** | legacy Payload publish action과 docs workflow가 explicit trigger, failure propagation, idempotent no-op을 검증했다. [Issue #8](https://github.com/ooMia/oomia.github.io.engine/issues/8) | 실제 후처리·발행 workflow에 automation이 참여한다는 책임 repository의 Issue·PR·workflow Evidence. |
| Publishing | **부분 충족** | legacy workflow는 DB snapshot을 docs repo에 materialize하고 실제 Site sync/lint/test/typecheck/build를 통과시켰다. [docs workflow](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/scripts/docs-workflow.ts) | 현재 콘텐츠 revision의 소비 검증과 결과 재현성. [Site 소비 계약](https://github.com/ooMia/oomia.github.io/blob/develop/docs/content-consumption-contract.md#publishing). |
| Presentation | **충족** | Site가 docs repository의 Markdown/MDX를 Astro content collection으로 읽어 렌더한다. [content config](https://github.com/ooMia/oomia.github.io/blob/a3b2e182563458636b7b8186a4cd2201894b2a65/apps/web/src/content.config.ts) | 현재 콘텐츠 revision에 대한 실제 렌더링 Evidence를 확보해 재평가. |
| Delivery | **충족** | docs SHA를 소비하는 Site revision의 GitHub Pages build/deploy가 성공했다. [run 35472028484](https://github.com/ooMia/oomia.github.io/actions/runs/35472028484) / [artifact 10593195312](https://github.com/ooMia/oomia.github.io/actions/runs/35472028484/artifacts/10593195312) | 새 콘텐츠 revision → Site revision → 배포 결과의 연결을 검증해 재평가. |

## 폐기 또는 재사용 판단

책임 레포의 [Engine 전환 기록](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/migration.md) 및 [Site integration 설계](https://github.com/ooMia/oomia.github.io/blob/develop/docs/content-consumption-contract.md#consumer-integration-전환)를 참조한다. 구현 상세의 상태 원장을 이 문서에 복제하지 않는다.

## 1.0 구현 delta

위 표의 통합 검수 gap을 해당 레포 Issue의 Outcome/AC/Evidence에 연결한다. 개별 명령·코드 구조·package 선택과 실행 우선순위는 소유 Issue에서 관리한다. 각 capability 판정은 연결된 Evidence를 실제로 재검증한 뒤 변경한다.

## Issue #13 / #14 영향

[Engine #13](https://github.com/ooMia/oomia.github.io.engine/issues/13), [Engine #14](https://github.com/ooMia/oomia.github.io.engine/issues/14)의 과거 구현 범위를 여기서 재정의하지 않는다. [Engine migration record](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/migration.md)와 책임 레포의 현재 Issue를 확인하고, Knowledge에서는 통합 Evidence에 영향을 주는 결과만 연결한다.

## 갱신 규칙

새 기준 revision을 조사할 때는 Implementation Map 조사 템플릿 (`templates/implementation-map.md`)을 초안으로 사용할 수 있다. 조사 결과의 canonical snapshot은 별도 Map으로 분산하지 않고 이 문서에 반영한다.

- 이 문서는 live branch 상태가 아니라 immutable Evidence 기반 snapshot이다.
- architecture가 변경되면 같은 코드 revision도 새 Product Boundary에 대해 다시 평가할 수 있다.
- legacy implementation 성공을 현재 target 완료로 간주하지 않는다.
- 새 Engine/docs/Site integration이 main에 들어간 뒤 기준 revision과 capability 상태를 다시 갱신한다.

<!-- END SOURCE: docs/implementation-map.md -->


---

<!-- BEGIN SOURCE: docs/operating-rhythm.md -->

# Operating Rhythm

## 목표와 리듬

Publishing Platform 완성과 계획·실행 습관을 중심에 둔다. 앰버서더 활동과 포트폴리오 개발의 기록을 하나의 흐름으로 연결한다.

- 매주 작은 발표, 매 4주 큰 발표 또는 working system review.
- 가용 시간은 대화 당시 주 50시간, 첫 주 25시간의 계획 가정. 현재 주의 실시간 예산이 아니다.
- Daily 기록은 20–30분 버퍼를 둔다. 주말 정리는 초기 60분을 잡고 실제 소요 시간을 기록해 조정한다.
- 주말 이전에 발표 일정을 잡는다. 통상 토요일 밤 또는 일요일 낮이며 확정 일정은 아니다.
- Daily는 비공개, 주말 정리 결과를 공개하는 방향에 사용자가 동의했다.

## Evidence → Story

매일 목표, 실제 결과, screenshot/GIF/video/voice/commit 등 Evidence, 배운 점, 다음 행동을 남긴다. 미디어는 GitHub에 업로드해 링크로 연결하는 방향을 선호했다. 구체적인 공개 범위와 저장 위치는 확정되지 않았다.

주말에는 일별 기록을 목표 → 시도 → 장애·판단 → 결과 → 다음 행동의 A-Z 스토리로 재구성한다. Agent/LilysAI는 정리 부담을 낮추는 도구이며 모든 개발을 Agent가 수행한다고 가정하지 않는다. 공개 결과물은 발표·블로그를 중심으로 하고 LinkedIn을 초기 후보로 둔다. 자체 블로그가 준비되기 전 발행 채널은 미결이다.

기록 형식이 필요하면 Daily Evidence (`templates/daily-evidence.md`)와 Weekly Review (`templates/weekly-review.md`) 템플릿을 사용한다.

## 기능 실험 참조

기능 실험의 활성/폐기 상태와 AC는 책임 구현 repository의 live Issue/Project에서 관리한다. 완료되거나 `not_planned`로 종료된 실험 목록을 이 문서에 별도 catalog로 복제하지 않는다.

현재 반복 가능한 automation Evidence가 필요하면 Engine/Docs의 최신 Issue·PR·workflow run을 직접 확인한다. 이 문서는 활동 리듬과 Evidence → Story 원칙만 유지한다.

자료 수집 → 요약·통합 → 발표/글 초안 → 플랫폼 발행의 흐름에서 실제 정리 부담이 큰 단계를 선택해 활용한다.

<!-- END SOURCE: docs/operating-rhythm.md -->


---

<!-- BEGIN SOURCE: docs/decisions.md -->

# Current Decisions

이 문서는 현재 결정의 **원본 탐색 인덱스**다. 규칙 본문이나 구현 catalog를 복제하지 않는다.

## Knowledge

- 제품 경계와 repository 역할 (`docs/architecture.md`)
- 전환 coordination (`docs/architecture-transition.md`)
- Release 1.0 목표·acceptance (`docs/release-1.0.md`)
- Evidence linkage (`docs/implementation-map.md`)
- 공통 repository scheme (`docs/repository-design.md`)
- 공통 개발 도구 지침 (`docs/development-toolchain.md`)
- Git workflow (`docs/git-workflow.md`)
- 계획·Issue lifecycle·DoD (`docs/planning-model.md`)
- Project automation (`docs/project-orchestration.md`)

## Engine

- [현재 구현·명령](https://github.com/ooMia/oomia.github.io.engine/blob/main/README.md)
- [문서 수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/content-modification-contract.md)
- [Migration record](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/migration.md)

## Site

- [현재 구현](https://github.com/ooMia/oomia.github.io/blob/main/README.md)
- [콘텐츠 소비 계약](https://github.com/ooMia/oomia.github.io/blob/develop/docs/content-consumption-contract.md)

실제 supported syntax, frontmatter schema, component package/API, editor adapter 같은 구현 정보는 owning repository의 code/docs를 확인한다. Knowledge는 별도 manifest나 compatibility summary를 유지하지 않는다.

## Historical reference

과거 설계의 지속 가치가 있는 맥락은 전환 coordination (`docs/architecture-transition.md`)과 owning repository의 migration 기록에서 추적한다. legacy/archive/backup branch 자체는 장기 지식 archive로 유지하지 않는다.

<!-- END SOURCE: docs/decisions.md -->


---

<!-- BEGIN SOURCE: docs/open-questions.md -->

# Open Questions / Verification Gaps

현재 canonical 정책에서 **제품 경계·release acceptance·공통 Project 운영 수준에서 실제 결정이 필요한 항목**만 유지한다. 구현 repository가 code로 결정할 수 있는 세부사항은 이 목록에 올리지 않는다.

| ID | 항목 | 현재 처리 |
|---|---|---|
| Q003 | 1.0 final release gate | Site `develop → main` promotion 후 새 main build/deploy에서 canonical Docs revision + Site revision + delivery result를 연결해 확정 |
| Q007 | Work Type Validation 추가 | 보류. 현재 기본값 유지 |
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


---

<!-- BEGIN SOURCE: CONTRIBUTING.md -->

# 수정 방법

1. CONTEXT.md (`CONTEXT.md`)에서 해당 규칙을 소유하는 파일을 찾는다.
2. 원본 Markdown을 수정한다. 새로운 제안은 확정된 규칙으로 섞지 말고 open-questions.md (`docs/open-questions.md`)에 기록한다.
3. 원본의 위치나 탐색 경로가 바뀌면 Current Decisions (`docs/decisions.md`)의 링크를 갱신한다. 정책 본문은 소유 문서에만 반영하고 인덱스에 요약 복제하지 않는다.
4. 구현 상태를 변경하려면 Implementation Map (`docs/implementation-map.md`)의 기준 revision보다 구현 레포가 진행되었는지 확인하고 실제 코드·테스트·commit/deployment Evidence를 다시 조사한다.
5. `python3 scripts/bundle.py`를 실행해 context bundle을 갱신한다.
6. 변경 내용을 Git diff로 검토하고 커밋한다.

규칙의 중복 복사는 피한다. GitHub Project README와 필드 description은 이 레포의 canonical 정의를 가리키는 탐색 계층으로 유지한다. 별도 레포의 코드와 계약을 함께 바꾸는 경우 관련 PR/commit을 서로 연결한다.

## Branch / PR workflow

공통 Git Workflow (`docs/git-workflow.md`)의 invariant를 따른다. 실제 branch topology, runner, CI/release 세부 운용은 이 repository의 workflow/settings가 소유하며 공통 문서에 복제하지 않는다.

## Evidence

설계·계획 정의 자체가 Outcome이면 관련 canonical 문서의 immutable commit/permalink를 완료 Evidence로 사용할 수 있다. `main` 링크는 최신 정의를 찾는 reference로 사용한다.

기능 구현, 성능·신뢰성 검증, 실제 publishing/deployment 완료에는 설계 링크를 대체 Evidence로 사용하지 않는다. 책임 레포의 코드·테스트·실행 결과·commit/PR·deployment처럼 재현 가능한 자료가 필요하다.

## 세션 인계

의미 있는 작업 세션을 종료할 때 장기적으로 남아야 할 규칙·결정은 먼저 owning canonical 문서에 반영한다. 아직 진행 중인 branch/Issue/Project 상태, 재검증 항목, 다음 안전한 행동은 `handoff/current.md`에 기록한다.

`handoff/current.md`는 세션 로그나 의사결정 원장이 아니다. 매번 최신 checkpoint로 overwrite하고, 과거 상태는 Git history에 맡긴다. 구현 수준은 handoff가 아니라 revision-bound Implementation Map (`docs/implementation-map.md`)과 책임 레포 Evidence로 판정한다.

## 대화에서 변경을 가져올 때

사용자의 명시적 정정 → 이후 사용자 메시지에 반영된 규칙 → 최신 assistant 제안 → 오래된 초안 순으로 근거를 판단한다. 시간상 최신이라는 이유만으로 제안을 사용자 승인으로 바꾸지 않는다. 현재 문서에는 현재 유효한 결론만 반영하고, 과거 근거가 꼭 필요하면 Git history와 immutable Evidence를 확인한다.

## 공유

이 레포는 raw conversation transcript나 source/turn provenance chronology를 별도 원장으로 보관하지 않는다. Chat에 필요한 기본 첨부물은 `dist/CONTEXT-BUNDLE.md`이며, 과거 변경 근거는 Git history와 연결된 Evidence에서 추적한다.

<!-- END SOURCE: CONTRIBUTING.md -->
