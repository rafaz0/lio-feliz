import type { PortfolioSummaryDto } from "@/application/dtos/finance";

/**
 * Stub para obter dados da Carteira. Na integracao real (FinanceIntegrationService),
 * este servico consultara os repositorios da Carteira.
 * Por enquanto retorna valores zerados - a integracao real pertence a EWO-043+.
 */
export async function getPortfolioSummaryStub(): Promise<PortfolioSummaryDto> {
  return { totalValue: 0, totalInvested: 0, totalPnl: 0 };
}
