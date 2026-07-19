interface ExportProgressProps {
  formato: string;
}

export function ExportProgress({ formato }: ExportProgressProps) {
  return (
    <div
      data-testid="export-progress"
      className="flex items-center gap-2 text-sm text-muted-foreground"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="h-3 w-3 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
      Gerando exportação em {formato.toUpperCase()}…
    </div>
  );
}
