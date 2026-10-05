# Publishing Platform 1.0

> **Authority:** RECORD  
> **Owner:** completed Publishing Platform 1.0 product boundary and acceptance Evidence  
> **Scope:** version 1.0 acceptance as completed on 2026-10-05; not current post-1.0 roadmap or implementation state  
> **Read when:** reconstructing what 1.0 required, why it was considered complete, or which immutable Evidence supported that conclusion  
> **Evidence scope:** Docs `4f50b150` / `c1cb0f1`, Site `79efd753` and linked validation/deploy runs, Engine `0484358`, plus the immutable Issues/PRs linked below

이 문서는 완료된 Publishing Platform 1.0의 **요구사항과 그 충족 Evidence를 함께 보존하는 frozen release record**다. 새로운 post-1.0 work, current roadmap, live Project state를 여기에 추가하지 않는다.

## Release goal

> Deliver a usable workflow for authoring Git-backed md-like content and publishing a verified canonical revision to a live site.

## Acceptance archive

| Capability | 1.0 required outcome | Acceptance Evidence |
|---|---|---|
| Authoring | frontmatter를 포함한 md-like document를 호환되는 authoring tool로 작성·수정하고 source 의미를 보존할 수 있다. 특정 editor 종류는 acceptance가 아니다. | [Docs #8](https://github.com/ooMia/oomia.github.io.docs/issues/8)과 authored revision [`4f50b150`](https://github.com/ooMia/oomia.github.io.docs/commit/4f50b15089607b2edea3bb8aa7f8e948a24d60fd) |
| Canonical Content | 사용자가 작성하거나 선택한 도구로 수정한 source를 Git commit으로 공유·재현 가능한 revision으로 식별한다. | Docs-owned normalization 후 canonical revision [`c1cb0f1`](https://github.com/ooMia/oomia.github.io.docs/commit/c1cb0f1c7c435cfe7b2fd24173f33b54847f75c2); Site release가 이 exact revision을 소비 |
| Extensibility | 실제 Site implementation/package가 지원하는 콘텐츠 표현을 동일 codebase와 검증으로 확장할 수 있다. | Site [PR #26](https://github.com/ooMia/oomia.github.io/pull/26) / [run 37099713772](https://github.com/ooMia/oomia.github.io/actions/runs/37099713772)에서 authored `Callout` 표현으로 sync/check/test/build 통과 |
| Automation | 최소 하나의 automated 또는 agent-assisted workflow가 validation, Git revision finalization, publish 또는 delivery process에 참여한다. | Engine [`0484358`](https://github.com/ooMia/oomia.github.io.engine/commit/0484358d9118ecc8dfdb803b64909827e205ddf1) / [run 37049044873](https://github.com/ooMia/oomia.github.io.engine/actions/runs/37049044873), Docs [run 36260957694](https://github.com/ooMia/oomia.github.io.docs/actions/runs/36260957694), Site build/deploy automation |
| Publishing | canonical revision이 Site consumer validation을 통과하고 발행 입력과 결과 관계를 재현할 수 있다. | Docs `c1cb0f1` → Site [`79efd753`](https://github.com/ooMia/oomia.github.io/commit/79efd753bd4b6efd63ab2e3bfccbd83935517c58), Site [PR #26](https://github.com/ooMia/oomia.github.io/pull/26) / [run 37099713772](https://github.com/ooMia/oomia.github.io/actions/runs/37099713772) |
| Presentation | Site가 accepted content revision을 사용자에게 렌더링한다. | Site `79efd753` build가 supported content expressions를 포함한 corpus로 성공하고 동일 revision이 delivery로 이어짐 |
| Delivery | Docs revision과 Site revision이 연결되어 GitHub Pages에 배포되고 성공 Evidence가 남는다. | Site [`79efd753`](https://github.com/ooMia/oomia.github.io/commit/79efd753bd4b6efd63ab2e3bfccbd83935517c58) / [run 37103699755](https://github.com/ooMia/oomia.github.io/actions/runs/37103699755) `build=success`, `deploy=success` |

사용자 작성 content의 commit과 Site consumption은 Engine 사용과 독립적이라는 boundary도 이 release에서 검증됐다. Engine의 model-assisted metadata mutation은 [Issue #23](https://github.com/ooMia/oomia.github.io.engine/issues/23) / [PR #30](https://github.com/ooMia/oomia.github.io.engine/pull/30)처럼 **optional capability Evidence**로 분리된다.

## Evidence anchors

| Role | Immutable revision / Evidence | Meaning at 1.0 completion |
|---|---|---|
| authored source | Docs [`4f50b150`](https://github.com/ooMia/oomia.github.io.docs/commit/4f50b15089607b2edea3bb8aa7f8e948a24d60fd) | Obsidian에서 existing canonical MDX의 frontmatter/source semantics를 보존하며 supported expression을 수정 |
| canonical content | Docs [`c1cb0f1`](https://github.com/ooMia/oomia.github.io.docs/commit/c1cb0f1c7c435cfe7b2fd24173f33b54847f75c2) | Docs-owned normalization을 거친 accepted canonical corpus |
| Site consumer validation | [PR #26](https://github.com/ooMia/oomia.github.io/pull/26) / [run 37099713772](https://github.com/ooMia/oomia.github.io/actions/runs/37099713772) | exact Docs revision checkout 후 `astro sync → vp check → vp test → workspace build` 통과 |
| Site canonical delivery | Site [`79efd753`](https://github.com/ooMia/oomia.github.io/commit/79efd753bd4b6efd63ab2e3bfccbd83935517c58) / [run 37103699755](https://github.com/ooMia/oomia.github.io/actions/runs/37103699755) | accepted Docs revision을 포함한 build + GitHub Pages delivery success |
| Site ownership boundary | [Issue #27](https://github.com/ooMia/oomia.github.io/issues/27) / [PR #28](https://github.com/ooMia/oomia.github.io/pull/28) | Docs formatting은 Docs가, Site는 consumer verification을 소유하도록 정렬 |
| Engine canonical integration | Engine [`0484358`](https://github.com/ooMia/oomia.github.io.engine/commit/0484358d9118ecc8dfdb803b64909827e205ddf1) / [run 37049044873](https://github.com/ooMia/oomia.github.io.engine/actions/runs/37049044873) | cross-platform validation과 packaged artifact verification |
| Docs trusted Engine consumer | [run 36260957694](https://github.com/ooMia/oomia.github.io.docs/actions/runs/36260957694) | Engine artifact를 사용한 Docs-side trusted workflow |
| architecture migration closure | Knowledge [PR #48](https://github.com/ooMia/oomia.github.io.knowledge/pull/48) / [`07d07579`](https://github.com/ooMia/oomia.github.io.knowledge/commit/07d07579b2c4dd6082c81494fe854d8109a9ab2b) | DB-backed CMS → Git-backed workspace transition을 historical RECORD로 닫음 |

historical technical contracts를 다시 확인해야 하면 accepted owner revision을 사용한다.

- Site consumer contract at 1.0: [`79efd753/docs/content-consumption-contract.md`](https://github.com/ooMia/oomia.github.io/blob/79efd753bd4b6efd63ab2e3bfccbd83935517c58/docs/content-consumption-contract.md)
- Engine mutation contract at 1.0: [`0484358/docs/content-modification-contract.md`](https://github.com/ooMia/oomia.github.io.engine/blob/0484358d9118ecc8dfdb803b64909827e205ddf1/docs/content-modification-contract.md)
- Knowledge architecture at transition closure: [`07d07579/docs/architecture.md`](https://github.com/ooMia/oomia.github.io.knowledge/blob/07d07579b2c4dd6082c81494fe854d8109a9ab2b/docs/architecture.md)

## Explicit exclusions

1.0 acceptance에 포함하지 않았다.

- production-grade multi-user CMS
- RBAC
- transactional collaborative editing
- advanced agent orchestration

editor 종류, component manifest, package layout도 release-level 필수 조건이 아니었다.

## Completion result

2026-10-05 기준 Authoring, Canonical Content, Extensibility, Automation, Publishing, Presentation, Delivery가 모두 위 immutable Evidence에 연결되었으며 **남은 1.0 acceptance gap은 없다고 판정했다.**

이 판정은 명시된 revisions/runs에만 적용한다. 이후 repository가 변경되었다고 이 RECORD를 “current implementation snapshot”으로 갱신하지 않는다.

## Archive boundary

- 이 문서는 완료된 1.0의 definition + Evidence archive다.
- 새로운 feature, current Project state, post-1.0 gap을 추가하지 않는다.
- historical Evidence 오류를 정정해야 할 때는 correction 자체를 normal Git change로 남기고 원래 Evidence scope를 임의로 확장하지 않는다.
- current roadmap과 future release planning은 [Planning Model](planning-model.md#release-lifecycle)과 live Project #11을 따른다.
- 현재 제품/implementation 판단에는 [Architecture](architecture.md)와 owning repository의 live code/docs/state를 사용한다.
