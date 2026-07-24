import type { ReactNode } from "react";
import { useAuth } from "@/presentation/features/auth";
import { useCapabilityCheck } from "../hooks/use-capability-check";
import { PlanGate } from "./PlanGate";

interface RequireCapabilityProps {
  capability: string;
  fallback?: ReactNode;
  showUpgrade?: boolean;
  children: ReactNode;
}

export function RequireCapability({
  capability,
  fallback,
  showUpgrade = true,
  children,
}: RequireCapabilityProps) {
  const { user } = useAuth();
  const userId = user?.id ?? user?.user?.id;
  const { data, isLoading } = useCapabilityCheck(userId, capability);

  if (isLoading) {
    return fallback !== undefined ? <>{fallback}</> : null;
  }

  if (!data?.allowed) {
    if (showUpgrade && data?.planTier) {
      return <PlanGate capability={capability} currentTier={data.planTier} />;
    }
    return fallback !== undefined ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}
