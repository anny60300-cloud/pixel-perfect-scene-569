import { describe, expect, it } from "vitest";
import { addLine, cartTotals, setQty } from "@/lib/cart-logic";
import { getProduct } from "@/lib/products";

describe("cart", () => {
  it("uses the menu prices", () => {
    expect(getProduct("risoto-verde")?.price).toBe(2990);
    expect(getProduct("pink-lemonade")?.price).toBe(990);
  });
  it("sums quantities x prices", () => {
    let l = addLine([], "risoto-verde", 2);
    l = addLine(l, "choco-hug");
    expect(cartTotals(l)).toEqual({ subtotal: 2990 * 2 + 1290, count: 3 });
  });
  it("removes a line when quantity hits zero", () => {
    const l = setQty(addLine([], "avocado"), "avocado", 0);
    expect(l).toEqual([]);
  });
});
