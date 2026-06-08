# Prompt Workbench Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a simple single-page Prompt Workbench for ordinary content users to paste source content, generate a Codex structuring request, paste structured output, review fields, and copy a recommended image prompt.

**Architecture:** Add a simple-mode layer in front of the existing static console while preserving the professional seven-panel console behind an advanced link. Reuse the existing `assets/tastecraft-console/app.js` state and prompt-template generation so prompt behavior stays consistent with the current optimized templates. Keep all work local and static: no API calls, no backend, no image generation from HTML.

**Tech Stack:** Static HTML/CSS/JavaScript, existing Node VM tests in `tests/test_console_prompt_templates.py`, existing Python smoke checks in `scripts/smoke_test_console.py`.

---

## File Structure

- Modify `assets/tastecraft-console/index.html`
  - Add the simple Prompt Workbench shell before the professional `.app-shell`.
  - Keep the existing professional console markup intact and reachable through `高级控制台`.
- Modify `assets/tastecraft-console/style.css`
  - Add simple-mode layout, stage cards, copyable prompt areas, review fields, and collapsed style variants.
  - Do not change the current professional console styling except hiding it behind the new mode by default.
- Modify `assets/tastecraft-console/app.js`
  - Add workbench state, request generation, structured-result parsing, mapping into existing deck/page/prompt state, recommended prompt generation, six-style variant generation, copy helpers, and mode toggling.
  - Keep existing prompt template functions as the single source of truth.
- Modify `tests/test_console_prompt_templates.py`
  - Add unit coverage for workbench request generation, structured-result mapping, full-content prompt policy, no keyword object-list injection, and six-style variant availability.
- Modify `scripts/smoke_test_console.py`
  - Add static smoke checks for the simple-mode DOM markers and advanced-console fallback.

Because the current worktree contains pre-existing uncommitted edits, implementation agents must not run broad git add or commits. The controller will handle final review and commit scope later if requested.

## Task 1: Workbench Data And Prompt API

**Files:**
- Modify: `tests/test_console_prompt_templates.py`
- Modify: `assets/tastecraft-console/app.js`

- [ ] **Step 1: Write failing tests for workbench request generation**

Add a test method to `ConsolePromptTemplateTests`:

```python
    def test_workbench_generates_codex_structuring_request(self) -> None:
        node = shutil.which("node")
        if not node:
            self.skipTest("node is required for console prompt template tests")

        app_path = ROOT / "assets" / "tastecraft-console" / "app.js"
        code = textwrap.dedent(
            """
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
            if (!api || typeof api.buildWorkbenchStructuringRequestForTest !== 'function') {
              throw new Error('workbench structuring request API is missing');
            }
            const request = api.buildWorkbenchStructuringRequestForTest('【主标题】香港重疾险方案\\n（副标：完整保障说明）\\n1. 保障：必须完整保留正文。');
            console.log(JSON.stringify({ request }));
            """
        )
        result = subprocess.run(
            [node, "-e", code, str(app_path)],
            cwd=ROOT,
            text=True,
            capture_output=True,
            check=False,
        )
        self.assertEqual(result.returncode, 0, result.stderr or result.stdout)

        request = json.loads(result.stdout)["request"]
        self.assertIn("请把下面的原始内容拆解为 Prompt 工作台 JSON", request)
        self.assertIn('"title"', request)
        self.assertIn('"sections"', request)
        self.assertIn('"must_preserve"', request)
        self.assertIn("不要摘要、删减或改写用户正文", request)
        self.assertIn("香港重疾险方案", request)
```

- [ ] **Step 2: Run the failing test**

Run:

```bash
python3 -m unittest tests.test_console_prompt_templates.ConsolePromptTemplateTests.test_workbench_generates_codex_structuring_request
```

Expected: fail with `workbench structuring request API is missing`.

- [ ] **Step 3: Implement `buildWorkbenchStructuringRequest`**

Add these functions near existing prompt helper functions in `assets/tastecraft-console/app.js`:

