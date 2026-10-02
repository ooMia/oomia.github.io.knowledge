# Implementation Map

Publishing Platform 1.0의 **현재 검증 snapshot**과 cross-repository Evidence 연결을 소유한다. live branch 상태나 작업 로그를 복제하지 않으며, 판정은 아래에 고정한 revision/Evidence 범위에서만 유효하다.

새 Evidence가 기존 판정을 대체할 만큼 충분하면 날짜별 checkpoint를 추가하지 않고 이 snapshot의 기준 revision과 capability 판정을 갱신한다. 과거 판정은 Git history와 연결된 Issue/PR/run Evidence에서 추적한다.

## 현재 검증 범위

| 역할 | Repository / revision | 검증 의미 |
|---|---|---|
| canonical content | [`ooMia/oomia.github.io.docs@c5826802`](https://github.com/ooMia/oomia.github.io.docs/commit/c5826802be296f4ad84193119729be77a2d52c3c) | Site canonical release가 직접 소비한 Docs revision |
| Site canonical release | [`ooMia/oomia.github.io@b46b4af`](https://github.com/ooMia/oomia.github.io/commit/b46b4af031a1be668ebc2b6ebe6a619e9f4111f7) / [run 37049335332](https://github.com/ooMia/oomia.github.io/actions/runs/37049335332) | Docs `c5826802`를 포함한 Site `main` build와 GitHub Pages delivery가 모두 성공한 final delivery Evidence |
| Engine canonical integration | [`ooMia/oomia.github.io.engine@0484358`](https://github.com/ooMia/oomia.github.io.engine/commit/0484358d9118ecc8dfdb803b64909827e205ddf1) / [run 37049044873](https://github.com/ooMia/oomia.github.io.engine/actions/runs/37049044873) | Linux/macOS/Windows full validation과 packaged Engine artifact verification이 통과한 canonical Engine revision |
| Engine optional mutation | [Engine Issue #23](https://github.com/ooMia/oomia.github.io.engine/issues/23) / [PR #30](https://github.com/ooMia/oomia.github.io.engine/pull/30) | model-assisted metadata enrichment의 선택적 mutation Evidence |
| Docs trusted consumer | [Docs run 36260957694](https://github.com/ooMia/oomia.github.io.docs/actions/runs/36260957694) | Engine artifact를 사용한 Docs-side trusted workflow Evidence |

Site release PR [#24](https://github.com/ooMia/oomia.github.io/pull/24)의 promotion validation은 [run 37049239677](https://github.com/ooMia/oomia.github.io/actions/runs/37049239677)에서 `astro sync → vp check → vp test → workspace build`를 통과했고, PR 단계에서는 Pages deployment가 실행되지 않았다. merge 후 `main@b46b4af`의 [run 37049335332](https://github.com/ooMia/oomia.github.io/actions/runs/37049335332)에서 `build=success`, `deploy=success`가 확인됐다.

따라서 이전 Q003의 final release gate인 **canonical Docs revision + Site revision + delivery result 연결**은 이 snapshot에서 충족됐다.

## Architecture transition

장기 제품 경계는 [Architecture](architecture.md), 전환 순서와 safety rule은 [Architecture Transition](architecture-transition.md), release acceptance는 [Release 1.0](release-1.0.md)이 소유한다.

이 Map은 구현 순서·package 구조·workflow 운영을 별도로 정의하지 않는다. 각 capability의 **검증된 결과와 남은 release gap**만 연결한다.

## 1.0 capability 상태

상태는 **미검증 / 미충족 / 부분 충족 / 충족**만 사용한다.

| Capability | 현재 판정 | 검증된 Evidence | 다음 통합 검수 |
|---|---|---|---|
| Authoring | **미충족** | legacy Payload visual authoring Evidence는 있으나 현재 Git-backed md-like source를 호환 authoring tool로 수정·보존하는 target Evidence로 재검증되지 않았다. | 실제 canonical source 수정·보존 → Site 소비 Evidence |
| Canonical Content | **부분 충족** | Docs Git revision `c5826802`가 canonical corpus를 식별하고 Site canonical release가 동일 revision을 직접 소비했다. 선택적 Engine enrichment도 Docs-side workflow에서 검증됐다. | 현재 authoring/source-preservation path와 canonical content revision 연결 |
| Extensibility | **부분 충족** | 과거 custom component opt-in Evidence는 존재하나 현재 Site/package source of truth 기준의 end-to-end authoring/consumer Evidence는 아직 release snapshot에 연결되지 않았다. | 실제 component implementation/package + consumer + 필요한 authoring integration Evidence |
| Automation | **충족** | Engine/Docs automation Evidence와 Site `main` build/deploy automation이 실제 canonical revision 검증·delivery에 참여했다. | 현재 Evidence 유지 |
| Publishing | **충족** | Docs `c5826802` → Site `b46b4af` 소비 관계와 final `main` build/deploy가 재현 가능한 revision/run으로 연결됐다. | 현재 Evidence 유지 |
| Presentation | **충족** | Site canonical release build가 성공했고 동일 revision이 GitHub Pages delivery로 이어졌다. | 현재 Evidence 유지 |
| Delivery | **충족** | Docs `c5826802` + Site `b46b4af` + run 37049335332의 GitHub Pages deploy success가 연결됐다. | 현재 Evidence 유지 |

## 현재 남은 1.0 gap

final delivery gate는 닫혔다. 현재 1.0 제품 acceptance에서 남은 핵심 gap은 다음과 같다.

- **Authoring:** 현재 Git-backed md-like source를 실제 호환 authoring tool로 수정하고 의미 보존을 검증한 Evidence
- **Extensibility:** 현재 Site/package source of truth 기준의 실제 확장 표현을 authoring/consumer 경로와 연결한 Evidence
- **Canonical Content:** 위 authoring/source-preservation Evidence를 canonical Git revision과 연결

새 구현은 이 gap을 실제 owning repository의 Issue/PR/Evidence로 닫는다. 별도 날짜별 checkpoint section은 만들지 않는다.

## 갱신 규칙

- 이 문서는 **한 개의 현재 검증 snapshot**만 유지한다.
- 판정은 명시된 revision과 immutable Evidence에만 적용한다.
- 새 Evidence가 생겼다고 즉시 로그를 추가하지 않는다. capability 판정을 바꿀 만큼 충분할 때 revision/Evidence/판정을 함께 갱신한다.
- historical snapshot과 판정 변화는 Git history에서 추적한다.
- live Project/Issue/PR status는 이 문서에 복제하지 않는다.
- 문서 정리만으로 runtime/build/deployment 완료를 판정하지 않는다.
