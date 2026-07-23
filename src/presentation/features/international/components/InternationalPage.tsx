import { useInternationalQuery } from "../hooks/use-international-query";
import { useExchangeRateQuery } from "../hooks/use-exchange-rate-query";
import { formatBRL } from "../viewmodels/international.view-model";

interface InternationalPageProps {
  portfolioId: string;
}

function InternationalLoading() {
  return (
    <div
      data-testid="international-loading"
      className="text-sm text-muted-foreground py-8 text-center"
    >
      Carregando ativos internacionais...
    </div>
  );
}

function InternationalEmpty() {
  return (
    <div
      data-testid="international-empty"
      className="text-sm text-muted-foreground py-8 text-center"
    >
      Nenhum ativo internacional encontrado.
    </div>
  );
}

export function InternationalPage({ portfolioId }: InternationalPageProps) {
  const { ativos, summary, isLoading, isError, error, refetch } =
    useInternationalQuery(portfolioId);

  if (isLoading) return <InternationalLoading />;
  if (isError)
    return (
      <div data-testid="international-error" className="text-center py-8">
        <p className="text-sm text-red-500">{error?.message ?? "Erro ao carregar"}</p>
        <button
          onClick={refetch}
          className="mt-2 rounded-md bg-foreground px-4 py-2 text-sm text-background"
        >
          Tentar novamente
        </button>
      </div>
    );
  if (ativos.length === 0) return <InternationalEmpty />;

  return (
    <div data-testid="international-page" className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Ativos Internacionais</h1>
        <span className="text-sm text-muted-foreground">
          Total: {formatBRL(summary.totalValorBRL)}
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-3 py-2 text-left">Ticker</th>
              <th className="px-3 py-2 text-left">Nome</th>
              <th className="px-3 py-2 text-left">Bolsa</th>
              <th className="px-3 py-2 text-left">Moeda</th>
              <th className="px-3 py-2 text-left">Tipo</th>
              <th className="px-3 py-2 text-right">Valor Original</th>
              <th className="px-3 py-2 text-right">Valor BRL</th>
              <th className="px-3 py-2 text-right">Taxa</th>
            </tr>
          </thead>
          <tbody>
            {ativos.map((ativo) => (
              <tr key={ativo.ticker} className="border-b last:border-0">
                <td className="px-3 py-2 font-medium">{ativo.ticker}</td>
                <td className="px-3 py-2">{ativo.name}</td>
                <td className="px-3 py-2 text-muted-foreground">{ativo.exchange}</td>
                <td className="px-3 py-2 text-muted-foreground">{ativo.currency}</td>
                <td className="px-3 py-2 text-muted-foreground">{ativo.assetType}</td>
                <td className="px-3 py-2 text-right">{ativo.valorOriginal.toFixed(2)}</td>
                <td className="px-3 py-2 text-right font-mono">{ativo.valorBRL}</td>
                <td className="px-3 py-2 text-right">{ativo.taxaCambio.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
