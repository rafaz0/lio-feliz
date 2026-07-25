export enum DebtType {
  CREDIT_CARD = "credit_card",
  LOAN = "loan",
  FINANCING = "financing",
  OTHER = "other",
}

export function debtTypeLabel(type: DebtType): string {
  const labels: Record<DebtType, string> = {
    [DebtType.CREDIT_CARD]: "Cartão de Crédito",
    [DebtType.LOAN]: "Empréstimo",
    [DebtType.FINANCING]: "Financiamento",
    [DebtType.OTHER]: "Outro",
  };
  return labels[type];
}
