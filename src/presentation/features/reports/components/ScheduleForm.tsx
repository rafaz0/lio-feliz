import { useState } from "react";
import type { ReportTemplateCardViewModel } from "../types/report.view-model";

interface ScheduleFormProps {
  templates: ReportTemplateCardViewModel[];
  portfolioId: string;
  onSubmit: (data: {
    templateId: string;
    cron: string;
    format: string;
    recipientEmails: string[];
    isActive: boolean;
  }) => void;
  onCancel?: () => void;
}

export function ScheduleForm({ templates, onSubmit, onCancel }: ScheduleFormProps) {
  const [templateId, setTemplateId] = useState(templates[0]?.id ?? "");
  const [cron, setCron] = useState("0 8 * * 1");
  const [format, setFormat] = useState("PDF");
  const [recipients, setRecipients] = useState("");
  const [isActive, setIsActive] = useState(true);

  const selectedTemplate = templates.find((t) => t.id === templateId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      templateId,
      cron,
      format,
      recipientEmails: recipients
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      isActive,
    });
  };

  return (
    <form
      data-testid="schedule-form"
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border p-4"
    >
      <h3 className="font-semibold">Agendar Relatório</h3>

      <div>
        <label className="block text-sm font-medium">Template</label>
        <select
          value={templateId}
          onChange={(e) => {
            setTemplateId(e.target.value);
            const t = templates.find((tmpl) => tmpl.id === e.target.value);
            if (t && !t.supportedFormats.includes(format)) {
              setFormat(t.supportedFormats[0] ?? "PDF");
            }
          }}
          className="w-full rounded border p-2"
        >
          {templates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Expressão Cron</label>
          <input
            type="text"
            value={cron}
            onChange={(e) => setCron(e.target.value)}
            placeholder="0 8 * * 1"
            className="w-full rounded border p-2 font-mono text-sm"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Ex: toda segunda 8h = "0 8 * * 1"
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium">Formato</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full rounded border p-2"
          >
            {selectedTemplate?.supportedFormats.map((fmt) => (
              <option key={fmt} value={fmt}>
                {fmt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">
          Emails dos Recipientes (separados por vírgula)
        </label>
        <input
          type="text"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          placeholder="email1@exemplo.com, email2@exemplo.com"
          className="w-full rounded border p-2 text-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isActive"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="rounded"
        />
        <label htmlFor="isActive" className="text-sm">
          Ativo
        </label>
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded border px-4 py-2 text-sm hover:bg-secondary/50"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="rounded bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Agendar
        </button>
      </div>
    </form>
  );
}
