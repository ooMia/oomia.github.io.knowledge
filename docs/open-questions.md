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
| Q016 | Git publish ownership / semantics | **사용자 결정 필요.** durable canonical revision은 docs commit으로 확정. (A) Engine은 clean/committed HEAD만 받아 push+verify, (B) Engine이 working tree를 commit+push, (C) branch/PR 생성 중 하나를 선택해야 Q008 credential/mount contract와 public CLI를 확정할 수 있음 |
| Q017 | 실제 authoring editor 역할 분담 | Evidence-gated. Fumadocs Editor는 local files를 SoT로 유지하고 built-in/custom component specs를 지원한다. 기존 Obsidian corpus를 Fumadocs Site에 연결한 뒤 custom-component authoring 이득을 비교해 Obsidian-only / optional Fumadocs Editor / Fumadocs-heavy 중 결정. Studio vs embedded UI는 채택 이후 하위 결정 |
| Q019 | Site migration 방식 | Engine은 D032에 따라 greenfield scratch build를 기본값으로 확정. Site는 현재 docs→Astro→Pages Evidence가 있으므로 incremental migration을 우선 후보로 두되 Fumadocs integration spike 결과에 따라 재평가 |
| Q021 | Site Turbo retirement | 새 task orchestration은 VP-first. 기존 Site Turbo를 언제 제거할지는 `vp run` recursive/filter/cache parity와 CI/build Evidence를 확인한 뒤 별도 Maintenance change로 결정 |
| Q022 | Engine 1.0 실행 표면 | **사용자 결정 필요.** (A) CLI-first one-shot runtime/container, (B) long-running HTTP/service shell 포함. scratch directory, public command contract, container ENTRYPOINT가 달라지므로 bootstrap 전에 결정 |

## 분리 원칙

- **결정이 필요한 질문** → 이 문서
- **현재 GitHub/branch/Project 상태를 다시 확인해야 하는 항목** → [Current Handoff](../handoff/current.md)
- **특정 revision에서 검증된 capability와 남은 구현 delta** → [Implementation Map](implementation-map.md)
- **이미 확정된 방향과 대체된 결정** → [Decision Log](decisions.md)

초기 지식 레포 구성에 사용한 대화의 source/turn metadata는 provenance에 역사적 근거로 남기되 raw transcript는 저장하지 않는다. 현재 정책과 실제 repository 검증 결과가 있는 항목은 canonical 문서와 Implementation Map을 우선한다.

## Decision order

### 지금 사용자 결정이 필요한 gate

1. **Q022 — Engine execution surface**
   - 이 결정이 scratch app entrypoint, container lifecycle, command/API contract를 정한다.
2. **Q016 — Git publish ownership**
   - Q022와 함께 container credential/mount contract(Q008)를 결정한다.

### Evidence 이후에 닫는 gate

3. **Q015 — docs layout**
   - 현재 Site의 “docs 전체 = articles” consumer assumption을 Fumadocs integration에서 실제로 검증한 뒤 결정한다.
4. **Q017 — authoring editor 역할**
   - custom component authoring과 source round-trip Evidence 후 결정한다.
5. **Q019 / Q021 — Site migration와 Turbo retirement**
   - 기존 delivery Evidence를 보존하며 incremental하게 판단한다.

### 1.0 구현 중 또는 실제 필요 발생 시 결정

- Q008 container distribution/mount/credential 세부사항 — Q022/Q016 이후
- Q010 asset/large binary policy
- Q012 shared custom-component profile/package
- Q014 raw HTML/executable MDX security 세부 정책
- Q003 final release gate

### 현재 migration bootstrap의 blocker가 아닌 운영 질문

- Q006 Project field 빈 값 규칙
- Q007 Work Type Validation
