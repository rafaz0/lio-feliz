import type { IPortfolioRepository } from "@/application/ports";
import type { Portfolio } from "@/core/domain/portfolio";
import type { PortfolioId } from "@/core/domain";

export class FakePortfolioRepository implements IPortfolioRepository {
  private portfolios = new Map<string, Portfolio>();
  private usuarioPortfolios = new Map<string, Set<string>>();

  async ObterPorId(portfolioId: PortfolioId): Promise<Portfolio | null> {
    return this.portfolios.get(portfolioId.value) ?? null;
  }

  async Salvar(portfolio: Portfolio): Promise<void> {
    this.portfolios.set(portfolio.id.value, portfolio);
  }

  async ObterTodos(usuarioId: string): Promise<Portfolio[]> {
    const ids = this.usuarioPortfolios.get(usuarioId);
    if (!ids) {
      return [];
    }
    return Array.from(ids)
      .map((id) => this.portfolios.get(id))
      .filter((p): p is Portfolio => p !== undefined);
  }

  addUsuarioPortfolio(usuarioId: string, portfolioId: string): void {
    const ids = this.usuarioPortfolios.get(usuarioId) ?? new Set();
    ids.add(portfolioId);
    this.usuarioPortfolios.set(usuarioId, ids);
  }

  reset(): void {
    this.portfolios.clear();
    this.usuarioPortfolios.clear();
  }
}
