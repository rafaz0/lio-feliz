import type { ThemeMode } from "@/core/domain/preferences";

export interface SalvarPreferenciasCommand {
  readonly type: "SalvarPreferenciasCommand";
  readonly userId: string;
  readonly theme?: ThemeMode;
  readonly notifications?: boolean;
  readonly language?: string;
}
