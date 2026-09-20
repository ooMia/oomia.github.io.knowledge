# Changelog

## 2026-09-20

- 프로젝트 전 세션에 공통 적용할 Chat/Agent 협업 규칙을 `CONTEXT.md`에 추가: 단계적 실행, 사용자 결정 지점에서 중단, 핵심 GitHub 객체 최초 언급 시 링크 사용, 비핵심 검증의 비차단 원칙.
- Knowledge의 raw conversation transcript 보존을 중단하고 `provenance/conversations.json` 제거 결정(D017). provenance는 source/turn metadata와 최소 요약만 유지하고 세션 연속성은 `handoff/current.md`가 담당.
- 세션 간 live 상태를 canonical knowledge와 분리하기 위해 `handoff/current.md` checkpoint를 도입하고 Open Questions의 운영 확인 항목을 이동.
- Implementation Map을 revision-bound snapshot으로 명확히 하고 bootstrap conversation provenance를 지속 append하지 않는 archive로 동결.
- durable context bundle에서 volatile handoff를 제외하고 bundle 생성기의 고정 날짜를 제거.
- Knowledge repository의 실제 public visibility와 과거 private 전제 불일치를 제거하고 raw conversation provenance의 공개·보존 정책을 Open Question으로 분리.
- Issue #8의 explicit Publish automation을 idempotent no-op semantics까지 포함해 완료로 재평가하고 Automation capability를 충족으로 갱신.
- GitHub Pages run `35472028484`의 build/deploy 성공과 artifact `10593195312`를 Delivery Evidence로 반영.
- canonical Article source를 CMS/Visual Editor와 독립적인 raw Markdown/MDX string으로 보존하는 정책 확정.
- Storage / Editing / Publishing 가능성을 서로 다른 contract로 분리하고, Visual Editor가 표현하지 못하는 source를 Source mode로 보존하는 기본 정책 확정.
- 공식 MDX component는 Site가 소유하는 versioned public content-component package로 계약을 공유하고, Engine/CMS는 authoring adapter, Site는 rendering consumer가 되는 경계 확정.
- Visual adapter 유무를 Publishability와 분리하고, content/component contract + actual Site consumer build를 publish gate로 사용하는 방향 확정.
- [Content Authoring & Publishing Contract](docs/content-authoring-contract.md) 추가.
- Agent/runtime 작업을 위한 planning draft [Content Component Manifest Schema](docs/content-component-schema.md)와 JSON Schema 추가.
- 강화된 1.0 boundary에 따라 Implementation Map을 재평가: Authoring·Canonical Content·Extensibility·Publishing 부분 충족, Automation·Presentation·Delivery 충족.
- 오래된 “Automation 미충족”, “Delivery 성공 Evidence 미확인” open question 제거 및 component package/frontmatter/raw HTML 관련 실제 미결 사항으로 교체.

## 2026-09-18

- 같은 프로젝트의 대화 3개를 수집하고 최신 용어와 수정 사항을 반영한 지식 레포 생성.
- 제품 경계, 책임, 필드, 계획 규칙, 활동 루틴을 각각 하나의 원본 문서로 분리.
- 결정 출처, 제안의 확정 수준, 실환경 미검증 항목을 구분.
- Item/Issue/기록/설계변경 템플릿과 Chat 첨부용 통합본 생성기 추가.
- `ooMia/oomia.github.io.knowledge`를 private canonical remote로 확정하고 stale한 “원격 없음” 문구 제거.
- GitHub Project README를 canonical 문서 링크 중심의 짧은 인덱스로 축소하는 템플릿 추가.
- 설계 정의 Item은 canonical 문서의 immutable permalink를 Evidence로 사용할 수 있다는 규칙을 명시.
- engine/docs/site의 실제 main revision을 검증해 1.0 Implementation Map을 최초 작성.
- 최초 1.0 capability 판정을 기록. 이후 상태 변경은 최신 Implementation Map을 우선한다.
