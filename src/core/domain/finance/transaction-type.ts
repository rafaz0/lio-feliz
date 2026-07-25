export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
  TRANSFER = "transfer",
}

export function transactionTypeLabel(type: TransactionType): string {
  const labels: Record<TransactionType, string> = {
    [TransactionType.INCOME]: "Receita",
    [TransactionType.EXPENSE]: "Despesa",
    [TransactionType.TRANSFER]: "Transferência",
  };
  return labels[type];
}
