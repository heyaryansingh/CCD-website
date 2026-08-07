// Client-safe form submit helper. Posts to /api/submit, which persists to
// Supabase when configured.
//
// IMPORTANT — why "acknowledged" is not treated as "succeeded":
// /api/submit deliberately returns 200 with {stored:false} when no database is
// configured, so the site works in local development and previews. That was
// right before launch. Live, it silently discarded real enquiries: a visitor
// filled in the contact form, saw "thanks", and nobody at CCD ever received it.
//
// So a submission only counts as successful if it was actually stored. When it
// is not, this reports failure and the forms fall back to their existing
// "please email us directly" message — the enquiry reaches CCD by email instead
// of vanishing.

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
    if (!res.ok) return { ok: false };

    const body = (await res.json().catch(() => null)) as { stored?: boolean } | null;
    // stored === false means nothing was persisted anywhere. Treat it as a
    // failure so the visitor is told to email rather than being told it worked.
    return { ok: body?.stored === true };
  } catch {
    // Network failure — surface it so the form shows a mailto fallback instead
    // of a false success that silently drops the submission.
    return { ok: false };
  }
}
