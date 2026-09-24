# Publishing Platform Knowledge

Chat/Agent에서 반복하는 작업의 일관성을 위한 공통 workflow·coordination·개발 지침과 원본 문서의 참조 경로를 관리한다.

[CONTEXT.md](CONTEXT.md)에서 Issue 생성, PR, branch, release, scaffolding 등 수행할 작업을 골라 필요한 문서를 읽는다. 같은 디렉토리는 모든 레포에서 같은 역할을 가지며, 기술 설계는 구현 레포가 소유한다. 기준은 [Repository Design](docs/repository-design.md)에 있다.

## 사용과 수정

- 작업 이어받기: [Current Handoff](handoff/current.md)
- 공통 branch·PR·release 전략: [Git Workflow](docs/git-workflow.md)
- 문서 수정·검증: [CONTRIBUTING](CONTRIBUTING.md)
- Chat 첨부물: `python3 scripts/bundle.py`로 생성하는 [CONTEXT-BUNDLE.md](dist/CONTEXT-BUNDLE.md)
- 문서별 소유권 미결 사항: [Open Questions](docs/open-questions.md#문서-소유권-검토)

GitHub Project의 실제 상태와 구현 Evidence를 문서의 설계와 혼동하지 않는다. 기존 기술 문서는 이관 검토 중이며, 목적지 원본과 참조 전환이 준비되기 전까지 보존한다.

과거 상세 history는 `archive/main-before-cleanup-20260921` branch를 참고한다.
