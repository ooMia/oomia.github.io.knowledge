# Publishing Platform — Chat Context Bundle

GENERATED TRANSPORT SNAPSHOT — canonical 원본은 각 source 경계에 적힌 repository path입니다. 직접 수정하지 마세요.
Repository source에 접근할 수 있으면 CONTEXT.md routing과 canonical owner를 직접 사용하세요. 이 bundle은 routing이나 live Project/Issue/PR state를 대체하지 않습니다.
Implementation Map은 문서에 적힌 repository revision의 검증 snapshot이며 live Project 상태가 아닙니다.
상대 링크는 원본 레포 기준입니다. 과거 변경 근거는 Git history와 연결된 immutable Evidence에서 추적합니다.


---

<!-- BEGIN SOURCE: CONTEXT.md -->

# Context entry point

> **Authority:** REFERENCE  
> **Owner:** task-to-source routing for Publishing Platform work  
> **Scope:** Knowledge, Project #11, and the Engine/Site/Docs owning repositories  
> **Read when:** a Chat/Agent task needs project context, canonical policy, implementation ownership, or live state  
> **Source of truth:** the routed canonical owner; live Project/Issue/PR/code/workflow state for current operational claims

Knowledge는 Publishing Platform의 **PM/coordination layer**이며, 이 문서는 Agent/Chat 작업의 canonical router다. 먼저 현재 작업 유형을 식별하고 필요한 최소 원본만 읽는다. 이 문서가 specialist policy를 다시 정의하지 않는다.

작업을 이어받을 때는 여기서 필요한 원본을 찾은 뒤 **live GitHub Project #11과 관련 Issue/PR를 조회해 현재 실행 상태를 복구한다.** 세션별 handoff 문서를 별도 상태 원장으로 유지하지 않는다.

## 자주 하는 작업

| 작업 | 참조 순서 |
|---|---|
| Agent/Chat approval·resume·tool failure·capability fallback·remote-state operation | Agent Conventions (`docs/agent-conventions.md`) → 필요한 canonical/live owner |
| 새 기능·의미 있는 동작 변경 | Feature Change Protocol (`docs/change-protocol.md`) → 해당 owner의 contract/code → 필요한 경우 Open Questions (`docs/open-questions.md`) |
| Issue 생성·수정·활성화 | .github/ISSUE_TEMPLATE (`.github/ISSUE_TEMPLATE`)에서 완료 모델에 맞는 Change/Investigation template 선택 → Work Type·Labels (`docs/work-classification.md`) → lifecycle·DoD (`docs/planning-model.md`) → activation·Project seed (`docs/project-orchestration.md`) |
| 작업 branch 시작 | Git Workflow (`docs/git-workflow.md`) → Development relation (`docs/project-orchestration.md`) → 해당 Issue와 owning repository 운영 |
| Issue 구현 시작·첫 integration slice | Implementation Practices (`docs/implementation-practices.md`) → owning repository contract/code/tests; branch/PR 경계가 필요하면 Git Workflow (`docs/git-workflow.md`) |
| PR 작성·검토·통합 | Git Workflow (`docs/git-workflow.md`) → 완료·Evidence (`docs/planning-model.md`) → 해당 Issue 및 구현 레포의 검증 방법 |
| major/minor release | Git Workflow (`docs/git-workflow.md`) → 통합 목표 (`docs/release-1.0.md`) → 검수 연결 (`docs/implementation-map.md`) |
| 새 레포 scaffolding·디렉토리 역할 | Repository Design (`docs/repository-design.md`) → Node/JS/TS 또는 Python이면 Development Toolchain (`docs/development-toolchain.md`) |
| 기술 설계·구현 조사 | 아래 레포별 참조 → 해당 레포 `/docs/`와 code·Issue·tests |
| Knowledge 문서 수정 | Knowledge Maintenance (`docs/maintenance.md`) → 해당 semantic owner |
| 계획·분류·완료 검토 | Work Classification (`docs/work-classification.md`) → Planning (`docs/planning-model.md`) → Fields (`docs/fields.md`) → 실제 Item의 Outcome/AC/Evidence |
| 기록·발표·주간 회고 | Operating Rhythm (`docs/operating-rhythm.md`) → 실제 Project Status Update·Evidence |
| 제품/cross-repository 미결 사항 | Open Questions (`docs/open-questions.md`) |

## 레포별 원본 참조

