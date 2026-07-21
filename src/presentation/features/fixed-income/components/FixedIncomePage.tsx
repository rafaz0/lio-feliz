import { useMemo, useState } from "react";
import { useFixedIncomeQuery } from "../hooks/use-fixed-income-query";
import { useCronogramaQuery } from "../hooks/use-cronograma-query";
import { useRegistrarCupomMutation } from "../hooks/use-registrar-cupom-mutation";
import { FixedIncomeList } from "./components/FixedIncomeList";
import { FixedIncomeSchedule } from "./components/FixedIncomeSchedule";
import { FixedIncomeForm } from "./components/FixedIncomeForm";
import { FixedIncomeLoading } from "./components/FixedIncomeLoading";
import { FixedIncomeEmpty } from "./components/FixedIncomeEmpty";
import { FixedIncomeError } from "./components/FixedIncomeError";

interface FixedIncomePageProps {
  portfolioId: string;
}

export function FixedIncomePage({ portfolioId }: FixedIncomePageProps) {
  const [showForm, setShowForm] = useState(false);

  const rendaFixaQuery = useFixedIncomeQuery(portfolioId);
  const cronogramaQuery = useCronogramaQuery(portfolioId, true);
  const registrarCupom = useRegistrarCupomMutation();

  if (rendaFixaQuery.isLoading) {
    return <FixedIncomeLoading />;
  }

  if (rendaFixaQuery.isError) {
    return (
      <FixedIncomeError
        message={rendaFixaQuery.error?.message ?? "Falha ao carregar títulos de renda fixa."}
        onRetry={rendaFixaQuery.refetch}
      />
    );
  }

  return (
    <div data-testid="fixed-income-page" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Renda Fixa</h1>
          <p className="text-sm text-muted-foreground">
            Tesouro Direto, CDB, LCI, LCA e títulos prefixados/pós-fixados.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          data-testid="fixed-income-toggle-form"
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background"
        >
          {showForm ? "Cancelar" : "Novo título"}
        </button>
      </div>

      {showForm && (
        <FixedIncomeForm
          portfolioId={portfolioId}
          isPending={registrarCupom.isPending}
          error={registrarCupom.error?.message ?? null}
          onCancel={() => setShowForm(false)}
          onSubmit={(input) => {
            registrarCupom.mutate(input, {
              onSuccess: () => {
                setShowForm(false);
                rendaFixaQuery.refetch();
                cronogramaQuery.refetch();
              },
            });
          }}
        />
      )}

      {rendaFixaQuery.assets.length > 0 ? (
        <>
          <FixedIncomeList assets={rendaFixaQuery.assets} />
          <FixedIncomeSchedule cronograma={cronogramaQuery.cronograma} />
        </>
      ) : (
        <FixedIncomeEmpty onAdd={() => setShowForm(true)} />
      )}
    </div>
  );
}
