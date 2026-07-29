import { createFileRoute, Link } from "@tanstack/react-router";
import { Medal, ExternalLink } from "lucide-react";
import { ModuleSection } from "@/components/module-section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/analise/rankings")({
  head: () => ({ meta: [{ title: "Rankings — Investidor Pro" }] }),
  component: () => (
    <ModuleSection title="Rankings" description="DY, P/L, Graham, Bazin e mais.">
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-16 text-center">
        <Medal className="mb-3 size-10 text-muted-foreground/40" strokeWidth={1.5} />
        <Button asChild variant="outline" size="sm" className="gap-1.5">
          <Link to="/rankings">
            <ExternalLink className="size-3.5" /> Versão completa
          </Link>
        </Button>
      </div>
    </ModuleSection>
  ),
});
