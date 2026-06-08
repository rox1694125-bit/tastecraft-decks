from __future__ import annotations

import importlib.util
import io
import sys
import tempfile
import unittest
from contextlib import redirect_stdout
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


build_dist = load_script("build_dist")
scan_sensitive_files = load_script("scan_sensitive_files")
validate_skill_metadata = load_script("validate_skill_metadata")


class ToolingScriptTests(unittest.TestCase):
    def test_skill_metadata_current_repo_is_structurally_valid(self) -> None:
        with redirect_stdout(io.StringIO()):
            result = validate_skill_metadata.main(["--root", str(ROOT)])
        self.assertEqual(result, 0)

    def test_sensitive_scan_finds_env_file(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / ".env").write_text("placeholder\n", encoding="utf-8")
            findings = scan_sensitive_files.scan(root)
            self.assertTrue(any(finding.reason == "sensitive filename pattern" for finding in findings))

    def test_build_dist_copies_skill_and_shared_schema(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            skill_dir = root / "skills" / "demo-skill"
            (skill_dir / "agents").mkdir(parents=True)
            (skill_dir / "SKILL.md").write_text("---\nname: demo-skill\ndescription: Demo skill.\n---\n", encoding="utf-8")
            (skill_dir / "agents" / "openai.yaml").write_text(
                'interface:\n  display_name: "Demo"\n  short_description: "Demo"\n  default_prompt: "Demo"\n',
                encoding="utf-8",
            )
            (root / "schema").mkdir()
            (root / "schema" / "demo.schema.json").write_text("{}", encoding="utf-8")
            dist = root / "out"

            manifest = build_dist.build_packages(root, dist)

            self.assertEqual(manifest["package_count"], 1)
            self.assertTrue((dist / "demo-skill" / "SKILL.md").exists())
            self.assertTrue((dist / "demo-skill" / "schema" / "demo.schema.json").exists())
            self.assertTrue((dist / "manifest.json").exists())

    def test_build_dist_defaults_to_tastecraft_image_when_present(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            for name in ("tastecraft-image", "legacy-skill"):
                skill_dir = root / "skills" / name
                (skill_dir / "agents").mkdir(parents=True)
                (skill_dir / "SKILL.md").write_text(
                    f"---\nname: {name}\ndescription: Demo skill with a long enough trigger description.\n---\n",
                    encoding="utf-8",
                )
                (skill_dir / "agents" / "openai.yaml").write_text(
                    'interface:\n  display_name: "Demo"\n  short_description: "Demo"\n  default_prompt: "Demo"\n',
                    encoding="utf-8",
                )
            (root / "schema").mkdir()
            (root / "schema" / "demo.schema.json").write_text("{}", encoding="utf-8")
            (root / "assets" / "tastecraft-image").mkdir(parents=True)
            (root / "assets" / "tastecraft-image" / "templates.json").write_text("{}", encoding="utf-8")
            (root / "scripts").mkdir()
            (root / "scripts" / "tastecraft_image_log.py").write_text("# helper\n", encoding="utf-8")
            dist = root / "out"

            manifest = build_dist.build_packages(root, dist)

            self.assertEqual(manifest["package_count"], 1)
            self.assertEqual(manifest["packages"][0]["name"], "tastecraft-image")
            self.assertTrue((dist / "tastecraft-image" / "SKILL.md").exists())
            self.assertTrue((dist / "tastecraft-image" / "assets" / "tastecraft-image" / "templates.json").exists())
            self.assertTrue((dist / "tastecraft-image" / "scripts" / "tastecraft_image_log.py").exists())
            self.assertFalse((dist / "legacy-skill").exists())

    def test_build_dist_include_legacy_keeps_all_skills(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            for name in ("tastecraft-image", "legacy-skill"):
                skill_dir = root / "skills" / name
                (skill_dir / "agents").mkdir(parents=True)
                (skill_dir / "SKILL.md").write_text(
                    f"---\nname: {name}\ndescription: Demo skill with a long enough trigger description.\n---\n",
                    encoding="utf-8",
                )
                (skill_dir / "agents" / "openai.yaml").write_text(
                    'interface:\n  display_name: "Demo"\n  short_description: "Demo"\n  default_prompt: "Demo"\n',
                    encoding="utf-8",
                )
            dist = root / "out"

            manifest = build_dist.build_packages(root, dist, include_legacy=True)

            self.assertEqual(
                {package["name"] for package in manifest["packages"]},
                {"tastecraft-image", "legacy-skill"},
            )


if __name__ == "__main__":
    unittest.main()
