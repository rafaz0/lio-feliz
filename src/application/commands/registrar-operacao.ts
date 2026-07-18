export interface RegistrarOperacaoCommand {
  readonly portfolioId: string;
  readonly tipo: string;
  readonly ativoId: string;
  readonly quantidade: number;
  readonly valor: number;
  readonly data: Date;
  readonly observacao?: string;
}
