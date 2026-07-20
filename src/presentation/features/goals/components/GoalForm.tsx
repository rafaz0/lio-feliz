import { useState } from "react";
import type { CreateGoalInput } from "../hooks/use-create-goal-mutation";
import type { UpdateGoalInput } from "../hooks/use-update-goal-mutation";

interface GoalFormProps {
  portfolioId: string;
  initial?: Partial<CreateGoalInput>;
  onSubmit: (input: CreateGoalInput) => void;
  onCancel?: () => void;
  isPending?: boolean;
}

const CATEGORY_OPTIONS = [
  { value: "EMERGENCY", label: "Emergência" },
  { value: "RETIREMENT", label: "Aposentadoria" },
  { value: "EDUCATION", label: "Educação" },
  { value: "TRAVEL", label: "Viagem" },
  { value: "LARGE_PURCHASE", label: "Grande Compra" },
  { value: "INVESTMENT", label: "Investimento" },
  { value: "OTHER", label: "Outro" },
];

export function GoalForm({
  portfolioId,
  initial,
  onSubmit,
  onCancel,
  isPending = false,
}: GoalFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [targetAmount, setTargetAmount] = useState(String(initial?.targetAmount ?? ""));
  const [targetDate, setTargetDate] = useState(
    initial?.targetDate
      ? new Date(initial.targetDate).toISOString().split("T")[0]
      : "",
  );
  const [category, setCategory] = useState(initial?.category ?? "EMERGENCY");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      portfolioId,
      name,
      targetAmount: Number.parseFloat(targetAmount),
      targetDate: new Date(targetDate),
      category,
    });
  };

  const isValid =
    name.trim().length > 0 &&
    Number.parseFloat(targetAmount) > 0 &&
    targetDate.length > 0;

  return (
    <form
      data-testid="goal-form"
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border p-4"
    >
      <div className="space-y-1.5">
        <label htmlFor="goal-name" className="text-sm font-medium">
          Nome da meta
        </label>
        <input
          id="goal-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Reserva de emergência"
          data-testid="goal-form-name"
          className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="goal-target" className="text-sm font-medium">
          Valor alvo (R$)
        </label>
        <input
          id="goal-target"
          type="number"
          step="0.01"
          min="0.01"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          placeholder="10000"
          data-testid="goal-form-target"
          className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="goal-date" className="text-sm font-medium">
          Prazo
        </label>
        <input
          id="goal-date"
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          data-testid="goal-form-date"
          className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="goal-category" className="text-sm font-medium">
          Categoria
        </label>
        <select
          id="goal-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          data-testid="goal-form-category"
          className="h-9 w-full rounded-md border bg-background px-2 text-sm"
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <button
          type="submit"
          disabled={!isValid || isPending}
          data-testid="goal-form-submit"
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
        >
          {isPending ? "Salvando..." : "Salvar meta"}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            data-testid="goal-form-cancel"
            className="rounded-md border px-4 py-2 text-sm hover:bg-muted"
          >
            Cancelar
          </button>
        ) : null}
      </div>
    </form>
  );
}
