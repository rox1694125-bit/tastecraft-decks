#!/usr/bin/env python3
"""Smoke test the static TasteCraft console and bundled sample inputs."""

from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from validate_schema_examples import validate_examples  # noqa: E402


class AssetParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.scripts: list[str] = []
        self.stylesheets: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = {key.lower(): value or "" for key, value in attrs}
        if tag.lower() == "script" and attr_map.get("src"):
            self.scripts.append(attr_map["src"])
        if tag.lower() == "link" and attr_map.get("rel", "").lower() == "stylesheet" and attr_map.get("href"):
            self.stylesheets.append(attr_map["href"])


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def is_external_asset(target: str) -> bool:
    return target.startswith(("http://", "https://", "//", "data:"))


def check_console(root: Path, console_dir: Path) -> list[str]:
    errors: list[str] = []
    index_path = console_dir / "index.html"
    if not index_path.exists():
        return [f"{index_path.relative_to(root) if index_path.is_relative_to(root) else index_path} is missing"]

    html = index_path.read_text(encoding="utf-8")
    parser = AssetParser()
    parser.feed(html)

    for target in [*parser.scripts, *parser.stylesheets]:
        if is_external_asset(target):
            continue
        local_path = (console_dir / target.split("#", 1)[0].split("?", 1)[0]).resolve()
        try:
            local_path.relative_to(console_dir.resolve())
        except ValueError:
            errors.append(f"console asset escapes console directory: {target}")
            continue
        if not local_path.exists():
            errors.append(f"console asset is missing: {target}")

    expected_markers = ("tastecraft.deck.json", "prompt-pack.json")
    for marker in expected_markers:
        if marker not in html:
            errors.append(f"index.html does not mention {marker}")

    if re.search(r"\b(localStorage|sessionStorage)\b", html):
        errors.append("index.html should not persist deck data in browser storage without an explicit policy")

    return errors


def check_console_exports(root: Path, console_dir: Path) -> list[str]:
    node = shutil.which("node")
    if not node:
        return ["node is required for console export smoke testing but was not found"]

    app_path = console_dir / "app.js"
    if not app_path.exists():
        return [f"{app_path.relative_to(root) if app_path.is_relative_to(root) else app_path} is missing"]

    code = r"""
const fs = require('fs');
const vm = require('vm');
const appPath = process.argv[1];
const app = fs.readFileSync(appPath, 'utf8');
const sandbox = {
  window: {},
  document: { addEventListener() {} }
};
vm.createContext(sandbox);
vm.runInContext(app, sandbox, { filename: appPath });
const api = sandbox.window.__tastecraftConsole;
if (!api || typeof api.buildDeckSpec !== 'function' || typeof api.buildPromptPack !== 'function') {
  throw new Error('console test API is missing export functions');
}
api.setStateForTest({
  prompts: [
    {
      prompt_id: 'confirmed-cover',
      page_id: 'page-01-cover',
      page_type: 'cover',
      purpose: 'Confirmed smoke prompt.',
      aspect_ratio: '16:9',
      positive_prompt: 'confirmed prompt',
      negative_prompt: 'avoid noise',
      reference_notes: 'smoke',
      generation_params: { model_hint: 'none', size: '16:9', seed: null },
      status: 'confirmed',
      confirmed_at: '2026-06-06T00:00:00Z'
    },
    {
      prompt_id: 'draft-visual',
      page_id: 'page-06-visual',
      page_type: 'visual',
      purpose: 'Draft smoke prompt.',
      aspect_ratio: '16:9',
      positive_prompt: 'draft prompt',
      negative_prompt: 'avoid noise',
      reference_notes: 'smoke',
      generation_params: { model_hint: 'none', size: '16:9', seed: null },
      status: 'draft',
      confirmed_at: ''
    }
  ]
});
const deck = api.buildDeckSpec();
const pack = api.buildPromptPack();
if (deck.schema_version !== '1.0') {
  throw new Error('deck export schema_version mismatch');
}
if (pack.export_policy !== 'confirmed_prompts_only') {
  throw new Error('prompt pack export policy mismatch');
}
if (pack.prompts.length !== 1 || pack.prompts[0].prompt_id !== 'confirmed-cover') {
  throw new Error('prompt pack did not exclude unconfirmed prompts');
}
"""
    result = subprocess.run(
        [node, "-e", code, str(app_path)],
        cwd=root,
        text=True,
        capture_output=True,
        check=False,
    )
    if result.returncode:
        detail = (result.stderr or result.stdout or "node export smoke failed").strip()
        return [detail]
    return []


def check_sample_inputs(root: Path, examples_dir: Path) -> list[str]:
    examples = sorted(examples_dir.glob("*.json"))
    if not examples:
        return [f"no sample JSON files found in {examples_dir.relative_to(root) if examples_dir.is_relative_to(root) else examples_dir}"]
    results = validate_examples(root, examples)
    errors: list[str] = []
    for result in results:
        if result.errors:
            rel_path = result.path.relative_to(root) if result.path.is_relative_to(root) else result.path
            errors.append(f"{rel_path} failed {result.schema_name}: {'; '.join(result.errors)}")
    return errors


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    parser.add_argument(
        "--console-dir",
        type=Path,
        default=Path("assets/tastecraft-console"),
        help="Console directory, relative to root unless absolute",
    )
    parser.add_argument(
        "--examples-dir",
        type=Path,
        default=Path("demo/sample-inputs"),
        help="Sample input directory, relative to root unless absolute",
    )
    parser.add_argument("--allow-missing-console", action="store_true", help="Skip console checks if index.html is absent")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    root = args.root.resolve()
    console_dir = args.console_dir if args.console_dir.is_absolute() else root / args.console_dir
    examples_dir = args.examples_dir if args.examples_dir.is_absolute() else root / args.examples_dir

    errors: list[str] = []
    index_path = console_dir / "index.html"
    if args.allow_missing_console and not index_path.exists():
        print(f"SKIP: {index_path} is missing")
    else:
        errors.extend(check_console(root, console_dir))
        errors.extend(check_console_exports(root, console_dir))
    errors.extend(check_sample_inputs(root, examples_dir))

    if errors:
        for error in errors:
            print(f"FAIL: {error}")
        print(f"FAIL: smoke test found {len(errors)} issue(s)", file=sys.stderr)
        return 1

    print("PASS: console smoke test completed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
