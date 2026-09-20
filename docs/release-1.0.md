# Publishing Platform 1.0

상태: 2026-09-20 Content Authoring & Publishing Contract를 반영한 1.0 제품 경계.

## Release Goal

Deliver a usable and extensible workflow for authoring Articles and publishing them to a live site.

## Product Boundary

| Capability | 요구되는 관찰 가능한 결과 |
|---|---|
| Authoring | Article을 생성·수정할 실용적인 UX 또는 DX가 있다. 지원되는 content는 Visual Editor에서 편집할 수 있고, Visual Editor가 무손실로 표현하지 못하는 source는 손실 없는 Source editing path로 다룰 수 있다. 최종 Site와 동일한 WYSIWYG Preview는 필수가 아니다. |
| Canonical Content | Article을 생성·조회·수정할 수 있고 authoritative raw Markdown/MDX source가 CMS editor state와 독립적으로 지속된다. Visual Editor의 표현 한계가 canonical source의 저장 가능 범위를 결정하지 않는다. |
| Extensibility | 공식 MDX component가 명시적인 versioned content-component contract를 통해 정의된다. Site는 rendering consumer이고 CMS는 authoring adapter이며, Visual adapter가 없어도 공식 source는 보존·발행할 수 있다. |
| Automation | 최소 하나의 automated 또는 agent-assisted workflow가 실제 publishing process에 참여한다. |
| Publishing | canonical content를 계약된 generated document set으로 결정적으로 투영한다. Publishability는 CMS Visual Editor round-trip이 아니라 content/component contract와 실제 Site consumer 검증으로 판정한다. |
| Presentation | generated documents와 공식 content components를 최종 사용자용 사이트로 렌더링한다. 프레임워크는 구현 레포에서 결정한다. |
| Delivery | 검증된 publishable 결과가 발행 경로를 거쳐 실제 GitHub Pages 사이트에 배포되고 성공 Evidence를 남길 수 있다. |

세부 Markdown/MDX 지원 수준은 [Content Authoring & Publishing Contract](content-authoring-contract.md)가 소유한다.

## 명시적 제외 범위

- canonical database backup / restore
- production-grade availability / HA
- advanced agent orchestration
- full-featured visual CMS
- complete WYSIWYG preview
- 모든 Markdown/MDX 표현의 Visual Editing
- arbitrary JavaScript execution 또는 문서별 임의 module import를 기본 MDX contract로 지원
- 일반 Site UI 전체를 Article content component contract로 공개

## 검증

각 capability의 요구 수준을 실제 구현과 대조하고 재현 가능한 Evidence를 연결한다. 부분 구현·완료·미검증을 구분한다. 모든 capability를 이름 그대로 Item으로 생성하지 말고, 발견된 gap에 대해 독립적인 delta Item을 만든다.

현재 검증 스냅샷과 기준 revision은 [Implementation Map](implementation-map.md)에 둔다. 2026-09-20 authoring/content contract를 구체화하면서 일부 기존 capability 판정을 재평가했다. 상태 하향은 구현 regression이 아니라 **1.0 요구 수준이 CMS-independent canonical source와 consumer-based publishability까지 명시적으로 확장된 결과**일 수 있다.

이 문서 자체는 **1.0 Definition을 확정하는 설계 Item의 Evidence**가 될 수 있지만, 1.0 구현 완료 Evidence는 아니다. 실제 구현 상태는 Implementation Map과 책임 레포의 immutable Evidence로 판정한다.
