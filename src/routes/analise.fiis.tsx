import { createFileRoute } from "@tanstack/react-router";
import { Building2, ExternalLink } from "lucide-react";
import { ModuleSection } from "@/components/module-section";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/analise/fiis")({
  head: () => ({ meta: [{ title: "FIIs — Investidor Pro" }] }),
  component: () => (
    <ModuleSection title="Fundos Imobiliários" description="Análise completa de FIIs.">
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-16 text-center">
        <Building2 className="mb-3 size-10 text-muted-foreground/40" strokeWidth={1.5} />
        <h3 className="text-sm font-medium text-foreground">Análise de FIIs</h3>
        <p className="mt-1 max-w-xs text-xs text-muted-foreground">
          Visualização completa de FIIs será exibida aqui.
        </p>
        <Button asChild variant="outline" size="sm" className="mt-4 gap-1.5">
          <Link to="/fiis">
            <ExternalLink className="size-3.5" /> Versão completa
          </Link>
        </Button>
      </div>
    </ModuleSection>
  ),
});
