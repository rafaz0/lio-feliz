export interface RegistrarContribuicaoCommand {
  readonly type: "RegistrarContribuicaoCommand";
  readonly goalId: string;
  readonly portfolioId: string;
  readonly amount: number;
  readonly date: Date;
}
