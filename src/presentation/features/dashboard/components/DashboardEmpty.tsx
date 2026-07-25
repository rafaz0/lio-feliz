import { Link } from "@tanstack/react-router";
import { BarChart3, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardEmpty() {
  return (
    <div
      data-testid="dashboard-empty"
      className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-10 text-center"
    >
      <BarChart3 className="mb-3 size-10 text-muted-foreground/40" strokeWidth={1.5} />
      <h2 className="text-lg font-semibold">Bem-vindo ao Dashboard</h2>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Sua carteira ainda não possui dados suficientes para gerar indicadores.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild className="gap-2">
          <Link to="/carteira">
            <Plus className="size-4" /> Criar carteira
          </Link>
        </Button>
        <Button asChild variant="outline" className="gap-2">
          <Link to="/">
            <BarChart3 className="size-4" /> Explorar mercado
          </Link>
        </Button>
      </div>
    </div>
  );
}
