import { useState } from "react";
import { Lightbulb, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SmartHint {
  id: string;
  title: string;
  description: string;
  type?: "info" | "tip" | "warning";
  action?: { label: string; onClick: () => void };
}

interface SmartHintsProps {
  hints: SmartHint[];
  dismissible?: boolean;
  className?: string;
}

const TYPE_STYLES = {
  info: "border-blue-500/20 bg-blue-500/5",
  tip: "border-emerald-500/20 bg-emerald-500/5",
  warning: "border-amber-500/20 bg-amber-500/5",
};

const TYPE_ICON_STYLES = {
  info: "text-blue-500",
  tip: "text-emerald-500",
  warning: "text-amber-500",
};

export function SmartHints({ hints, dismissible = true, className }: SmartHintsProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = hints.filter((h) => !dismissed.has(h.id));
  if (visible.length === 0) return null;

  return (
    <div className={cn("space-y-2", className)}>
      {visible.map((hint) => (
        <div
          key={hint.id}
          className={cn(
            "relative flex items-start gap-3 rounded-lg border p-3 text-sm",
            TYPE_STYLES[hint.type ?? "tip"],
          )}
        >
          <Lightbulb
            className={cn("mt-0.5 size-4 shrink-0", TYPE_ICON_STYLES[hint.type ?? "tip"])}
          />
          <div className="min-w-0 flex-1">
            <p className="font-medium text-foreground">{hint.title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{hint.description}</p>
            {hint.action && (
              <button
                type="button"
                onClick={hint.action.onClick}
                className="mt-1.5 text-xs font-medium text-primary hover:underline"
              >
                {hint.action.label}
              </button>
            )}
          </div>
          {dismissible && (
            <button
              type="button"
              onClick={() => setDismissed((prev) => new Set(prev).add(hint.id))}
              className="shrink-0 text-muted-foreground/50 hover:text-muted-foreground"
              aria-label="Dispensar"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
