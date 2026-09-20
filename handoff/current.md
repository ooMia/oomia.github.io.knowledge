# Current Handoff

Updated: 2026-09-20 (Asia/Seoul)

이 파일은 다음 작업 세션이 안전하게 이어받기 위한 **volatile checkpoint**다. 장기 정책이나 제품·아키텍처 결정의 canonical source가 아니며, 확정된 내용은 반드시 해당 `docs/*` 원본으로 승격한다.

## Active work

- Engine Issue [#13](https://github.com/ooMia/oomia.github.io.engine/issues/13) `feat: decouple canonical source from visual editor constraints`가 활성 상태다.
- linked Development branch `13-feat-decouple-canonical-source-from-visual-editor-constraints`가 존재한다.
- Project #11 초기 동기화에서 Status / Iteration / Work Type / Scope / Objective / Target Release seed 적용과 linked Development branch 생성을 검증했다.

## Verified repository state

2026-09-20 세션 종료 직전에 branch topology를 다시 확인했다.

- Site `ooMia/oomia.github.io`
  - `main` = `develop` = `0f6e38a502cccf085312bedb1d7c7c1d77fba295`
  - default branch는 `main`
  - merged head branch 자동 삭제 활성화
  - default branch에 required linear history + required signatures ruleset 적용
- Engine `ooMia/oomia.github.io.engine`
  - `main`: `e140a33ee2db199e5cce170a3f2f11a34bf30256`
  - `develop`: `241d278de4f076e3270ca38cf3ed39143b2c4565`
  - `develop`은 `main`보다 2 commits behind, ahead 0
  - Issue #13 branch: `345d5116ce9a64767f6c7eb3597e756f740991a2`
  - Issue #13 branch는 `develop`보다 1 commit behind, ahead 0
  - Issue activation workflow 자동 trigger는 `opened`, `reopened`
- Docs `ooMia/oomia.github.io.docs`
  - generated projection
  - Issue activation automation 대상 아님
- Knowledge `ooMia/oomia.github.io.knowledge`
  - `main`: `004bac5e0134a38ee7aa19ca683784957d880b34` (이 handoff 갱신 전 기준)
  - repository visibility: `public`
  - 작은 문서·정책 변경은 `main` 직접 반영 가능, 큰 변화는 PR 사용
  - Issue activation Development base는 `main`

## Completed in this session

- Knowledge responsibility boundary refactor를 별도 branch에서 수행하고 PR [#5](https://github.com/ooMia/oomia.github.io.knowledge/pull/5)를 squash merge했다.
- `handoff/current.md`를 cross-session execution checkpoint의 단일 owner로 도입했다.
- `docs/open-questions.md`에서 live verification과 revision-bound implementation status를 분리했다.
- Implementation Map을 live state가 아닌 revision-bound verified snapshot으로 명확히 했다.
- bundle 생성기의 고정 생성일을 제거하고 volatile handoff를 `dist/CONTEXT-BUNDLE.md`에서 제외했다.
- D017을 확정했다: Knowledge에는 raw conversation transcript를 저장하지 않는다.
- `provenance/conversations.json`을 current tree에서 제거했다.
- provenance는 source/turn metadata와 최소 요약만 유지한다.
- raw transcript 관련 Q016은 결정 완료로 제거했다.
- 기존 raw transcript blob은 과거 Git history에는 남아 있으며 history rewrite는 수행하지 않았다.

## Previously completed orchestration baseline

- Knowledge / Engine / Site에 Issue activation automation 배포 완료.
- Engine Issue #13 활성화에서 Project #11 field sync와 linked Development branch 생성 성공.
- 중복 activation 원인이었던 `edited` trigger 제거.
- Site Issue #8에서 activation replay와 idempotency E2E 검증 완료.
- Site orchestration label metadata, merged branch cleanup, merged head branch 자동 삭제 설정 정리 완료.

## Next safe action

1. Engine `develop`이 `main`보다 2 commits behind인 원인을 확인하고, `main` 기준 pre-main buffer로 정상화한다.
2. 정상화된 `develop` 기준으로 Issue #13 Development branch를 갱신한다.
3. 완료된 orchestration 작업에서 남아 있는 stale Engine branches가 미병합 작업을 포함하지 않는지 compare 후 정리한다.
4. Issue #13의 canonical raw source / visual editor decoupling 구현에 착수한다.
5. 구현이 `main`에 통합되고 Evidence가 재검증된 뒤에만 Implementation Map을 갱신한다.

## Live verification backlog

- Project #11의 실제 field / option / View / Item / Status Update 구성은 필요 시 live 상태에서 확인한다.
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
- Knowledge repository를 raw conversation archive로 사용하지 않는다.
