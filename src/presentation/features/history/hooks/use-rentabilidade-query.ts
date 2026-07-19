import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type {
  RentabilidadeDto,
  ApplicationError,
} from "@/presentation/shared/types/application-layer";
import { HISTORY_QUERY_KEYS } from "../queries";

interface UseRentabilidadeQueryResult {
  rentabilidade: RentabilidadeDto | null;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export function useRentabilidadeQuery(
  portfolioId: string,
  periodo?: { inicio: Date; fim: Date },
): UseRentabilidadeQueryResult {
  const dispatcher = useDispatcher();

  const query = useQuery({
    queryKey: HISTORY_QUERY_KEYS.rentabilidade(portfolioId),
    enabled: Boolean(portfolioId),
    queryFn: async (): Promise<RentabilidadeDto> => {
      const result = await dispatcher.DispatchQuery<RentabilidadeDto>({
        type: "ConsultarRentabilidadeQuery",
        portfolioId,
        periodo: periodo ?? {
          inicio: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
          fim: new Date(),
        },
      } as IQuery);

      if (result instanceof Error) {
        throw result;
      }

      return result;
    },
  });

  return {
    rentabilidade: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as ApplicationError | null) ?? null,
    refetch: () => query.refetch(),
  };
}
