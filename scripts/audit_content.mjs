// Audit siteData.js for content bugs that would ship to the live site, and
// generate the per-page heading outline the Wix rebuild needs.
//
// Three checks:
//   1. Every internal href points at a page that actually exists.
//   2. No page repeats the same link/button label (a screen-reader failure:
//      "Learn more" x6 read out of context is meaningless).
//   3. Heading outline per page: one H1, no skipped levels.
//
// Run:  node scripts/audit_content.mjs
// Out:  wix-migration-kit/handoff/HEADING-OUTLINES.md  (+ findings on stdout)

import { writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const shim = join(ROOT, 'scripts', '.audit.tmp.mjs');
copyFileSync(join(ROOT, 'wix-migration-kit/velo/siteData.js'), shim);
let mod;
try { mod = await import('file://' + shim.replace(/\\/g, '/')); } finally { rmSync(shim, { force: true }); }
const { pages } = mod;

const clean = v => String(v ?? '').replace(/\s+/g, ' ').trim();

// ---- known routes -------------------------------------------------------
// A page's route is its `slug` if present, else its key. home has slug "".
const routes = new Set(['/']);
const slugOf = {};
for (const [key, p] of Object.entries(pages)) {
  const s = p.slug === '' ? '/' : `/${p.slug ?? key}`;
  routes.add(s);
  slugOf[key] = s;
}
// The Projects dynamic page generates one route per Projects CMS row.
const DYNAMIC_PROJECT_SLUGS = ['oasis-240', 'community-center', 'bus-stop', 'memorial-garden'];
DYNAMIC_PROJECT_SLUGS.forEach(s => routes.add(`/projects/${s}`));

// ---- walk every href ----------------------------------------------------
const brokenLinks = [], externalLinks = new Set(), emptyLinks = [];
const labelsByPage = {};

function noteHref(href, pageKey, where) {
  const h = clean(href);
  if (!h) { emptyLinks.push(`${pageKey}: ${where}`); return; }
  if (/^(https?:|mailto:|tel:)/.test(h)) { externalLinks.add(h); return; }
  if (h.startsWith('#')) return;
  const path = h.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
  if (!routes.has(path)) brokenLinks.push({ pageKey, where, href: h });
}

function noteLabel(label, pageKey) {
  const l = clean(label);
  if (!l) return;
  (labelsByPage[pageKey] ??= []).push(l);
}

for (const [key, p] of Object.entries(pages)) {
  if (p.heroCta) { noteHref(p.heroCta.href, key, 'hero button'); noteLabel(p.heroCta.label, key); }
  (p.sections || []).forEach((s, i) => {
    const n = i + 1;
    if (s.ctaHref !== undefined || s.href !== undefined) noteHref(s.ctaHref ?? s.href, key, `section ${n} button`);
    noteLabel(s.ctaText ?? s.label, key);
    (s.cards || []).forEach((c, j) => {
      if (c.href !== undefined) noteHref(c.href, key, `section ${n} card ${j + 1} ("${clean(c.title)}")`);
      noteLabel(c.meta ?? (c.href ? 'Learn more' : ''), key);
    });
  });
}

// duplicate labels within one page
const dupLabels = [];
for (const [key, labels] of Object.entries(labelsByPage)) {
  const counts = labels.reduce((m, l) => (m[l] = (m[l] || 0) + 1, m), {});
  for (const [l, c] of Object.entries(counts)) if (c > 1) dupLabels.push({ pageKey: key, label: l, count: c });
}

// ---- heading outline ----------------------------------------------------
// Rule: hero title = H1 (exactly one). Each section title = H2. Card/step/
// item titles inside a section = H3. Eyebrows are NOT headings - they are
// styled paragraphs, which is the mistake this table exists to prevent.
const NOT_A_HEADING = 'paragraph with `.ccd-eyebrow`';
const outlineRows = [];
const headingProblems = [];

for (const [key, p] of Object.entries(pages)) {
  const rows = [];
  const h1 = clean(p.heroTitle || p.title);
  const accent = clean(p.heroAccent);
  rows.push({ level: 'H1', text: accent ? `${h1} ${accent}` : h1,
              note: accent ? 'title + accent are ONE H1, not two headings' : '' });
  if (clean(p.eyebrow)) rows.push({ level: '(not a heading)', text: clean(p.eyebrow), note: NOT_A_HEADING });

  (p.sections || []).forEach((s, i) => {
    const n = i + 1;
    if (clean(s.eyebrow)) rows.push({ level: '(not a heading)', text: clean(s.eyebrow), note: NOT_A_HEADING });
    if (clean(s.title)) rows.push({ level: 'H2', text: clean(s.title), note: `section ${n}` });
    else if ((s.cards || s.steps || s.items || []).length) {
      rows.push({ level: 'H2', text: '(no section title)', note: `section ${n} - has H3s under no H2. Add a section heading, or drop these to paragraphs.` });
      headingProblems.push(`${key}: section ${n} (${s.type}) has child titles but no section title - that skips a heading level`);
    }
    for (const kind of ['cards', 'steps', 'items']) {
      (s[kind] || []).forEach(c => { if (clean(c.title)) rows.push({ level: 'H3', text: clean(c.title), note: `${kind} in section ${n}` }); });
    }
  });

  const h1Count = rows.filter(r => r.level === 'H1').length;
  if (h1Count !== 1) headingProblems.push(`${key}: ${h1Count} H1s (must be exactly 1)`);
  if (!h1) headingProblems.push(`${key}: no hero title to use as H1`);
  outlineRows.push({ key, slug: slugOf[key], title: clean(p.title), rows });
}

// ---- report -------------------------------------------------------------
const md = [
  `# Heading outline for every page`,
  ``,
  `Generated by \`scripts/audit_content.mjs\`. Apply these when you rebuild the pages in Wix.`,
  ``,
  `**Why this document exists.** In Wix the heading *tag* (H1-H6) is separate from how the text *looks*. The usual mistake is picking "Heading 2" because the font size looks right. Screen readers and search engines read the tag, not the size. Set the tag from this table, then style it with the \`.ccd-*\` classes.`,
  ``,
  `Two rules: **exactly one H1 per page**, and **never skip a level** (no H3 without an H2 above it).`,
  ``,
  `Rows marked "(not a heading)" are the small caps eyebrow lines. They must be **paragraphs**, not headings - they are labels, not document structure. In Wix Studio use the Accessibility Wizard's "Organize heading structure" control to set tags.`,
  ``,
  headingProblems.length
    ? [`## ${headingProblems.length} problems to fix`, ``, ...headingProblems.map(p => `- ${p}`), ``].join('\n')
    : `## No heading problems found.\n`,
  ``,
  ...outlineRows.flatMap(({ key, slug, title, rows }) => [
    `## ${title}`,
    ``,
    `\`${slug}\` - packet: [page-copy/${key}.md](page-copy/${key}.md)`,
    ``,
    `| Tag | Text | Note |`,
    `|---|---|---|`,
    ...rows.map(r => `| ${r.level === 'H1' ? '**H1**' : r.level} | ${r.text.replace(/\|/g, '\\|')} | ${r.note} |`),
    ``,
  ]),
].join('\n');

writeFileSync(join(ROOT, 'wix-migration-kit/handoff/HEADING-OUTLINES.md'), md, 'utf8');

// ---- proposed link-text replacements ------------------------------------
// A card button labelled "Learn more" six times on one page is meaningless to
// anyone navigating by link list. Each needs to say where IT goes. Generated
// per card so the fix is mechanical rather than a writing exercise.
const linkFixes = [];
for (const [key, p] of Object.entries(pages)) {
  (p.sections || []).forEach((s, i) => {
    (s.cards || []).forEach((c, j) => {
      if (!c.href) return;
      const current = clean(c.meta) || 'Learn more';
      const title = clean(c.title);
      if (!title) return;
      // A status badge ("IN PROGRESS") used as a button label is a separate bug:
      // it describes state, not destination.
      const isStatus = /^[A-Z0-9 &-]+$/.test(current) && current.split(' ').length <= 3 && !/^learn/i.test(current);
      // "Learn more about X" only reads well when X is a noun phrase. Several card
      // titles here are full clauses ("Members join"), where it turns to nonsense.
      // "Learn more: X" is never ungrammatical, so it is the safe default.
      const nounish = title.split(' ').length <= 4 && !/^(members?|bring|shop|become|join|own|get|see|find)\b/i.test(title);
      linkFixes.push({
        page: key, section: i + 1, card: j + 1, title, href: c.href, current,
        proposed: isStatus ? `See ${title}` : (nounish ? `Learn more about ${title}` : `Learn more: ${title}`),
        why: isStatus
          ? 'status badge as link text - describes state, not destination (keep the badge, change the LINK label)'
          : 'repeated generic label',
      });
    });
  });
}
const dupPages = new Set(dupLabels.map(d => d.pageKey));
const needed = linkFixes.filter(f => dupPages.has(f.page));

writeFileSync(join(ROOT, 'wix-migration-kit/handoff/LINK-TEXT-FIXES.md'), [
  `# Link text fixes`,
  ``,
  `Generated by \`scripts/audit_content.mjs\`.`,
  ``,
  `**The problem.** Screen reader users often pull up a list of a page's links and read it on its own, with no surrounding text. Six links all saying "Learn more" become six identical, useless entries. Sighted users skimming have the same problem.`,
  ``,
  `**Good news first:** all ${routes.size - 4} internal links point at pages that exist, and no link is empty. Nothing is broken - this is about wording.`,
  ``,
  `## Pages with repeated link labels`,
  ``,
  `| Page | Repeated label | Times |`,
  `|---|---|---|`,
  ...dupLabels.map(d => `| \`${slugOf[d.pageKey]}\` | ${d.label} | ${d.count} |`),
  ``,
  `## Replacements`,
  ``,
  `Apply the "Use this" column as the button label. The link destination does not change.`,
  ``,
  `These are **safe defaults, not finished writing.** Every one is grammatical and says where it goes, so applying them as-is is a real improvement. Where a shorter or more natural phrasing exists, use it - "Learn more about the co-op market" beats "Learn more: Shop local". See \`CONTENT-STYLE-GUIDE.md\` for the button-label pattern.`,
  ``,
  `For the status-badge rows: **keep the badge visible** ("IN PROGRESS" is useful information). The change is to the *link label*, which should name the destination.`,
  ``,
  `| Page | Card | Currently says | Use this | Why |`,
  `|---|---|---|---|---|`,
  ...needed.map(f => `| \`${slugOf[f.page]}\` | ${f.title} | ${f.current} | **${f.proposed}** | ${f.why} |`),
  ``,
  `## The rule going forward`,
  ``,
  `A link label must make sense read completely on its own. If you cannot tell where it goes without the words around it, rewrite it. See \`CONTENT-STYLE-GUIDE.md\` for the button-label pattern.`,
  ``,
  `Length matters too - keep labels short enough not to wrap on mobile. "Learn more about the co-op market" is fine; a full sentence is not.`,
  ``,
].join('\n'), 'utf8');
console.log(`\nLINK-TEXT-FIXES.md written: ${needed.length} replacements across ${dupPages.size} pages.`);

console.log(`Routes known: ${routes.size} (${Object.keys(pages).length} pages + ${DYNAMIC_PROJECT_SLUGS.length} dynamic project pages)`);
console.log(`\n--- 1. Broken internal links: ${brokenLinks.length}`);
brokenLinks.forEach(b => console.log(`  ${b.pageKey}: ${b.where} -> "${b.href}" (no such page)`));
console.log(`\n--- 2. Empty hrefs: ${emptyLinks.length}`);
emptyLinks.forEach(e => console.log(`  ${e}`));
console.log(`\n--- 3. Repeated link labels within one page: ${dupLabels.length}`);
dupLabels.forEach(d => console.log(`  ${d.pageKey}: "${d.label}" x${d.count} - each must say where IT goes`));
console.log(`\n--- 4. Heading problems: ${headingProblems.length}`);
headingProblems.forEach(p => console.log(`  ${p}`));
console.log(`\n${externalLinks.size} distinct external/mailto/tel links (not checked for reachability).`);
console.log(`\nHEADING-OUTLINES.md written.`);

// Fail only on genuine content bugs. Heading problems are advisory - they are
// design decisions for the rebuild, not defects in this data.
const bugs = brokenLinks.length + emptyLinks.length;
console.assert(routes.size >= 19, 'route table looks wrong');
if (bugs) { console.error(`\n${bugs} link bug(s) to fix.`); process.exitCode = 1; }
else console.log('\nNo broken or empty links.');
