# Publishable Projection — 계약 참조

현재의 레포 간 경계는 [Architecture](architecture.md#publishing-boundary)가 소유한다. 과거 이 문서가 제안했던 `prepare → commit → projection → Site` 필수 파이프라인은 현재 정책이 아니다. 기존 설계는 Git history에서 조사할 수 있으며 현재 구현 요구로 재사용하지 않는다.

사용자가 작성한 Docs 파일은 Engine 처리 없이 commit하고 Site가 소비할 수 있다. 입력 형식·렌더링 지원은 Site가 소유하며 후처리 기능의 구현 선택은 Engine이 소유한다. 별도 projection의 구현 위치를 공통 release gate로 결정할 필요가 없다. 실제 기능 수요가 생기면 그 구현 레포에서 설계한다.

## 2. Metadata storage — frontmatter-first

이 heading은 기존 링크 호환을 위한 진입점이다. 수정 시 metadata 처리 방식은 [Engine 원본](https://github.com/ooMia/oomia.github.io.engine/blob/docs/content-modification-contract/docs/content-modification-contract.md#metadata-contract), 소비 시 필수 필드와 타입은 [Site 원본](https://github.com/ooMia/oomia.github.io/blob/docs/content-consumption-contract/docs/content-consumption-contract.md#현재-소비-경계)을 참조한다.

## 8. Engine responsibility

이 heading은 기존 링크 호환을 위한 진입점이다. 선택적 문서 수정 기능은 [Engine 원본](https://github.com/ooMia/oomia.github.io.engine/blob/docs/content-modification-contract/docs/content-modification-contract.md#prepare)을 참조한다. Engine operation 목록이나 agent 설정을 공통 workflow에 복제하지 않는다.
