# Changelog

## 2026-09-21

- D035로 Engine 1.0 실행 표면을 stateless, invocation-driven CLI-first one-shot runtime/container로 확정하고 HTTP service/job/session lifecycle을 1.0 비목표로 설정.
- D033으로 Engine scratch bootstrap baseline을 Node 24.20.0 / pnpm 12.3.4 / Vite+ 0.3.3으로 고정하고 unrelated toolchain upgrade를 scratch 범위에서 제외.
- Open Questions에 decision order를 추가해 즉시 사용자 결정이 필요한 Q022(Engine execution surface), Q016(Git publish ownership)과 evidence-gated/later decisions를 분리.
- live Site/docs 구조를 재검증: docs repo 전체가 `apps/web/data/articles` submodule로 mount되고 모든 md/mdx가 하나의 `articles` collection으로 소비되며, legacy publish는 exact docs SHA를 Site submodule pointer로 commit하는 구조임을 handoff에 기록.
- D026을 정정해 docs layout의 자유가 free-form만을 뜻하지 않고 strict directory/path/frontmatter convention을 의도적으로 강제하는 구현도 포함하도록 확정.
- D027을 유지하되 기존 corpus가 이미 Obsidian 기반이라는 점을 반영해 basic Obsidian authoring 검증은 제외하고 Fumadocs Editor의 custom-component authoring 이점을 핵심 비교점으로 좁힘.
- D028에 따라 synthetic 최소 fixture보다 기존 작성 content corpus를 Fumadocs/Site integration corpus로 우선 사용.
- D029로 Obsidian-native custom syntax/CSS/plugin bridge를 1.0 핵심 고려사항에서 제외.
- D030으로 JavaScript/TypeScript repository의 전역 toolchain entry point를 Vite+ `vp`로 확정하고 [Development Toolchain](docs/development-toolchain.md) 추가.
- D031로 monorepo-ready/package-light repository policy를 확정하고 [Repository Design & Maintenance](docs/repository-design.md) 추가.
- D032로 Engine은 legacy tree를 계속 다듬는 방식이 아니라 same-history greenfield scratch build를 기본 migration 전략으로 확정.
- 급진적 architecture 변경의 context-switch 비용을 줄이기 위해 [Architecture Transition](docs/architecture-transition.md)을 Active migration directive로 추가하고 Engine/Site/Docs의 stop/keep/adapt/retire 규칙, phased migration, #13/#14 처리 기준을 명문화.
- CONTEXT/AGENTS/README/Project README template에서 migration 작업이 transition guide를 먼저 읽도록 routing을 변경.
- Project Fields의 Persistence/Publishing/Publishable Projection 정의를 Git-backed workspace와 canonical docs revision 기준으로 수정하고, field name `Publishable Projection`이 generated docs ownership을 뜻하지 않음을 명시.
- Labels의 stale `docs = generated projection` 전제를 제거하고 docs repository-level migration Issue에도 orchestration labels를 적용할 수 있게 정리.
- Planning Model의 SoT에 local working tree와 durable docs Git revision을 추가하고 Active transition 중 Item이 migration safety rule을 따르도록 명시.
- D025로 새 vertical slice 검증 전 big-bang legacy 제거를 금지하고, 기존 Issue/branch를 현재 Knowledge와 reconcile한 뒤 진행하도록 결정.
- canonical content architecture를 Git-backed local filesystem workspace로 전환하고 `ooMia/oomia.github.io.docs`를 generated projection에서 durable canonical content remote로 승격(D021).
- 1.0 authoring client를 Obsidian + Fumadocs Editor로 두는 초기 D022를 기록했으며, 같은 날 후속 검토에서 D027이 이를 supersede해 editor 역할을 다시 열어둠.
- publishing을 DB snapshot/export에서 workspace validation → Site consumer verification → docs commit/push/revision linkage로 변경(D023).
- Fumadocs built-in component/editor capability를 우선 재사용하며 독립 `@oomia/content-components` React library bootstrap을 1.0 선행 과제에서 제거(D024).
- Release 1.0, Content Authoring Contract, Implementation Map, Open Questions, Project Orchestration, README/CONTEXT/handoff를 새 filesystem architecture에 맞춰 재정렬.
- custom component JSON Schema를 package 중심 manifest에서 deferred cross-repository profile schema로 일반화.
- public `ooMia/content-components` source repository, npm `@oomia/content-components`, React renderer + framework-neutral contract/manifest, optional `styles.css` styling contract를 확정(D018–D020).
- initial version `0.1.0`, public subpaths root / `./react` / `./manifest` / `./styles.css`, pre-1.0 breaking change는 minor version 정책으로 시작.

