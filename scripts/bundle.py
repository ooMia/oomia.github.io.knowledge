#!/usr/bin/env python3
"""Build a deterministic Chat attachment from canonical Markdown documents."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
ORDER = [
    'CONTEXT.md', 'docs/architecture.md', 'docs/content-authoring-contract.md',
    'docs/content-component-schema.md', 'docs/planning-model.md',
    'docs/fields.md', 'docs/release-1.0.md', 'docs/implementation-map.md',
    'docs/operating-rhythm.md', 'docs/decisions.md', 'docs/open-questions.md',
    'CONTRIBUTING.md', 'provenance/README.md',
]

def main():
    errors = []
    for path in ROOT.rglob('*.md'):
        if '.git' in path.parts or 'dist' in path.parts:
            continue
        for target in re.findall(r'\]\(([^)]+)\)', path.read_text()):
            if re.match(r'[a-zA-Z]+:', target) or target.startswith('#'):
                continue
            destination = (path.parent / target.split('#')[0]).resolve()
            if destination == (ROOT / 'dist/CONTEXT-BUNDLE.md').resolve():
                continue
            if not destination.exists():
                errors.append(f'{path.relative_to(ROOT)}: missing {target}')
    if errors:
        raise SystemExit('\n'.join(errors))
    parts = ['# Publishing Platform — Chat Context Bundle\n\n'
             'GENERATED FILE — 원본은 각 문서 경계에 적힌 경로입니다. 직접 수정하지 마세요.\n'
             '생성 기준일: 2026-09-20. Implementation Map은 문서에 적힌 repository revision의 검증 스냅샷이며 live Project 상태가 아닙니다.\n'
             '상대 링크는 원본 레포 기준입니다. JSON Schema, 템플릿과 대화 원문 아카이브는 별도로 참조합니다.\n']
    for name in ORDER:
        content = (ROOT / name).read_text()
        def rewrite(match):
            label, target = match.groups()
            if re.match(r'[a-zA-Z]+:', target) or target.startswith('#'):
                return match.group(0)
            relative = (ROOT / name).parent / target.split('#')[0]
            canonical = relative.resolve().relative_to(ROOT.resolve())
            return f'{label} (`{canonical}`)'
        content = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', rewrite, content)
        parts.append(f'\n---\n\n<!-- BEGIN SOURCE: {name} -->\n\n{content}\n<!-- END SOURCE: {name} -->\n')
    out = ROOT / 'dist/CONTEXT-BUNDLE.md'
    out.parent.mkdir(exist_ok=True)
    out.write_text('\n'.join(parts))
    print(f'Checked local document links; bundled {len(ORDER)} source documents into {out.relative_to(ROOT)}')

if __name__ == '__main__':
    main()
