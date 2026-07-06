// reader.js — the reading-appearance menu (the "Aa" button + panel): theme, accent
// colour, text size, line spacing and reading width, tuned live and remembered.
//
// Modelled on Apple Books / Kindle appearance menus: theme PREVIEW TILES (each shows
// its own colours), accent colour DOTS, and a text-size SLIDER (small A → large A) —
// not a +/- stepper. Text size scales the document ROOT font-size, so it resizes the
// whole rem-based UI on every page. Line spacing drives body line-height; width caps
// the reading measure.
//
// Prefs live under a VERSIONED origin-wide localStorage key ("fairyfox:reader:b"), so
// the choice is shared across every same-origin fairyfox.io site. The early apply
// happens inline in <head> to avoid a flash; this builds the button + panel.
(function () {
  "use strict";

  var KEY = "fairyfox:reader:b";
  var SIZES = [15, 16.5, 18, 20, 22];          // root px, 5 steps (slider 0..4)
  var LH = { tight: 1.5, normal: 1.65, relaxed: 1.9 };
  var WIDTH = { narrow: "38rem", normal: "46rem", wide: "58rem" };
  // Theme tiles carry each theme's real preview colours (fixed, independent of the
  // current theme) so the tile looks like the theme it selects.
  var THEMES = [
    ["system", "Auto", "linear-gradient(120deg,#efe4d1 0 50%,#181017 50% 100%)", "#9a8f95"],
    ["light", "Light", "#efe4d1", "#231a25"],
    ["sepia", "Sepia", "#e5d6b6", "#2c2411"],
    ["dark", "Dark", "#181017", "#fbf3ee"],
  ];
  var ACCENTS = [
    ["#ff8368", "Coral"], ["#f6a13a", "Amber"], ["#57c964", "Green"],
    ["#33c0c9", "Teal"], ["#5aa2f0", "Blue"], ["#c79bf0", "Violet"], ["#ff6a9a", "Rose"],
  ];
  var ACCENT_VARS = ["--accent", "--violet", "--violet-deep", "--accent-ink", "--link", "--link-hover", "--glow"];
  var DEFAULTS = { theme: "system", accent: null, size: 1, lh: "normal", width: "normal" };

  var prefs = Object.assign({}, DEFAULTS);
  function clampSize(n) { return Math.max(0, Math.min(SIZES.length - 1, n | 0)); }

  function load() {
    try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(KEY) || "{}")); }
    catch (e) { return Object.assign({}, DEFAULTS); }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch (e) { /* private mode — ignore */ }
  }

  function applyAccent(root, hex) {
    if (!hex) { ACCENT_VARS.forEach(function (v) { root.style.removeProperty(v); }); return; }
    var ink = "color-mix(in srgb, " + hex + ", var(--text) 42%)";
    root.style.setProperty("--accent", hex);
    root.style.setProperty("--violet", hex);
    root.style.setProperty("--violet-deep", "color-mix(in srgb, " + hex + ", #000 12%)");
    root.style.setProperty("--accent-ink", ink);
    root.style.setProperty("--link", ink);
    root.style.setProperty("--link-hover", "color-mix(in srgb, " + hex + ", var(--text) 26%)");
    root.style.setProperty("--glow", "color-mix(in srgb, " + hex + " 40%, transparent)");
  }
  function apply() {
    var root = document.documentElement;
    if (prefs.theme === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", prefs.theme);
    root.style.fontSize = SIZES[clampSize(prefs.size)] + "px";
    root.style.setProperty("--reading-lh", String(LH[prefs.lh] || LH.normal));
    root.style.setProperty("--reading-width", WIDTH[prefs.width] || WIDTH.normal);
    applyAccent(root, prefs.accent);
  }

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }
  function seg(act, labelId, opts) {
    return '<div class="ff-seg" role="group" aria-labelledby="' + labelId + '">' +
      opts.map(function (o) {
        return '<button type="button" data-act="' + act + '" data-val="' + o[0] + '">' + o[1] + "</button>";
      }).join("") + "</div>";
  }

  function init() {
    prefs = load();
    apply();

    var btn = el("button", {
      class: "ff-reader-btn", type: "button", "aria-label": "Reading settings",
      "aria-haspopup": "dialog", "aria-expanded": "false", "aria-controls": "ff-reader-panel", title: "Reading settings",
    });
    btn.innerHTML = '<span class="aa-lg">A</span><span class="aa-sm">a</span>';

    var panel = el("div", { id: "ff-reader-panel", class: "ff-reader-panel", role: "dialog", "aria-label": "Reading settings", "aria-modal": "false" });

    var tiles = THEMES.map(function (t) {
      return '<button type="button" class="ff-theme" data-act="theme" data-val="' + t[0] + '">' +
        '<span class="tile" style="background:' + t[2] + ';color:' + t[3] + '">Aa</span>' +
        '<span class="cap">' + t[1] + "</span></button>";
    }).join("");

    var swatches = '<button type="button" class="ff-swatch ff-swatch-default" data-acc="" aria-label="Default accent"></button>' +
      ACCENTS.map(function (a) {
        return '<button type="button" class="ff-swatch" data-acc="' + a[0] + '" style="--sw:' + a[0] + '" aria-label="' + a[1] + ' accent"></button>';
      }).join("");

    panel.innerHTML =
      '<div class="ff-rp-head"><span class="ff-rp-title">Reading settings</span>' +
      '<button type="button" class="ff-rp-close" data-act="close" aria-label="Close">×</button></div>' +
      '<div class="ff-rp-sec"><span class="ff-rp-label" id="ff-rl-theme">Theme</span>' +
      '<div class="ff-themes" role="group" aria-labelledby="ff-rl-theme">' + tiles + "</div></div>" +
      '<div class="ff-rp-sec"><span class="ff-rp-label" id="ff-rl-accent">Accent</span>' +
      '<div class="ff-swatches" role="group" aria-labelledby="ff-rl-accent">' + swatches + "</div></div>" +
      '<div class="ff-rp-sec"><span class="ff-rp-label" id="ff-rl-size">Text size</span>' +
      '<div class="ff-size-row"><span class="a-end a-min" aria-hidden="true">A</span>' +
      '<input type="range" class="ff-range" min="0" max="' + (SIZES.length - 1) + '" step="1" value="' + clampSize(prefs.size) + '" aria-label="Text size">' +
      '<span class="a-end a-max" aria-hidden="true">A</span></div></div>' +
      '<div class="ff-rp-sec"><span class="ff-rp-label" id="ff-rl-lh">Line spacing</span>' +
      seg("lh", "ff-rl-lh", [["tight", "Tight"], ["normal", "Normal"], ["relaxed", "Relaxed"]]) + "</div>" +
      '<div class="ff-rp-sec"><span class="ff-rp-label" id="ff-rl-width">Width</span>' +
      seg("width", "ff-rl-width", [["narrow", "Narrow"], ["normal", "Normal"], ["wide", "Wide"]]) + "</div>" +
      '<div class="ff-rp-foot"><p class="ff-rp-hint">Saved &amp; shared across Fairy Fox.</p>' +
      '<button type="button" class="ff-rp-reset" data-act="reset">Reset</button></div>';

    var range = panel.querySelector(".ff-range");

    function markActive() {
      panel.querySelectorAll("[data-act], .ff-swatch").forEach(function (b) {
        var act = b.getAttribute("data-act"), on = null;
        if (b.classList.contains("ff-swatch")) on = b.getAttribute("data-acc") === (prefs.accent || "");
        else if (act === "theme" || act === "lh" || act === "width") on = b.getAttribute("data-val") === prefs[act];
        if (on !== null) b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      if (range) range.value = clampSize(prefs.size);
    }
    markActive();

    panel.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b || !panel.contains(b)) return;
      if (b.classList.contains("ff-swatch")) { prefs.accent = b.getAttribute("data-acc") || null; }
      else {
        var act = b.getAttribute("data-act");
        if (act === "close") { setOpen(false); btn.focus(); return; }
        if (act === "reset") { prefs = Object.assign({}, DEFAULTS); }
        else if (act === "theme" || act === "lh" || act === "width") prefs[act] = b.getAttribute("data-val");
        else return;
      }
      apply(); save(); markActive();
    });
    range.addEventListener("input", function () {
      prefs.size = clampSize(+range.value); apply(); save();
    });

    function setOpen(open) {
      panel.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) { var f = panel.querySelector(".ff-rp-close"); if (f) f.focus(); }
    }
    btn.addEventListener("click", function (e) { e.stopPropagation(); setOpen(!panel.classList.contains("open")); });
    document.addEventListener("click", function (e) {
      if (panel.classList.contains("open") && !panel.contains(e.target) && e.target !== btn) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("open")) { setOpen(false); btn.focus(); }
    });

    // Far right of the header, just after the primary nav (past "About").
    var wrap = document.querySelector(".site-header .wrap");
    var nav = wrap && wrap.querySelector(".nav");
    if (wrap && nav) nav.parentNode.insertBefore(btn, nav.nextSibling);
    else (wrap || document.body).appendChild(btn);
    document.body.appendChild(panel);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
