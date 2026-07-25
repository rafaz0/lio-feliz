import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, ExternalLink } from "lucide-react";
import { ModuleSection } from "@/components/module-section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/analise/watchlist")({
  head: () => [{ title: "Watchlist — Investidor Pro" }],
  component: () => (
    <ModuleSection title="Watchlist" description="Monitore seus ativos favoritos.">
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-16 text-center">
        <Star className="mb-3 size-10 text-muted-foreground/40" strokeWidth={1.5} />
        <Button asChild variant="outline" size="sm" className="gap-1.5">
          <Link to="/watchlist">
            <ExternalLink className="size-3.5" /> Versão completa
          </Link>
        </Button>
      </div>
    </ModuleSection>
  ),
});
