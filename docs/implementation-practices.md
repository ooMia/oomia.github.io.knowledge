# Implementation Practices

> **Authority:** GUIDANCE  
> **Owner:** cross-repository implementation-start and short feedback-loop practices  
> **Scope:** implementation work after Outcome, owner, and acceptance boundary are sufficiently defined  
> **Read when:** starting an Issue implementation, preparing the first integration slice, or deciding how much to implement before verification

이 문서는 구현을 시작하고 검증 가능한 작은 변화로 진전시키는 **권고 방식**을 소유한다. lifecycle 의미는 [Planning Model](planning-model.md), branch/PR integration은 [Git Workflow](git-workflow.md), repository structure는 [Repository Design](repository-design.md), exact commands와 runtime/tooling은 [Development Toolchain](development-toolchain.md)이 소유한다.

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
- prototyping과 초기 integration slice에서 여러 합리적인 대안이 있다면, Agent는 구현·검증·수정이 쉬운 **개발 친화적이고 가역적인 선택**을 우선 추천한다. 이는 장기 architecture나 project-wide POLICY를 의미하지 않으며, 반복되는 필요와 Evidence가 생길 때만 durable rule로 승격한다.
- 발견된 불일치에 실제 조치를 취할 수 없는 검사를 반복적으로 추가하지 않는다.
- 주변 metadata 검사를 본 Outcome의 blocker로 만들지 않는다. 단, completion claim에 필요한 Evidence는 생략하지 않는다.
- 검증 실패가 implementation assumption을 깨뜨리면 더 많은 코드를 쌓기 전에 owner contract와 boundary를 다시 확인한다.

## Composition

이 GUIDANCE는 다른 owner를 대체하지 않는다.

- 구현이 시작되었는지와 Status 의미 → [Planning Model](planning-model.md)
- branch/PR/integration path → [Git Workflow](git-workflow.md)
- package/directory/dependency boundary → [Repository Design](repository-design.md)
- toolchain default와 repository-local command → [Development Toolchain](development-toolchain.md)
- user↔Agent approval/resume/tool semantics → [Agent Conventions](agent-conventions.md)

작업이 이미 명확한 repository structure 안에서 진행된다면 이 문서만 직접 읽고 Repository Design을 추가로 읽지 않아도 된다. 반대로 package/directory boundary만 검토하는 작업은 이 문서를 읽을 필요가 없다. 이 독립 retrieval 경계가 이 문서를 별도 reference unit으로 유지하는 이유다.
