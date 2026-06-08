# TasteCraft Image Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `tastecraft-image` as the Codex-first V1 image prompt skill with structured templates, logging support, default packaging priority, and updated public docs.

**Architecture:** Introduce a structured template source under `assets/tastecraft-image/`, a new skill package under `skills/tastecraft-image/`, and small Python validation/logging helpers under `scripts/`. Keep legacy deck skills in source but change default docs and packaging to make `tastecraft-image` the primary V1 entrypoint.

**Tech Stack:** Static Markdown skill files, JSON template assets, Python standard-library validation/logging scripts, existing unittest test suite, existing skill packaging script.

---

## Current Workspace Constraints

The main checkout currently contains unrelated uncommitted changes from the previous Prompt Workbench and prompt-template work. Implementation agents must:

- edit only the files assigned in their task;
- not revert, reset, or reformat unrelated dirty files;
- not run broad `git add`;
- not commit unless the controller explicitly asks for a scoped commit after integration.

## File Structure

- Create `assets/tastecraft-image/templates.json`
  - Built-in template source of truth for the six default templates.
- Create `assets/tastecraft-image/custom-templates.json`
  - Git-managed custom-template store, initially empty.
- Create `scripts/validate_tastecraft_image_templates.py`
  - Validates built-in and custom template JSON structure.
- Create `scripts/tastecraft_image_log.py`
  - Appends JSONL run records and updates a daily Markdown summary.
- Create `tests/test_tastecraft_image_templates.py`
  - Template validation and custom-template structure tests.
- Create `tests/test_tastecraft_image_log.py`
  - Draft prompt and generated image log tests.
- Create `skills/tastecraft-image/SKILL.md`
  - Main Codex user workflow and guardrails.
- Create `skills/tastecraft-image/agents/openai.yaml`
  - Skill metadata for packaging validation.
- Modify `scripts/build_dist.py`
  - Default package set should include only `tastecraft-image`; add `--include-legacy` for all skills.
- Modify `tests/test_tooling_scripts.py`
  - Cover default packaging and include-legacy packaging behavior.
- Modify `README.md`
  - Make `tastecraft-image` the V1 main entry.
- Modify `PROJECT_STATUS.md`
  - Reflect Codex-first skill focus.
- Modify `docs/architecture.md`
  - Document new primary architecture and legacy skill status.

## Task 1: Structured Template Source And Validation

**Files:**
- Create: `assets/tastecraft-image/templates.json`
- Create: `assets/tastecraft-image/custom-templates.json`
- Create: `scripts/validate_tastecraft_image_templates.py`
- Create: `tests/test_tastecraft_image_templates.py`

- [ ] **Step 1: Write the failing template tests**

Create `tests/test_tastecraft_image_templates.py`:

