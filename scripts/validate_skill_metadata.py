#!/usr/bin/env python3
"""Validate TasteCraft skill front matter and OpenAI agent metadata."""

from __future__ import annotations

import argparse
import sys
from dataclasses import dataclass
from pathlib import Path


REQUIRED_FRONT_MATTER = ("name", "description")
REQUIRED_AGENT_INTERFACE = ("display_name", "short_description", "default_prompt")


@dataclass
class SkillCheck:
    name: str
    path: Path
    errors: list[str]
    warnings: list[str]


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def strip_quotes(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {"'", '"'}:
        return value[1:-1]
    return value


def parse_front_matter(path: Path) -> tuple[dict[str, str], list[str]]:
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return {}, ["SKILL.md must start with YAML-style front matter"]

    try:
        end_index = next(index for index, line in enumerate(lines[1:], start=1) if line.strip() == "---")
    except StopIteration:
        return {}, ["front matter is not closed with ---"]

    metadata: dict[str, str] = {}
    errors: list[str] = []
    for line_number, line in enumerate(lines[1:end_index], start=2):
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if ":" not in line:
            errors.append(f"front matter line {line_number} is not key: value")
            continue
        key, value = line.split(":", 1)
        key = key.strip()
        if not key:
            errors.append(f"front matter line {line_number} has an empty key")
            continue
        metadata[key] = strip_quotes(value)
    return metadata, errors


def parse_openai_agent(path: Path) -> tuple[dict[str, str], list[str]]:
    if not path.exists():
        return {}, ["agents/openai.yaml is missing"]

    metadata: dict[str, str] = {}
    errors: list[str] = []
    in_interface = False

    for line_number, raw_line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
        line = raw_line.rstrip()
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if line.strip() == "interface:":
            in_interface = True
            continue
        if not in_interface:
            continue
        if not raw_line.startswith("  "):
            in_interface = False
            continue
        stripped = line.strip()
        if ":" not in stripped:
            errors.append(f"agents/openai.yaml line {line_number} is not key: value")
            continue
        key, value = stripped.split(":", 1)
        metadata[key.strip()] = strip_quotes(value)

    if not metadata:
        errors.append("agents/openai.yaml must define an interface block")
    return metadata, errors


def check_skill(skill_dir: Path) -> SkillCheck:
    errors: list[str] = []
    warnings: list[str] = []
    skill_md = skill_dir / "SKILL.md"

    if not skill_md.exists():
        return SkillCheck(skill_dir.name, skill_dir, ["SKILL.md is missing"], [])

    front_matter, front_errors = parse_front_matter(skill_md)
    errors.extend(front_errors)

    for key in REQUIRED_FRONT_MATTER:
        value = front_matter.get(key, "").strip()
        if not value:
            errors.append(f"front matter field {key!r} is required")

    declared_name = front_matter.get("name", "").strip()
    if declared_name and declared_name != skill_dir.name:
        errors.append(f"front matter name {declared_name!r} must match directory {skill_dir.name!r}")

    description = front_matter.get("description", "").strip()
    if description:
        if "TODO" in description or "[TODO" in description:
            warnings.append("description still contains TODO placeholder text")
        if len(description) < 40:
            warnings.append("description is short; include trigger scenarios when the skill content is finalized")

    agent_metadata, agent_errors = parse_openai_agent(skill_dir / "agents" / "openai.yaml")
    errors.extend(agent_errors)
    for key in REQUIRED_AGENT_INTERFACE:
        value = agent_metadata.get(key, "").strip()
        if not value:
            errors.append(f"agents/openai.yaml interface field {key!r} is required")

    return SkillCheck(declared_name or skill_dir.name, skill_dir, errors, warnings)


def discover_skills(root: Path) -> list[Path]:
    skills_dir = root / "skills"
    if not skills_dir.exists():
        return []
    return sorted(path for path in skills_dir.iterdir() if path.is_dir())


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    parser.add_argument("--strict", action="store_true", help="Treat warnings as failures")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    root = args.root.resolve()
    skill_dirs = discover_skills(root)

    if not skill_dirs:
        print("FAIL: no skills found", file=sys.stderr)
        return 1

    checks = [check_skill(path) for path in skill_dirs]
    seen_names: dict[str, Path] = {}
    duplicate_errors: list[str] = []
    for check in checks:
        if check.name in seen_names:
            duplicate_errors.append(
                f"duplicate skill name {check.name!r}: {seen_names[check.name]} and {check.path}"
            )
        else:
            seen_names[check.name] = check.path

    errors = sum(len(check.errors) for check in checks) + len(duplicate_errors)
    warnings = sum(len(check.warnings) for check in checks)

    for check in checks:
        rel_path = check.path.relative_to(root) if check.path.is_relative_to(root) else check.path
        status = "FAIL" if check.errors else "PASS"
        print(f"{status}: {rel_path}")
        for error in check.errors:
            print(f"  - ERROR: {error}")
        for warning in check.warnings:
            print(f"  - WARN: {warning}")
    for error in duplicate_errors:
        print(f"FAIL: {error}")

    if errors or (args.strict and warnings):
        print(f"FAIL: {errors} error(s), {warnings} warning(s)", file=sys.stderr)
        return 1
    print(f"PASS: validated {len(checks)} skill metadata file(s) with {warnings} warning(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
