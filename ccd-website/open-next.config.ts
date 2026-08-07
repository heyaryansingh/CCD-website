import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No incrementalCache override: the site has no ISR — every page is Static or
// SSG, and only the three /api routes are dynamic. The adapter's default config
// wires up an R2 bucket for that cache, which would add a billable resource for
// nothing. See the note in wrangler.jsonc.
export default defineCloudflareConfig();
