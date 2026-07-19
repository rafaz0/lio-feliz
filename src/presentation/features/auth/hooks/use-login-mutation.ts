import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import type { AuthCredentials } from "@/presentation/shared/types/auth";

export function useLoginMutation() {
  const { login } = useAuth();
  return useMutation({
    mutationFn: (credentials: AuthCredentials) => login(credentials),
  });
}
