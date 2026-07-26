import type { ConsultarHistoricoAssinaturaQuery } from "@/application/queries/consultar-historico-assinatura";
import type { IApplicationService } from "@/application/application-service";
import type { ISubscriptionRepository } from "@/application/ports/subscription-repository";
import type { ApplicationError } from "@/application/errors/application-error";

export interface HistoricoAssinaturaDto {
  readonly subscriptionId: string;
  readonly planName: string;
  readonly status: string;
  readonly startDate: string;
  readonly endDate: string | null;
}

export interface HistoricoCompletoDto {
  readonly subscriptions: HistoricoAssinaturaDto[];
  readonly billingCycles: CicloFaturamentoDto[];
}

export interface CicloFaturamentoDto {
  readonly id: string;
  readonly subscriptionId: string;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly amount: number;
  readonly status: string;
}

export class ConsultarHistoricoAssinaturaService implements IApplicationService<
  ConsultarHistoricoAssinaturaQuery,
  HistoricoCompletoDto
> {
  constructor(private readonly subscriptionRepo: ISubscriptionRepository) {}

  async Execute(
    query: ConsultarHistoricoAssinaturaQuery,
  ): Promise<HistoricoCompletoDto | ApplicationError> {
    const subscriptions = await this.subscriptionRepo.findSubscriptionsByUser(query.userId);

    const subDtos: HistoricoAssinaturaDto[] = [];
    const cycleDtos: CicloFaturamentoDto[] = [];

    for (const sub of subscriptions) {
      const plan = await this.subscriptionRepo.findPlanById(sub.planId);

      subDtos.push({
        subscriptionId: sub.id.value,
        planName: plan?.name ?? "—",
        status: sub.status,
        startDate: sub.startDate.toISOString(),
        endDate: sub.endDate?.toISOString() ?? null,
      });

      const cycles = await this.subscriptionRepo.findBillingCyclesBySubscription(sub.id.value);
      for (const c of cycles) {
        cycleDtos.push({
          id: c.id.value,
          subscriptionId: c.subscriptionId,
          periodStart: c.periodStart.toISOString(),
          periodEnd: c.periodEnd.toISOString(),
          amount: c.amount,
          status: c.status,
        });
      }
    }

    return { subscriptions: subDtos, billingCycles: cycleDtos };
  }
}