```javascript
  function buildWorkbenchStructuringRequest(rawContent) {
    var source = String(rawContent || "").trim();
    return [
      "请把下面的原始内容拆解为 Prompt 工作台 JSON。",
      "",
      "要求：",
      "1. 不要摘要、删减或改写用户正文；如果内容很长，也要保留完整正文。",
      "2. 把【主标题】、副标：、括号、编号和项目符号理解为结构提示，不要把这些包装符号当成正式文案。",
      "3. 只在用户明确表达时填写 forbidden_elements；不要根据保险、香港、金融、AI 等关键词套用固定物件清单。",
      "4. 返回严格 JSON，不要包裹 Markdown 代码块。",
      "",
      "JSON 结构：",
      "{",
      '  "title": "",',
      '  "subtitle": "",',
      '  "audience": "",',
      '  "scenario": "",',
      '  "sections": [{ "heading": "", "body": "" }],',
      '  "must_preserve": [],',
      '  "key_numbers": [],',
      '  "forbidden_elements": [],',
      '  "style_intent": "",',
      '  "density_notes": ""',
      "}",
      "",
      "原始内容：",
      source
    ].join("\\n");
  }
```

Expose it in `window.__tastecraftConsole`:

```javascript
    buildWorkbenchStructuringRequestForTest: buildWorkbenchStructuringRequest,
```

- [ ] **Step 4: Run the test to verify green**

Run:

```bash
python3 -m unittest tests.test_console_prompt_templates.ConsolePromptTemplateTests.test_workbench_generates_codex_structuring_request
```

Expected: pass.

- [ ] **Step 5: Write failing tests for structured-result mapping and six variants**

Add a second test:

```python
    def test_workbench_structured_result_generates_recommended_prompt_and_six_styles(self) -> None:
        node = shutil.which("node")
        if not node:
            self.skipTest("node is required for console prompt template tests")

        app_path = ROOT / "assets" / "tastecraft-console" / "app.js"
        structured = {
            "title": "星河安康计划：香港重疾险性价比之王",
            "subtitle": "160年保险世家诚意之作",
            "audience": "香港保险顾问",
            "scenario": "client-presentation",
            "sections": [
                {"heading": "极致性价比", "body": "20/25年交，缴费期满现金价值保证回本，并有额外非保证分红。"},
                {"heading": "核心赔付强", "body": "最高700%的守护力，最高可理赔7次。"}
            ],
            "must_preserve": ["完整正文必须上图"],
            "key_numbers": ["700%", "7次", "20/25年"],
            "forbidden_elements": ["虚假 logo"],
            "style_intent": "专业、可信、有金融质感",
            "density_notes": "内容较密，优先调整版式密度。"
        }
        code = textwrap.dedent(
            """
            const fs = require('fs');
            const vm = require('vm');
            const appPath = process.argv[1];
            const structured = JSON.parse(process.argv[2]);
            const app = fs.readFileSync(appPath, 'utf8');
            const sandbox = {
              window: {},
              document: { addEventListener() {} }
            };
            vm.createContext(sandbox);
            vm.runInContext(app, sandbox, { filename: appPath });
            const api = sandbox.window.__tastecraftConsole;
            if (!api || typeof api.applyWorkbenchStructuredResultForTest !== 'function') {
              throw new Error('workbench structured result API is missing');
            }
            const result = api.applyWorkbenchStructuredResultForTest(structured);
            console.log(JSON.stringify(result));
            """
        )
        result = subprocess.run(
            [node, "-e", code, str(app_path), json.dumps(structured, ensure_ascii=False)],
            cwd=ROOT,
            text=True,
            capture_output=True,
            check=False,
        )
        self.assertEqual(result.returncode, 0, result.stderr or result.stdout)

        payload = json.loads(result.stdout)
        self.assertEqual(payload["recommended_template_id"], "market-slate")
        self.assertIn("星河安康计划", payload["recommended_prompt"]["positive_prompt"])
        self.assertIn("完整正文", payload["recommended_prompt"]["positive_prompt"])
        self.assertIn("不要根据关键词套用固定物件清单", payload["recommended_prompt"]["positive_prompt"])
        self.assertNotIn("层级保护结构", payload["recommended_prompt"]["positive_prompt"])
        self.assertEqual(len(payload["style_variants"]), 6)
        self.assertEqual(
            {item["template_id"] for item in payload["style_variants"]},
            {"citrus-editorial", "market-slate", "atelier-rose", "harbor-mint", "ink-copper", "orchard-lab"},
        )
```

