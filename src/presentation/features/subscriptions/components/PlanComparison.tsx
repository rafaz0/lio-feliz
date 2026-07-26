import { usePlanComparison } from "../hooks/use-feature-access";
import { PremiumBadge } from "./PremiumBadge";

interface PlanComparisonProps {
  userId: string | undefined;
}

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

export function PlanComparison({ userId }: PlanComparisonProps) {
  const { data, isLoading } = usePlanComparison(userId);

  if (isLoading) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        Carregando comparacao de planos...
      </div>
    );
  }

  if (!data || !data.planos || data.planos.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        Nenhum plano disponivel para comparacao.
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="plan-comparison">
      {data.features.length === 0 ? (
        <div className="py-8 text-center text-sm text-muted-foreground">
          Nenhuma funcionalidade disponivel para comparacao.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm" data-testid="comparison-table">
            <thead>
              <tr className="border-b">
                <th className="py-3 pr-4 text-left font-medium text-muted-foreground">Funcionalidade</th>
                {data.planos.map((p) => (
                  <th key={p.id} className="px-3 py-3 text-center font-semibold">
                    <div>{p.name}</div>
                    <div className="mt-1 text-xs font-normal text-muted-foreground">
                      {p.isFree ? "Gratuito" : formatPrice(p.monthlyPrice) + "/mes"}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.features.map((feature) => (
                <tr key={feature.id} className="border-b last:border-0">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <span>{feature.name}</span>
                      {!feature.includedIn.includes("FREE") && feature.includedIn.length > 0 && (
                        <PremiumBadge />
                      )}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {feature.description}
                    </div>
                  </td>
                  {data.planos.map((plan) => (
                    <td key={plan.id} className="px-3 py-3 text-center">
                      {plan.featureIds.includes(feature.id) ? (
                        <span className="text-green-600 dark:text-green-400" aria-label="Incluso">
                          &#10003;
                        </span>
                      ) : (
                        <span className="text-muted-foreground/40" aria-label="Nao incluso">
                          &mdash;
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
