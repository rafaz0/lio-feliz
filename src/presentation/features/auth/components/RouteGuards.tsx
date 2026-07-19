import type { ReactNode } from "react";
import { useAuth } from "../hooks/use-auth";
import { AuthLoading } from "./AuthLoading";

interface AuthenticatedRouteProps {
  children: ReactNode;
  redirectTo?: string;
  fallback?: ReactNode;
}

export function AuthenticatedRoute({
  children,
  fallback = <AuthLoading label="Verificando autenticação..." />,
}: AuthenticatedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <>{fallback}</>;
  if (!isAuthenticated) return null;
  return <>{children}</>;
}

interface GuestRouteProps {
  children: ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <AuthLoading label="Verificando autenticação..." />;
  if (isAuthenticated) return null;
  return <>{children}</>;
}
