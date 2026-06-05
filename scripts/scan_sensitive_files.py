#!/usr/bin/env python3
"""Scan the repository for files or content unsafe for public release."""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from pathlib import Path


SKIP_DIRS = {
    ".git",
    ".mypy_cache",
    ".pytest_cache",
    ".ruff_cache",
    "__pycache__",
    "dist",
    "node_modules",
    "outputs",
    "tmp",
}

SENSITIVE_NAME_PATTERNS = [
    re.compile(r"(^|/)\.env(\.|$)"),
    re.compile(r"\.(?:key|pem|p12|token|secret)$", re.IGNORECASE),
    re.compile(r"(^|/)(?:id_rsa|id_dsa|id_ecdsa|id_ed25519)$"),
]

CONTENT_PATTERNS = [
    ("private key block", re.compile(rb"-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----")),
    ("github token", re.compile(rb"(?:github_pat_|gh[pousr]_)[A-Za-z0-9_]{20,}")),
    ("api key", re.compile(rb"\bsk-[A-Za-z0-9]{32,}")),
    ("aws access key", re.compile(rb"\bAKIA[0-9A-Z]{16}\b")),
    (
        "secret assignment",
        re.compile(rb"(?i)\b(?:api[_-]?key|secret|token|password)\b\s*[:=]\s*['\"]?[A-Za-z0-9_./+=-]{16,}"),
    ),
]


@dataclass(frozen=True)
class Finding:
    path: Path
    reason: str
    severity: str


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def should_skip(path: Path, root: Path, include_generated: bool) -> bool:
    rel = path.relative_to(root)
    for part in rel.parts:
        if part in SKIP_DIRS and (include_generated or part != "dist"):
            return True
        if not include_generated and part == "dist":
            return True
    return False


def is_probably_binary(data: bytes) -> bool:
    if b"\x00" in data:
        return True
    if not data:
        return False
    sample = data[:4096]
    non_text = sum(1 for byte in sample if byte < 9 or (13 < byte < 32))
    return non_text / len(sample) > 0.20


def iter_files(root: Path, include_generated: bool) -> list[Path]:
    files: list[Path] = []
    for path in root.rglob("*"):
        if path.is_dir():
            continue
        try:
            path.relative_to(root)
        except ValueError:
            continue
        if should_skip(path, root, include_generated):
            continue
        files.append(path)
    return sorted(files)


def scan_file(path: Path, root: Path, max_bytes: int) -> list[Finding]:
    findings: list[Finding] = []
    rel = path.relative_to(root)
    rel_text = rel.as_posix()

    for pattern in SENSITIVE_NAME_PATTERNS:
        if pattern.search(rel_text):
            findings.append(Finding(path, "sensitive filename pattern", "error"))
            break

    try:
        data = path.read_bytes()
    except OSError as exc:
        findings.append(Finding(path, f"could not read file: {exc}", "warning"))
        return findings

    if is_probably_binary(data):
        return findings

    sample = data[:max_bytes]
    for label, pattern in CONTENT_PATTERNS:
        if pattern.search(sample):
            findings.append(Finding(path, f"sensitive content pattern: {label}", "error"))
    return findings


def scan(root: Path, include_generated: bool = False, max_bytes: int = 1_000_000) -> list[Finding]:
    findings: list[Finding] = []
    for path in iter_files(root, include_generated):
        findings.extend(scan_file(path, root, max_bytes))
    return findings


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    parser.add_argument("--include-generated", action="store_true", help="Also scan generated dist files")
    parser.add_argument("--max-bytes", type=int, default=1_000_000, help="Maximum bytes to inspect per text file")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    root = args.root.resolve()
    findings = scan(root, include_generated=args.include_generated, max_bytes=args.max_bytes)
    errors = [finding for finding in findings if finding.severity == "error"]

    for finding in findings:
        rel_path = finding.path.relative_to(root) if finding.path.is_relative_to(root) else finding.path
        print(f"{finding.severity.upper()}: {rel_path}: {finding.reason}")

    if errors:
        print(f"FAIL: found {len(errors)} sensitive file issue(s)", file=sys.stderr)
        return 1
    print(f"PASS: scanned {len(iter_files(root, args.include_generated))} file(s); no sensitive content found")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