- [ ] **Step 6: Run the new failing test**

Run:

```bash
python3 -m unittest tests.test_console_prompt_templates.ConsolePromptTemplateTests.test_workbench_structured_result_generates_recommended_prompt_and_six_styles
```

Expected: fail with `workbench structured result API is missing`.

- [ ] **Step 7: Implement structured-result mapping helpers**

Add these helper functions in `assets/tastecraft-console/app.js`:

```javascript
  var workbenchTemplateIds = ["citrus-editorial", "market-slate", "atelier-rose", "harbor-mint", "ink-copper", "orchard-lab"];

  function sectionText(section) {
    if (!section) {
      return "";
    }
    if (typeof section === "string") {
      return section;
    }
    return [section.heading, section.body].filter(Boolean).join("：");
  }

  function structuredContentToNotes(structured) {
    var lines = [];
    if (structured.subtitle) {
      lines.push("副标题：" + structured.subtitle);
    }
    (structured.sections || []).forEach(function (section, index) {
      var text = sectionText(section);
      if (text) {
        lines.push((index + 1) + ". " + text);
      }
    });
    if (structured.must_preserve && structured.must_preserve.length) {
      lines.push("必须完整保留：" + structured.must_preserve.join("；"));
    }
    if (structured.key_numbers && structured.key_numbers.length) {
      lines.push("关键数字：" + structured.key_numbers.join("；"));
    }
    if (structured.density_notes) {
      lines.push("密度说明：" + structured.density_notes);
    }
    return lines.join("\\n\\n");
  }

  function workbenchPageFromStructured(structured) {
    var title = structured.title || firstMeaningfulLine(structuredContentToNotes(structured)) || "未命名内容";
    return {
      page_id: "page-workbench-01",
      index: 1,
      type: "visual",
      title: title,
      objective: "把用户提供的完整内容整理成一张高可信度、可读、可直接用于 Codex 生图的演示页。",
      density: "reading-first",
      content_inputs: { notes: structuredContentToNotes(structured) },
      layout_variant: "single-page-prompt-workbench",
      visual_role: structured.style_intent || "professional high-density presentation image",
      logo_policy: "none",
      image_prompt_refs: ["prompt-workbench-01"],
      overrides: {},
      status: "needs_prompt"
    };
  }

  function firstMeaningfulLine(text) {
    return String(text || "").split(/\\n+/).map(function (line) {
      return line.trim();
    }).filter(Boolean)[0] || "";
  }

  function makePromptWithTemplate(page, templateId) {
    var previousPreset = state.theme.palette.preset_id;
    var previousCustom = state.theme.palette.custom;
    var previousColors = copy(state.theme.palette.colors);
    state.theme.palette.preset_id = templateId;
    state.theme.palette.custom = false;
    state.theme.palette.colors = copy(palettes[templateId]);
    var prompt = makePromptForPage(page, null);
    state.theme.palette.preset_id = previousPreset;
    state.theme.palette.custom = previousCustom;
    state.theme.palette.colors = previousColors;
    return prompt;
  }

  function applyWorkbenchStructuredResult(structured) {
    var normalized = copy(structured || {});
    normalized.sections = normalized.sections || [];
    normalized.must_preserve = normalized.must_preserve || [];
    normalized.key_numbers = normalized.key_numbers || [];
    normalized.forbidden_elements = normalized.forbidden_elements || [];
    var page = workbenchPageFromStructured(normalized);
    state.brief.topic = page.title;
    state.brief.audience = normalized.audience || state.brief.audience || "内容使用者";
    state.brief.scenario = normalized.scenario || state.brief.scenario || "client-presentation";
    state.brief.goal = "将用户粘贴的完整内容转化为一张可读、专业、可直接生图的演示页。";
    state.theme.imagery.style_direction = normalized.style_intent || state.theme.imagery.style_direction;
    state.theme.imagery.forbidden_elements = normalized.forbidden_elements;
    state.theme.palette.preset_id = "market-slate";
    state.theme.palette.custom = false;
    state.theme.palette.colors = copy(palettes["market-slate"]);
    state.pages = [page];
    state.output.slide_count = 1;
    state.selectedPageId = page.page_id;
    syncPromptsFromPages(false);
    state.selectedPromptId = page.image_prompt_refs[0];
    var recommended = state.prompts[0];
    return {
      structured_content: normalized,
      recommended_template_id: "market-slate",
      recommended_prompt: recommended,
      style_variants: workbenchTemplateIds.map(function (templateId) {
        var prompt = makePromptWithTemplate(page, templateId);
        return {
          template_id: templateId,
          template_name: promptStyleTemplates[templateId].name,
          positive_prompt: prompt.positive_prompt,
          negative_prompt: prompt.negative_prompt
        };
      })
    };
  }
```

