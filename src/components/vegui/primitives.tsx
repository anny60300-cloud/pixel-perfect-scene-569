import { cva, type VariantProps } from "class-variance-authority";
import { Minus, Plus } from "lucide-react";
import iconGreen from "@/assets/icon-green.png";
import iconPink from "@/assets/icon-pink.png";
import { cn } from "@/lib/utils";

export const btn = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-deep",
        accent: "bg-accent text-accent-foreground hover:bg-accent-soft",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        ghost: "text-primary hover:bg-cream",
        cream: "bg-cream text-primary hover:bg-paper",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-12 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);
export type BtnProps = VariantProps<typeof btn>;

export function Tag({
  children,
  tone = "green",
}: {
  children: React.ReactNode;
  tone?: "green" | "pink" | "pending";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider",
        tone === "green" && "bg-primary/10 text-primary",
        tone === "pink" && "bg-accent-soft text-accent-foreground",
        tone === "pending" && "border border-dashed border-muted-foreground/40 text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

export function AppleIcon({ tone = "green", className }: { tone?: "green" | "pink"; className?: string }) {
  return <img src={tone === "green" ? iconGreen : iconPink} alt="" aria-hidden className={cn("select-none", className)} />;
}

export function Qty({
  value,
  onChange,
  size = "md",
}: {
  value: number;
  onChange: (n: number) => void;
  size?: "sm" | "md";
}) {
  const s = size === "sm" ? "h-8 w-8" : "h-11 w-11";
  return (
    <div className="inline-flex items-center rounded-full border-2 border-primary/20 bg-paper p-0.5">
      <button
        type="button"
        aria-label="Diminuir quantidade"
        onClick={() => onChange(value - 1)}
        className={cn(s, "grid place-items-center rounded-full text-primary transition hover:bg-cream")}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className={cn("min-w-8 text-center font-bold tabular-nums text-primary", size === "md" && "text-lg")} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="Aumentar quantidade"
        onClick={() => onChange(value + 1)}
        className={cn(s, "grid place-items-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary-deep")}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-eyebrow flex items-center gap-2 text-primary", className)}>
      <AppleIcon tone="pink" className="h-4 w-4" />
      {children}
    </p>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-primary">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export const inputCls =
  "w-full rounded-2xl border-2 border-input bg-paper px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-primary";
