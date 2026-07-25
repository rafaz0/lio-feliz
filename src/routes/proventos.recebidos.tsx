import { createFileRoute, Link } from "@tanstack/react-router";
import { Coins, ExternalLink } from "lucide-react";
import { ModuleSection } from "@/components/module-section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/proventos/recebidos")({
  head: () => [{ title: "Recebidos — Investidor Pro" }],
  component: () => (
    <ModuleSection title="Proventos Recebidos" description="Histórico de dividendos e JCP recebidos.">
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-16 text-center">
        <Coins className="mb-3 size-10 text-muted-foreground/40" strokeWidth={1.5} />
        <h3 className="text-sm font-medium text-foreground">Proventos Recebidos</h3>
        <p className="mt-1 max-w-xs text-xs text-muted-foreground">
          Histórico completo de proventos recebidos na sua carteira.
        </p>
        <Button asChild variant="outline" size="sm" className="mt-4 gap-1.5">
          <Link to="/_authenticated/carteira/proventos"><ExternalLink className="size-3.5" /> Versão completa</Link>
        </Button>
      </div>
    </ModuleSection>
  ),
});
