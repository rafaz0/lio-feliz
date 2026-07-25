export enum ExpenseCategory {
  HOUSING = "housing",
  FOOD = "food",
  TRANSPORT = "transport",
  HEALTH = "health",
  LEISURE = "leisure",
  EDUCATION = "education",
  UTILITIES = "utilities",
  INSURANCE = "insurance",
  OTHER = "other",
}

export function expenseCategoryLabel(cat: ExpenseCategory): string {
  const labels: Record<ExpenseCategory, string> = {
    [ExpenseCategory.HOUSING]: "Moradia",
    [ExpenseCategory.FOOD]: "Alimentação",
    [ExpenseCategory.TRANSPORT]: "Transporte",
    [ExpenseCategory.HEALTH]: "Saúde",
    [ExpenseCategory.LEISURE]: "Lazer",
    [ExpenseCategory.EDUCATION]: "Educação",
    [ExpenseCategory.UTILITIES]: "Contas",
    [ExpenseCategory.INSURANCE]: "Seguros",
    [ExpenseCategory.OTHER]: "Outro",
  };
  return labels[cat];
}
