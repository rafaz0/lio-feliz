export { ComparisonSet, type ComparisonSetProps } from "./comparison-set";
export { ComparisonEntry, type ComparisonEntryProps } from "./comparison-entry";
export { Scorecard, type ScorecardProps } from "./scorecard";
export { ComparisonAggregator, type ProjectionData } from "./comparison-aggregator";
export {
  ComparisonSetId,
  ComparisonEntryId,
  ScorecardId,
  type ComparisonScopeType,
  type MetricType,
  type ComparisonScope,
  type ComparisonMetric,
} from "./comparison-types";
export {
  ComparisonSetNotFoundError,
  InsufficientDataError,
  InvalidScopeError,
  ScorecardNotFoundError,
  MinimumEntriesError,
} from "./errors";
