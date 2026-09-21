# Open Questions / Verification Gaps

현재 canonical 정책에서 **사용자 결정이나 설계 선택이 아직 필요한 항목**만 유지한다. GitHub live 상태처럼 조회로 해결되는 운영 확인 사항은 [Current Handoff](../handoff/current.md)에 두고, 구현 수준과 revision-bound Evidence는 [Implementation Map](implementation-map.md)이 소유한다.

| ID | 항목 | 현재 처리 |
|---|---|---|
| Q003 | 1.0 final release gate | Git-backed authoring/publishing boundary는 확정. 실제 acceptance/evidence chain과 최종 release gate를 구현 과정에서 구체화해야 함 |
| Q006 | Status 옵션 및 계획 Item의 Objective/Target Release 빈 값 허용 규칙 | 명시적으로 확정할 필요 있음 |
| Q007 | Work Type Validation 추가 | 보류. 현재 기본값은 5개 유지 |
| Q008 | Engine container artifact와 workspace mount contract | Q022 실행 표면과 Q016 Git ownership 결정 뒤 구체화. one-shot CLI면 bind mount + ephemeral container가 기본 후보이고, Engine이 remote push까지 소유하면 credential injection contract가 추가로 필요 |
| Q010 | 미디어 공개 범위·asset 저장 위치 | workspace-relative asset과 durable external URL을 허용하는 방향. public/private 범위와 large/binary asset policy는 추가 결정 필요 |
| Q012 | custom component shared profile/manifest 필요 여부 | Fumadocs built-in을 우선 사용. 실제 custom component가 생겨 Engine/Site 간 계약 공유가 필요할 때만 schema/package를 활성화 |
| Q014 | raw HTML 및 executable MDX의 구체적인 publish security policy | Source 저장은 허용 가능. Site/publish 단계에서 허용할 HTML/expression 범위를 구체화해야 함 |
| Q015 | docs layout / consumer path convention | 현재 Site는 docs repo 전체를 `apps/web/data/articles` submodule로 mount하고 `**/*.{md,mdx}`를 하나의 `articles` collection으로 읽는다. 즉 live consumer는 사실상 docs 전체를 Article source로 가정한다. Fumadocs integration spike에서 이 가정을 유지할지, publishable view/discovery rule을 분리할지, strict layout을 둘지 결정 |
| Q016 | Git publish ownership / semantics | **해결됨: D034.** Engine은 dirty docs working tree를 commit하지 않는다. 사용자가 확정한 docs commit을 검증하고 remote에 반영한 뒤 Site의 exact docs SHA linkage와 delivery를 orchestration한다. branch/PR publish는 향후 별도 mode가 필요할 때 검토 |
| Q017 | 실제 authoring editor 역할 분담 | Evidence-gated. Fumadocs Editor는 local files를 SoT로 유지하고 built-in/custom component specs를 지원한다. 기존 Obsidian corpus를 Fumadocs Site에 연결한 뒤 custom-component authoring 이득을 비교해 Obsidian-only / optional Fumadocs Editor / Fumadocs-heavy 중 결정. Studio vs embedded UI는 채택 이후 하위 결정 |
| Q019 | Site migration 방식 | Engine은 D032에 따라 greenfield scratch build를 기본값으로 확정. Site는 현재 docs→Astro→Pages Evidence가 있으므로 incremental migration을 우선 후보로 두되 Fumadocs integration spike 결과에 따라 재평가 |
| Q021 | Site Turbo retirement | 새 task orchestration은 VP-first. 기존 Site Turbo를 언제 제거할지는 `vp run` recursive/filter/cache parity와 CI/build Evidence를 확인한 뒤 별도 Maintenance change로 결정 |
| Q022 | Engine 1.0 실행 표면 | **해결됨: D035.** stateless, invocation-driven CLI-first one-shot runtime/container를 사용한다. long-running HTTP/service shell은 1.0 비목표이며 향후 필요 시 operation API 위 adapter로 추가 |
| Q023 | persistent metadata field ownership / precedence | **부분 해결: D038/D039.** document-local persistent metadata는 frontmatter-first. 남은 핵심은 field별로 user-owned / Engine-generated / projection-derived를 어떻게 구분하고 defaults가 existing frontmatter를 언제까지 보완할 수 있는지 결정하는 것 |
| Q024 | projection materialization 위치 | ephemeral staging, Site working-tree generated projection, 별도 artifact 중 선택 필요. source/projection 이중 SoT를 만들지 않으면서 inspectability와 reproducibility를 어떻게 확보할지 Fumadocs/Site integration과 함께 검증 |
| Q025 | document identity / sidecar linkage | frontmatter-first로 초기 blocker에서 제외. stable document ID, path-independent cross-reference 또는 sidecar가 실제 필요해질 때 path-based linkage / explicit ID / manifest mapping을 결정 |
| Q026 | timestamp semantics | **Engine `prepare` 시작 전 결정 권장.** `createdAt`, `updatedAt`, `publishedAt` 각각이 최초 prepare / authoring change / Git commit / successful delivery 중 무엇을 의미하는지 정의해야 자동 생성·write-once·projection-only 정책을 구현할 수 있음 |
| Q027 | missing user-owned metadata resolution | **Engine `prepare` 시작 전 결정 권장.** required 값이 없고 Engine이 추론할 수 없을 때 interactive prompt를 제공할지, structured diagnostic으로 실패시키고 Obsidian/Agent에서 수정하게 할지, 두 mode를 모두 지원할지 결정 |
| Q028 | frontmatter mutation fidelity | **Engine `prepare` 시작 전 결정 권장.** metadata 수정 시 body bytes와 unknown keys는 보존해야 함. YAML key order/comments/quoting/formatting까지 exact preserve할지, frontmatter region의 controlled normalization을 허용할지 결정 |
| Q029 | metadata schema declaration | `required`, owner, generator, mutability, validation을 어디에 선언할지 결정 필요. Knowledge는 semantics를 소유하고 구현은 TypeScript/config/schema 중 최소한의 표현을 선택할 수 있으므로 scratch skeleton 자체의 blocker는 아님 |
| Q030 | prepare target selection / discovery | docs layout(Q015)이 미결이어도 초기 `prepare`는 explicit file/path 입력으로 시작 가능. repository-wide discovery 규칙은 layout 결정과 함께 확장 가능 |
| Q031 | bulk prepare atomicity | 여러 문서를 한 번에 prepare할 때 unresolved document 때문에 전체 write를 취소할지, 해결 가능한 document만 수정할지 결정 필요. single/explicit-document vertical slice에는 blocker가 아님 |

