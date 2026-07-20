export const REBALANCING_METHOD = {
  BY_CONTRIBUTION: "by_contribution",
  BY_SELL: "by_sell",
  MIXED: "mixed",
} as const;

export type RebalancingMethod = (typeof REBALANCING_METHOD)[keyof typeof REBALANCING_METHOD];

export const REBALANCING_STATUS = {
  PENDING: "pending",
  EXECUTED: "executed",
  CANCELLED: "cancelled",
} as const;

export type RebalancingStatus = (typeof REBALANCING_STATUS)[keyof typeof REBALANCING_STATUS];

export const REBALANCING_ACTION = {
  APORTE: "APORTE",
  VENDER: "VENDER",
  MANTER: "MANTER",
} as const;

export type RebalancingAction = (typeof REBALANCING_ACTION)[keyof typeof REBALANCING_ACTION];

export interface AllocationData {
  readonly className: string;
  readonly percentage: number;
  readonly value: number;
}

export interface AllocationDifferenceData {
  readonly className: string;
  readonly currentPercentage: number;
  readonly targetPercentage: number;
  readonly difference: number;
  readonly withinTolerance: boolean;
}

export interface SuggestedActionData {
  readonly className: string;
  readonly action: RebalancingAction;
  readonly suggestedValue: number;
}

export interface RebalancingProposalData {
  readonly differences: readonly AllocationDifferenceData[];
  readonly suggestions: readonly SuggestedActionData[];
  readonly totalPortfolioValue: number;
  readonly needsRebalancing: boolean;
  readonly method: RebalancingMethod;
  readonly tolerance: number;
}

export const DEFAULT_TOLERANCE = 5;
export const MIN_TOLERANCE = 1;
export const MAX_TOLERANCE = 20;
export const PERCENTAGE_PRECISION = 2;
