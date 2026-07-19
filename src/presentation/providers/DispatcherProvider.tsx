import type { ReactNode } from "react";
import { DispatcherContext } from "@/presentation/shared/hooks/use-dispatcher";
import type { IDispatcher } from "@/application/dispatcher";

interface DispatcherProviderProps {
  dispatcher: IDispatcher;
  children: ReactNode;
}

export function DispatcherProvider({ dispatcher, children }: DispatcherProviderProps) {
  return <DispatcherContext.Provider value={dispatcher}>{children}</DispatcherContext.Provider>;
}
