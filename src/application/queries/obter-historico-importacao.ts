export interface ObterHistoricoImportacaoQuery {
  readonly type: "ObterHistoricoImportacaoQuery";
  readonly usuarioId: string;
  readonly page?: number;
  readonly pageSize?: number;
}
