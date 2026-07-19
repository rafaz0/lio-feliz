import { createContext, useContext } from "react";
import type { IDispatcher } from "@/application/dispatcher";

type DispatcherContextType = IDispatcher | null;

export const DispatcherContext = createContext<DispatcherContextType>(null);

export function useDispatcher(): IDispatcher {
  const context = useContext(DispatcherContext);
  if (!context) {
    throw new Error("useDispatcher deve ser usado dentro de um DispatcherProvider");
  }
  return context;
}
