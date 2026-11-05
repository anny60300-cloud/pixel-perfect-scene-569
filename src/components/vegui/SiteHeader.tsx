import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo-green.png";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Início" },
  { to: "/cardapio", label: "Cardápio" },
  { to: "/sobre", label: "Sobre a Vegui" },
  { to: "/contato", label: "Contato" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    setOpen(false);
    navigate({ to: "/cardapio", search: { q: q.trim() || undefined, categoria: undefined } });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        <Link to="/" aria-label="Vegui Foods — início" className="shrink-0">
          <img src={logo} alt="Vegui Foods" className="h-9 w-auto md:h-12" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="link-underline pb-1 text-sm font-bold text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <button
            aria-label="Pesquisar"
            onClick={() => setSearchOpen((s) => !s)}
            className="grid h-11 w-11 place-items-center rounded-full text-primary transition hover:bg-cream"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            to="/carrinho"
            aria-label={`Carrinho, ${count} itens`}
            className="relative grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary-deep"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[0.7rem] font-extrabold text-accent-foreground ring-2 ring-paper">
                {count}
              </span>
            )}
          </Link>
          <button
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((o) => !o)}
            className="grid h-11 w-11 place-items-center rounded-full text-primary transition hover:bg-cream lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <form onSubmit={submit} className="border-t border-border/70 bg-cream">
          <div className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-4">
            <Search className="h-5 w-5 text-primary" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Procure um prato, ingrediente ou bebida…"
              className="flex-1 bg-transparent text-lg font-semibold text-primary outline-none placeholder:text-primary/40"
            />
            <button type="submit" className="text-sm font-bold text-primary underline decoration-accent decoration-2 underline-offset-4">
              Buscar
            </button>
          </div>
        </form>
      )}

      <div className={cn("overflow-hidden bg-cream transition-[max-height] duration-500 lg:hidden", open ? "max-h-96" : "max-h-0")}>
        <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Menu móvel">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-2xl px-4 py-3 text-lg font-bold text-primary data-[status=active]:bg-paper"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
