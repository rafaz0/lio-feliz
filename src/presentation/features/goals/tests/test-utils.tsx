import type { ReactNode } from "react";
import { render } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { DispatcherProvider } from "@/presentation/providers/DispatcherProvider";
import type { IDispatcher } from "@/application/dispatcher";
import { FakeGoalsDispatcher, type FakeGoalsDispatcherOptions } from "./fake-dispatcher";

export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0, staleTime: 0 },
      mutations: { retry: false },
    },
  });
}

export function createFakeDispatcher(
  options: FakeGoalsDispatcherOptions = {},
): FakeGoalsDispatcher {
  return new FakeGoalsDispatcher(options);
}

export function renderWithGoalsProviders(
  ui: ReactNode,
  dispatcher: IDispatcher,
  queryClient: QueryClient = createTestQueryClient(),
) {
  return render(
    <QueryClientProvider client={queryClient}>
      <DispatcherProvider dispatcher={dispatcher}>{ui}</DispatcherProvider>
    </QueryClientProvider>,
  );
}
