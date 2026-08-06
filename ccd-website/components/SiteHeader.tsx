"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { aliases, navGroups, pages, siteConfig, type ActiveNav } from "@/lib/siteData";
import { activeSocials } from "@/lib/siteConfig";

const socials = activeSocials();

const simpleLinks = [
  { label: "Projects", href: "/projects", active: "projects" },
  { label: "News", href: "/news", active: "news" },
  { label: "Contact", href: "/contact", active: "contact" },
] as const;

// Derive the active nav section from the pages data itself, so the header can
// never drift out of sync with what each page declares.
function activeFromPath(pathname: string): ActiveNav {
  if (pathname === "/") return "home";
  const first = pathname.split("/")[1] ?? "";
  if (first === "projects") return "projects";
  const key = aliases[first] ?? first;
  return pages[key]?.active ?? "home";
}

export function SiteHeader() {
  const pathname = usePathname();
  const active = activeFromPath(pathname);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMenus() {
    setMobileOpen(false);
    setOpen(null);
  }

  return (
    <header className="site-header">
      <div className="utility-bar">
        <Link href="/clean-and-green">Clean &amp; Green Services</Link>
        <Link href="/tool-bank">Tool Bank</Link>
        <Link href="/contact#booking">Facilities Booking</Link>
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
        <Link href="/" className="brand" aria-label="CCD home" onClick={closeMenus}>
          <img src="/media/ccd-logo.png" alt="" />
          <span>
            <strong>Cooperative</strong>
            <small>Community Development</small>
          </span>
        </Link>

        <button
          className={mobileOpen ? "mobile-toggle open" : "mobile-toggle"}
          type="button"
          aria-label="Menu"
          aria-expanded={mobileOpen}
          aria-controls="site-nav"
          onClick={() => setMobileOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="site-nav" className={mobileOpen ? "nav-links open" : "nav-links"}>
          {navGroups.map((group) => (
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
          {simpleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={active === link.active ? "active" : ""}
              onClick={closeMenus}
            >
              {link.label}
            </Link>
          ))}
          <Link className="nav-donate" href="/donate" onClick={closeMenus}>
            Donate
          </Link>
        </nav>
      </div>
    </header>
  );
}
