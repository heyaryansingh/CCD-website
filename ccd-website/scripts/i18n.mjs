// =============================================================================
// TRANSLATION WORKBENCH
//
// The site is written in English. Every other language is a lookup table in
// content/translations/<code>.json, keyed by the exact English string. This
// script is what keeps those tables in step with the content, WITHOUT anyone
// hand-maintaining them and without a paid translation API:
//
//   report                     what is translated and what is missing
//   extract --locale=es        write the next batch of missing strings to a file
//   apply --locale=es <file>   merge a filled-in batch back into the dictionary
//   prune                      drop entries whose English source no longer exists
//
// The translating itself is done by an agent — run `/translate es` in Claude
// Code and it drives exactly these three commands. Nothing here calls out to a
// service or needs a key.
//
// Strings come from the app's own modules, not from a second copy of the parsing
// rules, so {{settings}} tokens are already resolved and `translatable()` is the
// same function the renderer uses. A string this script cannot see is a string
// the site can never translate, so the two must not be allowed to disagree.
//
//   node --experimental-strip-types --import ./scripts/register-ts.mjs scripts/i18n.mjs <command>
//
// or, more simply: npm run i18n -- <command>
// =============================================================================

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DICT_DIR = join(ROOT, "content", "translations");
const WORK_DIR = join(ROOT, ".i18n");
const UI_STRINGS = join(ROOT, "content", "generated", "ui-strings.json");

const { defaultLocale, locales, translatable } = await import("../lib/i18n.ts");
const siteData = await import("../lib/siteData.ts");
const pageData = await import("../lib/pages.server.ts");

// --- The full set of English strings the site can show -----------------------

function collect(value, into, key) {
  if (typeof value === "string") {
    if (translatable(key, value)) into.add(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collect(item, into, key);
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) collect(v, into, k);
  }
}

function sourceStrings() {
  const out = new Set();

  if (!existsSync(UI_STRINGS)) {
    console.error(
      "content/generated/ui-strings.json is missing — run `npm run bundle:pages` first.",
    );
    process.exit(1);
  }
  for (const s of JSON.parse(readFileSync(UI_STRINGS, "utf8"))) out.add(s);

  collect(pageData.pages, out);
  collect(pageData.projectDetails, out);
  for (const [name, value] of Object.entries(siteData)) {
    // Skip the re-exported helpers and config; content only.
    if (typeof value === "function" || name === "siteConfig") continue;
    collect(value, out);
  }
  // The organisation's own name and tagline do show on the page.
  collect(siteData.siteConfig.org, out);

  return [...out].sort((a, b) => a.localeCompare(b));
}

// --- Dictionaries ------------------------------------------------------------

const targets = locales.filter((l) => l.code !== defaultLocale);

function dictPath(code) {
  return join(DICT_DIR, `${code}.json`);
}

function readDict(code) {
  const path = dictPath(code);
  return existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : {};
}

function writeDict(code, dict) {
  // Sorted, so a diff shows what changed rather than a reshuffle.
  const sorted = Object.fromEntries(
    Object.keys(dict)
      .sort((a, b) => a.localeCompare(b))
      .filter((k) => dict[k])
      .map((k) => [k, dict[k]]),
  );
  mkdirSync(DICT_DIR, { recursive: true });
  writeFileSync(dictPath(code), `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
  return Object.keys(sorted).length;
}

function localeByCode(code) {
  const found = targets.find((l) => l.code === code);
  if (!found) {
    console.error(
      `Unknown language "${code}". Choose one of: ${targets.map((l) => l.code).join(", ")}`,
    );
    process.exit(1);
  }
  return found;
}

// --- Commands ----------------------------------------------------------------

function report(sources) {
  const width = Math.max(...targets.map((l) => l.english.length));
  console.log(`${sources.length} translatable strings in the site.\n`);
  for (const locale of targets) {
    const dict = readDict(locale.code);
    const done = sources.filter((s) => dict[s]).length;
    const pct = Math.round((done / sources.length) * 100);
    const bar = "█".repeat(Math.round(pct / 5)).padEnd(20, "·");
    console.log(
      `  ${locale.code}  ${locale.english.padEnd(width)}  ${bar} ${String(pct).padStart(3)}%  ` +
        `${done}/${sources.length}`,
    );
  }
  const stale = targets.flatMap((l) =>
    Object.keys(readDict(l.code)).filter((k) => !sources.includes(k)).map((k) => `${l.code}:${k}`),
  );
  if (stale.length) {
    console.log(
      `\n${stale.length} entries no longer match any English text (the source was edited).` +
        `\nRun \`npm run i18n -- prune\` to drop them.`,
    );
  }
}

