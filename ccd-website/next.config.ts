import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The CMS is a static file at public/admin/index.html. Without this, /admin
  // 404s and only /admin/index.html works — editors will type /admin.
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
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

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