Expose for tests:

```javascript
    applyWorkbenchStructuredResultForTest: applyWorkbenchStructuredResult,
```

- [ ] **Step 8: Run Task 1 tests**

Run:

```bash
python3 -m unittest tests.test_console_prompt_templates.ConsolePromptTemplateTests.test_workbench_generates_codex_structuring_request tests.test_console_prompt_templates.ConsolePromptTemplateTests.test_workbench_structured_result_generates_recommended_prompt_and_six_styles
```

Expected: both pass.

## Task 2: Simple Workbench HTML And CSS

**Files:**
- Modify: `assets/tastecraft-console/index.html`
- Modify: `assets/tastecraft-console/style.css`

- [ ] **Step 1: Add simple-mode markup before `.app-shell`**

In `assets/tastecraft-console/index.html`, place this block immediately after `<body>` and before the existing `<div class="app-shell">`:

```html
    <div class="simple-workbench" id="simpleWorkbench">
      <header class="simple-header">
        <div>
          <p class="eyebrow">Prompt 工作台</p>
          <h1>把完整内容变成可用的图片 Prompt</h1>
          <p class="simple-subtitle">先粘贴内容，再交给 Codex 拆解，最后确认并复制推荐 Prompt。</p>
        </div>
        <button type="button" class="secondary-button" id="openAdvancedConsoleBtn">高级控制台</button>
      </header>

      <nav class="workbench-steps" aria-label="Prompt 工作台步骤">
        <span class="step-pill active" data-workbench-step="1">1 粘贴内容</span>
        <span class="step-pill" data-workbench-step="2">2 交给 Codex 拆解</span>
        <span class="step-pill" data-workbench-step="3">3 确认 Prompt</span>
      </nav>

      <main class="workbench-panel">
        <section class="workbench-stage" id="workbenchStagePaste">
          <div class="stage-heading">
            <div>
              <h2>粘贴完整内容</h2>
              <p>粘贴你的标题、正文、要点或完整文案。不要先整理成复杂表单。</p>
            </div>
            <span class="status-pill" id="workbenchRawStatus">待输入</span>
          </div>
          <label class="wide-field">
            原始内容
            <textarea id="workbenchRawContent" rows="12" placeholder="例如：&#10;【主标题】...&#10;（副标：...）&#10;1. 核心要点..."></textarea>
          </label>
          <p class="inline-hint" id="workbenchRawHint">先粘贴一段内容。</p>
          <div class="button-row">
            <button type="button" class="primary-button" id="buildStructuringRequestBtn" disabled>生成 Codex 拆解请求</button>
            <button type="button" class="secondary-button" id="loadWorkbenchSampleBtn">加载示例</button>
            <button type="button" class="secondary-button" id="clearWorkbenchBtn">清空</button>
          </div>
        </section>

        <section class="workbench-stage" id="workbenchStageStructure">
          <div class="stage-heading">
            <div>
              <h2>交给 Codex 拆解</h2>
              <p>复制下面的请求到 Codex，再把 Codex 返回的结构化结果粘回这里。</p>
            </div>
            <span class="status-pill" id="workbenchStructureStatus">等待拆解</span>
          </div>
          <label class="wide-field">
            Codex 拆解请求
            <textarea id="workbenchStructuringRequest" rows="9" readonly></textarea>
          </label>
          <div class="button-row">
            <button type="button" class="primary-button" id="copyStructuringRequestBtn">复制拆解请求</button>
          </div>
          <label class="wide-field">
            粘贴 Codex 返回的结构化结果
            <textarea id="workbenchStructuredInput" rows="9" placeholder='{"title":"","sections":[{"heading":"","body":""}]}'></textarea>
          </label>
          <p class="inline-hint" id="workbenchStructuredHint">优先粘贴 JSON；如果 Codex 返回 Markdown，也可以继续手动整理。</p>
          <div class="button-row">
            <button type="button" class="primary-button" id="applyStructuredResultBtn">生成推荐 Prompt</button>
          </div>
        </section>

        <section class="workbench-stage" id="workbenchStageReview">
          <div class="stage-heading">
            <div>
              <h2>确认推荐 Prompt</h2>
              <p>先检查结构化字段，再复制推荐 Prompt 到 Codex 生图。</p>
            </div>
            <span class="status-pill" id="workbenchPromptStatus">未生成</span>
          </div>
          <div class="review-grid">
            <label>标题<input id="workbenchTitle" autocomplete="off"></label>
            <label>副标题<input id="workbenchSubtitle" autocomplete="off"></label>
            <label class="wide-field">核心内容模块<textarea id="workbenchSections" rows="5"></textarea></label>
            <label class="wide-field">必须完整保留<textarea id="workbenchMustPreserve" rows="3"></textarea></label>
            <label>禁止出现<input id="workbenchForbidden" autocomplete="off"></label>
            <label>风格倾向<input id="workbenchStyleIntent" autocomplete="off"></label>
          </div>
          <label class="wide-field">
            推荐 Prompt
            <textarea id="workbenchRecommendedPrompt" rows="12" readonly></textarea>
          </label>
          <div class="button-row">
            <button type="button" class="primary-button" id="copyRecommendedPromptBtn">复制推荐 Prompt 到 Codex 生图</button>
            <button type="button" class="secondary-button" id="toggleStyleVariantsBtn">展开查看 6 个风格版本</button>
          </div>
          <div class="style-variants collapsed" id="workbenchStyleVariants"></div>
        </section>
      </main>
    </div>
```

