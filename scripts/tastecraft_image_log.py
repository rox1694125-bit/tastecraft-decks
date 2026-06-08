from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime
from pathlib import Path
from typing import Any, List, Optional, Union


VALID_STATUSES = {"draft_prompt", "generated_image", "feedback"}
DRAFT_PROMPT_REQUIRED_FIELDS = {"title", "template_id", "template_name_zh", "prompt_zh", "prompt_en"}


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def validate_date(value: str) -> str:
    try:
        parsed = datetime.strptime(value, "%Y-%m-%d")
    except ValueError as exc:
        raise ValueError("date must use YYYY-MM-DD format") from exc
    return parsed.strftime("%Y-%m-%d")


def log_paths(root: Union[str, Path], date: str) -> dict[str, Path]:
    safe_date = validate_date(date)
    log_dir = Path(root) / "docs" / "project-log"
    return {
        "jsonl": log_dir / f"{safe_date}-tastecraft-image-runs.jsonl",
        "markdown": log_dir / f"{safe_date}-tastecraft-image.md",
    }


def validate_event(event: dict[str, Any]) -> None:
    if not isinstance(event, dict):
        raise ValueError("event must be a JSON object")

    status = event.get("status")
    if status not in VALID_STATUSES:
        valid = ", ".join(sorted(VALID_STATUSES))
        raise ValueError(f"status must be one of: {valid}")

    if status == "draft_prompt":
        missing = sorted(field for field in DRAFT_PROMPT_REQUIRED_FIELDS if not event.get(field))
        if missing:
            raise ValueError(f"draft_prompt missing required fields: {', '.join(missing)}")

    if status == "generated_image" and not event.get("image_path"):
        raise ValueError("generated_image requires image_path")


def _single_line(value: Any) -> str:
    return " ".join(str(value).split())


def markdown_line(event: dict[str, Any]) -> str:
    status = str(event.get("status", "unknown"))
    logged_at = _single_line(event.get("logged_at", ""))
    title = _single_line(event.get("title", "Untitled"))
    parts = [f"- {logged_at}", f"`{status}`", f"**{title}**"]

    if status == "draft_prompt":
        template_name = _single_line(event.get("template_name_zh", ""))
        template_id = _single_line(event.get("template_id", ""))
        parts.append(f"template: {template_name} (`{template_id}`)")
        parts.append("prompt: saved in JSONL")
    elif status == "generated_image":
        parts.append(f"image: `{_single_line(event.get('image_path', ''))}`")
    elif status == "feedback":
        feedback = event.get("feedback", event.get("notes", ""))
        if feedback:
            parts.append(f"feedback: {_single_line(feedback)}")

    return " | ".join(parts) + "\n"


def append_event(root: Union[str, Path], event: dict[str, Any], date: Optional[str] = None) -> dict[str, Path]:
    event_to_log = dict(event)
    event_to_log.setdefault("logged_at", datetime.now().replace(microsecond=0).isoformat())
    validate_event(event_to_log)

    log_date = validate_date(date or datetime.now().date().isoformat())
    paths = log_paths(root, log_date)
    paths["jsonl"].parent.mkdir(parents=True, exist_ok=True)

    with paths["jsonl"].open("a", encoding="utf-8") as jsonl_file:
        jsonl_file.write(json.dumps(event_to_log, ensure_ascii=False, sort_keys=True) + "\n")

    if not paths["markdown"].exists():
        paths["markdown"].write_text(f"# TasteCraft Image Log - {log_date}\n\n", encoding="utf-8")
    with paths["markdown"].open("a", encoding="utf-8") as markdown_file:
        markdown_file.write(markdown_line(event_to_log))

    return paths


def parse_args(argv: Optional[List[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Append a TasteCraft prompt/image run log event.")
    parser.add_argument("event_json", help="JSON object describing the event to log.")
    parser.add_argument("--date", help="Log date in YYYY-MM-DD format. Defaults to today.")
    parser.add_argument("--root", default=str(repo_root()), help="Repository root. Defaults to this script's repo.")
    return parser.parse_args(argv)


def main(argv: Optional[List[str]] = None) -> int:
    args = parse_args(argv)
    try:
        event = json.loads(args.event_json)
        paths = append_event(args.root, event, date=args.date)
    except json.JSONDecodeError as exc:
        print(f"error: invalid JSON: {exc}", file=sys.stderr)
        return 2
    except ValueError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2

    print(json.dumps({name: str(path) for name, path in paths.items()}, ensure_ascii=False, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
