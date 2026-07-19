import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SYNC_FONTES, fonteToLabel } from "../types/sync.view-model";

interface SyncFormProps {
  fonte: string;
  onFonteChange: (fonte: string) => void;
}

export function SyncForm({ fonte, onFonteChange }: SyncFormProps) {
  return (
    <form data-testid="sync-form" className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="sync-fonte" className="mb-1 block text-sm font-medium">
          Fonte de dados
        </label>
        <select
          id="sync-fonte"
          data-testid="sync-fonte-select"
          value={fonte}
          onChange={(e) => onFonteChange(e.target.value)}
          aria-label="Fonte de dados"
          className="w-full rounded border bg-background px-3 py-2 text-sm"
        >
          {SYNC_FONTES.map((f) => (
            <option key={f} value={f}>
              {fonteToLabel(f)}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
