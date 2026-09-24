# Git Workflow

모든 repository가 공유하는 branch·PR·release 전략의 단일 원본이다. 각 레포에 같은 정책을 다시 작성하지 않는다.

## Branch와 통합

- default branch는 `main`, 개발 통합 branch는 `develop`이다.
- 한 번의 작은 변화가 아니라면 Issue별 작업 branch를 `develop`에서 만든다.
- 작업 branch의 변경은 PR로 검토해 `develop`에 통합한다.
- major/minor release마다 `develop`에서 `main`으로 PR을 열어 merge한다.
- 작업 branch에서 `main`으로 직접 PR을 보내 공통 통합 단계를 생략하지 않는다.

작은 변경이라는 이유만으로 `main` 직접 쓰기를 허용한다고 해석하지 않는다. 작은 변경의 직접 반영 대상, patch/hotfix 경로, merge 방식은 아직 확정하지 않았으며 필요해질 때 사용자에게 확인한다. 일반 작업은 위 PR 경로로 진행할 수 있다.

## Issue branch와 PR

Issue lifecycle은 [Planning Model](planning-model.md), branch 생성·연결·이름의 자동화 계약은 [Project Orchestration](project-orchestration.md)이 소유한다.

PR에는 결과와 변경 이유, 관련 Issue, 실제 수행한 검증과 남은 제한을 적는다. 여러 commit을 사용한 작업도 최종 diff가 하나의 검토 가능한 변화로 읽혀야 한다. merge 완료 전에는 완료된 integration으로 보고하지 않는다.

## 정책 적용과 기존 상태

공통 전략은 목표 정책이다. 문서를 수정했다고 기존 branch, workflow, protection 설정까지 변경된 것으로 보고하지 않는다. 작업 대상 레포에서 실행에 필요한 차이를 확인하고, 수정할 수 있는 범위에서 적용한다. 전체 레포를 순회하는 동기화 검사를 작업의 필수 조건으로 추가하지 않는다.

Issue를 현재 할당하지 않는 콘텐츠 레포의 범위는 Project Orchestration이 소유한다. 이 운영 범위는 해당 레포의 디렉토리 scheme을 바꾸지 않는다.
