import type { NextConfig } from "next";
import { defaultLocale, localeCodes } from "./lib/i18n";

// A negative lookahead for a whole first segment that must NOT be rewritten into
// English: the nine language codes, which already address a real route, and the
// four paths served from somewhere other than the page routes. Built from
// `localeCodes` so adding a language cannot leave this list behind.
const NOT_A_LANGUAGE = `(?!(?:${[...localeCodes, "api", "admin", "media", "_next"].join("|")})(?:/|$))`;

// Every page lives under app/[lang], including English, because <html lang> and
// <html dir> have to be right and only a layout below the language segment can
// set them. But English's URLs must stay bare — /about, not /en/about — or every
// existing link, printed flyer and search result breaks.
//
// So the prefix is hidden here:
//
//   /about      -> beforeFiles REWRITE -> /en/about   (the URL stays /about)
//   /en/about   -> REDIRECT -> /about                 (one address per page)
//   /es/about   -> excluded from the rewrite; matches the real route directly
//
// Redirects run before rewrites, and an internal rewrite does not re-enter the
// redirect table, so /en/about -> /about -> (rewrite) /en/about terminates.
//
// This used to be a `fallback` rewrite instead, which is the tidier mechanism:
// fallback runs only after the filesystem and every route have been tried, so it
// needs no exclusion list at all. It does not survive Cloudflare. OpenNext
// applies fallback rewrites only when nothing matched a route *pattern*, and
// `/about` does match `app/[lang]` with lang="about" — Next then 404s it because
// the segment sets `dynamicParams = false`, but OpenNext's router has already
// decided a route was found and skips the fallback. Every bare English URL 404'd
// while every /es/... URL worked.
//
// beforeFiles runs unconditionally, before any of that, so it behaves the same
// on both hosts. The cost is that the exclusions now have to be written out.

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // One canonical hostname. www is attached to the Worker as a second custom
      // domain (wrangler.jsonc) so it resolves at all, and lands here.
      //
      // Done in code rather than as a Cloudflare Redirect Rule so it travels with
      // the repo — a dashboard rule is invisible to anyone reading this project
      // and is exactly the kind of thing that gets lost when the account changes
      // hands. The host is matched explicitly, so localhost and the *.workers.dev
      // preview are untouched.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ccdgroup.org" }],
        destination: "https://ccdgroup.org/:path*",
        permanent: true,
      },

      // /en is the internal spelling of the English site; the public one is bare.
      { source: `/${defaultLocale}`, destination: "/", permanent: true },
      { source: `/${defaultLocale}/:path*`, destination: "/:path*", permanent: true },
    ];
  },

  async rewrites() {
    return {
      beforeFiles: [
        // The CMS is a static file at public/admin/index.html. Without this, /admin
        // 404s and only /admin/index.html works — editors will type /admin.
        { source: "/admin", destination: "/admin/index.html" },

        // The English home page.
        { source: "/", destination: `/${defaultLocale}` },

        // Every other bare English URL. Two rules rather than one because a
        // one-segment source and a multi-segment source need different guards.
        //
        // NOT_A_LANGUAGE excludes the nine language codes — those URLs already
        // match a real route and must be left alone — plus the paths served from
        // somewhere else entirely. It matches a whole segment (the `(?:/|$)`),
        // so a page whose name merely starts with a language code is safe:
        // without that, /english or /article would be quietly excluded.
        //
        // One segment: `[^/.]+` rather than `[^/]+`. beforeFiles runs before the
        // filesystem is consulted, so anything matched here never reaches
        // public/ — barring the dot keeps /favicon.ico, /robots.txt and the rest
        // of the root files out of it.
        {
          source: `/:first(${NOT_A_LANGUAGE}[^/.]+)`,
          destination: `/${defaultLocale}/:first`,
        },
        // Two or more segments: /projects/oasis-240. `:rest+` requires at least
        // one further segment, so this rule and the one above never overlap.
        {
          source: `/:first(${NOT_A_LANGUAGE}[^/]+)/:rest+`,
          destination: `/${defaultLocale}/:first/:rest+`,
        },
      ],
      afterFiles: [],
      fallback: [],
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
