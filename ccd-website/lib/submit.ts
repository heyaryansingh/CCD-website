// Client-safe form submit helper. Posts to /api/submit, which persists to
// Supabase when configured and always degrades gracefully otherwise, so the
// UI success state never depends on a backend being wired up yet.

export type SubmitType =
  | "contact"
  | "estimate"
  | "volunteer"
  | "newsletter";

export async function submitForm(
  type: SubmitType,
  payload: Record<string, unknown>
): Promise<{ ok: boolean }> {
  try {
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, payload }),
    });
    // 2xx = acknowledged (the API returns 200 even with no store configured).
    return { ok: res.ok };
  } catch {
    // Network failure — surface it so the form can show a mailto fallback
    // instead of a false success that silently drops the submission.
    return { ok: false };
  }
}
