import type { ComparisonScope } from "@/core/domain/comparison";

export interface CriarComparacaoCommand {
  readonly type: "CriarComparacaoCommand";
  readonly name: string;
  readonly entries: Array<{
    assetTicker: string;
    assetType: string;
    weight: number;
  }>;
  readonly scope: ComparisonScope;
  readonly userId: string;
}
