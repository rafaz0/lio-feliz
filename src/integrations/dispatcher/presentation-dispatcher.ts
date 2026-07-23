import { DispatcherImpl } from "@/application/dispatcher-impl";
import type { IDispatcher } from "@/application/dispatcher";
import type { IProjectionRepository,
  IPortfolioRepository,
  IConfigurationRepository,
  IDomainEventPublisher,
  IDataGateway,
  IImportInterpreterPort,
  IFinancialGoalRepository,
  ITaxStatementRepository,
  IFixedIncomeRepository,
  IReportRepository,
  IImportHistoryRepository,
  IIntegrationRepository,
  IComparisonRepository,
} from "@/application/ports";
import { ConsultarPatrimonioService } from "@/application/services/consultar-patrimonio-service";
import { CalcularImpostoService } from "@/application/services/calcular-imposto-service";
import { ExportarDeclaracaoService } from "@/application/services/exportar-declaracao-service";
import { ObterDeclaracaoService } from "@/application/services/obter-declaracao-service";
import { ObterPosicaoFiscalService } from "@/application/services/obter-posicao-fiscal-service";
import { ObterHistoricoPatrimonialService } from "@/application/services/obter-historico-patrimonial-service";
import { ConsultarPosicaoService } from "@/application/services/consultar-posicao-service";
import { RegistrarOperacaoService } from "@/application/services/registrar-operacao-service";
import { AcompanharProventosService } from "@/application/services/acompanhar-proventos-service";
import { ConsultarRentabilidadeService } from "@/application/services/consultar-rentabilidade-service";
import { CalcularRebalanceamentoService } from "@/application/services/calcular-rebalanceamento-service";
import { GerarRelatorioFiscalService } from "@/application/services/gerar-relatorio-fiscal-service";
import { ObterConfiguracoesService } from "@/application/services/obter-configuracoes-service";
import { ConfigurarEstrategiaService } from "@/application/services/configurar-estrategia-service";
import { SincronizarDadosService } from "@/application/services/sincronizar-dados-service";
import { ExportarDadosService } from "@/application/services/exportar-dados-service";
import { ExecutarRebalanceamentoService } from "@/application/services/executar-rebalanceamento-service";
import { ObterMetasService } from "@/application/services/obter-metas-service";
import { CriarMetaService } from "@/application/services/criar-meta-service";
import { AtualizarMetaService } from "@/application/services/atualizar-meta-service";
import { ObterRelatoriosDisponiveisService } from "@/application/services/obter-relatorios-disponiveis-service";
import { GerarRelatorioService } from "@/application/services/gerar-relatorio-service";
import { AgendarRelatorioService } from "@/application/services/agendar-relatorio-service";
import { ObterRelatorioExecutadoService } from "@/application/services/obter-relatorio-executado-service";
import type { ObterPatrimonioQuery } from "@/application/queries/obter-patrimonio";
import type { ObterHistoricoPatrimonialQuery } from "@/application/queries/obter-historico-patrimonial";
import type { ConsultarPosicaoQuery } from "@/application/queries/consultar-posicao";
import type { ObterProventosQuery } from "@/application/queries/obter-proventos";
import type { ConsultarRentabilidadeQuery } from "@/application/queries/consultar-rentabilidade";
import type { CalcularRebalanceamentoQuery } from "@/application/queries/calcular-rebalanceamento";
import type { GerarRelatorioFiscalQuery } from "@/application/queries/gerar-relatorio-fiscal";
import type { ObterConfiguracoesQuery } from "@/application/queries/obter-configuracoes";
import type { ExportarDadosQuery } from "@/application/queries/exportar-dados";
import type { ConfigurarEstrategiaCommand } from "@/application/commands/configurar-estrategia";
import type { RegistrarOperacaoCommand } from "@/application/commands/registrar-operacao";
import type { SincronizarDadosCommand } from "@/application/commands/sincronizar-dados";
import type { ObterMetasQuery } from "@/application/queries/obter-metas";
import type { CriarMetaCommand } from "@/application/commands/criar-meta";
import type { AtualizarMetaCommand } from "@/application/commands/atualizar-meta";
import type { CalcularImpostoCommand } from "@/application/commands/calcular-imposto";
import type { ExportarDeclaracaoCommand } from "@/application/commands/exportar-declaracao";
import type { ExecutarRebalanceamentoCommand } from "@/application/commands/executar-rebalanceamento";
import type { ObterDeclaracaoQuery } from "@/application/queries/obter-declaracao";
import { RegistrarCupomService } from "@/application/services/registrar-cupom-service";
import { ObterRendaFixaService } from "@/application/services/obter-renda-fixa-service";
import { ObterCronogramaPagamentosService } from "@/application/services/obter-cronograma-pagamentos-service";
import type { ObterRendaFixaQuery } from "@/application/queries/obter-renda-fixa";
import type { ObterCronogramaPagamentosQuery } from "@/application/queries/obter-cronograma-pagamentos";
import type { RegistrarCupomCommand } from "@/application/commands/registrar-cupom";
import type { ObterPosicaoFiscalQuery } from "@/application/queries/obter-posicao-fiscal";
import type { ObterRelatoriosDisponiveisQuery } from "@/application/queries/obter-relatorios-disponiveis";
import type { ObterRelatorioExecutadoQuery } from "@/application/queries/obter-relatorio-executado";
import type { GerarRelatorioCommand } from "@/application/commands/gerar-relatorio";
import type { AgendarRelatorioCommand } from "@/application/commands/agendar-relatorio";
import { ImportarDadosService } from "@/application/services/importar-dados-service";
import { ExportarRelatorioService } from "@/application/services/exportar-relatorio-service";
import { ObterHistoricoImportacaoService } from "@/application/services/obter-historico-importacao-service";
import { ObterModelosExportacaoService } from "@/application/services/obter-modelos-exportacao-service";
import { ConfigurarIntegracaoService } from "@/application/services/configurar-integracao-service";
import { SincronizarIntegracaoService } from "@/application/services/sincronizar-integracao-service";
import { ObterIntegracoesService } from "@/application/services/obter-integracoes-service";
import { ObterStatusSincronizacaoService } from "@/application/services/obter-status-sincronizacao-service";
import type { ImportarDadosCommand } from "@/application/commands/importar-dados";
import type { ExportarRelatorioCommand } from "@/application/commands/exportar-relatorio";
import type { ObterHistoricoImportacaoQuery } from "@/application/queries/obter-historico-importacao";
import type { ObterModelosExportacaoQuery } from "@/application/queries/obter-modelos-exportacao";
import type { ConfigurarIntegracaoCommand } from "@/application/commands/configurar-integracao";
import type { SincronizarIntegracaoCommand } from "@/application/commands/sincronizar-integracao";
import type { ObterIntegracoesQuery } from "@/application/queries/obter-integracoes";
import type { ObterStatusSincronizacaoQuery } from "@/application/queries/obter-status-sincronizacao";
import { CriarComparacaoService } from "@/application/services/criar-comparacao-service";
import { ObterComparacaoService } from "@/application/services/obter-comparacao-service";
import { ObterScorecardService } from "@/application/services/obter-scorecard-service";
import type { ObterComparacaoQuery } from "@/application/queries/obter-comparacao";
import type { ObterScorecardQuery } from "@/application/queries/obter-scorecard";
import type { CriarComparacaoCommand } from "@/application/commands/criar-comparacao";
import { AtualizarTaxaCambioService } from "@/application/services/atualizar-taxa-cambio-service";
import { ObterAtivosInternacionaisService } from "@/application/services/obter-ativos-internacionais-service";
import { ObterTaxaCambioService } from "@/application/services/obter-taxa-cambio-service";
import type { ObterAtivosInternacionaisQuery } from "@/application/queries/obter-ativos-internacionais";
import type { ObterTaxaCambioQuery } from "@/application/queries/obter-taxa-cambio";
import type { AtualizarTaxaCambioCommand } from "@/application/commands/atualizar-taxa-cambio";
import { AssinarPlanoService } from "@/application/services/assinar-plano-service";
import { CancelarAssinaturaService } from "@/application/services/cancelar-assinatura-service";
import { VerificarAcessoService } from "@/application/services/verificar-acesso-service";
import { ObterPlanoAtivoService } from "@/application/services/obter-plano-ativo-service";
import { ListarPlanosService } from "@/application/services/listar-planos-service";
import type { INotificationPort } from "@/application/ports/notification-port";
import type { ObterPlanoAtivoQuery } from "@/application/queries/obter-plano-ativo";
import type { ListarPlanosQuery } from "@/application/queries/listar-planos";
import type { AssinarPlanoCommand } from "@/application/commands/assinar-plano";
import type { CancelarAssinaturaCommand } from "@/application/commands/cancelar-assinatura";
import type { VerificarAcessoCommand } from "@/application/commands/verificar-acesso";
import { ResponderQuestionarioService } from "@/application/services/responder-questionario-service";
import { CalcularPerfilService } from "@/application/services/calcular-perfil-service";
import { ObterPerfilService } from "@/application/services/obter-perfil-service";
import { ObterQuestionarioService } from "@/application/services/obter-questionario-service";
import { ExecutarBacktestService } from "@/application/services/executar-backtest-service";
import { ObterBacktestService } from "@/application/services/obter-backtest-service";
import { ListarEstrategiasService } from "@/application/services/listar-estrategias-service";
import { CriarAlertaService } from "@/application/services/criar-alerta-service";
import { AtualizarAlertaService } from "@/application/services/atualizar-alerta-service";
import { ConfirmarAlertaService } from "@/application/services/confirmar-alerta-service";
import { ObterAlertaService } from "@/application/services/obter-alerta-service";
import { ListarAlertasAtivosService } from "@/application/services/listar-alertas-ativos-service";
import type { CriarAlertaCommand } from "@/application/commands/criar-alerta";
import type { AtualizarAlertaCommand } from "@/application/commands/atualizar-alerta";
import type { ConfirmarAlertaCommand } from "@/application/commands/confirmar-alerta";
import type { ObterAlertaQuery } from "@/application/queries/obter-alerta";
import type { ListarAlertasAtivosQuery } from "@/application/queries/listar-alertas-ativos";
import type { IAlertRepository } from "@/application/ports/alert-repository";
import type { ObterBacktestQuery } from "@/application/queries/obter-backtest";
import type { ListarEstrategiasQuery } from "@/application/queries/listar-estrategias";
import type { IBacktestRepository } from "@/application/ports/backtest-repository";
import type { ResponderQuestionarioCommand } from "@/application/commands/responder-questionario";
import type { CalcularPerfilCommand } from "@/application/commands/calcular-perfil";
import type { ObterPerfilQuery } from "@/application/queries/obter-perfil";
import type { ObterQuestionarioQuery } from "@/application/queries/obter-questionario";
import { SyncOrchestrationService } from "@/core/domain/integrations";
import { AvancarPassoService } from "@/application/services/avancar-passo-service";
import { PularOnboardingService } from "@/application/services/pular-onboarding-service";
import { ObterProgressoOnboardingService } from "@/application/services/obter-progresso-onboarding-service";
import { ObterPassoAtualService } from "@/application/services/obter-passo-atual-service";
import type { AvancarPassoCommand } from "@/application/commands/avancar-passo";
import type { PularOnboardingCommand } from "@/application/commands/pular-onboarding";
import type { ObterProgressoOnboardingQuery } from "@/application/queries/obter-progresso-onboarding";
import type { ObterPassoAtualQuery } from "@/application/queries/obter-passo-atual";
import { SalvarPreferenciasService } from "@/application/services/salvar-preferencias-service";
import { AtualizarTemaService } from "@/application/services/atualizar-tema-service";
import { SalvarLayoutDashboardService } from "@/application/services/salvar-layout-dashboard-service";
import { ObterPreferenciasService } from "@/application/services/obter-preferencias-service";
import { ObterTemaService } from "@/application/services/obter-tema-service";
import type { SalvarPreferenciasCommand } from "@/application/commands/salvar-preferencias";
import type { AtualizarTemaCommand } from "@/application/commands/atualizar-tema";
import type { SalvarLayoutDashboardCommand } from "@/application/commands/salvar-layout-dashboard";
import type { ObterPreferenciasQuery } from "@/application/queries/obter-preferencias";
import type { ObterTemaQuery } from "@/application/queries/obter-tema";

