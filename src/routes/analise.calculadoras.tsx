import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator, ExternalLink } from "lucide-react";
import { ModuleSection } from "@/components/module-section";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/brand";

export const Route = createFileRoute("/analise/calculadoras")({
  head: () => ({ meta: [{ title: `Calculadoras — ${APP_NAME}` }] }),
  component: () => (
    <ModuleSection title="Calculadoras" description="Juros Compostos, DCF, Preço Teto e CDB.">
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-16 text-center">
        <Calculator className="mb-3 size-10 text-muted-foreground/40" strokeWidth={1.5} />
        <Button asChild variant="outline" size="sm" className="gap-1.5">
          <Link to="/calculadoras">
            <ExternalLink className="size-3.5" /> Versão completa
          </Link>
        </Button>
      </div>
    </ModuleSection>
  ),
});