Add `hidden` to the current professional shell:

```html
    <div class="app-shell advanced-console" id="advancedConsole" hidden>
```

- [ ] **Step 2: Add simple-mode CSS**

Append these rules to `assets/tastecraft-console/style.css`:

```css
.simple-workbench {
  max-width: 1120px;
  margin: 0 auto;
  padding: 32px 22px 48px;
}

.simple-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
}

.simple-header h1 {
  margin: 0;
  max-width: 760px;
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1.05;
}

.simple-subtitle {
  max-width: 680px;
  margin: 10px 0 0;
  color: var(--muted);
  font-size: 1rem;
}

.workbench-steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 18px 0;
}

.step-pill {
  min-height: 42px;
  padding: 11px 12px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.58);
  color: var(--muted);
  font-weight: 800;
}

.step-pill.active {
  border-color: rgba(23, 92, 98, 0.32);
  background: rgba(23, 92, 98, 0.1);
  color: var(--primary);
}

.workbench-panel {
  display: grid;
  gap: 16px;
}

.workbench-stage {
  border: 1px solid var(--line);
  background: var(--surface);
  box-shadow: var(--shadow);
  padding: 22px;
}

.workbench-stage + .workbench-stage {
  margin-top: 0;
}

.stage-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.stage-heading h2 {
  margin: 0;
  font-size: 1.28rem;
}

.stage-heading p,
.inline-hint {
  margin: 6px 0 0;
  color: var(--muted);
}

.review-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.style-variants {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.style-variants.collapsed {
  display: none;
}

.style-variant-card {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: center;
  border: 1px solid var(--line);
  background: var(--surface-strong);
  padding: 12px;
}

.style-variant-card h4 {
  margin: 0;
}

.style-variant-card p {
  margin: 4px 0 0;
  color: var(--muted);
}

.advanced-console[hidden],
.simple-workbench[hidden] {
  display: none;
}

@media (max-width: 760px) {
  .simple-header,
  .stage-heading {
    display: grid;
  }

  .workbench-steps,
  .review-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Run static smoke test**

Run:

```bash
python3 scripts/smoke_test_console.py
```

Expected: still passes or only fails because smoke checks have not yet been updated for new simple-mode markers.

## Task 3: Workbench UI Interaction Wiring

**Files:**
- Modify: `assets/tastecraft-console/app.js`

- [ ] **Step 1: Add workbench UI state**

Near existing `state`, add:

```javascript
  var workbenchState = {
    step: 1,
    raw_content: "",
    structuring_request: "",
    structured_input: "",
    structured_content: null,
    recommended_prompt: null,
    style_variants: [],
    variants_expanded: false
  };
