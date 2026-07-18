export interface ImportarCarteiraCommand {
  readonly type: "ImportarCarteiraCommand";
  readonly usuarioId: string;
  readonly origem: string;
  readonly arquivo?: string;
  readonly conexao?: Record<string, string>;
  readonly intervalo?: { inicio: Date; fim: Date };
}
