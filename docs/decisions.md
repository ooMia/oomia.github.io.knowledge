# Current Decisions

이 문서는 현재 결정의 원본을 찾는 인덱스다. 규칙 본문을 요약 복제하지 않는다. 작업별 읽기 순서는 [CONTEXT](../CONTEXT.md), 미정 소유권은 [Open Questions](open-questions.md#문서-소유권-검토)를 따른다.

## Knowledge

- [디렉토리 scheme](repository-design.md#1-common-repository-scheme)
- [문서 소유권](repository-design.md#11-repository-documentation)
- [Git workflow](git-workflow.md)
- [문서 수정·인계](../CONTRIBUTING.md)

## Canonical content

- [레포 역할과 콘텐츠 흐름](architecture.md#레포의-역할)
- [저장 계약](https://github.com/ooMia/oomia.github.io.engine/blob/docs/content-modification-contract/docs/content-modification-contract.md#storage), [Git revision](content-authoring-contract.md#canonical-revision)
- [Frontmatter와 sidecar](publishable-projection.md#2-metadata-storage--frontmatter-first)

## Authoring

- [편집 계약](content-authoring-contract.md#editing)
- [Authoring clients](content-authoring-contract.md#authoring-clients)
- [실제 corpus를 사용하는 integration 검토](architecture-transition.md#phase-b--prove-the-fumadocssite-integration)

## Engine

- [현재 구현·명령·제약](https://github.com/ooMia/oomia.github.io.engine/blob/main/README.md)
- [Prepare 설계](https://github.com/ooMia/oomia.github.io.engine/blob/docs/content-modification-contract/docs/content-modification-contract.md#prepare)
- [기존 operation 설계](publishable-projection.md#8-engine-responsibility)
- [Migration 기록](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/migration.md)

## Publishable projection

- [기존 metadata / projection 설계](publishable-projection.md)
- [필요성·위치·소유권의 남은 검토](open-questions.md#문서-소유권-검토)

## Site / components

- [Site 전환 설계](architecture-transition.md#7-site-migration-원칙)
- [Component contract](https://github.com/ooMia/oomia.github.io/blob/docs/content-consumption-contract/docs/content-consumption-contract.md#component-contract)
- [보류된 manifest 계획](content-component-schema.md)

## Engineering

- [공통 개발 도구 지침](development-toolchain.md)
- [공통 repository 구조](repository-design.md)
- [레포별 현재 적용값](../CONTEXT.md#레포별-원본-참조)

## Planning / Project

- [계획·Issue lifecycle·DoD](planning-model.md)
- [필드 의미·선택 기준](fields.md)
- [공통 Project 자동화](project-orchestration.md)
- [Project README 형식](../templates/project-readme.md)

## Historical reference

이관 전 기술 문서는 현재 소유권 검토가 끝날 때까지 기존 위치를 참조한다. 구현 완료 여부는 해당 레포의 Evidence로 판단한다. 과거 상세 history가 필요하면 `archive/main-before-cleanup-20260921` branch를 조사한다.