```python
from __future__ import annotations

import importlib.util
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


validate_templates = load_script("validate_tastecraft_image_templates")


class TasteCraftImageTemplateTests(unittest.TestCase):
    def test_builtin_templates_are_valid_and_named_for_users(self) -> None:
        result = validate_templates.validate_repo(ROOT)
        self.assertEqual(result.errors, [], "\n".join(result.errors))

        templates = validate_templates.load_json(ROOT / "assets" / "tastecraft-image" / "templates.json")
        self.assertEqual(len(templates["templates"]), 6)
        names = {template["name_zh"] for template in templates["templates"]}
        self.assertEqual(
            names,
            {
                "暖棕编辑纸感",
                "蓝绿稳健汇报",
                "海军蓝高端金融",
                "钢蓝结构蓝图",
                "墨绿铜金演讲",
                "灰蓝研究分析",
            },
        )
        for template in templates["templates"]:
            self.assertEqual(template["status"], "built_in")
            self.assertNotIn(template["id"], template["name_zh"])
            self.assertTrue(template["palette"]["background"].startswith("#"))
            self.assertGreaterEqual(len(template["selection_signals"]), 2)
            self.assertTrue(template["use_case_zh"])

    def test_custom_template_file_is_git_managed_but_empty_by_default(self) -> None:
        custom = validate_templates.load_json(ROOT / "assets" / "tastecraft-image" / "custom-templates.json")
        self.assertEqual(custom["templates"], [])

    def test_validator_rejects_missing_required_fields(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            asset_dir = root / "assets" / "tastecraft-image"
            asset_dir.mkdir(parents=True)
            (asset_dir / "templates.json").write_text('{"templates":[{"id":"bad"}]}', encoding="utf-8")
            (asset_dir / "custom-templates.json").write_text('{"templates":[]}', encoding="utf-8")
            result = validate_templates.validate_repo(root)
        self.assertTrue(any("missing required field" in error for error in result.errors))


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run the failing test**

Run:

```bash
python3 -m unittest tests.test_tastecraft_image_templates
```

Expected: fail because `scripts/validate_tastecraft_image_templates.py` and template JSON files do not exist yet.

- [ ] **Step 3: Create the built-in template source**

Create `assets/tastecraft-image/templates.json` with:

```json
{
  "schema_version": "1.0",
  "templates": [
    {
      "id": "editorial-paper",
      "name_zh": "暖棕编辑纸感",
      "name_en": "Warm Brown Editorial Paper",
      "status": "built_in",
      "use_case_zh": "适合偏轻、偏编辑感、质感较强的商业内容。",
      "use_case_en": "For lighter business topics with editorial paper texture and refined information hierarchy.",
      "selection_signals": ["lighter_business", "editorial_texture", "moderate_density"],
      "art_direction_zh": "温暖编辑纸感，高级纸张纹理，精致边距线，克制编辑缎带，印刷材质深度，一个精准分析层。",
      "art_direction_en": "Warm editorial paper direction with premium paper texture, refined margin rules, restrained editorial ribbons, print material depth, and one precise analytical layer.",
      "composition_zh": "非对称编辑跨页，充足标题区，一个占主导的信息主体区，小型注释证据模块，精致阴影，细微纸张颗粒。",
      "composition_en": "Asymmetric editorial spread with a generous title field, one dominant information area, small annotated evidence modules, refined shadows, and subtle paper grain.",
      "color_rules_zh": "暖棕主色用于标题和主数值，低饱和青绿色用于对比结构，古金强调色只用于小型编辑标记或一个关键高亮。",
      "color_rules_en": "Use warm brown for titles and hero values, muted teal for comparison structure, and antique gold only for small editorial ticks or one key highlight.",
      "palette": {
        "background": "#FBF7EF",
        "surface": "#FFFFFF",
        "text": "#20242A",
        "muted_text": "#68707A",
        "primary": "#A75E2B",
        "secondary": "#2F6F73",
        "accent": "#C9A646"
      },
      "avoid": ["unrelated lifestyle props", "template label text", "decorative clutter"],
      "default_density_fit": "medium"
    },
    {
      "id": "market-slate",
      "name_zh": "蓝绿稳健汇报",
      "name_en": "Blue Green Executive Report",
      "status": "built_in",
      "use_case_zh": "默认安全款，适合专业说明、客户沟通、内部报告和稳健汇报。",
      "use_case_en": "Default safe choice for professional explanation, client communication, internal reports, and restrained executive reporting.",
      "selection_signals": ["professional_report", "client_presentation", "high_density", "safe_default"],
      "art_direction_zh": "机构级高管简报方向，清晰的董事会分析感、明确结论、业务判断、关键证据和咨询级信息层级。",
      "art_direction_en": "Institutional executive brief direction with board-review analytics, clear conclusions, business judgment, key evidence, and consulting-grade hierarchy.",
      "composition_zh": "模块化高管简报页，强隐形网格，受控留白节奏，一个主结论区，紧凑证据带，精确对比几何。",
      "composition_en": "Modular executive briefing page with a strong invisible grid, controlled whitespace rhythm, one dominant conclusion zone, compact evidence strip, and precise comparison geometry.",
      "color_rules_zh": "石板蓝用于标题和主结构，绿色用于结构对照，珊瑚强调色只用于风险、差异或单个重点数值。",
      "color_rules_en": "Use slate blue for titles and structure, green for structural counterpoint, and coral only for risk, delta, or a single key value.",
      "palette": {
        "background": "#F7F8FA",
        "surface": "#FFFFFF",
        "text": "#18202A",
        "muted_text": "#5D6B7A",
        "primary": "#205B73",
        "secondary": "#2F855A",
        "accent": "#E76F51"
      },
      "avoid": ["default dashboard", "unrelated world maps", "awkward stock-line decorations", "mechanism flowcharts"],
      "default_density_fit": "high"
    },
    {
      "id": "sovereign-gold",
      "name_zh": "海军蓝高端金融",
      "name_en": "Navy Premium Finance",
      "status": "built_in",
      "use_case_zh": "适合金融、保险、资管、财富管理等更高级、更尊贵的内容。",
      "use_case_en": "For finance, insurance, asset management, wealth management, and premium advisory content.",
      "selection_signals": ["finance", "insurance", "wealth", "premium", "client_presentation"],
      "art_direction_zh": "克制的高端金融方向，机构海军蓝、古金细节、高级金融信任感、安静权威。",
      "art_direction_en": "Reserved premium finance direction with institutional navy, antique gold detail, premium financial confidence, and quiet authority.",
      "composition_zh": "有层次的金融编辑跨页，框定式主洞察，精致账簿式分隔线，安静对比图解，纪律化留白。",
      "composition_en": "Layered financial editorial spread with a framed hero insight, refined ledger-like dividers, quiet comparative diagram, and disciplined whitespace.",
      "color_rules_zh": "海军蓝用于结构和对比线，古金用于高级标题和主强调，青铜强调色只作为小型数值标记。",
      "color_rules_en": "Use navy for structure and comparison lines, antique gold for premium headings and hero emphasis, and bronze only as small value markers.",
      "palette": {
        "background": "#F6F1E6",
        "surface": "#FFFFFF",
        "text": "#1B2230",
        "muted_text": "#6E6A61",
        "primary": "#8A6A2F",
        "secondary": "#243B5A",
        "accent": "#B98A44"
      },
      "avoid": ["hospitality cues", "romantic decoration", "lifestyle scenes", "template label text"],
      "default_density_fit": "high"
    },
    {
      "id": "precision-blueprint",
      "name_zh": "钢蓝结构蓝图",
      "name_en": "Steel Blue Structure Blueprint",
      "status": "built_in",
      "use_case_zh": "适合解释机制、流程、系统结构、产品架构和复杂关系。",
      "use_case_en": "For mechanisms, processes, system structures, product architecture, and complex relationships.",
      "selection_signals": ["mechanism", "process", "system_structure", "architecture", "technical_explanation"],
      "art_direction_zh": "机制蓝图方向，冷静蓝图纸、精确线稿、层叠架构图、因果路径、层级结构和分析清晰度。",
      "art_direction_en": "Mechanism blueprint direction with cool blueprint paper, exact linework, layered architecture diagrams, causal paths, hierarchy, and analytical clarity.",
      "composition_zh": "蓝图式解释页，有度量路径、结构叠层、类坐标导引、清晰机制区、节点路径和局部放大标注。",
      "composition_en": "Blueprint explanation page with measured paths, structural overlays, axis-like guides, clear mechanism zones, nodes, and local zoom callouts.",
      "color_rules_zh": "钢蓝用于结构和标题，技术青用于机制路径，低饱和黄铜用于一个活跃节点或主指标。",
      "color_rules_en": "Use steel blue for structure and titles, technical teal for mechanism paths, and muted brass for one active node or hero metric.",
      "palette": {
        "background": "#F3F7FC",
        "surface": "#FFFFFF",
        "text": "#172033",
        "muted_text": "#5C6878",
        "primary": "#1F5E8C",
        "secondary": "#2B7480",
        "accent": "#BFA15A"
      },
      "avoid": ["ordinary executive dashboard", "fake UI screens", "decorative spectacle"],
      "default_density_fit": "medium"
    },
    {
      "id": "ink-copper",
      "name_zh": "墨绿铜金演讲",
      "name_en": "Mineral Green Copper Keynote",
      "status": "built_in",
      "use_case_zh": "适合深色高管演讲、发布会感和强叙事页面。",
      "use_case_en": "For dark executive keynotes, launch-style narrative, and strong focal presentation pages.",
      "selection_signals": ["executive_keynote", "dark_background", "strong_narrative", "low_to_medium_density"],
      "art_direction_zh": "深矿物绿铜金高管演讲系统，暖铜层级、象牙白文字、低饱和矿物鼠尾草结构辅助，电影感但克制。",
      "art_direction_en": "Deep mineral green copper executive keynote system with warm copper hierarchy, ivory text, muted mineral-sage structural support, cinematic but disciplined.",
      "composition_zh": "一个有力量的焦点结构，深矿物色负空间，铜光数据架构，雕塑感分隔，强层级，稀疏但果断的证据。",
      "composition_en": "One powerful focal structure with deep mineral negative space, copper-lit data architecture, sculptural dividers, bold hierarchy, and sparse but decisive evidence.",
      "color_rules_zh": "铜色用于主强调和章节锚点，矿物鼠尾草只用于细线结构对比，古金只作为极小信号标记。",
      "color_rules_en": "Use copper for hero emphasis and anchors, mineral sage only for thin structural contrast, and antique gold only as tiny signal markers.",
      "palette": {
        "background": "#17221E",
        "surface": "#22302A",
        "text": "#F2ECE0",
        "muted_text": "#AEB6A8",
        "primary": "#C1783D",
        "secondary": "#88A39C",
        "accent": "#D4B36A"
      },
      "avoid": ["pure black stage", "nightclub glow", "large saturated red or blue fields", "decorative spectacle"],
      "default_density_fit": "low"
    },
    {
      "id": "evidence-lab",
      "name_zh": "灰蓝研究分析",
      "name_en": "Gray Blue Research Analysis",
      "status": "built_in",
      "use_case_zh": "适合研究结论、证据拆解、分析型内容和谨慎比较。",
      "use_case_en": "For research conclusions, evidence breakdowns, analytical reasoning, and careful comparisons.",
      "selection_signals": ["research", "evidence", "analysis", "comparison", "calm_reasoning"],
      "art_direction_zh": "研究分析方向，干净研究桌严谨感、分析档案纸、仪器感线稿、抽象证据标记和平静对比推理。",
      "art_direction_en": "Research analysis direction with clean research-desk rigor, analytical sheets, instrument-like linework, abstract evidence markers, and calm comparative reasoning.",
      "composition_zh": "精修董事会分析页，有度量网格、抽象验证标记、平静对比区、只来自内容本身的干净边注和微妙纸张材质。",
      "composition_en": "Polished board-analysis page with measured grid, abstract verification markers, calm comparison zones, content-only margin notes, and subtle paper materiality.",
      "color_rules_zh": "灰蓝用于证据层级，干燥鼠尾草绿用于分析对比，低饱和黄铜用于阈值或验证标记。",
      "color_rules_en": "Use gray blue for evidence hierarchy, dry sage for analytical contrast, and muted brass for thresholds or verification markers.",
      "palette": {
        "background": "#F7F8F4",
        "surface": "#FFFFFF",
        "text": "#20242A",
        "muted_text": "#687060",
        "primary": "#4E6375",
        "secondary": "#66775A",
        "accent": "#C2A24D"
      },
      "avoid": ["fake dossier metrics", "template labels", "irrelevant lab badges", "decorative clutter"],
      "default_density_fit": "high"
    }
  ]
}
```

- [ ] **Step 4: Create the custom template source**

Create `assets/tastecraft-image/custom-templates.json`:

```json
{
  "schema_version": "1.0",
  "templates": []
}
```

- [ ] **Step 5: Implement the validator**

Create `scripts/validate_tastecraft_image_templates.py`:

```python
#!/usr/bin/env python3
"""Validate TasteCraft Image template assets."""

