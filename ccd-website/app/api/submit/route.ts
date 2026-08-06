// Form intake endpoint.
//
// Persists submissions to Supabase when env vars are present; otherwise it
// simply acknowledges (200) so the site works end-to-end before a database is
// connected. To turn on real storage, set SUPABASE_URL + SUPABASE_SERVICE_KEY
// (server env) and run supabase/schema.sql — no code change needed.

import { NextResponse } from "next/server";

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

  // No database configured yet — acknowledge without storing.
  if (!url || !key) {
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    // ignore-duplicates keeps repeat newsletter signups idempotent and avoids
    // turning unique-constraint errors into an email-enumeration oracle.
    const conflict = type === "newsletter" ? "?on_conflict=email" : "";
    const res = await fetch(`${url}/rest/v1/${shape.table}${conflict}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: type === "newsletter" ? "return=minimal,resolution=ignore-duplicates" : "return=minimal",
      },
      body: JSON.stringify({ ...payload, source: "ccd-website" }),
    });
    if (!res.ok) {
      // Log upstream detail server-side only — never echo to the client.
      console.error("submit store_failed", type, res.status, await res.text());
      return NextResponse.json({ ok: false, error: "store_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, stored: true });
  } catch {
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }
}
