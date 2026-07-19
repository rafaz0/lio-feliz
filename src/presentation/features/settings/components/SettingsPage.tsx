import { useMemo, useState } from "react";
import { useSettingsQuery } from "../hooks/use-settings-query";
import { useUpdateSettingsMutation } from "../hooks/use-update-settings-mutation";
import {
  toSettingsViewModel,
  type NotificationSettingsViewModel,
} from "../types/settings.view-model";
import { UserPreferencesCard } from "./UserPreferencesCard";
import { StrategySettings } from "./StrategySettings";
import { GoalsSettings } from "./GoalsSettings";
import { NotificationSettings } from "./NotificationSettings";
import { ThemeSettings } from "./ThemeSettings";
import { AccountSettings } from "./AccountSettings";
import { SettingsLoading } from "./SettingsLoading";
import { SettingsEmpty } from "./SettingsEmpty";
import { SettingsError } from "./SettingsError";

export function SettingsPage() {
  const query = useSettingsQuery();
  const updateMutation = useUpdateSettingsMutation();
  const [notificacoes, setNotificacoes] = useState<NotificationSettingsViewModel>({
    receberProventos: true,
    receberRebalanceamento: true,
    canal: "EMAIL",
  });

  const settings = useMemo(
    () => (query.configuracoes ? toSettingsViewModel(query.configuracoes, notificacoes) : null),
    [query.configuracoes, notificacoes],
  );

  return (
    <div data-testid="settings-page" className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Configurações</h1>
        <p className="text-sm text-muted-foreground">
          Preferências, estratégia, metas e conta do usuário.
        </p>
      </div>

      {query.isLoading ? (
        <SettingsLoading />
      ) : query.isError ? (
        <SettingsError
          message={query.error?.message ?? "Falha ao carregar configurações."}
          onRetry={() => query.refetch()}
        />
      ) : !settings ? (
        <SettingsEmpty />
      ) : (
        <>
          <UserPreferencesCard settings={settings} />
          <StrategySettings
            estrategia={settings.estrategia}
            isSaving={updateMutation.isPending}
            onSave={(input) => updateMutation.mutate(input)}
          />
          <GoalsSettings goals={{ metas: settings.metas }} />
          <NotificationSettings notificacoes={settings.notificacoes} onChange={setNotificacoes} />
          <ThemeSettings />
          <AccountSettings />
        </>
      )}
    </div>
  );
}
