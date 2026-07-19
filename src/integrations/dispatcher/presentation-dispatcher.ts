import { DispatcherImpl } from "@/application/dispatcher-impl";
import type { IDispatcher } from "@/application/dispatcher";
import type { IProjectionRepository } from "@/application/ports";
import { ConsultarPatrimonioService } from "@/application/services/consultar-patrimonio-service";
import { ObterHistoricoPatrimonialService } from "@/application/services/obter-historico-patrimonial-service";
import { ConsultarPosicaoService } from "@/application/services/consultar-posicao-service";
import type { ObterPatrimonioQuery } from "@/application/queries/obter-patrimonio";
import type { ObterHistoricoPatrimonialQuery } from "@/application/queries/obter-historico-patrimonial";
import type { ConsultarPosicaoQuery } from "@/application/queries/consultar-posicao";

/**
 * Monta um IDispatcher com os handlers de consulta necessários à Presentation Layer.
 *
 * A Presentation Layer NUNCA instancia a Application Layer ou a Infrastructure diretamente.
 * Este adapter opera como Composition Root fora de `src/presentation` e recebe as
 * dependências (repositório de projeção) injetadas.
 */
export function createPresentationDispatcher(
  projectionRepository: IProjectionRepository,
): IDispatcher {
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

  return dispatcher;
}
