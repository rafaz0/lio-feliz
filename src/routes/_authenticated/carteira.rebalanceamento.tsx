import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { ModuleSection } from "@/components/module-section";
import { ModuleActionBar } from "@/components/domain/module-action-bar";
import { EmptyModuleState } from "@/components/domain/empty-module-state";

export const Route = createFileRoute("/_authenticated/carteira/rebalanceamento")({
  head: () => ({ meta: [{ title: "Rebalanceamento — Investidor Pro" }] }),
  component: RebalanceamentoPage,
});

function RebalanceamentoPage() {
  return (
    <div className="space-y-6">
      <ModuleActionBar backTo="/carteira" backLabel="Voltar para Carteira" />
      <ModuleSection
        title="Rebalanceamento"
        description="Acompanhe a alocação da sua carteira e encontre oportunidades de rebalanceamento."
      >
        <EmptyModuleState
          icon={BarChart3}
          title="Rebalanceamento"
          description="O rebalanceamento da carteira será exibido aqui. Volte em breve."
        />
      </ModuleSection>
    </div>
  );
}
