import type { SettingsViewModel } from "../types/settings.view-model";

interface UserPreferencesCardProps {
  settings: SettingsViewModel;
}

export function UserPreferencesCard({ settings }: UserPreferencesCardProps) {
  return (
    <div data-testid="user-preferences-card" className="rounded-xl border p-4">
      <h3 className="text-sm font-medium">Preferências do usuário</h3>
      <dl className="mt-2 space-y-1 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Usuário</dt>
          <dd data-testid="pref-usuario">{settings.usuarioId}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Moeda</dt>
          <dd data-testid="pref-moeda">{settings.estrategia?.moeda ?? "—"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Tema</dt>
          <dd data-testid="pref-tema">{settings.tema}</dd>
        </div>
      </dl>
    </div>
  );
}
