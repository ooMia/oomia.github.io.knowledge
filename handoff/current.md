# Current Handoff

Updated: 2026-09-20 (Asia/Seoul)

이 파일은 다음 작업 세션이 안전하게 이어받기 위한 **volatile checkpoint**다. 장기 정책이나 제품·아키텍처 결정의 canonical source가 아니며, 확정된 내용은 반드시 해당 `docs/*` 원본으로 승격한다.

## Active work

- Engine Issue [#13](https://github.com/ooMia/oomia.github.io.engine/issues/13)은 별도의 Codex 앱에서 구현 중이며, 현재 사용량 제한으로 해당 실행이 중단된 상태다.
- 이 Chat 세션에서는 #13의 branch/code를 수정하지 않는다. Codex 로컬에 미push 변경이 있을 수 있으므로 원격 상태를 구현 미착수의 증거로 사용하지 않는다.
- 병행 작업의 canonical 방향은 **독립 content-component repository + public npm `@oomia/content-components`**다.
- Site [draft Issue #9](https://github.com/ooMia/oomia.github.io/issues/9)는 이전 Site-owned package 안을 기록한 superseded draft이며 활성화하지 않는다.
- package는 framework-neutral contract/manifest와 React renderer surface를 분리한다. public implementation에는 `.astro`를 사용하지 않는다.
- Site는 React renderer consumer, Engine/CMS는 framework-neutral contract/manifest consumer다.
- 현재 결정 gate는 Open Questions Q011/Q012/Q016: initial version/release/compatibility, exact subpath exports, 독립 GitHub repository owner/name/visibility다.

## Verified repository state

2026-09-20 현재 branch topology를 다시 확인하고 stale checkpoint를 갱신했다.

- Site [`ooMia/oomia.github.io`](https://github.com/ooMia/oomia.github.io)
  - `main` = `develop` = `0f6e38a502cccf085312bedb1d7c7c1d77fba295`
  - default branch는 `main`
  - merged head branch 자동 삭제 활성화
  - default branch에 required linear history + required signatures ruleset 적용
- Engine [`ooMia/oomia.github.io.engine`](https://github.com/ooMia/oomia.github.io.engine)
  - [`main`](https://github.com/ooMia/oomia.github.io.engine/tree/main) = [`develop`](https://github.com/ooMia/oomia.github.io.engine/tree/develop) = [Issue #13 branch](https://github.com/ooMia/oomia.github.io.engine/tree/13-feat-decouple-canonical-source-from-visual-editor-constraints)
  - 세 branch 모두 `e140a33ee2db199e5cce170a3f2f11a34bf30256`
  - `develop`은 기존 2-commit behind 상태에서 `main`으로 fast-forward 완료
  - Issue #13 branch는 기존 3-commit behind 상태에서 `develop`으로 fast-forward 완료
  - 두 ref 이동 모두 force 없이 수행했으며 현재 compare 결과는 identical
  - Issue activation workflow 자동 trigger는 `opened`, `reopened`
- Docs [`ooMia/oomia.github.io.docs`](https://github.com/ooMia/oomia.github.io.docs)
  - generated projection
  - Issue activation automation 대상 아님
- Knowledge [`ooMia/oomia.github.io.knowledge`](https://github.com/ooMia/oomia.github.io.knowledge)
  - `main`: `02f984a5b9c057da74cfd0ddea792d4cf64c366c` (이 handoff 갱신 전 기준)
  - repository visibility: `public`
  - 작은 문서·정책 변경은 `main` 직접 반영 가능, 큰 변화는 PR 사용
  - Issue activation Development base는 `main`

## Issue #13 implementation anchors

다음 세션에서는 긴 대화 기록보다 아래 **repo / path / line range / 의미**를 먼저 읽는다.

### Canonical policy

1. [`docs/content-authoring-contract.md#L9-L12`](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/content-authoring-contract.md#L9-L12)
   - canonical source는 CMS/Visual Editor와 독립적으로 보존한다.
2. [`docs/content-authoring-contract.md#L17-L26`](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/content-authoring-contract.md#L17-L26)
   - Editing을 Visual / Source / Unsupported로 분리한다.
   - Visual 표현 실패는 content 지원 실패가 아니다.
3. [`docs/content-authoring-contract.md#L27-L38`](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/content-authoring-contract.md#L27-L38)
   - Source 직접 저장은 Exact.
   - Visual에서 실제 수정한 경우에만 의미 보존 범위의 Normalized를 허용한다.
   - 문법 오류나 renderer 미지원 표현은 storage rejection의 기본 사유가 아니다.
4. [`docs/content-authoring-contract.md#L68-L73`](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/content-authoring-contract.md#L68-L73)
   - Article canonical body는 Markdown/MDX raw source string.
   - CMS editor state는 derived/virtual representation이다.
5. [`docs/content-authoring-contract.md#L74-L83`](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/content-authoring-contract.md#L74-L83)
   - Visual round-trip 불가 source는 Source mode로 fallback한다.
   - Visual Editor가 unsupported source를 조용히 삭제/변경해서는 안 된다.
6. [`docs/architecture.md#L32-L35`](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/architecture.md#L32-L35)
   - raw source가 권위 상태이며 editor state는 virtual이라는 architecture-level 정의.
7. [`docs/architecture.md#L36-L54`](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/architecture.md#L36-L54)
   - Visual Editor / canonical raw source / Source Editor의 authoring boundary.
8. [`docs/implementation-map.md#L31-L32`](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/implementation-map.md#L31-L32)
   - 현재 DB 표현은 raw string이지만 application save contract가 editor state를 요구한다.
   - 일반 save path가 raw `body`를 거부하고 Lexical representable subset으로 제한하는 것이 현재 gap.
9. [`docs/implementation-map.md#L39-L50`](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/docs/implementation-map.md#L39-L50)
   - #13이 직접 겨냥하는 1.0 delta는 Canonical Authoring Contract + Editing compatibility.

### Current implementation

1. [`apps/cms-lab/src/content-contract.ts#L1-L29`](https://github.com/ooMia/oomia.github.io.engine/blob/13-feat-decouple-canonical-source-from-visual-editor-constraints/apps/cms-lab/src/content-contract.ts#L1-L29)
   - CMS-independent 저장 계약.
   - 현재 `BodyChange`에는 `editor`와 `original`만 있고 새 raw source 입력 경로가 없다.
   - `prepareBody()`는 metadata-only 및 unchanged-visual exact preservation은 이미 지원한다.
2. [`apps/cms-lab/src/payload.config.ts#L157-L165`](https://github.com/ooMia/oomia.github.io.engine/blob/13-feat-decouple-canonical-source-from-visual-editor-constraints/apps/cms-lab/src/payload.config.ts#L157-L165)
   - canonical `body`는 hidden textarea, `editor`는 virtual RichText.
   - 현재 Source editing surface가 없다.
3. [`apps/cms-lab/src/payload.config.ts#L174-L211`](https://github.com/ooMia/oomia.github.io.engine/blob/13-feat-decouple-canonical-source-from-visual-editor-constraints/apps/cms-lab/src/payload.config.ts#L174-L211)
   - #13의 가장 직접적인 변경 지점.
   - `data.body !== undefined && !data.editor`를 명시적으로 거부하고 모든 create/update를 `prepareBody()` + Lexical codec 경로로 보낸다.
4. [`apps/cms-lab/src/save-contract.ts#L76-L114`](https://github.com/ooMia/oomia.github.io.engine/blob/13-feat-decouple-canonical-source-from-visual-editor-constraints/apps/cms-lab/src/save-contract.ts#L76-L114)
   - Lexical state의 손실 가능한 node/format 검증.
   - Visual editing capability/normalization 경로에는 유용하지만 raw source storage gate로 사용해서는 안 된다.
5. [`apps/cms-lab/src/save-contract.ts#L138-L165`](https://github.com/ooMia/oomia.github.io.engine/blob/13-feat-decouple-canonical-source-from-visual-editor-constraints/apps/cms-lab/src/save-contract.ts#L138-L165)
   - DocumentCodec의 encode → decode round-trip/equivalence 검증.
   - 제거하기보다 Visual 수정 검증 전용으로 유지하는 것이 현재 유력한 방향이다.

### Existing regression evidence

1. [`apps/cms-lab/tests/save-contract.test.ts#L12-L26`](https://github.com/ooMia/oomia.github.io.engine/blob/13-feat-decouple-canonical-source-from-visual-editor-constraints/apps/cms-lab/tests/save-contract.test.ts#L12-L26)
   - unchanged Visual content와 metadata-only update에서 exact bytes 보존을 이미 검증.
2. [`apps/cms-lab/tests/save-contract.test.ts#L27-L45`](https://github.com/ooMia/oomia.github.io.engine/blob/13-feat-decouple-canonical-source-from-visual-editor-constraints/apps/cms-lab/tests/save-contract.test.ts#L27-L45)
   - 실제 Visual edit 시 새 body 생성과 Visual round-trip을 검증.
3. [`apps/cms-lab/scripts/integration.ts#L14-L41`](https://github.com/ooMia/oomia.github.io.engine/blob/13-feat-decouple-canonical-source-from-visual-editor-constraints/apps/cms-lab/scripts/integration.ts#L14-L41)
   - PostgreSQL에는 이미 `body` 문자열만 저장되고 `editor` column이 없다.
   - persistence schema 자체를 크게 변경할 필요가 없다는 근거.
4. [`apps/cms-lab/scripts/integration.ts#L44-L88`](https://github.com/ooMia/oomia.github.io.engine/blob/13-feat-decouple-canonical-source-from-visual-editor-constraints/apps/cms-lab/scripts/integration.ts#L44-L88)
   - 현재 raw body update를 거부하는 regression이 있어 #13에서 의미를 바꿔야 한다.
   - metadata-only exact preservation은 유지해야 한다.
   - 현재 exact raw source 검증은 DB 직접 UPDATE를 사용하므로 이를 public/application source path로 승격하는 것이 핵심 후보.

### Scope boundary

- [`apps/cms-lab/scripts/docs-workflow.ts#L68-L75`](https://github.com/ooMia/oomia.github.io.engine/blob/13-feat-decouple-canonical-source-from-visual-editor-constraints/apps/cms-lab/scripts/docs-workflow.ts#L68-L75)
  - publish 전에 모든 DB body를 codec decode/encode하는 global round-trip gate가 존재한다.
  - 문제는 확인되어 있지만 주 해결 범위는 Engine Issue [#14](https://github.com/ooMia/oomia.github.io.engine/issues/14)다.
  - #13에서는 storage/authoring contract 분리에 집중하고 publishing validation 재설계를 불필요하게 끌어오지 않는다.

## Implementation hypothesis for next session

현재 persistence 자체는 이미 목표 상태에 가깝다. 핵심 문제는 storage representation보다 **application/authoring contract**다.

다음 세션에서 우선 검토할 순서는 다음과 같다.

1. `content-contract.ts`에 raw source를 명시적으로 저장하는 input/operation을 어떻게 표현할지 설계한다.
2. `payload.config.ts`의 save hook을 Source path와 Visual path로 분리한다.
3. Source path는 Lexical decode 없이 raw source를 Exact 보존하도록 한다.
4. Visual path는 기존 DocumentCodec과 loss detection을 유지하여 실제 Visual 수정 시 Normalized를 허용한다.
5. metadata-only update는 기존 raw body에 접근하거나 normalize하지 않는 현재 보장을 유지한다.
6. 기본 Markdown, Visual 미지원 Markdown/MDX, broken draft, metadata-only update에 대한 regression을 추가/조정한다.
7. publishing global gate 변경은 #14로 남긴다.

이 방향은 아직 구현 결과가 아니라 현재 contract와 코드에서 도출한 **구현 가설**이다. 실제 변경 전에 Payload hook/API semantics와 테스트 경계를 다시 확인한다.

## Completed in this session

- Knowledge responsibility boundary refactor를 별도 branch에서 수행하고 PR [#5](https://github.com/ooMia/oomia.github.io.knowledge/pull/5)를 squash merge했다.
- `handoff/current.md`를 cross-session execution checkpoint의 단일 owner로 도입했다.
- `docs/open-questions.md`에서 live verification과 revision-bound implementation status를 분리했다.
- Implementation Map을 live state가 아닌 revision-bound verified snapshot으로 명확히 했다.
- bundle 생성기의 고정 생성일을 제거하고 volatile handoff를 `dist/CONTEXT-BUNDLE.md`에서 제외했다.
- D017을 확정했다: Knowledge에는 raw conversation transcript를 저장하지 않는다.
- `provenance/conversations.json`을 current tree에서 제거했다.
- provenance는 source/turn metadata와 최소 요약만 유지한다.
- raw transcript 관련 Q016은 결정 완료로 제거했다.
- 기존 raw transcript blob은 과거 Git history에는 남아 있으며 history rewrite는 수행하지 않았다.
- Engine `develop`을 `main`의 `e140a33e...`로 force 없이 fast-forward했다.
- Issue #13 linked Development branch도 동일 revision으로 force 없이 fast-forward했다.
- #13 구현 시작에 필요한 policy/code/test anchor를 line-range 기준으로 조사하고 이 handoff에 기록했다.

## Previously completed orchestration baseline

- Knowledge / Engine / Site에 Issue activation automation 배포 완료.
- Engine Issue [#13](https://github.com/ooMia/oomia.github.io.engine/issues/13) 활성화에서 Project #11 field sync와 linked Development branch 생성 성공.
- 중복 activation 원인이었던 `edited` trigger 제거.
- Site Issue [#8](https://github.com/ooMia/oomia.github.io/issues/8)에서 activation replay와 idempotency E2E 검증 완료.
- Site orchestration label metadata, merged branch cleanup, merged head branch 자동 삭제 설정 정리 완료.

## Next safe action

1. 독립 repository의 GitHub owner/name/visibility를 확정한다. 우선 후보 이름은 `ooMia/content-components`이며 아직 repository가 존재한다고 가정하지 않는다.
2. package export surface를 확정한다. 현재 우선 설계는 framework-neutral root contract + React renderer subpath + manifest subpath다.
3. initial version과 pre-1.0 compatibility policy, release trigger/transport를 확정한다.
4. repository를 생성한 뒤 기존 프로젝트의 generic orchestration Action/branch 규칙 중 재사용 가치가 있는 부분만 이관한다.
5. 첫 vertical slice는 새 repository에서 `Callout`을 새로 구현하고 package pack/install → Site consumer integration을 검증한다.
6. Engine package adoption은 Engine Issue [#13](https://github.com/ooMia/oomia.github.io.engine/issues/13)의 실제 구현 상태를 재확인한 뒤 별도 consumer change로 진행한다.

## Deferred housekeeping

- 완료된 orchestration 작업에서 남아 있는 stale Engine branches는 추후 삭제 전 compare하여 미병합 작업이 없는지 확인한다.
- 이 정리는 #13 구현의 선행 조건이 아니다.

## Live verification backlog

- Project #11의 실제 field / option / View / Item / Status Update 구성은 필요 시 live 상태에서 확인한다.
- Scope가 실제 multi-select로 적용되었는지 확인한다.
- 실제 Target Release option / 현재 Iteration / 현재 Goal은 사용 시점에 Project에서 확인한다.
- Project README가 canonical index 형태로 실제 적용되어 있는지 확인한다.

## Reverify before changing live state

- Project #11의 현재 Status / Iteration / field option은 실제 Project 정보가 필요한 작업에서만 다시 확인한다.
- branch 삭제나 ref 이동 전 해당 branch에 미병합 작업이 없는지 compare 결과를 확인한다.
- Issue #13 구현 전 branch가 `develop`과 불필요하게 diverge하지 않았는지 확인한다.
- Implementation Map을 갱신할 때는 기준 revision 이후의 실제 코드·테스트·deployment Evidence를 다시 조사한다.

## Do not assume

- 이 파일의 branch SHA나 Project 상태가 다음 세션에도 최신이라고 가정하지 않는다.
- `handoff/current.md`의 서술을 canonical policy 또는 완료 Evidence로 사용하지 않는다.
- 구현 완료 여부를 대화 기록만으로 판정하지 않는다.
- 구현 가설을 확정된 API/UX 결정으로 취급하지 않는다.
- Knowledge repository를 raw conversation archive로 사용하지 않는다.
