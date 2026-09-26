# Publishing Platform — Chat Context Bundle

GENERATED FILE — 원본은 각 문서 경계에 적힌 경로입니다. 직접 수정하지 마세요.
Implementation Map은 문서에 적힌 repository revision의 검증 스냅샷이며 live Project 상태가 아닙니다.
상대 링크는 원본 레포 기준입니다. 템플릿은 별도로 참조합니다. 과거 상세 history는 archive/main-before-cleanup-20260921 branch에 보존됩니다.


---

<!-- BEGIN SOURCE: CONTEXT.md -->

# Context entry point

Knowledge는 Publishing Platform의 **PM/coordination layer**다. 공통 workflow·개발 기준·통합 목표·수용 기준·검수 연결을 관리하고, 구현 상세는 책임 repository의 문서와 코드가 소유한다.

이전 작업을 이어받을 때는 Current Handoff (`handoff/current.md`)를 먼저 읽는다. handoff는 현재 checkpoint이며 정책이나 최신 구현 완료의 증거가 아니다.

## 자주 하는 작업

| 작업 | 참조 순서 |
|---|---|
| Issue 생성·수정·활성화 | Issue 형식 (`templates/repository-issue.md`) → lifecycle·DoD (`docs/planning-model.md`) → 필요한 Fields (`docs/fields.md`) / Labels (`docs/labels.md`) → activation·Project seed (`docs/project-orchestration.md`) |
| 작업 branch 시작 | Git Workflow (`docs/git-workflow.md`) → Issue-linked branch (`docs/project-orchestration.md`) → 해당 Issue |
| PR 작성·검토·통합 | Git Workflow (`docs/git-workflow.md`) → 완료·Evidence (`docs/planning-model.md`) → 해당 Issue 및 구현 레포의 검증 방법 |
| major/minor release | Git Workflow (`docs/git-workflow.md`) → 통합 목표 (`docs/release-1.0.md`) → 검수 연결 (`docs/implementation-map.md`) |
| 새 레포 scaffolding·디렉토리 역할 | Repository Design (`docs/repository-design.md`) → JS/TS이면 Development Toolchain (`docs/development-toolchain.md`) |
| 기술 설계·구현 조사 | 아래 레포별 참조 → 해당 레포 `/docs/`와 코드·Issue·tests |
| Knowledge 문서 수정 | 소유권 (`docs/repository-design.md`) → 해당 원본 → CONTRIBUTING (`CONTRIBUTING.md`) |
| 계획·분류·완료 검토 | Planning (`docs/planning-model.md`) → Fields (`docs/fields.md`) → 실제 Item의 Outcome/AC/Evidence |
| 기록·발표·주간 회고 | Operating Rhythm (`docs/operating-rhythm.md`) → 실제 Project Status Update·Evidence |
| 제품/cross-repository 미결 사항 | Open Questions (`docs/open-questions.md`) |

## 레포별 원본 참조

