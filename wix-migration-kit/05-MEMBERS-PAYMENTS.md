# 05 — Members Area & Payments (real accounts + dues)

## A. Members Area
1. Add **Wix Members Area** app → enables real accounts (signup/login, profile).
2. Signup: email + password and Google login. Approval: automatic.
3. Members-only page (optional now): "Member Hub" with Tool Bank request info + meeting notes. Keep minimal at launch.

## B. Pricing Plans (the 5 REAL tiers — dues billing)
Wix **Pricing Plans** app → create 5 recurring plans (monthly) + one-time $5 setup fee each (Pricing Plans supports a one-time setup fee on a recurring plan):

| Plan | Price | Setup | Vote | Key benefits (shown on plan) |
|---|---|---|---|---|
| Non-Resident Member | $10/mo | $5 | No | Event discounts · discounted Tool Bank · green spaces |
| **Resident Member** ⭐ | $20/mo | $5 | Yes | FREE Tool Bank · 15% off Clean & Green · advocacy · green spaces |
| Small Org / Business (1–25 emp) | $100/mo | $5 | Yes | Advocacy · green spaces · discounted Tool Bank · 15% C&G |
| Medium Org / Business (26–100) | $250/mo | $5 | Yes | same as Small |
| Large Org / Business (100+) | $400/mo | $5 | Yes | same as Small |

- Mark Resident as **Highlighted** (matches the site's "Most popular").
- Connect plans to the /membership page "Choose your membership" button.
- Buying a plan creates the member account automatically → triggers the welcome automation (04).

## C. Payments setup (user-performed; kit only points)
1. Wix Dashboard → **Accept Payments** → connect Wix Payments (cards) — needs CCD's EIN + bank details. *(Aryan: do this with Johnny/Tracy; I never handle credentials.)*
2. Also enable **PayPal** as a method if desired; the standalone PayPal donate button stays regardless (04 link registry) so existing donors' muscle memory keeps working.
3. Donations: keep the current PayPal hosted button as primary at launch (zero risk). Optionally add the **Wix Donations** app later for on-site giving with impact tiers ($25/$50/$100/$500 mirror the donate panel).

## D. Brick campaign
Stays on fundraisingbrick.com (external, already works). The Brick page links out. If CCD later wants on-site brick sales, model as Wix Stores products — out of scope for launch.

## E. What "accounts + real data" means after this doc
- Visitor accounts: Members Area (Wix-managed, secure).
- Dues: Pricing Plans subscriptions with real billing.
- Form data: Wix CMS collections (04) — exportable CSV anytime.
- Mailing list: Email Marketing audience with double opt-in.
- The Next.js/Supabase stack remains the design reference + fallback; any rows it collected pre-migration export → import (02 §11).
