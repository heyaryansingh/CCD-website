import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The CMS is a static file at public/admin/index.html. Without this, /admin
  // 404s and only /admin/index.html works — editors will type /admin.
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
