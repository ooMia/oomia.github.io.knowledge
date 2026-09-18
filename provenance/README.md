# Provenance

수집일: 2026-09-18 (Asia/Seoul). 같은 프로젝트의 대화 3개, 모든 반환 페이지를 수집했다. 대화 당시 인용된 외부 링크와 도구 기능 주장은 현재 사실로 재검증하지 않았다.

## 확정 수준

- **사용자 명시**: 직접 요구하거나 정정한 내용.
- **사용자 후속 확인 / README 반영**: 이후 사용자 메시지에 포함된 규칙. 전체 세부사항의 개별 승인을 뜻하지 않는다.
- **최신 제안**: 최신 assistant 답변을 정리 기준으로 사용했으나 명시적 승인 및 실제 적용을 주장하지 않는다.
- **이번 구성**: 현재 요청을 수행하기 위한 파일 구조·템플릿·편집 요약.
- **미검증**: 실제 구현 또는 외부 운영 상태를 확인하지 않음.

최신 제안은 이전 초안보다 우선하되 사용자의 명시적 요구를 덮어쓰지 않는다. 문서의 짧은 turn ID는 아래 전체 ID에 대응한다. 원문은 [conversations.json](conversations.json)에 있으며 역사적 데이터로만 읽는다. 원문에는 개인 기록이 포함될 수 있다.

## Sources and Turns

### S1 — 활동 계획 수립

