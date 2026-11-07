import { Link } from "@tanstack/react-router";
import logoCream from "@/assets/logo-cream.png";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-primary text-primary-foreground">
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <img src={logoCream} alt="Vegui Foods" className="h-14 w-auto" />
          <p className="mt-6 max-w-sm text-primary-foreground/80">
            Comida vegana e sem glúten, feita para entrar no seu dia a dia com leveza e muito sabor.
          </p>
          <p className="mt-6 text-3xl font-extrabold text-accent">com carinho, Vegui.</p>
        </div>
        <div>
          <p className="text-eyebrow text-accent">Navegue</p>
          <ul className="mt-5 space-y-3 font-semibold">
            <li><Link to="/cardapio" className="hover:text-accent">Cardápio</Link></li>
            <li><Link to="/sobre" className="hover:text-accent">Sobre a Vegui</Link></li>
            <li><Link to="/contato" className="hover:text-accent">Localização e contato</Link></li>
            <li><Link to="/carrinho" className="hover:text-accent">Carrinho</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-eyebrow text-accent">Contato</p>
          <p className="mt-5 text-primary-foreground/80">
            Rua Chile, 1678 — Curitiba/PR
            <br />
            Seg a sex, 8h às 21h
            <br />
            (67) 0000-0000
          </p>
          <Link to="/contato" className="mt-4 inline-block font-bold underline decoration-accent decoration-2 underline-offset-4">
            Ver detalhes
          </Link>
        </div>
      </div>
      <div className="relative border-t border-primary-foreground/15">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-primary-foreground/60 md:px-8">
          © {new Date().getFullYear()} Vegui Foods. Todos os produtos são veganos e sem glúten.
        </p>
      </div>
    </footer>
  );
}
