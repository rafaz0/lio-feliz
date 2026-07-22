interface ComparisonErrorProps {
  message: string;
  onRetry?: () => void;
}

export function ComparisonError({ message, onRetry }: ComparisonErrorProps) {
  return (
    <div data-testid="comparison-error" className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-sm text-red-500">{message}</p>
      {onRetry && (
        <button
          type="button"
          data-testid="comparison-retry"
          onClick={onRetry}
          className="mt-3 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
