#!/usr/bin/env node
// check-links.mjs — doc-drift gate (repo-hygiene standard). Zero dependencies.
//
// Walks every tracked *.md (minus generated/vendored trees) and fails on any RELATIVE
// link whose target file doesn't exist. Wire into the test gate + CI so a rename/move/
// removal that leaves a dangling link turns the build red. Runtime-agnostic: zero deps,
// runs under bare `node` in ANY stack (JVM, Ruby, etc.), not just npm projects.
//
//   node scripts/check-links.mjs      → exit 1 (and a list) on any broken link
//
// SCOPE THE GATE TO YOUR *AUTHORED PROSE* — not adopted mirrors or permalinked content.
// Two classic false-positive classes to SKIP (both correct-by-design, read as "broken"):
//   (1) VERBATIM-ADOPTED EXTERNAL DOCS — e.g. notes/reference/ holding hub-standard mirrors
//       that legitimately carry hub-relative links (docs-site/, ../templates/) resolving at
//       the HUB, not here. Skip that dir (or the specific mirrored files).
//   (2) STATIC-SITE CONTENT COLLECTIONS whose .md links are PERMALINKS ([..](blueprint/)),
//       not filesystem paths — a Jekyll _posts/_books/etc. collection. Skip those trees.
// A node that wires this unthinkingly gets a red wall of false positives on first run —
// add the two classes to SKIP for your repo.
import { execSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { dirname, resolve, join } from "node:path";

const SKIP = [
  /(^|\/)node_modules\//, /(^|\/)_site\//, /(^|\/)vendor\//, /(^|\/)assets\/references\//,
  // /(^|\/)notes\/reference\//,   // (1) uncomment if this dir mirrors hub standards verbatim
  // /(^|\/)_posts\//, /(^|\/)_books\//, /(^|\/)_chapters\//,   // (2) permalinked collections
];
const files = execSync("git ls-files *.md **/*.md", { encoding: "utf8" })
  .split("\n").filter(Boolean).filter((f) => !SKIP.some((re) => re.test(f)));

const LINK = /\[[^\]]*\]\(([^)]+)\)/g;   // [text](target)
// Strip fenced + inline code BEFORE matching, so a markdown link QUOTED inside code
// (e.g. a doc describing this very false positive) doesn't trip the gate.
const decode = (t) => t.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
let broken = 0;

for (const file of files) {
  const text = decode(execSync(`git show HEAD:"${file}"`, { encoding: "utf8" }));
  for (const m of text.matchAll(LINK)) {
    let target = m[1].trim().split(/\s+/)[0];          // drop optional "title"
    if (/^(https?:|mailto:|tel:|#|data:)/i.test(target)) continue;  // external / same-page
    target = target.replace(/[#?].*$/, "");            // strip fragment/query
    if (!target) continue;
    let path = target.startsWith("/") ? join(".", target) : resolve(dirname(file), target);
    if (existsSync(path)) continue;
    if (existsSync(path + ".md") || (existsSync(path) && statSync(path).isDirectory())) continue;
    console.error(`BROKEN  ${file}  ->  ${m[1]}`);
    broken++;
  }
}

if (broken) { console.error(`\n${broken} broken link(s).`); process.exit(1); }
console.log(`check-links: ${files.length} files OK`);
