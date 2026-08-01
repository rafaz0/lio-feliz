import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getPortfolioHistory } from "@/lib/portfolio/history.server";
import type { HistoryOperation, PortfolioHistoryPoint } from "@/lib/portfolio";

/**
 * Busca a evolucao real do patrimonio: preco historico vem do bolsai (B3) ou
 * Yahoo Finance (ativos internacionais/fallback), nunca de dado mockado.
 */
export function usePortfolioHistory(
  ops: HistoryOperation[] | undefined,
  priceOverrides?: Record<string, number>,
  exchangeRates?: Record<string, number>,
) {
  const fetchHistory = useServerFn(getPortfolioHistory);
  const operations = ops ?? [];

  const query = useQuery<PortfolioHistoryPoint[]>({
    queryKey: ["portfolio-history", operations, priceOverrides, exchangeRates],
    queryFn: () => fetchHistory({ data: { operations, priceOverrides, exchangeRates } }),
    enabled: operations.length > 0,
    staleTime: 3_600_000,
  });

  return { history: query.data ?? [], isLoading: query.isLoading, isFetching: query.isFetching };
}
