import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleActionBarProps {
  backTo?: string;
  backLabel?: string;
  children?: ReactNode;
  className?: string;
}

export function ModuleActionBar({
  backTo,
  backLabel = "Voltar",
  children,
  className,
}: ModuleActionBarProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3", className)}>
      {backTo ? (
        <Link
          to={backTo}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          {backLabel}
        </Link>
      ) : (
        <div />
      )}
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
