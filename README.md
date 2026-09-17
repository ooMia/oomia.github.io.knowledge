# Publishing Platform Knowledge

구조화된 콘텐츠를 명시적인 확장·발행 계약을 통해 커스터마이징 가능한 실제 사이트로 전달한다.

이 레포는 **LilysAI Ambassador 프로젝트의 대화 3개에서 재구성한 최신 설계 기준**이다. 기준일: 2026-09-18. 구현 코드나 실시간 작업 현황을 보관하는 레포가 아니다.

## 시작하기

- Agent: [CONTEXT.md](CONTEXT.md)를 읽고 필요한 문서만 참조한다.
- Chat: `python3 scripts/bundle.py`로 생성한 [CONTEXT-BUNDLE.md](dist/CONTEXT-BUNDLE.md)를 첨부한다.
- 수정: 해당 원본 Markdown을 직접 고친다. [변경 방법](CONTRIBUTING.md)을 따른다.

## 설계 문서

| 필요한 정보 | 원본 |
|---|---|
| 책임 경계와 레포 관계 | [Architecture](docs/architecture.md) |
| 목표·Item·Issue·완료 판정 | [Planning Model](docs/planning-model.md) |
| Scope / Objective / Work Type 선택 | [Fields](docs/fields.md) |
| 1.0 제품 경계와 제외 범위 | [Release 1.0](docs/release-1.0.md) |
| 기록·발표·LilysAI 활용 | [Operating Rhythm](docs/operating-rhythm.md) |
| 대화에서 변경된 결정 | [Decisions](docs/decisions.md) |
| 미결·검증 필요 사항 | [Open Questions](docs/open-questions.md) |
| 출처 및 확정 수준 | [Provenance](provenance/README.md) |

## 운영 정보의 위치

[GitHub Project #11](https://github.com/users/ooMia/projects/11/)은 작업 상태·Iteration·필드 값·Item을 소유한다. 이 레포는 제품 및 설계 규칙을 소유하고, 구현 세부사항은 각 구현 레포가 소유한다. Project README에는 이 레포를 가리키는 짧은 안내를 두는 구성을 제안한다.

이 버전은 로컬 지식 레포를 만드는 요청에 따라 구성했다. GitHub Project 설정이나 원격 레포에는 아직 반영하지 않았다. 최신 대화의 제안을 채택한 정리본과 사용자 명시 사항을 [출처](provenance/README.md)에서 구분한다.

## 템플릿

[Project Item](templates/project-item.md) · [Repository Issue](templates/repository-issue.md) · [설계 변경](templates/design-change.md) · [Daily Evidence](templates/daily-evidence.md) · [Weekly Review](templates/weekly-review.md) · [Implementation Map](templates/implementation-map.md)
