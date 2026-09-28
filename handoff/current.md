# Current Handoff

Updated: 2026-09-28

## 현재 checkpoint

- C1-W3의 canonical Docs → Site direct consumption은 [Site #12](https://github.com/ooMia/oomia.github.io/issues/12) / [PR #13](https://github.com/ooMia/oomia.github.io/pull/13)에서 검증됐다.
- PR build와 live Pages mutation 분리는 [Site #14](https://github.com/ooMia/oomia.github.io/issues/14) / [PR #15](https://github.com/ooMia/oomia.github.io/pull/15)로 `develop`에 통합됐다.
- Site `main`은 아직 이 integration state로 promotion하지 않았다. Q003 final release gate는 main promotion 뒤 새 delivery Evidence가 필요하다.
- [Engine #15](https://github.com/ooMia/oomia.github.io.engine/issues/15)는 #23과 중복되는 authoring value와 별도 summary consumer 부재 때문에 `not_planned`로 종료했다.
- 다음 핵심 작업은 [Engine #24](https://github.com/ooMia/oomia.github.io.engine/issues/24)의 LilysAI MCP-assisted enrichment 실험이다. 구현 전에 네 repository의 stale/unused state를 정리하고 현재 architecture 기준 계획을 다시 세운다.

## Pre-MCP cleanup

- Engine: pseudo-backlog `docs/TODO.md` 제거, migration/agent 안내를 current branch model과 canonical Knowledge 링크에 맞춤.
- Site: 미사용 Notion export stylesheet 제거, template README를 실제 Site consumer/delivery 책임으로 교체.
- Docs: 실제 enrichment workflow와 consumer contract는 유지하고 불필요한 `docs/.gitkeep`만 제거.
- Knowledge: stale handoff/Implementation Map/Q003를 현재 Evidence로 갱신하고, stale `develop`에만 있던 유효한 Project Status lifecycle 결정을 canonical source에 흡수한다.

각 cleanup은 별도 repository branch/PR로 검증·통합한다. #24 구현 branch는 cleanup 완료 뒤 `develop`에서 시작한다.

## Project automation

이전 `PROJECT_TOKEN` Unauthorized는 만료된 credential이 원인으로 판단됐고 사용자가 token을 갱신했다. 다음 Issue activation에서 Project sync가 정상 복구됐는지 확인한다. credential 자체의 내용이나 보안 설정은 자동 변경하지 않는다.

Project-level canonical entry point는 [CONTEXT.md](../CONTEXT.md)다.
