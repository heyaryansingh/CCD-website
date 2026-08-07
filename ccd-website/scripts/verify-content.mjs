// Deep-equality guard for content, used around risky refactors.
//
//   --snapshot  capture every page, section and collection as a baseline
//   (default)   compare the current content against that baseline
//
// The workflow is: snapshot BEFORE a refactor, compare AFTER. Identical output
// means the change did not alter a single piece of content. This is what proved
// the CMS migration lost nothing.
//
// It is NOT a standing check — editors change content on purpose, so a
// difference here is only meaningful if you did not expect one. Re-run
// --snapshot after intentional edits.
//
//   node --experimental-strip-types --import ./scripts/register-ts.mjs scripts/verify-content.mjs [--snapshot]
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const BASELINE = join(HERE, ".content-baseline.json");

const d = await import("../lib/siteData.ts");
// Pages moved to the server-only loader during the migration; pull them from
// wherever they currently live so the comparison stays meaningful.
let pageSource = d;
try {
  pageSource = await import("../lib/pages.server.ts");
} catch {
  // pre-migration: pages still come from siteData
}

// Everything the site renders. siteConfig.contact.address is a derived getter,
// so it is included deliberately — if the loader stops deriving it, this catches it.
const shape = () => ({
  siteConfig: JSON.parse(JSON.stringify({ ...d.siteConfig, contact: { ...d.siteConfig.contact, address: d.siteConfig.contact.address } })),
  navGroups: JSON.parse(JSON.stringify(d.navGroups)),
  aliases: d.aliases,
  pages: pageSource.pages ?? d.pages,
  projectDetails: pageSource.projectDetails ?? d.projectDetails,
  news: d.news,
  events: d.events,
  leadership: d.leadership,
  interns: d.interns,
  partners: d.partners,
  supporterLogos: d.supporterLogos,
  serviceDirectory: d.serviceDirectory,
  membershipTiers: d.membershipTiers,
  cleanGreenServices: d.cleanGreenServices,
  testimonials: d.testimonials,
  projectPins: d.projectPins,
  beforeAfterPairs: d.beforeAfterPairs,
  homeHeroSlides: d.homeHeroSlides,
  brewProducts: d.brewProducts,
  brewingMethods: d.brewingMethods,
  partnerNames: d.partnerNames,
});

// Stable stringify so key order can differ without being reported as a change —
// JSON round-tripping legitimately reorders keys, and that is not a content loss.
const stable = (v) => {
  if (Array.isArray(v)) return `[${v.map(stable).join(",")}]`;
  if (v && typeof v === "object") {
    return `{${Object.keys(v).sort().map((k) => `${JSON.stringify(k)}:${stable(v[k])}`).join(",")}}`;
  }
  return JSON.stringify(v);
};

const current = shape();

if (process.argv.includes("--snapshot")) {
  writeFileSync(BASELINE, `${JSON.stringify(current, null, 2)}\n`, "utf8");
  const counts = Object.entries(current).map(([k, v]) => `${k}=${Array.isArray(v) ? v.length : Object.keys(v ?? {}).length}`);
  console.log("baseline written");
  console.log(" ", counts.join("  "));
  process.exit(0);
}

if (!existsSync(BASELINE)) {
  console.error("no baseline — run with --snapshot first");
  process.exit(1);
}

const baseline = JSON.parse(readFileSync(BASELINE, "utf8"));
const problems = [];

for (const key of Object.keys(baseline)) {
  if (!(key in current)) {
    problems.push(`${key}: MISSING from the new siteData`);
    continue;
  }
  if (stable(baseline[key]) !== stable(current[key])) {
    // Narrow it down so the failure names the page, not just "pages".
    const a = baseline[key];
    const b = current[key];
    if (a && b && typeof a === "object" && !Array.isArray(a)) {
      for (const sub of new Set([...Object.keys(a), ...Object.keys(b)])) {
        if (stable(a[sub]) !== stable(b[sub])) problems.push(`${key}.${sub} differs`);
      }
    } else if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) problems.push(`${key}: length ${a.length} -> ${b.length}`);
      a.forEach((item, i) => {
        if (stable(item) !== stable(b[i])) problems.push(`${key}[${i}] differs`);
      });
    } else {
      problems.push(`${key} differs`);
    }
  }
}

for (const key of Object.keys(current)) {
  if (!(key in baseline)) problems.push(`${key}: unexpected new export`);
}

if (problems.length) {
  console.error(`content changed in ${problems.length} place(s):`);
  for (const p of problems.slice(0, 40)) console.error("  -", p);
  if (problems.length > 40) console.error(`  ... and ${problems.length - 40} more`);
  process.exit(1);
}

console.log("content identical to baseline — migration lost nothing");
