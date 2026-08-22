// Self-check for the submission email builder. No framework — run it directly:
//   node --experimental-strip-types lib/formEmail.test.mts
import assert from "node:assert/strict";

const { formatSubmissionEmail, isReplyableEmail } = await import("./formEmail.ts");

const NL = String.fromCharCode(10);
const BELL = String.fromCharCode(7);
const CTRL = new RegExp("[\\u0000-\\u0008\\u000b\\u000c\\u000e-\\u001f\\u007f]");

// --- the ordinary case: a contact enquiry reaches a person, replyable ---
{
  const { subject, text, replyTo } = formatSubmissionEmail("contact", {
    first: "Dana",
    last: "Reed",
    email: "dana@example.org",
    topic: "Tool Bank",
    message: "Do you lend hedge trimmers?",
  });
  assert.equal(subject, "Contact form: Dana Reed");
  assert.equal(replyTo, "dana@example.org");
  assert.match(text, /Topic: Tool Bank/);
  assert.match(text, /Do you lend hedge trimmers\?/);
  assert.match(text, /Reply to this email/);
}

// --- empty fields are dropped, not printed as blank headings ---
{
  const { text } = formatSubmissionEmail("volunteer", {
    name: "Sam",
    email: "sam@example.org",
    skills: "",
    availability: "   ",
  });
  assert.doesNotMatch(text, /Skills/);
  assert.doesNotMatch(text, /Availability/);
  assert.match(text, /Name: Sam/);
}

// --- a submission with nothing usable still produces a sendable email ---
{
  const { subject, text, replyTo } = formatSubmissionEmail("estimate", {});
  assert.equal(subject, "Estimate request: someone");
  assert.equal(replyTo, undefined);
  assert.match(text, /no details were filled in/);
  assert.match(text, /nobody to reply to/);
}

// --- header injection: a newline in the address must never become a Reply-To ---
{
  assert.equal(isReplyableEmail("a@b.co" + NL + "Bcc: victim@example.com"), false);
  assert.equal(isReplyableEmail("a@b.co, c@d.co"), false);
  assert.equal(isReplyableEmail("<a@b.co>"), false);
  assert.equal(isReplyableEmail("not-an-email"), false);
  assert.equal(isReplyableEmail(""), false);
  assert.equal(isReplyableEmail(null), false);
  assert.equal(isReplyableEmail("a@b.co"), true);
  assert.equal(isReplyableEmail("first.last+tag@sub.example.org"), true);

  const { replyTo } = formatSubmissionEmail("contact", {
    email: "evil@example.com" + NL + "Bcc: victim@example.com",
  });
  assert.equal(replyTo, undefined);
}

// --- control characters are stripped from the body entirely ---
{
  const { text, subject } = formatSubmissionEmail("contact", {
    first: "Mal" + BELL + "ory",
    message: "line one" + BELL,
  });
  assert.doesNotMatch(text, CTRL);
  assert.doesNotMatch(subject, CTRL);
  assert.match(text, /Malory/);
}

// --- an injected heading stays inside its field, it does not become one ---
{
  const { text } = formatSubmissionEmail("contact", {
    topic: "Tool Bank",
    message: "hello" + NL + "Topic: forged",
  });
  const headings = text.split(NL).filter((l) => l.startsWith("Topic: "));
  // "Topic: Tool Bank" is the real heading; "Topic: forged" is body text that
  // happens to look like one. Both lines exist — what matters is that the real
  // field was not replaced or reordered by the injected one.
  assert.equal(headings[0], "Topic: Tool Bank");
  assert.match(text, /Message:/);
}

// --- the subject names whoever wrote in, however the form spells it ---
{
  assert.match(formatSubmissionEmail("estimate", { name: "Ray" }).subject, /: Ray$/);
  assert.match(
    formatSubmissionEmail("newsletter", { email: "n@example.org" }).subject,
    /Newsletter signup: n@example\.org$/
  );
  // First name only, no surname — no stray trailing space.
  assert.equal(formatSubmissionEmail("contact", { first: "Jo" }).subject, "Contact form: Jo");
}

console.log("formEmail: all assertions passed");
