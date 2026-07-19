import { TooltipProvider as RadixTooltipProvider } from "@/components/ui/tooltip";
import type { ReactNode } from "react";

interface TooltipProviderProps {
  children: ReactNode;
  delayDuration?: number;
}

export function TooltipProvider({ children, delayDuration = 300 }: TooltipProviderProps) {
  return <RadixTooltipProvider delayDuration={delayDuration}>{children}</RadixTooltipProvider>;
}
