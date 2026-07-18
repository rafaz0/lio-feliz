export interface ParametrosImportacao {
  origem: string;
  arquivo?: string;
  conexao?: Record<string, string>;
  intervalo?: { inicio: Date; fim: Date };
}

export interface OperacaoBruta {
  tipo: string;
  ativo: string;
  quantidade: number;
  valor: number;
  data: Date;
  observacao?: string;
}

export interface DadosImportacao {
  fonte: string;
  operacoes: OperacaoBruta[];
  dataImportacao: Date;
  metadados: Record<string, string>;
}

export interface IDataGateway {
  ObterDadosImportacao(origem: string, parametros: ParametrosImportacao): Promise<DadosImportacao>;
}
