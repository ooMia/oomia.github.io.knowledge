# Implementation Map

검증 기준일: 2026-09-21. Knowledge가 소유하는 통합 검수 연결이다. 아래 상태 판정과 immutable Evidence는 당시 snapshot이며, 이번 문서 소유권 정리에서 구현·배포를 재검증하거나 최신 상태로 갱신하지 않았다.

2026-09-21 target architecture가 Payload/PostgreSQL 기반 CMS에서 **Git-backed filesystem document workspace + editor/integration 재검토**로 변경되었다. 아래 기존 구현 revision은 역사적/재사용 가능 Evidence이며 새 target을 자동 충족하지 않는다.

## 기준 revision

| 역할 | Repository | Revision | 의미 |
|---|---|---|---|
| legacy authoring / publishing | [`ooMia/oomia.github.io.engine`](https://github.com/ooMia/oomia.github.io.engine) | [`6ba2f950a78eef18c2efa305b96a1c8d0443252e`](https://github.com/ooMia/oomia.github.io.engine/commit/6ba2f950a78eef18c2efa305b96a1c8d0443252e) | Payload/PostgreSQL CMS와 DB→docs publish Evidence |
| content repository snapshot | [`ooMia/oomia.github.io.docs`](https://github.com/ooMia/oomia.github.io.docs) | [`50d89a4cb1c5d6476444e29454e12b523e99231b`](https://github.com/ooMia/oomia.github.io.docs/commit/50d89a4cb1c5d6476444e29454e12b523e99231b) | 해당 revision은 당시 generated snapshot; 현재 레포 전체 상태에 대한 판정은 아님 |
| presentation / delivery | [`ooMia/oomia.github.io`](https://github.com/ooMia/oomia.github.io) | [`a3b2e182563458636b7b8186a4cd2201894b2a65`](https://github.com/ooMia/oomia.github.io/commit/a3b2e182563458636b7b8186a4cd2201894b2a65) | docs content를 Site에서 실제 build/deploy한 Evidence |

`oomia.github.io`의 package name은 `oomia.github.io.mono`이고 일부 engine 문서에서는 이를 `mono`라고 부른다. 별도 원격 `oomia.github.io.mono`가 있다는 뜻은 아니다.

## Architecture transition

기술 전환 상세는 [전환 guide](architecture-transition.md), [Engine migration record](https://github.com/ooMia/oomia.github.io.engine/blob/docs/content-modification-contract/docs/migration.md), [Site integration 전환](https://github.com/ooMia/oomia.github.io/blob/docs/content-consumption-contract/docs/content-consumption-contract.md#consumer-integration-전환)을 참조한다. 이 문서는 구현 순서·코드 이관 계획을 별도로 소유하지 않는다.

## 1.0 capability 상태

상태는 **미검증 / 미충족 / 부분 충족 / 충족**만 사용한다.

| Capability | 당시 판정 | 기준 revision의 Evidence | 다음 통합 검수 연결 |
|---|---|---|---|
| Authoring | **미충족** | Payload Admin에서 visual create/edit/save가 E2E로 검증된 legacy implementation은 존재한다. [e2e.ts](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/scripts/e2e.ts) | 기존 corpus를 사용한 authoring/consumer 통합 Evidence. [Authoring 검토](content-authoring-contract.md#authoring-clients). |
| Canonical Content | **부분 충족** | docs repository에는 실제 Markdown/MDX files와 Git history가 있고 Site가 이를 소비할 수 있다. 기존 Engine DB에도 raw body string 보존 Evidence가 있다. | 사용자 작성 파일의 보존과 Git revision 관계. 선택적 후처리는 별도 기능으로 검수한다. [Engine 수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/docs/content-modification-contract/docs/content-modification-contract.md). |
| Extensibility | **부분 충족** | 기존 custom `Callout`이 engine/site 양쪽에서 opt-in되고 consumer build를 통과한 Evidence가 있다. | 추가 콘텐츠 표현의 실제 소비 Evidence. [Site component 계약](https://github.com/ooMia/oomia.github.io/blob/docs/content-consumption-contract/docs/content-consumption-contract.md#component-contract). |
| Automation | **부분 충족** | legacy Payload publish action과 docs workflow가 explicit trigger, failure propagation, idempotent no-op을 검증했다. [Issue #8](https://github.com/ooMia/oomia.github.io.engine/issues/8) | 실제 후처리·발행 workflow에 automation이 참여한다는 Evidence. [기능별 이슈](operating-rhythm.md#기능-실험-참조). |
| Publishing | **부분 충족** | legacy workflow는 DB snapshot을 docs repo에 materialize하고 실제 Site sync/lint/test/typecheck/build를 통과시켰다. [docs workflow](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/scripts/docs-workflow.ts) | 현재 콘텐츠 revision의 소비 검증과 결과 재현성. [Site 소비 계약](https://github.com/ooMia/oomia.github.io/blob/docs/content-consumption-contract/docs/content-consumption-contract.md#publishing). |
| Presentation | **충족** | Site가 docs repository의 Markdown/MDX를 Astro content collection으로 읽어 렌더한다. [content config](https://github.com/ooMia/oomia.github.io/blob/a3b2e182563458636b7b8186a4cd2201894b2a65/apps/web/src/content.config.ts) | 현재 콘텐츠 revision에 대한 실제 렌더링 Evidence를 확보해 재평가. |
| Delivery | **충족** | docs SHA를 소비하는 Site revision의 GitHub Pages build/deploy가 성공했다. [run 35472028484](https://github.com/ooMia/oomia.github.io/actions/runs/35472028484) / [artifact 10593195312](https://github.com/ooMia/oomia.github.io/actions/runs/35472028484/artifacts/10593195312) | 새 콘텐츠 revision → Site revision → 배포 결과의 연결을 검증해 재평가. |

## 폐기 또는 재사용 판단

책임 레포의 [Engine 전환 기록](https://github.com/ooMia/oomia.github.io.engine/blob/docs/content-modification-contract/docs/migration.md) 및 [Site integration 설계](https://github.com/ooMia/oomia.github.io/blob/docs/content-consumption-contract/docs/content-consumption-contract.md#consumer-integration-전환)를 참조한다. 구현 상세의 상태 원장을 이 문서에 복제하지 않는다.

## 1.0 구현 delta

위 표의 통합 검수 gap을 해당 레포 Issue의 Outcome/AC/Evidence에 연결한다. 개별 명령·코드 구조·package 선택과 실행 우선순위는 소유 Issue에서 관리한다. 각 capability 판정은 연결된 Evidence를 실제로 재검증한 뒤 변경한다.

## Issue #13 / #14 영향

[Engine #13](https://github.com/ooMia/oomia.github.io.engine/issues/13), [Engine #14](https://github.com/ooMia/oomia.github.io.engine/issues/14)의 과거 구현 범위를 여기서 재정의하지 않는다. [Engine migration record](https://github.com/ooMia/oomia.github.io.engine/blob/docs/content-modification-contract/docs/migration.md)와 책임 레포의 현재 Issue를 확인하고, Knowledge에서는 통합 Evidence에 영향을 주는 결과만 연결한다.

## 갱신 규칙

- 이 문서는 live branch 상태가 아니라 immutable Evidence 기반 snapshot이다.
- architecture가 변경되면 같은 코드 revision도 새 Product Boundary에 대해 다시 평가할 수 있다.
- legacy implementation 성공을 현재 target 완료로 간주하지 않는다.
- 새 Engine/docs/Site integration이 main에 들어간 뒤 기준 revision과 capability 상태를 다시 갱신한다.
