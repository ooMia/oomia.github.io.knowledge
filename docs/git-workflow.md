# Git Workflow

> **Authority:** POLICY  
> **Owner:** cross-repository change integration and history invariants  
> **Scope:** Publishing Platform repositories that integrate durable changes through Git/GitHub  
> **Read when:** creating an Issue-linked branch, preparing/integrating a PR, defining CI gates, or preserving historical Evidence  
> **Enforced by:** owning repository branch/ruleset/workflow configuration where implemented

이 문서는 repository가 공유해야 하는 **integration invariant**만 소유한다. exact branch name, topology, runner, CI matrix, release trigger와 repository-local hotfix path는 owning repository가 정의한다.

## POLICY — Integration

- 각 repository는 durable/canonical state와 그 integration path를 **MUST** 명확히 정의한다.
- Issue orchestration 대상의 substantive repository work는 **SHOULD** Issue-linked branch에서 수행한다.
- durable change는 owning repository가 정의한 PR/review/integration path를 거쳐 canonical state에 반영하며, repository-local release/integration gate를 임의로 우회하지 않는다.
- branch topology와 promotion 방식은 repository 역할에 맞게 결정하며 모든 repository에 동일한 `main/develop` topology를 강제하지 않는다.
- merge method는 project-wide 하나로 고정하지 않는다. owning repository policy와 해당 PR의 history/review 목적이 결정한다.
- PR이 merge되기 전에는 canonical integration이 완료되었다고 보고하지 않는다.

문서에 policy를 적었다고 실제 branch protection/ruleset/workflow가 변경된 것으로 간주하지 않는다. current enforcement는 owning repository의 live setting/workflow에서 확인한다.

## POLICY — Verification and formatting

- 각 repository는 자기 Outcome과 trust boundary에 필요한 executable verification을 **MUST** 정의한다.
- completion Evidence는 prose expectation이 아니라 실제 owning repository의 test/build/workflow/deployment result를 기준으로 한다.
- **source-code repository의 CI는 formatting 차이만을 이유로 실패해서는 안 된다.** CI가 canonical formatting 자체를 materialize하는 것이 아니라면 formatter preference를 integration failure gate로 사용하지 않는다.
- 문서/content처럼 formatting 자체가 canonical artifact의 일부인 repository는 owning workflow가 그 형식을 materialize/normalize하고 idempotence를 검증할 수 있다. 이는 “format check 실패”와 구분한다.
- lint semantics, type checking, tests, build, artifact/runtime verification 등 실제 결과를 검증하는 gate는 repository risk에 맞게 유지한다.

exact formatter command, bot implementation, check command와 job composition은 owning repository가 소유한다.

## GUIDANCE — Verification profile and runners

아래는 공통 강제 정책이 아니라 CI profile을 설계할 때의 권고다.

- 빠른 development feedback과 canonical/release integration은 필요하면 서로 다른 강도로 운영한다.
- static checks, tests, build, artifact verification, cross-platform matrix는 실제 failure risk에 맞춘다.
- runner 선택은 security, cost, platform dependency, local capability를 함께 고려한다.
- self-hosted resource가 필요한 validation과 GitHub-hosted portability validation을 역할에 따라 나눌 수 있다.
- 동일한 고비용 검증을 여러 runner에서 반복하는 것을 기본값으로 삼지 않는다. 추가 matrix는 실제 portability/release risk를 검증할 때 사용한다.

구체 runner label, OS matrix, cache strategy와 command는 owning repository workflow가 현재 source of truth다.

## POLICY — Issue branch and PR boundary

Issue lifecycle은 [Planning Model](planning-model.md), Project activation/materialization은 [Project Orchestration](project-orchestration.md)이 소유한다.

- branch base/name, workflow file, token/permission은 owning repository가 소유한다.
- PR은 결과, 변경 이유, 관련 Issue, 실제 수행한 verification과 남은 limitation을 설명해야 한다.
- 여러 commit을 사용해도 final diff는 하나의 검토 가능한 변화로 읽히는 편을 우선한다.
- implementation-start 방식은 [Implementation Practices](implementation-practices.md)의 GUIDANCE를 참고한다.

## GUIDANCE — Early Draft PR and scoped integration

### Early Draft PR

