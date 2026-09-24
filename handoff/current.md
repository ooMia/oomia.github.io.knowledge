# Current Handoff

Updated: 2026-09-24

## 현재 작업

- [Knowledge Issue #10](https://github.com/ooMia/oomia.github.io.knowledge/issues/10): 공통 scheme과 문서 소유권 정리.
- Knowledge branch: `docs/shared-repository-scheme`, PR target: `develop`.
- 연계 Draft PR: [Knowledge #11](https://github.com/ooMia/oomia.github.io.knowledge/pull/11), [Engine #27](https://github.com/ooMia/oomia.github.io.engine/pull/27), [Site #11](https://github.com/ooMia/oomia.github.io/pull/11).
- 이번 요청은 merge/release 지시가 아니며 세 PR은 통합 전 상태로 유지한다.

## 이번에 확정한 ownership

- Knowledge는 PM/coordination layer다. workflow·공통 개발 기준·통합 목표·acceptance·Evidence linkage만 소유한다.
- editor 종류는 Knowledge-level 관심사가 아니다. frontmatter를 포함한 동일 md-like source를 관리하고 의미를 보존하면 구현 선택은 owner repository가 결정한다.
- 실제 supported component/syntax/schema는 Site와 관련 package/code가 source of truth다.
- editor와 renderer가 component를 공유할 때 동일 package/codebase를 소비한다. 필요한 adapter는 구현 detail이며 별도 semantics 원본이 아니다.
- Knowledge는 component manifest/catalog를 소유하지 않는다.

## 문서 정리

- `content-authoring-contract.md`, `publishable-projection.md`, `content-component-schema.md`, Knowledge의 component manifest JSON Schema를 제거한다. 필요한 PM-level 경계는 Architecture/Release에 흡수한다.
- editor/component/layout/Site migration/Engine runtime 같은 구현 질문을 Knowledge Open Questions에서 제거한다.
- 기존 immutable Implementation Map Evidence와 당시 판정은 보존하고, 새 정책 때문에 과거 implementation 성공을 현재 완료로 재해석하지 않는다.
- Site 소비 계약은 실제 package/code를 component semantics 원본으로 사용하도록 정리한다.

## 검증 경계

- 문서 정리와 링크 검증은 implementation 검증이 아니다.
- Site head의 자동 Pages run이 성공해도 새 component/editor architecture 구현 완료로 확대하지 않는다.
- 구현 상태는 책임 repository의 code/test/build/deployment Evidence로 별도 재검증한다.

## 다음 안전한 작업

1. Knowledge generated bundle을 새 canonical 문서 집합으로 재생성한다.
2. 세 PR의 diff와 링크를 다시 확인한다.
3. PR 통합 전 branch 링크를 유지하고, 실제 merge 시 main 원본 링크로 전환한다.
4. merge는 사용자 지시 전 수행하지 않는다.
