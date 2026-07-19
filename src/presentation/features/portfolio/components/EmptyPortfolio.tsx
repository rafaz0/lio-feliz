import { FolderOpen } from "lucide-react";

export function EmptyPortfolio() {
  return (
    <div
      data-testid="empty-portfolio"
      className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-10 text-center"
    >
      <FolderOpen className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
      <p className="text-sm font-medium">Carteira vazia</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Esta carteira ainda não possui ativos registrados. Importe ou adicione operações para
        visualizar o consolidado.
      </p>
    </div>
  );
}
