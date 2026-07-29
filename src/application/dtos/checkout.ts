import type { TipoCheckout } from "@/application/commands/iniciar-checkout";

export type CheckoutStatus =
  | "CREATED"
  | "WAITING_PAYMENT"
  | "APPROVED"
  | "DECLINED"
  | "CANCELLED"
  | "EXPIRED";

export interface CheckoutDto {
  readonly checkoutId: string;
  readonly userId: string;
  readonly tipo: TipoCheckout;
  readonly status: CheckoutStatus;
  readonly planId?: string;
  readonly planName?: string;
  readonly amount: number;
  readonly subscriptionId?: string;
  readonly transactionId?: string;
  readonly provider?: string;
  readonly message: string;
  readonly proximaAcao?: string;
}
