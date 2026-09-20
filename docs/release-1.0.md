# Publishing Platform 1.0

상태: 2026-09-21 Git-backed content workspace와 Obsidian + Fumadocs Editor authoring 모델을 반영한 1.0 제품 경계.

## Release Goal

Deliver a usable and extensible workflow for authoring Git-backed Markdown/MDX content and publishing a verified canonical revision to a live site.

## Product Boundary

| Capability | 요구되는 관찰 가능한 결과 |
|---|---|
| Authoring | Obsidian과 Fumadocs Editor가 같은 local content workspace를 편집할 수 있다. Visual Editor가 표현하지 못하는 source는 Obsidian/IDE 등 Source path에서 손실 없이 유지할 수 있다. |
| Canonical Content | Markdown/MDX body, frontmatter metadata, assets가 Git-backed filesystem workspace에 존재한다. 공유·재현 가능한 canonical state는 `oomia.github.io.docs` Git commit으로 식별된다. |
| Extensibility | Fumadocs built-in content component를 우선 재사용하고 custom component가 필요한 경우 source semantics와 editor/renderer integration을 명시할 수 있다. Visual adapter 유무가 canonical support를 결정하지 않는다. |
| Automation | 최소 하나의 automated 또는 agent-assisted workflow가 validation, Git revision finalization, publish 또는 delivery process에 참여한다. |
| Publishing | local workspace를 검증하고 실제 Site consumer build를 통과시킨 뒤 canonical docs revision으로 확정한다. DB → Markdown export나 Visual Editor codec round-trip을 publish prerequisite로 요구하지 않는다. |
| Presentation | Site가 canonical docs revision의 Markdown/MDX를 렌더링한다. Fumadocs UI/content tooling을 우선 재사용하되 Site framework 자체는 implementation detail이다. |
| Delivery | 검증된 canonical docs revision이 Site revision과 연결되어 GitHub Pages에 배포되고 성공 Evidence를 남길 수 있다. |

세부 Markdown/MDX 지원 수준은 [Content Authoring & Publishing Contract](content-authoring-contract.md)가 소유한다.

## 1.0 Target Architecture

```text
Obsidian ──────────┐
                   │
Fumadocs Editor ───┼──> local Git content workspace
                   │             │
IDE / Agent ───────┘             │ validate / commit / push
                                 ▼
                        oomia.github.io.docs
                         canonical revision
                                 │
                                 ▼
                         oomia.github.io Site
                                 │
                                 ▼
                           GitHub Pages
```

Engine은 workspace validation, Git/publish orchestration, Site consumer verification을 담당하는 containerizable tool/runtime이다.

## 명시적 제외 범위

- PostgreSQL/Payload를 canonical content store로 유지
- canonical database backup / restore
- production-grade multi-user CMS, RBAC, transactional collaborative editing
- advanced agent orchestration
- complete WYSIWYG preview
- 모든 Markdown/MDX 표현의 Visual Editing
- arbitrary JavaScript execution 또는 문서별 임의 module import를 기본 MDX contract로 지원
- Fumadocs built-in으로 충분한 component를 자체 library로 재구현
- custom content-component npm package를 실제 공유 수요 전에 선행 구축
- derived search/index DB를 1.0 필수 persistence로 도입

## 검증

각 capability의 요구 수준을 실제 구현과 대조하고 재현 가능한 Evidence를 연결한다. 부분 구현·완료·미검증을 구분한다. 모든 capability를 이름 그대로 Item으로 생성하지 말고, 발견된 gap에 대해 독립적인 delta Item을 만든다.

현재 검증 스냅샷과 기준 revision은 [Implementation Map](implementation-map.md)에 둔다.

2026-09-21 Product Boundary가 Payload/PostgreSQL 기반 CMS에서 Git-backed filesystem workspace로 변경되었다. 따라서 기존 Payload E2E와 DB publishing Evidence는 역사적 구현 Evidence로는 유효하지만 **현재 1.0 target 충족 Evidence로 자동 승계되지 않는다.** 상태 변화는 regression이 아니라 target architecture 변경에 따른 재평가일 수 있다.

이 문서 자체는 **1.0 Definition을 확정하는 설계 Item의 Evidence**가 될 수 있지만, 1.0 구현 완료 Evidence는 아니다. 실제 구현 상태는 Implementation Map과 책임 레포의 immutable Evidence로 판정한다.
