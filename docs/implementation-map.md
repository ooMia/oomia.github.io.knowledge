# Implementation Map

Publishing Platform 1.0의 **현재 검증 snapshot**과 cross-repository Evidence 연결을 소유한다. live branch 상태나 작업 로그를 복제하지 않으며, 판정은 아래에 고정한 revision/Evidence 범위에서만 유효하다.

새 Evidence가 기존 판정을 대체할 만큼 충분하면 날짜별 checkpoint를 추가하지 않고 이 snapshot의 기준 revision과 capability 판정을 갱신한다. 과거 판정은 Git history와 연결된 Issue/PR/run Evidence에서 추적한다.

## 현재 검증 범위

| 역할 | Repository / revision | 검증 의미 |
|---|---|---|
| canonical content | [`ooMia/oomia.github.io.docs@c1cb0f1`](https://github.com/ooMia/oomia.github.io.docs/commit/c1cb0f1c7c435cfe7b2fd24173f33b54847f75c2) | Obsidian에서 작성된 canonical MDX revision `4f50b150`을 Docs-owned normalization한 현재 canonical corpus |
| authored source Evidence | [Docs `4f50b150`](https://github.com/ooMia/oomia.github.io.docs/commit/4f50b15089607b2edea3bb8aa7f8e948a24d60fd) / [Docs #8](https://github.com/ooMia/oomia.github.io.docs/issues/8) | 실제 authoring tool에서 기존 canonical MDX의 source/frontmatter 의미를 보존하면서 Site-supported `Callout` 표현으로 수정한 Evidence |
| Site canonical release | [`ooMia/oomia.github.io@640df2fa`](https://github.com/ooMia/oomia.github.io/commit/640df2fa45c64b2e6e2694f78e33886dd2293f7e) / [run 37101840971](https://github.com/ooMia/oomia.github.io/actions/runs/37101840971) | Docs `c1cb0f1`을 포함한 Site `main` build와 GitHub Pages delivery가 모두 성공한 canonical release Evidence |
| Site consumer validation | [PR #26](https://github.com/ooMia/oomia.github.io/pull/26) / [run 37099713772](https://github.com/ooMia/oomia.github.io/actions/runs/37099713772) | exact Docs revision checkout 후 `astro sync → vp check → vp test → workspace build`가 모두 통과한 authoring/component consumer Evidence |
| Site ownership boundary | [Site #27](https://github.com/ooMia/oomia.github.io/issues/27) / [PR #28](https://github.com/ooMia/oomia.github.io/pull/28) | canonical Docs formatting은 Docs가 소유하고 Site는 consumer contract만 검증하도록 repository boundary를 정렬한 Evidence |
| Engine canonical integration | [`ooMia/oomia.github.io.engine@0484358`](https://github.com/ooMia/oomia.github.io.engine/commit/0484358d9118ecc8dfdb803b64909827e205ddf1) / [run 37049044873](https://github.com/ooMia/oomia.github.io.engine/actions/runs/37049044873) | Linux/macOS/Windows full validation과 packaged Engine artifact verification이 통과한 canonical Engine revision |
| Engine optional mutation | [Engine Issue #23](https://github.com/ooMia/oomia.github.io.engine/issues/23) / [PR #30](https://github.com/ooMia/oomia.github.io.engine/pull/30) | model-assisted metadata enrichment의 선택적 mutation Evidence |
| Docs trusted consumer | [Docs run 36260957694](https://github.com/ooMia/oomia.github.io.docs/actions/runs/36260957694) | Engine artifact를 사용한 Docs-side trusted workflow Evidence |

Site release verification [PR #26](https://github.com/ooMia/oomia.github.io/pull/26)의 promotion validation은 [run 37099713772](https://github.com/ooMia/oomia.github.io/actions/runs/37099713772)에서 exact Docs revision checkout 후 `astro sync → vp check → vp test → workspace build`를 통과했다. merge 후 `main@640df2fa`의 [run 37101840971](https://github.com/ooMia/oomia.github.io/actions/runs/37101840971)에서 `build=success`, `deploy=success`가 확인됐다.

따라서 canonical authored source → Docs revision → Site consumer validation → canonical Site revision → GitHub Pages delivery 연결이 이 snapshot에서 재현 가능한 Evidence로 닫혔다.

## Architecture transition

장기 제품 경계는 [Architecture](architecture.md), 전환 순서와 safety rule은 [Architecture Transition](architecture-transition.md), release acceptance는 [Release 1.0](release-1.0.md)이 소유한다.

이 Map은 구현 순서·package 구조·workflow 운영을 별도로 정의하지 않는다. 각 capability의 **검증된 결과와 남은 release gap**만 연결한다.

## 1.0 capability 상태

상태는 **미검증 / 미충족 / 부분 충족 / 충족**만 사용한다.

| Capability | 현재 판정 | 검증된 Evidence | 다음 통합 검수 |
|---|---|---|---|
| Authoring | **충족** | [Docs #8](https://github.com/ooMia/oomia.github.io.docs/issues/8)에서 Obsidian으로 기존 canonical MDX를 수정하고 frontmatter/source 의미를 보존한 authored revision `4f50b150`을 확보했다. | 현재 Evidence 유지 |
| Canonical Content | **충족** | authored revision `4f50b150`이 Git revision으로 고정됐고 Docs-owned normalization 후 canonical revision `c1cb0f1`로 이어졌으며, Site canonical release가 그 exact revision을 직접 소비했다. | 현재 Evidence 유지 |
| Extensibility | **충족** | 실제 Site implementation의 `Callout` component 표현을 canonical MDX에서 사용했고, [PR #26](https://github.com/ooMia/oomia.github.io/pull/26) / [run 37099713772](https://github.com/ooMia/oomia.github.io/actions/runs/37099713772)에서 sync/check/test/build를 통과한 뒤 canonical delivery까지 이어졌다. | 현재 Evidence 유지 |
| Automation | **충족** | Engine/Docs automation Evidence와 Site `main` build/deploy automation이 실제 canonical revision 검증·delivery에 참여했다. | 현재 Evidence 유지 |
| Publishing | **충족** | Docs `c1cb0f1` → Site `640df2fa` 소비 관계가 promotion validation과 final `main` build/deploy로 재현 가능하게 연결됐다. | 현재 Evidence 유지 |
| Presentation | **충족** | Site canonical release build가 supported MDX component를 포함한 corpus로 성공했고 동일 revision이 GitHub Pages delivery로 이어졌다. | 현재 Evidence 유지 |
| Delivery | **충족** | Docs `c1cb0f1` + Site `640df2fa` + [run 37101840971](https://github.com/ooMia/oomia.github.io/actions/runs/37101840971)의 GitHub Pages deploy success가 연결됐다. | 현재 Evidence 유지 |

## 현재 남은 1.0 gap

이 snapshot의 Publishing Platform 1.0 acceptance capability에는 **남은 미충족 gap이 없다**.

Authoring, Canonical Content, Extensibility, Automation, Publishing, Presentation, Delivery가 모두 재현 가능한 owning-repository Evidence와 연결됐다. 이후 W4 기능 작업은 새로운 제품 가치나 post-acceptance 확장으로 취급하며, 이미 닫힌 1.0 acceptance를 불필요하게 다시 blocker로 만들지 않는다.

## 갱신 규칙

- 이 문서는 **한 개의 현재 검증 snapshot**만 유지한다.
- 판정은 명시된 revision과 immutable Evidence에만 적용한다.
- 새 Evidence가 생겼다고 즉시 로그를 추가하지 않는다. capability 판정을 바꿀 만큼 충분할 때 revision/Evidence/판정을 함께 갱신한다.
- historical snapshot과 판정 변화는 Git history에서 추적한다.
- live Project/Issue/PR status는 이 문서에 복제하지 않는다.
- 문서 정리만으로 runtime/build/deployment 완료를 판정하지 않는다.
