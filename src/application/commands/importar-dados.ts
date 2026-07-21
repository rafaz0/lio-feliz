export interface ImportarDadosCommand {
  readonly type: "ImportarDadosCommand";
  readonly usuarioId: string;
  readonly origem: string;
  readonly formato: string;
  readonly arquivo?: string;
  readonly arquivoSize?: number;
  readonly conexao?: Record<string, string>;
  readonly intervalo?: { inicio: Date; fim: Date };
  readonly portfolioId?: string;
  readonly observacoes?: string;
}
