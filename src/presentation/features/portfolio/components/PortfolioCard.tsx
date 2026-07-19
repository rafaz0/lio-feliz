import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/presentation/shared/utils";
import type { AllocationViewModel } from "../types/portfolio.view-model";

interface PortfolioCardProps {
  allocation: AllocationViewModel;
  onSelect?: (classe: string) => void;
}

export function PortfolioCard({ allocation, onSelect }: PortfolioCardProps) {
  return (
    <Card
      data-testid="portfolio-card"
      className="cursor-pointer transition-colors hover:bg-muted/40"
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={() => onSelect?.(allocation.classe)}
      onKeyDown={(e) => {
        if (onSelect && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onSelect(allocation.classe);
        }
      }}
    >
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <span
            className={cn("h-3 w-3 rounded-[2px]")}
            style={{ backgroundColor: allocation.fill }}
            aria-hidden="true"
          />
          <span className="font-medium">{allocation.classe}</span>
        </div>
        <div className="text-right">
          <p className="tabular-nums">{allocation.valor}</p>
          <p className="text-xs text-muted-foreground tabular-nums">
            {allocation.percentual.toFixed(1)}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
