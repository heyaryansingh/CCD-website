# CCD Content Style Guide

**Who this is for:** CCD staff and volunteers writing new page copy, news posts, and event listings. You do not need to be a professional writer to use this. You need five minutes and this document.

**Companions:** `ACCESSIBILITY.md` (why alt text, headings, and link rules exist), `BEFORE-YOU-PUBLISH.md` (mechanics check right before you hit Publish), `SECTION-LIBRARY.md` (which layout to pick).

---

## Part 1 — The voice, in one paragraph

CCD's site talks the way a neighbor talks over a fence, not the way a nonprofit talks in a grant report. Sentences are short. Headlines are two-part and end in a period, like a statement of fact: "Building the block." / "Brick by brick." Nothing is dressed up — a tool bank is "Borrow it. Don't buy it," not "Facilitating equitable access to shared resources." The copy names real streets, real numbers, real people (Frederick Avenue, 5,000 square feet, Johnny Martin Jr.) instead of vague nonprofit nouns (the community, stakeholders, our mission). It sounds like it was written by someone who works on the block, because it was.

**Five rules:**

1. **Short sentences.** If a sentence has two ideas, it's two sentences.
2. **Concrete beats abstract.** A street name, a square-foot number, a service name — not "impact" or "empowerment."
3. **State it, don't sell it.** "Nine services, one crew from the neighborhood" — not "We're proud to offer a comprehensive suite of services."
4. **Members, not marks.** People who use CCD are members or neighbors, never customers, clients, or beneficiaries.
5. **Every button says what happens next.** Never a bare "Learn more."

**We sound like / we do not sound like:**

| We sound like (real CCD copy) | We do not sound like (boilerplate to avoid) |
|---|---|
| "Building the block. Brick by brick." | "Empowering Irvington through strategic community investment." |
| "Borrow it. Don't buy it." | "Facilitating equitable access to shared tool resources." |
| "Nine services, one crew from the neighborhood." | "A comprehensive suite of outdoor maintenance solutions." |
| "This is your co-op. Own a piece of it." | "Join our stakeholder network today." |
| "A 5,000-square-foot former storage facility is becoming a cooperative grocery, multimedia center, maker marketplace, and flexible training space." | "We are excited to announce an innovative new community resource hub." |
| "One member gets one vote. Big decisions come back to the people closest to the work." | "CCD is committed to democratic governance principles and stakeholder inclusion." |
| "Grab it, do the work, and return it for the next neighbor." | "Complete the borrowing process and return the item upon project completion." |

---

## Part 2 — Patterns by element

**Eyebrow.** ALL CAPS, no period, 1–4 words. It's a label above a title, not a sentence. Example: `IRVINGTON, BALTIMORE`, `HOW IT WORKS`, `SINCE 2020`.

**Page title / H1.** One short declarative sentence per page, stated as fact, not as a question or a slogan-fragment. Budget: 3–7 words. Example: "We are Baltimore's cooperative future." Every page gets exactly one — see `ACCESSIBILITY.md` Section 3.

**Accent line.** The title splits into two parts: a short opening line, then a short punchy close that lands the point. Both end in a period, both read as complete thoughts on their own. Example: "Building the block." / "Brick by brick." Or: "Borrow it." / "Don't buy it." Write the two halves as a matched pair — say it out loud; if the second half doesn't land harder than the first, keep drafting.

**Intro paragraph (hero body).** 1–2 sentences, 20–40 words. It must say who CCD is or what the page is about, using at least one concrete noun (a street, a number, a program name) — not just "we believe" language. Example: "A member-owned cooperative turning vacant spaces into markets, gardens, services, and neighborhood wealth in Baltimore's 21229."

**Section heading.** Same rule as the page title but scoped to that section: one short declarative sentence, period at the end. Example: "Programs built by neighbors, owned by members." Budget: 4–9 words.

