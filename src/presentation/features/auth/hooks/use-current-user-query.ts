import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import { QUERY_KEYS } from "@/presentation/shared/constants";

export function useCurrentUserQuery() {
  const { user, isLoading, isAuthenticated, refresh } = useAuth();
  return useQuery({
    queryKey: QUERY_KEYS.METAS(user?.id ?? "anonymous"),
    queryFn: async () => {
      await refresh();
      return user;
    },
    enabled: isAuthenticated,
    initialData: isLoading ? undefined : user,
    staleTime: 30_000,
  });
}