## 분리 원칙

- **결정이 필요한 질문** → 이 문서
- **현재 GitHub/branch/Project 상태를 다시 확인해야 하는 항목** → [Current Handoff](../handoff/current.md)
- **특정 revision에서 검증된 capability와 남은 구현 delta** → [Implementation Map](implementation-map.md)
- **이미 확정된 방향과 대체된 결정** → [Decision Log](decisions.md)

초기 지식 레포 구성에 사용한 대화의 source/turn metadata는 provenance에 역사적 근거로 남기되 raw transcript는 저장하지 않는다. 현재 정책과 실제 repository 검증 결과가 있는 항목은 canonical 문서와 Implementation Map을 우선한다.

## Decision order

### Engine scratch 구현 전에 닫는 것이 좋은 gate

1. **Q023 — persistent metadata field ownership**
   - 최소 field taxonomy를 먼저 정한다: user-owned / Engine-generated persistent / projection-derived.
   - 모든 최종 field name을 확정할 필요는 없지만 ownership rule이 없으면 `prepare`의 책임이 불명확하다.
2. **Q026 — timestamp semantics**
   - 적어도 `createdAt`의 의미와 write-once/override 규칙은 첫 `prepare` 전에 정한다.
   - `updatedAt`, `publishedAt`은 필요 없으면 1차 구현에서 제외할 수 있다.
3. **Q027 — unresolved user input 처리**
   - interactive prompt / non-interactive failure / dual-mode 중 public CLI behavior를 정한다.
4. **Q028 — source mutation fidelity**
   - body와 unknown metadata 보존은 필수.
   - frontmatter formatting normalization을 어디까지 허용할지 정한다.

이 네 항목이 정리되면 `prepare` core contract를 구현할 수 있다.

### Scratch skeleton과 병행해서 결정 가능

5. **Q029 — metadata schema declaration**
   - TypeScript/config/schema 중 구현 표현은 core semantics 이후 선택 가능.
6. **Q030 — prepare target selection**
   - 초기에는 explicit path 입력으로 시작해 Q015 layout 결정을 blocker로 만들지 않는다.
7. **Q008 — container mount / credential**
   - local CLI core에는 blocker가 아니다.
   - containerized `prepare`는 docs mount가 read-write, `verify`는 원칙적으로 read-only 가능하다.
   - `publish` integration 전에 Git credential contract를 확정한다.

### Site/Fumadocs vertical slice 전후로 결정

8. **Q024 — projection materialization**
   - ephemeral staging vs Site working-tree generated projection을 실제 consumer integration으로 비교한다.
9. **Q015 — docs layout / consumer convention**
   - projection/discovery boundary를 확인한 뒤 결정한다.
10. **Q017 — authoring editor 역할**
    - custom component authoring Evidence 후 결정한다.
11. **Q019 / Q021 — Site migration / Turbo retirement**
    - delivery Evidence를 보존하면서 별도 Maintenance 판단으로 둔다.

### 실제 요구가 생길 때까지 보류 가능

- **Q025** stable document identity / sidecar linkage
- **Q031** bulk prepare atomicity
- **Q010** asset / large binary policy
- **Q012** shared custom-component profile/package
- **Q014** raw HTML / executable MDX security의 세부 정책 — actual public publish gate 전에는 반드시 닫아야 함
- **Q003** final 1.0 release gate

### 현재 migration bootstrap의 blocker가 아닌 운영 질문

- Q006 Project field 빈 값 규칙
- Q007 Work Type Validation
