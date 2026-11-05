import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { btn, Eyebrow, Field, inputCls } from "@/components/vegui/primitives";
import { useCart } from "@/lib/cart";
import { buildWhatsAppMessage, whatsappUrl, WHATSAPP_NUMBER, type OrderInfo } from "@/lib/cart-logic";
import { formatBRL, getProduct } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Finalizar pedido — Vegui Foods" },
      { name: "description", content: "Revise seu pedido e envie para a Vegui pelo WhatsApp." },
      { property: "og:title", content: "Finalizar pedido — Vegui Foods" },
      { property: "og:description", content: "Envie seu pedido Vegui pelo WhatsApp." },
    ],
  }),
  component: Checkout,
});

const payments = ["Pix", "Cartão na entrega/retirada", "Dinheiro"];

function Checkout() {
  const { lines, subtotal } = useCart();
  const [info, setInfo] = useState<OrderInfo>({ name: "", phone: "", mode: "entrega", address: "", payment: "Pix", notes: "" });
  const [sent, setSent] = useState(false);
  const set = <K extends keyof OrderInfo>(k: K, v: OrderInfo[K]) => setInfo((i) => ({ ...i, [k]: v }));

  if (!lines.length)
    return (
      <section className="mx-auto max-w-xl px-5 py-28 text-center">
        <h1 className="text-title text-primary">Nada para finalizar ainda</h1>
        <Link to="/cardapio" className={btn({ size: "lg", className: "mt-8" })}>Ver cardápio</Link>
      </section>
    );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(whatsappUrl(buildWhatsAppMessage(lines, info)), "_blank", "noopener");
    setSent(true);
  };

  return (
    <section className="mx-auto max-w-7xl px-5 pt-14 md:px-8">
      <Eyebrow>Checkout</Eyebrow>
      <h1 className="text-title mt-4 text-primary">
        Quase <span className="font-script text-accent">lá!</span>
      </h1>
      <form onSubmit={submit} className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nome">
              <input required value={info.name} onChange={(e) => set("name", e.target.value)} className={inputCls} placeholder="Seu nome" />
            </Field>
            <Field label="Telefone / WhatsApp">
              <input required type="tel" value={info.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} placeholder="(00) 00000-0000" />
            </Field>
          </div>
          <div>
            <span className="mb-1.5 block text-sm font-bold text-primary">Como prefere receber?</span>
            <div className="grid grid-cols-2 gap-3">
              {(["entrega", "retirada"] as const).map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => set("mode", m)}
                  className={cn(
                    "rounded-2xl border-2 px-4 py-4 text-left font-bold transition",
                    info.mode === m ? "border-primary bg-primary text-primary-foreground" : "border-input text-primary hover:border-primary",
                  )}
                >
                  {m === "entrega" ? "Entrega" : "Retirada"}
                </button>
              ))}
            </div>
          </div>
          {info.mode === "entrega" && (
            <Field label="Endereço de entrega" hint="Área e taxa de entrega serão confirmadas pela equipe.">
              <input required value={info.address} onChange={(e) => set("address", e.target.value)} className={inputCls} placeholder="Rua, número, bairro, complemento" />
            </Field>
          )}
          <Field label="Forma de pagamento preferida">
            <select value={info.payment} onChange={(e) => set("payment", e.target.value)} className={inputCls}>
              {payments.map((p) => <option key={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="Observações (opcional)">
            <textarea rows={3} value={info.notes} onChange={(e) => set("notes", e.target.value)} className={inputCls} placeholder="Alguma preferência ou restrição?" />
          </Field>
        </div>

        <aside className="h-fit rounded-[2rem] bg-cream p-7 lg:sticky lg:top-28">
          <h2 className="text-lg font-extrabold text-primary">Resumo do pedido</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {lines.map((l) => {
              const p = getProduct(l.slug)!;
              return (
                <li key={l.slug} className="flex justify-between gap-3">
                  <span><strong className="text-primary">{l.qty}x</strong> {p.name}</span>
                  <span className="text-price">{formatBRL(p.price * l.qty)}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span className="text-price">{formatBRL(subtotal)}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Entrega</span><span>a confirmar</span></div>
          </div>
          <div className="mt-4 flex items-baseline justify-between border-t-2 border-dashed border-accent pt-4">
            <span className="font-bold text-primary">Total parcial</span>
            <span className="text-price text-2xl text-primary">{formatBRL(subtotal)}</span>
          </div>
          <button type="submit" className={btn({ size: "lg", className: "mt-6 w-full" })}>
            <MessageCircle className="h-5 w-5" /> Enviar pedido pelo WhatsApp
          </button>
          <p className="mt-3 text-xs text-muted-foreground">
            Nenhum pagamento é feito aqui. A Vegui confirma disponibilidade, entrega e pagamento pelo WhatsApp.
          </p>
          {!WHATSAPP_NUMBER && (
            <p className="mt-2 text-xs font-semibold text-accent-foreground">Número oficial do WhatsApp pendente de configuração.</p>
          )}
          {sent && (
            <div role="status" className="mt-4 rounded-2xl bg-accent-soft p-4 text-sm font-semibold text-primary-deep">
              Mensagem preparada no WhatsApp. Envie-a por lá para a equipe confirmar seu pedido.
            </div>
          )}
        </aside>
      </form>
    </section>
  );
}
