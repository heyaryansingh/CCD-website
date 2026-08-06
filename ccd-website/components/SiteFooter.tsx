"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/siteData";
import { activeSocials } from "@/lib/siteConfig";
import { submitForm } from "@/lib/submit";

const socials = activeSocials();

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    const { ok } = await submitForm("newsletter", { email: email.trim() });
    setBusy(false);
    setFailed(!ok);
    if (ok) setSubscribed(true);
  }

  return (
    <footer className="site-footer">
      <section className="newsletter">
        <div>
          <p className="eyebrow">STAY CONNECTED</p>
          <h2>Get the block report.</h2>
          <p>Markets, meetings, volunteer days, and campaign updates from CCD.</p>
        </div>
        <form onSubmit={subscribe} className="newsletter-form">
          {subscribed ? (
            <strong>Thanks. You are on the list.</strong>
          ) : (
            <>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                aria-label="Email address"
                required
              />
              <button type="submit" disabled={busy}>
                {busy ? "..." : "Subscribe"}
              </button>
              {failed ? (
                <p className="form-error" role="alert">
                  Something went wrong — email {siteConfig.contact.email} to join the list.
                </p>
              ) : null}
            </>
          )}
        </form>
      </section>

      <div className="footer-main">
        <div className="footer-brand">
          <img src="/media/ccd-logo.png" alt="" />
          <h2>{siteConfig.org.name}</h2>
          <p>{siteConfig.org.tagline}</p>
          {socials.length ? (
            <div className="footer-socials">
              {socials.map((s) => (
                <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
        <div>
          <h3>Quick Links</h3>
          <Link href="/about">About</Link>
          <Link href="/membership">Membership</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/news">News &amp; Events</Link>
        </div>
        <div>
          <h3>Programs</h3>
          <Link href="/center-for-social-impact">Center for Social Impact</Link>
          <Link href="/clean-and-green">Clean &amp; Green</Link>
          <Link href="/coop-market">Co-op Market</Link>
          <Link href="/tool-bank">Tool Bank</Link>
          <Link href="/shop">4th Brew Coffee</Link>
        </div>
        <div>
          <h3>Contact</h3>
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phone}</a>
          <span>{siteConfig.contact.addressLine1}</span>
          <span>{siteConfig.contact.addressLine2}</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span suppressHydrationWarning>Copyright {new Date().getFullYear()} {siteConfig.org.legalName}</span>
        <span className="footer-member">
          <img className="footer-mano" src="/media/logo-maryland-nonprofits.png" alt="Proud member of Maryland Nonprofits" />
          Built for the block.
        </span>
      </div>
    </footer>
  );
}
