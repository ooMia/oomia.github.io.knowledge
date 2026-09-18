# Open Questions / Verification Gaps

| ID | 항목 | 현재 처리 |
|---|---|---|
| Q001 | GitHub Project #11의 실제 필드·옵션·View·Item·Status Update | GitHub Project live 상태는 knowledge repo와 분리. 현재 플러그인 surface에서는 ProjectV2 README/필드 전체를 직접 검증·수정하지 못함 |
| Q002 | Scope 다중 선택 및 Delivery 옵션의 실제 적용 | 최신 설계에 포함, 실제 Project 설정 미확인 |
| Q003 | 1.0 public contract 목록·compatibility policy·release gate | Implementation Map에서 Publishing 구현은 확인했으나 공개 계약 범위와 최종 gate는 별도 결정 필요 |
| Q004 | 각 capability의 구현 수준과 재현 증거 | 2026-09-18 기준 최초 [Implementation Map](implementation-map.md) 작성. 기준 revision 이후 변경은 재검증 필요 |
| Q005 | 실제 Target Release 옵션·Iteration 일정·현재 Goal | Project 운영 상태에서 조회 필요; 예시를 실데이터로 만들지 않음 |
| Q006 | Status 옵션 및 계획 Item의 Objective/Target Release 빈 값 허용 규칙 | 명시적으로 확정할 필요 있음 |
| Q007 | Work Type Validation 추가 | 보류. 현재 기본값은 5개 유지 |
| Q008 | engine container/artifact 배포 | 방향성 후보. 필요 시 별도 결정 |
| Q009 | knowledge remote 및 Project README 연결 | `ooMia/oomia.github.io.knowledge` private remote는 설정 완료. Project README 실제 교체는 아직 미확인; [템플릿](../templates/project-readme.md) 제공 |
| Q010 | 미디어 공개 범위·저장 위치와 임시 블로그 채널 | 운영 필요 시 결정 |
| Q011 | Delivery의 실제 live deployment 성공 Evidence | site workflow 정의와 content-consuming commit은 확인. 해당 revision의 Pages 성공 run/URL은 이번 조사에서 검증하지 못함 |
| Q012 | Automation 1.0 최소 경로 | 수동 `docs:publish`는 존재하지만 automated/agent-assisted publishing workflow는 확인되지 않아 미충족 |

## 구현 검증 범위

2026-09-18에 다음 `main` revision을 직접 조사했다.

- engine: `2f696f9c73863d0473acc0c4a66a67f66d8ad745`
- docs: `50d89a4cb1c5d6476444e29454e12b523e99231b`
- site (`package.json` name: `oomia.github.io.mono`): `a3b2e182563458636b7b8186a4cd2201894b2a65`

상세 판정과 Evidence는 [Implementation Map](implementation-map.md)에 둔다. 별도 원격 `oomia.github.io.mono` 레포는 확인되지 않았으며, 현재 `mono`는 site 레포를 가리키는 로컬/문서상의 이름으로 취급한다.

## 역사적 수집 범위

초기 지식 레포는 동일 ChatGPT 프로젝트의 관련 대화 3개를 수집해 구성했다. 대화 원문은 provenance에 역사적 근거로 남기되, 이후 실제 repository 검증 결과가 있는 항목은 현재 canonical 문서와 Implementation Map을 우선한다.
