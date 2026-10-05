# Knowledge Maintenance

> **Authority:** POLICY  
> **Owner:** Knowledge repository maintenance  
> **Scope:** canonical Knowledge documents, repository bootstrap/routing surfaces, and generated context maintenance  
> **Read when:** creating, editing, reviewing, or restructuring Knowledge documentation  
> **Enforced by:** document review, owner-source discipline, repository automation, and live GitHub integration rules where applicable

이 문서는 `ooMia/oomia.github.io.knowledge` **자체를 수정·유지하는 방법과 canonical document의 semantic quality 기준**을 소유한다. 외부 contributor를 위한 기여 정책이 아니며, 제품·planning·Git workflow 같은 다른 concern의 의미를 다시 정의하지 않는다.

이 문서에서 대문자 `MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT`, `MAY`는 [BCP 14 / RFC 2119](https://www.rfc-editor.org/rfc/rfc2119)와 [RFC 8174](https://www.rfc-editor.org/rfc/rfc8174)에 따른 requirement level로 사용한다. 해당 의미는 대문자로 표기한 경우에만 적용한다.

## Document authority

Canonical 문서는 주된 역할에 따라 하나의 **Authority**를 가진다.

| Authority | 의미 | 작성 원칙 |
|---|---|---|
| `POLICY` | project/repository가 준수해야 하는 invariant, contract, normative meaning | requirement를 명확히 하고 예제는 경계 해석에 필요한 경우로 제한한다. |
| `GUIDANCE` | 공통적으로 적용되는 default, best practice, caution, heuristic | 구체적 이유가 있으면 일탈할 수 있으며 rationale·trade-off·example을 적극적으로 사용할 수 있다. |
| `REFERENCE` | 사용법, 현재 interface, 상세 설명, lookup material | 독립적인 normative force를 만들지 않고 실제 behavior의 source of truth를 명시한다. |
| `RECORD` | revision-scoped Evidence, historical provenance, completed migration/release snapshot | 무엇이 언제 어떤 범위에서 사실이었거나 검증됐는지 보존하며 현재 정책을 정의하지 않는다. |

Machine-readable schema, workflow/action/test, code/config, live GitHub Project/Issue/PR state는 prose Authority와 별개의 operational source다. 문서는 이들을 설명하거나 연결할 수 있지만 실제 live state나 executable behavior를 대신하지 않는다.

문서는 주된 Authority 하나를 **MUST** 가져야 한다. 짧은 subordinate 설명 때문에 파일을 기계적으로 분리할 필요는 없지만, 서로 다른 Authority의 내용이 독립적으로 검색·재사용될 가치가 있고 함께 둘 경우 강제력을 오해하게 만든다면 분리하는 것이 적절하다.

## Document contract

Canonical specialist document는 제목 가까이에 다음 semantic contract를 **MUST** 드러낸다. 고정된 Markdown frontmatter나 동일 heading syntax를 요구하지 않으며, blockquote·짧은 표·동등한 prose를 사용할 수 있다.

| Field | 질문 |
|---|---|
| **Authority** | 이 문서는 `POLICY / GUIDANCE / REFERENCE / RECORD` 중 어떤 강도로 읽어야 하는가? |
| **Owner** | 이 정보의 단일 semantic owner는 누구인가? |
| **Scope** | 어떤 repository, workflow, product boundary, revision 또는 task에 적용되는가? |
| **Read when** | 어떤 작업에서 이 문서를 working set에 가져와야 하는가? |

필요할 때 class별 field를 추가한다.

- `POLICY`: 실제 enforcement owner가 있으면 **Enforced by**를 둔다.
- `REFERENCE`: 현재 behavior가 code/config/live state에 있으면 **Source of truth**를 둔다.
- `RECORD`: 검증·역사 범위를 고정하기 위해 **Evidence scope** 또는 동등한 revision/time boundary를 둔다.
- `GUIDANCE`: 별도 필수 확장 field는 없다.

README, AGENTS, CONTEXT처럼 landing/bootstrap/router 역할 자체가 핵심인 root surface도 가능한 한 같은 의미를 드러내되, metadata를 늘리는 것보다 routing 비용을 낮추는 것이 우선이다.

## Structure by authority

동일한 Authority의 문서는 비슷한 **해석 순서**를 제공해야 한다. 아래는 content frame이며 exact heading 이름이나 모든 절의 존재를 강제하지 않는다.

### POLICY

기본 순서:

1. scope / applicability
2. normative requirements
3. ownership / source-of-truth boundary
4. enforcement / verification
5. exception 또는 reference가 실제로 필요할 때만 추가

`POLICY`에서 BCP 14 keyword는 강제력을 구분할 필요가 있을 때만 **SHOULD** 사용한다. 예제는 requirement와 명확히 분리하고, concrete tool/repository example이 normative rule처럼 읽히지 않도록 한다.

### GUIDANCE

기본 순서:

1. scope / intended use
2. recommendations
3. rationale / trade-offs
4. examples / counterexamples
5. references when useful

`GUIDANCE`는 BCP 14 대문자 keyword로 독립적인 normative force를 만들지 않는다. 권고에서 벗어나는 경우 이유와 결과를 이해할 수 있게 작성하되 예외 승인을 정책 절차처럼 만들지 않는다.

### REFERENCE

기본 순서:

1. purpose / lookup scope
2. current interface, command, schema, mapping, or procedure
3. source of truth / freshness boundary
4. examples
5. limitations / verification when relevant

`REFERENCE`는 current code/config/live state를 복제하는 두 번째 원본이 되어서는 안 된다.

### RECORD

기본 순서:

1. status / historical or revision scope
2. Evidence
3. findings / outcome
4. limitations
5. related current canonical sources

`RECORD`의 claim은 명시된 Evidence scope를 넘어 현재 상태로 확장하지 않는다.

## Bootstrap guards

Bootstrap/router surface에는 specialist policy를 요약해서 쌓지 않는다. 다만 routing 전에 알아야 하는 규칙은 짧은 guard로 반복할 수 있다.

어떤 규칙을 README/AGENTS/CONTEXT에 의도적으로 재서술하려면 다음을 모두 만족해야 한다.

1. **Pre-routing prerequisite** — specialist owner를 읽기 전에 행동에 영향을 줄 수 있다.
2. **Cross-cutting applicability** — 하나의 특정 workflow가 아니라 여러 task에 적용된다.
3. **Early-failure consequence** — 미준수 시 잘못된 remote mutation, 거짓 current-state/Evidence claim, ownership/security 침범, 복구하기 어려운 context loss가 발생할 수 있다.
4. **Stability** — 특정 branch, runner, command, current implementation에 쉽게 묶이지 않는다.
5. **Not hard-enforced** — 상위 system/tool boundary가 이미 완전히 막는 규칙을 단순히 반복하지 않는다.
6. **Compressibility** — owner policy를 복제하지 않고 한두 문장과 링크로 표현할 수 있다.

하나라도 만족하지 못하면 bootstrap에 복제하지 않고 owner로 routing한다.

## Canonical document quality

Knowledge 문서를 만들거나 수정할 때 다음 질문으로 내용 경계를 검토한다.

- **Owner** — 이 정보의 단일 canonical owner가 이 문서가 맞는가?
- **Necessity** — project-wide invariant인가, 공통 Guidance인가, 단순 example/reference인가?
- **Duplication** — 다른 owner의 의미를 다시 정의하고 있지 않은가?
- **Retrieval** — 이 concern이 필요하지 않은 Agent도 읽어야 하는가, 필요할 때 routing할 수 있는가?
- **Executability** — prose가 의미를 소유해야 하는가, schema/workflow/test/code/live state가 enforcement 또는 current truth를 소유해야 하는가?

이 평가는 문서에 다섯 개의 고정 heading을 만들기 위한 것이 아니다. 유사한 성격의 문서가 같은 Authority contract와 content frame으로 해석되도록 하기 위한 review 기준이다.

## 수정 절차

1. [CONTEXT](../CONTEXT.md)에서 현재 작업에 필요한 canonical source를 찾는다.
2. 규칙을 바꿀 때는 실제 owner 문서만 수정한다. 같은 정책을 다른 문서에 복제하지 않는다.
3. 아직 확정되지 않은 제품/cross-repository 판단은 현재 [Open Questions](open-questions.md) 또는 연결된 planning surface에서 추적한다. interest-management model 자체는 별도 renewal Change가 소유한다.
4. 구현 상태나 완료 Evidence를 바꾸려면 owning repository의 live code, Issue, PR, workflow/deployment 결과를 확인한다.
5. 필요하면 로컬에서 `python3 scripts/bundle.py`를 preflight로 실행한다. PR에서는 repository automation이 동일 generator로 tracked bundle을 materialize하고 재현성을 검증한다.
6. 최종 diff가 하나의 명확한 semantic 변화로 읽히며 위 Authority/Owner/Scope 경계를 보존하는지 확인한다.

## 작업 상태

- 다음 세션까지 이어져야 하는 실행 상태는 GitHub Project #11, Issue, PR 또는 owning repository Evidence에 남긴다.
- 별도 handoff 파일이나 세션 로그를 현재 상태의 원장으로 유지하지 않는다.
- 과거 변경 근거가 필요하면 Git history와 immutable Evidence를 사용한다.

## Issue / PR

- Repository Issue를 생성하거나 크게 수정할 때는 `.github/ISSUE_TEMPLATE/`에서 완료 모델에 맞는 template을 먼저 선택한다. repository state 변경은 [Change template](../.github/ISSUE_TEMPLATE/change.md), 결론과 Evidence 확보는 [Investigation template](../.github/ISSUE_TEMPLATE/investigation.md)을 사용한다.
- Issue의 operational metadata는 GitHub Project/native fields가 소유하며 body에 현재값을 중복 기록하지 않는다.
- branch/PR/lifecycle 의미는 [Planning Model](planning-model.md), [Project Orchestration](project-orchestration.md), [Git Workflow](git-workflow.md)을 따른다.

## Generated context bundle

`dist/CONTEXT-BUNDLE.md`는 canonical Knowledge 문서에서 재생성하는 **tracked but non-canonical generated transport artifact**다.

- repository source에 직접 접근할 수 있으면 [CONTEXT](../CONTEXT.md) routing을 따라 필요한 canonical source를 직접 읽는다.
- bundle은 repository 접근이 없거나 단일 파일로 Chat/context를 전달해야 할 때 사용하는 snapshot/transport이며, routing이나 live Project/Issue/PR state를 대체하지 않는다.
- bundle 내부에서도 embedded `CONTEXT.md`를 entry point로 보고 필요한 source section만 사용한다.
- bundle을 직접 수정하지 않는다. 내용이 잘못되면 canonical source 또는 `scripts/bundle.py`를 수정한다.
- same-repository PR에서 canonical Markdown 또는 generator가 바뀌면 GitHub-hosted automation이 bundle을 재생성한다. 결과가 달라지면 automation은 PR source branch의 `dist/CONTEXT-BUNDLE.md`만 GitHub-Verified commit으로 materialize한다.
- `main`에서는 동일 generator를 read-only로 다시 실행해 committed bundle과 canonical sources의 일치를 검증한다.

## Default branch integration

Knowledge repository의 default/canonical branch는 `main`이다. 이 절은 [Git Workflow](git-workflow.md)의 공통 invariant를 Knowledge에 구체화한 repository-local POLICY다.

- `main`으로의 일반 변경은 Pull Request를 통해서만 통합한다. direct push는 정상 integration path로 사용하지 않는다.
- `main`은 linear history를 유지한다. merge commit은 허용하지 않으며 squash/rebase처럼 선형 history를 보존하는 integration만 사용한다.
- 이 제한은 Knowledge의 default branch에 대한 repository-local specialization이며, 다른 repository의 merge method를 공통으로 제한하지 않는다.
- generated bundle automation은 `main`을 직접 수정하지 않고 PR source branch만 수정한다.
- **Signed commits는 향후 hardening 목표다.** 현재 `Require signed commits`는 비활성화되어 있으며, Chat 세션에서 GitHub connector의 일반 file-write commit이 Verified 경로를 갖출 필요성이 생길 때 다시 검토한다. 현재 integration invariant로 간주하지 않는다.
- owner/admin emergency bypass semantics는 현재 정책 범위에 포함하지 않는다.

문서 정책과 live enforcement를 구분한다. 현재 live ruleset은 default branch에 PR-required, linear history, deletion protection, non-fast-forward protection을 적용한다. 기존 history의 unsigned/merge commits는 rewrite하지 않는다.

## 문서 경계

- Knowledge는 공통 semantics, project-wide POLICY와 필요한 cross-repository GUIDANCE를 소유한다.
- repository-specific runtime, workflow, API, token, runner, branch topology와 구현 상세는 owning repository가 소유한다.
- 새 문서는 새로운 semantic owner 또는 독립적인 retrieval value가 필요할 때만 만든다.
- 편의를 위한 요약·bundle·index는 canonical source를 대체하지 않는다.
