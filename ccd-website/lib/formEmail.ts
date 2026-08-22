// Turns a form submission into the email CCD staff actually read.
//
// Kept apart from app/api/submit/route.ts so it can be tested without a Next
// runtime — see formEmail.test.mts.

export type FormType = "contact" | "estimate" | "volunteer" | "newsletter";

// What each form is called in the subject line, and how its fields are named
// once they reach a human. The order here is the order they appear in the email.
const FORMS: Record<FormType, { title: string; labels: Record<string, string> }> = {
  contact: {
    title: "Contact form",
    labels: {
      first: "First name",
      last: "Last name",
      email: "Email",
      topic: "Topic",
      message: "Message",
    },
  },
  estimate: {
    title: "Estimate request",
    labels: {
      name: "Name",
      phone: "Phone",
      address: "Address",
      service: "Service",
      details: "Details",
    },
  },
  volunteer: {
    title: "Volunteer signup",
    labels: {
      name: "Name",
      email: "Email",
      skills: "Skills",
      availability: "Availability",
    },
  },
  newsletter: {
    title: "Newsletter signup",
    labels: { email: "Email" },
  },
};

// Deliberately strict, and applied to a value that becomes a mail header.
// Anything with whitespace, a comma, or an angle bracket is rejected outright
// rather than escaped — a submitter who cannot be replied to is a small loss,
// a malformed Reply-To is a header-injection shape we simply refuse to build.
const EMAIL =
  /^[^\s<>@,;:"'\\[\]]+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;

export function isReplyableEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && EMAIL.test(value.trim());
}

// Strip control characters so a submitted value cannot fake its own field
// heading or smuggle a header break into the body.
function clean(value: string): string {
  return value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trimEnd();
}

function who(type: FormType, payload: Record<string, string>): string {
  const name =
    type === "contact"
      ? [payload.first, payload.last].filter(Boolean).join(" ")
      : payload.name;
  return clean(name || payload.email || "someone").slice(0, 80) || "someone";
}

export function formatSubmissionEmail(
  type: FormType,
  payload: Record<string, string>
): { subject: string; text: string; replyTo?: string } {
  const form = FORMS[type];

  const lines: string[] = [];
  for (const [field, label] of Object.entries(form.labels)) {
    const value = payload[field];
    if (value == null || !String(value).trim()) continue;
    const cleaned = clean(String(value));
    // Long free-text reads better under its heading than beside it.
    lines.push(cleaned.includes("\n") ? `${label}:\n${cleaned}` : `${label}: ${cleaned}`);
  }
  if (lines.length === 0) lines.push("(no details were filled in)");

  const replyTo = isReplyableEmail(payload.email) ? payload.email.trim() : undefined;

  const footer = replyTo
    ? `Reply to this email and it goes straight back to ${replyTo}.`
    : "This submission left no email address, so there is nobody to reply to.";

  return {
    subject: `${form.title}: ${who(type, payload)}`,
    text: `${lines.join("\n\n")}\n\n--\n${footer}\nSent by the ccdgroup.org website.\n`,
    replyTo,
  };
}
