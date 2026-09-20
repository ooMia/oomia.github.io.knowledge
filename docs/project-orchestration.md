# Project orchestration automation

GitHub repository Issue가 활성화될 때 [Publishing Platform Project #11](https://github.com/users/ooMia/projects/11)의 Item과 Development branch를 자동으로 초기화한다.

## Repository policy

| Repository | Issue activation Action | Development base | 비고 |
|---|---|---|---|
| `oomia.github.io.knowledge` | 사용 | `main` | cross-repo coordination Issue도 소유 가능 |
| `oomia.github.io.engine` | 사용 | `develop` | 일반 implementation Issue |
| `oomia.github.io` | 미사용 | `main` | Issues가 비활성화되어 cross-repo linked branch/PR 대상으로만 사용 |
| `oomia.github.io.docs` | 미사용 | - | generated projection이며 개발 Issue를 소유하지 않음 |

## Secret

Issue를 Project #11에 추가하고 custom field를 수정하려면 각 Action 실행 repository에 `PROJECTS_TOKEN` secret을 추가한다.

초기 구현은 GitHub 공식 Projects Actions 문서와 호환되는 **classic PAT**를 기준으로 한다.

- `project`: user-owned Project #11 조회/수정
- `repo`: private repository Issue와 cross-repository Development branch 접근

PAT는 Project/Development orchestration step에만 주입한다. build, test, publish, deploy job에는 전달하지 않는다.

`PROJECTS_TOKEN`이 없으면 Project #11 동기화와 cross-repository branch 생성은 warning 후 skip한다. 현재 repository 내부 Development branch는 workflow의 `GITHUB_TOKEN`으로 생성할 수 있다.

## Activation trigger

workflow는 Issue의 `opened`, `reopened`, `edited`를 관찰한다.

실행 조건:

1. Issue가 `open` 상태다.
2. 제목이 `draft:`로 시작하지 않는다.

따라서 connector fallback draft가 생성 순간 잠시 open이어도 Development branch가 생성되지 않는다. 제목 제거와 reopen의 순서가 달라도 최종적으로 active 상태가 되면 idempotent하게 수렴한다.

## Project seed

사람이 읽는 `Work Metadata`도 fallback으로 지원하지만, 새 Issue는 hidden JSON을 canonical initialization seed로 사용한다.

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

이 값은 **초기화 seed**이며 활성화 이후 Project field의 SoT는 Project #11이다.

지원 field:

- Status
- Iteration
- Work Type
- Scope
- Target Release
- Objective

field ID와 option ID는 실행 시 이름으로 조회한다. Project schema가 바뀌었는데 seed가 존재하면 조용히 무시하지 않고 Action을 실패시켜 drift를 드러낸다.

## Development branch

기본적으로 Issue repository에 다음 규칙으로 linked branch를 생성한다.

```text
<issue-number>-<work-type>-<slug>
```

repository별 base branch는 workflow에서 정의한다.

cross-repository coordination은 seed에 `development`를 추가한다.

```json
{
  "development": [
    {
      "repository": "ooMia/oomia.github.io.engine",
      "base": "develop",
      "branch": "2-feat-project-orchestration-automation"
    },
    {
      "repository": "ooMia/oomia.github.io",
      "base": "main",
      "branch": "2-feat-project-orchestration-automation"
    }
  ]
}
```

GitHub의 `createLinkedBranch` mutation은 기존 branch를 Issue에 사후 연결할 수 없으므로 **Issue 활성화 전에 branch를 만들지 않는 규칙**이 중요하다. 이미 존재하지만 연결되지 않은 branch를 발견하면 Action은 새 branch를 만들지 않고 migration warning을 남긴다.

## Manual replay

PAT을 나중에 추가했거나 Project field를 다시 초기화해야 하면 Actions UI의 `workflow_dispatch`에서 Issue 번호를 전달한다.

Project item 추가는 GitHub API 자체가 existing item ID를 반환하므로 idempotent하고, field update와 linked branch 검사는 재실행 가능한 형태로 작성한다.