interface PresentationDispatcherDeps {
  projectionRepository: IProjectionRepository;
  portfolioRepository?: IPortfolioRepository;
  configurationRepository?: IConfigurationRepository;
  eventPublisher?: IDomainEventPublisher;
  dataGateway?: IDataGateway;
  importInterpreter?: IImportInterpreterPort;
  financialGoalRepository?: IFinancialGoalRepository;
  taxStatementRepository?: ITaxStatementRepository;
  fixedIncomeRepository?: IFixedIncomeRepository;
  reportRepository?: IReportRepository;
  importHistoryRepository?: IImportHistoryRepository;
  integrationRepository?: IIntegrationRepository;
  comparisonRepository?: IComparisonRepository;
  foreignAssetRepository?: IForeignAssetRepository;
  notificationPort?: INotificationPort;
  subscriptionRepository?: import("@/application/ports/subscription-repository").ISubscriptionRepository;
  investorProfileRepository?: import("@/application/ports/investor-profile-repository").IInvestorProfileRepository;
  glossaryRepository?: IGlossaryRepository;
  backtestRepository?: IBacktestRepository;
  alertRepository?: IAlertRepository;
}

/**
 * Monta um IDispatcher com os handlers de consulta e comando necessários à Presentation Layer.
 *
 * A Presentation Layer NUNCA instancia a Application Layer ou a Infrastructure diretamente.
 * Este adapter opera como Composition Root fora de `src/presentation` e recebe as
 * dependências (repositórios, publishers) injetadas.
 */
