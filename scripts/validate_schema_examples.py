#!/usr/bin/env python3
"""Validate demo JSON examples against the TasteCraft schemas.

This script intentionally implements the small JSON Schema subset used by this
repository so it can run on Python's standard library alone.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any


@dataclass(frozen=True)
class ExampleResult:
    path: Path
    schema_name: str
    errors: list[str]


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def load_json(path: Path) -> Any:
    try:
        with path.open("r", encoding="utf-8") as handle:
            return json.load(handle)
    except json.JSONDecodeError as exc:
        raise ValueError(f"{path}: invalid JSON at line {exc.lineno}, column {exc.colno}: {exc.msg}") from exc


def format_path(parts: list[str]) -> str:
    if not parts:
        return "$"
    rendered = "$"
    for part in parts:
        if part.startswith("["):
            rendered += part
        else:
            rendered += f".{part}"
    return rendered


def json_type(value: Any) -> str:
    if value is None:
        return "null"
    if isinstance(value, bool):
        return "boolean"
    if isinstance(value, int):
        return "integer"
    if isinstance(value, float):
        return "number"
    if isinstance(value, str):
        return "string"
    if isinstance(value, list):
        return "array"
    if isinstance(value, dict):
        return "object"
    return type(value).__name__


def type_matches(value: Any, expected: str) -> bool:
    if expected == "null":
        return value is None
    if expected == "boolean":
        return isinstance(value, bool)
    if expected == "integer":
        return isinstance(value, int) and not isinstance(value, bool)
    if expected == "number":
        return (isinstance(value, int) or isinstance(value, float)) and not isinstance(value, bool)
    if expected == "string":
        return isinstance(value, str)
    if expected == "array":
        return isinstance(value, list)
    if expected == "object":
        return isinstance(value, dict)
    return True


def validate_instance(instance: Any, schema: dict[str, Any], path: list[str] | None = None) -> list[str]:
    """Return JSON Schema validation errors for the schema subset used here."""

    path = path or []
    errors: list[str] = []
    location = format_path(path)

    expected_type = schema.get("type")
    if expected_type is not None:
        expected_types = expected_type if isinstance(expected_type, list) else [expected_type]
        if not any(type_matches(instance, item) for item in expected_types):
            return [f"{location}: expected {expected_types}, got {json_type(instance)}"]

    if "const" in schema and instance != schema["const"]:
        errors.append(f"{location}: expected constant {schema['const']!r}, got {instance!r}")

    if "enum" in schema and instance not in schema["enum"]:
        errors.append(f"{location}: expected one of {schema['enum']!r}, got {instance!r}")

    if isinstance(instance, str):
        if "minLength" in schema and len(instance) < int(schema["minLength"]):
            errors.append(f"{location}: string length is below minLength {schema['minLength']}")
        if "pattern" in schema:
            if re.fullmatch(str(schema["pattern"]), instance) is None:
                errors.append(f"{location}: value {instance!r} does not match pattern {schema['pattern']!r}")

    if isinstance(instance, int) and not isinstance(instance, bool):
        if "minimum" in schema and instance < schema["minimum"]:
            errors.append(f"{location}: value {instance!r} is below minimum {schema['minimum']!r}")
        if "maximum" in schema and instance > schema["maximum"]:
            errors.append(f"{location}: value {instance!r} is above maximum {schema['maximum']!r}")

    if isinstance(instance, list):
        if "minItems" in schema and len(instance) < int(schema["minItems"]):
            errors.append(f"{location}: array length is below minItems {schema['minItems']}")
        item_schema = schema.get("items")
        if isinstance(item_schema, dict):
            for index, item in enumerate(instance):
                errors.extend(validate_instance(item, item_schema, [*path, f"[{index}]"]))

    if isinstance(instance, dict):
        required = schema.get("required", [])
        for key in required:
            if key not in instance:
                errors.append(f"{location}: missing required property {key!r}")

        properties = schema.get("properties", {})
        if schema.get("additionalProperties") is False:
            allowed = set(properties)
            for key in instance:
                if key not in allowed:
                    errors.append(f"{location}: unexpected property {key!r}")

        for key, value in instance.items():
            child_schema = properties.get(key)
            if isinstance(child_schema, dict):
                errors.extend(validate_instance(value, child_schema, [*path, key]))

    return errors


def infer_schema_name(path: Path, payload: Any) -> str | None:
    name = path.name.lower()
    if "prompt" in name:
        return "prompt-pack.schema.json"
    if "deck" in name or "tastecraft" in name:
        return "tastecraft.deck.schema.json"
    if isinstance(payload, dict):
        if {"prompts", "export_policy", "global_image_policy"}.issubset(payload):
            return "prompt-pack.schema.json"
        if {"project", "brief", "output", "theme", "pages", "qa"}.issubset(payload):
            return "tastecraft.deck.schema.json"
    return None


def discover_examples(examples_dir: Path, requested: list[str]) -> list[Path]:
    if requested:
        return [Path(item) for item in requested]
    return sorted(examples_dir.glob("*.json"))


def validate_examples(root: Path, examples: list[Path]) -> list[ExampleResult]:
    schema_dir = root / "schema"
    schemas = {
        "tastecraft.deck.schema.json": load_json(schema_dir / "tastecraft.deck.schema.json"),
        "prompt-pack.schema.json": load_json(schema_dir / "prompt-pack.schema.json"),
    }

    results: list[ExampleResult] = []
    for example in examples:
        example_path = example if example.is_absolute() else root / example
        payload = load_json(example_path)
        schema_name = infer_schema_name(example_path, payload)
        if schema_name is None:
            results.append(ExampleResult(example_path, "unknown", ["could not infer matching schema"]))
            continue
        errors = validate_instance(payload, schemas[schema_name])
        results.append(ExampleResult(example_path, schema_name, errors))
    return results


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    parser.add_argument(
        "--examples-dir",
        type=Path,
        default=Path("demo/sample-inputs"),
        help="Directory containing sample JSON examples, relative to root unless absolute",
    )
    parser.add_argument("examples", nargs="*", help="Optional specific example files")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    root = args.root.resolve()
    examples_dir = args.examples_dir if args.examples_dir.is_absolute() else root / args.examples_dir
    examples = discover_examples(examples_dir, args.examples)

    if not examples:
        print(f"FAIL: no JSON examples found in {examples_dir}", file=sys.stderr)
        return 1

    try:
        results = validate_examples(root, examples)
    except (OSError, ValueError) as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        return 1

    failures = 0
    for result in results:
        rel_path = result.path.relative_to(root) if result.path.is_relative_to(root) else result.path
        if result.errors:
            failures += 1
            print(f"FAIL: {rel_path} against {result.schema_name}")
            for error in result.errors:
                print(f"  - {error}")
        else:
            print(f"PASS: {rel_path} against {result.schema_name}")

    if failures:
        print(f"FAIL: {failures} example file(s) did not validate", file=sys.stderr)
        return 1
    print(f"PASS: validated {len(results)} JSON example file(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