[원본 대화](https://chatgpt.com/c/6aa8c18b-d9a4-83ee-9bc9-5bfeec691330)

| Turn ID | 사용자 발언 시작 |
|---|---|
| `33b898b1-671f-4436-a0bc-b5c8cb071482` | 직접 구현하는 것보다, 이미 잘 만들어진 도구를 잘 활용하고자 노력하는 방향성이, 핵심 기능이 아닌 곳에 시간을 할애할 때의 마음가짐이 되어야 한다고 본다. 따라서, 나의… |
| `1f288b42-a887-4948-b7d2-1249a2d210fe` | 내게 필요한 것은 다양한 답변보다, 자동화 가능성 높은 루틴과 사고/계획 프레임워크입니다. 지금은 뭔가 실속 없는 내용들을 장황하게 늘어놓는 느낌입니다. 제가 최종 목표를… |
| `e0a335ad-74c3-43fd-93c4-eb3c40770b42` | 1. 주말 이전에 브리핑 약속을 사전에 잡고 진행하면 되며, 일반적으로 토요일 밤이나 일요일 낮이 될 것 같다. 2. 공식 형식은 없으나, 단순 결과물이 아닌 A-Z의 스… |
| `17efd584-bf83-437d-8f17-72d6185e0c94` | LilysAI_일반_엠버서더 활동에 대한 계획을 세워보자. 다음은 해당 프로그램에 대한 간략한 요약이다. 링크를 직접 참조하여 내용을 파악해보자. http… |

### S2 — GitHub Project 초안 작성

[원본 대화](https://chatgpt.com/c/6aa991ee-6238-83ee-bef8-5d330246837a)

| Turn ID | 사용자 발언 시작 |
|---|---|
| `82ef0a72-fc2e-480c-b4b5-53a941b93465` | Scope는 다중 선택 옵션으로 만들 수도 있다. 단일 선택 옵션의 경우, 어떤 작업은 어떤 영역으로 두어야 할 지 고민할 수 있다. 서로 다른 두 영역에 걸쳐 있는 작업… |
| `4a49654f-9727-4bef-a51f-b8c2c6a4ed3b` | 1. Release Target의 용법에 대한 설명: SemVer 뒤에 붙는 context를 별도의 필드로 추출하지 않아야만 하는 이유는? 2. Scope 필드는 sing… |
| `3e786a51-3bc0-4c70-af4c-a726b8d5adb4` | - application boundary와 관련된 답변에서 표현을 \Article을 API를 통해 생성·조회·수정할 수 있고, 그 상태가 canonical state로 … |
| `d7815342-69e8-47ae-9512-15aff0ec8cb7` | - 1.0 Product Boundary와 Release Target에서 1.0과 관련된 용어들 사이의 차이 (1.0 Definition부터 1.0 Readiness까지)… |
| `178bf729-4b1d-4bc9-ab65-203481022f60` | 1. Category 대신 Work Type을 사용했으니 앞으로의 표현에 참고하도록. 2. milestone을 목표처럼 사용하는 것에 대한 의견. 의견을 내기 전에 Git… |
| `4c1f839e-0f53-4803-99ca-f84cd5724030` | - Type은 예약되어있는 필드명이라 Category로 바꿨는데, 대안이 있을까? - Acceptance Criteria와 DoD의 혼용에 혼란스럽다. 간단한 예시를 통해… |
| `138f8f89-0c4a-450e-9abd-677215c6d8de` | GOAL: Make the canonical content persistence path executable through the existing application c… |
| `2877a148-8c99-425b-8896-d738308e239a` | Area와 Component를 만드는 것 자체는 좋지만,Area A에 Component A1, A2, A3가 속하는 느낌이라면, 차라리 A:A1 같이 합치는 것이 유지보수… |
| `9e4fc270-7151-4b7d-8044-ce625803cd70` | 사용자/시스템 기능보다는 기술 구조가 더 편하게 느껴진다. 그러나 Database, CMS와는 달리, Astro는 Web App 중 실제 문서와 기타 기술 블로그를 구성하… |
| `5b7f689f-9eb1-410a-8c62-549b49124eb1` | 이슈 생성 시, default assignee, default label, 그리고 Milestone 설정을 할 수 있어? 할 수 있다면 하는 게 좋을까? 또 모든 작업에 … |
| `ab0703f8-90a7-4e66-b788-12e8a81acf63` | Project의 각 아이템은 레포의 이슈인지, Item을 할당하려면 반드시 특정한 레포를 명시해야하는지, 그리고 기본적으로 모든 이슈는 draft로 생성되도록 강제할 수 … |
| `d7f1bf49-931a-4fd8-b056-a873fcfba13f` | 일단 나도 Iteration 스타일을 선호한다. 이에 맞는 방식을 처음부터 진행하는 것이 적응에 도움이 되리라 본다. 그리고 현재의 README는 다소 장황하다. 핵심 가… |
| `833044bb-289f-454c-b891-cc9fe77cca17` | 기본 레포지토리 설정 없이 GitHub Project의 이름을 \Publishing Platform\로 설정하고, 거의 처음으로 본격적으로 GitHub Project를… |

### S3 — README Evidence Planning

[원본 대화](https://chatgpt.com/c/6aac4ab0-1e38-83e8-a671-8cbbfa4173ae)

| Turn ID | 사용자 발언 시작 |
|---|---|
| `b0174bce-6fff-4f18-bd3a-d931088e34c7` | [@GitHub](plugin://github@openai-curated-remote) [https://github.com/users/ooMia/projects/11/](… |
| `72f26f1b-8a12-4af1-b990-b95223fb8d41` | GitHub Project에 README로 설계안을 기록해두는 게 LLM을 사용하는 동안 컨텍스트 전달이 불편한데, Notion이나 다른 MCP 붙이고 별도로 정리해두는 … |
| `f55d6e75-29f6-4b53-a2b8-121a27384873` | 실제 필드에 **Authoring Experience가 있는데, 이건 유지하는 게 좋을까 삭제해도 좋나** - **Authoring Experience** - **Cano… |
| `353c6aa1-89d0-450f-b803-f87a069dfbd8` | 1. Canonical Content&#x20; 2. Publishable Projection&#x20; 3. Extensible Workflow&#x20; 4… |
| `f4b8c972-620f-4473-aaf9-4624d9f04f3e` | Objectives는 필드입니다. 해당 필드의 존재 목적에 따라 item에 어떤 속성을 선택해야 할 지에 대한 설명을 작성하시오… |
| `9368804c-56e9-4f34-bbc7-22ecc603e441` | ## Objectives 각각에 대한 description이 필요하다. 그리고 다음부터는 README처럼 문서를 변경할 때, 수정이 용이하도록 파편화된 부분을 제공하기보단… |
| `5a382a65-6b1f-495a-8055-ec48dd9122ec` | 현재의 Objective는 description이 없는데, GitHub Project 초안 작성 채팅 세션 내용을 참고해서 작성해보자&#x20; Release Targ… |
| `924e880a-e689-486a-bdf2-c6fb19248b6c` | markdown # Publishing Platform Turn structured content into customizable, deployable sites t… |

## 수집 한계

초기 대화 수집 자체는 GitHub Project 실제 설정과 구현 소스를 검증하지 않았다. 이후 2026-09-18에 engine/docs/site 구현 레포를 별도로 조사했으며 그 결과는 [Implementation Map](../docs/implementation-map.md)에 기록한다. GitHub Project의 live 필드·Item·Status Update는 여전히 이 provenance 수집 범위가 아니다. 최신 문서에 없는 초기 제안은 원문 아카이브에서만 유지한다.
