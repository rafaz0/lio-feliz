import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Coins, PiggyBank, ShieldCheck, ArrowRight } from "lucide-react";
import { ModuleSection } from "@/components/module-section";

export const Route = createFileRoute("/proventos/")({
  head: () => [{ title: "Proventos — Investidor Pro" }],
  component: ProventosIndexPage,
});

const LINKS = [
  { to: "/proventos/calendario", icon: CalendarDays, label: "Calendário", desc: "Dividendos e JCP das ações" },
  { to: "/proventos/recebidos", icon: Coins, label: "Recebidos", desc: "Proventos recebidos" },
  { to: "/proventos/provisionador", icon: PiggyBank, label: "Provisionador", desc: "Projeção de dividendos" },
  { to: "/proventos/cobertura", icon: ShieldCheck, label: "Cobertura", desc: "Cobertura de despesas" },
];

function ProventosIndexPage() {
  return (
    <ModuleSection title="Visão Geral" description="Acompanhe seus proventos de forma consolidada.">
      <div className="grid gap-3 sm:grid-cols-2">
        {LINKS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition hover:bg-surface"
          >
            <item.icon className="size-5 text-muted-foreground" />
            <div className="flex-1">
              <div className="text-sm font-semibold">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.desc}</div>
            </div>
            <ArrowRight className="size-4 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </ModuleSection>
  );
}
