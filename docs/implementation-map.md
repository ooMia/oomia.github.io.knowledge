# Implementation Map

기준일: 2026-09-20. 이 문서는 Publishing Platform 1.0의 제품 경계를 실제 구현과 대조한 **검증 스냅샷**이다. 설계 정의는 [Release 1.0](release-1.0.md)과 [Content Authoring & Publishing Contract](content-authoring-contract.md)를 따르고, 상태 판정은 아래 revision과 연결된 immutable Evidence를 근거로 한다.

## 기준 revision

| 역할 | Repository | Revision |
|---|---|---|
| Authoring / canonical state / publishing | [`ooMia/oomia.github.io.engine`](https://github.com/ooMia/oomia.github.io.engine) | [`6ba2f950a78eef18c2efa305b96a1c8d0443252e`](https://github.com/ooMia/oomia.github.io.engine/commit/6ba2f950a78eef18c2efa305b96a1c8d0443252e) |
| Generated documents | [`ooMia/oomia.github.io.docs`](https://github.com/ooMia/oomia.github.io.docs) | [`50d89a4cb1c5d6476444e29454e12b523e99231b`](https://github.com/ooMia/oomia.github.io.docs/commit/50d89a4cb1c5d6476444e29454e12b523e99231b) |
| Presentation / delivery | [`ooMia/oomia.github.io`](https://github.com/ooMia/oomia.github.io) | [`a3b2e182563458636b7b8186a4cd2201894b2a65`](https://github.com/ooMia/oomia.github.io/commit/a3b2e182563458636b7b8186a4cd2201894b2a65) |

`oomia.github.io`의 package name은 `oomia.github.io.mono`이고 engine 문서에서는 이를 `mono`라고 부른다. 별도 원격 `oomia.github.io.mono` 레포가 있다는 뜻은 아니다.

## 이번 재평가의 의미

2026-09-20에 두 가지 기준 변화와 새로운 Evidence를 반영했다.

1. canonical raw source를 CMS Visual Editor의 표현 능력에서 분리하고, storage / editing / publishing을 독립 계약으로 정의했다.
2. 공식 MDX component의 장기 경계를 versioned public content-component package로 정의했다.
3. site revision `a3b2e182...`에 대한 GitHub Pages run [35472028484](https://github.com/ooMia/oomia.github.io/actions/runs/35472028484)에서 build와 deploy가 모두 성공했고, [Pages artifact 10593195312](https://github.com/ooMia/oomia.github.io/actions/runs/35472028484/artifacts/10593195312)가 생성된 것을 확인했다.

따라서 일부 capability의 상태가 바뀐다. Canonical Content와 Publishing의 하향은 코드 regression이 아니라 **1.0 contract가 더 강하게 정의된 결과**다. Delivery의 상향은 실제 deployment Evidence가 추가된 결과다.

## 1.0 capability 상태

상태는 **미검증 / 미충족 / 부분 충족 / 충족**만 사용한다. `충족`은 현재 1.0 Product Boundary의 요구를 충족한다는 의미이며, 전체 제품 완성이나 production-grade 품질을 뜻하지 않는다.

| Capability | 상태 | 확인한 Evidence | 남은 delta |
|---|---|---|---|
| Authoring | **부분 충족** | Payload self-hosted CMS에서 로그인, 시각적 작성, 저장, 재편집, 재조회가 E2E로 검증되어 있다. 현재 Article body는 hidden string이고 editor는 virtual RichText다. [e2e.ts](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/scripts/e2e.ts), [Payload config](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/src/payload.config.ts) | 현재 일반 save path는 raw `body` 직접 저장을 거부하고 모든 편집 문서를 Lexical round-trip 가능한 subset으로 제한한다. Visual에서 무손실 표현할 수 없는 Markdown/MDX를 위한 Source editing fallback과 안전한 capability 판별이 필요하다. |
| Canonical Content | **부분 충족** | PostgreSQL에는 Article `body`가 문자열로 저장되고 virtual editor state는 DB 열이 아니다. metadata-only update와 기존 raw body 보존도 integration test로 검증되어 있다. [integration.ts](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/scripts/integration.ts), [content contract](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/src/content-contract.ts) | 저장소 내부 표현은 raw string이지만 public/application save contract는 editor state를 요구하고 direct raw update를 차단한다. CMS-independent raw source create/update path와 Exact preservation contract를 구현해야 한다. |
| Extensibility | **부분 충족** | 등록된 MDX `Callout`을 CMS 변환 계약과 site renderer 양쪽에서 opt-in 처리하며 실제 consumer build에서 렌더를 검증한다. [engine editor](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/src/editor.ts), [site renderer commit](https://github.com/ooMia/oomia.github.io/commit/75a3235068dc77b0d99cc8b5391f4a84329177aa) | component spec이 engine/site에 분산되어 있다. Site가 소유하는 versioned public content-component package와 shared type/runtime manifest를 도입하고, Visual adapter 유무와 공식 component 여부를 분리해야 한다. |
| Automation | **충족** | Payload Admin의 명시적 `사이트 발행` action이 `POST /api/publish`를 통해 기존 `vp run docs:publish`를 호출한다. 중복 실행 거부와 non-zero 실패 전파가 테스트되었고 실제 path가 main-only guard까지 도달했다. 동일 snapshot의 idempotent no-op도 정상 publishing result다. [Publish action](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/src/components/PublishAction.tsx), [publish adapter](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/src/publish.ts), [Issue #8](https://github.com/ooMia/oomia.github.io.engine/issues/8) | 현재 1.0 boundary의 최소 triggered automation 요구는 충족한다. |
| Publishing | **부분 충족** | 운영 DB snapshot을 결정적인 md/mdx + manifest로 만들고 실제 Astro consumer의 sync/lint/test/typecheck/build를 통과시킨 뒤 docs/site/engine revision을 필요한 경우 갱신하는 verified workflow가 존재한다. [docs workflow](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/scripts/docs-workflow.ts), [docs snapshot](https://github.com/ooMia/oomia.github.io.docs/commit/50d89a4cb1c5d6476444e29454e12b523e99231b) | publish 전에 모든 DB body를 CMS codec으로 decode/encode해 Visual Editor representability를 사실상 gate로 사용한다. 이를 content/component contract + actual consumer build 기반 검증으로 분리해 Source-only지만 Site에서 지원되는 content도 publish 가능하게 해야 한다. |
| Presentation | **충족** | site가 docs submodule의 md/mdx를 Astro content collection으로 읽고 article page에서 렌더한다. engine의 격리 통합 검증은 실제 site build와 등록 Callout HTML까지 확인한다. [content config](https://github.com/ooMia/oomia.github.io/blob/a3b2e182563458636b7b8186a4cd2201894b2a65/apps/web/src/content.config.ts), [article page](https://github.com/ooMia/oomia.github.io/blob/a3b2e182563458636b7b8186a4cd2201894b2a65/apps/web/src/pages/articles/%5B...id%5D.astro) | 일반 Site UI와 Article content component의 package boundary를 분리하는 것은 Extensibility delta에서 다룬다. |
| Delivery | **충족** | verified docs SHA를 소비하는 site main revision이 존재하고, 해당 revision `a3b2e182...`에 대한 GitHub Pages run [35472028484](https://github.com/ooMia/oomia.github.io/actions/runs/35472028484)에서 build와 deploy가 모두 성공했다. [Pages artifact 10593195312](https://github.com/ooMia/oomia.github.io/actions/runs/35472028484/artifacts/10593195312)도 생성되었다. | 현재 1.0 boundary의 실제 deployment Evidence 요구는 충족한다. 향후 content delta가 있는 publish에 대한 end-to-end deployment 관찰은 regression/evidence 강화 항목이다. |

## 현재 1.0 gap

우선 추적할 구현 delta는 다음과 같다.

1. **Canonical Authoring Contract:** raw Markdown/MDX source를 CMS adapter와 독립적으로 create/update하고 Source mode에서 Exact 보존할 수 있게 한다.
2. **Editing compatibility:** Visual round-trip 가능 여부를 storage/publish gate가 아니라 authoring capability로 분리하고 안전한 Source fallback을 제공한다.
3. **Content Component Contract:** Site repository가 소유하는 versioned public content-component package의 최소 surface를 만들고 engine/site가 같은 계약을 소비하게 한다.
4. **Publishing validation:** CMS codec round-trip을 global publish gate에서 제거하고 component/content contract + real Site consumer validation으로 책임을 이동한다.
5. **Release gate:** package compatibility policy, generated document public contract, 최종 1.0 release gate AC를 확정한다.

draft/public lifecycle, preview 고도화, revision history는 위 contract를 안정화한 뒤 독립 delta로 다룬다.

## 갱신 규칙

구현 상태를 말할 때는 이 문서의 기준 revision을 먼저 확인한다. 구현 레포의 `main`이 기준 revision보다 진행되었으면 최신 코드·테스트를 다시 조사한 뒤 이 문서를 갱신한다. 설계 문서만으로 구현 상태를 올리지 않으며, `충족` 판정에는 재현 가능한 코드·테스트·commit·deployment 등의 Evidence가 필요하다.

Product Boundary 자체가 변경되면 기존 구현이 그대로여도 capability 판정이 바뀔 수 있다. 이 경우 regression과 contract 강화에 따른 재평가를 구분해 기록한다.
