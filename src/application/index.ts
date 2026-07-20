export type { IApplicationService } from "./application-service";
export type { IDispatcher } from "./dispatcher";
export { DispatcherImpl } from "./dispatcher-impl";
export type { ICommand, IQuery, CommandHandler, QueryHandler } from "./types";
export { Validator, validateRequiredFields } from "./validator";
export type { ValidationRule } from "./validator";
export {
  convertDomainError,
  convertInfrastructureError,
  convertUnexpectedError,
} from "./error-converter";
export type { ConversionResult } from "./error-converter";

export * from "./errors";
export type * from "./ports";
export type * from "./commands";
export type * from "./queries";
export type * from "./dtos";
export { RegistrarOperacaoService } from "./services/registrar-operacao-service";
export { ImportarCarteiraService } from "./services/importar-carteira-service";
export { SincronizarDadosService } from "./services/sincronizar-dados-service";
export { ConfigurarEstrategiaService } from "./services/configurar-estrategia-service";
export { GerenciarAssinaturaService } from "./services/gerenciar-assinatura-service";
export { ConsultarPatrimonioService } from "./services/consultar-patrimonio-service";
export { ConsultarPosicaoService } from "./services/consultar-posicao-service";
export { AcompanharProventosService } from "./services/acompanhar-proventos-service";
export { ObterHistoricoPatrimonialService } from "./services/obter-historico-patrimonial-service";
export { ConsultarRentabilidadeService } from "./services/consultar-rentabilidade-service";
export { CalcularRebalanceamentoService } from "./services/calcular-rebalanceamento-service";
export { GerarRelatorioFiscalService } from "./services/gerar-relatorio-fiscal-service";
export { ExportarDadosService } from "./services/exportar-dados-service";
export { ConsultarProgressoMetasService } from "./services/consultar-progresso-metas-service";
export { CriarMetaService } from "./services/criar-meta-service";
export { AtualizarMetaService } from "./services/atualizar-meta-service";
export { RegistrarContribuicaoService } from "./services/registrar-contribuicao-service";
export { ObterMetasService } from "./services/obter-metas-service";
export { ObterProgressoMetaService } from "./services/obter-progresso-meta-service";
export type { IDomainEventHandler } from "./handlers/domain-event-handler";
export { DomainEventHandlerRegistry } from "./handlers/handler-registry";
export { FinancialEventRegisteredHandler } from "./handlers/financial-event-registered-handler";
export {
  ImportacaoConcluidaHandler,
  EVENT_NAME_IMPORTACAO_CONCLUIDA,
} from "./handlers/importacao-concluida-handler";
export {
  AssinaturaAlteradaHandler,
  EVENT_NAME_ASSINATURA_ALTERADA,
} from "./handlers/assinatura-alterada-handler";
