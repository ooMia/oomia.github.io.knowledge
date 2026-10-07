#!/usr/bin/env python3
"""Build a deterministic Chat attachment from canonical Markdown documents."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
LINK_RE = re.compile(r'\[([^\]]+)\]\(([^)]+)\)')
ORDER = [
    'AGENTS.md', 'CONTEXT.md',
    'docs/agent-conventions.md', 'docs/change-protocol.md',
    'docs/architecture-transition.md', 'docs/architecture.md',
    'docs/development-toolchain.md', 'docs/repository-design.md',
    'docs/implementation-practices.md', 'docs/maintenance.md',
    'docs/planning-model.md', 'docs/fields.md', 'docs/work-classification.md',
    'docs/git-workflow.md',
    'docs/project-orchestration.md', 'docs/release-1.0.md',
]

def iter_markdown_files():
    for path in sorted(ROOT.rglob('*.md')):
        if '.git' in path.parts or 'dist' in path.parts:
            continue
        yield path

def resolve_local_target(path, target):
    if re.match(r'[a-zA-Z]+:', target) or target.startswith('#'):
        return None
    local = target.split('#')[0]
    if not local:
        return path.resolve()
    return (path.parent / local).resolve()

def check_local_links():
    errors = []
    bundle_path = (ROOT / 'dist/CONTEXT-BUNDLE.md').resolve()
    for path in iter_markdown_files():
        for _, target in LINK_RE.findall(path.read_text(encoding='utf-8')):
            destination = resolve_local_target(path, target)
            if destination is None or destination == bundle_path:
                continue
            if not destination.exists():
                errors.append(f'{path.relative_to(ROOT)}: missing {target}')
    return errors

def main():
    errors = check_local_links()
    if errors:
        raise SystemExit('\n'.join(errors))

    parts = ['# Publishing Platform — Chat Context Bundle\n\n'
             'GENERATED TRANSPORT SNAPSHOT — canonical 원본은 각 source 경계에 적힌 repository path입니다. 직접 수정하지 마세요.\n'
             'Repository source에 접근할 수 있으면 CONTEXT.md routing과 canonical owner를 직접 사용하세요. 이 bundle은 routing이나 live Project/Issue/PR state를 대체하지 않습니다.\n'
             'AGENTS.md는 pre-routing guard를, CONTEXT.md는 semantic routing을 제공합니다. Repository browsing용 README와 operational config/template/schema는 bundle에 복제하지 않습니다.\n'
             'Bundle 밖 operational artifact의 exact lookup은 문서에 적힌 owning repository URL을 사용합니다.\n'
             'Completed release/migration RECORD는 명시된 immutable Evidence scope에만 적용되며 current live state를 대체하지 않습니다.\n']
    for name in ORDER:
        content = (ROOT / name).read_text(encoding='utf-8')
        def rewrite(match):
            label, target = match.groups()
            if re.match(r'[a-zA-Z]+:', target) or target.startswith('#'):
                return match.group(0)
            relative = (ROOT / name).parent / target.split('#')[0]
            canonical = relative.resolve().relative_to(ROOT.resolve())
            return f'{label} (`{canonical}`)'
        content = LINK_RE.sub(rewrite, content)
        parts.append(f'\n---\n\n<!-- BEGIN SOURCE: {name} -->\n\n{content}\n<!-- END SOURCE: {name} -->\n')

    out = ROOT / 'dist/CONTEXT-BUNDLE.md'
    out.parent.mkdir(exist_ok=True)
    with out.open('w', encoding='utf-8', newline='\n') as stream:
        stream.write('\n'.join(parts))
    print(f'Checked local document links; bundled {len(ORDER)} source documents into {out.relative_to(ROOT)}')

if __name__ == '__main__':
    main()
