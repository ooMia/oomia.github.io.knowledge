# Current Handoff

Updated: 2026-09-27

## 현재 checkpoint

- Knowledge는 PM/coordination layer이며 [Issue #10](https://github.com/ooMia/oomia.github.io.knowledge/issues/10)의 ownership 정리는 완료됐다.
- trusted self-hosted inference consumer topology는 [Knowledge Issue #12](https://github.com/ooMia/oomia.github.io.knowledge/issues/12)에서 completed로 종료했다.
- Engine의 model-assisted frontmatter enrichment는 [Engine Issue #23](https://github.com/ooMia/oomia.github.io.engine/issues/23) / [PR #30](https://github.com/ooMia/oomia.github.io.engine/pull/30)에서 완료됐다.
- portable Engine artifact는 [Engine run 36257543854](https://github.com/ooMia/oomia.github.io.engine/actions/runs/36257543854)에서 Linux/macOS/Windows 및 post-download isolation 검증을 통과했고, [Engine PR #37](https://github.com/ooMia/oomia.github.io.engine/pull/37)로 `main`에 승격됐다.
- Docs는 [run 36260957694](https://github.com/ooMia/oomia.github.io.docs/actions/runs/36260957694)에서 실제 model-backed fixture enrichment와 canonical content commit/push를 완료했다.
- 결과 Docs commit은 [`bf93bb5`](https://github.com/ooMia/oomia.github.io.docs/commit/bf93bb536b8a4e3a7149737b15723514ce1bdfd8)이며 `Engine-Revision`과 `Engine-Run` provenance를 기록한다.

## 확정된 ownership

- Knowledge: 공통 workflow·개발 기준·통합 목표·acceptance·Evidence linkage.
- Engine: md-like document의 선택적 mutation/enrichment 및 portable CLI artifact.
- Docs: canonical content remote와 Git revision history.
- Site: Docs input의 실제 consumption/rendering/publishability/delivery.
- editor 종류와 component catalog/adapter shape는 Knowledge-level 정책이 아니라 owning implementation의 결정이다.

## 다음 안전한 작업

[Architecture Transition](../docs/architecture-transition.md)의 **Phase B — Prove direct Docs consumption**으로 이동한다.

Site 작업 전 확인된 핵심 integration risk:

1. Site의 `apps/web/data/articles`는 현재 Docs repository 전체를 submodule로 마운트한다.
2. Site article loader는 그 root에서 `**/*.{md,mdx}`를 glob한다.
3. 현재 Docs layout은 `content/articles/**`, `content/diary/**`, `content/templates/**`, `docs/**`로 분리되어 있어 단순 submodule revision update만으로는 article collection 경계가 깨질 수 있다.
4. Site가 가리키는 Docs revision은 현재 canonical Docs main보다 뒤처져 있으므로, 기존 Pages 성공을 새 layout 호환 Evidence로 사용하지 않는다.
5. 다음 Site vertical slice는 repository integration boundary와 article consumption boundary를 분리하고, 현재 Docs revision으로 build/render/delivery를 재검증해야 한다.

## 현재 branch checkpoint

- Knowledge `main`은 current coordination policy를 포함한다.
- Knowledge `develop`은 promotion 후 자동 삭제되어 `main`에서 즉시 복구했다.
- Engine `main`은 verified enrichment/artifact slice를 포함한다.
- Docs는 `main`만 유지하며 merged head branch 자동 삭제가 동작한다.

## 정리 시 보존할 것

- Engine `archive/legacy-2026-09-21/*`는 migration preservation boundary이므로 일반 merged branch cleanup과 같이 삭제하지 않는다.
- Knowledge archive/backup branch도 historical recovery 목적이 명확하므로 현재 cleanup 대상이 아니다.
- Implementation Map의 2026-09-21 revision-bound 판정은 historical snapshot으로 보존하고, 새 Site integration Evidence가 생긴 뒤 capability를 재평가한다.

## Project #11 주의점

현재 Issue activation automation은 `opened`, `reopened`, manual replay만 처리한다. Issue close 시 Project Status를 자동으로 `Done`으로 맞추지 않는다.

따라서 closed repository Issue와 Project #11 item status가 어긋날 수 있다. Project field가 canonical state이므로 Site 신규 backlog를 활성화하기 전에 Project UI에서 completed/not-planned item의 Status를 한 번 reconcile한다. 이 lifecycle 자동화가 반복적인 불편이 되면 별도 Maintenance issue로 다룬다.
