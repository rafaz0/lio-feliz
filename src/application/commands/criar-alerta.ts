import type { TriggerWhen, AlertChannel } from "@/core/domain/alerts";

export interface CriarAlertaCommand {
  readonly type: "CriarAlertaCommand";
  readonly name: string;
  readonly triggerWhen: TriggerWhen;
  readonly assetFilter: string[];
  readonly channel: AlertChannel;
  readonly userId: string;
}
