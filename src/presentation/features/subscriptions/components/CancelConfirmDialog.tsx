import { useEffect, useRef } from "react";

interface CancelConfirmDialogProps {
  open: boolean;
  planName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function CancelConfirmDialog({
  open,
  planName,
  onConfirm,
  onCancel,
  isLoading,
}: CancelConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onCancel}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-md rounded-lg border bg-background p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Confirmar cancelamento"
      >
        <h2 className="text-lg font-semibold">Cancelar assinatura</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Tem certeza que deseja cancelar sua assinatura <strong>{planName}</strong>?
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Voce manterah acesso ao plano ate o final do periodo vigente.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-secondary disabled:opacity-50"
          >
            Manter assinatura
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? "Cancelando..." : "Sim, cancelar"}
          </button>
        </div>
      </div>
    </div>
  );
}
