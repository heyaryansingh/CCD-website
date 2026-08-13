# Editing the CCD website

You do not need to know how to code, and you cannot break anything permanently.
Every change is saved with a record of who made it and when, so anything can be
put back.

**The editor lives at https://ccdgroup.vercel.app/admin**

---

## Signing in

1. Go to **https://ccdgroup.vercel.app/admin**
2. Click **Sign in with GitHub**
3. Approve the request

If it says you are not authorised, ask whoever manages the website to add you as
a collaborator. That is the only thing that controls who can edit.

You can do all of this on a phone.

---

## How the site is put together

Two things to understand, and then everything else follows:

**1. Pages are built from blocks.**
A page is a stack of blocks — a headline, then text beside an image, then a row
of cards, then a button. You can add blocks, delete them, and drag them into a
different order.

**2. Lists appear in more than one place.**
The team, news, events and partners live in **Lists**, not on a page. Add a
person to the Team list once and they appear everywhere the team is shown. You
never have to update the same thing twice.

**3. You always write in English.**
The site is offered in nine languages, but there is only one copy of the content
and it is the English one. Everything else is a translation of it, kept in
**Translations**. You do not maintain nine versions of a page — see below.

---

## The things you will actually do

### Change some wording

**Pages** → pick the page → find the block → edit the text → **Save**.

Your change is live in about a minute. Refresh the real page to see it.

### Add a news article or an event

**Lists** → **News** or **Events** → **Add** at the top of the list → fill it in
→ **Save**.

Put new items at the top of the list — that is the order they appear on the site.

### Add someone to the team

**Lists** → **Team** → **Add**. If you have no photo yet, leave the photo field
empty and the site shows their initials in a circle. That looks deliberate, not
broken.

### Fix a translation

**Translations** → pick the language → find the English on the left → correct
the wording on the right → **Save**.

Two things worth knowing:

- **Nothing here is ever blank on the site.** A line with no translation yet
  shows in English. A half-translated language is safe to leave live.
- **The English on the left has to match the site exactly.** It is how the
  translation is found. If you change the wording of a page, its old translation
  stops being used and the line goes back to English until it is redone.

You do not have to translate a page before publishing it. Write it in English,
publish, and the translations catch up afterwards.

### Change a phone number, email or address

**Settings** → **Contact and organisation**.

Change it once here and it updates on every page, including the footer.

### Add a new page

**Pages** → **Add** at the top.

- **File name** — lowercase with dashes, e.g. `summer-market`. This becomes the
  web address: ccdgroup.org/summer-market
- **Web address** — normally the same as the file name
- Fill in the headline and opening paragraph, then add blocks

A new page does **not** appear in the menu automatically. To put it there:
**Settings** → **Menus**.

### Add a photo

Any field with a picture in it opens the media library. **Upload** takes it from
your computer or phone, or pick something already there.

Two things matter:

- **Size.** Photos straight from a phone or camera are often 5–10 MB, which makes
  the page slow. Aim for under 500 KB. Any free "compress image" tool will do it.
- **Image description.** Always fill it in. It is what someone using a screen
  reader hears, and it is what shows if the photo fails to load. Describe what is
  in the picture — "Volunteers planting beds at the Oasis" — not "photo".

### Reorder or remove a block

Drag a block by its handle to move it. The menu on each block lets you duplicate
it, insert another above or below, or delete it.

---

## Undoing a mistake

Every save is recorded. To undo something:

- **If you have not saved yet** — leave the page without saving.
- **If you have saved** — ask a developer to revert it. Tell them roughly when
  you made the change and what it was. It takes a minute and nothing is lost.

You cannot delete the website. The worst case is a page looking wrong for a few
minutes.

---

## Rules that keep the site looking right

**Gold is a background, never text.** CCD gold on a white background is too
faint to read and fails accessibility standards. If you want gold, use it behind
dark text. The colour choices in the editor are already safe — just pick from
the list rather than asking for something custom.

**Write link text that says where it goes.** "Read more" ×6 on one page is
useless to someone using a screen reader, who often jumps between links. "Read
about the Tool Bank" is better.

**Two addresses, both correct.** 4004 Frederick Ave is CCD's own address.
3932–3934 Frederick Ave is the Center for Social Impact. They are different
buildings. Please do not "fix" one to match the other.

**Leave `{{ }}` alone.** A few link fields contain something like
`{{action:links.paypalDonate|Donation to CCD}}`. That means "use the donate link
from Settings". If you replace it with a normal web address it will still work,
but the Settings screen will no longer control that button.

---

## Things to be careful with

These take real money or real enquiries, so check them after changing:

| Field | Where | Why |
|---|---|---|
| Donate button link | Settings → Buttons and payment links | Sends people to PayPal. Test it after any change. |
| 4th Brew shop address | Settings → Buttons and payment links | **Ask a developer first.** If this is wrong, nobody can buy coffee. |
| Contact emails | Settings → Contact details | A typo means enquiries go nowhere. |

---

## What you cannot do here

By design, so the site stays consistent:

- Change fonts, colours or spacing
- Change how a block is laid out
- Edit the shop's prices or stock — those come from Shopify, and changing them
  in Shopify updates the website automatically

If you need one of those, it is a developer job.

---

## Getting help

Contact whoever currently maintains the site. Useful things to tell them:

- The page or list you were editing
- What you expected and what happened
- Roughly what time it was — every change is timestamped, which makes it quick
  to find
