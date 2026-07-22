import type { VerificarAcessoCommand } from "@/application/commands/verificar-acesso";
import type { AcessoDto } from "@/application/dtos/assinatura";
import type { IApplicationService } from "@/application/application-service";
import type { ISubscriptionRepository } from "@/application/ports/subscription-repository";
import type { ApplicationError } from "@/application/errors/application-error";
import { AuthorizationService } from "@/core/domain/subscriptions";

export class VerificarAcessoService
  implements IApplicationService<VerificarAcessoCommand, AcessoDto>
{
  private readonly authService = new AuthorizationService();

  constructor(private readonly subscriptionRepo: ISubscriptionRepository) {}

  async Execute(command: VerificarAcessoCommand): Promise<AcessoDto | ApplicationError> {
    const subscriptions = await this.subscriptionRepo.findSubscriptionsByUser(command.userId);
    const active = subscriptions.find((s) => s.isActive) ?? null;
    const plans = await this.subscriptionRepo.findAllPlans();

    const result = this.authService.checkAccess(command.userId, command.capability, active, plans);

    const tier = active
      ? plans.find((p) => p.id.value === active.planId)?.tier ?? "FREE"
      : "FREE";

    return {
      userId: command.userId,
      capability: command.capability,
      allowed: result.isSuccess,
      planTier: tier,
    };
  }
}
