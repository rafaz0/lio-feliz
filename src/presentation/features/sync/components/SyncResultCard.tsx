import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SyncResultViewModel } from "../types/sync.view-model";
import { fonteToLabel } from "../types/sync.view-model";

interface SyncResultCardProps {
  resultado: SyncResultViewModel;
}

export function SyncResultCard({ resultado }: SyncResultCardProps) {
  return (
    <div data-testid="sync-result">
      <Card>
        <CardHeader>
          <CardTitle>Resultado da sincronização</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p data-testid="sync-result-fonte">
            <span className="text-muted-foreground">Fonte:</span> {fonteToLabel(resultado.fonte)}
          </p>
          <p data-testid="sync-result-data">
            <span className="text-muted-foreground">Data:</span> {resultado.dataSincronizacao}
          </p>
          <p data-testid="sync-result-processado">
            <span className="text-muted-foreground">Processadas:</span> {resultado.totalProcessado}
          </p>
          <p data-testid="sync-result-novas">
            <span className="text-muted-foreground">Novas:</span> {resultado.totalNovo}
          </p>
          <p data-testid="sync-result-ignoradas">
            <span className="text-muted-foreground">Ignoradas:</span> {resultado.totalIgnorado}
          </p>

          {resultado.temErros ? (
            <div data-testid="sync-result-erros" role="alert" className="mt-2 space-y-1">
              <p className="text-sm font-medium text-destructive">
                {resultado.erros.length} erro(s) encontrado(s)
              </p>
              <ul className="list-disc pl-5 text-xs text-muted-foreground">
                {resultado.erros.map((erro, i) => (
                  <li key={`${erro.fonte}-${erro.linha}-${i}`}>
                    Linha {erro.linha} ({erro.tipo}): {erro.mensagem}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
