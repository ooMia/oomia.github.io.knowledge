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

현재 Issue 작업 대상은 Knowledge, Engine, Site다. `oomia.github.io.docs`는 editor가 작성하고 Engine이 in-place 후처리한 콘텐츠의 remote이며, 현재 이 레포 자체에 Issue를 할당하지 않는다. 해당 레포에 별도 Issue 운영 문서를 만들지 않는다.

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
- 역할: Item 추가 및 Status / Iteration / Work Type / Scope / Objective / Target Release 초기화
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

## Orchestration labels

Orchestration 관련 Issue/PR label은 [Labels](labels.md)의 `orchestration:*` namespace를 사용한다.

- Project의 Status / Iteration / Work Type / Scope / Objective / Target Release를 label로 복제하지 않는다.
- label은 automation, policy, cross-repository coordination, evidence처럼 Project field와 직교하는 횡단 관심사만 표시한다.
- canonical registry는 [config/labels.json](../config/labels.json)이며 Issue-owning repository는 같은 이름과 의미를 사용한다.

## Project seed

새 Issue는 hidden JSON을 Project 초기화 seed로 가진다.

```md
<!-- project-seed
{
  "iteration": "C1-W2",
  "workType": "Feature",
  "scope": ["Content", "Persistence"],
  "objective": "Canonical Content",
  "targetRelease": "1.0.0",
  "status": "Todo"
}
-->
```

지원 키:

- `status`
- `iteration`
- `workType`
- `scope`
- `objective`
- `targetRelease`
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
