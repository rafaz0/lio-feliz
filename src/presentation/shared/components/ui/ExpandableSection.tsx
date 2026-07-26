import { useState, useRef, type ReactNode } from "react";
import { cn } from "@/presentation/shared/utils/cn";

export interface ExpandableSectionProps {
  title: string;
  subtitle?: string;
  count?: number;
  icon?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
  onToggle?: (open: boolean) => void;
  className?: string;
}

export function ExpandableSection({
  title,
  subtitle,
  count,
  icon,
  defaultOpen = false,
  children,
  onToggle,
  className,
}: ExpandableSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    onToggle?.(next);
  };

  return (
    <div className={cn("border-b last:border-0", className)} data-testid="expandable-section">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center gap-2 px-4 py-3 text-left transition hover:bg-secondary/50"
        aria-expanded={open}
      >
        {icon && <span className="shrink-0 text-muted-foreground">{icon}</span>}

        <svg
          className={cn(
            "size-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-90",
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{title}</span>
            {count !== undefined && (
              <span className="inline-flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium tabular-nums text-muted-foreground">
                {count}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>

        <svg
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        ref={contentRef}
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out",
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-4 pb-3 pt-1">{children}</div>
      </div>
    </div>
  );
}