```

- [ ] **Step 2: Add JSON parsing and markdown fallback**

Add:

```javascript
  function parseWorkbenchStructuredInput(input) {
    var text = String(input || "").trim();
    if (!text) {
      return { value: null, warning: "先粘贴 Codex 返回的结构化结果。" };
    }
    var clean = text.replace(/^```(?:json)?\\s*/i, "").replace(/```$/i, "").trim();
    try {
      return { value: JSON.parse(clean), warning: "" };
    } catch (error) {
      return {
        value: {
          title: firstMeaningfulLine(clean),
          subtitle: "",
          audience: "",
          scenario: "",
          sections: [{ heading: "整理结果", body: clean }],
          must_preserve: [clean],
          key_numbers: [],
          forbidden_elements: [],
          style_intent: "",
          density_notes: "未识别为 JSON，可以继续手动整理字段。"
        },
        warning: "未识别为 JSON，可以继续手动整理字段。"
      };
    }
  }
```

- [ ] **Step 3: Add render helpers for the workbench**

Add:

```javascript
  function setWorkbenchStep(step) {
    workbenchState.step = step;
    document.querySelectorAll("[data-workbench-step]").forEach(function (item) {
      item.classList.toggle("active", Number(item.dataset.workbenchStep) === step);
    });
  }

  function renderWorkbenchReviewFields() {
    var structured = workbenchState.structured_content || {};
    byId("workbenchTitle").value = structured.title || "";
    byId("workbenchSubtitle").value = structured.subtitle || "";
    byId("workbenchSections").value = (structured.sections || []).map(sectionText).join("\\n\\n");
    byId("workbenchMustPreserve").value = (structured.must_preserve || []).join("\\n");
    byId("workbenchForbidden").value = (structured.forbidden_elements || []).join("，");
    byId("workbenchStyleIntent").value = structured.style_intent || "";
  }

  function renderStyleVariants() {
    var container = byId("workbenchStyleVariants");
    container.classList.toggle("collapsed", !workbenchState.variants_expanded);
    container.innerHTML = workbenchState.style_variants.map(function (variant) {
      return '<div class="style-variant-card"><div><h4>' + escapeHtml(variant.template_name) +
        '</h4><p>' + escapeHtml(variant.template_id) + '</p></div><button type="button" class="secondary-button" data-copy-style="' +
        escapeHtml(variant.template_id) + '">复制</button></div>';
    }).join("");
  }

  function renderWorkbench() {
    var hasRaw = workbenchState.raw_content.trim().length > 0;
    byId("buildStructuringRequestBtn").disabled = !hasRaw;
    byId("workbenchRawHint").textContent = hasRaw ? "内容已准备好，可以生成 Codex 拆解请求。" : "先粘贴一段内容。";
    setPill(byId("workbenchRawStatus"), hasRaw ? "已输入" : "待输入", hasRaw ? "ready" : "warning");
    byId("workbenchStructuringRequest").value = workbenchState.structuring_request;
    byId("workbenchStructuredInput").value = workbenchState.structured_input;
    byId("workbenchRecommendedPrompt").value = workbenchState.recommended_prompt ? workbenchState.recommended_prompt.positive_prompt : "";
    setPill(byId("workbenchPromptStatus"), workbenchState.recommended_prompt ? "已生成" : "未生成", workbenchState.recommended_prompt ? "ready" : "warning");
    renderWorkbenchReviewFields();
    renderStyleVariants();
  }
