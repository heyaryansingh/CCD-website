# Developer notes

Findings that are expensive to rediscover and are not obvious from the code.
Architecture lives in [`ccd-website/README.md`](../ccd-website/README.md); the
staff-facing overview is [`HANDOFF.md`](../HANDOFF.md) at the repository root.

## Colour

Run `node scripts/contrast-check.js`. It measures all 21 CCD token pairs against
WCAG 2.1 and then asserts the ten prescribed fixes still hold, exiting non-zero if
one has been reverted. It is a regression guard, not a report — keep it passing.

The headline numbers it encodes:

- Gold `#fec630` as text on white is **1.57:1**. It fails even as large text, and
  no gold-family hue reaches 4.5:1 on white while still reading as gold (the
  nearest passing solve, `#91711b`, is olive-brown). Gold is a fill behind dark
  text, or text on dark. Light backgrounds use `#8a6d00`.
- The footer needs its own muted token: `#5b6b72` passes on white (5.54:1) but not
  on the `#1a1a1a` footer. `#77848a` is the darkest value that clears 4.5:1 there.
- Links are `#067db0`, not the original blue, which measured below 4.5:1 on white.

The 4th Brew tan `#c2b27f` measures **2.11:1** on white — same rule as CCD gold,
fill only. As an eyebrow over a band photo it currently passes because those photos
are dark (measured 5.16–7.89:1); it would fall to 3.77:1 over a bright one.
**Re-measure if anyone swaps a band photo.**

## Shopify / The 4th Brew

**Shopify 301s every cart link to whatever its primary domain currently is.**
Verified: the raw `nxvrcp-ea.myshopify.com` handle redirects to `the4thbrew.com`,
and a cart permalink lands on a real Shop Pay checkout.

The consequence gates the whole domain-retirement plan: redirecting
`the4thbrew.com` to CCD **while it is still Shopify's primary domain breaks every
checkout**. The order is: add `shop.the4thbrew.com` in Shopify → Settings →
Domains, make it primary, *then* update `siteConfig.links.brewShop`, *then* retire
`the4thbrew.com`.

Storefront facts, harvested from the public storefront (admin was never reachable):
theme is **Dawn 15.2.0** (live theme named "Working") plus GemPages; fonts Inknut
Antiqua and Libre Baskerville; colours `#108474` teal, `#c2b27f` tan, `#231f20`
ink. The useful find was one line-art icon per brewing method, now illustrating the
eight cards on `/brewing`. Originals are archived on the shared drive at
`website-media-filebase/11-4th-brew-shopify/`.

Not obtained, if anyone needs them: the theme ZIP, `settings_data.json`, and any
unpublished themes. A theme named "Zoe" was asked about and does not exist among
the published ones.

## Hosting

`ccdgroup.vercel.app` is a **manually pinned alias** — it does not follow
production deploys. Either add it under Project Settings → Domains, or re-alias
after each deploy. This disappears as a problem once the Cloudflare move is done.

The current live `ccdgroup.org` (Wix) redirects the apex to `www`. The new site
does the **opposite** — `www` 301s to the bare domain, and that redirect lives in
`next.config.ts` rather than in a host dashboard, so it travels with the repository.

## History

The Next.js app was originally a separate repository with no remote, gitignored
inside this one — so cloning this project did not get you the website. It was
folded in on 2026-08-06. Its nine earlier commits are preserved at
[`ccd-website-git-history.txt`](ccd-website-git-history.txt).

Most of this repository's older commit history is Wix Studio work. That site still
serves `ccdgroup.org` today; the migration kit written for it was removed at the
2026-08-21 handoff and is recoverable from git history if the Wix site ever needs
editing again before cutover.
