# Publishing Platform — Chat Context Bundle

GENERATED FILE — 원본은 각 문서 경계에 적힌 경로입니다. 직접 수정하지 마세요.
Implementation Map은 문서에 적힌 repository revision의 검증 스냅샷이며 live Project 상태가 아닙니다.
Architecture Transition이 Active인 동안 Engine/Site/Docs 구현은 해당 transition guide를 먼저 따릅니다.
JavaScript/TypeScript 구현은 Development Toolchain과 Repository Design 정책을 함께 적용합니다.
Canonical lifecycle은 Authoring Draft → Engine prepare → Prepared Canonical Source → user commit → deterministic Publishable Projection입니다.
Explicit frontmatter value는 authoritative이며 Engine은 unset/missing field만 보완하는 방향으로 시작합니다.
Knowledge의 장시간·다문서 변경은 branch + PR + squash merge를 기본으로 합니다.
상대 링크는 원본 레포 기준입니다. JSON Schema와 템플릿은 별도로 참조하며, provenance에는 raw transcript가 아닌 source/turn metadata만 포함됩니다.


---

<!-- BEGIN SOURCE: CONTEXT.md -->

# Context entry point

## 먼저 이해할 것

이 저장소는 Publishing Platform의 제품·아키텍처·계획 지식에 대한 canonical source다. 설계가 존재한다는 사실과 구현 완료를 구분한다.

콘텐츠 작업에서는 특히 다음 원칙을 먼저 적용한다.

- canonical authoring content는 Git-backed local filesystem document workspace에 보존한다. Site가 소비하는 publishable document는 metadata enrichment를 거친 deterministic projection일 수 있으며 source와 byte-for-byte 동일할 필요가 없다. docs layout은 free-form부터 strict convention까지 아직 열려 있다.
- local working tree는 authoring/draft state이며, 공유·재현 가능한 durable canonical revision은 `ooMia/oomia.github.io.docs` Git commit이다.
- authoring editor는 아직 확정하지 않는다. Obsidian을 primary candidate로, Fumadocs Editor를 component-aware candidate로 두고 동일 docs workspace + Site integration을 실제 corpus로 비교한다.
- Engine은 DB-backed CMS가 아니라 workspace validation / Git / publishing orchestration을 담당하는 stateless, invocation-driven CLI-first one-shot runtime을 목표로 한다.
- storage / visual editing / publishing / presentation 가능성을 동일시하지 않는다.
- Fumadocs UI/Core/MDX를 Site에서 우선 재사용하고, Fumadocs Editor는 custom-component authoring 이점이 실제로 필요한지 비교한다. Obsidian-native custom syntax bridge는 1.0 필수 고려사항이 아니다.
- JavaScript/TypeScript 구현에서는 Development Toolchain (`docs/development-toolchain.md`)의 VP-first 정책과 Repository Design (`docs/repository-design.md`)의 monorepo-ready/package-light 원칙을 적용한다.
- 실제 구현 수준은 Implementation Map (`docs/implementation-map.md`)의 기준 revision과 책임 레포 Evidence로 판정한다.

현재 Engine/Site/Docs는 architecture migration 중이다. 해당 repository의 구현·리팩터링·Issue 재범위화 작업은 먼저 Architecture Transition (`docs/architecture-transition.md`)을 읽는다. 확정 수준은 Provenance (`provenance/README.md`), 남은 결정은 Open Questions (`docs/open-questions.md`)을 따른다. 이전 작업을 이어받는 경우에는 Architecture Transition (`docs/architecture-transition.md`) → Current Handoff (`handoff/current.md`) 순으로 읽되, handoff는 volatile checkpoint이며 canonical policy가 아님을 전제로 한다.

## 작업별 읽기

| 작업 | 읽을 문서 |
|---|---|
| architecture migration 구현/이어받기 | Architecture Transition (`docs/architecture-transition.md`) → Current Handoff (`handoff/current.md`) → 필요한 canonical 문서와 live GitHub 상태 재검증 |
| 전체 이해 | Architecture (`docs/architecture.md`), Release 1.0 (`docs/release-1.0.md`) |
| legacy → new target migration 판단 | Architecture Transition (`docs/architecture-transition.md`), Implementation Map (`docs/implementation-map.md`) |
| VP 명령·환경·CI·hooks 정책 | Development Toolchain (`docs/development-toolchain.md`) |
| monorepo/package/repository 구조 | Repository Design (`docs/repository-design.md`) |
| Markdown/MDX authoring·storage·publish 정책 | Content Authoring & Publishing Contract (`docs/content-authoring-contract.md`) |
| custom MDX component profile/manifest | Content Component Manifest Schema (`docs/content-component-schema.md`), JSON Schema (`schemas/content-component-manifest.schema.json`) |
| 현재 1.0 구현 수준·migration gap | Implementation Map (`docs/implementation-map.md`) → 기준 revision의 구현 레포 코드·테스트 |
| Item 작성·분류·완료 검토 | Planning (`docs/planning-model.md`), Fields (`docs/fields.md`), 관련 release, 실제 Item의 Outcome/AC/Evidence |
| Issue activation / Project field / Development branch 자동화 | Project Orchestration (`docs/project-orchestration.md`), Planning (`docs/planning-model.md`) |
| 구현 논의 | Architecture → 관련 contract → Implementation Map → 소유 레포의 최신 문서·코드·테스트 |
| 주간 계획·발표 | Operating Rhythm (`docs/operating-rhythm.md`), 실제 Project Status Update, 실제 Evidence |
| 설계 수정 | 해당 원본 문서, Decisions (`docs/decisions.md`), CONTRIBUTING (`CONTRIBUTING.md`) |
| GitHub Project README 정리 | Project README 템플릿 (`templates/project-readme.md`) |
| 과거 발언 확인 | Provenance (`provenance/README.md`)의 source/turn metadata → 필요 시 원본 대화 링크 |

## Agent 작업 원칙

Content 관련 구현을 계획하거나 수정할 때:

1. PostgreSQL/Payload 같은 특정 persistence/CMS 구현을 canonical content requirement로 확대하지 않는다.
2. content file과 frontmatter를 직접 다루는 Git-backed workspace contract를 우선한다.
3. Fumadocs Editor가 표현하지 못하는 syntax를 삭제/정규화해서 손실시키기보다 Obsidian/IDE Source path를 유지한다.
4. uncommitted working tree와 committed docs canonical revision을 구분한다.
5. publish는 DB export보다 validation / Git revision / Site consumer verification에 집중한다.
6. Fumadocs UI/Core/MDX는 Site에서 우선 재사용하되 Fumadocs Editor를 필수 authoring client로 가정하지 않는다. custom component authoring UX/DX가 editor 선택의 핵심 비교점이며 Obsidian-native custom syntax bridge는 1.0 범위 밖이다.
7. TypeScript type이나 editor spec만으로 Publishability가 증명된다고 가정하지 않는다. 최종 Site consumer 검증을 포함한다.
8. legacy Payload/PostgreSQL code의 성공 Evidence를 새 target architecture 완료로 해석하지 않는다.
9. migration 중에는 기존 코드를 `keep / adapt / retire`로 분류하고 새 vertical slice가 검증되기 전 big-bang delete를 하지 않는다. Engine은 D032에 따라 greenfield scratch build를 기본 전략으로 하고 Site는 별도 Evidence로 판단한다.
10. 과거 Issue/branch의 목표가 현재 Knowledge와 충돌하면 현재 canonical Knowledge를 target으로, 과거 구현을 migration input으로 취급한다.
11. JS/TS 작업은 VP-first command surface를 사용하고, `vp` built-in과 `vp run`/`vpr` task를 구분한다. 새 Engine에 Turbo/Husky 등 동등 역할 wrapper를 다시 추가하지 않는다.
12. Engine 1.0은 one-shot CLI adapter를 사용한다. `prepare`는 working-tree source의 unset metadata를 보완할 수 있지만 explicit value를 덮어쓰지 않고 stage/commit/push하지 않는다. timestamp 계산, file/staged/all selection, prompt UX, formatting 방식은 구현 레포에서 유연하게 결정한다.
13. Knowledge의 다문서·장시간·다단계 변경은 branch + PR을 사용하고 squash merge를 기본으로 한다. 작은 국소 수정만 `main` 직행을 허용한다. core operation 안에 HTTP request/session/job lifecycle이나 CLI parsing/stdout/process-exit concerns를 섞지 않는다.

## 프로젝트 협업·응답 원칙

이 프로젝트의 Chat/Agent 세션은 아래 협업 규칙을 공통으로 적용한다. 사용자가 특정 지침을 **프로젝트 전체 세션에 적용**한다고 명시하면 현재 대화에만 묶어두지 않고 이 문서 또는 해당 규칙의 owning canonical 문서에 반영한다.

1. 작업은 검증 가능한 작은 단계로 나눈다. 한 번에 지나치게 많은 live 변경을 묶지 않고, 의미 있는 단계가 끝날 때 상태를 검증해 보고한 뒤 다음 단계로 진행한다.
2. 실제 사용자 선택이 필요한 분기점에서는 그 선택에 의존하는 변경을 진행하지 않고 멈춘다. 판단에 필요한 사실과 선택지를 제시하고 사용자 결정을 기다린다. 이미 확정된 규칙으로 결정할 수 있는 사안은 불필요하게 다시 묻지 않는다.
3. GitHub 관련 핵심 객체의 주소를 알고 있다면 답변에서 **처음 소개할 때 plain text 식별자만 쓰지 말고 클릭 가능한 링크로 제시한다.** 대상에는 repository, GitHub Project, Issue, Pull Request, branch, commit, workflow run/artifact 등 작업 이해에 직접 필요한 객체가 포함된다. 이후 같은 답변에서 문맥이 명확하면 짧은 이름이나 번호로 다시 언급할 수 있다.
4. 현재 작업 결과에 영향을 주지 않는 주변 metadata나 live field 검증은 본 작업의 blocker로 만들지 않는다. 필요하면 deferred verification으로 기록하고 핵심 작업을 계속한다.
5. 세션별 임시 상태는 `handoff/current.md`에 두되, 여러 세션에 지속 적용할 사용자 작업 방식·응답 방식은 volatile handoff가 아니라 durable context에 둔다.

## 사용할 요청 예시

> Git-backed Content Authoring Contract에 따라 이 Markdown/MDX 표현의 Editing, Storage, Publishing 수준을 판정하고 필요한 구현 delta를 나눠줘.

> Implementation Map 기준 revision보다 구현 레포가 진행되었는지 확인하고, filesystem workspace target에 대한 1.0 capability 상태를 갱신해줘.

> Fumadocs built-in으로 해결 가능한지 먼저 확인하고, custom component가 정말 필요할 때만 Engine editor spec과 Site renderer contract를 분리해줘.

> 이 설계 변경을 원본 문서에 반영하고, 영향받는 규칙과 미결 사항을 확인한 뒤 통합 문서를 다시 생성해줘.

세션을 종료하기 전에는 장기적으로 남아야 할 결정과 정책을 먼저 owning canonical 문서에 반영하고, 아직 진행 중인 live 상태와 다음 안전한 행동만 `handoff/current.md`에 남긴다. handoff는 매번 overwrite하며 과거 세션 로그를 누적하지 않는다. raw conversation transcript는 Knowledge에 복제하지 않고 provenance에는 source/turn metadata만 유지한다.

설계 정의 Item의 Evidence에는 canonical 문서의 immutable commit/permalink를 사용할 수 있다. 기능 구현·배포 Item은 구현 레포의 재현 가능한 Evidence가 별도로 필요하다.

<!-- END SOURCE: CONTEXT.md -->


---

<!-- BEGIN SOURCE: docs/architecture-transition.md -->

# Architecture Transition — DB-backed CMS → Git-backed Content Workspace

상태: **Active migration directive**  
기준일: 2026-09-21

이 문서는 2026-09-21에 확정된 급진적인 architecture 변경을 구현자가 안전하게 이어받기 위한 **전환 전용 canonical guide**다.

장기 제품 계약 자체는 Architecture (`docs/architecture.md`), Content Authoring & Publishing Contract (`docs/content-authoring-contract.md`), Release 1.0 (`docs/release-1.0.md`)이 소유한다. 이 문서는 **기존 구현에서 새 target으로 이동하는 동안 무엇을 중단·보존·재구성해야 하는가**를 소유한다.

전환이 완료되면 이 문서의 상태를 종료하고 필요한 규칙만 장기 canonical 문서에 남긴다.

## 1. 왜 전환하는가

기존 1.0 구현은 다음 모델을 중심으로 발전했다.

```text
Payload / Lexical
       ↓
PostgreSQL
       ↓
Markdown export / codec validation
       ↓
oomia.github.io.docs
       ↓
Astro Site
```

이 구조는 raw Markdown/MDX를 최종 콘텐츠 형태로 사용하는 제품에 비해 다음 책임을 추가했다.

- DB schema와 lifecycle
- Payload user/auth 및 CRUD
- Lexical ↔ Markdown conversion
- visual editor representability와 source preservation 사이의 codec
- DB snapshot → Markdown projection
- 별도 DB backup/restore와 dev/prod persistence 운영

2026-09-21 이후 1.0은 다음 모델을 목표로 한다. authoring source와 Site input은 동일할 필요가 없으며 metadata enrichment/projection이 그 사이의 핵심 경계다.

```text
Obsidian / Fumadocs Editor / IDE
              │
              ▼
      local Git docs source
              │ commit
              ▼
      oomia.github.io.docs
       canonical revision
              │
              ▼
     metadata enrichment
              │
              ▼
    publishable projection
              │
              ▼
      oomia.github.io Site
                                 │
                                 ▼
                           GitHub Pages
```

변경의 목적은 기능을 포기하는 것이 아니라 **canonical source와 authoring 도구 사이의 불필요한 persistence/conversion layer를 제거하는 것**이다.

## 2. 구현자가 가장 먼저 버려야 하는 전제

다음 전제를 현재 요구사항으로 사용하지 않는다.

1. PostgreSQL이 canonical content source다.
2. Payload collection이 Article lifecycle의 owner다.
3. Visual editor state를 Markdown으로 변환해야만 content를 저장할 수 있다.
4. `oomia.github.io.docs`는 DB snapshot에서 생성되는 read-only projection이다.
5. publish는 DB를 Markdown으로 export하는 작업이다.
6. 모든 공식 content component를 Oomia가 직접 React package로 구현해야 한다.
7. Engine Issue #13의 기존 Payload-oriented 구현 계획이 여전히 현재 next step이다.
8. 기존 코드에 많은 투자가 들어갔다는 이유만으로 새 architecture가 legacy abstraction을 보존해야 한다.

위 전제에 의존하는 구현은 **현재 target과의 compatibility를 먼저 증명하기 전에는 확장하지 않는다.**

## 3. 현재 non-negotiable target

### Canonical content

