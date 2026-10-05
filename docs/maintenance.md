# Knowledge Maintenance

이 문서는 `ooMia/oomia.github.io.knowledge` **자체를 수정·유지하는 방법**을 설명하는 repository-local guide다. 외부 contributor를 위한 기여 정책이 아니며, 프로젝트 전체의 공통 정책을 새로 정의하지 않는다.

## 수정 절차

1. [CONTEXT](../CONTEXT.md)에서 현재 작업에 필요한 canonical source를 찾는다.
2. 규칙을 바꿀 때는 실제 owner 문서만 수정한다. 같은 정책을 다른 문서에 복제하지 않는다.
3. 아직 확정되지 않은 제품/cross-repository 판단은 [Open Questions](open-questions.md)에 남긴다.
4. 구현 상태나 완료 Evidence를 바꾸려면 owning repository의 live code, Issue, PR, workflow/deployment 결과를 확인한다.
5. 필요하면 로컬에서 `python3 scripts/bundle.py`를 preflight로 실행한다. PR에서는 repository automation이 동일 generator로 tracked bundle을 materialize하고 재현성을 검증한다.
6. 최종 diff가 하나의 명확한 정책/문서 변화로 읽히는지 확인한다.

## 작업 상태

- 다음 세션까지 이어져야 하는 실행 상태는 GitHub Project #11, Issue, PR 또는 owning repository Evidence에 남긴다.
- 별도 handoff 파일이나 세션 로그를 현재 상태의 원장으로 유지하지 않는다.
- 과거 변경 근거가 필요하면 Git history와 immutable Evidence를 사용한다.

## Issue / PR

- Repository Issue를 생성하거나 크게 수정할 때는 `.github/ISSUE_TEMPLATE/`에서 완료 모델에 맞는 template을 먼저 선택한다. repository state 변경은 [Change template](../.github/ISSUE_TEMPLATE/change.md), 결론과 Evidence 확보는 [Investigation template](../.github/ISSUE_TEMPLATE/investigation.md)을 사용한다.
- Issue의 operational metadata는 GitHub Project/native fields가 소유하며 body에 현재값을 중복 기록하지 않는다.
- branch/PR/lifecycle 의미는 [Planning Model](planning-model.md), [Project Orchestration](project-orchestration.md), [Git Workflow](git-workflow.md)을 따른다.

## Generated context bundle

`dist/CONTEXT-BUNDLE.md`는 canonical Knowledge 문서에서 재생성하는 **tracked but non-canonical generated transport artifact**다.

- repository source에 직접 접근할 수 있으면 [CONTEXT](../CONTEXT.md) routing을 따라 필요한 canonical source를 직접 읽는다.
- bundle은 repository 접근이 없거나 단일 파일로 Chat/context를 전달해야 할 때 사용하는 snapshot/transport이며, routing이나 live Project/Issue/PR state를 대체하지 않는다.
- bundle 내부에서도 embedded `CONTEXT.md`를 entry point로 보고 필요한 source section만 사용한다.
- bundle을 직접 수정하지 않는다. 내용이 잘못되면 canonical source 또는 `scripts/bundle.py`를 수정한다.
- same-repository PR에서 canonical Markdown 또는 generator가 바뀌면 GitHub-hosted automation이 bundle을 재생성한다. 결과가 달라지면 automation은 PR source branch의 `dist/CONTEXT-BUNDLE.md`만 GitHub-Verified commit으로 materialize한다.
- `main`에서는 동일 generator를 read-only로 다시 실행해 committed bundle과 canonical sources의 일치를 검증한다.

## Default branch integration

Knowledge repository의 default/canonical branch는 `main`이다. 이 절은 [Git Workflow](git-workflow.md)의 공통 invariant를 Knowledge에 구체화한 repository-local 정책이다.

- `main`으로의 일반 변경은 Pull Request를 통해서만 통합한다. direct push는 정상 integration path로 사용하지 않는다.
- `main`은 linear history를 유지한다. merge commit은 허용하지 않으며 squash/rebase처럼 선형 history를 보존하는 integration만 사용한다.
- 이 제한은 Knowledge의 default branch에 대한 repository-local specialization이며, 다른 repository의 merge method를 공통으로 제한하지 않는다.
- generated bundle automation은 `main`을 직접 수정하지 않고 PR source branch만 수정한다.
- **Signed commits는 향후 hardening 목표다.** 현재 `Require signed commits`는 비활성화되어 있으며, Chat 세션에서 GitHub connector의 일반 file-write commit이 Verified 경로를 갖출 필요성이 생길 때 다시 검토한다. 현재 integration invariant로 간주하지 않는다.
- owner/admin emergency bypass semantics는 현재 정책 범위에 포함하지 않는다.

문서 정책과 live enforcement를 구분한다. 현재 live ruleset은 default branch에 PR-required, linear history, deletion protection, non-fast-forward protection을 적용한다. 기존 history의 unsigned/merge commits는 rewrite하지 않는다.

## 문서 경계

- Knowledge는 공통 semantics와 project-wide invariant를 소유한다.
- repository-specific runtime, workflow, API, token, runner, branch topology와 구현 상세는 owning repository가 소유한다.
- 새 문서는 새로운 정보 소유권이 필요할 때만 만든다. 편의를 위한 요약 문서는 canonical source를 대체하지 않는다.
