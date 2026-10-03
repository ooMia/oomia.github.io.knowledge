# Knowledge Maintenance

이 문서는 `ooMia/oomia.github.io.knowledge` **자체를 수정·유지하는 방법**을 설명하는 repository-local guide다. 외부 contributor를 위한 기여 정책이 아니며, 프로젝트 전체의 공통 정책을 새로 정의하지 않는다.

## 수정 절차

1. [CONTEXT](../CONTEXT.md)에서 현재 작업에 필요한 canonical source를 찾는다.
2. 규칙을 바꿀 때는 실제 owner 문서만 수정한다. 같은 정책을 다른 문서에 복제하지 않는다.
3. 아직 확정되지 않은 제품/cross-repository 판단은 [Open Questions](open-questions.md)에 남긴다.
4. 구현 상태나 완료 Evidence를 바꾸려면 owning repository의 live code, Issue, PR, workflow/deployment 결과를 확인한다.
5. Knowledge 수정 후 `python3 scripts/bundle.py`를 실행해 내부 링크를 검증하고 `dist/CONTEXT-BUNDLE.md`를 재생성한다.
6. 최종 diff가 하나의 명확한 정책/문서 변화로 읽히는지 확인한다.

## 작업 상태

- 다음 세션까지 이어져야 하는 실행 상태는 GitHub Project #11, Issue, PR 또는 owning repository Evidence에 남긴다.
- 별도 handoff 파일이나 세션 로그를 현재 상태의 원장으로 유지하지 않는다.
- 과거 변경 근거가 필요하면 Git history와 immutable Evidence를 사용한다.

## Issue / PR

- Repository Issue를 생성하거나 크게 수정할 때는 `.github/ISSUE_TEMPLATE/`에서 완료 모델에 맞는 template을 먼저 선택한다. repository state 변경은 [Change template](../.github/ISSUE_TEMPLATE/change.md), 결론과 Evidence 확보는 [Investigation template](../.github/ISSUE_TEMPLATE/investigation.md)을 사용한다.
- Issue의 operational metadata는 GitHub Project/native fields가 소유하며 body에 현재값을 중복 기록하지 않는다.
- branch/PR/lifecycle 의미는 [Planning Model](planning-model.md), [Project Orchestration](project-orchestration.md), [Git Workflow](git-workflow.md)을 따른다.

## 문서 경계

- Knowledge는 공통 semantics와 project-wide invariant를 소유한다.
- repository-specific runtime, workflow, API, token, runner, branch topology와 구현 상세는 owning repository가 소유한다.
- 새 문서는 새로운 정보 소유권이 필요할 때만 만든다. 편의를 위한 요약 문서는 canonical source를 대체하지 않는다.