| 대상 | 현재 확인 가능한 참조 |
|---|---|
| Engine | [README](https://github.com/ooMia/oomia.github.io.engine/blob/main/README.md), [수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/develop/docs/content-modification-contract.md), [Issues](https://github.com/ooMia/oomia.github.io.engine/issues) |
| Site | [README](https://github.com/ooMia/oomia.github.io/blob/main/README.md), [소비 계약](https://github.com/ooMia/oomia.github.io/blob/develop/docs/content-consumption-contract.md), [Issues](https://github.com/ooMia/oomia.github.io/issues) |
| Docs 콘텐츠 remote | [Repository](https://github.com/ooMia/oomia.github.io.docs) |

수정·소비 계약은 각각 owning repository에 통합되어 있다. 링크가 `develop`을 가리키는 경우 해당 계약의 현재 개발 통합 상태를 뜻하며, `main` 승격 여부와 완료 Evidence는 repository live state에서 별도로 확인한다.

## PM-level 원본

- Architecture (`docs/architecture.md`): repository 역할과 제품 경계
- Architecture Transition (`docs/architecture-transition.md`): cross-repository 전환 순서·안전 규칙
- Release 1.0 (`docs/release-1.0.md`): 통합 목표·수용 기준
- Implementation Map (`docs/implementation-map.md`): revision-bound Evidence와 통합 검수 연결
- Current Decisions (`docs/decisions.md`): 원본 탐색 인덱스
- Open Questions (`docs/open-questions.md`): 아직 실제 제품/coordination 결정이 필요한 항목

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

과거 구현과 branch는 migration input/Evidence로 보존한다.

## 3. Cross-repository target

- canonical content는 md-like filesystem documents + frontmatter + assets다.
- durable shared revision은 `oomia.github.io.docs` commit SHA다.
- Site는 자신의 실제 consumer implementation으로 Docs를 판정한다.
- Engine은 선택 기능이며 실행 여부를 Site가 요구하지 않는다.
- editor 종류, component catalog, adapter 형식, Site 내부 layout/toolchain은 Knowledge-level gate가 아니다.
- 실제 component/syntax support는 Site와 관련 package/code가 소유한다.

## 4. Repository별 migration source

- Engine: [수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/develop/docs/content-modification-contract.md), [migration record](https://github.com/ooMia/oomia.github.io.engine/blob/develop/docs/migration.md)
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

문서 mutation의 기술 설계는 [Engine 수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/develop/docs/content-modification-contract.md)이 소유한다. Agent 후처리를 포함한 선택 기능은 Docs commit이나 Site 소비의 필수 단계가 아니다.

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

# Development Toolchain — Vite+ First

상태: 2026-09-21 project-wide engineering policy.

이 문서는 Publishing Platform의 JavaScript/TypeScript repository에서 사용하는 **개발 도구의 전역 기본값**을 소유한다. 특정 repository가 다른 선택을 해야 한다면 그 이유와 차이를 해당 repository contract에 명시한다.

핵심 원칙:

> Vite+의 `vp`를 runtime, package management, static checks, tests, builds, workspace task orchestration, staged checks의 **기본 진입점**으로 사용한다. Vite+가 이미 제공하는 기능을 위해 별도의 wrapper/tool을 추가하지 않는다.

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

## 16. Current repository implications

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
| `handoff/` | 현재 작업을 이어받기 위한 일시적 checkpoint |

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

workspace dependency는 `package.json`의 실제 dependency로 표현한다.

pnpm workspace 내부 dependency는 가능한 한:

```json
{
  "dependencies": {
    "@oomia/example": "workspace:*"
  }
}
```

처럼 local-only intent를 명시한다.

이 dependency graph가 Vite+ task ordering에도 사용되므로 별도의 task-runner 전용 graph를 만들지 않는다.

순환 dependency가 생기면 task runner 설정으로 감추지 않고 package boundary를 다시 검토한다.

## 5. Dependency versions

여러 workspace package가 공유하는 third-party dependency는 root `pnpm-workspace.yaml` catalog에 둘 수 있다.

catalog를 사용할 기준:

- 여러 package가 같은 version policy를 공유함
- upgrade를 한 곳에서 관리하는 것이 유리함
- peer/runtime mismatch를 피해야 함

한 package에서만 쓰는 작은 dependency까지 무조건 catalog에 넣어 catalog를 dependency dump로 만들 필요는 없다.

Vite+, TypeScript, common runtime/framework처럼 **workspace-wide toolchain/compatibility version**은 catalog에 두는 편을 우선한다.

## 6. Root package responsibility

root package는 private orchestration package다.

root에는 제품 business logic을 두지 않는다.

root가 소유할 수 있는 것:

- workspace metadata
- Vite+ config
- TypeScript base config
- package-manager policy
- repository-wide tasks
- CI/hook integration

root `package.json` scripts는 최소화한다.

Vite+ built-in 또는 `vp run` task를 단순히 다시 alias하는 script를 무분별하게 추가하지 않는다.

## 7. Configuration ownership

가능하면 config source를 하나로 만든다.

- lint/fmt/check/staged → root Vite+ config
- package manager/workspace/catalog → `pnpm-workspace.yaml`
- TS shared compiler policy → root/base tsconfig
- framework runtime config → owning app/package
- CI → `.github/workflows`

동일 설정을 root와 package에 복사해 “어느 것이 적용되는지” Agent가 추론하게 만들지 않는다.

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
| 공통 branch·PR·release 전략 | Git Workflow (`docs/git-workflow.md`) |
| Issue lifecycle·계획·완료 의미 | Planning Model (`docs/planning-model.md`) |
| Project/Issue 공통 자동화 계약 | Project Orchestration (`docs/project-orchestration.md`) |
| 구현되는 기술 설계·API·동작 계약·실행·재현 방법 | 책임 구현 repository의 `docs/` 및 코드 |
| 작업별 읽기 경로 | CONTEXT (`CONTEXT.md`) |

기술 설계는 구현되는 레포에 두고 Knowledge는 해당 문서를 링크로 참조한다. 두 레포가 함께 소비한다는 이유만으로 기술 계약 전체를 Knowledge 소유로 정하지 않는다. Engine의 파일 수정 계약과 Site의 소비 계약은 각 레포가 소유하고 서로의 원본을 참조한다. 그 밖의 producer/consumer 계약에서 원본 소유자가 불분명하면 사용자에게 질문하고 이동을 보류한다.

공통 규칙은 각 레포에 다시 작성하지 않는다. scaffolding 시 공통 개발 지침을 참조해 해당 레포에 적용한 설정·명령·제약을 명시할 수는 있다. 이 문서는 적용 결과이며 공통 기준의 별도 원본이 아니다. 공통 Git flow나 디렉토리 역할을 반복 복사할 필요는 없다.

새 문서는 새로운 정보 소유권이 필요할 때만 만든다. 편의를 위한 요약·템플릿은 정책을 복제하지 않고 원본을 참조한다. 참조 경로는 작업 진입점 → 소유 문서 → 구현 근거 순으로 구성하고, 서로를 읽어야 정의를 이해할 수 있는 순환 의존을 만들지 않는다.

구현 상세가 책임 repository의 code/docs로 충분히 표현되면 Knowledge에 compatibility 문서를 중복 유지하지 않는다. 삭제된 과거 설계는 Git history에서 조사한다.

## 12. Agent context

Agent용 root instruction은 짧고 실행 가능해야 한다.

포함:

- Knowledge canonical link / transition guide
- repository role
- standard VP commands
- current verification gate
- destructive migration safety
- local code ownership rules

포함하지 않음:

- 장문의 오래된 product history
- superseded architecture
- copy-pasted entire Knowledge
- 이미 존재하지 않는 service/DB commands

repository-local Agent 지침에 superseded architecture나 존재하지 않는 service/task가 남아 있으면 scratch/migration 구현 전에 먼저 교체한다. live stale-file 여부는 `handoff/current.md`에서 추적한다.

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


## 17. Maintenance checklist

새 directory/package/tool을 추가하기 전에 묻는다.

1. 독립 runtime인가?
2. 둘 이상의 consumer가 있는가?
3. dependency boundary가 필요한가?
4. 별도 test/build/release lifecycle이 있는가?
5. 기존 owner 안에 두면 실제 문제가 생기는가?

5개 모두 아니라면 새 package를 만들 이유가 약하다.

새 tool을 추가하기 전에 묻는다.

1. Vite+가 이미 제공하는가?
2. pnpm/workspace 기능으로 충분한가?
3. platform-native Git/GitHub 기능으로 충분한가?
4. 기존 dependency를 재사용할 수 있는가?

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

상태: 사용자 제시 규칙에 최신 필드 분리와 delta 모델을 반영. 출처: S2 `d7815342`, `4a49654f`; S3 `5a382a65`, `924e880a`.

## 계획 단위

| 개념 | 정의 / 작성 규칙 |
|---|---|
| Release Goal | 릴리스가 달성할 제품 상태 한 문장. 기술·작업 나열은 Product Boundary로 분리 |
| Product Boundary | 해당 릴리스에 필요한 capability 및 제외 범위. 구현 순서가 아님 |
| Target Release | Item의 결과를 포함할 통합 제품 버전 |
| Objective | 여러 릴리스에서 반복 발전시키는 제품 결과 축 |
| Iteration Goal | 이번 Iteration에서 달라질 가장 중요한 상태 한 문장 |
| Iteration Commitment | Goal을 위해 선택한 Item 집합. 대화 기준 통상 2–5개 |
| Project Item | 독립적으로 검증 가능한 하나의 변화(delta) |
| Repository Issue | 해당 결과를 실현하는 특정 레포의 구현 단위 |

Objective와 capability 자체를 영구적으로 Done 처리하지 않는다. 이전 Item을 다음 버전용으로 복제하지 말고 새로 달라지는 결과만 Item으로 만든다. 특정 릴리스가 요구하는 capability 수준은 릴리스 기준으로 검증한다.

## Item / Issue 작성

Project Item에는 Outcome, binary하게 판정 가능한 Acceptance Criteria, Evidence를 둔다. 시스템 변경에는 직접 바뀌는 Scope를 지정하고, 계획·분류 규칙 작업에는 Scope를 비울 수 있다. 구현 레포 이름이나 프레임워크만으로 제품 결과를 정의하지 않는다.

불확실한 작업은 Draft로 포착한다. 레포 소유권과 실행 범위가 분명한 구현 작업은 Repository Issue로 구체화한다. 전역 조정 Item을 억지로 하나의 레포에 귀속하지 않는다. Issue에는 부모 Item 링크, 구현 기술, 필요한 Quality Requirements를 명시한다. 한 Iteration에 끝내기 어렵거나 독립 검증이 필요한 결과는 분해한다.

### Development branch 초기 구현

Issue와 연관된 구현을 development branch에서 시작할 때는 **green scaffold**를 기본값으로 사용한다.

- 첫 변경은 완성 구현보다 핵심 flow와 dependency boundary를 실행 가능한 구조로 연결하는 데 집중할 수 있다.
- prompt·정규화·세부 validation처럼 아직 사용자 정책이 필요한 custom logic은 명시적인 `TODO` placeholder로 남길 수 있다.
- scaffold 단계의 최소 contract test는 통과해야 한다. 의도적인 red scaffold는 Issue 자체가 failing test를 요구하거나 사용자가 명시적으로 요청한 경우에만 사용한다.
- 첫 branch update는 가능하면 하나의 응집된 commit으로 유지한다.
- scaffold는 착수 방식일 뿐이며 Issue의 최종 Acceptance Criteria나 Definition of Done을 축소하지 않는다.

### Draft와 활성화

- 가능한 경우 GitHub Project의 native Draft Issue를 사용한다. 현재 사용하는 connector가 이를 지원하지 않으면 repository issue를 `draft:` prefix + `closed / not_planned` 상태로 보관하는 fallback을 사용할 수 있으며, 이를 native Draft와 혼동하지 않는다.
- Draft 단계에서는 implementation branch를 만들지 않는다.
- 사용자가 Draft Issue를 명시적으로 발행/활성화하면 **같은 작업에서 Development branch를 반드시 생성·연결한다.** branch 생성은 별도 사용자 요청을 기다리지 않는다.
- 활성화 시 제목의 draft 표기를 제거하고 Project Status를 `Todo`로 전환한 뒤, 실제 구현 착수 시 `In Progress`로 이동한다.
- Development branch는 실제 구현 책임을 소유하는 repository에 둔다. 하나의 Issue가 여러 구현 레포에 걸치면 1:N 관계를 명시한다.
- 코드 변경을 직접 소유하지 않는 cross-repo coordination Item은 branch를 만들지 않을 수 있다. 대신 연결된 각 repository implementation issue가 활성화되는 순간 각각의 branch를 생성한다.

- Project orchestration Action이 설치된 repository에서는 Issue 활성화 이벤트가 Project #11 등록·field 초기화·Development linked branch 생성을 수행한다. 사용자는 별도 branch 생성 요청을 반복할 필요가 없다.
- 새 Repository Issue에는 machine-readable `project-seed`를 함께 둔다. 이는 Project field의 **초기값 전달용**이며 활성화 이후의 SoT는 계속 GitHub Project다.
- Project field/option ID는 Issue나 문서에 저장하지 않고 Action이 이름으로 조회한다. schema drift가 있으면 자동화 실패로 드러내고 임의 값을 추론하지 않는다.
- 상세 동작과 PAT 설정은 Project Orchestration (`docs/project-orchestration.md`)을 따른다.

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
| Status / Iteration / Work Type / Scope / Target Release / Objective 값 | GitHub Project fields |
| Outcome / AC / Evidence | 실제 Project Item 또는 Repository Issue |
| canonical content draft/working state | local Git working tree |
| durable shared content revision | `ooMia/oomia.github.io.docs` Git commit |
| 구현·테스트·구체적인 계약 | 책임을 소유한 구현 레포 |

Architecture migration이 Active인 동안 Engine/Site/Docs 관련 Item은 Architecture Transition (`docs/architecture-transition.md`)의 phase와 safety rule을 위반하지 않는지 먼저 확인한다. GitHub Project README는 위 정보를 복제하는 원본이 아니라 **탐색용 인덱스**다. 장기 정의는 소유 문서에 두고 Project README에는 원본 링크와 Project 운영 진입점만 남긴다.

## 릴리스와 시간

Iteration과 제품 버전은 별개다. 매주 자동으로 버전을 올리거나 Objective마다 버전을 고정 배정하지 않는다. 대화에서 0.x → 1.0 → 1.x 발전을 제안했지만 실제 버전 목록과 공개 계약의 호환성 범위는 미결이다. Definition과 Readiness는 정의/검증 활동이며 Objective나 버전 값이 아니다.

`System view`는 과거에 제안된 사용자 정의 View 이름이다. Scope별 변경 이력을 보는 `By Scope`라는 이름으로 정리하며, 실제 View가 생성되어 있다는 의미는 아니다.

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

상태: 대화 기준 설계 정의. 실제 GitHub 설정을 조회한 스냅샷이 아니다. 출처: S2 `138f8f89`, `178bf729`, `82ef0a72`; S3 `5a382a65`, `f4b8c972`, `f55d6e75`.

## 필드

| 이름 | 답하는 질문 | 설계상 형태 |
|---|---|---|
| Status | 지금 어떤 작업 상태인가? | 단일 값, 실제 옵션 미확인 |
| Iteration | 언제 수행하는가? | Iteration |
| Work Type | 어떤 종류의 일인가? | 단일 선택 |
| Scope | 완료를 위해 어떤 시스템 책임이 바뀌는가? | 다중 선택 방향 |
| Target Release | 어느 통합 제품 버전에 포함할 것인가? | 단일 버전 값 |
| Objective | 어떤 지속적인 제품 결과를 발전시키는가? | 주된 결과 하나 |

## Scope

Field description:
> Platform responsibilities that must change for the item's Outcome and Acceptance Criteria to be satisfied. Select only directly affected scopes, not incidental dependencies.

판정 질문: **해당 Scope의 동작이나 계약이 전혀 바뀌지 않아도 AC를 만족할 수 있는가?** 가능하면 선택하지 않는다. 하나가 기본이며 두 책임의 독립적인 변화가 필요하면 복수 선택한다. 3개 이상이면 Item 분해를 검토한다. 관련 레포, 사용 기술, 단순 의존성을 태그로 붙이지 않는다.

| Option | Description |
|---|---|
| Content | Article semantics, authoring, validation, and user/developer-facing content operations. |
| Persistence | Durable storage, retrieval, consistency, revisioning, and lifecycle of canonical platform state, including Git-backed filesystem state. |
| Automation | Agent-assisted, scheduled, triggered, or background execution of platform workflows. |
| Publishing | Validation, revision finalization, and preparation of canonical content for reproducible Site consumption and release. |
| Presentation | Rendering, composition, navigation, and visual presentation of publishable content as a user-facing site. |
| Delivery | Propagation, deployment, and verification of validated site output in the live environment. |

예: canonical docs commit을 만들기 전 validation/Git revision flow를 바꾸면 Publishing. workspace layout/frontmatter 저장 계약을 바꾸면 Content + Persistence. 기존 build 결과를 배포하는 경로만 바꾸면 Delivery. 단순 수동 CLI 호출은 자동으로 Automation에 해당하지 않는다.

최신 Scope 제안은 6개 옵션과 다중 선택이다. 사용자가 초기에 확인한 옵션은 Delivery를 제외한 5개였으므로 Delivery의 실제 등록 여부와 다중 선택 적용 여부는 미확인이다.

## Objective

Field description:
> Select the Objective that best represents the primary product outcome advanced by this item, based on its Outcome and Acceptance Criteria rather than its implementation area or dependencies.

사용자가 최신 메시지에서 실제 필드에 존재한다고 제시한 5개 옵션을 유지한다. 아래 description은 그 메시지에 대한 최신 제안이다.

| Option | Description |
|---|---|
| Authoring Experience | Select when the item improves how authors create, edit, inspect, or validate content through tooling or user-facing authoring interactions. |
| Canonical Content | Select when the item improves the authoritative content model, persistence, lifecycle, or rules governing canonical state. |
| Publishable Projection | Select when the item improves how canonical content is validated, finalized as a reproducible revision, and made consumable by the Site/publishing path. The historical field name does not imply that docs must be a generated projection. |
| Extensible Workflow | Select when the item adds or improves supported extension points, custom logic, components, or automation in the publishing workflow. |
| Live Delivery | Select when the item improves how publishable artifacts are rendered, deployed, or propagated to the live user-facing site. |

Authoring Experience는 CMS UI에 한정되지 않는다. Obsidian, Fumadocs Editor, CLI, IDE, form, agent-assisted authoring도 포함할 수 있다. Scope는 책임 영역, Objective는 개선된 제품 결과이므로 서로 일대일 대응하지 않는다.

## Work Type

이름은 사용자가 `Category`에서 `Work Type`으로 정정했다. 옵션은 대화에 나온 5개를 보존한다. 아래 짧은 선택 설명은 이번 정리에서 편집한 요약이며 실제 필드 description의 복제본이 아니다.

| Option | 선택 기준 |
|---|---|
| Feature | 사용 가능한 새로운 기능 또는 동작 개선을 제공한다. |
| Experiment | 불확실한 가설을 검증하고 관찰 결과를 남긴다. |
| Decision | 대안을 판단하고 선택한 방향과 이유를 확정한다. |
| Documentation | 지속적으로 참조할 지식과 설명을 정리한다. |
| Maintenance | 기존 시스템의 유지·정비를 수행한다. |

작업의 주된 결과를 기준으로 하나를 고른다. `Validation` 추가는 대화에서 보류된 제안이며 기본 옵션에 넣지 않는다.

## Target Release

`1.0.0`처럼 통합 버전만 사용한다. `1.0 / Canonical Content` 같은 버전+목표 결합 값은 사용하지 않는다. 하나의 릴리스에 여러 Objective가 포함되고 동일 Objective가 여러 릴리스에서 발전할 수 있다. 실제 릴리스 옵션과 Item별 할당은 Project에서 확인한다.

<!-- END SOURCE: docs/fields.md -->


---

<!-- BEGIN SOURCE: docs/git-workflow.md -->

# Git Workflow

모든 repository가 공유하는 branch·PR·release 전략의 단일 원본이다. 각 레포에 같은 정책을 다시 작성하지 않는다.

## Branch와 통합

- default branch는 `main`, 개발 통합 branch는 `develop`이다.
- 한 번의 작은 변화가 아니라면 Issue별 작업 branch를 `develop`에서 만든다.
- 작업 branch의 변경은 PR로 검토해 `develop`에 통합한다.
- major/minor release마다 `develop`에서 `main`으로 PR을 열어 merge한다.
- 작업 branch에서 `main`으로 직접 PR을 보내 공통 통합 단계를 생략하지 않는다.

작은 변경이라는 이유만으로 `main` 직접 쓰기를 허용한다고 해석하지 않는다. 작은 변경의 직접 반영 대상, patch/hotfix 경로, merge 방식은 아직 확정하지 않았으며 필요해질 때 사용자에게 확인한다. 일반 작업은 위 PR 경로로 진행할 수 있다.

## Issue branch와 PR

Issue lifecycle은 Planning Model (`docs/planning-model.md`), branch 생성·연결·이름의 자동화 계약은 Project Orchestration (`docs/project-orchestration.md`)이 소유한다.

PR에는 결과와 변경 이유, 관련 Issue, 실제 수행한 검증과 남은 제한을 적는다. 여러 commit을 사용한 작업도 최종 diff가 하나의 검토 가능한 변화로 읽혀야 한다. merge 완료 전에는 완료된 integration으로 보고하지 않는다.

Merge method는 공통 강제 정책으로 고정하지 않는다. 다만 작업 과정의 중간·정리 commit이 많이 쌓였고 최종 diff가 하나의 응집된 변화로 읽히는 PR은 **squash merge를 우선 권장**한다. 의미 있는 commit history 자체가 검토·추적 가치가 있으면 rebase 또는 merge를 선택할 수 있다.

## 정책 적용과 기존 상태

공통 전략은 목표 정책이다. 문서를 수정했다고 기존 branch, workflow, protection 설정까지 변경된 것으로 보고하지 않는다. 작업 대상 레포에서 실행에 필요한 차이를 확인하고, 수정할 수 있는 범위에서 적용한다. 전체 레포를 순회하는 동기화 검사를 작업의 필수 조건으로 추가하지 않는다.

Issue를 현재 할당하지 않는 콘텐츠 레포의 범위는 Project Orchestration이 소유한다. 이 운영 범위는 해당 레포의 디렉토리 scheme을 바꾸지 않는다.

<!-- END SOURCE: docs/git-workflow.md -->


---

<!-- BEGIN SOURCE: docs/project-orchestration.md -->

# Project orchestration automation

GitHub repository Issue가 활성화될 때 [Publishing Platform Project #11](https://github.com/users/ooMia/projects/11)의 Item과 Development branch를 자동으로 초기화한다.

## Authentication

Project #11은 user-owned Project이므로 Actions의 repository-scoped `GITHUB_TOKEN`으로 접근할 수 없다. 각 Issue-owning repository에 classic PAT을 `PROJECT_TOKEN` secret으로 저장한다.

현재 automation에 필요한 classic PAT scope는 다음 두 개다.

- `project`: Project #11 조회·Item 추가·custom field 수정
- `repo`: private repository Issue를 Project item으로 조회하고 필요한 repository 리소스에 접근

`workflow`, `admin:*`, `user`, `packages` scope는 현재 runtime automation에 필요하지 않다. PAT로 workflow 파일 자체를 생성·수정하는 self-modifying workflow는 구현하지 않는다.

Repository 내부 Development branch 생성에는 PAT을 사용하지 않는다. 각 workflow의 `GITHUB_TOKEN`에 최소 권한만 부여한다.

## 적용 범위

공통 branch·PR·release 전략은 Git Workflow (`docs/git-workflow.md`)를 따른다. repository별로 같은 base branch 표를 반복 관리하지 않는다.

현재 Issue 작업 대상은 Knowledge, Engine, Site다. `oomia.github.io.docs`는 editor가 작성하고 필요하면 후처리한 콘텐츠의 remote이며, 현재 이 레포 자체에 Issue를 할당하지 않는다. 해당 레포에 별도 Issue 운영 문서를 만들지 않는다.

공통 생성 절차·Project seed·인증·자동화 계약은 이 문서가 소유한다. 실행되는 workflow/script와 적용된 권한 설정은 각 실행 레포가 소유하며 공통 설명을 복제하지 않는다. 실제 적용 여부는 작업 시 확인한다.

## Workflow와 Node script의 역할

GitHub Actions workflow 정의는 `.github/workflows/*.yml`이 소유한다. YAML은 trigger, runner, job permission, secret 전달을 정의한다.

복잡한 GraphQL/JSON 처리는 repository script로 분리하고 YAML의 `run`에서 Node로 실행한다.

```text
issue-activated.yml
├─ project job
│  └─ node .github/scripts/sync-project.mjs
└─ development job
   └─ node .github/scripts/create-development-branch.mjs
```

이는 GitHub Actions의 별도 파일 형식이 아니라 workflow가 runner에서 repository script를 실행하는 일반적인 방식이다.

## Issue activation

workflow는 `opened`, `reopened` 및 수동 `workflow_dispatch`를 지원한다.

자동 실행 조건:

1. Issue가 open 상태다.
2. 제목이 `draft:`로 시작하지 않는다.

따라서 fallback draft가 생성 순간 잠시 open이어도 Project 등록과 branch 생성이 발생하지 않는다.

### Project job

- secret: `PROJECT_TOKEN`
- Project: `ooMia/projects/11`
- 역할: Item 추가 및 Status / Iteration / Work Type / Scope / Objective / Target Release 초기화
- field ID와 option ID는 runtime에 이름으로 조회
- 동일 Item을 다시 추가하면 GitHub가 기존 Item ID를 반환하므로 replay 가능

### Development job

- token: repository `GITHUB_TOKEN`
- permissions: `contents: write`, `issues: write`
- 역할: GitHub GraphQL `createLinkedBranch`로 현재 repository에 Issue-linked Development branch 생성
- `DEVELOPMENT_BASE`는 Git Workflow의 공통 개발 branch를 사용한다.
- 콘텐츠 레포의 Issue 비대상 범위는 위 적용 범위를 따른다.
- `project-seed.development === false`이면 생략

Project PAT은 이 job에 전달하지 않는다.

### Lifecycle synchronization boundary

현재 automation은 **activation 초기화**만 소유한다. trigger는 `opened`, `reopened`, manual `workflow_dispatch`이며 Issue `closed` 이벤트를 Project Status에 반영하지 않는다.

따라서 Issue 종료 후 `Status=Done` 또는 다른 종료 상태가 필요하면 Project #11에서 직접 reconcile한다. `project-seed`는 활성화 초기값일 뿐이므로 닫힌 Issue body의 과거 `Todo` / `In Progress` 값으로 현재 Project 상태를 추론하지 않는다.

close/reopen 양방향 동기화는 실제 반복 비용이 확인될 때 별도 Maintenance 작업으로 추가한다. 현재 문서는 자동화되지 않은 lifecycle을 자동화된 것처럼 설명하지 않는다.

## Orchestration labels

Orchestration 관련 Issue/PR label은 Labels (`docs/labels.md`)의 `orchestration:*` namespace를 사용한다.

- Project의 Status / Iteration / Work Type / Scope / Objective / Target Release를 label로 복제하지 않는다.
- label은 automation, policy, cross-repository coordination, evidence처럼 Project field와 직교하는 횡단 관심사만 표시한다.
- canonical registry는 config/labels.json (`config/labels.json`)이며 Issue-owning repository는 같은 이름과 의미를 사용한다.

## Project seed

새 Issue는 hidden JSON을 Project 초기화 seed로 가진다.

```md
<!-- project-seed
{
  "iteration": "C1-W2",
  "workType": "Feature",
  "scope": ["Content", "Persistence"],
  "objective": "Canonical Content",
  "targetRelease": "1.0.0",
  "status": "Todo"
}
-->
```

지원 키:

- `status`
- `iteration`
- `workType`
- `scope`
- `objective`
- `targetRelease`
- `branch` — 기본 branch naming을 override할 때만 사용
- `development: false` — coordination/document-only Item 등 branch가 필요하지 않을 때

seed는 activation 초기값 전달용이다. 활성화 이후 Project field의 canonical state는 Project #11이다.

## Development branch naming

기본 형식:

```text
<issue-number>-<conventional-type>-<title-slug>
```

예:

```text
13-feat-decouple-canonical-source-from-visual-editor-constraints
```

branch는 Issue 활성화 전 미리 만들지 않는다. GitHub `createLinkedBranch`로 생성해야 Development 관계도 함께 만들어진다.

이미 같은 이름의 branch가 존재하지만 Issue와 연결되어 있지 않다면 automation은 이를 자동 재사용하지 않고 migration error를 낸다.

## Manual replay

PAT 주입 후 기존 Issue를 다시 Project에 동기화하거나 branch 상태를 확인하려면 Actions UI에서 `Issue activation` workflow를 수동 실행하고 `issue_number`를 전달한다.

<!-- END SOURCE: docs/project-orchestration.md -->


---

<!-- BEGIN SOURCE: docs/labels.md -->

# GitHub labels

GitHub labels는 Project #11의 필드 체계를 복제하지 않고, Issue/PR을 여러 repository에서 빠르게 찾기 위한 **횡단 관심사 metadata**로만 사용한다.

## 원칙

- Status / Iteration / Work Type / Scope / Objective / Target Release는 GitHub Project가 SoT다.
- label은 Project field로 자연스럽게 표현되지 않는 운영 의미만 담는다.
- orchestration 전용 label은 `orchestration:*` namespace를 사용한다.
- 하나의 Issue/PR에 여러 orchestration label을 함께 붙일 수 있다.
- Issue 대상 repository의 범위는 Project Orchestration (`docs/project-orchestration.md`)이 소유한다.

## Registry

label의 **이름과 의미**는 config/labels.json (`config/labels.json`)을 canonical source로 사용한다. 색상은 UI 구분을 위한 표시 힌트이며 repository별 실제 색과 달라도 semantics가 바뀌지 않는다.

## 사용 기준

주된 Outcome이 자동화 구현이면 `orchestration:automation`을 붙인다. 여러 repository에 걸치면 `orchestration:cross-repo`를 추가한다. 정책 자체를 변경할 때만 `orchestration:policy`, 검증 자체가 독립적인 Outcome일 때만 `orchestration:evidence`를 사용한다.

예를 들어 repository Issue activation을 구축하는 coordination Issue에는 다음 조합이 적합하다.

```text
orchestration:automation
orchestration:cross-repo
```

단순히 Acceptance Criteria에 검증 단계가 있다는 이유만으로 `orchestration:evidence`를 추가하지 않는다.

<!-- END SOURCE: docs/labels.md -->


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

## 기준 revision

| 역할 | Repository | Revision | 의미 |
|---|---|---|---|
| legacy authoring / publishing | [`ooMia/oomia.github.io.engine`](https://github.com/ooMia/oomia.github.io.engine) | [`6ba2f950a78eef18c2efa305b96a1c8d0443252e`](https://github.com/ooMia/oomia.github.io.engine/commit/6ba2f950a78eef18c2efa305b96a1c8d0443252e) | Payload/PostgreSQL CMS와 DB→docs publish Evidence |
| content repository snapshot | [`ooMia/oomia.github.io.docs`](https://github.com/ooMia/oomia.github.io.docs) | [`50d89a4cb1c5d6476444e29454e12b523e99231b`](https://github.com/ooMia/oomia.github.io.docs/commit/50d89a4cb1c5d6476444e29454e12b523e99231b) | 해당 revision은 당시 generated snapshot; 현재 레포 전체 상태에 대한 판정은 아님 |
| presentation / delivery | [`ooMia/oomia.github.io`](https://github.com/ooMia/oomia.github.io) | [`a3b2e182563458636b7b8186a4cd2201894b2a65`](https://github.com/ooMia/oomia.github.io/commit/a3b2e182563458636b7b8186a4cd2201894b2a65) | docs content를 Site에서 실제 build/deploy한 Evidence |

`oomia.github.io`의 package name은 `oomia.github.io.mono`이고 일부 engine 문서에서는 이를 `mono`라고 부른다. 별도 원격 `oomia.github.io.mono`가 있다는 뜻은 아니다.

## Architecture transition

기술 전환 상세는 전환 guide (`docs/architecture-transition.md`), [Engine migration record](https://github.com/ooMia/oomia.github.io.engine/blob/develop/docs/migration.md), [Site integration 전환](https://github.com/ooMia/oomia.github.io/blob/develop/docs/content-consumption-contract.md#consumer-integration-전환)을 참조한다. 이 문서는 구현 순서·코드 이관 계획을 별도로 소유하지 않는다.

## 1.0 capability 상태

상태는 **미검증 / 미충족 / 부분 충족 / 충족**만 사용한다.

| Capability | 당시 판정 | 기준 revision의 Evidence | 다음 통합 검수 연결 |
|---|---|---|---|
| Authoring | **미충족** | Payload Admin에서 visual create/edit/save가 E2E로 검증된 legacy implementation은 존재한다. [e2e.ts](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/scripts/e2e.ts) | 실제 md-like source를 호환 authoring tool로 수정·보존하고 Site가 소비하는 Evidence. editor 종류 자체는 판정 대상이 아니다. |
| Canonical Content | **부분 충족** | docs repository에는 실제 Markdown/MDX files와 Git history가 있고 Site가 이를 소비할 수 있다. 기존 Engine DB에도 raw body string 보존 Evidence가 있다. | 사용자 작성 파일의 보존과 Git revision 관계. 선택적 후처리는 별도 기능으로 검수한다. [Engine 수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/develop/docs/content-modification-contract.md). |
| Extensibility | **부분 충족** | 기존 custom `Callout`이 engine/site 양쪽에서 opt-in되고 consumer build를 통과한 Evidence가 있다. | 동일 component implementation/package를 사용하는 실제 Site consumer와 필요한 authoring integration Evidence. 지원 catalog는 Knowledge가 별도로 판정하지 않는다. |
| Automation | **부분 충족** | legacy Payload publish action과 docs workflow가 explicit trigger, failure propagation, idempotent no-op을 검증했다. [Issue #8](https://github.com/ooMia/oomia.github.io.engine/issues/8) | 실제 후처리·발행 workflow에 automation이 참여한다는 Evidence. 기능별 이슈 (`docs/operating-rhythm.md`). |
| Publishing | **부분 충족** | legacy workflow는 DB snapshot을 docs repo에 materialize하고 실제 Site sync/lint/test/typecheck/build를 통과시켰다. [docs workflow](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/scripts/docs-workflow.ts) | 현재 콘텐츠 revision의 소비 검증과 결과 재현성. [Site 소비 계약](https://github.com/ooMia/oomia.github.io/blob/develop/docs/content-consumption-contract.md#publishing). |
| Presentation | **충족** | Site가 docs repository의 Markdown/MDX를 Astro content collection으로 읽어 렌더한다. [content config](https://github.com/ooMia/oomia.github.io/blob/a3b2e182563458636b7b8186a4cd2201894b2a65/apps/web/src/content.config.ts) | 현재 콘텐츠 revision에 대한 실제 렌더링 Evidence를 확보해 재평가. |
| Delivery | **충족** | docs SHA를 소비하는 Site revision의 GitHub Pages build/deploy가 성공했다. [run 35472028484](https://github.com/ooMia/oomia.github.io/actions/runs/35472028484) / [artifact 10593195312](https://github.com/ooMia/oomia.github.io/actions/runs/35472028484/artifacts/10593195312) | 새 콘텐츠 revision → Site revision → 배포 결과의 연결을 검증해 재평가. |

## 폐기 또는 재사용 판단

책임 레포의 [Engine 전환 기록](https://github.com/ooMia/oomia.github.io.engine/blob/develop/docs/migration.md) 및 [Site integration 설계](https://github.com/ooMia/oomia.github.io/blob/develop/docs/content-consumption-contract.md#consumer-integration-전환)를 참조한다. 구현 상세의 상태 원장을 이 문서에 복제하지 않는다.

## 1.0 구현 delta

위 표의 통합 검수 gap을 해당 레포 Issue의 Outcome/AC/Evidence에 연결한다. 개별 명령·코드 구조·package 선택과 실행 우선순위는 소유 Issue에서 관리한다. 각 capability 판정은 연결된 Evidence를 실제로 재검증한 뒤 변경한다.

## Issue #13 / #14 영향

[Engine #13](https://github.com/ooMia/oomia.github.io.engine/issues/13), [Engine #14](https://github.com/ooMia/oomia.github.io.engine/issues/14)의 과거 구현 범위를 여기서 재정의하지 않는다. [Engine migration record](https://github.com/ooMia/oomia.github.io.engine/blob/develop/docs/migration.md)와 책임 레포의 현재 Issue를 확인하고, Knowledge에서는 통합 Evidence에 영향을 주는 결과만 연결한다.

## 갱신 규칙

- 이 문서는 live branch 상태가 아니라 immutable Evidence 기반 snapshot이다.
- architecture가 변경되면 같은 코드 revision도 새 Product Boundary에 대해 다시 평가할 수 있다.
- legacy implementation 성공을 현재 target 완료로 간주하지 않는다.
- 새 Engine/docs/Site integration이 main에 들어간 뒤 기준 revision과 capability 상태를 다시 갱신한다.

<!-- END SOURCE: docs/implementation-map.md -->


---

<!-- BEGIN SOURCE: docs/operating-rhythm.md -->

# Operating Rhythm

상태: 활동 계획의 사용자 명시 사항 중심. 출처: S1 `e0a335ad`, `1f288b42`, `33b898b1`.

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
- [문서 수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/develop/docs/content-modification-contract.md)
- [Migration record](https://github.com/ooMia/oomia.github.io.engine/blob/develop/docs/migration.md)

## Site

- [현재 구현](https://github.com/ooMia/oomia.github.io/blob/main/README.md)
- [콘텐츠 소비 계약](https://github.com/ooMia/oomia.github.io/blob/develop/docs/content-consumption-contract.md)

실제 supported syntax, frontmatter schema, component package/API, editor adapter 같은 구현 정보는 owning repository의 code/docs를 확인한다. Knowledge는 별도 manifest나 compatibility summary를 유지하지 않는다.

## Historical reference

삭제된 과거 설계와 provenance가 필요하면 Git history 또는 `archive/main-before-cleanup-20260921` branch를 조사한다.

<!-- END SOURCE: docs/decisions.md -->


---

<!-- BEGIN SOURCE: docs/open-questions.md -->

# Open Questions / Verification Gaps

현재 canonical 정책에서 **제품 경계·release acceptance·공통 Project 운영 수준에서 실제 결정이 필요한 항목**만 유지한다. 구현 repository가 code로 결정할 수 있는 세부사항은 이 목록에 올리지 않는다.

| ID | 항목 | 현재 처리 |
|---|---|---|
| Q003 | 1.0 final release gate | 새 canonical Docs → Site vertical slice의 실제 acceptance/Evidence chain이 확보된 뒤 구체화 |
| Q006 | Status 옵션 및 계획 Item의 Objective/Target Release 빈 값 허용 규칙 | Project 운영상 실제 불편이 확인될 때 확정 |
| Q007 | Work Type Validation 추가 | 보류. 현재 기본값 유지 |
| Q010 | 미디어 공개 범위·asset 저장 정책 | public/private와 large/binary policy가 제품 운영에 필요해질 때 결정 |
| Q014 | raw HTML 및 executable MDX public publish policy | public publish security boundary가 필요해질 때 결정 |
| Q025 | stable document identity / sidecar linkage | path-independent identity가 제품 수준 요구가 될 때 결정 |

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

공통 Git Workflow (`docs/git-workflow.md`)를 따른다. Knowledge만의 별도 branch 전략이나 merge 규칙을 중복 정의하지 않는다.

## Evidence

설계·계획 정의 자체가 Outcome이면 관련 canonical 문서의 immutable commit/permalink를 완료 Evidence로 사용할 수 있다. `main` 링크는 최신 정의를 찾는 reference로 사용한다.

기능 구현, 성능·신뢰성 검증, 실제 publishing/deployment 완료에는 설계 링크를 대체 Evidence로 사용하지 않는다. 책임 레포의 코드·테스트·실행 결과·commit/PR·deployment처럼 재현 가능한 자료가 필요하다.

## 세션 인계

의미 있는 작업 세션을 종료할 때 장기적으로 남아야 할 규칙·결정은 먼저 owning canonical 문서에 반영한다. 아직 진행 중인 branch/Issue/Project 상태, 재검증 항목, 다음 안전한 행동은 `handoff/current.md`에 기록한다.

`handoff/current.md`는 세션 로그나 의사결정 원장이 아니다. 매번 최신 checkpoint로 overwrite하고, 과거 상태는 Git history에 맡긴다. 구현 수준은 handoff가 아니라 revision-bound Implementation Map (`docs/implementation-map.md`)과 책임 레포 Evidence로 판정한다.

## 대화에서 변경을 가져올 때

사용자의 명시적 정정 → 이후 사용자 메시지에 반영된 규칙 → 최신 assistant 제안 → 오래된 초안 순으로 근거를 판단한다. 시간상 최신이라는 이유만으로 제안을 사용자 승인으로 바꾸지 않는다. 현재 `main`은 과거 대화 provenance를 별도 원장으로 유지하지 않는다. 과거 근거가 꼭 필요하면 `archive/main-before-cleanup-20260921` branch를 확인하고, 현재 문서에는 현재 유효한 결론만 반영한다.

## 공유

이 레포의 현재 `main`은 raw conversation transcript나 source/turn provenance chronology를 보관하지 않는다. 과거 자료는 historical archive branch에 보존하며, Chat에 필요한 기본 첨부물은 `dist/CONTEXT-BUNDLE.md`다.

<!-- END SOURCE: CONTRIBUTING.md -->
