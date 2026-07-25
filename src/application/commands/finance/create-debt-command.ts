export interface CreateDebtCommand {
  type: "CreateDebtCommand";
  userId: string;
  description: string;
  debtType: string;
  totalAmount: number;
  monthlyPayment: number;
  interestRate?: number;
  institution?: string;
  dueDay?: number;
}
