# Git Workflow

Publishing Platform repository가 공유하는 **변경 관리 invariant**의 단일 원본이다. 기본 source integration model은 [Trunk-Based Development](trunk-based-development.md)다. 구체적인 runner 선택, CI matrix, release trigger와 repository-specific exception은 owning repository가 정의한다.

## 공통 통합 원칙

- canonical trunk는 기본적으로 `main`이다.
- 장기 `develop` 또는 shared development/integration branch를 정상 개발 경로로 두지 않는다.
- 실제 변경은 `main`에서 만든 short-lived change branch에서 수행하고 `X -> main` PR로 통합한다.
- agent 작업은 별도 branch에서 격리하고, PR validation과 사용자 review/approval을 거쳐 trunk에 반영한다.
- 한 Issue가 여러 branch/PR로 분해될 수 있다. Outcome 전체가 끝날 때까지 branch 하나를 유지하는 것보다 작은 integration batch를 우선한다.
- merge 후 change branch는 삭제한다.
- merge method는 공통으로 하나를 강제하지 않는다. 최종 diff와 history의 검토 가치에 따라 owning repository 또는 해당 PR에서 선택한다.

문서를 수정했다고 실제 branch protection, workflow, repository setting까지 변경된 것으로 간주하지 않는다. 현재 동작은 owning repository의 live workflow/settings를 확인한다.

## Issue branch와 PR

Issue lifecycle은 [Planning Model](planning-model.md), 공통 activation semantics와 Project 연결은 [Project Orchestration](project-orchestration.md)이 소유한다.

PR은 trunk에 들어갈 하나의 reviewable change를 표현한다.

- PR의 fast remote validation은 merge gate다.
- 가능한 경우 self-hosted runner와 aggressive concurrency/caching을 사용해 feedback latency를 낮춘다.
- merge gate가 성공하기 전에는 merge하지 않는다.
- agent 변경은 사용자의 review/approval을 거친 뒤 merge한다.
- branch naming, branch creation mechanism, required status check의 실제 enforcement는 owning repository가 소유한다.

PR에는 결과와 변경 이유, 관련 Issue, 실제 수행한 검증과 남은 제한을 적는다. merge 완료 전에는 완료된 integration으로 보고하지 않는다.

## 검증과 runner

- PR validation은 빠른 pre-integration confidence를 제공한다. platform 폭은 좁힐 수 있지만 merge safety를 판단할 수 있는 충분한 검증 깊이를 유지한다.
- `main` push는 repository가 지원하는 주요 OS/platform에 대해 full validation을 수행한다.
- formatting, static checks, tests, build, artifact verification, cross-platform matrix는 실제 repository 책임과 failure risk에 따라 선택한다.
- runner 선택은 security, cost, platform dependency, local capability를 고려한다.
- 동일 PR의 오래된 run은 새 commit으로 대체되면 취소할 수 있다.
- `main` validation이 실패하면 새 feature integration보다 fix-forward 또는 revert를 통한 trunk 복구를 우선한다.
- 완료 Evidence는 문서에 적힌 기대가 아니라 실제 owning repository workflow run과 결과를 기준으로 한다.

## 긴 변경과 release

- short-lived branch 안에 끝나지 않는 변경은 먼저 더 작은 integration slice로 나눈다.
- slicing만으로 해결하기 어려운 장기 교체에는 Feature Flag 또는 Branch by Abstraction 같은 TBD 기법을 제한적으로 고려한다.
- release source는 가능한 한 검증된 trunk revision/tag를 사용한다.
- release branch가 필요한 경우 필요 시점에 만들고 일반 development branch로 사용하지 않는다.

구체적인 코드 격리 방식과 release/deployment gate는 [Trunk-Based Development](trunk-based-development.md)의 공통 원칙 안에서 owning repository가 정의한다.

## History와 archive

- Git branch를 장기 지식 archive로 사용하지 않는다.
- merge된 short-lived branch는 삭제한다.
- 과거 맥락은 Git history, immutable commit/permalink, 필요한 migration 문서와 revision-bound Evidence에서 추적한다.
- legacy/archive/backup branch는 현재 운영 경로가 아니며, 지속 가치가 canonical 문서와 Git history에 흡수되면 제거한다.
- forensic 재현을 위해 특정 ref를 고정할 필요가 있으면 owning repository가 명시적인 tag 또는 immutable Evidence를 선택할 수 있다.

## 정책 적용 범위

Knowledge는 공통 TBD/Git invariant만 소유한다. 다음은 owning repository가 구체화한다.

- branch naming convention과 branch creation mechanism
- required checks와 enforcement 방식
- runner 종류와 label
- CI job 구성과 OS matrix
- Feature Flag/abstraction의 실제 구현
- release/tag/deploy trigger
- repository-specific hotfix/backport 경로
- TBD 예외가 필요한 경우 그 이유와 종료 조건

공통 정책과 repository-local 운영이 충돌하면 먼저 migration 중인 일시적 drift인지 실제 repository 역할상 필요한 예외인지 구분한다.
