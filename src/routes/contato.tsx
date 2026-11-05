import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, MessageCircle } from "lucide-react";
import { btn, Eyebrow } from "@/components/vegui/primitives";
import { whatsappUrl, WHATSAPP_NUMBER } from "@/lib/cart-logic";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Localização e contato — Vegui Foods" },
      { name: "description", content: "Fale com a Vegui Foods e saiba onde nos encontrar." },
      { property: "og:title", content: "Localização e contato — Vegui Foods" },
      { property: "og:description", content: "Fale com a Vegui Foods pelo WhatsApp." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const items = [
    { icon: MapPin, t: "Endereço", d: "Pendente de validação" },
    { icon: Clock, t: "Horário de funcionamento", d: "Pendente de validação" },
    { icon: MessageCircle, t: "WhatsApp", d: WHATSAPP_NUMBER || "Pendente de validação" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 pt-14 md:px-8 md:pt-20">
      <Eyebrow>Contato</Eyebrow>
      <h1 className="text-display mt-4 text-primary">
        Vem <span className="font-script text-accent">bater um papo</span>
      </h1>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {items.map(({ icon: Icon, t, d }, i) => (
          <div key={t} className={"rounded-[2rem] p-8 " + (i === 1 ? "bg-accent-soft" : "bg-cream")}>
            <Icon className="h-7 w-7 text-primary" />
            <h2 className="mt-6 text-lg font-extrabold text-primary">{t}</h2>
            <p className="mt-1 text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-start gap-4 rounded-[2rem] bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:justify-between md:p-12">
        <p className="text-2xl font-extrabold md:text-3xl">
          Dúvidas sobre ingredientes ou alergias? <span className="font-script text-accent">Fala com a gente.</span>
        </p>
        <a href={whatsappUrl("Olá, Vegui! Tenho uma dúvida.")} target="_blank" rel="noopener noreferrer" className={btn({ variant: "accent", size: "lg" })}>
          <MessageCircle className="h-5 w-5" /> Chamar no WhatsApp
        </a>
      </div>
    </section>
  );
}
