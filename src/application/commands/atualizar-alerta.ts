import type { TriggerWhen, AlertChannel } from "@/core/domain/alerts";

export interface AtualizarAlertaCommand {
  readonly type: "AtualizarAlertaCommand";
  readonly ruleId: string;
  readonly name?: string;
  readonly triggerWhen?: TriggerWhen;
  readonly assetFilter?: string[];
  readonly channel?: AlertChannel;
  readonly enabled?: boolean;
}
