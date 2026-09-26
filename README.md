# Publishing Platform Knowledge

Publishing Platform의 **PM/coordination repository**다. 공통 workflow·개발 기준·통합 목표·acceptance·Evidence linkage와 구현 repository의 원본 참조 경로를 관리한다.

[CONTEXT.md](CONTEXT.md)에서 작업 유형에 맞는 원본을 찾는다. 기술 설계와 실제 supported schema/component/API는 구현 repository의 code/docs가 소유하며 Knowledge에 중복 복제하지 않는다.

## 사용과 수정

- 작업 이어받기: [Current Handoff](handoff/current.md)
- 제품 경계: [Architecture](docs/architecture.md)
- 통합 목표: [Release 1.0](docs/release-1.0.md)
- 검수 연결: [Implementation Map](docs/implementation-map.md)
- 공통 branch·PR·release 전략: [Git Workflow](docs/git-workflow.md)
- 문서 수정·검증: [CONTRIBUTING](CONTRIBUTING.md)
- 실제 제품/coordination 미결: [Open Questions](docs/open-questions.md)
- Chat 첨부물: `python3 scripts/bundle.py`로 생성하는 [CONTEXT-BUNDLE.md](dist/CONTEXT-BUNDLE.md)

GitHub Project의 실제 상태와 구현 Evidence를 문서의 설계와 혼동하지 않는다. 과거 상세 설계와 삭제된 compatibility 문서는 Git history 또는 `archive/main-before-cleanup-20260921`에서 조사한다.
