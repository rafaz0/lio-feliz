import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, ExternalLink } from "lucide-react";
import { ModuleSection } from "@/components/module-section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/proventos/calendario")({
  head: () => [{ title: "Calendário — Investidor Pro" }],
  component: () => (
    <ModuleSection title="Calendário de Dividendos" description="Dividendos e JCP declarados pelas empresas.">
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-16 text-center">
        <CalendarDays className="mb-3 size-10 text-muted-foreground/40" strokeWidth={1.5} />
        <h3 className="text-sm font-medium text-foreground">Calendário de Dividendos</h3>
        <p className="mt-1 max-w-xs text-xs text-muted-foreground">
          Calendário completo com todos os dividendos e JCP declarados.
        </p>
        <Button asChild variant="outline" size="sm" className="mt-4 gap-1.5">
          <Link to="/dividendos"><ExternalLink className="size-3.5" /> Versão completa</Link>
        </Button>
      </div>
    </ModuleSection>
  ),
});
