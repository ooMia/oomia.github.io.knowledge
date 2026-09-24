# Current Handoff

Updated: 2026-09-24

## 현재 작업

- [Knowledge Issue #10](https://github.com/ooMia/oomia.github.io.knowledge/issues/10): 공통 scheme과 문서 소유권 정리.
- 작업 branch: `docs/shared-repository-scheme`; PR target: `develop`.
- `develop`은 `main`의 `6a2534fd11a27462b278e8f06d3ca740d894c7c3`에서 생성했다.
- 기존 [PR #8](https://github.com/ooMia/oomia.github.io.knowledge/pull/8)은 변경하지 않았다. 향후 merge 전 공통 Git workflow와 branch 정책의 중복·충돌을 조정해야 한다.
- Issue #10의 [activation run](https://github.com/ooMia/oomia.github.io.knowledge/actions/runs/36010464001)은 success다. 이 결과를 전체 레포 automation 적용 상태로 확대하지 않는다.

## 남은 작업

- PR 검토·통합은 아직 수행하지 않았다. main release도 수행하지 않았다.
- 콘텐츠 계약은 사용자가 확정한 Engine 수정 / Site 소비 경계로 분리했다. [Engine PR #27](https://github.com/ooMia/oomia.github.io.engine/pull/27), [Site PR #11](https://github.com/ooMia/oomia.github.io/pull/11)은 develop 대상 Draft이며 아직 통합 전이다.
- Knowledge [PR #11](https://github.com/ooMia/oomia.github.io.knowledge/pull/11)은 이관 원본을 branch 링크로 참조한다. 세 PR 통합 뒤 실제 원본 경로로 전환하고 branch 삭제 전 링크를 확인한다.
- 공통 지침 중복은 Current Decisions 링크 인덱스, label registry 참조, 기능별 Engine Issue 참조로 줄였다.
- 로컬 문서 링크·anchor, diff 검사 및 bundle 재생성의 결정성을 확인했다. Engine/Site는 Markdown만 변경했고 runtime/build 검증은 재실행하지 않았다.
- 기존 레포의 물리적인 디렉토리는 이동하지 않았다. 전체 레포의 scheme 준수 검사를 수행했다는 의미가 아니다.
- 이번 branch는 Knowledge Issue activation의 개발 base를 수정한다. GitHub Issue event는 변경이 main에 도달하기 전까지 기존 default-branch workflow를 실행한다. develop에 통합하는 것만으로 새 workflow가 활성화되지 않는다.
- 과거 Engine #21 checkpoint는 이력으로 남아 있다. 과거 handoff의 branch를 그대로 재개하지 말고 구현 작업이 필요할 때 책임 레포에서 현재 상태를 확인한다.

## 다음 검토

파일 수정과 소비 계약의 소유권 질문은 해결됐다. 남은 editor 역할, 별도 projection의 필요성·위치·owner, 통합 release 문서의 소유권은 확정하지 않았다. `docs/open-questions.md`에 남아 있는 항목을 문서별로 검토한다.
