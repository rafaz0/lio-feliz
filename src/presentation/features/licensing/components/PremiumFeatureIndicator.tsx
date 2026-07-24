import { Crown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface PremiumFeatureIndicatorProps {
  requiredTier?: string;
  className?: string;
}

export function PremiumFeatureIndicator({
  requiredTier = "BASIC",
  className = "",
}: PremiumFeatureIndicatorProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={`inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-500 ${className}`}
        >
          <Crown className="size-3" aria-hidden="true" />
          <span className="hidden sm:inline">{requiredTier}</span>
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs">
        Funcionalidade disponível no plano {requiredTier} ou superior
      </TooltipContent>
    </Tooltip>
  );
}
