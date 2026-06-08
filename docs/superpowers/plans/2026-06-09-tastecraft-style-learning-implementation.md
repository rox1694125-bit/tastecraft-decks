# TasteCraft Style Learning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a narrow `style-learning` mode to `tastecraft-image` so reference PPT images can be analyzed into reusable aesthetic guidance and draft template records without 1:1 replication.

**Architecture:** Keep `tastecraft-image` as the single public skill and add a second mode in its instructions. Extend the existing `scripts/tastecraft_image_log.py` ledger helper with a `style_learning` status that writes JSONL records under `docs/project-log/style-learning/`, while leaving prompt/image logs unchanged.

**Tech Stack:** Markdown Codex skill instructions, Python standard library JSON/argparse/pathlib helpers, Python `unittest`, existing template validator and packaging scripts.

---

## File Structure

- Modify `skills/tastecraft-image/SKILL.md`: documents mode selection, `style-learning` output structure, save rules, and anti-replication boundaries.
- Modify `scripts/tastecraft_image_log.py`: adds `style_learning` validation and writes style-learning records to a dedicated JSONL path.
- Modify `tests/test_tastecraft_image_templates.py`: adds documentation regression checks for the new mode and no-1:1-replication boundary.
- Modify `tests/test_tastecraft_image_log.py`: adds schema/path tests for saved style-learning records.
- No changes to `assets/tastecraft-image/custom-templates.json` in this implementation slice. Real templates are saved only after a user-approved style-learning session.

## Task 1: Guard The Skill Documentation Contract

**Files:**
- Modify: `tests/test_tastecraft_image_templates.py`
- Test: `tests/test_tastecraft_image_templates.py`

- [ ] **Step 1: Write the failing documentation test**

Add this test inside `TasteCraftImageTemplateTests` after `test_skill_keeps_core_prompt_workflow_principles`:

```python
    def test_skill_documents_style_learning_mode_and_boundaries(self) -> None:
        skill = (ROOT / "skills" / "tastecraft-image" / "SKILL.md").read_text(encoding="utf-8")

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
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
python3 -m unittest tests.test_tastecraft_image_templates.TasteCraftImageTemplateTests.test_skill_documents_style_learning_mode_and_boundaries
```

Expected: `FAIL` because `skills/tastecraft-image/SKILL.md` does not yet mention `style-learning` and the image-replication boundary.

- [ ] **Step 3: Commit nothing**

Do not commit after a red test. Continue to Task 2.

## Task 2: Add Style-Learning Mode To The Skill

**Files:**
- Modify: `skills/tastecraft-image/SKILL.md`
- Test: `tests/test_tastecraft_image_templates.py`

- [ ] **Step 1: Add mode selection guidance**

Insert this section after `## Core Principles`:

```markdown
## Mode Selection

- `content-to-prompt`: use when the user provides slide content and wants a Codex image prompt or generated PPT-ready image.
- `style-learning` / `样图风格学习`: use when the user provides or references a PPT image and asks to learn the style, reverse-analyze it, explain why it works, or turn it into a reusable template draft.

Common `style-learning` triggers include "学习这张图的风格", "反解析这张 PPT 图", "从这个样例提炼模板", "总结这张图为什么好看", and "把这张图沉淀成模板".
```

- [ ] **Step 2: Add the style-learning workflow**

Insert this section after `## Default Workflow`:

```markdown
## Style-Learning Workflow

Style-learning is not image replication. It extracts transferable aesthetic principles, information architecture, color/material treatment, and template guidance. It must not produce a 1:1 reconstruction prompt, exact coordinate map, logo extraction, character likeness, or reference-specific copy instruction.

When using `style-learning`, output these fixed sections:

1. `审美分析`: main temperament, layout structure, color/material direction, typography and hierarchy, main visual strategy, and the 3-5 strengths worth learning.
2. `迁移判断`: suitable content types, unsuitable content types, reusable elements, elements that should not be hard-applied, and the boundary from 1:1 replication.
3. `模板草案`: a draft custom-template schema with direct Chinese naming, use cases, selection signals, art direction, composition, color rules, palette, avoid rules, density fit, and `status: draft`.
4. `测试建议`: the best first content type, suitable density, whether to use existing or synthetic test content, and visual risks to inspect after generation.

Template names generated from reference images must be direct, Chinese-first, and include a primary color or style cue. Avoid abstract names that ordinary users cannot understand.
```

