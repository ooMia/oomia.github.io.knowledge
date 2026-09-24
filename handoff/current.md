# Current Handoff

Updated: 2026-09-25

## 현재 작업

- [Knowledge Issue #10](https://github.com/ooMia/oomia.github.io.knowledge/issues/10): 공통 scheme과 문서 소유권 정리.
- Knowledge branch: `docs/shared-repository-scheme`; target: `develop`.
- [Engine PR #27](https://github.com/ooMia/oomia.github.io.engine/pull/27)은 squash merge되어 `develop` commit `ab954ce`가 됐고 [Engine Issue #26](https://github.com/ooMia/oomia.github.io.engine/issues/26)은 completed로 종료했다.
- [Site PR #11](https://github.com/ooMia/oomia.github.io/pull/11)은 squash merge되어 `develop` commit `425abaa`가 됐고 [Site Issue #10](https://github.com/ooMia/oomia.github.io/issues/10)은 completed로 종료했다.
- [Knowledge PR #8](https://github.com/ooMia/oomia.github.io.knowledge/pull/8)은 유효한 green-scaffold 규칙을 현재 Planning Model/Agent 지침에 흡수한 뒤 superseded로 close했다.
- 남은 integration은 [Knowledge PR #11](https://github.com/ooMia/oomia.github.io.knowledge/pull/11) → `develop` squash merge와 Issue #10 종료다.

## 확정된 ownership

- Knowledge는 PM/coordination layer다. workflow·공통 개발 기준·통합 목표·acceptance·Evidence linkage만 소유한다.
- editor 종류는 Knowledge-level 관심사가 아니다. frontmatter를 포함한 동일 md-like source를 관리하고 의미를 보존하면 구현 선택은 owner repository가 결정한다.
- 실제 supported component/syntax/schema는 Site와 관련 package/code가 source of truth다.
- editor와 renderer가 component를 공유할 때 동일 package/codebase를 소비하며 필요한 adapter는 구현 detail이다.
- Knowledge는 component manifest/catalog를 소유하지 않는다.
- Engine은 document mutation contract, Site는 consumption/publishability contract를 각각 `develop` 원본으로 소유한다.

## Git workflow 반영

- 일반 Issue branch → `develop` → release 시 `main` 흐름을 공통 원본으로 유지한다.
- merge method는 강제하지 않는다.
- 작업 과정의 중간·정리 commit이 많은 PR이 최종적으로 하나의 응집된 변화라면 squash merge를 우선 권장한다.
- green scaffold는 Issue-linked 구현의 기본 착수 방식이며 최종 AC/DoD를 축소하지 않는다.

## 검증 경계

- Knowledge의 obsolete compatibility 문서와 component manifest schema는 제거했다.
- 삭제 파일 stale local reference 및 상대 문서 링크를 branch tree 기준으로 검사했다.
- generated context bundle을 현재 16개 canonical source에 맞춰 갱신했다.
- Engine/Site merged contract는 각 `develop`에서 다시 읽어 확인했다.
- Site PR head Pages run `36022601841`은 success였으나 기존 pipeline build/deploy 관찰값으로만 사용한다.
- 문서 정리와 링크 검증은 runtime/component/editor 구현 완료 Evidence가 아니다.
- Implementation Map의 기존 revision-bound Evidence는 보존한다.

## 다음 안전한 작업

1. Knowledge PR #11 최종 diff/link 상태를 확인하고 Ready 전환한다.
2. 사용자 결정대로 squash merge한다.
3. Knowledge Issue #10의 AC/Evidence를 merged revision 기준으로 완료 처리하고 close한다.
4. `main` 승격은 별도 release/integration 판단으로 남긴다.
