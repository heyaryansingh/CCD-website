// End-to-end check of a deployed site. Point it at any URL — local preview,
// Cloudflare, Vercel — and it exercises everything that has actually broken
// during this project.
//
//   npm run verify:site                         # localhost:3000
//   npm run verify:site -- http://localhost:8788
//   npm run verify:site -- https://ccdgroup.org
//
// Written so the cutover does not depend on anyone remembering a list of curl
// commands. Exits non-zero if anything fails, so it can gate a deploy.

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");

const PAGES = [
  "", "about", "what-is-a-coop", "team", "partners", "programs", "coop-market",
  "tool-bank", "center-for-social-impact", "clean-and-green", "projects",
  "membership", "brick-campaign", "news", "events", "donate", "volunteer",
  "contact", "4th-brew", "shop", "brewing",
  "projects/oasis-240", "projects/community-center", "projects/bus-stop",
  "projects/memorial-garden",
];

const ALIASES = {
  coffee: "/shop",
  collections: "/shop",
  "brewing-methods": "/brewing",
  "the-4th-brew": "/4th-brew",
  toolbank: "/tool-bank",
};

let failures = 0;
let checks = 0;

function ok(label, passed, detail = "") {
  checks += 1;
  if (!passed) failures += 1;
  console.log(`  ${passed ? "PASS" : "FAIL"}  ${label}${detail ? `  — ${detail}` : ""}`);
}

async function get(path, init) {
  return fetch(`${BASE}${path}`, { redirect: "manual", ...init });
}

console.log(`\nVerifying ${BASE}\n`);

// --- every page renders ------------------------------------------------------
console.log("Pages");
const bad = [];
for (const p of PAGES) {
  const res = await get(`/${p}`);
  if (res.status !== 200) bad.push(`/${p} -> ${res.status}`);
}
ok(`all ${PAGES.length} routes return 200`, bad.length === 0, bad.join(", "));

// --- legacy URLs still work --------------------------------------------------
console.log("\nLegacy addresses");
for (const [from, to] of Object.entries(ALIASES)) {
  const res = await get(`/${from}`);
  const loc = (res.headers.get("location") || "").replace(BASE, "");
  ok(`/${from} -> ${to}`, res.status >= 300 && res.status < 400 && loc === to, `got ${res.status} ${loc}`);
}

// --- languages ---------------------------------------------------------------
// English keeps its bare URLs; every other language is prefixed. The failure
// this catches is a page that renders but forgets which language it is in —
// links pointing back at English, or a right-to-left script laid out left-to-right.
console.log("\nLanguages");
const LOCALES = ["es", "fr", "ht", "am", "ar", "zh", "ko", "vi"];
const unreachable = [];
for (const code of LOCALES) {
  for (const path of [`/${code}`, `/${code}/about`, `/${code}/projects/oasis-240`]) {
    const res = await get(path);
    if (res.status !== 200) unreachable.push(`${path} -> ${res.status}`);
  }
}
ok(`all ${LOCALES.length} languages serve home, a page and a project`, unreachable.length === 0, unreachable.join(", "));

const canonical = await get("/en/about");
ok(
  "/en/about redirects to /about",
  canonical.status >= 300 && canonical.status < 400 && (canonical.headers.get("location") || "").endsWith("/about"),
  `got ${canonical.status} ${canonical.headers.get("location") || ""}`,
);

const arabic = await fetch(`${BASE}/ar/membership`);
const arabicHtml = await arabic.text();
ok('Arabic pages declare lang="ar" dir="rtl"', /lang="ar"[^>]*dir="rtl"/.test(arabicHtml));
ok("Arabic pages link within Arabic", arabicHtml.includes('href="/ar/donate"'));
ok("translated wording reaches the page", arabicHtml.includes("العضوية"));

const spanish = await fetch(`${BASE}/es`);
const spanishHtml = await spanish.text();
ok("language menu offers every language", LOCALES.every((c) => spanishHtml.includes(`href="/${c}"`)));
// The whole point of the fallback: a language with no translation for a string
// shows the English, never an empty heading.
ok(
  "untranslated text falls back to English rather than blank",
  !/<(h1|h2)>\s*<\/\1>/.test(spanishHtml),
);

// Next writes the attribute as hrefLang, so match without regard to case.
const alternates = await fetch(`${BASE}/about`).then((r) => r.text());
ok(
  "hreflang alternates are published",
  /hreflang="es"/i.test(alternates) && /hreflang="zh-Hans"/i.test(alternates),
);

// --- the CMS -----------------------------------------------------------------
console.log("\nCMS");
// Cloudflare serves a directory index at /admin/, so a redirect here is fine as
// long as it lands on the editor.
const admin = await fetch(`${BASE}/admin`);
const adminHtml = await admin.text();
ok("/admin loads the editor", admin.status === 200 && adminHtml.includes("sveltia-cms.js"));

const cfg = await fetch(`${BASE}/admin/config.yml`);
const cfgText = await cfg.text();
ok("config.yml is served", cfg.status === 200 && cfgText.includes("backend:"));

