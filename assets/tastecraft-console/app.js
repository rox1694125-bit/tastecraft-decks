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
      "palette.citrus-editorial": "Citrus Editorial",
      "palette.market-slate": "Market Slate",
      "palette.atelier-rose": "Atelier Rose",
      "palette.harbor-mint": "Harbor Mint",
      "palette.ink-copper": "Ink Copper",
      "palette.orchard-lab": "Orchard Lab",
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
      "palette.citrus-editorial": "Citrus Editorial",
      "palette.market-slate": "Market Slate",
      "palette.atelier-rose": "Atelier Rose",
      "palette.harbor-mint": "Harbor Mint",
      "palette.ink-copper": "Ink Copper",
      "palette.orchard-lab": "Orchard Lab",
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
      background: "#FFF9F0",
      surface: "#FFFFFF",
      text: "#1F2328",
      muted_text: "#667085",
      primary: "#D9480F",
      secondary: "#0F766E",
      accent: "#F2B705"
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
      background: "#FAF6F3",
      surface: "#FFFFFF",
      text: "#27211F",
      muted_text: "#7A6B64",
      primary: "#9F3A4A",
      secondary: "#406A5D",
      accent: "#D79A3D"
    },
    "harbor-mint": {
      background: "#F4FBFA",
      surface: "#FFFFFF",
      text: "#172326",
      muted_text: "#617073",
      primary: "#007C89",
      secondary: "#5B8C5A",
      accent: "#FFB703"
    },
    "ink-copper": {
      background: "#151A1E",
      surface: "#242A2F",
      text: "#F7F2EA",
      muted_text: "#B8C0C2",
      primary: "#C46A3A",
      secondary: "#66A6A0",
      accent: "#F0C75E"
    },
    "orchard-lab": {
      background: "#FBFCF5",
      surface: "#FFFFFF",
      text: "#20251D",
      muted_text: "#66705C",
      primary: "#4F7D24",
      secondary: "#1E6F78",
      accent: "#E0A100"
    }
  };
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

  function copy(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function t(key) {
    var active = i18n[currentLanguage] || i18n["zh-CN"];
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
    var positiveParts = currentLanguage === "zh-CN" ? [
      state.theme.imagery.style_direction,
      "用于" + typeLabel(page.type) + "演示页面",
      "主题：" + (state.brief.topic || state.project.name),
      "版式角色：" + page.visual_role,
      "干净构图，高级编辑光线，可用留白"
    ] : [
      state.theme.imagery.style_direction,
      "for a " + page.type + " presentation slide",
      "topic: " + (state.brief.topic || state.project.name),
      "layout role: " + page.visual_role,
      "clean composition, premium editorial lighting, usable whitespace"
    ];
    return {
      prompt_id: page.image_prompt_refs[0] || ("prompt-" + page.page_id),
      page_id: page.page_id,
      page_type: page.type,
      purpose: currentLanguage === "zh-CN" ? "为" + typeLabel(page.type) + "创建图像素材。" : "Create the image asset for the " + toTitle(page.type) + " page.",
      aspect_ratio: state.output.aspect_ratio,
      positive_prompt: positiveParts.filter(Boolean).join("; "),
      negative_prompt: state.theme.imagery.forbidden_elements.join(", "),
      reference_notes: currentLanguage === "zh-CN" ? "匹配配色 " + state.theme.palette.preset_id + " 和 logo 策略 " + page.logo_policy + "。" : "Match palette " + state.theme.palette.preset_id + " and logo policy " + page.logo_policy + ".",
      generation_params: {
        model_hint: "image-generation-capable",
        size: state.output.aspect_ratio === "4:3" ? "1536x1152" : "1792x1024",
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
        return {
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
        prompt[promptFields[id]] = event.target.value;
        markPromptEdited(prompt);
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
    bindGlobalControls();
    generateSevenTypeMap();
  }

  window.__tastecraftConsole = {
    buildDeckSpec: buildDeckSpec,
    buildPromptPack: buildPromptPack,
    qaState: qaState,
    setStateForTest: function (nextState) {
      Object.keys(nextState || {}).forEach(function (key) {
        state[key] = copy(nextState[key]);
      });
    },
    getState: function () {
      return copy(state);
    }
  };

  document.addEventListener("DOMContentLoaded", init);
}());
