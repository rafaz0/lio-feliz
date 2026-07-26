import type { ReactNode } from "react";
import { useFeatureAccess } from "../hooks/use-feature-access";
import { PremiumBadge } from "./PremiumBadge";

interface FeatureGateProps {
  featureId: string;
  userId: string | undefined;
  fallback?: ReactNode;
  showUpgrade?: boolean;
  children: ReactNode;
}

export function FeatureGate({ featureId, userId, fallback, showUpgrade = true, children }: FeatureGateProps) {
  const { data: allowed, isLoading } = useFeatureAccess(userId, featureId);

  if (isLoading) return null;

  if (allowed) return <>{children}</>;

  if (fallback) return <>{fallback}</>;

  return (
    <div className="relative">
      <div className="pointer-events-none select-none opacity-30">
        {children}
      </div>
      {showUpgrade && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-lg border bg-background/90 p-4 text-center shadow-lg">
            <PremiumBadge />
            <p className="mt-2 text-sm text-muted-foreground">
              Esta funcionalidade esta disponivel em planos superiores.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
