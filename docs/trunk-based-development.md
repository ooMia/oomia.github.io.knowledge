# Trunk-Based Development

Publishing Platform의 기본 source integration model은 **Trunk-Based Development (TBD)** 다.

TBD는 하나의 trunk를 중심으로 개발하고, 다른 장기 development branch를 만들려는 압력에 저항하는 branching model이다. 이 프로젝트에서는 Git의 `main`을 trunk로 사용한다.

이 문서는 [Trunk Based Development](https://trunkbaseddevelopment.com/)의 원칙을 기준으로, Publishing Platform에 필요한 adaptation만 정의한다. Project lifecycle, 현재 migration 상태, repository별 workflow 파일과 CI 구현은 각 owning source가 소유한다.

## One trunk

- `main`은 repository의 canonical trunk다.
- `develop` 같은 장기 shared development/integration branch를 정상 개발 경로로 두지 않는다.
- release 또는 migration 때문에 별도 장기 branch가 필요한 경우에는 repository-local 예외로 다루고 목적과 종료 조건을 명시한다.
- branch 이름만 `main`으로 바꾸는 것으로 TBD가 되지는 않는다. 중요한 것은 trunk와 미통합 작업 사이의 거리를 작게 유지하는 것이다.

## Short-lived change branches

Publishing Platform은 agent 작업의 격리와 사용자 review를 위해 **short-lived change branch + PR** 방식을 사용한다.

- 실제 변경은 `main`에서 별도 branch X를 만든 뒤 `X -> main` PR로 통합한다.
- agent는 `main`에 직접 작업하지 않는다.
- PR은 사용자가 diff와 Evidence를 검토하고 승인할 수 있는 안전 경계다.
- merge 후 change branch는 삭제한다.
- branch는 하나의 developer/agent 작업 경계다. 여러 작업자가 part-complete branch를 shared integration branch처럼 사용하지 않는다.

Issue와 branch는 1:1 관계가 아니다. 하나의 Issue가 여러 개의 독립적인 short-lived branch/PR로 나뉠 수 있다. 큰 Outcome을 branch 하나에 오래 보관하는 것보다, 각 조각을 안전하게 trunk에 통합하는 것을 우선한다.

[Short-Lived Feature Branches](https://trunkbaseddevelopment.com/short-lived-feature-branches/)의 핵심처럼, branch가 여러 날 유지되기 시작하면 이름이나 중간 integration branch를 추가하기보다 작업을 더 작게 나눌 수 있는지 먼저 재검토한다.

## Frequent integration and small batches

작업은 가능한 한 자주 trunk에 통합할 수 있는 크기로 나눈다.

좋은 integration slice는 다음 속성을 가진다.

- trunk의 기존 동작을 깨뜨리지 않는다.
- 필요한 검증을 독립적으로 통과할 수 있다.
- 이후 작업이 취소되어도 이미 통합된 상태가 유효하다.
- 다른 part-complete branch와의 중간 merge를 필요로 하지 않는다.

한 Issue 안에서도 refactor, abstraction 도입, 기능 구현, cleanup을 각각 별도 PR로 통합할 수 있다. PR 수를 줄이는 것보다 integration distance를 줄이는 것이 우선이다.

## PR merge gate

`X -> main` PR의 fast remote validation은 **merge gate**다.

- 가능한 경우 self-hosted runner를 사용한다.
- 동일 PR/branch의 오래된 validation은 aggressive concurrency policy로 취소할 수 있다.
- cache와 병렬화를 활용해 feedback latency를 낮춘다.
- platform coverage는 좁힐 수 있지만, merge safety를 판단할 수 있을 정도의 lint/typecheck/test/build 및 필요한 contract/artifact validation은 수행한다.
- merge gate가 성공하기 전에는 merge하지 않는다.
- 기술적으로 required status check를 강제할 수 있는 환경에서는 GitHub branch protection/ruleset으로 이를 enforce한다. 그렇지 않은 경우에도 동일 규칙을 workflow policy로 지킨다.
- agent가 만든 변경은 검증 성공 후 사용자 review와 approval을 거쳐 merge한다.

PR validation의 목적은 release 전체를 재현하는 것이 아니라 **빠른 pre-integration confidence**를 제공하는 것이다.

## Trunk validation and health

`main` push는 canonical state에 대한 **full validation**을 수행한다.

- repository가 지원하는 주요 OS/platform runner에서 full validation을 수행한다.
- portability, artifact, delivery 등 repository 책임에 필요한 검증을 포함한다.
- 현재 단계에서 모든 `main` commit이 즉시 production release 가능하다고 가정하지 않는다. 최소 invariant는 canonical validation을 만족하는 건강한 integration state를 유지하는 것이다.

`main` validation이 실패하면 새 feature integration보다 trunk 복구를 우선한다. 상황에 따라 fix-forward 또는 revert를 선택하며, trunk가 다시 green이 된 뒤 정상 integration을 계속한다.

이 구분은 의도적이다.

```text
PR -> main
  fast self-hosted validation
  + user review / approval
          ↓
        merge
          ↓
main push
  full multi-platform validation
```

## Longer-running changes

short-lived branch 안에서 안전하게 끝나지 않을 정도로 큰 변경은 먼저 **더 작은 integration slice**로 나눈다.

slicing만으로 해결하기 어려운 장기 교체나 disruptive migration에는 TBD가 제시하는 다음 기법을 제한적으로 사용할 수 있다.

- [Branch by Abstraction](https://trunkbaseddevelopment.com/branch-by-abstraction/)
- [Feature Flags](https://trunkbaseddevelopment.com/feature-flags/)

이 기법들은 일상적인 모든 변경의 기본값이 아니다. 목적은 long-lived feature branch를 만드는 대신, part-complete 상태에서도 trunk를 깨뜨리지 않도록 변경을 점진적으로 통합하는 것이다.

temporary abstraction이나 flag는 migration이 끝난 뒤 정리한다. 구체적인 구현 방식과 test strategy는 owning repository가 정의한다.

## Release

높은 release cadence에서는 [Release from Trunk](https://trunkbaseddevelopment.com/release-from-trunk/)를 기본 방향으로 삼는다.

- release source는 가능한 한 검증된 trunk revision 또는 tag다.
- release branch가 필요하다면 미리 장기 유지하지 않고 필요 시 trunk revision에서 만든다.
- release line의 fix는 가능한 한 trunk에서 먼저 수정한 뒤 필요한 release branch로 backport한다.
- release/deployment 필요 때문에 장기 development branch를 다시 만들지 않는다.

현재 repository별 release readiness와 deployment gate는 owning repository의 실제 workflow와 Evidence로 판단한다. TBD 문서가 존재한다는 사실만으로 Continuous Delivery가 완성되었다고 간주하지 않는다.

## Project adaptation summary

Publishing Platform에서 TBD는 다음 형태로 적용한다.

```text
Issue / task
    ↓
short-lived branch X from main
    ↓
agent implementation + local checks
    ↓
X -> main PR
    ↓
fast self-hosted merge gate
    ↓
user review / approval
    ↓
merge
    ↓
main full multi-platform validation
```

한 Issue가 여러 branch/PR을 가질 수 있다. 긴 작업은 branch 수명을 늘리기보다 integration slice를 작게 만드는 방향을 우선한다.

## References

- [Trunk Based Development — Introduction](https://trunkbaseddevelopment.com/)
- [Five-minute overview](https://trunkbaseddevelopment.com/5-min-overview/)
- [Styles and Trade-offs](https://trunkbaseddevelopment.com/styles/)
- [Short-Lived Feature Branches](https://trunkbaseddevelopment.com/short-lived-feature-branches/)
- [Branch by Abstraction](https://trunkbaseddevelopment.com/branch-by-abstraction/)
- [Feature Flags](https://trunkbaseddevelopment.com/feature-flags/)
- [Release from Trunk](https://trunkbaseddevelopment.com/release-from-trunk/)
