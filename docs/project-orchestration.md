# Project orchestration automation

GitHub repository Issue가 활성화될 때 [Publishing Platform Project #11](https://github.com/users/ooMia/projects/11)의 Item과 Development branch를 자동으로 초기화한다.

## Authentication

Project #11은 user-owned Project이므로 Actions의 repository-scoped `GITHUB_TOKEN`으로 접근할 수 없다. 각 Issue-owning repository에 classic PAT을 `PROJECT_TOKEN` secret으로 저장한다.

현재 automation에 필요한 classic PAT scope는 다음 두 개다.

- `project`: Project #11 조회·Item 추가·custom field 수정
- `repo`: private repository Issue를 Project item으로 조회하고 필요한 repository 리소스에 접근

`workflow`, `admin:*`, `user`, `packages` scope는 현재 runtime automation에 필요하지 않다. PAT로 workflow 파일 자체를 생성·수정하는 self-modifying workflow는 구현하지 않는다.

Repository 내부 Development branch 생성에는 PAT을 사용하지 않는다. 각 workflow의 `GITHUB_TOKEN`에 최소 권한만 부여한다.

## 적용 범위

공통 branch·PR·release 전략은 [Git Workflow](git-workflow.md)를 따른다. repository별로 같은 base branch 표를 반복 관리하지 않는다.

현재 Issue 작업 대상은 Knowledge, Engine, Site다. `oomia.github.io.docs`는 editor가 작성하고 필요하면 후처리한 콘텐츠의 remote이며, 현재 이 레포 자체에 Issue를 할당하지 않는다. 해당 레포에 별도 Issue 운영 문서를 만들지 않는다.

공통 생성 절차·Project seed·인증·자동화 계약은 이 문서가 소유한다. 실행되는 workflow/script와 적용된 권한 설정은 각 실행 레포가 소유하며 공통 설명을 복제하지 않는다. 실제 적용 여부는 작업 시 확인한다.

## Workflow와 Node script의 역할

GitHub Actions workflow 정의는 `.github/workflows/*.yml`이 소유한다. YAML은 trigger, runner, job permission, secret 전달을 정의한다.

복잡한 GraphQL/JSON 처리는 repository script로 분리하고 YAML의 `run`에서 Node로 실행한다.

```text
issue-activated.yml
├─ project job
│  └─ node .github/scripts/sync-project.mjs
└─ development job
   └─ node .github/scripts/create-development-branch.mjs
```

이는 GitHub Actions의 별도 파일 형식이 아니라 workflow가 runner에서 repository script를 실행하는 일반적인 방식이다.

## Issue activation

workflow는 `opened`, `reopened` 및 수동 `workflow_dispatch`를 지원한다.

자동 실행 조건:

1. Issue가 open 상태다.
2. 제목이 `draft:`로 시작하지 않는다.

따라서 fallback draft가 생성 순간 잠시 open이어도 Project 등록과 branch 생성이 발생하지 않는다.

### Project job

- secret: `PROJECT_TOKEN`
- Project: `ooMia/projects/11`
- 역할: Item 추가 및 Status / Iteration / Work Type 초기화
- field ID와 option ID는 runtime에 이름으로 조회
- 동일 Item을 다시 추가하면 GitHub가 기존 Item ID를 반환하므로 replay 가능

### Development job

- token: repository `GITHUB_TOKEN`
- permissions: `contents: write`, `issues: write`
- 역할: GitHub GraphQL `createLinkedBranch`로 현재 repository에 Issue-linked Development branch 생성
- `DEVELOPMENT_BASE`는 Git Workflow의 공통 개발 branch를 사용한다.
- 콘텐츠 레포의 Issue 비대상 범위는 위 적용 범위를 따른다.
- `project-seed.development === false`이면 생략

Project PAT은 이 job에 전달하지 않는다.

### Lifecycle synchronization boundary

Issue activation workflow와 장기 lifecycle reconciliation은 서로 다른 책임을 가진다.

- repository의 `issue-activated.yml`은 **activation 초기화**를 소유한다: Project Item 등록, 초기 `Status / Iteration / Work Type`, Issue-linked Development branch.
- Engine의 `apps/github-automation` webhook runtime은 activation 이후 **Issue lifecycle과 Project Status invariant**를 reconcile한다.
- `project-seed`는 activation 초기값일 뿐이며 activation 이후 Project field가 current state의 SoT다.
- webhook runtime은 Work Type, Assignee, historical Iteration처럼 해석이 필요한 field를 추론해 채우지 않는다. 이런 값은 Issue Outcome/Evidence와 실제 수행 이력으로 확인 가능한 경우에만 baseline normalization에서 보정한다.

현재 canonical lifecycle invariant는 다음과 같다.

| Repository Issue / Project 상태 | Reconciliation |
|---|---|
| fallback Draft: `draft:` + `closed/not_planned` | automation 제외; 유효한 candidate이면 Project `Backlog` 유지 |
| ordinary `closed/completed` | `Done` |
| ordinary `closed/not_planned` 또는 `duplicate` | `Cancelled` |
| open + Iteration 없음 | `Backlog` |
| open + Iteration 있음 + Backlog/empty | `Todo` |
| `Todo` / `In progress`에서 Iteration 제거 | `Backlog` |
| cancelled Issue가 reopen됨 | `Backlog`, stale Iteration 제거 |
| 새로운 Development PR link 관찰 | `In progress`; lifecycle event가 아닌 경우 필요한 recovery만 수행 |

`Done` 상태의 open Issue는 자동으로 되돌리지 않는다. unknown Status/close reason 또는 concurrent Project change는 임의로 덮어쓰지 않고 실패로 남긴다.

### Webhook write cutover

Webhook runtime은 기본적으로 read-only이며 `GITHUB_AUTOMATION_APPLY=true`가 명시적 write switch다. write mode를 일반 개발 flow에 넣기 전에 다음 순서를 따른다.

1. 현재 Project baseline의 명백한 field/status drift를 먼저 정리한다.
2. 검증된 Engine revision 또는 그 merge descendant를 사용한다.
3. `APPLY=false`에서 전체 reconciliation 결과가 예상 invariant와 일치하는지 확인한다.
4. applying worker는 하나만 실행하고 `APPLY=true`로 canary를 수행한다.
5. 첫 mutation 결과를 Project read로 재검증한 뒤 일반 `./dev` flow에 포함한다.
6. 이상이 있으면 즉시 `GITHUB_AUTOMATION_APPLY=false`로 복귀하고 원인을 별도 Fix/Investigation으로 분리한다.

현재 write-cutover의 선행 Evidence는 Engine #58 integration, #59 real read-only validation, #60 FSM alignment다. runtime 구현 상세와 실제 process/env 계약은 Engine repository가 소유한다.

## Labels

Issue/PR label은 Project field를 복제하지 않는 optional controlled tag다. orchestration 관련 작업에는 registry에 정의된 `orchestration` label을 사용한다. repository마다 필요한 label set은 다를 수 있다.

상세 기준은 [Work Classification](work-classification.md)과 [Labels](labels.md)을 따른다.

## Project seed

새 Issue는 activation 초기값을 전달하는 hidden JSON을 가질 수 있다.

```md
<!-- project-seed
{
  "iteration": "C1-W3",
  "workType": "Feature",
  "status": "Todo"
}
-->
```

지원 키:

- `status`
- `iteration`
- `workType`
- `branch` — 기본 branch naming을 override할 때만 사용
- `development: false` — coordination/document-only Item 등 branch가 필요하지 않을 때

seed는 activation 초기값 전달용이다. 활성화 이후 Project field의 canonical state는 Project #11이다.

## Development branch naming

기본 형식:

```text
<issue-number>-<conventional-type>-<title-slug>
```

예:

```text
13-feat-decouple-canonical-source-from-visual-editor-constraints
```

branch는 Issue 활성화 전 미리 만들지 않는다. GitHub `createLinkedBranch`로 생성해야 Development 관계도 함께 만들어진다.

이미 같은 이름의 branch가 존재하지만 Issue와 연결되어 있지 않다면 automation은 이를 자동 재사용하지 않고 migration error를 낸다.

## Manual replay

PAT 주입 후 기존 Issue를 다시 Project에 동기화하거나 branch 상태를 확인하려면 Actions UI에서 `Issue activation` workflow를 수동 실행하고 `issue_number`를 전달한다.

Project field를 GitHub CLI로 직접 보정할 때 field type에 맞는 ID 기반 option을 사용한다. 특히 **Iteration은 이름으로 설정할 수 없으며 `--iteration-id`를 사용한다.** 현재 iteration title을 CLI 인자 값으로 추론하거나 `--field Iteration --value <title>` 형태를 만들지 않는다. 필요한 field/iteration ID는 Project metadata를 먼저 조회해 확인한다.
