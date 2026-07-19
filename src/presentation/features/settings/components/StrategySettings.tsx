import { useState } from "react";
import type { StrategySettingsViewModel } from "../types/settings.view-model";

interface StrategySettingsProps {
  estrategia: StrategySettingsViewModel | null;
  onSave: (input: {
    moeda: string;
    toleranciaRebalanceamento: number;
    percentuais: Record<string, number>;
  }) => void;
  isSaving?: boolean;
}

export function StrategySettings({ estrategia, onSave, isSaving }: StrategySettingsProps) {
  const [moeda, setMoeda] = useState(estrategia?.moeda ?? "BRL");
  const [tolerancia, setTolerancia] = useState(estrategia?.toleranciaRebalanceamento ?? 5);
  const [percentuais, setPercentuais] = useState<Record<string, number>>(
    estrategia?.percentuais ?? { ACOES: 50, RENDA_FIXA: 50 },
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ moeda, toleranciaRebalanceamento: tolerancia, percentuais });
  }

  return (
    <form data-testid="strategy-settings" onSubmit={handleSubmit} className="rounded-xl border p-4">
      <h3 className="text-sm font-medium">Estratégia de alocação</h3>
      <div className="mt-2 space-y-2 text-sm">
        <label className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground">Moeda</span>
          <input
            data-testid="strategy-moeda"
            value={moeda}
            onChange={(e) => setMoeda(e.target.value)}
            className="rounded-md border px-2 py-1"
          />
        </label>
        <label className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground">Tolerância rebalanceamento (%)</span>
          <input
            data-testid="strategy-tolerancia"
            type="number"
            value={tolerancia}
            onChange={(e) => setTolerancia(Number(e.target.value))}
            className="rounded-md border px-2 py-1"
          />
        </label>
      </div>
      <button
        type="submit"
        data-testid="strategy-save"
        disabled={isSaving}
        className="mt-3 rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:opacity-90 disabled:opacity-50"
      >
        {isSaving ? "Salvando…" : "Salvar estratégia"}
      </button>
    </form>
  );
}
