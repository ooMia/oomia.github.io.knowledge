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
