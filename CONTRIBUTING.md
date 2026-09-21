# 수정 방법

1. [CONTEXT.md](CONTEXT.md)에서 해당 규칙을 소유하는 파일을 찾는다.
2. 원본 Markdown을 수정한다. 새로운 제안은 확정된 규칙으로 섞지 말고 [open-questions.md](docs/open-questions.md)에 기록한다.
3. cross-repository/product 방향이 바뀌면 [Current Decisions](docs/decisions.md)를 **현재 유효한 상태**로 갱신한다. superseded chain이나 과거 chronology는 현재 `main`에 유지하지 않는다.
4. 구현 상태를 변경하려면 [Implementation Map](docs/implementation-map.md)의 기준 revision보다 구현 레포가 진행되었는지 확인하고 실제 코드·테스트·commit/deployment Evidence를 다시 조사한다.
5. `python3 scripts/bundle.py`를 실행해 context bundle을 갱신한다.
6. 변경 내용을 Git diff로 검토하고 커밋한다.

규칙의 중복 복사는 피한다. GitHub Project README와 필드 description은 이 레포의 canonical 정의를 가리키는 탐색 계층으로 유지한다. 별도 레포의 코드와 계약을 함께 바꾸는 경우 관련 PR/commit을 서로 연결한다.

## Branch / PR workflow

`main`은 **고수준 knowledge change history**를 유지한다.

- typo, 링크 수정, 작은 문구 정정처럼 국소적이고 한 번에 검토 가능한 변경은 `main`에 직접 반영할 수 있다.
- 다문서 변경, architecture 재정렬, context bundle까지 연쇄적으로 바뀌는 작업, 여러 번의 중간 commit이 예상되는 장시간 작업은 **반드시 별도 branch에서 수행한다**.
- 장시간 작업 branch는 작업 중 자유롭게 여러 commit을 사용할 수 있다.
- 완료 시 PR에서 전체 diff와 canonical consistency를 검토하고, 기본적으로 **squash merge**하여 `main`에는 하나의 의미 단위 commit만 남긴다.
- merge 후 불필요한 head branch는 삭제한다.
- history rewrite나 force update가 필요한 maintenance는 먼저 기존 `main`을 archive branch/tag 등으로 보존한 뒤 수행한다.

작업이 길어질지 불확실하면 branch를 선택하는 쪽을 기본으로 한다.

## Evidence

설계·계획 정의 자체가 Outcome이면 관련 canonical 문서의 immutable commit/permalink를 완료 Evidence로 사용할 수 있다. `main` 링크는 최신 정의를 찾는 reference로 사용한다.

기능 구현, 성능·신뢰성 검증, 실제 publishing/deployment 완료에는 설계 링크를 대체 Evidence로 사용하지 않는다. 책임 레포의 코드·테스트·실행 결과·commit/PR·deployment처럼 재현 가능한 자료가 필요하다.

## 세션 인계

의미 있는 작업 세션을 종료할 때 장기적으로 남아야 할 규칙·결정은 먼저 owning canonical 문서에 반영한다. 아직 진행 중인 branch/Issue/Project 상태, 재검증 항목, 다음 안전한 행동은 `handoff/current.md`에 기록한다.

`handoff/current.md`는 세션 로그나 의사결정 원장이 아니다. 매번 최신 checkpoint로 overwrite하고, 과거 상태는 Git history에 맡긴다. 구현 수준은 handoff가 아니라 revision-bound [Implementation Map](docs/implementation-map.md)과 책임 레포 Evidence로 판정한다.

## 대화에서 변경을 가져올 때

사용자의 명시적 정정 → 이후 사용자 메시지에 반영된 규칙 → 최신 assistant 제안 → 오래된 초안 순으로 근거를 판단한다. 시간상 최신이라는 이유만으로 제안을 사용자 승인으로 바꾸지 않는다. 현재 `main`은 과거 대화 provenance를 별도 원장으로 유지하지 않는다. 과거 근거가 꼭 필요하면 `archive/main-before-cleanup-20260921` branch를 확인하고, 현재 문서에는 현재 유효한 결론만 반영한다.

## 공유

이 레포의 현재 `main`은 raw conversation transcript나 source/turn provenance chronology를 보관하지 않는다. 과거 자료는 historical archive branch에 보존하며, Chat에 필요한 기본 첨부물은 `dist/CONTEXT-BUNDLE.md`다.
