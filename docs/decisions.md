# Current Decisions

이 문서는 현재 결정의 **원본 탐색 인덱스**다. 규칙 본문이나 구현 catalog를 복제하지 않는다.

## Knowledge

- [제품 경계와 repository 역할](architecture.md)
- [전환 coordination](architecture-transition.md)
- [Release 1.0 목표·acceptance](release-1.0.md)
- [Evidence linkage](implementation-map.md)
- [공통 repository scheme](repository-design.md)
- [공통 개발 도구 지침](development-toolchain.md)
- [Git workflow](git-workflow.md)
- [계획·Issue lifecycle·DoD](planning-model.md)
- [Project automation](project-orchestration.md)

## Engine

- [현재 구현·명령](https://github.com/ooMia/oomia.github.io.engine/blob/main/README.md)
- [문서 수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/content-modification-contract.md)
- [Migration record](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/migration.md)

## Site

- [현재 구현](https://github.com/ooMia/oomia.github.io/blob/main/README.md)
- [콘텐츠 소비 계약](https://github.com/ooMia/oomia.github.io/blob/develop/docs/content-consumption-contract.md)

실제 supported syntax, frontmatter schema, component package/API, editor adapter 같은 구현 정보는 owning repository의 code/docs를 확인한다. Knowledge는 별도 manifest나 compatibility summary를 유지하지 않는다.

## Historical reference

삭제된 과거 설계와 provenance가 필요하면 Git history 또는 `archive/main-before-cleanup-20260921` branch를 조사한다.
