# GitHub labels

Labels는 Project Work Type을 보조하는 **optional controlled tags**다.

- Repository: 어디의 작업인가
- Work Type: 왜 이 Issue가 존재하는가
- Labels: 무엇에 관한 작업인가

따라서 Feature/Fix/Refactor/Maintenance/Documentation/Investigation을 label로 복제하지 않는다. `experimental`도 현재는 만들지 않는다. 실험적인 구현 방식과 Investigation Outcome을 구분하고, 제품 maturity가 실제 contract/workflow를 바꾸는 시점에만 별도 정책을 검토한다.

## Registry

label의 이름·적용 repository·의미는 [config/labels.json](../config/labels.json)을 canonical source로 사용한다. label은 repository-specific일 수 있으며 모든 repository가 같은 label set을 가질 필요가 없다.

새 label 생성 기준, granularity, negative examples는 [Work Classification](work-classification.md#labels)을 따른다.

## Usage

- label은 0개여도 정상이다.
- 실제 반복 검색/filtering 가치가 있을 때만 붙인다.
- 보통 domain/component 1개 + cross-cutting concern 0–2개면 충분하다.
- registry에 없는 keyword를 Agent가 즉석에서 label로 만들지 않는다.
- 기존 label이 Work Type이나 제거된 Project field를 복제하면 migration 시 제거한다.
