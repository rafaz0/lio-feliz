import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, ExternalLink } from "lucide-react";
import { ModuleSection } from "@/components/module-section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/analise/setores")({
  head: () => ({ meta: [{ title: "Setores — Investidor Pro" }] }),
  component: () => (
    <ModuleSection title="Setores" description="Análise por setor da B3.">
      <p className="text-sm text-muted-foreground">
        <Button asChild variant="outline" size="sm" className="gap-1.5">
          <Link to="/setores">
            <ExternalLink className="size-3.5" /> Versão completa
          </Link>
        </Button>
      </p>
    </ModuleSection>
  ),
});
