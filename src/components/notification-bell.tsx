import { Bell } from "lucide-react";

interface NotificationBellProps {
  count?: number;
  onClick?: () => void;
}

export function NotificationBell({ count = 0, onClick }: NotificationBellProps) {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-secondary hover:text-foreground"
      aria-label={`Notificações${count > 0 ? `: ${count} pendentes` : ""}`}
    >
      <Bell className="size-4" aria-hidden="true" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid min-w-[16px] place-items-center rounded-full bg-destructive px-1 text-[10px] font-bold leading-none text-destructive-foreground">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
