import type { AtualizarTooltipCommand } from "@/application/commands/atualizar-tooltip";
import type { TooltipDto } from "@/application/dtos/education";
import type { IApplicationService } from "@/application/application-service";
import type { IGlossaryRepository } from "@/application/ports/glossary-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { Tooltip, TooltipId } from "@/core/domain/education";

export class AtualizarTooltipService implements IApplicationService<
  AtualizarTooltipCommand,
  TooltipDto
> {
  constructor(private readonly glossaryRepo: IGlossaryRepository) {}

  async Execute(command: AtualizarTooltipCommand): Promise<TooltipDto | ApplicationError> {
    const existing = await this.glossaryRepo.findTooltipById(command.tooltipId);
    if (!existing) {
      return new NotFoundError("Tooltip", command.tooltipId);
    }

    const updated = Tooltip.create({
      id: existing.id,
      targetComponent: command.targetComponent ?? existing.targetComponent,
      termKey: existing.termKey,
      text: command.text ?? existing.text,
      difficulty: command.difficulty ?? existing.difficulty,
    });

    await this.glossaryRepo.saveTooltip(updated);

    return {
      id: updated.id.value,
      targetComponent: updated.targetComponent,
      termKey: updated.termKey,
      text: updated.text,
      difficulty: updated.difficulty,
    };
  }
}
