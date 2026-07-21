interface FixedIncomeEmptyProps {
  onAdd?: () => void;
}

export function FixedIncomeEmpty({ onAdd }: FixedIncomeEmptyProps) {
  return (
    <div
      data-testid="fixed-income-empty"
      className="rounded-lg border border-dashed border-muted-foreground/30 p-8 text-center"
    >
      <p className="text-sm text-muted-foreground">
        Nenhum título de renda fixa registrado ainda.
      </p>
      {onAdd ? (
        <button
          type="button"
          onClick={onAdd}
          data-testid="fixed-income-empty-add"
          className="mt-4 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background"
        >
          Registrar título
        </button>
      ) : null}
    </div>
  );
}
