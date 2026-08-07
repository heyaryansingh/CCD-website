// The popup -> CMS handshake.
//
// Sveltia/Decap do NOT simply accept a token. The popup must:
//   1. post `authorizing:github` to its opener
//   2. wait to receive that same message back
//   3. only then post `authorization:github:success:{"token":...}` to the origin
//      the reply came from
//
// Sending the token in one message silently does nothing — the CMS ignores a
// message it did not handshake for. This is the part that is easy to get wrong,
// so it lives in one place used by both routes.

const escapeForScript = (value: string) =>
  // A token or error string is interpolated into an inline <script>; make sure a
  // stray closing tag or separator cannot break out of it.
  JSON.stringify(value).slice(1, -1).replaceAll("<", "\\u003c").replaceAll("\u2028", "\\u2028").replaceAll("\u2029", "\\u2029");

function page(provider: string, state: "success" | "error", content: Record<string, string>) {
  const payload = escapeForScript(JSON.stringify(content));

  return new Response(
    `<!doctype html><html><head><meta charset="utf-8"><title>Signing in…</title></head>
<body style="font:16px system-ui;padding:2rem;color:#1a1a1a">
<p>${state === "success" ? "Signed in. You can close this window." : "Sign-in failed. You can close this window."}</p>
<script>
(() => {
  const message = 'authorization:${provider}:${state}:${payload}';
  window.addEventListener('message', ({ data, origin }) => {
    if (data === 'authorizing:${provider}') {
      window.opener?.postMessage(message, origin);
    }
  });
  window.opener?.postMessage('authorizing:${provider}', '*');
})();
</script></body></html>`,
    {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
        // The CSRF cookie has done its job; clear it either way.
        "Set-Cookie": "csrf-token=deleted; HttpOnly; Max-Age=0; Path=/; SameSite=Lax; Secure",
      },
    },
  );
}

export function authSuccessPage(provider: string, token: string) {
  return page(provider, "success", { provider, token });
}

export function authErrorPage(provider: string, error: string, errorCode: string) {
  return page(provider, "error", { provider, error, errorCode });
}
