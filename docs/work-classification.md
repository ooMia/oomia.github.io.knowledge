# Work Classification

> **Authority:** POLICY  
> **Owner:** Work Type and Label selection semantics  
> **Scope:** repository Issues represented in Publishing Platform Project #11 and repository-native labels  
> **Read when:** classifying why an Issue exists or choosing durable searchable labels  
> **Enforced by:** Project Work Type option set, the Knowledge label registry, and live repository label registries where synchronized

Project #11에서 repository는 작업의 1차 영역을 이미 제공한다. 추가 metadata는 repository를 가로질러 비교하거나 실제로 필터링할 가치가 있는 정보만 유지한다.

## Classification axes

이 문서는 두 가지 질문의 **의미와 선택 기준**을 소유한다.

| Axis | Question |
|---|---|
| Work Type | 왜 이 Issue가 존재하는가? 주된 delta는 무엇인가? |
| Labels | 무엇에 관한 작업인가? 반복해서 찾을 가치가 있는 관심사는 무엇인가? |

Status/Iteration 및 field cardinality/completeness는 [Project Fields](fields.md), lifecycle 의미는 [Planning Model](planning-model.md)이 소유한다.

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

label을 과도하게 붙여 filtering 의미를 약화하지 않는다. 구체적인 cardinality/completeness는 [Project Fields](fields.md)를 따른다.

## Label registry

실제 허용 label의 canonical registry는 [Knowledge `config/labels.json`](https://github.com/ooMia/oomia.github.io.knowledge/blob/main/config/labels.json)이다. 이 operational registry는 context bundle에 복제하지 않으며 exact lookup에는 Knowledge repository access가 필요하다.

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
