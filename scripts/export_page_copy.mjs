// Export siteData.js -> per-page copy packets for pasting into native Wix text elements.
//
// Why this exists: page copy currently lives in a 29KB JS object that only a developer
// can edit. These packets are what you paste into real Wix text elements so the copy
// becomes editable by anyone, and renderPage.js can be deleted.
//
// Generic over section shape on purpose: it emits EVERY string field it finds rather
// than a list of known section types. That is how it catches `bullets` and `images`,
// which renderPage.js never rendered at all.
//
// Run:  node scripts/export_page_copy.mjs
// Out:  wix-migration-kit/handoff/page-copy/

import { writeFileSync, mkdirSync, copyFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'wix-migration-kit/velo/siteData.js');
const OUT = join(ROOT, 'wix-migration-kit/handoff/page-copy');

// siteData.js uses ESM `export const` but has a .js extension in a non-module package,
// so node won't import it directly. Copy to .mjs and import that.
// ponytail: temp-file shim beats adding a package.json or a parser dependency.
const shim = join(ROOT, 'scripts', '.siteData.tmp.mjs');
copyFileSync(SRC, shim);
let mod;
try {
  mod = await import('file://' + shim.replace(/\\/g, '/'));
} finally {
  rmSync(shim, { force: true });
}
const { pages, siteConfig, firstLink, mailtoFallback } = mod;

mkdirSync(OUT, { recursive: true });

// ---- link resolution ------------------------------------------------------
// Some hrefs in siteData are computed through actionLink(), which falls back to a
// mailto: when the real URL is blank. Resolve here so the packets show the true
// destination, and flag the blanks — a blank link is a silent content bug.
const EMPTY_LINKS = Object.entries(siteConfig.links)
  .filter(([, v]) => !v || !String(v).trim())
  .map(([k]) => k);

const warnings = [];
const resolveHref = (href, where) => {
  if (href === undefined || href === null) return null;
  const s = String(href);
  if (!s.trim()) { warnings.push(`${where}: link is EMPTY — nothing to point the button at`); return '(EMPTY — needs a destination)'; }
  if (s.trim().toUpperCase().startsWith('TODO')) { warnings.push(`${where}: link is a TODO placeholder — "${s}"`); return `(TODO — ${s})`; }
  return s;
};

// ---- formatting ----------------------------------------------------------
const clean = v => String(v).replace(/\s+/g, ' ').trim();
const isText = v => typeof v === 'string' || typeof v === 'number';

// Fields that are plumbing, not copy a person types into a text box.
const SKIP = new Set(['slug', 'active', 'type', 'href', 'ctaHref', 'image', 'media', 'src',
                      'theme', 'id', 'heroPosition']);

// Section types whose rows come from a CMS collection, not from pasted text.
// Their headings are still normal page copy; only the repeating rows are CMS-driven.
const REPEATER = new Map([
  ['partnerWall', 'Partners'],
  ['teamFull', 'Team'],
  ['aboutTeam', 'Team'],
  ['newsEvents', 'News and Events'],
  ['eventsFull', 'Events'],
  ['membershipTiers', 'MembershipTiers'],
  ['testimonials', 'Testimonials'],
  ['directory', 'ServiceDirectory'],
  ['beforeAfter', 'BeforeAfterPairs'],
  ['projectMap', 'Projects'],
]);

// Page-level fields that are layout/plumbing, not copy anyone types.
// Everything NOT here and NOT emitted below trips the completeness check.
const PAGE_PLUMBING = new Set(['slug', 'active', 'type', 'id', 'theme', 'heroPosition', 'sections', 'heroCta']);

function heroRows(p) {
  const rows = [];
  const push = (label, val, id) => { if (isText(val) && clean(val)) rows.push({ label, val: clean(val), id }); };
  push('Eyebrow (small caps line above the title)', p.eyebrow, '#pageEyebrow');
  push('Main title (this is the page H1)', p.heroTitle || p.title, '#pageTitle');
  push('Accent line (second half of the title)', p.heroAccent, '#pageAccent');
  push('Intro paragraph', p.heroBody || p.description, '#pageBody');
  if (p.heroCta) {
    push('Button label', p.heroCta.label, '#heroCta');
    const h = resolveHref(p.heroCta.href, `hero button on "${p.title}"`);
    if (h) rows.push({ label: 'Button goes to', val: h, id: '#heroCta (link)' });
  }
  // Hero image + its alt text. The alt text was already written but renderPage.js
  // never applied it, so it has never reached a visitor. It is required for AA.
  push('Hero image file', p.heroImage, '(set in Editor)');
  push('Hero image description (ALT TEXT — required)', p.heroAlt, '(Editor: image > Alt Text)');
  push('Photo credit', p.credit, '(caption)');
  // Anything else scalar on the page that is not plumbing, so nothing hides.
  for (const [k, v] of Object.entries(p)) {
    if (PAGE_PLUMBING.has(k) || !isText(v)) continue;
    if (['eyebrow','heroTitle','title','heroAccent','heroBody','description','heroImage','heroAlt','credit'].includes(k)) continue;
    push(k, v, '—');
  }
  return rows;
}

