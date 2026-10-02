# Git Workflow

Publishing Platform repository가 공유하는 **변경 관리 invariant**의 단일 원본이다. 구체적인 branch 이름, integration topology, runner 선택, CI matrix, release trigger는 각 repository의 역할·보안·비용·platform 제약에 따라 owning repository가 정의한다.

## 공통 통합 원칙

- 각 repository는 durable/canonical branch와 필요한 integration path를 명확히 정의한다. `main`/`develop` 같은 이름을 모든 repository에 공통으로 강제하지 않는다.
- 한 번의 작은 변화가 아닌 repository 작업은 해당 repository가 Issue orchestration 대상이면 Issue-linked branch에서 수행한다.
- 변경은 owning repository가 정의한 PR/review/integration 경로를 거쳐 canonical state에 반영한다. repository가 정한 integration 단계나 release gate를 임의로 우회하지 않는다.
- branch topology와 release promotion 방식은 repository 역할에 맞게 결정한다. 콘텐츠 remote, implementation repository, coordination repository가 동일한 topology를 가질 필요는 없다.
- merge method는 공통 강제 정책으로 고정하지 않는다. 최종 diff와 history의 검토 가치에 따라 owning repository 또는 해당 PR에서 선택한다.

문서를 수정했다고 실제 branch protection, workflow, repository setting까지 변경된 것으로 간주하지 않는다. 현재 동작은 owning repository의 live workflow/settings를 확인한다.

## Issue branch와 PR

Issue lifecycle은 [Planning Model](planning-model.md), 공통 activation semantics와 Project 연결은 [Project Orchestration](project-orchestration.md)이 소유한다. 실제 branch base, workflow file, script, token/permission 구성은 실행 repository가 소유한다.

PR에는 결과와 변경 이유, 관련 Issue, 실제 수행한 검증과 남은 제한을 적는다. 여러 commit을 사용한 작업도 최종 diff가 하나의 검토 가능한 변화로 읽혀야 한다. merge 완료 전에는 완료된 integration으로 보고하지 않는다.

## 검증과 runner

- repository는 자신의 역할과 trust boundary에 맞는 검증 단계를 정의한다.
- 빠른 development feedback과 release/canonical integration 검증은 필요한 경우 서로 다른 강도로 운영할 수 있다.
- formatting, static checks, tests, build, artifact verification, cross-platform matrix는 실제 repository 책임과 failure risk에 따라 선택한다. 모든 repository에 동일 matrix를 강제하지 않는다.
- runner 선택은 security, cost, platform dependency, local capability를 고려한다. private repository나 local inference처럼 특정 trust/resource boundary가 필요한 작업은 self-hosted runner를 우선할 수 있고, GitHub-hosted runner는 필요한 검증에만 사용한다.
- 동일한 고비용 검증을 여러 runner에서 중복 수행하는 것을 기본값으로 삼지 않는다. 추가 matrix는 실제 portability 또는 release risk를 검증할 때 사용한다.
- 완료 Evidence는 문서에 적힌 기대가 아니라 실제 owning repository workflow run과 결과를 기준으로 한다.

## History와 archive

- Git branch를 장기 지식 archive로 사용하지 않는다.
- 과거 맥락은 Git history, immutable commit/permalink, 필요한 migration 문서와 revision-bound Evidence에서 추적한다.
- legacy/archive/backup branch는 현재 운영 경로가 아니며, 지속 가치가 canonical 문서와 Git history에 흡수되면 별도 장기 보존 정책으로 간주하지 않는다.
- forensic 재현을 위해 특정 ref를 고정할 필요가 있으면 owning repository가 명시적인 tag 또는 immutable Evidence를 선택할 수 있다.

## 정책 적용 범위

Knowledge는 공통 invariant만 소유한다. 다음은 owning repository가 구체화한다.

- canonical/integration branch 이름과 topology
- issue branch의 실제 base ref
- PR/release promotion 경로
- runner 종류와 label
- CI job 구성과 OS matrix
- repository-specific hotfix/patch 경로

공통 정책과 repository-local 운영이 충돌하면 먼저 repository 역할상 필요한 차이인지 확인한다. 반복되는 차이가 여러 repository에 공통 invariant로 승격될 때만 Knowledge 정책을 확장한다.
