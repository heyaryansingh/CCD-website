# 04 — Forms, Automations, AI, Mailing

## A. Forms (Wix Forms app; each auto-creates a CMS collection)

### 1. Clean & Green estimate (/clean-and-green)
Fields: Name* · Phone* · Property address · Service (dropdown of the REAL 9: Basic Cut and Trim, Hedging, Flower Beds, Tree Pruning, Gutter Cleaning, Hard Scaping, Trash Removal, Snow Removal, Shed/Basement Clean Out) · Details (paragraph).
Success message: "Thanks. CCD will follow up about your estimate."
Note: the old Microsoft Form (`forms.cloud.microsoft/r/Zc3eJk1sZj`) can be retired once this is live — decide with Francis.

### 2. Contact (/contact)
First name* · Last name · Email* · Topic (General question / Membership / Facilities booking / Clean & Green) · Message*.

### 3. Volunteer (/donate + /volunteer)
Name* · Email* · Skills & interests · Availability (Weekends/Weekdays/Evenings).

### 4. Newsletter (footer, every page)
Email* only. Enable **double opt-in** (Marketing settings) → feeds Email Marketing audience.

## B. Automations (Wix Automations; create one per line)
| Trigger | Actions |
|---|---|
| Estimate form submitted | Email notify **francis@ccdgroup.org** + info@ · auto-reply to visitor ("We received your request, expect a call within 2 business days") · create/update CRM contact with label `cleangreen-lead` |
| Contact form submitted | Route by Topic: Facilities booking → **theREC@ccdgroup.org**, Clean & Green → francis@, else info@ · auto-reply · CRM label `inquiry` |
| Volunteer form submitted | Notify info@ · auto-reply with next volunteer dates · CRM label `volunteer` |
| Newsletter signup | Add to Email Marketing audience "Block Report" (double opt-in email sent automatically) |
| New member purchase (05) | Welcome email w/ member benefits + Tool Bank instructions · CRM label `member-<tier>` |

## C. AI (Wix native — no custom code)
1. **Wix AI Site Chat**: enable, train on site pages + FAQ; hand-off to inbox when it can't answer; set office-hours message with phone (410) 205-2488.
2. **Wix Inbox AI-assisted replies**: staff see suggested responses to form/chat messages — this is the "AI automation for messages" for non-technical members: they click-approve suggested drafts.
3. **AI content tools** in the editor (rewrite/expand) available to staff for news posts — mention in staff training.

## D. Mailing ("Get the block report")
- Wix **Email Marketing**: audience "Block Report" fed by the newsletter form (double opt-in ON).
- Template: reuse site palette (gold #FEC630 / deep green #124A34, Ovo headings) — build one reusable campaign template named "Block Report monthly".
- Cadence recommendation: monthly; content = 3 news items + next events, pulled from the News/Events CMS.

## E. Link registry (mirror of `lib/siteConfig.ts` — update in ONE place)
Buttons that use external links, and the single value to maintain (via SiteLinks CMS or direct edit):
| Key | Current value (VERIFY still live) | Used on |
|---|---|---|
| paypalDonate | paypal.com/donate/?hosted_button_id=D4UMVJ4YRXDQE | Donate panel, Brick page, header/footer Donate flows |
| brickCampaign | fundraisingbrick.com/online-orders/ccd/ | Brick page gold CTA, CSI page |
| facilitiesBooking | forms.cloud.microsoft/r/Z7RnPBQuim | Utility bar, Contact page (retire when internal booking flow decided) |
| vendorRegistration | forms.gle/mfhVo1yEZbZwre5r8 | Co-op Market vendor card |
| facebook | facebook.com/CoopCommunity | Header, footer |
| instagram | instagram.com/ccd_group/ | Header, footer (+ optional IG feed embed on home) |
| privacyPolicy | (re-host the PDF on the new site → update footer link) | Footer |

Rule (carried from the code): if a link is blank/unknown, the button falls back to `mailto:info@ccdgroup.org` with a labeled subject — never a dead link.