- [ ] **Step 3: Add style-learning save rules**

Insert this section after `## Custom Templates`:

```markdown
## Style-Learning Save Rules

Only save a style-learning result when the user explicitly says to save it, such as "保存到模板", "保存这个模板", or "把这个样图学习结果保存下来". Weak approval such as "方向可以" or "挺好" is not enough to write project files.

When saving, append the machine-usable draft template to `assets/tastecraft-image/custom-templates.json` and append the analysis record to `docs/project-log/style-learning/YYYY-MM-DD-style-learning.jsonl`.

Do not save the source image. Do not save exact coordinates, copy-this-layout instructions, proprietary logos, identifiable brand elements, or descriptions that enable close replication of a copyrighted reference image.
```

- [ ] **Step 4: Add logging mention**

In `## Logging`, add this bullet:

```markdown
- Record saved reference-image learning sessions as `style_learning` JSONL records under `docs/project-log/style-learning/`; these records preserve aesthetic analysis and template reasoning but never the source image itself.
```

- [ ] **Step 5: Run the documentation test**

Run:

```bash
python3 -m unittest tests.test_tastecraft_image_templates.TasteCraftImageTemplateTests.test_skill_documents_style_learning_mode_and_boundaries
```

Expected: `OK`.

- [ ] **Step 6: Commit the documentation behavior**

Run:

```bash
git add skills/tastecraft-image/SKILL.md tests/test_tastecraft_image_templates.py
git commit -m "docs: add tastecraft style learning mode"
```

## Task 3: Add Failing Style-Learning Log Tests

**Files:**
- Modify: `tests/test_tastecraft_image_log.py`
- Test: `tests/test_tastecraft_image_log.py`

- [ ] **Step 1: Add a style-learning event fixture**

Add this helper method inside `TasteCraftImageLogTests` after `draft_event`:

```python
    def style_learning_event(self) -> dict[str, object]:
        return {
            "status": "style_learning",
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
```

- [ ] **Step 2: Add a test for dedicated JSONL path and no image persistence**

Add this test inside `TasteCraftImageLogTests`:

```python
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
```

- [ ] **Step 3: Add a test for required schema fields**

Add this test inside `TasteCraftImageLogTests`:

```python
    def test_style_learning_requires_schema_fields(self) -> None:
        event = self.style_learning_event()
        del event["aesthetic_analysis"]

        with self.assertRaises(ValueError) as context:
            tastecraft_image_log.validate_event(event)

        self.assertIn("style_learning missing required fields: aesthetic_analysis", str(context.exception))
```

- [ ] **Step 4: Add a test for first-version constraints**

Add this test inside `TasteCraftImageLogTests`:

```python
    def test_style_learning_rejects_saved_source_image_and_non_null_merge_group(self) -> None:
        event = self.style_learning_event()
        event["source_image"] = "/tmp/reference.png"

        with self.assertRaises(ValueError) as context:
            tastecraft_image_log.validate_event(event)

        self.assertIn("style_learning must not store source_image", str(context.exception))

        event = self.style_learning_event()
        event["merge_group"] = "future-group"

        with self.assertRaises(ValueError) as context:
            tastecraft_image_log.validate_event(event)

        self.assertIn("style_learning merge_group must be null in v1", str(context.exception))
```

- [ ] **Step 5: Run log tests to verify they fail**

Run:

```bash
python3 -m unittest tests.test_tastecraft_image_log
```

