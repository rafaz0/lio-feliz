export interface CreateExpenseCommand {
  type: "CreateExpenseCommand";
  userId: string;
  description: string;
  amount: number;
  category: string;
  dueDate: string;
  paidAt?: string;
  isRecurring?: boolean;
}
