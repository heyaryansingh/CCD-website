"use client";

import {
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  cleanGreenServices,
  events,
  homeHeroSlides,
  interns,
  leadership,
  news,
  partnerNames,
  siteConfig,
  type BrewVariant,
} from "@/lib/siteData";
import { actionLink } from "@/lib/siteConfig";
import {
  addLine,
  cartCount,
  cartTotal,
  checkoutUrl,
  clearCart,
  getServerSnapshot,
  getSnapshot,
  removeLine,
  setQty,
  subscribe,
} from "@/lib/brewCart";
import { submitForm } from "@/lib/submit";
import { useLocalePath, useT, useTranslated } from "@/components/LocaleProvider";

function initials(name: string | null) {
  if (!name) return "+";
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
}

// Renders modal content in a portal on document.body so it always centers in
// the CURRENT viewport (position:fixed can otherwise be hijacked by ancestor
// transform/animation containing blocks and land far down the page), and
// locks body scroll while open.
function ModalShell({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        backdropRef.current?.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );

    // Move focus into the dialog (close button is first).
    window.setTimeout(() => focusables()[0]?.focus(), 0);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        // Simple focus trap: wrap Tab within the dialog.
        const items = focusables();
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      restoreFocusRef.current?.focus?.();
    };
  }, [onClose]);

  // Only ever mounted from user interaction, so document always exists here.
  if (typeof document === "undefined") return null;
  return createPortal(
    <div
      className="modal-backdrop"
      onClick={onClose}
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>,
    document.body
  );
}

function Avatar({ name, photo, large }: { name: string | null; photo?: string; large?: boolean }) {
  if (photo) {
    return <img className={large ? "avatar large" : "avatar"} src={photo} alt="" />;
  }
  return <span className={large ? "avatar large" : "avatar"}>{initials(name)}</span>;
}

export function HomeHero() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = useT();
  const path = useLocalePath();
  const slides = useTranslated(homeHeroSlides);
  const current = slides[slide % slides.length];

  useEffect(() => {
    // Respect reduced-motion and the pause control: no auto-advance.
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setSlide((value) => (value + 1) % slides.length);
    }, 5800);
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  return (
    <section className="home-hero">
      {slides.map((item, index) => (
        <img
          key={item.src}
          className={index === slide ? "active" : ""}
          src={item.src}
          alt={item.alt}
        />
      ))}
      <div className="hero-scrim" />
      <div className="hero-rings" aria-hidden="true" />
      <div className="home-hero-content">
        <p className="eyebrow">{current.kicker}</p>
        <h1>
          {t("Building")}
          <br />
          {t("the block.")}
          <br />
          <em>{t("Brick by brick.")}</em>
        </h1>
        <p>
          {t(
            "A member-owned cooperative turning vacant spaces into markets, gardens, services, and neighborhood wealth in Baltimore's 21229.",
          )}
        </p>
        <div className="hero-actions">
          <Link className="button gold" href={path("/membership")}>
            {t("Become a member")}
          </Link>
          <Link className="button ghost" href={path("/projects")}>
            {t("See the work")}
          </Link>
        </div>
      </div>
      <div className="hero-dots" aria-label={t("Hero slides")}>
        {slides.map((item, index) => (
          <button
            key={item.src}
            type="button"
            className={index === slide ? "active" : ""}
            onClick={() => {
              setSlide(index);
              setPaused(true);
            }}
            aria-label={t("Show slide {n}").replace("{n}", String(index + 1))}
          />
        ))}
        <button
          type="button"
          className="hero-pause"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? t("Play slideshow") : t("Pause slideshow")}
          aria-pressed={paused}
        >
          {paused ? "▶" : "❚❚"}
        </button>
      </div>
      <span className="hero-counter">
        {String(slide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </span>
    </section>
  );
}

type Person = {
  name: string | null;
  role: string;
  tagline?: string;
  bio?: string;
  quote?: string;
  email?: string;
  photo?: string;
  card?: string;
};

