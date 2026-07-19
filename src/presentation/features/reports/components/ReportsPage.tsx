import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReportsList } from "./ReportsList";
import { ReportFilters } from "./ReportFilters";
import { ExportPanel } from "./ExportPanel";
import { ReportsLoading } from "./ReportsLoading";
import { ReportsEmpty } from "./ReportsEmpty";
import { ReportsError } from "./ReportsError";
import { useReportsQuery } from "../hooks/use-reports-query";
import type { ReportViewModel } from "../types/reports.view-model";

interface ReportsPageProps {
  portfolioId: string;
}

export function ReportsPage({ portfolioId }: ReportsPageProps) {
  const { relatorios, isLoading } = useReportsQuery();
  const [termo, setTermo] = useState("");
  const [selecionado, setSelecionado] = useState<ReportViewModel | null>(null);

  const filtrados = useMemo(() => {
    const t = termo.trim().toLowerCase();
    if (!t) return relatorios;
    return relatorios.filter(
      (r) => r.titulo.toLowerCase().includes(t) || r.descricao.toLowerCase().includes(t),
    );
  }, [relatorios, termo]);

  if (isLoading) {
    return (
      <section data-testid="reports-page" aria-label="Relatórios" className="grid gap-4">
        <ReportsLoading />
      </section>
    );
  }

  return (
    <section data-testid="reports-page" aria-label="Relatórios" className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Relatórios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ReportFilters termo={termo} onTermoChange={setTermo} />
          {filtrados.length === 0 ? (
            <ReportsEmpty onReset={() => setTermo("")} />
          ) : (
            <ReportsList relatorios={filtrados} onSelecionar={setSelecionado} />
          )}
        </CardContent>
      </Card>

      {selecionado ? (
        <ExportPanel
          portfolioId={portfolioId}
          formatos={selecionado.formatos}
          relatorioSelecionado={selecionado.titulo}
        />
      ) : null}
    </section>
  );
}
