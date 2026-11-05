import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { addLine, cartTotals, setQty, type CartLine } from "./cart-logic";

const KEY = "vegui-cart-v1";

type CartCtx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (slug: string, qty?: number) => void;
  update: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, loaded]);

  const value = useMemo<CartCtx>(() => {
    const t = cartTotals(lines);
    return {
      lines,
      ...t,
      add: (slug, qty = 1) => setLines((l) => addLine(l, slug, qty)),
      update: (slug, qty) => setLines((l) => setQty(l, slug, qty)),
      remove: (slug) => setLines((l) => setQty(l, slug, 0)),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be inside CartProvider");
  return c;
}
