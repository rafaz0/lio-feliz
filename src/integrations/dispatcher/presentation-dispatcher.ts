import { DispatcherImpl } from "@/application/dispatcher-impl";
import type { IDispatcher } from "@/application/dispatcher";
import type {
  IProjectionRepository,
  IPortfolioRepository,
  IDomainEventPublisher,
} from "@/application/ports";
import { ConsultarPatrimonioService } from "@/application/services/consultar-patrimonio-service";
import { ObterHistoricoPatrimonialService } from "@/application/services/obter-historico-patrimonial-service";
import { ConsultarPosicaoService } from "@/application/services/consultar-posicao-service";
import { RegistrarOperacaoService } from "@/application/services/registrar-operacao-service";
import { AcompanharProventosService } from "@/application/services/acompanhar-proventos-service";
import { ConsultarRentabilidadeService } from "@/application/services/consultar-rentabilidade-service";
import type { ObterPatrimonioQuery } from "@/application/queries/obter-patrimonio";
import type { ObterHistoricoPatrimonialQuery } from "@/application/queries/obter-historico-patrimonial";
import type { ConsultarPosicaoQuery } from "@/application/queries/consultar-posicao";
import type { ObterProventosQuery } from "@/application/queries/obter-proventos";
import type { ConsultarRentabilidadeQuery } from "@/application/queries/consultar-rentabilidade";
import type { RegistrarOperacaoCommand } from "@/application/commands/registrar-operacao";

interface PresentationDispatcherDeps {
  projectionRepository: IProjectionRepository;
  portfolioRepository?: IPortfolioRepository;
  eventPublisher?: IDomainEventPublisher;
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
  eventPublisher,
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

  if (portfolioRepository && eventPublisher) {
    dispatcher.RegisterCommand("RegistrarOperacaoCommand", (command) =>
      new RegistrarOperacaoService(portfolioRepository, eventPublisher).Execute(
        command as RegistrarOperacaoCommand,
      ),
    );
  }

  return dispatcher;
}
