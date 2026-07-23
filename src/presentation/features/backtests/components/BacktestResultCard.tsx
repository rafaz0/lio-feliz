import type { BacktestResultViewModel } from "../viewmodels/backtest.view-model";

interface BacktestResultCardProps {
  result: BacktestResultViewModel;
}

export function BacktestResultCard({ result }: BacktestResultCardProps) {
  return (
    <div data-testid="backtest-result-card" className="rounded-lg border p-4 space-y-3">
      <h3 className="text-sm font-semibold">Resultado do Backtest</h3>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-muted-foreground">Retorno:</span>{" "}
          <strong
            className={result.periodReturns.startsWith("+") ? "text-green-600" : "text-red-600"}
          >
            {result.periodReturns}
          </strong>
        </div>
        <div>
          <span className="text-muted-foreground">Benchmark:</span> {result.benchmarkReturn}
        </div>
        <div>
          <span className="text-muted-foreground">Excesso:</span> {result.excessReturn}
        </div>
        <div>
          <span className="text-muted-foreground">Drawdown Max:</span>{" "}
          <span className="text-red-600">{result.maxDrawdown}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Sharpe:</span> {result.sharpeRatio}
        </div>
        <div>
          <span className="text-muted-foreground">Volatilidade:</span> {result.volatility}
        </div>
        <div>
          <span className="text-muted-foreground">Alpha:</span> {result.alpha}
        </div>
        <div>
          <span className="text-muted-foreground">Beta:</span> {result.beta}
        </div>
      </div>
    </div>
  );
}
