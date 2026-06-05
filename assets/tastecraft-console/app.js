(function () {
  "use strict";

  var pageTypes = ["cover", "agenda", "chapter", "content", "data", "visual", "closing"];
  var densityValues = ["speaker-led", "balanced", "reading-first", "appendix-heavy"];
  var panelTitles = {
    project: "Project Setup",
    planner: "Batch Planner",
    map: "Page Map",
    visual: "Visual System",
    lab: "Single-Slide Lab",
    prompts: "Prompt Review",
    export: "Export / QA"
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
      name: "TasteCraft Demo Deck",
      locale: "zh-CN",
      created_at: "",
      updated_at: ""
    },
    brief: {
      topic: "AI-assisted presentation craft",
      audience: "Strategy and design leads",
      scenario: "internal-report",
      goal: "Align the team on a repeatable deck design workflow.",
      tone: "Precise, premium, editorial",
      constraints: ["No external dependencies", "Static local export only"]
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
        heading_style: "Editorial grotesk, high contrast scale",
        body_style: "Readable sans, compact evidence blocks",
        density: "balanced"
      },
      logo: {
        enabled: true,
        source: "Local brand mark",
        placement: "cover-and-closing",
        reverse_version_allowed: true,
        brand_mode: "light-brand"
      },
      imagery: {
        ai_image_enabled: true,
        style_direction: "Documentary product stills with clean workspace context",
        forbidden_elements: ["generic 3D blobs", "fake dashboard numbers", "watermarks"]
      }
    },
    pages: [],
    prompts: [],
    experiments: []
  };

  function copy(value) {
    return JSON.parse(JSON.stringify(value));
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
    var topic = state.brief.topic || state.project.name || "TasteCraft Deck";
    var blueprints = {
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
        notes: "Sample " + type + " page generated by the console."
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
    return {
      prompt_id: page.image_prompt_refs[0] || ("prompt-" + page.page_id),
      page_id: page.page_id,
      page_type: page.type,
      purpose: "Create the image asset for the " + toTitle(page.type) + " page.",
      aspect_ratio: state.output.aspect_ratio,
      positive_prompt: [
        state.theme.imagery.style_direction,
        "for a " + page.type + " presentation slide",
        "topic: " + (state.brief.topic || state.project.name),
        "layout role: " + page.visual_role,
        "clean composition, premium editorial lighting, usable whitespace"
      ].filter(Boolean).join("; "),
      negative_prompt: state.theme.imagery.forbidden_elements.join(", "),
      reference_notes: "Match palette " + state.theme.palette.preset_id + " and logo policy " + page.logo_policy + ".",
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
      ["Text on background", colors.text, colors.background, 4.5],
      ["Text on surface", colors.text, colors.surface, 4.5],
      ["Muted text on background", colors.muted_text, colors.background, 3],
      ["Muted text on surface", colors.muted_text, colors.surface, 3],
      ["Primary on background", colors.primary, colors.background, 3],
      ["Secondary on background", colors.secondary, colors.background, 3],
      ["Accent on background", colors.accent, colors.background, 3]
    ];
    return checks.reduce(function (warnings, check) {
      var ratio = contrastRatio(check[1], check[2]);
      if (ratio < check[3]) {
        warnings.push(check[0] + " contrast is " + ratio.toFixed(2) + ":1; target is " + check[3] + ":1.");
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
          "Palette preset: " + state.theme.palette.preset_id,
          "Logo placement: " + state.theme.logo.placement,
          "Brand mode: " + state.theme.logo.brand_mode
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
    document.querySelectorAll(".nav-item").forEach(function (button) {
      button.classList.toggle("active", button.dataset.panel === state.activePanel);
    });
    document.querySelectorAll(".panel").forEach(function (panel) {
      panel.classList.remove("active");
    });
    byId("panel-" + state.activePanel).classList.add("active");
    byId("workspaceTitle").textContent = panelTitles[state.activePanel];
  }

  function renderPlanner() {
    byId("plannerPageCount").textContent = state.pages.length + " pages";
    byId("plannerSummary").innerHTML = pageTypes.map(function (type) {
      var pages = state.pages.filter(function (page) {
        return page.type === type;
      });
      return '<div class="type-chip"><strong>' + escapeHtml(type) + '</strong><span>' +
        pages.length + " planned</span><span>" + escapeHtml(pages[0] ? pages[0].layout_variant : "Not mapped") +
        "</span></div>";
    }).join("");
  }

  function renderPageTable() {
    var tbody = byId("pageTableBody");
    tbody.innerHTML = state.pages.map(function (page) {
      return '<tr data-page-id="' + escapeHtml(page.page_id) + '" class="' +
        (page.page_id === state.selectedPageId ? "selected" : "") + '"><td>' +
        page.index + "</td><td>" + escapeHtml(toTitle(page.type)) + "</td><td>" +
        escapeHtml(page.title) + "</td><td>" + escapeHtml(page.status) + "</td></tr>";
    }).join("");
    byId("mapStatusPill").textContent = state.pages.length ? state.pages.length + " pages" : "No pages";
  }

  function renderPageEditor() {
    var page = selectedPage();
    var disabled = !page;
    ["pageType", "pageStatus", "pageDensity", "pageLogoPolicy", "pageTitle", "pageObjective", "pageLayout", "pageVisualRole", "pageContent"].forEach(function (id) {
      byId(id).disabled = disabled;
    });
    if (!page) {
      byId("pageEditorTitle").textContent = "Page Editor";
      return;
    }
    byId("pageEditorTitle").textContent = "Page " + page.index + " - " + toTitle(page.type);
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
    }).join("") : '<div class="warning-item">No contrast warnings.</div>';
    setPill(byId("contrastStatusPill"), warnings.length ? warnings.length + " warning" + (warnings.length > 1 ? "s" : "") : "Clear", warnings.length ? "warning" : "ready");
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
      byId("slidePreview").innerHTML = '<div><div class="preview-kicker">' + escapeHtml(toTitle(page.type)) +
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
    byId("promptCountPill").textContent = confirmed + " confirmed / " + state.prompts.length;
    byId("promptList").innerHTML = state.prompts.map(function (prompt) {
      return '<button type="button" class="prompt-row ' + (prompt.prompt_id === state.selectedPromptId ? "selected" : "") +
        '" data-prompt-id="' + escapeHtml(prompt.prompt_id) + '"><strong>' + escapeHtml(prompt.page_id) +
        '</strong><span>' + escapeHtml(toTitle(prompt.page_type)) + '</span><span class="prompt-status ' +
        escapeHtml(prompt.status) + '">' + escapeHtml(prompt.status) + "</span></button>";
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
      byId("promptEditorTitle").textContent = "Prompt Editor";
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
    byId("qaFields").textContent = qa.required_fields_complete ? "Complete" : "Incomplete";
    byId("qaPrompts").textContent = qa.all_required_prompts_confirmed ? "Confirmed" : "Unconfirmed prompts";
    byId("qaContrast").textContent = warnings ? warnings + " warning" + (warnings > 1 ? "s" : "") : "Clear";
    byId("qaReady").textContent = qa.export_ready ? "Ready" : "Not ready";
    setPill(byId("exportReadyPill"), qa.export_ready ? "Ready" : "Draft", qa.export_ready ? "ready" : "warning");
    setPill(byId("projectStatusPill"), qa.required_fields_complete ? "Complete" : "Draft", qa.required_fields_complete ? "ready" : "warning");
    setPill(byId("navReadyState"), qa.export_ready ? "Ready" : "Draft", qa.export_ready ? "ready" : "warning");
    byId("navDeckId").textContent = state.project.deck_id || "untitled";
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
      setPill(byId("labStatusPill"), "Recorded", "ready");
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
    state.project = {
      deck_id: "tastecraft-demo",
      name: "TasteCraft Demo Deck",
      locale: "zh-CN",
      created_at: "",
      updated_at: ""
    };
    state.brief = {
      topic: "AI-assisted presentation craft",
      audience: "Strategy and design leads",
      scenario: "internal-report",
      goal: "Align the team on a repeatable deck design workflow.",
      tone: "Precise, premium, editorial",
      constraints: ["No external dependencies", "Static local export only"]
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
        heading_style: "Editorial grotesk, high contrast scale",
        body_style: "Readable sans, compact evidence blocks",
        density: "balanced"
      },
      logo: {
        enabled: true,
        source: "Local brand mark",
        placement: "cover-and-closing",
        reverse_version_allowed: true,
        brand_mode: "light-brand"
      },
      imagery: {
        ai_image_enabled: true,
        style_direction: "Documentary product stills with clean workspace context",
        forbidden_elements: ["generic 3D blobs", "fake dashboard numbers", "watermarks"]
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
