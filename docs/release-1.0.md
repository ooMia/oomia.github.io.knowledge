# Publishing Platform 1.0

Knowledge가 소유하는 통합 제품 목표와 수용 기준이다. 기술 선택·필드 schema·명령·runtime 구성은 책임 레포의 원본을 참조한다. 문서 정리는 기존 기능의 구현 완료나 새 릴리스 검증을 의미하지 않는다.

## Release Goal

Deliver a usable and extensible workflow for authoring Git-backed Markdown/MDX content and publishing a verified canonical revision to a live site.

## Product Boundary

| Capability | 요구되는 관찰 가능한 결과 | 상세 계약 / 검토 원본 |
|---|---|---|
| Authoring | 기존 Obsidian 기반 문서를 local workspace에서 작성·수정하고 의미를 보존할 수 있다. 필요한 추가 authoring 도구의 역할은 실제 corpus로 판단한다. | [Authoring 검토](content-authoring-contract.md#authoring-clients) |
| Canonical Content | 사용자가 작성하거나 선택한 도구로 수정한 md-like 문서를 보존하고 Git commit으로 공유·재현할 콘텐츠 revision을 식별한다. | [Canonical revision](content-authoring-contract.md#canonical-revision) |
| Extensibility | 필요한 콘텐츠 표현을 추가할 때 source 의미와 소비 지원 범위를 명시하고 검증할 수 있다. | [Site component 계약](https://github.com/ooMia/oomia.github.io/blob/docs/content-consumption-contract/docs/content-consumption-contract.md#component-contract) |
| Automation | 최소 하나의 automated 또는 agent-assisted workflow가 validation, Git revision finalization, publish 또는 delivery process에 참여한다. | [책임 레포의 기능 이슈](operating-rhythm.md#기능-실험-참조) |
| Publishing | 검토된 canonical revision이 실제 Site 소비 검증을 통과하며 발행 입력과 결과의 관계를 재현할 수 있다. | [Site 소비 계약](https://github.com/ooMia/oomia.github.io/blob/docs/content-consumption-contract/docs/content-consumption-contract.md#publishing), [콘텐츠 흐름](architecture.md#publishing-boundary) |
| Presentation | Site가 해당 콘텐츠 revision의 Markdown/MDX를 사용자에게 렌더링한다. | [Site 소비 목표](https://github.com/ooMia/oomia.github.io/blob/docs/content-consumption-contract/docs/content-consumption-contract.md#10-소비-목표) |
| Delivery | 콘텐츠 revision과 Site revision이 연결되어 GitHub Pages에 배포되고 성공 Evidence가 남는다. | [Implementation Map](implementation-map.md) |

Editor 역할의 미결 사항은 [Open Questions](open-questions.md)이 관리한다. Automation capability의 수용 기준은 모든 문서에 자동화 처리를 강제하는 규칙이 아니다. 사용자 작성 콘텐츠의 commit·Site 소비는 Engine 사용과 독립적이다.

## 1.0 Target Architecture

구현 topology를 이 문서에 반복 정의하지 않는다. [레포 역할](architecture.md#레포의-역할), Engine 수정 계약, Site 소비 계약을 연결해 통합 결과를 판단한다.

## 명시적 제외 범위

- production-grade multi-user CMS, RBAC, transactional collaborative editing
- advanced agent orchestration
- complete WYSIWYG preview 및 모든 Markdown/MDX 표현의 Visual Editing
- 필요성이 입증되지 않은 별도 component library나 추가 persistence를 선행 구축

구현 기술별 제한은 [Engine runtime 설계](https://github.com/ooMia/oomia.github.io.engine/blob/docs/content-modification-contract/docs/content-modification-contract.md#runtime-adapter-설계), [Site 소비 계약](https://github.com/ooMia/oomia.github.io/blob/docs/content-consumption-contract/docs/content-consumption-contract.md), [기존 authoring 비목표](content-authoring-contract.md#10-비목표)에서 확인한다. 기술 선택을 여기서 다시 정의하지 않는다.

## 검증

각 capability의 요구 결과를 책임 레포의 재현 가능한 Evidence와 연결한다. 부분 구현·완료·미검증을 구분하며 capability 이름 자체를 영구적인 완료 Item으로 만들지 않는다. 발견한 gap은 독립적으로 검증할 수 있는 delta로 추적한다.

[Implementation Map](implementation-map.md)은 기준 revision과 capability별 검수 연결을 소유한다. 설계 문서나 과거 Payload/DB 경로의 성공은 현재 통합 경로의 완료 증거를 대신하지 않는다.

이 문서는 1.0 Definition의 Evidence가 될 수 있으나 구현 완료의 Evidence는 아니다. 실제 release gate의 미결 항목은 Q003으로 추적한다.