| 대상 | 현재 확인 가능한 참조 |
|---|---|
| Engine | [README](https://github.com/ooMia/oomia.github.io.engine/blob/main/README.md), [수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/content-modification-contract.md), [Issues](https://github.com/ooMia/oomia.github.io.engine/issues) |
| Site | [README](https://github.com/ooMia/oomia.github.io/blob/main/README.md), [소비 계약](https://github.com/ooMia/oomia.github.io/blob/main/docs/content-consumption-contract.md), [Issues](https://github.com/ooMia/oomia.github.io/issues) |
| Docs 콘텐츠 remote | [Repository](https://github.com/ooMia/oomia.github.io.docs) |

수정·소비 계약은 각각 owning repository가 소유한다. current implementation은 owner code/docs에서 확인하며, 통합 검증 revision과 delivery Evidence는 Implementation Map (`docs/implementation-map.md`)의 명시된 scope에서만 사용한다.

## PM-level 원본

- Architecture (`docs/architecture.md`): repository 역할과 제품 경계
- Feature Change Protocol (`docs/change-protocol.md`): 새 기능·의미 있는 동작 변경의 ownership·contract·side-effect routing
- Architecture Transition (`docs/architecture-transition.md`): 완료된 DB-backed CMS → Git-backed workspace 전환의 historical provenance
- Release 1.0 (`docs/release-1.0.md`): 통합 목표·수용 기준
- Implementation Map (`docs/implementation-map.md`): revision-bound Evidence와 통합 검수 연결
- Open Questions (`docs/open-questions.md`): 현재 별도 lifecycle로 승격되지 않은 제품/cross-repository 관심사

component 종류, editor 구현, parser/schema 세부사항, package API, adapter shape 같은 구현 정보는 Knowledge에 복제하지 않는다. 실제 code/package가 계약을 충분히 설명하면 별도의 Knowledge 원본을 만들지 않는다.

## 문서 사용

Repository source에 직접 접근할 수 있으면 이 routing을 따라 canonical owner를 직접 읽는다. Knowledge Maintenance (`docs/maintenance.md`)가 문서 Authority/구조와 generated bundle 규칙을 소유한다.

`dist/CONTEXT-BUNDLE.md`를 사용하는 환경에서도 embedded `CONTEXT.md`를 router로 사용하고 필요한 source section만 읽는다. bundle은 canonical source나 live Project/Issue/PR state를 대체하지 않는다.

<!-- END SOURCE: CONTEXT.md -->


---

<!-- BEGIN SOURCE: docs/agent-conventions.md -->

# Agent Conventions

> **Authority:** POLICY  
> **Owner:** user ↔ Chat/Agent interaction semantics for the Publishing Platform project  
> **Scope:** conversation approval, work resumption, decision boundaries, communication, tool use, remote-state reconciliation, and user-owned security operations  
> **Read when:** the task involves approval, resume/recovery, tool failure or fallback, remote mutation, ambiguous current state, or interaction decisions  
> **Enforced by:** Chat/Agent behavior; tool-specific authorization and safety controls remain owned by the corresponding integration

Project state, planning, Git workflow, implementation rules, and repository-specific technical contracts remain in their owning sources routed by CONTEXT (`CONTEXT.md`).

## Approval

`LGTM` approves the immediately preceding proposed action. Proceed without asking for conversation confirmation again.

Approval is limited to the scope of that proposal.

## Resume work

When the user says `작업 재개` or otherwise asks to resume work, recover the task from canonical sources, live Project/Issue/PR state, and owning-repository Evidence routed by CONTEXT.

Do not ask the user to restate information that can be recovered from those sources. Do not maintain a session handoff file or transcript as a parallel current-state ledger.

## Decision boundary

When existing policy and context are sufficient, make routine and reversible decisions and continue.

Ask the user only when a meaningful product, policy, ownership, or other non-derivable decision remains. Resolve factual uncertainty from canonical or live sources before asking.

Work in small, verifiable deltas. Do not make surrounding metadata verification a blocker when it does not affect the requested operation or conclusion.

## Communication

Use Korean prose for project discussion unless the task requires another language. Preserve exact English field, option, command, identifier, and API names.

When a relevant GitHub Issue, PR, branch, commit, workflow run, or other durable object has a known URL, provide a clickable link on first useful mention.

Report tool failures and unresolved state explicitly rather than presenting an intended operation as completed.

## Durable state

Promote durable decisions to their owning canonical sources rather than leaving them only in Chat.

If work must continue in a later session, represent the unfinished state in Project #11, an Issue, a PR, or owning-repository Evidence as appropriate.

Historical reasoning comes from Git history and immutable Evidence, not a session-specific handoff ledger.

## Capability fallback

Before handing a project operation back to the user as manual work, check whether a currently available project-capable tool, plugin, MCP integration, or skill can perform it directly.

Do not infer a general capability limitation from one integration's unsupported operation or denial. Treat integration capabilities as runtime state rather than maintaining a static capability inventory in project policy.

## Tool failures

Do not repeatedly guess alternative arguments after a failed tool call.

Inspect the actual error, capability, schema, or live state first, and retry only when there is a concrete reason the next attempt should differ.

A failed, rejected, expired, approval-blocked, timed-out, or otherwise ambiguous write does not establish the resulting remote state.

Before retrying an ambiguous write or concluding that manual user intervention is required, re-read the relevant canonical remote state when that state is observable.

## Remote state verification

Do not infer that a remote object is absent from a partial list result.

When a result exposes `totalCount`, returned-item count, pagination, a cursor, a limit, truncation, or another completeness signal, determine whether the retrieved result is complete before concluding that a target does not exist.

If a target is not present in an incomplete result, continue the read using the supported pagination, limit, cursor, or direct lookup mechanism before considering a write or asking the user. Prefer direct lookup by a stable identifier when it can establish the required state with equal or greater authority.

Do not infer remote state solely from the expected automation path. The presence or absence of a repository-local workflow, activation mechanism, webhook, or other implementation path does not prove the corresponding remote state. Read the remote source of truth directly when possible.

Before performing a write whose purpose is to reconcile remote state:

1. read the current canonical state;
2. determine whether the desired state is already satisfied;
3. compute and perform only the remaining delta;
4. verify the resulting canonical state with a separate read when that verification materially affects the conclusion.

If the desired state is already present, treat the operation as satisfied. Do not retry a previously failed or approval-blocked write merely because its execution result was unsuccessful.

## Tool-specific approval

Conversation approval and tool-enforced execution approval are separate concepts.

`LGTM` approves the proposed action at the Chat/Agent interaction layer. If a connected tool independently requires local, provider-side, or command-bound approval, conversation approval does not bypass that mechanism.

Likewise, an app-level permission does not override a connected tool or plugin's own authorization and safety policy.

Do not request tool-specific approval until a live-state check shows that the corresponding write is still necessary.

When a tool requires separate approval, explain only the minimum user action required by that tool. Do not present that requirement as a general limitation of the external service, ChatGPT, or other available integrations.

Do not generalize an approval requirement, denial, or unsupported operation from one tool to other tools without checking their capabilities.

After a tool-specific approval or mutation, verify the remote state when the result determines subsequent work.

## User-owned security boundary

Account, credential, secret, OAuth-consent, security-key, and equivalent security-sensitive operations remain user-owned.

Do not request secret values or assume responsibility for those operations. When user action is required, provide only the necessary procedure or executable command.

<!-- END SOURCE: docs/agent-conventions.md -->


---

<!-- BEGIN SOURCE: docs/change-protocol.md -->

# Feature Change Protocol

> **Authority:** REFERENCE  
> **Owner:** feature/change impact routing to canonical semantic owners  
> **Scope:** new features and meaningful behavior changes before implementation ownership is fixed  
> **Read when:** deciding which contracts, repositories, side effects, and open decisions a proposed change affects  
> **Source of truth:** the routed canonical owner and owning repository code/docs/live state

새 기능이나 의미 있는 동작 변경을 시작할 때 적용되는 정책·계약·소유권을 빠르게 식별하기 위한 routing reference다.

이 문서는 기존 정책을 다시 정의하지 않는다. 실제 규칙은 각 canonical source와 owning repository가 소유하며, 이 문서는 **무엇을 확인하고 어디로 이동할지**만 안내한다.

## 1. 시작점

새 기능 제안이나 기존 동작 변경은 먼저 다음을 짧게 정리한다.

1. **Outcome** — 사용자가 관찰할 수 있는 변화는 무엇인가?
2. **Primary owner** — 어느 repository가 그 결과의 1차 구현 책임을 가지는가?
3. **Affected surfaces** — 기존 contract, persistent state, build/publish boundary, external side effect 중 무엇을 건드리는가?
4. **Cross-repository impact** — producer/consumer 또는 shared semantics가 생기는가?
5. **Open decision** — 구현 전에 제품 또는 coordination 수준에서 결정해야 할 것이 남았는가?

구현 세부사항을 모두 미리 설계하려는 체크리스트가 아니다. 적용되는 surface만 식별하고 해당 원본으로 이동한다.

## 2. Routing

| 변화 | 확인할 원본 |
|---|---|
| repository 역할·제품 경계가 바뀜 | Architecture (`docs/architecture.md`) |
| canonical Markdown/document를 수정하는 기능 | Engine의 현재 modification contract와 code/tests |
| Docs에 지속 데이터를 추가하거나 content identity에 영향을 줌 | Docs의 owning source; cross-repository 의미가 생기면 Architecture 확인 |
| Site rendering·component·consumer semantics가 바뀜 | Site의 current consumption contract와 code/tests |
| external network, paid API, remote mutation 등 side effect가 생김 | owning repository의 기술 계약·trigger policy·tests |
| build/publish 재현성이나 release boundary가 바뀜 | owning repository 검증 + Git Workflow (`docs/git-workflow.md`) + 필요한 경우 Implementation Map (`docs/implementation-map.md`) |
| 둘 이상의 repository가 같은 semantics를 소비함 | semantics의 단일 owner를 정하고 다른 repository는 원본을 참조 |
| 제품/cross-repository 결정이 아직 남음 | Open Questions (`docs/open-questions.md`) |
| package/module/API 내부 선택처럼 owner 안에서 결정 가능한 구현 세부사항 | Knowledge에 복제하지 않고 owning repository code/docs에서 결정 |

소유권이 불분명하면 구현 전에 먼저 owner를 정한다. 단순히 여러 repository가 관련된다는 이유만으로 Knowledge가 기술 계약의 owner가 되지는 않는다.

## 3. Change impact routing

Repository Issue를 만들기 전에 의미 있는 영향이 있는 surface만 식별해 실제 owner와 원본으로 routing한다.

- **Ownership:** primary owner와 실제로 수정되는 repository
- **Contract surfaces:** 영향을 받는 canonical contract/schema
- **Persistent state:** 새로 생기거나 변경되는 durable state
- **External effects:** network, paid call, remote mutation, credential boundary 등
- **Cross-repository dependency:** producer/consumer 또는 shared semantics
- **Open questions:** 구현 전에 남아 있는 Knowledge-level OQ

이 목록은 Issue body에 그대로 복제하는 필수 form이 아니다. 작업 수행이나 검증에 필요한 정보만 Change Issue의 optional `Context`에 남기고, 결정된 규칙과 장기 semantics는 실제 owner 문서를 참조한다. 해당 없는 항목을 채우기 위해 내용을 만들지 않는다.

## 4. 기록 위치

변경 중 발견한 정보는 성격에 따라 한 곳에만 둔다.

| 성격 | 원본 |
|---|---|
| 오래 유지되는 공통 invariant·coordination rule | Knowledge의 해당 canonical 문서 |
| repository가 외부에 보장하는 기술 contract | owning repository docs/schema/tests |
| 현재 구현 방식 | owning repository code/tests |
| 아직 결정하지 않았거나 Evidence가 부족한 제품/cross-repo 문제 | Open Questions (`docs/open-questions.md`) |
| 작업 결과·AC·Evidence | 실제 Project Item / Repository Issue / PR |

결정이 끝난 Open Question은 실제 canonical source로 이동하고, Open Question 자체를 두 번째 원본으로 유지하지 않는다.

## 5. 구현 진입 기준

구현에 들어가기 전에 최소한 다음이 분명해야 한다.

- Outcome과 primary owner
- 변경되는 contract surface 또는 변경 없음
- 비용·network·remote mutation 같은 external effect의 trigger boundary
- 지속 데이터가 있다면 owner와 재현 가능한 저장 위치
- cross-repository semantics가 있다면 단일 원본
- 사용자 결정이 필요한 Open Question이 있다면 구현 가능한 범위와 분리

나머지는 owning repository에서 작은 검증 가능한 integration slice와 실제 Evidence를 통해 구체화한다. 이 protocol 때문에 불필요한 선행 설계나 문서 작성을 blocker로 만들지 않는다.

## 6. 완료

완료 판정은 Planning Model (`docs/planning-model.md`)을 따른다.

기능 구현은 설계 문서 존재만으로 완료되지 않는다. 적용되는 contract와 code/tests가 일치하고, Acceptance Criteria와 Quality Requirements를 실제 Evidence로 검증해야 한다.

<!-- END SOURCE: docs/change-protocol.md -->


---

<!-- BEGIN SOURCE: docs/architecture-transition.md -->

# Architecture Transition — DB-backed CMS → Git-backed Content Workspace

상태: **Completed — historical transition record**  
기준일: 2026-09-21  
완료 확인: 2026-10-05

이 문서는 DB-backed CMS 중심 구현에서 Git-backed document workspace로 전환할 때 사용한 **cross-repository 전환 순서·안전 규칙·Evidence 연결**을 보존한다. 전환은 완료되었으며 이 문서는 현재 작업에 대한 active migration gate가 아니다. Engine/Site 내부의 현재 구현 상태와 전략은 각 repository의 문서와 코드가 소유한다.

장기 제품 경계는 Architecture (`docs/architecture.md`), 통합 목표는 Release 1.0 (`docs/release-1.0.md`), 완료 시점의 통합 검수는 Implementation Map (`docs/implementation-map.md`)을 따른다.

## 1. 전환 목적

기존 경로는 Payload/PostgreSQL/Lexical과 DB→Markdown export를 canonical publishing path로 사용했다. 새 경로는 다음 책임을 분리한다.

```text
authoring tool
     ↓
Git-backed Docs workspace
     ↓
Site consumer
     ↓
Live Site

optional Engine mutation → same Docs workspace
```

변경 목적은 canonical content와 authoring 도구 사이의 불필요한 persistence/conversion layer를 제거하는 것이다.

## 2. 전환 후 요구사항으로 사용하지 않는 전제

- PostgreSQL 또는 Payload가 canonical content source다.
- visual editor state를 변환해야만 content를 저장할 수 있다.
- Docs는 DB snapshot에서만 생성되는 projection이다.
- Engine 실행 또는 특정 editor 사용이 commit/Site 소비의 선행 조건이다.
- 과거 Issue·branch 구현 계획이 현재 owner code/docs보다 우선한다.
- 기존 코드 투자량이 현재 architecture의 책임 경계를 결정한다.

과거 구현에서 지속 가치가 있는 결정·전환 맥락은 migration 기록과 Knowledge 문서에 흡수한다. 일회성 legacy/archive branch 자체는 장기 archive로 유지하지 않는다.

## 3. 전환 결과

- canonical content는 md-like filesystem documents + frontmatter + assets다.
- durable shared revision은 `oomia.github.io.docs` commit SHA다.
- Site는 자신의 실제 consumer implementation으로 Docs를 판정한다.
- Engine은 선택 기능이며 실행 여부를 Site가 요구하지 않는다.
- editor 종류, component catalog, adapter 형식, Site 내부 layout/toolchain은 Knowledge-level gate가 아니다.
- 실제 component/syntax support는 Site와 관련 package/code가 소유한다.

## 4. Repository별 migration source

- Engine: [수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/content-modification-contract.md), [migration record](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/migration.md)
- Site: [소비 계약](https://github.com/ooMia/oomia.github.io/blob/main/docs/content-consumption-contract.md)
- Docs: canonical content remote와 history
- Knowledge: 통합 목표, 전환 순서, acceptance, Evidence linkage

## 5. 완료된 migration sequence

아래 순서는 전환 기간에 적용한 단계다. 현재의 일반 기능 작업이 이 순서를 다시 수행해야 한다는 의미는 아니다.

### Phase A — Observe and preserve

- legacy history와 미병합 작업을 임의로 덮어쓰거나 삭제하지 않는다.
- Engine/Site/Docs의 live state와 owner code/docs를 확인한다.
- 기존 Evidence가 어느 revision과 architecture를 검증했는지 구분한다.

### Phase B — Prove direct Docs consumption

- 사용자가 직접 작성·commit한 실제 corpus를 Site가 소비할 수 있음을 검증한다.
- source 보존과 rendering 사이에 불필요한 mandatory conversion이 없음을 확인한다.
- editor 또는 component integration이 필요하면 owning implementation에서 검증한다.

### Phase C — Rewire publishing Evidence

- DB snapshot export를 공통 publish 선행 조건에서 제거한다.
- Docs canonical revision과 Site revision·delivery result를 연결한다.
- Engine을 사용한 경우 그 Evidence는 Engine 기능 검수에 별도로 연결한다.
- 문서 검증과 runtime/build/deployment 검증을 서로 대체하지 않는다.

### Phase D — Retire legacy

대체 경로가 필요한 acceptance를 충족한 이후에만 legacy runtime/scripts/tests/config를 owning repository 판단과 Evidence에 따라 제거하거나 archive한다.

## 6. 전환 안전 규칙

전환 기간에는 다음 규칙을 적용했다.

- **Big-bang delete 금지**
- **Dual-SoT 장기 운영 금지**
- **Silent source loss 금지**
- **Site verification 생략 금지**
- **Owner 우회 금지**
- **Evidence 범위 확대 금지**

이 규칙은 전환의 provenance와 판단 근거로 보존한다. 현재 구현 파일 목록, package boundary, editor 종류, component manifest, toolchain migration 방법은 계속 owning repository가 결정하며 Knowledge가 복제하지 않는다.

## 7. 완료 판정

2026-10-05에 completion criteria를 live owner state와 revision-bound Evidence에 다시 대조해 전환을 완료로 판정했다.

- [x] Docs repository가 canonical content remote로 실제 운영된다.
- [x] Site가 직접 작성된 canonical Docs revision을 실제 build/deploy한다.
- [x] publish Evidence가 Docs SHA + Site revision + delivery result를 연결한다.
- [x] 선택적으로 사용한 Engine 기능은 별도 Evidence로 검증된다.
- [x] legacy Payload/PostgreSQL runtime은 current Engine history에 이식되지 않았고, owning migration record가 filesystem-first runtime과 legacy boundary를 보존한다.
- [x] Implementation Map (`docs/implementation-map.md`)이 새 기준 revisions로 재검증됐으며 1.0 acceptance capability에 남은 미충족 gap이 없다.

완료 판정의 통합 Evidence는 이 문서와 같은 revision의 Implementation Map (`docs/implementation-map.md`), Engine [migration record](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/migration.md), Site [소비 계약](https://github.com/ooMia/oomia.github.io/blob/main/docs/content-consumption-contract.md)에서 추적한다. 문서 정리만으로 completion을 판정한 것이 아니다.

후속 기능 변경은 현재 Architecture와 각 owning repository의 live code/docs로 판단한다. 새로운 cross-repository migration이 필요하면 이 완료 기록을 다시 active로 간주하지 않고 별도 Change로 정의한다.

<!-- END SOURCE: docs/architecture-transition.md -->


---

<!-- BEGIN SOURCE: docs/architecture.md -->

# Architecture

상태: Publishing Platform의 repository 역할과 PM-level 제품 경계를 설명하는 canonical 문서.

## 원칙

- 구현 작업보다 제품 결과와 시스템 책임을 기준으로 계획한다.
- canonical content는 **frontmatter를 포함할 수 있는 md-like filesystem documents + assets**다.
- authoring client는 canonical source 위의 교체 가능한 도구다. Obsidian, visual editor, IDE, Agent 등 어떤 구현을 선택하는지는 Knowledge의 제품 경계가 아니다.
- 사용자가 작성한 파일은 선택적 Engine 후처리 없이도 commit할 수 있다.
- Site는 생산 도구나 처리 이력이 아니라 실제 입력과 자신의 consumer contract로 Publishability를 판정한다.
- 실제 지원 syntax·schema·component semantics는 이를 구현·소비하는 code/package가 source of truth다. Knowledge는 구현 catalog나 manifest를 복제하지 않는다.
- storage / editing / mutation / publishing / presentation을 서로 다른 책임으로 취급한다.
- canonical content를 표현하기 위해 별도 DB가 필요하지 않으면 도입하지 않는다.

## 레포의 역할

| 레포 | 책임 |
|---|---|
| `oomia.github.io.engine` | md-like document에 대한 선택적 in-place 수정·후처리 기능 |
| `oomia.github.io.docs` | canonical content remote와 shared Git revision history |
| `oomia.github.io` | Docs 입력을 실제 구현 계약에 따라 소비·렌더링·검증하고 전달 |
| `oomia.github.io.knowledge` | 공통 workflow·coordination·개발 기준·통합 목표·acceptance·Evidence linkage |

`mono`는 Site repository의 로컬 별칭이며 별도 원격 repository가 아니다.

## Canonical content workspace

```text
Compatible authoring tool
          ↓
md-like document + frontmatter + assets
          ↓
      user commit
          ↓
      Docs revision
          ↓
       Site consumer
          ↓
        Live Site

optional Engine mutation ──→ same document workspace
```

Docs commit SHA가 공유·재현 가능한 canonical revision을 식별한다. Git history가 기본 revision/diff/rollback mechanism이다.

어떤 editor 구현을 사용할지는 이 경계를 바꾸지 않는다. 필요한 editor가 frontmatter를 포함한 동일 source를 관리할 수 있고 의미를 보존하면 충분하다. 실제 editor UI를 Site repository 안에 둘지, 별도 app으로 둘지 역시 구현 owner가 결정한다.

## Implementation source of truth

유효한 콘텐츠를 외부 planning 문서가 code에 강제하지 않는다.

- Markdown/MDX parser, frontmatter schema, component renderer와 실제 tests가 현재 Site 소비 능력을 정의한다.
- 외부 component package를 사용하면 해당 package와 Site integration이 component semantics의 원본이다.
- custom component가 필요하면 renderer와 authoring surface가 가능한 한 동일 package/codebase를 소비한다.
- editor API가 별도 component metadata 형식을 요구하면 얇은 adapter를 둘 수 있지만, adapter는 두 번째 semantics 원본이 아니다.
- Knowledge는 지원 component 목록, props schema, editor adapter 형식, manifest catalog를 소유하지 않는다.

코드가 계약을 충분히 표현하는 경우 별도 문서화를 요구하지 않는다. 문서는 제품 경계, 사용자가 관찰할 계약, 검증 방법처럼 코드만으로 찾기 어려운 정보를 설명한다.

## Engine boundary

문서 mutation의 기술 설계는 [Engine 수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/content-modification-contract.md)이 소유한다. Agent 후처리를 포함한 선택 기능은 Docs commit이나 Site 소비의 필수 단계가 아니다.

## Publishing boundary

[Site 소비 계약](https://github.com/ooMia/oomia.github.io/blob/main/docs/content-consumption-contract.md)이 실제 입력·렌더링·component integration·publishability 검증을 소유한다.

- 입력 계약을 만족하는 사용자 작성 파일은 그대로 소비할 수 있다.
- Engine 후처리나 별도 projection은 공통 발행 선행 조건이 아니다.
- 통합 검수는 Docs revision, Site revision과 delivery result를 연결한다.
- Engine을 사용한 경우 실행 Evidence는 해당 Engine 기능 검수에 별도로 연결한다.

## Contract surfaces

| Surface | owner |
|---|---|
| 제품 수준 repository 역할·통합 경계 | Knowledge |
| 문서 mutation | Engine code + Engine contract |
| canonical content revision | Docs Git history |
| 실제 콘텐츠 소비 가능성·component semantics | Site code/packages + Site contract |
| authoring UI/editor integration | 실제 구현 repository의 code/docs |
| release acceptance·cross-repository Evidence linkage | Knowledge |

상호 링크는 원본 탐색을 위한 것이며 상대 runtime 실행을 요구하는 의존성을 뜻하지 않는다.

<!-- END SOURCE: docs/architecture.md -->


---

<!-- BEGIN SOURCE: docs/development-toolchain.md -->

# Development Toolchain — Vite+ / uv First

> **Authority:** GUIDANCE  
> **Owner:** project-wide toolchain defaults and tool-selection principles  
> **Scope:** Publishing Platform repositories using Node.js/JavaScript/TypeScript or Python tooling  
> **Read when:** choosing a repository toolchain, replacing overlapping tooling, or reviewing tool ownership

이 문서는 공통 **default와 선택 원칙**을 제공한다. exact runtime/tool version, command, config, CI job, hook, IDE setting과 migration state는 owning repository가 소유한다. repository-local 이유가 있으면 이 GUIDANCE와 다른 도구를 사용할 수 있다.

## Defaults

| Project type | Preferred default |
|---|---|
| Node.js / JavaScript / TypeScript | Vite+ (`vp`) first |
| Python | `uv` first |

같은 책임을 가진 도구를 단순 선호나 과거 습관 때문에 여러 기본값으로 유지하지 않는 편을 권장한다.

## Node / JS / TS

- Vite+가 제공하는 package management, static checks, test/build/task, environment, hook 기능은 가능한 한 `vp` command surface를 우선한다.
- framework/package 고유 command가 필요하면 owning repository가 명시적인 task/script로 노출하는 편이 좋다.
- Vite+와 같은 책임을 가진 Turbo, Husky, formatter/linter wrapper 등을 병행할 때는 실제 남아 있는 responsibility를 repository-local source에서 설명한다.
- runtime/package-manager/tool version은 repository-declared state로 재현 가능하게 유지한다.
- publish/deploy/Git mutation 같은 side-effect operation을 cacheable pure task와 같은 방식으로 취급하지 않는다.

현재 exact `vp` command, `vite.config.*`, package-manager pinning, hook/cache/CI setup은 owning repository README/config/workflow를 직접 확인한다.

## Python

- project metadata와 dependency declaration은 `pyproject.toml` 중심 구성을 우선한다.
- dependency synchronization, lock, add/remove, project command 실행은 `uv` interface를 우선한다.
- reproducible dependency state가 필요하면 repository-owned `uv.lock`을 사용하는 편이 좋다.
- Python/runtime requirement와 exact version은 owning repository 설정이 선언한다.
- `pip`, Poetry, Pipenv, Conda 등은 runtime/distribution 제약이 있을 때 선택할 수 있지만 같은 responsibility의 기본 project manager를 불필요하게 중복하지 않는다.

exact `uv` command, Python version, environment/CI setup은 owning repository가 소유한다.

## Shared heuristics

- **Single owner:** formatter, linter, task runner, package/project manager 같은 동일 concern을 여러 계층이 독립적으로 소유하지 않는다.
- **Reproducibility:** developer machine의 우연한 global environment보다 repository-declared state를 우선한다.
- **Repository-local application:** 공통 default의 실제 적용 상태는 repository code/config/docs에서 확인한다.
- **Explicit deviation:** default와 다른 선택은 기술적 이유와 verification 방법이 repository-local source에서 이해 가능하도록 한다.
- **Side-effect boundary:** build/check와 publish/deploy/Git mutation을 구분한다.

## Current implementation references

- Engine: [README](https://github.com/ooMia/oomia.github.io.engine/blob/main/README.md)
- Site: [README](https://github.com/ooMia/oomia.github.io/blob/main/README.md)
- Docs: repository workflow/config가 실제 content preparation과 runner/tool usage를 소유한다.

위 링크는 **current implementation lookup**이며 이 GUIDANCE의 Evidence나 강제 조건이 아니다.

## External references

- Vite+: https://viteplus.dev/guide/
- uv: https://docs.astral.sh/uv/

<!-- END SOURCE: docs/development-toolchain.md -->


---

<!-- BEGIN SOURCE: docs/repository-design.md -->

# Repository Design

> **Authority:** POLICY  
> **Owner:** cross-repository path semantics, repository/document ownership boundaries, and source/generated-state boundaries  
> **Scope:** Publishing Platform repositories when choosing or interpreting repository structure  
> **Read when:** creating a repository, introducing a directory/package/config boundary, or reviewing repository structure  
> **Enforced by:** repository review and owning repository code/config; exact framework/package layout remains repository-local

이 문서는 repository마다 같은 경로 이름이 서로 다른 의미를 갖거나, 같은 concern의 owner가 여러 위치로 분산되는 것을 방지한다. 구조 선택에 대한 best practice는 같은 reference unit에서 **GUIDANCE**로 구분한다.

## POLICY — Common repository scheme

경로를 사용한다면 다음 의미를 유지한다. 모든 repository가 모든 경로를 만들 필요는 없다.

| Path | Shared meaning |
|---|---|
| `docs/` | 해당 repository가 소유하는 설계·계약·reference 문서 |
| `apps/` | 독립적으로 실행·배포되는 program/runtime entrypoint |
| `packages/` | 실제 재사용·dependency/API boundary를 가진 library |
| `tools/` | product runtime 밖의 repository development tool/generator |
| `scripts/` | repository operation을 실행하는 작은 script entrypoint |
| `templates/` | 반복 생성하는 문서·artifact의 입력 형상 |
| `schemas/` | 해당 repository가 소유하는 machine-readable contract |
| `config/` | 해당 repository가 소유하는 declarative setting/registry |
| `tests/` | owning code/contract의 verification 및 fixture; app/package 내부에도 같은 의미 |
| `.github/` | GitHub automation과 GitHub-specific configuration |
| `.vite-hooks/` | repository-owned Vite+ Git hook |
| `dist/` | source에서 재생성되는 build/delivery/generated artifact |

- 같은 path를 repository마다 다른 semantic role로 재정의하지 않는다.
- 새 cross-repository common path가 필요하면 이 POLICY에서 의미를 먼저 정의한다.
- framework-required subdirectory와 실제 package composition은 owning repository가 소유한다.
- `ooMia/oomia.github.io.docs`라는 repository 이름과 각 repository의 `docs/` path는 별개다. content repository라는 이유로 `docs/` 의미를 canonical article tree로 바꾸지 않는다.

## POLICY — Ownership boundaries

- Knowledge의 `docs/`는 project-wide coordination/policy/reference를, implementation repository의 `docs/`는 해당 implementation이 소유하는 technical contract/reference를 둔다.
- 여러 repository가 같은 technical semantics를 소비해도 계약 전체를 자동으로 Knowledge가 소유하지 않는다. 실제 semantic owner를 하나 정하고 다른 repository는 그 원본을 참조한다.
- 같은 concern의 configuration source를 여러 위치에 복제하지 않는다. repository-wide shared config, framework/runtime config, CI, repository-local exception은 각각 명시적인 owner를 갖는다.
- generated/local/runtime state를 canonical source와 혼동하지 않는다. `dist/`, caches, temporary workspace, container state, credentials 같은 값은 source-of-truth가 아니다.
- canonical content는 Engine repository의 generated output이 아니라 external/shared Docs workspace와 its Git revision이 소유한다.
- repository-specific runtime, command, branch topology, tool version, framework API는 owning repository가 소유한다.

작업별 canonical source routing은 CONTEXT (`CONTEXT.md`), toolchain defaults는 Development Toolchain (`docs/development-toolchain.md`), integration rules는 Git Workflow (`docs/git-workflow.md`)이 소유한다.

## GUIDANCE — Package and directory boundaries

새 boundary는 미리 추측하기보다 실제 responsibility/dependency가 생겼을 때 만든다.

### Apps, packages, and tools

`apps/*`가 적합한 신호:

- 독립적으로 실행하거나 배포할 수 있다.
- process/container/UI/CLI 같은 runtime entrypoint가 있다.
- 다른 app과 lifecycle이 분리된다.

`packages/*`가 적합한 신호:

- 둘 이상의 실제 consumer가 있다.
- 독립 dependency/API boundary가 중요하다.
- 별도 unit contract로 검증하는 편이 명확하다.
- artifact로 pack/publish할 실제 가능성이 있다.
- execution context를 분리할 필요가 있다.

`tools/*`는 product runtime 밖의 generator, migration helper, fixture/evidence utility, local diagnostic 등에 적합하다.

파일 수가 많아졌다는 이유만으로 package를 만들지 않는다.

### Package-light by default

workspace 사용 자체와 package proliferation을 구분한다. 처음부터 `core`, `utils`, `infra`, `shared` 같은 추상 경계를 예측해 만들기보다 실제 consumer/contract가 생길 때 capability 기반 이름을 부여한다.

catch-all 이름 자체가 금지되는 것은 아니지만 “어떤 dependency boundary를 소유하는가?”에 명확히 답할 수 있어야 한다.

### Dependency direction and versions

- dependency는 consumer → provider 관계가 source/config에서 명시적으로 드러나게 한다.
- task ordering을 표현하려고 가상의 dependency graph를 만들지 않는다.
- cycle이 생기면 task-runner 설정으로 숨기기보다 boundary를 재검토한다.
- 여러 package가 동일 compatibility policy를 실제로 공유하면 version constraint를 한 곳에서 관리하는 편을 우선한다.
- 한 consumer만 사용하는 dependency까지 공통 registry로 끌어올리지 않는다.

exact package-manager/catelog/lockfile 방식은 Development Toolchain (`docs/development-toolchain.md`)과 owning repository config가 소유한다.

### Root responsibility

workspace root는 orchestration/configuration boundary로 두고 product business logic의 기본 owner로 사용하지 않는 편을 권장한다.

적절한 root concern은 workspace metadata, shared compiler/tool config, repository-wide tasks, package-manager policy, CI/hook integration 등이다.

### Co-location and execution context

코드는 소비 책임과 가까이 둔다. 작은 package에 layer directory를 미리 만들기보다 책임이 실제로 분리될 때 이름을 부여한다.

directory/package 분리를 고려할 신호:

- host filesystem / Git capability
- container/process runtime
- pure validation/domain logic
- child process execution
- browser/editor integration
- Site verification adapter처럼 실행 권한·환경이 다른 context

기술 패턴 이름보다 “어디에서 실행되고 어떤 capability를 허용하는가?”를 우선한다.

### Tests

test는 가능한 한 owning code/contract와 가까이 둔다.

- unit/package integration → owning app/package
- cross-repository/system integration → 명확한 integration/e2e owner
- fixture → 해당 test owner와 가까운 위치

root `tests/` 하나에 모든 레벨의 test를 모으거나 실제 content corpus와 regression fixture의 역할을 섞지 않는 편을 권장한다.

## GUIDANCE — Boundary checklist

새 directory/package를 만들기 전에 확인한다.

1. 독립 runtime인가?
2. 둘 이상의 실제 consumer가 있는가?
3. dependency/API boundary가 필요한가?
4. 별도 test/build/release lifecycle이 있는가?
5. 기존 owner 안에 두면 실제 문제가 생기는가?

대부분 아니면 새 package가 문제를 줄이기보다 새 owner를 늘릴 가능성이 높다.

새 tool 선택은 Development Toolchain (`docs/development-toolchain.md`)이 소유한다. implementation 시작 방식과 green scaffold는 Implementation Practices (`docs/implementation-practices.md`)가 별도 reference unit으로 소유한다.

## Composition

이 문서는 **repository structure** 판단의 reference unit이다.

- toolchain 선택만 필요하면 Development Toolchain (`docs/development-toolchain.md`)을 직접 읽는다.
- 이미 구조가 정해진 Issue 구현을 시작할 때는 Implementation Practices (`docs/implementation-practices.md`)를 직접 읽는다.
- branch/PR/release integration은 Git Workflow (`docs/git-workflow.md`)을 직접 읽는다.
- technical API/runtime contract는 owning repository docs/code를 읽는다.

서로 독립적으로 참조되는 concern을 이 문서에 단순히 “engineering”이라는 이유로 합치지 않는다.

<!-- END SOURCE: docs/repository-design.md -->


---

<!-- BEGIN SOURCE: docs/implementation-practices.md -->

# Implementation Practices

> **Authority:** GUIDANCE  
> **Owner:** cross-repository implementation-start and short feedback-loop practices  
> **Scope:** implementation work after Outcome, owner, and acceptance boundary are sufficiently defined  
> **Read when:** starting an Issue implementation, preparing the first integration slice, or deciding how much to implement before verification

이 문서는 구현을 시작하고 검증 가능한 작은 변화로 진전시키는 **권고 방식**을 소유한다. lifecycle 의미는 Planning Model (`docs/planning-model.md`), branch/PR integration은 Git Workflow (`docs/git-workflow.md`), repository structure는 Repository Design (`docs/repository-design.md`), exact commands와 runtime/tooling은 Development Toolchain (`docs/development-toolchain.md`)이 소유한다.

## Green scaffold

Issue-linked implementation의 첫 slice는 완성 구현보다 **실행 가능한 최소 구조와 dependency boundary**를 먼저 연결하는 방향을 권장한다.

- 핵심 flow를 실제 entrypoint까지 연결한다.
- 아직 사용자 정책이나 domain decision이 필요한 custom logic은 명시적인 `TODO` placeholder로 남길 수 있다.
- 최소 contract test는 통과 가능한 상태를 유지한다.
- 의도적인 red scaffold는 failing test 자체가 Outcome이거나 사용자가 명시적으로 요청한 경우에만 사용한다.
- 첫 update는 가능한 한 하나의 응집된 변화로 유지한다.
- scaffold는 착수 방식일 뿐 최종 Acceptance Criteria나 Definition of Done을 약화하지 않는다.

## Feedback loop

수정 비용과 검증 가능성에 따라 generation과 verification의 순서를 조절한다.

- 생성 이후 수정이 어렵다면 필요한 context와 constraint를 먼저 확보하고 첫 결과의 정확도를 높인다.
- 수정이 쉽다면 과도한 선행 설계보다 **generate → verify → feedback → revise**의 짧은 반복을 사용한다.
- 발견된 불일치에 실제 조치를 취할 수 없는 검사를 반복적으로 추가하지 않는다.
- 주변 metadata 검사를 본 Outcome의 blocker로 만들지 않는다. 단, completion claim에 필요한 Evidence는 생략하지 않는다.
- 검증 실패가 implementation assumption을 깨뜨리면 더 많은 코드를 쌓기 전에 owner contract와 boundary를 다시 확인한다.

## Composition

이 GUIDANCE는 다른 owner를 대체하지 않는다.

- 구현이 시작되었는지와 Status 의미 → Planning Model (`docs/planning-model.md`)
- branch/PR/integration path → Git Workflow (`docs/git-workflow.md`)
- package/directory/dependency boundary → Repository Design (`docs/repository-design.md`)
- toolchain default와 repository-local command → Development Toolchain (`docs/development-toolchain.md`)
- user↔Agent approval/resume/tool semantics → Agent Conventions (`docs/agent-conventions.md`)

작업이 이미 명확한 repository structure 안에서 진행된다면 이 문서만 직접 읽고 Repository Design을 추가로 읽지 않아도 된다. 반대로 package/directory boundary만 검토하는 작업은 이 문서를 읽을 필요가 없다. 이 독립 retrieval 경계가 이 문서를 별도 reference unit으로 유지하는 이유다.

<!-- END SOURCE: docs/implementation-practices.md -->


---

<!-- BEGIN SOURCE: docs/maintenance.md -->

# Knowledge Maintenance

> **Authority:** POLICY  
> **Owner:** Knowledge repository maintenance  
> **Scope:** canonical Knowledge documents, repository bootstrap/routing surfaces, and generated context maintenance  
> **Read when:** creating, editing, reviewing, or restructuring Knowledge documentation  
> **Enforced by:** document review, owner-source discipline, repository automation, and live GitHub integration rules where applicable

이 문서는 `ooMia/oomia.github.io.knowledge` **자체를 수정·유지하는 방법과 canonical document의 semantic quality 기준**을 소유한다. 외부 contributor를 위한 기여 정책이 아니며, 제품·planning·Git workflow 같은 다른 concern의 의미를 다시 정의하지 않는다.

이 문서에서 대문자 `MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT`, `MAY`는 [BCP 14 / RFC 2119](https://www.rfc-editor.org/rfc/rfc2119)와 [RFC 8174](https://www.rfc-editor.org/rfc/rfc8174)에 따른 requirement level로 사용한다. 해당 의미는 대문자로 표기한 경우에만 적용한다.

## Document authority

Canonical 문서는 주된 역할에 따라 하나의 **Authority**를 가진다.

| Authority | 의미 | 작성 원칙 |
|---|---|---|
| `POLICY` | project/repository가 준수해야 하는 invariant, contract, normative meaning | requirement를 명확히 하고 예제는 경계 해석에 필요한 경우로 제한한다. |
| `GUIDANCE` | 공통적으로 적용되는 default, best practice, caution, heuristic | 구체적 이유가 있으면 일탈할 수 있으며 rationale·trade-off·example을 적극적으로 사용할 수 있다. |
| `REFERENCE` | 사용법, 현재 interface, 상세 설명, lookup material | 독립적인 normative force를 만들지 않고 실제 behavior의 source of truth를 명시한다. |
| `RECORD` | revision-scoped Evidence, historical provenance, completed migration/release snapshot | 무엇이 언제 어떤 범위에서 사실이었거나 검증됐는지 보존하며 현재 정책을 정의하지 않는다. |

Machine-readable schema, workflow/action/test, code/config, live GitHub Project/Issue/PR state는 prose Authority와 별개의 operational source다. 문서는 이들을 설명하거나 연결할 수 있지만 실제 live state나 executable behavior를 대신하지 않는다.

문서는 주된 Authority 하나를 **MUST** 가진다. Authority purity 자체는 문서 분리 기준이 아니다. 문서 경계는 아래의 **reference unit** 원칙을 우선하며, 같은 작업에서 함께 소비되는 짧은 subordinate 내용은 다른 Authority라도 같은 문서에 둘 수 있다. 주된 Authority와 다른 subordinate section은 heading에서 그 강도를 명시한다(예: `## GUIDANCE — Package boundaries`).

## Document contract

Canonical specialist document는 제목 바로 아래에 다음 4줄 semantic header를 **MUST** 사용한다. 이것이 renewal에서 의도적으로 고정하는 최소 Markdown syntax다.

```md
> **Authority:** POLICY
> **Owner:** ...
> **Scope:** ...
> **Read when:** ...
```

본문 heading과 절 구성은 고정하지 않는다. 이 header는 다음 질문에 즉시 답하기 위한 contract다.

| Field | 질문 |
|---|---|
| **Authority** | 이 문서는 `POLICY / GUIDANCE / REFERENCE / RECORD` 중 어떤 강도로 읽어야 하는가? |
| **Owner** | 이 정보의 단일 semantic owner는 누구인가? |
| **Scope** | 어떤 repository, workflow, product boundary, revision 또는 task에 적용되는가? |
| **Read when** | 어떤 작업에서 이 문서를 working set에 가져와야 하는가? |

필요할 때 class별 field를 추가한다.

- `POLICY`: 실제 enforcement owner가 있으면 **Enforced by**를 둔다.
- `REFERENCE`: 현재 behavior가 code/config/live state에 있으면 **Source of truth**를 둔다.
- `RECORD`: 검증·역사 범위를 고정하기 위해 **Evidence scope** 또는 동등한 revision/time boundary를 둔다.
- `GUIDANCE`: 별도 필수 확장 field는 없다.

README, AGENTS, CONTEXT 같은 root surface도 이 4줄 header를 사용한다. root surface의 본문은 routing 비용을 낮추는 것이 우선이며 specialist policy를 재서술하지 않는다.

## Renewal migration

이 contract는 renewal의 목표 상태이며 기존 문서에 header만 일괄 추가하기 위한 규칙이 아니다.

- 새 canonical specialist document는 이 contract를 **MUST** 따른다.
- 기존 문서의 Authority, Owner, Scope 또는 retrieval boundary를 실질적으로 변경할 때는 같은 변경에서 contract를 **MUST** 명시한다.
- 아직 renewal되지 않은 기존 문서는 다음 관련 renewal에서 semantic boundary와 함께 분류한다. header가 없다는 이유만으로 현재 의미를 무효로 보지 않는다.
- migration은 metadata 추가만 수행하지 않고 Owner / Necessity / Duplication / Retrieval / Executability 검토와 함께 진행한다.


## Structure by authority

동일한 Authority의 문서는 비슷한 **해석 순서**를 제공해야 한다. 아래는 content frame이며 exact heading 이름이나 모든 절의 존재를 강제하지 않는다.

### POLICY

기본 순서:

1. scope / applicability
2. normative requirements
3. ownership / source-of-truth boundary
4. enforcement / verification
5. exception 또는 reference가 실제로 필요할 때만 추가

`POLICY`에서 BCP 14 keyword는 강제력을 구분할 필요가 있을 때만 **SHOULD** 사용한다. normative requirement는 가능하면 **하나의 독립적인 rule을 하나의 list item에** 표현해 review와 permalink reference가 쉬워지게 한다. 물리적인 한 줄 길이 자체를 강제하지 않는다. 예제는 requirement와 명확히 분리하고, concrete tool/repository example이 normative rule처럼 읽히지 않도록 한다.

### GUIDANCE

기본 순서:

1. scope / intended use
2. recommendations
3. rationale / trade-offs
4. examples / counterexamples
5. references when useful

`GUIDANCE`는 BCP 14 대문자 keyword로 독립적인 normative force를 만들지 않는다. 권고에서 벗어나는 경우 이유와 결과를 이해할 수 있게 작성하되 예외 승인을 정책 절차처럼 만들지 않는다.

### REFERENCE

기본 순서:

1. purpose / lookup scope
2. current interface, command, schema, mapping, or procedure
3. source of truth / freshness boundary
4. examples
5. limitations / verification when relevant

`REFERENCE`는 current code/config/live state를 복제하는 두 번째 원본이 되어서는 안 된다.

### RECORD

기본 순서:

1. status / historical or revision scope
2. Evidence
3. findings / outcome
4. limitations
5. related current canonical sources

`RECORD`의 claim은 명시된 Evidence scope를 넘어 현재 상태로 확장하지 않는다.

## Document boundaries and reference units

문서의 1차 분리 기준은 **독립적인 reference/retrieval 단위인가**이다.

- 두 concern이 서로 다른 작업에서 독립적으로 참조된다면 separate document로 유지한다.
- A 작업이 B→C를 읽더라도 다른 작업이 B만 읽는다면 B와 C를 단순히 자주 같이 등장한다는 이유로 합치지 않는다.
- 반대로 별도의 독립 retrieval path가 없고 동일 task에서 거의 항상 함께 소비된다면, semantic owner·change cadence·size를 함께 검토해 통합할 수 있다.
- POLICY와 GUIDANCE의 강도 차이만으로 파일을 분리하지 않는다. 같은 reference unit이면 dominant Authority 아래 subordinate section을 명시적으로 표시할 수 있다.
- independent retrieval value가 생기면 section을 새 document로 분리하고 CONTEXT/routing에서 직접 참조한다.
- 문서 수를 줄이는 것 자체가 목표가 아니다. composition 시 불필요한 context를 읽지 않으면서 owner를 쉽게 조합할 수 있는 구조가 목표다.

이 원칙은 GitHub permalink를 활용한 section/rule reference와 양립한다. line-level permalink 편의를 위해 의미를 잘못된 file boundary로 쪼개지는 않는다.

## Bootstrap guards

Bootstrap/router surface에는 specialist policy를 요약해서 쌓지 않는다. 다만 routing 전에 알아야 하는 규칙은 짧은 guard로 반복할 수 있다.

어떤 규칙을 README/AGENTS/CONTEXT에 의도적으로 재서술하려면 다음을 모두 만족해야 한다.

1. **Pre-routing prerequisite** — specialist owner를 읽기 전에 행동에 영향을 줄 수 있다.
2. **Cross-cutting applicability** — 하나의 특정 workflow가 아니라 여러 task에 적용된다.
3. **Early-failure consequence** — 미준수 시 잘못된 remote mutation, 거짓 current-state/Evidence claim, ownership/security 침범, 복구하기 어려운 context loss가 발생할 수 있다.
4. **Stability** — 특정 branch, runner, command, current implementation에 쉽게 묶이지 않는다.
5. **Not hard-enforced** — 상위 system/tool boundary가 이미 완전히 막는 규칙을 단순히 반복하지 않는다.
6. **Compressibility** — owner policy를 복제하지 않고 한두 문장과 링크로 표현할 수 있다.

하나라도 만족하지 못하면 bootstrap에 복제하지 않고 owner로 routing한다.

## Canonical document quality

Knowledge 문서를 만들거나 수정할 때 다음 질문으로 내용 경계를 검토한다.

- **Owner** — 이 정보의 단일 canonical owner가 이 문서가 맞는가?
- **Necessity** — project-wide invariant인가, 공통 Guidance인가, 단순 example/reference인가?
- **Duplication** — 다른 owner의 의미를 다시 정의하고 있지 않은가?
- **Retrieval** — 이 concern이 필요하지 않은 Agent도 읽어야 하는가, 필요할 때 routing할 수 있는가?
- **Executability** — prose가 의미를 소유해야 하는가, schema/workflow/test/code/live state가 enforcement 또는 current truth를 소유해야 하는가?

이 평가는 문서에 다섯 개의 고정 heading을 만들기 위한 것이 아니다. 유사한 성격의 문서가 같은 Authority contract와 content frame으로 해석되도록 하기 위한 review 기준이다.

## 수정 절차

1. CONTEXT (`CONTEXT.md`)에서 현재 작업에 필요한 canonical source를 찾는다.
2. 규칙을 바꿀 때는 실제 owner 문서만 수정한다. 같은 정책을 다른 문서에 복제하지 않는다.
3. 아직 확정되지 않은 제품/cross-repository 판단은 현재 Open Questions (`docs/open-questions.md`) 또는 연결된 planning surface에서 추적한다. interest-management model 자체는 별도 renewal Change가 소유한다.
4. 구현 상태나 완료 Evidence를 바꾸려면 owning repository의 live code, Issue, PR, workflow/deployment 결과를 확인한다.
5. 필요하면 로컬에서 `python3 scripts/bundle.py`를 preflight로 실행한다. PR에서는 repository automation이 동일 generator로 tracked bundle을 materialize하고 재현성을 검증한다.
6. 최종 diff가 하나의 명확한 semantic 변화로 읽히며 위 Authority/Owner/Scope 경계를 보존하는지 확인한다.

## 작업 상태

- 다음 세션까지 이어져야 하는 실행 상태는 GitHub Project #11, Issue, PR 또는 owning repository Evidence에 남긴다.
- 별도 handoff 파일이나 세션 로그를 현재 상태의 원장으로 유지하지 않는다.
- 과거 변경 근거가 필요하면 Git history와 immutable Evidence를 사용한다.

## Issue / PR

- Repository Issue를 생성하거나 크게 수정할 때는 `.github/ISSUE_TEMPLATE/`에서 완료 모델에 맞는 template을 먼저 선택한다. repository state 변경은 Change template (`.github/ISSUE_TEMPLATE/change.md`), 결론과 Evidence 확보는 Investigation template (`.github/ISSUE_TEMPLATE/investigation.md`)을 사용한다.
- Issue의 operational metadata는 GitHub Project/native fields가 소유하며 body에 현재값을 중복 기록하지 않는다.
- branch/PR/lifecycle 의미는 Planning Model (`docs/planning-model.md`), Project Orchestration (`docs/project-orchestration.md`), Git Workflow (`docs/git-workflow.md`)을 따른다.

## Generated context bundle

`dist/CONTEXT-BUNDLE.md`는 canonical Knowledge 문서에서 재생성하는 **tracked but non-canonical generated transport artifact**다.

- repository source에 직접 접근할 수 있으면 CONTEXT (`CONTEXT.md`) routing을 따라 필요한 canonical source를 직접 읽는다.
- bundle은 repository 접근이 없거나 단일 파일로 Chat/context를 전달해야 할 때 사용하는 snapshot/transport이며, routing이나 live Project/Issue/PR state를 대체하지 않는다.
- bundle 내부에서도 embedded `CONTEXT.md`를 entry point로 보고 필요한 source section만 사용한다.
- bundle을 직접 수정하지 않는다. 내용이 잘못되면 canonical source 또는 `scripts/bundle.py`를 수정한다.
- same-repository PR에서 canonical Markdown 또는 generator가 바뀌면 GitHub-hosted automation이 bundle을 재생성한다. 결과가 달라지면 automation은 PR source branch의 `dist/CONTEXT-BUNDLE.md`만 GitHub-Verified commit으로 materialize한다.
- `main`에서는 동일 generator를 read-only로 다시 실행해 committed bundle과 canonical sources의 일치를 검증한다.

## Default branch integration

Knowledge repository의 default/canonical branch는 `main`이다. 이 절은 Git Workflow (`docs/git-workflow.md`)의 공통 invariant를 Knowledge에 구체화한 repository-local POLICY다.

- `main`으로의 일반 변경은 Pull Request를 통해서만 통합한다. direct push는 정상 integration path로 사용하지 않는다.
- `main`은 linear history를 유지한다. merge commit은 허용하지 않으며 squash/rebase처럼 선형 history를 보존하는 integration만 사용한다.
- 이 제한은 Knowledge의 default branch에 대한 repository-local specialization이며, 다른 repository의 merge method를 공통으로 제한하지 않는다.
- generated bundle automation은 `main`을 직접 수정하지 않고 PR source branch만 수정한다.
- **Signed commits는 향후 hardening 목표다.** 현재 `Require signed commits`는 비활성화되어 있으며, Chat 세션에서 GitHub connector의 일반 file-write commit이 Verified 경로를 갖출 필요성이 생길 때 다시 검토한다. 현재 integration invariant로 간주하지 않는다.
- owner/admin emergency bypass semantics는 현재 정책 범위에 포함하지 않는다.

문서 정책과 live enforcement를 구분한다. 현재 live ruleset은 default branch에 PR-required, linear history, deletion protection, non-fast-forward protection을 적용한다. 기존 history의 unsigned/merge commits는 rewrite하지 않는다.

## 문서 경계

- Knowledge는 공통 semantics, project-wide POLICY와 필요한 cross-repository GUIDANCE를 소유한다.
- repository-specific runtime, workflow, API, token, runner, branch topology와 구현 상세는 owning repository가 소유한다.
- 새 문서는 새로운 semantic owner 또는 독립적인 retrieval value가 필요할 때만 만든다.
- 편의를 위한 요약·bundle·index는 canonical source를 대체하지 않는다.

<!-- END SOURCE: docs/maintenance.md -->


---

<!-- BEGIN SOURCE: docs/planning-model.md -->

# Planning Model

> **Authority:** POLICY  
> **Owner:** Project planning units, lifecycle meaning, completion, and Evidence semantics  
> **Scope:** Publishing Platform Project #11 Items and repository Issues across the owning repositories  
> **Read when:** creating or activating work, interpreting Status/Iteration, deciding completion, or evaluating Evidence  
> **Enforced by:** live Project #11 fields and repository Issue/PR state; materialization behavior is owned by Project Orchestration

## Planning units

| Concept | Meaning |
|---|---|
| Release Goal | 릴리스가 달성할 제품 상태 한 문장. 기술·작업 나열은 Product Boundary로 분리한다. |
| Product Boundary | 해당 릴리스에 필요한 capability와 제외 범위. 구현 순서가 아니다. |
| Iteration Goal | 이번 Iteration에서 달라질 가장 중요한 상태 한 문장. |
| Iteration Commitment | Goal을 위해 선택한 Item 집합. |
| Project Item | 독립적으로 검증 가능한 하나의 변화(delta). |
| Repository Issue | 해당 결과를 실현하는 특정 repository의 실행 단위. |

이전 Item을 다음 release용으로 복제하지 않고 새로 달라지는 결과만 Item으로 만든다. Iteration과 제품 release는 별도 planning axis이며, release association이 실제 운영 요구가 되기 전까지 각 Item의 필수 custom field로 복제하지 않는다.

## Item and Issue completion model

Project Item은 **Outcome / Acceptance Criteria / Evidence**로 완료 가능성을 설명한다. Repository가 작업의 1차 영역을 제공하고 Work Type이 Issue 전체의 주된 delta를 분류한다. Work Type과 Labels는 Work Classification (`docs/work-classification.md`)이 소유한다.

불확실한 작업은 Draft로 포착한다. repository owner와 실행 범위가 분명한 작업은 Repository Issue로 구체화한다. cross-repository coordination 자체가 결과라면 억지로 하나의 repository에 귀속하지 않고 Project Item으로 유지할 수 있다.

Repository Issue의 template은 Work Type이 아니라 **완료를 무엇으로 증명하는가**에 따라 선택한다.

| Template | Completion model |
|---|---|
| Change | canonical 또는 observable state가 의도대로 달라지고 검증된다. |
| Investigation | 질문에 대한 결론과 재현 가능한 Evidence를 확보한다. |

Investigation에서 production 또는 normative change가 필요하다는 결론이 나오면 별도 Change Issue로 분리한다. 실제 template marker와 section shape는 `.github/ISSUE_TEMPLATE/`가 소유한다.

## Draft, commitment, and work start

- **Draft**는 아직 실행 범위가 확정되지 않은 후보이며 Iteration commitment와 implementation branch를 요구하지 않는다.
- **Backlog**는 유효한 후보 Item이지만 아직 Iteration commitment가 없는 상태다.
- **Todo**는 Iteration에 commit되었고 착수 가능하지만 실제 구현·조사·검증은 시작되지 않은 상태다.
- **In progress**는 Iteration에 commit되었고 실제 구현·조사·검증이 진행 중인 상태다.
- activation 또는 Repository Issue 생성 자체는 actual work start가 아니다.
- Development branch 또는 linked PR은 work start를 관찰할 수 있는 강한 signal이지만 `In progress`의 의미를 정의하지 않는다.
- branch/PR 없이 수행하는 Investigation, coordination, documentation도 실제 수행을 시작하면 `In progress`일 수 있다.
- commitment와 work start가 동시에 일어나면 `Todo`를 의례적인 중간 write로 강제하지 않는다.

Issue activation, `project-seed`, observable signal과 Project field materialization은 Project Orchestration (`docs/project-orchestration.md`)이 소유한다. 구현 시작 방식은 Implementation Practices (`docs/implementation-practices.md`)의 GUIDANCE를 참고한다.

## Project Status lifecycle

Project `Status`는 repository Issue의 open/closed 여부를 복제하지 않고 **실행 상태와 결과 의미**를 나타낸다.

| Status | Meaning |
|---|---|
| Backlog | 유효한 후보 작업이지만 아직 Iteration commitment가 아니다. |
| Todo | Iteration에 commit되었고 아직 실제 작업은 시작되지 않았다. |
| In progress | Iteration에 commit되었고 실제 작업이 진행 중이다. |
| Done | Outcome, Acceptance Criteria, 적용되는 Quality Requirements와 Evidence를 충족했다. |
| Cancelled | 더 이상 수행하지 않기로 결정한 작업이다. superseded, rejected, invalidated 등을 포함하며 완료 성과로 계산하지 않는다. |

- repository Issue의 `closed / completed`는 일반적으로 `Done`, `closed / not_planned`는 `Cancelled`와 대응한다.
- `Cancelled`는 실제 planning decision이며 repository state나 automation convenience 때문에 임의로 사용하지 않는다.
- `Todo`와 `In progress`는 Iteration commitment를 전제로 한다. commitment가 제거되면 active Development relation과 실제 실행 상태를 함께 재검토한다.
- `Backlog → Todo → In progress`는 의미 관계이지 모든 UI/API write가 중간 상태를 반드시 순차 기록해야 한다는 뜻이 아니다.
- Project field의 current `Status`가 lifecycle state의 source of truth다. observable event를 어떤 Status로 materialize하는지는 Orchestration이 이 의미를 소비해 정의한다.

## Iteration semantics

Iteration은 active Item에서는 **current commitment**, terminal Item에서는 **압축된 execution/commitment provenance**를 나타낸다.

- 명시적으로 Iteration에 commit된 Item은 결과가 `Done` 또는 `Cancelled`여도 그 Iteration을 유지한다.
- 명시 commitment가 없어도 Item에 귀속되는 durable product/platform Git tree에 실제 구현이 남았다면 Iteration은 필요하다. 값은 close/merge 시점이 아니라 실제 work-start 기간을 기준으로 한다.
- 독립 branch에서만 수행되고 durable product/platform Git tree에 편입되지 않은 채 폐기된 작업은 당시 Iteration을 기록할 수 있지만 필수는 아니다.
- substantive reopen은 새로운 live-planning decision이다. 새 Iteration에 즉시 recommit하지 않는다면 기존 Iteration을 비우고 `Backlog`로 재평가하는 것이 기본이다. 단순 metadata 정리를 위한 임시 reopen에는 이 규칙을 적용하지 않는다.
- Iteration은 single-value field이므로 여러 Iteration에 걸친 전체 carry-over/recommit history를 표현하지 않는다. 나머지 이력은 Project Status Updates와 Issue/PR/Git Evidence가 보완한다.
- Iteration Goal과 회고는 Project Status Update가 소유한다.

field cardinality와 completeness는 Project Fields (`docs/fields.md`)가 소유한다.

## Completion and Evidence

- **Acceptance Criteria**는 이번 변화가 제공해야 하는 관찰 가능한 결과다.
- **Quality Requirements**는 적용되는 성능·신뢰성·품질 제약이며 근거 없는 수치를 만들지 않는다.
- **Global Definition of Done**은 AC 충족, 적용 품질 검증, 필요한 코드와 지속 문서 통합, 관련 자동 검사 통과, 재현 가능한 Evidence 연결을 요구한다.

Evidence는 **Outcome이 실제로 달성되었음을 재현 가능하게 보여주는 자료**다.

- 설계·계획 정의 자체가 Outcome이면 canonical policy/document의 immutable commit 또는 permalink가 Evidence가 될 수 있다.
- `main` 링크는 current reference 탐색에 사용할 수 있지만 완료 시점의 증거를 고정해야 할 때는 commit SHA가 포함된 permalink나 해당 변경 commit/PR을 우선한다.
- 기능 구현, 품질 검증, 실제 발행, deployment 성공은 planning 문서로 증명하지 않는다. 책임 repository의 code, tests, PR/commit, workflow run, deployment result 등 실제 Evidence가 필요하다.
- release acceptance Evidence는 해당 release record가 명시한 immutable scope에서만 유효하며 current implementation state로 자동 확장하지 않는다.

## Ownership boundaries

- live `Status / Iteration / Work Type` 값 → GitHub Project #11
- Work Type / Label meaning → Work Classification (`docs/work-classification.md`)
- field schema / cardinality / completeness → Project Fields (`docs/fields.md`)
- activation / signal / reconciliation materialization → Project Orchestration (`docs/project-orchestration.md`)
- Iteration Goal / review narrative → Project Status Updates
- Outcome / Acceptance Criteria / work-specific Evidence → 실제 Project Item 또는 Repository Issue
- implementation contract / code / tests → owning repository

완료된 migration이나 release의 historical provenance는 해당 RECORD를 사용한다. current planning과 implementation 판단은 current policy와 live owning source를 우선한다.

<!-- END SOURCE: docs/planning-model.md -->


---

<!-- BEGIN SOURCE: docs/fields.md -->

# Project Fields

> **Authority:** POLICY  
> **Owner:** Project #11 field schema, cardinality, and completeness  
> **Scope:** custom and native fields used to represent Publishing Platform execution state  
> **Read when:** defining Project fields, checking field completeness, or deciding whether a value belongs in Project metadata  
> **Enforced by:** live Project #11 schema plus admission/reconciliation validation where implemented

Project #11은 repository가 이미 제공하는 1차 분류를 반복하지 않는다. custom field는 실제 운영과 통계에 지속적으로 쓰이는 최소 축만 유지한다.

## Core fields

| 이름 | 질문 | Cardinality / completeness |
|---|---|---|
| Status | 지금 어떤 실행 상태인가? | Project Item이면 정확히 하나 |
| Iteration | 언제 수행하는가? | lifecycle 의미상 필요한 경우 하나 |
| Work Type | 왜 이 Issue가 존재하는가? | executable Repository Issue이면 정확히 하나 |

Repository, Labels, Linked pull requests, Parent issue, Sub-issues progress, Assignees 등은 GitHub native field를 그대로 사용한다.

Objective, Scope, Target Release, Deadline, Estimate custom field는 repository와 중복되거나 일관된 판정·운영 사용이 부족하여 Project taxonomy에서 제거했다. 실제 repeated use-case가 생기기 전에는 단순 분류 편의를 위해 되살리지 않는다.

## Semantic owners

- `Status`와 `Iteration`의 lifecycle 의미 → Planning Model (`docs/planning-model.md`)
- `Work Type`과 Labels의 의미·선택 → Work Classification (`docs/work-classification.md`)
- activation/reconciliation materialization → Project Orchestration (`docs/project-orchestration.md`)
- 실제 current values → live GitHub Project #11 / repository-native state

이 문서는 위 의미를 다시 정의하지 않는다.

## Completeness rules

Field completeness는 “모든 칸을 채운다”가 아니라 **해당 lifecycle과 execution state에 필요한 값이 비어 있지 않게 한다**는 뜻이다.

- `Status`: Project Item이면 항상 하나의 유효한 option이 있어야 한다.
- `Work Type`: executable Repository Issue이면 정확히 하나여야 한다.
- `Iteration`:
  - `Todo / In progress`에는 current commitment가 있어야 한다.
  - explicit commitment가 있었거나 durable product/platform Git tree에 실제 구현이 남았다면 terminal Item에서도 Planning Model의 historical Iteration rule을 따른다.
  - 아직 commit되지 않았고 실제 구현도 없는 `Backlog`/Draft는 비운다.
  - substantive reopen 후 새 commitment가 없으면 Planning Model의 reopen rule에 따라 기존 historical Iteration을 비운다.
- `Assignees`: 실제 작업 책임자가 정해진 executable Item에는 native field를 사용한다. 현재 개인 프로젝트의 executable Repository Issue는 별도 owner가 없으면 `ooMia`를 기본 책임자로 materialize할 수 있다.
- `Linked pull requests`: 구현 PR이 존재하면 GitHub native Development relation을 우선한다. historical relation을 복구할 수 없으면 실제 Issue/PR Evidence 링크로 사실을 보존하고 임의 metadata를 만들지 않는다.
- Labels, Milestone, Parent/Sub-issues 등 optional native field는 실제 의미가 있을 때만 채운다.

automation은 이 completeness policy를 소비할 수 있지만, historical Iteration이나 classification처럼 Evidence/문맥 해석이 필요한 값을 날짜나 제목만으로 추론하지 않는다.

<!-- END SOURCE: docs/fields.md -->


---

<!-- BEGIN SOURCE: docs/work-classification.md -->

# Work Classification

> **Authority:** POLICY  
> **Owner:** Work Type and Label selection semantics  
> **Scope:** repository Issues represented in Publishing Platform Project #11 and repository-native labels  
> **Read when:** classifying why an Issue exists or choosing durable searchable labels  
> **Enforced by:** Project Work Type option set, `config/labels.json`, and live repository label registries where synchronized

Project #11에서 repository는 작업의 1차 영역을 이미 제공한다. 추가 metadata는 repository를 가로질러 비교하거나 실제로 필터링할 가치가 있는 정보만 유지한다.

## Classification axes

이 문서는 두 가지 질문의 **의미와 선택 기준**을 소유한다.

| Axis | Question |
|---|---|
| Work Type | 왜 이 Issue가 존재하는가? 주된 delta는 무엇인가? |
| Labels | 무엇에 관한 작업인가? 반복해서 찾을 가치가 있는 관심사는 무엇인가? |

Status/Iteration 및 field cardinality/completeness는 Project Fields (`docs/fields.md`), lifecycle 의미는 Planning Model (`docs/planning-model.md`)이 소유한다.

Work Type은 Issue 전체 Outcome을 분류한다. 개별 commit type, 사용 기술, 구현 방법, 실험성, CI 여부를 나타내지 않는다.

## Work Type

| Option | Definition |
|---|---|
| Feature | owning repository의 책임 안에서 이전에 없던 의도된 동작 또는 규칙을 추가하거나 확장한다. |
| Fix | 이미 의도되거나 정의된 동작 또는 규칙에서 벗어난 상태를 복구한다. |
| Refactor | 의도된 observable 또는 normative behavior를 유지하면서 내부 구조를 의미 있게 재편한다. |
| Maintenance | 의미 있는 동작·규칙 추가나 구조 재설계 없이 repository를 건강한 상태로 유지한다. |
| Documentation | 이미 존재하는 동작·규칙·지식을 더 잘 전달하는 것이 Outcome이며 normative state 자체는 바뀌지 않는다. |
| Investigation | production change 자체가 아니라 불확실성을 줄이는 결론과 Evidence를 얻는 것이 Outcome이다. |

### Decision order

첫 번째로 맞는 항목을 선택한다.

1. 이미 기대되던 동작이나 규칙을 복구한다 → **Fix**
2. 기대 동작/규칙을 유지하면서 구조를 재편한다 → **Refactor**
3. 의미 있는 동작·규칙·구조 변경 없이 upkeep이 목적이다 → **Maintenance**
4. 기존 사실·동작·규칙을 전달하거나 설명하는 것이 전부다 → **Documentation**
5. 시스템 변경보다 결론과 Evidence 확보가 성공 조건이다 → **Investigation**
6. 그 외 새로운 의도된 동작 또는 규칙을 추가·확장한다 → **Feature**

Feature는 마지막에 판정한다. Knowledge의 canonical policy/schema를 새로 정의하거나 확장하는 작업도 normative behavior를 바꾸므로 Feature다. Markdown 파일을 수정했다는 사실만으로 Documentation이 되지 않는다.

Commit type은 변화 조각의 성격이고 Work Type은 Issue 전체의 목적이다. 하나의 Refactor Issue 안에 feat/test/docs/chore commit이 있어도 최종 Outcome이 외부 동작이나 규칙을 추가하지 않는다면 Work Type은 Refactor다.

Investigation은 결론/Evidence 확보가 완료 조건이다. 조사 과정의 prototype이나 benchmark를 production state에 채택하려면 별도의 **Feature / Fix / Refactor / Maintenance** Change로 분리한다. Investigation 자체의 durable Evidence artifact는 조사 재현성에 필요할 때 남길 수 있다.

## Labels

Labels는 optional controlled tags다. Work Type을 반복하지 않고 repository 안에서 지속적으로 검색할 가치가 있는 domain/component 또는 횡단 관심사를 표현한다.

새 label은 다음 중 하나 이상에 해당할 때만 만든다.

- 여러 Issue에서 반복해서 찾을 가능성이 있다.
- 실제 Issue/Project filtering에 사용할 가치가 있다.
- 특정 review/운영 정책을 적용하는 데 의미가 있다.
- repository의 지속적인 책임 영역을 나타낸다.

다음은 label로 만들지 않는다.

- Work Type option의 동의어
- 한 Issue에서만 등장하는 세부 구현명
- 쉽게 소멸하는 library/version keyword
- 제목만으로 충분한 일회성 debugging 원인
- 단순히 “실험적이다”라는 특성

label을 과도하게 붙여 filtering 의미를 약화하지 않는다. 구체적인 cardinality/completeness는 Project Fields (`docs/fields.md`)를 따른다.

## Label registry

실제 허용 label의 canonical registry는 `config/labels.json` (`config/labels.json`)이다.

- 이 문서 → label을 언제 만들고 선택하는지에 대한 semantics
- `config/labels.json` → 실제 label 이름, repository scope, color hint, GitHub description
- GitHub repository labels → registry를 materialize한 operational state

registry에 없는 label을 즉석에서 새 canonical category처럼 만들지 않는다. 새 label이 필요하면 먼저 위 selection criteria를 검토한 뒤 registry를 수정한다. 실제 GitHub label mutation 방식은 owning automation/operation이 소유한다.

## REFERENCE — Boundary examples

아래 예시는 정의를 대체하지 않는 non-normative reference다.

| Work | Work Type | Why |
|---|---|---|
| Engine에 새 URL summary capability 추가 | Feature | 새로운 intended behavior |
| 기존 CLI의 Windows failure 복구 | Fix | 기대 동작 복구 |
| MCP adapter를 observable behavior 변화 없이 재편 | Refactor | internal structure change |
| dependency 정기 업데이트 | Maintenance | upkeep |
| 기존 CLI 사용법을 더 명확히 설명 | Documentation | normative/runtime state 불변 |
| CI 전략을 benchmark하고 결론/Evidence만 확보 | Investigation | uncertainty reduction |
| Knowledge에 새로운 lifecycle policy 정의 | Feature | normative behavior change |
| 기존 Knowledge policy 의미를 유지한 채 설명만 정리 | Documentation | existing rule communication |

<!-- END SOURCE: docs/work-classification.md -->


---

<!-- BEGIN SOURCE: docs/git-workflow.md -->

# Git Workflow

> **Authority:** POLICY  
> **Owner:** cross-repository change integration and history invariants  
> **Scope:** Publishing Platform repositories that integrate durable changes through Git/GitHub  
> **Read when:** creating an Issue-linked branch, preparing/integrating a PR, defining CI gates, or preserving historical Evidence  
> **Enforced by:** owning repository branch/ruleset/workflow configuration where implemented

이 문서는 repository가 공유해야 하는 **integration invariant**만 소유한다. exact branch name, topology, runner, CI matrix, release trigger와 repository-local hotfix path는 owning repository가 정의한다.

## POLICY — Integration

- 각 repository는 durable/canonical state와 그 integration path를 **MUST** 명확히 정의한다.
- Issue orchestration 대상의 substantive repository work는 **SHOULD** Issue-linked branch에서 수행한다.
- durable change는 owning repository가 정의한 PR/review/integration path를 거쳐 canonical state에 반영하며, repository-local release/integration gate를 임의로 우회하지 않는다.
- branch topology와 promotion 방식은 repository 역할에 맞게 결정하며 모든 repository에 동일한 `main/develop` topology를 강제하지 않는다.
- merge method는 project-wide 하나로 고정하지 않는다. owning repository policy와 해당 PR의 history/review 목적이 결정한다.
- PR이 merge되기 전에는 canonical integration이 완료되었다고 보고하지 않는다.

문서에 policy를 적었다고 실제 branch protection/ruleset/workflow가 변경된 것으로 간주하지 않는다. current enforcement는 owning repository의 live setting/workflow에서 확인한다.

## POLICY — Verification and formatting

- 각 repository는 자기 Outcome과 trust boundary에 필요한 executable verification을 **MUST** 정의한다.
- completion Evidence는 prose expectation이 아니라 실제 owning repository의 test/build/workflow/deployment result를 기준으로 한다.
- **source-code repository의 CI는 formatting 차이만을 이유로 실패해서는 안 된다.** CI가 canonical formatting 자체를 materialize하는 것이 아니라면 formatter preference를 integration failure gate로 사용하지 않는다.
- 문서/content처럼 formatting 자체가 canonical artifact의 일부인 repository는 owning workflow가 그 형식을 materialize/normalize하고 idempotence를 검증할 수 있다. 이는 “format check 실패”와 구분한다.
- lint semantics, type checking, tests, build, artifact/runtime verification 등 실제 결과를 검증하는 gate는 repository risk에 맞게 유지한다.

exact formatter command, bot implementation, check command와 job composition은 owning repository가 소유한다.

## GUIDANCE — Verification profile and runners

아래는 공통 강제 정책이 아니라 CI profile을 설계할 때의 권고다.

- 빠른 development feedback과 canonical/release integration은 필요하면 서로 다른 강도로 운영한다.
- static checks, tests, build, artifact verification, cross-platform matrix는 실제 failure risk에 맞춘다.
- runner 선택은 security, cost, platform dependency, local capability를 함께 고려한다.
- self-hosted resource가 필요한 validation과 GitHub-hosted portability validation을 역할에 따라 나눌 수 있다.
- 동일한 고비용 검증을 여러 runner에서 반복하는 것을 기본값으로 삼지 않는다. 추가 matrix는 실제 portability/release risk를 검증할 때 사용한다.

구체 runner label, OS matrix, cache strategy와 command는 owning repository workflow가 현재 source of truth다.

## POLICY — Issue branch and PR boundary

Issue lifecycle은 Planning Model (`docs/planning-model.md`), Project activation/materialization은 Project Orchestration (`docs/project-orchestration.md`)이 소유한다.

- branch base/name, workflow file, token/permission은 owning repository가 소유한다.
- PR은 결과, 변경 이유, 관련 Issue, 실제 수행한 verification과 남은 limitation을 설명해야 한다.
- 여러 commit을 사용해도 final diff는 하나의 검토 가능한 변화로 읽히는 편을 우선한다.
- implementation-start 방식은 Implementation Practices (`docs/implementation-practices.md`)의 GUIDANCE를 참고한다.

## POLICY — History and archive

- Git branch를 장기 knowledge archive로 사용하지 않는다.
- 과거 맥락은 Git history, immutable commit/permalink, 필요한 migration/release RECORD와 revision-bound Evidence에서 추적한다.
- legacy/archive/backup branch는 current operating path가 아니다.
- forensic reproduction을 위해 ref 고정이 필요하면 owning repository가 explicit tag 또는 immutable Evidence를 선택할 수 있다.

## Repository-local ownership

Knowledge는 위 invariant만 소유한다. 다음은 owning repository가 구체화한다.

- canonical/integration branch name과 topology
- Issue branch base ref
- PR/release promotion path
- runner kind/label
- CI job/OS matrix/cache
- formatter/canonicalization implementation
- repository-specific hotfix/patch path

repository-local 차이가 반복되어 여러 repository에 적용되는 invariant가 되었을 때만 이 POLICY를 확장한다.

<!-- END SOURCE: docs/git-workflow.md -->


---

<!-- BEGIN SOURCE: docs/project-orchestration.md -->

# Project Orchestration

> **Authority:** POLICY  
> **Owner:** Repository Issue activation, observable-signal materialization, and Project #11 reconciliation semantics  
> **Scope:** common coordination between Issue-driven Publishing Platform repositories and Project #11  
> **Read when:** admitting/replaying an Issue, interpreting Development signals, or reconciling Project state  
> **Enforced by:** Knowledge shared Project-admission workflow/action and repository-local integrations where implemented

이 문서는 Planning Model (`docs/planning-model.md`)이 정의한 lifecycle **meaning**을 Project/native state에 materialize하는 공통 contract를 소유한다. 실제 Project field 값은 Project #11, Issue/PR relation은 GitHub repository native state가 소유한다.

## Scope and ownership

- Repository Issue가 활성화되면 Project #11 Item과 필요한 initial fields를 materialize할 수 있다.
- activation 이후 current state는 live Project fields와 repository-native Issue/PR relation이 source of truth다.
- Docs처럼 Issue-driven implementation이 중심이 아닌 repository에는 동일 orchestration을 강제하지 않는다.
- branch/PR integration invariant는 Git Workflow (`docs/git-workflow.md`)이 소유한다.
- caller event wiring, branch base/name, token/runner/runtime, webhook process 같은 implementation detail은 owning repository가 소유한다.

## Issue activation

Common admission은 활성 Repository Issue에 대해 다음 결과를 materialize할 수 있다.

1. Project #11 Item membership
2. initial Iteration / Work Type
3. Iteration 존재 여부에 따른 initial Status

Issue activation 자체는 actual work start나 Development relation을 의미하지 않는다. Draft 또는 실행 범위가 아직 확정되지 않은 candidate의 planning meaning은 Planning Model (`docs/planning-model.md`)을 따른다.

공통 admission implementation의 parser, API calls, field lookup, pagination, retries와 token handling은 Knowledge의 workflow/action/tests가 소유한다. 이 문서는 그 알고리즘을 복제하지 않는다.

## Project seed

Repository Issue는 first admission을 위한 machine-readable `project-seed`를 제공할 수 있다.

```md
<!-- project-seed
{
  "iteration": null,
  "workType": "Feature"
}
-->
```

Common semantic inputs:

- `iteration` → initial Iteration; commitment가 아직 없으면 `null`
- `workType` → Issue Outcome의 Work Type

`status`는 authoritative seed input이 아니다. initial Status는 Iteration이 없으면 `Backlog`, 있으면 `Todo`로 materialize한다.

replay에서 existing live Project value를 stale seed로 덮어쓰지 않는다. live Work Type이 비어 있을 때 validated `workType`을 사용할 수 있지만 live/seed 모두 없으면 의미를 추론하지 않고 fail closed한다.

branch name, Development start suppression 등 Project field가 아닌 repository-local hints가 같은 comment에 존재할 수 있지만, 그 의미는 해당 owning integration이 소유하며 이 공통 contract가 정의하지 않는다.

seed 값은 Planning Model (`docs/planning-model.md`), Project Fields (`docs/fields.md`), Work Classification (`docs/work-classification.md`)의 semantics를 위반하지 않아야 한다.

## Development signals

Development relation은 actual work start를 관찰할 수 있는 **signal**이다. `Backlog / Todo / In progress`의 의미 자체는 Planning Model (`docs/planning-model.md`)이 소유한다.

- 새 linked PR은 open Item의 work-start signal로 사용해 `In progress`를 materialize할 수 있다.
- Development branch도 owning integration이 relation을 신뢰성 있게 관찰할 수 있을 때 같은 signal로 사용할 수 있다.
- branch/PR 없이 진행되는 Investigation, coordination, documentation은 사람 또는 해당 execution interface가 work start를 명시적으로 materialize할 수 있다.
- commitment와 work start가 동시에 확인되면 Iteration과 `In progress`를 함께 materialize할 수 있으며 `Todo` intermediate write를 강제하지 않는다.
- work-start signal이 있는데 Iteration commitment가 없다면 arbitrary Iteration을 추론하지 않고 inconsistency로 드러낸다.
- branch/Issue relation이 불명확하면 이름이나 타이밍만으로 임의 연결하지 않고 repository-local recovery가 소유한다.

## Lifecycle reconciliation

Reconciliation은 canonical meaning을 새로 정의하지 않고 명확한 invariant와 관찰 가능한 event를 live state에 반영한다.

- uncommitted candidate가 Iteration commitment를 얻고 더 강한 work-start signal이 없으면 `Todo`를 materialize할 수 있다.
- existing `In progress`를 replay convenience만으로 `Todo`로 낮추지 않는다.
- 실제로 관찰된 work-start signal은 `In progress`를 materialize할 수 있다.
- `Todo / In progress`에서 commitment가 제거되면 `Backlog` invariant를 복구하되 남아 있는 active Development relation은 별도 inconsistency로 드러낸다.
- `closed / completed`는 `Done`, `closed / not_planned` 또는 명확한 cancellation은 `Cancelled`로 materialize할 수 있다.
- close/cancel transition만으로 기존 Iteration을 지우지 않는다.
- durable product/platform Git-tree implementation이 확인되는데 Iteration이 비어 있으면 reconciliation 대상으로 드러낸다. historical Iteration은 Issue 생성/종료 날짜만으로 자동 추론하지 않는다.
- substantive reopen과 administrative reopen을 automation이 신뢰성 있게 구분할 수 없다면 Iteration을 일괄 clear하지 않고 review 대상으로 남긴다.
- unknown/conflicting state나 concurrent change는 임의 overwrite보다 fail/re-read/review를 우선한다.

Work Type, historical Iteration처럼 semantic interpretation이 필요한 값을 automation이 제목·날짜·repository 종류만으로 추론하지 않는다. field completeness 자체는 Project Fields (`docs/fields.md`)가 소유한다.

## Ownership boundary

| Concern | Owner |
|---|---|
| Status/Iteration lifecycle meaning, DoD, Evidence | Planning Model (`docs/planning-model.md`) |
| field schema/cardinality/completeness | Project Fields (`docs/fields.md`) |
| Work Type / Label meaning | Work Classification (`docs/work-classification.md`) |
| activation / signal / reconciliation materialization contract | 이 문서 |
| live Project field values | GitHub Project #11 |
| Issue / PR / Development relation | GitHub repository native state |
| common Project admission implementation | Knowledge workflow/action/tests |
| caller wiring / branch implementation / runtime | executing owning repository |

공통 implementation은 하나의 owner에 두고 caller repository에 복제하지 않는다. 여러 repository-local 차이가 반복되어 실제 coordination invariant가 될 때만 이 POLICY를 확장한다.

<!-- END SOURCE: docs/project-orchestration.md -->


---

<!-- BEGIN SOURCE: docs/release-1.0.md -->

# Publishing Platform 1.0

Knowledge가 소유하는 통합 제품 목표와 수용 기준이다. 기술 선택·schema·component catalog·명령·runtime 구성은 책임 repository의 code/docs가 소유한다.

## Release Goal

Deliver a usable workflow for authoring Git-backed md-like content and publishing a verified canonical revision to a live site.

## Product Boundary

| Capability | 요구되는 관찰 가능한 결과 | 상세 원본 |
|---|---|---|
| Authoring | frontmatter를 포함한 md-like document를 호환되는 authoring tool로 작성·수정하고 source 의미를 보존할 수 있다. 특정 editor 종류는 acceptance가 아니다. | Architecture (`docs/architecture.md`) |
| Canonical Content | 사용자가 작성하거나 선택한 도구로 수정한 source를 Git commit으로 공유·재현 가능한 revision으로 식별한다. | Architecture (`docs/architecture.md`) |
| Extensibility | 실제 Site implementation/package가 지원하는 콘텐츠 표현을 동일 codebase와 검증으로 확장할 수 있다. | [Site 소비 계약](https://github.com/ooMia/oomia.github.io/blob/main/docs/content-consumption-contract.md) |
| Automation | 최소 하나의 automated 또는 agent-assisted workflow가 validation, Git revision finalization, publish 또는 delivery process에 참여한다. | 책임 구현 Issue/Evidence |
| Publishing | canonical revision이 실제 Site consumer 검증을 통과하고 발행 입력과 결과의 관계를 재현할 수 있다. | [Site 소비 계약](https://github.com/ooMia/oomia.github.io/blob/main/docs/content-consumption-contract.md#publishing) |
| Presentation | Site가 해당 콘텐츠 revision을 사용자에게 렌더링한다. | Site code/tests |
| Delivery | Docs revision과 Site revision이 연결되어 GitHub Pages에 배포되고 성공 Evidence가 남는다. | Implementation Map (`docs/implementation-map.md`) |

사용자 작성 콘텐츠의 commit·Site 소비는 Engine 사용과 독립적이다. editor 종류, component manifest, package layout은 release-level 필수 정책이 아니다.

## 명시적 제외 범위

- production-grade multi-user CMS, RBAC, transactional collaborative editing
- advanced agent orchestration

그 밖의 구현 범위는 owner repository가 실제 필요와 Evidence로 결정한다.

## 검증

각 capability의 요구 결과를 책임 repository의 재현 가능한 Evidence와 연결한다. 문서나 planning schema가 구현 완료 Evidence를 대신하지 않는다.

Implementation Map (`docs/implementation-map.md`)은 기준 revision과 capability별 검수 연결을 소유한다. Site canonical release gate는 Implementation Map (`docs/implementation-map.md`)에 연결된 `main` build/deploy Evidence로 검증한다.

<!-- END SOURCE: docs/release-1.0.md -->


---

<!-- BEGIN SOURCE: docs/implementation-map.md -->

# Implementation Map

Publishing Platform 1.0의 **현재 검증 snapshot**과 cross-repository Evidence 연결을 소유한다. live branch 상태나 작업 로그를 복제하지 않으며, 판정은 아래에 고정한 revision/Evidence 범위에서만 유효하다.

새 Evidence가 기존 판정을 대체할 만큼 충분하면 날짜별 checkpoint를 추가하지 않고 이 snapshot의 기준 revision과 capability 판정을 갱신한다. 과거 판정은 Git history와 연결된 Issue/PR/run Evidence에서 추적한다.

## 현재 검증 범위

| 역할 | Repository / revision | 검증 의미 |
|---|---|---|
| canonical content | [`ooMia/oomia.github.io.docs@c1cb0f1`](https://github.com/ooMia/oomia.github.io.docs/commit/c1cb0f1c7c435cfe7b2fd24173f33b54847f75c2) | Obsidian에서 작성된 canonical MDX revision `4f50b150`을 Docs-owned normalization한 현재 canonical corpus |
| authored source Evidence | [Docs `4f50b150`](https://github.com/ooMia/oomia.github.io.docs/commit/4f50b15089607b2edea3bb8aa7f8e948a24d60fd) / [Docs #8](https://github.com/ooMia/oomia.github.io.docs/issues/8) | 실제 authoring tool에서 기존 canonical MDX의 source/frontmatter 의미를 보존하면서 Site-supported `Callout` 표현으로 수정한 Evidence |
| Site canonical release | [`ooMia/oomia.github.io@79efd753`](https://github.com/ooMia/oomia.github.io/commit/79efd753bd4b6efd63ab2e3bfccbd83935517c58) / [run 37103699755](https://github.com/ooMia/oomia.github.io/actions/runs/37103699755) | Docs `c1cb0f1`을 포함한 Site `main` build와 GitHub Pages delivery가 모두 성공한 현재 canonical release Evidence |
| Site consumer validation | [PR #26](https://github.com/ooMia/oomia.github.io/pull/26) / [run 37099713772](https://github.com/ooMia/oomia.github.io/actions/runs/37099713772) | exact Docs revision checkout 후 `astro sync → vp check → vp test → workspace build`가 모두 통과한 authoring/component consumer Evidence |
| Site ownership boundary | [Site #27](https://github.com/ooMia/oomia.github.io/issues/27) / [PR #28](https://github.com/ooMia/oomia.github.io/pull/28) | canonical Docs formatting은 Docs가 소유하고 Site는 consumer contract만 검증하도록 repository boundary를 정렬한 Evidence |
| Engine canonical integration | [`ooMia/oomia.github.io.engine@0484358`](https://github.com/ooMia/oomia.github.io.engine/commit/0484358d9118ecc8dfdb803b64909827e205ddf1) / [run 37049044873](https://github.com/ooMia/oomia.github.io.engine/actions/runs/37049044873) | Linux/macOS/Windows full validation과 packaged Engine artifact verification이 통과한 canonical Engine revision |
| Engine optional mutation | [Engine Issue #23](https://github.com/ooMia/oomia.github.io.engine/issues/23) / [PR #30](https://github.com/ooMia/oomia.github.io.engine/pull/30) | model-assisted metadata enrichment의 선택적 mutation Evidence |
| Docs trusted consumer | [Docs run 36260957694](https://github.com/ooMia/oomia.github.io.docs/actions/runs/36260957694) | Engine artifact를 사용한 Docs-side trusted workflow Evidence |

Site authoring/component verification [PR #26](https://github.com/ooMia/oomia.github.io/pull/26)의 promotion validation은 [run 37099713772](https://github.com/ooMia/oomia.github.io/actions/runs/37099713772)에서 exact Docs revision checkout 후 `astro sync → vp check → vp test → workspace build`를 통과했다. 이후 Site 기능 확장이 통합된 현재 `main@79efd753`의 [run 37103699755](https://github.com/ooMia/oomia.github.io/actions/runs/37103699755)에서도 `build=success`, `deploy=success`가 확인됐다.

따라서 canonical authored source → Docs revision → Site consumer validation → 현재 canonical Site revision → GitHub Pages delivery 연결이 이 snapshot에서 재현 가능한 Evidence로 닫혔다.

## Architecture transition

장기 제품 경계는 Architecture (`docs/architecture.md`), 전환 순서와 safety rule은 Architecture Transition (`docs/architecture-transition.md`), release acceptance는 Release 1.0 (`docs/release-1.0.md`)이 소유한다.

이 Map은 구현 순서·package 구조·workflow 운영을 별도로 정의하지 않는다. 각 capability의 **검증된 결과와 남은 release gap**만 연결한다.

## 1.0 capability 상태

상태는 **미검증 / 미충족 / 부분 충족 / 충족**만 사용한다.

| Capability | 현재 판정 | 검증된 Evidence | 다음 통합 검수 |
|---|---|---|---|
| Authoring | **충족** | [Docs #8](https://github.com/ooMia/oomia.github.io.docs/issues/8)에서 Obsidian으로 기존 canonical MDX를 수정하고 frontmatter/source 의미를 보존한 authored revision `4f50b150`을 확보했다. | 현재 Evidence 유지 |
| Canonical Content | **충족** | authored revision `4f50b150`이 Git revision으로 고정됐고 Docs-owned normalization 후 canonical revision `c1cb0f1`로 이어졌으며, Site canonical release가 그 exact revision을 직접 소비했다. | 현재 Evidence 유지 |
| Extensibility | **충족** | 실제 Site implementation의 `Callout` component 표현을 canonical MDX에서 사용했고, [PR #26](https://github.com/ooMia/oomia.github.io/pull/26) / [run 37099713772](https://github.com/ooMia/oomia.github.io/actions/runs/37099713772)에서 sync/check/test/build를 통과한 뒤 canonical delivery까지 이어졌다. | 현재 Evidence 유지 |
| Automation | **충족** | Engine/Docs automation Evidence와 Site `main` build/deploy automation이 실제 canonical revision 검증·delivery에 참여했다. | 현재 Evidence 유지 |
| Publishing | **충족** | Docs `c1cb0f1` → Site `79efd753` 소비 관계가 consumer validation과 final `main` build/deploy로 재현 가능하게 연결됐다. | 현재 Evidence 유지 |
| Presentation | **충족** | Site canonical release build가 supported content expressions를 포함한 corpus로 성공했고 동일 revision이 GitHub Pages delivery로 이어졌다. | 현재 Evidence 유지 |
| Delivery | **충족** | Docs `c1cb0f1` + Site `79efd753` + [run 37103699755](https://github.com/ooMia/oomia.github.io/actions/runs/37103699755)의 GitHub Pages deploy success가 연결됐다. | 현재 Evidence 유지 |

## 현재 남은 1.0 gap

이 snapshot의 Publishing Platform 1.0 acceptance capability에는 **남은 미충족 gap이 없다**.

Authoring, Canonical Content, Extensibility, Automation, Publishing, Presentation, Delivery가 모두 재현 가능한 owning-repository Evidence와 연결됐다. 이후 W4 기능 작업은 새로운 제품 가치나 post-acceptance 확장으로 취급하며, 이미 닫힌 1.0 acceptance를 불필요하게 다시 blocker로 만들지 않는다.

## 갱신 규칙

- 이 문서는 **한 개의 현재 검증 snapshot**만 유지한다.
- 판정은 명시된 revision과 immutable Evidence에만 적용한다.
- 새 Evidence가 생겼다고 즉시 로그를 추가하지 않는다. capability 판정을 바꿀 만큼 충분할 때 revision/Evidence/판정을 함께 갱신한다.
- historical snapshot과 판정 변화는 Git history에서 추적한다.
- live Project/Issue/PR status는 이 문서에 복제하지 않는다.
- 문서 정리만으로 runtime/build/deployment 완료를 판정하지 않는다.

<!-- END SOURCE: docs/implementation-map.md -->


---

<!-- BEGIN SOURCE: docs/operating-rhythm.md -->

# Operating Rhythm

## 목표와 리듬

Publishing Platform 완성과 계획·실행 습관을 중심에 둔다. 앰버서더 활동과 포트폴리오 개발의 기록을 하나의 흐름으로 연결한다.

- 매주 작은 발표, 매 4주 큰 발표 또는 working system review를 기본 cadence로 둔다.
- Daily는 짧은 Evidence capture에 집중하고, 주말 review에서 한 주의 결과를 재구성한다.
- Daily 기록은 비공개 작업 기록으로 두고, 공개할 가치가 있는 결과는 주간 review에서 별도 산출물로 만든다.

## Evidence → Story

매일 목표, 실제 결과, screenshot/GIF/video/voice/commit 등 Evidence, 배운 점, 다음 행동을 남긴다. Evidence는 나중에 다시 열 수 있는 durable link나 immutable revision에 연결한다.

주말에는 일별 기록을 목표 → 시도 → 장애·판단 → 결과 → 다음 행동의 A-Z 스토리로 재구성한다. Agent/LilysAI는 정리 부담을 낮추는 도구이며 모든 개발을 Agent가 수행한다고 가정하지 않는다. 공개 결과물은 발표·블로그 등 목적에 맞는 채널로 발행하되, 특정 플랫폼 선택을 이 공통 리듬의 정책으로 고정하지 않는다.

## 기능 실험 참조

기능 실험의 활성/폐기 상태와 AC는 책임 구현 repository의 live Issue/Project에서 관리한다. 완료되거나 `not_planned`로 종료된 실험 목록을 이 문서에 별도 catalog로 복제하지 않는다.

현재 반복 가능한 automation Evidence가 필요하면 Engine/Docs의 최신 Issue·PR·workflow run을 직접 확인한다. 이 문서는 활동 리듬과 Evidence → Story 원칙만 유지한다.

자료 수집 → 요약·통합 → 발표/글 초안 → 플랫폼 발행의 흐름에서 실제 정리 부담이 큰 단계를 선택해 활용한다.

<!-- END SOURCE: docs/operating-rhythm.md -->


---

<!-- BEGIN SOURCE: docs/open-questions.md -->

# Open Questions / Verification Gaps

현재 canonical 정책에서 **제품 경계·release acceptance·공통 Project 운영 수준에서 실제 결정이 필요한 항목**만 유지한다. 구현 repository가 code로 결정할 수 있는 세부사항은 이 목록에 올리지 않는다.

| ID | 항목 | 현재 처리 |
|---|---|---|
| Q010 | 미디어 공개 범위·asset 저장 정책 | public/private와 large/binary policy가 제품 운영에 필요해질 때 결정 |
| Q014 | raw HTML 및 executable MDX public publish policy | public publish security boundary가 필요해질 때 결정 |
| Q025 | stable document identity / sidecar linkage | path-independent identity가 제품 수준 요구가 될 때 결정 |
| Q026 | Wiki / public reference graph layer | 불변에 가까운 공개 설명을 GitHub Wiki 등으로 분리할 가치가 생기면 source/docs와의 ownership·linking·local clone 정책을 결정 |

## Knowledge-level Open Question이 아닌 것

다음은 책임 구현 repository와 code가 결정한다.

- Obsidian/Fumadocs/기타 editor 중 어떤 구현을 사용하는지
- editor를 Site 내부 app으로 둘지 별도 app으로 둘지
- docs layout / consumer discovery convention
- 지원 component 종류·props·children model
- component manifest/catalog 존재 여부와 editor adapter 형식
- Site의 Astro/Fumadocs integration 방식과 Turbo retirement
- Engine container/runtime, workspace mount, Git credential 방식
- metadata field 추가 시점, timestamp 계산, prepare input surface, formatting/normalization
- 구현 package/module boundary와 내부 API

여러 repository가 같은 component를 사용해야 하면 가능한 한 동일 package/codebase를 소비한다. editor integration이 별도 형식의 metadata를 요구해도 그 adapter는 owning implementation에서 관리하며 Knowledge가 별도 semantics 원본을 만들지 않는다.

구현 과정에서 반복되는 제약이 실제 제품 또는 cross-repository coordination 문제로 승격될 때만 새 Knowledge decision을 만든다.

<!-- END SOURCE: docs/open-questions.md -->
