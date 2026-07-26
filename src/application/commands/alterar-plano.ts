export interface AlterarPlanoCommand {
  readonly type: "AlterarPlanoCommand";
  readonly userId: string;
  readonly subscriptionId: string;
  readonly newPlanId: string;
  readonly isDowngrade: boolean;
}
