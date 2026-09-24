# Repository Design & Maintenance

상태: 공통 repository scheme과 문서 소유권의 원본. 하단의 기존 Engine/Site 설계 절은 이관 검토 중이며 공통 scheme을 재정의하지 않는다.

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

Engine에서도 다음 차이가 실제로 생기면 directory/package boundary 후보가 된다.

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
| 공통 개발 도구 지침 | [Development Toolchain](development-toolchain.md) |
| 공통 branch·PR·release 전략 | [Git Workflow](git-workflow.md) |
| Issue lifecycle·계획·완료 의미 | [Planning Model](planning-model.md) |
| Project/Issue 공통 자동화 계약 | [Project Orchestration](project-orchestration.md) |
| 구현되는 기술 설계·API·동작 계약·실행·재현 방법 | 책임 구현 repository의 `docs/` 및 코드 |
| 작업별 읽기 경로 | [CONTEXT](../CONTEXT.md) |

기술 설계는 구현되는 레포에 두고 Knowledge는 해당 문서를 링크로 참조한다. 두 레포가 함께 소비한다는 이유만으로 기술 계약 전체를 Knowledge 소유로 정하지 않는다. producer/consumer 사이의 원본 소유자가 불분명하면 사용자에게 질문하고 이동을 보류한다.

공통 규칙은 각 레포에 다시 작성하지 않는다. scaffolding 시 공통 개발 지침을 참조해 해당 레포에 적용한 설정·명령·제약을 명시할 수는 있다. 이 문서는 적용 결과이며 공통 기준의 별도 원본이 아니다. 공통 Git flow나 디렉토리 역할을 반복 복사할 필요는 없다.

새 문서는 새로운 정보 소유권이 필요할 때만 만든다. 편의를 위한 요약·템플릿은 정책을 복제하지 않고 원본을 참조한다. 참조 경로는 작업 진입점 → 소유 문서 → 구현 근거 순으로 구성하고, 서로를 읽어야 정의를 이해할 수 있는 순환 의존을 만들지 않는다.

기존 기술 문서는 목적지 원본과 참조 전환이 준비되기 전까지 제거하지 않는다. 하단 Engine/Site 설계 절과 다른 기술 문서의 이관 판단은 [Open Questions](open-questions.md)에 기록한다.

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

## 14. Scratch-build policy for Engine

현재 Engine은 legacy CMS architecture coupling이 강하므로 **greenfield scratch target을 기본 migration 전략으로 채택한다.**

의미:

- Git history와 legacy revision은 보존한다.
- 기존 source tree를 새 architecture의 directory template로 사용하지 않는다.
- 새 branch에서 target architecture 기준 skeleton을 만든다.
- legacy code는 검토 후 필요한 부분만 의도적으로 port한다.
- “삭제하고 다시 쓰기”와 “history를 지우기”를 동일시하지 않는다.

우선 port 후보:

- process execution abstraction이 실제로 유용하면 해당 부분
- concurrency/idempotency behavior
- evidence/revision linkage
- Site verification logic

port하지 않는 기본값:

- Payload UI
- PostgreSQL lifecycle
- Lexical codec
- DB export
- legacy CMS task taxonomy

## 14.5 Engine runtime shape

Engine 1.0은 long-running service가 아니라 one-shot CLI runtime이다.

권장 adapter/application 분리:

```text
apps/engine/src/
├─ cli.ts
├─ commands/
│  ├─ doctor.ts
│  ├─ prepare.ts
│  ├─ verify.ts
│  └─ publish.ts
└─ engine/
   ├─ doctor.ts
   ├─ prepare.ts
   ├─ verify.ts
   └─ publish.ts
```

`commands/*`는 CLI argument/input/output adapter이고, `engine/*`는 실제 operation을 소유한다. 향후 HTTP/API가 필요해져도 operation API 위에 adapter를 추가할 수 있게 CLI parsing, stdout/stderr, process exit를 core operation 안으로 침투시키지 않는다.

1.0에서 만들지 않는 것:

- HTTP server
- request router
- job queue
- publish job database
- server-side progress/session store
- cancellation API

`prepare`는 mounted docs workspace에 write access가 필요하고, `verify`는 원칙적으로 source read-only로 동작할 수 있다. `publish`는 committed source를 수정하지 않지만 remote Git/Site linkage를 변경할 수 있다.

one-shot container는 command invocation 단위로 실행·종료한다. persistent state는 mounted Git workspace, remote Git, Site repository, Evidence artifact에 둔다.

## 15. Engine scratch initial shape

초기 proposal:

```text
/
├─ apps/
│  └─ engine/
│     ├─ src/
│     └─ tests/
├─ .github/
├─ .vite-hooks/
├─ package.json
├─ pnpm-workspace.yaml
├─ tsconfig.json
└─ vite.config.ts
```

`packages/*`와 `tools/*`는 실제 extraction point가 확인될 때 추가한다.

첫 구현부터 다음처럼 나누지 않는다.

```text
packages/
├─ core
├─ git
├─ workspace
├─ process
├─ validation
└─ utils
```

이들은 architecture diagram의 개념이지 반드시 npm/workspace package여야 하는 것은 아니다.

## 16. Site migration implication

Site는 이미 docs consumption → Astro build → GitHub Pages delivery Evidence가 있으므로 Engine과 달리 greenfield를 기본값으로 하지 않는다.

- Astro structure는 유지 가능
- Fumadocs integration은 incremental spike
- Turbo는 Vite+ task parity가 확인될 때 단계적으로 제거 가능
- generic `packages/ui`, `packages/md`는 실제 새 responsibility와 맞는지 integration 과정에서 재검토

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
