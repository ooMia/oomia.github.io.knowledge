# Implementation Map

기준일: 2026-09-20. 이 문서는 Publishing Platform 1.0의 제품 경계를 실제 구현과 대조한 **검증 스냅샷**이다. 설계 정의는 [Release 1.0](release-1.0.md)을 따르고, 상태 판정은 아래 현재 revision과 연결된 immutable Evidence를 근거로 한다.

## 기준 revision

| 역할 | Repository | Revision |
|---|---|---|
| Authoring / canonical state / publishing | [`ooMia/oomia.github.io.engine`](https://github.com/ooMia/oomia.github.io.engine) | [`6ba2f950a78eef18c2efa305b96a1c8d0443252e`](https://github.com/ooMia/oomia.github.io.engine/commit/6ba2f950a78eef18c2efa305b96a1c8d0443252e) |
| Generated documents | [`ooMia/oomia.github.io.docs`](https://github.com/ooMia/oomia.github.io.docs) | [`50d89a4cb1c5d6476444e29454e12b523e99231b`](https://github.com/ooMia/oomia.github.io.docs/commit/50d89a4cb1c5d6476444e29454e12b523e99231b) |
| Presentation / delivery | [`ooMia/oomia.github.io`](https://github.com/ooMia/oomia.github.io) | [`a3b2e182563458636b7b8186a4cd2201894b2a65`](https://github.com/ooMia/oomia.github.io/commit/a3b2e182563458636b7b8186a4cd2201894b2a65) |

`oomia.github.io`의 package name은 `oomia.github.io.mono`이고 engine 문서에서는 이를 `mono`라고 부른다. 별도 원격 `oomia.github.io.mono` 레포가 있다는 뜻은 아니다.

이번 갱신에서 engine `main`과 `develop`은 `6ba2f950a78eef18c2efa305b96a1c8d0443252e`로 동일함을 확인했다. explicit Publish 구현은 `main`에 존재하지만, generated docs와 site consumer의 최신 revision은 각각 2026-09-13의 `50d89a4...`와 `a3b2e18...`에 머물러 있다. 따라서 Issue #8은 post-merge 성공 Publish Evidence가 없는 상태로 다시 열었으며, 아래 Automation 판정은 구현 진척과 완료 Evidence를 구분한다.

## 1.0 capability 상태

상태는 **미검증 / 미충족 / 부분 충족 / 충족**만 사용한다. `충족`은 현재 [1.0 Product Boundary](release-1.0.md)의 요구를 충족한다는 의미이며, 전체 제품 완성이나 production-grade 품질을 뜻하지 않는다.

| Capability | 상태 | 확인한 Evidence | 남은 delta |
|---|---|---|---|
| Authoring | **부분 충족** | Payload self-hosted CMS에서 로그인, 시각적 작성, 저장, 재편집, 재조회가 E2E로 검증되어 있다. [e2e.ts](https://github.com/ooMia/oomia.github.io.engine/blob/2f696f9c73863d0473acc0c4a66a67f66d8ad745/apps/cms-lab/scripts/e2e.ts), [Payload config](https://github.com/ooMia/oomia.github.io.engine/blob/2f696f9c73863d0473acc0c4a66a67f66d8ad745/apps/cms-lab/src/payload.config.ts) | 전체 필수 표현의 시각 편집·무손실 왕복, 로컬 preview, draft/public 분리 등 작성 경험의 필수 gap이 남아 있다. |
| Canonical Content | **충족** | Payload collection이 create/read/update를 허용하고 실제 통합 테스트가 create → PostgreSQL 저장 → findByID → update를 검증한다. 본문은 PostgreSQL 문자열 원본으로 지속되고 virtual editor state는 DB SoT가 아니다. [integration.ts](https://github.com/ooMia/oomia.github.io.engine/blob/2f696f9c73863d0473acc0c4a66a67f66d8ad745/apps/cms-lab/scripts/integration.ts), [Payload config](https://github.com/ooMia/oomia.github.io.engine/blob/2f696f9c73863d0473acc0c4a66a67f66d8ad745/apps/cms-lab/src/payload.config.ts) | Revision, 휴지통, 충돌 검출 등은 후속 기능이며 현재 1.0 capability 문구의 필수 조건으로 정의되어 있지 않다. |
| Extensibility | **부분 충족** | 등록된 MDX `Callout`을 CMS 변환 계약과 site renderer 양쪽에서 opt-in 처리하며 실제 consumer build에서 렌더를 검증한다. [docs workflow](https://github.com/ooMia/oomia.github.io.engine/blob/2f696f9c73863d0473acc0c4a66a67f66d8ad745/apps/cms-lab/scripts/docs-workflow.ts), [site renderer commit](https://github.com/ooMia/oomia.github.io/commit/75a3235068dc77b0d99cc8b5391f4a84329177aa) | 단일 등록 블록의 검증을 넘어 custom logic/component의 안정된 public extension contract와 지원 범위를 명시해야 한다. |
| Automation | **부분 충족** | Payload Admin의 명시적 `사이트 발행` action이 `POST /api/publish`를 통해 기존 `vp run docs:publish`를 호출한다. 중복 실행 거부와 non-zero 실패 전파가 테스트되었고 feature branch 실동작은 기존 main-only guard까지 도달했다. [Publish action](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/src/components/PublishAction.tsx), [publish adapter](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/src/publish.ts), [tests](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/tests/publish.test.ts), [Issue #8](https://github.com/ooMia/oomia.github.io.engine/issues/8) | `main`에서 explicit Publish를 실제 성공시켜 새 generated docs revision과 consumer/site revision을 만들고, 그 실행 결과를 immutable Evidence로 연결해야 한다. 이 Evidence 전에는 1.0 Automation capability를 `충족`으로 올리지 않는다. |
| Publishing | **충족** | 운영 DB snapshot을 검증해 결정적인 md/mdx + manifest를 만들고, 실제 Astro consumer build를 통과시킨 뒤 docs를 commit/push하고 site와 engine이 같은 docs SHA를 기록한다. [docs workflow](https://github.com/ooMia/oomia.github.io.engine/blob/2f696f9c73863d0473acc0c4a66a67f66d8ad745/apps/cms-lab/scripts/docs-workflow.ts), [docs snapshot `50d89a4`](https://github.com/ooMia/oomia.github.io.docs/commit/50d89a4cb1c5d6476444e29454e12b523e99231b), [site consume commit](https://github.com/ooMia/oomia.github.io/commit/a3b2e182563458636b7b8186a4cd2201894b2a65) | 1.0 public artifact contract와 compatibility policy는 별도로 확정할 필요가 있다. |
| Presentation | **충족** | site가 docs submodule의 md/mdx를 Astro content collection으로 읽고 article page에서 렌더한다. engine의 격리 통합 검증은 실제 site build와 등록 Callout HTML까지 확인한다. [content config](https://github.com/ooMia/oomia.github.io/blob/a3b2e182563458636b7b8186a4cd2201894b2a65/apps/web/src/content.config.ts), [article page](https://github.com/ooMia/oomia.github.io/blob/a3b2e182563458636b7b8186a4cd2201894b2a65/apps/web/src/pages/articles/%5B...id%5D.astro), [docs workflow](https://github.com/ooMia/oomia.github.io.engine/blob/2f696f9c73863d0473acc0c4a66a67f66d8ad745/apps/cms-lab/scripts/docs-workflow.ts) | 현재 1.0 boundary의 렌더 요구는 충족한다. 추가 UI 완성도는 별도 delta로 다룬다. |
| Delivery | **부분 충족** | site main push 시 GitHub Pages build/deploy를 실행하는 workflow가 있고, verified docs SHA를 소비하는 site commit까지 존재한다. [deploy workflow](https://github.com/ooMia/oomia.github.io/blob/a3b2e182563458636b7b8186a4cd2201894b2a65/.github/workflows/deploy.yaml), [site consume commit](https://github.com/ooMia/oomia.github.io/commit/a3b2e182563458636b7b8186a4cd2201894b2a65) | 해당 content revision이 실제 Pages에 성공적으로 반영되었다는 deployment URL/run Evidence는 이번 조사에서 확인하지 못했다. |

## 현재 1.0 gap

구현 delta로 우선 추적할 필요가 있는 것은 다음과 같다.

1. **Automation:** explicit Publish trigger 구현은 존재한다. Issue #8을 완료하려면 `main`에서 성공한 실제 publish 실행과 새 docs/site revision Evidence가 필요하다.
2. **Authoring:** 1.0에서 요구할 작성 표현 범위와 preview/draft-public 경계를 확정하고 해당 범위를 완료.
3. **Extensibility:** 현재 Callout proof를 일반화한 명시적 extension contract.
4. **Delivery:** verified docs → site commit → GitHub Pages의 실제 성공 deployment Evidence.
5. **Release gate:** 1.0 public contract 목록, compatibility policy, 최종 release gate AC.

## 갱신 규칙

구현 상태를 말할 때는 이 문서의 기준 revision을 먼저 확인한다. 구현 레포의 `main`이 기준 revision보다 진행되었으면 최신 코드·테스트를 다시 조사한 뒤 이 문서를 갱신한다. 설계 문서만으로 구현 상태를 올리지 않으며, `충족` 판정에는 재현 가능한 코드·테스트·commit·deployment 등의 Evidence가 필요하다.
