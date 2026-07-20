import type { ExportFormat, DeclarationInclude } from "@/core/domain/tax/tax-types";

export interface ExportarDeclaracaoCommand {
  readonly type: "ExportarDeclaracaoCommand";
  readonly portfolioId: string;
  readonly ano: number;
  readonly formato: ExportFormat;
  readonly includes: DeclarationInclude[];
}
