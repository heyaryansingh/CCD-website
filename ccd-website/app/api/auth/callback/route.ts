// Step 2 of the CMS sign-in: GitHub sends the editor back here with a code.
//
// Register this exact URL as the OAuth App's "Authorization callback URL":
//   https://ccdgroup.org/api/auth/callback
//
// /api/auth deliberately sends no redirect_uri, so GitHub always returns to the
// address registered on the app — one OAuth App serves one hostname. It has to
// stay in step with `base_url` in public/admin/config.yml.

import { authErrorPage, authSuccessPage } from "../handshake";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const cookie = request.headers.get("cookie") ?? "";
  const [, provider, csrfToken] = cookie.match(/\bcsrf-token=([a-z-]+?)_([0-9a-f]{32})\b/) ?? [];

  if (provider !== "github") {
    return authErrorPage("github", "Sign-in session was lost. Please try again.", "UNSUPPORTED_BACKEND");
  }
  if (!code || !state) {
    return authErrorPage(provider, "GitHub did not return an authorization code. Please try again.", "AUTH_CODE_REQUEST_FAILED");
  }
  // The state GitHub echoes back must match the cookie we set — otherwise this
  // callback was not started by us.
  if (!csrfToken || state !== csrfToken) {
    return authErrorPage(provider, "Sign-in could not be verified. Please try again.", "CSRF_DETECTED");
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return authErrorPage(provider, "The CMS sign-in is not configured yet.", "MISCONFIGURED_CLIENT");
  }

  let payload: { access_token?: string; error?: string };

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ code, client_id: clientId, client_secret: clientSecret }),
    });
    payload = (await response.json()) as { access_token?: string; error?: string };
  } catch {
    return authErrorPage(provider, "Could not reach GitHub to complete sign-in. Please try again.", "TOKEN_REQUEST_FAILED");
  }

  if (!payload.access_token) {
    return authErrorPage(provider, payload.error ?? "GitHub did not issue an access token.", "TOKEN_REQUEST_FAILED");
  }

  return authSuccessPage(provider, payload.access_token);
}
