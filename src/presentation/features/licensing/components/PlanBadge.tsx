import { cn } from "@/lib/utils";
import { useCapabilityCheck } from "../hooks/use-capability-check";
import { useAuth } from "@/presentation/features/auth";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface PlanBadgeProps {
  capability?: string;
  className?: string;
}

const TIER_CONFIG: Record<string, { label: string; className: string; description: string }> = {
  FREE: {
    label: "Free",
    className: "bg-secondary text-secondary-foreground",
    description: "Plano gratuito com funcionalidades básicas",
  },
  BASIC: {
    label: "Basic",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800",
    description: "Plano Basic com recursos avançados",
  },
  PREMIUM: {
    label: "Premium",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 ring-1 ring-emerald-200 dark:ring-emerald-800",
    description: "Plano Premium com todos os recursos",
  },
};

export function PlanBadge({ capability, className }: PlanBadgeProps) {
  const { user } = useAuth();
  const userId = user?.id ?? user?.user?.id;

  const { data } = useCapabilityCheck(userId, capability ?? "read");
  const tier = data?.planTier ?? "FREE";
  const config = TIER_CONFIG[tier] ?? TIER_CONFIG.FREE;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
            config.className,
            className,
          )}
        >
          {config.label}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs">
        {config.description}
      </TooltipContent>
    </Tooltip>
  );
}
