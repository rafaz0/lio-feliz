import { useState } from "react";
import type { NotificationSettingsViewModel } from "../types/settings.view-model";

interface NotificationSettingsProps {
  notificacoes: NotificationSettingsViewModel;
  onChange: (next: NotificationSettingsViewModel) => void;
}

export function NotificationSettings({ notificacoes, onChange }: NotificationSettingsProps) {
  const [estado, setEstado] = useState<NotificationSettingsViewModel>(notificacoes);

  function atualizar(patch: Partial<NotificationSettingsViewModel>) {
    const next = { ...estado, ...patch };
    setEstado(next);
    onChange(next);
  }

  return (
    <div data-testid="notification-settings" className="rounded-xl border p-4">
      <h3 className="text-sm font-medium">Notificações</h3>
      <div className="mt-2 space-y-2 text-sm">
        <label className="flex items-center gap-2">
          <input
            data-testid="notif-proventos"
            type="checkbox"
            checked={estado.receberProventos}
            onChange={(e) => atualizar({ receberProventos: e.target.checked })}
          />
          Receber proventos
        </label>
        <label className="flex items-center gap-2">
          <input
            data-testid="notif-rebalanceamento"
            type="checkbox"
            checked={estado.receberRebalanceamento}
            onChange={(e) => atualizar({ receberRebalanceamento: e.target.checked })}
          />
          Receber alertas de rebalanceamento
        </label>
        <label className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground">Canal</span>
          <select
            data-testid="notif-canal"
            value={estado.canal}
            onChange={(e) =>
              atualizar({ canal: e.target.value as NotificationSettingsViewModel["canal"] })
            }
            className="rounded-md border px-2 py-1"
          >
            <option value="EMAIL">E-mail</option>
            <option value="PUSH">Push</option>
          </select>
        </label>
      </div>
    </div>
  );
}