function sectionRows(s, i) {
  const rows = [];
  const push = (label, val, id) => { if (isText(val) && clean(val)) rows.push({ label, val: clean(val), id }); };

  // scalar copy fields on the section itself
  for (const [k, v] of Object.entries(s)) {
    if (SKIP.has(k) || !isText(v)) continue;
    const id = { eyebrow: `#sec${i}Eyebrow`, title: `#sec${i}Title`, body: `#sec${i}Body`,
                 ctaText: `#sec${i}Cta`, label: `#sec${i}Cta` }[k] || '—';
    push(k, v, id);
  }
  const h = resolveHref(s.ctaHref ?? s.href, `section ${i} button`);
  if (h) rows.push({ label: 'button goes to', val: h, id: `#sec${i}Cta (link)` });

  // every array of objects, whatever it is called
  for (const [key, arr] of Object.entries(s)) {
    if (!Array.isArray(arr) || !arr.length) continue;
    arr.forEach((item, j) => {
      const n = j + 1;
      if (isText(item)) { push(`${key} ${n}`, item, ID(key, i, n, null)); return; }
      if (typeof item !== 'object' || item === null) return;
      for (const [f, v] of Object.entries(item)) {
        if (SKIP.has(f) || !isText(v)) continue;
        push(`${key} ${n} — ${f}`, v, ID(key, i, n, f));
      }
      const ih = resolveHref(item.href, `section ${i} ${key} ${n}`);
      if (ih) rows.push({ label: `${key} ${n} — goes to`, val: ih, id: ID(key, i, n, 'href') });
    });
  }
  return rows;
}

// Legacy renderPage IDs, where one existed. `bullets` and `images` never had any —
// renderPage.js ignored them, so that copy has never appeared on the site.
function ID(key, i, n, field) {
  const map = {
    stats: { value: `#sec${i}Stat${n}Value`, label: `#sec${i}Stat${n}Label` },
    steps: { n: `#sec${i}Step${n}N`, title: `#sec${i}Step${n}Title`, body: `#sec${i}Step${n}Body` },
    cards: { title: `#sec${i}Card${n}Title`, body: `#sec${i}Card${n}Body`, href: `#sec${i}Card${n}Btn` },
    items: { year: `#sec${i}Item${n}Year`, title: `#sec${i}Item${n}Title`, body: `#sec${i}Item${n}Body` },
  };
  const got = map[key]?.[field];
  if (got) return got;
  return (key === 'bullets' || key === 'images') ? '**never rendered**' : '—';
}

const table = rows => rows.length
  ? ['| What it is | Copy to paste | Old code ID |', '|---|---|---|',
     ...rows.map(r => `| ${r.label} | ${r.val.replace(/\|/g, '\\|')} | \`${r.id}\` |`)].join('\n')
  : '_(nothing)_';

// ---- emit ----------------------------------------------------------------
const index = [];
let totalRows = 0, neverRendered = 0;

for (const [key, p] of Object.entries(pages)) {
  const slug = p.slug === '' ? '/' : `/${p.slug ?? key}`;
  const hero = heroRows(p);
  const secs = (p.sections || []).map((s, idx) => ({ s, i: idx + 1, rows: sectionRows(s, idx + 1) }));
  const count = hero.length + secs.reduce((a, x) => a + x.rows.length, 0);
  totalRows += count;
  neverRendered += secs.reduce((a, x) => a + x.rows.filter(r => r.id === '**never rendered**').length, 0);

  const md = [
    `# ${p.title}`,
    ``,
    `**Page address:** \`${slug}\`  ·  **${secs.length} sections**  ·  **${count} pieces of copy**`,
    ``,
    `Paste each "Copy to paste" value into the matching text element on this page in the Wix Editor.`,
    `Work top to bottom — the order here is the order on the page.`,
    ``,
    `The "Old code ID" column is only for tracing back to the retired \`renderPage.js\`. You do not need it.`,
    `Rows marked **never rendered** were in the code but never appeared on the site — read them as new copy, and decide whether you want them.`,
    ``,
    `## Search engine settings`,
    ``,
    `| Field | Value |`,
    `|---|---|`,
    `| Page title | ${clean(p.title)} |`,
    `| Description | ${p.description ? clean(p.description) : '_(none — write one, 150-160 characters)_'} |`,
    ``,
    `## Top of page (hero)`,
    ``,
    `> The "Main title" row is this page's **H1**. Exactly one per page.`,
    ``,
    table(hero),
    ``,
    ...secs.flatMap(({ s, i, rows }) => [
      `## Section ${i}${s.type ? ` — ${s.type}` : ''}`,
      ``,
      ...(REPEATER.has(s.type) ? [`> This section pulls from the CMS (${REPEATER.get(s.type)}). Do not paste copy into the rows themselves — edit the content in the CMS instead. Any headings below still belong on the page.`, ``] : []),
      table(rows),
      ``,
    ]),
  ].join('\n');

  writeFileSync(join(OUT, `${key}.md`), md, 'utf8');
  index.push({ key, title: p.title, slug, sections: secs.length, count });
}