// The collections are separate files now, listed in index.html. One of them
// 404ing loses a whole section of the editor while everything still "loads".
const configUrls = [...adminHtml.matchAll(/rel="cms-config-url"[^>]*href="([^"]+)"/g)].map((m) => m[1]);
const brokenConfigs = [];
for (const url of configUrls) {
  const res = await fetch(`${BASE}${url}`);
  const body = res.status === 200 ? await res.text() : "";
  if (res.status !== 200 || !/^(collections|backend):/m.test(body)) {
    brokenConfigs.push(`${url} -> ${res.status}`);
  }
}
ok(`all ${configUrls.length} editor config files load`, configUrls.length > 1 && brokenConfigs.length === 0, brokenConfigs.join(", "));

const baseUrlMatch = cfgText.match(/base_url:\s*(\S+)/);
const configuredBase = baseUrlMatch?.[1]?.replace(/\/$/, "");
ok(
  "config.yml base_url matches this site",
  configuredBase === BASE,
  configuredBase === BASE ? "" : `points at ${configuredBase} — sign-in will fail from ${BASE}`,
);

// --- sign-in -----------------------------------------------------------------
console.log("\nSign-in");
const auth = await get("/api/auth?provider=github");
const authBody = auth.status === 200 ? await auth.text() : "";
if (authBody.includes("MISCONFIGURED_CLIENT")) {
  ok("GitHub OAuth configured", false, "GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET not set on this host");
} else {
  ok("/api/auth redirects to GitHub", auth.status === 302 && (auth.headers.get("location") || "").startsWith("https://github.com/login/oauth/authorize"));
  const cookie = auth.headers.get("set-cookie") || "";
  ok("CSRF cookie is set", /csrf-token=github_[0-9a-f]{32}/.test(cookie) && cookie.includes("HttpOnly"));

  // A callback carrying someone else's state must be refused.
  const jar = (cookie.match(/csrf-token=[^;]+/) || [""])[0];
  const forged = await fetch(`${BASE}/api/auth/callback?code=x&state=${"0".repeat(32)}`, {
    headers: { cookie: jar },
  });
  ok("forged state is rejected", (await forged.text()).includes("CSRF_DETECTED"));
}

// --- forms -------------------------------------------------------------------
console.log("\nContact form");
const submit = await fetch(`${BASE}/api/submit`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ type: "contact", name: "Verify Script", email: "verify@example.com", message: "automated check" }),
});
const submitJson = await submit.json().catch(() => ({}));
ok("/api/submit responds", submit.status === 200 && submitJson.ok === true);
// stored:false means the enquiry reached nobody. The form now reports failure to
// the visitor and tells them to email instead, so nothing is lost silently — but
// the form is still not doing its job until a database is configured.
ok(
  "submissions are actually stored",
  submitJson.stored === true,
  submitJson.stored === true ? "" : "SUPABASE_URL / SUPABASE_SERVICE_KEY not set — visitors are told to email instead",
);

// --- the shop ----------------------------------------------------------------
console.log("\nShop");
const shop = await (await fetch(`${BASE}/shop`)).text();
ok("three coffees render", (shop.match(/class="product-card"/g) || []).length === 3);
// Coffee is sold on The 4th Brew's own site. Each card links out; the in-page
// cart stays in the codebase for anything CCD sells directly later, but must not
// appear on a coffee page.
ok(
  "each coffee links to the4thbrew.com/products",
  (shop.match(/href="https:\/\/the4thbrew\.com\/products"/g) || []).length >= 3,
);
ok("no on-site cart on the shop", !/brew-cart|buy-picker/.test(shop));
ok("live prices present", /from \$\d+\.\d\d/.test(shop));
ok("4th Brew skin applied", /<main class="brew"/.test(shop));

// It is a CCD programme, not an outside partner.
const partners = await (await fetch(`${BASE}/partners`)).text();
const wall = partners.split('class="partner-cards"')[1] || "";
ok("4th Brew is not on the partner wall", !wall.split("</section>")[0].includes("4th Brew"));
const programs = await (await fetch(`${BASE}/programs`)).text();
ok("4th Brew is listed as a programme", programs.includes("The 4th Brew"));

// --- content integrity -------------------------------------------------------
console.log("\nContent");
const contact = await (await fetch(`${BASE}/contact`)).text();
ok("settings resolve into pages", contact.includes("info@ccdgroup.org"));
ok("no unresolved {{tokens}} leak", !contact.includes("{{"));

// Asserted by fetching them, not by matching a filename. The old version looked
// for `method-*.png` and started failing the moment the icons were redrawn as
// `-v2.jpg` — reporting a break where the page was fine.
const brewing = await (await fetch(`${BASE}/brewing`)).text();
const icons = [...new Set(brewing.match(/\/media\/brew\/method-[a-z0-9-]+\.(?:png|jpg|webp|avif)/g) || [])];
const missingIcons = [];
for (const icon of icons) {
  if ((await fetch(`${BASE}${icon}`)).status !== 200) missingIcons.push(icon);
}
ok(
  `all ${icons.length} brewing icons load`,
  icons.length >= 8 && missingIcons.length === 0,
  missingIcons.join(", "),
);

const asset = await fetch(`${BASE}/media/brew/method-drip.png`);
ok("static media is served", asset.status === 200);

// --- misc --------------------------------------------------------------------
console.log("\nOther");
const missing = await fetch(`${BASE}/this-page-does-not-exist`);
ok("unknown pages 404", missing.status === 404, `got ${missing.status}`);

console.log(`\n${checks - failures}/${checks} checks passed\n`);
process.exit(failures ? 1 : 0);
