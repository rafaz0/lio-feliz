import { useState } from "react";
import { useStrategiesQuery } from "../hooks/use-strategies-query";
import { useBacktestsQuery } from "../hooks/use-backtests-query";
import { useExecuteBacktestMutation } from "../hooks/use-execute-backtest-mutation";
import { StrategyForm } from "./StrategyForm";
import { BacktestResultCard } from "./BacktestResultCard";
import { BacktestsLoading } from "./BacktestsLoading";
import { BacktestsEmpty } from "./BacktestsEmpty";
import { BacktestsError } from "./BacktestsError";

interface BacktestsPageProps {
  userId: string;
}

export function BacktestsPage({ userId }: BacktestsPageProps) {
  const [selectedStrategyId, setSelectedStrategyId] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  const {
    data: strategies,
    isLoading: stratLoading,
    isError: stratError,
    refetch,
  } = useStrategiesQuery(userId);
  const { data: result, isLoading: resultLoading } = useBacktestsQuery(selectedStrategyId);
  const executeBacktest = useExecuteBacktestMutation();

  if (stratLoading) return <BacktestsLoading />;
  if (stratError)
    return <BacktestsError message="Erro ao carregar estrategias" onRetry={refetch} />;

  return (
    <div data-testid="backtests-page" className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Backtests</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-md bg-foreground px-3 py-2 text-sm text-background"
        >
          {showForm ? "Cancelar" : "Nova estrategia"}
        </button>
      </div>

      {showForm && (
        <StrategyForm
          onSave={(input) => {
            executeBacktest.mutate(input.name);
            setShowForm(false);
          }}
          isPending={executeBacktest.isPending}
        />
      )}

      {!strategies || strategies.length === 0 ? (
        <BacktestsEmpty />
      ) : (
        <div className="space-y-3">
          {strategies.map((s) => (
            <div key={s.id} className="rounded-lg border p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{s.name}</p>
                <p className="text-xs text-muted-foreground">
                  {s.allocations.map((a) => `${a.assetTicker} ${a.weightPercentage}%`).join(" | ")}{" "}
                  vs {s.benchmarkTicker}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedStrategyId(s.id);
                  executeBacktest.mutate(s.id);
                }}
                disabled={executeBacktest.isPending}
                className="rounded-md bg-foreground px-3 py-1 text-xs text-background disabled:opacity-50"
              >
                {executeBacktest.isPending && selectedStrategyId === s.id
                  ? "Executando..."
                  : "Executar"}
              </button>
            </div>
          ))}
        </div>
      )}

      {resultLoading && <div className="text-sm text-center py-4">Calculando resultados...</div>}
      {result && <BacktestResultCard result={result} />}
    </div>
  );
}
