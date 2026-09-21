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
| Q024 | projection materialization 위치 | ephemeral staging vs Site working-tree generated projection을 실제 consumer integration으로 비교 |
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

## 고정된 최소 metadata invariant

- document-local persistent metadata는 frontmatter-first다(D038).
- Engine `prepare`는 commit 전에 source를 보완할 수 있지만 stage/commit/push하지 않는다(D039).
- **explicit user value가 있으면 그대로 유지하고 Engine은 해당 field에 대한 derivation을 수행하지 않는다**(D040).
- Engine은 unset/missing field를 보완하는 방향으로 시작한다.
- formatting 변화 자체는 contract violation이 아니다. VP formatter/linter 또는 구현 도구가 deterministic consistency를 위해 source 형식을 normalize할 수 있다.
- 다만 formatter/enrichment가 사용자가 명시한 metadata의 의미를 바꾸거나 unrelated semantic content를 임의로 변경해서는 안 된다.

## 다음 실제 설계 gate

Engine scratch 자체는 metadata 세부 결정 때문에 막지 않는다.

1. minimal `doctor / prepare / verify / publish` skeleton을 만든다.
2. `prepare`는 frontmatter-first + missing-only enrichment로 시작한다.
3. 실제 Obsidian corpus에서 구현해보고 field/timestamp/selection/formatting 전략을 책임 레포에서 조정한다.
4. Site/Fumadocs vertical slice에 들어갈 때 Q024/Q015/Q017을 Evidence 기반으로 좁힌다.
5. 실제 public publish 전에 Q014와 Q008의 필요한 부분을 닫는다.
