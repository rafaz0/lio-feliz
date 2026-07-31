import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { ModuleSection } from "@/components/module-section";
import { ModuleActionBar } from "@/components/domain/module-action-bar";
import { EmptyModuleState } from "@/components/domain/empty-module-state";
import { APP_NAME } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/carteira/configuracoes")({
  head: () => ({ meta: [{ title: `Configurações — ${APP_NAME}` }] }),
  component: ConfiguracoesPage,
});

function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <ModuleActionBar backTo="/carteira" backLabel="Voltar para Carteira" />
      <ModuleSection
        title="Configurações da Carteira"
        description="Gerencie as configurações específicas da sua carteira de investimentos."
      >
        <EmptyModuleState
          icon={Settings}
          title="Configurações"
          description="As configurações da sua carteira serão exibidas aqui."
        />
      </ModuleSection>
    </div>
  );
}
