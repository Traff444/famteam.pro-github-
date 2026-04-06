/**
 * Post-build domain replacement.
 *
 * Replaces https://famteam.ru with SITE_URL in all HTML, XML, TXT, and JSON
 * files inside dist/. Runs after `vite build`.
 *
 * Usage:
 *   SITE_URL=https://famteam.pro node scripts/postbuild-domain.mjs
 *
 * If SITE_URL is not set or equals the default, the script exits early.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "../dist");

const DEFAULT_DOMAIN = "https://famteam.ru";
const TARGET_DOMAIN = process.env.SITE_URL?.replace(/\/+$/, "");

if (!TARGET_DOMAIN || TARGET_DOMAIN === DEFAULT_DOMAIN) {
  console.log("[postbuild-domain] SITE_URL not set or matches default, skipping.");
  process.exit(0);
}

console.log(`[postbuild-domain] Replacing ${DEFAULT_DOMAIN} -> ${TARGET_DOMAIN}`);

const EXTENSIONS = new Set([".html", ".xml", ".txt", ".json", ".js"]);

function walkDir(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = resolve(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      results.push(...walkDir(full));
    } else {
      const ext = full.slice(full.lastIndexOf("."));
      if (EXTENSIONS.has(ext)) {
        results.push(full);
      }
    }
  }
  return results;
}

const files = walkDir(DIST);
let patched = 0;

for (const file of files) {
  const content = readFileSync(file, "utf-8");
  if (!content.includes(DEFAULT_DOMAIN)) continue;

  const updated = content.replaceAll(DEFAULT_DOMAIN, TARGET_DOMAIN);
  writeFileSync(file, updated);
  patched++;
  console.log(`  patched: ${file.replace(DIST, "dist")}`);
}

console.log(`[postbuild-domain] Done. ${patched}/${files.length} files patched.`);
