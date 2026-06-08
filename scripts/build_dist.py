#!/usr/bin/env python3
"""Build self-contained TasteCraft skill packages."""

from __future__ import annotations

import argparse
import json
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path


EXCLUDE_NAMES = {".DS_Store", "__pycache__", ".pytest_cache"}


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def copytree(src: Path, dst: Path) -> None:
    def ignore(_directory: str, names: list[str]) -> set[str]:
        return {name for name in names if name in EXCLUDE_NAMES or name.endswith(".pyc")}

    shutil.copytree(src, dst, dirs_exist_ok=True, ignore=ignore)


def copyfile(src: Path, dst: Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)


def is_nonempty_dir(path: Path) -> bool:
    return path.exists() and path.is_dir() and any(path.iterdir())


def safe_clean(target: Path, root: Path) -> None:
    resolved = target.resolve()
    root_resolved = root.resolve()
    if resolved == root_resolved:
        raise ValueError("refusing to clean repository root")
    if root_resolved in resolved.parents and "dist" not in resolved.parts:
        raise ValueError(f"refusing to clean non-dist path inside repository: {target}")
    if resolved.exists():
        shutil.rmtree(resolved)


def discover_skills(root: Path) -> list[Path]:
    skills_dir = root / "skills"
    if not skills_dir.exists():
        return []
    return sorted(path for path in skills_dir.iterdir() if path.is_dir() and (path / "SKILL.md").exists())


def build_packages(
    root: Path,
    dist_dir: Path,
    clean: bool = False,
    dry_run: bool = False,
    include_legacy: bool = False,
) -> dict[str, object]:
    skills = discover_skills(root)
    if not skills:
        raise ValueError("no skill directories with SKILL.md were found")
    if not include_legacy:
        primary = [path for path in skills if path.name == "tastecraft-image"]
        if primary:
            skills = primary

    if clean and not dry_run:
        safe_clean(dist_dir, root)
    if not dry_run:
        dist_dir.mkdir(parents=True, exist_ok=True)

    shared_dirs = [
        root / "references",
        root / "schema",
    ]
    console_dir = root / "assets" / "tastecraft-console"
    if is_nonempty_dir(console_dir):
        shared_dirs.append(console_dir)
    image_assets_dir = root / "assets" / "tastecraft-image"
    if is_nonempty_dir(image_assets_dir):
        shared_dirs.append(image_assets_dir)
    shared_files = [
        root / "scripts" / "tastecraft_image_log.py",
        root / "scripts" / "validate_tastecraft_image_templates.py",
    ]

    packages: list[dict[str, object]] = []
    for skill_dir in skills:
        package_dir = dist_dir / skill_dir.name
        copied: list[str] = [f"skills/{skill_dir.name}"]
        if not dry_run:
            copytree(skill_dir, package_dir)
        for shared_dir in shared_dirs:
            if not shared_dir.exists():
                continue
            target = package_dir / shared_dir.relative_to(root)
            if not dry_run:
                copytree(shared_dir, target)
            copied.append(str(shared_dir.relative_to(root)))
        for shared_file in shared_files:
            if not shared_file.exists():
                continue
            target = package_dir / shared_file.relative_to(root)
            if not dry_run:
                copyfile(shared_file, target)
            copied.append(str(shared_file.relative_to(root)))
        packages.append({"name": skill_dir.name, "path": str(package_dir), "included": copied})

    manifest = {
        "schema_version": "1.0",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "package_count": len(packages),
        "packages": packages,
    }
    if not dry_run:
        (dist_dir / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return manifest


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    parser.add_argument("--dist", type=Path, default=Path("dist/skills"), help="Output directory")
    parser.add_argument("--clean", action="store_true", help="Remove the output directory before building")
    parser.add_argument("--dry-run", action="store_true", help="Print planned packages without writing files")
    parser.add_argument("--include-legacy", action="store_true", help="Package all legacy skills instead of only tastecraft-image")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    root = args.root.resolve()
    dist_dir = args.dist if args.dist.is_absolute() else root / args.dist

    try:
        manifest = build_packages(
            root,
            dist_dir,
            clean=args.clean,
            dry_run=args.dry_run,
            include_legacy=args.include_legacy,
        )
    except (OSError, ValueError) as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        return 1

    action = "planned" if args.dry_run else "built"
    print(f"PASS: {action} {manifest['package_count']} skill package(s) in {dist_dir}")
    for package in manifest["packages"]:
        print(f"  - {package['name']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
