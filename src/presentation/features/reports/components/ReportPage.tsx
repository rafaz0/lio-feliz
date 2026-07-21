import { useMemo } from "react";
import { useReportListQuery } from "../hooks/use-report-list-query";
import { toReportsPageViewModel } from "../types/report.view-model";
import { ReportLoading } from "./ReportLoading";
import { ReportError } from "./ReportError";
import { ReportList } from "./ReportList";

interface ReportPageProps {
  portfolioId: string;
  onGenerate?: (templateId: string) => void;
}

export function ReportPage({ portfolioId, onGenerate }: ReportPageProps) {
  const templatesQuery = useReportListQuery();

  const viewModel = useMemo(() => {
    if (!templatesQuery.data) return null;
    return toReportsPageViewModel(templatesQuery.data.templates, [], []);
  }, [templatesQuery.data]);

  if (templatesQuery.isLoading) return <ReportLoading />;

  if (templatesQuery.isError || !viewModel) {
    return (
      <ReportError
        message={templatesQuery.error?.message ?? "Nao foi possivel carregar os relatorios."}
        onRetry={templatesQuery.refetch}
      />
    );
  }

  return (
    <section data-testid="report-page" aria-label="Relatorios" className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Relatorios Disponiveis</h2>
        <p className="text-sm text-muted-foreground">
          Selecione um template para gerar um relatorio da carteira
        </p>
      </div>
      <ReportList templates={viewModel.templates} onGenerate={onGenerate} />
    </section>
  );
}
