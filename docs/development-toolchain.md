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
