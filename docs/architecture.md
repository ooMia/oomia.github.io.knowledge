# Architecture

> **Authority:** POLICY  
> **Owner:** Publishing Platform product boundary and repository responsibility model  
> **Scope:** canonical content flow and Engine / Docs / Site / Knowledge responsibility boundaries  
> **Read when:** deciding product-level ownership, canonical content flow, or cross-repository contract boundaries  
> **Enforced by:** owner-repository code/contracts and cross-repository review; current implementation claims are verified against the owning live sources


## 원칙

- 구현 작업보다 제품 결과와 시스템 책임을 기준으로 계획한다.
- canonical content는 **frontmatter를 포함할 수 있는 md-like filesystem documents + assets**다.
- authoring client는 canonical source 위의 교체 가능한 도구다. Obsidian, visual editor, IDE, Agent 등 어떤 구현을 선택하는지는 Knowledge의 제품 경계가 아니다.
- 사용자가 작성한 파일은 선택적 Engine 후처리 없이도 commit할 수 있다.
- Site는 생산 도구나 처리 이력이 아니라 실제 입력과 자신의 consumer contract로 Publishability를 판정한다.
- 실제 지원 syntax·schema·component semantics는 이를 구현·소비하는 code/package가 source of truth다. Knowledge는 구현 catalog나 manifest를 복제하지 않는다.
- storage / editing / mutation / publishing / presentation을 서로 다른 책임으로 취급한다.
- canonical content를 표현하기 위해 별도 DB가 필요하지 않으면 도입하지 않는다.

## 레포의 역할

| 레포 | 책임 |
|---|---|
| `oomia.github.io.engine` | md-like document의 선택적 mutation과 Docs-owned derived data producer behavior |
| `oomia.github.io.docs` | canonical content remote, shared Git revision history와 Site-consumed derived state의 preparation/persistence |
| `oomia.github.io` | Docs 입력을 실제 구현 계약에 따라 소비·렌더링·검증하고 전달 |
| `oomia.github.io.knowledge` | 공통 workflow·coordination·개발 기준·통합 목표·acceptance·Evidence linkage |

## Canonical content workspace

```text
Compatible authoring tool
          ↓
md-like document + frontmatter + assets
          ↓
      user commit
          ↓
      Docs revision
          ↓
       Site consumer
          ↓
        Live Site

optional Engine mutation ──→ same document workspace
```

Docs commit SHA가 공유·재현 가능한 canonical revision을 식별한다. Git history가 기본 revision/diff/rollback mechanism이다.

어떤 editor 구현을 사용할지는 이 경계를 바꾸지 않는다. 필요한 editor가 frontmatter를 포함한 동일 source를 관리할 수 있고 의미를 보존하면 충분하다. 실제 editor UI를 Site repository 안에 둘지, 별도 app으로 둘지 역시 구현 owner가 결정한다.

## Implementation source of truth

유효한 콘텐츠를 외부 planning 문서가 code에 강제하지 않는다.

- Markdown/MDX parser, frontmatter schema, component renderer와 실제 tests가 현재 Site 소비 능력을 정의한다.
- 외부 component package를 사용하면 해당 package와 Site integration이 component semantics의 원본이다.
- custom component가 필요하면 renderer와 authoring surface가 가능한 한 동일 package/codebase를 소비한다.
- editor API가 별도 component metadata 형식을 요구하면 얇은 adapter를 둘 수 있지만, adapter는 두 번째 semantics 원본이 아니다.
- Knowledge는 지원 component 목록, props schema, editor adapter 형식, manifest catalog를 소유하지 않는다.

코드가 계약을 충분히 표현하는 경우 별도 문서화를 요구하지 않는다. 문서는 제품 경계, 사용자가 관찰할 계약, 검증 방법처럼 코드만으로 찾기 어려운 정보를 설명한다.

## Engine boundary

