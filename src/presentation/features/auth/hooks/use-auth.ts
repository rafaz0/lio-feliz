import { useAuthContext } from "@/presentation/providers/AuthProvider";

export function useAuth() {
  const ctx = useAuthContext();
  return {
    isAuthenticated: ctx.isAuthenticated,
    isLoading: ctx.isLoading,
    user: ctx.user,
    session: ctx.session,
    login: ctx.login,
    register: ctx.register,
    logout: ctx.logout,
    recoverPassword: ctx.recoverPassword,
    refresh: ctx.refresh,
    restoreSession: ctx.restoreSession,
  };
}
