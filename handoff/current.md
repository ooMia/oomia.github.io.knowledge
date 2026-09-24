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
- 추가 소유권 검토에서 architecture-transition은 cross-repository coordination/Evidence 연결만 남기고 Engine/Site migration 상세를 owner 원본으로 정리했다. development-toolchain의 Engine-specific container 지침도 공통 원칙 + owner 참조로 축소했다.
- implementation-map의 immutable Evidence와 당시 capability 판정은 보존했다. stale transition anchor만 Engine migration record/current Issue 참조로 수정했다.
- 기존 로컬 문서 링크·anchor/diff/bundle 검증은 이전 branch revision에서 수행된 문서 Evidence다. 이번 connector 기반 추가 편집은 문서 변경이며 runtime/build/deployment 검증으로 간주하지 않는다.
- 후속 편집의 변경 문서 상대 경로를 branch tree와 대조했고 generated bundle을 현재 canonical 문서에 맞춰 갱신했다. Site PR head의 자동 Pages run 36016190064는 success지만, 기존 Site pipeline의 build/deploy 관찰값으로만 기록하며 새 목표 계약 구현 완료와 구분한다.
- 기존 레포의 물리적인 디렉토리는 이동하지 않았다. 전체 레포의 scheme 준수 검사를 수행했다는 의미가 아니다.
- 이번 branch는 Knowledge Issue activation의 개발 base를 수정한다. GitHub Issue event는 변경이 main에 도달하기 전까지 기존 default-branch workflow를 실행한다. develop에 통합하는 것만으로 새 workflow가 활성화되지 않는다.
- 과거 Engine #21 checkpoint는 이력으로 남아 있다. 과거 handoff의 branch를 그대로 재개하지 말고 구현 작업이 필요할 때 책임 레포에서 현재 상태를 확인한다.

## 다음 검토

파일 수정·소비 계약과 통합 목표·검수 연결의 소유권 질문은 해결됐다. release-1.0/implementation-map은 Knowledge에 유지하고 기술 상세는 원본 참조로 정리했다. Engine runtime 및 Site integration/toolchain 설계도 소유 레포의 같은 PR로 이관했다. Engine 후처리를 commit·Site 소비의 선행 조건으로 둔 설명을 제거했다. Agent opt-in/out은 Engine 설계 요구로만 기록했으며 코드나 옵션을 구현한 것은 아니다.

문서별 ownership 검토는 editor 관련 절과 component manifest를 제외하고 완료했다. 남은 결정은 Q017 authoring editor 역할/authoring 정책의 durable owner와 Q012 component manifest 필요성/owner다. 이 결정에 의존하지 않는 문서 정리와 검증은 계속 진행할 수 있다.
