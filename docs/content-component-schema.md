# Content Component Manifest Schema

상태: 2026-09-21 deferred planning draft. Fumadocs built-in components를 우선 재사용하며, custom component의 cross-repository contract가 실제로 필요해질 때 활성화한다.

## 목적

1.0에서는 Fumadocs Editor/UI가 이미 제공하는 built-in component capability를 우선 사용한다. 따라서 별도 content-component library와 manifest를 선행 구축하지 않는다.

다만 다음 상황이 생기면 machine-readable component profile이 필요할 수 있다.

- canonical MDX에 custom component를 추가한다.
- Engine/Fumadocs Editor와 Site가 같은 component semantics를 공유해야 한다.
- Agent가 component name / props / children policy를 runtime에 조사해야 한다.
- publish validation이 component contract를 programmatically 검증해야 한다.

이 경우 [content-component-manifest.schema.json](../schemas/content-component-manifest.schema.json)을 planning vocabulary로 사용할 수 있다.

## Fumadocs 우선 원칙

component 지원 순서는 다음과 같다.

1. Fumadocs built-in component로 요구사항을 충족하는지 확인한다.
2. built-in component라면 불필요한 Oomia wrapper를 만들지 않는다.
3. 플랫폼에서 허용할 subset만 명시해야 한다면 얇은 supported profile을 둔다.
4. custom component가 필요한 경우 Fumadocs Editor component spec과 Site renderer semantics를 함께 정의한다.
5. cross-repository runtime contract가 실제로 필요해질 때만 manifest/shared package를 도입한다.

과거 계획한 public `@oomia/content-components` React renderer package는 1.0 prerequisite가 아니다.

## 최소 manifest 정보

manifest가 필요해질 경우 각 component는 다음을 기술한다.

| 필드 | 의미 |
|---|---|
| name | canonical Markdown/MDX source에서 사용하는 component 이름 |
| kind | block 또는 inline |
| props | 공개 prop 이름, 타입, required 여부, enum 값 |
| children | none / text / markdown / mdx 중 허용 children model |

이 정보는 특정 renderer 구현을 설명하지 않는다.

- Fumadocs internal React tree
- CSS/theme implementation
- Astro layout
- Editor UI implementation
- deployment state

등은 manifest의 필수 contract가 아니다.

## Authoring integration

custom component가 생겼을 때:

1. canonical source syntax를 먼저 정의한다.
2. Fumadocs Editor component spec으로 visual editing 가능 범위를 정의한다.
3. Site에서 같은 source semantics를 렌더링한다.
4. Visual editing을 지원하지 못하는 source는 Obsidian/IDE 등 Source client에서 유지한다.
5. Site consumer build가 Publishability를 검증한다.

Visual adapter의 존재는 component의 canonical 지원 여부와 동일하지 않다.

## Agent/runtime 사용

manifest/profile이 필요해진 경우 Agent는 다음을 할 수 있다.

1. source에서 사용된 component를 식별한다.
2. supported profile에 존재하는지 확인한다.
3. props/children contract를 검증한다.
4. Fumadocs Editor visual spec 존재 여부와 canonical support를 분리한다.
5. publish validation에서 Site consumer compatibility를 확인한다.

## 독립 package 도입 기준

다음 중 하나 이상이 실제로 발생하기 전에는 shared npm package를 만들지 않는다.

- Engine과 Site가 같은 custom component runtime/type definition을 반복 복제한다.
- manifest/profile을 여러 repository가 package dependency로 소비할 필요가 있다.
- custom renderer implementation을 Site 외부 consumer도 재사용해야 한다.

package가 필요해지면 package name, registry, version policy를 그 시점의 요구사항에 맞춰 다시 결정한다. 과거의 `@oomia/content-components@0.1.0` bootstrap 계획을 현재 확정된 implementation requirement로 간주하지 않는다.

## Schema status

JSON Schema는 삭제하지 않고 planning artifact로 유지한다.

- 현재 1.0 release gate의 필수 artifact가 아니다.
- Fumadocs built-in component를 복제하는 catalog를 만들기 위한 용도가 아니다.
- custom component contract가 생기면 실제 source/API에 맞춰 schema를 재검증하고 필요하면 변경한다.