substantive Issue work는 첫 coherent commit이 생겨 diff가 의미를 갖기 시작하면 Draft PR을 조기에 여는 편을 권장한다.

- Draft PR은 implementation context, CI result, review discussion, Development relation을 하나의 durable surface에 모은다.
- 빈 PR 또는 아직 검토 가능한 변화가 전혀 없는 PR을 절차 충족만을 위해 만들지 않는다.
- implementation이 계속 진행 중임을 Draft state로 표현하고, acceptance와 final verification이 준비되면 Ready for review로 전환한다.

### Scoped integration branch

여러 Issue의 독립적인 변경을 **하나의 atomic parent change**로 canonical branch에 통합해야 할 때는 permanent `develop` 대신 parent scope에 한정된 temporary integration branch를 사용할 수 있다.

```text
child Issue branch ──PR──┐
child Issue branch ──PR──┼→ scoped integration branch ──parent PR──→ canonical branch
child Issue branch ──PR──┘
```

- parent Issue branch 자체를 integration buffer로 사용할 수 있다.
- parent/sub-issue 관계 자체만으로 integration branch를 만들지 않는다. parent Outcome이 여러 child change의 **atomic canonical activation**을 요구할 때 사용한다.
- 단순 tracking/coordination parent, Investigation parent, 서로 독립적으로 canonical integration 가능한 child 집합은 각자 owning integration path를 유지한다.
- child PR은 구현·review·child-level verification이 끝나면 integration branch로 merge해 open PR queue를 줄인다.
- canonical branch를 대상으로 대기하는 PR은 parent integration PR 하나로 수렴시키는 편을 권장한다.
- integration branch는 parent change/release/renewal이 끝나면 삭제하는 temporary coordination state이며 두 번째 canonical branch가 아니다.
- 여러 unrelated initiatives를 장기간 한 branch에 누적하지 않는다. 반복적인 continuous-integration buffer가 실제 repository requirement가 될 때만 permanent `develop` 도입을 별도로 판단한다.
- child work가 다른 child change에 의존하면 그 dependency를 branch base/PR 관계에서 명시하고, 독립적인 work는 불필요하게 서로 stack하지 않는다.
- child PR과 parent PR에 필요한 validation이 실제 base branch에서 실행되는지는 owning repository workflow가 보장해야 한다. integration branch를 사용한다는 이유로 child-level verification을 생략하지 않는다.

GitHub의 closing keyword는 PR이 repository default branch를 대상으로 할 때만 Issue linkage/auto-close를 만든다. 따라서 integration branch를 base로 하는 child PR에서 `Closes #...`에 completion semantics를 의존하지 않는다.

- child PR의 Development relation이 필요하면 GitHub의 explicit relation을 사용한다.
- child Issue의 완료 시점은 parent/child 관계 자체가 아니라 그 Issue의 Outcome/AC/Evidence가 요구하는 integration target으로 판단한다.
- parent integration branch merge가 child Outcome의 최종 integration이면 그 시점에 `Done`이 될 수 있다.
- child Outcome이 canonical/default branch 또는 production delivery를 요구한다면 parent buffer merge만으로 완료하지 않는다.
- parent/sub, blocking, relates-to 관계는 PR topology와 context를 설명하지만 Status inheritance를 만들지 않는다.

이 패턴의 목적은 **완료된 child work를 불필요하게 대기시키지 않으면서 각 Issue가 스스로 정의한 completion boundary를 보존하는 것**이다.

## POLICY — History and archive

- Git branch를 장기 knowledge archive로 사용하지 않는다.
- 과거 맥락은 Git history, immutable commit/permalink, 필요한 migration/release RECORD와 revision-bound Evidence에서 추적한다.
- legacy/archive/backup branch는 current operating path가 아니다.
- forensic reproduction을 위해 ref 고정이 필요하면 owning repository가 explicit tag 또는 immutable Evidence를 선택할 수 있다.

## Repository-local ownership

Knowledge는 위 invariant만 소유한다. 다음은 owning repository가 구체화한다.

- canonical/integration branch name과 topology
- Issue branch base ref
- PR/release promotion path
- runner kind/label
- CI job/OS matrix/cache
- formatter/canonicalization implementation
- repository-specific hotfix/patch path

repository-local 차이가 반복되어 여러 repository에 적용되는 invariant가 되었을 때만 이 POLICY를 확장한다.
