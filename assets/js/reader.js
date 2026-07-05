// reader.js — the Kindle-style reader-settings menu (the "Aa" button + panel):
// theme, text size, line spacing and reading width, tuned live and remembered.
//
// Prefs live under an ORIGIN-WIDE localStorage key ("fairyfox:reader"), so the
// choice is SHARED across every same-origin fairyfox.io site (this hub + each
// project's docs). The constants below are kept IDENTICAL to the project docs
// theme (assets/docs-theme/modules/reader.js) so a choice is interchangeable.
//
// The early theme + reading-var apply happens inline in <head> (head.html) to
// avoid a flash; this script builds the button + panel and re-applies on change.
(function () {
  "use strict";

  var READER_KEY = "fairyfox:reader";
  var SIZES = [0.92, 0.99, 1.05, 1.14, 1.24, 1.36]; // rem, stepped by A− / A+
  var LH = { tight: 1.6, normal: 1.8, relaxed: 2.05 };
  var WIDTH = { narrow: "38rem", normal: "46rem", wide: "56rem" };
  var DEFAULTS = { theme: "system", size: 2, lh: "normal", width: "normal" };

  var prefs = Object.assign({}, DEFAULTS);

  function clampSize(n) { return Math.max(0, Math.min(SIZES.length - 1, n | 0)); }

  function load() {
    try {
      return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(READER_KEY) || "{}"));
    } catch (e) {
      return Object.assign({}, DEFAULTS);
    }
  }
  function save() {
    try { localStorage.setItem(READER_KEY, JSON.stringify(prefs)); } catch (e) { /* private mode — ignore */ }
  }
  function apply() {
    var root = document.documentElement;
    if (prefs.theme === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", prefs.theme);
    root.style.setProperty("--reading-fs", SIZES[clampSize(prefs.size)] + "rem");
    root.style.setProperty("--reading-lh", String(LH[prefs.lh] || LH.normal));
    root.style.setProperty("--reading-width", WIDTH[prefs.width] || WIDTH.normal);
  }

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }

  function seg(act, labelId, opts) {
    var buttons = opts.map(function (o) {
      return '<button type="button" data-act="' + act + '" data-val="' + o[0] + '">' + o[1] + "</button>";
    }).join("");
    return '<div class="ff-seg" role="group" aria-labelledby="' + labelId + '">' + buttons + "</div>";
  }

  function init() {
    prefs = load();
    apply();

    var btn = el("button", {
      class: "ff-reader-btn", type: "button", "aria-label": "Reading settings",
      "aria-haspopup": "dialog", "aria-expanded": "false", "aria-controls": "ff-reader-panel",
      title: "Reading settings",
    });
    btn.innerHTML = '<span class="aa-lg">A</span><span class="aa-sm">a</span>';

    var panel = el("div", { id: "ff-reader-panel", class: "ff-reader-panel", role: "dialog", "aria-label": "Reading settings" });
    panel.innerHTML =
      '<div class="ff-reader-row"><span class="ff-reader-label" id="ff-rl-theme">Theme</span>' +
      seg("theme", "ff-rl-theme", [["system", "Auto"], ["light", "Light"], ["sepia", "Sepia"], ["dark", "Dark"]]) +
      "</div>" +
      '<div class="ff-reader-row"><span class="ff-reader-label" id="ff-rl-size">Text size</span>' +
      '<div class="ff-seg ff-size" role="group" aria-labelledby="ff-rl-size">' +
      '<button type="button" data-act="size-dec" class="aa-min" aria-label="Smaller text">A</button>' +
      '<button type="button" data-act="size-inc" class="aa-max" aria-label="Larger text">A</button>' +
      "</div></div>" +
      '<div class="ff-reader-row"><span class="ff-reader-label" id="ff-rl-lh">Line spacing</span>' +
      seg("lh", "ff-rl-lh", [["tight", "Tight"], ["normal", "Normal"], ["relaxed", "Relaxed"]]) +
      "</div>" +
      '<div class="ff-reader-row"><span class="ff-reader-label" id="ff-rl-width">Width</span>' +
      seg("width", "ff-rl-width", [["narrow", "Narrow"], ["normal", "Normal"], ["wide", "Wide"]]) +
      "</div>" +
      '<p class="ff-hint">Text size, spacing &amp; width apply to reading pages. Your choice is remembered across Fairy&nbsp;Fox.</p>';

    function markActive() {
      panel.querySelectorAll("button[data-act]").forEach(function (b) {
        var act = b.getAttribute("data-act");
        if (act === "theme" || act === "lh" || act === "width")
          b.setAttribute("aria-pressed", b.getAttribute("data-val") === prefs[act] ? "true" : "false");
      });
    }
    markActive();

    panel.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-act]");
      if (!b) return;
      var act = b.getAttribute("data-act");
      if (act === "theme" || act === "lh" || act === "width") prefs[act] = b.getAttribute("data-val");
      else if (act === "size-dec") prefs.size = clampSize(prefs.size - 1);
      else if (act === "size-inc") prefs.size = clampSize(prefs.size + 1);
      apply();
      save();
      markActive();
    });

    function setOpen(open) {
      panel.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) { var f = panel.querySelector("button"); if (f) f.focus(); }
    }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(!panel.classList.contains("open"));
    });
    document.addEventListener("click", function (e) {
      if (panel.classList.contains("open") && !panel.contains(e.target) && e.target !== btn) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("open")) { setOpen(false); btn.focus(); }
    });

    // Place the button at the far right of the header, just after the primary nav
    // (past "About"). It's the last child of the header wrap, so it stays visible
    // when the nav collapses to a dropdown on mobile.
    var wrap = document.querySelector(".site-header .wrap");
    var nav = wrap && wrap.querySelector(".nav");
    if (wrap && nav) nav.parentNode.insertBefore(btn, nav.nextSibling);
    else (wrap || document.body).appendChild(btn);
    document.body.appendChild(panel);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
