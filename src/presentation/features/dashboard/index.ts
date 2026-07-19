export { DashboardView } from "./components/DashboardView";
export { KpiCard } from "./components/KpiCard";
export { PatrimonioConsolidado } from "./components/PatrimonioConsolidado";
export { AlocacaoChart } from "./components/AlocacaoChart";
export { EvolucaoChart } from "./components/EvolucaoChart";
export { DashboardLoading } from "./components/DashboardLoading";
export { DashboardError } from "./components/DashboardError";
export { useDashboardQuery } from "./hooks/use-dashboard-query";
export { usePatrimonioQuery } from "./hooks/use-patrimonio-query";
export { useHistoricoQuery } from "./hooks/use-historico-query";
export { DASHBOARD_QUERY_KEYS } from "./queries";
export {
  toDashboardViewModel,
  toKpiCardsViewModel,
  toAlocacaoViewModel,
  toEvolucaoViewModel,
} from "./types/dashboard.view-model";
export type {
  DashboardViewModel,
  KpiCardViewModel,
  AlocacaoItemViewModel,
  EvolucaoPontoViewModel,
} from "./types/dashboard.view-model";
