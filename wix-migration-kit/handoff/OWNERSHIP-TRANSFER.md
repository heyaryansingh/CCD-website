# Ownership Transfer — CCD 2026 Website & Related Accounts

**Org:** Cooperative Community Development Inc (CCD), Baltimore
**Prepared:** 2026-07-30 · **Prepared by:** Ary (departing contractor)
**Applies to:** The Wix Studio staging site "CCD 2026" (not yet published, no domain attached, no billing set up) and every account it depends on.

---

## Part 1 — Why this matters

A volunteer built this site on his own accounts and is leaving. If those accounts stay in his name, CCD has no login the day he's unreachable. A billing card tied to a personal account gets cancelled and the site goes dark with no warning. A domain registrar account nobody at CCD can access means the domain can silently expire and get bought by someone else — with no way to prove to the registrar that CCD is the rightful owner. Fixing this now, before launch, is far cheaper than recovering a hijacked or expired domain later. This document exists so that never happens.

---

## Part 2 — The asset inventory

| Asset | What breaks if CCD loses it | Who must own it | Status | Notes |
|---|---|---|---|---|
| Wix account that owns the site | Total loss of site — cannot edit, publish, or recover it | Org-controlled shared mailbox (`<blank>@ccdgroup.org`) | [ ] | Wix has a **transfer site ownership** flow, separate from adding a collaborator. See Part 3. |
| Wix Premium plan / billing | Plan lapses, site unpublishes or loses features | Org bank card / org-approved payment method | [ ] | Payment method must be on an org card, not a personal one. |
| Domain registrar account (ccdgroup.org) | Domain can expire or be locked/held by an ex-employee's account | Org-controlled shared mailbox | [ ] | Confirm: registrar login, registrant contact email, auto-renew ON, domain lock ON. |
| DNS records | Site/email stop resolving; hard to diagnose without a snapshot | Whoever holds the DNS host account (may be same as registrar) | [ ] | Take a full DNS export/screenshot **before** cutover (06). |
| Legacy live Wix site (current ccdgroup.org) | Loses rollback safety net and original media not yet migrated | Same Wix account as the new site | [ ] | Do NOT delete. Keep unpublished as archive per 06 §B.5 (60-day minimum). |
| Google Analytics / Google Tag property | Loses all historical traffic data | Org Google Workspace/Google account | [ ] | |
| Google Search Console property | Loses search performance history and re-verification takes time | Org Google account | [ ] | |
| Google Business Profile | Loses map listing, reviews, and the ability to update hours/info | Org Google account | [ ] | |
| Form submission destination inboxes (newsletter, contact, membership) | Leads/signups vanish into a personal inbox nobody checks | Shared mailbox (`info@`, `francis@`, `theREC@` — see 04) | [ ] | Must go to a shared mailbox, never a named person's personal address. |
| Email marketing / newsletter list export | Loses the "Block Report" audience if the Wix account is lost | Org Wix account (+ periodic CSV export to org storage) | [ ] | |
| Payment processor (Wix Payments / Stripe / PayPal) for dues & donations | Membership dues and donations cannot be collected or reconciled | Org account, owner must be an officer, org bank attached | [ ] | Per 05 §C — set up jointly with Johnny/Tracy; contractor never handles these credentials. |
| Media originals (photo/video/drone library) + brand guidelines PDF | Loses the source assets behind the whole site | Org-owned cloud storage (Google Drive / similar) | [ ] | |
| Social accounts linked in site footer (Facebook, Instagram) | Loses follower base and posting ability | Org-controlled login, admin added via Business Manager | [ ] | |
| Site's source-of-truth content docs + this handoff folder | Loses institutional knowledge of how the site is structured | Org shared drive | [ ] | The `wix-migration-kit/` folder itself. |
| Third-party embeds / API keys still in use | Embedded features break silently | Org account per service | [ ] | Audit before launch — list any found in `<blank>`. |

---

## Part 3 — Transfer runbook

### A. Before launch (safest window — nothing is live yet)

1. **Create the org shared mailbox** (`<blank>@ccdgroup.org`) if it doesn't already exist.
   Who: CCD IT/officer. Verify: send a test email to it and confirm two named officers can both log in and receive it.