export function AboutTeam() {
  const [active, setActive] = useState<Person | null>(null);
  const [showAllInterns, setShowAllInterns] = useState(false);
  const t = useT();
  const team = useTranslated(leadership);
  const allInterns = useTranslated(interns);
  const partnerList = useTranslated(partnerNames);
  const visibleInterns = showAllInterns ? allInterns : allInterns.slice(0, 6);

  return (
    <section id="team" className="section team-section">
      <div className="section-heading">
        <p className="eyebrow">{t("TEAM & PARTNERS")}</p>
        <h2>{t("The people moving CCD forward.")}</h2>
        <p>
          {t(
            "Leadership, interns, open roles, and partner organizations turn the cooperative model into daily work.",
          )}
        </p>
      </div>

      <div className="person-grid">
        {team.map((person, index) => (
          <button
            type="button"
            className="person-card"
            key={person.name}
            onClick={() => setActive(person)}
            data-reveal
            style={{ transitionDelay: `${Math.min(index, 5) * 90}ms` }}
          >
            <Avatar name={person.name} photo={person.photo} />
            <strong>{person.name}</strong>
            <small>{person.role}</small>
            <p>{person.tagline}</p>
          </button>
        ))}
      </div>

      <div className="intern-head">
        <div>
          <p className="eyebrow">{t("INTERNS & FELLOWS")}</p>
          <h3>{t("Open lanes for new talent.")}</h3>
        </div>
        <button type="button" className="button line" onClick={() => setShowAllInterns((value) => !value)}>
          {showAllInterns ? t("Show less") : t("Show all roles")}
        </button>
      </div>
      <div className="person-grid intern-grid">
        {visibleInterns.map((person, index) => (
          <button
            type="button"
            className={person.name ? "person-card" : "person-card open-role"}
            key={`${person.role}-${person.name ?? "open"}`}
            onClick={() => setActive(person)}
            data-reveal
            style={{ transitionDelay: `${Math.min(index, 5) * 90}ms` }}
          >
            <Avatar name={person.name} photo={person.photo} />
            <strong>{person.name || t("Open Position")}</strong>
            <small>{person.role}</small>
            {/* Card shows the short line; the full bio is in the panel. Interns
                write a paragraph, and a paragraph per card made the grid ragged. */}
            <p>{person.name ? (person.tagline ?? person.bio) : t("A future CCD intern or fellow role.")}</p>
          </button>
        ))}
      </div>

      <div className="partner-strip">
        {partnerList.map((partner) => (
          <span key={partner}>{partner}</span>
        ))}
      </div>

      {active ? (
        <ModalShell onClose={() => setActive(null)}>
          <article className="bio-modal" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setActive(null)}
              aria-label={t("Close bio")}
            >
              x
            </button>
            <Avatar name={active.name} photo={active.photo} large />
            <p className="eyebrow">{active.role}</p>
            <h2>{active.name || t("Open Position")}</h2>
            <p>{active.bio || t("CCD is building this role as the program grows.")}</p>
            {active.quote ? <blockquote>{active.quote}</blockquote> : null}
            {active.card ? (
              <img
                className="bio-card"
                src={active.card}
                alt={t("{name} introduction card").replace("{name}", active.name ?? "")}
                loading="lazy"
              />
            ) : null}
            {active.email ? <a href={`mailto:${active.email}`}>{t("Email")}</a> : null}
          </article>
        </ModalShell>
      ) : null}
    </section>
  );
}

