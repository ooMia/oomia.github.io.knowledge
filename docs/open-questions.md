# Open Questions / Verification Gaps

현재 canonical 정책에서 **사용자 결정이나 설계 선택이 아직 필요한 항목**만 유지한다. GitHub live 상태처럼 조회로 해결되는 운영 확인 사항은 [Current Handoff](../handoff/current.md)에 두고, 구현 수준과 revision-bound Evidence는 [Implementation Map](implementation-map.md)이 소유한다.

| ID | 항목 | 현재 처리 |
|---|---|---|
| Q003 | 1.0 public contract 목록·compatibility policy·release gate | Content authoring/component 방향은 확정. generated document public contract, package compatibility, 최종 release gate는 추가 결정 필요 |
| Q006 | Status 옵션 및 계획 Item의 Objective/Target Release 빈 값 허용 규칙 | 명시적으로 확정할 필요 있음 |
| Q007 | Work Type Validation 추가 | 보류. 현재 기본값은 5개 유지 |
| Q008 | engine container/artifact 배포 | 방향성 후보. 필요 시 별도 결정 |
| Q010 | 미디어 공개 범위·저장 위치와 임시 블로그 채널 | 운영 필요 시 결정 |
| Q011 | public content-component package의 실제 이름, registry, initial version, release transport, semantic compatibility policy | public npm registry가 현재 우선 후보다. anonymous install이 가능하고 GitHub Actions Trusted Publishing/OIDC + provenance를 사용할 수 있다. GitHub Packages npm registry는 public package install에도 인증이 필요해 consumer friction이 더 크다. 최종 package scope/name, registry, initial version, release trigger, compatibility policy는 사용자 결정 필요 |
| Q012 | component manifest schema의 최종 runtime API | [planning schema](content-component-schema.md)를 추가했으나 실제 package export shape와 generator 사용 여부는 구현 전 검증 필요 |
| Q013 | 외부 Markdown/MDX import 시 frontmatter와 canonical structured metadata의 매핑 | body raw source 원칙은 확정. imported frontmatter를 DB field로 흡수할지, import-only contract로 둘지 미결 |
| Q014 | raw HTML 및 asset resolution의 구체적인 publish security/portability policy | Source 저장은 허용하는 방향. 어떤 HTML/asset reference를 consumer가 허용할지는 site contract에서 구체화 필요 |
| Q015 | 공식 MDX component의 rich Markdown/MDX children 범위 | manifest는 children model을 표현할 수 있게 계획했으나 1.0 component별 실제 허용 범위는 implementation에서 결정 |

## 분리 원칙

- **결정이 필요한 질문** → 이 문서
- **현재 GitHub/branch/Project 상태를 다시 확인해야 하는 항목** → [Current Handoff](../handoff/current.md)
- **특정 revision에서 검증된 capability와 남은 구현 delta** → [Implementation Map](implementation-map.md)
- **이미 확정된 방향과 대체된 결정** → [Decision Log](decisions.md)

초기 지식 레포 구성에 사용한 대화의 source/turn metadata는 provenance에 역사적 근거로 남기되 raw transcript는 저장하지 않는다. 현재 정책과 실제 repository 검증 결과가 있는 항목은 canonical 문서와 Implementation Map을 우선한다.
