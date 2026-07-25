export type IncomeSource = "cash" | "bank_account" | "asset_sale" | "external_income" | "other";

export interface FinanceIntegrationConfig {
  enabled: boolean;
  autoSync: boolean;
  includeInvestments: boolean;
  defaultIncomeSource: IncomeSource;
}

export const DEFAULT_FINANCE_CONFIG: FinanceIntegrationConfig = {
  enabled: false,
  autoSync: false,
  includeInvestments: true,
  defaultIncomeSource: "cash",
};
