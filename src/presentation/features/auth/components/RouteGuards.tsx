import { useEffect, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import { useAuth } from "../hooks/use-auth";
import { AuthLoading } from "./AuthLoading";

interface AuthenticatedRouteProps {
  children: ReactNode;
  redirectTo?: string;
  fallback?: ReactNode;
}

export function AuthenticatedRoute({
  children,
  redirectTo = "/login",
  fallback = <AuthLoading label="Verificando autenticação..." />,
}: AuthenticatedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && router) {
      router.navigate({ to: redirectTo, replace: true });
    }
  }, [isLoading, isAuthenticated, redirectTo, router]);

  if (isLoading) return <>{fallback}</>;
  if (!isAuthenticated) return null;
  return <>{children}</>;
}

interface GuestRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export function GuestRoute({ children, redirectTo = "/dashboard" }: GuestRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && router) {
      router.navigate({ to: redirectTo, replace: true });
    }
  }, [isLoading, isAuthenticated, redirectTo, router]);

  if (isLoading) return <AuthLoading label="Verificando autenticação..." />;
  if (isAuthenticated) return null;
  return <>{children}</>;
}
