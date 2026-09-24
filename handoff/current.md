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
- 기술 문서의 실제 이관은 시작하지 않았다. `docs/open-questions.md`의 소유권 표를 따라 불확실한 owner를 사용자에게 확인한다.
- 기존 레포의 물리적인 디렉토리는 이동하지 않았다. 전체 레포의 scheme 준수 검사를 수행했다는 의미가 아니다.
- 이번 branch는 Knowledge Issue activation의 개발 base를 수정한다. GitHub Issue event는 변경이 main에 도달하기 전까지 기존 default-branch workflow를 실행한다. develop에 통합하는 것만으로 새 workflow가 활성화되지 않는다.
- 과거 Engine #21 checkpoint는 이력으로 남아 있다. 과거 handoff의 branch를 그대로 재개하지 말고 구현 작업이 필요할 때 책임 레포에서 현재 상태를 확인한다.

## 다음 검토

`content-authoring-contract.md`에서 Engine의 in-place 후처리 계약과 Site의 소비 계약을 구분하고, 공유 콘텐츠 계약의 단일 owner를 결정한 뒤 문서를 이동한다.
