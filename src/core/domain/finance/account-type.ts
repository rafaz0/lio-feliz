export enum AccountType {
  CHECKING = "checking",
  SAVINGS = "savings",
  INVESTMENT = "investment",
  CASH = "cash",
}

export function accountTypeLabel(type: AccountType): string {
  const labels: Record<AccountType, string> = {
    [AccountType.CHECKING]: "Conta Corrente",
    [AccountType.SAVINGS]: "Poupança",
    [AccountType.INVESTMENT]: "Investimento",
    [AccountType.CASH]: "Caixa",
  };
  return labels[type];
}
