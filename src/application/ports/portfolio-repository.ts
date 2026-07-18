import type { Portfolio } from "@/core/domain/portfolio";
import type { PortfolioId } from "@/core/domain";

export interface IPortfolioRepository {
  ObterPorId(portfolioId: PortfolioId): Promise<Portfolio | null>;
  Salvar(portfolio: Portfolio): Promise<void>;
  ObterTodos(usuarioId: string): Promise<Portfolio[]>;
}
