# Feature Change Protocol

새 기능이나 의미 있는 동작 변경을 시작할 때, 적용되는 정책·계약·소유권을 빠르게 식별하기 위한 routing protocol이다.

이 문서는 기존 정책을 다시 정의하지 않는다. 실제 규칙은 각 canonical source와 owning repository가 소유하며, 이 문서는 **무엇을 확인하고 어디에 기록할지**만 정한다.

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
| repository 역할·제품 경계가 바뀜 | [Architecture](architecture.md) |
| canonical Markdown/document를 수정하는 기능 | Engine의 현재 modification contract와 code/tests |
| Docs에 지속 데이터를 추가하거나 content identity에 영향을 줌 | Docs의 owning contract/schema; cross-repo 의미가 생기면 Architecture 확인 |
| Site rendering·component·consumer semantics가 바뀜 | Site의 current consumption contract와 code/tests |
| external network, paid API, remote mutation 등 side effect가 생김 | owning repository의 기술 계약·trigger policy·tests |
| build/publish 재현성이나 release boundary가 바뀜 | owning repository 검증 + [Git Workflow](git-workflow.md) + 필요한 경우 [Implementation Map](implementation-map.md) |
| 둘 이상의 repository가 같은 semantics를 소비함 | semantics의 단일 owner를 정하고 다른 repository는 원본을 참조 |
| 제품/cross-repository 결정이 아직 남음 | [Open Questions](open-questions.md) |
| package/module/API 내부 선택처럼 owner 안에서 결정 가능한 구현 세부사항 | Knowledge에 복제하지 않고 owning repository code/docs에서 결정 |

소유권이 불분명하면 구현 전에 먼저 owner를 정한다. 단순히 여러 repository가 관련된다는 이유만으로 Knowledge가 기술 계약의 owner가 되지는 않는다.

## 3. Change impact note

Repository Issue를 만들 때 적용되는 항목만 `Impact`에 기록한다.

- **Ownership:** primary owner와 실제로 수정되는 repository
- **Contract surfaces:** 영향을 받는 canonical contract/schema 링크
- **Persistent state:** 새로 생기거나 변경되는 durable state가 있는지
- **External effects:** network, paid call, remote mutation, credential boundary 등
- **Cross-repository dependency:** producer/consumer 또는 shared semantics
- **Open questions:** 구현 전에 남아 있는 Knowledge-level OQ

`None`인 항목은 짧게 표시한다. 이 섹션 자체가 새로운 정책 원본이 되어서는 안 되며, 결정된 규칙은 실제 owner 문서를 참조한다.

## 4. 기록 위치

변경 중 발견한 정보는 성격에 따라 한 곳에만 둔다.

| 성격 | 원본 |
|---|---|
| 오래 유지되는 공통 invariant·coordination rule | Knowledge의 해당 canonical 문서 |
| repository가 외부에 보장하는 기술 contract | owning repository docs/schema/tests |
| 현재 구현 방식 | owning repository code/tests |
| 아직 결정하지 않았거나 Evidence가 부족한 제품/cross-repo 문제 | [Open Questions](open-questions.md) |
| 작업 결과·AC·Evidence | 실제 Project Item / Repository Issue / PR |

결정이 끝난 OQ는 실제 canonical source로 이동하고, OQ 자체를 두 번째 원본으로 유지하지 않는다. [Current Decisions](decisions.md)는 원본 탐색 인덱스이며 규칙 본문을 복제하지 않는다.

## 5. 구현 진입 기준

구현에 들어가기 전에 최소한 다음이 분명해야 한다.

- Outcome과 primary owner
- 변경되는 contract surface 또는 변경 없음
- 비용·network·remote mutation 같은 external effect의 trigger boundary
- 지속 데이터가 있다면 owner와 재현 가능한 저장 위치
- cross-repository semantics가 있다면 단일 원본
- 사용자 결정이 필요한 OQ가 있다면 구현 가능한 범위와 분리

나머지는 owning repository에서 green scaffold와 실제 Evidence를 통해 점진적으로 구체화한다. 이 protocol 때문에 불필요한 선행 설계나 문서 작성을 blocker로 만들지 않는다.

## 6. 완료

완료 판정은 [Planning Model](planning-model.md#완료-판정)을 따른다.

기능 구현은 설계 문서 존재만으로 완료되지 않는다. 적용되는 contract와 code/tests가 일치하고, Acceptance Criteria와 Quality Requirements를 실제 Evidence로 검증해야 한다.
