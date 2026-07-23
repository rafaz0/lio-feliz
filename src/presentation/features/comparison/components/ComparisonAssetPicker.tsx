import { useState } from "react";
// eslint-disable-next-line no-restricted-imports
import type { ComparisonScope } from "@/core/domain/comparison";

export interface AssetOption {
  ticker: string;
  type: string;
  label: string;
}

interface ComparisonAssetPickerProps {
  selected: AssetOption[];
  onAdd: (asset: AssetOption) => void;
  onRemove: (ticker: string) => void;
  suggestions: AssetOption[];
}

export function ComparisonAssetPicker({
  selected,
  onAdd,
  onRemove,
  suggestions,
}: ComparisonAssetPickerProps) {
  const [search, setSearch] = useState("");

  const filtered = suggestions.filter(
    (s) =>
      s.ticker.toLowerCase().includes(search.toLowerCase()) &&
      !selected.find((sel) => sel.ticker === s.ticker),
  );

  return (
    <div data-testid="comparison-asset-picker" className="space-y-3">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar ativo..."
        data-testid="comparison-search"
        className="w-full rounded-md border px-3 py-2 text-sm"
      />

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((asset) => (
            <span
              key={asset.ticker}
              data-testid={`selected-${asset.ticker}`}
              className="inline-flex items-center gap-1 rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium"
            >
              {asset.ticker}
              <button
                type="button"
                onClick={() => onRemove(asset.ticker)}
                className="ml-1 text-muted-foreground hover:text-foreground"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}

      {search && filtered.length > 0 && (
        <div className="max-h-40 overflow-y-auto rounded-md border">
          {filtered.map((asset) => (
            <button
              key={asset.ticker}
              type="button"
              data-testid={`suggestion-${asset.ticker}`}
              onClick={() => {
                onAdd(asset);
                setSearch("");
              }}
              className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-foreground/5"
            >
              <span>{asset.ticker}</span>
              <span className="text-xs text-muted-foreground">{asset.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
