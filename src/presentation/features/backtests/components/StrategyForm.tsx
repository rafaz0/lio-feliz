import { useState } from "react";

interface StrategyFormProps {
  onSave: (input: { name: string; allocations: Array<{ assetTicker: string; weightPercentage: number; assetType: string }> }) => void;
  isPending: boolean;
}

export function StrategyForm({ onSave, isPending }: StrategyFormProps) {
  const [name, setName] = useState("");
  const [tickers, setTickers] = useState("");
  const [weights, setWeights] = useState("");

  const handleSave = () => {
    const tickerList = tickers.split(",").map((t) => t.trim()).filter(Boolean);
    const weightList = weights.split(",").map((w) => Number.parseFloat(w.trim())).filter((w) => !Number.isNaN(w));
    const allocations = tickerList.map((ticker, i) => ({
      assetTicker: ticker,
      weightPercentage: weightList[i] ?? 0,
      assetType: "stock",
    }));
    onSave({ name, allocations });
  };

  return (
    <div data-testid="strategy-form" className="rounded-lg border p-4 space-y-3">
      <h3 className="text-sm font-semibold">Nova Estrategia</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome da estrategia" className="w-full rounded-md border px-3 py-2 text-sm" />
      <input value={tickers} onChange={(e) => setTickers(e.target.value)} placeholder="Tickers (ex: PETR4,VALE3)" className="w-full rounded-md border px-3 py-2 text-sm" />
      <input value={weights} onChange={(e) => setWeights(e.target.value)} placeholder="Pesos % (ex: 50,50)" className="w-full rounded-md border px-3 py-2 text-sm" />
      <button onClick={handleSave} disabled={isPending || !name} className="rounded-md bg-foreground px-3 py-2 text-sm text-background disabled:opacity-50">Salvar</button>
    </div>
  );
}
