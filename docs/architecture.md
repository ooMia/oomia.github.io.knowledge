# Architecture

상태: 사용자 명시 사항 및 이후 README 기준을 종합. 2026-09-20 Content Authoring & Publishing Contract를 반영.

## 원칙

- 구현 작업보다 제품 결과와 시스템 책임을 기준으로 계획한다.
- 매 Iteration에 시연 가능한 결과를 남긴다.
- 핵심이 아닌 문제는 검증된 도구를 우선 활용한다.
- 안정된 경계가 필요해질 때까지 설계 선택의 변경 가능성을 유지한다.
- 레포와 프레임워크를 영구적인 제품 경계로 취급하지 않는다.
- canonical source는 특정 CMS/Visual Editor의 표현 능력에 종속되지 않는다.
- 저장 가능성, authoring surface의 편집 가능성, 실제 Site의 publishability를 서로 다른 계약으로 취급한다.

## 레포의 역할

유일한 최상위 구현 레포는 없다. 이 지식 레포도 다른 레포를 포함하는 super-repository가 아니다.

| 레포 | 책임 |
|---|---|
| `oomia.github.io.engine` | canonical content를 다루는 authoring 환경과 CMS adapter, persistence 접근, publishing workflow orchestration |
| `oomia.github.io.docs` | downstream이 소비할 계약된 generated document set |
| `oomia.github.io` | generated documents와 public content-component package를 소비해 사이트를 빌드하고 GitHub Pages로 전달 |

`mono`는 사용자가 로컬에서 붙인 별칭이며 실제 레포 이름의 일부가 아니다. docs는 현재 engine과 site 사이의 generated projection으로 사용된다.

```text
Authoring Adapter → Canonical Content → Generated Documents → Site Output → Live Site
      engine              engine              docs              site
```

Canonical content가 콘텐츠의 권위 있는 상태다. Article body는 Markdown/MDX raw source string으로 보존하고, CMS editor state는 derived/virtual representation으로 취급한다. docs는 재생성 가능한 projection이며 수동 수정이 canonical state를 대체하지 않는다.

제품 수준 계약은 특정 DB/CMS를 강제하지 않는다. 현재 구현이 PostgreSQL과 Payload를 사용하더라도 해당 구현 선택이 canonical content syntax를 제한하는 근거가 되어서는 안 된다.

## Authoring boundary

Authoring surface는 canonical content의 adapter다.

```text
                canonical raw source
                       |
          +------------+------------+
          |                         |
    Visual Editor               Source Editor
  supported subset             lossless fallback
```

- Visual Editor가 무손실로 표현 가능한 content에는 구조화 편집을 제공할 수 있다.
- Visual Editor가 표현하지 못하는 content는 Source mode로 fallback할 수 있어야 한다.
- unsupported source를 Visual Editor가 조용히 삭제하거나 재작성해서는 안 된다.
- 최종 Site와 동일한 WYSIWYG Preview는 authoring contract의 필수조건이 아니다.
- 자세한 수준 정의와 정책 테이블은 [Content Authoring & Publishing Contract](content-authoring-contract.md)가 소유한다.

## Official MDX component boundary

공식 content component의 canonical source와 package release는 Engine/Site와 **독립된 repository**가 소유한다. public artifact는 npm organization scope의 `@oomia/content-components`다.

```text
              @oomia/content-components
        independent source + versioned release
              /                    \
             /                      \
   framework-neutral             React renderer
   contract / manifest           implementation
          |                           |
          v                           v
     Engine / CMS                    Site
   builder / adapter            webpage renderer
```

책임은 다음과 같이 나눈다.

- **Content-component repository**: component semantics, public contract, manifest, React rendering implementation과 package version/release를 소유한다.
- **Site**: React renderer surface를 소비해 generated content를 실제 웹페이지로 렌더링한다. Site가 어떤 framework를 사용하는지는 public component contract의 전제가 아니다.
- **Engine**: renderer implementation에 결합하지 않고 framework-neutral contract/manifest를 참조해 CMS editor, validation, builder integration을 구성한다.
- **Visual adapter**: 공식 component의 편집 편의를 제공하지만 존재 여부가 publishability를 결정하지 않는다.
- **Publishing**: package compatibility와 실제 Site consumer build를 최종 gate로 사용한다.

public package는 source 수준에서 React/TypeScript로 구현하되 **contract surface가 React를 import하지 않도록 분리**한다. React renderer는 framework-specific runtime surface이며 `react`를 host와 공유하는 peer dependency로 취급한다. `.astro` 파일은 public component implementation에 사용하지 않는다.

React source를 별도의 framework-independent DOM 구현으로 자동 변환하는 것은 초기 계약에 포함하지 않는다. 비-React renderer 수요가 실제로 생기면 별도 renderer surface(Web Components 등)를 추가할 수 있으나, 현재 Site/Engine 요구를 위해 이중 구현을 선행하지 않는다.

현재 `@workspace/ui`처럼 Site 전체 UI를 담는 package를 공개 계약으로 승격하지 않는다. document/content 영역에서 사용되는 component surface만 독립 package로 둔다. exact subpath exports, initial version, release trigger와 pre-1.0 compatibility policy는 구현 전 확정한다.

## Contract surfaces

source-level 결합보다 명시적인 artifact/runtime contract를 우선한다.

| Surface | 소유 위치 |
|---|---|
| Content authoring/storage/publish 정책 | knowledge repository |
| 공식 MDX component 의미와 버전 | versioned content-component package |
| Payload-specific authoring adapter | engine |
| generated document set | docs |
| final rendering / consumer compatibility | site |
| 구현별 API·테스트·runtime details | 해당 구현 repository |

TypeScript type은 compile-time contract로 사용하고, Agent/runtime가 component surface를 읽어야 할 경우 machine-readable manifest를 함께 둘 수 있다. 계획용 초안은 [Content Component Manifest Schema](content-component-schema.md)에 둔다.

engine을 container image 등으로 배포하는 것은 가능한 방향이며 확정된 구현 과제가 아니다. API와 generated document의 세부 runtime contract는 소유 레포에 두고, 이 레포에서 코드 구현 여부를 추론하지 않는다.
