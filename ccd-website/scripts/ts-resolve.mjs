// Lets build scripts import the app's real modules instead of a hand-copied
// duplicate. Node's --experimental-strip-types runs .ts directly but keeps ESM's
// strict resolution, so three things the app relies on need bridging:
//
//   "./siteConfig"            extensionless relative imports  -> try .ts
//   "@/content/x.json"        the tsconfig "@/*" path alias   -> project root
//   import x from "*.json"    JSON without an import attribute -> synthesised
//
// None of this affects the app build; Next/Turbopack handles all three natively.
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    return next(pathToFileURL(join(ROOT, specifier.slice(2))).href, context);
  }
  if (specifier.startsWith(".") && !/\.[a-z]+$/i.test(specifier)) {
    try {
      return await next(`${specifier}.ts`, context);
    } catch {
      // fall through to the default resolver
    }
  }
  return next(specifier, context);
}

export async function load(url, context, next) {
  if (url.endsWith(".json")) {
    const json = readFileSync(fileURLToPath(url), "utf8");
    return { format: "module", shortCircuit: true, source: `export default ${json};` };
  }
  return next(url, context);
}
