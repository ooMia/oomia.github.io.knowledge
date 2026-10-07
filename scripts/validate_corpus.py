#!/usr/bin/env python3
"""Validate the canonical Knowledge corpus and bundle routing boundary."""
from pathlib import Path
import re

from bundle import LINK_RE, ORDER, ROOT, check_local_links, resolve_local_target

VALID_AUTHORITIES = {'POLICY', 'GUIDANCE', 'REFERENCE', 'RECORD'}
ROOT_CANONICAL = ['README.md', 'AGENTS.md', 'CONTEXT.md']
RETIRED = {
    'docs/implementation-map.md',
    'docs/operating-rhythm.md',
    'docs/open-questions.md',
}
HEADER_RE = re.compile(r'^> \*\*(Authority|Owner|Scope|Read when|Enforced by|Source of truth|Evidence scope):\*\*\s*(.*?)\s*$')
OPTIONAL_OWNER = {
    'Enforced by': 'POLICY',
    'Source of truth': 'REFERENCE',
    'Evidence scope': 'RECORD',
}

def canonical_paths():
    docs = sorted(str(path.relative_to(ROOT)) for path in (ROOT / 'docs').glob('*.md'))
    return ROOT_CANONICAL + docs

def parse_header(path):
    lines = (ROOT / path).read_text(encoding='utf-8').splitlines()
    errors = []
    if not lines or not lines[0].startswith('# '):
        return {}, [f'{path}: missing H1 title']

    fields = {}
    for line in lines[1:12]:
        if not line.startswith('> '):
            if fields:
                break
            continue
        match = HEADER_RE.match(line.rstrip())
        if not match:
            errors.append(f'{path}: invalid semantic-header line: {line}')
            continue
        key, value = match.groups()
        if key in fields:
            errors.append(f'{path}: duplicate semantic-header field {key}')
        fields[key] = value

    for key in ('Authority', 'Owner', 'Scope', 'Read when'):
        if not fields.get(key):
            errors.append(f'{path}: missing semantic-header field {key}')

    authority = fields.get('Authority')
    if authority and authority not in VALID_AUTHORITIES:
        errors.append(f'{path}: invalid Authority {authority}')

    for key, owner in OPTIONAL_OWNER.items():
        if key in fields and authority != owner:
            errors.append(f'{path}: {key} is not valid for Authority {authority}')

    return fields, errors

def check_retired_references(paths):
    errors = []
    for path in paths:
        text = (ROOT / path).read_text(encoding='utf-8')
        for retired in RETIRED:
            if retired in text or Path(retired).name in text:
                errors.append(f'{path}: references retired source {retired}')
    return errors

def check_bundle_boundary(paths):
    errors = []
    order_set = set(ORDER)
    canonical_set = set(paths)

    if len(ORDER) != len(order_set):
        errors.append('scripts/bundle.py: duplicate bundle source')
    for required in ('AGENTS.md', 'CONTEXT.md'):
        if required not in order_set:
            errors.append(f'scripts/bundle.py: bundle must include {required}')
    if 'README.md' in order_set:
        errors.append('scripts/bundle.py: README.md is a repository landing and must stay outside the context bundle')

    for name in ORDER:
        if name not in canonical_set:
            errors.append(f'scripts/bundle.py: non-canonical or missing bundle source {name}')
            continue
        source = ROOT / name
        for _, target in LINK_RE.findall(source.read_text(encoding='utf-8')):
            destination = resolve_local_target(source, target)
            if destination is None:
                continue
            try:
                resolved = str(destination.relative_to(ROOT))
            except ValueError:
                errors.append(f'{name}: relative link escapes repository: {target}')
                continue
            if resolved not in order_set:
                errors.append(
                    f'{name}: bundle-local route {target} resolves outside bundle source set; '
                    'use an explicit owning-repository URL for operational artifacts'
                )
    return errors

def main():
    paths = canonical_paths()
    errors = []

    for path in paths:
        _, header_errors = parse_header(path)
        errors.extend(header_errors)

    errors.extend(check_retired_references(paths))
    errors.extend(check_local_links())
    errors.extend(check_bundle_boundary(paths))

    if errors:
        raise SystemExit('\n'.join(errors))

    counts = {authority: 0 for authority in sorted(VALID_AUTHORITIES)}
    for path in paths:
        fields, _ = parse_header(path)
        counts[fields['Authority']] += 1

    print(
        f'Validated {len(paths)} canonical documents; '
        f'Authorities={counts}; bundle_sources={len(ORDER)}; '
        'retired_refs=0; local_links=ok; bundle_routing=closed'
    )

if __name__ == '__main__':
    main()
