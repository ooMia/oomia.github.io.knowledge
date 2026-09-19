# Publishing Platform 1.0

상태: 사용자가 제공한 README와 명시적 요구사항을 최신 용어로 정리. 출처: S2 `4c1f839e`, `3e786a51`; S3 `924e880a`, `5a382a65`.

## Release Goal

Deliver a usable and extensible workflow for authoring Articles and publishing them to a live site.

## Product Boundary

| Capability | 요구되는 관찰 가능한 결과 |
|---|---|
| Authoring | Article을 생성·수정할 실용적인 UX 또는 DX가 있다. raw data의 도움 없는 직접 편집만으로 끝나지 않는다. |
| Canonical Content | Article을 API로 생성·조회·수정할 수 있고 authoritative state가 canonical content로 지속된다. |
| Extensibility | 명시적인 extension contract를 통해 custom logic과 component를 사용하고 작성자가 결과를 합리적으로 예측할 수 있다. |
| Automation | 최소 하나의 automated 또는 agent-assisted workflow가 실제 publishing process에 참여한다. |
| Publishing | canonical content를 계약된 generated document set으로 결정적으로 투영한다. docs는 generated projection이다. |
| Presentation | generated documents를 최종 사용자용 사이트로 렌더링한다. 프레임워크는 구현 레포에서 결정한다. |
| Delivery | 콘텐츠 변경이 발행 경로를 거쳐 실제 GitHub Pages 사이트 업데이트로 이어진다. |

## 명시적 제외 범위

- canonical database backup / restore
- production-grade availability / HA
- advanced agent orchestration
- full-featured visual CMS
- complete WYSIWYG preview

## 검증

각 capability의 요구 수준을 실제 구현과 대조하고 재현 가능한 Evidence를 연결한다. 부분 구현·완료·미검증을 구분한다. 모든 capability를 이름 그대로 Item으로 생성하지 말고, 발견된 gap에 대해 독립적인 delta Item을 만든다.

현재 검증 스냅샷과 기준 revision은 [Implementation Map](implementation-map.md)에 둔다. 2026-09-20 재점검에서는 Canonical Content·Automation·Publishing·Presentation이 현재 1.0 boundary를 충족하고, Authoring·Extensibility·Delivery는 부분 충족으로 유지했다. Automation은 explicit Publish trigger가 기존 repository-owned `docs:publish`에 연결되고 성공·실패·중복 실행 semantics가 검증된 것으로 판정한다. 동일 production snapshot에서 새 revision이 생기지 않는 idempotent no-op은 정상 publish 결과이며, revision 생성을 Evidence 목적으로 강제하지 않는다. 이 판정은 Implementation Map의 revision에 고정되며 구현 레포가 진행되면 다시 검증한다.

이 문서 자체는 **1.0 Definition을 확정하는 설계 Item의 Evidence**가 될 수 있지만, 1.0 구현 완료 Evidence는 아니다. 1.0의 public contract 범위·compatibility policy·최종 release gate AC는 아직 명시적으로 결정할 필요가 있다.
