// Self-check for the browser-side cart. No framework — run it directly:
//   node --experimental-strip-types lib/brewCart.test.mts
//
// The store talks to window.localStorage, so stub just enough of it.
import assert from "node:assert/strict";

const store = new Map<string, string>();
(globalThis as unknown as { window: unknown }).window = {
  localStorage: {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
  },
};

const {
  addLine,
  setQty,
  removeLine,
  clearCart,
  cartCount,
  cartTotal,
  checkoutUrl,
  getSnapshot,
  subscribe,
} = await import("./brewCart.ts");

const SHOP = "https://the4thbrew.com";
const rook = { variantId: 43079750877243, product: "The Rook", variant: "12oz / Whole bean", price: "18.99", image: "/r.png" };
const knight = { variantId: 43079750975547, product: "The Knight", variant: "12oz / Ground", price: "18.99", image: "/k.png" };
const pawn5 = { variantId: 43910647087163, product: "The Pawn", variant: "5lb / Whole bean", price: "94.99", image: "/p.png" };

subscribe(() => {}); // hydrate path
clearCart();

// empty cart yields no checkout URL — the button must not link nowhere
assert.equal(checkoutUrl(SHOP, getSnapshot()), "");

// distinct variants accumulate as separate lines (the bug being fixed)
addLine(rook);
addLine(knight);
addLine(pawn5);
assert.equal(getSnapshot().length, 3, "three variants should be three lines");

// adding the SAME variant merges into the existing line instead of duplicating
addLine(rook);
assert.equal(getSnapshot().length, 3, "re-adding a variant must not add a line");
assert.equal(getSnapshot().find((l) => l.variantId === rook.variantId)!.qty, 2);

assert.equal(cartCount(getSnapshot()), 4);
assert.equal(cartTotal(getSnapshot()).toFixed(2), "151.96");

// this exact URL was verified against Shopify: 4 items, $151.96, straight to checkout
assert.equal(
  checkoutUrl(SHOP, getSnapshot()),
  `${SHOP}/cart/43079750877243:2,43079750975547:1,43910647087163:1`,
);

// qty edits
setQty(knight.variantId, 3);
assert.equal(getSnapshot().find((l) => l.variantId === knight.variantId)!.qty, 3);

// dropping to zero removes the line rather than sending ":0" to Shopify
setQty(knight.variantId, 0);
assert.equal(getSnapshot().length, 2);
assert.ok(!checkoutUrl(SHOP, getSnapshot()).includes(":0"));

// qty is clamped so a stuck "+" cannot send an absurd order
setQty(rook.variantId, 5000);
assert.equal(getSnapshot().find((l) => l.variantId === rook.variantId)!.qty, 99);

removeLine(rook.variantId);
assert.equal(getSnapshot().length, 1);

// the snapshot reference must be stable while unchanged or useSyncExternalStore loops
assert.equal(getSnapshot(), getSnapshot());

clearCart();
assert.equal(getSnapshot().length, 0);
assert.equal(checkoutUrl(SHOP, getSnapshot()), "");

console.log("brewCart: all assertions passed");
