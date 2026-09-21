# Current Decisions

이 문서는 **현재 유효한 cross-repository / product-level 결정만** 요약한다.

과거 제안, superseded decision chain, 정리 전 상세 Git history가 필요하면
`archive/main-before-cleanup-20260921` branch를 참고한다.

세부 규칙은 각 owning document가 canonical source이며, 이 문서는 현재 방향을 빠르게 파악하기 위한 index다.

## Knowledge

- Knowledge `main`은 과거 변화 기록보다 **현재 목표·계약·미결 사항**을 설명한다.
- 장시간·다문서·다단계 변경은 별도 branch에서 수행하고 PR로 검토한 뒤 **squash merge**를 기본으로 한다.
- 작은 국소 수정만 `main`에 직접 반영할 수 있다.
- live 작업 상태는 `handoff/current.md`, 구현 수준은 revision-bound [Implementation Map](implementation-map.md), 실제 작업 상태는 GitHub Project와 책임 구현 repository가 소유한다.

## Canonical content

- canonical authoring content는 Git-backed filesystem document workspace에 둔다.
- local working tree는 draft/uncommitted state이며, `ooMia/oomia.github.io.docs`의 commit이 durable shared canonical revision이다.
- document-local persistent metadata는 **frontmatter-first**다.
- explicit frontmatter value가 있으면 그 값을 authoritative로 보고 Engine은 해당 field를 재계산하거나 덮어쓰지 않는다.
- Engine enrichment는 unset/missing field를 보완하는 방향으로 시작한다.
- byte-exact formatting preservation은 contract가 아니다. formatter/editor/tooling이 semantic content와 explicit metadata 의미를 보존하는 범위에서 source를 normalize할 수 있다.
- sidecar/reference metadata는 frontmatter가 실제로 부적합한 사례가 생길 때 도입한다.
- docs layout은 free-form, consumer-specific convention, strict repository-wide convention 중 어느 형태도 현재 사전에 금지하지 않는다.

## Authoring

- 기존 content corpus는 Obsidian 기반이며 basic Obsidian Markdown/file authoring은 이미 가능한 경로로 본다.
- 최종 editor 역할은 아직 확정하지 않는다.
- Fumadocs Editor는 custom component authoring/structured editing에서 실제 이점이 있는지 기존 corpus로 검증한다.
- Obsidian-native custom syntax/CSS/plugin bridge는 1.0 필수 범위가 아니다.
- synthetic fixture보다 기존 작성 corpus를 integration evidence로 우선 사용하고, fixture는 edge-case regression에 보조적으로 사용한다.

## Engine

- Engine 1.0은 **stateless, invocation-driven, CLI-first one-shot runtime**이다.
- 기본 operation surface는 `doctor / prepare / verify / publish` 방향으로 설계한다.
- `prepare`는 commit 전에 working-tree source를 수정할 수 있지만 stage/commit/push하지 않는다.
- `verify`는 source mutation 없이 검증한다.
- `publish`는 사용자가 확정한 committed docs revision을 대상으로 하며 dirty source를 자동 commit하지 않는다.
- timestamp derivation, file/staged/all selection, prompt UX, formatting 방식 같은 초기 구현 세부사항은 Engine repository에서 유연하게 실험한다.
- Engine은 Payload/PostgreSQL 기반 CMS를 target architecture로 유지하지 않는다.

## Publishable projection

- canonical authoring source와 Site가 실제 소비하는 document는 동일할 필요가 없다.
- persistent/user-meaningful metadata는 commit 전에 canonical source에 저장할 수 있다.
- committed canonical revision 이후에는 consumer-specific/derived 정보를 deterministic publishable projection으로 만들 수 있다.
- projection은 derived artifact이며 새로운 source of truth가 아니다.
- 최종 publishability에는 실제 Site consumer validation/build가 포함되어야 한다.
- projection materialization 위치는 Site/Fumadocs integration evidence를 보고 결정한다.

## Site / components

- Site는 현재 Astro 기반 delivery evidence를 보존하며 incremental migration을 우선한다.
- Fumadocs UI/Core/MDX 등 검증된 built-in capability를 우선 재사용한다.
- 별도 custom component package/profile은 실제 cross-repository sharing contract가 필요해질 때만 만든다.
- Turbo 사용을 새 workflow에서 확대하지 않으며, 제거 여부는 Vite+ task parity와 existing build/CI evidence를 확인한 뒤 결정한다.

## Engineering

- JavaScript/TypeScript repository의 primary command surface는 Vite+ `vp`다.
- Vite+가 제공하는 package/check/lint/fmt/test/build/task/hook 기능을 우선 사용하고 동등 역할 wrapper를 새로 중복 도입하지 않는다.
- repository structure는 **monorepo-ready, package-light**를 기본으로 한다.
- `apps/*`는 실행 단위, `packages/*`는 실제 reusable/dependency boundary, `tools/*`는 repository-only tooling에 사용한다.
- 새 Engine target은 기존 repository history를 유지하면서 **greenfield scratch implementation**으로 시작한다.
- legacy tree는 template가 아니라 reference이며 generic verified behavior만 의도적으로 port한다.
- scratch bootstrap baseline은 현재 Node.js `24.20.0`, pnpm `12.3.4`, Vite+ `0.3.3`이다. 이후 upgrade는 별도 maintenance change로 다룬다.
- 새 Git-backed vertical slice가 검증되기 전에 legacy path를 big-bang delete하지 않는다.

## Planning / Project

- GitHub Project 분류 필드 이름은 **Work Type**을 사용한다.
- Objective와 Target Release는 서로 다른 목적의 필드로 유지한다.
- Scope는 작업이 직접 변경하는 책임을 표현하며 불필요한 dependency tagging을 피한다.
- Project README는 장기 설계를 복제하지 않고 canonical Knowledge 문서를 찾기 위한 index로 유지한다.

## Historical reference

정리 전의 세부 decision history, 대화 provenance, 변경 순서가 필요한 경우:

- branch: `archive/main-before-cleanup-20260921`
- cleanup 전 `main` HEAD: `3b7d16273ff4cce90bbbdae19b796bd89b452a9b`

현재 방향을 판단할 때는 archive보다 현재 `main`의 canonical documents를 우선한다.
