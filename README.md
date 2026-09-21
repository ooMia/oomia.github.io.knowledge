# Publishing Platform Knowledge

Git-backed document workspace를 editor/tooling과 분리해 유지하고, Engine이 검증·Git revision·publishing을 orchestration하여 실제 Site로 전달한다. Obsidian과 Fumadocs Editor의 역할은 현재 integration evidence로 비교 중이다.

이 repository는 Publishing Platform의 **제품·아키텍처·계획 지식에 대한 canonical source**다. 구현 코드와 GitHub Project의 실시간 작업 상태는 각 소유 위치에서 관리한다.

## 시작하기

- 이어받기: Engine/Site/Docs migration 작업은 [Architecture Transition](docs/architecture-transition.md) → [Current Handoff](handoff/current.md) 순으로 읽고 live 상태를 재검증한다.
- Agent: [CONTEXT.md](CONTEXT.md)를 읽고 작업에 필요한 원본 문서만 참조한다.
- Chat: `python3 scripts/bundle.py`로 생성한 [CONTEXT-BUNDLE.md](dist/CONTEXT-BUNDLE.md)를 첨부한다.
- 수정: 해당 규칙을 소유하는 Markdown을 직접 고치고 [변경 방법](CONTRIBUTING.md)을 따른다.

## Canonical documents

| 필요한 정보 | 원본 |
|---|---|
| 책임 경계와 레포 관계 | [Architecture](docs/architecture.md) |
| legacy DB/CMS → Git workspace 전환 지침 | [Architecture Transition](docs/architecture-transition.md) |
| VP command / runtime / CI / hooks 정책 | [Development Toolchain](docs/development-toolchain.md) |
| monorepo / package / repository 구조 | [Repository Design & Maintenance](docs/repository-design.md) |
| Markdown/MDX workspace·편집·저장·발행 수준 | [Content Authoring & Publishing Contract](docs/content-authoring-contract.md) |
| metadata enrichment / publishable projection | [Publishable Projection & Metadata Enrichment](docs/publishable-projection.md) |
| custom component manifest 계획 | [Content Component Manifest Schema](docs/content-component-schema.md) |
| 목표·Item·Issue·완료 판정 | [Planning Model](docs/planning-model.md) |
| Issue activation / Project·Development 자동화 | [Project Orchestration](docs/project-orchestration.md) |
| Issue/PR label taxonomy | [Labels](docs/labels.md) |
| Scope / Objective / Work Type 선택 | [Fields](docs/fields.md) |
| 1.0 제품 경계와 제외 범위 | [Release 1.0](docs/release-1.0.md) |
| 실제 구현과 1.0 migration gap | [Implementation Map](docs/implementation-map.md) |
| 기록·발표·LilysAI 활용 | [Operating Rhythm](docs/operating-rhythm.md) |
| 변경된 결정 | [Decisions](docs/decisions.md) |
| 미결·검증 필요 사항 | [Open Questions](docs/open-questions.md) |
| 과거 대화 출처 및 확정 수준 | [Provenance](provenance/README.md) |

## Source of Truth

[GitHub Project #11](https://github.com/users/ooMia/projects/11/)은 현재 Status·Iteration·필드 값·Item·Status Update를 소유한다. 이 레포는 제품 방향과 계획 규칙을 소유하고, 코드·테스트·구체적인 runtime/artifact contract는 각 구현 레포가 소유한다.

콘텐츠 자체의 source of truth는 다음처럼 분리한다.

- **authoring/draft state**: local Git working tree의 Markdown/MDX + frontmatter/assets
- **durable shared canonical revision**: [`ooMia/oomia.github.io.docs`](https://github.com/ooMia/oomia.github.io.docs)의 Git commit
- **authoring clients**: editor selection 미확정 — Obsidian primary candidate, Fumadocs Editor component-aware candidate, IDE/Agent source client
- **validation/publishing orchestration**: Engine
- **presentation/delivery**: Site

따라서 docs repository는 더 이상 DB에서 생성되는 단순 projection이 아니다. canonical content history와 published source revision을 소유한다.

Payload/PostgreSQL 기반 CMS는 현재 target architecture가 아니라 legacy implementation/Evidence다. Fumadocs UI/Core/MDX와 custom-component workflow를 우선 검토하며, Fumadocs Editor 채택 여부는 아직 열려 있다. JS/TS repository는 VP-first toolchain과 monorepo-ready/package-light 구조를 전역 기본값으로 사용한다.

Project README는 장기 설계를 복제하지 않고 위 canonical 문서를 찾기 위한 짧은 진입점으로 유지한다. 권장 내용은 [Project README 템플릿](templates/project-readme.md)에 있다.

## Evidence

설계 정의 자체가 Outcome인 Item은 해당 canonical 문서의 **immutable commit/permalink**를 Evidence로 사용할 수 있다.

기능 구현이나 배포 성공은 설계 문서만으로 증명하지 않는다. 해당 구현 레포의 코드·테스트·PR/commit·실행 결과·deployment 등 별도의 재현 가능한 Evidence가 필요하다.

canonical content/publishing Evidence에는 필요에 따라 다음 revision을 함께 기록한다.

- docs content commit SHA
- Engine validation/publish revision
- Site consumer revision
- GitHub Pages workflow/deployment result

## Agent-readable schemas

- [content-component-manifest.schema.json](schemas/content-component-manifest.schema.json): custom MDX component의 runtime/Agent-readable contract가 실제로 필요해질 때 사용할 planning schema. 현재 1.0 필수 artifact가 아니다.

## Templates

[Project README](templates/project-readme.md) · [Project Item](templates/project-item.md) · [Repository Issue](templates/repository-issue.md) · [설계 변경](templates/design-change.md) · [Daily Evidence](templates/daily-evidence.md) · [Weekly Review](templates/weekly-review.md) · [Implementation Map 조사 템플릿](templates/implementation-map.md)
