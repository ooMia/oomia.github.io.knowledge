# Current Handoff

Updated: 2026-09-20 (Asia/Seoul)

이 파일은 다음 작업 세션이 안전하게 이어받기 위한 **volatile checkpoint**다. 장기 정책이나 제품·아키텍처 결정의 canonical source가 아니며, 확정된 내용은 반드시 해당 `docs/*` 원본으로 승격한다.

## Active work

- Engine Issue [#13](https://github.com/ooMia/oomia.github.io.engine/issues/13) `feat: decouple canonical source from visual editor constraints`가 활성 상태다.
- linked Development branch `13-feat-decouple-canonical-source-from-visual-editor-constraints`가 생성되어 있다.
- Project #11 초기 동기화는 검증되었고 Status / Iteration / Work Type / Scope / Objective / Target Release가 seed에 따라 설정되었다.

## Verified repository state

- Site `ooMia/oomia.github.io`
  - `main`과 `develop`이 동일 revision `0f6e38a502cccf085312bedb1d7c7c1d77fba295`을 가리킨다.
  - default branch는 `main`이다.
  - merged head branch 자동 삭제가 활성화되어 있다.
  - default branch에는 required linear history + required signatures ruleset이 활성화되어 있다.
- Engine `ooMia/oomia.github.io.engine`
  - `develop`은 `main`보다 2 commits behind다.
  - Issue #13 Development branch는 `develop`보다 1 commit behind다.
  - Issue activation workflow는 `opened`, `reopened`만 자동 trigger로 사용한다.
- Docs `ooMia/oomia.github.io.docs`
  - generated projection으로 취급하며 Issue activation automation 대상이 아니다.
- Knowledge `ooMia/oomia.github.io.knowledge`
  - 작은 문서·정책 변경은 `main` 직접 반영 가능하고, 큰 변화는 PR을 사용한다.
  - Issue activation의 Development base는 `main`이다.

## Completed before this handoff

- Knowledge / Engine / Site에 Issue activation automation이 배포되었다.
- Engine Issue #13 활성화에서 Project #11 field sync와 linked Development branch 생성이 성공했다.
- 중복 activation 원인이었던 `edited` trigger는 제거되었다.
- Site Issue #8을 통해 activation replay와 idempotency를 E2E로 검증했다.
- Site orchestration label metadata와 merged branch cleanup, merged head branch 자동 삭제 설정을 정리했다.

## Next safe action

1. Engine `develop`을 현재 `main` 기준으로 정상화한다.
2. Issue #13 Development branch를 정상화된 `develop` 기준으로 갱신한다.
3. 완료된 orchestration 작업에서 남은 stale branches를 정리한다.
4. Issue #13 구현에 착수한다.

## Live verification backlog

- Project #11의 실제 field / option / View / Item / Status Update 구성을 필요 시 live 상태에서 확인한다.
- Scope가 실제 multi-select로 적용되었는지 확인한다.
- 실제 Target Release option / 현재 Iteration / 현재 Goal은 사용 시점에 Project에서 확인한다.
- Project README가 canonical index 형태로 실제 적용되어 있는지 확인한다.

## Reverify before changing live state

- Project #11의 현재 Status / Iteration / field option은 실제 Project에서 다시 확인한다.
- branch 삭제나 ref 이동 전 해당 branch에 미병합 작업이 없는지 compare 결과를 확인한다.
- Implementation Map을 갱신할 때는 기준 revision 이후의 실제 코드·테스트·deployment Evidence를 다시 조사한다.

## Do not assume

- 이 파일의 branch SHA나 Project 상태가 다음 세션에도 최신이라고 가정하지 않는다.
- `handoff/current.md`의 서술을 canonical policy 또는 완료 Evidence로 사용하지 않는다.
- 구현 완료 여부를 대화 기록만으로 판정하지 않는다.
