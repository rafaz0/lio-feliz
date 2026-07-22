export interface AssinarPlanoCommand {
  readonly type: "AssinarPlanoCommand";
  readonly planId: string;
  readonly userId: string;
}
