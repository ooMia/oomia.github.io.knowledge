# Open Questions / Verification Gaps

현재 canonical 정책과 구현 검증에서 아직 확정되지 않은 항목만 유지한다. 완료되거나 다른 문서에서 확정된 과거 질문은 이 목록에서 제거하고 Decision Log / Implementation Map에 남긴다.

| ID | 항목 | 현재 처리 |
|---|---|---|
| Q001 | GitHub Project #11의 실제 필드·옵션·View·Item·Status Update | GitHub Project live 상태는 knowledge repo와 분리. 현재 plugin surface에서 ProjectV2 전체 설정을 직접 검증·수정하는 기능은 제한적 |
| Q002 | Scope 다중 선택 및 Delivery 옵션의 실제 적용 | 최신 설계에 포함, 실제 Project 설정 미확인 |
| Q003 | 1.0 public contract 목록·compatibility policy·release gate | Content authoring/component 방향은 확정. generated document public contract, package compatibility, 최종 release gate는 추가 결정 필요 |
| Q004 | 각 capability의 구현 수준과 재현 증거 | [Implementation Map](implementation-map.md)에서 revision-bound snapshot으로 관리. 기준 revision 이후 변경은 재검증 필요 |
| Q005 | 실제 Target Release 옵션·Iteration 일정·현재 Goal | Project 운영 상태에서 조회 필요; 예시를 실데이터로 만들지 않음 |
| Q006 | Status 옵션 및 계획 Item의 Objective/Target Release 빈 값 허용 규칙 | 명시적으로 확정할 필요 있음 |
| Q007 | Work Type Validation 추가 | 보류. 현재 기본값은 5개 유지 |
| Q008 | engine container/artifact 배포 | 방향성 후보. 필요 시 별도 결정 |
| Q009 | Project README 실제 canonical index 적용 여부 | knowledge remote는 설정 완료. [템플릿](../templates/project-readme.md)은 제공되어 있으나 Project README live 상태는 별도 확인 필요 |
| Q010 | 미디어 공개 범위·저장 위치와 임시 블로그 채널 | 운영 필요 시 결정 |
| Q011 | public content-component package의 실제 이름, registry, release transport, semantic compatibility policy | architecture는 versioned public package를 요구하지만 npm registry/package name/version coupling은 구현 시 결정 |
| Q012 | component manifest schema의 최종 runtime API | [planning schema](content-component-schema.md)를 추가했으나 실제 package export shape와 generator 사용 여부는 구현 전 검증 필요 |
| Q013 | 외부 Markdown/MDX import 시 frontmatter와 canonical structured metadata의 매핑 | body raw source 원칙은 확정. imported frontmatter를 DB field로 흡수할지, import-only contract로 둘지 미결 |
| Q014 | raw HTML 및 asset resolution의 구체적인 publish security/portability policy | Source 저장은 허용하는 방향. 어떤 HTML/asset reference를 consumer가 허용할지는 site contract에서 구체화 필요 |
| Q015 | 공식 MDX component의 rich Markdown/MDX children 범위 | manifest는 children model을 표현할 수 있게 계획했으나 1.0 component별 실제 허용 범위는 implementation에서 결정 |

## 현재 구현 검증 기준

2026-09-20 Implementation Map은 다음 implementation revision을 기준으로 한다.

- engine: `6ba2f950a78eef18c2efa305b96a1c8d0443252e`
- docs: `50d89a4cb1c5d6476444e29454e12b523e99231b`
- site (`package.json` name: `oomia.github.io.mono`): `a3b2e182563458636b7b8186a4cd2201894b2a65`

site revision에 대한 GitHub Pages run `35472028484`의 build/deploy 성공과 artifact `10593195312`를 확인했으므로 과거의 “Delivery 성공 Evidence 미확인” 질문은 종료했다.

Issue #8의 explicit Publish trigger도 idempotent no-op semantics를 포함한 완료 Evidence로 닫혔으므로 과거의 “Automation 최소 경로 미충족” 질문은 종료했다.

상세 capability 판정은 [Implementation Map](implementation-map.md)에 둔다. 별도 원격 `oomia.github.io.mono` 레포는 없으며, `mono`는 site 레포를 가리키는 로컬/문서상의 이름으로 취급한다.

## 역사적 수집 범위

초기 지식 레포는 동일 ChatGPT 프로젝트의 관련 대화를 수집해 구성했다. 대화 원문은 provenance에 역사적 근거로 남기되, 이후 사용자 승인 정책과 실제 repository 검증 결과가 있는 항목은 현재 canonical 문서와 Implementation Map을 우선한다.
