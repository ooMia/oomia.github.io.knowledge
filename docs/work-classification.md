# Work Classification

Project #11에서 repository는 작업의 1차 영역을 이미 제공한다. 추가 metadata는 repository를 가로질러 비교하거나 실제로 필터링할 가치가 있는 정보만 유지한다.

## Classification axes

| Axis | Question | Cardinality |
|---|---|---|
| Repository | 어디의 작업인가? | GitHub native, exactly one |
| Work Type | 왜 이 Issue가 존재하는가? 주된 delta는 무엇인가? | exactly one |
| Labels | 무엇에 관한 작업인가? 반복해서 찾을 가치가 있는 관심사는 무엇인가? | zero or more |
| Status | 지금 어떤 실행 상태인가? | exactly one |
| Iteration | 언제 수행했는가? | committed / historical work only |

Work Type은 Issue 전체 Outcome을 분류한다. 개별 commit의 conventional type, 사용 기술, 구현 방법, 실험성, CI 여부를 나타내지 않는다.

## Work Type

| Option | Definition |
|---|---|
| Feature | Owning repository의 책임 안에서 이전에 없던 의도된 동작 또는 규칙을 추가하거나 확장한다. |
| Fix | 이미 의도되거나 정의된 동작 또는 규칙에서 벗어난 상태를 복구한다. |
| Refactor | 의도된 observable 또는 normative behavior를 유지하면서 내부 구조를 의미 있게 재편한다. |
| Maintenance | 의미 있는 동작·규칙 추가나 구조 재설계 없이 repository를 건강한 상태로 유지한다. |
| Documentation | 이미 존재하는 동작·규칙·지식을 더 잘 전달하는 것이 Outcome이며 normative state 자체는 바뀌지 않는다. |
| Investigation | production change 자체가 아니라 불확실성을 줄이는 결론과 Evidence를 얻는 것이 Outcome이다. |

### Decision tree

아래 순서로 첫 번째 참인 항목을 선택한다.

1. 이미 기대되던 동작이나 규칙을 복구하는가? → **Fix**
2. 기대 동작/규칙을 유지하면서 구조를 재편하는가? → **Refactor**
3. 의미 있는 동작·규칙·구조 변경 없이 upkeep이 목적인가? → **Maintenance**
4. 기존 사실·동작·규칙을 전달하거나 설명하는 것이 전부인가? → **Documentation**
5. 시스템 변경보다 결론과 Evidence 확보가 성공 조건인가? → **Investigation**
6. 그 외 새로운 의도된 동작 또는 규칙을 추가·확장하는가? → **Feature**

Feature는 마지막에 판정한다. Knowledge에서 canonical policy/schema를 새로 정의하거나 확장하는 작업도 repository의 normative behavior를 바꾸므로 Feature다. Markdown을 수정했다는 사실만으로 Documentation이 되지 않는다.

### Commit type과의 관계

Commit type은 변화 조각의 성격이고 Work Type은 Issue 전체의 목적이다. 하나의 Refactor Issue 안에 feat/test/docs/chore commit이 있어도 최종 Outcome이 외부 동작이나 규칙을 추가하지 않는다면 Work Type은 Refactor다.

### Investigation promotion

Investigation은 기본적으로 merge가 아니라 결론/Evidence 확보가 완료 조건이다. 조사 과정의 prototype이나 benchmark 변경을 production state에 채택하려면 별도의 **Feature / Fix / Refactor / Maintenance** Issue로 승격한다.

반복 가능한 benchmark harness나 durable evidence처럼 Investigation 자체의 산출물이 repository에 남을 가치가 있으면 merge할 수 있다. 그러나 그 merge를 실제 제품 변경의 우회 경로로 사용하지 않는다.

## Labels

Labels는 optional controlled tags다. Work Type을 반복하지 않고, repository 안에서 지속적으로 검색할 가치가 있는 domain/component 또는 횡단 관심사를 표현한다.

새 label은 다음 중 하나 이상에 해당할 때만 만든다.

- 여러 Issue에서 반복해서 찾을 가능성이 있다.
- 실제 Issue/Project filtering에 사용할 가치가 있다.
- 특정 review/운영 정책을 적용하는 데 의미가 있다.
- repository의 지속적인 책임 영역을 나타낸다.

다음은 label로 만들지 않는다.

- Feature/Fix/Refactor/Maintenance/Documentation/Investigation의 동의어
- 한 Issue에서만 등장하는 세부 구현명
- library/version 이름처럼 쉽게 소멸하는 keyword
- 제목만으로 충분히 식별되는 일회성 debugging 원인
- 단순히 “실험적이다”라는 특성. 제품 maturity가 실제 workflow/contract를 바꿀 때 별도 정책으로 도입한다.

보통 domain/component label 1개와 필요한 cross-cutting label 0–2개면 충분하다. 3개를 넘어가면 Issue 범위 또는 label granularity를 다시 검토한다.

## Initial controlled tags

Canonical registry는 [config/labels.json](../config/labels.json)이다. registry에 없는 label은 필요성이 반복적으로 확인된 뒤 추가한다.

| Repository | Initial labels |
|---|---|
| Engine | `mcp`, `inference`, `filesystem`, `ci`, `dependencies`, `orchestration` |
| Site | `content-loading`, `deployment`, `ci`, `orchestration` |
| Knowledge | `orchestration`, `planning` |

## Few-shot examples

| Repository | Work | Work Type | Labels |
|---|---|---|---|
| Engine | LilysAI URL summary capability를 실제 Engine entrypoint에 추가 | Feature | `mcp` |
| Engine | Windows에서 기존 CLI가 실패하는 문제 수정 | Fix | 필요하면 `filesystem` |
| Engine | MCP adapter 구조를 외부 동작 변화 없이 재편 | Refactor | `mcp` |
| Engine | dependency 정기 업데이트 | Maintenance | `dependencies` |
| Engine | Windows CI bootstrap 전략을 benchmark하고 결론만 남김 | Investigation | `ci` |
| Engine | 기존 CLI 사용법을 체계적인 reference로 정리 | Documentation | 관련 domain이 있으면 추가 |
| Site | canonical article discovery 동작을 새 layout에 맞게 확장 | Feature | `content-loading` |
| Site | feature branch에서도 Pages가 배포되는 오류 수정 | Fix | `deployment`, `ci` |
| Knowledge | 새로운 Issue lifecycle 또는 Project taxonomy를 정의 | Feature | `planning` |
| Knowledge | 기존 정책의 의미를 바꾸지 않고 설명을 정리 | Documentation | `planning` |
| Knowledge | Project field 대안을 비교하고 결론/Evidence를 확보 | Investigation | `planning` |
| Knowledge | Issue activation automation의 중복 실행 버그 수정 | Fix | `orchestration` |

## Completeness

- Work Type: 활성 Project Item이면 반드시 하나.
- Labels: 0개 이상. 비어 있어도 정상이다.
- Iteration: committed work 또는 실제 수행된 historical work에 둔다. Backlog는 일반적으로 비운다.
- Linked pull requests: 구현 PR이 존재하면 GitHub native Development relation으로 연결한다.
- Parent/Sub-issues: 실제 작업 구조가 있을 때만 사용한다.

과거 `Experiment` option을 `Investigation`으로 이름만 바꾼 결과는 자동으로 올바른 분류가 된 것으로 간주하지 않는다. Migration 시 모든 기존 Item을 Outcome 기준으로 다시 판정한다.
