import { useAuth } from "@/presentation/features/auth/hooks/use-auth";

interface AccountSettingsProps {
  onLogout?: () => void;
}

export function AccountSettings({ onLogout }: AccountSettingsProps) {
  const { user, isAuthenticated } = useAuth();

  return (
    <div data-testid="account-settings" className="rounded-xl border p-4">
      <h3 className="text-sm font-medium">Conta</h3>
      <dl className="mt-2 space-y-1 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">E-mail</dt>
          <dd data-testid="account-email">{user?.email ?? "—"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Autenticado</dt>
          <dd data-testid="account-auth">{String(isAuthenticated)}</dd>
        </div>
      </dl>
      <button
        type="button"
        data-testid="account-logout"
        onClick={() => onLogout?.()}
        className="mt-3 rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
      >
        Sair
      </button>
    </div>
  );
}
