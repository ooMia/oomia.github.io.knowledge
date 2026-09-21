# Current Handoff

Updated: 2026-09-21 13:16 KST

이 파일은 다음 구현 세션을 위한 **volatile checkpoint**다. 장기 정책은 `docs/*`와 [Current Decisions](../docs/decisions.md)를 우선한다.

## Start here

다음 세션의 첫 작업 대상:

- Engine Issue: https://github.com/ooMia/oomia.github.io.engine/issues/21
- Development branch: `21-feat-bootstrap-filesystem-first-engine-runtime`
- Engine repository: https://github.com/ooMia/oomia.github.io.engine
- Knowledge revision used by Issue #21: `542d5ab26a4d798158d3528de209ede040092eca`

Issue #21은 active 상태로 발행되었고 issue-activation workflow에 의해 `develop` 기반 linked Development branch가 생성된 것을 확인했다.

## Immediate implementation outcome

**filesystem-first Engine runtime을 greenfield scratch 형태로 실행 가능하게 만들고, frontmatter-first pre-commit `prepare`를 첫 vertical slice로 검증한다.**

첫 Issue에서는 전체 publishing system을 완성하지 않는다.

핵심 범위:

- stale Engine Agent/Copilot instructions 교체
- Node.js `24.20.0` / pnpm `12.3.4` / Vite+ `0.3.3` baseline 유지
- monorepo-ready / package-light scratch structure
- CLI-first one-shot Engine runtime
- `doctor / prepare / verify / publish` operation boundary를 염두에 두되 실제 vertical slice는 `prepare`
- frontmatter missing-only enrichment
- explicit frontmatter value preservation
- automated tests + VP-first check/test/build
- legacy implementation은 reference로 보존

Issue 본문의 Acceptance Criteria를 실제 구현 contract로 우선한다.

## Canonical lifecycle

```text
Authoring Draft
      ↓
engine prepare
      ↓
Prepared Canonical Source
      ↓
user review + git commit
      ↓
Canonical Revision
      ↓
deterministic projection
      ↓
Site
```

현재 최소 invariant:

- document-local persistent metadata는 frontmatter-first
- explicit frontmatter value가 존재하면 Engine은 해당 field를 재계산하거나 덮어쓰지 않음
- Engine은 unset/missing field를 보완하는 방향으로 시작
- `prepare`는 stage / commit / push하지 않음
- timestamp derivation, file/staged/all selection, prompt UX, formatting 방식은 Engine implementation responsibility
- byte-exact preservation은 요구하지 않으며 semantic content와 explicit metadata 의미를 보존하는 normalization은 허용

## Engine target

Engine 1.0:

- stateless
- invocation-driven
- CLI-first
- one-shot runtime
- persistent job/session/server state를 소유하지 않음

새 implementation은 legacy tree를 template로 쓰지 않는다.

초기 구조 후보:

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

`packages/*` / `tools/*`는 실제 extraction point가 생긴 뒤 추가한다.

## Legacy safety

Engine #13:

- https://github.com/ooMia/oomia.github.io.engine/issues/13
- branch: `13-feat-decouple-canonical-source-from-visual-editor-constraints`
- Payload/Lexical 전제의 과거 AC를 현재 target contract로 사용하지 않는다.
- 별도 Codex/local environment에 unpushed work가 있을 가능성이 있으므로 branch 삭제/reset 전에 반드시 확인한다.

Engine #14:

- https://github.com/ooMia/oomia.github.io.engine/issues/14
- closed / not_planned
- “Visual codec을 global publish gate로 사용하지 않는다”는 목적만 현재 architecture와 호환된다.

재사용 후보:

- generic process execution
- idempotency
- evidence/revision linkage
- actual Site verification behavior

복제하지 않을 것:

- Payload UI
- PostgreSQL lifecycle
- Lexical codec
- DB export taxonomy
- legacy CMS task taxonomy
- speculative `packages/utils`, `packages/infra` 구조

## Toolchain policy

Canonical:

- [Development Toolchain](../docs/development-toolchain.md)
- [Repository Design](../docs/repository-design.md)

핵심:

- JS/TS primary command surface는 Vite+ `vp`
- `vp <built-in>`과 `vp run` / `vpr`를 구분
- Vite+가 제공하는 check/lint/fmt/test/build/task/hooks를 우선
- 새 Engine에 Turbo/Husky 등 동등 역할 wrapper를 다시 도입하지 않음
- root config가 shared toolchain policy 소유
- stateful publish/Git/external mutation task는 cache하지 않음
- first scratch change에서 stale `.github/copilot-instructions.md` 교체

## What is intentionally unresolved

다음은 Issue #21을 시작하기 위한 blocker가 아니다.

- docs final layout
- Fumadocs Editor 최종 채택 여부
- projection materialization location
- Engine container credential contract
- full publish/Site delivery integration
- metadata 전체 field list
- timestamp semantics
- file/staged/all prepare selection
- interactive prompt UX
- YAML formatting fidelity
- sidecar/stable document identity

실제 구현에서 가장 단순한 방법으로 시작하고 반복되는 제약이 확인될 때 Knowledge로 승격한다.

## Next session procedure

1. local Engine working tree와 현재 branch를 확인한다.
2. #13 local/unpushed Codex work가 있는지 확인하고 destructive operation을 피한다.
3. `21-feat-bootstrap-filesystem-first-engine-runtime` branch를 checkout한다.
4. Issue #21 Outcome / Acceptance Criteria를 읽는다.
5. stale Copilot instructions를 먼저 현재 Knowledge 기준으로 교체한다.
6. scratch skeleton을 최소 구조로 만든다.
7. `prepare` missing-only enrichment vertical slice와 tests를 구현한다.
8. VP-first check/test/build Evidence를 남긴다.
9. 구현 중 발견한 세부 선택은 Engine repo에서 결정하고, cross-repository/product contract가 된 것만 Knowledge에 반영한다.
10. 완료 시 PR에 AC/Evidence/migration note를 기록한다.

## Reverify before destructive mutations

- #13 local/unpushed work
- Engine `main` / `develop` HEAD
- Issue #21 linked branch HEAD
- branch 삭제 전 미병합 work
- legacy code를 제거하기 전 새 vertical slice Evidence

## Do not assume

- Payload/PostgreSQL/Lexical이 target architecture라고 가정하지 않는다.
- legacy Engine directory/package taxonomy를 scratch target으로 복제하지 않는다.
- docs layout을 미리 strict/free-form 중 하나로 고정하지 않는다.
- Fumadocs Editor를 필수 dependency로 가정하지 않는다.
- metadata 세부 구현을 Knowledge-level blocker로 만들지 않는다.
- `vp dev`가 package `dev` script를 실행한다고 가정하지 않는다.
