from __future__ import annotations

import importlib.util
import json
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def load_script(name: str):
    path = ROOT / "scripts" / f"{name}.py"
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Could not load {path}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


tastecraft_image_log = load_script("tastecraft_image_log")


class TasteCraftImageLogTests(unittest.TestCase):
    def draft_event(self) -> dict[str, str]:
        return {
            "status": "draft_prompt",
            "title": "星河安康计划",
            "template_id": "market-slate",
            "template_name_zh": "蓝绿稳健汇报",
            "prompt_zh": "生成一张专业可信的示例保障产品图。",
            "prompt_en": "Create a professional insurance product visual.",
        }

    def test_append_draft_prompt_creates_jsonl_and_markdown_log(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            paths = tastecraft_image_log.append_event(root, self.draft_event(), date="2026-06-08")

            jsonl_path = root / "docs" / "project-log" / "2026-06-08-tastecraft-image-runs.jsonl"
            markdown_path = root / "docs" / "project-log" / "2026-06-08-tastecraft-image.md"
            self.assertEqual(paths["jsonl"], jsonl_path)
            self.assertEqual(paths["markdown"], markdown_path)
            self.assertTrue(jsonl_path.exists())
            self.assertTrue(markdown_path.exists())

            first_line = jsonl_path.read_text(encoding="utf-8").splitlines()[0]
            payload = json.loads(first_line)
            self.assertEqual(payload["status"], "draft_prompt")
            self.assertEqual(payload["template_name_zh"], "蓝绿稳健汇报")
            self.assertEqual(payload["prompt_zh"], "生成一张专业可信的示例保障产品图。")
            self.assertIn("logged_at", payload)

            markdown = markdown_path.read_text(encoding="utf-8")
            self.assertIn("# TasteCraft Image Log - 2026-06-08", markdown)
            self.assertIn("星河安康计划", markdown)
            self.assertIn("draft_prompt", markdown)
            self.assertIn("prompt: saved in JSONL", markdown)
            self.assertNotIn("生成一张专业可信的示例保障产品图。", markdown)

    def test_generated_image_requires_image_path(self) -> None:
        event = {
            "status": "generated_image",
            "title": "星河安康计划",
            "template_id": "market-slate",
        }
        with self.assertRaises(ValueError):
            tastecraft_image_log.validate_event(event)

    def test_date_must_be_yyyy_mm_dd(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            with self.assertRaises(ValueError):
                tastecraft_image_log.append_event(root, self.draft_event(), date="../2026-06-08")


if __name__ == "__main__":
    unittest.main()
