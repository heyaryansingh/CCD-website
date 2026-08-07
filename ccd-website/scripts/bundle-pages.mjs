// Bundles content/pages/*.json and content/projects/*.json into two single JSON
// files that the app imports statically.
//
// WHY THIS EXISTS
// Pages are one file each so the CMS can create and delete whole pages. Reading
// that directory with fs at request time works on Node hosts but NOT on
// Cloudflare Workers, which has no runtime filesystem — the site 500s with
// "Cannot read properties of undefined". Bundling at build time removes the
// runtime fs call entirely and makes the app host-agnostic.
//
// Runs automatically via the `prebuild` npm script, so the bundle can never be
// stale: every build regenerates it from whatever the CMS last committed. The
// output is gitignored for the same reason — a committed copy could drift from
// the real content and would silently serve the old version.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// fileURLToPath, not URL.pathname — the repo path can contain spaces, which
// pathname leaves percent-encoded and silently writes to the wrong directory.
const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const CONTENT = join(ROOT, "content");
const OUT = join(CONTENT, "generated");

mkdirSync(OUT, { recursive: true });

function bundle(dir) {
  const from = join(CONTENT, dir);
  let files = [];
  try {
    files = readdirSync(from).filter((f) => f.endsWith(".json")).sort();
  } catch {
    return {};
  }
  const out = {};
  for (const file of files) {
    const { key, ...page } = JSON.parse(readFileSync(join(from, file), "utf8"));
    out[key ?? file.replace(/\.json$/, "")] = page;
  }
  return out;
}

const pages = bundle("pages");
const projects = bundle("projects");

if (Object.keys(pages).length === 0) {
  console.error("bundle-pages: no pages found in content/pages — refusing to write an empty bundle");
  process.exit(1);
}

writeFileSync(join(OUT, "pages.json"), `${JSON.stringify(pages)}\n`, "utf8");
writeFileSync(join(OUT, "projects.json"), `${JSON.stringify(projects)}\n`, "utf8");

console.log(
  `bundled ${Object.keys(pages).length} pages + ${Object.keys(projects).length} project pages -> content/generated/`,
);
