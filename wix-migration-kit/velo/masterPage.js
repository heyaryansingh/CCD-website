// Runs on every page. All lookups are guarded — assigning the IDs in the
// editor activates each behavior; missing IDs are ignored.
import { siteConfig } from "public/siteData.js";

$w.onReady(() => {
  try {
    const el = $w("#copyrightText");
    if (el && "text" in el) {
      el.text = `Copyright ${new Date().getFullYear()} ${siteConfig.org.legalName} · Proud member of MANO · Built for the block.`;
    }
  } catch (e) { /* not scaffolded yet */ }
});
