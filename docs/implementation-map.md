# Implementation Map

Publishing Platform 1.0의 **현재 검증 snapshot**과 cross-repository Evidence 연결을 소유한다. live branch 상태나 작업 로그를 복제하지 않으며, 판정은 아래에 고정한 revision/Evidence 범위에서만 유효하다.

새 Evidence가 기존 판정을 대체할 만큼 충분하면 날짜별 checkpoint를 추가하지 않고 이 snapshot의 기준 revision과 capability 판정을 갱신한다. 과거 판정은 Git history와 연결된 Issue/PR/run Evidence에서 추적한다.

## 현재 검증 범위

| 역할 | Repository / revision | 검증 의미 |
|---|---|---|
| canonical content | [`ooMia/oomia.github.io.docs@c5826802`](https://github.com/ooMia/oomia.github.io.docs/commit/c5826802be296f4ad84193119729be77a2d52c3c) | 현재 article corpus layout을 Site가 직접 소비한 canonical Docs revision |
| Site direct consumption | [`ooMia/oomia.github.io@f50ba57b`](https://github.com/ooMia/oomia.github.io/commit/f50ba57b9d1e270b286794cb9a7998f7df780648) | Site #12 / PR #13에서 canonical Docs Article corpus 직접 소비 |
| Site release boundary | [`ooMia/oomia.github.io@6d8cc03f`](https://github.com/ooMia/oomia.github.io/commit/6d8cc03f2f28df28e31a97a38b31b06fd8148b25) | Site #14 / PR #15의 release-only live mutation boundary |
| Engine optional mutation | [`ooMia/oomia.github.io.engine#23`](https://github.com/ooMia/oomia.github.io.engine/issues/23) / [PR #30](https://github.com/ooMia/oomia.github.io.engine/pull/30) | model-assisted metadata enrichment의 선택적 mutation Evidence |
| portable Engine artifact | [Engine PR #34](https://github.com/ooMia/oomia.github.io.engine/pull/34) / [run 36257543854](https://github.com/ooMia/oomia.github.io.engine/actions/runs/36257543854) | portable CLI artifact verification |
| Docs trusted consumer | [Docs run 36260957694](https://github.com/ooMia/oomia.github.io.docs/actions/runs/36260957694) | Engine artifact를 사용한 Docs-side trusted workflow Evidence |

Site build/render Evidence는 [run 36406348962](https://github.com/ooMia/oomia.github.io/actions/runs/36406348962)에서 canonical Docs revision으로 11 Article pages가 생성된 것으로 연결된다. release-only gate 이후 PR 검증은 [run 36418285983](https://github.com/ooMia/oomia.github.io/actions/runs/36418285983)에서 `build=success`, `deploy=skipped`로 확인됐다.

위 Evidence는 Phase B의 direct Docs consumption과 integration-level release boundary를 검증하지만 **최종 1.0 release Evidence는 아니다.** 최종 gate는 Site `develop → main` promotion 후 새 `main` build/deploy에서 canonical Docs revision + Site revision + delivery result를 다시 연결해야 한다.

## Architecture transition

장기 제품 경계는 [Architecture](architecture.md), 전환 순서와 safety rule은 [Architecture Transition](architecture-transition.md), release acceptance는 [Release 1.0](release-1.0.md)이 소유한다.

이 Map은 구현 순서·package 구조·workflow 운영을 별도로 정의하지 않는다. 각 capability의 **검증된 결과와 남은 release gap**만 연결한다.

## 1.0 capability 상태

상태는 **미검증 / 미충족 / 부분 충족 / 충족**만 사용한다.

| Capability | 현재 판정 | 검증된 Evidence | 다음 통합 검수 |
|---|---|---|---|
| Authoring | **미충족** | legacy Payload visual authoring Evidence는 있으나 현재 Git-backed md-like source를 호환 authoring tool로 수정·보존하는 target Evidence로 재검증되지 않았다. | 실제 canonical source 수정·보존 → Site 소비 Evidence |
| Canonical Content | **부분 충족** | Docs Git revision이 canonical corpus를 식별하고 Site가 `c5826802` corpus를 직접 소비했다. 선택적 Engine enrichment도 Docs-side workflow에서 검증됐다. | 현재 authoring/source-preservation path와 final release revision 연결 |
| Extensibility | **부분 충족** | 과거 custom component opt-in Evidence는 존재하나 현재 Site/package source of truth 기준의 end-to-end authoring/consumer Evidence는 아직 release snapshot에 연결되지 않았다. | 실제 component implementation/package + consumer + 필요한 authoring integration Evidence |
| Automation | **부분 충족** | Engine enrichment, portable CLI artifact, Docs trusted consumer workflow가 실제 자동화 경로로 검증됐다. | 현재 publishing/delivery path에 필요한 automation Evidence를 final release revision에 연결 |
| Publishing | **부분 충족** | canonical Docs revision → Site direct consumption/build/render는 검증됐다. release-only live mutation boundary도 integration state에서 검증됐다. | Site `main` promotion 후 canonical Docs SHA + Site SHA + deploy result 연결 |
| Presentation | **충족** | Site run 36406348962에서 canonical corpus로 11 Article pages build/render 성공. | final release revision에서 재확인 |
| Delivery | **부분 충족** | 과거 live delivery Evidence는 있으나 현재 Git-backed target의 release-only gate 이후 새 `main` deploy Evidence는 아직 없다. | Site `develop → main` 후 새 GitHub Pages delivery Evidence |

## 다음 release gap

현재 Map에서 가장 중요한 통합 gap은 하나다.

```text
canonical Docs revision
        ↓
Site develop → main promotion
        ↓
new main build/render
        ↓
GitHub Pages delivery
        ↓
Docs SHA + Site SHA + delivery result 연결
```

이 Evidence가 확보되면 Publishing / Presentation / Delivery 판정을 새 release snapshot으로 다시 평가한다. 별도 checkpoint section을 추가하지 않는다.

## 갱신 규칙

- 이 문서는 **한 개의 현재 검증 snapshot**만 유지한다.
- 판정은 명시된 revision과 immutable Evidence에만 적용한다.
- 새 Evidence가 생겼다고 즉시 로그를 추가하지 않는다. capability 판정을 바꿀 만큼 충분할 때 revision/Evidence/판정을 함께 갱신한다.
- historical snapshot과 판정 변화는 Git history에서 추적한다.
- live Project/Issue/PR status는 이 문서에 복제하지 않는다.
- 문서 정리만으로 runtime/build/deployment 완료를 판정하지 않는다.
