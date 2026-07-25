import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, ExternalLink } from "lucide-react";
import { ModuleSection } from "@/components/module-section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/proventos/cobertura")({
  head: () => [{ title: "Cobertura — Investidor Pro" }],
  component: () => (
    <ModuleSection title="Cobertura de Despesas" description="Quanto seus dividendos cobrem suas despesas.">
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-16 text-center">
        <ShieldCheck className="mb-3 size-10 text-muted-foreground/40" strokeWidth={1.5} />
        <h3 className="text-sm font-medium text-foreground">Cobertura de Despesas</h3>
        <p className="mt-1 max-w-xs text-xs text-muted-foreground">
          Acompanhe a cobertura das suas despesas mensais com proventos.
        </p>
        <Button asChild variant="outline" size="sm" className="mt-4 gap-1.5">
          <Link to="/_authenticated/carteira/cobertura"><ExternalLink className="size-3.5" /> Versão completa</Link>
        </Button>
      </div>
    </ModuleSection>
  ),
});
