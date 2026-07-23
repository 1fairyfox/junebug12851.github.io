#!/usr/bin/env node
// build-verify-index.mjs — generate VERIFY-INDEX.md: every standard's `## Verify` table
// collected into one page, so a node-side full compliance audit is a single read instead
// of opening 25+ files. Zero dependencies; runtime-agnostic (bare `node`).
//
//   node hub/standards/build-verify-index.mjs        → writes hub/standards/VERIFY-INDEX.md
//
// DERIVED artifact — the standards stay canonical (single source of truth); this is a
// generated convenience, regenerated when standards change (a stale index is a bug — wire
// this into the compliance/maintenance pass or CI). Do NOT hand-edit VERIFY-INDEX.md.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SKIP = new Set(["CHANGELOG.md", "VERIFY-INDEX.md", "compliance.md"]); // aggregators, not atomic standards

const files = readdirSync(HERE).filter((f) => f.endsWith(".md") && !SKIP.has(f)).sort();

// Pull the `## Verify …` section body (up to the next `## ` or EOF).
function verifySection(md) {
  const lines = md.split("\n");
  const start = lines.findIndex((l) => /^##\s+Verify\b/i.test(l));
  if (start === -1) return null;
  const body = [];
  for (let i = start + 1; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i])) break;
    body.push(lines[i]);
  }
  return body.join("\n").trim();
}

let out = `# Verify Index (generated — do not hand-edit)

Every standard's \`## Verify\` table in one place, for a single-read full
[compliance audit](compliance.md). **Generated** by \`build-verify-index.mjs\` from the
canonical standards — regenerate when a standard changes (\`node hub/standards/build-verify-index.mjs\`).
The standards themselves remain the source of truth; this is a derived convenience.

`;
let withVerify = 0, without = [];
for (const f of files) {
  const md = readFileSync(join(HERE, f), "utf8");
  const titleLine = md.split("\n").find((l) => /^#\s+/.test(l)) || f;
  const title = titleLine.replace(/^#\s+/, "").trim();
  const sec = verifySection(md);
  if (!sec) { without.push(f); continue; }
  withVerify++;
  out += `\n## ${title}  \n<sub>[\`${f}\`](${f}#verify-is-it-being-followed)</sub>\n\n${sec}\n`;
}

if (without.length) {
  out += `\n---\n\n### No \`## Verify\` section (runbooks / meta — expected)\n\n` +
    without.map((f) => `- \`${f}\``).join("\n") + "\n";
}

writeFileSync(join(HERE, "VERIFY-INDEX.md"), out);
console.log(`VERIFY-INDEX.md: ${withVerify} standards indexed, ${without.length} without a Verify section (${without.join(", ") || "none"}).`);
