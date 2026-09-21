# Decision Log

과거 제안과 현재 정리 기준을 구분한다. D001–D008의 날짜는 최초 수집일 2026-09-18이며 원래 결정일을 추정하지 않는다. 이후 결정은 실제 반영일을 기준으로 기록한다.

| ID | 현재 기준 | 상태 / 근거 | 대체하거나 제한한 과거 안 |
|---|---|---|---|
| D001 | 유일한 최상위 구현 레포를 만들지 않는다 | 사용자 명시, S2 `138f8f89` | 임의의 root repository 및 submodule 집합으로 제품 계층을 표현 |
| D002 | docs는 generated projection | **대체됨: D021**, 사용자 명시, S2 `4c1f839e` | docs를 canonical authoring source로 취급 |
| D003 | 필드 이름은 Work Type | 사용자 명시, S2 `178bf729` | Category / Type |
| D004 | Target Release와 Objective를 분리 | 사용자 후속 확인, S3 `5a382a65` | Release Target에 버전/목표를 결합 |
| D005 | Scope는 직접 바뀌는 책임만 최소 선택 | 사용자 README 반영 + 최신 제안, S3 `924e880a`, S2 `82ef0a72` | 단일 주영역만 선택하던 중간 제안; 모든 dependency 태깅 |
| D006 | Objective 5개와 Authoring Experience를 보존 | 실제 옵션은 사용자 명시, description/유지는 최신 제안, S3 `f55d6e75` | 4개만 적힌 이전 답변 |
| D007 | Item은 완료 가능한 delta | 최신 설계 제안, S2 `4a49654f` | 영구 capability를 릴리스마다 복제해 Done 처리 |
| D008 | 지식은 Markdown 레포, 운영 상태는 Project | knowledge repo 생성 및 현재 운영 방식 | Project README가 모든 장기 지식을 소유 |
| D009 | Project README는 canonical 문서의 짧은 인덱스로 유지한다 | 사용자 명시, 2026-09-18 | Product Boundary·Planning Model·필드 정의를 README에 중복 보관 |
| D010 | 설계 정의 Item은 canonical 문서의 immutable permalink를 Evidence로 사용할 수 있다 | 사용자 명시, 2026-09-18 | 설계 정의 완료에도 별도 산출물을 중복 생성 |
| D011 | 1.0 구현 수준은 revision이 고정된 Implementation Map으로 관리한다 | 사용자 요청 + 구현 레포 검증, 2026-09-18 | 설계 문서 또는 대화만으로 구현 완료 여부 추론 |
| D012 | canonical Article source는 CMS/Visual Editor와 독립적인 raw Markdown/MDX string으로 보존한다 | 사용자 승인, 2026-09-20 | Visual Editor가 무손실 표현 가능한 Markdown subset을 canonical 저장 범위로 취급 |
| D013 | Storage, Editing, Publishing 가능성을 서로 독립된 계약으로 판정한다 | 사용자 승인, 2026-09-20 | 저장 가능 = Visual 편집 가능 = 발행 가능으로 묶는 모델 |
| D014 | 공식 MDX component contract는 Site 쪽에서 소스 변경을 소유하는 versioned public content-component package로 공유한다 | **대체됨: D018**, 사용자 제안 및 승인, 2026-09-20 | engine과 site가 component spec을 각각 암묵적으로 복제 |
| D015 | CMS는 공식 component의 authoring adapter이고 Site는 rendering consumer다. Visual adapter 유무는 publishability를 결정하지 않는다 | 사용자 승인, 2026-09-20 | CMS registry가 플랫폼 전체 MDX 지원 범위를 결정 |
| D016 | Publishability는 CMS codec round-trip이 아니라 content/component contract와 실제 Site consumer 검증으로 판정한다 | D012–D015의 구현 원칙, 2026-09-20 | 모든 DB body에 Visual Editor representability를 요구하는 global publish gate |
| D017 | Knowledge에는 raw conversation transcript를 저장하지 않고 source/turn provenance metadata와 canonical knowledge만 유지한다 | 사용자 위임에 따른 agent 결정, 2026-09-20 | `provenance/conversations.json`에 원문 대화를 장기 보존하거나 handoff와 세션 transcript archive를 결합 |
| D018 | 공식 content component는 독립 repository가 소유하고 npm public package `@oomia/content-components`로 배포한다. framework-neutral contract/manifest와 React renderer surface를 분리하며 Site와 Engine은 각각 consumer다 | **대체됨: D024**, 사용자 명시, 2026-09-21 | D014의 Site-owned source 모델; `.astro` 기반 public renderer; 개인 unscoped package |
| D019 | content-component source repository는 public `ooMia/content-components`로 둔다. npm organization scope `@oomia`와 GitHub owner를 억지로 일치시키지 않고, 기존 프로젝트 repository ownership과 일관성을 우선한다 | **대체됨: D024**, 사용자 위임에 따른 agent 결정, 2026-09-21 | 별도 GitHub organization으로 즉시 이동하거나 Site/Engine 내부 package로 유지 |
| D020 | React content components는 semantic markup과 optional baseline CSS를 제공한다. 기본 스타일은 `@oomia/content-components/styles.css`를 소비자가 명시적으로 import하고, CSS custom properties·stable class/data hooks·`className`/`style` passthrough로 override한다 | **대체됨: D024**, 사용자 요구 + Fumadocs/Nextra/Docusaurus 패턴 조사, 2026-09-21 | CSS 자동 주입, Tailwind/runtime theme 강제, 완전 unstyled-only package |
| D021 | canonical Article content는 Markdown/MDX와 frontmatter/assets로 구성된 Git-backed filesystem workspace다. local working tree는 authoring/draft state이고 `ooMia/oomia.github.io.docs`의 commit이 durable shared canonical revision이다 | 사용자 명시, 2026-09-21 | D002의 generated projection 모델; PostgreSQL을 canonical content store로 사용하는 모델 |
| D022 | 1.0 기본 authoring client는 Obsidian과 Fumadocs Editor다. 둘은 같은 local content workspace를 직접 편집하며 Engine은 DB-backed CMS가 아니라 workspace validation/publishing orchestration을 담당한다 | **대체됨: D027**, 사용자 명시, 2026-09-21 | Payload + PostgreSQL + Lexical을 1.0 CMS/persistence로 유지 |
| D023 | publishing은 DB snapshot을 Markdown으로 export하는 작업이 아니라 canonical docs revision을 입력으로 검증·projection·Site delivery를 수행한다 | **D036에서 보강**, D021–D022의 직접 결과, 2026-09-21 | DB snapshot → generated docs projection → Site 흐름 |
| D024 | Fumadocs의 built-in UI/Editor component capability를 우선 재사용한다. 독립 `@oomia/content-components` React library는 1.0 선행 과제에서 제거하고, 실제 custom component가 생겨 cross-repository contract가 필요할 때 얇은 profile/adapter package를 도입한다 | 사용자 방향 전환 및 오버엔지니어링 회피, 2026-09-21 | D018–D020의 독립 renderer/component library 선행 구축 |
| D025 | architecture migration은 새 Git-backed vertical slice를 먼저 검증한 뒤 legacy Payload/PostgreSQL path를 단계적으로 retire한다. 과거 Issue/branch는 현재 Knowledge와 reconciliation 후에만 계속하며 미병합 작업을 먼저 보존한다 | 사용자 요청에 따른 migration context/정합성 강화, 2026-09-21 | 기존 구현 중단 상태를 그대로 재개하거나 새 path 검증 전에 big-bang delete |
| D026 | `oomia.github.io.docs`의 layout은 구현 목적에 따라 자유롭게 결정할 수 있다. 자유는 unconstrained document tree뿐 아니라 strict directory/path/frontmatter convention을 의도적으로 선택해 강제하는 방식까지 포함한다. Knowledge는 현재 어느 쪽도 선결하지 않는다 | 사용자 정정, 2026-09-21 | “layout 자유”를 strict layout을 배제하거나 convention을 항상 최소화해야 한다는 뜻으로 해석 |
| D027 | 1.0 editor는 아직 확정하지 않는다. Obsidian을 primary candidate로, Fumadocs Editor를 component-aware/visual candidate로 비교하며 핵심 과제는 두 도구와 Site가 동일 filesystem workspace를 공유하는 integration framework를 검증하는 것이다 | 사용자 명시 + 조사 결과, 2026-09-21 | Obsidian과 Fumadocs Editor를 동등한 필수 1급 client로 미리 확정 |
| D028 | authoring/integration 검증은 synthetic 최소 fixture보다 기존 작성 content corpus를 우선 import해 실제 구조·문법·스타일 충돌을 빠르게 드러낸다. 최소 fixture는 edge-case regression에만 보조적으로 사용한다 | 사용자 명시, 2026-09-21 | 최소 fixture 자체를 핵심 migration outcome으로 삼는 접근 |
| D029 | Obsidian-native custom syntax/style bridge는 1.0 필수 고려사항이 아니다. 기존 content가 이미 Obsidian 기반이므로 1.0 integration은 기존 corpus와 Fumadocs/Site 호환, editor 선택, custom component 주입 경험에 집중한다 | 사용자 명시, 2026-09-21 | Obsidian custom callout/plugin ↔ Fumadocs transformation을 1.0 핵심 과제로 선행 |
| D030 | JavaScript/TypeScript repository의 전역 toolchain entry point는 Vite+ `vp`다. package management, check/lint/fmt/test/build/task/hooks에서 VP를 우선하고 동등 역할의 Turbo/Husky/Prettier/ESLint wrapper를 새로 중복 도입하지 않는다 | 사용자 명시 + Vite+ 공식 문서 조사, 2026-09-21 | repository마다 package manager/task runner/check/hook interface를 별도로 조합 |
| D031 | implementation repository는 monorepo-ready but package-light 구조를 기본으로 한다. `apps/*`는 실행 단위, `packages/*`는 검증된 재사용/dependency boundary, `tools/*`는 repository-only 개발 도구이며 추측성 `utils/shared/infra` package를 선행 생성하지 않는다 | 사용자 요청 + Vite+/pnpm/Astro repository 조사, 2026-09-21 | 처음부터 많은 layer/package를 만들어 architecture diagram을 filesystem에 그대로 투영 |
| D032 | Engine의 새 target implementation은 같은 repository history를 보존한 채 greenfield scratch build를 기본 migration 전략으로 한다. legacy tree는 template가 아니라 reference이며 generic verified behavior만 의도적으로 port한다 | 사용자 명시, 2026-09-21 | Payload/PostgreSQL 중심 tree를 계속 깎아내는 in-place refactor를 기본값으로 사용 |
| D033 | Engine scratch bootstrap baseline은 Node.js `24.20.0`, pnpm `12.3.4`, Vite+ `0.3.3`으로 pin한다. Site와 동일 Node/pnpm baseline을 재사용하고 현재 Engine/최신 Vite+ 0.3.3을 사용하며, 이후 upgrade는 별도 Maintenance change로 다룬다 | 현재 repository state + Fumadocs Node 24+ requirement + Vite+ 0.3.3 latest release 조사, 2026-09-21 | scratch 시작과 동시에 unrelated Node/pnpm/toolchain upgrade를 섞거나 floating latest 사용 |
| D034 | publish는 **committed-revision publish**를 사용한다. Engine은 dirty docs working tree를 자동 stage/commit하지 않고, 사용자가 확정한 docs commit을 입력으로 검증·push하고 Site가 exact docs SHA를 소비하도록 revision linkage와 delivery를 orchestration한다 | 사용자 명시, 2026-09-21 | Engine이 authoring working tree를 자동 commit하는 one-click publish; 기본 branch/PR 생성 publish |
| D035 | Engine 1.0은 **stateless, invocation-driven CLI-first one-shot runtime**으로 구현한다. Engine은 명령 실행 시 시작해 filesystem/Git/Site 작업을 수행하고 exit code/log를 남긴 뒤 종료한다. long-running HTTP service, job queue, server-side session/state lifecycle은 1.0 비목표이며 필요 시 동일 operation API 위에 별도 adapter로 추가한다 | 사용자 명시, 2026-09-21 | resident HTTP/service Engine을 1.0부터 운영 |
| D036 | **Canonical Authoring Source와 Publishable Projection을 분리한다.** `oomia.github.io.docs`의 committed revision은 사람이 편집하는 canonical source/input을 식별하며, Site가 실제 소비하는 문서는 Engine이 해당 revision과 선언된 metadata inputs를 사용해 deterministic하게 materialize한 projection일 수 있다 | 사용자 정정, 2026-09-21 | canonical source file과 Site input이 항상 byte-for-byte 동일하다고 가정; DB export 제거와 publish-time transformation 제거를 동일시 |
| D037 | metadata enrichment는 Publishing Platform의 핵심 책임으로 취급한다. authoring source 자체를 불필요하게 mutation하지 않고 inline frontmatter, sidecar/reference metadata, repository/consumer defaults, deterministic derived metadata 등 선언된 입력을 composition하여 publishable projection을 만든다. 구체적인 storage/precedence policy는 별도 contract에서 결정한다 | 사용자 명시, 2026-09-21 | 모든 publish metadata를 author가 원본 frontmatter에 직접 작성해야 한다고 강제 |


