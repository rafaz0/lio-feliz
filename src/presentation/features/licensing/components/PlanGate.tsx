import { Lock, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

interface PlanGateProps {
  capability: string;
  currentTier: string;
}

const CAPABILITY_LABELS: Record<string, string> = {
  export: "Exportação de dados",
  relatorios_avancados: "Relatórios avançados",
  analytics: "Análise avançada",
  backtest: "Backtest",
  alertas: "Alertas inteligentes",
  metas_ilimitadas: "Metas ilimitadas",
};

export function PlanGate({ capability, currentTier }: PlanGateProps) {
  const featureLabel = CAPABILITY_LABELS[capability] ?? capability;

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card px-6 py-8 text-center">
      <Lock className="size-8 text-muted-foreground/40" strokeWidth={1.5} />
      <div>
        <h4 className="text-sm font-medium text-foreground">Funcionalidade Premium</h4>
        <p className="mt-1 text-xs text-muted-foreground">
          {featureLabel} está disponível apenas em planos superiores ao seu plano atual (
          {currentTier}).
        </p>
      </div>
      <Button asChild size="sm" className="gap-1.5">
        <Link to="/_authenticated/checkout">
          <Sparkles className="size-3.5" /> Fazer upgrade
        </Link>
      </Button>
    </div>
  );
}
