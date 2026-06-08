from __future__ import annotations

import json
import shutil
import subprocess
import textwrap
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class ConsolePromptTemplateTests(unittest.TestCase):
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

    def test_workbench_structured_result_generates_recommended_prompt_and_six_styles(self) -> None:
        node = shutil.which("node")
        if not node:
            self.skipTest("node is required for console prompt template tests")

        app_path = ROOT / "assets" / "tastecraft-console" / "app.js"
        structured = {
            "title": "星河安康计划：跨境重疾保障方案",
            "subtitle": "160年保险世家诚意之作",
            "audience": "香港保险顾问",
            "scenario": "client-presentation",
            "sections": [
                {"heading": "极致性价比", "body": "20/25年交，缴费期满现金价值保证回本，并有额外非保证分红。"},
                {"heading": "核心赔付强", "body": "最高700%的守护力，最高可理赔7次。"},
            ],
            "must_preserve": ["完整正文必须上图"],
            "key_numbers": ["700%", "7次", "20/25年"],
            "forbidden_elements": ["虚假 logo"],
            "style_intent": "专业、可信、有金融质感",
            "density_notes": "内容较密，优先调整版式密度。",
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
        self.assertTrue(all(item["use_case"] for item in payload["style_variants"]))
        self.assertEqual(
            {item["template_id"] for item in payload["style_variants"]},
            {
                "citrus-editorial",
                "market-slate",
                "atelier-rose",
                "harbor-mint",
                "ink-copper",
                "orchard-lab",
            },
        )

    def test_workbench_preserves_raw_content_when_structured_json_is_loose(self) -> None:
        node = shutil.which("node")
        if not node:
            self.skipTest("node is required for console prompt template tests")

        app_path = ROOT / "assets" / "tastecraft-console" / "app.js"
        raw_content = (
            "【主标题】星河安康计划完整测试\n"
            "（副标：这行副标需要变成干净副标题，不要带括号）\n"
            "完整正文：缴费期内罹患重疾豁免后续保费；罹患轻症豁免24个月保费。"
            "确诊可申领每月1%保额的支援金，长达18个月。"
        )
        loose_structured = {
            "title": "星河安康计划完整测试",
            "subtitle": "这行副标需要变成干净副标题，不要带括号",
            "sections": "保障摘要：这是一段被压缩后的整理结果。",
            "must_preserve": "轻症豁免24个月保费；每月1%保额",
            "key_numbers": {"support": "18个月"},
            "forbidden_elements": "",
            "style_intent": {"tone": "专业可信"},
        }
        code = textwrap.dedent(
            """
            const fs = require('fs');
            const vm = require('vm');
            const appPath = process.argv[1];
            const structured = JSON.parse(process.argv[2]);
            const rawContent = process.argv[3];
            const app = fs.readFileSync(appPath, 'utf8');
            const sandbox = {
              window: {},
              document: { addEventListener() {} }
            };
            vm.createContext(sandbox);
            vm.runInContext(app, sandbox, { filename: appPath });
            const api = sandbox.window.__tastecraftConsole;
            const result = api.applyWorkbenchStructuredResultForTest(structured, rawContent);
            console.log(JSON.stringify(result));
            """
        )
        result = subprocess.run(
            [node, "-e", code, str(app_path), json.dumps(loose_structured, ensure_ascii=False), raw_content],
            cwd=ROOT,
            text=True,
            capture_output=True,
            check=False,
        )
        self.assertEqual(result.returncode, 0, result.stderr or result.stdout)

        payload = json.loads(result.stdout)
        prompt = payload["recommended_prompt"]["positive_prompt"]
        self.assertIn("确诊可申领每月1%保额的支援金，长达18个月", prompt)
        self.assertIn("必须保留的原始完整正文", prompt)
        self.assertIsInstance(payload["structured_content"]["sections"], list)
        self.assertIsInstance(payload["structured_content"]["must_preserve"], list)
        self.assertIsInstance(payload["structured_content"]["key_numbers"], list)

    def test_console_generates_six_pure_ai_art_direction_templates(self) -> None:
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
            if (!api || typeof api.regeneratePromptsForTest !== 'function') {
              throw new Error('console test API is missing regeneratePromptsForTest');
            }

            const paletteIds = [
              'citrus-editorial',
              'market-slate',
              'atelier-rose',
              'harbor-mint',
              'ink-copper',
              'orchard-lab'
            ];

            const prompts = {};
            for (const paletteId of paletteIds) {
              const state = api.getState();
              api.setStateForTest({
                brief: {
                  ...state.brief,
                  topic: '中美税收结构对比',
                  audience: '财税顾问和企业主',
                  scenario: 'board-review',
                  goal: '用一页图说明中美税制收入结构差异。'
                },
                output: {
                  ...state.output,
                  aspect_ratio: '16:9'
                },
                theme: {
                  ...state.theme,
                  palette: {
                    ...state.theme.palette,
                    preset_id: paletteId
                  },
                  imagery: {
                    ai_image_enabled: true,
                    style_direction: '纯 AI 整页 PPT 成图测试',
                    forbidden_elements: ['watermark', 'fake logo']
                  }
                },
                pages: [
                  {
                    page_id: 'page-tax-data-' + paletteId,
                    index: 1,
                    type: 'data',
                    title: '中美税收结构对比',
                    objective: '突出中国以增值税为主、美国以个人所得税和社保税为主的结构差异。',
                    density: 'balanced',
                    content_inputs: {
                      notes: '中国：增值税38%，企业所得税22%，个人所得税8%；美国：个人所得税49%，社保税36%，企业所得税9%。'
                    },
                    layout_variant: 'executive-tax-comparison',
                    visual_role: 'executive comparison page',
                    logo_policy: 'none',
                    image_prompt_refs: ['prompt-' + paletteId],
                    overrides: {},
                    status: 'needs_prompt'
                  }
                ],
                prompts: []
              });
              api.regeneratePromptsForTest(false);
              const prompt = api.getState().prompts[0];
              prompts[paletteId] = {
                positive_prompt: prompt.positive_prompt,
                prompt_variants: prompt.prompt_variants
              };
            }
            console.log(JSON.stringify(prompts));
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

        prompts = json.loads(result.stdout)
        expected_backgrounds = {
            "citrus-editorial": "#FBF7EF",
            "market-slate": "#F7F8FA",
            "atelier-rose": "#F6F1E6",
            "harbor-mint": "#F3F7FC",
            "ink-copper": "#17221E",
            "orchard-lab": "#F7F8F4",
        }
        self.assertEqual(set(prompts), {
            "citrus-editorial",
            "market-slate",
            "atelier-rose",
            "harbor-mint",
            "ink-copper",
            "orchard-lab",
        })
        for palette_id, prompt_record in prompts.items():
            prompt = prompt_record["positive_prompt"]
            variants = prompt_record["prompt_variants"]
            with self.subTest(palette_id=palette_id):
                self.assertEqual(set(variants), {"zh-CN", "en"})
                self.assertEqual(prompt, variants["zh-CN"]["positive_prompt"])
                self.assertIn("资深商业视觉设计师", variants["zh-CN"]["positive_prompt"])
                self.assertIn("纯 AI 整页完成稿演示图", variants["zh-CN"]["positive_prompt"])
                self.assertIn("不要规划单独的 HTML/PPT 叠加层", variants["zh-CN"]["positive_prompt"])
                self.assertIn("senior business visual designer", variants["en"]["positive_prompt"])
                self.assertIn("pure AI whole-slide finished presentation image", variants["en"]["positive_prompt"])
                self.assertIn("Do not plan a separate HTML/PPT overlay", variants["en"]["positive_prompt"])
                self.assertNotIn(palette_id, prompt)
                self.assertIn("支持时以 4K 为目标", prompt)
                self.assertNotIn("视觉野心", prompt)
                self.assertIn(expected_backgrounds[palette_id], prompt)
                self.assertIn("核心信息主体", variants["zh-CN"]["positive_prompt"])
                self.assertIn("If this is a data-comparison page", variants["en"]["positive_prompt"])
                self.assertIn("perfect circles", variants["en"]["positive_prompt"])
                self.assertIn("Only show user-provided", variants["en"]["positive_prompt"])
                self.assertIn("不得自行摘要", variants["zh-CN"]["positive_prompt"])
                self.assertIn("完整正文", variants["zh-CN"]["positive_prompt"])
                self.assertIn("do not summarize", variants["en"]["positive_prompt"])
                self.assertIn("full body copy", variants["en"]["positive_prompt"])
                self.assertIn("输入结构标签", variants["zh-CN"]["positive_prompt"])
                self.assertIn("副标：", variants["zh-CN"]["positive_prompt"])
                self.assertIn("raw input structure labels", variants["en"]["positive_prompt"])
                self.assertIn("Subtitle:", variants["en"]["positive_prompt"])
                self.assertNotIn("风格模板：", variants["zh-CN"]["positive_prompt"])
                self.assertNotIn("Style template:", variants["en"]["positive_prompt"])
                self.assertNotIn("页面简报", variants["zh-CN"]["positive_prompt"])
                self.assertNotIn("版式意图", variants["zh-CN"]["positive_prompt"])
                self.assertNotIn("Slide brief:", variants["en"]["positive_prompt"])
                self.assertNotIn("layout intent", variants["en"]["positive_prompt"])
                self.assertIn("允许与主题直接相关的具象化视觉隐喻", variants["zh-CN"]["positive_prompt"])
                self.assertIn("subject-relevant concrete metaphors are allowed", variants["en"]["positive_prompt"])
                self.assertNotIn("盾牌", variants["zh-CN"]["positive_prompt"])
                self.assertNotIn("policy documents", variants["en"]["positive_prompt"])
                self.assertIn("内容过密时，优先调整版式密度和减少装饰，而不是删除正文", variants["zh-CN"]["positive_prompt"])
                self.assertIn("adjust layout density and reduce decoration before deleting body copy", variants["en"]["positive_prompt"])
                self.assertIn("色彩比例", variants["zh-CN"]["positive_prompt"])
                self.assertIn("Color proportion", variants["en"]["positive_prompt"])
                self.assertNotIn("压缩次要说明", variants["zh-CN"]["positive_prompt"])
                self.assertNotIn("compress secondary notes", variants["en"]["positive_prompt"])
                self.assertIn("模板名上屏", variants["zh-CN"]["negative_prompt"])
                self.assertIn("visible template names", variants["en"]["negative_prompt"])
                self.assertNotIn("水果", variants["zh-CN"]["negative_prompt"])
                self.assertNotIn("花", variants["zh-CN"]["negative_prompt"])
                self.assertNotIn("植物", variants["zh-CN"]["negative_prompt"])
                self.assertNotIn("fruit", variants["en"]["negative_prompt"])
                self.assertNotIn("flowers", variants["en"]["negative_prompt"])
                self.assertNotIn("plants", variants["en"]["negative_prompt"])
                self.assertNotIn("普通双栏信息图", variants["zh-CN"]["negative_prompt"])
                self.assertIn("廉价双栏模板感", variants["zh-CN"]["negative_prompt"])
                self.assertIn("cheap two-column template", variants["en"]["negative_prompt"])

        self.assertIn("印刷纸感", prompts["citrus-editorial"]["prompt_variants"]["zh-CN"]["positive_prompt"])
        self.assertIn("institutional executive brief", prompts["market-slate"]["prompt_variants"]["en"]["positive_prompt"])
        self.assertIn("context-relevant geographic", prompts["market-slate"]["prompt_variants"]["en"]["positive_prompt"])
        self.assertIn("不要画机制流程图", prompts["market-slate"]["prompt_variants"]["zh-CN"]["positive_prompt"])
        self.assertIn("private wealth", prompts["atelier-rose"]["prompt_variants"]["en"]["positive_prompt"])
        self.assertIn("mechanism blueprint", prompts["harbor-mint"]["prompt_variants"]["en"]["positive_prompt"])
        self.assertIn("不要做普通高管仪表盘", prompts["harbor-mint"]["prompt_variants"]["zh-CN"]["positive_prompt"])
        self.assertIn("deep mineral green", prompts["ink-copper"]["prompt_variants"]["en"]["positive_prompt"])
        self.assertIn("research dossier", prompts["orchard-lab"]["prompt_variants"]["en"]["positive_prompt"])
        self.assertNotIn("Evidence Rating", prompts["orchard-lab"]["prompt_variants"]["en"]["negative_prompt"])
        self.assertNotIn("Lab Index", prompts["orchard-lab"]["prompt_variants"]["en"]["negative_prompt"])
        self.assertNotIn("culinary", prompts["citrus-editorial"]["prompt_variants"]["en"]["positive_prompt"])
        self.assertNotIn("premium hospitality editorial", prompts["atelier-rose"]["prompt_variants"]["en"]["positive_prompt"])
        self.assertNotIn("botanical", prompts["orchard-lab"]["prompt_variants"]["en"]["positive_prompt"])

    def test_non_data_prompt_uses_full_copy_without_data_or_insurance_defaults(self) -> None:
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
            const state = api.getState();
            api.setStateForTest({
              brief: {
                ...state.brief,
                topic: 'AI 培训工作流',
                audience: '企业培训负责人',
                scenario: 'training-workshop',
                goal: '说明团队如何使用 AI 改进培训制作流程。'
              },
              theme: {
                ...state.theme,
                palette: { ...state.theme.palette, preset_id: 'market-slate' }
              },
              pages: [
                {
                  page_id: 'page-training-copy',
                  index: 1,
                  type: 'visual',
                  title: '从零散工具到稳定工作流',
                  objective: '把完整说明放入一页可读的培训流程说明图。',
                  density: 'reading-first',
                  content_inputs: {
                    notes: '【主标题】从零散工具到稳定工作流\\n（副标：让每个培训团队都能复用 AI 制作经验）\\n1. 输入资料：收集课程目标、受众和案例。\\n2. 生成草稿：把讲义、视觉和练习拆成可复用模块。\\n3. 人工校对：保留讲师风格，删除空泛表达。'
                  },
                  layout_variant: 'full-copy-training-workflow',
                  visual_role: 'training workflow explanation page',
                  logo_policy: 'none',
                  image_prompt_refs: ['prompt-training'],
                  overrides: {},
                  status: 'needs_prompt'
                }
              ],
              prompts: []
            });
            api.regeneratePromptsForTest(false);
            console.log(JSON.stringify(api.getState().prompts[0]));
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

        prompt = json.loads(result.stdout)
        zh_prompt = prompt["prompt_variants"]["zh-CN"]["positive_prompt"]
        en_prompt = prompt["prompt_variants"]["en"]["positive_prompt"]
        self.assertIn("默认必须完整呈现用户提供的正文内容", zh_prompt)
        self.assertIn("内容过密时，优先调整版式密度和减少装饰，而不是删除正文", zh_prompt)
        self.assertNotIn("核心数据对比", zh_prompt)
        self.assertNotIn("盾牌", zh_prompt)
        self.assertNotIn("香港保险", zh_prompt)
        self.assertNotIn("页面简报", zh_prompt)
        self.assertNotIn("Style template:", en_prompt)

    def test_subject_metaphor_rule_does_not_inject_keyword_object_lists(self) -> None:
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
            const state = api.getState();
            api.setStateForTest({
              brief: {
                ...state.brief,
                topic: '香港保险财富保障方案',
                audience: '理财顾问',
                scenario: 'client-presentation',
                goal: '测试保险、香港、金融关键词不会触发固定物件清单。'
              },
              theme: {
                ...state.theme,
                palette: { ...state.theme.palette, preset_id: 'market-slate' }
              },
              pages: [
                {
                  page_id: 'page-insurance-metaphor',
                  index: 1,
                  type: 'visual',
                  title: '香港保险财富保障方案',
                  objective: '用完整正文说明重疾保障、理赔与资产配置关系。',
                  density: 'reading-first',
                  content_inputs: {
                    notes: '香港重疾保险方案：保障、理赔、财富增值和资产配置需要在一页中解释清楚。'
                  },
                  layout_variant: 'insurance-wealth-proposition',
                  visual_role: 'insurance and finance explanation page',
                  logo_policy: 'none',
                  image_prompt_refs: ['prompt-insurance'],
                  overrides: {},
                  status: 'needs_prompt'
                }
              ],
              prompts: []
            });
            api.regeneratePromptsForTest(false);
            console.log(JSON.stringify(api.getState().prompts[0]));
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

        prompt = json.loads(result.stdout)
        zh_prompt = prompt["prompt_variants"]["zh-CN"]["positive_prompt"]
        en_prompt = prompt["prompt_variants"]["en"]["positive_prompt"]
        self.assertIn("不要根据关键词套用固定物件清单", zh_prompt)
        self.assertIn("do not apply fixed object lists based on keywords", en_prompt)
        self.assertNotIn("若主题明确涉及", zh_prompt)
        self.assertNotIn("层级保护结构", zh_prompt)
        self.assertNotIn("香港地域线索", zh_prompt)
        self.assertNotIn("账簿", zh_prompt)
        self.assertNotIn("风险分层", zh_prompt)
        self.assertNotIn("If the topic clearly involves", en_prompt)
        self.assertNotIn("layered protection structures", en_prompt)
        self.assertNotIn("Hong Kong context cues", en_prompt)
        self.assertNotIn("ledgers", en_prompt)
        self.assertNotIn("risk layering", en_prompt)

    def test_prompt_pack_exports_bilingual_prompt_variants(self) -> None:
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
            const state = api.getState();
            api.setStateForTest({
              pages: [
                {
                  page_id: 'page-tax-data',
                  index: 1,
                  type: 'data',
                  title: '中美税收结构对比',
                  objective: '突出中美税制收入结构差异。',
                  density: 'balanced',
                  content_inputs: { notes: '中国：增值税38%；美国：个人所得税49%。' },
                  layout_variant: 'executive-tax-comparison',
                  visual_role: 'executive comparison page',
                  logo_policy: 'none',
                  image_prompt_refs: ['prompt-market-slate'],
                  overrides: {},
                  status: 'needs_prompt'
                }
              ],
              prompts: [],
              theme: {
                ...state.theme,
                palette: { ...state.theme.palette, preset_id: 'market-slate' }
              }
            });
            api.regeneratePromptsForTest(false);
            const prompt = api.getState().prompts[0];
            api.setStateForTest({
              prompts: [
                {
                  ...prompt,
                  status: 'confirmed',
                  confirmed_at: '2026-06-08T00:00:00Z'
                }
              ]
            });
            console.log(JSON.stringify(api.buildPromptPack().prompts[0]));
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

        prompt = json.loads(result.stdout)
        self.assertIn("prompt_variants", prompt)
        self.assertEqual(set(prompt["prompt_variants"]), {"zh-CN", "en"})
        self.assertIn("资深商业视觉设计师", prompt["prompt_variants"]["zh-CN"]["positive_prompt"])
        self.assertIn("senior business visual designer", prompt["prompt_variants"]["en"]["positive_prompt"])

    def test_prompt_editor_updates_active_language_variant(self) -> None:
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
            const state = api.getState();
            api.setStateForTest({
              pages: [
                {
                  page_id: 'page-tax-data',
                  index: 1,
                  type: 'data',
                  title: '中美税收结构对比',
                  objective: '突出中美税制收入结构差异。',
                  density: 'balanced',
                  content_inputs: { notes: '中国：增值税38%；美国：个人所得税49%。' },
                  layout_variant: 'executive-tax-comparison',
                  visual_role: 'executive comparison page',
                  logo_policy: 'none',
                  image_prompt_refs: ['prompt-market-slate'],
                  overrides: {},
                  status: 'needs_prompt'
                }
              ],
              prompts: [],
              theme: {
                ...state.theme,
                palette: { ...state.theme.palette, preset_id: 'market-slate' }
              }
            });
            api.regeneratePromptsForTest(false);
            if (typeof api.updatePromptFieldForTest !== 'function') {
              throw new Error('console test API is missing updatePromptFieldForTest');
            }
            api.updatePromptFieldForTest('prompt-market-slate', 'positive_prompt', '自定义中文 prompt');
            console.log(JSON.stringify(api.getState().prompts[0]));
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

        prompt = json.loads(result.stdout)
        self.assertEqual(prompt["positive_prompt"], "自定义中文 prompt")
        self.assertEqual(prompt["prompt_variants"]["zh-CN"]["positive_prompt"], "自定义中文 prompt")
        self.assertIn("senior business visual designer", prompt["prompt_variants"]["en"]["positive_prompt"])


if __name__ == "__main__":
    unittest.main()
