export interface CreateIncomeCommand {
  type: "CreateIncomeCommand";
  userId: string;
  description: string;
  amount: number;
  category: string;
  date?: string;
  recurrence?: string;
}
