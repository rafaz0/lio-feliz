interface AdvancedExportErrorProps { message: string; onRetry?: () => void }

export function AdvancedExportError({ message, onRetry }: AdvancedExportErrorProps) {
  return (
    <div data-testid="exports-error" className="flex flex-col items-center py-8 text-center">
      <p className="text-sm text-red-500">{message}</p>
      {onRetry && <button onClick={onRetry} className="mt-2 rounded-md bg-foreground px-3 py-1 text-xs text-background">Tentar novamente</button>}
    </div>
  );
}
