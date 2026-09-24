# Architecture

상태: 레포 역할과 콘텐츠 흐름을 설명하는 기존 문서. 기술 설계 절은 책임 구현 레포로 이관 검토 중이다.

## 원칙

- 구현 작업보다 제품 결과와 시스템 책임을 기준으로 계획한다.
- 매 Iteration에 시연 가능한 결과를 남긴다.
- 핵심이 아닌 문제는 검증된 도구를 우선 활용한다.
- 안정된 경계가 필요해질 때까지 설계 선택의 변경 가능성을 유지한다.
- 레포와 프레임워크를 영구적인 제품 경계로 취급하지 않는다.
- canonical source는 특정 CMS/Visual Editor의 표현 능력에 종속되지 않는다.
- storage / editing / publishing / presentation을 서로 다른 계약으로 취급한다.
- canonical content를 표현하기 위해 별도 DB가 필요하지 않으면 도입하지 않는다.
- content authoring 도구는 canonical workspace 위의 교체 가능한 client로 취급한다.

## 레포의 역할

유일한 최상위 구현 레포는 없다. 이 지식 레포도 다른 레포를 포함하는 super-repository가 아니다.

| 레포 | 책임 |
|---|---|
| `oomia.github.io.engine` | Obsidian이 지원하는 frontmatter 포함 md-like 문서를 같은 파일에서 in-place 후처리. CLI는 현재 실행 형태이며 목적 자체가 아님 |
| `oomia.github.io.docs` | editor가 작성하고 필요하면 후처리한 문서 폴더를 Git으로 관리할 때 사용하는 remote 및 shared revision history |
| `oomia.github.io` | Docs 파일을 자신의 입력 계약에 따라 렌더링하고 GitHub Pages로 전달 |
| `oomia.github.io.knowledge` | 공통 workflow·coordination·개발 기준 및 책임 레포 원본 문서의 참조 경로 |

`mono`는 사용자가 Site repository에 붙인 로컬 별칭이며 실제 원격 repository 이름의 일부가 아니다.

## Canonical content workspace

Canonical content는 Git-backed filesystem document workspace에 보존한다. 사용자가 작성한 그대로 commit할 수 있고, 선택한 도구로 수정한 파일도 commit할 수 있다. 같은 파일에 authored content와 generated content가 공존할 수 있다는 설명은 생성 단계를 반드시 거치라는 뜻이 아니다.

```text
Editor → 문서 파일 → 사용자 commit → Docs revision → Site → Live Site
              ↕
       선택적 문서 수정 도구
```

Docs commit은 공유할 콘텐츠 revision을 식별한다. Engine을 실행하지 않은 콘텐츠도 동일하게 취급한다. Site 소비 가능성은 파일의 내용과 Site 입력 계약으로 판정하며 생산 도구나 처리 이력을 조건으로 삼지 않는다.

공통 디렉토리 역할은 [Repository Design](repository-design.md)이 소유한다. 콘텐츠 discovery/layout의 실제 제약은 소비 레포의 계약에서 확인한다. Git history가 revision·diff·rollback의 기본 수단이며 PostgreSQL/Payload를 canonical store로 사용하지 않는다.

## Authoring boundary

authoring client 선택은 아직 확정하지 않는다. 기존 content corpus는 이미 Obsidian에서 작성되어 왔으므로 **Obsidian에서 기본 Markdown/file authoring이 가능한가**는 1.0의 주요 불확실성이 아니다.

현재 비교의 핵심은 다음이다.

- Obsidian을 primary editor로 유지했을 때 전체 authoring UX가 충분한가.
- Fumadocs Editor가 custom MDX component를 더 쉽게 주입·편집하는 데 실질적인 우위를 제공하는가.
- 선택한 editor와 Site/Fumadocs rendering layer가 동일 filesystem source를 불필요한 conversion 없이 공유할 수 있는가.
- editor 선택이 docs repository의 layout이나 canonical source를 과도하게 제한하지 않는가.