from __future__ import annotations

import argparse
import json
import sys
from dataclasses import dataclass
from pathlib import Path


BUILTIN_REQUIRED = {
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
}
CUSTOM_ALLOWED_STATUSES = {"draft", "tested", "built_in_candidate"}
PALETTE_KEYS = {"background", "surface", "text", "muted_text", "primary", "secondary", "accent"}


@dataclass
class ValidationResult:
    errors: list[str]
    warnings: list[str]


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def load_json(path: Path) -> dict[str, object]:
    return json.loads(path.read_text(encoding="utf-8"))


def validate_hex(value: object) -> bool:
    return isinstance(value, str) and len(value) == 7 and value.startswith("#")


def validate_template(template: object, source_name: str, index: int, custom: bool) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []
    if not isinstance(template, dict):
        return [f"{source_name}[{index}] must be an object"], warnings

    required = BUILTIN_REQUIRED
    missing = sorted(field for field in required if field not in template)
    for field in missing:
        errors.append(f"{source_name}[{index}] missing required field {field}")

    status = template.get("status")
    if custom:
        if status not in CUSTOM_ALLOWED_STATUSES:
            errors.append(f"{source_name}[{index}] status must be one of {sorted(CUSTOM_ALLOWED_STATUSES)}")
    elif status != "built_in":
        errors.append(f"{source_name}[{index}] built-in template status must be built_in")

    palette = template.get("palette")
    if isinstance(palette, dict):
        for key in sorted(PALETTE_KEYS):
            if key not in palette:
                errors.append(f"{source_name}[{index}] palette missing {key}")
            elif not validate_hex(palette[key]):
                errors.append(f"{source_name}[{index}] palette {key} must be a HEX color")
    elif "palette" in template:
        errors.append(f"{source_name}[{index}] palette must be an object")

    signals = template.get("selection_signals")
    if "selection_signals" in template and not isinstance(signals, list):
        errors.append(f"{source_name}[{index}] selection_signals must be a list")
    if isinstance(signals, list) and len(signals) < 2:
        warnings.append(f"{source_name}[{index}] has fewer than two selection signals")

    avoid = template.get("avoid")
    if "avoid" in template and not isinstance(avoid, list):
        errors.append(f"{source_name}[{index}] avoid must be a list")

    return errors, warnings


