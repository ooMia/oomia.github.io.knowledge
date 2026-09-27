# Current Handoff

Updated: 2026-09-27

## 현재 checkpoint

- C1-W2의 repository Issue/PR 작업은 모두 종료됐다.
- Project #11의 C1-W2 Item은 Done/Cancelled 상태로 정리되어 있고, C1-W3 Item은 아직 없다.
- Knowledge / Engine / Site / Docs 모두 open Issue와 open PR이 없다.
- Engine enrichment 및 portable artifact, Docs model-backed enrichment Evidence는 C1-W2 결과로 유지한다.
- Project-level canonical entry point는 [CONTEXT.md](../CONTEXT.md)다.

## C1-W2 마무리

지속할 설계/전환 지식은 현재 Knowledge와 owning repository migration 문서에 흡수했다. legacy/archive/backup branch 자체는 장기 지식 archive로 유지하지 않는다.

원격 cleanup이 남아 있다.

- Engine: `archive/legacy-2026-09-21/*` 4개
- Site: `legacy-tistory`
- Knowledge: `archive/main-before-cleanup-20260921`, `backup/pre-history-cleanup-20260918`

이 cleanup은 C1-W3 구현의 기술적 blocker는 아니지만 C1-W2 종료 housekeeping으로 처리한다.

## C1-W3 재개 지점

[Architecture Transition](../docs/architecture-transition.md)의 **Phase B — Prove direct Docs consumption**으로 이동한다.

현재 확인된 Site integration boundary:

1. Site `.gitmodules`는 Docs repository 전체를 `apps/web/data/articles`에 마운트한다.
2. `apps/web/src/content.config.ts`의 article loader는 그 root에서 `**/*.{md,mdx}`를 읽는다.
3. canonical Docs root는 `content/`와 `docs/`로 나뉘며, article 외 Markdown/MDX가 함께 존재할 수 있다.
4. 따라서 다음 Site slice는 **canonical article 영역만 명시적으로 소비**하도록 discovery boundary를 정렬하고 현재 Docs revision으로 build/render를 재검증해야 한다.

Draft candidate:
- [Site #12 — align Site article consumption with canonical Docs layout](https://github.com/ooMia/oomia.github.io/issues/12)
- 현재 `closed / not_planned` fallback Draft 상태이며 C1-W3 activation 전까지 Project Item/Development branch를 만들지 않는다.

## 다음 실행 순서

1. 남은 legacy/archive branch cleanup
2. C1-W3 시작 시 Site #12 활성화
3. Issue activation automation으로 Project #11 등록 및 linked Development branch 생성 확인
4. Site green scaffold → 현재 Docs revision 소비 → sync/typecheck/test/build Evidence
5. Docs revision + Site revision + rendered result를 연결해 Phase B를 평가

## 운영 주의

- 과거 Project field reconciliation은 C1-W3 선행 조건으로 두지 않는다.
- Issue activation automation은 activation 초기화만 소유하며 close lifecycle 동기화는 아직 자동화하지 않는다.
- 구현 상세은 Site code/docs가 source of truth이고 Knowledge에는 integration outcome과 Evidence linkage만 남긴다.
