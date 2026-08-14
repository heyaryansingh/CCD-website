import { type Dictionary, localize, makeT } from "@/lib/i18n";
import { brewProducts, siteConfig, type BrewProduct, type Section } from "@/lib/siteData";

// Shopify publishes every storefront's catalog as public JSON. No SDK, no
// access token, no cart state — just read it at build time and link straight
// at a cart permalink. (The JS Buy SDK that used to do this was deprecated in
// Jan 2025 and lost support Jan 2026; with three products this is smaller than
// the SDK ever was.)
type ShopifyVariant = { id: number; title: string; price: string; available: boolean };
type ShopifyProduct = { handle: string; variants: ShopifyVariant[]; images: { src: string }[] };

async function liveCatalog(): Promise<Map<string, ShopifyProduct>> {
  try {
    const res = await fetch(`${siteConfig.links.brewShop}/products.json?limit=250`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return new Map();
    const data = (await res.json()) as { products?: ShopifyProduct[] };
    return new Map((data.products ?? []).map((p) => [p.handle, p]));
  } catch {
    // Offline build, store down, or the shop domain mid-migration. Fall back to
    // the captured values in siteData rather than failing the deploy — same
    // degrade-don't-break rule as the Supabase-optional form intake.
    return new Map();
  }
}

// siteData owns the editorial (which coffees, in what order, described how);
// Shopify owns the commerce (price, stock, photo). Merge by handle.
function merge(curated: BrewProduct, live: ShopifyProduct | undefined): BrewProduct {
  if (!live?.variants?.length) return curated;
  return {
    ...curated,
    image: live.images?.[0]?.src ?? curated.image,
    variants: live.variants.map((v) => ({
      id: v.id,
      title: v.title,
      price: v.price,
      available: v.available,
    })),
  };
}

/** Lowest live price across a product's variants, e.g. "from $16.00". */
function cheapest(product: BrewProduct): string | null {
  const prices = product.variants.map((v) => Number(v.price)).filter((n) => Number.isFinite(n));
  return prices.length ? `from $${Math.min(...prices).toFixed(2)}` : null;
}

export async function BrewProducts({
  section,
  locale,
  dict,
}: {
  section: Extract<Section, { type: "products" }>;
  locale: string;
  dict: Dictionary | undefined;
}) {
  const t = makeT(dict);
  const productsUrl = siteConfig.links.brewProducts || "https://the4thbrew.com/products";
  const live = await liveCatalog();
  // Editorial copy (roast, tasting notes) is translated; the Shopify half —
  // prices, variant titles, stock — is left exactly as the store reports it.
  const curated = localize(brewProducts, locale, dict);
  const items = curated.map((product) => merge(product, live.get(product.handle)));

  return (
    <section id={section.id} className="section products-section">
      <div className="section-heading">
        {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
        <h2>{section.title}</h2>
        {section.body ? <p>{section.body}</p> : null}
      </div>
      <div className="product-grid">
        {items.map((product, index) => (
          <article
            className="product-card"
            key={product.handle}
            data-reveal
            style={{ transitionDelay: `${Math.min(index, 5) * 90}ms` }}
          >
            <img src={product.image} alt={product.alt} loading="lazy" />
            <div>
              <span className="product-roast">{product.roast}</span>
              <h3>{product.title}</h3>
              <p>{product.notes}</p>
              {cheapest(product) ? <p className="product-price">{cheapest(product)}</p> : null}
              {/* Coffee is bought on The 4th Brew's own site, not here. The
                  in-page cart (ClientBits: BuyPicker / BrewCart / CartIndicator)
                  is still wired up for things CCD may sell directly later, such
                  as a membership plan; it simply has nothing adding to it now,
                  so it never appears. */}
              <a
                className="button gold"
                href={productsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("Buy on the4thbrew.com")}
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="products-note">
        {t("Orders are placed on The 4th Brew's own shop, which handles payment and delivery.")}
      </p>
    </section>
  );
}
