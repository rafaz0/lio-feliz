import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import { useAuth } from "@/presentation/features/auth/hooks/use-auth";
import type { IQuery } from "@/application/types";
import type {
  ConfiguracoesDto,
  ApplicationError,
} from "@/presentation/shared/types/application-layer";
import { SETTINGS_QUERY_KEYS } from "../queries";

interface UseSettingsQueryResult {
  configuracoes: ConfiguracoesDto | null;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

export function useSettingsQuery(): UseSettingsQueryResult {
  const dispatcher = useDispatcher();
  const { user } = useAuth();
  const usuarioId = user?.id ?? "";

  const query = useQuery({
    queryKey: SETTINGS_QUERY_KEYS.configuracoes(usuarioId),
    enabled: Boolean(usuarioId),
    queryFn: async (): Promise<ConfiguracoesDto> => {
      const result = await dispatcher.DispatchQuery<ConfiguracoesDto>({
        type: "ObterConfiguracoesQuery",
        usuarioId,
      } as IQuery);

      if (result instanceof Error) {
        throw result;
      }

      return result;
    },
  });

  return {
    configuracoes: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as ApplicationError | null) ?? null,
    refetch: () => query.refetch(),
  };
}