writeFileSync(join(OUT, '_INDEX.md'), [
  `# Page copy packets`,
  ``,
  `Generated from \`wix-migration-kit/velo/siteData.js\` by \`scripts/export_page_copy.mjs\`. Do not hand-edit these files — once the copy is pasted into Wix, **Wix becomes the source of truth** and these become a historical record.`,
  ``,
  `**${index.length} pages · ${totalRows} pieces of copy.**`,
  ``,
  `| Page | Address | Sections | Copy pieces | Packet |`,
  `|---|---|---|---|---|`,
  ...index.map(r => `| ${r.title} | \`${r.slug}\` | ${r.sections} | ${r.count} | [${r.key}.md](${r.key}.md) |`),
  ``,
  `## Before you start`,
  ``,
  `1. Work one page at a time. Finish a page before moving on.`,
  `2. Paste the copy, then check it against \`../BEFORE-YOU-PUBLISH.md\`.`,
  `3. Once a page's copy is in Wix, tick it off below.`,
  ``,
  ...index.map(r => `- [ ] ${r.title} (\`${r.slug}\`)`),
  ``,
  `## Two things to fix while you are in here`,
  ``,
  `**${neverRendered} pieces of copy were never on the site.** They are marked **never rendered** in the packets. The old code handled \`stats\`, \`steps\`, \`cards\` and \`items\` but ignored \`bullets\` and \`images\`, so that text sat in the code file unused. Treat it as draft copy: use it or drop it deliberately, but do not paste it without reading it.`,
  ``,
  EMPTY_LINKS.length
    ? `**${EMPTY_LINKS.length} site links have no destination:** ${EMPTY_LINKS.map(k => `\`${k}\``).join(', ')}. Buttons using these currently fall back to opening an email. Set a real destination or remove the button.`
    : `All site links have destinations.`,
  ``,
  ...(warnings.length ? [`## Every blank or placeholder link found`, ``, ...[...new Set(warnings)].map(w => `- ${w}`), ``] : []),
].join('\n'), 'utf8');

// ---- completeness check --------------------------------------------------
// The whole point of this exporter is that no copy is silently dropped. So instead of
// a magic-number threshold, walk siteData independently and prove every text leaf is
// either exported or on the explicit plumbing list.
const PLUMBING_FIELDS = new Set([...SKIP, ...PAGE_PLUMBING, 'theme', 'id', 'heroPosition']);
const leaves = [];
(function walk(o, path) {
  for (const [k, v] of Object.entries(o)) {
    if (PLUMBING_FIELDS.has(k)) continue;
    if (isText(v)) { if (clean(v)) leaves.push({ k, v: clean(v), path }); }
    else if (Array.isArray(v)) v.forEach((x, i) => (x && typeof x === 'object')
      ? walk(x, `${path}.${k}[${i}]`)
      : (isText(x) && clean(x) && leaves.push({ k, v: clean(x), path: `${path}.${k}[${i}]` })));
    else if (v && typeof v === 'object') walk(v, `${path}.${k}`);
  }
})(pages, 'pages');

const exported = new Set();
for (const p of Object.values(pages)) {
  // the packet's "Search engine settings" table
  if (isText(p.title)) exported.add(clean(p.title));
  if (isText(p.description)) exported.add(clean(p.description));
  heroRows(p).forEach(r => exported.add(r.val));
  (p.sections || []).forEach((s, i) => sectionRows(s, i + 1).forEach(r => exported.add(r.val)));
}
const missed = leaves.filter(l => !exported.has(l.v));

const pageCount = Object.keys(pages).length;
const problems = [];
if (pageCount !== 18) problems.push(`expected 18 pages, got ${pageCount}`);
if (missed.length) problems.push(`${missed.length} text value(s) in siteData.js were NOT exported:\n` +
  missed.slice(0, 20).map(m => `    ${m.path}.${m.k} = "${m.v.slice(0, 60)}"`).join('\n'));
if (!neverRendered) problems.push('expected to find bullets/images copy the old renderer ignored');
if (!heroRows(pages.home).some(r => r.val === 'Building the block.')) problems.push('home H1 missing from export');

console.log(`${pageCount} pages -> ${OUT}`);
console.log(`${totalRows} rows exported, covering ${exported.size} distinct text values.`);
console.log(`${leaves.length} text leaves found in siteData.js; ${missed.length} not exported.`);
console.log(`${neverRendered} rows were never rendered by the old code.`);
console.log(`${EMPTY_LINKS.length} empty site links: ${EMPTY_LINKS.join(', ') || 'none'}`);
console.log(`${new Set(warnings).size} link warnings.`);

if (problems.length) {
  console.error('\nFAILED:\n' + problems.map(p => '  - ' + p).join('\n'));
  process.exitCode = 1;
} else {
  console.log('completeness check ok — every text value in siteData.js is in a packet');
}
