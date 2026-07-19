import type { SuggestedContributionViewModel } from "../types/rebalancing.view-model";
import { formatBRL } from "../types/rebalancing.view-model";

interface SuggestedContributionProps {
  sugestoes: SuggestedContributionViewModel[];
}

export function SuggestedContribution({ sugestoes }: SuggestedContributionProps) {
  if (sugestoes.length === 0) {
    return (
      <div
        data-testid="suggested-contribution"
        className="rounded-xl border border-dashed p-4 text-center text-sm text-muted-foreground"
      >
        Nenhum aporte sugerido no momento.
      </div>
    );
  }

  return (
    <div data-testid="suggested-contribution" className="rounded-xl border p-4">
      <h3 className="mb-2 text-sm font-medium">Sugestão de aportes</h3>
      <ul className="space-y-1 text-sm">
        {sugestoes.map((s) => (
          <li key={s.classe} data-testid="suggestion-row" className="flex justify-between">
            <span>{s.classe}</span>
            <span className="font-medium">{formatBRL(s.valorSugerido)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
