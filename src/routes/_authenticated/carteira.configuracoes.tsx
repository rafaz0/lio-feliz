import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { ModuleSection } from "@/components/module-section";

export const Route = createFileRoute("/_authenticated/carteira/configuracoes")({
  head: () => [{ title: "Configurações — Investidor Pro" }],
  component: ConfiguracoesPage,
});

function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <ModuleSection
        title="Configurações da Carteira"
        description="Gerencie as configurações específicas da sua carteira de investimentos."
      >
        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-16 text-center">
          <Settings className="mb-3 size-10 text-muted-foreground/40" strokeWidth={1.5} />
          <h3 className="text-sm font-medium text-foreground">Configurações</h3>
          <p className="mt-1 max-w-xs text-xs text-muted-foreground">
            As configurações da sua carteira serão exibidas aqui. Volte em breve.
          </p>
        </div>
      </ModuleSection>
    </div>
  );
}