```

- [ ] **Step 4: Add copy helper**

Add:

```javascript
  function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
      return;
    }
    var textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
```

- [ ] **Step 5: Bind workbench controls**

Add a `bindWorkbench()` function and call it from `init()` before `generateSevenTypeMap()`:

```javascript
  function bindWorkbench() {
    byId("openAdvancedConsoleBtn").addEventListener("click", function () {
      byId("simpleWorkbench").hidden = true;
      byId("advancedConsole").hidden = false;
      renderAll();
    });
    byId("workbenchRawContent").addEventListener("input", function (event) {
      workbenchState.raw_content = event.target.value;
      renderWorkbench();
    });
    byId("buildStructuringRequestBtn").addEventListener("click", function () {
      workbenchState.structuring_request = buildWorkbenchStructuringRequest(workbenchState.raw_content);
      workbenchState.step = 2;
      renderWorkbench();
      setWorkbenchStep(2);
    });
    byId("copyStructuringRequestBtn").addEventListener("click", function () {
      copyTextToClipboard(workbenchState.structuring_request);
    });
    byId("workbenchStructuredInput").addEventListener("input", function (event) {
      workbenchState.structured_input = event.target.value;
    });
    byId("applyStructuredResultBtn").addEventListener("click", function () {
      var parsed = parseWorkbenchStructuredInput(workbenchState.structured_input);
      workbenchState.structured_content = parsed.value;
      byId("workbenchStructuredHint").textContent = parsed.warning || "结构化结果已识别。";
      if (!parsed.value) {
        renderWorkbench();
        return;
      }
      var result = applyWorkbenchStructuredResult(parsed.value);
      workbenchState.structured_content = result.structured_content;
      workbenchState.recommended_prompt = result.recommended_prompt;
      workbenchState.style_variants = result.style_variants;
      workbenchState.step = 3;
      renderAll();
      renderWorkbench();
      setWorkbenchStep(3);
    });
    byId("copyRecommendedPromptBtn").addEventListener("click", function () {
      if (workbenchState.recommended_prompt) {
        copyTextToClipboard(workbenchState.recommended_prompt.positive_prompt);
      }
    });
    byId("toggleStyleVariantsBtn").addEventListener("click", function () {
      workbenchState.variants_expanded = !workbenchState.variants_expanded;
      byId("toggleStyleVariantsBtn").textContent = workbenchState.variants_expanded ? "收起 6 个风格版本" : "展开查看 6 个风格版本";
      renderWorkbench();
    });
    byId("workbenchStyleVariants").addEventListener("click", function (event) {
      var button = event.target.closest("[data-copy-style]");
      if (!button) {
        return;
      }
      var variant = workbenchState.style_variants.find(function (item) {
        return item.template_id === button.dataset.copyStyle;
      });
      if (variant) {
        copyTextToClipboard(variant.positive_prompt);
      }
    });
    byId("clearWorkbenchBtn").addEventListener("click", function () {
      workbenchState.raw_content = "";
      workbenchState.structuring_request = "";
      workbenchState.structured_input = "";
      workbenchState.structured_content = null;
      workbenchState.recommended_prompt = null;
      workbenchState.style_variants = [];
      byId("workbenchRawContent").value = "";
      setWorkbenchStep(1);
      renderWorkbench();
    });
  }
