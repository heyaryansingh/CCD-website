// Verify every relative markdown link in the handoff kit points at a file that exists.
// A broken link in a doc set a nontechnical team navigates is a real failure.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

const ROOT = 'C:/Aryan/GitHub Projects/CCD/wix-migration-kit/handoff';
const walk = d => readdirSync(d, { withFileTypes: true }).flatMap(e =>
  e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]);

const files = walk(ROOT).filter(f => f.endsWith('.md'));
let broken = 0, checked = 0;

for (const f of files) {
  const md = readFileSync(f, 'utf8');
  // [text](target) where target is not http/mailto/anchor-only
  for (const m of md.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const target = m[1];
    if (/^(https?:|mailto:|tel:|#)/.test(target)) continue;
    checked++;
    const [path] = target.split('#');
    if (!path) continue;
    const abs = resolve(dirname(f), path);
    if (!existsSync(abs)) {
      broken++;
      const line = md.slice(0, m.index).split('\n').length;
      console.log(`BROKEN  ${f.replace(ROOT, '.')}:${line} -> ${target}`);
    }
  }
}
console.log(`\n${files.length} markdown files, ${checked} relative links checked, ${broken} broken.`);
process.exitCode = broken ? 1 : 0;