def validate_file(path: Path, custom: bool) -> ValidationResult:
    errors: list[str] = []
    warnings: list[str] = []
    if not path.exists():
        return ValidationResult([f"{path} is missing"], warnings)

    try:
        payload = load_json(path)
    except (OSError, json.JSONDecodeError) as exc:
        return ValidationResult([f"{path} is not valid JSON: {exc}"], warnings)

    templates = payload.get("templates")
    if not isinstance(templates, list):
        return ValidationResult([f"{path} must contain a templates list"], warnings)

    seen: set[str] = set()
    for index, template in enumerate(templates):
        item_errors, item_warnings = validate_template(template, path.name, index, custom=custom)
        errors.extend(item_errors)
        warnings.extend(item_warnings)
        if isinstance(template, dict):
            template_id = template.get("id")
            if isinstance(template_id, str):
                if template_id in seen:
                    errors.append(f"{path.name}[{index}] duplicate id {template_id}")
                seen.add(template_id)

    return ValidationResult(errors, warnings)


def validate_repo(root: Path) -> ValidationResult:
    asset_dir = root / "assets" / "tastecraft-image"
    builtin = validate_file(asset_dir / "templates.json", custom=False)
    custom = validate_file(asset_dir / "custom-templates.json", custom=True)
    return ValidationResult(builtin.errors + custom.errors, builtin.warnings + custom.warnings)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    parser.add_argument("--strict", action="store_true", help="Treat warnings as failures")
    return parser