- content는 Markdown/MDX + YAML frontmatter + assets의 filesystem representation을 사용한다.
- local Git working tree는 authoring/draft state를 포함할 수 있다.
- durable shared canonical revision은 [`ooMia/oomia.github.io.docs`](https://github.com/ooMia/oomia.github.io.docs)의 Git commit SHA로 식별한다.
- Git history가 기본 revision/diff/rollback mechanism이다.
- DB를 추가하더라도 derived index/cache여야 하며 canonical content를 대체하지 않는다.

### Authoring

- editor는 아직 확정하지 않는다. 기존 content corpus가 이미 Obsidian 기반이므로 Obsidian의 기본 file/Markdown authoring 가능성은 검증 대상이 아니다.
- 핵심 검증 대상은 Fumadocs Site integration과, custom component 주입·structured editing 관점에서 Fumadocs Editor가 Obsidian보다 실질적으로 유리한지 여부다.
- 동일 docs workspace를 editor와 Site가 불필요한 conversion 없이 공유해야 한다.
- Source-level editing은 Obsidian/IDE/Agent로 항상 가능해야 한다.
- Obsidian-native custom syntax/style bridge는 1.0 핵심 과제로 만들지 않는다.
- full CMS나 자체 editor framework를 직접 재구현하지 않는다.

### Engine

Engine은 **workspace-oriented orchestrator**다.

필수 책임 후보:

- workspace discovery
- file/frontmatter/content validation
- Git status/revision handling
- explicit publish orchestration
- Site consumer verification
- Evidence/revision linkage
- containerized execution + mounted workspace

1.0 필수가 아닌 책임:

- DB CRUD
- application-level CMS user management
- rich-text canonical state
- 자체 visual editor framework
- DB migration/backup lifecycle

### Site

Site는 단순 migration 대상이 아니다. 새 target의 핵심 consumer이므로 함께 변경된다.

- canonical docs revision을 직접 소비하는 boundary는 유지한다.
- 현재 Astro 기반은 별도 이유가 없는 한 유지할 수 있다.
- Fumadocs UI/content tooling을 우선 검토한다.
- 기존 custom Callout 같은 예시 구현을 보존하기 위해 Fumadocs built-in을 재구현하지 않는다.
- actual Site typecheck/test/build는 Publishability의 최종 gate 중 하나로 계속 유지한다.

### Docs

Docs repository는 ownership이 가장 크게 바뀐다.

기존:
> generated document projection

현재:
> 구현 목적에 따라 layout을 자유롭게 선택할 수 있는 document repository + durable Git revision history

Docs는 완전 자유 tree, consumer별 discovery convention, strict repository-wide layout을 모두 허용한다. 어떤 형태를 채택할지는 Site/Fumadocs integration과 유지보수 비용을 보고 결정한다. 일반 document edit 자체를 repository implementation Issue로 다룰 필요는 없고, shared tooling/policy/convention 변경만 구현 작업으로 추적할 수 있다.

## 4. Repository별 migration impact

| Repository | 기존 중심 책임 | 새 책임 / 변화 |
|---|---|---|
| `oomia.github.io.engine` | Payload CMS, PostgreSQL persistence, export/publish | mounted workspace validation, Git/publish orchestration, Site verification |
| `oomia.github.io.docs` | generated projection | canonical content remote, history, assets/frontmatter |
| `oomia.github.io` | generated docs renderer | canonical docs consumer + Fumadocs-oriented presentation |
| `oomia.github.io.knowledge` | architecture/planning SoT | transition policy와 migration Evidence mapping |

## 5. 기존 코드의 분류 규칙

기존 코드를 `keep`, `adapt`, `retire`로 분류한다.

### Keep 가능성이 높은 코드

- command/process execution
- concurrency/idempotency guard
- exit-code/failure propagation
- Evidence capture
- Git revision linkage
- Site checkout/sync/test/typecheck/build verification
- repository/main-only policy checks

### Adapt가 필요한 코드

- publish orchestration
- docs revision handling
- content validation
- explicit publish trigger
- integration/E2E fixture

### Retire 가능성이 높은 코드

- Payload collection CRUD
- Payload-specific Admin UI
- PostgreSQL adapter/schema/init
- Lexical ↔ Markdown codec을 canonical save gate로 쓰는 코드
- DB snapshot exporter
- DB-only integration tests
- CMS user/auth가 local authoring에 필수라는 전제

분류는 파일 이름이나 과거 투자량이 아니라 **새 target에서 실제 책임을 수행하는가**로 결정한다.

## 6. Issue #13 / #14 처리 원칙

### Engine Issue #13

[Issue #13](https://github.com/ooMia/oomia.github.io.engine/issues/13)의 기존 방향은 Payload 내부에서 canonical source를 visual editor constraint에서 분리하는 것이었다.

새 architecture에서는 목표 대부분이 filesystem boundary로 이동한다.

따라서:

- 기존 branch의 미push/local work를 먼저 보존·검토한다.
- branch를 자동으로 merge하거나 버리지 않는다.
- generic test/contract/evidence 중 재사용 가능한 부분을 추출한다.
- 기존 AC를 그대로 완료하려고 하지 않는다.
- live Issue는 새 architecture를 기준으로 supersede/re-scope한 뒤 진행한다.

### Engine Issue #14

[Issue #14](https://github.com/ooMia/oomia.github.io.engine/issues/14)의 핵심 의도인 **Visual codec을 global publish gate로 사용하지 않는다**는 원칙은 유지한다.

단 구현은:

```text
DB body → codec round-trip → export
```

가 아니라:

```text
workspace files
      ↓
content / frontmatter / component / asset validation
      ↓
actual Site consumer verification
```

로 바꾼다.

## 7. Site migration 원칙

Site 구현자가 과거 component-package 계획을 보고 별도 library부터 만들지 않도록 한다.

우선순위:

1. 현재 docs consumption contract를 확인한다.
2. canonical docs repository가 직접 authored source가 되어도 현재 Site pipeline이 유지되는지 검증한다.
3. Fumadocs UI/content tooling 도입 범위를 spike한다.
4. Fumadocs built-in component를 우선 활용한다.
5. 실제 Oomia-specific custom component가 생긴 경우에만 adapter/profile/shared package를 도입한다.
6. 기존 Astro/Fumadocs integration이 충분하면 framework migration을 별도 목표로 만들지 않는다.

## 8. Migration order

코드를 대량 삭제하기 전에 아래 순서를 따른다.

### Phase A — Observe

- Engine #13 branch/local Codex work 보존 상태 확인
- Engine main/develop과 relevant Issue live state 확인
- Docs repository tree/layout/history 조사
- Site의 docs consumption 방식 조사
- 현재 publish workflow에서 generic 부분과 Payload coupling 분리

### Phase B — Prove the Fumadocs/Site integration

synthetic 최소 fixture보다 기존에 Obsidian으로 작성한 실제 content corpus를 우선 사용한다. Obsidian authoring 자체는 이미 검증된 전제이므로, spike는 다음 불확실성에 집중한다.

- 기존 corpus를 Fumadocs UI/Core/MDX 기반 Site에서 얼마나 자연스럽게 소비할 수 있는가
- custom component가 필요할 때 Site와 authoring 측에서 주입/편집 경험이 어떤가
- Fumadocs Editor가 custom component authoring을 충분히 단순화해 별도 editor로 채택할 가치가 있는가
- Obsidian을 primary editor로 유지해도 source와 Site rendering contract가 충분히 단순한가
- docs layout을 free-form/discovery-based로 유지하는 편과 strict convention을 도입하는 편 중 어느 쪽이 실제 integration을 단순화하는가
- external edits/source round-trip에서 의미 없는 normalization이나 data loss가 발생하지 않는가

Obsidian-native custom callout/plugin/CSS bridge는 1.0 spike의 필수 항목이 아니다.

synthetic fixture는 broken source, encoding/path edge case, custom component validation처럼 실제 corpus로 재현하기 어려운 regression에만 추가한다.

### Phase C — Rewire publishing

- DB snapshot export를 publish input에서 제거
- committed source + metadata inputs에서 deterministic projection materialization 도입
- projection/workspace validation 도입
- Site consumer verification 재사용
- canonical docs commit/push semantics 구현
- revision linkage와 idempotency 재검증

### Phase D — Remove legacy

새 path가 동등하거나 더 나은 Evidence를 확보한 이후에만:

- Payload/PostgreSQL runtime 제거
- obsolete scripts/tests/config 제거
- container image에서 DB dependency 제거
- legacy Issue/branch 정리

## 9. Migration safety rules

- **Big-bang delete 금지**: 새 path가 최소 vertical slice를 통과하기 전에 legacy code를 대량 삭제하지 않는다.
- **Dual-SoT 장기 운영 금지**: migration 중 일시적 coexistence는 가능하지만 DB와 files를 동시에 authoritative하게 두지 않는다.
- **Silent normalization 금지**: Fumadocs/Obsidian 간 이동에서 unsupported source가 조용히 손실되면 migration 실패다.
- **Site verification 생략 금지**: file parse 성공만으로 Publishable 판정을 내리지 않는다.
- **Framework rewrite 금지**: Fumadocs 도입을 이유로 Astro 등 이미 동작하는 Site 기반을 불필요하게 전면 교체하지 않는다.
- **Editor lock-in 금지**: Obsidian/Fumadocs Editor 중 하나를 integration evidence 없이 canonical editor로 고정하지 않는다.
- **Premature layout lock-in 금지**: strict layout 자체를 금지하지 않는다. 다만 integration evidence 없이 free-form 또는 strict layout을 architecture 원칙으로 선결하지 않는다.
- **Legacy sunk-cost bias 금지**: 과거 구현 유지가 새 모델을 더 복잡하게 만들면 제거를 우선 검토한다.
- **Unverified convenience assumption 금지**: Obsidian plugin/Fumadocs 기능을 문서나 실제 spike 없이 canonical capability로 가정하지 않는다.

## 10. Implementation session bootstrap

Engine/Site/Docs의 architecture migration을 수행하는 Agent는 다음 순서로 읽는다.

1. 이 문서
2. Architecture (`docs/architecture.md`)
3. Development Toolchain (`docs/development-toolchain.md`)
4. Repository Design & Maintenance (`docs/repository-design.md`)
5. Open Questions (`docs/open-questions.md`)에서 editor / layout / Site migration decision gate 확인
6. Content Authoring & Publishing Contract (`docs/content-authoring-contract.md`)
7. Release 1.0 (`docs/release-1.0.md`)
8. Implementation Map (`docs/implementation-map.md`)
9. Current Handoff (`handoff/current.md`)
10. 변경 대상 repository의 최신 Issue/branch/code/test

과거 Issue body나 branch code가 위 문서와 충돌하면 **현재 canonical Knowledge가 목표를 소유하고, 과거 구현은 migration input**으로 취급한다.

단, 실제 live repository state와 미push local work는 임의로 덮어쓰지 않는다.

## 10.5 Engine greenfield scratch build

Engine은 D032에 따라 **greenfield scratch build를 기본 migration 전략으로 확정**한다.

목표는 Git history를 지우는 것이 아니라 legacy source tree를 새 architecture의 template로 사용하지 않는 것이다.

원칙:

- same repository history를 보존한다.
- scratch implementation은 새 Issue-linked branch에서 시작한다.
- legacy branch/worktree의 미병합 작업은 먼저 보존한다.
- Vite+ toolchain과 repository orchestration은 새 global policy를 적용한다.
- Payload/PostgreSQL/Lexical/DB export task taxonomy를 새 skeleton에 복제하지 않는다.
- legacy에서 generic behavior를 가져올 때는 이유와 verification evidence를 남긴다.

우선 port 후보:

- process execution behavior
- concurrency/idempotency semantics
- evidence/revision linkage
- Site verification logic

Site는 현재 docs→Astro→Pages Evidence가 있으므로 같은 결정을 자동 적용하지 않는다. Site는 incremental Fumadocs integration을 우선 후보로 유지하고 별도 evidence로 판단한다.

## 11. Transition completion criteria

다음이 모두 충족되면 이 transition guide를 Active에서 Completed/Archived 상태로 바꿀 수 있다.

- Docs repository가 canonical content remote로 실제 운영된다.
- 실제 기존 content corpus가 Fumadocs/Site integration에서 검증되고, Obsidian/Fumadocs Editor의 역할이 명확히 결정된다.
- Engine target path가 Payload/PostgreSQL 없이 workspace를 검증·publish할 수 있다.
- Site가 새 canonical content revision을 실제 build/deploy한다.
- publish Evidence가 docs SHA + Engine/Site revision + delivery result로 연결된다.
- #13/#14와 관련 active backlog가 새 architecture로 re-scope되었다.
- legacy Payload/PostgreSQL runtime이 제거되거나 명시적으로 archive 상태로 격리되었다.
- Implementation Map이 새 main revisions 기준으로 다시 검증되었다.

<!-- END SOURCE: docs/architecture-transition.md -->


---

<!-- BEGIN SOURCE: docs/architecture.md -->

# Architecture

상태: 2026-09-21 Git-backed document workspace와 editor/integration 재검토 방향을 반영.

## 원칙

- 구현 작업보다 제품 결과와 시스템 책임을 기준으로 계획한다.
- 매 Iteration에 시연 가능한 결과를 남긴다.
- 핵심이 아닌 문제는 검증된 도구를 우선 활용한다.
- 안정된 경계가 필요해질 때까지 설계 선택의 변경 가능성을 유지한다.
- 레포와 프레임워크를 영구적인 제품 경계로 취급하지 않는다.
- canonical source는 특정 CMS/Visual Editor의 표현 능력에 종속되지 않는다.
- storage / editing / publishing / presentation을 서로 다른 계약으로 취급한다.
- canonical content를 표현하기 위해 별도 DB가 필요하지 않으면 도입하지 않는다.
- content authoring 도구는 canonical workspace 위의 교체 가능한 client로 취급한다.

## 레포의 역할

유일한 최상위 구현 레포는 없다. 이 지식 레포도 다른 레포를 포함하는 super-repository가 아니다.

| 레포 | 책임 |
|---|---|
| `oomia.github.io.engine` | local content workspace를 열고 검증하며 publish/Git/Site 검증 workflow를 orchestration하는 Engine |
| `oomia.github.io.docs` | document directory/tree와 assets의 durable Git remote 및 shared revision history. layout은 자유 tree부터 strict path/schema까지 구현 목적에 맞게 선택 가능하며 현재 Knowledge가 한 형태를 선결하지 않음 |
| `oomia.github.io` | canonical authoring revision에서 materialize된 publishable projection을 소비해 사이트를 빌드하고 GitHub Pages로 전달 |
| `oomia.github.io.knowledge` | 제품·아키텍처·계획 계약의 canonical knowledge |

`mono`는 사용자가 Site repository에 붙인 로컬 별칭이며 실제 원격 repository 이름의 일부가 아니다.

## Canonical content workspace

1.0의 canonical content representation은 **Git-backed filesystem document workspace**다. docs repository의 directory/path/layout 정책은 아직 확정하지 않는다. 완전 자유 tree, consumer별 discovery convention, strict application-specific layout 모두 유효한 구현 선택지다.

```text
Obsidian ──────────────┐
                      │
Fumadocs Editor ───────┼──> Authoring Draft
                      │      Markdown / MDX
Source editor / Agent ┘      partial frontmatter / assets
                                  │
                                  │ engine prepare
                                  ▼
                         Prepared Canonical Source
                                  │
                                  │ user review + git commit
                                  ▼
                         oomia.github.io.docs
                          canonical Git revision
                                  │
                                  │ deterministic projection
                                  ▼
                            Site consumer
                                  │
                                  ▼
                             Live Site
```

- local working tree는 작성 중인 draft와 uncommitted state를 포함할 수 있다. Engine `prepare`는 commit 전에 frontmatter-first persistent metadata를 보완해 Prepared Canonical Source를 만들 수 있다.
- 다른 환경과 공유·재현할 canonical revision은 `oomia.github.io.docs`의 Git commit으로 식별한다.
- 일반적인 publishable document는 Markdown/MDX와 frontmatter를 사용할 수 있다.
- consumer 또는 repository 자체가 필요하면 subtree 또는 repository-wide directory/path/frontmatter convention을 강제할 수 있다. 핵심은 어떤 layout도 사전에 금지하지 않고 실제 integration/maintenance 비용을 근거로 선택하는 것이다.
- asset은 workspace에서 참조 가능한 파일 또는 명시적으로 허용된 durable external reference로 관리한다. 상세 asset policy는 별도 contract로 발전시킬 수 있다.
- Git history가 content revision history, diff, rollback의 기본 수단이다.
- PostgreSQL/Payload state를 canonical content로 사용하지 않는다.

## Authoring boundary

authoring client 선택은 아직 확정하지 않는다. 기존 content corpus는 이미 Obsidian에서 작성되어 왔으므로 **Obsidian에서 기본 Markdown/file authoring이 가능한가**는 1.0의 주요 불확실성이 아니다.

현재 비교의 핵심은 다음이다.

- Obsidian을 primary editor로 유지했을 때 전체 authoring UX가 충분한가.
- Fumadocs Editor가 custom MDX component를 더 쉽게 주입·편집하는 데 실질적인 우위를 제공하는가.
- 선택한 editor와 Site/Fumadocs rendering layer가 동일 filesystem source를 불필요한 conversion 없이 공유할 수 있는가.
- editor 선택이 docs repository의 layout이나 canonical source를 과도하게 제한하지 않는가.

```text
                         Git-backed docs workspace
                      /              |              \
                     /               |               \
               Obsidian        Fumadocs Editor      IDE / Agent
             proven source UX   component-aware UX    source UX
                     \               |               /
                      \              |              /
                          integration boundary
                                |
                                v
                           Site consumer
```

Obsidian-specific custom syntax/CSS bridge는 1.0 필수 고려사항이 아니다. 향후 필요하면 별도 extension 문제로 다룬다.

Engine은 full CMS나 editor framework를 재구현하지 않는다.

## Engine boundary

Engine의 1.0 목표는 DB-backed CMS가 아니라 **stateless, invocation-driven, CLI-first one-shot workspace orchestrator**다.

```text
Engine CLI / one-shot container
├─ doctor / prepare / verify / publish
├─ workspace discovery
├─ content/frontmatter validation
├─ authoring-tool integration hooks
├─ publish validation
├─ Git/revision linkage
└─ Site consumer verification
          │
          └── bind mount / volume
                 local content repository
```

- Engine process는 command invocation마다 시작·종료하며 persistent application/job/session state를 소유하지 않는다.
- Engine image 자체의 ephemeral filesystem을 canonical storage로 사용하지 않는다.
- content repository는 host bind mount 또는 durable volume로 Engine에 제공한다.
- application-level user/database/auth model, HTTP server, job queue, long-running service lifecycle은 1.0의 필수조건이 아니다. 외부 공개나 remote control이 필요해질 때 같은 operation API 위에 별도 adapter를 추가한다.
- 검색·인덱싱·복잡한 query가 필요해지면 DB를 **derived index**로 추가할 수 있지만 canonical source를 대체하지 않는다.
- Payload, PostgreSQL, Lexical 기반 `cms-lab` 구현은 기존 실험/legacy Evidence로 취급하며 새 target architecture의 전제가 아니다.

## Publishing boundary

Publishing Platform은 DB state를 Markdown으로 export하지 않지만, **commit 전 canonical-source enrichment와 commit 후 Site-ready projection을 서로 다른 단계로 수행**한다.

```text
Authoring Draft
        ↓ engine prepare
Prepared Canonical Source
        ↓ user commit
committed docs source revision
        ↓ deterministic publishable projection
        ↓
projection validation
        ↓
actual Site sync / typecheck / build
        ↓
docs remote / exact source SHA
        ↓
Site revision linkage / delivery
```

- canonical authoring source와 Site-consumed projection은 다를 수 있다. persistent/user-meaningful metadata enrichment는 기본적으로 `prepare`에서 frontmatter에 반영하고, 재현 가능한 consumer-derived metadata는 committed revision에서 projection할 수 있다.
- publish 과정은 dirty source working tree를 자동 commit하지 않는다. committed docs revision과 선언된 metadata inputs를 입력으로 **projection 생성 + 검증 + remote/revision linkage + delivery**를 수행한다.
- `oomia.github.io.docs`의 commit SHA가 published content revision의 핵심 Evidence다.
- Site가 실제 docs revision을 소비해 성공적으로 빌드되는지가 최종 Publishability gate의 일부다.
- 동일 content revision의 재발행이 필요한 경우 idempotent하게 처리할 수 있어야 한다.

## Fumadocs boundary

Fumadocs는 **Site presentation/content processing**의 주요 재사용 후보이며, authoring에서는 custom component 주입과 structured visual editing의 편의 때문에 Obsidian과 비교 중인 후보다.

- Fumadocs UI/Core/MDX가 Site의 layout, search, Markdown/MDX processing, built-in/custom components를 단순화하면 우선 활용한다.
- Fumadocs Editor는 files를 source of truth로 유지하고 custom component specs를 제공하므로 Oomia-specific component authoring이 늘어날 경우 중요한 이점이 될 수 있다.
- Obsidian 기반 기존 corpus의 일반 authoring 호환성은 이미 확보되어 있으므로 1.0 spike의 초점은 Fumadocs integration과 editor 역할 결정에 둔다.
- Fumadocs Editor를 1.0 필수 editor로 미리 확정하지 않는다.

Fumadocs 자체 API가 canonical content contract는 아니다. canonical source와 docs layout은 editor 선택과 분리한다.

## Component contract

official/custom component 지원은 다음 순서로 판단한다.

1. Fumadocs built-in component로 요구사항을 충족할 수 있는지 확인한다.
2. built-in component라면 Engine/Fumadocs Editor/Site에서 필요한 integration만 구성한다.
3. custom component가 필요하면 canonical source에서 사용할 이름·props·children policy를 명시한다.
4. Engine authoring spec과 Site renderer가 동일 계약을 공유해야 할 정도가 되면 machine-readable profile 또는 shared package를 도입한다.
5. Visual adapter 유무와 Publishability를 동일시하지 않는다.

Content Component Manifest Schema (`docs/content-component-schema.md`)는 custom component 공유가 실제로 필요해질 때 사용할 수 있는 planning vocabulary로 유지하되 1.0 bootstrap의 필수 artifact는 아니다.

## Contract surfaces

| Surface | 소유 위치 |
|---|---|
| Content workspace / authoring / storage / publish 정책 | knowledge repository |
| Metadata enrichment / publishable projection contract | Publishable Projection (`docs/publishable-projection.md`) |
| Canonical content revision | `oomia.github.io.docs` Git history |
| Workspace validation / Git / publish orchestration | engine |
| Authoring UX | editor selection 미확정: Obsidian primary candidate, Fumadocs Editor component-aware candidate, IDE/Agent source client |
| Authoring/Site integration | shared filesystem source + 필요한 parser/remark/rehype/plugin adapters |
| final rendering / consumer compatibility | site |
| custom component shared contract | 필요 시 별도 profile/package |
| 구현별 API·테스트·runtime details | 해당 구현 repository |

Engine을 container image로 배포하는 방향은 이 architecture와 정합적이다. container는 실행 환경이고 canonical state는 mount된 Git-backed content workspace에 남긴다.

<!-- END SOURCE: docs/architecture.md -->


---

<!-- BEGIN SOURCE: docs/development-toolchain.md -->

# Development Toolchain — Vite+ First

상태: 2026-09-21 project-wide engineering policy.

이 문서는 Publishing Platform의 JavaScript/TypeScript repository에서 사용하는 **개발 도구의 전역 기본값**을 소유한다. 특정 repository가 다른 선택을 해야 한다면 그 이유와 차이를 해당 repository contract에 명시한다.

핵심 원칙:

> Vite+의 `vp`를 runtime, package management, static checks, tests, builds, workspace task orchestration, staged checks의 **기본 진입점**으로 사용한다. Vite+가 이미 제공하는 기능을 위해 별도의 wrapper/tool을 추가하지 않는다.

Vite+ official documentation:
- https://viteplus.dev/guide/
- https://viteplus.dev/guide/monorepo
- https://viteplus.dev/guide/run
- https://viteplus.dev/guide/env
- https://viteplus.dev/guide/commit-hooks
- https://viteplus.dev/guide/ci
- https://viteplus.dev/guide/docker

## 1. Command surface

### VP-first

가능하면 다음 명령을 직접 사용한다.

| 목적 | 표준 |
|---|---|
| environment 진단 | `vp env current`, `vp env doctor` |
| dependency install | `vp install` |
| dependency 추가/삭제 | `vp add`, `vp remove` |
| dependency 조사 | `vp why`, `vp info`, `vp outdated`, `vp list` |
| local binary | `vp exec` |
| one-shot package binary | `vp dlx` / `vpx` |
| static checks | `vp check` |
| formatting | `vp fmt` |
| lint | `vp lint` |
| Vitest | `vp test` |
| Vite app dev/build/preview | `vp dev`, `vp build`, `vp preview` |
| library/executable packaging | `vp pack` |
| repository task/script | `vp run <task>` / `vpr <task>` |
| staged checks | `vp staged` |

package-manager-specific 동작이 정말 필요할 때만 `vp pm <command>`을 escape hatch로 사용한다.

직접 `pnpm`, `npm`, `bun`, `yarn` 명령을 문서·스크립트·CI의 표준 interface로 만들지 않는다. 단, Vite+가 정상화하지 않는 package-manager-specific feature를 의도적으로 사용할 때는 예외를 허용한다.

### `vp <command>`와 `vp run <command>`을 혼동하지 않는다

Vite+ built-in command는 package script로 override되지 않는다.

예:

- `vp dev` → built-in Vite dev server
- `vp run dev` / `vpr dev` → package.json script 또는 Vite Task
- `vp build` → built-in Vite build
- `vp run build` → package-specific build script/task
- `vp test` → built-in Vitest
- `vp run test` → package-specific test script/task

따라서 Astro처럼 package script가 `astro dev` / `astro build`를 소유한다면 **`vpr dev` / `vpr build`**를 사용한다. bare `vp dev` / `vp build`가 framework script를 실행한다고 가정하지 않는다.

### `vpr`

`vpr`는 `vp run`의 공식 shorthand다.

프로젝트에서는 다음처럼 사용한다.

- 개발자가 반복적으로 실행하는 task: `vpr <task>`을 표준 shorthand로 허용한다.
- 설명 문서에서 task runner semantics를 처음 설명할 때는 `vp run`을 명시하고 이후 `vpr`를 사용할 수 있다.
- agent는 task 이름이 built-in과 충돌할 수 있으면 반드시 `vp run` / `vpr` 여부를 확인한다.

## 2. Runtime / package manager pinning

전역 VP 환경 관리와 repository reproducibility를 함께 사용한다.

- 개발자 machine에서는 Vite+ managed environment를 사용할 수 있다.
- 각 repository는 runtime과 package manager requirement를 repository 안에 선언한다.
- `vp env current` / `vp env doctor`가 실제 선택을 설명할 수 있어야 한다.
- CI와 Agent는 system Node/pnpm이 우연히 맞는다고 가정하지 않는다.

권장 우선순위:

1. Node 개발 runtime은 `.node-version` 또는 `devEngines.runtime`으로 명확하게 pin한다.
2. consumer support range가 필요하면 `engines.node`은 별도로 유지한다.
3. package manager는 가능한 한 top-level `packageManager`에 exact version을 pin한다.
4. `devEngines.packageManager`는 개발 환경 constraint 설명에 사용할 수 있다.
5. 두 declaration이 함께 있다면 서로 모순되지 않게 한다.

Vite+ global CLI가 project-local toolchain보다 새로울 수 있으므로 **global latest를 project behavior로 간주하지 않는다**.

## 3. Vite+ version policy

- `vite-plus` project dependency는 exact version을 사용한다.
- pnpm workspace에서는 root catalog에서 한 번만 pin하는 것을 기본으로 한다.
- Vite alias가 필요하면 Vite+가 요구하는 bundled core alias와 version을 함께 관리한다.
- toolchain version upgrade는 독립 Maintenance change로 수행한다.
- `vp migrate`를 일상적인 setup/repair command로 사용하지 않는다.

### `vp migrate` guard

`vp migrate`는 monorepo root의 dependency/config/catalog/lockfile/agent integration까지 변경할 수 있다. global VP가 더 최신이면 project Vite+를 그 버전으로 올릴 수도 있다.

따라서 Agent는 다음 경우에만 실행한다.

- Outcome이 Vite+ migration/upgrade 자체인 Issue
- 변경 전 Git 상태가 clean하거나 별도 branch에서 보존됨
- 변경 후 diff를 검토할 계획이 있음

단순 dependency install, lint 문제, PATH 문제를 해결하기 위해 `vp migrate`를 먼저 실행하지 않는다.

## 4. Root `vite.config.ts` ownership

Vite+ monorepo에서는 root `vite.config.ts`를 **toolchain policy의 단일 중심**으로 사용한다.

root가 우선 소유할 항목:

- `lint`
- `fmt`
- `check`
- `staged`
- shared `run.tasks`
- optional `create`
- shared cache policy

Vite+는 현재 nested lint/format config를 자동 적용하지 않으므로 package별 차이는 root의 `lint.overrides` / `fmt.overrides`로 표현한다.

package-level `vite.config.ts`는 다음과 같은 **실제 package/runtime config**를 소유할 수 있다.

- framework/Vite app config
- package-specific Vitest config
- package-specific build/pack config
- package runtime plugin

lint/fmt policy를 package마다 중복하지 않는다.

root config가 커지면 pure configuration object를 별도 file에서 import할 수 있지만, 모든 VP command가 config를 읽는다는 점을 고려해 top-level import에 side effect나 heavy plugin initialization을 넣지 않는다.

## 5. Task ownership

repository가 지저분해지는 가장 흔한 원인은 task가 여러 layer에 중복되는 것이다.

### package script가 적합한 경우

- package/framework가 고유 command를 요구함
- 예: `astro build`, custom Node service start
- task가 그 package의 public development interface임

### root Vite Task가 적합한 경우

- 여러 package를 orchestration함
- dependency ordering이 필요함
- cache/input/output/env contract가 필요함
- repository-wide verification/publishing/evidence workflow임

Vite Task는 workspace package의 실제 `dependencies` graph를 ordering에 사용한다. 별도의 가상 dependency graph를 만들지 않는다.

### naming

새 repository에서는 의미가 겹치는 alias를 늘리지 않는다.

권장 vocabulary:

- `check`: formatting + lint + type static gate
- `test`: automated behavior tests
- `build`: buildable artifact validation
- `verify`: repository-wide aggregate gate가 실제로 필요할 때만
- `publish`: external/repository state를 변경하는 explicit side-effect task
- `evidence`: verification result capture가 독립 outcome일 때

`ready`, `quality`, `validate`, `ci`, `check:all`처럼 같은 의미의 aggregate alias를 동시에 만들지 않는다.

## 6. Workspace task execution

표준 패턴:

- 현재 package: `vpr test`
- 모든 package: `vp run -r test`
- 특정 package: `vp run @scope/name#build`
- dependencies 포함: `vp run -t @scope/app#build`
- filter: `vp run --filter ./apps/engine test`
- package cwd에서 실행: `vp -C apps/engine <command>`

package를 실제 cwd처럼 취급해야 하면 positional Vite root 인자보다 `-C`를 우선한다.

## 7. Caching

cache는 **순수하거나 재현 가능한 task에 적극 사용**한다.

기본 cache 후보:

- compile/build
- unit test
- lint/static analysis
- deterministic code generation

기본 `cache: false` 후보:

- Git commit/push/tag
- publishing/deployment
- external service mutation
- interactive server
- environment setup
- credential-dependent state check
- Evidence가 현재 external state를 관찰해야 하는 task

Vite Task는 task config는 기본 cache 대상이고 package.json script는 기본적으로 cache되지 않는다.

cacheable task가 environment에 의존하면 `env`를 cache fingerprint에 명시한다. 단순 전달만 필요하고 output 의미를 바꾸지 않는 변수는 `untrackedEnv`를 검토한다.

CI에서 Vite Task cache 공유는 현재 experimental이므로, 먼저 local immediate second-run cache hit가 재현되는지 확인한 후 도입한다.

## 8. Static quality gate

`vp check`를 JavaScript/TypeScript static gate의 기본으로 사용한다.

root config에서 기본적으로:

- Oxfmt
- Oxlint
- type-aware lint
- type checking

을 함께 사용한다.

Vite+가 권장하는 `lint.options.typeAware: true`, `typeCheck: true`를 기본값으로 삼되 실제 TypeScript project structure가 호환되는지 검증한다.

Prettier/ESLint를 Vite+가 처리할 수 있는 영역에 병렬로 유지하지 않는다.

예외:

- Oxfmt가 지원하지 않는 plugin behavior가 실제 requirement일 때
- framework file support가 실제로 부족하다고 검증됐을 때

Oxfmt는 현재 Markdown/MDX를 포함한 다수 format을 지원한다. 별도 Prettier 사용은 “예전에 필요했다”가 아니라 **현재 gap**으로 증명한다.

## 9. Git hooks

새 repository에서는 Husky + lint-staged 대신 Vite+ native path를 기본으로 한다.

```text
.vite-hooks/pre-commit
  -> vp staged
```

`vite.config.ts`의 `staged` block이 staged checks를 소유한다.

- `vp hooks status`로 local clone 상태를 확인한다.
- `vp hooks enable` / `disable`로 dispatcher를 관리한다.
- generated dispatcher는 commit하지 않고 project-owned hook만 commit한다.
- automation/content commit처럼 hook을 의도적으로 건너뛰어야 할 때는 `VP_GIT_HOOKS=0`을 명시적으로 사용한다.

기존 Husky repository는 한 번에 강제 migration하지 않는다. parity를 검증한 뒤 기존 hook dependency/config를 제거한다.

## 10. Evidence output

재현 가능한 evidence/log 수집 task는 ANSI/color에 의존하지 않는다.

프로젝트 기존 정책대로 evidence collector/task 내부에서 `NO_COLOR=1`을 강제한다. Vite+도 `NO_COLOR`를 지원한다.

개발자의 일반 shell 전체에서 color를 끄는 것이 아니라 **evidence-producing boundary에서만** 적용한다.

## 11. CI

GitHub Actions에서는 Vite+ official `voidzero-dev/setup-vp`를 사용한다.

규칙:

- action version은 exact release 또는 commit SHA로 pin한다.
- obsolete floating `v1` tag를 사용하지 않는다.
- 별도 `setup-node` + pnpm setup + package cache chain이 필요하지 않으면 중복하지 않는다.
- install은 `vp install --frozen-lockfile`을 기본으로 한다.
- static gate는 `vp check`.
- package tests/build는 monorepo task ownership에 따라 `vp test` 또는 `vp run -r test/build`를 사용한다.

Vite Task result cache의 cross-run restore는 experimental이므로 correctness보다 먼저 최적화하지 않는다.

## 12. Docker

Vite+ official image는 build/CI/devcontainer에 사용할 수 있지만 production runtime image로 사용하지 않는다.

Engine container는 multi-stage를 기본으로 한다.

1. Vite+ build stage에서 install/check/test/build/pack
2. runtime stage에는 실제 runtime과 artifact/production dependency만 포함

이렇게 하면 project toolchain이 production image surface에 불필요하게 남지 않는다.

## 13. IDE

VS Code 계열에서는 Vite+ / Oxc workspace integration을 우선한다.

- Oxc formatter/linter
- nested config disable
- format on save
- 필요하면 `npm.scriptRunner: "vp"`

목표는 CLI, editor, CI가 서로 다른 formatter/linter 설정을 읽지 않게 하는 것이다.

## 14. Agent instructions

Agent가 Vite+ repository를 다룰 때 최소한 다음을 알아야 한다.

1. `vp <built-in>`과 `vp run <script/task>`의 차이
2. 작업 시작 전 `vp install`
3. 환경 이상 시 `vp env doctor`
4. static gate는 `vp check`
5. package-specific 추가 gate는 `vp run` / `vpr`
6. direct package-manager/tool binary 호출보다 VP command surface 우선

Vite+의 `vp config`는 agent integration까지 변경할 수 있다. Publishing Platform은 Knowledge와 repository-specific Agent 지침을 별도로 관리하므로 단순 hook setup을 위해 agent file을 자동 수정하지 않는다.

필요하면:

```sh
vp config --no-agent
```

처럼 실행하고 agent integration 변경은 별도 diff로 검토한다.

## 15. Anti-patterns

새 구현에서 피한다.

- Vite+ + Turbo를 같은 역할의 root task runner로 중복 도입
- Vite+ hooks + Husky를 같은 pre-commit 경로에 중복 유지
- root lint/fmt와 package별 lint/fmt config drift
- 모든 command를 package.json wrapper script로 다시 감싸기
- `vp dev`가 package의 `dev` script라고 가정
- stateful publish/Git mutation task를 cache
- global latest Vite+ behavior에 기대고 project version을 pin하지 않기
- troubleshooting을 위해 무조건 `vp migrate` 실행
- repo-specific agent instructions를 `vp config`가 무검토로 덮어쓰게 두기

## 16. Current repository implications

### Engine

현재 Engine은 Vite+를 이미 사용하지만 task taxonomy가 legacy architecture에 결합되어 있다.

예:
- `db:*`
- `cms:*`
- DB-based `docs:publish`

scratch build에서는 이 task set을 이어받지 않는다.

VP 자체와 다음 종류의 정책만 재사용한다.

- root lint/fmt/check
- catalog/pinning model
- workspace task execution
- evidence `NO_COLOR`
- generic verification

### Site

현재 Site는 Vite+와 Turbo를 함께 사용한다.

새 policy에서는 VP가 default task runner다. Turbo는 즉시 삭제하지 않지만 **새 workflow가 Turbo dependency를 확대하지 않는다**. VP recursive/filter/cache가 현재 Turbo usage를 대체할 수 있는지 별도 parity migration으로 검증한 뒤 정리한다.

## External references reviewed

- Vite+ Getting Started: https://viteplus.dev/guide/
- Vite+ Monorepo: https://viteplus.dev/guide/monorepo
- Vite+ Run: https://viteplus.dev/guide/run
- Vite+ Task Caching: https://viteplus.dev/guide/cache
- Vite+ Environment: https://viteplus.dev/guide/env
- Vite+ Package Management: https://viteplus.dev/guide/install
- Vite+ Check: https://viteplus.dev/guide/check
- Vite+ Commit Hooks: https://viteplus.dev/guide/commit-hooks
- Vite+ CI: https://viteplus.dev/guide/ci
- Vite+ Docker: https://viteplus.dev/guide/docker
- Vite+ IDE Integration: https://viteplus.dev/guide/ide-integration
- Vite+ Migrate: https://viteplus.dev/guide/migrate
- Oxfmt language support: https://oxc.rs/docs/guide/usage/formatter/language-support

<!-- END SOURCE: docs/development-toolchain.md -->


---

<!-- BEGIN SOURCE: docs/repository-design.md -->

# Repository Design & Maintenance

상태: 2026-09-21 project-wide engineering policy.

이 문서는 Publishing Platform의 implementation repository를 **오래 유지하기 쉽게 만드는 구조 원칙**을 소유한다. 특정 framework의 boilerplate를 복제하는 문서가 아니라, Engine/Site와 향후 package/tooling repository에 공통으로 적용할 boundary와 hygiene를 정의한다.

조사한 공통 패턴:

- Vite+는 root config와 실제 workspace dependency graph를 중심으로 monorepo task를 구성한다.
- pnpm은 workspace package dependency를 `workspace:` protocol로 명시하고 shared dependency version은 catalog로 중앙 관리할 수 있다.
- Astro는 코드 구조를 실행 context와 책임에 따라 `core`, `runtime/client`, `runtime/server`처럼 나눈다.
- 성숙한 대형 monorepo도 `apps` / `packages` 또는 역할별 package를 사용하지만, package 수 자체를 목표로 삼지는 않는다.

핵심 원칙:

> directory는 기술 이름보다 **실행 단위와 소유 책임**을 표현한다. package는 재사용 가능성, dependency boundary, 독립 검증 또는 배포 경계가 실제로 존재할 때만 만든다.

## 1. Default workspace shape

JavaScript/TypeScript implementation repository의 기본 shape는 다음을 사용한다.

```text
/
├─ apps/        # independently runnable/deployable programs
├─ packages/    # reusable libraries with explicit dependency boundaries
├─ tools/       # repository-development-only tools/generators
├─ .github/     # CI / repository automation
├─ vite.config.ts
├─ pnpm-workspace.yaml
├─ package.json
└─ tsconfig.json
```

모든 directory가 처음부터 존재할 필요는 없다.

### apps

`apps/*`에 둘 조건:

- 독립적으로 실행할 수 있음
- container/process/UI/CLI처럼 runtime entry point가 있음
- 다른 app과 lifecycle이 다름

### packages

`packages/*`에 둘 조건 중 하나 이상:

- 두 개 이상의 app/package가 실제로 사용함
- 독립 dependency boundary가 중요함
- 별도 unit/API contract로 검증하는 것이 명확함
- library artifact로 pack/publish할 가능성이 실제로 있음
- execution context를 분리해야 함

단순히 파일이 많아졌다는 이유로 package를 만들지 않는다.

### tools

`tools/*`는 제품 runtime에 포함되지 않는 repository 개발 도구다.

예:

- code generator
- fixture generator
- migration helper
- release/evidence utility
- local developer diagnostics

한 번만 쓰는 20줄 script를 전부 package로 만들 필요는 없지만, root `scripts/`가 장기적으로 기능 dump가 되지 않게 한다.

## 2. Monorepo-ready, package-light

scratch repository는 처음부터 workspace를 사용할 수 있지만 package proliferation은 피한다.

예를 들어 새 Engine은 다음처럼 시작할 수 있다.

```text
/
├─ apps/
│  └─ engine/
├─ packages/   # initially empty or absent
└─ tools/      # actual need appears later
```

이 구조는 향후 package 분리를 쉽게 하면서도 첫날부터 `core`, `utils`, `infra`, `shared`를 추측해 만들지 않는다.

## 3. Avoid catch-all packages

다음 이름은 쉽게 책임이 흐려지므로 기본적으로 만들지 않는다.

- `utils`
- `common`
- `shared`
- `helpers`
- `infra`

이름 자체가 금지되는 것은 아니다. 다만 생성하려면 “어떤 dependency boundary를 소유하는가?”에 명확히 답할 수 있어야 한다.

예를 들어 process execution이 Engine과 별도 tool에서 모두 필요해 실제 contract가 생겼다면 `packages/process`처럼 구체적인 capability package를 고려할 수 있다.

두 번째 consumer가 아직 없다면 app 내부에 둔다.

## 4. Dependency direction

workspace dependency는 `package.json`의 실제 dependency로 표현한다.

pnpm workspace 내부 dependency는 가능한 한:

```json
{
  "dependencies": {
    "@oomia/example": "workspace:*"
  }
}
```

처럼 local-only intent를 명시한다.

이 dependency graph가 Vite+ task ordering에도 사용되므로 별도의 task-runner 전용 graph를 만들지 않는다.

순환 dependency가 생기면 task runner 설정으로 감추지 않고 package boundary를 다시 검토한다.

## 5. Dependency versions

여러 workspace package가 공유하는 third-party dependency는 root `pnpm-workspace.yaml` catalog에 둘 수 있다.

catalog를 사용할 기준:

- 여러 package가 같은 version policy를 공유함
- upgrade를 한 곳에서 관리하는 것이 유리함
- peer/runtime mismatch를 피해야 함

한 package에서만 쓰는 작은 dependency까지 무조건 catalog에 넣어 catalog를 dependency dump로 만들 필요는 없다.

Vite+, TypeScript, common runtime/framework처럼 **workspace-wide toolchain/compatibility version**은 catalog에 두는 편을 우선한다.

## 6. Root package responsibility

root package는 private orchestration package다.

root에는 제품 business logic을 두지 않는다.

root가 소유할 수 있는 것:

- workspace metadata
- Vite+ config
- TypeScript base config
- package-manager policy
- repository-wide tasks
- CI/hook integration

root `package.json` scripts는 최소화한다.

Vite+ built-in 또는 `vp run` task를 단순히 다시 alias하는 script를 무분별하게 추가하지 않는다.

## 7. Configuration ownership

가능하면 config source를 하나로 만든다.

- lint/fmt/check/staged → root Vite+ config
- package manager/workspace/catalog → `pnpm-workspace.yaml`
- TS shared compiler policy → root/base tsconfig
- framework runtime config → owning app/package
- CI → `.github/workflows`

동일 설정을 root와 package에 복사해 “어느 것이 적용되는지” Agent가 추론하게 만들지 않는다.

## 8. Co-location

코드는 소비 책임과 가까이 둔다.

package 내부 기본 예:

```text
src/
tests/
package.json
tsconfig.json
```

작은 package는 과도한 layer directory를 만들지 않는다.

다음과 같은 layer를 구현 전에 생성하지 않는다.

```text
controllers/
services/
repositories/
domain/
application/
infrastructure/
adapters/
ports/
```

실제 책임이 분리될 때 이름을 부여한다.

## 9. Execution-context boundaries

Astro repository의 구조에서 참고할 수 있는 좋은 원칙은 **같은 제품이라도 실행되는 context가 다르면 코드 경계를 분명히 하는 것**이다.

Engine에서도 다음 차이가 실제로 생기면 directory/package boundary 후보가 된다.

- host filesystem / Git access
- container runtime
- pure validation/domain logic
- child process execution
- browser/editor integration
- Site verification adapter

기술 패턴 이름을 먼저 선택하지 않고 “이 코드는 어디에서 실행되고 어떤 capability를 허용하는가?”로 분리한다.

## 10. Tests

test는 가능한 한 owning code와 가까이 둔다.

권장:

- unit test → app/package 내부
- package integration → package 내부
- cross-repository/system integration → 명확한 integration/e2e location
- fixture → 해당 test의 owner와 가까이

root `tests` 하나에 모든 레벨의 test를 섞지 않는다.

실제 content corpus는 authoring/Site integration Evidence로 사용할 수 있지만, edge-case regression fixture와 역할을 구분한다.

## 11. Repository documentation

Knowledge repository와 implementation repository가 같은 내용을 두 번 소유하지 않는다.

Knowledge가 소유:

- product architecture
- cross-repo contract
- migration direction
- global engineering policy

implementation repo가 소유:

- 실제 command
- package/runtime API
- local setup
- debugging
- test/evidence reproduction

따라서 implementation repository의 다음 종류 문서는 장기적으로 최소화한다.

- 중복 architecture prompt
- 오래된 전체 TODO
- 별도의 상태 원장
- Knowledge와 다른 decision history

필요한 local ADR은 실제 code-specific decision에 한정하고 Knowledge cross-repo decision과 서로 link한다.

## 12. Agent context

Agent용 root instruction은 짧고 실행 가능해야 한다.

포함:

- Knowledge canonical link / transition guide
- repository role
- standard VP commands
- current verification gate
- destructive migration safety
- local code ownership rules

포함하지 않음:

- 장문의 오래된 product history
- superseded architecture
- copy-pasted entire Knowledge
- 이미 존재하지 않는 service/DB commands

repository-local Agent 지침에 superseded architecture나 존재하지 않는 service/task가 남아 있으면 scratch/migration 구현 전에 먼저 교체한다. live stale-file 여부는 `handoff/current.md`에서 추적한다.

## 13. Generated and local state

generated/local state를 source tree와 섞지 않는다.

예:

- `dist/`
- caches
- evidence runtime output
- temporary cloned workspace
- container state
- credentials

필요한 경우 `.state/`, temporary directory 또는 configured external workspace를 사용하고 `.gitignore` ownership을 명확히 한다.

canonical content 자체는 Engine repository 내부 generated directory가 아니라 external/mounted docs workspace로 취급한다.

## 14. Scratch-build policy for Engine

현재 Engine은 legacy CMS architecture coupling이 강하므로 **greenfield scratch target을 기본 migration 전략으로 채택한다.**

의미:

- Git history와 legacy revision은 보존한다.
- 기존 source tree를 새 architecture의 directory template로 사용하지 않는다.
- 새 branch에서 target architecture 기준 skeleton을 만든다.
- legacy code는 검토 후 필요한 부분만 의도적으로 port한다.
- “삭제하고 다시 쓰기”와 “history를 지우기”를 동일시하지 않는다.

우선 port 후보:

- process execution abstraction이 실제로 유용하면 해당 부분
- concurrency/idempotency behavior
- evidence/revision linkage
- Site verification logic

port하지 않는 기본값:

- Payload UI
- PostgreSQL lifecycle
- Lexical codec
- DB export
- legacy CMS task taxonomy

## 14.5 Engine runtime shape

D035에 따라 Engine 1.0은 long-running service가 아니라 one-shot CLI runtime이다.

권장 adapter/application 분리:

```text
apps/engine/src/
├─ cli.ts
├─ commands/
│  ├─ doctor.ts
│  ├─ prepare.ts
│  ├─ verify.ts
│  └─ publish.ts
└─ engine/
   ├─ doctor.ts
   ├─ prepare.ts
   ├─ verify.ts
   └─ publish.ts
```

`commands/*`는 CLI argument/input/output adapter이고, `engine/*`는 실제 operation을 소유한다. 향후 HTTP/API가 필요해져도 operation API 위에 adapter를 추가할 수 있게 CLI parsing, stdout/stderr, process exit를 core operation 안으로 침투시키지 않는다.

1.0에서 만들지 않는 것:

- HTTP server
- request router
- job queue
- publish job database
- server-side progress/session store
- cancellation API

`prepare`는 mounted docs workspace에 write access가 필요하고, `verify`는 원칙적으로 source read-only로 동작할 수 있다. `publish`는 committed source를 수정하지 않지만 remote Git/Site linkage를 변경할 수 있다.

one-shot container는 command invocation 단위로 실행·종료한다. persistent state는 mounted Git workspace, remote Git, Site repository, Evidence artifact에 둔다.

## 15. Engine scratch initial shape

초기 proposal:

```text
/
├─ apps/
│  └─ engine/
│     ├─ src/
│     └─ tests/
├─ .github/
├─ .vite-hooks/
├─ package.json
├─ pnpm-workspace.yaml
├─ tsconfig.json
└─ vite.config.ts
```

`packages/*`와 `tools/*`는 실제 extraction point가 확인될 때 추가한다.

첫 구현부터 다음처럼 나누지 않는다.

```text
packages/
├─ core
├─ git
├─ workspace
├─ process
├─ validation
└─ utils
```

이들은 architecture diagram의 개념이지 반드시 npm/workspace package여야 하는 것은 아니다.

## 16. Site migration implication

Site는 이미 docs consumption → Astro build → GitHub Pages delivery Evidence가 있으므로 Engine과 달리 greenfield를 기본값으로 하지 않는다.

- Astro structure는 유지 가능
- Fumadocs integration은 incremental spike
- Turbo는 Vite+ task parity가 확인될 때 단계적으로 제거 가능
- generic `packages/ui`, `packages/md`는 실제 새 responsibility와 맞는지 integration 과정에서 재검토

## 17. Maintenance checklist

새 directory/package/tool을 추가하기 전에 묻는다.

1. 독립 runtime인가?
2. 둘 이상의 consumer가 있는가?
3. dependency boundary가 필요한가?
4. 별도 test/build/release lifecycle이 있는가?
5. 기존 owner 안에 두면 실제 문제가 생기는가?

5개 모두 아니라면 새 package를 만들 이유가 약하다.

새 tool을 추가하기 전에 묻는다.

1. Vite+가 이미 제공하는가?
2. pnpm/workspace 기능으로 충분한가?
3. platform-native Git/GitHub 기능으로 충분한가?
4. 기존 dependency를 재사용할 수 있는가?

비핵심 문제는 새 구현보다 기존 도구와 요구사항 조정을 우선한다.

## External references reviewed

- Vite+ Monorepo: https://viteplus.dev/guide/monorepo
- Vite+ Run: https://viteplus.dev/guide/run
- Vite+ Create/Generators: https://viteplus.dev/guide/create
- pnpm Workspaces: https://pnpm.io/workspaces
- pnpm Catalogs: https://pnpm.io/catalogs
- Astro CONTRIBUTING / code structure: https://github.com/withastro/astro/blob/main/CONTRIBUTING.md
- Vite+ repository: https://github.com/voidzero-dev/vite-plus
- Payload monorepo (large-repo comparison, not target architecture): https://github.com/payloadcms/payload

<!-- END SOURCE: docs/repository-design.md -->


---

<!-- BEGIN SOURCE: docs/content-authoring-contract.md -->

# Content Authoring & Publishing Contract

상태: 2026-09-21 Git-backed document workspace와 editor-selection/integration 재검토 방향을 canonical policy로 반영.

## 목적

Publishing Platform의 canonical content는 특정 CMS, database, Visual Editor의 내부 표현에 종속되지 않는다.

공식 정책:

> Canonical content는 Git-backed filesystem document workspace에 보존한다. working-tree draft는 Engine `prepare`에 의해 frontmatter-first persistent metadata가 보완될 수 있고, 사용자가 검토·commit한 상태가 durable canonical revision이 된다. docs layout은 free-form부터 strict convention까지 구현 목적에 맞게 선택할 수 있으며 현재 어느 쪽도 선결하지 않는다. authoring editor는 아직 확정하지 않고 기존 Obsidian corpus와 Fumadocs/Site integration을 통해 역할을 결정한다. durable shared canonical revision은 `oomia.github.io.docs` Git commit으로 식별하며, Publishability는 특정 editor의 round-trip 가능 여부가 아니라 consumer contract와 실제 Site 검증으로 판정한다.

이 문서는 **Editing, Storage, Canonical Revision, Projection, Publishing**을 분리해 정의한다.

## Editing

| 수준 | 보장 |
|---|---|
| Visual | Fumadocs Editor 등 구조화된 visual authoring surface에서 생성·수정할 수 있다. |
| Source | Obsidian, IDE, Agent 등 source-oriented client에서 raw Markdown/MDX를 손실 없이 수정할 수 있다. |
| Unsupported | 특정 authoring client에서는 편집하지 못하지만 canonical source 자체가 반드시 거부되는 것은 아니다. |

Visual 지원 실패가 content 지원 실패를 뜻하지 않는다.

- Fumadocs Editor가 무손실로 표현하지 못하는 source는 Obsidian/IDE 등 source client에서 유지할 수 있어야 한다.
- 외부 editor에서 수정한 source를 Visual Editor가 다시 열었을 때 표현 불가능한 내용을 조용히 삭제하거나 재작성해서는 안 된다.
- 최종 Site와 동일한 WYSIWYG preview는 authoring contract의 필수조건이 아니다.

## Storage

| 수준 | 보장 |
|---|---|
| Preserved | 사용자가 명시한 content와 metadata의 의미를 보존한다. byte-for-byte 동일성은 contract가 아니다. |
| Normalized | Editor, VP formatter/linter 또는 선택한 tooling이 의미를 유지하는 범위에서 source formatting을 정규화할 수 있다. |
| Reject | workspace/file contract 자체를 만족하지 못하거나 안전하게 파일로 보존할 수 없는 경우에만 저장을 거부한다. |

기본 원칙:

- source-oriented editing도 byte-exact 보존을 요구하지 않는다. 사용자가 명시한 의미와 explicit frontmatter value를 보존하는 것이 우선이다.
- visual/editor/formatter-specific tooling의 **Normalized** output을 허용하며, format/lint에 따른 일관된 source 변화 자체는 실패가 아니다.
- Markdown/MDX 문법 오류나 현재 Site가 지원하지 않는 expression은 draft file로 저장할 수 있고 publish 단계에서 Blocked될 수 있다.
- storage contract는 DB schema나 rich-text serialization compatibility를 요구하지 않는다.

## Canonical revision

canonical content의 물리적 표현은 local Git working tree의 files다. 다만 working tree의 모든 draft가 곧 durable canonical revision인 것은 아니며, `prepare`와 user review를 거쳐 commit된 상태가 공유 가능한 canonical revision이 된다.

- Markdown/MDX-like document source는 파일 내용 자체다.
- frontmatter는 publishable Article-like documents의 유력 metadata representation이다. repository 또는 consumer가 strict schema를 선택할 수 있고, 반대로 일부 path는 schema 밖에 둘 수도 있다. 어느 형태를 택할지는 layout decision에 따른다.
- asset은 workspace-relative file 또는 정책상 허용된 durable external reference로 표현한다.
- uncommitted working tree는 작성 중 draft state다.
- 다른 환경과 공유·재현하는 durable canonical state는 `ooMia/oomia.github.io.docs`의 commit SHA다.
- Git commit/history가 기본 revision, diff, rollback, provenance mechanism이다.

따라서 `oomia.github.io.docs`는 generated projection이 아니라 **canonical content remote**다.

## Prepare

`prepare`는 **commit 전 source-mutating operation**이다.

- document-local persistent metadata의 기본 저장소는 frontmatter다.
- Engine이 자동 생성 가능한 값은 정책에 따라 frontmatter에 materialize할 수 있다.
- existing explicit frontmatter value가 있으면 Engine은 해당 field를 재계산하거나 덮어쓰지 않는다.
- unset/missing field를 어떻게 채울지와 unresolved UX는 Engine 구현이 선택한다.
- formatting/serialization normalization은 허용하지만 사용자가 명시한 content/metadata 의미를 임의로 바꾸지 않는다.
- Git stage/commit/push는 하지 않는다.

`prepare` 이후 사용자가 diff를 검토하고 필요한 값을 조정한 뒤 commit한다.

## Projection

Canonical authoring source와 Site가 소비하는 publishable document는 동일할 필요가 없다.

projection은 다음 입력을 deterministic하게 composition할 수 있다.

- source document
- inline frontmatter
- sidecar/reference metadata
- repository/consumer defaults
- content/Git에서 유도한 deterministic metadata
- 명시적인 publish-time override

Engine은 source를 불필요하게 mutation하지 않고 publishable projection을 materialize한다. projection은 재생성 가능한 derived artifact이며 새 SoT가 아니다.

구체적인 metadata 위치, precedence, document identity/linkage, materialization 위치는 Publishable Projection & Metadata Enrichment Contract (`docs/publishable-projection.md`)가 소유한다.

## Publishing

| 수준 | 보장 |
|---|---|
| Publishable | 현재 workspace content가 validation과 실제 Site consumer 검증을 통과하고 canonical docs revision으로 확정될 수 있다. |
| Blocked | source는 workspace에 보존되지만 현재 publishing contract를 만족하지 않는다. 실패 이유를 관찰 가능하게 제공한다. |

Visual editing compatibility는 Publishability의 필수조건이 아니다.

목표 흐름:

```text
committed docs source revision
        ↓
metadata resolve / enrichment
        ↓
publishable projection materialization
        ↓
projection validation
        ↓
actual Site consumer build
        ↓
revision linkage / delivery
```

Publishing은 DB snapshot export가 아니다. 그러나 **metadata enrichment와 deterministic projection materialization은 핵심 product behavior**다. source revision과 projection을 구분하며, Site는 projection contract를 만족하는 입력을 소비한다.

## 1.0 목표 정책 테이블

| 콘텐츠 유형 | Editing | Storage | Publishing | 1.0 기본 정책 |
|---|---|---|---|---|
| 기본 Markdown | Source + 필요 시 Visual | Preserved / Normalized | Publishable | 선택된 editor와 Site가 같은 file을 손실 없이 공유해야 한다. |
| 일반 GFM table | Visual 또는 Source | Preserved / Normalized | Publishable | Visual 지원 수준이 source 보존 범위를 제한하지 않는다. |
| Fumadocs Editor가 표현하지 못하는 Markdown | Source | Preserved | Publishable | 실제 Site가 지원하면 발행할 수 있다. |
| 임의 code fence language | Visual 또는 Source | Preserved | Publishable | syntax highlighting 지원 여부와 storage/publishability를 분리한다. |
| 일반 Markdown image | Visual 또는 Source | Preserved | Publishable | 별도 Media DB object로 강제 변환하지 않는다. |
| workspace-relative asset | Visual 또는 Source | Preserved | Publishable | repository portability와 Site asset resolution contract를 따라야 한다. |
| durable external asset URL | Visual 또는 Source | Preserved | Publishable | 허용 scheme/domain과 portability policy를 따른다. |
| raw HTML | Source | Preserved | Site policy에 따라 Publishable/Blocked | Visual 지원과 실행 허용을 분리한다. |
| Obsidian-native callout / styled Markdown primitive | Visual 또는 Source | Preserved / Normalized | Publishable | Obsidian authoring UX와 Site remark/renderer mapping을 우선 검토한다. |
| Fumadocs built-in MDX component | Visual 또는 Source | Preserved / Normalized | Publishable | Site에서는 우선 재사용하되 canonical source syntax로 직접 사용할지는 Obsidian interoperability와 함께 판단한다. |
| custom MDX component + visual spec | Visual | Normalized | Publishable | 명시된 component contract와 Site consumer 검증을 통과해야 한다. |
| custom MDX component + visual spec 없음 | Source | Preserved | Publishable 가능 | visual adapter 부재만으로 차단하지 않는다. |
| contract에 없는 MDX component | Source | Preserved | Blocked | source는 보존하되 현재 Site contract가 없으면 발행하지 않는다. |
| 잘못된 component props | Source | Preserved | Blocked | file 저장과 publish validation을 분리한다. |
| arbitrary JavaScript expression | Source | Preserved | Blocked by default | 명시적 지원 계약 전에는 executable content를 publish contract 밖에 둔다. |
| 문서 내부 임의 import/export | Source | Preserved | Blocked by default | document별 arbitrary dependency를 기본 허용하지 않는다. |
| 문법 오류가 있는 draft | Source | Preserved | Blocked | draft source는 저장 가능하며 publish에서 차단한다. |

## Authoring clients

editor는 아직 확정하지 않는다. 1.0의 고정 계약은 **filesystem source가 editor보다 우선한다**는 점이다.

### Obsidian

기존 content corpus가 이미 Obsidian 기반으로 작성되어 있으므로 basic Markdown/file authoring compatibility는 1.0의 주요 불확실성이 아니다.

Obsidian은 다음 경우 primary editor 후보로 충분하다.

- 일반 Markdown/source 작성
- file navigation / rename / create / delete
- Properties/frontmatter
- 기존 사용자 authoring workflow 유지

Obsidian-native custom syntax, CSS snippet, plugin-based rich rendering은 향후 확장 수단일 수 있지만 **1.0 필수 contract가 아니다**.

### Fumadocs Editor

Fumadocs Editor는 custom MDX component 주입과 structured visual editing을 쉽게 제공할 수 있다는 점 때문에 중요한 후보다.

검증할 핵심:

- 기존 Obsidian corpus를 같은 filesystem source로 다룰 수 있는가
- custom component를 정의하고 authoring UI에 노출하는 비용이 낮은가
- external edit와 visual edit 사이에서 source loss나 과도한 normalization이 없는가
- Obsidian을 primary editor로 유지하는 경우보다 실제 UX/DX가 개선되는가

Fumadocs Editor 내부 state는 canonical source를 대체하지 않는다.

### Site integration

Site presentation은 Fumadocs UI/Core/MDX를 적극 재사용할 수 있다. authoring editor와 Site renderer는 같은 product choice일 필요가 없다.

예:

- Obsidian primary editor + Fumadocs Site
- Obsidian + optional Fumadocs Editor + Fumadocs Site
- Fumadocs Editor 중심 + Fumadocs Site

중 어떤 구성이 적합한지는 existing corpus와 custom component authoring evidence로 결정한다.

### Engine

Engine은 1.0에서 full CMS나 editor framework가 아니다.

- workspace discovery / validation
- selected layout/convention validation
- Git status / revision linkage
- explicit publish action
- Site consumer verification
- 필요한 경우 authoring-tool launcher/integration hook

를 담당한다.

Payload/PostgreSQL/Lexical 기반 CMS는 target architecture가 아니며 기존 실험/legacy implementation으로만 취급한다.

## Metadata contract

publishable Article-like document의 metadata는 frontmatter를 기본 후보로 둔다. docs layout 결정에 따라 repository-wide 또는 subtree-specific schema를 강제할 수 있다.

최소 공통 예:

```yaml
---
title: Example
description: Optional summary
author: mia
draft: true
---
```

정확한 required/optional field schema와 적용 범위는 선택된 docs layout/consumer contract에서 정의한다. DB field와 frontmatter를 서로 변환하는 dual-SoT 모델은 만들지 않는다.

외부 source에서 import할 경우 canonical frontmatter로 normalize할 수 있지만 import adapter의 source-specific metadata를 장기 SoT로 유지하지 않는다.

## Component contract

Fumadocs built-in component를 우선 활용한다.

- built-in component의 이름/props를 그대로 canonical syntax로 사용할 수 있는 경우 불필요한 wrapper를 만들지 않는다.
- 플랫폼에서 허용할 component subset이 필요하면 supported profile을 명시한다.
- custom component가 필요하면 name / props / children / source semantics를 먼저 정의한다.
- Engine authoring spec과 Site renderer가 shared runtime contract를 필요로 할 때만 manifest 또는 shared package를 도입한다.
- 별도 `@oomia/content-components` renderer library는 1.0 필수조건이 아니다.

Content Component Manifest Schema (`schemas/content-component-manifest.schema.json`)는 custom component contract가 실제로 필요해질 때 사용할 수 있는 planning schema다.

## Publish validation 원칙

Publish validation은 editor round-trip 여부가 아니라 **현재 canonical files가 Site에서 안전하고 재현 가능하게 소비되는가**를 판정한다.

최소 검증:

1. workspace/file layout와 frontmatter schema
2. Markdown/MDX parse
3. component contract / dangerous expression policy
4. asset resolution
5. Site sync/typecheck/test/build
6. canonical docs commit과 Site revision linkage

Source를 publish 전에 visual editor codec으로 decode/encode하는 절차는 요구하지 않는다.

## 1.0 비목표

- PostgreSQL/Payload를 canonical content store로 유지
- DB migration/backup을 content revision mechanism으로 사용
- production-grade multi-user CMS
- complete WYSIWYG preview
- 모든 Markdown/MDX 표현의 Visual Editing
- arbitrary JavaScript execution in Article MDX
- 문서별 임의 module import를 기본 지원
- 모든 Site UI component를 content syntax로 노출
- custom component library를 실제 수요 전에 선행 구축

<!-- END SOURCE: docs/content-authoring-contract.md -->


---

<!-- BEGIN SOURCE: docs/publishable-projection.md -->

# Publishable Projection & Metadata Enrichment Contract

상태: 2026-09-21 canonical design contract.

## 목적

Publishing Platform은 **사람이 작성하는 원본 문서**와 **Site가 실제로 소비하는 publishable document**가 같다고 가정하지 않는다.

핵심 모델:

```text
Authoring Draft
        │
        │ engine prepare
        │  ├─ frontmatter defaults/generation
        │  ├─ missing user-owned metadata detection
        │  └─ source validation
        ▼
Prepared Canonical Source
        │
        │ user review + git commit
        ▼
Committed Canonical Revision
        │
        │ deterministic projection
        ▼
Publishable Projection
        │
        ▼
Site Consumer
```

DB-backed export는 제거하지만, **pre-commit canonical-source enrichment와 post-commit deterministic projection은 모두 플랫폼의 핵심 기능**으로 유지한다.

## 1. Authoring Draft / Prepared Canonical Source

사람이 Obsidian, Fumadocs Editor, IDE/Agent에서 직접 다루는 working-tree document는 아직 commit 전일 수 있다.

### Authoring Draft

- body와 일부 frontmatter가 존재할 수 있다.
- required persistent metadata가 아직 없거나 불완전할 수 있다.
- Git commit으로 durable canonical revision이 되기 전 상태다.

### Prepared Canonical Source

Engine의 `prepare` operation을 통과해 **commit하기에 충분한 persistent metadata와 source contract**를 만족한 working-tree document다.

- `prepare`는 source file, 특히 frontmatter를 수정할 수 있다.
- Git stage/commit/push는 하지 않는다.
- 사용자가 diff를 검토하고 필요하면 값을 수정한 뒤 직접 commit한다.
- committed docs SHA가 durable canonical source revision이다.

따라서 canonical source의 authoritative shared state는 여전히 Git commit이지만, **Engine enrichment는 commit 전에 선행될 수 있고 때로는 반드시 선행되어야 한다.**

## 2. Metadata Storage — Frontmatter First

1.0 기본값은 **document frontmatter**다.

사람이 확인·수정하거나 문서와 함께 장기 보존해야 하는 metadata는 가능한 한 문서 frontmatter에 저장한다.

예:

```yaml
---
title: Example
description: ...
author: oomia
tags:
  - architecture
createdAt: 2026-09-21T12:00:00+09:00
---
```

이 선택은 다음 이유를 가진다.

- metadata가 문서와 함께 rename/move/clone된다.
- Obsidian Properties 같은 editor UI에서 통합 관리하기 쉽다.
- Agent/Engine 변경이 일반 Git diff로 드러난다.
- 별도의 metadata registry와 referential-integrity 문제를 기본 경로에서 제거한다.

### Sidecar / reference metadata

sidecar는 금지하지 않지만 기본 경로가 아니다.

다음과 같이 frontmatter에 넣기 부적절한 실제 사례가 생길 때 extension으로 도입한다.

- 매우 크거나 반복적인 consumer-specific data
- document와 lifecycle이 다른 generated artifact
- 여러 document가 공유하는 metadata
- binary/media metadata
- source file을 과도하게 오염시키는 structured data

sidecar를 도입하면 별도의 identity/linkage contract가 필요하다.

### Repository / consumer defaults

document마다 반복할 가치가 없는 기본값은 config/default layer에서 제공할 수 있다. 다만 **사용자가 장기적으로 의미를 부여한 값이 frontmatter에 존재하면 이를 임의로 덮어쓰지 않는다.**

### Derived metadata

source에서 언제든 재현 가능하고 사람이 보존·수정할 이유가 없는 값은 projection에서 계산하는 것을 우선한다.

예:

- reading time
- content hash
- generated TOC
- heading index
- consumer-specific normalized route

반대로 LLM/Agent output처럼 비결정적이거나 사람이 검토해야 하는 결과를 canonical metadata로 사용할 경우, publish 시 매번 재생성하지 않고 **prepare 단계에서 frontmatter에 materialize → review → commit**하는 방향을 우선한다.

## 3. Prepare-time Metadata Resolution

`prepare`는 frontmatter-first metadata를 검사하고 필요한 경우 source에 materialize한다.

필수 원칙:

1. **explicit frontmatter value가 있으면 authoritative**하며 Engine은 해당 field를 재계산하거나 덮어쓰지 않는다.
2. Engine enrichment는 unset/missing field를 보완하는 방향으로 시작한다.
3. unknown frontmatter key와 사용자가 명시한 metadata 의미를 보존한다.
4. `prepare`는 Git stage/commit/push를 하지 않는다.
5. formatting/serialization normalization 자체는 금지하지 않는다. VP formatter/linter나 선택한 YAML/Markdown tooling이 일관된 형식으로 정리할 수 있다.
6. metadata enrichment/formatting이 unrelated semantic content를 임의로 변경해서는 안 된다.

field generator, timestamp derivation, file/staged/all selection, prompt/diagnostic UX, normalization 수준은 초기 Knowledge contract로 고정하지 않고 Engine 구현 레포에 위임한다.

## 4. Publishable Projection

Publishable Projection은 Site consumer contract를 만족하도록 materialize한 document set이다.

projection은 source와 다음이 달라질 수 있다.

- projection-only derived metadata 추가/정규화
- consumer-specific metadata 주입
- route/slug metadata 추가
- component registry 정보 주입
- asset reference 정규화
- consumer-specific metadata 변환
- publish-only/generated field 추가
- 필요 시 body-level deterministic transform

그러나 projection은 **새 SoT가 아니다**.

- canonical input은 prepared source를 확정한 docs commit + projection contract/config다.
- projection은 재생성 가능해야 한다.
- projection 수정 사항을 다시 source에 수동 merge하는 workflow를 기본으로 만들지 않는다.

## 5. Reproducibility

최소 invariant:

> 동일한 prepared source revision + 동일한 projection contract/config/version은 동일한 publishable projection을 만든다.

Engine Evidence에는 가능하면 다음을 연결한다.

- source docs SHA
- projection contract/version
- projection hash 또는 manifest
- Site revision/build result

## 6. Materialization Location

projection을 어디에 materialize할지는 아직 확정하지 않는다.

후보:

### A. Ephemeral staging projection

```text
docs source SHA
     ↓
Engine temp/staging
     ↓
Site build
```

장점:
- generated files를 Git에 남기지 않음
- source/projection dual-SoT 위험 낮음

### B. Site working-tree projection

```text
docs source SHA
     ↓
Engine materialize
     ↓
Site generated/content directory
     ↓
Site commit/build
```

장점:
- Site revision에서 실제 consumed files를 그대로 확인 가능
- deployment artifact provenance 단순

단점:
- generated diff가 Site repository에 누적될 수 있음

### C. Dedicated projection artifact/repository

별도 artifact 또는 projection repo를 둘 수 있으나 1.0에는 비용 대비 필요성이 증명되지 않았다.

현재는 A/B를 Site/Fumadocs integration과 함께 비교한다.

## 7. Site Consumer Boundary

Site는 canonical authoring source 자체가 아니라 **projection contract**를 소비한다.

현재 live Site가 docs submodule의 모든 `md/mdx`를 직접 Article collection으로 읽는 것은 기존 implementation detail이다.

새 target에서는 다음 두 방식이 모두 가능하다.

- Site loader가 source + metadata inputs를 직접 resolve
- Engine이 projection을 먼저 materialize하고 Site는 projection만 읽음

Engine이 projection ownership을 가진다는 제품 목표를 고려하면 후자가 더 명시적일 수 있으나, 실제 Fumadocs/Astro integration complexity를 보고 결정한다.

## 8. Engine Responsibility

Engine operations는 source mutation boundary를 명확히 나눈다.

```text
prepare (working tree, source-mutating)
        ↓
user review / commit
        ↓
verify (read-only)
        ↓
publish (committed revision, source read-only, remote side effects)
```

### `doctor`

environment/workspace prerequisites를 진단한다.

### `prepare`

- working-tree documents를 대상으로 한다.
- persistent metadata/frontmatter를 보완·검증한다.
- 자동 생성 가능한 값을 materialize할 수 있다.
- 사용자 판단이 필요한 누락값은 해결되지 않은 상태로 명확히 보고한다.
- Git stage/commit/push는 하지 않는다.

### `verify`

- source를 수정하지 않는다.
- working tree 또는 committed revision에서 projection을 만들고 consumer validation을 수행할 수 있다.
- external mutation이 없어야 한다.

### `publish`

- D034에 따라 committed revision만 대상으로 한다.
- source를 수정하거나 새 canonical metadata를 생성하지 않는다.
- verify를 재현한 뒤 remote push, exact Site revision linkage, delivery를 수행한다.

## 9. Non-goals

1.0에서 다음을 강제하지 않는다.

- projection-only derived metadata까지 source frontmatter에 영구 기록
- frontmatter가 충분한 metadata를 sidecar file로 강제 분리
- projection을 canonical source로 승격
- projection을 반드시 Git commit으로 저장
- DB를 metadata SoT로 재도입
- authoring editor가 모든 publish metadata를 표시/편집

## 10. 다음 결정

Engine scratch의 `prepare` 구현 전에:

- actual Site/Fumadocs integration에서 projection materialization 위치
- public publish 전에 필요한 security/credential contract

Vertical slice의 Site integration 전에:

- projection materialization location
- Site가 projection을 어떤 directory/loader contract로 소비할지
- projection manifest/hash Evidence 형식

실제 sidecar 필요가 생길 때:

- document stable identity
- sidecar linkage / precedence

<!-- END SOURCE: docs/publishable-projection.md -->


---

<!-- BEGIN SOURCE: docs/content-component-schema.md -->

# Content Component Manifest Schema

상태: 2026-09-21 deferred planning draft. Fumadocs built-in components를 우선 재사용하며, custom component의 cross-repository contract가 실제로 필요해질 때 활성화한다.

## 목적

1.0에서는 Fumadocs Editor/UI가 이미 제공하는 built-in component capability를 우선 사용한다. 따라서 별도 content-component library와 manifest를 선행 구축하지 않는다.

다만 다음 상황이 생기면 machine-readable component profile이 필요할 수 있다.

- canonical MDX에 custom component를 추가한다.
- Engine/Fumadocs Editor와 Site가 같은 component semantics를 공유해야 한다.
- Agent가 component name / props / children policy를 runtime에 조사해야 한다.
- publish validation이 component contract를 programmatically 검증해야 한다.

이 경우 content-component-manifest.schema.json (`schemas/content-component-manifest.schema.json`)을 planning vocabulary로 사용할 수 있다.

## Fumadocs 우선 원칙

component 지원 순서는 다음과 같다.

1. Fumadocs built-in component로 요구사항을 충족하는지 확인한다.
2. built-in component라면 불필요한 Oomia wrapper를 만들지 않는다.
3. 플랫폼에서 허용할 subset만 명시해야 한다면 얇은 supported profile을 둔다.
4. custom component가 필요한 경우 Fumadocs Editor component spec과 Site renderer semantics를 함께 정의한다.
5. cross-repository runtime contract가 실제로 필요해질 때만 manifest/shared package를 도입한다.

과거 계획한 public `@oomia/content-components` React renderer package는 1.0 prerequisite가 아니다.

## 최소 manifest 정보

manifest가 필요해질 경우 각 component는 다음을 기술한다.

| 필드 | 의미 |
|---|---|
| name | canonical Markdown/MDX source에서 사용하는 component 이름 |
| kind | block 또는 inline |
| props | 공개 prop 이름, 타입, required 여부, enum 값 |
| children | none / text / markdown / mdx 중 허용 children model |

이 정보는 특정 renderer 구현을 설명하지 않는다.

- Fumadocs internal React tree
- CSS/theme implementation
- Astro layout
- Editor UI implementation
- deployment state

등은 manifest의 필수 contract가 아니다.

## Authoring integration

custom component가 생겼을 때:

1. canonical source syntax를 먼저 정의한다.
2. Fumadocs Editor component spec으로 visual editing 가능 범위를 정의한다.
3. Site에서 같은 source semantics를 렌더링한다.
4. Visual editing을 지원하지 못하는 source는 Obsidian/IDE 등 Source client에서 유지한다.
5. Site consumer build가 Publishability를 검증한다.

Visual adapter의 존재는 component의 canonical 지원 여부와 동일하지 않다.

## Agent/runtime 사용

manifest/profile이 필요해진 경우 Agent는 다음을 할 수 있다.

1. source에서 사용된 component를 식별한다.
2. supported profile에 존재하는지 확인한다.
3. props/children contract를 검증한다.
4. Fumadocs Editor visual spec 존재 여부와 canonical support를 분리한다.
5. publish validation에서 Site consumer compatibility를 확인한다.

## 독립 package 도입 기준

다음 중 하나 이상이 실제로 발생하기 전에는 shared npm package를 만들지 않는다.

- Engine과 Site가 같은 custom component runtime/type definition을 반복 복제한다.
- manifest/profile을 여러 repository가 package dependency로 소비할 필요가 있다.
- custom renderer implementation을 Site 외부 consumer도 재사용해야 한다.

package가 필요해지면 package name, registry, version policy를 그 시점의 요구사항에 맞춰 다시 결정한다. 과거의 `@oomia/content-components@0.1.0` bootstrap 계획을 현재 확정된 implementation requirement로 간주하지 않는다.

## Schema status

JSON Schema는 삭제하지 않고 planning artifact로 유지한다.

- 현재 1.0 release gate의 필수 artifact가 아니다.
- Fumadocs built-in component를 복제하는 catalog를 만들기 위한 용도가 아니다.
- custom component contract가 생기면 실제 source/API에 맞춰 schema를 재검증하고 필요하면 변경한다.

<!-- END SOURCE: docs/content-component-schema.md -->


---

<!-- BEGIN SOURCE: docs/planning-model.md -->

# Planning Model

상태: 사용자 제시 규칙에 최신 필드 분리와 delta 모델을 반영. 출처: S2 `d7815342`, `4a49654f`; S3 `5a382a65`, `924e880a`.

## 계획 단위

| 개념 | 정의 / 작성 규칙 |
|---|---|
| Release Goal | 릴리스가 달성할 제품 상태 한 문장. 기술·작업 나열은 Product Boundary로 분리 |
| Product Boundary | 해당 릴리스에 필요한 capability 및 제외 범위. 구현 순서가 아님 |
| Target Release | Item의 결과를 포함할 통합 제품 버전 |
| Objective | 여러 릴리스에서 반복 발전시키는 제품 결과 축 |
| Iteration Goal | 이번 Iteration에서 달라질 가장 중요한 상태 한 문장 |
| Iteration Commitment | Goal을 위해 선택한 Item 집합. 대화 기준 통상 2–5개 |
| Project Item | 독립적으로 검증 가능한 하나의 변화(delta) |
| Repository Issue | 해당 결과를 실현하는 특정 레포의 구현 단위 |

Objective와 capability 자체를 영구적으로 Done 처리하지 않는다. 이전 Item을 다음 버전용으로 복제하지 말고 새로 달라지는 결과만 Item으로 만든다. 특정 릴리스가 요구하는 capability 수준은 릴리스 기준으로 검증한다.

## Item / Issue 작성

Project Item에는 Outcome, binary하게 판정 가능한 Acceptance Criteria, Evidence를 둔다. 시스템 변경에는 직접 바뀌는 Scope를 지정하고, 계획·분류 규칙 작업에는 Scope를 비울 수 있다. 구현 레포 이름이나 프레임워크만으로 제품 결과를 정의하지 않는다.

불확실한 작업은 Draft로 포착한다. 레포 소유권과 실행 범위가 분명한 구현 작업은 Repository Issue로 구체화한다. 전역 조정 Item을 억지로 하나의 레포에 귀속하지 않는다. Issue에는 부모 Item 링크, 구현 기술, 필요한 Quality Requirements를 명시한다. 한 Iteration에 끝내기 어렵거나 독립 검증이 필요한 결과는 분해한다.

### Draft와 활성화

- 가능한 경우 GitHub Project의 native Draft Issue를 사용한다. 현재 사용하는 connector가 이를 지원하지 않으면 repository issue를 `draft:` prefix + `closed / not_planned` 상태로 보관하는 fallback을 사용할 수 있으며, 이를 native Draft와 혼동하지 않는다.
- Draft 단계에서는 implementation branch를 만들지 않는다.
- 사용자가 Draft Issue를 명시적으로 발행/활성화하면 **같은 작업에서 Development branch를 반드시 생성·연결한다.** branch 생성은 별도 사용자 요청을 기다리지 않는다.
- 활성화 시 제목의 draft 표기를 제거하고 Project Status를 `Todo`로 전환한 뒤, 실제 구현 착수 시 `In Progress`로 이동한다.
- Development branch는 실제 구현 책임을 소유하는 repository에 둔다. 하나의 Issue가 여러 구현 레포에 걸치면 1:N 관계를 명시한다.
- 코드 변경을 직접 소유하지 않는 cross-repo coordination Item은 branch를 만들지 않을 수 있다. 대신 연결된 각 repository implementation issue가 활성화되는 순간 각각의 branch를 생성한다.

- Project orchestration Action이 설치된 repository에서는 Issue 활성화 이벤트가 Project #11 등록·field 초기화·Development linked branch 생성을 수행한다. 사용자는 별도 branch 생성 요청을 반복할 필요가 없다.
- 새 Repository Issue에는 machine-readable `project-seed`를 함께 둔다. 이는 Project field의 **초기값 전달용**이며 활성화 이후의 SoT는 계속 GitHub Project다.
- Project field/option ID는 Issue나 문서에 저장하지 않고 Action이 이름으로 조회한다. schema drift가 있으면 자동화 실패로 드러내고 임의 값을 추론하지 않는다.
- 상세 동작과 PAT 설정은 Project Orchestration (`docs/project-orchestration.md`)을 따른다.

## 완료 판정

- **Acceptance Criteria**: 이번 변화가 제공해야 하는 관찰 가능한 결과.
- **Quality Requirements**: 적용되는 성능·신뢰성·품질 제약. 근거 없는 수치를 만들지 않는다.
- **Global Definition of Done**: AC 충족, 적용 품질 검증, 필요한 코드와 지속 문서 통합, 관련 자동 검사 통과, 재현 가능한 Evidence 연결.

### Evidence 규칙

Evidence는 **Item의 Outcome이 실제로 달성되었음을 재현 가능하게 보여주는 자료**다.

- 설계·계획 정의 자체가 Outcome이면 이 레포의 canonical 문서가 Evidence가 될 수 있다. `Publishing Platform 1.0 Definition`, `Project Planning Model`처럼 장기 규칙을 확정하는 Item은 관련 문서의 **immutable commit/permalink**를 연결한다.
- `main` 문서 링크는 현재 canonical reference를 찾는 데 사용하고, 완료 시점의 증거를 고정해야 할 때는 commit SHA가 포함된 permalink나 해당 변경 commit/PR을 우선한다.
- 기능 구현, 품질 검증, 실제 발행, deployment 성공은 설계 문서로 증명하지 않는다. 코드·테스트·PR/commit·실행 결과·배포 URL 등 책임 레포의 Evidence가 필요하다.
- Implementation Map (`docs/implementation-map.md`)은 여러 implementation Evidence를 1.0 capability에 대응시킨 검증 스냅샷이다. 기준 revision 이후 코드가 바뀌면 재검증하기 전까지 최신 상태라고 가정하지 않는다.

## Source of Truth

| 정보 | 소유 위치 |
|---|---|
| 제품 경계·설계 방향·계획 규칙·필드 의미·전역 DoD | 이 레포의 docs |
| 1.0 capability별 검증 스냅샷 | 이 레포의 Implementation Map (`docs/implementation-map.md`) |
| Iteration Goal 및 회고 | GitHub Project Status Update |
| Status / Iteration / Work Type / Scope / Target Release / Objective 값 | GitHub Project fields |
| Outcome / AC / Evidence | 실제 Project Item 또는 Repository Issue |
| canonical content draft/working state | local Git working tree |
| durable shared content revision | `ooMia/oomia.github.io.docs` Git commit |
| 구현·테스트·구체적인 계약 | 책임을 소유한 구현 레포 |

Architecture migration이 Active인 동안 Engine/Site/Docs 관련 Item은 Architecture Transition (`docs/architecture-transition.md`)의 phase와 safety rule을 위반하지 않는지 먼저 확인한다. GitHub Project README는 위 정보를 복제하는 원본이 아니라 **탐색용 인덱스**다. 장기 정의는 knowledge repository에 두고 Project README에는 canonical 문서 링크와 Project 운영 원칙만 남긴다.

## 릴리스와 시간

Iteration과 제품 버전은 별개다. 매주 자동으로 버전을 올리거나 Objective마다 버전을 고정 배정하지 않는다. 대화에서 0.x → 1.0 → 1.x 발전을 제안했지만 실제 버전 목록과 공개 계약의 호환성 범위는 미결이다. Definition과 Readiness는 정의/검증 활동이며 Objective나 버전 값이 아니다.

`System view`는 과거에 제안된 사용자 정의 View 이름이다. Scope별 변경 이력을 보는 `By Scope`라는 이름으로 정리하며, 실제 View가 생성되어 있다는 의미는 아니다.

<!-- END SOURCE: docs/planning-model.md -->


---

<!-- BEGIN SOURCE: docs/fields.md -->

# Project Fields

상태: 대화 기준 설계 정의. 실제 GitHub 설정을 조회한 스냅샷이 아니다. 출처: S2 `138f8f89`, `178bf729`, `82ef0a72`; S3 `5a382a65`, `f4b8c972`, `f55d6e75`.

## 필드

| 이름 | 답하는 질문 | 설계상 형태 |
|---|---|---|
| Status | 지금 어떤 작업 상태인가? | 단일 값, 실제 옵션 미확인 |
| Iteration | 언제 수행하는가? | Iteration |
| Work Type | 어떤 종류의 일인가? | 단일 선택 |
| Scope | 완료를 위해 어떤 시스템 책임이 바뀌는가? | 다중 선택 방향 |
| Target Release | 어느 통합 제품 버전에 포함할 것인가? | 단일 버전 값 |
| Objective | 어떤 지속적인 제품 결과를 발전시키는가? | 주된 결과 하나 |

## Scope

Field description:
> Platform responsibilities that must change for the item's Outcome and Acceptance Criteria to be satisfied. Select only directly affected scopes, not incidental dependencies.

판정 질문: **해당 Scope의 동작이나 계약이 전혀 바뀌지 않아도 AC를 만족할 수 있는가?** 가능하면 선택하지 않는다. 하나가 기본이며 두 책임의 독립적인 변화가 필요하면 복수 선택한다. 3개 이상이면 Item 분해를 검토한다. 관련 레포, 사용 기술, 단순 의존성을 태그로 붙이지 않는다.

| Option | Description |
|---|---|
| Content | Article semantics, authoring, validation, and user/developer-facing content operations. |
| Persistence | Durable storage, retrieval, consistency, revisioning, and lifecycle of canonical platform state, including Git-backed filesystem state. |
| Automation | Agent-assisted, scheduled, triggered, or background execution of platform workflows. |
| Publishing | Validation, revision finalization, and preparation of canonical content for reproducible Site consumption and release. |
| Presentation | Rendering, composition, navigation, and visual presentation of publishable content as a user-facing site. |
| Delivery | Propagation, deployment, and verification of validated site output in the live environment. |

예: canonical docs commit을 만들기 전 validation/Git revision flow를 바꾸면 Publishing. workspace layout/frontmatter 저장 계약을 바꾸면 Content + Persistence. 기존 build 결과를 배포하는 경로만 바꾸면 Delivery. 단순 수동 CLI 호출은 자동으로 Automation에 해당하지 않는다.

최신 Scope 제안은 6개 옵션과 다중 선택이다. 사용자가 초기에 확인한 옵션은 Delivery를 제외한 5개였으므로 Delivery의 실제 등록 여부와 다중 선택 적용 여부는 미확인이다.

## Objective

Field description:
> Select the Objective that best represents the primary product outcome advanced by this item, based on its Outcome and Acceptance Criteria rather than its implementation area or dependencies.

사용자가 최신 메시지에서 실제 필드에 존재한다고 제시한 5개 옵션을 유지한다. 아래 description은 그 메시지에 대한 최신 제안이다.

| Option | Description |
|---|---|
| Authoring Experience | Select when the item improves how authors create, edit, inspect, or validate content through tooling or user-facing authoring interactions. |
| Canonical Content | Select when the item improves the authoritative content model, persistence, lifecycle, or rules governing canonical state. |
| Publishable Projection | Select when the item improves how canonical content is validated, finalized as a reproducible revision, and made consumable by the Site/publishing path. The historical field name does not imply that docs must be a generated projection. |
| Extensible Workflow | Select when the item adds or improves supported extension points, custom logic, components, or automation in the publishing workflow. |
| Live Delivery | Select when the item improves how publishable artifacts are rendered, deployed, or propagated to the live user-facing site. |

Authoring Experience는 CMS UI에 한정되지 않는다. Obsidian, Fumadocs Editor, CLI, IDE, form, agent-assisted authoring도 포함할 수 있다. Scope는 책임 영역, Objective는 개선된 제품 결과이므로 서로 일대일 대응하지 않는다.

## Work Type

이름은 사용자가 `Category`에서 `Work Type`으로 정정했다. 옵션은 대화에 나온 5개를 보존한다. 아래 짧은 선택 설명은 이번 정리에서 편집한 요약이며 실제 필드 description의 복제본이 아니다.

| Option | 선택 기준 |
|---|---|
| Feature | 사용 가능한 새로운 기능 또는 동작 개선을 제공한다. |
| Experiment | 불확실한 가설을 검증하고 관찰 결과를 남긴다. |
| Decision | 대안을 판단하고 선택한 방향과 이유를 확정한다. |
| Documentation | 지속적으로 참조할 지식과 설명을 정리한다. |
| Maintenance | 기존 시스템의 유지·정비를 수행한다. |

작업의 주된 결과를 기준으로 하나를 고른다. `Validation` 추가는 대화에서 보류된 제안이며 기본 옵션에 넣지 않는다.

## Target Release

`1.0.0`처럼 통합 버전만 사용한다. `1.0 / Canonical Content` 같은 버전+목표 결합 값은 사용하지 않는다. 하나의 릴리스에 여러 Objective가 포함되고 동일 Objective가 여러 릴리스에서 발전할 수 있다. 실제 릴리스 옵션과 Item별 할당은 Project에서 확인한다.

<!-- END SOURCE: docs/fields.md -->


---

<!-- BEGIN SOURCE: docs/release-1.0.md -->

# Publishing Platform 1.0

상태: 2026-09-21 Git-backed document workspace와 editor-selection/integration 검증 방향을 반영한 1.0 제품 경계.

## Release Goal

Deliver a usable and extensible workflow for authoring Git-backed Markdown/MDX content and publishing a verified canonical revision to a live site.

## Product Boundary

| Capability | 요구되는 관찰 가능한 결과 |
|---|---|
| Authoring | 선택된 authoring workflow가 local docs workspace를 직접 편집하고 source를 손실 없이 보존한다. 기존 corpus는 Obsidian 기반이므로 basic Obsidian compatibility는 전제하고, Fumadocs Editor의 custom-component/structured authoring 이점까지 비교해 editor 역할을 결정한다. |
| Canonical Content | 다양한 Markdown-like documents와 assets가 Git-backed filesystem tree에 존재한다. Engine `prepare`는 commit 전에 frontmatter-first persistent metadata를 보완할 수 있고, 사용자가 검토·commit한 revision이 durable canonical source가 된다. docs layout은 free-form, discovery-based, strict convention 중 구현 목적에 맞게 선택할 수 있으며 1.0 설계가 사전에 한 형태를 금지하지 않는다. 공유·재현 가능한 canonical state는 `oomia.github.io.docs` Git commit으로 식별된다. |
| Extensibility | Fumadocs built-in component를 우선 재사용하고 Oomia-specific custom component가 필요한 경우 source semantics와 Site/editor integration을 명시할 수 있다. Fumadocs Editor의 custom component spec은 유력한 authoring extension 후보지만 필수로 선결하지 않는다. |
| Automation | 최소 하나의 automated 또는 agent-assisted workflow가 validation, Git revision finalization, publish 또는 delivery process에 참여한다. |
| Publishing | prepared/committed canonical source revision에서 deterministic publishable projection을 materialize하고 실제 Site consumer build를 통과시킨 뒤 revision linkage/delivery를 확정한다. DB snapshot export나 Visual Editor codec round-trip을 prerequisite로 요구하지 않는다. |
| Presentation | Site가 canonical docs revision의 Markdown/MDX를 렌더링한다. Fumadocs UI/content tooling을 우선 재사용하되 Site framework 자체는 implementation detail이다. |
| Delivery | 검증된 canonical docs revision이 Site revision과 연결되어 GitHub Pages에 배포되고 성공 Evidence를 남길 수 있다. |

세부 Markdown/MDX 지원 수준은 Content Authoring & Publishing Contract (`docs/content-authoring-contract.md`)가 소유한다.

## 1.0 Target Architecture

```text
selected editor / IDE / Agent
              │
              ▼
local Git document workspace
(editor role under evaluation)
              │ validate / commit / push
                                 ▼
                        oomia.github.io.docs
                         canonical revision
                                 │
                                 ▼
                         oomia.github.io Site
                                 │
                                 ▼
                           GitHub Pages
```

Engine은 pre-commit frontmatter preparation, workspace validation, deterministic projection, Git/publish orchestration, authoring-tool integration hooks, Site consumer verification을 담당하는 stateless CLI-first one-shot runtime/container다. authoring source와 Site-consumed projection은 동일할 필요가 없다. command invocation마다 실행·종료하며 persistent HTTP/job/session state를 소유하지 않는다. 1.0은 Obsidian과 Fumadocs Editor를 모두 필수 runtime으로 요구하지 않는다.

## 명시적 제외 범위

- PostgreSQL/Payload를 canonical content store로 유지
- canonical database backup / restore
- production-grade multi-user CMS, RBAC, transactional collaborative editing
- long-running Engine HTTP service, server-side job queue, persistent session/status store
- advanced agent orchestration
- complete WYSIWYG preview
- 모든 Markdown/MDX 표현의 Visual Editing
- arbitrary JavaScript execution 또는 문서별 임의 module import를 기본 MDX contract로 지원
- Fumadocs built-in으로 충분한 component를 자체 library로 재구현
- custom content-component npm package를 실제 공유 수요 전에 선행 구축
- derived search/index DB를 1.0 필수 persistence로 도입

## 검증

각 capability의 요구 수준을 실제 구현과 대조하고 재현 가능한 Evidence를 연결한다. 부분 구현·완료·미검증을 구분한다. 모든 capability를 이름 그대로 Item으로 생성하지 말고, 발견된 gap에 대해 독립적인 delta Item을 만든다.

현재 검증 스냅샷과 기준 revision은 Implementation Map (`docs/implementation-map.md`)에 둔다.

2026-09-21 Product Boundary가 Payload/PostgreSQL 기반 CMS에서 Git-backed filesystem workspace로 변경되었다. 따라서 기존 Payload E2E와 DB publishing Evidence는 역사적 구현 Evidence로는 유효하지만 **현재 1.0 target 충족 Evidence로 자동 승계되지 않는다.** 상태 변화는 regression이 아니라 target architecture 변경에 따른 재평가일 수 있다.

이 문서 자체는 **1.0 Definition을 확정하는 설계 Item의 Evidence**가 될 수 있지만, 1.0 구현 완료 Evidence는 아니다. 실제 구현 상태는 Implementation Map과 책임 레포의 immutable Evidence로 판정한다.

<!-- END SOURCE: docs/release-1.0.md -->


---

<!-- BEGIN SOURCE: docs/implementation-map.md -->

# Implementation Map

기준일: 2026-09-21. 이 문서는 Publishing Platform 1.0의 **현재 Product Boundary**를 기존 검증 revision과 대조한 revision-bound snapshot이다.

2026-09-21 target architecture가 Payload/PostgreSQL 기반 CMS에서 **Git-backed filesystem document workspace + editor/integration 재검토**로 변경되었다. 아래 기존 구현 revision은 역사적/재사용 가능 Evidence이며 새 target을 자동 충족하지 않는다.

## 기준 revision

| 역할 | Repository | Revision | 의미 |
|---|---|---|---|
| legacy authoring / publishing | [`ooMia/oomia.github.io.engine`](https://github.com/ooMia/oomia.github.io.engine) | [`6ba2f950a78eef18c2efa305b96a1c8d0443252e`](https://github.com/ooMia/oomia.github.io.engine/commit/6ba2f950a78eef18c2efa305b96a1c8d0443252e) | Payload/PostgreSQL CMS와 DB→docs publish Evidence |
| content repository snapshot | [`ooMia/oomia.github.io.docs`](https://github.com/ooMia/oomia.github.io.docs) | [`50d89a4cb1c5d6476444e29454e12b523e99231b`](https://github.com/ooMia/oomia.github.io.docs/commit/50d89a4cb1c5d6476444e29454e12b523e99231b) | 현재는 generated snapshot이지만 새 architecture에서 canonical remote로 승격 대상 |
| presentation / delivery | [`ooMia/oomia.github.io`](https://github.com/ooMia/oomia.github.io) | [`a3b2e182563458636b7b8186a4cd2201894b2a65`](https://github.com/ooMia/oomia.github.io/commit/a3b2e182563458636b7b8186a4cd2201894b2a65) | docs content를 Site에서 실제 build/deploy한 Evidence |

`oomia.github.io`의 package name은 `oomia.github.io.mono`이고 일부 engine 문서에서는 이를 `mono`라고 부른다. 별도 원격 `oomia.github.io.mono`가 있다는 뜻은 아니다.

## Architecture transition

기존 구현:

```text
Payload/Lexical
      ↓
PostgreSQL
      ↓
DB snapshot/export
      ↓
oomia.github.io.docs
      ↓
Site
```

현재 target:

```text
Obsidian / Fumadocs Editor / IDE
          ↓
local Git document workspace
(editor role under evaluation)
          ↓
validation + commit/push
          ↓
oomia.github.io.docs
 canonical content revision
          ↓
Site
```

따라서 기존 Payload/PostgreSQL 구현을 제거하기 전에도 재사용 가능한 요소와 폐기할 coupling을 구분해야 한다.

## 1.0 capability 상태

상태는 **미검증 / 미충족 / 부분 충족 / 충족**만 사용한다.

| Capability | 상태 | 현재 Evidence | 새 target에 남은 delta |
|---|---|---|---|
| Authoring | **미충족** | Payload Admin에서 visual create/edit/save가 E2E로 검증된 legacy implementation은 존재한다. [e2e.ts](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/scripts/e2e.ts) | 기존 corpus가 이미 Obsidian 기반이므로 basic authoring 호환성보다 Fumadocs/Site integration과 custom-component authoring 경험을 검증해야 한다. Obsidian-only, Obsidian + optional Fumadocs Editor, Fumadocs-heavy 역할 중 하나를 Evidence로 결정한다. |
| Canonical Content | **부분 충족** | docs repository에는 실제 Markdown/MDX files와 Git history가 있고 Site가 이를 소비할 수 있다. 기존 Engine DB에도 raw body string 보존 Evidence가 있다. | authority를 PostgreSQL에서 docs-backed Git workspace로 이동하고 Git revision semantics를 확정해야 한다. layout은 free-form/discovery/strict convention 모두 후보이며 integration/maintenance Evidence로 의도적으로 선택한다. |
| Extensibility | **부분 충족** | 기존 custom `Callout`이 engine/site 양쪽에서 opt-in되고 consumer build를 통과한 Evidence가 있다. | Fumadocs built-in/custom component와 Editor component-spec workflow를 실제 Site integration에서 검증한다. Obsidian-native custom syntax bridge는 1.0 범위 밖이며 별도 component package는 실제 cross-repo 공유 수요 전까지 만들지 않는다. |
| Automation | **부분 충족** | legacy Payload publish action과 docs workflow가 explicit trigger, failure propagation, idempotent no-op을 검증했다. [Issue #8](https://github.com/ooMia/oomia.github.io.engine/issues/8) | trigger를 Payload endpoint에서 Git workspace publish action으로 옮기고 validation→commit/push→Site verification 흐름을 재검증해야 한다. |
| Publishing | **부분 충족** | legacy workflow는 DB snapshot을 docs repo에 materialize하고 실제 Site sync/lint/test/typecheck/build를 통과시켰다. [docs workflow](https://github.com/ooMia/oomia.github.io.engine/blob/6ba2f950a78eef18c2efa305b96a1c8d0443252e/apps/cms-lab/scripts/docs-workflow.ts) | DB export/Visual codec gate는 제거하되, canonical authoring source + metadata inputs → deterministic publishable projection이라는 핵심 transformation을 새로 정의해야 한다. downstream Site verification은 재사용 가능성이 높다. |
| Presentation | **충족** | Site가 docs repository의 Markdown/MDX를 Astro content collection으로 읽어 렌더한다. [content config](https://github.com/ooMia/oomia.github.io/blob/a3b2e182563458636b7b8186a4cd2201894b2a65/apps/web/src/content.config.ts) | Fumadocs UI/content tooling 도입은 UX/DX 개선 과제로 진행할 수 있으나 canonical docs content를 렌더한다는 1.0 기본 결과는 이미 충족한다. |
| Delivery | **충족** | docs SHA를 소비하는 Site revision의 GitHub Pages build/deploy가 성공했다. [run 35472028484](https://github.com/ooMia/oomia.github.io/actions/runs/35472028484) / [artifact 10593195312](https://github.com/ooMia/oomia.github.io/actions/runs/35472028484/artifacts/10593195312) | 새 canonical workspace에서 content delta를 publish한 뒤 동일 delivery chain이 유지되는 regression Evidence를 추가한다. |

## 폐기 또는 재사용 판단

### Target에서 제거

- PostgreSQL을 canonical content persistence로 사용하는 모델
- Payload collection CRUD를 1.0 authoring contract로 사용하는 모델
- Lexical editor state ↔ Markdown codec을 모든 content의 storage/publish gate로 사용하는 모델
- DB snapshot → generated docs projection이라는 ownership
- Payload user/auth model을 local 1.0 authoring의 필수조건으로 두는 모델

### 재사용 후보

- process execution / command runner
- publish concurrency/idempotency guard
- failure propagation과 Evidence 수집
- docs/site revision linkage
- Site sync/lint/test/typecheck/build verification
- main-only publish guard 등 Git policy
- existing docs repository와 Site consumer linkage

재사용 여부는 새 workspace flow에서 코드 복잡도를 줄이는 경우에만 결정한다. legacy abstraction을 유지하기 위해 새 architecture를 왜곡하지 않는다.

## 1.0 구현 delta

우선순위는 다음과 같다.

1. **Workspace / Docs Contract**
   - docs repository를 canonical content remote로 재정의
   - free-form/discovery-based/strict docs layout 후보를 실제 corpus와 Site/Fumadocs integration으로 비교하고 하나를 의도적으로 선택
   - working tree draft vs committed canonical revision 구분

2. **Authoring + Site Integration**
   - 기존 작성 content corpus를 docs workspace에 import
   - 기존 Obsidian corpus를 Fumadocs UI/Core/MDX Site에 통합
   - Fumadocs Editor의 MDX/custom-component-aware editing 이점과 비용 비교
   - custom component 주입/편집 경험과 source round-trip 검증
   - 최종 editor 역할을 Evidence로 결정

3. **Engine Simplification**
   - Payload/PostgreSQL 의존 경로를 target implementation에서 제거
   - container + mounted workspace model
   - validation / Git / publishing orchestration만 유지

4. **Projection / Publishing Rewrite**
   - source discovery + metadata resolution
   - deterministic publishable projection materialization
   - projection validation + actual Site consumer verification
   - committed docs revision push와 Site revision linkage
   - projection manifest/hash와 idempotent publish semantics

5. **Fumadocs / Obsidian Integration**
   - Site에서 Fumadocs UI/Core/MDX를 재사용할 범위 검증
   - Obsidian-native source syntax를 Site에서 richer UI로 변환하는 plugin/remark boundary 검증
   - Fumadocs Editor가 실제로 필요한 component-aware editing gap만 식별
   - custom component는 실제 수요가 있을 때만 shared profile/spec 추가

6. **Engine Scratch Bootstrap**
   - D032에 따라 greenfield skeleton 생성
   - Development Toolchain (`docs/development-toolchain.md`)과 Repository Design (`docs/repository-design.md`) 적용
   - legacy code는 keep/adapt/retire review 후 필요한 generic behavior만 port

7. **Site migration strategy**
   - 현재 Astro/docs/Pages Evidence를 보존하면서 Fumadocs integration을 incremental로 검증
   - Turbo → VP task-runner parity는 별도 Maintenance delta

8. **Regression / Migration**
   - legacy DB content가 있다면 canonical files로 일회성 migration
   - 기존 Site delivery chain 유지
   - obsolete Payload/PostgreSQL code와 infra 제거

## Issue #13 / #14 영향

기존 [Engine Issue #13](https://github.com/ooMia/oomia.github.io.engine/issues/13)의 “Payload 안에서 raw source save path 확보” 구현은 새 architecture에서 대부분 구조적으로 불필요해진다.

- raw source create/update → filesystem 직접 편집
- exact preservation → Source client/file semantics
- visual unsupported fallback → Obsidian/IDE source editing
- metadata-only preservation → frontmatter/file patch
- broken draft storage → working tree file

따라서 #13을 그대로 계속 구현하지 말고 새 architecture 기준으로 **supersede 또는 migration/evidence Issue로 재범위화**해야 한다.

기존 #14의 “Visual codec을 global publish gate에서 제거” 목적은 유지되지만 구현 방식은 file workspace validation + Site consumer build로 다시 설계해야 한다.

## 갱신 규칙

- 이 문서는 live branch 상태가 아니라 immutable Evidence 기반 snapshot이다.
- architecture가 변경되면 같은 코드 revision도 새 Product Boundary에 대해 다시 평가할 수 있다.
- legacy implementation 성공을 현재 target 완료로 간주하지 않는다.
- 새 Engine/docs/Site integration이 main에 들어간 뒤 기준 revision과 capability 상태를 다시 갱신한다.

<!-- END SOURCE: docs/implementation-map.md -->


---

<!-- BEGIN SOURCE: docs/operating-rhythm.md -->

# Operating Rhythm

상태: 활동 계획의 사용자 명시 사항 중심. 출처: S1 `e0a335ad`, `1f288b42`, `33b898b1`.

## 목표와 리듬

Publishing Platform 완성과 계획·실행 습관을 중심에 둔다. 앰버서더 활동과 포트폴리오 개발의 기록을 하나의 흐름으로 연결한다.

- 매주 작은 발표, 매 4주 큰 발표 또는 working system review.
- 가용 시간은 대화 당시 주 50시간, 첫 주 25시간의 계획 가정. 현재 주의 실시간 예산이 아니다.
- Daily 기록은 20–30분 버퍼를 둔다. 주말 정리는 초기 60분을 잡고 실제 소요 시간을 기록해 조정한다.
- 주말 이전에 발표 일정을 잡는다. 통상 토요일 밤 또는 일요일 낮이며 확정 일정은 아니다.
- Daily는 비공개, 주말 정리 결과를 공개하는 방향에 사용자가 동의했다.

## Evidence → Story

매일 목표, 실제 결과, screenshot/GIF/video/voice/commit 등 Evidence, 배운 점, 다음 행동을 남긴다. 미디어는 GitHub에 업로드해 링크로 연결하는 방향을 선호했다. 구체적인 공개 범위와 저장 위치는 확정되지 않았다.

주말에는 일별 기록을 목표 → 시도 → 장애·판단 → 결과 → 다음 행동의 A-Z 스토리로 재구성한다. Agent/LilysAI는 정리 부담을 낮추는 도구이며 모든 개발을 Agent가 수행한다고 가정하지 않는다. 공개 결과물은 발표·블로그를 중심으로 하고 LinkedIn을 초기 후보로 둔다. 자체 블로그가 준비되기 전 발행 채널은 미결이다.

## LilysAI 활용 후보

글 전체 기반 description/metadata, 내용 기반 외부 링크 preview, 태그 후보, 3줄 요약을 실험할 수 있다. 이는 사용자가 제시한 관심 기능이며 네 기능 모두가 1.0 필수라는 의미는 아니다. 1.0은 최소 하나의 실제 automation 경로를 요구한다.

자동화는 자료 수집 → 요약·통합 → 발표/글 초안 → 플랫폼 발행의 순서로 필요에 맞게 확장한다. 현재 연결된 서비스나 구현 완료된 자동화를 의미하지 않는다.

<!-- END SOURCE: docs/operating-rhythm.md -->


---

<!-- BEGIN SOURCE: docs/decisions.md -->

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
| D036 | **Authoring Draft → Prepared Canonical Source → committed Canonical Revision → Publishable Projection**을 분리한다. Engine은 commit 전에 working-tree source를 enrich할 수 있고, 사용자가 검토·commit한 revision이 durable canonical source가 된다. Site 입력은 그 revision에서 deterministic하게 materialize한 projection일 수 있다 | 사용자 정정, 2026-09-21 | metadata enrichment를 commit 이후에만 수행한다고 가정; canonical source file과 Site input이 항상 byte-for-byte 동일하다고 가정 |
| D037 | metadata enrichment는 Publishing Platform의 핵심 책임으로 취급한다. Engine은 commit 전 `prepare` 단계에서 persistent/user-meaningful metadata를 canonical source에 보완할 수 있고, commit 이후에는 source를 mutation하지 않는 deterministic projection을 수행한다 | 사용자 명시, 2026-09-21 | DB export 제거와 source enrichment 제거를 동일시; 모든 metadata를 publish 시점의 ephemeral 값으로만 계산 |
| D038 | 1.0의 document-local persistent metadata는 **frontmatter-first**로 관리한다. Obsidian Properties 등 editor에서 통합 관리할 수 있도록 사람이 확인·수정하거나 장기 보존해야 하는 metadata는 기본적으로 문서 frontmatter에 저장한다. sidecar/reference metadata는 frontmatter가 부적합한 실제 사례가 생길 때 쓰는 extension으로 둔다 | 사용자 명시, 2026-09-21 | sidecar와 frontmatter를 동등한 기본 저장 방식으로 시작; 모든 metadata를 별도 registry/file에 강제 |
| D039 | Engine에 **source-mutating pre-commit `prepare` operation**을 둔다. `prepare`는 frontmatter를 보완/검증하지만 Git stage/commit/push는 하지 않는다. `verify`는 working tree 또는 committed input을 read-only로 검증하고, `publish`는 D034에 따라 committed revision만 대상으로 source를 수정하지 않는다 | 사용자 요구에서 직접 도출, 2026-09-21 | metadata 보완을 commit 이후 projection 단계에서만 수행; `publish`가 dirty source를 자동 수정·commit |
| D040 | frontmatter에 **사용자가 명시적으로 설정한 값이 있으면 해당 field는 authoritative**하며 Engine은 그 field를 재계산·덮어쓰지 않는다. Engine enrichment는 unset/missing field를 보완하는 방향으로 시작한다 | 사용자 명시, 2026-09-21 | Engine-generated default/derived value가 explicit user metadata를 덮어씀 |
| D041 | timestamp derivation, prepare 대상 선택(file/staged/all), interactive UX, YAML/source formatting 수준 같은 세부 동작은 초기 Knowledge contract로 고정하지 않고 Engine 구현 레포에 위임한다. 구현·실험을 통해 바꾸기 쉬운 상태를 우선하며 Knowledge는 user-value preservation, frontmatter-first, prepare-before-commit 같은 핵심 경계만 소유한다 | 사용자 명시, 2026-09-21 | 초기 설계에서 모든 CLI/mutation/formatting semantics를 선결 |
| D042 | Knowledge repository의 **장시간·다문서·다단계 변경은 별도 branch에서 작업하고 PR로 검토 후 기본적으로 squash merge**한다. `main` 직행은 작은 국소 수정에 한정해 main history를 고수준 변화 단위로 유지한다 | 사용자 명시, 2026-09-21 | 긴 작업을 여러 작은 commit으로 main에 직접 누적 |
| D043 | canonical source의 **byte-exact formatting 보존은 1.0 contract가 아니다**. VP formatter/linter, editor, YAML/Markdown tooling이 의미를 유지하는 범위에서 formatting을 normalize할 수 있으며, 핵심 보장은 explicit user metadata와 semantic content를 임의로 덮어쓰지 않는 것이다 | 사용자 명시, 2026-09-21 | YAML key order/quoting/whitespace/body bytes까지 exact preservation을 필수 계약으로 고정 |


D005의 다중 선택 설정, Delivery 옵션 등록은 실제 Project에서 확인되지 않았다. D007 등 초기 assistant 제안을 사용자의 명시적 승인 발언으로 인용하지 않는다. engine container 배포 및 Validation 옵션은 결정이 아니라 미결 제안이다.

D010은 **설계 정의가 Outcome인 경우에만** 적용한다. 기능 구현·품질·배포 성공은 구현 레포의 코드·테스트·commit/PR·실행/deployment Evidence가 별도로 필요하다.

D011의 현재 기준 revision과 capability 판정은 Implementation Map (`docs/implementation-map.md`)에 기록한다. Product Boundary가 변경되면 동일한 구현 revision도 다시 판정할 수 있으며, contract 강화에 따른 상태 하향을 regression과 구분한다.

D012–D016의 세부 정책과 예제별 지원 수준은 Content Authoring & Publishing Contract (`docs/content-authoring-contract.md`)가 소유한다. D025의 migration 절차와 legacy reconciliation 기준은 Architecture Transition (`docs/architecture-transition.md`)가 소유한다. D021·D023·D026–D043이 현재 1.0 persistence/authoring/integration, enrichment/projection, implementation-bootstrap 및 Knowledge 운영 기준이다. D024는 Fumadocs built-in 재사용 원칙을 유지하지만 D027에 따라 Fumadocs Editor 자체를 필수 authoring client로 확정하지 않는다. 별도 content-component package와 manifest는 실제 custom component의 공유 계약이 필요해질 때만 다시 활성화한다.

D017에 따라 세션의 장기 의미는 canonical 문서·Decision Log로 승격하고, 일시적인 실행 상태만 `handoff/current.md`에 유지한다. 원문 대화가 필요하면 원래 대화 시스템을 참조하며 Knowledge repository는 transcript archive 역할을 맡지 않는다.

<!-- END SOURCE: docs/decisions.md -->


---

<!-- BEGIN SOURCE: docs/open-questions.md -->

# Open Questions / Verification Gaps

현재 canonical 정책에서 **제품 경계나 cross-repository contract 수준에서 아직 실제 결정이 필요한 항목**만 유지한다.

구현 중 쉽게 바꿀 수 있는 CLI UX, timestamp 계산 방식, staged/file/all 선택, formatting/normalization 방식은 Open Question으로 승격하지 않는다. 이런 세부사항은 책임 구현 repository에서 실험하고 필요할 때 Knowledge로 승격한다.

| ID | 항목 | 현재 처리 |
|---|---|---|
| Q003 | 1.0 final release gate | 실제 acceptance/evidence chain과 최종 release gate는 새 vertical slice가 구현된 뒤 구체화 |
| Q006 | Status 옵션 및 계획 Item의 Objective/Target Release 빈 값 허용 규칙 | Project 운영상 실제 불편이 확인될 때 확정 |
| Q007 | Work Type Validation 추가 | 보류. 현재 기본값 유지 |
| Q008 | Engine container artifact와 workspace mount / Git credential contract | local CLI scratch의 blocker는 아님. containerized prepare/verify/publish를 연결할 때 구체화 |
| Q010 | 미디어 공개 범위·asset 저장 위치 | workspace-relative asset과 durable external URL 방향은 유지. public/private와 large/binary policy는 실제 asset workflow 전에 결정 |
| Q012 | custom component shared profile/manifest 필요 여부 | Fumadocs built-in 우선. 실제 custom component의 cross-repository 공유 계약이 필요할 때만 활성화 |
| Q014 | raw HTML 및 executable MDX publish security policy | source 저장과 별개. 실제 public publish gate 전에 허용 범위를 반드시 결정 |
| Q015 | docs layout / consumer discovery convention | free-form / consumer-specific / strict layout 모두 허용. Fumadocs/Site vertical slice 결과로 결정 |
| Q017 | 실제 authoring editor 역할 분담 | 기존 Obsidian corpus + Fumadocs custom-component authoring Evidence 후 결정 |
| Q019 | Site migration 방식 | 기존 Astro/docs/Pages Evidence를 보존하는 incremental migration이 현재 우선 후보. Fumadocs spike 후 재평가 |
| Q021 | Site Turbo retirement | VP parity와 기존 CI/build Evidence를 확인한 뒤 별도 Maintenance change로 결정 |
| Q024 | projection materialization 위치 | ephemeral staging vs Site working-tree generated projection을 실제 consumer integration으로 비교 |
| Q025 | stable document identity / sidecar linkage | frontmatter-first이므로 초기 범위 밖. 실제 path-independent identity나 sidecar 필요가 생길 때 결정 |

## 이미 구현 레포에 위임한 세부사항

다음은 **현재 Knowledge-level Open Question이 아니다.**

- 어떤 persistent metadata field를 언제 추가할지
- timestamp를 현재 시각, Git history, editor template 등 어떤 방식으로 유도할지
- `prepare`를 단일 file, staged files, glob, 전체 workspace 중 어떤 입력 표면으로 제공할지
- missing field를 prompt, diagnostic, Agent 보완 등 어떤 UX로 해결할지
- YAML key order, quoting, whitespace 또는 Markdown formatting을 어느 정도 normalize할지
- metadata schema를 TypeScript, Zod, config 또는 다른 방식으로 표현할지
- bulk prepare의 partial-success / atomicity 정책

이들은 Engine 구현에서 가장 단순한 형태로 시작하고, 실제 제약이나 반복되는 패턴이 생기면 구현 Evidence와 함께 Knowledge decision으로 승격한다.

## 고정된 최소 metadata invariant

- document-local persistent metadata는 frontmatter-first다(D038).
- Engine `prepare`는 commit 전에 source를 보완할 수 있지만 stage/commit/push하지 않는다(D039).
- **explicit user value가 있으면 그대로 유지하고 Engine은 해당 field에 대한 derivation을 수행하지 않는다**(D040).
- Engine은 unset/missing field를 보완하는 방향으로 시작한다.
- formatting 변화 자체는 contract violation이 아니다. VP formatter/linter 또는 구현 도구가 deterministic consistency를 위해 source 형식을 normalize할 수 있다.
- 다만 formatter/enrichment가 사용자가 명시한 metadata의 의미를 바꾸거나 unrelated semantic content를 임의로 변경해서는 안 된다.

## 다음 실제 설계 gate

Engine scratch 자체는 metadata 세부 결정 때문에 막지 않는다.

1. minimal `doctor / prepare / verify / publish` skeleton을 만든다.
2. `prepare`는 frontmatter-first + missing-only enrichment로 시작한다.
3. 실제 Obsidian corpus에서 구현해보고 field/timestamp/selection/formatting 전략을 책임 레포에서 조정한다.
4. Site/Fumadocs vertical slice에 들어갈 때 Q024/Q015/Q017을 Evidence 기반으로 좁힌다.
5. 실제 public publish 전에 Q014와 Q008의 필요한 부분을 닫는다.

<!-- END SOURCE: docs/open-questions.md -->


---

<!-- BEGIN SOURCE: CONTRIBUTING.md -->

# 수정 방법

1. CONTEXT.md (`CONTEXT.md`)에서 해당 규칙을 소유하는 파일을 찾는다.
2. 원본 Markdown을 수정한다. 새로운 제안은 확정된 규칙으로 섞지 말고 open-questions.md (`docs/open-questions.md`)에 기록한다.
3. 의미 있는 방향 변경에는 decisions.md (`docs/decisions.md`)에 stable ID, 상태, 이유, 출처, 대체한 결정을 남긴다. 과거 기록을 삭제하지 않는다.
4. 구현 상태를 변경하려면 Implementation Map (`docs/implementation-map.md`)의 기준 revision보다 구현 레포가 진행되었는지 확인하고 실제 코드·테스트·commit/deployment Evidence를 다시 조사한다.
5. CHANGELOG.md (`CHANGELOG.md`)를 갱신하고 `python3 scripts/bundle.py`를 실행한다.
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

`handoff/current.md`는 세션 로그나 의사결정 원장이 아니다. 매번 최신 checkpoint로 overwrite하고, 과거 상태는 Git history에 맡긴다. 구현 수준은 handoff가 아니라 revision-bound Implementation Map (`docs/implementation-map.md`)과 책임 레포 Evidence로 판정한다.

## 대화에서 변경을 가져올 때

사용자의 명시적 정정 → 이후 사용자 메시지에 반영된 규칙 → 최신 assistant 제안 → 오래된 초안 순으로 근거를 판단한다. 시간상 최신이라는 이유만으로 제안을 사용자 승인으로 바꾸지 않는다. 과거 대화에 근거하는 항목은 provenance의 source/turn metadata를 유지하고, 현재 요청으로 새로 확정한 내용은 실제 날짜와 변경 commit으로 추적한다. raw transcript는 repository에 복제하지 않는다.

## 공유

이 레포는 raw conversation transcript를 보관하지 않는다. provenance에는 source/turn metadata와 최소 요약만 남기고, Chat에 필요한 기본 첨부물은 `dist/CONTEXT-BUNDLE.md`다.

<!-- END SOURCE: CONTRIBUTING.md -->


---

<!-- BEGIN SOURCE: provenance/README.md -->

# Provenance

수집일: 2026-09-18 (Asia/Seoul). 같은 프로젝트의 대화 3개, 모든 반환 페이지를 수집했다. 대화 당시 인용된 외부 링크와 도구 기능 주장은 현재 사실로 재검증하지 않았다.

## 확정 수준

- **사용자 명시**: 직접 요구하거나 정정한 내용.
- **사용자 후속 확인 / README 반영**: 이후 사용자 메시지에 포함된 규칙. 전체 세부사항의 개별 승인을 뜻하지 않는다.
- **최신 제안**: 최신 assistant 답변을 정리 기준으로 사용했으나 명시적 승인 및 실제 적용을 주장하지 않는다.
- **이번 구성**: 현재 요청을 수행하기 위한 파일 구조·템플릿·편집 요약.
- **미검증**: 실제 구현 또는 외부 운영 상태를 확인하지 않음.

최신 제안은 이전 초안보다 우선하되 사용자의 명시적 요구를 덮어쓰지 않는다. 문서의 짧은 turn ID는 아래 전체 ID에 대응한다.

Knowledge repository에는 **raw conversation transcript를 보존하지 않는다.** 아래 source/turn index와 최소 발언 요약만 provenance metadata로 유지한다. 장기적으로 필요한 내용은 owning canonical 문서와 Decision Log에 승격하고, 아직 진행 중인 실행 상태는 `handoff/current.md`가 담당한다. 원문이 꼭 필요한 경우에는 아래 원본 대화 링크처럼 원래 시스템의 source를 확인하며, Knowledge 자체를 대화 archive로 사용하지 않는다.

## Sources and Turns

### S1 — 활동 계획 수립

[원본 대화](https://chatgpt.com/c/6aa8c18b-d9a4-83ee-9bc9-5bfeec691330)

| Turn ID | 사용자 발언 시작 |
|---|---|
| `33b898b1-671f-4436-a0bc-b5c8cb071482` | 직접 구현하는 것보다, 이미 잘 만들어진 도구를 잘 활용하고자 노력하는 방향성이, 핵심 기능이 아닌 곳에 시간을 할애할 때의 마음가짐이 되어야 한다고 본다. 따라서, 나의… |
| `1f288b42-a887-4948-b7d2-1249a2d210fe` | 내게 필요한 것은 다양한 답변보다, 자동화 가능성 높은 루틴과 사고/계획 프레임워크입니다. 지금은 뭔가 실속 없는 내용들을 장황하게 늘어놓는 느낌입니다. 제가 최종 목표를… |
| `e0a335ad-74c3-43fd-93c4-eb3c40770b42` | 1. 주말 이전에 브리핑 약속을 사전에 잡고 진행하면 되며, 일반적으로 토요일 밤이나 일요일 낮이 될 것 같다. 2. 공식 형식은 없으나, 단순 결과물이 아닌 A-Z의 스… |
| `17efd584-bf83-437d-8f17-72d6185e0c94` | LilysAI_일반_엠버서더 활동에 대한 계획을 세워보자. 다음은 해당 프로그램에 대한 간략한 요약이다. 링크를 직접 참조하여 내용을 파악해보자. http… |

### S2 — GitHub Project 초안 작성

[원본 대화](https://chatgpt.com/c/6aa991ee-6238-83ee-bef8-5d330246837a)

| Turn ID | 사용자 발언 시작 |
|---|---|
| `82ef0a72-fc2e-480c-b4b5-53a941b93465` | Scope는 다중 선택 옵션으로 만들 수도 있다. 단일 선택 옵션의 경우, 어떤 작업은 어떤 영역으로 두어야 할 지 고민할 수 있다. 서로 다른 두 영역에 걸쳐 있는 작업… |
| `4a49654f-9727-4bef-a51f-b8c2c6a4ed3b` | 1. Release Target의 용법에 대한 설명: SemVer 뒤에 붙는 context를 별도의 필드로 추출하지 않아야만 하는 이유는? 2. Scope 필드는 sing… |
| `3e786a51-3bc0-4c70-af4c-a726b8d5adb4` | - application boundary와 관련된 답변에서 표현을 \Article을 API를 통해 생성·조회·수정할 수 있고, 그 상태가 canonical state로 … |
| `d7815342-69e8-47ae-9512-15aff0ec8cb7` | - 1.0 Product Boundary와 Release Target에서 1.0과 관련된 용어들 사이의 차이 (1.0 Definition부터 1.0 Readiness까지)… |
| `178bf729-4b1d-4bc9-ab65-203481022f60` | 1. Category 대신 Work Type을 사용했으니 앞으로의 표현에 참고하도록. 2. milestone을 목표처럼 사용하는 것에 대한 의견. 의견을 내기 전에 Git… |
| `4c1f839e-0f53-4803-99ca-f84cd5724030` | - Type은 예약되어있는 필드명이라 Category로 바꿨는데, 대안이 있을까? - Acceptance Criteria와 DoD의 혼용에 혼란스럽다. 간단한 예시를 통해… |
| `138f8f89-0c4a-450e-9abd-677215c6d8de` | GOAL: Make the canonical content persistence path executable through the existing application c… |
| `2877a148-8c99-425b-8896-d738308e239a` | Area와 Component를 만드는 것 자체는 좋지만,Area A에 Component A1, A2, A3가 속하는 느낌이라면, 차라리 A:A1 같이 합치는 것이 유지보수… |
| `9e4fc270-7151-4b7d-8044-ce625803cd70` | 사용자/시스템 기능보다는 기술 구조가 더 편하게 느껴진다. 그러나 Database, CMS와는 달리, Astro는 Web App 중 실제 문서와 기타 기술 블로그를 구성하… |
| `5b7f689f-9eb1-410a-8c62-549b49124eb1` | 이슈 생성 시, default assignee, default label, 그리고 Milestone 설정을 할 수 있어? 할 수 있다면 하는 게 좋을까? 또 모든 작업에 … |
| `ab0703f8-90a7-4e66-b788-12e8a81acf63` | Project의 각 아이템은 레포의 이슈인지, Item을 할당하려면 반드시 특정한 레포를 명시해야하는지, 그리고 기본적으로 모든 이슈는 draft로 생성되도록 강제할 수 … |
| `d7f1bf49-931a-4fd8-b056-a873fcfba13f` | 일단 나도 Iteration 스타일을 선호한다. 이에 맞는 방식을 처음부터 진행하는 것이 적응에 도움이 되리라 본다. 그리고 현재의 README는 다소 장황하다. 핵심 가… |
| `833044bb-289f-454c-b891-cc9fe77cca17` | 기본 레포지토리 설정 없이 GitHub Project의 이름을 \Publishing Platform\로 설정하고, 거의 처음으로 본격적으로 GitHub Project를… |

### S3 — README Evidence Planning

[원본 대화](https://chatgpt.com/c/6aac4ab0-1e38-83e8-a671-8cbbfa4173ae)

| Turn ID | 사용자 발언 시작 |
|---|---|
| `b0174bce-6fff-4f18-bd3a-d931088e34c7` | [@GitHub](plugin://github@openai-curated-remote) https://github.com/users/ooMia/projects/11/ (`provenance/… |
| `72f26f1b-8a12-4af1-b990-b95223fb8d41` | GitHub Project에 README로 설계안을 기록해두는 게 LLM을 사용하는 동안 컨텍스트 전달이 불편한데, Notion이나 다른 MCP 붙이고 별도로 정리해두는 … |
| `f55d6e75-29f6-4b53-a2b8-121a27384873` | 실제 필드에 **Authoring Experience가 있는데, 이건 유지하는 게 좋을까 삭제해도 좋나** - **Authoring Experience** - **Cano… |
| `353c6aa1-89d0-450f-b803-f87a069dfbd8` | 1. Canonical Content&`)에 기록한다. GitHub Project의 live 필드·Item·Status Update는 여전히 이 provenance 수집 범위가 아니다. 최신 canonical 문서에 승격되지 않은 초기 제안은 현재 정책으로 간주하지 않는다.

<!-- END SOURCE: provenance/README.md -->
