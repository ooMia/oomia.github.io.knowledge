# Open Questions / Verification Gaps

현재 canonical 정책에서 **사용자 결정이나 설계 선택이 아직 필요한 항목**만 유지한다. GitHub live 상태처럼 조회로 해결되는 운영 확인 사항은 [Current Handoff](../handoff/current.md)에 두고, 구현 수준과 revision-bound Evidence는 [Implementation Map](implementation-map.md)이 소유한다.

| ID | 항목 | 현재 처리 |
|---|---|---|
| Q003 | 1.0 final release gate | Git-backed authoring/publishing boundary는 확정. 실제 acceptance/evidence chain과 최종 release gate를 구현 과정에서 구체화해야 함 |
| Q006 | Status 옵션 및 계획 Item의 Objective/Target Release 빈 값 허용 규칙 | 명시적으로 확정할 필요 있음 |
| Q007 | Work Type Validation 추가 | 보류. 현재 기본값은 5개 유지 |
| Q008 | Engine container artifact와 workspace mount contract | containerization 방향은 확정적이지만 image distribution, bind mount/volume CLI contract, host Git credential 전달 방식은 구현 시 결정 |
| Q010 | 미디어 공개 범위·asset 저장 위치 | workspace-relative asset과 durable external URL을 허용하는 방향. public/private 범위와 large/binary asset policy는 추가 결정 필요 |
| Q012 | custom component shared profile/manifest 필요 여부 | Fumadocs built-in을 우선 사용. 실제 custom component가 생겨 Engine/Site 간 계약 공유가 필요할 때만 schema/package를 활성화 |
| Q014 | raw HTML 및 executable MDX의 구체적인 publish security policy | Source 저장은 허용 가능. Site/publish 단계에서 허용할 HTML/expression 범위를 구체화해야 함 |
| Q015 | consumer-specific path/file convention | docs repository 전체는 자유로운 document tree로 유지. Site/Engine이 소비하는 subtree에서만 `.md` / `.mdx`, frontmatter, route/path naming을 어디까지 요구할지 integration spike에서 최소화해 결정 |
| Q016 | Git publish semantics | durable canonical revision은 docs commit으로 확정. Engine이 auto-commit/push할지, 사용자 commit을 publish 입력으로 받을지, branch/PR를 사용할지 세부 UX 결정 필요 |
| Q017 | 실제 authoring editor 역할 분담 | Obsidian을 primary editor로 충분히 사용할 수 있는지, Fumadocs Editor가 component-aware visual editing을 위해 별도로 필요한지 기존 content corpus integration으로 결정. Fumadocs Studio vs embedded UI는 Fumadocs Editor 채택 시 하위 결정 |
| Q018 | Obsidian ↔ Site component/style bridge | Obsidian CSS snippets/custom callout은 styling과 Markdown primitive 확장에 강하지만 arbitrary MDX semantics는 CSS만으로 제공하지 못한다. Obsidian plugin Markdown post-processing, portable callout/code-fence syntax, Site remark/rehype transform 중 최소 구현을 비교해야 함 |
| Q019 | Engine/Site migration 방식 | 기존 소스를 in-place refactor할지 새 target skeleton을 greenfield로 만들고 generic code만 이식할지 미결. repository별 keep/adapt/retire 비율과 dependency graph를 Phase A에서 확인한 뒤 결정 |

## 분리 원칙

- **결정이 필요한 질문** → 이 문서
- **현재 GitHub/branch/Project 상태를 다시 확인해야 하는 항목** → [Current Handoff](../handoff/current.md)
- **특정 revision에서 검증된 capability와 남은 구현 delta** → [Implementation Map](implementation-map.md)
- **이미 확정된 방향과 대체된 결정** → [Decision Log](decisions.md)

초기 지식 레포 구성에 사용한 대화의 source/turn metadata는 provenance에 역사적 근거로 남기되 raw transcript는 저장하지 않는다. 현재 정책과 실제 repository 검증 결과가 있는 항목은 canonical 문서와 Implementation Map을 우선한다.
