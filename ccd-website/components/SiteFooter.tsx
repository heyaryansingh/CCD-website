"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { navigation, siteConfig } from "@/lib/siteData";
import { activeSocials } from "@/lib/siteConfig";
import { submitForm } from "@/lib/submit";
import { useT, useTranslated } from "@/components/LocaleProvider";

const socials = activeSocials();

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const t = useT();
  // The columns used to be hardcoded here, which meant editing them in the CMS
  // changed the menu and not the footer. They come from the same file now.
  const nav = useTranslated(navigation);
  const org = useTranslated(siteConfig.org);

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
          <p className="eyebrow">{t("STAY CONNECTED")}</p>
          <h2>{t("Get the block report.")}</h2>
          <p>{t("Markets, meetings, volunteer days, and campaign updates from CCD.")}</p>
        </div>
        <form onSubmit={subscribe} className="newsletter-form">
          {subscribed ? (
            <strong>{t("Thanks. You are on the list.")}</strong>
          ) : (
            <>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t("Email address")}
                aria-label={t("Email address")}
                required
              />
              <button type="submit" disabled={busy}>
                {busy ? "..." : t("Subscribe")}
              </button>
              {failed ? (
                <p className="form-error" role="alert">
                  {t("Something went wrong — email {email} to join the list.").replace(
                    "{email}",
                    siteConfig.contact.email,
                  )}
                </p>
              ) : null}
            </>
          )}
        </form>
      </section>

      <div className="footer-main">
        <div className="footer-brand">
          <img src="/media/ccd-logo.png" alt="" />
          <h2>{org.name}</h2>
          <p>{org.tagline}</p>
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
        {nav.footerColumns.map((column) => (
          <div key={column.title}>
            <h3>{column.title}</h3>
            {column.links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        ))}
        <div>
          <h3>{t("Contact")}</h3>
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phone}</a>
          <span>{siteConfig.contact.addressLine1}</span>
          <span>{siteConfig.contact.addressLine2}</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span suppressHydrationWarning>
          {t("Copyright {year} {org}")
            .replace("{year}", String(new Date().getFullYear()))
            .replace("{org}", siteConfig.org.legalName)}
        </span>
        <span className="footer-member">
          <img
            className="footer-mano"
            src="/media/logo-maryland-nonprofits.png"
            alt={t("Proud member of Maryland Nonprofits")}
          />
          {t("Built for the block.")}
        </span>
      </div>
    </footer>
  );
}
