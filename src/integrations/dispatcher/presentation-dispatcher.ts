import { DispatcherImpl } from "@/application/dispatcher-impl";
import type { IDispatcher } from "@/application/dispatcher";
import type {
  IProjectionRepository,
  IPortfolioRepository,
  IConfigurationRepository,
  IDomainEventPublisher,
  IDataGateway,
  IImportInterpreterPort,
} from "@/application/ports";
import { ConsultarPatrimonioService } from "@/application/services/consultar-patrimonio-service";
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

interface PresentationDispatcherDeps {
  projectionRepository: IProjectionRepository;
  portfolioRepository?: IPortfolioRepository;
  configurationRepository?: IConfigurationRepository;
  eventPublisher?: IDomainEventPublisher;
  dataGateway?: IDataGateway;
  importInterpreter?: IImportInterpreterPort;
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
}: PresentationDispatcherDeps): IDispatcher {
  const dispatcher = new DispatcherImpl();

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

  return dispatcher;
}