export function createPresentationDispatcher({
  projectionRepository,
  portfolioRepository,
  configurationRepository,
  eventPublisher,
  dataGateway,
  importInterpreter,
  financialGoalRepository,
  taxStatementRepository,
  fixedIncomeRepository,
  reportRepository,
  importHistoryRepository,
  integrationRepository,
  comparisonRepository,
  foreignAssetRepository,
  notificationPort,
  subscriptionRepository,
  investorProfileRepository,
  glossaryRepository,
  backtestRepository,
  alertRepository,
}: PresentationDispatcherDeps): IDispatcher {
  const dispatcher = new DispatcherImpl();
  const syncOrchestration = new SyncOrchestrationService();

  dispatcher.RegisterQuery("ObterPatrimonioQuery", (query) =>
    new ConsultarPatrimonioService(projectionRepository).Execute(query as ObterPatrimonioQuery),
  );

  dispatcher.RegisterQuery("ObterHistoricoPatrimonialQuery", (query) =>
    new ObterHistoricoPatrimonialService(projectionRepository).Execute(
      query as ObterHistoricoPatrimonialQuery,
    ),
  );

  dispatcher.RegisterQuery("ConsultarPosicaoQuery", (query) =>
    new ConsultarPosicaoService(projectionRepository).Execute(query as ConsultarPosicaoQuery),
  );

  dispatcher.RegisterQuery("ObterProventosQuery", (query) =>
    new AcompanharProventosService(projectionRepository).Execute(query as ObterProventosQuery),
  );

  dispatcher.RegisterQuery("ConsultarRentabilidadeQuery", (query) =>
    new ConsultarRentabilidadeService(projectionRepository).Execute(
      query as ConsultarRentabilidadeQuery,
    ),
  );

  dispatcher.RegisterQuery("GerarRelatorioFiscalQuery", (query) =>
    new GerarRelatorioFiscalService(projectionRepository).Execute(
      query as GerarRelatorioFiscalQuery,
    ),
  );

  dispatcher.RegisterQuery("ExportarDadosQuery", (query) =>
    new ExportarDadosService(projectionRepository).Execute(query as ExportarDadosQuery),
  );

  if (configurationRepository) {
    dispatcher.RegisterQuery("CalcularRebalanceamentoQuery", (query) =>
      new CalcularRebalanceamentoService(projectionRepository, configurationRepository).Execute(
        query as CalcularRebalanceamentoQuery,
      ),
    );

    dispatcher.RegisterQuery("ObterConfiguracoesQuery", (query) =>
      new ObterConfiguracoesService(configurationRepository).Execute(
        query as ObterConfiguracoesQuery,
      ),
    );

    dispatcher.RegisterCommand("ConfigurarEstrategiaCommand", (command) =>
      new ConfigurarEstrategiaService(configurationRepository).Execute(
        command as ConfigurarEstrategiaCommand,
      ),
    );
  }

  if (portfolioRepository && eventPublisher) {
    dispatcher.RegisterCommand("RegistrarOperacaoCommand", (command) =>
      new RegistrarOperacaoService(portfolioRepository, eventPublisher).Execute(
        command as RegistrarOperacaoCommand,
      ),
    );

    dispatcher.RegisterCommand("ExecutarRebalanceamentoCommand", (command) =>
      new ExecutarRebalanceamentoService(portfolioRepository, eventPublisher).Execute(
        command as ExecutarRebalanceamentoCommand,
      ),
    );
  }

  if (portfolioRepository && eventPublisher && dataGateway && importInterpreter) {
    dispatcher.RegisterCommand("SincronizarDadosCommand", (command) =>
      new SincronizarDadosService(
        portfolioRepository,
        dataGateway,
        importInterpreter,
        eventPublisher,
      ).Execute(command as SincronizarDadosCommand),
    );
  }

  if (financialGoalRepository) {
    dispatcher.RegisterQuery("ObterMetasQuery", (query) =>
      new ObterMetasService(financialGoalRepository).Execute(query as ObterMetasQuery),
    );

    dispatcher.RegisterCommand("CriarMetaCommand", (command) =>
      new CriarMetaService(financialGoalRepository).Execute(command as CriarMetaCommand),
    );

    dispatcher.RegisterCommand("AtualizarMetaCommand", (command) =>
      new AtualizarMetaService(financialGoalRepository).Execute(command as AtualizarMetaCommand),
    );
  }

  if (taxStatementRepository) {
    dispatcher.RegisterCommand("CalcularImpostoCommand", (command) =>
      new CalcularImpostoService(projectionRepository).Execute(command as CalcularImpostoCommand),
    );

    dispatcher.RegisterCommand("ExportarDeclaracaoCommand", (command) =>
      new ExportarDeclaracaoService(projectionRepository).Execute(
        command as ExportarDeclaracaoCommand,
      ),
    );

    dispatcher.RegisterQuery("ObterDeclaracaoQuery", (query) =>
      new ObterDeclaracaoService(projectionRepository, taxStatementRepository).Execute(
        query as ObterDeclaracaoQuery,
      ),
    );

    dispatcher.RegisterQuery("ObterPosicaoFiscalQuery", (query) =>
      new ObterPosicaoFiscalService(projectionRepository).Execute(query as ObterPosicaoFiscalQuery),
    );
  }

  if (fixedIncomeRepository) {
    dispatcher.RegisterCommand("RegistrarCupomCommand", (command) =>
      new RegistrarCupomService(fixedIncomeRepository).Execute(command as RegistrarCupomCommand),
    );

    dispatcher.RegisterQuery("ObterRendaFixaQuery", (query) =>
      new ObterRendaFixaService(fixedIncomeRepository).Execute(query as ObterRendaFixaQuery),
    );

    dispatcher.RegisterQuery("ObterCronogramaPagamentosQuery", (query) =>
      new ObterCronogramaPagamentosService(fixedIncomeRepository).Execute(
        query as ObterCronogramaPagamentosQuery,
      ),
    );
  }

  if (reportRepository) {
    dispatcher.RegisterQuery("ObterRelatoriosDisponiveisQuery", (query) =>
      new ObterRelatoriosDisponiveisService().Execute(query as ObterRelatoriosDisponiveisQuery),
    );

    dispatcher.RegisterQuery("ObterRelatorioExecutadoQuery", (query) =>
      new ObterRelatorioExecutadoService(reportRepository).Execute(
        query as ObterRelatorioExecutadoQuery,
      ),
    );

    dispatcher.RegisterCommand("GerarRelatorioCommand", (command) =>
      new GerarRelatorioService(reportRepository, projectionRepository).Execute(
        command as GerarRelatorioCommand,
      ),
    );

    dispatcher.RegisterCommand("AgendarRelatorioCommand", (command) =>
      new AgendarRelatorioService(reportRepository).Execute(command as AgendarRelatorioCommand),
    );
  }

  if (portfolioRepository && eventPublisher && dataGateway && importInterpreter && importHistoryRepository) {
    dispatcher.RegisterCommand("ImportarDadosCommand", (command) =>
      new ImportarDadosService(
        portfolioRepository,
        dataGateway,
        importInterpreter,
        importHistoryRepository,
        eventPublisher,
      ).Execute(command as ImportarDadosCommand),
    );
  }

  if (projectionRepository) {
    dispatcher.RegisterCommand("ExportarRelatorioCommand", (command) =>
      new ExportarRelatorioService(projectionRepository).Execute(command as ExportarRelatorioCommand),
    );

    dispatcher.RegisterQuery("ObterModelosExportacaoQuery", (query) =>
      new ObterModelosExportacaoService().Execute(query as ObterModelosExportacaoQuery),
    );
  }

  if (importHistoryRepository) {
    dispatcher.RegisterQuery("ObterHistoricoImportacaoQuery", (query) =>
      new ObterHistoricoImportacaoService(importHistoryRepository).Execute(
        query as ObterHistoricoImportacaoQuery,
      ),
    );
  }

  if (integrationRepository) {
    dispatcher.RegisterCommand("ConfigurarIntegracaoCommand", (command) =>
      new ConfigurarIntegracaoService(integrationRepository).Execute(
        command as ConfigurarIntegracaoCommand,
      ),
    );

    dispatcher.RegisterCommand("SincronizarIntegracaoCommand", (command) =>
      new SincronizarIntegracaoService(integrationRepository, syncOrchestration).Execute(
        command as SincronizarIntegracaoCommand,
      ),
    );

    dispatcher.RegisterQuery("ObterIntegracoesQuery", (query) =>
      new ObterIntegracoesService(integrationRepository).Execute(query as ObterIntegracoesQuery),
    );

    dispatcher.RegisterQuery("ObterStatusSincronizacaoQuery", (query) =>
      new ObterStatusSincronizacaoService(integrationRepository, syncOrchestration).Execute(
        query as ObterStatusSincronizacaoQuery,
      ),
    );
  }

  if (comparisonRepository) {
    dispatcher.RegisterCommand("CriarComparacaoCommand", (command) =>
      new CriarComparacaoService(comparisonRepository, projectionRepository).Execute(
        command as CriarComparacaoCommand,
      ),
    );

    dispatcher.RegisterQuery("ObterComparacaoQuery", (query) =>
      new ObterComparacaoService(comparisonRepository).Execute(query as ObterComparacaoQuery),
    );

    dispatcher.RegisterQuery("ObterScorecardQuery", (query) =>
      new ObterScorecardService(comparisonRepository).Execute(query as ObterScorecardQuery),
    );
  }

  if (alertRepository) {
    dispatcher.RegisterCommand("CriarAlertaCommand", (command) =>
      new CriarAlertaService(alertRepository).Execute(command as CriarAlertaCommand),
    );

    dispatcher.RegisterCommand("AtualizarAlertaCommand", (command) =>
      new AtualizarAlertaService(alertRepository).Execute(command as AtualizarAlertaCommand),
    );

    dispatcher.RegisterCommand("ConfirmarAlertaCommand", (command) =>
      new ConfirmarAlertaService(alertRepository).Execute(command as ConfirmarAlertaCommand),
    );

    dispatcher.RegisterQuery("ObterAlertaQuery", (query) =>
      new ObterAlertaService(alertRepository).Execute(query as ObterAlertaQuery),
    );

    dispatcher.RegisterQuery("ListarAlertasAtivosQuery", (query) =>
      new ListarAlertasAtivosService(alertRepository).Execute(query as ListarAlertasAtivosQuery),
    );
  }

  if (backtestRepository) {
    dispatcher.RegisterCommand("ExecutarBacktestCommand", (command) =>
      new ExecutarBacktestService(backtestRepository, projectionRepository).Execute(
        command as ExecutarBacktestCommand,
      ),
    );

    dispatcher.RegisterQuery("ObterBacktestQuery", (query) =>
      new ObterBacktestService(backtestRepository).Execute(query as ObterBacktestQuery),
    );

    dispatcher.RegisterQuery("ListarEstrategiasQuery", (query) =>
      new ListarEstrategiasService(backtestRepository).Execute(query as ListarEstrategiasQuery),
    );
  }

  if (foreignAssetRepository) {
    dispatcher.RegisterCommand("AtualizarTaxaCambioCommand", (command) =>
      new AtualizarTaxaCambioService(foreignAssetRepository).Execute(
        command as AtualizarTaxaCambioCommand,
      ),
    );

    dispatcher.RegisterQuery("ObterAtivosInternacionaisQuery", (query) =>
      new ObterAtivosInternacionaisService(foreignAssetRepository).Execute(
        query as ObterAtivosInternacionaisQuery,
      ),
    );

    dispatcher.RegisterQuery("ObterTaxaCambioQuery", (query) =>
      new ObterTaxaCambioService(foreignAssetRepository).Execute(
        query as ObterTaxaCambioQuery,
      ),
    );
  }

  if (subscriptionRepository) {
    dispatcher.RegisterQuery("ListarPlanosQuery", (query) =>
      new ListarPlanosService(subscriptionRepository).Execute(query as ListarPlanosQuery),
    );

    dispatcher.RegisterQuery("ObterPlanoAtivoQuery", (query) =>
      new ObterPlanoAtivoService(subscriptionRepository).Execute(query as ObterPlanoAtivoQuery),
    );

    dispatcher.RegisterCommand("AssinarPlanoCommand", (command) =>
      new AssinarPlanoService(subscriptionRepository, notificationPort).Execute(
        command as AssinarPlanoCommand,
      ),
    );

    dispatcher.RegisterCommand("CancelarAssinaturaCommand", (command) =>
      new CancelarAssinaturaService(subscriptionRepository).Execute(
        command as CancelarAssinaturaCommand,
      ),
    );

    dispatcher.RegisterCommand("VerificarAcessoCommand", (command) =>
      new VerificarAcessoService(subscriptionRepository).Execute(
        command as VerificarAcessoCommand,
      ),
    );
  }

  if (investorProfileRepository) {
    dispatcher.RegisterCommand("ResponderQuestionarioCommand", (command) =>
      new ResponderQuestionarioService(investorProfileRepository, projectionRepository).Execute(
        command as ResponderQuestionarioCommand,
      ),
    );

    dispatcher.RegisterCommand("CalcularPerfilCommand", (command) =>
      new CalcularPerfilService(investorProfileRepository, projectionRepository).Execute(
        command as CalcularPerfilCommand,
      ),
    );

    dispatcher.RegisterQuery("ObterPerfilQuery", (query) =>
      new ObterPerfilService(investorProfileRepository).Execute(query as ObterPerfilQuery),
    );

    dispatcher.RegisterQuery("ObterQuestionarioQuery", (query) =>
      new ObterQuestionarioService().Execute(query as ObterQuestionarioQuery),
    );
  }

  if (configurationRepository) {
    const configRepo = configurationRepository;

    dispatcher.RegisterCommand("SalvarPreferenciasCommand", (command) =>
      new SalvarPreferenciasService(configRepo).Execute(command as SalvarPreferenciasCommand),
    );

    dispatcher.RegisterCommand("AtualizarTemaCommand", (command) =>
      new AtualizarTemaService(configRepo).Execute(command as AtualizarTemaCommand),
    );

    dispatcher.RegisterCommand("SalvarLayoutDashboardCommand", (command) =>
      new SalvarLayoutDashboardService(configRepo).Execute(command as SalvarLayoutDashboardCommand),
    );

    dispatcher.RegisterQuery("ObterPreferenciasQuery", (query) =>
      new ObterPreferenciasService(configRepo).Execute(query as ObterPreferenciasQuery),
    );

    dispatcher.RegisterQuery("ObterTemaQuery", (query) =>
      new ObterTemaService(configRepo).Execute(query as ObterTemaQuery),
    );

    dispatcher.RegisterCommand("AvancarPassoCommand", (command) =>
      new AvancarPassoService(configRepo).Execute(command as AvancarPassoCommand),
    );

    dispatcher.RegisterCommand("PularOnboardingCommand", (command) =>
      new PularOnboardingService(configRepo).Execute(command as PularOnboardingCommand),
    );

    dispatcher.RegisterQuery("ObterProgressoOnboardingQuery", (query) =>
      new ObterProgressoOnboardingService(configRepo).Execute(query as ObterProgressoOnboardingQuery),
    );

    dispatcher.RegisterQuery("ObterPassoAtualQuery", (query) =>
      new ObterPassoAtualService(configRepo, glossaryRepository).Execute(query as ObterPassoAtualQuery),
    );
  }

  return dispatcher;
}
