import { useAuth } from "../hooks/use-auth";
import { toSessionViewModel } from "../types/auth.view-model";

export function SessionStatus() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const viewModel = toSessionViewModel({ user, expiresAt: null, isAuthenticated }, isLoading);

  if (viewModel.isLoading) {
    return (
      <span className="text-xs text-muted-foreground" role="status">
        Verificando sessão...
      </span>
    );
  }

  if (!viewModel.isAuthenticated || !viewModel.user) {
    return (
      <span className="text-xs text-muted-foreground" role="status">
        Não autenticado
      </span>
    );
  }

  return (
    <span className="text-xs text-muted-foreground" role="status">
      Sessão ativa: {viewModel.user.displayName}
    </span>
  );
}
