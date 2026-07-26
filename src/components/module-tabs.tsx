import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { PremiumBadge } from "@/presentation/features/subscriptions";

export interface ModuleTab {
  label: string;
  to: string;
  icon?: React.ReactNode;
  premium?: boolean;
}

interface ModuleTabsProps {
  tabs: ModuleTab[];
  className?: string;
}

export function ModuleTabs({ tabs, className }: ModuleTabsProps) {
  const location = useLocation();

  return (
    <nav
      className={cn(
        "flex gap-0.5 overflow-x-auto rounded-lg bg-muted p-0.5",
        "[&::-webkit-scrollbar]:hidden",
        className,
      )}
      role="tablist"
      style={{ scrollbarWidth: "none" }}
    >
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.to || location.pathname.startsWith(tab.to + "/");
        return (
          <Link
            key={tab.to}
            to={tab.to}
            role="tab"
            aria-selected={isActive}
            className={cn(
              "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm font-medium transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.icon}
            <span className="hidden sm:inline truncate max-w-[120px]">{tab.label}</span>
            <span className="sm:hidden truncate max-w-[72px]">{tab.label}</span>
            {tab.premium && <PremiumBadge size="sm" />}
          </Link>
        );
      })}
    </nav>
  );
}
