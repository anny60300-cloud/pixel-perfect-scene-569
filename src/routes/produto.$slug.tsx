import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppleIcon, btn, Qty, Tag } from "@/components/vegui/primitives";
import { ProductCard } from "@/components/vegui/ProductCard";
import { useCart } from "@/lib/cart";
import { categories, formatBRL, getProduct, products } from "@/lib/products";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} — Vegui Foods` : "Produto — Vegui Foods";
    return {
      meta: [
        { title },
        { name: "description", content: p?.description ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: p?.description ?? "" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const cat = categories.find((c) => c.id === p.category)!;
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  const others = related.length ? related : products.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-5 pt-6 md:px-8">
          <Link to="/cardapio" search={{ categoria: p.category, q: undefined }} className="inline-flex items-center gap-2 text-sm font-bold text-primary">
            <ArrowLeft className="h-4 w-4" /> {cat.label}
          </Link>
        </div>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-6 md:grid-cols-2 md:gap-16 md:px-8 md:pb-24">
          <div className="relative">
            <div className="arch aspect-[4/5] overflow-hidden bg-paper">
              <img src={p.image} alt={p.name} width={1024} height={1024} className="h-full w-full object-cover" />
            </div>
            <AppleIcon tone="pink" className="animate-float absolute -bottom-6 right-6 w-20" />
          </div>

          <div className="flex flex-col md:pt-10">
            <p className="text-2xl font-extrabold text-accent">{cat.script}</p>
            <h1 className="text-display mt-1 text-primary">{p.name}</h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">{p.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Tag>Vegano</Tag>
              <Tag>Sem glúten</Tag>
              <Tag tone="pending">Sem lactose · a confirmar</Tag>
            </div>

            <p className="text-price mt-8 text-4xl text-primary">{formatBRL(p.price)}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Qty value={qty} onChange={(n) => setQty(Math.max(1, Math.min(20, n)))} />
              <button
                onClick={() => {
                  add(p.slug, qty);
                  toast.success(`${qty}x ${p.name} no carrinho`, {
                    action: { label: "Ver carrinho", onClick: () => (window.location.href = "/carrinho") },
                  });
                  setQty(1);
                }}
                className={btn({ size: "lg", className: "flex-1 sm:flex-none" })}
              >
                <ShoppingBag className="h-5 w-5" /> Adicionar · {formatBRL(p.price * qty)}
              </button>
            </div>

            <div className="mt-12 grid gap-8 border-t-2 border-dashed border-accent/60 pt-8 sm:grid-cols-2">
              <div>
                <h2 className="text-eyebrow text-primary">Ingredientes</h2>
                <ul className="mt-4 space-y-2">
                  {p.ingredients.map((i) => (
                    <li key={i} className="flex items-center gap-2 text-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {i}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">Quantidades e lista completa pendentes de validação.</p>
              </div>
              <div>
                <h2 className="text-eyebrow text-primary">Informações alimentares</h2>
                <dl className="mt-4 space-y-2 text-sm">
                  <Row k="Porção / peso" v="Pendente de validação" />
                  <Row k="Tabela nutricional" v="Pendente de validação" />
                  <Row k="Alergênicos e traços" v="Pendente de validação" />
                </dl>
                <p className="mt-3 text-xs text-muted-foreground">
                  Ausência de ingredientes não garante ausência de traços. Em caso de alergia, consulte a equipe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8">
        <h2 className="text-title text-primary">
          Combina <span className="text-accent">com isso</span>
        </h2>
        <div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((x, i) => (
            <ProductCard key={x.slug} product={x} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border pb-2">
      <dt className="font-semibold text-primary">{k}</dt>
      <dd className="text-muted-foreground">{v}</dd>
    </div>
  );
}