D005의 다중 선택 설정, Delivery 옵션 등록은 실제 Project에서 확인되지 않았다. D007 등 초기 assistant 제안을 사용자의 명시적 승인 발언으로 인용하지 않는다. engine container 배포 및 Validation 옵션은 결정이 아니라 미결 제안이다.

D010은 **설계 정의가 Outcome인 경우에만** 적용한다. 기능 구현·품질·배포 성공은 구현 레포의 코드·테스트·commit/PR·실행/deployment Evidence가 별도로 필요하다.

D011의 현재 기준 revision과 capability 판정은 [Implementation Map](implementation-map.md)에 기록한다. Product Boundary가 변경되면 동일한 구현 revision도 다시 판정할 수 있으며, contract 강화에 따른 상태 하향을 regression과 구분한다.

D012–D016의 세부 정책과 예제별 지원 수준은 [Content Authoring & Publishing Contract](content-authoring-contract.md)가 소유한다. D025의 migration 절차와 legacy reconciliation 기준은 [Architecture Transition](architecture-transition.md)가 소유한다. D021·D023·D026–D037이 현재 1.0 persistence/authoring/integration, projection 및 implementation-bootstrap 기준이다. D024는 Fumadocs built-in 재사용 원칙을 유지하지만 D027에 따라 Fumadocs Editor 자체를 필수 authoring client로 확정하지 않는다. 별도 content-component package와 manifest는 실제 custom component의 공유 계약이 필요해질 때만 다시 활성화한다.

D017에 따라 세션의 장기 의미는 canonical 문서·Decision Log로 승격하고, 일시적인 실행 상태만 `handoff/current.md`에 유지한다. 원문 대화가 필요하면 원래 대화 시스템을 참조하며 Knowledge repository는 transcript archive 역할을 맡지 않는다.
