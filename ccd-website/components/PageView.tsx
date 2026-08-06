import Link from "next/link";
import { BrewProducts } from "@/components/BrewProducts";
import {
  AboutTeam,
  BeforeAfter,
  ContactPanel,
  DonatePanel,
  EstimateForm,
  HomeHero,
  MembershipFaq,
  NewsEvents,
} from "@/components/ClientBits";
import {
  membershipTiers,
  partners,
  projectPins,
  serviceDirectory,
  siteConfig,
  supporterLogos,
  testimonials,
  type Section,
  type SitePage,
} from "@/lib/siteData";

function ButtonLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a className="button gold" href={href}>
        {children}
      </a>
    );
  }
  if (href.startsWith("http")) {
    return (
      <a className="button gold" href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className="button gold" href={href}>
      {children}
    </Link>
  );
}

function StandardHero({ page }: { page: SitePage }) {
  return (
    <section className="page-hero">
      {page.heroImage ? (
        <img
          src={page.heroImage}
          alt={page.heroAlt ?? ""}
          style={page.heroPosition ? { objectPosition: page.heroPosition } : undefined}
        />
      ) : null}
      <div className="hero-scrim" />
      <div className="page-hero-inner">
        {page.eyebrow ? <p className="eyebrow">{page.eyebrow}</p> : null}
        <h1>
          {page.heroTitle}
          {page.heroAccent ? (
            <>
              <br />
              <em>{page.heroAccent}</em>
            </>
          ) : null}
        </h1>
        {page.heroCta ? (
          <ButtonLink href={page.heroCta.href}>{page.heroCta.label}</ButtonLink>
        ) : null}
      </div>
    </section>
  );
}

