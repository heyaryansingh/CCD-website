import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import incrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// WITHOUT THIS, EVERY PAGE ON THIS SITE 404s ON CLOUDFLARE.
//
// Next does not put prerendered App Router pages in the static output — it puts
// them in the incremental cache, and OpenNext reads them back from whatever
// cache you configure. `defineCloudflareConfig()` with no cache configures none,
// so the 355 prerendered pages sat in `.open-next/cache/` and the Worker
// answered 404 for all of them. Only `/admin`, `/media/*` and the three `/api`
// routes worked, because those are the only things that are genuinely files or
// genuinely dynamic. It looks exactly like a routing bug and is not one.
//
// `static-assets-incremental-cache` serves them out of the Workers assets
// bundle: the build copies `.open-next/cache` to
// `.open-next/assets/cdn-cgi/_next_cache`, and the ASSETS binding already
// declared in wrangler.jsonc reads it back. No R2, no KV, no billable resource —
// which was the point of the move to Cloudflare.
//
// It is read-only and cannot revalidate, which suits this site exactly: every
// page is Static or SSG and a content change goes out as a rebuild. Two things
// would outgrow it — adding ISR (`revalidate`), or adding Next 16's composable
// cache (`use cache`), which this override throws on. Either one means moving to
// `r2-incremental-cache` and adding the bucket + WORKER_SELF_REFERENCE binding
// from the adapter docs.
export default defineCloudflareConfig({ incrementalCache });
