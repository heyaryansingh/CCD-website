import { BuyPicker } from "@/components/ClientBits";
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

export async function BrewProducts({
  section,
}: {
  section: Extract<Section, { type: "products" }>;
}) {
  const live = await liveCatalog();
  const items = brewProducts.map((product) => merge(product, live.get(product.handle)));

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
              <BuyPicker productTitle={product.title} variants={product.variants} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