Expected: `FAIL` or `ERROR` because `style_learning` is not yet a valid log status.

- [ ] **Step 6: Commit nothing**

Do not commit after a red test. Continue to Task 4.

## Task 4: Implement Style-Learning Log Validation And Pathing

**Files:**
- Modify: `scripts/tastecraft_image_log.py`
- Test: `tests/test_tastecraft_image_log.py`

- [ ] **Step 1: Add status and required fields**

Replace the existing status constants near the top of `scripts/tastecraft_image_log.py` with:

```python
VALID_STATUSES = {"draft_prompt", "generated_image", "feedback", "style_learning"}
DRAFT_PROMPT_REQUIRED_FIELDS = {"title", "template_id", "template_name_zh", "prompt_zh", "prompt_en"}
STYLE_LEARNING_REQUIRED_FIELDS = {
    "source_type",
    "source_note",
    "template_id",
    "template_name_zh",
    "aesthetic_analysis",
    "transfer_guidance",
    "template_draft",
    "test_suggestion",
    "maturity",
    "merge_group",
    "created_at",
}
```

- [ ] **Step 2: Add style-learning log path helper**

Add this function after `log_paths`:

```python
def style_learning_log_paths(root: Union[str, Path], date: str) -> dict[str, Path]:
    safe_date = validate_date(date)
    log_dir = Path(root) / "docs" / "project-log" / "style-learning"
    return {
        "jsonl": log_dir / f"{safe_date}-style-learning.jsonl",
    }
```

- [ ] **Step 3: Add validation branch**

Add this branch at the end of `validate_event`:

```python
    if status == "style_learning":
        missing = sorted(field for field in STYLE_LEARNING_REQUIRED_FIELDS if field not in event)
        if missing:
            raise ValueError(f"style_learning missing required fields: {', '.join(missing)}")
        if event.get("source_type") != "single_reference_image":
            raise ValueError("style_learning source_type must be single_reference_image")
        if event.get("maturity") != "draft":
            raise ValueError("style_learning maturity must be draft in v1")
        if event.get("merge_group") is not None:
            raise ValueError("style_learning merge_group must be null in v1")
        if event.get("source_image"):
            raise ValueError("style_learning must not store source_image")
        if event.get("image_path"):
            raise ValueError("style_learning must not store image_path")
        for field in ("aesthetic_analysis", "transfer_guidance", "template_draft", "test_suggestion"):
            if not isinstance(event.get(field), dict):
                raise ValueError(f"style_learning {field} must be an object")
```

- [ ] **Step 4: Route append_event for style-learning**

Replace the body of `append_event` with:

```python
def append_event(root: Union[str, Path], event: dict[str, Any], date: Optional[str] = None) -> dict[str, Path]:
    event_to_log = dict(event)
    event_to_log.setdefault("logged_at", datetime.now().replace(microsecond=0).isoformat())
    if event_to_log.get("status") == "style_learning":
        event_to_log.setdefault("created_at", event_to_log["logged_at"])
    validate_event(event_to_log)

    log_date = validate_date(date or datetime.now().date().isoformat())

    if event_to_log.get("status") == "style_learning":
        paths = style_learning_log_paths(root, log_date)
        paths["jsonl"].parent.mkdir(parents=True, exist_ok=True)
        with paths["jsonl"].open("a", encoding="utf-8") as jsonl_file:
            jsonl_file.write(json.dumps(event_to_log, ensure_ascii=False, sort_keys=True) + "\n")
        return paths

    paths = log_paths(root, log_date)
    paths["jsonl"].parent.mkdir(parents=True, exist_ok=True)

    with paths["jsonl"].open("a", encoding="utf-8") as jsonl_file:
        jsonl_file.write(json.dumps(event_to_log, ensure_ascii=False, sort_keys=True) + "\n")

    if not paths["markdown"].exists():
        paths["markdown"].write_text(f"# TasteCraft Image Log - {log_date}\n\n", encoding="utf-8")
    with paths["markdown"].open("a", encoding="utf-8") as markdown_file:
        markdown_file.write(markdown_line(event_to_log))

    return paths
```

