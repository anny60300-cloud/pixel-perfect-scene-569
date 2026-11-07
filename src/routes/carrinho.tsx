import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Trash2 } from "lucide-react";
import { AppleIcon, btn, Eyebrow, Qty } from "@/components/vegui/primitives";
import { useCart } from "@/lib/cart";
import { formatBRL, getProduct } from "@/lib/products";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Carrinho — Vegui Foods" },
      { name: "description", content: "Revise os itens do seu pedido Vegui Foods." },
      { property: "og:title", content: "Carrinho — Vegui Foods" },
      { property: "og:description", content: "Revise os itens do seu pedido." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, update, remove, subtotal, count } = useCart();

  if (!lines.length)
    return (
      <section className="mx-auto flex max-w-xl flex-col items-center px-5 py-28 text-center">
        <AppleIcon tone="pink" className="animate-float w-24" />
        <h1 className="text-title mt-8 text-primary">Seu carrinho está vazio</h1>
        <p className="mt-3 text-muted-foreground">Que tal escolher seu próximo prato favorito?</p>
        <Link to="/cardapio" className={btn({ size: "lg", className: "mt-8" })}>
          Ver cardápio <ArrowRight className="h-5 w-5" />
        </Link>
      </section>
    );

  return (
    <section className="mx-auto max-w-7xl px-5 pt-14 md:px-8">
      <Eyebrow>Seu pedido</Eyebrow>
      <h1 className="text-title mt-4 text-primary">
        Carrinho <span className="text-accent">({count})</span>
      </h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <ul className="divide-y divide-border">
          {lines.map((l) => {
            const p = getProduct(l.slug);
            if (!p) return null;
            return (
              <li key={l.slug} className="flex gap-4 py-6 sm:gap-6">
                <Link to="/produto/$slug" params={{ slug: p.slug }} className="h-24 w-24 shrink-0 overflow-hidden rounded-3xl bg-cream sm:h-28 sm:w-28">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col justify-between gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link to="/produto/$slug" params={{ slug: p.slug }} className="text-lg font-extrabold text-primary">
                        {p.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{formatBRL(p.price)} cada</p>
                    </div>
                    <p className="text-price text-lg text-primary">{formatBRL(p.price * l.qty)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Qty size="sm" value={l.qty} onChange={(n) => update(l.slug, n)} />
                    <button onClick={() => remove(l.slug)} className="inline-flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" /> Remover
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <aside className="h-fit rounded-[2rem] bg-cream p-7 lg:sticky lg:top-28">
          <h2 className="text-lg font-extrabold text-primary">Resumo</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd className="text-price">{formatBRL(subtotal)}</dd></div>
            <div className="flex justify-between text-muted-foreground"><dt>Entrega</dt><dd>a confirmar</dd></div>
          </dl>
          <div className="mt-5 flex items-baseline justify-between border-t-2 border-dashed border-accent pt-5">
            <span className="font-bold text-primary">Total parcial</span>
            <span className="text-price text-2xl text-primary">{formatBRL(subtotal)}</span>
          </div>
          <Link to="/checkout" className={btn({ size: "lg", className: "mt-6 w-full" })}>
            Finalizar pedido <ArrowRight className="h-5 w-5" />
          </Link>
          <Link to="/cardapio" className={btn({ variant: "ghost", className: "mt-2 w-full" })}>
            Continuar comprando
          </Link>
        </aside>
      </div>
    </section>
  );
}
