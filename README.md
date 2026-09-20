# Publishing Platform Knowledge

구조화된 콘텐츠를 명시적인 authoring·extension·publishing 계약을 통해 커스터마이징 가능한 실제 사이트로 전달한다.

이 private repository는 Publishing Platform의 **제품·아키텍처·계획 지식에 대한 canonical source**다. 구현 코드와 GitHub Project의 실시간 작업 상태는 각 소유 위치에서 관리한다.

## 시작하기

- Agent: [CONTEXT.md](CONTEXT.md)를 읽고 작업에 필요한 원본 문서만 참조한다.
- Chat: `python3 scripts/bundle.py`로 생성한 [CONTEXT-BUNDLE.md](dist/CONTEXT-BUNDLE.md)를 첨부한다.
- 수정: 해당 규칙을 소유하는 Markdown을 직접 고치고 [변경 방법](CONTRIBUTING.md)을 따른다.

## Canonical documents

| 필요한 정보 | 원본 |
|---|---|
| 책임 경계와 레포 관계 | [Architecture](docs/architecture.md) |
| Markdown/MDX 저장·편집·발행 수준 | [Content Authoring & Publishing Contract](docs/content-authoring-contract.md) |
| MDX component manifest 계획 | [Content Component Manifest Schema](docs/content-component-schema.md) |
| 목표·Item·Issue·완료 판정 | [Planning Model](docs/planning-model.md) |
| Scope / Objective / Work Type 선택 | [Fields](docs/fields.md) |
| 1.0 제품 경계와 제외 범위 | [Release 1.0](docs/release-1.0.md) |
| 실제 구현과 1.0 gap | [Implementation Map](docs/implementation-map.md) |
| 기록·발표·LilysAI 활용 | [Operating Rhythm](docs/operating-rhythm.md) |
| 변경된 결정 | [Decisions](docs/decisions.md) |
| 미결·검증 필요 사항 | [Open Questions](docs/open-questions.md) |
| 과거 대화 출처 및 확정 수준 | [Provenance](provenance/README.md) |

## Source of Truth

[GitHub Project #11](https://github.com/users/ooMia/projects/11/)은 현재 Status·Iteration·필드 값·Item·Status Update를 소유한다. 이 레포는 제품 방향과 계획 규칙을 소유하고, 코드·테스트·구체적인 runtime/artifact contract는 각 구현 레포가 소유한다.

Article body의 canonical policy는 CMS 구현이 아니라 [Content Authoring & Publishing Contract](docs/content-authoring-contract.md)가 정의한다. 공식 MDX component의 실제 source/runtime 구현은 Site repository가 소유하고, versioned public content-component package를 통해 Engine/CMS와 계약을 공유하는 방향을 따른다.

Project README는 장기 설계를 복제하지 않고 위 canonical 문서를 찾기 위한 짧은 진입점으로 유지한다. 권장 내용은 [Project README 템플릿](templates/project-readme.md)에 있다.

## Evidence

설계 정의 자체가 Outcome인 Item은 해당 canonical 문서의 **immutable commit/permalink**를 Evidence로 사용할 수 있다.

기능 구현이나 배포 성공은 설계 문서만으로 증명하지 않는다. 해당 구현 레포의 코드·테스트·PR/commit·실행 결과·deployment 등 별도의 재현 가능한 Evidence가 필요하다.

## Agent-readable schemas

- [content-component-manifest.schema.json](schemas/content-component-manifest.schema.json): 공식 MDX component의 최소 runtime/Agent-readable manifest 계획. 현재는 planning draft이며 published package API가 아니다.

## Templates

[Project README](templates/project-readme.md) · [Project Item](templates/project-item.md) · [Repository Issue](templates/repository-issue.md) · [설계 변경](templates/design-change.md) · [Daily Evidence](templates/daily-evidence.md) · [Weekly Review](templates/weekly-review.md) · [Implementation Map 조사 템플릿](templates/implementation-map.md)
