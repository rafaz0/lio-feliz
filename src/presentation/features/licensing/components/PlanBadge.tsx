import { cn } from "@/lib/utils";
import { useCapabilityCheck } from "../hooks/use-capability-check";
import { useAuth } from "@/presentation/features/auth";

interface PlanBadgeProps {
  capability?: string;
  className?: string;
}

const TIER_CONFIG: Record<string, { label: string; className: string }> = {
  FREE: { label: "Free", className: "bg-secondary text-secondary-foreground" },
  BASIC: {
    label: "Basic",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
  PREMIUM: {
    label: "Premium",
    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
};

export function PlanBadge({ capability, className }: PlanBadgeProps) {
  const { user } = useAuth();
  const userId = user?.id ?? user?.user?.id;

  const { data } = useCapabilityCheck(userId, capability ?? "read");
  const tier = data?.planTier ?? "FREE";
  const config = TIER_CONFIG[tier] ?? TIER_CONFIG.FREE;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
