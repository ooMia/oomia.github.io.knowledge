# Current Handoff

Updated: 2026-09-27

## 현재 checkpoint

- C1-W2 repository 작업과 legacy/archive branch cleanup은 종료됐다.
- Engine, Site, Knowledge는 `main` / `develop`만 유지하고 Docs는 `main`만 유지한다.
- C1-W3 Goal은 **canonical Docs를 Site가 직접 소비하는 경계 검증**이다.
- [Site #12](https://github.com/ooMia/oomia.github.io/issues/12)를 활성화했고 linked Development branch `12-feat-align-site-article-consumption-with-canonical-docs-layout`가 생성됐다.
- #12는 Project #11에 수동 등록해 `Todo / C1-W3 / Feature / Publishable Projection / 1.0.0`을 복구했다. Scope는 Issue seed의 `Publishing, Presentation`을 따른다.

## C1-W3 implementation boundary

[Architecture Transition](../docs/architecture-transition.md)의 **Phase B — Prove direct Docs consumption**을 수행한다.

현재 확인된 integration boundary:

1. Site는 Docs repository 전체를 `apps/web/data/articles`에 submodule로 마운트한다.
2. article loader는 그 root의 `**/*.{md,mdx}`를 읽는다.
3. canonical Docs는 `content/`와 `docs/`로 나뉘며 article 외 Markdown/MDX가 존재할 수 있다.
4. #12는 canonical article 영역만 명시적으로 소비하도록 discovery boundary를 정렬하고, 현재 Docs revision으로 sync/typecheck/test/build/render Evidence를 남긴다.

별도의 W3 planning/boundary Item을 추가하지 않는다. #12의 Outcome/AC가 현재 Iteration Goal을 직접 검증하며, 구현 전 추가 제품 결정이 필요하지 않다.

## 운영 결함 — Project sync authentication

#12 activation Action에서 Development branch 생성은 성공했지만 Project synchronization job은 `Unauthorized`로 실패했다.

- 원인: repository secret `PROJECT_TOKEN` 인증 실패
- 영향: future Issue activation에서 Project Item/field 초기화가 자동 수행되지 않을 수 있음
- #12 implementation 자체의 blocker는 아님
- Project #11 상태가 source of truth이므로 #12는 현재 수동 복구된 Project 상태를 사용한다.
- 인증 복구는 Site consumption 구현과 섞지 않고 별도 Maintenance concern으로 다룬다.

## 다음 실행

1. #12 development branch에서 green scaffold로 Site article discovery boundary를 정렬한다.
2. current Docs revision을 연결한다.
3. sync/typecheck/test/build와 실제 article render를 검증한다.
4. Docs revision + Site revision + rendered result를 Evidence로 연결한다.
5. 결과를 바탕으로 Phase B 완료 여부와 다음 C1-W3 slice를 결정한다.

Project-level canonical entry point는 [CONTEXT.md](../CONTEXT.md)다.
