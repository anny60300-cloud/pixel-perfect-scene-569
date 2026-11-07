import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import patternPink from "@/assets/pattern-pink.png";
import bowl from "@/assets/vegui-bowl.jpg";
import { AppleIcon, btn, Eyebrow } from "@/components/vegui/primitives";
import { ProductCard } from "@/components/vegui/ProductCard";
import { categories, products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vegui Foods — Seu próximo prato favorito é Vegui" },
      {
        name: "description",
        content: "Comida de verdade, ingredientes vegetais e muito sabor. Pratos, sanduíches, doces e bebidas veganos e sem glúten.",
      },
      { property: "og:title", content: "Vegui Foods — Seu próximo prato favorito é Vegui" },
      { property: "og:description", content: "Comida vegana e sem glúten, leve e consciente." },
    ],
  }),
  component: Index,
});

const values = [
  { t: "100% vegetal", d: "Todos os nossos produtos são veganos, do prato à sobremesa." },
  { t: "Sem glúten", d: "Receitas pensadas para quem busca uma alimentação sem glúten." },
  { t: "Comida de verdade", d: "Ingredientes frescos, combinados com criatividade e cuidado." },
];

function Index() {
  const popular = products.filter((p) => p.popular);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-10 md:grid-cols-[1.05fr_1fr] md:px-8 md:pb-24 md:pt-16">
          <div className="animate-rise relative z-10">
            <Eyebrow>Vegano · Sem glúten</Eyebrow>
            <h1 className="text-display mt-6 text-primary">
              Seu próximo prato{" "}
              <span className="text-accent">
                favorito
              </span>{" "}
              é Vegui.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Comida de verdade, ingredientes vegetais e muito sabor. Uma experiência deliciosa, leve e consciente.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/cardapio" className={btn({ size: "lg" })}>
                Ver cardápio <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/sobre" className={btn({ variant: "outline", size: "lg" })}>
                Conheça a Vegui
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="arch relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
              <img
                src={hero}
                alt="Bowl vegano com grão-de-bico crocante, legumes assados e folhas frescas"
                width={1920}
                height={1088}
                className="h-full w-full object-cover object-[70%_50%]"
              />
            </div>
            <AppleIcon tone="pink" className="animate-float absolute -left-6 bottom-10 w-20 md:-left-10 md:w-28" />
          </div>
        </div>
        <img src={patternPink} alt="" aria-hidden className="pointer-events-none absolute bottom-0 left-0 w-[460px] opacity-30" />
      </section>

      {/* STRIPED MARQUEE */}
      <div className="stripes overflow-hidden border-y-4 border-paper py-0">
        <div className="bg-primary py-4">
          <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-10">
                {["vegano", "sem glúten", "feito com carinho", "sabor de verdade", "leve & consciente", "100% vegetal"].map((w) => (
                  <span key={w} className="flex items-center gap-10 text-2xl font-extrabold text-primary-foreground">
                    <span>{w}</span>
                    <AppleIcon tone="pink" className="h-6 w-6" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VALUES */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
          <div>
            <Eyebrow>Nossos diferenciais</Eyebrow>
            <h2 className="text-title mt-4 text-primary">
              Vegetal, gostoso e <span className="text-accent">do seu jeito</span>
            </h2>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-3xl bg-border sm:grid-cols-3">
            {values.map((v, i) => (
              <li key={v.t} className="bg-paper p-7">
                <span className="text-4xl font-extrabold text-accent">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-extrabold text-primary">{v.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* POPULAR */}
      <section className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Mais pedidos</Eyebrow>
            <h2 className="text-title mt-4 text-primary">Os queridinhos da casa</h2>
          </div>
          <Link to="/cardapio" className="link-underline pb-1 font-bold text-primary">
            Ver cardápio completo →
          </Link>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {popular.slice(0, 6).map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto mt-24 max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.map((c, i) => (
            <Link
              key={c.id}
              to="/cardapio"
              search={{ categoria: c.id, q: undefined }}
              className={
                "group flex aspect-square flex-col justify-between rounded-[2rem] p-6 transition hover:-translate-y-1 " +
                (i % 2 === 0 ? "bg-cream text-primary" : "bg-accent-soft text-primary-deep")
              }
            >
              <AppleIcon tone={i % 2 === 0 ? "pink" : "green"} className="h-10 w-10 transition group-hover:rotate-12" />
              <div>
                <p className="text-3xl font-extrabold md:text-4xl">{c.script}</p>
                <p className="mt-1 text-sm font-bold">{c.label} →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* INSTITUTIONAL */}
      <section className="relative mx-auto mt-24 max-w-7xl overflow-hidden rounded-none bg-primary px-5 py-20 text-primary-foreground md:rounded-[3rem] md:px-16">
        <img src={patternPink} alt="" aria-hidden className="pointer-events-none absolute right-0 top-0 w-[480px] opacity-20" />
        <div className="relative grid items-center gap-12 md:grid-cols-2">
          <div className="blob-a aspect-square overflow-hidden">
            <img src={bowl} alt="Vegui Bowl" loading="lazy" width={1024} height={1024} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-eyebrow text-accent">Sobre a Vegui</p>
            <h2 className="text-title mt-4">
              Alimentação vegetal mais <span className="text-accent">acessível</span>, criativa e presente no dia a dia.
            </h2>
            <p className="mt-6 max-w-md text-primary-foreground/80">
              A Vegui Foods nasceu para mostrar que comer bem pode ser simples, saboroso e divertido — sem ingredientes de
              origem animal e sem glúten.
            </p>
            <Link to="/sobre" className={btn({ variant: "accent", size: "lg", className: "mt-8" })}>
              Nossa história <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
