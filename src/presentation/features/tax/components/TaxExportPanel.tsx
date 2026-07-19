import { useState } from "react";

interface TaxExportPanelProps {
  ano: number;
  onExport: (formato: "CSV" | "PDF") => void;
}

export function TaxExportPanel({ ano, onExport }: TaxExportPanelProps) {
  const [formato, setFormato] = useState<"CSV" | "PDF">("CSV");

  return (
    <div
      data-testid="tax-export-panel"
      className="flex flex-wrap items-center gap-3 rounded-xl border p-4"
    >
      <span className="text-sm font-medium">Exportar relatório ({ano})</span>
      <div className="flex gap-2" role="group" aria-label="Formato de exportação">
        <button
          type="button"
          aria-pressed={formato === "CSV"}
          data-testid="export-csv"
          onClick={() => setFormato("CSV")}
          className={`rounded-md border px-3 py-1 text-sm ${formato === "CSV" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
        >
          CSV
        </button>
        <button
          type="button"
          aria-pressed={formato === "PDF"}
          data-testid="export-pdf"
          onClick={() => setFormato("PDF")}
          className={`rounded-md border px-3 py-1 text-sm ${formato === "PDF" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
        >
          PDF
        </button>
      </div>
      <button
        type="button"
        data-testid="tax-export-button"
        onClick={() => onExport(formato)}
        className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:opacity-90"
      >
        Exportar
      </button>
    </div>
  );
}