문서 mutation의 기술 설계는 [Engine 수정 계약](https://github.com/ooMia/oomia.github.io.engine/blob/main/docs/content-modification-contract.md)이 소유한다. Agent 후처리를 포함한 선택 기능은 Docs commit이나 Site 소비의 필수 단계가 아니다.

선택적 canonical mutation과 Docs-owned derived preparation은 서로 다른 책임이다. Engine은 derived producer behavior를 소유하고, 그 실행·저장·정합성 수렴은 Docs가 소유한다.

## Publishing boundary

[Site 소비 계약](https://github.com/ooMia/oomia.github.io/blob/main/docs/content-consumption-contract.md)이 실제 입력·렌더링·component integration·publishability 검증을 소유한다.

- 입력 계약을 만족하는 사용자 작성 파일은 그대로 소비할 수 있다.
- Engine 후처리나 별도 projection은 공통 발행 선행 조건이 아니다.
- 통합 검수는 Docs revision, Site revision과 delivery result를 연결한다.
- Engine을 사용한 경우 실행 Evidence는 해당 Engine 기능 검수에 별도로 연결한다.

## Docs authoring completion and production snapshot

이 cross-repository invariant의 accepted change와 통합 Acceptance Criteria는 [Knowledge #67](https://github.com/ooMia/oomia.github.io.knowledge/issues/67)에서 추적한다. 이 규칙은 충돌하는 과거 release pin, manual preparation, all-success external-link batch 정책보다 우선한다. repository integrity, credential/security boundary와 canonical source 보존은 유지한다.

- Obsidian 등 authoring client의 Docs `main` push를 authoring 완료 이벤트로 취급한다. self-hosted runner가 정상 동작하면 canonical normalization/validation 이후 Site가 실제 소비하는 Docs-owned derived state까지 정합하게 수렴해야 한다.
- Docs는 실제 Site code/import/workflow로 소비를 증명한 artifact를 coverage한다. 구체적인 파일·schema·trigger·algorithm은 owning repository의 contract/code/tests가 소유하며 Knowledge에 복제하지 않는다.
- derived process는 authored canonical Markdown/MDX bytes를 수정하지 않는다. canonical normalization과 선택적 mutation은 각자의 명시된 책임 경계를 유지한다.
- 한 external-link candidate의 LilysAI processing/provider failure는 해당 candidate의 unavailable evidence로 격리한다. 다른 candidates를 계속 처리하고 successful records를 보존·저장하며 URL별 warning을 관찰할 수 있어야 한다.
- authentication/protocol/schema/security/repository integrity와 artifact provenance 등의 systemic failure는 candidate fallback으로 숨기지 않는다. self-hosted runner unavailable과 provider candidate unavailable을 구분한다.
- usable records와 candidate attempt evidence를 재사용하여 immediate repeat에서 불필요한 usage-bearing 작업을 피한다. unavailable retry의 trigger와 결과는 Engine/Docs가 명시한다.
- source identity가 맞지 않는 derived metadata/assets를 current artifact로 소비하거나 다른 source snapshot의 결과를 concurrent Docs `main`에 commit하지 않는다. optional metadata가 unavailable이면 Site의 authored-link 또는 preview fallback을 유지한다.
- Site production deployment는 시작 시 최신 Docs `main`을 하나의 immutable SHA로 한 번 resolve하고 그 exact snapshot의 canonical content와 Docs-owned metadata를 함께 build/deploy한다. snapshot이 consumer contract를 아직 만족하지 않으면 이를 성공으로 위장하거나 다른 SHA로 바꾸지 않는다.
- Site에 저장된 과거 Docs gitlink는 latest Docs production consumption을 차단하지 않는다. build 중 moving `main`을 다시 따라가지 않으며, 재현성은 실제로 resolve하여 소비한 Docs SHA로 확보한다.
- build cache identity, public `oomia:docs-revision`, CI/release Evidence는 실제 소비한 같은 Docs SHA를 가리킨다. Site build는 LilysAI/Ollama/외부 target page를 직접 호출하지 않는다.

각 owner의 PR/test/Actions Evidence로 구현을 검증하며, PR 검증·canonical integration·Docs 자동 preparation·production deployment의 완료를 구분한다. 과거 release/migration Evidence는 당시 revision 범위의 RECORD로 보존한다.

## Contract surfaces

| Surface | owner |
|---|---|
| 제품 수준 repository 역할·통합 경계 | Knowledge |
| 문서 mutation | Engine code + Engine contract |
| canonical content revision | Docs Git history |
| 실제 콘텐츠 소비 가능성·component semantics | Site code/packages + Site contract |
| authoring UI/editor integration | 실제 구현 repository의 code/docs |
| release acceptance·cross-repository Evidence linkage | Knowledge |

상호 링크는 원본 탐색을 위한 것이며 상대 runtime 실행을 요구하는 의존성을 뜻하지 않는다.
