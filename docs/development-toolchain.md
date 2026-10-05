# Development Toolchain — Vite+ / uv First

> **Authority:** GUIDANCE  
> **Owner:** project-wide toolchain defaults and tool-selection principles  
> **Scope:** Publishing Platform repositories using Node.js/JavaScript/TypeScript or Python tooling  
> **Read when:** choosing a repository toolchain, replacing overlapping tooling, or reviewing tool ownership

이 문서는 공통 **default와 선택 원칙**을 제공한다. exact runtime/tool version, command, config, CI job, hook, IDE setting과 migration state는 owning repository가 소유한다. repository-local 이유가 있으면 이 GUIDANCE와 다른 도구를 사용할 수 있다.

## Defaults

| Project type | Preferred default |
|---|---|
| Node.js / JavaScript / TypeScript | Vite+ (`vp`) first |
| Python | `uv` first |

같은 책임을 가진 도구를 단순 선호나 과거 습관 때문에 여러 기본값으로 유지하지 않는 편을 권장한다.

## Node / JS / TS

- Vite+가 제공하는 package management, static checks, test/build/task, environment, hook 기능은 가능한 한 `vp` command surface를 우선한다.
- framework/package 고유 command가 필요하면 owning repository가 명시적인 task/script로 노출하는 편이 좋다.
- Vite+와 같은 책임을 가진 Turbo, Husky, formatter/linter wrapper 등을 병행할 때는 실제 남아 있는 responsibility를 repository-local source에서 설명한다.
- runtime/package-manager/tool version은 repository-declared state로 재현 가능하게 유지한다.
- publish/deploy/Git mutation 같은 side-effect operation을 cacheable pure task와 같은 방식으로 취급하지 않는다.

현재 exact `vp` command, `vite.config.*`, package-manager pinning, hook/cache/CI setup은 owning repository README/config/workflow를 직접 확인한다.

## Python

- project metadata와 dependency declaration은 `pyproject.toml` 중심 구성을 우선한다.
- dependency synchronization, lock, add/remove, project command 실행은 `uv` interface를 우선한다.
- reproducible dependency state가 필요하면 repository-owned `uv.lock`을 사용하는 편이 좋다.
- Python/runtime requirement와 exact version은 owning repository 설정이 선언한다.
- `pip`, Poetry, Pipenv, Conda 등은 runtime/distribution 제약이 있을 때 선택할 수 있지만 같은 responsibility의 기본 project manager를 불필요하게 중복하지 않는다.

exact `uv` command, Python version, environment/CI setup은 owning repository가 소유한다.

## Shared heuristics

- **Single owner:** formatter, linter, task runner, package/project manager 같은 동일 concern을 여러 계층이 독립적으로 소유하지 않는다.
- **Reproducibility:** developer machine의 우연한 global environment보다 repository-declared state를 우선한다.
- **Repository-local application:** 공통 default의 실제 적용 상태는 repository code/config/docs에서 확인한다.
- **Explicit deviation:** default와 다른 선택은 기술적 이유와 verification 방법이 repository-local source에서 이해 가능하도록 한다.
- **Side-effect boundary:** build/check와 publish/deploy/Git mutation을 구분한다.

## Current implementation references

- Engine: [README](https://github.com/ooMia/oomia.github.io.engine/blob/main/README.md)
- Site: [README](https://github.com/ooMia/oomia.github.io/blob/main/README.md)
- Docs: repository workflow/config가 실제 content preparation과 runner/tool usage를 소유한다.

위 링크는 **current implementation lookup**이며 이 GUIDANCE의 Evidence나 강제 조건이 아니다.

## External references

- Vite+: https://viteplus.dev/guide/
- uv: https://docs.astral.sh/uv/
