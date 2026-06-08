(function () {
  "use strict";

  var pageTypes = ["cover", "agenda", "chapter", "content", "data", "visual", "closing"];
  var densityValues = ["speaker-led", "balanced", "reading-first", "appendix-heavy"];
  var currentLanguage = "zh-CN";
  var panelKeys = {
    project: "panel.project",
    planner: "panel.planner",
    map: "panel.map",
    visual: "panel.visual",
    lab: "panel.lab",
    prompts: "panel.prompts",
    export: "panel.export"
  };
  var i18n = {
    "zh-CN": {
      documentTitle: "TasteCraft Decks 控制台",
      brandSubtitle: "审美主控台",
      workspaceEyebrow: "静态本地控制台",
      language: "语言",
      "panel.project": "项目设置",
      "panel.planner": "批量规划",
      "panel.map": "页面地图",
      "panel.visual": "视觉系统",
      "panel.lab": "单页实验室",
      "panel.prompts": "Prompt 审核",
      "panel.export": "导出 / QA",
      "button.loadSample": "加载示例",
      "button.exportDeck": "导出 Deck JSON",
      "button.generateMap": "生成 7 类页面地图",
      "button.regeneratePrompts": "重新生成 Prompts",
      "button.addPage": "新增页面",
      "button.applyLab": "应用到页面",
      "button.recordExperiment": "记录实验",
      "button.confirm": "确认",
      "button.downloadDeck": "下载 tastecraft.deck.json",
      "button.downloadPrompts": "下载 prompt-pack.json",
      "label.deckId": "Deck ID",
      "label.projectName": "项目名称",
      "label.locale": "语言区域",
      "label.topic": "主题",
      "label.audience": "受众",
      "label.scenario": "场景",
      "label.tone": "语气",
      "label.goal": "目标",
      "label.constraints": "限制条件",
      "label.targetFormat": "目标格式",
      "label.aspectRatio": "页面比例",
      "label.slideCount": "页数",
      "label.batchLab": "批量 + 实验室",
      "label.batch": "批量",
      "label.single": "单页",
      "label.imageGeneration": "图像生成",
      "label.pptxExport": "PPTX 导出",
      "label.browserPreview": "浏览器预览",
      "label.batchSize": "批量页数",
      "label.defaultDensity": "默认密度",
      "label.pageType": "页面类型",
      "label.status": "状态",
      "label.density": "密度",
      "label.logoPolicy": "Logo 策略",
      "label.title": "标题",
      "label.objective": "页面目标",
      "label.layoutVariant": "版式变体",
      "label.visualRole": "视觉角色",
      "label.contentInputs": "内容输入",
      "label.palettePreset": "配色预设",
      "label.headingStyle": "标题风格",
      "label.bodyStyle": "正文风格",
      "label.background": "背景",
      "label.surface": "面板",
      "label.text": "正文色",
      "label.mutedText": "弱化文字",
      "label.primary": "主色",
      "label.secondary": "辅色",
      "label.accent": "强调色",
      "label.typographyDensity": "字体密度",
      "label.logoPlacement": "Logo 位置",
      "label.brandMode": "品牌模式",
      "label.logoSource": "Logo 来源",
      "label.imageryDirection": "图像方向",
      "label.logoEnabled": "启用 Logo",
      "label.reverseLogo": "允许反白 Logo",
      "label.aiPrompts": "AI 图像 Prompts",
      "label.forbiddenElements": "禁止元素",
      "label.labPage": "实验页面",
      "label.result": "结果",
      "label.experimentNote": "实验备注",
      "label.purpose": "用途",
      "label.positivePrompt": "正向 Prompt",
      "label.negativePrompt": "负向 Prompt",
      "label.referenceNotes": "参考说明",
      "label.modelHint": "模型提示",
      "label.size": "尺寸",
      "label.seed": "Seed",
      "qa.requiredFields": "必填字段",
      "qa.promptConfirmations": "Prompt 确认",
      "qa.contrast": "对比度",
      "qa.exportReady": "可导出",
      "table.index": "#",
      "table.type": "类型",
      "table.title": "标题",
      "table.status": "状态",
      "status.draft": "草稿",
      "status.valid": "有效",
      "status.locked": "已锁定",
      "status.needs_prompt": "需 Prompt",
      "status.prompt_confirmed": "Prompt 已确认",
      "status.warning": "警告",
      "status.review": "待审核",
      "status.confirmed": "已确认",
      "status.complete": "完整",
      "status.incomplete": "不完整",
      "status.ready": "就绪",
      "status.notReady": "未就绪",
      "status.clear": "清晰",
      "status.pending": "待处理",
      "status.sandbox": "沙盒",
      "status.recorded": "已记录",
      "status.untitled": "未命名",
      "type.cover": "封面",
      "type.agenda": "目录",
      "type.chapter": "章节页",
      "type.content": "内容页",
      "type.data": "数据页",
      "type.visual": "视觉页",
      "type.closing": "结束页",
      "density.speaker-led": "演讲辅助",
      "density.balanced": "均衡",
      "density.reading-first": "阅读优先",
      "density.appendix-heavy": "附录密集",
      "format.auto": "自动",
      "format.editable-pptx": "可编辑 PPTX",
      "format.html-deck": "HTML 演示",
      "format.image-enhanced-pptx": "图片增强 PPTX",
      "scenario.keynote": "发布会 / 演讲",
      "scenario.investor-roadshow": "投资人路演",
      "scenario.internal-report": "内部汇报",
      "scenario.board-review": "董事会汇报",
      "scenario.product-demo": "产品演示",
      "scenario.technical-brief": "技术简报",
      "scenario.training": "培训",
      "scenario.other": "其他",
      "mode.batch_with_single_page_experiments": "批量 + 单页实验",
      "mode.batch": "批量",
      "mode.single": "单页",
      "logo.none": "无",
      "logo.cover-only": "仅封面",
      "logo.cover-and-closing": "封面和结束页",
      "logo.footer-subtle": "页脚弱露出",
      "logo.section-only": "仅章节页",
      "logo.all-pages": "所有页面",
      "brand.none": "无品牌",
      "brand.light-brand": "轻品牌",
      "brand.strong-brand": "强品牌",
      "brand.white-label": "白标",
      "lab.applied_to_page": "应用到页面",
      "lab.promoted_to_rule": "提升为规则",
      "lab.discarded": "丢弃",
      "palette.citrus-editorial": "Editorial Paper",
      "palette.market-slate": "Market Slate",
      "palette.atelier-rose": "Sovereign Gold",
      "palette.harbor-mint": "Precision Blueprint",
      "palette.ink-copper": "Ink Copper",
      "palette.orchard-lab": "Evidence Lab",
      "palette.custom": "自定义",
      planned: "已规划",
      notMapped: "未映射",
      noPages: "无页面",
      pages: "页",
      pageEditor: "页面编辑器",
      pageTitlePrefix: "第 {index} 页 - {type}",
      noContrastWarnings: "无对比度警告。",
      warningCount: "{count} 个警告",
      promptCount: "{confirmed} 已确认 / 共 {total}",
      promptEditor: "Prompt 编辑器",
      unconfirmedPrompts: "有未确认 Prompt",
      textOnBackground: "正文色 / 背景",
      textOnSurface: "正文色 / 面板",
      mutedOnBackground: "弱化文字 / 背景",
      mutedOnSurface: "弱化文字 / 面板",
      primaryOnBackground: "主色 / 背景",
      secondaryOnBackground: "辅色 / 背景",
      accentOnBackground: "强调色 / 背景",
      contrastWarning: "{name} 对比度为 {ratio}:1；目标为 {target}:1。",
      promptPackPalette: "配色预设",
      promptPackLogo: "Logo 位置",
      promptPackBrand: "品牌模式"
    },
    en: {
      documentTitle: "TasteCraft Decks Console",
      brandSubtitle: "Design-control console",
      workspaceEyebrow: "Static local console",
      language: "Language",
      "panel.project": "Project Setup",
      "panel.planner": "Batch Planner",
      "panel.map": "Page Map",
      "panel.visual": "Visual System",
      "panel.lab": "Single-Slide Lab",
      "panel.prompts": "Prompt Review",
      "panel.export": "Export / QA",
      "button.loadSample": "Load Sample",
      "button.exportDeck": "Export Deck JSON",
      "button.generateMap": "Generate 7-Type Map",
      "button.regeneratePrompts": "Regenerate Prompts",
      "button.addPage": "Add Page",
      "button.applyLab": "Apply to Page",
      "button.recordExperiment": "Record Experiment",
      "button.confirm": "Confirm",
      "button.downloadDeck": "Download tastecraft.deck.json",
      "button.downloadPrompts": "Download prompt-pack.json",
      "label.deckId": "Deck ID",
      "label.projectName": "Project Name",
      "label.locale": "Locale",
      "label.topic": "Topic",
      "label.audience": "Audience",
      "label.scenario": "Scenario",
      "label.tone": "Tone",
      "label.goal": "Goal",
      "label.constraints": "Constraints",
      "label.targetFormat": "Target Format",
      "label.aspectRatio": "Aspect Ratio",
      "label.slideCount": "Slide Count",
      "label.batchLab": "Batch + Lab",
      "label.batch": "Batch",
      "label.single": "Single",
      "label.imageGeneration": "Image Generation",
      "label.pptxExport": "PPTX Export",
      "label.browserPreview": "Browser Preview",
      "label.batchSize": "Batch Size",
      "label.defaultDensity": "Default Density",
      "label.pageType": "Page Type",
      "label.status": "Status",
      "label.density": "Density",
      "label.logoPolicy": "Logo Policy",
      "label.title": "Title",
      "label.objective": "Objective",
      "label.layoutVariant": "Layout Variant",
      "label.visualRole": "Visual Role",
      "label.contentInputs": "Content Inputs",
      "label.palettePreset": "Palette Preset",
      "label.headingStyle": "Heading Style",
      "label.bodyStyle": "Body Style",
      "label.background": "Background",
      "label.surface": "Surface",
      "label.text": "Text",
      "label.mutedText": "Muted Text",
      "label.primary": "Primary",
      "label.secondary": "Secondary",
      "label.accent": "Accent",
      "label.typographyDensity": "Typography Density",
      "label.logoPlacement": "Logo Placement",
      "label.brandMode": "Brand Mode",
      "label.logoSource": "Logo Source",
      "label.imageryDirection": "Imagery Direction",
      "label.logoEnabled": "Logo Enabled",
      "label.reverseLogo": "Reverse Logo Allowed",
      "label.aiPrompts": "AI Image Prompts",
      "label.forbiddenElements": "Forbidden Elements",
      "label.labPage": "Lab Page",
      "label.result": "Result",
      "label.experimentNote": "Experiment Note",
      "label.purpose": "Purpose",
      "label.positivePrompt": "Positive Prompt",
      "label.negativePrompt": "Negative Prompt",
      "label.referenceNotes": "Reference Notes",
      "label.modelHint": "Model Hint",
      "label.size": "Size",
      "label.seed": "Seed",
      "qa.requiredFields": "Required Fields",
      "qa.promptConfirmations": "Prompt Confirmations",
      "qa.contrast": "Contrast",
      "qa.exportReady": "Export Ready",
      "table.index": "#",
      "table.type": "Type",
      "table.title": "Title",
      "table.status": "Status",
      "status.draft": "Draft",
      "status.valid": "Valid",
      "status.locked": "Locked",
      "status.needs_prompt": "Needs Prompt",
      "status.prompt_confirmed": "Prompt Confirmed",
      "status.warning": "Warning",
      "status.review": "Needs Review",
      "status.confirmed": "Confirmed",
      "status.complete": "Complete",
      "status.incomplete": "Incomplete",
      "status.ready": "Ready",
      "status.notReady": "Not ready",
      "status.clear": "Clear",
      "status.pending": "Pending",
      "status.sandbox": "Sandbox",
      "status.recorded": "Recorded",
      "status.untitled": "untitled",
      "type.cover": "Cover",
      "type.agenda": "Agenda",
      "type.chapter": "Chapter",
      "type.content": "Content",
      "type.data": "Data",
      "type.visual": "Visual",
      "type.closing": "Closing",
      "density.speaker-led": "Speaker Led",
      "density.balanced": "Balanced",
      "density.reading-first": "Reading First",
      "density.appendix-heavy": "Appendix Heavy",
      "format.auto": "Auto",
      "format.editable-pptx": "Editable PPTX",
      "format.html-deck": "HTML Deck",
      "format.image-enhanced-pptx": "Image-Enhanced PPTX",
      "scenario.keynote": "Keynote",
      "scenario.investor-roadshow": "Investor Roadshow",
      "scenario.internal-report": "Internal Report",
      "scenario.board-review": "Board Review",
      "scenario.product-demo": "Product Demo",
      "scenario.technical-brief": "Technical Brief",
      "scenario.training": "Training",
      "scenario.other": "Other",
      "mode.batch_with_single_page_experiments": "Batch + Lab",
      "mode.batch": "Batch",
      "mode.single": "Single",
      "logo.none": "None",
      "logo.cover-only": "Cover Only",
      "logo.cover-and-closing": "Cover and Closing",
      "logo.footer-subtle": "Footer Subtle",
      "logo.section-only": "Section Only",
      "logo.all-pages": "All Pages",
      "brand.none": "None",
      "brand.light-brand": "Light Brand",
      "brand.strong-brand": "Strong Brand",
      "brand.white-label": "White Label",
      "lab.applied_to_page": "Applied to Page",
      "lab.promoted_to_rule": "Promoted to Rule",
      "lab.discarded": "Discarded",
      "palette.citrus-editorial": "Editorial Paper",
      "palette.market-slate": "Market Slate",
      "palette.atelier-rose": "Sovereign Gold",
      "palette.harbor-mint": "Precision Blueprint",
      "palette.ink-copper": "Ink Copper",
      "palette.orchard-lab": "Evidence Lab",
      "palette.custom": "Custom",
      planned: "planned",
      notMapped: "Not mapped",
      noPages: "No pages",
      pages: "pages",
      pageEditor: "Page Editor",
      pageTitlePrefix: "Page {index} - {type}",
      noContrastWarnings: "No contrast warnings.",
      warningCount: "{count} warning",
      promptCount: "{confirmed} confirmed / {total}",
      promptEditor: "Prompt Editor",
      unconfirmedPrompts: "Unconfirmed prompts",
      textOnBackground: "Text on background",
      textOnSurface: "Text on surface",
      mutedOnBackground: "Muted text on background",
      mutedOnSurface: "Muted text on surface",
      primaryOnBackground: "Primary on background",
      secondaryOnBackground: "Secondary on background",
      accentOnBackground: "Accent on background",
      contrastWarning: "{name} contrast is {ratio}:1; target is {target}:1.",
      promptPackPalette: "Palette preset",
      promptPackLogo: "Logo placement",
      promptPackBrand: "Brand mode"
    }
  };
  var palettes = {
    "citrus-editorial": {
      background: "#FBF7EF",
      surface: "#FFFFFF",
      text: "#20242A",
      muted_text: "#68707A",
      primary: "#A75E2B",
      secondary: "#2F6F73",
      accent: "#C9A646"
    },
    "market-slate": {
      background: "#F7F8FA",
      surface: "#FFFFFF",
      text: "#18202A",
      muted_text: "#5D6B7A",
      primary: "#205B73",
      secondary: "#2F855A",
      accent: "#E76F51"
    },
    "atelier-rose": {
      background: "#F6F1E6",
      surface: "#FFFFFF",
      text: "#1B2230",
      muted_text: "#6E6A61",
      primary: "#8A6A2F",
      secondary: "#243B5A",
      accent: "#B98A44"
    },
    "harbor-mint": {
      background: "#F3F7FC",
      surface: "#FFFFFF",
      text: "#172033",
      muted_text: "#5C6878",
      primary: "#1F5E8C",
      secondary: "#2B7480",
      accent: "#BFA15A"
    },
    "ink-copper": {
      background: "#17221E",
      surface: "#22302A",
      text: "#F2ECE0",
      muted_text: "#AEB6A8",
      primary: "#C1783D",
      secondary: "#88A39C",
      accent: "#D4B36A"
    },
    "orchard-lab": {
      background: "#F7F8F4",
      surface: "#FFFFFF",
      text: "#20242A",
      muted_text: "#687060",
      primary: "#4E6375",
      secondary: "#66775A",
      accent: "#C2A24D"
    }
  };
  var promptStyleTemplates = {
    "citrus-editorial": {
      name: "Editorial Paper",
      signature: "editorial paper system",
      art_direction: "warm editorial paper direction for lighter business topics: premium print texture, refined margin rules, restrained editorial ribbons, tactile print depth, and one precise analytical layer without unrelated lifestyle props",
      composition: "asymmetric editorial spread with a generous title field, one dominant information area, small annotated evidence modules, refined shadows, subtle paper grain, and no boxed-card grid",
      color_rules: "use warm umber primary for title and one hero value, muted teal secondary for comparison structure, antique gold accent only for small editorial ticks or one key highlight",
      signature_zh: "编辑纸感系统",
      art_direction_zh: "温暖的编辑印刷纸感，适合较轻的商业主题：高级纸张纹理、精致边距线、克制编辑缎带、印刷材质深度，以及一个精准分析层，避免无关生活方式摆件",
      composition_zh: "非对称编辑跨页，充足标题区，一个占主导的信息主体区，小型注释证据模块，精致阴影，细微纸张颗粒，避免盒子卡片网格",
      color_rules_zh: "暖赭主色用于标题和一个主数值，低饱和青绿色用于对比结构，古金强调色只用于小型编辑标记或一个关键高亮"
    },
    "market-slate": {
      name: "Market Slate",
      signature: "executive market intelligence",
      art_direction: "institutional executive brief direction: crisp board-review analytics, clear conclusion, business judgment, key evidence, context-relevant geographic, regulatory, or industry linework only when the brief supports it, and consulting-grade hierarchy",
      composition: "modular executive briefing page with a strong invisible grid, controlled whitespace rhythm, one dominant conclusion zone, compact evidence strip, precise comparison geometry, never a default dashboard, no mechanism flowchart, no unrelated world maps or awkward stock-line decorations",
      color_rules: "use slate primary for title/navigation and lead series, green secondary for structural counterpoint, coral accent only for risk/delta/callout values",
      signature_zh: "高管市场情报",
      art_direction_zh: "机构级高管简报方向：清晰的董事会分析感、明确结论、业务判断、关键证据；只有 brief 支持时才使用与主题相关的地域、监管或行业线稿；咨询级信息层级",
      composition_zh: "模块化高管简报页，强隐形网格，受控留白节奏，一个主结论区，紧凑证据带，精确对比几何，绝不做默认仪表盘，不要画机制流程图，不使用无关世界地图或突兀股价折线装饰",
      color_rules_zh: "石板主色用于标题/导航和主数据序列，绿色辅助色用于结构对照，珊瑚强调色只用于风险、差异或单个重点数值"
    },
    "atelier-rose": {
      name: "Sovereign Gold",
      signature: "sovereign private wealth",
      art_direction: "reserved private wealth and asset-management direction: institutional navy, antique gold detail, premium financial confidence, quiet authority, and no hospitality, lifestyle, or decorative romance cues",
      composition: "layered financial editorial spread with a framed hero insight, refined ledger-like dividers, quiet comparative diagram, disciplined whitespace, and premium brochure craft without becoming an advertisement",
      color_rules: "use antique gold primary for premium headings and hero emphasis, deep navy secondary for structure and comparison lines, restrained bronze accent only as small value markers",
      signature_zh: "尊贵私行资管",
      art_direction_zh: "克制的私行/资管方向：机构海军蓝、古金细节、高级金融信任感、安静权威；避免酒店服务业、生活方式或浪漫装饰线索",
      composition_zh: "有层次的金融编辑跨页，框定式主洞察，精致账簿式分隔线，安静对比图解，纪律化留白，保持高级金融画册质感但不变成广告",
      color_rules_zh: "古金主色用于高级标题和主强调，深海军蓝辅助色用于结构和对比线，克制青铜强调色只作为小型数值标记"
    },
    "harbor-mint": {
      name: "Precision Blueprint",
      signature: "precision blueprint system",
      art_direction: "mechanism blueprint direction for technical finance and system explanation: cool blueprint paper, exact linework, layered architecture diagrams, causal paths, hierarchy, process relationships, and analytical clarity",
      composition: "blueprint-style explanation page with measured paths, structural overlays, axis-like guides, clear mechanism zones, nodes, local zoom callouts, low-friction reading path, no fake UI screens, and no ordinary executive dashboard",
      color_rules: "use steel blue primary for structure and titles, technical teal secondary for mechanism paths, muted brass accent for one active node or hero metric",
      signature_zh: "精密蓝图系统",
      art_direction_zh: "适合科技金融和机制解释的机制蓝图方向：冷静蓝图纸、精确线稿、层叠架构图、因果路径、层级结构、流程关系和分析清晰度",
      composition_zh: "蓝图式解释页，有度量路径、结构叠层、类坐标导引、清晰机制区、节点路径、局部放大标注、低阻阅读路径，不伪造 UI 屏幕，不要做普通高管仪表盘",
      color_rules_zh: "钢蓝主色用于结构和标题，技术青辅助色用于机制路径，低饱和黄铜强调色用于一个活跃节点或主指标"
    },
    "ink-copper": {
      name: "Ink Copper",
      signature: "mineral copper executive keynote",
      art_direction: "mineral copper executive keynote system: deep mineral green graphite background instead of pure black, warm copper hierarchy, ivory text, muted mineral-sage support only in structural roles, cinematic but disciplined executive narrative, and no red-blue color clash",
      composition: "one powerful focal structure with deep mineral negative space, copper-lit data architecture, sculptural dividers, bold hierarchy, sparse but decisive evidence, no nightclub glow, no pure black stage, and no decorative spectacle",
      color_rules: "use copper primary for hero emphasis and chapter-like anchors, mineral sage secondary only for thin structural contrast and calm data support, antique gold accent only as tiny signal markers; avoid large saturated blue, red, or flat black fields",
      signature_zh: "深色高管 Keynote",
      art_direction_zh: "深矿物绿铜金高管 Keynote 系统：用深矿物绿石墨背景替代纯黑，暖铜层级、象牙白文字、低饱和矿物鼠尾草只作为结构辅助，电影感但克制的高管叙事，避免红蓝冲突",
      composition_zh: "一个有力量的焦点结构，深矿物色负空间，铜光数据架构，雕塑感分隔，强层级，稀疏但果断的证据，避免夜店光效、纯黑舞台或装饰奇观",
      color_rules_zh: "铜色主色用于主强调和章节锚点，矿物鼠尾草辅助色只用于细线结构对比和冷静数据辅助，古金强调只作为极小信号标记；避免大面积高饱和蓝色、红色或平面纯黑"
    },
    "orchard-lab": {
      name: "Evidence Lab",
      signature: "evidence lab dossier",
      art_direction: "research dossier direction: clean research-desk rigor, analytical sheets, instrument-like linework, abstract evidence markers, and calm comparative reasoning without fake dossier metrics",
      composition: "research dossier meets polished board slide: measured grid, abstract verification markers, calm comparison zones, clean content-only margin notes, subtle paper materiality, and a layout clearly distinct from dashboard templates without template labels",
      color_rules: "use slate blue primary for evidence hierarchy, dry sage secondary for analytical contrast, muted brass accent for thresholds or verification markers",
      signature_zh: "证据实验室档案",
      art_direction_zh: "研究档案式方向：干净研究桌严谨感、分析档案纸、仪器感线稿、抽象证据标记和平静对比推理，避免伪档案指标",
      composition_zh: "研究档案遇到精修董事会幻灯片：有度量网格、抽象验证标记、平静对比区、只来自内容本身的干净边注、微妙纸张材质，并且和仪表盘模板明显区分，不出现模板标签",
      color_rules_zh: "石板蓝主色用于证据层级，干燥鼠尾草辅助色用于分析对比，低饱和黄铜强调色用于阈值或验证标记"
    }
  };
  var workbenchTemplateIds = ["citrus-editorial", "market-slate", "atelier-rose", "harbor-mint", "ink-copper", "orchard-lab"];
  var state = {
    activePanel: "project",
    selectedPageId: "page-01-cover",
    selectedPromptId: "prompt-page-01-cover",
    project: {
      deck_id: "tastecraft-demo",
      name: "TasteCraft 演示稿示例",
      locale: "zh-CN",
      created_at: "",
      updated_at: ""
    },
    brief: {
      topic: "AI 辅助演示审美工作流",
      audience: "战略和设计负责人",
      scenario: "internal-report",
      goal: "让团队对可复用的演示设计流程形成共识。",
      tone: "精准、高级、编辑感",
      constraints: ["无外部依赖", "仅本地静态导出"]
    },
    output: {
      target_format: "auto",
      aspect_ratio: "16:9",
      slide_count: 7,
      mode: "batch_with_single_page_experiments",
      model_capabilities: {
        image_generation: true,
        pptx_export: true,
        browser_preview: true
      }
    },
    theme: {
      palette: {
        preset_id: "market-slate",
        custom: false,
        colors: copy(palettes["market-slate"])
      },
      typography: {
        heading_style: "编辑感无衬线，高对比标题层级",
        body_style: "易读无衬线，紧凑证据块",
        density: "balanced"
      },
      logo: {
        enabled: true,
        source: "本地品牌标识",
        placement: "cover-and-closing",
        reverse_version_allowed: true,
        brand_mode: "light-brand"
      },
      imagery: {
        ai_image_enabled: true,
        style_direction: "纪实产品静物，干净工作场景",
        forbidden_elements: ["通用 3D 装饰球", "虚假仪表盘数字", "水印"]
      }
    },
    pages: [],
    prompts: [],
    experiments: []
  };
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

  function copy(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function t(key) {
    var active = i18n[currentLanguage] || i18n["zh-CN"];
    var fallback = i18n.en || {};
    return active[key] || fallback[key] || key;
  }

  function tFor(key, language) {
    var active = i18n[language] || i18n["zh-CN"];
    var fallback = i18n.en || {};
    return active[key] || fallback[key] || key;
  }

  function fmt(key, values) {
    return t(key).replace(/\{(\w+)\}/g, function (_, name) {
      return values && values[name] !== undefined ? values[name] : "";
    });
  }

  function panelTitle(panel) {
    return t(panelKeys[panel] || panel);
  }

  function typeLabel(value) {
    return t("type." + value);
  }

  function densityLabel(value) {
    return t("density." + value);
  }

  function statusLabel(value) {
    return t("status." + value);
  }

  function activePromptTemplate() {
    return promptStyleTemplates[state.theme.palette.preset_id] || promptStyleTemplates["market-slate"];
  }

  function templateText(template, key, language) {
    return language === "zh-CN" ? (template[key + "_zh"] || template[key]) : template[key];
  }

  function activePaletteColors() {
    var preset = state.theme.palette.preset_id;
    if (state.theme.palette.custom && state.theme.palette.colors) {
      return state.theme.palette.colors;
    }
    return palettes[preset] || state.theme.palette.colors || palettes["market-slate"];
  }

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
    ].join("\n");
  }

  function sectionText(section) {
    if (!section) {
      return "";
    }
    if (typeof section === "string") {
      return section;
    }
    return [section.heading, section.body].filter(Boolean).join("：");
  }

  function normalizeTextValue(value) {
    if (value === undefined || value === null) {
      return "";
    }
    if (typeof value === "string") {
      return value.trim();
    }
    if (Array.isArray(value)) {
      return value.map(normalizeTextValue).filter(Boolean).join("；");
    }
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    return String(value).trim();
  }

  function normalizeTextList(value) {
    if (Array.isArray(value)) {
      return value.map(normalizeTextValue).filter(Boolean);
    }
    if (typeof value === "string") {
      return listFromLooseText(value);
    }
    if (value && typeof value === "object") {
      return Object.keys(value).map(function (key) {
        return key + "：" + normalizeTextValue(value[key]);
      }).filter(Boolean);
    }
    return [];
  }

  function normalizeSections(value) {
    if (Array.isArray(value)) {
      return value.map(function (section) {
        if (typeof section === "string") {
          return { heading: "", body: section.trim() };
        }
        if (section && typeof section === "object") {
          return {
            heading: normalizeTextValue(section.heading || section.title || section.name),
            body: normalizeTextValue(section.body || section.content || section.text)
          };
        }
        return null;
      }).filter(function (section) {
        return section && (section.heading || section.body);
      });
    }
    if (typeof value === "string") {
      return parseSectionsText(value);
    }
    if (value && typeof value === "object") {
      return Object.keys(value).map(function (key) {
        return {
          heading: key,
          body: normalizeTextValue(value[key])
        };
      });
    }
    return [];
  }

  function normalizeWorkbenchStructuredContent(structured, rawContent) {
    var source = structured && typeof structured === "object" ? copy(structured) : {};
    var originalContent = normalizeTextValue(rawContent || source.original_content || source.raw_content);
    return {
      title: normalizeTextValue(source.title),
      subtitle: normalizeTextValue(source.subtitle),
      audience: normalizeTextValue(source.audience),
      scenario: normalizeTextValue(source.scenario),
      sections: normalizeSections(source.sections),
      must_preserve: normalizeTextList(source.must_preserve),
      key_numbers: normalizeTextList(source.key_numbers),
      forbidden_elements: normalizeTextList(source.forbidden_elements),
      style_intent: normalizeTextValue(source.style_intent),
      density_notes: normalizeTextValue(source.density_notes),
      original_content: originalContent
    };
  }

  function structuredContentToNotes(structured) {
    var lines = [];
    if (structured.subtitle) {
      lines.push(structured.subtitle);
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
    if (structured.original_content) {
      lines.push("必须保留的原始完整正文（仅用于内容保真，不是可见标题或标签）：\n" + structured.original_content);
    }
    return lines.join("\n\n");
  }

  function firstMeaningfulLine(text) {
    return String(text || "").split(/\n+/).map(function (line) {
      return line.trim();
    }).filter(Boolean)[0] || "";
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
    var normalized = normalizeWorkbenchStructuredContent(structured, arguments[1]);
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
          use_case: workbenchTemplateUseCase(templateId),
          positive_prompt: prompt.positive_prompt,
          negative_prompt: prompt.negative_prompt
        };
      })
    };
  }

  function parseWorkbenchStructuredInput(input) {
    var text = String(input || "").trim();
    if (!text) {
      return { value: null, warning: "先粘贴 Codex 返回的结构化结果。" };
    }
    var clean = text.replace(/^```(?:json)?\s*/i, "").replace(/```$/i, "").trim();
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
          density_notes: "未识别为 JSON，可以继续手动整理字段。",
          original_content: workbenchState.raw_content
        },
        warning: "未识别为 JSON，可以继续手动整理字段。"
      };
    }
  }

  function parseSectionsText(text) {
    return String(text || "").split(/\n{2,}/).map(function (block) {
      var clean = block.trim();
      var parts;
      if (!clean) {
        return null;
      }
      parts = clean.split(/[:：]/);
      if (parts.length > 1) {
        return {
          heading: parts.shift().replace(/^\d+[\.\s、]*/, "").trim(),
          body: parts.join("：").trim()
        };
      }
      return {
        heading: clean.replace(/^\d+[\.\s、]*/, "").trim(),
        body: ""
      };
    }).filter(Boolean);
  }

  function listFromLooseText(text) {
    return String(text || "").split(/[\n,，;；]+/).map(function (item) {
      return item.trim();
    }).filter(Boolean);
  }

  function setWorkbenchStep(step) {
    workbenchState.step = step;
    document.querySelectorAll("[data-workbench-step]").forEach(function (item) {
      item.classList.toggle("active", Number(item.dataset.workbenchStep) === step);
    });
    byId("workbenchStageStructure").hidden = !workbenchState.structuring_request;
    byId("workbenchStageReview").hidden = !workbenchState.recommended_prompt;
  }

  function renderWorkbenchReviewFields() {
    var structured = workbenchState.structured_content || {};
    byId("workbenchTitle").value = structured.title || "";
    byId("workbenchSubtitle").value = structured.subtitle || "";
    byId("workbenchSections").value = (structured.sections || []).map(sectionText).join("\n\n");
    byId("workbenchMustPreserve").value = (structured.must_preserve || []).join("\n");
    byId("workbenchForbidden").value = (structured.forbidden_elements || []).join("，");
    byId("workbenchStyleIntent").value = structured.style_intent || "";
  }

  function renderStyleVariants() {
    var container = byId("workbenchStyleVariants");
    container.classList.toggle("collapsed", !workbenchState.variants_expanded);
    container.innerHTML = workbenchState.style_variants.map(function (variant) {
      return '<div class="style-variant-card"><div><h4>' + escapeHtml(variant.template_name) +
        '</h4><p>' + escapeHtml(variant.use_case) + '</p></div><button type="button" class="secondary-button" data-copy-style="' +
        escapeHtml(variant.template_id) + '">复制</button></div>';
    }).join("");
  }

  function renderWorkbench() {
    var hasRaw = workbenchState.raw_content.trim().length > 0;
    var isLongRaw = workbenchState.raw_content.length > 1800 || workbenchState.raw_content.split(/\n/).length > 22;
    byId("buildStructuringRequestBtn").disabled = !hasRaw;
    byId("workbenchRawHint").textContent = hasRaw ?
      (isLongRaw ? "内容较长，后续会优先调整版式密度，而不是删除正文。" : "内容已准备好，可以生成 Codex 拆解请求。") :
      "先粘贴一段内容。";
    setPill(byId("workbenchRawStatus"), hasRaw ? "已输入" : "待输入", hasRaw ? "ready" : "warning");
    byId("workbenchStructuringRequest").value = workbenchState.structuring_request;
    byId("workbenchStructuredInput").value = workbenchState.structured_input;
    byId("workbenchRecommendedPrompt").value = workbenchState.recommended_prompt ? workbenchState.recommended_prompt.positive_prompt : "";
    setPill(byId("workbenchStructureStatus"), workbenchState.structured_content ? "已识别" : "等待拆解", workbenchState.structured_content ? "ready" : "warning");
    setPill(byId("workbenchPromptStatus"), workbenchState.recommended_prompt ? "已生成" : "未生成", workbenchState.recommended_prompt ? "ready" : "warning");
    renderWorkbenchReviewFields();
    renderStyleVariants();
    setWorkbenchStep(workbenchState.step);
  }

  function copyTextToClipboard(text) {
    if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(function () {
        fallbackCopyTextToClipboard(text);
      });
      return;
    }
    fallbackCopyTextToClipboard(text);
  }

  function fallbackCopyTextToClipboard(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  function regenerateWorkbenchPromptFromStructured() {
    if (!workbenchState.structured_content) {
      return;
    }
    var result = applyWorkbenchStructuredResult(workbenchState.structured_content, workbenchState.raw_content);
    workbenchState.structured_content = result.structured_content;
    workbenchState.recommended_prompt = result.recommended_prompt;
    workbenchState.style_variants = result.style_variants;
  }

  function clearWorkbenchDerivedState() {
    workbenchState.structuring_request = "";
    workbenchState.structured_input = "";
    workbenchState.structured_content = null;
    workbenchState.recommended_prompt = null;
    workbenchState.style_variants = [];
    workbenchState.variants_expanded = false;
  }

  function resetWorkbenchHelperText() {
    byId("workbenchStructuredHint").textContent = "优先粘贴 JSON；如果 Codex 返回 Markdown，也可以继续手动整理。";
    byId("toggleStyleVariantsBtn").textContent = "展开查看 6 个风格版本";
  }

  function workbenchTemplateUseCase(templateId) {
    var useCases = {
      "citrus-editorial": "适合偏轻、偏编辑感的商业内容，强调纸感、纹理和清晰信息主体。",
      "market-slate": "推荐默认风格，适合稳妥的客户沟通、专业汇报和市场分析。",
      "atelier-rose": "适合需要更高端、更尊贵的金融、资管或保险主题。",
      "harbor-mint": "适合解释机制、流程、保障结构或技术型内容。",
      "ink-copper": "适合深色高管汇报和强叙事页面，但会更有舞台感。",
      "orchard-lab": "适合研究档案、证据拆解和干净但有特色的分析页。"
    };
    return useCases[templateId] || "可作为替代视觉方向测试。";
  }

  function updateWorkbenchStructuredFromReviewFields() {
    if (!workbenchState.structured_content) {
      return;
    }
    workbenchState.structured_content.title = byId("workbenchTitle").value;
    workbenchState.structured_content.subtitle = byId("workbenchSubtitle").value;
    workbenchState.structured_content.sections = parseSectionsText(byId("workbenchSections").value);
    workbenchState.structured_content.must_preserve = listFromLooseText(byId("workbenchMustPreserve").value);
    workbenchState.structured_content.forbidden_elements = listFromLooseText(byId("workbenchForbidden").value);
    workbenchState.structured_content.style_intent = byId("workbenchStyleIntent").value;
    workbenchState.structured_content.original_content = workbenchState.raw_content || workbenchState.structured_content.original_content;
    regenerateWorkbenchPromptFromStructured();
    renderWorkbench();
  }

  function loadWorkbenchSample() {
    var sample = [
      "【主标题】",
      "星河安康计划：香港重疾险“性价比之王”，让保障回归纯粹",
      "（副标：160年保险世家诚意之作，重疾保障与财富增值兼得）",
      "",
      "1. 极致性价比：亲民费率 + 分红升值",
      "现金价值双驱动：20/25年交，缴费期满现金价值保证回本，并有额外非保证分红。",
      "",
      "2. 核心赔付强：最高700%的守护力",
      "多次赔付条款优，最高可理赔7次。",
      "",
      "3. 保障无死角：全面覆盖+定向加护",
      "涵盖71种重疾+90种早期疾病+27种儿童疾病+38种复杂手术。",
      "",
      "4. 品牌硬实力：百年星河，安心托付",
      "星河保障1865年成立于加拿大，深耕香港130余年。"
    ].join("\n");
    workbenchState.raw_content = sample;
    clearWorkbenchDerivedState();
    resetWorkbenchHelperText();
    byId("workbenchRawContent").value = sample;
    renderWorkbench();
  }

  function contentNotes(page) {
    return page.content_inputs && page.content_inputs.notes ? page.content_inputs.notes : "";
  }

  function promptContextText(page) {
    return [
      state.brief.topic,
      state.brief.goal,
      state.brief.scenario,
      state.brief.audience,
      page.title,
      page.objective,
      page.visual_role,
      page.layout_variant,
      contentNotes(page)
    ].filter(Boolean).join(" ");
  }

  function hasAny(text, words) {
    return words.some(function (word) {
      return text.indexOf(word) !== -1;
    });
  }

  function isDataComparisonPage(page) {
    var text = promptContextText(page).toLowerCase();
    return page.type === "data" || hasAny(text, ["comparison", "compare", "对比", "比较"]);
  }

  function subjectProportionRule(page, language) {
    if (language === "zh-CN") {
      var zhRule = "主体比例：用户最需要阅读和理解的核心信息主体必须占据 60-70% 的视觉注意力；装饰、纹理、图标和背景图形不能挤压正文与关键信息。";
      if (isDataComparisonPage(page)) {
        zhRule += " 如果本页是数据对比页，核心数据对比应占据 60-70% 的视觉注意力。";
      }
      return zhRule;
    }
    var enRule = "Subject proportion: the core information the viewer needs to read and understand must occupy 60-70% of visual attention; decoration, texture, icons, and background graphics must not compress body copy or key information.";
    if (isDataComparisonPage(page)) {
      enRule += " If this is a data-comparison page, the core data comparison should occupy 60-70% of visual attention.";
    }
    return enRule;
  }

  function metaphorRule(page, language) {
    if (language === "zh-CN") {
      return "视觉隐喻规则：允许与主题直接相关的具象化视觉隐喻；必须由用户内容和页面目标自然决定，不要根据关键词套用固定物件清单；必须服务内容，不能变成无关装饰。";
    }
    return "Visual metaphor rule: subject-relevant concrete metaphors are allowed; choose them from the user's content and page objective, do not apply fixed object lists based on keywords, and do not let them become unrelated decoration.";
  }

  function colorGuidance(template, colors, language) {
    if (language === "zh-CN") {
      return "色彩使用规则：" + templateText(template, "color_rules", "zh-CN") + "。调色角色：背景 " + colors.background + "，面板 " + colors.surface + "，正文 " + colors.text + "，弱化文字 " + colors.muted_text + "，主色 " + colors.primary + "，辅色 " + colors.secondary + "，强调色 " + colors.accent + "。色彩比例：背景和留白约 70-80%，主结构色约 15-20%，强调色不超过 5%；强调色只用于关键数字、细线、节点或小面积高亮，不能大面积铺满。";
    }
    return "Color usage rules: " + template.color_rules + ". Palette roles: background " + colors.background + ", surface " + colors.surface + ", text " + colors.text + ", muted text " + colors.muted_text + ", primary " + colors.primary + ", secondary " + colors.secondary + ", accent " + colors.accent + ". Color proportion: background and whitespace about 70-80%, main structural color about 15-20%, accent color no more than 5%; use accents only for key numbers, fine lines, nodes, or small highlights, never as large fields.";
  }

  function promptTextPolicy(page, language) {
    var notes = contentNotes(page);
    if (language === "zh-CN") {
      return "内容规则：默认必须完整呈现用户提供的正文内容。不得自行摘要、缩略、删除信息点或只保留重点；只有用户明确要求压缩、提炼、摘要或精简时才可压缩。输入结构标签处理：把【主标题】、【副标题】、【四大核心】、主标题、副标：、Subtitle:、括号、项目符号和编号识别为排版结构提示，不要把“主标题”“副标：”或包裹用的【】、括号原样显示；应把其后的内容转成干净的标题、副标题、分区标题、条目或正文。内容过密时，优先调整版式密度和减少装饰，而不是删除正文；用多栏、分区、表格式、附录式或小字号但可读的方式承载完整信息。内容输入：" + (notes || "使用页面目标生成精简中文标签。");
    }
    return "Content rules: if the user provided full body copy, the default is to place the full body copy into the slide image; do not summarize, shorten, delete information points, or keep only highlights unless the user explicitly asks for compression, extraction, summary, or a concise version. Raw input structure labels handling: treat labels and wrappers such as [Main title], [Subtitle], [Core sections], Main title, Subtitle:, 副标：, Chinese brackets, parentheses, bullets, and numbering as layout instructions, not visible slide copy. Do not render those raw input structure labels or wrapper brackets; convert the following content into clean title, subtitle, section heading, item, or body text. If content is dense, adjust layout density and reduce decoration before deleting body copy; use readable multi-column, sectioned, table-like, appendix-style, or small-but-legible layout treatment to carry the full information. Content input: " + (notes || "Use the page objective to create concise labels.");
  }

  function buildPositivePrompt(page, language) {
    var template = activePromptTemplate();
    var colors = activePaletteColors();
    var topic = state.brief.topic || state.project.name;
    var audience = state.brief.audience || "business audience";
    var scenario = state.brief.scenario || "presentation";
    var goal = state.brief.goal || page.objective;
    var parts = language === "zh-CN" ? [
      "你是一名资深商业视觉设计师，正在为 PowerPoint 可用页面创建一张纯 AI 整页完成稿演示图。",
      "硬规则：不要规划单独的 HTML/PPT 叠加层；生成图本身必须是完整 finished page；以上生成说明不是可见文字；图片里只呈现用户提供的标题、正文、数字和必要标签；不要添加用户未提供的结论、免责声明、评分、来源、模板名或内部指令文字。",
      "输出：" + state.output.aspect_ratio + " 比例；支持时以 4K 为目标；即使工具控制最终像素尺寸，也要追求投影级清晰细节。",
      "页面内容：这是一张面向 " + audience + " 的 " + scenario + " 演示页，主题是 " + topic + "，目标是 " + goal + "。页面标题必须呈现为《" + page.title + "》。页面需要服务这个目标：" + page.objective + "。整体气质接近 " + page.visual_role + "，信息密度为 " + page.density + "。",
      promptTextPolicy(page, language),
      "视觉要求：成图应像一张可直接用于演示的单页 PPT。先建立清晰的信息结构，再加入材质、背景线稿或轻量装饰。每页应有一个明确主视觉锚点、3-5 个有序信息组、清晰标题区和稳定阅读路径。完整正文页优先保证阅读结构，不追求复杂背景或大面积装饰。",
      "信息架构：让主洞察视觉上占主导，把支持证据组织到清晰的次级模块，使用隐形对齐、可读层级和清楚的疏密对比。",
      subjectProportionRule(page, language),
      metaphorRule(page, language),
      "图表几何：如果使用圆环图、环形图、圆形节点或比较圆，必须保持正圆，不要透视拉扁、椭圆化或倾斜变形。",
      "视觉风格：" + templateText(template, "art_direction", "zh-CN") + "。构图语法：" + templateText(template, "composition", "zh-CN") + "。",
      colorGuidance(template, colors, language),
      "字体规则：高对比标题、克制正文标签、一致层级，避免过小不可读说明，避免随机多余文字。",
      "保持演示页属性：看起来像 finished slide，而不是海报、网页 hero、通用广告、应用截图或模板图库样张。"
    ] : [
      "Act as a senior business visual designer creating a pure AI whole-slide finished presentation image for a PowerPoint-ready slide.",
      "Hard rules: Do not plan a separate HTML/PPT overlay; the generated image itself must be the complete finished page. These generation instructions are not visible slide text. Only show user-provided titles, body copy, numbers, and necessary labels. Do not add user-unprovided conclusions, disclaimers, ratings, sources, template names, or internal instruction text.",
      "Output: " + state.output.aspect_ratio + " aspect ratio; 4K target when supported; crisp projection-ready detail even when the tool controls final pixel dimensions.",
      "Page content: this is a " + scenario + " presentation slide for " + audience + ". The topic is " + topic + ", and the goal is " + goal + ". The visible page title must be \"" + page.title + "\". The page should serve this objective: " + page.objective + ". The overall feel is close to " + page.visual_role + ", with " + page.density + " information density.",
      promptTextPolicy(page, language),
      "Visual requirements: the result should look like a one-page PPT slide ready for presentation use. Establish clear information structure first, then add material depth, background linework, or light decoration. Each page should have one clear visual anchor, 3-5 ordered information groups, a clear title area, and a stable reading path. Full-copy pages should prioritize reading structure over complex backgrounds or large decoration.",
      "Information architecture: make the main insight visually dominant, organize supporting evidence into clear secondary modules, use invisible alignment, readable hierarchy, and clear dense/sparse contrast.",
      subjectProportionRule(page, language),
      metaphorRule(page, language),
      "Chart geometry: if donut charts, ring charts, circular nodes, or comparison circles appear, keep them as perfect circles, not flattened ellipses, tilted perspective rings, or distorted ovals.",
      "Visual style: " + template.art_direction + ". Composition grammar: " + template.composition + ".",
      colorGuidance(template, colors, language),
      "Typography: high-contrast title, restrained body labels, consistent hierarchy, no tiny unreadable captions, no random extra words.",
      "Keep the page presentation-native: looks like a finished slide, not a poster, web hero, generic advertisement, app screenshot, or template gallery mockup."
    ];
    return parts.join(" ");
  }

  function buildNegativePrompt(language) {
    var base = language === "zh-CN" ? [
      "乱码文字",
      "扭曲字体",
      "过小不可读文字",
      "编造数字",
      "误导性图表",
      "虚假 logo",
      "水印",
      "输入结构标签上屏",
      "模板名上屏",
      "低清细节",
      "库存信息图风格",
      "廉价模板感",
      "廉价双栏模板感",
      "机械左右并列大框"
    ] : [
      "garbled text",
      "warped typography",
      "tiny unreadable text",
      "invented numbers",
      "misleading chart",
      "fake logos",
      "watermark",
      "raw input labels as visible text",
      "visible template names",
      "low-resolution details",
      "stock infographic style",
      "cheap template look",
      "cheap two-column template",
      "mechanical side-by-side boxes"
    ];
    (state.theme.imagery.forbidden_elements || []).forEach(function (item) {
      if (item) {
        base.push(item);
      }
    });
    var seen = {};
    return base.filter(function (item) {
      var key = item.toLowerCase();
      if (seen[key]) {
        return false;
      }
      seen[key] = true;
      return true;
    }).join(", ");
  }

  function buildReferenceNotes(page, language) {
    if (language === "zh-CN") {
      return "模板：" + state.theme.palette.preset_id + "；Logo 策略：" + page.logo_policy + "；纯 AI 整页 finished slide，不使用 HTML/PPT overlay。";
    }
    return "Template: " + state.theme.palette.preset_id + "; logo policy: " + page.logo_policy + "; pure AI whole-slide finished slide, no HTML/PPT overlay.";
  }

  function promptPurpose(page, language) {
    if (language === "zh-CN") {
      return "为" + tFor("type." + page.type, language) + "创建纯 AI 整页 PPT 成图。";
    }
    return "Create the pure AI whole-slide finished image for the " + toTitle(page.type) + " page.";
  }

  function buildPromptVariants(page) {
    return {
      "zh-CN": {
        purpose: promptPurpose(page, "zh-CN"),
        positive_prompt: buildPositivePrompt(page, "zh-CN"),
        negative_prompt: buildNegativePrompt("zh-CN"),
        reference_notes: buildReferenceNotes(page, "zh-CN")
      },
      en: {
        purpose: promptPurpose(page, "en"),
        positive_prompt: buildPositivePrompt(page, "en"),
        negative_prompt: buildNegativePrompt("en"),
        reference_notes: buildReferenceNotes(page, "en")
      }
    };
  }

  function activePromptLanguage() {
    return currentLanguage === "en" ? "en" : "zh-CN";
  }

  function updatePromptField(prompt, field, value) {
    if (!prompt) {
      return;
    }
    prompt[field] = value;
    if (["purpose", "positive_prompt", "negative_prompt", "reference_notes"].indexOf(field) !== -1) {
      prompt.prompt_variants = prompt.prompt_variants || { "zh-CN": {}, en: {} };
      prompt.prompt_variants[activePromptLanguage()] = prompt.prompt_variants[activePromptLanguage()] || {};
      prompt.prompt_variants[activePromptLanguage()][field] = value;
    }
    markPromptEdited(prompt);
  }

  function optionLabel(value) {
    return t("format." + value) !== "format." + value ? t("format." + value) :
      t("scenario." + value) !== "scenario." + value ? t("scenario." + value) :
      t("mode." + value) !== "mode." + value ? t("mode." + value) :
      t("logo." + value) !== "logo." + value ? t("logo." + value) :
      t("brand." + value) !== "brand." + value ? t("brand." + value) :
      t("lab." + value) !== "lab." + value ? t("lab." + value) :
      t("palette." + value) !== "palette." + value ? t("palette." + value) :
      t("density." + value) !== "density." + value ? t("density." + value) :
      t("type." + value) !== "type." + value ? t("type." + value) :
      t("status." + value) !== "status." + value ? t("status." + value) :
      toTitle(value);
  }

  function pageCountLabel(count) {
    return count + " " + t("pages");
  }

  function setFirstTextNode(label, value) {
    if (!label) {
      return;
    }
    var node = Array.prototype.find.call(label.childNodes, function (child) {
      return child.nodeType === 3 && child.textContent.trim();
    });
    if (node) {
      node.textContent = "\n              " + value + "\n              ";
    }
  }

  function localizeControlLabels() {
    var labels = {
      deckId: "label.deckId",
      projectName: "label.projectName",
      projectLocale: "label.locale",
      briefTopic: "label.topic",
      briefAudience: "label.audience",
      briefScenario: "label.scenario",
      briefTone: "label.tone",
      briefGoal: "label.goal",
      briefConstraints: "label.constraints",
      targetFormat: "label.targetFormat",
      aspectRatio: "label.aspectRatio",
      slideCount: "label.slideCount",
      modeBatchSingle: "label.batchLab",
      capImage: "label.imageGeneration",
      capPptx: "label.pptxExport",
      capBrowser: "label.browserPreview",
      plannerSlideCount: "label.batchSize",
      plannerDensity: "label.defaultDensity",
      pageType: "label.pageType",
      pageStatus: "label.status",
      pageDensity: "label.density",
      pageLogoPolicy: "label.logoPolicy",
      pageTitle: "label.title",
      pageObjective: "label.objective",
      pageLayout: "label.layoutVariant",
      pageVisualRole: "label.visualRole",
      pageContent: "label.contentInputs",
      palettePreset: "label.palettePreset",
      headingStyle: "label.headingStyle",
      bodyStyle: "label.bodyStyle",
      colorBackground: "label.background",
      colorSurface: "label.surface",
      colorText: "label.text",
      colorMutedText: "label.mutedText",
      colorPrimary: "label.primary",
      colorSecondary: "label.secondary",
      colorAccent: "label.accent",
      themeDensity: "label.typographyDensity",
      logoPlacement: "label.logoPlacement",
      brandMode: "label.brandMode",
      logoSource: "label.logoSource",
      imageryStyle: "label.imageryDirection",
      logoEnabled: "label.logoEnabled",
      logoReverse: "label.reverseLogo",
      aiImageEnabled: "label.aiPrompts",
      forbiddenElements: "label.forbiddenElements",
      labPageSelect: "label.labPage",
      labLayout: "label.layoutVariant",
      labVisualRole: "label.visualRole",
      labDensity: "label.density",
      labResult: "label.result",
      labNote: "label.experimentNote",
      promptPurpose: "label.purpose",
      promptPositive: "label.positivePrompt",
      promptNegative: "label.negativePrompt",
      promptNotes: "label.referenceNotes",
      promptModelHint: "label.modelHint",
      promptSize: "label.size",
      promptSeed: "label.seed"
    };
    Object.keys(labels).forEach(function (id) {
      var control = byId(id);
      if (control) {
        setFirstTextNode(control.closest("label"), t(labels[id]));
      }
    });

    document.querySelectorAll('input[name="mode"]').forEach(function (input) {
      setFirstTextNode(input.closest("label"), optionLabel(input.value));
    });
  }

  function localizeOptions() {
    document.querySelectorAll("select").forEach(function (select) {
      Array.prototype.forEach.call(select.options, function (option) {
        option.textContent = optionLabel(option.value);
      });
    });
  }

  function localizeStaticUi() {
    document.documentElement.lang = currentLanguage;
    document.title = t("documentTitle");
    document.querySelector(".sidebar").setAttribute("aria-label", currentLanguage === "zh-CN" ? "控制台面板" : "Console panels");
    byId("brandSubtitle").textContent = t("brandSubtitle");
    byId("workspaceEyebrow").textContent = t("workspaceEyebrow");
    byId("languageSwitchText").textContent = t("language");
    byId("languageSelect").setAttribute("aria-label", t("language"));
    byId("languageSelect").value = currentLanguage;
    document.querySelectorAll(".nav-item").forEach(function (button) {
      button.textContent = panelTitle(button.dataset.panel);
    });
    byId("loadSampleBtn").textContent = t("button.loadSample");
    byId("exportDeckTopBtn").textContent = t("button.exportDeck");
    byId("generateSevenBtn").textContent = t("button.generateMap");
    byId("regeneratePromptsBtn").textContent = t("button.regeneratePrompts");
    byId("addPageBtn").textContent = t("button.addPage");
    byId("applyLabBtn").textContent = t("button.applyLab");
    byId("recordExperimentBtn").textContent = t("button.recordExperiment");
    byId("confirmSelectedPromptBtn").textContent = t("button.confirm");
    byId("downloadDeckBtn").textContent = t("button.downloadDeck");
    byId("downloadPromptPackBtn").textContent = t("button.downloadPrompts");
    Object.keys(panelKeys).forEach(function (panel) {
      var heading = byId(panel === "map" ? "map-title" : panel + "-title");
      if (panel === "project") heading = byId("project-title");
      if (panel === "planner") heading = byId("planner-title");
      if (panel === "visual") heading = byId("visual-title");
      if (panel === "lab") heading = byId("lab-title");
      if (panel === "prompts") heading = byId("prompts-title");
      if (panel === "export") heading = byId("export-title");
      if (heading) {
        heading.textContent = panelTitle(panel);
      }
    });
    byId("qaFieldsLabel").textContent = t("qa.requiredFields");
    byId("qaPromptsLabel").textContent = t("qa.promptConfirmations");
    byId("qaContrastLabel").textContent = t("qa.contrast");
    byId("qaReadyLabel").textContent = t("qa.exportReady");
    document.querySelectorAll("th").forEach(function (cell, index) {
      cell.textContent = [t("table.index"), t("table.type"), t("table.title"), t("table.status")][index] || cell.textContent;
    });
    document.querySelectorAll("[data-prompt-status]").forEach(function (button) {
      button.textContent = statusLabel(button.dataset.promptStatus);
    });
    localizeControlLabels();
    localizeOptions();
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function slug(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 36) || "deck";
  }

  function toTitle(value) {
    return String(value || "").replace(/-/g, " ").replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }

  function listFromText(value) {
    return String(value || "")
      .split(/\n|,/)
      .map(function (item) {
        return item.trim();
      })
      .filter(Boolean);
  }

  function setPath(target, path, value) {
    var parts = path.split(".");
    var cursor = target;
    parts.slice(0, -1).forEach(function (part) {
      cursor = cursor[part];
    });
    cursor[parts[parts.length - 1]] = value;
  }

  function getPath(target, path) {
    return path.split(".").reduce(function (cursor, part) {
      return cursor ? cursor[part] : undefined;
    }, target);
  }

  function getInputValue(input) {
    if (input.type === "checkbox") {
      return input.checked;
    }
    if (input.type === "number") {
      var numberValue = Number(input.value);
      return Number.isFinite(numberValue) ? numberValue : 0;
    }
    return input.value;
  }

  function pageBlueprint(type, index, density) {
    var topic = state.brief.topic || state.project.name || (currentLanguage === "zh-CN" ? "TasteCraft 演示稿" : "TasteCraft Deck");
    var blueprints = currentLanguage === "zh-CN" ? {
      cover: {
        title: topic,
        objective: "建立叙事框架和审美预期。",
        layout_variant: "全幅标题",
        visual_role: "主视觉",
        logo_policy: "封面标识"
      },
      agenda: {
        title: "汇报路径",
        objective: "展示会议顺序和决策路径。",
        layout_variant: "编号目录",
        visual_role: "结构化列表",
        logo_policy: "弱页脚"
      },
      chapter: {
        title: "章节过渡",
        objective: "干净地切入核心论点。",
        layout_variant: "章节分隔",
        visual_role: "字体强调",
        logo_policy: "章节标识"
      },
      content: {
        title: "核心工作流",
        objective: "用简洁证据解释主要观点。",
        layout_variant: "双栏证据",
        visual_role: "图解辅助",
        logo_policy: "弱页脚"
      },
      data: {
        title: "表现快照",
        objective: "在不制造视觉噪音的前提下呈现证据。",
        layout_variant: "指标条加图表",
        visual_role: "图表强调",
        logo_policy: "弱页脚"
      },
      visual: {
        title: "视觉参考",
        objective: "展示期望的观感、场景或产品状态。",
        layout_variant: "图片主导对比",
        visual_role: "大视觉",
        logo_policy: "无"
      },
      closing: {
        title: "决策与下一步",
        objective: "落地建议、行动和责任人。",
        layout_variant: "收束承诺",
        visual_role: "总结信号",
        logo_policy: "结束页标识"
      }
    } : {
      cover: {
        title: topic,
        objective: "Set the narrative frame and design expectation.",
        layout_variant: "full-bleed-title",
        visual_role: "hero image",
        logo_policy: "cover mark"
      },
      agenda: {
        title: "Path of the Conversation",
        objective: "Show the session sequence and decision flow.",
        layout_variant: "numbered-agenda",
        visual_role: "structured list",
        logo_policy: "subtle footer"
      },
      chapter: {
        title: "Chapter Break",
        objective: "Create a clean transition into the core argument.",
        layout_variant: "section-divider",
        visual_role: "typographic emphasis",
        logo_policy: "section mark"
      },
      content: {
        title: "Core Operating Model",
        objective: "Explain the main idea with concise supporting detail.",
        layout_variant: "two-column-evidence",
        visual_role: "diagram support",
        logo_policy: "subtle footer"
      },
      data: {
        title: "Performance Snapshot",
        objective: "Present the evidence pattern without visual clutter.",
        layout_variant: "metric-strip-plus-chart",
        visual_role: "chart emphasis",
        logo_policy: "subtle footer"
      },
      visual: {
        title: "Experience Reference",
        objective: "Show the desired look, scene, or product state.",
        layout_variant: "image-led-comparison",
        visual_role: "large visual",
        logo_policy: "none"
      },
      closing: {
        title: "Decision and Next Step",
        objective: "Land the recommendation and ownership path.",
        layout_variant: "closing-commitments",
        visual_role: "summary signal",
        logo_policy: "closing mark"
      }
    };
    var base = blueprints[type] || blueprints.content;
    return {
      page_id: "page-" + String(index).padStart(2, "0") + "-" + type,
      index: index,
      type: type,
      title: base.title,
      objective: base.objective,
      density: density || state.theme.typography.density || "balanced",
      content_inputs: {
        notes: currentLanguage === "zh-CN" ? "控制台生成的" + typeLabel(type) + "示例页。" : "Sample " + type + " page generated by the console."
      },
      layout_variant: base.layout_variant,
      visual_role: base.visual_role,
      logo_policy: base.logo_policy,
      image_prompt_refs: ["prompt-page-" + String(index).padStart(2, "0") + "-" + type],
      overrides: {},
      status: "needs_prompt"
    };
  }

  function generateSevenTypeMap() {
    var density = byId("plannerDensity") ? byId("plannerDensity").value : state.theme.typography.density;
    state.output.slide_count = 7;
    state.pages = pageTypes.map(function (type, index) {
      return pageBlueprint(type, index + 1, density);
    });
    state.selectedPageId = state.pages[0].page_id;
    syncPromptsFromPages(true);
    state.selectedPromptId = state.prompts[0] ? state.prompts[0].prompt_id : "";
    renderAll();
  }

  function makePromptForPage(page, previous) {
    var confirmedAt = previous && previous.confirmed_at ? previous.confirmed_at : "";
    var status = previous && previous.status ? previous.status : "draft";
    var promptVariants = buildPromptVariants(page);
    var activeVariant = currentLanguage === "en" ? promptVariants.en : promptVariants["zh-CN"];
    return {
      prompt_id: page.image_prompt_refs[0] || ("prompt-" + page.page_id),
      page_id: page.page_id,
      page_type: page.type,
      purpose: activeVariant.purpose,
      aspect_ratio: state.output.aspect_ratio,
      positive_prompt: activeVariant.positive_prompt,
      negative_prompt: activeVariant.negative_prompt,
      reference_notes: activeVariant.reference_notes,
      prompt_variants: promptVariants,
      generation_params: {
        model_hint: "image-generation-capable",
        size: state.output.aspect_ratio === "4:3" ? "2048x1536 or 4K equivalent when supported" : "3840x2160 preferred when supported",
        seed: null
      },
      status: status,
      confirmed_at: status === "confirmed" ? (confirmedAt || nowIso()) : ""
    };
  }

  function syncPromptsFromPages(preserveStatus) {
    var previousById = {};
    state.prompts.forEach(function (prompt) {
      previousById[prompt.prompt_id] = prompt;
    });
    state.prompts = state.pages.map(function (page) {
      var existing = preserveStatus ? previousById[page.image_prompt_refs[0]] : null;
      var prompt = makePromptForPage(page, existing);
      if (existing) {
        prompt.purpose = existing.purpose;
        prompt.positive_prompt = existing.positive_prompt;
        prompt.negative_prompt = existing.negative_prompt;
        prompt.reference_notes = existing.reference_notes;
        prompt.prompt_variants = existing.prompt_variants || prompt.prompt_variants;
        prompt.generation_params = copy(existing.generation_params);
      }
      return prompt;
    });
  }

  function selectedPage() {
    return state.pages.find(function (page) {
      return page.page_id === state.selectedPageId;
    }) || state.pages[0] || null;
  }

  function selectedPrompt() {
    return state.prompts.find(function (prompt) {
      return prompt.prompt_id === state.selectedPromptId;
    }) || state.prompts[0] || null;
  }

  function updatePromptStatus(prompt, status) {
    if (!prompt) {
      return;
    }
    prompt.status = status;
    prompt.confirmed_at = status === "confirmed" ? (prompt.confirmed_at || nowIso()) : "";
    var page = state.pages.find(function (item) {
      return item.page_id === prompt.page_id;
    });
    if (page) {
      page.status = status === "confirmed" ? "prompt_confirmed" : "needs_prompt";
    }
    renderAll();
  }

  function markPromptEdited(prompt) {
    if (!prompt || prompt.status !== "confirmed") {
      return;
    }
    prompt.status = "review";
    prompt.confirmed_at = "";
    var page = state.pages.find(function (item) {
      return item.page_id === prompt.page_id;
    });
    if (page) {
      page.status = "needs_prompt";
    }
  }

  function promptForPage(page) {
    if (!page) {
      return null;
    }
    return state.prompts.find(function (prompt) {
      return prompt.page_id === page.page_id;
    }) || null;
  }

  function hexToRgb(hex) {
    var clean = String(hex || "").replace("#", "");
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
      return null;
    }
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16)
    };
  }

  function luminance(hex) {
    var rgb = hexToRgb(hex);
    if (!rgb) {
      return 0;
    }
    return ["r", "g", "b"].map(function (channel) {
      var value = rgb[channel] / 255;
      return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    }).reduce(function (sum, value, index) {
      return sum + value * [0.2126, 0.7152, 0.0722][index];
    }, 0);
  }

  function contrastRatio(first, second) {
    var l1 = luminance(first);
    var l2 = luminance(second);
    var lighter = Math.max(l1, l2);
    var darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  function contrastWarnings() {
    var colors = state.theme.palette.colors;
    var checks = [
      [t("textOnBackground"), colors.text, colors.background, 4.5],
      [t("textOnSurface"), colors.text, colors.surface, 4.5],
      [t("mutedOnBackground"), colors.muted_text, colors.background, 3],
      [t("mutedOnSurface"), colors.muted_text, colors.surface, 3],
      [t("primaryOnBackground"), colors.primary, colors.background, 3],
      [t("secondaryOnBackground"), colors.secondary, colors.background, 3],
      [t("accentOnBackground"), colors.accent, colors.background, 3]
    ];
    return checks.reduce(function (warnings, check) {
      var ratio = contrastRatio(check[1], check[2]);
      if (ratio < check[3]) {
        warnings.push(fmt("contrastWarning", { name: check[0], ratio: ratio.toFixed(2), target: check[3] }));
      }
      return warnings;
    }, []);
  }

  function requiredFieldsComplete() {
    var required = [
      state.project.deck_id,
      state.project.name,
      state.project.locale,
      state.brief.topic,
      state.brief.audience,
      state.brief.scenario,
      state.brief.goal,
      state.brief.tone,
      state.output.target_format,
      state.output.aspect_ratio,
      state.output.slide_count,
      state.output.mode,
      state.theme.palette.preset_id,
      state.theme.typography.heading_style,
      state.theme.typography.body_style,
      state.theme.typography.density,
      state.theme.imagery.style_direction
    ];
    var pageFields = state.pages.every(function (page) {
      return page.page_id && page.index && page.type && page.title && page.objective && page.density &&
        page.layout_variant && page.visual_role && page.logo_policy && page.status;
    });
    return required.every(function (value) {
      return String(value || "").trim().length > 0;
    }) && state.pages.length > 0 && pageFields;
  }

  function allRequiredPromptsConfirmed() {
    if (!state.theme.imagery.ai_image_enabled) {
      return true;
    }
    if (state.prompts.length === 0) {
      return false;
    }
    return state.prompts.every(function (prompt) {
      return prompt.status === "confirmed";
    });
  }

  function qaState() {
    var warnings = contrastWarnings();
    var fieldsComplete = requiredFieldsComplete();
    var promptsConfirmed = allRequiredPromptsConfirmed();
    return {
      required_fields_complete: fieldsComplete,
      all_required_prompts_confirmed: promptsConfirmed,
      contrast_warnings: warnings,
      export_ready: fieldsComplete && promptsConfirmed && warnings.length === 0
    };
  }

  function exportedPage(page) {
    return {
      page_id: page.page_id,
      index: page.index,
      type: page.type,
      title: page.title,
      objective: page.objective,
      density: page.density,
      content_inputs: copy(page.content_inputs || {}),
      layout_variant: page.layout_variant,
      visual_role: page.visual_role,
      logo_policy: page.logo_policy,
      image_prompt_refs: copy(page.image_prompt_refs || []),
      overrides: copy(page.overrides || {}),
      status: page.status
    };
  }

  function buildDeckSpec() {
    var timestamp = nowIso();
    if (!state.project.created_at) {
      state.project.created_at = timestamp;
    }
    state.project.updated_at = timestamp;
    return {
      schema_version: "1.0",
      project: copy(state.project),
      brief: copy(state.brief),
      output: copy(state.output),
      theme: copy(state.theme),
      pages: state.pages.map(exportedPage),
      experiments: copy(state.experiments),
      qa: qaState()
    };
  }

  function buildPromptPack() {
    return {
      schema_version: "1.0",
      deck_id: state.project.deck_id,
      export_policy: "confirmed_prompts_only",
      global_image_policy: {
        style_direction: state.theme.imagery.style_direction,
        brand_constraints: [
          t("promptPackPalette") + ": " + state.theme.palette.preset_id,
          t("promptPackLogo") + ": " + optionLabel(state.theme.logo.placement),
          t("promptPackBrand") + ": " + optionLabel(state.theme.logo.brand_mode)
        ],
        forbidden_elements: copy(state.theme.imagery.forbidden_elements)
      },
      prompts: state.prompts.filter(function (prompt) {
        return prompt.status === "confirmed";
      }).map(function (prompt) {
        var exportedPrompt = {
          prompt_id: prompt.prompt_id,
          page_id: prompt.page_id,
          page_type: prompt.page_type,
          purpose: prompt.purpose,
          aspect_ratio: prompt.aspect_ratio,
          positive_prompt: prompt.positive_prompt,
          negative_prompt: prompt.negative_prompt,
          reference_notes: prompt.reference_notes,
          generation_params: copy(prompt.generation_params),
          confirmation: {
            status: "confirmed",
            confirmed_at: prompt.confirmed_at || nowIso()
          }
        };
        if (prompt.prompt_variants && prompt.prompt_variants["zh-CN"] && prompt.prompt_variants.en) {
          exportedPrompt.prompt_variants = copy(prompt.prompt_variants);
        }
        return exportedPrompt;
      })
    };
  }

  function downloadJson(filename, payload) {
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function renderBoundControls() {
    document.querySelectorAll("[data-bind]").forEach(function (input) {
      var value = getPath(state, input.dataset.bind);
      if (input.type === "checkbox") {
        input.checked = Boolean(value);
      } else {
        input.value = value;
      }
    });
    document.querySelectorAll("[data-list-bind]").forEach(function (input) {
      input.value = (getPath(state, input.dataset.listBind) || []).join("\n");
    });
    document.querySelectorAll("[data-radio-bind]").forEach(function (input) {
      input.checked = getPath(state, input.dataset.radioBind) === input.value;
    });
    document.querySelectorAll("[data-color-key]").forEach(function (input) {
      input.value = state.theme.palette.colors[input.dataset.colorKey];
    });
    byId("palettePreset").value = state.theme.palette.preset_id;
    byId("plannerSlideCount").value = state.output.slide_count;
    byId("plannerDensity").value = state.theme.typography.density;
  }

  function renderPanels() {
    localizeStaticUi();
    document.querySelectorAll(".nav-item").forEach(function (button) {
      button.classList.toggle("active", button.dataset.panel === state.activePanel);
    });
    document.querySelectorAll(".panel").forEach(function (panel) {
      panel.classList.remove("active");
    });
    byId("panel-" + state.activePanel).classList.add("active");
    byId("workspaceTitle").textContent = panelTitle(state.activePanel);
  }

  function renderPlanner() {
    byId("plannerPageCount").textContent = pageCountLabel(state.pages.length);
    byId("plannerSummary").innerHTML = pageTypes.map(function (type) {
      var pages = state.pages.filter(function (page) {
        return page.type === type;
      });
      return '<div class="type-chip"><strong>' + escapeHtml(typeLabel(type)) + '</strong><span>' +
        pages.length + " " + t("planned") + '</span><span>' + escapeHtml(pages[0] ? pages[0].layout_variant : t("notMapped")) +
        "</span></div>";
    }).join("");
  }

  function renderPageTable() {
    var tbody = byId("pageTableBody");
    tbody.innerHTML = state.pages.map(function (page) {
      return '<tr data-page-id="' + escapeHtml(page.page_id) + '" class="' +
        (page.page_id === state.selectedPageId ? "selected" : "") + '"><td>' +
        page.index + "</td><td>" + escapeHtml(typeLabel(page.type)) + "</td><td>" +
        escapeHtml(page.title) + "</td><td>" + escapeHtml(statusLabel(page.status)) + "</td></tr>";
    }).join("");
    byId("mapStatusPill").textContent = state.pages.length ? pageCountLabel(state.pages.length) : t("noPages");
  }

  function renderPageEditor() {
    var page = selectedPage();
    var disabled = !page;
    ["pageType", "pageStatus", "pageDensity", "pageLogoPolicy", "pageTitle", "pageObjective", "pageLayout", "pageVisualRole", "pageContent"].forEach(function (id) {
      byId(id).disabled = disabled;
    });
    if (!page) {
      byId("pageEditorTitle").textContent = t("pageEditor");
      return;
    }
    byId("pageEditorTitle").textContent = fmt("pageTitlePrefix", { index: page.index, type: typeLabel(page.type) });
    byId("pageType").value = page.type;
    byId("pageStatus").value = page.status;
    byId("pageDensity").value = page.density;
    byId("pageLogoPolicy").value = page.logo_policy;
    byId("pageTitle").value = page.title;
    byId("pageObjective").value = page.objective;
    byId("pageLayout").value = page.layout_variant;
    byId("pageVisualRole").value = page.visual_role;
    byId("pageContent").value = page.content_inputs && page.content_inputs.notes ? page.content_inputs.notes : "";
  }

  function renderVisualSystem() {
    var warnings = contrastWarnings();
    byId("contrastWarnings").innerHTML = warnings.length ? warnings.map(function (warning) {
      return '<div class="warning-item">' + escapeHtml(warning) + "</div>";
    }).join("") : '<div class="warning-item">' + escapeHtml(t("noContrastWarnings")) + "</div>";
    setPill(byId("contrastStatusPill"), warnings.length ? fmt("warningCount", { count: warnings.length }) : t("status.clear"), warnings.length ? "warning" : "ready");
    document.documentElement.style.setProperty("--preview-bg", state.theme.palette.colors.background);
    document.documentElement.style.setProperty("--preview-text", state.theme.palette.colors.text);
    document.documentElement.style.setProperty("--preview-muted", state.theme.palette.colors.muted_text);
    document.documentElement.style.setProperty("--preview-primary", state.theme.palette.colors.primary);
  }

  function renderLab() {
    var page = selectedPage();
    byId("labPageSelect").innerHTML = state.pages.map(function (item) {
      return '<option value="' + escapeHtml(item.page_id) + '">' + item.index + ". " + escapeHtml(item.title) + "</option>";
    }).join("");
    if (page) {
      byId("labPageSelect").value = page.page_id;
      byId("labLayout").value = page.layout_variant;
      byId("labVisualRole").value = page.visual_role;
      byId("labDensity").value = page.density;
      byId("slidePreview").innerHTML = '<div><div class="preview-kicker">' + escapeHtml(typeLabel(page.type)) +
        '</div><h4 class="preview-title">' + escapeHtml(page.title) + '</h4></div><p class="preview-objective">' +
        escapeHtml(page.objective) + '</p><div class="preview-footer"><span>' + escapeHtml(page.layout_variant) +
        '</span><span>' + escapeHtml(page.logo_policy) + "</span></div>";
    } else {
      byId("slidePreview").innerHTML = "";
    }
  }

  function renderPrompts() {
    var confirmed = state.prompts.filter(function (prompt) {
      return prompt.status === "confirmed";
    }).length;
    byId("promptCountPill").textContent = fmt("promptCount", { confirmed: confirmed, total: state.prompts.length });
    byId("promptList").innerHTML = state.prompts.map(function (prompt) {
      return '<button type="button" class="prompt-row ' + (prompt.prompt_id === state.selectedPromptId ? "selected" : "") +
        '" data-prompt-id="' + escapeHtml(prompt.prompt_id) + '"><strong>' + escapeHtml(prompt.page_id) +
        '</strong><span>' + escapeHtml(typeLabel(prompt.page_type)) + '</span><span class="prompt-status ' +
        escapeHtml(prompt.status) + '">' + escapeHtml(statusLabel(prompt.status)) + "</span></button>";
    }).join("");
    renderPromptEditor();
  }

  function renderPromptEditor() {
    var prompt = selectedPrompt();
    var disabled = !prompt;
    ["promptPurpose", "promptPositive", "promptNegative", "promptNotes", "promptModelHint", "promptSize", "promptSeed"].forEach(function (id) {
      byId(id).disabled = disabled;
    });
    document.querySelectorAll("[data-prompt-status]").forEach(function (button) {
      button.disabled = disabled;
      button.classList.toggle("active", prompt && prompt.status === button.dataset.promptStatus);
    });
    byId("confirmSelectedPromptBtn").disabled = disabled;
    if (!prompt) {
      byId("promptEditorTitle").textContent = t("promptEditor");
      return;
    }
    byId("promptEditorTitle").textContent = prompt.prompt_id;
    byId("promptPurpose").value = prompt.purpose;
    byId("promptPositive").value = prompt.positive_prompt;
    byId("promptNegative").value = prompt.negative_prompt;
    byId("promptNotes").value = prompt.reference_notes;
    byId("promptModelHint").value = prompt.generation_params.model_hint || "";
    byId("promptSize").value = prompt.generation_params.size || "";
    byId("promptSeed").value = prompt.generation_params.seed === null || prompt.generation_params.seed === undefined ? "" : prompt.generation_params.seed;
  }

  function renderQa() {
    var qa = qaState();
    var warnings = qa.contrast_warnings.length;
    byId("qaFields").textContent = qa.required_fields_complete ? t("status.complete") : t("status.incomplete");
    byId("qaPrompts").textContent = qa.all_required_prompts_confirmed ? t("status.confirmed") : t("unconfirmedPrompts");
    byId("qaContrast").textContent = warnings ? fmt("warningCount", { count: warnings }) : t("status.clear");
    byId("qaReady").textContent = qa.export_ready ? t("status.ready") : t("status.notReady");
    setPill(byId("exportReadyPill"), qa.export_ready ? t("status.ready") : t("status.draft"), qa.export_ready ? "ready" : "warning");
    setPill(byId("projectStatusPill"), qa.required_fields_complete ? t("status.complete") : t("status.draft"), qa.required_fields_complete ? "ready" : "warning");
    setPill(byId("navReadyState"), qa.export_ready ? t("status.ready") : t("status.draft"), qa.export_ready ? "ready" : "warning");
    byId("navDeckId").textContent = state.project.deck_id || t("status.untitled");
    byId("deckJsonPreview").value = JSON.stringify(buildDeckSpec(), null, 2);
    byId("promptPackPreview").value = JSON.stringify(buildPromptPack(), null, 2);
  }

  function setPill(element, text, mode) {
    element.textContent = text;
    element.classList.remove("ready", "warning");
    if (mode) {
      element.classList.add(mode);
    }
  }

  function escapeHtml(value) {
    return String(value === undefined || value === null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderAll() {
    renderBoundControls();
    renderPanels();
    renderPlanner();
    renderPageTable();
    renderPageEditor();
    renderVisualSystem();
    renderLab();
    renderPrompts();
    renderQa();
    renderWorkbench();
  }

  function bindGlobalControls() {
    byId("languageSelect").addEventListener("change", function (event) {
      currentLanguage = event.target.value;
      renderAll();
    });
    document.querySelectorAll(".nav-item").forEach(function (button) {
      button.addEventListener("click", function () {
        state.activePanel = button.dataset.panel;
        renderAll();
      });
    });
    document.addEventListener("input", function (event) {
      var target = event.target;
      if (target.dataset.bind) {
        setPath(state, target.dataset.bind, getInputValue(target));
        if (target.dataset.bind.indexOf("theme.imagery") === 0 || target.dataset.bind === "output.aspect_ratio") {
          syncPromptsFromPages(true);
        }
        renderAll();
      }
      if (target.dataset.listBind) {
        setPath(state, target.dataset.listBind, listFromText(target.value));
        if (target.dataset.listBind === "theme.imagery.forbidden_elements") {
          syncPromptsFromPages(true);
        }
        renderAll();
      }
      if (target.dataset.radioBind && target.checked) {
        setPath(state, target.dataset.radioBind, target.value);
        renderAll();
      }
      if (target.dataset.colorKey) {
        state.theme.palette.custom = true;
        state.theme.palette.preset_id = "custom";
        state.theme.palette.colors[target.dataset.colorKey] = target.value;
        renderAll();
      }
    });
    byId("palettePreset").addEventListener("change", function (event) {
      var value = event.target.value;
      state.theme.palette.preset_id = value;
      state.theme.palette.custom = value === "custom";
      if (palettes[value]) {
        state.theme.palette.colors = copy(palettes[value]);
      }
      renderAll();
    });
    byId("generateSevenBtn").addEventListener("click", generateSevenTypeMap);
    byId("regeneratePromptsBtn").addEventListener("click", function () {
      syncPromptsFromPages(false);
      renderAll();
    });
    byId("plannerSlideCount").addEventListener("change", function (event) {
      var count = Math.max(1, Math.min(80, Number(event.target.value) || 7));
      state.output.slide_count = count;
      renderAll();
    });
    byId("plannerDensity").addEventListener("change", function (event) {
      state.theme.typography.density = event.target.value;
      renderAll();
    });
    byId("pageTableBody").addEventListener("click", function (event) {
      var row = event.target.closest("[data-page-id]");
      if (row) {
        state.selectedPageId = row.dataset.pageId;
        var prompt = promptForPage(selectedPage());
        state.selectedPromptId = prompt ? prompt.prompt_id : state.selectedPromptId;
        renderAll();
      }
    });
    byId("addPageBtn").addEventListener("click", function () {
      var index = state.pages.length + 1;
      var type = pageTypes[(index - 1) % pageTypes.length];
      var page = pageBlueprint(type, index, state.theme.typography.density);
      page.page_id = "page-" + String(index).padStart(2, "0") + "-" + type + "-" + slug(state.project.deck_id);
      page.image_prompt_refs = ["prompt-" + page.page_id];
      state.pages.push(page);
      state.output.slide_count = state.pages.length;
      state.selectedPageId = page.page_id;
      syncPromptsFromPages(true);
      state.selectedPromptId = page.image_prompt_refs[0];
      renderAll();
    });
    bindPageEditor();
    bindLab();
    bindPromptEditor();
    bindExport();
  }

  function bindWorkbench() {
    byId("openAdvancedConsoleBtn").addEventListener("click", function () {
      byId("simpleWorkbench").hidden = true;
      byId("advancedConsole").hidden = false;
      renderAll();
    });
    byId("workbenchRawContent").addEventListener("input", function (event) {
      var nextRaw = event.target.value;
      if (nextRaw !== workbenchState.raw_content) {
        clearWorkbenchDerivedState();
        resetWorkbenchHelperText();
        workbenchState.step = 1;
      }
      workbenchState.raw_content = event.target.value;
      renderWorkbench();
    });
    byId("buildStructuringRequestBtn").addEventListener("click", function () {
      clearWorkbenchDerivedState();
      resetWorkbenchHelperText();
      workbenchState.structuring_request = buildWorkbenchStructuringRequest(workbenchState.raw_content);
      workbenchState.step = 2;
      renderWorkbench();
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
      regenerateWorkbenchPromptFromStructured();
      workbenchState.step = 3;
      renderAll();
      renderWorkbench();
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
      var variant;
      if (!button) {
        return;
      }
      variant = workbenchState.style_variants.find(function (item) {
        return item.template_id === button.dataset.copyStyle;
      });
      if (variant) {
        copyTextToClipboard(variant.positive_prompt);
      }
    });
    ["workbenchTitle", "workbenchSubtitle", "workbenchSections", "workbenchMustPreserve", "workbenchForbidden", "workbenchStyleIntent"].forEach(function (id) {
      byId(id).addEventListener("change", updateWorkbenchStructuredFromReviewFields);
    });
    byId("loadWorkbenchSampleBtn").addEventListener("click", loadWorkbenchSample);
    byId("clearWorkbenchBtn").addEventListener("click", function () {
      workbenchState.step = 1;
      workbenchState.raw_content = "";
      clearWorkbenchDerivedState();
      byId("workbenchRawContent").value = "";
      resetWorkbenchHelperText();
      renderWorkbench();
    });
  }

  function bindPageEditor() {
    var fieldMap = {
      pageType: "type",
      pageStatus: "status",
      pageDensity: "density",
      pageLogoPolicy: "logo_policy",
      pageTitle: "title",
      pageObjective: "objective",
      pageLayout: "layout_variant",
      pageVisualRole: "visual_role"
    };
    Object.keys(fieldMap).forEach(function (id) {
      byId(id).addEventListener("input", function (event) {
        var page = selectedPage();
        if (!page) {
          return;
        }
        page[fieldMap[id]] = event.target.value;
        syncPromptsFromPages(true);
        renderAll();
      });
    });
    byId("pageContent").addEventListener("input", function (event) {
      var page = selectedPage();
      if (!page) {
        return;
      }
      page.content_inputs = { notes: event.target.value };
      renderAll();
    });
  }

  function bindLab() {
    byId("labPageSelect").addEventListener("change", function (event) {
      state.selectedPageId = event.target.value;
      var prompt = promptForPage(selectedPage());
      state.selectedPromptId = prompt ? prompt.prompt_id : state.selectedPromptId;
      renderAll();
    });
    byId("applyLabBtn").addEventListener("click", function () {
      var page = selectedPage();
      if (!page) {
        return;
      }
      page.layout_variant = byId("labLayout").value;
      page.visual_role = byId("labVisualRole").value;
      page.density = byId("labDensity").value;
      page.overrides = {
        lab_note: byId("labNote").value,
        applied_at: nowIso()
      };
      syncPromptsFromPages(true);
      renderAll();
    });
    byId("recordExperimentBtn").addEventListener("click", function () {
      var page = selectedPage();
      if (!page) {
        return;
      }
      state.experiments.push({
        experiment_id: "exp-" + String(state.experiments.length + 1).padStart(2, "0"),
        page_id: page.page_id,
        changes: {
          layout_variant: byId("labLayout").value,
          visual_role: byId("labVisualRole").value,
          density: byId("labDensity").value,
          note: byId("labNote").value
        },
        result: byId("labResult").value
      });
      setPill(byId("labStatusPill"), t("status.recorded"), "ready");
      renderAll();
    });
  }

  function bindPromptEditor() {
    byId("promptList").addEventListener("click", function (event) {
      var row = event.target.closest("[data-prompt-id]");
      if (row) {
        state.selectedPromptId = row.dataset.promptId;
        var prompt = selectedPrompt();
        if (prompt) {
          state.selectedPageId = prompt.page_id;
        }
        renderAll();
      }
    });
    var promptFields = {
      promptPurpose: "purpose",
      promptPositive: "positive_prompt",
      promptNegative: "negative_prompt",
      promptNotes: "reference_notes"
    };
    Object.keys(promptFields).forEach(function (id) {
      byId(id).addEventListener("input", function (event) {
        var prompt = selectedPrompt();
        if (!prompt) {
          return;
        }
        updatePromptField(prompt, promptFields[id], event.target.value);
        renderAll();
      });
    });
    byId("promptModelHint").addEventListener("input", function (event) {
      var prompt = selectedPrompt();
      if (prompt) {
        prompt.generation_params.model_hint = event.target.value;
        markPromptEdited(prompt);
        renderAll();
      }
    });
    byId("promptSize").addEventListener("input", function (event) {
      var prompt = selectedPrompt();
      if (prompt) {
        prompt.generation_params.size = event.target.value;
        markPromptEdited(prompt);
        renderAll();
      }
    });
    byId("promptSeed").addEventListener("input", function (event) {
      var prompt = selectedPrompt();
      if (prompt) {
        prompt.generation_params.seed = event.target.value === "" ? null : Number(event.target.value);
        markPromptEdited(prompt);
        renderAll();
      }
    });
    document.querySelectorAll("[data-prompt-status]").forEach(function (button) {
      button.addEventListener("click", function () {
        updatePromptStatus(selectedPrompt(), button.dataset.promptStatus);
      });
    });
    byId("confirmSelectedPromptBtn").addEventListener("click", function () {
      updatePromptStatus(selectedPrompt(), "confirmed");
    });
  }

  function bindExport() {
    byId("downloadDeckBtn").addEventListener("click", function () {
      downloadJson("tastecraft.deck.json", buildDeckSpec());
    });
    byId("exportDeckTopBtn").addEventListener("click", function () {
      downloadJson("tastecraft.deck.json", buildDeckSpec());
    });
    byId("downloadPromptPackBtn").addEventListener("click", function () {
      downloadJson("prompt-pack.json", buildPromptPack());
    });
    byId("loadSampleBtn").addEventListener("click", function () {
      loadSample();
    });
  }

  function loadSample() {
    var zh = currentLanguage === "zh-CN";
    state.project = {
      deck_id: "tastecraft-demo",
      name: zh ? "TasteCraft 演示稿示例" : "TasteCraft Demo Deck",
      locale: zh ? "zh-CN" : "en-US",
      created_at: "",
      updated_at: ""
    };
    state.brief = {
      topic: zh ? "AI 辅助演示审美工作流" : "AI-assisted presentation craft",
      audience: zh ? "战略和设计负责人" : "Strategy and design leads",
      scenario: "internal-report",
      goal: zh ? "让团队对可复用的演示设计流程形成共识。" : "Align the team on a repeatable deck design workflow.",
      tone: zh ? "精准、高级、编辑感" : "Precise, premium, editorial",
      constraints: zh ? ["无外部依赖", "仅本地静态导出"] : ["No external dependencies", "Static local export only"]
    };
    state.output = {
      target_format: "auto",
      aspect_ratio: "16:9",
      slide_count: 7,
      mode: "batch_with_single_page_experiments",
      model_capabilities: {
        image_generation: true,
        pptx_export: true,
        browser_preview: true
      }
    };
    state.theme = {
      palette: {
        preset_id: "market-slate",
        custom: false,
        colors: copy(palettes["market-slate"])
      },
      typography: {
        heading_style: zh ? "编辑感无衬线，高对比标题层级" : "Editorial grotesk, high contrast scale",
        body_style: zh ? "易读无衬线，紧凑证据块" : "Readable sans, compact evidence blocks",
        density: "balanced"
      },
      logo: {
        enabled: true,
        source: zh ? "本地品牌标识" : "Local brand mark",
        placement: "cover-and-closing",
        reverse_version_allowed: true,
        brand_mode: "light-brand"
      },
      imagery: {
        ai_image_enabled: true,
        style_direction: zh ? "纪实产品静物，干净工作场景" : "Documentary product stills with clean workspace context",
        forbidden_elements: zh ? ["通用 3D 装饰球", "虚假仪表盘数字", "水印"] : ["generic 3D blobs", "fake dashboard numbers", "watermarks"]
      }
    };
    state.experiments = [];
    generateSevenTypeMap();
  }

  function init() {
    bindWorkbench();
    bindGlobalControls();
    generateSevenTypeMap();
    renderWorkbench();
  }

  window.__tastecraftConsole = {
    buildDeckSpec: buildDeckSpec,
    buildPromptPack: buildPromptPack,
    buildWorkbenchStructuringRequestForTest: buildWorkbenchStructuringRequest,
    applyWorkbenchStructuredResultForTest: applyWorkbenchStructuredResult,
    qaState: qaState,
    setStateForTest: function (nextState) {
      Object.keys(nextState || {}).forEach(function (key) {
        state[key] = copy(nextState[key]);
      });
    },
    regeneratePromptsForTest: function (preserveStatus) {
      syncPromptsFromPages(Boolean(preserveStatus));
    },
    updatePromptFieldForTest: function (promptId, field, value) {
      var prompt = state.prompts.find(function (item) {
        return item.prompt_id === promptId;
      });
      updatePromptField(prompt, field, value);
    },
    getState: function () {
      return copy(state);
    }
  };

  document.addEventListener("DOMContentLoaded", init);
}());
