export type { IPortfolioRepository } from "./portfolio-repository";
export type { IAssetRepository } from "./asset-repository";
export type {
  IConfigurationRepository,
  EstrategiaConfiguracao,
  MetaFinanceira,
} from "./configuration-repository";
export type { ISubscriptionRepository, Assinatura, PlanoDto } from "./subscription-repository";
export type {
  IProjectionRepository,
  PatrimonioProjection,
  PosicaoProjection,
  HistoricoProjection,
  ProventoProjection,
} from "./projection-repository";
export type {
  IDataGateway,
  ParametrosImportacao,
  DadosImportacao,
  OperacaoBruta,
} from "./data-gateway";
export type { IUnitOfWork } from "./unit-of-work";
export type { IDomainEventPublisher } from "./domain-event-publisher";
export type { INotificationPort } from "./notification-port";
export type { IImportInterpreterPort } from "./import-interpreter";
export type { IFinancialGoalRepository } from "./financial-goal-repository";
export type { ITaxStatementRepository } from "./tax-statement-repository";
export type { IFixedIncomeRepository } from "./fixed-income-repository";
export type { IReportRepository } from "./report-repository";
export type { IImportHistoryRepository } from "./import-history-repository";
export type { IIntegrationRepository } from "./integration-repository";
export type { IBacktestRepository } from "./backtest-repository";
export type { IAlertRepository } from "./alert-repository";
export type { IComparisonRepository } from "./comparison-repository";
