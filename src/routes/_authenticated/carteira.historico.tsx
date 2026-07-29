import { createFileRoute } from "@tanstack/react-router";
import { History } from "lucide-react";
import { ModuleSection } from "@/components/module-section";
import { ModuleActionBar } from "@/components/domain/module-action-bar";
import { EmptyModuleState } from "@/components/domain/empty-module-state";

export const Route = createFileRoute("/_authenticated/carteira/historico")({
  head: () => ({ meta: [{ title: "Histórico — Investidor Pro" }] }),
  component: HistoricoPage,
});

function HistoricoPage() {
  return (
    <div className="space-y-6">
      <ModuleActionBar backTo="/carteira" backLabel="Voltar para Carteira" />
      <ModuleSection
        title="Histórico"
        description="Visualize o histórico completo de operações e eventos da sua carteira."
      >
        <EmptyModuleState
          icon={History}
          title="Histórico"
          description="O histórico completo será exibido aqui. Volte em breve."
        />
      </ModuleSection>
    </div>
  );
}
