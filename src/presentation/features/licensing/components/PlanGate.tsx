import { Crown, LockKeyhole, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

interface PlanGateProps {
  capability: string;
  currentTier: string;
}

const CAPABILITY_LABELS: Record<string, { label: string; requiredTier: string }> = {
  "backtest:execute": { label: "Backtests", requiredTier: "BASIC" },
  "alertas:view": { label: "Alertas inteligentes", requiredTier: "BASIC" },
  "export:advanced": { label: "Exportação avançada", requiredTier: "BASIC" },
};

const TIER_NAMES: Record<string, string> = {
  FREE: "Free",
  BASIC: "Basic",
  PREMIUM: "Premium",
};

export function PlanGate({ capability, currentTier }: PlanGateProps) {
  const info = CAPABILITY_LABELS[capability];
  const featureLabel = info?.label ?? capability;
  const requiredTier = info?.requiredTier ?? "PREMIUM";
  const requiredLabel = TIER_NAMES[requiredTier] ?? requiredTier;
  const currentLabel = TIER_NAMES[currentTier] ?? currentTier;

  return (
    <div
      className="flex flex-col items-center gap-4 rounded-xl border border-border/60 bg-gradient-to-b from-card to-secondary/20 px-6 py-10 text-center md:px-10"
      role="region"
      aria-label="Funcionalidade Premium"
    >
      <div className="relative">
        <LockKeyhole className="size-10 text-muted-foreground/30" strokeWidth={1.5} />
        <Crown className="absolute -right-2 -top-1 size-4 text-amber-400" strokeWidth={2} />
      </div>

      <div className="max-w-xs">
        <h4 className="text-base font-semibold text-foreground">{featureLabel}</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Esta funcionalidade requer o plano{" "}
          <strong className="text-foreground">{requiredLabel}</strong>. Seu plano atual é{" "}
          <strong className="text-foreground">{currentLabel}</strong>.
        </p>
      </div>

      <Button asChild size="sm" className="gap-1.5">
        <Link to="/_authenticated/checkout">
          <Sparkles className="size-3.5" /> Fazer upgrade para {requiredLabel}
        </Link>
      </Button>
    </div>
  );
}