**Body paragraph.** Max 3 sentences. Plain language: aim for what a smart 8th grader reads comfortably — short words, no jargon, no subordinate clauses stacked three deep. Example: "CCD was founded by Johnny Martin Jr. after years of watching investment promises miss Irvington. The answer was not another outside rescue plan. It was ownership from within: neighbors pooling dues, decisions, work, and vision."

**Card title + body.** Title: 2–5 words, names the thing plainly ("Tool Bank," not "Access to Shared Resources"). Body: one sentence, 10–20 words, states what it is or does. Example — title: "The Tool Bank." Body: "Resident members get free access to shared tools for home and block projects."

**Button label.** Verb-first, and it must make sense read completely on its own, out of context — because that's exactly how a screen reader's links list presents it (see `ACCESSIBILITY.md` Section 5.1). Never repeat a bare "Learn more" down a page. Fix pattern: name the destination inside the label. "Become a member," "Support the brick campaign," "Explore the market," "Ask about a tool" — not "Learn more," "Click here," "Submit."

**Stat value + label.** Value: a number, no unit spelled out if the label carries it. Label: 2–5 words, plain. Example: `2020` / "Founded by neighbors." `9` / "Clean & Green services." Never use a stat you can't source — CCD's numbers are its credibility.

**Alt text.** This is copy, not metadata — see `ACCESSIBILITY.md` Section 4 for the full rules (required field, no "image of...", the redundancy rule). Three CCD-specific examples:
- **A person:** "Johnny Martin Jr., CEO, speaking at the Irvington community day." Not "Man at podium."
- **A partner logo:** "Baltimore Roundtable for Economic Democracy" — the org's name, nothing more, unless the name is already visible in a caption next to it, in which case mark the logo decorative instead.
- **A before/after pair:** "Vacant rowhouse lot, overgrown and fenced off, prior to renovation" paired with "Same lot after renovation: new siding, working porch light, landscaped front yard." Not "Before" / "After."

---

## Part 3 — Writing a news post

Fields: `meta, title, thumb, excerpt, body, photos, instructions, contactEmail`.

| Field | Guidance | Budget |
|---|---|---|
| `meta` | Month + year, all caps, matches the site pattern | `"JUN 2026"` |
| `title` | Short declarative headline, what happened, no fluff | 3–8 words |
| `thumb` | One photo that shows the actual event, not a stock image | — |
| `excerpt` | One sentence, teaser for the card view — this is what people see before they click | 12–20 words |
| `body` | The full story: what happened, who was there, what it means for the block. 2–4 short paragraphs | 80–200 words |
| `photos` | 2–4 real photos from the event | — |
| `instructions` | Only if there's a next step (RSVP, follow-up, contact a person) | 1 sentence |
| `contactEmail` | The real person's inbox, not a generic one, if there's a specific point of contact | — |

**Worked example — Clean & Green project:**

```
meta:         AUG 2026
title:        Clean & Green rebuilds the Loudon Ave sidewalk.
thumb:        cleangreen-loudon-sidewalk.jpg
excerpt:      A five-person crew replaced 40 feet of cracked, unsafe sidewalk on
              South Loudon Avenue in one Saturday.
body:         The sidewalk outside 3919 S Loudon Ave had been cracked and
              lifting for two years — a real trip hazard for neighbors walking
              to the market. This month, the Clean & Green crew broke it out,
              regraded the base, and poured a new 40-foot stretch in a single
              Saturday.

              Four of the five crew members live within three blocks of the
              job. That's the model: neighborhood work, done by neighbors,
              funded by neighbors who hire Clean & Green for their own yards.

              Resident members save 15% on every Clean & Green job. Every
              dollar funds projects like this one.
photos:       cleangreen-loudon-1.jpg, cleangreen-loudon-2.jpg, cleangreen-loudon-3.jpg
instructions: Want a sidewalk, yard, or lot cleaned up on your block? Request a
              free estimate.
contactEmail: francis@ccdgroup.org
```

---

## Part 4 — Writing an event listing

Fields: `title, date, day, timeText, location, cost, tag, blurb, body, thumb, photos, instructions, contactEmail`.