- [ ] **Step 5: Run log tests**

Run:

```bash
python3 -m unittest tests.test_tastecraft_image_log
```

Expected: `OK`.

- [ ] **Step 6: Run the CLI smoke check**

Run:

```bash
python3 scripts/tastecraft_image_log.py '{"status":"style_learning","source_type":"single_reference_image","source_note":"user-provided reference image, image not saved","template_id":"custom-deep-blue-premium-briefing","template_name_zh":"深蓝金｜高端金融简报","aesthetic_analysis":{"temperament":"克制高级"},"transfer_guidance":{"suitable":["高端金融"]},"template_draft":{"id":"custom-deep-blue-premium-briefing","name_zh":"深蓝金｜高端金融简报","status":"draft"},"test_suggestion":{"density":"medium"},"user_feedback":"保存草案","maturity":"draft","merge_group":null}' --date 2026-06-09 --root /private/tmp/tastecraft-style-learning-smoke
```

Expected: JSON output with a `jsonl` path ending in `/docs/project-log/style-learning/2026-06-09-style-learning.jsonl`.

- [ ] **Step 7: Commit the logging behavior**

Run:

```bash
git add scripts/tastecraft_image_log.py tests/test_tastecraft_image_log.py
git commit -m "feat: log tastecraft style learning records"
```

## Task 5: Run Full Verification

**Files:**
- Verify only.

- [ ] **Step 1: Run template validation**

Run:

```bash
python3 scripts/validate_tastecraft_image_templates.py --strict
```

Expected: `PASS: tastecraft-image templates valid with 0 warning(s)`.

- [ ] **Step 2: Run focused tests**

Run:

```bash
python3 -m unittest tests.test_tastecraft_image_templates tests.test_tastecraft_image_log
```

Expected: all tests pass.

- [ ] **Step 3: Run full tests**

Run:

```bash
python3 -m unittest discover -s tests
```

Expected: all tests pass.

- [ ] **Step 4: Run metadata and reference checks**

Run:

```bash
python3 scripts/validate_skill_metadata.py --strict
python3 scripts/validate_references.py --strict
python3 scripts/build_dist.py --dry-run
git diff --check
```

Expected:

```text
PASS: validated 5 skill metadata file(s) with 0 warning(s)
PASS: reference check completed with 0 warning(s)
PASS: planned 1 skill package(s) in /Volumes/mySSD/projects/tastecraft-deck/dist/skills
```

`git diff --check` should produce no output.

- [ ] **Step 5: Confirm unrelated files stay uncommitted**

Run:

```bash
git status --short
```

Expected: implementation files are clean after the two commits. Existing local-only files may remain untracked:

```text
?? .superpowers/
?? docs/project-log/2026-06-08-tastecraft-image-runs.jsonl
?? docs/project-log/2026-06-08-tastecraft-image.md
```

Do not add those local-only files unless the user explicitly asks.

## Self-Review

Spec coverage:

- Mode lives inside `tastecraft-image`: Task 2.
- Single-image style-learning only: Task 2 and Task 4 validate `source_type` and `merge_group`.
- Four output sections: Task 2.
- Explicit save rules and weak approval boundary: Task 2.
- Style-learning JSONL record: Task 4.
- No source image storage: Task 2 and Task 4.
- No multi-image merge implementation: Task 4 keeps `merge_group` null.
- No browser workbench or built-in promotion: no task introduces them.

Placeholder scan: this plan contains no unresolved placeholders or deferred implementation instructions. Each code-changing step includes exact code to add or replace.

Type consistency: the plan uses `style_learning` as the log status, `style-learning` as the skill mode label, and `single_reference_image` as the saved source type consistently.