export function MembershipFaq() {
  const [open, setOpen] = useState(0);
  const t = useT();
  const faqs = [
    {
      q: t("Do I have to live in the 21229 to join?"),
      a: t(
        "No. Non-Resident membership is open to anyone who believes in the mission. Resident membership is for people living in the community CCD serves.",
      ),
    },
    {
      q: t("What does my monthly fee actually fund?"),
      a: t(
        "Dues fund CCD programs directly: green spaces, the Tool Bank, markets, events, and the Center for Social Impact.",
      ),
    },
    {
      q: t("How does voting work?"),
      a: t(
        "Every voting membership carries exactly one vote. Major decisions come to the membership at community meetings.",
      ),
    },
    {
      q: t("Can I cancel anytime?"),
      a: t("Yes. Memberships are month-to-month with no long-term commitment."),
    },
    {
      q: t("Is my membership tax-deductible?"),
      a: t("CCD is a nonprofit; consult your tax advisor on dues versus donations."),
    },
  ];

  return (
    <section className="section faq-section">
      <div className="section-heading">
        <h2>{t("Questions, answered.")}</h2>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={faq.q}>
            <button
              type="button"
              aria-expanded={open === index}
              onClick={() => setOpen(open === index ? -1 : index)}
            >
              <span>{faq.q}</span>
              <b aria-hidden="true" className={open === index ? "faq-mark open" : "faq-mark"}>+</b>
            </button>
            {open === index ? <p className="faq-answer">{faq.a}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export function EstimateForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const t = useT();
  const services = useTranslated(cleanGreenServices);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    if (!name || !phone) {
      setError(t("Name and phone are required."));
      return;
    }
    setError(null);
    setBusy(true);
    const { ok } = await submitForm("estimate", {
      name,
      phone,
      address: String(data.get("address") ?? "").trim(),
      service: String(data.get("service") ?? "").trim(),
      details: String(data.get("details") ?? "").trim(),
      website: String(data.get("website") ?? ""),
    });
    setBusy(false);
    if (!ok) {
      setError(
        t("Something went wrong sending your request. Please email {email} directly.").replace(
          "{email}",
          siteConfig.contact.cleanGreenEmail,
        ),
      );
      return;
    }
    setSent(true);
  }

  return (
    <section id="estimate" className="section form-band dark-form">
      <div>
        <p className="eyebrow">{t("FREE ESTIMATE")}</p>
        <h2>{t("Tell us about the job.")}</h2>
        <p>{t("Resident members receive 15% off Clean & Green services.")}</p>
      </div>
      <form onSubmit={submit} className="ccd-form">
        {sent ? (
          <strong>{t("Thanks. CCD will follow up about your estimate.")}</strong>
        ) : (
          <>
            <label>
              {t("Name")}
              <input name="name" required />
            </label>
            <label>
              {t("Phone")}
              <input name="phone" type="tel" required />
            </label>
            <label className="full">
              {t("Property address")}
              <input name="address" />
            </label>
            <label className="full">
              {t("Service")}
              <select name="service" defaultValue={services[0]}>
                {services.map((service) => (
                  <option key={service}>{service}</option>
                ))}
              </select>
            </label>
            <label className="full">
              {t("Details")}
              <textarea name="details" rows={4} />
            </label>
            <input className="hp-field" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            {error ? <p className="form-error" role="alert">{error}</p> : null}
            <button type="submit" disabled={busy}>
              {busy ? t("Sending...") : t("Request my free estimate")}
            </button>
          </>
        )}
      </form>
    </section>
  );
}

export function DonatePanel() {
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const t = useT();
  const digits = custom.replace(/[^0-9]/g, "");
  const chosenAmount = digits || String(amount);
  const chosen = `$${chosenAmount}`;
  const baseDonate = actionLink(siteConfig.links.paypalDonate, "Donation to CCD");
  // Carry the selected amount into PayPal's hosted donate page (its links
  // accept an `amount` query param); mailto fallback gets it in the subject.
  const donateHref = baseDonate.startsWith("http")
    ? `${baseDonate}${baseDonate.includes("?") ? "&" : "?"}amount=${chosenAmount}`
    : baseDonate;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    if (!name || !email) {
      setError(t("Name and email are required."));
      return;
    }
    setError(null);
    setBusy(true);
    const { ok } = await submitForm("volunteer", {
      name,
      email,
      skills: String(data.get("skills") ?? "").trim(),
      availability: String(data.get("availability") ?? "").trim(),
      website: String(data.get("website") ?? ""),
    });
    setBusy(false);
    if (!ok) {
      setError(
        t("Something went wrong. Please email {email} directly.").replace(
          "{email}",
          siteConfig.contact.email,
        ),
      );
      return;
    }
    setSent(true);
  }

  return (
    <section id="volunteer" className="section donate-grid">
      <div className="donation-box">
        <p className="eyebrow">{t("DONATE")}</p>
        <h2>{t("{amount} toward the block.").replace("{amount}", chosen)}</h2>
        <div className="amounts">
          {[25, 50, 100, 500].map((value) => (
            <button
              key={value}
              type="button"
              className={!digits && amount === value ? "active" : ""}
              aria-pressed={!digits && amount === value}
              onClick={() => {
                setAmount(value);
                setCustom("");
              }}
            >
              ${value}
            </button>
          ))}
        </div>
        <input
          value={custom}
          onChange={(event) => setCustom(event.target.value)}
          placeholder={t("$ custom")}
          aria-label={t("Custom donation amount")}
        />
        <a className="button gold" href={donateHref} target="_blank" rel="noopener noreferrer">
          {t("Continue donation")}
        </a>
      </div>
      <form onSubmit={submit} className="ccd-form">
        <p className="eyebrow">{t("VOLUNTEER")}</p>
        <h2>{t("Give time, not just money.")}</h2>
        {sent ? (
          <strong>{t("Thanks. CCD will follow up about volunteering.")}</strong>
        ) : (
          <>
            <label>
              {t("Name")}
              <input name="name" required />
            </label>
            <label>
              {t("Email")}
              <input name="email" type="email" required />
            </label>
            <label className="full">
              {t("Skills & interests")}
              <input name="skills" placeholder={t("gardening, carpentry, photography")} />
            </label>
            <label className="full">
              {t("Availability")}
              {/* The value posted to the form store stays English on purpose, so
                  submissions from every language land in one readable column. */}
              <select name="availability" defaultValue="Weekends">
                <option value="Weekends">{t("Weekends")}</option>
                <option value="Weekdays">{t("Weekdays")}</option>
                <option value="Evenings">{t("Evenings")}</option>
              </select>
            </label>
            <input className="hp-field" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            {error ? <p className="form-error" role="alert">{error}</p> : null}
            <button type="submit" disabled={busy}>
              {busy ? t("Sending...") : t("Sign up to volunteer")}
            </button>
          </>
        )}
      </form>
    </section>
  );
}

