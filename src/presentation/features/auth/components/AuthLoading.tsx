import { cn } from "@/presentation/shared/utils";

interface AuthLoadingProps {
  label?: string;
  className?: string;
}

export function AuthLoading({ label = "Carregando...", className }: AuthLoadingProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <span
        className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent"
        aria-hidden="true"
      />
      <span>{label}</span>
    </div>
  );
}
