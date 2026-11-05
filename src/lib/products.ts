import risoto from "@/assets/risoto-verde.jpg";
import bowl from "@/assets/vegui-bowl.jpg";
import avocado from "@/assets/avocado.jpg";
import garden from "@/assets/garden-crunch.jpg";
import mushroom from "@/assets/mushroom-melt.jpg";
import choco from "@/assets/choco-hug.jpg";
import berry from "@/assets/berry-dream.jpg";
import lemonade from "@/assets/pink-lemonade.jpg";
import greenBoost from "@/assets/green-boost.jpg";
import tropical from "@/assets/tropical-vibes.jpg";

export type CategoryId = "pratos" | "sanduiches" | "sobremesas" | "bebidas";

export const categories: { id: CategoryId; label: string; script: string }[] = [
  { id: "pratos", label: "Pratos principais", script: "pratos" },
  { id: "sanduiches", label: "Sanduíches", script: "sanduíches" },
  { id: "sobremesas", label: "Sobremesas", script: "doces" },
  { id: "bebidas", label: "Bebidas", script: "bebidas" },
];

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  /** price in cents */
  price: number;
  description: string;
  /** Ingredients named in the official menu description. Quantities pending validation. */
  ingredients: string[];
  image: string;
  popular?: boolean;
};

export const products: Product[] = [
  {
    slug: "risoto-verde",
    name: "Risoto Verde",
    category: "pratos",
    price: 2990,
    description:
      "Risoto cremoso de ervilhas, alho-poró e ervas frescas, finalizado com castanhas.",
    ingredients: ["Arroz para risoto", "Ervilhas", "Alho-poró", "Ervas frescas", "Castanhas"],
    image: risoto,
    popular: true,
  },
  {
    slug: "vegui-bowl",
    name: "Vegui Bowl",
    category: "pratos",
    price: 2790,
    description:
      "Arroz integral, grão-de-bico crocante, legumes assados, folhas frescas e molho cítrico.",
    ingredients: ["Arroz integral", "Grão-de-bico crocante", "Legumes assados", "Folhas frescas", "Molho cítrico"],
    image: bowl,
    popular: true,
  },
  {
    slug: "avocado",
    name: "Avocado",
    category: "sanduiches",
    price: 2290,
    description: "Pão artesanal, creme de avocado, alface fresca, tomate e maionese vegana.",
    ingredients: ["Pão artesanal", "Creme de avocado", "Alface fresca", "Tomate", "Maionese vegana"],
    image: avocado,
    popular: true,
  },
  {
    slug: "garden-crunch",
    name: "Garden Crunch",
    category: "sanduiches",
    price: 1990,
    description:
      "Pão integral, grão-de-bico temperado, cenoura, folhas frescas e molho especial da casa.",
    ingredients: ["Pão integral", "Grão-de-bico temperado", "Cenoura", "Folhas frescas", "Molho especial da casa"],
    image: garden,
  },
  {
    slug: "mushroom-melt",
    name: "Mushroom Melt",
    category: "sanduiches",
    price: 2490,
    description: "Pão artesanal, cogumelos salteados, cebola caramelizada e queijo vegetal cremoso.",
    ingredients: ["Pão artesanal", "Cogumelos salteados", "Cebola caramelizada", "Queijo vegetal cremoso"],
    image: mushroom,
  },
  {
    slug: "choco-hug",
    name: "Choco Hug",
    category: "sobremesas",
    price: 1290,
    description: "Brownie de chocolate 100% vegano, com textura macia e sabor intenso.",
    ingredients: ["Chocolate", "Base de brownie vegana"],
    image: choco,
    popular: true,
  },
  {
    slug: "berry-dream",
    name: "Berry Dream",
    category: "sobremesas",
    price: 1690,
    description: "Cheesecake vegetal de frutas vermelhas, com base crocante e creme delicado.",
    ingredients: ["Frutas vermelhas", "Creme vegetal", "Base crocante"],
    image: berry,
  },
  {
    slug: "pink-lemonade",
    name: "Pink Lemonade",
    category: "bebidas",
    price: 990,
    description: "Limonada refrescante com morango natural.",
    ingredients: ["Limão", "Morango natural"],
    image: lemonade,
    popular: true,
  },
  {
    slug: "green-boost",
    name: "Green Boost",
    category: "bebidas",
    price: 1190,
    description: "Suco de maçã, couve, limão e gengibre.",
    ingredients: ["Maçã", "Couve", "Limão", "Gengibre"],
    image: greenBoost,
  },
  {
    slug: "tropical-vibes",
    name: "Tropical Vibes",
    category: "bebidas",
    price: 1090,
    description: "Suco natural de manga com maracujá.",
    ingredients: ["Manga", "Maracujá"],
    image: tropical,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatBRL = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const normalize = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function searchProducts(q: string) {
  const n = normalize(q.trim());
  if (!n) return products;
  return products.filter((p) =>
    normalize(`${p.name} ${p.description} ${p.ingredients.join(" ")}`).includes(n),
  );
}
