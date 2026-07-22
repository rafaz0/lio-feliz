import type { DifficultyLevel } from "@/core/domain/education";

export interface AtualizarTooltipCommand {
  readonly type: "AtualizarTooltipCommand";
  readonly tooltipId: string;
  readonly text?: string;
  readonly difficulty?: DifficultyLevel;
  readonly targetComponent?: string;
}
