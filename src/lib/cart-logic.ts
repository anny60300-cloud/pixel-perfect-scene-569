import { formatBRL, getProduct } from "./products";

export type CartLine = { slug: string; qty: number };

export const MAX_QTY = 20;

export function addLine(lines: CartLine[], slug: string, qty = 1): CartLine[] {
  const found = lines.find((l) => l.slug === slug);
  if (found) return setQty(lines, slug, found.qty + qty);
  return [...lines, { slug, qty: Math.min(Math.max(qty, 1), MAX_QTY) }];
}

export function setQty(lines: CartLine[], slug: string, qty: number): CartLine[] {
  if (qty <= 0) return lines.filter((l) => l.slug !== slug);
  return lines.map((l) => (l.slug === slug ? { ...l, qty: Math.min(qty, MAX_QTY) } : l));
}

export function cartTotals(lines: CartLine[]) {
  let subtotal = 0;
  let count = 0;
  for (const l of lines) {
    const p = getProduct(l.slug);
    if (!p) continue;
    subtotal += p.price * l.qty;
    count += l.qty;
  }
  return { subtotal, count };
}

export type OrderInfo = {
  name: string;
  phone: string;
  mode: "entrega" | "retirada";
  address?: string;
  payment: string;
  notes?: string;
};

export function buildWhatsAppMessage(lines: CartLine[], info: OrderInfo) {
  const items = lines
    .map((l) => {
      const p = getProduct(l.slug);
      return p ? `• ${l.qty}x ${p.name} — ${formatBRL(p.price * l.qty)}` : null;
    })
    .filter(Boolean)
    .join("\n");
  const { subtotal } = cartTotals(lines);
  return [
    "Olá, Vegui! Gostaria de fazer um pedido:",
    "",
    items,
    "",
    `Subtotal: ${formatBRL(subtotal)}`,
    "(taxa de entrega a confirmar)",
    "",
    `Nome: ${info.name}`,
    `Telefone: ${info.phone}`,
    `Recebimento: ${info.mode === "entrega" ? "Entrega" : "Retirada"}`,
    info.mode === "entrega" && info.address ? `Endereço: ${info.address}` : null,
    `Pagamento: ${info.payment}`,
    info.notes ? `Observações: ${info.notes}` : null,
  ]
    .filter((x) => x !== null)
    .join("\n");
}

/** WhatsApp number pending from the client. Fill in digits only, e.g. "5511999999999". */
export const WHATSAPP_NUMBER = "";

export function whatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
