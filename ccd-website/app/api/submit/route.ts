// Form intake endpoint.
//
// A submission counts as delivered if it reaches CCD by EITHER route:
//
//   Email    RESEND_API_KEY  — arrives in a person's inbox. This is the one
//                             that matters: a database nobody signs into is
//                             not the same as an enquiry somebody answers.
//   Database SUPABASE_URL + SUPABASE_SERVICE_KEY — a durable record, optional.
//
// Set up either and the forms start working; set up both and one can fail
// without losing the enquiry. With neither configured the endpoint still
// returns 200 with {stored:false}, so local development and previews work, and
// the forms then show their "please email us directly" fallback rather than
// telling a visitor it worked when nobody received it.
//
// Recipient: FORM_EMAIL_TO, defaulting to the contact address in the CMS
// (Settings -> Contact details), so staff can redirect enquiries themselves.

import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/siteConfig";
import { formatSubmissionEmail, type FormType } from "@/lib/formEmail";

// Per-type field allowlist: only these keys are forwarded, everything else is
// dropped, and every value is coerced to a length-capped string.
const SHAPES: Record<string, { table: string; fields: string[] }> = {
  contact: { table: "contact_submissions", fields: ["first", "last", "email", "topic", "message"] },
  estimate: { table: "estimate_requests", fields: ["name", "phone", "address", "service", "details"] },
  volunteer: { table: "volunteer_signups", fields: ["name", "email", "skills", "availability"] },
  newsletter: { table: "newsletter_subscribers", fields: ["email"] },
};

const MAX_FIELD_LENGTH = 4000;

// ponytail: in-memory per-IP limiter — resets per instance; move to platform
// WAF/rate-limit rules if abuse appears.
const hits = new Map<string, { count: number; reset: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 10;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: { type?: string; payload?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const type = String(body?.type ?? "");
  if (!Object.hasOwn(SHAPES, type)) {
    return NextResponse.json({ ok: false, error: "bad_type" }, { status: 400 });
  }
  const shape = SHAPES[type];

  const raw = (body?.payload ?? {}) as Record<string, unknown>;

  // Honeypot: real forms never fill "website"; bots often do. Pretend success.
  if (String(raw.website ?? "").trim()) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const payload: Record<string, string> = {};
  for (const field of shape.fields) {
    const value = raw[field];
    if (value != null) payload[field] = String(value).slice(0, MAX_FIELD_LENGTH);
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const emailTo = process.env.FORM_EMAIL_TO || siteConfig.contact.email;
  // Resend only accepts a From on a domain you have verified. Until ccdgroup.org
  // is verified there, their shared onboarding sender works and can reach the
  // address the account was opened with — which is the CCD inbox anyway.
  const emailFrom = process.env.FORM_EMAIL_FROM || "CCD website <onboarding@resend.dev>";

  const canStore = Boolean(url && key);
  const canEmail = Boolean(resendKey && emailTo);

  // Nothing configured yet — acknowledge without claiming delivery.
  if (!canStore && !canEmail) {
    return NextResponse.json({ ok: true, stored: false });
  }

  async function store(): Promise<boolean> {
    // ignore-duplicates keeps repeat newsletter signups idempotent and avoids
    // turning unique-constraint errors into an email-enumeration oracle.
    const conflict = type === "newsletter" ? "?on_conflict=email" : "";
    const res = await fetch(`${url}/rest/v1/${shape.table}${conflict}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key as string,
        Authorization: `Bearer ${key}`,
        Prefer: type === "newsletter" ? "return=minimal,resolution=ignore-duplicates" : "return=minimal",
      },
      body: JSON.stringify({ ...payload, source: "ccd-website" }),
    });
    if (!res.ok) {
      // Log upstream detail server-side only — never echo it to the client.
      console.error("submit store_failed", type, res.status, await res.text());
      return false;
    }
    return true;
  }

  async function email(): Promise<boolean> {
    const { subject, text, replyTo } = formatSubmissionEmail(type as FormType, payload);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: emailFrom,
        to: [emailTo],
        subject,
        text,
        // Staff hit reply and it goes to whoever wrote in. Omitted entirely
        // when the address could not be trusted — see isReplyableEmail.
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error("submit email_failed", type, res.status, await res.text());
      return false;
    }
    return true;
  }

  // Both routes are tried; the enquiry survives either one failing.
  const attempts: Promise<boolean>[] = [];
  if (canEmail) attempts.push(email());
  if (canStore) attempts.push(store());

  const results = await Promise.allSettled(attempts);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value === true);

  if (!delivered) {
    for (const r of results) {
      if (r.status === "rejected") console.error("submit delivery_threw", type, r.reason);
    }
    return NextResponse.json({ ok: false, error: "not_delivered" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, stored: true });
}
