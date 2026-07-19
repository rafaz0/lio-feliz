import type { ReactNode } from "react";
import { render } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { DispatcherProvider } from "@/presentation/providers/DispatcherProvider";
import { AuthProvider } from "@/presentation/providers/AuthProvider";
import { ThemeProvider } from "@/presentation/providers/ThemeProvider";
import type { IDispatcher } from "@/application/dispatcher";
import type { AuthService, AuthSession, AuthUser } from "@/presentation/shared/types/auth";
import { FakeSettingsDispatcher, type FakeSettingsDispatcherOptions } from "./fake-dispatcher";

export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0, staleTime: 0 },
      mutations: { retry: false },
    },
  });
}

export function createFakeDispatcher(
  options: FakeSettingsDispatcherOptions = {},
): FakeSettingsDispatcher {
  return new FakeSettingsDispatcher(options);
}

function createFakeAuthService(user: AuthUser): AuthService {
  const session: AuthSession = {
    user,
    expiresAt: Number.MAX_SAFE_INTEGER,
    isAuthenticated: true,
  };
  return {
    getSession: async () => session,
    signIn: async () => ({ success: true, user }),
    signUp: async () => ({ success: true, user }),
    signOut: async () => undefined,
    recoverPassword: async () => ({ success: true, user }),
    onAuthStateChange: () => () => undefined,
  };
}

const FAKE_USER: AuthUser = {
  id: "u1",
  email: "user@exemplo.com",
  displayName: "Usuário Teste",
  avatarUrl: null,
};

export function renderWithProviders(
  ui: ReactNode,
  dispatcher: IDispatcher,
  queryClient: QueryClient = createTestQueryClient(),
) {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider authService={createFakeAuthService(FAKE_USER)}>
          <DispatcherProvider dispatcher={dispatcher}>{ui}</DispatcherProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>,
  );
}
