import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  BarChart3,
  Building2,
  Medal,
  TrendingUp,
  Star,
  Newspaper,
  FileText,
  Calculator,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { ModuleLayout } from "@/components/module-layout";
import type { ModuleTab } from "@/components/module-tabs";

export const Route = createFileRoute("/analise")({
  head: () => ({
    meta: [
      { title: "Análise — Investidor Pro" },
      {
        name: "description",
        content: "FIIs, rankings, setores, comparador e mais ferramentas de análise.",
      },
    ],
  }),
  component: AnaliseModule,
});

const TABS: ModuleTab[] = [
  { label: "FIIs", to: "/analise/fiis", icon: <Building2 className="size-4" /> },
  { label: "Rankings", to: "/analise/rankings", icon: <Medal className="size-4" /> },
  { label: "Setores", to: "/analise/setores", icon: <BarChart3 className="size-4" /> },
  { label: "Comparador", to: "/analise/comparar", icon: <FileText className="size-4" /> },
  { label: "Watchlist", to: "/analise/watchlist", icon: <Star className="size-4" /> },
  { label: "Calculadoras", to: "/analise/calculadoras", icon: <Calculator className="size-4" /> },
  { label: "Notícias", to: "/analise/noticias", icon: <Newspaper className="size-4" /> },
];

function AnaliseModule() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-[1400px] px-4 py-6">
        <ModuleLayout
          title="Análise"
          description="FIIs, rankings, setores, comparador e ferramentas de análise."
          breadcrumbs={[{ label: "Análise", to: "/analise" }]}
          tabs={TABS}
        >
          <Outlet />
        </ModuleLayout>
      </div>
    </div>
  );
}
