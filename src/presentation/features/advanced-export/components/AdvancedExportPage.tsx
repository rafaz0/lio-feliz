import { useExportTemplatesQuery } from "../hooks/use-exports-query";
import { useSolicitarExportacaoMutation } from "../hooks/use-solicitar-exportacao-mutation";
import { ExportTemplateCard } from "./ExportTemplateCard";
import { AdvancedExportLoading } from "./AdvancedExportLoading";
import { AdvancedExportEmpty } from "./AdvancedExportEmpty";
import { AdvancedExportError } from "./AdvancedExportError";

interface AdvancedExportPageProps {
  portfolioId: string;
}

export function AdvancedExportPage({ portfolioId }: AdvancedExportPageProps) {
  const { data: templates, isLoading, isError, refetch } = useExportTemplatesQuery();
  const solicitar = useSolicitarExportacaoMutation(portfolioId);

  if (isLoading) return <AdvancedExportLoading />;
  if (isError)
    return <AdvancedExportError message="Erro ao carregar templates" onRetry={refetch} />;

  return (
    <div data-testid="exports-page" className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Exportacao Avancada</h1>
        <p className="text-sm text-muted-foreground">
          Exporte relatorios em PDF, CSV, JSON ou XLSX.
        </p>
      </div>

      {!templates || templates.length === 0 ? (
        <AdvancedExportEmpty />
      ) : (
        <div className="space-y-3">
          {templates.map((t) => (
            <ExportTemplateCard
              key={t.id}
              template={t}
              onExport={(id) => solicitar.mutate(id)}
              isPending={solicitar.isPending}
            />
          ))}
        </div>
      )}

      {solicitar.data && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm">
          Exportacao solicitada: <strong>{solicitar.data.id}</strong>
          {solicitar.data.checksum && (
            <p className="text-xs text-muted-foreground font-mono mt-1">
              Checksum: {solicitar.data.checksum}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
