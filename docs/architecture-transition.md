# Architecture Transition — DB-backed CMS → Git-backed Content Workspace

상태: **Active migration directive**  
기준일: 2026-09-21

이 문서는 2026-09-21에 확정된 architecture 변경을 여러 repository에서 일관되게 이어가기 위한 **cross-repository 전환 guide**다.

장기 제품·통합 경계는 [Architecture](architecture.md)와 [Release 1.0](release-1.0.md)이 소유한다. Engine의 문서 수정·legacy 전환 기술 설계는 [Engine 수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/docs/content-modification-contract/docs/content-modification-contract.md)과 [Engine migration record](https://github.com/ooMia/oomia.github.io.engine/blob/docs/content-modification-contract/docs/migration.md)가 소유하고, Site의 입력·렌더링·integration 전환은 [Site 소비 계약](https://github.com/ooMia/oomia.github.io/blob/docs/content-consumption-contract/docs/content-consumption-contract.md)이 소유한다.

이 문서는 **레포 간 전환 목적·순서·안전 규칙·완료 조건과 Evidence 연결**만 소유한다. 구현 repository 내부의 코드 분류, runtime 구조, toolchain migration 같은 기술 상세를 중복 정의하지 않는다.

전환이 완료되면 이 문서의 상태를 종료하고 필요한 장기 규칙만 owning canonical 문서에 남긴다.

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

이 구조는 raw Markdown/MDX를 최종 콘텐츠 형태로 사용하는 제품에 비해 DB schema/lifecycle, editor-state conversion, snapshot projection, 별도 persistence 운영 같은 책임을 추가했다.

현재 목표는 기능을 포기하는 것이 아니라 **canonical source와 authoring 도구 사이의 불필요한 persistence/conversion layer를 제거하고 repository별 책임을 분리하는 것**이다.

현재 레포 역할과 콘텐츠 흐름은 [Architecture](architecture.md)를 따른다. Engine 사용 여부는 Docs commit이나 Site 소비의 전제 조건이 아니다.

## 2. 현재 요구사항으로 사용하지 않는 전제

다음 전제를 현재 architecture requirement로 사용하지 않는다.

1. PostgreSQL이 canonical content source다.
2. Payload collection이 Article lifecycle의 owner다.
3. Visual editor state를 Markdown으로 변환해야만 content를 저장할 수 있다.
4. `oomia.github.io.docs`는 DB snapshot에서 생성되는 read-only projection이다.
5. publish는 DB를 Markdown으로 export하는 작업이다.
6. 특정 editor 또는 Engine 후처리를 거쳐야만 Site가 콘텐츠를 소비할 수 있다.
7. 과거 Issue·branch의 구현 계획이 현재 owner 문서보다 우선한다.
8. 기존 코드 투자량이 새 architecture의 책임 경계를 결정한다.

과거 구현과 branch는 migration input과 Evidence로 보존하되, 현재 목표는 owning 문서와 live repository state를 기준으로 판단한다.

## 3. Cross-repository target

### Canonical content

- content는 Markdown/MDX + YAML frontmatter + assets의 filesystem representation을 사용한다.
- local Git working tree는 authoring/draft state를 포함할 수 있다.
- durable shared canonical revision은 [`ooMia/oomia.github.io.docs`](https://github.com/ooMia/oomia.github.io.docs)의 Git commit SHA로 식별한다.
- 사용자가 작성한 파일은 Engine 후처리 없이도 commit할 수 있다.
- Git history가 기본 revision/diff/rollback mechanism이다.
- DB를 추가하더라도 derived index/cache여야 하며 canonical content를 대체하지 않는다.

### Repository boundaries

| Repository | 전환 후 책임 |
|---|---|
| `oomia.github.io.engine` | 선택적 문서 수정·보존 기능과 그 구현·migration Evidence |
| `oomia.github.io.docs` | canonical content remote, shared revision history, content/assets |
| `oomia.github.io` | Docs 입력 계약에 따른 렌더링·publishability·delivery |
| `oomia.github.io.knowledge` | 공통 workflow·coordination·통합 목표·cross-repository 검수 연결 |

Engine과 Site 문서가 서로를 참조해도 상대 runtime 실행을 요구하는 의존성을 뜻하지 않는다. Site는 Engine 처리 이력을 몰라도 자신의 입력 계약으로 Docs revision을 판정한다.

### 아직 결정하지 않는 경계

- authoring editor 역할은 [Q017](open-questions.md)을 따른다.
- docs layout / consumer discovery convention은 [Q015](open-questions.md)을 따른다.
- custom component shared profile/manifest 필요성과 owner는 [Q012](open-questions.md)을 따른다.

이 항목은 실제 Evidence가 생기기 전 임의로 확정하지 않는다.

## 4. Repository별 migration source

### Engine

Engine 내부의 greenfield/bootstrap, legacy preservation, runtime 범위, 코드 재사용·폐기 판단은 Engine이 소유한다.

- [Engine 수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/docs/content-modification-contract/docs/content-modification-contract.md)
- [Engine migration record](https://github.com/ooMia/oomia.github.io.engine/blob/docs/content-modification-contract/docs/migration.md)
- [Engine Issue #13](https://github.com/ooMia/oomia.github.io.engine/issues/13)
- [Engine Issue #14](https://github.com/ooMia/oomia.github.io.engine/issues/14)

Knowledge는 해당 구현 전략을 복제하지 않고 cross-repository 결과와 Evidence 연결만 추적한다.

### Site

Site 내부의 Astro/Fumadocs integration, component 지원, toolchain 전환, build/deployment 검증은 Site가 소유한다.

- [Site 소비 계약](https://github.com/ooMia/oomia.github.io/blob/docs/content-consumption-contract/docs/content-consumption-contract.md)
- [Site Issue #10](https://github.com/ooMia/oomia.github.io/issues/10)

Knowledge는 Site의 기술 migration 방식을 재정의하지 않고 통합 수용 기준과 revision linkage를 연결한다.

### Docs

Docs는 canonical content remote와 revision history를 제공한다. 일반 content edit은 repository implementation migration 자체가 아니다. layout·shared convention·tooling처럼 여러 소비자 또는 workflow에 영향을 주는 변경만 별도 설계 대상으로 올린다.

## 5. Cross-repository migration order

### Phase A — Observe and preserve

- legacy history와 미병합 작업을 임의로 덮어쓰거나 삭제하지 않는다.
- Engine/Site/Docs의 실제 live state와 owner 문서를 확인한다.
- 기존 Evidence가 어느 revision과 architecture를 검증했는지 구분한다.

### Phase B — Prove canonical Docs consumption

실제 기존 content corpus를 우선 사용해 다음을 검증한다.

- Docs에 직접 작성·commit한 source를 Site가 자신의 입력 계약으로 소비할 수 있는가.
- source 보존과 Site rendering 사이에 불필요한 conversion이 없는가.
- editor·layout·component 관련 미결 사항을 결정할 만큼의 Evidence가 확보되는가.

synthetic fixture는 실제 corpus로 재현하기 어려운 regression 검증에 보조적으로 사용한다.

### Phase C — Rewire publishing evidence

- DB snapshot export를 공통 publish 선행 조건에서 제거한다.
- Docs canonical revision과 Site revision·delivery result를 연결한다.
- Engine을 사용한 경우 그 실행 Evidence는 Engine 기능 검수에 별도로 연결한다.
- 문서 검증과 runtime/build/deployment 검증을 서로 대체하지 않는다.

### Phase D — Retire legacy after replacement evidence

새 경로가 필요한 acceptance를 충족한 뒤에만 legacy runtime·scripts·tests·config를 각 owning repository의 판단과 Evidence에 따라 제거하거나 archive한다.

Knowledge는 제거 대상의 파일 목록이나 내부 순서를 소유하지 않는다.

## 6. Migration safety rules

- **Big-bang delete 금지**: 대체 경로가 최소 vertical slice Evidence를 확보하기 전에 legacy 구현을 대량 삭제하지 않는다.
- **Dual-SoT 장기 운영 금지**: migration 중 일시적 coexistence는 가능하지만 DB와 files를 동시에 authoritative하게 두지 않는다.
- **Silent normalization 금지**: editor/tool 간 이동에서 unsupported source가 조용히 손실되면 migration 실패다.
- **Site verification 생략 금지**: file parse나 문서 링크 검사만으로 Publishable 또는 배포 성공을 판정하지 않는다.
- **Editor/layout 선결 금지**: Q015/Q017의 Evidence 없이 특정 editor 또는 strict/free-form layout을 architecture 원칙으로 고정하지 않는다.
- **Owner 우회 금지**: Engine/Site 기술 상세를 Knowledge에서 새로 확정하지 않는다.
- **Evidence 범위 확대 금지**: 과거 Evidence는 기록된 revision·검증 종류에만 적용한다.

## 7. Implementation session bootstrap

migration 관련 작업을 수행할 때는 다음 순서로 현재 원본을 확인한다.

1. [Context entry point](../CONTEXT.md)
2. [Repository Design](repository-design.md)
3. [Architecture](architecture.md)
4. 이 문서
5. 변경 대상 repository의 owning docs·Issue·code·tests
6. [Open Questions](open-questions.md)
7. [Release 1.0](release-1.0.md)
8. [Implementation Map](implementation-map.md)
9. [Current Handoff](../handoff/current.md)

과거 Issue body나 branch code가 현재 owning 문서와 충돌하면 과거 구현은 migration input으로 취급한다. 실제 live repository state와 미push local work는 임의로 덮어쓰지 않는다.

## 8. Transition completion criteria

다음이 모두 충족되면 이 transition guide를 Active에서 Completed/Archived 상태로 바꿀 수 있다.

- Docs repository가 canonical content remote로 실제 운영된다.
- Site가 canonical Docs revision을 실제 입력 계약에 따라 build/deploy한다.
- publish Evidence가 Docs SHA + Site revision + delivery result를 연결한다.
- 선택적으로 사용한 Engine 기능의 Evidence는 Engine 기능 검수에 별도로 연결된다.
- Engine 전환 완료 여부는 Engine의 현재 수용 기준과 Evidence로 판정된다.
- editor/layout/component 관련 미결 사항은 실제 integration에 필요한 범위에서 결정되거나 명시적으로 이후 gate로 남는다.
- legacy Payload/PostgreSQL runtime은 owning repository에서 제거되거나 명시적으로 archive 상태로 격리된다.
- [Implementation Map](implementation-map.md)이 새 기준 revisions와 검증 종류를 구분해 갱신된다.

이 완료 조건은 문서 정리만으로 충족되지 않는다. 코드·build·deployment Evidence와 문서 검증은 별도로 기록한다.
