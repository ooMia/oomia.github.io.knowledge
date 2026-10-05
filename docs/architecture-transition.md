# Architecture Transition — DB-backed CMS → Git-backed Content Workspace

> **Authority:** RECORD  
> **Owner:** completed DB-backed CMS → Git-backed content migration provenance  
> **Scope:** transition decisions and Evidence from 2026-09-21 through completion on 2026-10-05  
> **Read when:** reconstructing why the architecture changed, auditing migration safety, or verifying the completed transition  
> **Evidence scope:** Knowledge #47 / merged PR #48 (`07d07579b2c4dd6082c81494fe854d8109a9ab2b`) and the pinned owner revisions linked below

이 문서는 DB-backed CMS 중심 구현에서 Git-backed document workspace로 전환할 때 사용한 **cross-repository 전환 순서·안전 규칙·Evidence 연결**을 보존한다. 전환은 완료되었으며 이 문서는 현재 작업에 대한 active migration gate가 아니다. Engine/Site 내부의 현재 구현 상태와 전략은 각 repository의 문서와 코드가 소유한다.

장기 제품 경계는 [Architecture](architecture.md), 통합 목표는 [Release 1.0](release-1.0.md), 완료 시점의 통합 검수는 [Implementation Map](implementation-map.md)을 따른다.

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

- Engine: [수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/0484358d9118ecc8dfdb803b64909827e205ddf1/docs/content-modification-contract.md), [migration record](https://github.com/ooMia/oomia.github.io.engine/blob/0484358d9118ecc8dfdb803b64909827e205ddf1/docs/migration.md)
- Site: [소비 계약](https://github.com/ooMia/oomia.github.io/blob/79efd753bd4b6efd63ab2e3bfccbd83935517c58/docs/content-consumption-contract.md)
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
- [x] [Implementation Map](implementation-map.md)이 새 기준 revisions로 재검증됐으며 1.0 acceptance capability에 남은 미충족 gap이 없다.

완료 판정의 통합 Evidence는 이 문서와 같은 revision의 [Implementation Map](implementation-map.md), Engine [migration record](https://github.com/ooMia/oomia.github.io.engine/blob/0484358d9118ecc8dfdb803b64909827e205ddf1/docs/migration.md), Site [소비 계약](https://github.com/ooMia/oomia.github.io/blob/79efd753bd4b6efd63ab2e3bfccbd83935517c58/docs/content-consumption-contract.md)에서 추적한다. 문서 정리만으로 completion을 판정한 것이 아니다.

후속 기능 변경은 현재 Architecture와 각 owning repository의 live code/docs로 판단한다. 새로운 cross-repository migration이 필요하면 이 완료 기록을 다시 active로 간주하지 않고 별도 Change로 정의한다.
