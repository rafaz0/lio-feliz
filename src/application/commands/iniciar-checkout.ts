export type TipoCheckout =
  | "nova_assinatura"
  | "upgrade"
  | "downgrade"
  | "renovacao"
  | "cancelamento"
  | "reativacao"
  | "trial";

export interface IniciarCheckoutCommand {
  readonly type: "IniciarCheckoutCommand";
  readonly userId: string;
  readonly tipo: TipoCheckout;
  readonly planId?: string;
  readonly subscriptionId?: string;
}
