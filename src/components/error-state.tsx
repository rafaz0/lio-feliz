import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";

interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: Error | null;
  retry?: () => void;
}

const DEFAULT_MESSAGES = {
  LOAD: "Não foi possível carregar os dados. Verifique sua conexão e tente novamente.",
  NOT_FOUND: "O recurso solicitado não foi encontrado.",
  SERVER: "O servidor encontrou um erro inesperado. Tente novamente mais tarde.",
};

export function ErrorState({
  title = "Algo deu errado",
  message = DEFAULT_MESSAGES.LOAD,
  error,
  retry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-16 text-center">
      <AlertCircle className="mb-3 size-10 text-destructive/60" strokeWidth={1.5} />
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <p className="mt-1 max-w-xs text-xs text-muted-foreground">{message}</p>
      {error && (
        <details className="mt-2 max-w-xs">
          <summary className="cursor-pointer text-xs text-muted-foreground/60 hover:text-muted-foreground">
            Detalhes técnicos
          </summary>
          <p className="mt-1 whitespace-pre-wrap rounded-md bg-secondary/50 px-3 py-2 text-left text-xs text-muted-foreground">
            {error.message}
          </p>
        </details>
      )}
      <div className="mt-4 flex gap-2">
        {retry && (
          <button
            onClick={retry}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <RefreshCw className="size-3.5" /> Tentar novamente
          </button>
        )}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          <Home className="size-3.5" /> Início
        </Link>
      </div>
    </div>
  );
}

export function NotFoundState({ message = DEFAULT_MESSAGES.NOT_FOUND }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="text-6xl font-bold tracking-tight text-foreground/20">404</h1>
      <h2 className="mt-4 text-lg font-semibold">Página não encontrada</h2>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">{message}</p>
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Home className="size-3.5" /> Voltar para o início
        </Link>
      </div>
    </div>
  );
}

export function RouteErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <ErrorState
        title="Algo deu errado"
        message="Não foi possível carregar esta página."
        error={error}
        retry={() => {
          router.invalidate();
          reset();
        }}
      />
    </div>
  );
}
