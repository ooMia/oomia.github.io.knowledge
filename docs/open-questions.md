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

공통 scheme과 소유권 판단 기준은 [Repository Design](repository-design.md)이 소유한다.

이번 검토에서 다음 경계는 정리 완료했다.

- `architecture.md`: Knowledge는 레포 역할·cross-repository 경계와 원본 탐색을 유지하고 Engine/Site 기술 설계는 각 소유 레포를 참조한다.
- `architecture-transition.md`: Knowledge는 전환 목적·순서·안전 규칙·완료 조건·Evidence 연결만 소유한다. Engine/Site 내부 migration 전략은 각 레포 원본으로 이동했다.
- `publishable-projection.md`: 과거 필수 projection pipeline을 종료하고 현재 owner를 찾는 compatibility reference로 유지한다.
- `repository-design.md`: 공통 directory scheme·documentation ownership만 유지하며 Engine/Site 상세는 원본 참조로 정리했다.
- `development-toolchain.md`: 공통 개발·scaffolding 기준만 유지하며 repository-specific runtime/container/toolchain 적용은 owning repository가 소유한다.
- `release-1.0.md`: Knowledge가 통합 목표·수용 기준을 유지하고 기술 상세는 원본 참조로 정리했다.
- `implementation-map.md`: Knowledge가 기준 revision·immutable Evidence·통합 검수 연결을 유지한다. 당시 판정과 현재 구현 상태를 구분한다.
- `decisions.md`: 원본 링크 인덱스로 유지한다.
- `operating-rhythm.md`: 기록·발표 workflow만 유지하고 기능 구현은 책임 레포 Issue를 참조한다.

실제 소유권 판단이 남은 문서는 다음 두 범위다. 답변에 의존하는 이동·축소만 보류한다.

| 기존 문서 / artifact | 남은 질문 |
|---|---|
| `content-authoring-contract.md`의 editor 관련 절 | Q017의 editor 역할이 확정된 뒤 authoring 정책의 durable owner와 문서 위치를 결정한다. Engine 수정 / Site 소비 계약은 이미 분리했다. |
| `content-component-schema.md` 및 JSON Schema | Q012의 manifest 필요성 및 owner를 결정하기 전까지 deferred planning draft로 유지한다. Site 또는 미래 shared package로 임의 이전하지 않는다. |

Git flow의 작은 변경 직접 반영 대상, patch/hotfix 절차, merge 방식은 미정이다. 해당 작업이 필요해질 때 확인하며 일반 Issue branch → develop PR 작업을 막지 않는다.

### 공유 콘텐츠 계약의 원본

사용자가 확정한 경계는 Engine의 파일 수정 계약 / Site의 소비 계약이다. 각 레포가 자신의 계약을 소유하고 상대 원본을 참조한다. 해당 소유권 선택은 미결 사항에서 제외한다.

이관 문서의 통합과 링크 전환 상태는 handoff에서 추적한다. editor 역할과 content-component manifest의 owner는 추가 검토한다. 선택 기능을 다른 레포의 필수 정책으로 전파하지 않는 경계는 Architecture를 따른다.
