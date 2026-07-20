import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type { DeclaracaoDto } from "@/presentation/shared/types/application-layer";
import { TAX_QUERY_KEYS } from "../queries";

interface UseTaxCalculationQueryResult {
  declaracao: DeclaracaoDto | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useTaxCalculationQuery(
  portfolioId: string,
  ano: number,
): UseTaxCalculationQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: TAX_QUERY_KEYS.declaracao(portfolioId, ano),
    enabled: Boolean(portfolioId) && ano > 0,
    queryFn: async (): Promise<DeclaracaoDto> => {
      const result = await dispatcher.DispatchQuery<DeclaracaoDto>({
        type: "ObterDeclaracaoQuery",
        portfolioId,
        ano,
      } as IQuery);

      if (result instanceof Error) {
        throw result;
      }

      return result;
    },
  });

  return {
    declaracao: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as Error | null) ?? null,
    refetch: () => query.refetch(),
  };
}
