# 06 — QA, Cutover, Rollback

## A. Staging QA (on the free `*.wixsite.com` / `*.wixstudio.io` preview URL — live site untouched)
Run the full list; every line must pass before touching the domain.

**Pages & content**
- [ ] All 18 pages + 4 project detail pages render, desktop + mobile breakpoints
- [ ] Copy matches the Next.js reference (spot-check hero + one section per page)
- [ ] Every image loads; alts present; no image appears as more than one page hero (drone-2 on brick+contact is the known allowed reuse)
- [ ] Membership shows the 5 real tiers with +$5 setup and vote markers
- [ ] Clean & Green shows the real 9 services; NO before/after slider unless real pairs were added
- [ ] Team grid renders from CMS incl. an open-role card; add a test intern row → appears without layout break → delete it

**Links (click each)**
- [ ] PayPal donate opens the CCD hosted button page
- [ ] fundraisingbrick.com/online-orders/ccd/ loads
- [ ] Facilities booking Microsoft Form loads
- [ ] Vendor Google Form loads
- [ ] Facebook @CoopCommunity + Instagram @ccd_group profiles load
- [ ] tel: link dials (410) 205-2488 on mobile
- [ ] Every internal nav/footer/CTA link goes to the right page (no 404)

**Forms, automations, accounts**
- [ ] Submit each form with test data → row lands in CMS, staff notification arrives at the right inbox, visitor auto-reply arrives
- [ ] Newsletter signup → double-opt-in email → confirm → appears in audience
- [ ] Buy the Resident plan with a test card (Wix Payments test mode) → account created → welcome email → cancel test subscription
- [ ] AI site chat answers a basic question ("How do I book Clean & Green?") and hands off an unknown one

**Tech**
- [ ] GA4 property connected (Marketing Integrations) and recording page views
- [ ] SEO: unique title + meta description per page (copy from `siteData.ts` `title`/`description`)
- [ ] Favicon set (CCD logo)
- [ ] Lighthouse mobile spot-check on Home + Clean & Green (no red performance scores)

## B. Cutover (only after A passes + Johnny/Tracy sign off on the staging URL)
1. Wix Dashboard (new site) → Settings → Domains → **Connect ccdgroup.org** → since the domain is already in the same Wix account serving the old site, use **Transfer domain to this site**. This is the entire cutover — one action.
2. Immediately re-test: https://ccdgroup.org loads new site, SSL active (Wix auto-issues).
3. **301 redirects** (new site → Settings → SEO → URL Redirect Manager):
| Old Wix path | New path |
|---|---|
| /connect | /events |
| /general-6 | /news |
| /what-is-a-co-op | /what-is-a-coop |
| /join | /membership |
| /expansion-goals | /center-for-social-impact |
| /brickcampaign | /brick-campaign |
| /projects-3 | /projects |
| /single-project | /coop-market |
| /cleanandgreenteam | /clean-and-green |
| /work | /clean-and-green |
| /general-1 | /programs |
| /contact-us | /contact |
4. Google Search Console: verify property (or re-verify), submit new sitemap (Wix auto-generates /sitemap.xml).
5. Keep the OLD site untouched in the account (unpublished state is fine) for 60 days as content archive — it also still holds the original before/after photos and any media not yet exported.

## C. Rollback
Domain transfer is reversible: Settings → Domains → transfer ccdgroup.org back to the old site. Minutes, no data loss. Do this if anything critical breaks post-cutover; fix on staging; re-cut.

## D. Post-launch (week 1)
- Watch Wix Inbox + form notifications daily; confirm no spam floods (enable reCAPTCHA on forms if so).
- Publish one fresh News item (signals liveness to visitors + search).
- Export old-site before/after photos → BeforeAfterPairs CMS → slider goes live.
- Collect team headshots → Team CMS.
- First "Block Report" email to the seeded audience.
