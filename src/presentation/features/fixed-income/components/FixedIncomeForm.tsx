import { useState } from "react";
import type { RegistrarCupomInput } from "../hooks/use-registrar-cupom-mutation";

interface FixedIncomeFormProps {
  portfolioId: string;
  onSubmit: (input: RegistrarCupomInput) => void;
  onCancel?: () => void;
  isPending?: boolean;
  error?: string | null;
}

const PRODUCT_OPTIONS: { value: RegistrarCupomInput["productType"]; label: string }[] = [
  { value: "TESOURO_DIRETO", label: "Tesouro Direto" },
  { value: "CDB", label: "CDB" },
  { value: "LCI", label: "LCI" },
  { value: "LCA", label: "LCA" },
  { value: "PREFIXADO", label: "Prefixado" },
  { value: "POS_FIXADO", label: "Pós-fixado" },
];

const fieldClass =
  "rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground";

export function FixedIncomeForm({
  portfolioId,
  onSubmit,
  onCancel,
  isPending,
  error,
}: FixedIncomeFormProps) {
  const [ticker, setTicker] = useState("");
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [productType, setProductType] = useState<RegistrarCupomInput["productType"]>("CDB");
  const [nominalValue, setNominalValue] = useState("");
  const [rate, setRate] = useState("");
  const [rateType, setRateType] = useState<RegistrarCupomInput["rateType"]>("PRE");
  const [issueDate, setIssueDate] = useState("");
  const [maturityDate, setMaturityDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      portfolioId,
      ticker,
      name,
      institution,
      productType,
      nominalValue: Number.parseFloat(nominalValue),
      rate: Number.parseFloat(rate),
      rateType,
      issueDate: new Date(issueDate),
      maturityDate: new Date(maturityDate),
    });
  };

  return (
    <form
      data-testid="fixed-income-form"
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-border bg-card p-4"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Ticket</span>
          <input
            data-testid="fixed-income-ticker"
            className={fieldClass}
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="Ex: CDB-XPTO"
            required
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Nome</span>
          <input
            data-testid="fixed-income-name"
            className={fieldClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: CDB Banco X 120% CDI"
            required
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Instituição</span>
          <input
            data-testid="fixed-income-institution"
            className={fieldClass}
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            placeholder="Ex: Banco X"
            required
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Tipo</span>
          <select
            data-testid="fixed-income-product-type"
            className={fieldClass}
            value={productType}
            onChange={(e) =>
              setProductType(e.target.value as RegistrarCupomInput["productType"])
            }
          >
            {PRODUCT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Valor nominal (R$)</span>
          <input
            data-testid="fixed-income-nominal"
            className={fieldClass}
            type="number"
            step="0.01"
            min="0"
            value={nominalValue}
            onChange={(e) => setNominalValue(e.target.value)}
            required
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Taxa (% a.a.)</span>
          <input
            data-testid="fixed-income-rate"
            className={fieldClass}
            type="number"
            step="0.01"
            min="0"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Regime de juros</span>
          <select
            data-testid="fixed-income-rate-type"
            className={fieldClass}
            value={rateType}
            onChange={(e) =>
              setRateType(e.target.value as RegistrarCupomInput["rateType"])
            }
          >
            <option value="PRE">Prefixado (PRE)</option>
            <option value="POS">Pós-fixado (POS)</option>
          </select>
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Emissão</span>
          <input
            data-testid="fixed-income-issue"
            className={fieldClass}
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            required
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-muted-foreground">Vencimento</span>
          <input
            data-testid="fixed-income-maturity"
            className={fieldClass}
            type="date"
            value={maturityDate}
            onChange={(e) => setMaturityDate(e.target.value)}
            required
          />
        </label>
      </div>

      {error ? (
        <p data-testid="fixed-income-form-error" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <div className="flex gap-2">
        <button
          type="submit"
          data-testid="fixed-income-submit"
          disabled={isPending}
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-60"
        >
          {isPending ? "Salvando..." : "Registrar título"}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            data-testid="fixed-income-cancel"
            className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground"
          >
            Cancelar
          </button>
        ) : null}
      </div>
    </form>
  );
}
