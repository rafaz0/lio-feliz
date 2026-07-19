import { useMemo } from "react";
import type { ApplicationError } from "@/presentation/shared/types/application-layer";
import { usePatrimonioQuery } from "./use-patrimonio-query";
import { useHistoricoQuery } from "./use-historico-query";
import { toDashboardViewModel, type DashboardViewModel } from "../types/dashboard.view-model";

interface UseDashboardQueryResult {
  viewModel: DashboardViewModel | null;
  isLoading: boolean;
  isError: boolean;
  error: ApplicationError | null;
  refetch: () => void;
}

const PERIODO_PADRAO = {
  inicio: new Date(new Date().getFullYear(), 0, 1),
  fim: new Date(),
};

export function useDashboardQuery(portfolioId: string): UseDashboardQueryResult {
  const patrimonio = usePatrimonioQuery(portfolioId);
  const historico = useHistoricoQuery(portfolioId, PERIODO_PADRAO);

  const viewModel = useMemo<DashboardViewModel | null>(() => {
    if (!patrimonio.data || !historico.data) return null;
    return toDashboardViewModel(patrimonio.data, historico.data);
  }, [patrimonio.data, historico.data]);

  const isLoading = patrimonio.isLoading || historico.isLoading;
  const isError = patrimonio.isError || historico.isError;
  const error = patrimonio.error ?? historico.error;

  return {
    viewModel,
    isLoading,
    isError,
    error,
    refetch: () => {
      patrimonio.refetch();
      historico.refetch();
    },
  };
}
