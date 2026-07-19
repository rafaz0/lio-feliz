import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PortfolioErrorProps {
  message: string;
  onRetry: () => void;
}

export function PortfolioError({ message, onRetry }: PortfolioErrorProps) {
  return (
    <div
      data-testid="portfolio-error"
      role="alert"
      className="flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-8 text-center"
    >
      <AlertCircle className="h-8 w-8 text-destructive" aria-hidden="true" />
      <p className="text-sm text-foreground">{message}</p>
      <Button variant="outline" onClick={onRetry} data-testid="portfolio-retry">
        Tentar novamente
      </Button>
    </div>
  );
}