// Size + grind pickers over a Shopify cart permalink. Same shape as
// DonatePanel above: local state in, one external URL out. Deliberately not a
// cart — Shopify already has one, and it handles PCI, tax, and shipping.
export function BuyPicker({
  productTitle,
  image,
  variants,
}: {
  productTitle: string;
  image: string;
  variants: BrewVariant[];
}) {
  // Shopify variant titles are "<size> / <grind>". Derive the two dropdowns
  // from the live titles so a new size or grind added in Shopify just appears.
  const sizes = Array.from(new Set(variants.map((v) => v.title.split(" / ")[0])));
  const grinds = Array.from(new Set(variants.map((v) => v.title.split(" / ")[1] ?? "")));
  const [size, setSize] = useState(sizes[0]);
  const [grind, setGrind] = useState(grinds[0]);
  const [justAdded, setJustAdded] = useState(false);
  const t = useT();
  const wanted = [size, grind].filter(Boolean).join(" / ");
  const variant = variants.find((v) => v.title === wanted);

  return (
    <div className="buy-picker">
      <label>
        <span>{t("Size")}</span>
        <select
          value={size}
          onChange={(event) => setSize(event.target.value)}
          aria-label={`${productTitle} — ${t("size")}`}
        >
          {sizes.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      {grinds.filter(Boolean).length > 1 ? (
        <label>
          <span>{t("Grind")}</span>
          <select
            value={grind}
            onChange={(event) => setGrind(event.target.value)}
            aria-label={`${productTitle} — ${t("grind")}`}
          >
            {grinds.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
      ) : null}
      {variant?.available ? (
        <button
          type="button"
          className="button gold"
          onClick={() => {
            addLine({
              variantId: variant.id,
              product: productTitle,
              variant: variant.title,
              price: variant.price,
              image,
            });
            setJustAdded(true);
          }}
        >
          {t("Add to cart")} &mdash; ${variant.price}
        </button>
      ) : (
        <span className="button gold is-disabled" aria-disabled="true">
          {variant ? t("Sold out") : t("Unavailable")}
        </span>
      )}
      {/* Announced to screen readers; the visible cart below is the real feedback. */}
      <p className="buy-added" role="status" aria-live="polite">
        {justAdded
          ? t("{item} added to cart").replace("{item}", `${productTitle} — ${wanted}`)
          : ""}
      </p>
    </div>
  );
}

// Reads the module-level cart store. No Context provider — PageView is a server
// component, and the header needs the same data from outside the page tree.
export function useBrewCart() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Header cart button. Renders nothing until something is in the cart, so the
// other 18 CCD pages are visually unchanged.
export function CartIndicator() {
  const lines = useBrewCart();
  const count = cartCount(lines);
  const t = useT();
  const path = useLocalePath();
  if (!count) return null;
  return (
    <Link className="nav-cart" href={path("/shop#cart")}>
      {t("Cart")}
      <span aria-hidden="true">{count}</span>
      <span className="sr-only">
        {count === 1 ? t("1 item in cart") : t("{n} items in cart").replace("{n}", String(count))}
      </span>
    </Link>
  );
}

// The cart itself. Every line goes into ONE Shopify permalink, so a shopper can
// check out with three different coffees in a single handoff.
export function BrewCart() {
  const lines = useBrewCart();
  const t = useT();
  if (!lines.length) return null;

  const total = cartTotal(lines);
  const href = checkoutUrl(siteConfig.links.brewShop, lines);

  return (
    <div className="brew-cart" id="cart">
      <div className="brew-cart-head">
        <h3>{t("Your cart")}</h3>
        <button type="button" className="brew-cart-clear" onClick={clearCart}>
          {t("Clear")}
        </button>
      </div>
      <ul className="brew-cart-lines">
        {lines.map((line) => (
          <li key={line.variantId}>
            <img src={line.image} alt="" loading="lazy" />
            <div className="brew-cart-line-copy">
              <strong>{line.product}</strong>
              <span>{line.variant}</span>
            </div>
            <div className="brew-cart-qty">
              <button
                type="button"
                onClick={() => setQty(line.variantId, line.qty - 1)}
                aria-label={`${t("Decrease")} ${line.product} ${line.variant}`}
              >
                &minus;
              </button>
              <span aria-live="polite">{line.qty}</span>
              <button
                type="button"
                onClick={() => setQty(line.variantId, line.qty + 1)}
                aria-label={`${t("Increase")} ${line.product} ${line.variant}`}
              >
                +
              </button>
            </div>
            <span className="brew-cart-price">
              ${(Number(line.price) * line.qty).toFixed(2)}
            </span>
            <button
              type="button"
              className="brew-cart-remove"
              onClick={() => removeLine(line.variantId)}
              aria-label={`${t("Remove")} ${line.product} ${line.variant}`}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
      <div className="brew-cart-foot">
        <p>
          <span>{t("Subtotal")}</span>
          <strong>${total.toFixed(2)}</strong>
        </p>
        <a className="button gold" href={href} target="_blank" rel="noopener noreferrer">
          {t("Check out")} &mdash; ${total.toFixed(2)}
        </a>
      </div>
      <p className="brew-cart-note">
        {t(
          "Shipping and tax are calculated at checkout, which runs on The 4th Brew's secure Shopify store.",
        )}
      </p>
    </div>
  );
}

export function ContactPanel() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const t = useT();
  const bookingHref = actionLink(
    siteConfig.links.facilitiesBooking,
    "Facilities booking",
    siteConfig.contact.facilitiesEmail
  );
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    siteConfig.contact.mapQuery
  )}&output=embed`;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const first = String(data.get("first") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!first || !email || !message) {
      setError(t("First name, email, and message are required."));
      return;
    }
    setError(null);
    setBusy(true);
    const { ok } = await submitForm("contact", {
      first,
      last: String(data.get("last") ?? "").trim(),
      email,
      topic: String(data.get("topic") ?? "").trim(),
      message,
      website: String(data.get("website") ?? ""),
    });
    setBusy(false);
    if (!ok) {
      setError(
        t("Something went wrong. Please email {email} directly.").replace(
          "{email}",
          siteConfig.contact.email,
        ),
      );
      return;
    }
    setSent(true);
  }

  return (
    <section id="booking" className="section contact-grid">
      <div className="map-card">
        <iframe
          title={t("CCD location map")}
          className="contact-map"
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="map-card-body">
          <h2>{siteConfig.contact.addressLine1}</h2>
          <p>{siteConfig.contact.addressLine2}</p>
          <p>
            <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phone}</a>
            {" · "}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </p>
          <a className="button ghost" href={bookingHref} target="_blank" rel="noopener noreferrer">
            {t("Book facilities")}
          </a>
        </div>
      </div>
      <form onSubmit={submit} className="ccd-form">
        <p className="eyebrow">{t("MESSAGE CCD")}</p>
        {sent ? (
          <strong>{t("Thanks. Your message is ready for CCD follow-up.")}</strong>
        ) : (
          <>
            <label>
              {t("First name")}
              <input name="first" required />
            </label>
            <label>
              {t("Last name")}
              <input name="last" />
            </label>
            <label>
              {t("Email")}
              <input name="email" type="email" required />
            </label>
            <label>
              {t("Topic")}
              {/* Values stay English so every submission lands in one column
                  whatever language the visitor wrote in. */}
              <select name="topic" defaultValue="General question">
                <option value="General question">{t("General question")}</option>
                <option value="Membership">{t("Membership")}</option>
                <option value="Facilities booking">{t("Facilities booking")}</option>
                <option value="Clean & Green">{t("Clean & Green")}</option>
              </select>
            </label>
            <label className="full">
              {t("Message")}
              <textarea name="message" rows={5} required />
            </label>
            <input className="hp-field" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            {error ? <p className="form-error" role="alert">{error}</p> : null}
            <button type="submit" disabled={busy}>
              {busy ? t("Sending...") : t("Send message")}
            </button>
          </>
        )}
      </form>
    </section>
  );
}

// Drag-to-reveal before/after slider (pointer + keyboard accessible).
export function BeforeAfter({
  eyebrow,
  title,
  body,
  pairs,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  pairs: { before: string; after: string; label: string }[];
}) {
  return (
    <section className="section beforeafter-section">
      <div className="section-heading">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {body ? <p>{body}</p> : null}
      </div>
      <div className="ba-grid">
        {pairs.map((pair) => (
          <BeforeAfterCard key={pair.label} pair={pair} />
        ))}
      </div>
    </section>
  );
}

function BeforeAfterCard({ pair }: { pair: { before: string; after: string; label: string } }) {
  const [pos, setPos] = useState(50);
  const t = useT();
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function setFromClientX(clientX: number) {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }

  return (
    <figure className="ba-card">
      <div
        className="ba-wrap"
        ref={wrapRef}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) setFromClientX(e.clientX);
        }}
        onPointerUp={() => (dragging.current = false)}
      >
        <img className="ba-after" src={pair.after} alt={`${pair.label} — ${t("after")}`} />
        <div className="ba-before" style={{ width: `${pos}%` }}>
          <img src={pair.before} alt={`${pair.label} — ${t("before")}`} />
        </div>
        <span className="ba-tag ba-tag-before">{t("Before")}</span>
        <span className="ba-tag ba-tag-after">{t("After")}</span>
        <input
          className="ba-range"
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={t("Reveal {label} before and after").replace("{label}", pair.label)}
        />
        <span className="ba-handle" style={{ left: `${pos}%` }} aria-hidden="true" />
      </div>
      <figcaption>{pair.label}</figcaption>
    </figure>
  );
}

type FeedItem = {
  id: string;
  title: string;
  thumb: string;
  body: string;
  photos: string[];
  meta?: string;
  date?: string;
  day?: string;
  tag?: string;
  tagColor?: string;
  blurb?: string;
  excerpt?: string;
  time?: string;
  location?: string;
  cost?: string;
  instructions?: string[];
  contactEmail?: string;
  contactLabel?: string;
};

export function NewsEvents() {
  const [openId, setOpenId] = useState<string | null>(null);
  const t = useT();
  const eventList = useTranslated(events);
  const newsList = useTranslated(news);
  const allItems = useMemo<FeedItem[]>(
    () => [...eventList, ...newsList],
    [eventList, newsList],
  );
  const modal = allItems.find((item) => item.id === openId) ?? null;

  return (
    <section id="events" className="section news-section">
      <div className="section-heading">
        <p className="eyebrow">{t("UPCOMING")}</p>
        <h2>{t("Events on the block.")}</h2>
      </div>
      <div className="event-list">
        {eventList.map((event, index) => (
          <button
            className="event-row"
            type="button"
            key={event.id}
            onClick={() => setOpenId(event.id)}
            data-reveal
            style={{ transitionDelay: `${Math.min(index, 5) * 80}ms` }}
          >
            <span>
              <b>{event.date}</b>
              <small>{event.day}</small>
            </span>
            <img src={event.thumb} alt="" />
            <div>
              <strong>{event.title}</strong>
              <p>{event.blurb}</p>
            </div>
            <em style={{ color: event.tagColor }}>{event.tag}</em>
          </button>
        ))}
      </div>

      <div className="section-heading">
        <p className="eyebrow">{t("LATEST NEWS")}</p>
        <h2>{t("Updates from CCD.")}</h2>
      </div>
      <div className="card-grid">
        {newsList.map((item, index) => (
          <button
            className="news-card"
            type="button"
            key={item.id}
            onClick={() => setOpenId(item.id)}
            data-reveal
            style={{ transitionDelay: `${Math.min(index, 5) * 90}ms` }}
          >
            <img src={item.thumb} alt="" />
            <span>{item.meta}</span>
            <strong>{item.title}</strong>
            <p>{item.excerpt}</p>
          </button>
        ))}
      </div>

      {modal ? (
        <ModalShell onClose={() => setOpenId(null)}>
          <article className="news-modal" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setOpenId(null)} aria-label={t("Close detail")}>
              x
            </button>
            <img src={modal.thumb} alt="" />
            <p className="eyebrow">{modal.date ? `${modal.day} - ${modal.date}` : modal.meta}</p>
            <h2>{modal.title}</h2>
            <p>{modal.body}</p>
            {modal.time || modal.location || modal.cost ? (
              <div className="modal-facts">
                {modal.time ? <p><strong>{t("When:")}</strong> {modal.time}</p> : null}
                {modal.location ? (
                  <p>
                    <strong>{t("Where:")}</strong> {modal.location}{" "}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(modal.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("Get directions")}
                    </a>
                  </p>
                ) : null}
                {modal.cost ? <p><strong>{t("Cost:")}</strong> {modal.cost}</p> : null}
              </div>
            ) : null}
            {modal.instructions?.length ? (
              <div className="modal-instructions">
                <h3>{t("How to take part")}</h3>
                <ul className="check-list">
                  {modal.instructions.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {modal.contactEmail ? (
              <p>
                <a className="button line" href={`mailto:${modal.contactEmail}?subject=${encodeURIComponent(modal.title)}`}>
                  {modal.contactLabel ?? t("Email CCD about this")}
                </a>
              </p>
            ) : null}
            <div className="modal-gallery">
              {modal.photos.map((photo) => (
                <img key={photo} src={photo} alt="" loading="lazy" />
              ))}
            </div>
          </article>
        </ModalShell>
      ) : null}
    </section>
  );
}
