from __future__ import annotations

import importlib.util
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
EXPECTED_NAMES_ZH = [
    "暖棕编辑纸感",
    "蓝绿稳健汇报",
    "海军蓝高端金融",
    "钢蓝结构蓝图",
    "墨绿铜金演讲",
    "灰蓝研究分析",
]


def load_script(name: str):
    path = ROOT / "scripts" / f"{name}.py"
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Could not load {path}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


validate_templates = load_script("validate_tastecraft_image_templates")


class TasteCraftImageTemplateTests(unittest.TestCase):
    def test_skill_keeps_core_prompt_workflow_principles(self) -> None:
        skill = (ROOT / "skills" / "tastecraft-image" / "SKILL.md").read_text(encoding="utf-8")

        for required in (
            "Structure before style",
            "结构先于风格",
            "Visuals serve the argument",
            "视觉服务论证",
            "One explicit confirmation",
            "一次明确确认",
        ):
            self.assertIn(required, skill)

    def test_skill_documents_style_learning_mode_and_boundaries(self) -> None:
        skill = (ROOT / "skills" / "tastecraft-image" / "SKILL.md").read_text(encoding="utf-8")
        frontmatter = skill.split("---", 2)[1]

        for required in (
            "PPT 样图",
            "学习风格",
        ):
            self.assertIn(required, frontmatter)

        for required in (
            "style-learning",
            "样图风格学习",
            "审美分析",
            "迁移判断",
            "模板草案",
            "测试建议",
            "not image replication",
            "Do not save the source image",
        ):
            self.assertIn(required, skill)

    def test_builtin_templates_are_valid_and_named_for_users(self) -> None:
        result = validate_templates.validate_repo(ROOT)
        self.assertEqual(result.errors, [], "\n".join(result.errors))

        payload = validate_templates.load_json(ROOT / "assets" / "tastecraft-image" / "templates.json")
        templates = payload["templates"]
        self.assertEqual(len(templates), 6)
        self.assertEqual([template["name_zh"] for template in templates], EXPECTED_NAMES_ZH)

        for template in templates:
            self.assertEqual(template["status"], "built_in")
            self.assertNotIn(template["id"], template["name_zh"])
            self.assertTrue(template["palette"]["background"].startswith("#"))
            self.assertGreaterEqual(len(template["selection_signals"]), 2)
            self.assertTrue(template["use_case_zh"])

    def test_custom_template_file_is_git_managed_and_contains_glory_drafts(self) -> None:
        custom = validate_templates.load_json(ROOT / "assets" / "tastecraft-image" / "custom-templates.json")
        templates = custom["templates"]
        self.assertEqual(
            {template["name_zh"] for template in templates},
            {"Glory传承绿｜抽象材质", "Glory传承绿｜空间路演"},
        )
        self.assertTrue(all(template["status"] == "draft" for template in templates))
        self.assertTrue(all(template["palette"]["primary"] == "#0F6F68" for template in templates))
        self.assertTrue(all(template["palette"]["accent"] == "#20B2AA" for template in templates))

    def test_validator_rejects_missing_required_fields(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            asset_dir = root / "assets" / "tastecraft-image"
            asset_dir.mkdir(parents=True)
            (asset_dir / "templates.json").write_text(
                '{"schema_version":"1.0","templates":[{"id":"bad"}]}',
                encoding="utf-8",
            )
            (asset_dir / "custom-templates.json").write_text(
                '{"schema_version":"1.0","templates":[]}',
                encoding="utf-8",
            )

            result = validate_templates.validate_repo(root)

        self.assertTrue(any("missing required field" in error for error in result.errors), result.errors)


if __name__ == "__main__":
    unittest.main()
