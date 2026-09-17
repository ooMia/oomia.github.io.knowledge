# Architecture

상태: 사용자 명시 사항 및 이후 README 기준을 종합. 출처: S2 `138f8f89`, `4c1f839e`, `d7815342`; S3 `924e880a` (전체 ID는 출처 색인).

## 원칙

- 구현 작업보다 제품 결과와 시스템 책임을 기준으로 계획한다.
- 매 Iteration에 시연 가능한 결과를 남긴다.
- 핵심이 아닌 문제는 검증된 도구를 우선 활용한다.
- 안정된 경계가 필요해질 때까지 설계 선택의 변경 가능성을 유지한다.
- 레포와 프레임워크를 영구적인 제품 경계로 취급하지 않는다.

## 레포의 역할

유일한 최상위 구현 레포는 없다. 이 지식 레포도 다른 레포를 포함하는 super-repository가 아니다.

| 레포 | 대화에서 설명된 책임 |
|---|---|
| `oomia.github.io.engine` | 로컬에서 콘텐츠를 생성·수정하기 위한 환경과 처리 기능 |
| `oomia.github.io.docs` | downstream이 소비할 계약된 generated document set |
| `oomia.github.io` | generated documents를 소비해 사이트를 빌드하고 GitHub Pages로 전달 |

`mono`는 사용자가 로컬에서 붙인 별칭이며 실제 레포 이름의 일부가 아니다. 대화 당시 docs는 engine과 사이트 양쪽의 submodule이었다. 현재 checkout을 검사한 사실로 해석하지 않는다.

```text
Authoring → Canonical Content → Generated Documents → Site Output → Live Site
                    engine         docs                 site
```

Canonical content가 콘텐츠의 권위 있는 상태다. docs는 재생성 가능한 projection이며 수동 수정이 canonical state를 대체하지 않는다. 대화에는 PostgreSQL이 현재 canonical 저장소라는 설명이 있지만 제품 수준 계약은 특정 DB/프레임워크를 강제하지 않는다.

## 경계의 발전 방향

source-level 결합보다 명시적인 artifact/runtime contract를 우선한다. engine을 container image 등으로 배포하는 것은 가능한 방향이며 확정된 구현 과제가 아니다. API, generated documents, extensions 등의 계약 세부사항은 소유 레포에 둔다. 이 레포에서 코드의 구현 여부를 추론하지 않는다.
