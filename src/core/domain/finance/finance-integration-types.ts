export interface SyncOperationEvent {
  operationId: string;
  userId: string;
  ticker: string;
  side: "buy" | "sell" | "dividend" | "bonus";
  quantity: number;
  price: number;
  total: number;
  tradedAt: string;
  incomeSource?: string;
}

export interface SyncResult {
  success: boolean;
  operationId: string;
  message?: string;
}
