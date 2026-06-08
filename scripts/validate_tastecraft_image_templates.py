#!/usr/bin/env python3
"""Validate TasteCraft Image template assets."""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Optional


SCHEMA_VERSION = "1.0"
REQUIRED_TEMPLATE_FIELDS = (
    "id",
    "name_zh",
    "name_en",
    "status",
    "use_case_zh",
    "use_case_en",
    "selection_signals",
    "art_direction_zh",
    "art_direction_en",
    "composition_zh",
    "composition_en",
    "color_rules_zh",
    "color_rules_en",
    "palette",
    "avoid",
    "default_density_fit",
)
REQUIRED_STRING_FIELDS = (
    "id",
    "name_zh",
    "name_en",
    "use_case_zh",
    "use_case_en",
    "art_direction_zh",
    "art_direction_en",
    "composition_zh",
    "composition_en",
    "color_rules_zh",
    "color_rules_en",
    "default_density_fit",
)
PALETTE_KEYS = (
    "background",
    "surface",
    "text",
    "muted_text",
    "primary",
    "secondary",
    "accent",
)
CUSTOM_ALLOWED_STATUSES = ("draft", "tested", "built_in_candidate")
HEX_COLOR_RE = re.compile(r"^#[0-9A-Fa-f]{6}$")


@dataclass
class ValidationResult:
    errors: list[str]
    warnings: list[str]


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def load_json(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as handle:
        payload = json.load(handle)
    if not isinstance(payload, dict):
        raise ValueError(f"{path} must contain a JSON object")
    return payload


def is_hex_color(value: Any) -> bool:
    return isinstance(value, str) and bool(HEX_COLOR_RE.fullmatch(value))


def validate_document(path: Path) -> tuple[Optional[dict[str, Any]], list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []

    if not path.exists():
        return None, [f"{path} is missing"], warnings

    try:
        payload = load_json(path)
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        return None, [f"{path} is not valid template JSON: {exc}"], warnings

    schema_version = payload.get("schema_version")
    if schema_version != SCHEMA_VERSION:
        errors.append(f"{path.name} schema_version must be {SCHEMA_VERSION!r}")

    templates = payload.get("templates")
    if not isinstance(templates, list):
        errors.append(f"{path.name} templates must be a list")

    return payload, errors, warnings


def validate_palette(template: dict[str, Any], source_name: str, index: int) -> list[str]:
    errors: list[str] = []
    palette = template.get("palette")

    if not isinstance(palette, dict):
        errors.append(f"{source_name}[{index}] palette must be an object")
        return errors

    for key in PALETTE_KEYS:
        if key not in palette:
            errors.append(f"{source_name}[{index}] palette missing required color {key}")
        elif not is_hex_color(palette[key]):
            errors.append(f"{source_name}[{index}] palette.{key} must be #RRGGBB")

    return errors


def validate_template(template: Any, source_name: str, index: int, custom: bool) -> ValidationResult:
    errors: list[str] = []
    warnings: list[str] = []

    if not isinstance(template, dict):
        return ValidationResult([f"{source_name}[{index}] must be an object"], warnings)

    for field in REQUIRED_TEMPLATE_FIELDS:
        if field not in template:
            errors.append(f"{source_name}[{index}] missing required field {field}")

    for field in REQUIRED_STRING_FIELDS:
        if field in template and not (isinstance(template[field], str) and template[field].strip()):
            errors.append(f"{source_name}[{index}] {field} must be a non-empty string")

    template_id = template.get("id")
    name_zh = template.get("name_zh")
    if isinstance(template_id, str) and isinstance(name_zh, str) and template_id in name_zh:
        errors.append(f"{source_name}[{index}] name_zh must not contain internal id {template_id!r}")

    status = template.get("status")
    if custom:
        if status not in CUSTOM_ALLOWED_STATUSES:
            errors.append(
                f"{source_name}[{index}] custom template status must be one of {', '.join(CUSTOM_ALLOWED_STATUSES)}"
            )
    elif status != "built_in":
        errors.append(f"{source_name}[{index}] built-in template status must be built_in")

    selection_signals = template.get("selection_signals")
    if "selection_signals" in template:
        if not isinstance(selection_signals, list):
            errors.append(f"{source_name}[{index}] selection_signals must be a list")
        elif len(selection_signals) < 2:
            errors.append(f"{source_name}[{index}] selection_signals must contain at least 2 items")

    avoid = template.get("avoid")
    if "avoid" in template and not isinstance(avoid, list):
        errors.append(f"{source_name}[{index}] avoid must be a list")

    if "palette" in template:
        errors.extend(validate_palette(template, source_name, index))

    return ValidationResult(errors, warnings)


def validate_repo(root: Path) -> ValidationResult:
    asset_dir = root / "assets" / "tastecraft-image"
    sources = (
        (asset_dir / "templates.json", False),
        (asset_dir / "custom-templates.json", True),
    )
    errors: list[str] = []
    warnings: list[str] = []
    seen_ids: dict[str, str] = {}

    for path, custom in sources:
        payload, document_errors, document_warnings = validate_document(path)
        errors.extend(document_errors)
        warnings.extend(document_warnings)
        if payload is None or not isinstance(payload.get("templates"), list):
            continue

        source_name = path.name
        for index, template in enumerate(payload["templates"]):
            result = validate_template(template, source_name, index, custom=custom)
            errors.extend(result.errors)
            warnings.extend(result.warnings)

            if isinstance(template, dict):
                template_id = template.get("id")
                if isinstance(template_id, str) and template_id:
                    if template_id in seen_ids:
                        errors.append(
                            f"{source_name}[{index}] duplicate id {template_id!r}; first seen in {seen_ids[template_id]}"
                        )
                    else:
                        seen_ids[template_id] = f"{source_name}[{index}]"

    return ValidationResult(errors, warnings)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    parser.add_argument("--strict", action="store_true", help="Treat warnings as failures")
    return parser


def main(argv: Optional[list[str]] = None) -> int:
    args = build_parser().parse_args(argv)
    result = validate_repo(args.root.resolve())

    for warning in result.warnings:
        print(f"WARN: {warning}")
    for error in result.errors:
        print(f"ERROR: {error}")

    if result.errors or (args.strict and result.warnings):
        print(f"FAIL: {len(result.errors)} error(s), {len(result.warnings)} warning(s)", file=sys.stderr)
        return 1

    print(f"PASS: tastecraft-image templates valid with {len(result.warnings)} warning(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
