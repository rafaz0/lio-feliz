export { TaxLot, type TaxLotProps } from "./tax-lot";
export { TaxEvent, TaxEventId, type TaxEventData } from "./tax-event";
export {
  TaxStatement,
  TaxStatementId,
  type MonthlyTaxSummary,
  type AnnualTaxConsolidation,
} from "./tax-statement";
export {
  TaxCalculationService,
  type RawOperation,
  type WeightedAverageCost,
  type MonthlyCalculationResult,
} from "./tax-calculation-service";
export {
  TaxCalculationMode,
  TaxOperationType,
  ExportFormat,
  DeclarationInclude,
  TAX_RATE_TABLE,
  type TaxRateTableEntry,
} from "./tax-types";
export {
  InvalidTaxPeriodError,
  EmptyOperationsError,
  InconsistentTaxLotError,
  ExportFailedError,
} from "./errors";