function SplitSection({ section }: { section: Extract<Section, { type: "split" }> }) {
  const copyAttr = section.reverse ? "data-reveal-right" : "data-reveal-left";
  const mediaAttr = section.reverse ? "data-reveal-left" : "data-reveal-right";
  return (
    <section
      id={section.id}
      className={`section split-section ${section.reverse ? "reverse" : ""} ${section.theme ?? ""}`}
    >
      <div className="split-copy" {...{ [copyAttr]: true }}>
        {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
        <h2>{section.title}</h2>
        <p>{section.body}</p>
        {section.bullets ? (
          <ul className="check-list">
            {section.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}
        {section.ctaHref && section.ctaText ? (
          <ButtonLink href={section.ctaHref}>{section.ctaText}</ButtonLink>
        ) : null}
      </div>
      {section.image ? (
        <div className="split-media" {...{ [mediaAttr]: true }}>
          <img src={section.image} alt={section.alt ?? ""} />
        </div>
      ) : (
        <div className="split-media pattern-card" {...{ [mediaAttr]: true }}>
          <span>CCD</span>
        </div>
      )}
    </section>
  );
}

function CardsSection({ section }: { section: Extract<Section, { type: "cards" }> }) {
  return (
    <section id={section.id} className={`section cards-section ${section.theme ?? ""}`}>
      <div className="section-heading">
        {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
        <h2>{section.title}</h2>
        {section.body ? <p>{section.body}</p> : null}
      </div>
      <div className="card-grid">
        {section.cards.map((card, index) => {
          const delay = Math.min(index, 5) * 90;
          const content = (
            <>
              {card.image ? <img src={card.image} alt={card.alt ?? ""} /> : null}
              <div>
                {card.meta ? <span>{card.meta}</span> : null}
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                {card.bullets?.length ? (
                  <ul className="card-specs">
                    {card.bullets.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </>
          );
          return card.href ? (
            <Link
              className="feature-card"
              href={card.href}
              key={card.title}
              data-reveal
              style={{ transitionDelay: `${delay}ms` }}
            >
              {content}
            </Link>
          ) : (
            <article
              className="feature-card"
              key={card.title}
              data-reveal
              style={{ transitionDelay: `${delay}ms` }}
            >
              {content}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function StatsSection({ section }: { section: Extract<Section, { type: "stats" }> }) {
  return (
    <section className={`section stats-section ${section.theme ?? ""}`}>
      <div className="section-heading">
        {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
        <h2>{section.title}</h2>
        {section.body ? <p>{section.body}</p> : null}
      </div>
      <div className="stats-grid">
        {section.stats.map((stat, index) => {
          const parsed = parseCount(stat.value);
          return (
            <div key={stat.label} data-reveal style={{ transitionDelay: `${index * 90}ms` }}>
              {parsed ? (
                <strong data-count={parsed.target} data-prefix={parsed.prefix} data-suffix={parsed.suffix}>
                  {stat.value}
                </strong>
              ) : (
                <strong>{stat.value}</strong>
              )}
              <span>{stat.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function parseCount(raw: string) {
  const match = raw.match(/^([^\d]*)([\d,]+)([^\d]*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  return { prefix, suffix, target: parseInt(digits.replace(/,/g, ""), 10) };
}

function TimelineSection({ section }: { section: Extract<Section, { type: "timeline" }> }) {
  return (
    <section className="section timeline-section">
      <div className="section-heading">
        <h2>{section.title}</h2>
      </div>
      <div className="timeline">
        {section.items.map((item) => (
          <article key={item.year}>
            <span>{item.year}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HeartSection({ section }: { section: Extract<Section, { type: "heart" }> }) {
  // Official H.E.A.R.T. framework (from CCD's own materials).
  const items = [
    ["H", "Homeownership", "Homeownership and affordable housing for the community."],
    ["E", "Economic Independence", "Building economic strength that stays on the block."],
    ["A", "Agricultural Access", "Food sovereignty and productive green spaces."],
    ["R", "Retail Revitalization", "Bringing neighborhood-owned retail back to the corridor."],
    ["T", "Tranquil Spaces", "Tranquil community spaces for rest and gathering."],
  ];

  return (
    <section id={section.id} className="section heart-section">
      <div className="heart-copy">
        <p className="eyebrow">MISSION</p>
        <h2>H.E.A.R.T. is how CCD works.</h2>
      </div>
      <div className="heart-list">
        {items.map(([letter, title, body]) => (
          <article key={letter}>
            <strong>{letter}</strong>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function GallerySection({ section }: { section: Extract<Section, { type: "gallery" }> }) {
  return (
    <section className={`section gallery-section ${section.theme ?? ""}`}>
      <div className="section-heading">
        <h2>{section.title}</h2>
      </div>
      <div className="media-grid">
        {section.images.map((image) => (
          <img key={image.src} src={image.src} alt={image.alt} />
        ))}
      </div>
      {section.credit ? <p className="media-credit">{section.credit}</p> : null}
    </section>
  );
}

function CtaSection({ section }: { section: Extract<Section, { type: "cta" }> }) {
  return (
    <section className={`section cta-section ${section.theme ?? ""}`}>
      <h2>{section.title}</h2>
      <p>{section.body}</p>
      <ButtonLink href={section.href}>{section.label}</ButtonLink>
    </section>
  );
}

function BandSection({ section }: { section: Extract<Section, { type: "band" }> }) {
  return (
    <section id={section.id} className={`band-section ${section.theme ?? ""}`}>
      {section.image ? <img src={section.image} alt={section.alt ?? ""} /> : null}
      <div className="band-scrim" />
      <div className="band-inner">
        {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
        <h2>{section.title}</h2>
        {section.body ? <p>{section.body}</p> : null}
        {section.cta ? <ButtonLink href={section.cta.href}>{section.cta.label}</ButtonLink> : null}
      </div>
    </section>
  );
}

function ValuesSection({ section }: { section: Extract<Section, { type: "values" }> }) {
  const hasHeading = Boolean(section.title || section.eyebrow || section.body);
  return (
    <section id={section.id} className={`section values-section ${section.theme ?? ""}`}>
      {hasHeading ? (
        <div className="section-heading">
          {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
          {section.title ? <h2>{section.title}</h2> : null}
          {section.body ? <p>{section.body}</p> : null}
        </div>
      ) : null}
      <div className="values-grid">
        {section.items.map((item, index) => (
          <article
            key={item.title}
            data-reveal
            style={{ transitionDelay: `${Math.min(index, 5) * 90}ms` }}
          >
            <span className="value-mark" aria-hidden="true" />
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FaqSection({ section }: { section: Extract<Section, { type: "faq" }> }) {
  return (
    <section id={section.id} className={`section faq-section ${section.theme ?? ""}`}>
      <div className="section-heading">
        {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
        <h2>{section.title}</h2>
        {section.body ? <p>{section.body}</p> : null}
      </div>
      <div className="faq-list">
        {section.items.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p className="faq-answer">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function StepsSection({ section }: { section: Extract<Section, { type: "steps" }> }) {
  return (
    <section id={section.id} className={`section steps-section ${section.theme ?? ""}`}>
      <div className="section-heading">
        {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
        <h2>{section.title}</h2>
        {section.body ? <p>{section.body}</p> : null}
      </div>
      <div className="steps-grid">
        {section.steps.map((step, index) => (
          <article key={step.n} data-reveal style={{ transitionDelay: `${index * 90}ms` }}>
            <span className="step-n">{step.n}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function MembershipTiersSection({ section }: { section: Extract<Section, { type: "membershipTiers" }> }) {
  return (
    <section id={section.id} className="section tiers-section">
      <div className="section-heading">
        <p className="eyebrow">MEMBERSHIP</p>
        <h2>Five ways in.</h2>
        <p>Dues fund programs directly. Voting members help decide what CCD does next.</p>
      </div>
      <div className="tier-grid">
        {membershipTiers.map((tier, index) => (
          <article
            key={tier.name}
            className={`tier-card ${tier.featured ? "featured" : ""}`}
            data-reveal
            style={{ transitionDelay: `${Math.min(index, 5) * 80}ms` }}
          >
            {tier.featured ? <span className="tier-flag">Most popular</span> : null}
            <h3>{tier.name}</h3>
            <p className="tier-price">
              {tier.price} <em>{tier.setup}</em>
            </p>
            <p className="tier-elig">{tier.eligibility}</p>
            <ul className="check-list">
              {tier.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <p className={tier.vote ? "tier-vote yes" : "tier-vote no"}>
              {tier.vote ? "✓ Includes 1 vote" : "Non-voting"}
            </p>
          </article>
        ))}
      </div>
      <div className="tier-cta">
        <ButtonLink href={siteConfig.links.membershipSignup || "/contact"}>
          Choose your membership
        </ButtonLink>
      </div>
    </section>
  );
}

function DirectorySection({ section }: { section: Extract<Section, { type: "directory" }> }) {
  return (
    <section id={section.id} className="section directory-section">
      <div className="section-heading">
        <p className="eyebrow">WHO TO CONTACT</p>
        <h2>{section.title}</h2>
        {section.body ? <p>{section.body}</p> : null}
      </div>
      <div className="directory-grid">
        {serviceDirectory.map((entry, index) => (
          <a
            key={entry.area}
            className="directory-card"
            href={`mailto:${entry.email}?subject=${encodeURIComponent(entry.area)}`}
            data-reveal
            style={{ transitionDelay: `${Math.min(index, 5) * 70}ms` }}
          >
            <span className="directory-area">{entry.area}</span>
            <strong>{entry.person}</strong>
            <small>{entry.title}</small>
            <em>{entry.email}</em>
          </a>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection({ section }: { section: Extract<Section, { type: "testimonials" }> }) {
  if (!testimonials.length) {
    return (
      <section id={section.id} className="section testimonials-section empty">
        <div className="section-heading">
          <h2>{section.title}</h2>
          <p>{section.body ?? "Are you a member, resident, or Clean & Green customer? Share your story with CCD."}</p>
        </div>
        <ButtonLink href={`mailto:${siteConfig.contact.email}?subject=My%20CCD%20story`}>
          Share your story
        </ButtonLink>
      </section>
    );
  }
  return (
    <section id={section.id} className="section testimonials-section">
      <div className="section-heading">
        <h2>{section.title}</h2>
        {section.body ? <p>{section.body}</p> : null}
      </div>
      <div className="quote-grid">
        {testimonials.map((t, index) => (
          <figure key={t.name} data-reveal style={{ transitionDelay: `${index * 90}ms` }}>
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              <strong>{t.name}</strong>
              {t.role ? <span>{t.role}</span> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function ProjectMapSection({ section }: { section: Extract<Section, { type: "projectMap" }> }) {
  return (
    <section id={section.id} className="section map-section">
      <div className="section-heading">
        <p className="eyebrow">IMPACT MAP</p>
        <h2>{section.title}</h2>
        {section.body ? <p>{section.body}</p> : null}
      </div>
      <div className="map-frame" data-reveal>
        <div className="map-grid-lines" aria-hidden="true" />
        {projectPins.map((pin) => (
          <Link
            key={pin.name}
            href={pin.href}
            className="map-pin"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <span className="pin-dot" />
            <span className="pin-label">
              <strong>{pin.name}</strong>
              <em>{pin.status}</em>
            </span>
          </Link>
        ))}
        <span className="map-corner">Irvington · 21229 — map © OpenStreetMap contributors</span>
      </div>
    </section>
  );
}

function PartnerWallSection({ section }: { section: Extract<Section, { type: "partnerWall" }> }) {
  return (
    <section id={section.id} className="section partner-wall-section">
      <div className="section-heading">
        <p className="eyebrow">PARTNERS & FUNDERS</p>
        <h2>{section.title}</h2>
        {section.body ? <p>{section.body}</p> : null}
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...partners, ...partners].map((partner, i) => (
            <span key={`${partner.name}-${i}`}>{partner.name}</span>
          ))}
        </div>
      </div>
      <div className="partner-cards">
        {partners.map((partner, index) => {
          const inner = (
            <>
              {partner.logo ? (
                <img className="partner-logo" src={partner.logo} alt={`${partner.name} logo`} />
              ) : null}
              <strong>{partner.name}</strong>
              <p>{partner.description}</p>
              <span className={`partner-tag tag-${partner.category}`}>{partner.category}</span>
            </>
          );
          // Partners CCD now hosts itself (e.g. The 4th Brew) carry an internal
          // path — those must not open in a new tab.
          const external = partner.url?.startsWith("http") ?? false;
          return partner.url ? (
            <a
              key={partner.name}
              className="partner-card"
              href={partner.url}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              data-reveal
              style={{ transitionDelay: `${Math.min(index, 8) * 60}ms` }}
            >
              {inner}
            </a>
          ) : (
            <article
              key={partner.name}
              className="partner-card"
              data-reveal
              style={{ transitionDelay: `${Math.min(index, 8) * 60}ms` }}
            >
              {inner}
            </article>
          );
        })}
      </div>
      <div className="supporter-wall">
        <h3>Friends &amp; supporters</h3>
        <div className="supporter-logos" data-reveal>
          {supporterLogos.map((logo) => (
            <img key={logo.src} src={logo.src} alt={logo.alt} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}

function RenderSection({ section }: { section: Section }) {
  switch (section.type) {
    case "split":
      return <SplitSection section={section} />;
    case "cards":
      return <CardsSection section={section} />;
    case "stats":
      return <StatsSection section={section} />;
    case "timeline":
      return <TimelineSection section={section} />;
    case "heart":
      return <HeartSection section={section} />;
    case "gallery":
      return <GallerySection section={section} />;
    case "cta":
      return <CtaSection section={section} />;
    case "band":
      return <BandSection section={section} />;
    case "values":
      return <ValuesSection section={section} />;
    case "faq":
      return <FaqSection section={section} />;
    case "steps":
      return <StepsSection section={section} />;
    case "directory":
      return <DirectorySection section={section} />;
    case "membershipTiers":
      return <MembershipTiersSection section={section} />;
    case "testimonials":
      return <TestimonialsSection section={section} />;
    case "projectMap":
      return <ProjectMapSection section={section} />;
    case "partnerWall":
      return <PartnerWallSection section={section} />;
    case "beforeAfter":
      // Hidden until real before/after pairs exist (see beforeAfterPairs in siteData).
      if (!section.pairs.length) return null;
      return (
        <BeforeAfter
          eyebrow={section.eyebrow}
          title={section.title}
          body={section.body}
          pairs={section.pairs}
        />
      );
    case "aboutTeam":
    case "teamFull":
      return <AboutTeam />;
    case "membershipFaq":
      return <MembershipFaq />;
    case "estimateForm":
      return <EstimateForm />;
    case "donatePanel":
      return <DonatePanel />;
    case "contactPanel":
      return <ContactPanel />;
    case "newsEvents":
    case "eventsFull":
      return <NewsEvents />;
    case "products":
      return <BrewProducts section={section} />;
  }
}

export function PageView({ page }: { page: SitePage }) {
  const isHome = page.slug === "";

  return (
    <main className={page.brand}>
      {isHome ? <HomeHero /> : <StandardHero page={page} />}
      {page.slug === "projects" ? (
        <section className="video-band">
          <video src="/media/video/memorial-garden.mp4" autoPlay muted loop playsInline />
          <div>
            <p className="eyebrow">MEMORIAL GARDEN</p>
            <h2>Real footage from the work.</h2>
          </div>
        </section>
      ) : null}
      {page.sections.map((section, index) => (
        <RenderSection section={section} key={`${section.type}-${index}`} />
      ))}
    </main>
  );
}
