import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { ModuleSection } from "@/components/module-section";

export const Route = createFileRoute("/_authenticated/carteira/rebalanceamento")({
  head: () => [{ title: "Rebalanceamento — Investidor Pro" }],
  component: RebalanceamentoPage,
});

function RebalanceamentoPage() {
  return (
    <div className="space-y-6">
      <ModuleSection
        title="Rebalanceamento"
        description="Acompanhe a alocação da sua carteira e encontre oportunidades de rebalanceamento."
      >
        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-16 text-center">
          <BarChart3 className="mb-3 size-10 text-muted-foreground/40" strokeWidth={1.5} />
          <h3 className="text-sm font-medium text-foreground">Rebalanceamento</h3>
          <p className="mt-1 max-w-xs text-xs text-muted-foreground">
            O rebalanceamento da carteira será exibido aqui. Volte em breve para conferir as
            novidades.
          </p>
        </div>
      </ModuleSection>
    </div>
  );
}
