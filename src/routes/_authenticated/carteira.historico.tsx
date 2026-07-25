import { createFileRoute } from "@tanstack/react-router";
import { History } from "lucide-react";
import { ModuleSection } from "@/components/module-section";

export const Route = createFileRoute("/_authenticated/carteira/historico")({
  head: () => [{ title: "Histórico — Investidor Pro" }],
  component: HistoricoPage,
});

function HistoricoPage() {
  return (
    <div className="space-y-6">
      <ModuleSection
        title="Histórico"
        description="Visualize o histórico completo de operações e eventos da sua carteira."
      >
        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-16 text-center">
          <History className="mb-3 size-10 text-muted-foreground/40" strokeWidth={1.5} />
          <h3 className="text-sm font-medium text-foreground">Histórico</h3>
          <p className="mt-1 max-w-xs text-xs text-muted-foreground">
            O histórico completo da sua carteira será exibido aqui. Volte em breve.
          </p>
        </div>
      </ModuleSection>
    </div>
  );
}
