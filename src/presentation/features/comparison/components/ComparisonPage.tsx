import { useState } from "react";
import { useComparisonQuery } from "../hooks/use-comparison-query";
import { useCreateComparisonMutation } from "../hooks/use-create-comparison-mutation";
import { ScorecardGrid } from "./ScorecardGrid";
import { ComparisonAssetPicker, type AssetOption } from "./ComparisonAssetPicker";
import { ComparisonLoading } from "./ComparisonLoading";
import { ComparisonEmpty } from "./ComparisonEmpty";
import { ComparisonError } from "./ComparisonError";

const SUGGESTOES: AssetOption[] = [
  { ticker: "PETR4", type: "stock", label: "Petrobras PN" },
  { ticker: "VALE3", type: "stock", label: "Vale ON" },
  { ticker: "ITUB4", type: "stock", label: "Itau Unibanco PN" },
  { ticker: "BBDC4", type: "stock", label: "Bradesco PN" },
  { ticker: "ABEV3", type: "stock", label: "Ambev ON" },
  { ticker: "WEGE3", type: "stock", label: "WEG ON" },
  { ticker: "BBAS3", type: "stock", label: "Banco do Brasil ON" },
  { ticker: "KNRI11", type: "fii", label: "Kinea Renda Imobiliaria" },
  { ticker: "XPLG11", type: "fii", label: "XP Logistica" },
  { ticker: "HGLG11", type: "fii", label: "CSHG Logistica" },
];

interface ComparisonPageProps {
  setId?: string;
  userId: string;
}

export function ComparisonPage({ setId, userId }: ComparisonPageProps) {
  const [selectedAssets, setSelectedAssets] = useState<AssetOption[]>([]);
  const [comparisonName, setComparisonName] = useState("");
  const createComparison = useCreateComparisonMutation();

  const query = useComparisonQuery(setId ?? "");
  const scorecardMetrics = query.scorecard?.metrics ?? null;

  const handleAddAsset = (asset: AssetOption) => {
    setSelectedAssets((prev) => [...prev, asset]);
  };

  const handleRemoveAsset = (ticker: string) => {
    setSelectedAssets((prev) => prev.filter((a) => a.ticker !== ticker));
  };

  const handleCreateComparison = () => {
    if (selectedAssets.length < 2) return;
    createComparison.mutate({
      name: comparisonName || `Comparacao ${Date.now()}`,
      entries: selectedAssets.map((a) => ({
        assetTicker: a.ticker,
        assetType: a.type,
        weight: 0,
      })),
      scope: { type: "byAsset" },
      userId,
    });
    setSelectedAssets([]);
    setComparisonName("");
  };

  if (setId && query.isLoading) return <ComparisonLoading />;
  if (setId && query.isError) {
    return <ComparisonError message={query.error?.message ?? "Erro ao carregar comparacao"} onRetry={query.refetch} />;
  }

  return (
    <div data-testid="comparison-page" className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Comparacao Avancada</h1>
        <p className="text-sm text-muted-foreground">
          Compare ativos lado a lado com metricas de rentabilidade, risco e dividendos.
        </p>
      </div>

      <div className="rounded-lg border p-4 space-y-4">
        <h2 className="text-sm font-medium">Selecionar Ativos</h2>
        <ComparisonAssetPicker
          selected={selectedAssets}
          onAdd={handleAddAsset}
          onRemove={handleRemoveAsset}
          suggestions={SUGESTOES}
        />

        {selectedAssets.length >= 2 && (
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground">Nome da comparacao</label>
              <input
                type="text"
                value={comparisonName}
                onChange={(e) => setComparisonName(e.target.value)}
                placeholder="Ex: Fiis vs Acoes"
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>
            <button
              type="button"
              data-testid="comparison-execute"
              onClick={handleCreateComparison}
              disabled={createComparison.isPending}
              className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
            >
              {createComparison.isPending ? "Comparando..." : "Comparar"}
            </button>
          </div>
        )}
      </div>

      {createComparison.data && (
        <div className="rounded-lg border p-4 space-y-4">
          <h2 className="text-sm font-medium">
            Scorecard: {createComparison.data.name}
          </h2>
          {scorecardMetrics ? (
            <ScorecardGrid metrics={scorecardMetrics} />
          ) : (
            <ComparisonEmpty />
          )}
        </div>
      )}

      {!setId && !createComparison.data && selectedAssets.length === 0 && (
        <ComparisonEmpty />
      )}
    </div>
  );
}
