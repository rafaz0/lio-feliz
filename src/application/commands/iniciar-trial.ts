export interface IniciarTrialCommand {
  readonly type: "IniciarTrialCommand";
  readonly userId: string;
  readonly planId: string;
  readonly trialDurationDays: number;
}
