import type { NextConfig } from "next";
import { defaultLocale } from "./lib/i18n";

// Every page lives under app/[lang], including English, because <html lang> and
// <html dir> have to be right and only a layout below the language segment can
// set them. But English's URLs must stay bare — /about, not /en/about — or every
// existing link, printed flyer and search result breaks.
//
// So the prefix is hidden here:
//
//   /about      -> nothing matches -> FALLBACK rewrite -> /en/about   (URL stays /about)
//   /en/about   -> REDIRECT -> /about                                 (one address per page)
//   /es/about   -> matches the real route; neither rule touches it
//
// Fallback rewrites run only after the filesystem and every route have been
// tried, which is why /es/about is never caught by the catch-all: it matched
// already. The [lang] routes set `dynamicParams = false` so that /about does NOT
// match [lang] as a language and can fall through to here.
//
// Redirects run before rewrites, and an internal rewrite does not re-enter the
// redirect table, so /en/about -> /about -> (rewrite) /en/about terminates.

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /en is the internal spelling of the English site; the public one is bare.
      { source: `/${defaultLocale}`, destination: "/", permanent: true },
      { source: `/${defaultLocale}/:path*`, destination: "/:path*", permanent: true },
    ];
  },

  async rewrites() {
    return {
      // The CMS is a static file at public/admin/index.html. Without this, /admin
      // 404s and only /admin/index.html works — editors will type /admin.
      beforeFiles: [
        // The CMS is a static file at public/admin/index.html. Without this, /admin
        // 404s and only /admin/index.html works — editors will type /admin.
        { source: "/admin", destination: "/admin/index.html" },

        // English URLs of two or more segments — /projects/oasis-240 — cannot be
        // left to the fallback below. A one-segment URL like /about fails to match
        // [lang] (its nine params are known, so "about" is simply not a language)
        // and falls through; but /projects/oasis-240 DOES match [lang]/[...path]
        // as lang="projects", 404s there, and never reaches the fallback. So it
        // has to be rewritten before routing happens.
        //
        // `:rest+` requires at least one further segment, which is what keeps this
        // rule off one-segment URLs and off root assets like /favicon.ico. The
        // exclusions cover the nine languages and the paths that are genuinely
        // served from elsewhere.
        {
          source:
            "/:first((?!en|es|fr|ht|am|ar|zh|ko|vi|api|admin|media|_next)[^/]+)/:rest+",
          destination: `/${defaultLocale}/:first/:rest+`,
        },
      ],
      afterFiles: [],
      // Only reached when nothing else matched, which by then means a bare
      // English URL. The other languages need no exclusion here: /es/about
      // matched a real route long before this and never arrives.
      //
      // `:path*` and not `:path(...)`. A single named param stops at the first
      // slash whatever pattern you give it, so a custom-regex version matched
      // /about but silently 404'd /projects/oasis-240.
      fallback: [
        { source: "/", destination: `/${defaultLocale}` },
        { source: "/:path*", destination: `/${defaultLocale}/:path*` },
      ],
    };
  },

  // public/_headers only reaches Cloudflare's static assets, not HTML rendered by
  // the Worker, and Vercel ignores that file entirely. Setting them here covers
  // both hosts and every response.
  //
  // Deliberately modest: no CSP, because the page legitimately loads the Sveltia
  // editor from a CDN and product photos from Shopify's, and a wrong CSP breaks
  // the shop or the editor silently.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
