import type { ExportTemplateViewModel } from "../viewmodels/exports.view-model";

interface ExportTemplateCardProps {
  template: ExportTemplateViewModel;
  onExport: (templateId: string) => void;
  isPending: boolean;
}

export function ExportTemplateCard({ template, onExport, isPending }: ExportTemplateCardProps) {
  return (
    <div data-testid={`export-template-${template.id}`} className="rounded-lg border p-4 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">{template.name}</p>
        <p className="text-xs text-muted-foreground">{template.description} · {template.format}</p>
        {template.version && <p className="text-xs text-muted-foreground">v{template.version}</p>}
      </div>
      <button onClick={() => onExport(template.id)} disabled={isPending} className="rounded-md bg-foreground px-3 py-1 text-xs text-background disabled:opacity-50">
        {isPending ? "Exportando..." : "Exportar"}
      </button>
    </div>
  );
}
