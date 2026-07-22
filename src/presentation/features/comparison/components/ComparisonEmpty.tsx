export function ComparisonEmpty() {
  return (
    <div data-testid="comparison-empty" className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-sm text-muted-foreground">Nenhum conjunto de comparacao encontrado.</p>
      <p className="mt-1 text-xs text-muted-foreground">Selecione ao menos dois ativos para iniciar.</p>
    </div>
  );
}