```text
                         Git-backed docs workspace
                      /              |              \
                     /               |               \
               Obsidian        Fumadocs Editor      IDE / Agent
             proven source UX   component-aware UX    source UX
                     \               |               /
                      \              |              /
                          integration boundary
                                |
                                v
                           Site consumer
```

Obsidian-specific custom syntax/CSS bridge는 1.0 필수 고려사항이 아니다. 향후 필요하면 별도 extension 문제로 다룬다.

Engine은 full CMS나 editor framework를 재구현하지 않는다.

## Engine boundary

문서 수정·보존 및 선택 기능의 기술 설계는 [Engine 수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/docs/content-modification-contract/docs/content-modification-contract.md)이 소유한다. CLI·container 등 실행 형태를 다른 레포의 필수 구성으로 전파하지 않는다.

## Publishing boundary

Site는 Docs의 콘텐츠 revision을 소비해 렌더링한다. [Site 소비 계약](https://github.com/ooMia/oomia.github.io/blob/docs/content-consumption-contract/docs/content-consumption-contract.md)이 입력 지원 범위와 검증을 소유한다.

- Engine 후처리나 별도 projection 생성은 공통 발행 선행 조건이 아니다.
- 입력 계약을 만족하는 사용자 작성 파일은 그대로 소비할 수 있다.
- 발행 검수는 Docs commit, Site revision과 delivery 결과를 연결한다. Engine을 사용한 경우의 실행 증거는 해당 기능 검수에서 다룬다.

## Fumadocs boundary

Fumadocs는 **Site presentation/content processing**의 주요 재사용 후보이며, authoring에서는 custom component 주입과 structured visual editing의 편의 때문에 Obsidian과 비교 중인 후보다.

- Fumadocs UI/Core/MDX가 Site의 layout, search, Markdown/MDX processing, built-in/custom components를 단순화하면 우선 활용한다.
- Fumadocs Editor는 files를 source of truth로 유지하고 custom component specs를 제공하므로 Oomia-specific component authoring이 늘어날 경우 중요한 이점이 될 수 있다.
- Obsidian 기반 기존 corpus의 일반 authoring 호환성은 이미 확보되어 있으므로 1.0 spike의 초점은 Fumadocs integration과 editor 역할 결정에 둔다.
- Fumadocs Editor를 1.0 필수 editor로 미리 확정하지 않는다.

Fumadocs 자체 API가 canonical content contract는 아니다. canonical source와 docs layout은 editor 선택과 분리한다.

## Component contract

official/custom component 지원은 다음 순서로 판단한다.

1. Fumadocs built-in component로 요구사항을 충족할 수 있는지 확인한다.
2. built-in component라면 Engine/Fumadocs Editor/Site에서 필요한 integration만 구성한다.
3. custom component가 필요하면 canonical source에서 사용할 이름·props·children policy를 명시한다.
4. Engine authoring spec과 Site renderer가 동일 계약을 공유해야 할 정도가 되면 machine-readable profile 또는 shared package를 도입한다.
5. Visual adapter 유무와 Publishability를 동일시하지 않는다.

[Content Component Manifest Schema](content-component-schema.md)는 custom component 공유가 실제로 필요해질 때 사용할 수 있는 planning vocabulary로 유지하되 1.0 bootstrap의 필수 artifact는 아니다.

## Contract surfaces

| Surface | 소유 위치 |
|---|---|
| 문서 수정·보존·선택 기능 | [Engine](https://github.com/ooMia/oomia.github.io.engine/blob/docs/content-modification-contract/docs/content-modification-contract.md) |
| 콘텐츠 입력·렌더링·소비 검증 | [Site](https://github.com/ooMia/oomia.github.io/blob/docs/content-consumption-contract/docs/content-consumption-contract.md) |
| Canonical content revision | `oomia.github.io.docs` Git history |
| 공통 workflow·coordination·개발 기준 | Knowledge |
| Authoring UX 및 필요한 추가 도구 | [Authoring 검토](content-authoring-contract.md#authoring-clients) |
| custom component 공유 필요성 | [미결 사항](open-questions.md) |

계약 간 링크는 원본 탐색을 위한 것이며 상대 레포 실행을 요구하는 의존성을 뜻하지 않는다.
