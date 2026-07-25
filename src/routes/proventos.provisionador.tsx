import { createFileRoute, Link } from "@tanstack/react-router";
import { PiggyBank, ExternalLink } from "lucide-react";
import { ModuleSection } from "@/components/module-section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/proventos/provisionador")({
  head: () => [{ title: "Provisionador — Investidor Pro" }],
  component: () => (
    <ModuleSection title="Provisionador de Dividendos" description="Projete seus dividendos futuros.">
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-16 text-center">
        <PiggyBank className="mb-3 size-10 text-muted-foreground/40" strokeWidth={1.5} />
        <h3 className="text-sm font-medium text-foreground">Provisionador</h3>
        <p className="mt-1 max-w-xs text-xs text-muted-foreground">
          Projeção de dividendos com base no histórico da sua carteira.
        </p>
        <Button asChild variant="outline" size="sm" className="mt-4 gap-1.5">
          <Link to="/_authenticated/provisionador"><ExternalLink className="size-3.5" /> Versão completa</Link>
        </Button>
      </div>
    </ModuleSection>
  ),
});
