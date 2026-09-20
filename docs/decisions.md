# Decision Log

과거 제안과 현재 정리 기준을 구분한다. D001–D008의 날짜는 최초 수집일 2026-09-18이며 원래 결정일을 추정하지 않는다. 이후 결정은 실제 반영일을 기준으로 기록한다.

| ID | 현재 기준 | 상태 / 근거 | 대체하거나 제한한 과거 안 |
|---|---|---|---|
| D001 | 유일한 최상위 구현 레포를 만들지 않는다 | 사용자 명시, S2 `138f8f89` | 임의의 root repository 및 submodule 집합으로 제품 계층을 표현 |
| D002 | docs는 generated projection | 사용자 명시, S2 `4c1f839e` | docs를 canonical authoring source로 취급 |
| D003 | 필드 이름은 Work Type | 사용자 명시, S2 `178bf729` | Category / Type |
| D004 | Target Release와 Objective를 분리 | 사용자 후속 확인, S3 `5a382a65` | Release Target에 버전/목표를 결합 |
| D005 | Scope는 직접 바뀌는 책임만 최소 선택 | 사용자 README 반영 + 최신 제안, S3 `924e880a`, S2 `82ef0a72` | 단일 주영역만 선택하던 중간 제안; 모든 dependency 태깅 |
| D006 | Objective 5개와 Authoring Experience를 보존 | 실제 옵션은 사용자 명시, description/유지는 최신 제안, S3 `f55d6e75` | 4개만 적힌 이전 답변 |
| D007 | Item은 완료 가능한 delta | 최신 설계 제안, S2 `4a49654f` | 영구 capability를 릴리스마다 복제해 Done 처리 |
| D008 | 지식은 Markdown 레포, 운영 상태는 Project | knowledge repo 생성 및 현재 운영 방식 | Project README가 모든 장기 지식을 소유 |
| D009 | Project README는 canonical 문서의 짧은 인덱스로 유지한다 | 사용자 명시, 2026-09-18 | Product Boundary·Planning Model·필드 정의를 README에 중복 보관 |
| D010 | 설계 정의 Item은 canonical 문서의 immutable permalink를 Evidence로 사용할 수 있다 | 사용자 명시, 2026-09-18 | 설계 정의 완료에도 별도 산출물을 중복 생성 |
| D011 | 1.0 구현 수준은 revision이 고정된 Implementation Map으로 관리한다 | 사용자 요청 + 구현 레포 검증, 2026-09-18 | 설계 문서 또는 대화만으로 구현 완료 여부 추론 |
| D012 | canonical Article source는 CMS/Visual Editor와 독립적인 raw Markdown/MDX string으로 보존한다 | 사용자 승인, 2026-09-20 | Visual Editor가 무손실 표현 가능한 Markdown subset을 canonical 저장 범위로 취급 |
| D013 | Storage, Editing, Publishing 가능성을 서로 독립된 계약으로 판정한다 | 사용자 승인, 2026-09-20 | 저장 가능 = Visual 편집 가능 = 발행 가능으로 묶는 모델 |
| D014 | 공식 MDX component contract는 Site 쪽에서 소스 변경을 소유하는 versioned public content-component package로 공유한다 | **대체됨: D018**, 사용자 제안 및 승인, 2026-09-20 | engine과 site가 component spec을 각각 암묵적으로 복제 |
| D015 | CMS는 공식 component의 authoring adapter이고 Site는 rendering consumer다. Visual adapter 유무는 publishability를 결정하지 않는다 | 사용자 승인, 2026-09-20 | CMS registry가 플랫폼 전체 MDX 지원 범위를 결정 |
| D016 | Publishability는 CMS codec round-trip이 아니라 content/component contract와 실제 Site consumer 검증으로 판정한다 | D012–D015의 구현 원칙, 2026-09-20 | 모든 DB body에 Visual Editor representability를 요구하는 global publish gate |
| D017 | Knowledge에는 raw conversation transcript를 저장하지 않고 source/turn provenance metadata와 canonical knowledge만 유지한다 | 사용자 위임에 따른 agent 결정, 2026-09-20 | `provenance/conversations.json`에 원문 대화를 장기 보존하거나 handoff와 세션 transcript archive를 결합 |
| D018 | 공식 content component는 독립 repository가 소유하고 npm public package `@oomia/content-components`로 배포한다. framework-neutral contract/manifest와 React renderer surface를 분리하며 Site와 Engine은 각각 consumer다 | 사용자 명시, 2026-09-21 | D014의 Site-owned source 모델; `.astro` 기반 public renderer; 개인 unscoped package |

D005의 다중 선택 설정, Delivery 옵션 등록은 실제 Project에서 확인되지 않았다. D007 등 초기 assistant 제안을 사용자의 명시적 승인 발언으로 인용하지 않는다. engine container 배포 및 Validation 옵션은 결정이 아니라 미결 제안이다.

D010은 **설계 정의가 Outcome인 경우에만** 적용한다. 기능 구현·품질·배포 성공은 구현 레포의 코드·테스트·commit/PR·실행/deployment Evidence가 별도로 필요하다.

D011의 현재 기준 revision과 capability 판정은 [Implementation Map](implementation-map.md)에 기록한다. Product Boundary가 변경되면 동일한 구현 revision도 다시 판정할 수 있으며, contract 강화에 따른 상태 하향을 regression과 구분한다.

D012–D016의 세부 정책과 예제별 지원 수준은 [Content Authoring & Publishing Contract](content-authoring-contract.md)가 소유한다. D018에 따라 component package의 canonical source는 Engine/Site와 독립된 repository에 두고, npm organization scope `@oomia`의 public package `@oomia/content-components`로 배포한다. machine-readable component manifest는 현재 [planning schema](content-component-schema.md) 단계이며 exact subpath export와 runtime API가 확정되었다는 뜻은 아니다.

D017에 따라 세션의 장기 의미는 canonical 문서·Decision Log로 승격하고, 일시적인 실행 상태만 `handoff/current.md`에 유지한다. 원문 대화가 필요하면 원래 대화 시스템을 참조하며 Knowledge repository는 transcript archive 역할을 맡지 않는다.
