import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { categories, formatBRL, type Product } from "@/lib/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();
  const cat = categories.find((c) => c.id === product.category);
  return (
    <article className="group flex flex-col">
      <div className="relative">
      <Link
        to="/produto/$slug"
        params={{ slug: product.slug }}
        className="arch relative block aspect-[4/5] overflow-hidden bg-cream"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </Link>
      <button
        onClick={() => {
          add(product.slug);
          toast.success(`${product.name} foi para o carrinho`);
        }}
        aria-label={`Adicionar ${product.name} ao carrinho`}
        className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-paper text-primary transition hover:bg-accent group-hover:scale-105"
      >
        <Plus className="h-5 w-5" />
      </button>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-eyebrow text-accent-foreground/70">{cat?.script}</p>
          <Link to="/produto/$slug" params={{ slug: product.slug }}>
            <h3 className="text-xl font-extrabold text-primary">{product.name}</h3>
          </Link>
          <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        </div>
        <p className="text-price shrink-0 rounded-full bg-accent-soft px-3 py-1 text-sm text-primary-deep">
          {formatBRL(product.price)}
        </p>
      </div>
    </article>
  );
}
