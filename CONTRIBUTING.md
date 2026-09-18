# 수정 방법

1. [CONTEXT.md](CONTEXT.md)에서 해당 규칙을 소유하는 파일을 찾는다.
2. 원본 Markdown을 수정한다. 새로운 제안은 확정된 규칙으로 섞지 말고 [open-questions.md](docs/open-questions.md)에 기록한다.
3. 의미 있는 방향 변경에는 [decisions.md](docs/decisions.md)에 stable ID, 상태, 이유, 출처, 대체한 결정을 남긴다. 과거 기록을 삭제하지 않는다.
4. 구현 상태를 변경하려면 [Implementation Map](docs/implementation-map.md)의 기준 revision보다 구현 레포가 진행되었는지 확인하고 실제 코드·테스트·commit/deployment Evidence를 다시 조사한다.
5. [CHANGELOG.md](CHANGELOG.md)를 갱신하고 `python3 scripts/bundle.py`를 실행한다.
6. 변경 내용을 Git diff로 검토하고 커밋한다.

규칙의 중복 복사는 피한다. GitHub Project README와 필드 description은 이 레포의 canonical 정의를 가리키는 탐색 계층으로 유지한다. 별도 레포의 코드와 계약을 함께 바꾸는 경우 관련 PR/commit을 서로 연결한다.

## Evidence

설계·계획 정의 자체가 Outcome이면 관련 canonical 문서의 immutable commit/permalink를 완료 Evidence로 사용할 수 있다. `main` 링크는 최신 정의를 찾는 reference로 사용한다.

기능 구현, 성능·신뢰성 검증, 실제 publishing/deployment 완료에는 설계 링크를 대체 Evidence로 사용하지 않는다. 책임 레포의 코드·테스트·실행 결과·commit/PR·deployment처럼 재현 가능한 자료가 필요하다.

## 대화에서 변경을 가져올 때

사용자의 명시적 정정 → 이후 사용자 메시지에 반영된 규칙 → 최신 assistant 제안 → 오래된 초안 순으로 근거를 판단한다. 시간상 최신이라는 이유만으로 제안을 사용자 승인으로 바꾸지 않는다. 과거 대화에 근거하는 항목은 provenance의 source/turn을 유지하고, 현재 요청으로 새로 확정한 내용은 실제 날짜와 변경 commit으로 추적한다.

## 공유

이 레포에는 대화 원문 아카이브가 포함되어 있으므로 현재 private 상태를 기본 전제로 한다. 공개 전에는 provenance와 원문 아카이브의 공유 범위를 별도로 검토한다. Chat에 필요한 기본 첨부물은 원문 아카이브를 포함하지 않는 `dist/CONTEXT-BUNDLE.md`다.
