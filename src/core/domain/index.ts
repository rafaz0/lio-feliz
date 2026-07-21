export { Result } from "./result";
export { DomainError } from "./errors";
export { ValueObject } from "./value-object";
export { EntityId } from "./entity-id";
export { Entity } from "./entity";
export { AggregateRoot } from "./aggregate-root";
export { DomainEvent } from "./domain-event";
export { Ticker } from "./value-objects/ticker";
export { Quantity } from "./value-objects/quantity";
export { Money } from "./value-objects/money";
export { AssetId } from "./identifiers/asset-id";
export { PortfolioId } from "./identifiers/portfolio-id";
export { OperationId } from "./identifiers/operation-id";
export { InstitutionId } from "./identifiers/institution-id";
export { Asset } from "./entities/asset";
export {
  FinancialGoalId,
  GoalCategory,
  GoalStatus,
  FinancialGoal,
  GoalContribution,
  ContributionId,
  ContributionType,
  GoalProgress,
  FinancialGoalService,
  type GoalsSummary,
} from "./financial-goal";

export {
  TaxLot,
  type TaxLotProps,
  TaxEvent,
  TaxEventId,
  type TaxEventData,
  TaxStatement,
  TaxStatementId,
  type MonthlyTaxSummary,
  type AnnualTaxConsolidation,
  TaxCalculationService,
  type RawOperation,
  type WeightedAverageCost,
  type MonthlyCalculationResult,
  TaxCalculationMode,
  TaxOperationType,
  ExportFormat,
  DeclarationInclude,
  TAX_RATE_TABLE,
  type TaxRateTableEntry,
} from "./tax";

export {
  REBALANCING_METHOD,
  REBALANCING_STATUS,
  REBALANCING_ACTION,
  DEFAULT_TOLERANCE,
  MIN_TOLERANCE,
  MAX_TOLERANCE,
  PERCENTAGE_PRECISION,
  AllocationTarget,
  AllocationTargetCollection,
  normalisePercentages,
  RebalancingService,
  InvalidAllocationPercentageError,
  AllocationTotalMustSum100Error,
  NoAllocationTargetsError,
  InvalidToleranceError,
  NoPositionsForRebalancingError,
} from "./rebalancing";

export type {
  RebalancingMethod,
  RebalancingStatus,
  RebalancingAction,
  AllocationData,
  AllocationDifferenceData,
  SuggestedActionData,
  RebalancingProposalData,
} from "./rebalancing";

export {
  FixedIncomeAsset,
  Coupon,
  AmortizationSchedule,
  FixedIncomeType,
  FIXED_INCOME_TYPES,
  isFixedIncomeType,
  FixedIncomeTypeError,
  FixedIncomeService,
  InvalidFixedIncomeRateError,
  InvalidFixedIncomeNominalError,
  InvalidFixedIncomeDatesError,
  InvalidScheduleConservationError,
  InvalidFixedIncomeTypeError,
} from "./fixed-income";
export type { FixedIncomeAssetProps, ScheduleInput } from "./fixed-income";
