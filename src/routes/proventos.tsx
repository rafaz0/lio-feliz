import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CalendarDays, Coins, PiggyBank, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { ModuleLayout } from "@/components/module-layout";
import type { ModuleTab } from "@/components/module-tabs";

export const Route = createFileRoute("/proventos")({
  head: () => ({
    meta: [
      { title: "Proventos — Investidor Pro" },
      { name: "description", content: "Calendário de dividendos, proventos recebidos, provisionador e cobertura." },
    ],
  }),
  component: ProventosModule,
});

const TABS: ModuleTab[] = [
  { label: "Calendário", to: "/proventos/calendario", icon: <CalendarDays className="size-4" /> },
  { label: "Recebidos", to: "/proventos/recebidos", icon: <Coins className="size-4" /> },
  { label: "Provisionador", to: "/proventos/provisionador", icon: <PiggyBank className="size-4" /> },
  { label: "Cobertura", to: "/proventos/cobertura", icon: <ShieldCheck className="size-4" /> },
];

function ProventosModule() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-[1400px] px-4 py-6">
        <ModuleLayout
          title="Proventos"
          description="Calendário de dividendos, recebidos, provisionador e cobertura de despesas."
          breadcrumbs={[{ label: "Proventos", to: "/proventos" }]}
          tabs={TABS}
        >
          <Outlet />
        </ModuleLayout>
      </div>
    </div>
  );
}
