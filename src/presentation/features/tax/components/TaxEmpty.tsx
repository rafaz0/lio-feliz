export function TaxEmpty() {
  return (
    <div
      data-testid="tax-empty"
      className="rounded-xl border border-dashed p-10 text-center"
      role="status"
    >
      <p className="text-sm font-medium">Sem dados fiscais</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Não foi possível gerar o relatório fiscal para o ano selecionado.
      </p>
    </div>
  );
}
