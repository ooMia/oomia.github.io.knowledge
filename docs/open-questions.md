# Open Questions / Verification Gaps

현재 canonical 정책에서 **제품 경계나 cross-repository contract 수준에서 아직 실제 결정이 필요한 항목**만 유지한다.

구현 중 쉽게 바꿀 수 있는 CLI UX, timestamp 계산 방식, staged/file/all 선택, formatting/normalization 방식은 Open Question으로 승격하지 않는다. 이런 세부사항은 책임 구현 repository에서 실험하고 필요할 때 Knowledge로 승격한다.

| ID | 항목 | 현재 처리 |
|---|---|---|
| Q003 | 1.0 final release gate | 실제 acceptance/evidence chain과 최종 release gate는 새 vertical slice가 구현된 뒤 구체화 |
| Q006 | Status 옵션 및 계획 Item의 Objective/Target Release 빈 값 허용 규칙 | Project 운영상 실제 불편이 확인될 때 확정 |
| Q007 | Work Type Validation 추가 | 보류. 현재 기본값 유지 |
| Q008 | Engine container artifact와 workspace mount / Git credential contract | local CLI scratch의 blocker는 아님. containerized prepare/verify/publish를 연결할 때 구체화 |
| Q010 | 미디어 공개 범위·asset 저장 위치 | workspace-relative asset과 durable external URL 방향은 유지. public/private와 large/binary policy는 실제 asset workflow 전에 결정 |
| Q012 | custom component shared profile/manifest 필요 여부 | Fumadocs built-in 우선. 실제 custom component의 cross-repository 공유 계약이 필요할 때만 활성화 |
| Q014 | raw HTML 및 executable MDX publish security policy | source 저장과 별개. 실제 public publish gate 전에 허용 범위를 반드시 결정 |
| Q015 | docs layout / consumer discovery convention | free-form / consumer-specific / strict layout 모두 허용. Fumadocs/Site vertical slice 결과로 결정 |
| Q017 | 실제 authoring editor 역할 분담 | 기존 Obsidian corpus + Fumadocs custom-component authoring Evidence 후 결정 |
| Q019 | Site migration 방식 | 기존 Astro/docs/Pages Evidence를 보존하는 incremental migration이 현재 우선 후보. Fumadocs spike 후 재평가 |
| Q021 | Site Turbo retirement | VP parity와 기존 CI/build Evidence를 확인한 뒤 별도 Maintenance change로 결정 |
| Q025 | stable document identity / sidecar linkage | frontmatter-first이므로 초기 범위 밖. 실제 path-independent identity나 sidecar 필요가 생길 때 결정 |

## 이미 구현 레포에 위임한 세부사항

다음은 **현재 Knowledge-level Open Question이 아니다.**

- 어떤 persistent metadata field를 언제 추가할지
- timestamp를 현재 시각, Git history, editor template 등 어떤 방식으로 유도할지
- `prepare`를 단일 file, staged files, glob, 전체 workspace 중 어떤 입력 표면으로 제공할지
- missing field를 prompt, diagnostic, Agent 보완 등 어떤 UX로 해결할지
- YAML key order, quoting, whitespace 또는 Markdown formatting을 어느 정도 normalize할지
- metadata schema를 TypeScript, Zod, config 또는 다른 방식으로 표현할지
- bulk prepare의 partial-success / atomicity 정책

이들은 Engine 구현에서 가장 단순한 형태로 시작하고, 실제 제약이나 반복되는 패턴이 생기면 구현 Evidence와 함께 Knowledge decision으로 승격한다.

## Metadata 수정 계약

[Engine 원본](https://github.com/ooMia/oomia.github.io.engine/blob/docs/content-modification-contract/docs/content-modification-contract.md#prepare)을 참조한다. metadata mutation invariant를 이 미결 목록에 반복 정의하지 않는다.

## 다음 실제 설계 gate

Site 입력/layout·editor 역할은 Q015/Q017의 실제 corpus 검증으로 좁힌다. 공개 발행 정책은 Q014에서 검토한다. Engine 기능 추가와 container 설계는 해당 레포의 필요에 따라 진행하며 Site 소비의 선행 gate로 삼지 않는다.

이전 Q024의 projection 위치 선택은 공통 필수 gate에서 제외했다. 현재 경계는 [Architecture](architecture.md#publishing-boundary)를 따른다.

## 문서 소유권 검토

공통 scheme과 소유권 판단 기준은 [Repository Design](repository-design.md)이 소유한다. 아래는 이동 지시가 아닌 후속 검토 목록이다. 불확실한 owner는 사용자와 확인한 뒤 변경한다.

| 기존 문서 / 절 | 후보와 남은 질문 |
|---|---|
| `architecture.md` | 레포 탐색 정보는 Knowledge; 기술 경계 설명은 구현 레포. Engine 수정 / Site 소비 계약의 원본을 참조한다. |
| `architecture-transition.md` | 레포 간 의존성은 coordination; Engine/Site 이행 상세는 각 레포. 현재 유효한 전환 범위를 먼저 확인한다. |
| `content-authoring-contract.md` | 파일 수정 절은 Engine, 소비 절은 Site의 이관 branch로 분리. 남은 editor 설명은 별도 검토. |
| `publishable-projection.md` | 기존 필수 파이프라인 설계를 종료하고 소유 레포 원본을 찾는 참조 문서로 정리했다. |
| `content-component-schema.md` 및 JSON Schema | deferred draft 유지. Site 또는 미래 shared package로 임의 이전하지 않는다. |
| `repository-design.md`의 Engine/Site 설계 절 | 공통 scheme 유지. Engine runtime 설계와 Site integration 전환은 소유 레포의 이관 branch로 이동했고, Engine bootstrap은 기존 migration record를 참조한다. |
| `development-toolchain.md`의 레포별 적용 상세 | 공통 개발·scaffolding 기준 유지. 레포별 적용 상세는 Engine README/migration 및 Site toolchain 전환 원본 참조로 변경했다. |
| `release-1.0.md` | 사용자 결정: Knowledge에 통합 목표·수용 기준 유지. 기술 상세는 원본 참조로 정리했다. |
| `implementation-map.md` | 사용자 결정: Knowledge에 통합 검수 연결 유지. 기준 Evidence와 당시 판정은 보존하고 기술 구현 목록은 원본 참조로 정리했다. |
| `decisions.md` | 원본 링크 인덱스로 전환했다. 이관이 확정되면 해당 링크만 변경한다. |
| 이 문서의 기존 domain 질문 | Q008은 Engine, Q019/Q021은 Site 후보. 실제로 여러 레포가 공유할 새 계약이 생기면 owner를 먼저 확정한다. |
| `operating-rhythm.md`의 제품 기능 아이디어 | 기록·발표 workflow는 유지하고 기능별 Engine Issue 참조로 전환했다. |

Git flow의 작은 변경 직접 반영 대상, patch/hotfix 절차, merge 방식은 미정이다. 해당 작업이 필요해질 때 확인하며 일반 Issue branch → develop PR 작업을 막지 않는다.

### 공유 콘텐츠 계약의 원본

사용자가 확정한 경계는 Engine의 파일 수정 계약 / Site의 소비 계약이다. 각 레포가 자신의 계약을 소유하고 상대 원본을 참조한다. 해당 소유권 선택은 미결 사항에서 제외한다.

이관 문서의 통합과 링크 전환 상태는 handoff에서 추적한다. editor 역할과 content-component manifest의 owner는 추가 검토한다. 선택 기능을 다른 레포의 필수 정책으로 전파하지 않는 경계는 Architecture를 따른다.
