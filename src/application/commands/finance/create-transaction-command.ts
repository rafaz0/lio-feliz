export interface CreateTransactionCommand {
  type: "CreateTransactionCommand";
  userId: string;
  accountId: string;
  transactionType: string;
  amount: number;
  description: string;
  category?: string;
  date?: string;
}
