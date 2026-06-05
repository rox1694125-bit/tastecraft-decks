#!/usr/bin/env python3
"""Check TasteCraft reference directories and repo-local file references."""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import urlparse


LOCAL_REF_RE = re.compile(
    r"`([^`\n]+\.(?:md|json|yaml|yml|html|css|js))`|\[[^\]\n]+\]\(([^)\n]+)\)"
)
VALIDATED_PREFIXES = ("assets/", "demo/", "docs/", "references/", "schema/", "skills/")
SOURCE_GLOBS = ("*.md",)
LOGICAL_FILENAMES = {"tastecraft.deck.json", "prompt-pack.json"}


@dataclass
class ReferenceCheck:
    source: Path
    target: str
    severity: str
    message: str


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def is_url(target: str) -> bool:
    parsed = urlparse(target)
    return parsed.scheme in {"http", "https", "mailto"}


def normalize_target(raw_target: str) -> str | None:
    target = raw_target.strip()
    if not target or target.startswith("#") or is_url(target):
        return None
    target = target.split("#", 1)[0]
    target = target.split("?", 1)[0]
    if not target:
        return None
    if target in LOGICAL_FILENAMES:
        return None
    return target


def source_files(root: Path) -> list[Path]:
    candidates: list[Path] = []
    for path in [root / "PROJECT_STATUS.md", root / "CHANGELOG.md"]:
        if path.exists():
            candidates.append(path)
    for directory in (root / "docs", root / "skills", root / "references"):
        if directory.exists():
            for pattern in SOURCE_GLOBS:
                candidates.extend(directory.rglob(pattern))
    return sorted(set(candidates))


def iter_references(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8")
    refs: list[str] = []
    for match in LOCAL_REF_RE.finditer(text):
        target = match.group(1) or match.group(2)
        normalized = normalize_target(target)
        if normalized:
            refs.append(normalized)
    return refs


def resolve_reference(root: Path, source: Path, target: str) -> Path:
    if target.startswith("/"):
        return root / target.lstrip("/")
    if target.startswith(VALIDATED_PREFIXES) or target in {"README.md", "LICENSE", "CHANGELOG.md", "PROJECT_STATUS.md"}:
        return root / target
    return source.parent / target


def check_references(root: Path) -> tuple[list[ReferenceCheck], list[str]]:
    checks: list[ReferenceCheck] = []
    warnings: list[str] = []

    references_dir = root / "references"
    if not references_dir.exists():
        checks.append(
            ReferenceCheck(references_dir, "references/", "error", "references directory is missing")
        )
    else:
        reference_files = [path for path in references_dir.rglob("*") if path.is_file()]
        if not reference_files:
            warnings.append("references/ exists but has no files yet")
        for path in reference_files:
            text = path.read_text(encoding="utf-8", errors="replace")
            if "TODO" in text or "[TODO" in text:
                rel_path = path.relative_to(root) if path.is_relative_to(root) else path
                warnings.append(f"{rel_path} still contains TODO placeholder text")

    for source in source_files(root):
        for target in iter_references(source):
            resolved = resolve_reference(root, source, target)
            if not resolved.exists():
                checks.append(
                    ReferenceCheck(
                        source,
                        target,
                        "warning",
                        f"referenced file does not exist: {target}",
                    )
                )

    return checks, warnings


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    parser.add_argument("--strict", action="store_true", help="Treat warnings as failures")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    root = args.root.resolve()
    checks, warnings = check_references(root)

    errors = [check for check in checks if check.severity == "error"]
    soft = [check for check in checks if check.severity == "warning"]

    for warning in warnings:
        print(f"WARN: {warning}")
    for check in checks:
        source = check.source.relative_to(root) if check.source.is_relative_to(root) else check.source
        print(f"{check.severity.upper()}: {source}: {check.message}")

    warning_count = len(warnings) + len(soft)
    if errors or (args.strict and warning_count):
        print(f"FAIL: {len(errors)} error(s), {warning_count} warning(s)", file=sys.stderr)
        return 1
    print(f"PASS: reference check completed with {warning_count} warning(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
