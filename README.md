# Publishing Platform Knowledge

Publishing Platform의 **PM/coordination repository**다. 공통 workflow·개발 기준·통합 목표·acceptance·Evidence linkage와 구현 repository의 원본 참조 경로를 관리한다.

[CONTEXT.md](CONTEXT.md)를 Agent/Chat 작업의 canonical entry point로 사용한다. 현재 작업 유형에 맞는 최소한의 원본만 따라가며, 기술 설계와 실제 supported schema/component/API는 구현 repository의 code/docs가 소유한다.

## 사용과 수정

- 작업 이어받기: [Current Handoff](handoff/current.md)
- 제품 경계: [Architecture](docs/architecture.md)
- 통합 목표: [Release 1.0](docs/release-1.0.md)
- 검수 연결: [Implementation Map](docs/implementation-map.md)
- 공통 branch·PR·release 전략: [Git Workflow](docs/git-workflow.md)
- 문서 수정·검증: [CONTRIBUTING](CONTRIBUTING.md)
- 실제 제품/coordination 미결: [Open Questions](docs/open-questions.md)
- Chat 첨부물: `python3 scripts/bundle.py`로 생성하는 [CONTEXT-BUNDLE.md](dist/CONTEXT-BUNDLE.md)

GitHub Project의 실제 상태와 구현 Evidence를 문서의 설계와 혼동하지 않는다. 과거 설계의 지속 가치가 있는 맥락은 Architecture Transition과 owning repository의 migration 기록에서 추적한다.
