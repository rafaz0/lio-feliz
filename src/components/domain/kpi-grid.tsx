import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface KPIGridProps {
  children: ReactNode;
  cols?: 2 | 3 | 4 | 5;
  className?: string;
}

const GRID_COLS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
};

export function KPIGrid({ children, cols = 4, className }: KPIGridProps) {
  return (
    <div className={cn("grid gap-3", GRID_COLS[cols], className)}>
      {children}
    </div>
  );
}
