import type { ReportTemplateCardViewModel } from "../types/report.view-model";

interface ReportCardProps {
  template: ReportTemplateCardViewModel;
  onGenerate?: (templateId: string) => void;
}

export function ReportCard({ template, onGenerate }: ReportCardProps) {
  return (
    <div
      data-testid={`report-card-${template.id}`}
      className="rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="text-lg font-bold">{template.icon}</span>
        <h3 className="font-semibold">{template.name}</h3>
      </div>
      <p className="mb-3 text-sm text-muted-foreground">{template.description}</p>
      <div className="mb-3 flex flex-wrap gap-1">
        {template.supportedFormats.map((fmt) => (
          <span key={fmt} className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">
            {fmt}
          </span>
        ))}
      </div>
      {onGenerate && (
        <button
          onClick={() => onGenerate(template.id)}
          className="w-full rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Gerar Relatório
        </button>
      )}
    </div>
  );
}
