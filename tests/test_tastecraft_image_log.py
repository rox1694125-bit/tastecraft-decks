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

    def style_learning_event(self) -> dict[str, object]:
        return {
            "status": "style_learning",
            "created_at": "2026-06-09T00:00:00",
            "source_type": "single_reference_image",
            "source_note": "user-provided reference image, image not saved",
            "template_id": "custom-deep-blue-premium-briefing",
            "template_name_zh": "深蓝金｜高端金融简报",
            "aesthetic_analysis": {
                "temperament": "克制、高级、机构级",
                "strengths": ["强留白", "清晰层级", "低对比材质"],
            },
            "transfer_guidance": {
                "suitable": ["高端金融", "董事会汇报"],
                "do_not_copy": ["source logo", "exact coordinates"],
            },
            "template_draft": {
                "id": "custom-deep-blue-premium-briefing",
                "name_zh": "深蓝金｜高端金融简报",
                "status": "draft",
            },
            "test_suggestion": {
                "density": "medium",
                "content_type": "executive briefing",
            },
            "user_feedback": "先保存为草案",
            "maturity": "draft",
            "merge_group": None,
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

    def test_generated_image_requires_image_path_and_imagegen_prompt(self) -> None:
        event = {
            "status": "generated_image",
            "title": "星河安康计划",
            "template_id": "market-slate",
        }
        with self.assertRaises(ValueError):
            tastecraft_image_log.validate_event(event)

        event["image_path"] = "/tmp/example.png"
        with self.assertRaises(ValueError):
            tastecraft_image_log.validate_event(event)

    def test_generated_image_preserves_actual_prompt_in_jsonl_only(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            event = {
                "status": "generated_image",
                "title": "星河安康计划",
                "template_id": "market-slate",
                "template_name_zh": "蓝绿稳健汇报",
                "image_path": "/tmp/example.png",
                "imagegen_prompt": "这是最终实际送入生图模型的完整 prompt。",
            }

            paths = tastecraft_image_log.append_event(root, event, date="2026-06-08")

            payload = json.loads(paths["jsonl"].read_text(encoding="utf-8").splitlines()[0])
            self.assertEqual(payload["imagegen_prompt"], "这是最终实际送入生图模型的完整 prompt。")

            markdown = paths["markdown"].read_text(encoding="utf-8")
            self.assertIn("imagegen_prompt: saved in JSONL", markdown)
            self.assertNotIn("这是最终实际送入生图模型的完整 prompt。", markdown)

    def test_feedback_appends_to_normal_jsonl_and_markdown_log(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            event = {
                "status": "feedback",
                "title": "星河安康计划",
                "feedback": "标题需要更克制，减少营销感。",
            }

            paths = tastecraft_image_log.append_event(root, event, date="2026-06-09")

            jsonl_path = root / "docs" / "project-log" / "2026-06-09-tastecraft-image-runs.jsonl"
            markdown_path = root / "docs" / "project-log" / "2026-06-09-tastecraft-image.md"
            self.assertEqual(paths["jsonl"], jsonl_path)
            self.assertEqual(paths["markdown"], markdown_path)
            self.assertTrue(jsonl_path.exists())
            self.assertTrue(markdown_path.exists())

            payload = json.loads(jsonl_path.read_text(encoding="utf-8").splitlines()[0])
            self.assertEqual(payload["status"], "feedback")

            markdown = markdown_path.read_text(encoding="utf-8")
            self.assertIn("标题需要更克制，减少营销感。", markdown)

    def test_date_must_be_yyyy_mm_dd(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            with self.assertRaises(ValueError):
                tastecraft_image_log.append_event(root, self.draft_event(), date="../2026-06-08")

    def test_style_learning_writes_dedicated_jsonl_without_source_image(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            paths = tastecraft_image_log.append_event(root, self.style_learning_event(), date="2026-06-09")

            jsonl_path = root / "docs" / "project-log" / "style-learning" / "2026-06-09-style-learning.jsonl"
            self.assertEqual(paths["jsonl"], jsonl_path)
            self.assertTrue(jsonl_path.exists())
            self.assertFalse((root / "docs" / "project-log" / "2026-06-09-tastecraft-image.md").exists())

            payload = json.loads(jsonl_path.read_text(encoding="utf-8").splitlines()[0])
            self.assertEqual(payload["status"], "style_learning")
            self.assertEqual(payload["source_type"], "single_reference_image")
            self.assertEqual(payload["merge_group"], None)
            self.assertEqual(payload["maturity"], "draft")
            self.assertIn("created_at", payload)
            self.assertNotIn("source_image", payload)
            self.assertNotIn("image_path", payload)

    def test_style_learning_requires_schema_fields(self) -> None:
        event = self.style_learning_event()
        del event["aesthetic_analysis"]

        with self.assertRaises(ValueError) as context:
            tastecraft_image_log.validate_event(event)

        self.assertIn("style_learning missing required fields: aesthetic_analysis", str(context.exception))

    def test_style_learning_rejects_saved_source_image_and_non_null_merge_group(self) -> None:
        event = self.style_learning_event()
        event["source_image"] = "/tmp/reference.png"

        with self.assertRaises(ValueError) as context:
            tastecraft_image_log.validate_event(event)

        self.assertIn("style_learning must not store source_image", str(context.exception))

        event = self.style_learning_event()
        event["source_image"] = ""

        with self.assertRaises(ValueError) as context:
            tastecraft_image_log.validate_event(event)

        self.assertIn("style_learning must not store source_image", str(context.exception))

        event = self.style_learning_event()
        event["image_path"] = ""

        with self.assertRaises(ValueError) as context:
            tastecraft_image_log.validate_event(event)

        self.assertIn("style_learning must not store image_path", str(context.exception))

        event = self.style_learning_event()
        event["merge_group"] = "future-group"

        with self.assertRaises(ValueError) as context:
            tastecraft_image_log.validate_event(event)

        self.assertIn("style_learning merge_group must be null in v1", str(context.exception))


if __name__ == "__main__":
    unittest.main()
