import { Link, useLocation } from "@tanstack/react-router";
import { BarChart3, Home, PiggyBank, Target, Wallet } from "lucide-react";

const NAV_ITEMS = [
  { to: "/dashboard", icon: Home, label: "Dashboard" },
  { to: "/carteira", icon: Wallet, label: "Carteira" },
  { to: "/carteira/proventos", icon: PiggyBank, label: "Proventos" },
  { to: "/metas", icon: Target, label: "Metas" },
  { to: "/carteira/analise", icon: BarChart3, label: "Análise" },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background md:hidden">
      <ul className="flex items-center justify-around py-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.to);
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="size-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
