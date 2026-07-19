import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExportProgress } from "./ExportProgress";
import { useExportReportMutation } from "../hooks/use-export-report-mutation";
import { toExportResultViewModel, type ExportResultViewModel } from "../types/reports.view-model";
import type { ReportFormato } from "../types/reports.view-model";

interface ExportPanelProps {
  portfolioId: string;
  formatos: ReportFormato[];
  relatorioSelecionado: string;
}

function download(nomeArquivo: string, conteudo: string, formato: string) {
  const blob = new Blob([conteudo], {
    type: formato === "csv" ? "text/csv" : "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = nomeArquivo;
  link.click();
  URL.revokeObjectURL(url);
}

export function ExportPanel({ portfolioId, formatos, relatorioSelecionado }: ExportPanelProps) {
  const [formato, setFormato] = useState<ReportFormato>(formatos[0] ?? "json");
  const [resultado, setResultado] = useState<ExportResultViewModel | null>(null);

  const { mutateAsync, isPending, isError, error } = useExportReportMutation();

  const handleExport = () => {
    setResultado(null);
    mutateAsync({ portfolioId, formato })
      .then((dto) => {
        const vm = toExportResultViewModel(dto);
        setResultado(vm);
        download(vm.nomeArquivo, vm.conteudo, vm.formato);
      })
      .catch(() => {});
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exportar: {relatorioSelecionado}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div data-testid="export-formatos" role="group" aria-label="Formato de exportação">
          {formatos.map((f) => (
            <button
              key={f}
              type="button"
              data-testid={`export-formato-${f}`}
              aria-pressed={formato === f}
              onClick={() => setFormato(f)}
              className={
                formato === f
                  ? "mr-2 rounded bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
                  : "mr-2 rounded bg-secondary px-3 py-1.5 text-sm font-medium"
              }
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {isPending ? (
          <ExportProgress formato={formato} />
        ) : (
          <button
            type="button"
            data-testid="export-submit"
            onClick={handleExport}
            className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Exportar
          </button>
        )}

        {isError ? (
          <p data-testid="export-error" role="alert" className="text-sm text-destructive">
            {(error as { message?: string })?.message ?? "Falha na exportação"}
          </p>
        ) : null}

        {resultado ? (
          <div data-testid="export-result" className="text-sm">
            <p>
              Arquivo <span className="font-medium">{resultado.nomeArquivo}</span> gerado (
              {resultado.tamanho} caracteres).
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
