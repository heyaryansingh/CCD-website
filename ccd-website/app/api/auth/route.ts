// Step 1 of the CMS sign-in: send the editor to GitHub.
//
// Sveltia CMS opens this in a popup. We hand back a redirect to GitHub's consent
// screen and set a short-lived CSRF cookie that /api/auth/callback checks.
//
// Ported from sveltia/sveltia-cms-auth (a Cloudflare Worker) so CCD does not need
// a second hosting vendor just to log in — this app is already deployed.

import { NextResponse } from "next/server";
import { authErrorPage } from "./handshake";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get("provider") ?? "github";

  if (provider !== "github") {
    return authErrorPage(provider, "Only GitHub sign-in is enabled for this site.", "UNSUPPORTED_BACKEND");
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return authErrorPage(
      provider,
      "The CMS sign-in is not configured yet. GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET need to be set.",
      "MISCONFIGURED_CLIENT",
    );
  }

  // Random value tied to this attempt; GitHub echoes it back as `state`.
  const csrfToken = crypto.randomUUID().replaceAll("-", "");

  const params = new URLSearchParams({
    client_id: clientId,
    // `repo` so the editor can commit content, `user` for the author name on commits.
    scope: "repo,user",
    state: csrfToken,
  });

  const response = NextResponse.redirect(
    `https://github.com/login/oauth/authorize?${params.toString()}`,
    302,
  );

  // SameSite=Lax so the cookie survives GitHub redirecting back to us.
  response.cookies.set("csrf-token", `github_${csrfToken}`, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  return response;
}
