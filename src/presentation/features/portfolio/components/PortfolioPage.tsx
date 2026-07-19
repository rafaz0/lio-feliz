import { useMemo, useState } from "react";
import { usePortfolioQuery } from "../hooks/use-portfolio-query";
import { useAssetDetailsQuery } from "../hooks/use-asset-details-query";
import { PortfolioSummary } from "./PortfolioSummary";
import { PortfolioTable } from "./PortfolioTable";
import { PortfolioCard } from "./PortfolioCard";
import { PortfolioFilters } from "./PortfolioFilters";
import { AssetDetailsPanel } from "./AssetDetailsPanel";
import { PortfolioLoading } from "./PortfolioLoading";
import { PortfolioError } from "./PortfolioError";
import { EmptyPortfolio } from "./EmptyPortfolio";

interface PortfolioPageProps {
  portfolioId: string;
}

export function PortfolioPage({ portfolioId }: PortfolioPageProps) {
  const { summary, positions, isLoading, isError, error, refetch } = usePortfolioQuery(portfolioId);
  const [filtro, setFiltro] = useState("");
  const [classeSelecionada, setClasseSelecionada] = useState<string | null>(null);
  const [ativoSelecionado, setAtivoSelecionado] = useState<string | null>(null);

  const classes = useMemo(() => positions.map((p) => p.classe), [positions]);

  const visiveis = useMemo(() => {
    const termo = filtro.trim().toLowerCase();
    return positions.filter((p) => {
      const matchClasse = classeSelecionada ? p.classe === classeSelecionada : true;
      const matchTermo = termo ? p.classe.toLowerCase().includes(termo) : true;
      return matchClasse && matchTermo;
    });
  }, [positions, filtro, classeSelecionada]);

  const asset = useAssetDetailsQuery(portfolioId, ativoSelecionado ?? "");

  if (isLoading) return <PortfolioLoading />;
  if (isError || !summary) {
    return (
      <PortfolioError
        message={error?.message ?? "Falha ao carregar a carteira."}
        onRetry={refetch}
      />
    );
  }
  if (summary.totalAtivos === 0) return <EmptyPortfolio />;

  return (
    <section data-testid="portfolio-page" aria-label="Carteira" className="grid gap-4">
      <PortfolioSummary summary={summary} />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <PortfolioFilters
            filtro={filtro}
            onFiltroChange={setFiltro}
            classes={classes}
            classeSelecionada={classeSelecionada}
            onClasseChange={setClasseSelecionada}
          />
          <PortfolioTable
            positions={visiveis}
            onSelectAtivo={setAtivoSelecionado}
            selectedClasse={classeSelecionada}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {visiveis.map((position) => (
              <PortfolioCard
                key={position.classe}
                allocation={position}
                onSelect={setAtivoSelecionado}
              />
            ))}
          </div>
        </div>

        <aside>
          {ativoSelecionado ? (
            asset.isLoading ? (
              <p className="text-sm text-muted-foreground">Carregando detalhes...</p>
            ) : asset.asset ? (
              <AssetDetailsPanel asset={asset.asset} />
            ) : (
              <p className="text-sm text-muted-foreground">Ativo não encontrado.</p>
            )
          ) : (
            <p className="text-sm text-muted-foreground">
              Selecione um ativo para ver os detalhes.
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}
