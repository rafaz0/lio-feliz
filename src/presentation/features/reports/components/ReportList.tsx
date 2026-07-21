import type { ReportTemplateCardViewModel } from "../types/report.view-model";
import { ReportCard } from "./ReportCard";

interface ReportListProps {
  templates: ReportTemplateCardViewModel[];
  onGenerate?: (templateId: string) => void;
}

export function ReportList({ templates, onGenerate }: ReportListProps) {
  if (templates.length === 0) {
    return (
      <p data-testid="report-list-empty" className="text-center text-muted-foreground">
        Nenhum template de relatório disponível.
      </p>
    );
  }

  return (
    <div data-testid="report-list" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <ReportCard key={template.id} template={template} onGenerate={onGenerate} />
      ))}
    </div>
  );
}