| Field | Guidance | Budget |
|---|---|---|
| `title` | Name of the event, plain, no exclamation points | 3–7 words |
| `date` | `YYYY-MM-DD` or whatever the calendar field expects — check the existing entries for the exact format before typing a new one | — |
| `day` | Day of week, spelled out | `"Saturday"` |
| `timeText` | See formatting conventions below | — |
| `location` | Street address or named place; if it's CCD HQ, use the real address | `"4004 Frederick Ave"` |
| `cost` | See formatting conventions below | — |
| `tag` | One word/short phrase category, matches other listings (`"Market"`, `"Garden Day"`, `"Tour"`) | 1–2 words |
| `blurb` | One sentence, what it is, for the card view | 12–20 words |
| `body` | Full details: what to expect, what to bring, who it's for | 60–150 words |
| `thumb` | One real photo | — |
| `photos` | Optional extra photos | — |
| `instructions` | RSVP link, vendor sign-up, what to bring | 1 sentence |
| `contactEmail` | The real point person | — |

**Formatting conventions:**
- **Free event:** `cost: "Free"` — not "$0," not "No charge."
- **Priced event:** `cost: "$5 suggested donation"` or `cost: "$25/vendor table"` — say what the money is for if it isn't obvious.
- **Time range:** `timeText: "10:00 AM – 1:00 PM"` — en dash, no "to," always include AM/PM even if both times share it.
- **Single start time, open-ended:** `timeText: "Starts at 10:00 AM"`.

**Worked example — Co-op Market day:**

```
title:        Community Co-op Market: Seed & Plant Swap
date:         2026-05-17
day:          Saturday
timeText:     10:00 AM – 1:00 PM
location:     4004 Frederick Ave, Baltimore, MD 21229
cost:         Free
tag:          Market
blurb:        Bring extra seeds or plants to trade, shop local vendors, and
              learn about composting and pollinators.
body:         The Community Co-op Market returns with a Seed & Plant Swap
              hosted with Catonsville Co-op Market. Bring extras from your
              own garden to trade, and go home with something new.

              Local vendors will be selling fresh-cut flowers and produce.
              CCD staff will be on hand with composting and pollinator
              tips, and membership sign-ups and Tool Bank info will be
              available at the CCD table.

              Free and family-friendly. All ages welcome.
thumb:        market-vendor-craft.jpg
photos:       market-vendors-table.jpg, market-beds-flag.jpg
instructions: Want to sell at the market? Vendor registration is open —
              see the link below.
contactEmail: theREC@ccdgroup.org
```

---

## Part 5 — Words we use and words we avoid

