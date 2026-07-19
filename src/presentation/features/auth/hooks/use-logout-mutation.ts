import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./use-auth";

export function useLogoutMutation() {
  const { logout } = useAuth();
  return useMutation({
    mutationFn: () => logout(),
  });
}
