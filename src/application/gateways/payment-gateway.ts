export interface PaymentResult {
  success: boolean;
  transactionId: string;
  status: "PAID" | "FAILED" | "REFUNDED";
  error?: string;
}

export interface IPaymentGateway {
  charge(subscriptionId: string, amount: number): Promise<PaymentResult>;
  cancel(subscriptionId: string): Promise<void>;
  refund(chargeId: string): Promise<void>;
}
