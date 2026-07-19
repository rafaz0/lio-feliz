import { useAuth } from "../hooks/use-auth";
import { toUserViewModel } from "../types/auth.view-model";
import { useLogoutMutation } from "../hooks/use-logout-mutation";

interface UserMenuProps {
  onLogout?: () => void;
}

export function UserMenu({ onLogout }: UserMenuProps) {
  const { user } = useAuth();
  const logoutMutation = useLogoutMutation();
  const viewModel = toUserViewModel(user);

  if (!viewModel) return null;

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    onLogout?.();
  }

  return (
    <div
      className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2"
      role="menu"
      aria-label="Menu do usuário"
    >
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
        aria-hidden="true"
      >
        {viewModel.initials}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">{viewModel.displayName}</span>
        <span className="text-xs text-muted-foreground">{viewModel.email}</span>
      </div>
      <button
        type="button"
        role="menuitem"
        onClick={() => void handleLogout()}
        disabled={logoutMutation.isPending}
        className="ml-2 rounded-md border border-input px-2 py-1 text-xs text-foreground transition-colors hover:bg-accent disabled:opacity-60"
      >
        Sair
      </button>
    </div>
  );
}