| Say this | Not this | Why |
|---|---|---|
| **member** | customer / client / beneficiary | CCD is member-owned. People who use CCD's services and pay dues are members, not customers of a service provider or clients of a charity. |
| **cooperative** or **co-op** | (do not shorten to "the org" or "the nonprofit" when the point is ownership) | A cooperative is owned and governed by the people who use it — one member, one vote. Spell out "cooperative" on first use on a page, "co-op" is fine after that. |
| **neighbor** | resident (when talking about people generally) / community member | "Neighbor" is CCD's own word for the person next door, and it carries the relationship, not just a location. Use "resident" only for the technical membership-tier distinction (see below). |
| **the block** | "the neighborhood" (as a generic placeholder) / "the target area" | "The block" is CCD's own framing for Irvington and 21229 — specific, local, ownable. Use it the way the site does: "building the block," "good work changes the block." |
| **resident member** | just "member" when the tier matters | Resident members live, work, or worship in 21229 — they get free Tool Bank access, a vote, and a 15% Clean & Green discount. Say "resident member" when the distinction actually matters (pricing, benefits); say "member" generally otherwise. |
| **supporter / organization / business member** | "donor" or "sponsor" | These are the other membership tiers, not one-off gifts. A business that joins as a member is not the same relationship as a company that writes a check once. |
| ~~underserved~~ | name the specific gap: "Irvington has not had a full-service grocery in [X] years." | "Underserved" describes people by what they lack, from outside. Name the specific, concrete gap instead — it's more accurate and doesn't define people by deficit. |
| ~~at-risk~~ | name the specific situation, or drop the label entirely | Same problem — a vague deficit label standing in for real description. |
| ~~giving back~~ | say what was actually done: "CCD rebuilt the sidewalk on Loudon Ave." | "Giving back" implies the org is an outsider making a gesture. CCD is of the neighborhood, not visiting it. |
| ~~empowering~~ | describe the actual mechanism: "One member, one vote" | "Empowering" is a claim about an effect on someone else. Describe the structure that produces the effect and let the reader draw the conclusion. |
| ~~revitalize~~ | name the specific change: "turning a vacant lot into a garden" | "Revitalize" implies the place was dead. Irvington has neighbors in it; describe the specific project instead. |
| ~~stakeholders~~ | name who you mean: "members," "neighbors," "partners," "the city" | "Stakeholders" is a spreadsheet word. CCD's copy always names the actual people. |
| ~~synergy~~ | describe what actually connects: "Clean & Green funds the Tool Bank" | If two things work together, say how. "Synergy" says nothing. |
| Irvington in general | (avoid describing the neighborhood only in terms of what it's missing) | Lead with what's happening — markets, gardens, a co-op grocery underway — not with vacancy and dumping. CCD's own copy leads with "what was once abandoned can become a beacon," a forward frame, not a deficit one. |

**Capitalization:** Program names are proper nouns, capitalize every word: **Clean & Green**, **Tool Bank**, **Center for Social Impact**, **Community Co-op Market**, **Brick Campaign**. "Irvington" is always capitalized (it's a neighborhood name); "21229" is the zip code, written as digits, no "the" needed before it in most cases ("Baltimore's 21229," not "the 21229" unless it reads naturally in context — the site does both; match the sentence).

---

## Part 6 — Accessibility rules that are really writing rules

Full detail and reasoning in `ACCESSIBILITY.md`. The writing-relevant subset:

- **Descriptive link text.** Every link must make sense read alone, out of context. Never "click here" or "see below." See Part 2, Button label, above. (`ACCESSIBILITY.md` §5.1)
- **One H1 per page.** The page title is the only H1. Don't reuse a big font style on something that isn't the page's actual subject. (§3.2)
- **Heading levels in order, never chosen for font size.** If you want smaller text, don't jump down a heading level — ask for a styled paragraph instead. (§3.1–3.2)
- **Alt text on every image, written as real description**, not left blank and not a filename. (§4)
- **Plain language.** Short sentences, common words — same rule as Part 1 of this guide, and an accessibility requirement, not just a style preference.
- **Expand an abbreviation on first use per page.** Write "Center for Social Impact (CSI)" the first time it appears on a page, then CSI is fine after — unless the page never needs the short form, in which case just spell it out.
- **Never use color alone to convey meaning**, and never "click here" / "see below" as the only way to point at something — name the thing directly instead ("see the Membership page," not "see below").

---

## Part 7 — 60-second self-edit checklist

Before you publish, read your draft once against this list. This is about writing quality — for the accessibility mechanics (alt text, contrast, headings), use `BEFORE-YOU-PUBLISH.md` instead.

1. **Is the first sentence concrete?** A street, a number, a program name — not "CCD is excited to..."
2. **Cut the throat-clearing.** Delete any sentence that just announces you're about to say something. Start with the thing.
3. **Is there a number in it, if there should be?** Dates, dollar amounts, square footage, counts — CCD's copy is specific.
4. **Does every button say what happens?** No bare "Learn more" or "Click here."
5. **Would a neighbor recognize themselves in this?** Read it back — does it sound like someone from the block wrote it, or like a grant report?
6. **Read it out loud.** If you stumble, the sentence is too long. Split it.
7. **Check the terminology.** Member, not customer. The block, not "the target area." No jargon from Part 5's avoid list.
8. **Is the headline a complete, declarative sentence with a period?**
9. **One idea per paragraph.** If a paragraph does two jobs, split it.
