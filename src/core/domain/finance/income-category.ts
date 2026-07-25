export enum IncomeCategory {
  SALARY = "salary",
  FREELANCE = "freelance",
  INVESTMENT = "investment",
  RENTAL = "rental",
  REFUND = "refund",
  OTHER = "other",
}

export function incomeCategoryLabel(cat: IncomeCategory): string {
  const labels: Record<IncomeCategory, string> = {
    [IncomeCategory.SALARY]: "Salário",
    [IncomeCategory.FREELANCE]: "Freelance",
    [IncomeCategory.INVESTMENT]: "Investimento",
    [IncomeCategory.RENTAL]: "Aluguel",
    [IncomeCategory.REFUND]: "Reembolso",
    [IncomeCategory.OTHER]: "Outro",
  };
  return labels[cat];
}
