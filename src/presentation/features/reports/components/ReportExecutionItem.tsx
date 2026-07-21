import type { ReportExecutionHistoryViewModel } from "../types/report.view-model";

interface ReportExecutionItemProps {
  execution: ReportExecutionHistoryViewModel;
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendente",
  PROCESSING: "Processando",
  COMPLETED: "Concluído",
  FAILED: "Falhou",
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  FAILED: "bg-red-100 text-red-800",
};

export function ReportExecutionItem({ execution }: ReportExecutionItemProps) {
  return (
    <div
      data-testid={`execution-${execution.id}`}
      className="flex items-center justify-between rounded-lg border p-3"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{execution.templateName}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[execution.status] ?? "bg-gray-100 text-gray-800"}`}
          >
            {STATUS_LABELS[execution.status] ?? execution.status}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Formato: {execution.format} | Solicitado em: {new Date(execution.requestedAt).toLocaleDateString("pt-BR")}
        </p>
        {execution.error && (
          <p className="mt-1 text-xs text-destructive">{execution.error}</p>
        )}
      </div>
      {execution.fileUrl && (
        <a
          href={execution.fileUrl}
          className="ml-4 rounded bg-secondary px-3 py-1.5 text-sm hover:bg-secondary/80"
        >
          Download
        </a>
      )}
    </div>
  );
}
