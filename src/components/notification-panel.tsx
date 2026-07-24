import { useRef, useState, useEffect } from "react";
import { Bell, Check, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AlertViewModel } from "@/presentation/features/alerts";

interface NotificationPanelProps {
  alerts: AlertViewModel[];
  isLoading?: boolean;
  onConfirm?: (alertId: string) => void;
  onViewAll?: () => void;
}

const SEVERITY_ICONS: Record<string, typeof Info> = {
  info: Info,
  warning: AlertTriangle,
  critical: AlertTriangle,
};

const SEVERITY_COLORS: Record<string, string> = {
  info: "text-blue-500",
  warning: "text-amber-500",
  critical: "text-destructive",
};

export function NotificationPanel({
  alerts,
  isLoading,
  onConfirm,
  onViewAll,
}: NotificationPanelProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const unconfirmed = alerts.filter((a) => !a.ack);
  const pending = unconfirmed.length;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-secondary hover:text-foreground"
        aria-label={`Notificações${pending > 0 ? `: ${pending} pendentes` : ""}`}
        aria-expanded={open}
      >
        <Bell className="size-4" aria-hidden="true" />
        {pending > 0 && (
          <span className="absolute -right-0.5 -top-0.5 grid min-w-[16px] place-items-center rounded-full bg-destructive px-1 text-[10px] font-bold leading-none text-destructive-foreground">
            {pending > 99 ? "99+" : pending}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-80 rounded-lg border border-border bg-popover shadow-lg">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <span className="text-sm font-semibold">Notificações</span>
            <button
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Fechar"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {isLoading ? (
              <div className="px-4 py-8 text-center text-xs text-muted-foreground">
                Carregando...
              </div>
            ) : unconfirmed.length === 0 ? (
              <div className="px-4 py-8 text-center text-xs text-muted-foreground">
                Nenhuma notificação pendente.
              </div>
            ) : (
              unconfirmed.map((alert) => {
                const Icon = SEVERITY_ICONS[alert.severity] ?? Info;
                return (
                  <div
                    key={alert.id}
                    className="flex items-start gap-3 border-t border-border px-4 py-3 text-sm"
                  >
                    <Icon
                      className={cn("mt-0.5 size-4 shrink-0", SEVERITY_COLORS[alert.severity])}
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-foreground">{alert.message}</p>
                      {alert.assetTicker && (
                        <p className="mt-0.5 text-xs text-muted-foreground">{alert.assetTicker}</p>
                      )}
                    </div>
                    {onConfirm && (
                      <button
                        onClick={() => onConfirm(alert.id)}
                        className="shrink-0 rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
                        aria-label="Confirmar notificação"
                      >
                        <Check className="size-3.5" />
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {onViewAll && (
            <div className="border-t border-border px-4 py-2">
              <button
                onClick={onViewAll}
                className="w-full text-center text-xs text-muted-foreground hover:text-foreground"
              >
                Ver todas
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
