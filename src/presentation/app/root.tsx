import type { ReactNode } from "react";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import type { IDispatcher } from "@/application/dispatcher";
import type { AuthService } from "@/presentation/shared/types/auth";
import {
  AuthProvider,
  DispatcherProvider,
  QueryProvider,
  ThemeProvider,
  TooltipProvider,
} from "@/presentation/providers";

interface ProvidersProps {
  children: ReactNode;
  authService?: AuthService;
  dispatcher?: IDispatcher;
  queryClient?: QueryClient;
  defaultTheme?: "dark" | "light";
}

export function Providers({
  children,
  authService,
  dispatcher,
  queryClient,
  defaultTheme = "dark",
}: ProvidersProps) {
  const tree = (
    <ThemeProvider defaultTheme={defaultTheme}>
      {authService ? <AuthProvider authService={authService}>{children}</AuthProvider> : children}
    </ThemeProvider>
  );

  const withTooltip = <TooltipProvider>{tree}</TooltipProvider>;
  const withDispatcher = dispatcher ? (
    <DispatcherProvider dispatcher={dispatcher}>{withTooltip}</DispatcherProvider>
  ) : (
    withTooltip
  );

  if (queryClient) {
    return <QueryClientProvider client={queryClient}>{withDispatcher}</QueryClientProvider>;
  }
  return <QueryProvider>{withDispatcher}</QueryProvider>;
}