## 2026-09-20

- content-component ownership을 Site에서 독립 repository로 이동하고 npm public package `@oomia/content-components` 및 React renderer/framework-neutral contract 분리를 확정(D018). Site draft Issue #9는 superseded 처리.
- Engine #13과 병행 가능한 Site-owned public content-component package 작업을 분리하고, framework-neutral contract surface와 renderer-specific surface의 독립 import 경계를 명문화. Site draft Issue #9로 추적하며 registry/package/version/release 결정은 Q011에 유지.
- 프로젝트 전 세션에 공통 적용할 Chat/Agent 협업 규칙을 `CONTEXT.md`에 추가: 단계적 실행, 사용자 결정 지점에서 중단, 핵심 GitHub 객체 최초 언급 시 링크 사용, 비핵심 검증의 비차단 원칙.
- Knowledge의 raw conversation transcript 보존을 중단하고 `provenance/conversations.json` 제거 결정(D017). provenance는 source/turn metadata와 최소 요약만 유지하고 세션 연속성은 `handoff/current.md`가 담당.
- 세션 간 live 상태를 canonical knowledge와 분리하기 위해 `handoff/current.md` checkpoint를 도입하고 Open Questions의 운영 확인 항목을 이동.
- Implementation Map을 revision-bound snapshot으로 명확히 하고 bootstrap conversation provenance를 지속 append하지 않는 archive로 동결.
- durable context bundle에서 volatile handoff를 제외하고 bundle 생성기의 고정 날짜를 제거.
- Knowledge repository의 실제 public visibility와 과거 private 전제 불일치를 제거하고 raw conversation provenance의 공개·보존 정책을 Open Question으로 분리.
- Issue #8의 explicit Publish automation을 idempotent no-op semantics까지 포함해 완료로 재평가하고 Automation capability를 충족으로 갱신.
- GitHub Pages run `35472028484`의 build/deploy 성공과 artifact `10593195312`를 Delivery Evidence로 반영.
- canonical Article source를 CMS/Visual Editor와 독립적인 raw Markdown/MDX string으로 보존하는 정책 확정.
- Storage / Editing / Publishing 가능성을 서로 다른 contract로 분리하고, Visual Editor가 표현하지 못하는 source를 Source mode로 보존하는 기본 정책 확정.
- 공식 MDX component는 Site가 소유하는 versioned public content-component package로 계약을 공유하고, Engine/CMS는 authoring adapter, Site는 rendering consumer가 되는 경계 확정.
- Visual adapter 유무를 Publishability와 분리하고, content/component contract + actual Site consumer build를 publish gate로 사용하는 방향 확정.
- [Content Authoring & Publishing Contract](docs/content-authoring-contract.md) 추가.
- Agent/runtime 작업을 위한 planning draft [Content Component Manifest Schema](docs/content-component-schema.md)와 JSON Schema 추가.
- 강화된 1.0 boundary에 따라 Implementation Map을 재평가: Authoring·Canonical Content·Extensibility·Publishing 부분 충족, Automation·Presentation·Delivery 충족.
- 오래된 “Automation 미충족”, “Delivery 성공 Evidence 미확인” open question 제거 및 component package/frontmatter/raw HTML 관련 실제 미결 사항으로 교체.

## 2026-09-18

- 같은 프로젝트의 대화 3개를 수집하고 최신 용어와 수정 사항을 반영한 지식 레포 생성.
- 제품 경계, 책임, 필드, 계획 규칙, 활동 루틴을 각각 하나의 원본 문서로 분리.
- 결정 출처, 제안의 확정 수준, 실환경 미검증 항목을 구분.
- Item/Issue/기록/설계변경 템플릿과 Chat 첨부용 통합본 생성기 추가.
- `ooMia/oomia.github.io.knowledge`를 private canonical remote로 확정하고 stale한 “원격 없음” 문구 제거.
- GitHub Project README를 canonical 문서 링크 중심의 짧은 인덱스로 축소하는 템플릿 추가.
- 설계 정의 Item은 canonical 문서의 immutable permalink를 Evidence로 사용할 수 있다는 규칙을 명시.
- engine/docs/site의 실제 main revision을 검증해 1.0 Implementation Map을 최초 작성.
- 최초 1.0 capability 판정을 기록. 이후 상태 변경은 최신 Implementation Map을 우선한다.
