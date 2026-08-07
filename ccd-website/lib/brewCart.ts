// =============================================================================
// THE 4TH BREW — browser-side cart.
//
// Shopify cart permalinks accept MANY lines, comma separated:
//   /cart/{variantId}:{qty},{variantId}:{qty},...
// So the cart itself can live entirely in the browser: collect lines here, then
// hand Shopify one URL at checkout. That keeps the "no SDK, no access token, no
// server-side cart" property of the single-item version while letting someone
// buy three bags at once.
//
// Implemented as a module-level store read through useSyncExternalStore rather
// than React Context, so the header badge and the cart panel can both subscribe
// without a provider wrapping the tree (PageView is a server component).
// =============================================================================

export type CartLine = {
  variantId: number;
  product: string;
  variant: string;
  price: string;
  image: string;
  qty: number;
};

const KEY = "brew-cart-v1";
const MAX_QTY = 99;

// The server and the very first client render must agree, so both start empty
// and localStorage is read in subscribe() — which React only calls after mount.
const EMPTY: CartLine[] = [];
let lines: CartLine[] = EMPTY;
let hydrated = false;

const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    // Private mode or a full quota. The cart still works for this page view.
  }
}

function hydrate() {
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;
    const clean = parsed.filter(
      (l): l is CartLine =>
        !!l &&
        typeof l === "object" &&
        typeof (l as CartLine).variantId === "number" &&
        typeof (l as CartLine).qty === "number" &&
        (l as CartLine).qty > 0,
    );
    if (clean.length) {
      lines = clean;
      emit();
    }
  } catch {
    // Corrupt or foreign payload — start clean rather than throwing on render.
  }
}

export function subscribe(fn: () => void) {
  if (!hydrated) hydrate();
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

// Must return a stable reference while unchanged or useSyncExternalStore loops.
export function getSnapshot() {
  return lines;
}

export function getServerSnapshot() {
  return EMPTY;
}

function commit(next: CartLine[]) {
  lines = next;
  persist();
  emit();
}

export function addLine(line: Omit<CartLine, "qty">, qty = 1) {
  const existing = lines.find((l) => l.variantId === line.variantId);
  commit(
    existing
      ? lines.map((l) =>
          l.variantId === line.variantId
            ? { ...l, qty: Math.min(l.qty + qty, MAX_QTY) }
            : l,
        )
      : [...lines, { ...line, qty: Math.min(qty, MAX_QTY) }],
  );
}

export function setQty(variantId: number, qty: number) {
  if (qty <= 0) return removeLine(variantId);
  commit(
    lines.map((l) =>
      l.variantId === variantId ? { ...l, qty: Math.min(qty, MAX_QTY) } : l,
    ),
  );
}

export function removeLine(variantId: number) {
  commit(lines.filter((l) => l.variantId !== variantId));
}

export function clearCart() {
  commit([]);
}

export function cartCount(ls: CartLine[]) {
  return ls.reduce((n, l) => n + l.qty, 0);
}

export function cartTotal(ls: CartLine[]) {
  return ls.reduce((n, l) => n + Number(l.price) * l.qty, 0);
}

// One URL for the whole cart. Shopify adds every line and opens checkout.
export function checkoutUrl(shop: string, ls: CartLine[]) {
  if (!ls.length) return "";
  return `${shop}/cart/${ls.map((l) => `${l.variantId}:${l.qty}`).join(",")}`;
}
