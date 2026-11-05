import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { z } from "zod";
import { Eyebrow } from "@/components/vegui/primitives";
import { ProductCard } from "@/components/vegui/ProductCard";
import { categories, searchProducts, type CategoryId } from "@/lib/products";
import { cn } from "@/lib/utils";

const schema = z.object({
  categoria: z.enum(["pratos", "sanduiches", "sobremesas", "bebidas"]).optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/cardapio")({
  validateSearch: schema,
  head: () => ({
    meta: [
      { title: "Cardápio — Vegui Foods" },
      { name: "description", content: "Pratos principais, sanduíches, sobremesas e bebidas veganos e sem glúten." },
      { property: "og:title", content: "Cardápio — Vegui Foods" },
      { property: "og:description", content: "Conheça o cardápio vegano e sem glúten da Vegui Foods." },
    ],
  }),
  component: Menu,
});

function Menu() {
  const { categoria, q } = Route.useSearch();
  const found = searchProducts(q ?? "");
  const list = categoria ? found.filter((p) => p.category === categoria) : found;
  const groups = categories
    .filter((c) => !categoria || c.id === categoria)
    .map((c) => ({ ...c, items: list.filter((p) => p.category === c.id) }))
    .filter((g) => g.items.length);

  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-14 md:px-8 md:pt-20">
          <Eyebrow>Cardápio</Eyebrow>
          <h1 className="text-display mt-4 text-primary">
            Escolha seu <span className="font-script text-accent">sabor</span>
          </h1>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Tudo vegano e sem glúten. Toque em um item para ver ingredientes e detalhes.
          </p>
        </div>
      </section>

      <div className="sticky top-16 z-30 border-b border-border/70 bg-paper/90 backdrop-blur md:top-20">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 md:px-8">
          <Chip active={!categoria} to={undefined} q={q}>Tudo</Chip>
          {categories.map((c) => (
            <Chip key={c.id} active={categoria === c.id} to={c.id} q={q}>
              {c.label}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {q && (
          <div className="mt-8 flex items-center gap-3 text-primary">
            <p>
              Resultados para <strong>“{q}”</strong> ({list.length})
            </p>
            <Link to="/cardapio" search={{ categoria, q: undefined }} className="inline-flex items-center gap-1 rounded-full bg-cream px-3 py-1 text-sm font-bold">
              <X className="h-4 w-4" /> limpar
            </Link>
          </div>
        )}
        {groups.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-script text-4xl text-accent">hmm…</p>
            <p className="mt-2 text-lg font-bold text-primary">Nada encontrado por aqui.</p>
          </div>
        )}
        {groups.map((g) => (
          <section key={g.id} className="pt-16">
            <div className="flex items-baseline gap-4 border-b-2 border-dashed border-accent/60 pb-4">
              <h2 className="text-title text-primary">{g.label}</h2>
              <span className="font-script text-2xl text-accent">{g.items.length} opções</span>
            </div>
            <div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

function Chip({
  active,
  to,
  q,
  children,
}: {
  active: boolean;
  to: CategoryId | undefined;
  q?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <Link
      to="/cardapio"
      search={{ categoria: to, q }}
      className={cn(
        "shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition",
        active ? "bg-primary text-primary-foreground" : "bg-cream text-primary hover:bg-accent-soft",
      )}
    >
      {children}
    </Link>
  );
}
