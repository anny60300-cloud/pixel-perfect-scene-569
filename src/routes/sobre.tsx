import { createFileRoute, Link } from "@tanstack/react-router";
import cliente from "@/assets/cliente-vegui.jpg";
import { AppleIcon, btn, Eyebrow } from "@/components/vegui/primitives";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a Vegui — Vegui Foods" },
      { name: "description", content: "A Vegui Foods torna a alimentação vegetal mais acessível, saborosa e criativa." },
      { property: "og:title", content: "Sobre a Vegui — Vegui Foods" },
      { property: "og:description", content: "Conheça a proposta vegana e sem glúten da Vegui Foods." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        <div className="relative mx-auto max-w-5xl px-5 py-20 text-center md:py-28">
          <AppleIcon className="mx-auto w-16" />
          <h1 className="text-display mt-8 text-primary">
            Comer bem pode ser <span className="text-accent">leve</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A Vegui Foods é uma marca de alimentação vegana, com produtos sem glúten, que busca tornar a alimentação
            vegetal mais acessível, saborosa, criativa e presente no cotidiano.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8">
        <div className="arch aspect-[4/5] overflow-hidden">
          <img
            src={cliente}
            alt="Cliente sorrindo enquanto come um bowl vegano da Vegui"
            loading="lazy"
            width={1024}
            height={1280}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <Eyebrow>No que acreditamos</Eyebrow>
          <ul className="mt-8 space-y-8">
            {[
              ["Natural", "Ingredientes vegetais e comida de verdade, sem complicação."],
              ["Criativa", "Combinações que surpreendem e deixam o dia mais gostoso."],
              ["Acolhedora", "Uma marca para todo mundo, vegano ou não."],
            ].map(([t, d]) => (
              <li key={t} className="border-l-4 border-accent pl-5">
                <h2 className="text-2xl font-extrabold text-primary">{t}</h2>
                <p className="mt-1 text-muted-foreground">{d}</p>
              </li>
            ))}
          </ul>
          <Link to="/cardapio" className={btn({ size: "lg", className: "mt-10" })}>
            Provar o cardápio
          </Link>
        </div>
      </section>
    </>
  );
}
