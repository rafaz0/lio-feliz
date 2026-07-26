import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: ReactNode;
  tone?: "positive" | "negative";
  muted?: boolean;
  dominant?: boolean;
  className?: string;
}

export function KpiCard({ label, value, tone, muted, dominant, className }: KpiCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card transition-shadow hover:shadow-sm",
        dominant ? "border-primary/20 p-5" : "border-border p-4",
        className,
      )}
    >
      <p
        className={cn(
          "font-semibold uppercase tracking-wider text-muted-foreground",
          dominant ? "text-[11px]" : "text-[10px]",
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "mt-1 tabular font-bold tracking-tight financial",
          dominant ? "text-3xl" : "text-2xl",
          tone === "positive" && "text-positive",
          tone === "negative" && "text-negative",
          muted && "text-muted-foreground",
        )}
      >
        {value}
      </p>
    </div>
  );
}
