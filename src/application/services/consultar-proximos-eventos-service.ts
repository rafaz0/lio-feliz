import type { ConsultarProximosEventosQuery } from "@/application/queries/consultar-proximos-eventos";
import type { IApplicationService } from "@/application/application-service";
import type { ISubscriptionRepository } from "@/application/ports/subscription-repository";
import type { ApplicationError } from "@/application/errors/application-error";

export interface ProximoEventoDto {
  readonly tipo: string;
  readonly data: string;
  readonly descricao: string;
}

export interface ProximosEventosDto {
  readonly eventos: ProximoEventoDto[];
}

export class ConsultarProximosEventosService implements IApplicationService<
  ConsultarProximosEventosQuery,
  ProximosEventosDto
> {
  constructor(private readonly subscriptionRepo: ISubscriptionRepository) {}

  async Execute(
    query: ConsultarProximosEventosQuery,
  ): Promise<ProximosEventosDto | ApplicationError> {
    const subs = await this.subscriptionRepo.findSubscriptionsByUser(query.userId);
    const eventos: ProximoEventoDto[] = [];

    for (const sub of subs) {
      if (sub.isTrial && sub.trialEndDate) {
        eventos.push({
          tipo: "trial_expiracao",
          data: sub.trialEndDate.toISOString(),
          descricao: "Periodo de trial termina. Assinatura sera ativada ou cancelada.",
        });
      }

      if (sub.isActive && sub.endDate) {
        eventos.push({
          tipo: "renovacao",
          data: sub.endDate.toISOString(),
          descricao: "Data de renovacao da assinatura.",
        });
      }

      if (sub.isPastDue) {
        eventos.push({
          tipo: "carencia",
          data: new Date().toISOString(),
          descricao: "Assinatura em carencia. Regularize o pagamento.",
        });
      }

      if (sub.isActive && !sub.endDate) {
        const renewalDate = new Date();
        renewalDate.setMonth(renewalDate.getMonth() + 1);
        eventos.push({
          tipo: "proxima_cobranca",
          data: renewalDate.toISOString(),
          descricao: "Proxima cobranca mensal.",
        });
      }
    }

    eventos.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

    return { eventos };
  }
}
