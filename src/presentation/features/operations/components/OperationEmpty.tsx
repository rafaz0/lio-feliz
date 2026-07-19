import { Inbox } from "lucide-react";

export function OperationEmpty() {
  return (
    <div
      data-testid="operation-empty"
      className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-10 text-center"
    >
      <Inbox className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
      <p className="text-sm font-medium">Nenhuma operação</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Registre uma operação para iniciar o histórico da carteira.
      </p>
    </div>
  );
}
