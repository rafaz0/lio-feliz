import type { ThemeMode } from "@/core/domain/preferences";

export interface AtualizarTemaCommand {
  readonly type: "AtualizarTemaCommand";
  readonly userId: string;
  readonly theme: ThemeMode;
}
