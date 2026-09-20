# Content Component Manifest Schema

상태: 2026-09-20 planning draft. Agent와 구현 작업의 공통 어휘를 제공하기 위한 schema이며 아직 published package API는 아니다.

## 목적

공식 MDX component contract를 TypeScript 타입에만 의존하면 runtime과 Agent가 component surface를 안정적으로 조사하기 어렵다.

따라서 public content-component package가 장기적으로 다음 두 표현을 함께 제공할 수 있도록 계획한다.

- TypeScript types: compile-time contract
- component manifest: runtime/Agent-readable contract

manifest의 JSON 형태는 [content-component-manifest.schema.json](../schemas/content-component-manifest.schema.json)으로 검증한다.

## 최소 정보

각 component는 다음을 기술한다.

| 필드 | 의미 |
|---|---|
| name | MDX source에서 사용하는 공식 component 이름 |
| kind | block 또는 inline |
| props | 공개 prop 이름, 타입, required 여부, enum 값 |
| children | none / text / markdown / mdx 중 허용 children model |

이 정보는 rendering implementation을 설명하지 않는다. CSS, React/Astro 내부 구조, Payload field implementation은 manifest 밖이다.

## Agent 사용 예

Agent가 새로운 component를 추가할 때:

1. Site repository의 component implementation을 수정한다.
2. package의 TypeScript contract와 manifest를 함께 수정한다.
3. schema validation을 통과시킨다.
4. Engine의 Payload adapter가 필요한 경우 같은 manifest/type을 기준으로 구현한다.
5. 실제 Site consumer build로 Publishability를 검증한다.

Agent가 Article source를 분석할 때:

1. source에서 사용된 공식 MDX component를 식별한다.
2. 현재 package manifest에 존재하는지 확인한다.
3. props/children contract 위반을 진단한다.
4. CMS Visual adapter 유무와 관계없이 공식 component 여부를 판정한다.
5. 최종 Site build 결과를 publish gate로 사용한다.

## 의도적으로 포함하지 않는 정보

- Payload 전용 field config
- React/Astro component import path
- CSS/theme 정보
- final preview renderer
- arbitrary JavaScript expression semantics
- deployment state

이 정보까지 manifest에 넣으면 shared content contract가 특정 authoring/rendering framework에 다시 결합된다.

## 버전 정책

manifest 자체는 `schemaVersion`을 가진다. component package도 별도의 semantic version을 가진다.

정확한 package compatibility policy와 registry/publishing 방식은 아직 미결이며 [Open Questions](open-questions.md)에서 추적한다.