2. **Transfer Wix site ownership** to an account tied to the shared mailbox.
   Who: Ary initiates, org account accepts.
   Path: from the site's Home page in the Wix Dashboard, **Site Actions → Transfer site**,
   then enter the recipient's Wix account email.
   (https://support.wix.com/en/article/transferring-a-premium-site-to-another-wix-account)
   Preconditions: the receiving Wix account **must already exist** before you send the
   transfer — create/confirm the org's Wix account under the shared mailbox first (step 1).
   If a Premium plan and domain should move with the site, select that when initiating.
   > **The recipient must accept within 3 days, or the invite lapses.** A lapsed invite fails
   > silently — nobody is notified — so confirm acceptance, don't assume it happened.
   Verify: log into Wix from a machine that has never logged in before, using only the org credentials, and confirm the site appears under "My Sites."

3. **Move billing to an org payment method.**
   Who: CCD officer with signing authority on the org card.
   Verify: Wix Dashboard shows the new card on file and a $0 test charge or the next invoice succeeds.

4. **Confirm/transfer domain registrar account** for ccdgroup.org.
   Who: whoever currently holds registrar access + CCD officer.
   Verify: officer logs into the registrar independently (new browser/device) and can view the domain record.

5. **Turn on domain auto-renew and domain lock.**
   Who: registrar account holder.
   Verify: both settings show "ON" in the registrar dashboard — screenshot for the record.

6. **Snapshot current DNS records** (before any cutover changes them).
   Who: Ary or whoever has DNS access.
   Verify: exported file (screenshot or text export) saved into org storage, timestamped.

7. **Set every form's notification address** to a shared mailbox, never a person (see Part 2 row).
   Who: Ary (site builder), verified by CCD.
   Verify: submit each test form (per 06 §A) and confirm the notification lands in the shared inbox, not a personal one.

8. **Set up Google Analytics, Search Console, Business Profile, and social accounts** under org logins (or add org login as owner/admin on existing ones).
   Who: Ary + CCD officer.
   Verify: officer logs into each from a fresh machine and sees full access.

9. **Move media originals and brand guidelines** into org-owned cloud storage.
   Who: Ary.
   Verify: officer opens the folder from their own account, not a shared link.

### B. At launch (during/around domain cutover, per 06 §B)

10. **Re-verify Wix account, billing, and registrar access one more time** immediately before the domain transfer step in 06 §B.1 — this is the point of no return for the live domain.
    Who: CCD officer.
    Verify: same fresh-login test as steps 2–4, repeated.

11. **Re-verify Google Search Console property** still resolves after cutover (06 §B.4) and is owned by the org account.
    Who: CCD officer.
    Verify: property shows "Verified" under the org's Search Console login.

12. **Confirm payment processor is live under the org account**, not a test/sandbox tied to Ary's login.
    Who: CCD officer + Johnny/Tracy (per 05 §C).
    Verify: a real (or Wix test-mode) purchase completes and funds route to the org's connected bank.

### C. Within 30 days after launch

13. **Remove Ary's individual access** from every asset in Part 2 (Wix collaborator role, Google account access, registrar, social admin, cloud storage).
    Who: CCD officer.
    Verify: Ary attempts to log in and confirms access is denied (or CCD confirms Ary is no longer listed as a collaborator/admin anywhere).

14. **Full fresh-machine login test of every credential** in this document, done by someone who has never logged into any of them before.
    Who: a second CCD officer (not the one who did the setup).
    Verify: checklist — each login in Part 2 succeeds from a browser/device with no saved sessions or autofill. An untested credential is not a transferred credential.

15. **Export and archive a copy of the CMS content** (forms data, member list, news/events).
    Who: CCD officer.
    Verify: exported CSV opens and contains current records.

16. **Confirm the legacy live site is still present** in the Wix account, unpublished, untouched.
    Who: CCD officer.
    Verify: visible in Wix Dashboard's site list.

---

## Part 4 — Access matrix

| Role | Wix permission level | CMS access | Editor access | Billing | Who |
|---|---|---|---|---|---|
| Site Owner | Owner (org account) | Full | Full | Full | Org shared mailbox account — `<blank>` |
| Site Admin | **Admin (Co-Owner)** | Full | Full | View only (no card changes without owner) | 1–2 officers — `<blank>`, `<blank>` |
| Content Editor | **CMS Editor** (real Wix preset role) | View/add/modify content in existing collections | **None — no site Editor access** | None | Day-to-day staff — `<blank>` |
| Contractor (temporary) | Time-boxed collaborator role, e.g. **Website Designer** or **Website Manager** as scoped | As scoped to the engagement | As scoped to the engagement | None | Removed at end of engagement — `<blank>` |

Real Wix collaborator role presets (confirmed): **Admin (Co-Owner)**, **Website Manager**,
**Website Designer**, **Back Office Manager**, **Content Writer**, **Blog Editor**, **Blog
Writer**, **Bookings Manager**, and **CMS Editor** — the role to assign day-to-day staff.
**CMS Editor** grants view/add/modify access to content in existing collections, with **no
site Editor access and no Dev Mode access**.
(https://support.wix.com/en/article/roles-permissions-overview)

Nobody except the org account itself holds Owner-level access. All other roles are named individuals or contractors with scoped, revocable permissions.

---

## Part 5 — Recurring maintenance calendar

| Item | How often | Who |
|---|---|---|
| Domain renewal confirmation | Annually (before renewal date) | Site Admin |
| Wix plan renewal / billing confirmation | Annually or per billing cycle | Site Admin |
| Payment card expiry check (Wix billing + payment processor) | Every 6 months | Site Admin |
| Credential/access review (who still has access, remove anyone who's left) | Every 6 months | Site Admin |
| Remove departed staff/volunteer access | Immediately on departure | Site Admin |
| Backup/export of CMS content (forms, members, news) | Quarterly | Content Editor |
| Confirm CMS Backups is turned on (automatic weekly backups) | Every 6 months | Site Admin |
| Take a manual CMS backup | Before any bulk content edit or deletion | Content Editor / Site Admin |
| Confirm shared org mailbox is still monitored | Annually | Site Admin |

---

## Part 6 — Credential handling

- All credentials for assets in Part 2 must live in an **org-owned shared password manager** — never in this document, never over email or chat. Generic options to evaluate: Bitwarden (Organizations), 1Password (Teams/Business), or Dashlane (Business).
- **Zero passwords, keys, or account numbers appear in this file.** Only asset names and "where the credential lives" (i.e., "in the password manager") belong here.
- Enable **2FA** on the org shared mailbox and on the domain registrar account. Store recovery codes in the password manager AND print a physical copy kept in a safe location.
- At least **two people** must be able to recover the org shared mailbox (e.g., two officers each with their own 2FA method registered, or one registered + printed recovery codes accessible to a second officer).
- Never share credentials by pasting into Slack, email, or text — share only via the password manager's built-in sharing feature.

---

## Part 7 — Sign-off

| Asset (Part 2 row) | Confirmed transferred by | Date | Initials |
|---|---|---|---|
| Wix site ownership | `<blank>` | `<blank>` | `<blank>` |
| Wix billing | `<blank>` | `<blank>` | `<blank>` |
| Domain registrar | `<blank>` | `<blank>` | `<blank>` |
| DNS records / snapshot | `<blank>` | `<blank>` | `<blank>` |
| Legacy live site preserved | `<blank>` | `<blank>` | `<blank>` |
| Google Analytics | `<blank>` | `<blank>` | `<blank>` |
| Google Search Console | `<blank>` | `<blank>` | `<blank>` |
| Google Business Profile | `<blank>` | `<blank>` | `<blank>` |
| Form notification inboxes | `<blank>` | `<blank>` | `<blank>` |
| Newsletter/email marketing list | `<blank>` | `<blank>` | `<blank>` |
| Payment processor | `<blank>` | `<blank>` | `<blank>` |
| Media originals + brand guidelines | `<blank>` | `<blank>` | `<blank>` |
| Social accounts | `<blank>` | `<blank>` | `<blank>` |
| Content docs / handoff folder | `<blank>` | `<blank>` | `<blank>` |
| Third-party embeds / API keys | `<blank>` | `<blank>` | `<blank>` |

**Site ownership confirmed transferred on ______ by ______**
