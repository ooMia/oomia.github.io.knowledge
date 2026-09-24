# Open Questions / Verification Gaps

현재 canonical 정책에서 **제품 경계·release acceptance·공통 Project 운영 수준에서 실제 결정이 필요한 항목**만 유지한다. 구현 repository가 code로 결정할 수 있는 세부사항은 이 목록에 올리지 않는다.

| ID | 항목 | 현재 처리 |
|---|---|---|
| Q003 | 1.0 final release gate | 새 canonical Docs → Site vertical slice의 실제 acceptance/Evidence chain이 확보된 뒤 구체화 |
| Q006 | Status 옵션 및 계획 Item의 Objective/Target Release 빈 값 허용 규칙 | Project 운영상 실제 불편이 확인될 때 확정 |
| Q007 | Work Type Validation 추가 | 보류. 현재 기본값 유지 |
| Q010 | 미디어 공개 범위·asset 저장 정책 | public/private와 large/binary policy가 제품 운영에 필요해질 때 결정 |
| Q014 | raw HTML 및 executable MDX public publish policy | public publish security boundary가 필요해질 때 결정 |
| Q025 | stable document identity / sidecar linkage | path-independent identity가 제품 수준 요구가 될 때 결정 |

## Knowledge-level Open Question이 아닌 것

다음은 책임 구현 repository와 code가 결정한다.

- Obsidian/Fumadocs/기타 editor 중 어떤 구현을 사용하는지
- editor를 Site 내부 app으로 둘지 별도 app으로 둘지
- docs layout / consumer discovery convention
- 지원 component 종류·props·children model
- component manifest/catalog 존재 여부와 editor adapter 형식
- Site의 Astro/Fumadocs integration 방식과 Turbo retirement
- Engine container/runtime, workspace mount, Git credential 방식
- metadata field 추가 시점, timestamp 계산, prepare input surface, formatting/normalization
- 구현 package/module boundary와 내부 API

여러 repository가 같은 component를 사용해야 하면 가능한 한 동일 package/codebase를 소비한다. editor integration이 별도 형식의 metadata를 요구해도 그 adapter는 owning implementation에서 관리하며 Knowledge가 별도 semantics 원본을 만들지 않는다.

구현 과정에서 반복되는 제약이 실제 제품 또는 cross-repository coordination 문제로 승격될 때만 새 Knowledge decision을 만든다.