def main(argv: list[str] | None = None) -> int:
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
```

- [ ] **Step 6: Run tests and validator**

Run:

```bash
python3 -m unittest tests.test_tastecraft_image_templates
python3 scripts/validate_tastecraft_image_templates.py --strict
```

Expected: both pass.

## Task 2: Prompt/Image Run Logging Helper

**Files:**
- Create: `scripts/tastecraft_image_log.py`
- Create: `tests/test_tastecraft_image_log.py`

- [ ] **Step 1: Write failing log tests**

Create `tests/test_tastecraft_image_log.py`:

```python
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
    def test_append_draft_prompt_writes_jsonl_and_markdown(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            event = {
                "status": "draft_prompt",
                "title": "MGIUL 24核心特点和附加保险",
                "template_id": "market-slate",
                "template_name_zh": "蓝绿稳健汇报",
                "prompt_zh": "中文主 Prompt",
                "prompt_en": "English Variant",
                "recommendation_summary": {
                    "content_type": "insurance_product_explanation",
                    "density": "high",
                    "readability_risk": "medium"
                }
            }
            paths = tastecraft_image_log.append_event(root, event, date="2026-06-08")
            self.assertTrue(paths["jsonl"].exists())
            self.assertTrue(paths["markdown"].exists())
            rows = [json.loads(line) for line in paths["jsonl"].read_text(encoding="utf-8").splitlines()]
            self.assertEqual(rows[0]["status"], "draft_prompt")
            self.assertEqual(rows[0]["template_name_zh"], "蓝绿稳健汇报")
            summary = paths["markdown"].read_text(encoding="utf-8")
            self.assertIn("MGIUL 24核心特点和附加保险", summary)
            self.assertIn("draft_prompt", summary)

    def test_generated_image_requires_image_path_and_imagegen_prompt(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            with self.assertRaises(ValueError):
                tastecraft_image_log.append_event(root, {"status": "generated_image"}, date="2026-06-08")

            with self.assertRaises(ValueError):
                tastecraft_image_log.append_event(
                    root,
                    {"status": "generated_image", "image_path": "/tmp/example.png"},
                    date="2026-06-08",
                )


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run failing tests**

Run:

```bash
python3 -m unittest tests.test_tastecraft_image_log
```

Expected: fail because `scripts/tastecraft_image_log.py` does not exist yet.

- [ ] **Step 3: Implement logging helper**

Create `scripts/tastecraft_image_log.py`:

```python
#!/usr/bin/env python3
"""Append TasteCraft Image prompt and generation run logs."""

from __future__ import annotations

import argparse
import json
from datetime import datetime
from pathlib import Path
from typing import Any


VALID_STATUSES = {"draft_prompt", "generated_image", "feedback"}


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def log_paths(root: Path, date: str) -> dict[str, Path]:
    log_dir = root / "docs" / "project-log"
    return {
        "jsonl": log_dir / f"{date}-tastecraft-image-runs.jsonl",
        "markdown": log_dir / f"{date}-tastecraft-image.md",
    }


def validate_event(event: dict[str, Any]) -> None:
    status = event.get("status")
    if status not in VALID_STATUSES:
        raise ValueError(f"status must be one of {sorted(VALID_STATUSES)}")
    if status == "draft_prompt":
        for field in ("title", "template_id", "template_name_zh", "prompt_zh", "prompt_en"):
            if not event.get(field):
                raise ValueError(f"draft_prompt event missing {field}")
    if status == "generated_image":
        if not event.get("image_path"):
            raise ValueError("generated_image event missing image_path")
        if not event.get("imagegen_prompt"):
            raise ValueError("generated_image event missing imagegen_prompt")


def markdown_line(event: dict[str, Any]) -> str:
    title = event.get("title") or event.get("image_path") or "untitled"
    template = event.get("template_name_zh") or event.get("template_id") or "unknown-template"
    status = event["status"]
    return f"- `{status}` | {title} | {template}\n"


def append_event(root: Path, event: dict[str, Any], date: str | None = None) -> dict[str, Path]:
    validate_event(event)
    active_date = date or datetime.now().strftime("%Y-%m-%d")
    paths = log_paths(root, active_date)
    paths["jsonl"].parent.mkdir(parents=True, exist_ok=True)

    payload = dict(event)
    payload.setdefault("logged_at", datetime.now().isoformat(timespec="seconds"))

    with paths["jsonl"].open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(payload, ensure_ascii=False, sort_keys=True) + "\n")

    if not paths["markdown"].exists():
        paths["markdown"].write_text(f"# TasteCraft Image Log - {active_date}\n\n", encoding="utf-8")
    with paths["markdown"].open("a", encoding="utf-8") as handle:
        handle.write(markdown_line(payload))

    return paths


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("event_json", help="JSON object for the run event")
    parser.add_argument("--root", type=Path, default=repo_root(), help="Repository root")
    parser.add_argument("--date", help="YYYY-MM-DD log date override")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    event = json.loads(args.event_json)
    paths = append_event(args.root.resolve(), event, date=args.date)
    print(f"PASS: appended {event['status']} to {paths['jsonl']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

- [ ] **Step 4: Run log tests**

Run:

```bash
python3 -m unittest tests.test_tastecraft_image_log
```

Expected: pass.

## Task 3: TasteCraft Image Skill Package

**Files:**
- Create: `skills/tastecraft-image/SKILL.md`
- Create: `skills/tastecraft-image/agents/openai.yaml`

- [ ] **Step 1: Create the skill instructions**

Create `skills/tastecraft-image/SKILL.md`:

```markdown
---
name: tastecraft-image
description: Generate, review, log, and optionally execute Codex image prompts for one PowerPoint-ready whole-slide image from complete user-provided slide content. Use when the user wants Codex to turn pasted Chinese or bilingual content into a high-quality image-generation prompt, confirm it, and then generate a slide image.
---

# TasteCraft Image

## Purpose

Turn complete user-provided slide content into a confirmed Codex image-generation prompt for one PowerPoint-ready whole-slide image.

Default output is a single 16:9 finished-slide image prompt. Generate an image only after the user explicitly confirms generation.

## Load Before Work

- Load the built-in templates from `assets/tastecraft-image/templates.json`.
- Load custom templates from `assets/tastecraft-image/custom-templates.json` when present.
- Use `../../scripts/tastecraft_image_log.py` to append prompt and image run logs when working inside this repository.

## Default Workflow

1. Read the user's complete source content.
2. Identify the title, content type, core modules, must-preserve body copy, key numbers, limiting conditions, density risk, and aspect ratio if explicitly supplied.
3. Recommend one template by Chinese display name and give a short reason.
4. Offer one or two alternative templates when useful.
5. Return exactly these sections:
   - `内容识别摘要`
   - `推荐模板`
   - `中文主 Prompt`
   - `English Variant`
   - `确认生图`
6. Log the prompt as `draft_prompt`.
7. Wait for explicit generation confirmation.
8. After confirmation, call image generation with the Chinese primary prompt unless the user explicitly chooses another variant.
9. Log the image as `generated_image` with its saved path and the exact `imagegen_prompt` sent to the image model.

## Confirmation Rules

Only generate an image after explicit action wording, such as:

- `生成图片`
- `用这个 prompt 生图`
- `开始生成`
- `就用这个模板`
- `确认，生成图片`

Do not treat "方向不错", "可以", "看起来不错", or similar feedback as image-generation confirmation.

## Full-Content Policy

Preserve user-provided body copy by default. Do not summarize, shorten, delete information points, or keep only highlights unless the user explicitly asks for compression, extraction, summary, or a concise version.

Treat raw labels and wrappers such as `【主标题】`, `副标：`, `Subtitle:`, parentheses, bullets, and numbering as structure hints. Preserve the content after them, but do not ask the image model to render those wrappers as visible slide text.

If content is dense, warn about readability risk and suggest splitting, but still provide a single-page prompt unless the user chooses to split. Reduce decoration and increase layout density before proposing any content reduction.

## Template Selection

Use explicit classification plus judgment:

- content type;
- density level;
- seriousness level;
- page purpose;
- financial, insurance, tax, research, or mechanism relevance;
- visual risks such as text crowding or decorative overload.

Do not hard-code concrete object routes such as "insurance means shield", "Hong Kong means skyline", or "finance means ledger". Concrete metaphors are allowed only when they naturally come from the user's content and page objective.

Show users the Chinese template name, not internal IDs.

## Prompt Requirements

The Chinese primary prompt should say:

- create a pure AI whole-slide finished presentation image;
- no HTML/PPT overlay;
- only user-provided title, body copy, numbers, and necessary labels may appear;
- no user-unprovided conclusions, disclaimers, ratings, sources, template names, or internal instruction text;
- body copy is full-content by default;
- if dense, use reading-first multi-column, sectioned, table-like, or appendix-style layout;
- core readable information must occupy most visual attention;
- decoration must support the content.

The English variant should mirror the generation instructions but preserve Chinese body copy instead of translating it away.

## Custom Templates

When the user asks to create or customize a template:

1. Accept natural-language description.
2. Extract template intent, use cases, visual personality, composition, color/material cues, and avoid rules.
3. If information is missing, propose a tasteful first-pass completion.
4. Show `我补齐的模板假设` with three to five concise assumptions.
5. Generate a test prompt with the draft template.
6. If the user explicitly says to save the template, append it to `assets/tastecraft-image/custom-templates.json` with status `draft`.
7. After saving, warn that the template file is git-managed and should be checked for private information before commit or push.

Real image testing is not required before saving a custom template.

## Logging

Every prompt generation should be logged as `draft_prompt`.

Every image generation should be logged as `generated_image`, including the exact `imagegen_prompt` used for that image. Retry or shortened prompts must be logged as the actual prompt that produced the image, not only as the earlier draft.

Use the daily TasteCraft Image JSONL ledger as the machine ledger and the daily TasteCraft Image Markdown summary as the human-readable summary under `docs/project-log/`.

Do not log hidden internal reasoning. Log the visible image-generation prompt and a recommendation summary: content type, density level, recommended template, alternatives, readability risk, confirmation state, image path, and feedback summary.

## Image Review

When reviewing generated images, check:

1. Title and key body copy are complete and readable.
2. Numbers and limiting conditions are accurate.
3. No unprovided disclaimer, source, rating, template name, or internal instruction text appears.
4. Core information receives enough visual attention.
5. Decoration and metaphor support content rather than distracting from it.

If the image has garbled Chinese, missing body copy, wrong numbers, unrelated objects, fake disclaimers, visible template names, or excessive decoration, treat it as a failed generation or prompt-quality issue. Propose a revised prompt direction; do not silently shorten the source content.
```

- [ ] **Step 2: Create OpenAI agent metadata**

Create `skills/tastecraft-image/agents/openai.yaml`:

```yaml
interface:
  display_name: "TasteCraft Image"
  short_description: "Turn pasted slide content into confirmed Codex image prompts and generated PPT-ready images."
  default_prompt: "Use TasteCraft Image to analyze the user's complete slide content, choose a suitable template, produce a Chinese primary image prompt plus English variant, log the prompt, and wait for explicit confirmation before generating an image."
```

- [ ] **Step 3: Run skill metadata validation**

Run:

```bash
python3 scripts/validate_skill_metadata.py --strict
```

Expected: pass.

## Task 4: Default Packaging And Public Docs

**Files:**
- Modify: `scripts/build_dist.py`
- Modify: `tests/test_tooling_scripts.py`
- Modify: `README.md`
- Modify: `PROJECT_STATUS.md`
- Modify: `docs/architecture.md`

- [ ] **Step 1: Add packaging tests**

Extend `tests/test_tooling_scripts.py` with:

```python
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
            dist = root / "out"

            manifest = build_dist.build_packages(root, dist)

            self.assertEqual(manifest["package_count"], 1)
            self.assertEqual(manifest["packages"][0]["name"], "tastecraft-image")
            self.assertTrue((dist / "tastecraft-image" / "SKILL.md").exists())
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

            self.assertEqual({package["name"] for package in manifest["packages"]}, {"tastecraft-image", "legacy-skill"})
```

- [ ] **Step 2: Run failing packaging tests**

Run:

```bash
python3 -m unittest tests.test_tooling_scripts.ToolingScriptTests.test_build_dist_defaults_to_tastecraft_image_when_present tests.test_tooling_scripts.ToolingScriptTests.test_build_dist_include_legacy_keeps_all_skills
```

Expected: fail because `include_legacy` does not exist and default still packages every skill.

- [ ] **Step 3: Modify packaging script**

In `scripts/build_dist.py`:

1. Change `build_packages` signature to:

```python
def build_packages(root: Path, dist_dir: Path, clean: bool = False, dry_run: bool = False, include_legacy: bool = False) -> dict[str, object]:
```

2. After `skills = discover_skills(root)`, add:

```python
    if not include_legacy:
        primary = [path for path in skills if path.name == "tastecraft-image"]
        if primary:
            skills = primary
```

3. Add CLI flag:

```python
    parser.add_argument("--include-legacy", action="store_true", help="Package all legacy skills instead of only tastecraft-image")
```

4. Pass it in `main`:

```python
        manifest = build_packages(root, dist_dir, clean=args.clean, dry_run=args.dry_run, include_legacy=args.include_legacy)
```

- [ ] **Step 4: Update public docs**

Edit docs in-place:

- `README.md`
  - first paragraph should say the current V1 main entry is `tastecraft-image`;
  - repository map should list `skills/tastecraft-image/` first;
  - legacy skills should be labeled legacy/secondary;
  - quick start should show invoking `$tastecraft-image` with pasted content.
- `PROJECT_STATUS.md`
  - current state should say V1 is Codex-first image prompt skill;
  - next step should be implementing `tastecraft-image`, not revising generic six templates.
- `docs/architecture.md`
  - system pieces should include `skills/tastecraft-image/`;
  - legacy skills should be called legacy/secondary;
  - data flow should start with Codex conversation and confirmed prompt/image logs.

- [ ] **Step 5: Run packaging and docs checks**

Run:

```bash
python3 -m unittest tests.test_tooling_scripts
python3 scripts/build_dist.py --dry-run
python3 scripts/build_dist.py --dry-run --include-legacy
python3 scripts/validate_references.py --strict
```

Expected:

- tooling tests pass;
- default dry-run lists only `tastecraft-image`;
- include-legacy dry-run lists all skills;
- reference validation passes.

## Task 5: Integration Validation

**Files:**
- No new file ownership; controller runs this after tasks complete.

- [ ] **Step 1: Run full validation suite**

Run:

```bash
python3 scripts/validate_skill_metadata.py --strict
python3 scripts/validate_tastecraft_image_templates.py --strict
python3 scripts/validate_references.py --strict
python3 scripts/validate_schema_examples.py
python3 scripts/smoke_test_console.py
python3 scripts/scan_sensitive_files.py
python3 scripts/build_dist.py --dry-run
python3 scripts/build_dist.py --dry-run --include-legacy
python3 -m unittest discover -s tests
git diff --check
```

Expected: all commands pass.

- [ ] **Step 2: Verify dirty-worktree scope**

Run:

```bash
git status --short
```

Expected: tastecraft-image implementation files are present, and pre-existing unrelated dirty files remain untouched unless their task explicitly assigned them.

- [ ] **Step 3: Final review**

Dispatch a final read-only reviewer to check:

- `tastecraft-image` is the public main entry;
- legacy skills are not removed;
- default packaging prioritizes `tastecraft-image`;
- template JSON has six user-facing Chinese names with color/material cues;
- custom template flow and prompt confirmation rules are present in the skill;
- logging helper covers `draft_prompt` and `generated_image`;
- no prompt rule introduces fixed object hard-coding.
