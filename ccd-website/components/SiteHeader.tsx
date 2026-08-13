"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { aliases, navigation, siteConfig, type ActiveNav } from "@/lib/siteData";
import { activeSocials } from "@/lib/siteConfig";
import { splitLocale } from "@/lib/i18n";
import { CartIndicator } from "@/components/ClientBits";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocalePath, useT, useTranslated } from "@/components/LocaleProvider";

const socials = activeSocials();

// Derive the active nav section from the pages data itself, so the header can
// never drift out of sync with what each page declares. The language prefix is
// stripped first: /es/about highlights the same menu item as /about.
function activeFromPath(pathname: string, activeMap: Record<string, ActiveNav>): ActiveNav {
  const { rest } = splitLocale(pathname.split("/").filter(Boolean));
  const first = rest[0] ?? "";
  if (!first) return "home";
  if (first === "projects") return "projects";
  const key = aliases[first] ?? first;
  return activeMap[key] ?? "home";
}

// activeMap comes from the server layout — this component cannot read the
// filesystem, but the nav must still be derived from the pages themselves.
export function SiteHeader({ activeMap }: { activeMap: Record<string, ActiveNav> }) {
  const pathname = usePathname();
  const active = activeFromPath(pathname, activeMap);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useT();
  const path = useLocalePath();
  // Menu labels and links come from the CMS, so one pass translates the wording
  // and points every entry at this language's copy of the page.
  const nav = useTranslated(navigation);

  function closeMenus() {
    setMobileOpen(false);
    setOpen(null);
  }

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        {t("Skip to content")}
      </a>
      <div className="utility-bar">
        {nav.utilityLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
        <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phone}</a>
        <span className="utility-socials">
          {socials.map((s) => (
            <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              {s.label}
            </a>
          ))}
        </span>
      </div>
      <div className="main-nav">
        <Link href={path("/")} className="brand" aria-label={t("CCD home")} onClick={closeMenus}>
          <img src="/media/ccd-logo.png" alt="" />
          {/* The organisation's name, not a phrase — a logo lockup reads the
              same in every language. */}
          <span>
            <strong>Cooperative</strong>
            <small>Community Development</small>
          </span>
        </Link>

        {/* Outside .nav-links on purpose: changing language must not require
            opening the menu first, so this stays visible on a phone. */}
        <LanguageSwitcher />

        <button
          className={mobileOpen ? "mobile-toggle open" : "mobile-toggle"}
          type="button"
          aria-label={t("Menu")}
          aria-expanded={mobileOpen}
          aria-controls="site-nav"
          onClick={() => setMobileOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="site-nav" className={mobileOpen ? "nav-links open" : "nav-links"}>
          {nav.groups.map((group) => (
            <div
              className="nav-group"
              key={group.key}
              onMouseEnter={() => setOpen(group.key)}
              onMouseLeave={() => setOpen((value) => (value === group.key ? null : value))}
              onBlur={(event) => {
                // Close a keyboard-opened dropdown when focus leaves the group.
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setOpen((value) => (value === group.key ? null : value));
                }
              }}
            >
              <Link
                href={group.href}
                className={active === group.active ? "active" : ""}
                onFocus={() => setOpen(group.key)}
                onClick={closeMenus}
              >
                {group.label}
              </Link>
              <div className={open === group.key ? "dropdown show" : "dropdown"}>
                {group.items.map((item) => (
                  <Link href={item.href} key={item.href} onClick={closeMenus}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {nav.simpleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={active === link.active ? "active" : ""}
              onClick={closeMenus}
            >
              {link.label}
            </Link>
          ))}
          {/* The utility bar is hidden below 1050px, and its links — facilities
              booking especially — appear nowhere else. Repeat them inside the
              menu so a phone is not missing pages a desktop has. */}
          <div className="nav-utility">
            {nav.utilityLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeMenus}>
                {link.label}
              </Link>
            ))}
          </div>
          <CartIndicator />
          <Link className="nav-donate" href={nav.donateCta.href} onClick={closeMenus}>
            {nav.donateCta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
