import type { ReactNode } from "react";
import type { IDispatcher } from "@/application/dispatcher";
import {
  AuthProvider,
  DispatcherProvider,
  QueryProvider,
  ThemeProvider,
  TooltipProvider,
} from "@/presentation/providers";

interface ProvidersProps {
  dispatcher: IDispatcher;
  children: ReactNode;
  defaultTheme?: "dark" | "light";
}

export function Providers({ dispatcher, children, defaultTheme = "dark" }: ProvidersProps) {
  return (
    <QueryProvider>
      <DispatcherProvider dispatcher={dispatcher}>
        <ThemeProvider defaultTheme={defaultTheme}>
          <AuthProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </DispatcherProvider>
    </QueryProvider>
  );
}