function extract(sources, code, limit) {
  const locale = localeByCode(code);
  const dict = readDict(code);
  // Interface text first, then shortest-first. A half-translated language should
  // be one whose buttons, menus and form labels all work and whose long articles
  // are still in English — not the reverse, which reads as broken.
  const ui = new Set(JSON.parse(readFileSync(UI_STRINGS, "utf8")));
  const missing = sources
    .filter((s) => !dict[s])
    .sort((a, b) => (ui.has(b) ? 1 : 0) - (ui.has(a) ? 1 : 0) || a.length - b.length)
    .slice(0, limit);
  if (!missing.length) {
    console.log(`${locale.english} is fully translated. Nothing to extract.`);
    return;
  }
  mkdirSync(WORK_DIR, { recursive: true });
  const out = join(WORK_DIR, `todo.${code}.json`);
  writeFileSync(
    out,
    `${JSON.stringify(
      {
        language: locale.english,
        endonym: locale.label,
        code,
        direction: locale.dir,
        remaining: sources.filter((s) => !dict[s]).length,
        note:
          "Translate each string below for a community-development non-profit in " +
          "Baltimore. Keep {placeholders}, ALL-CAPS labels capitalised, and proper " +
          "nouns (CCD, H.E.A.R.T., Irvington, The 4th Brew, Clean & Green) as they " +
          "are. Write the result as {source: translation} to .i18n/done." +
          code +
          ".json",
        strings: missing,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  console.log(
    `${missing.length} strings -> ${out}` +
      `  (${sources.filter((s) => !dict[s]).length} still missing overall)`,
  );
}

function apply(sources, code, file) {
  const locale = localeByCode(code);
  if (!file || !existsSync(file)) {
    console.error(`Cannot read "${file}".`);
    process.exit(1);
  }
  const incoming = JSON.parse(readFileSync(file, "utf8"));
  const dict = readDict(code);
  const known = new Set(sources);
  let added = 0;
  let unknown = 0;
  for (const [source, translation] of Object.entries(incoming)) {
    if (typeof translation !== "string" || !translation.trim()) continue;
    if (!known.has(source)) {
      // A key that matches no English on the site would never be looked up.
      // Usually a typo or a stale batch; say so rather than storing dead weight.
      unknown += 1;
      continue;
    }
    if (dict[source] !== translation) added += 1;
    dict[source] = translation;
  }
  const total = writeDict(code, dict);
  console.log(
    `${locale.english}: ${added} new/changed, ${total}/${sources.length} translated` +
      (unknown ? `  (${unknown} ignored — no matching English text)` : ""),
  );
}

function prune(sources) {
  const known = new Set(sources);
  for (const locale of targets) {
    const dict = readDict(locale.code);
    const before = Object.keys(dict).length;
    for (const key of Object.keys(dict)) if (!known.has(key)) delete dict[key];
    const after = writeDict(locale.code, dict);
    if (before !== after) console.log(`${locale.code}: dropped ${before - after} stale entries`);
  }
  console.log("prune complete");
}

// --- Entry point -------------------------------------------------------------

const argv = process.argv.slice(2);
const command = argv.find((a) => !a.startsWith("-")) ?? "report";
const flag = (name, fallback) => {
  const hit = argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};

const sources = sourceStrings();

switch (command) {
  case "report":
    report(sources);
    break;
  case "extract":
    extract(sources, flag("locale", ""), Number(flag("limit", "150")));
    break;
  case "apply":
    apply(
      sources,
      flag("locale", ""),
      argv.filter((a) => !a.startsWith("-"))[1] ??
        join(WORK_DIR, `done.${flag("locale", "")}.json`),
    );
    break;
  case "prune":
    prune(sources);
    break;
  default:
    console.error(`Unknown command "${command}". Use: report | extract | apply | prune`);
    process.exit(1);
}