```

Update `init()`:

```javascript
  function init() {
    bindWorkbench();
    bindGlobalControls();
    generateSevenTypeMap();
    renderWorkbench();
  }
```

- [ ] **Step 6: Ensure advanced console still works**

Run:

```bash
python3 scripts/smoke_test_console.py
```

Expected: pass after Task 4 smoke updates.

## Task 4: Smoke Coverage And Final Verification

**Files:**
- Modify: `scripts/smoke_test_console.py`

- [ ] **Step 1: Add smoke markers for simple mode**

In `check_console`, add these markers after the existing `expected_markers` loop:

```python
    simple_mode_markers = (
        'id="simpleWorkbench"',
        'id="advancedConsole"',
        'id="workbenchRawContent"',
        'id="buildStructuringRequestBtn"',
        'id="workbenchStructuringRequest"',
        'id="workbenchStructuredInput"',
        'id="workbenchRecommendedPrompt"',
        '展开查看 6 个风格版本',
    )
    for marker in simple_mode_markers:
        if marker not in html:
            errors.append(f"index.html missing simple workbench marker: {marker}")
```

- [ ] **Step 2: Add app API smoke checks**

In `check_console_exports`, after verifying `buildDeckSpec` and `buildPromptPack`, add:

```javascript
if (typeof api.buildWorkbenchStructuringRequestForTest !== 'function') {
  throw new Error('workbench structuring request export is missing');
}
if (typeof api.applyWorkbenchStructuredResultForTest !== 'function') {
  throw new Error('workbench structured result export is missing');
}
const workbenchRequest = api.buildWorkbenchStructuringRequestForTest('测试标题\\n完整正文');
if (!workbenchRequest.includes('测试标题') || !workbenchRequest.includes('不要摘要、删减或改写用户正文')) {
  throw new Error('workbench structuring request content mismatch');
}
const workbenchResult = api.applyWorkbenchStructuredResultForTest({
  title: '测试标题',
  subtitle: '',
  audience: '',
  scenario: '',
  sections: [{ heading: '模块一', body: '完整正文' }],
  must_preserve: ['完整正文'],
  key_numbers: [],
  forbidden_elements: [],
  style_intent: '',
  density_notes: ''
});
if (!workbenchResult.recommended_prompt || workbenchResult.style_variants.length !== 6) {
  throw new Error('workbench prompt generation mismatch');
}
```

- [ ] **Step 3: Run full verification**

Run:

```bash
python3 -m unittest discover -s tests
python3 scripts/validate_references.py --strict
python3 scripts/validate_schema_examples.py
python3 scripts/smoke_test_console.py
python3 scripts/scan_sensitive_files.py
python3 scripts/build_dist.py --dry-run
git diff --check
```

Expected:

- Unit tests pass.
- Reference validation passes.
- Schema examples pass.
- Console smoke test passes.
- Sensitive-file scan passes.
- Dry-run build passes.
- `git diff --check` prints no output.

- [ ] **Step 4: Browser review**

Open:

```text
http://127.0.0.1:8765/assets/tastecraft-console/index.html
```

Manual acceptance checks:

- First viewport shows the simple Prompt Workbench, not seven sidebar panels.
- `高级控制台` reveals the old professional console.
- Empty raw input disables `生成 Codex 拆解请求`.
- Pasting content enables `生成 Codex 拆解请求`.
- Generated Codex request contains the pasted content and JSON schema.
- Pasting valid structured JSON generates a recommended prompt.
- Six style versions are hidden until the user expands them.
- Recommended prompt preserves full-content policy and does not contain keyword-triggered object lists.
