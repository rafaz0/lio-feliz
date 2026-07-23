import type { AssinarPlanoCommand } from "@/application/commands/assinar-plano";
import type { AssinaturaDto } from "@/application/dtos/assinatura";
import { ApplicationError } from "@/application/errors/application-error";
import { AssinarPlanoService } from "@/application/services/assinar-plano-service";

export interface CheckoutInput {
  readonly userId: string;
  readonly planId: string;
  readonly paymentMethodId: string;
}

export interface CheckoutResult {
  readonly success: boolean;
  readonly subscription?: AssinaturaDto;
  readonly error?: ApplicationError;
}

export class CheckoutOrchestrator {
  constructor(private readonly assinarPlanoService: AssinarPlanoService) {}

  async execute(input: CheckoutInput): Promise<CheckoutResult> {
    const command: AssinarPlanoCommand = {
      type: "AssinarPlanoCommand",
      planId: input.planId,
      userId: input.userId,
    };

    const result = await this.assinarPlanoService.Execute(command);

    if (result instanceof ApplicationError) {
      return { success: false, error: result };
    }

    return { success: true, subscription: result };
  }
}
