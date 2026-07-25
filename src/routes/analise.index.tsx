import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  Medal,
  BarChart3,
  FileText,
  Star,
  Calculator,
  Newspaper,
  ArrowRight,
} from "lucide-react";
import { ModuleSection } from "@/components/module-section";

export const Route = createFileRoute("/analise/")({
  head: () => [{ title: "Análise — Investidor Pro" }],
  component: AnaliseIndexPage,
});

const LINKS = [
  { to: "/analise/fiis", icon: Building2, label: "FIIs", desc: "Fundos Imobiliários" },
  { to: "/analise/rankings", icon: Medal, label: "Rankings", desc: "DY, P/L, Graham" },
  { to: "/analise/setores", icon: BarChart3, label: "Setores", desc: "Análise por setor" },
  { to: "/analise/comparar", icon: FileText, label: "Comparador", desc: "Compare ativos" },
  { to: "/analise/watchlist", icon: Star, label: "Watchlist", desc: "Monitore ativos" },
  {
    to: "/analise/calculadoras",
    icon: Calculator,
    label: "Calculadoras",
    desc: "Juros, DCF, Preço Teto",
  },
  { to: "/analise/noticias", icon: Newspaper, label: "Notícias", desc: "Fatos relevantes" },
];

function AnaliseIndexPage() {
  return (
    <ModuleSection
      title="Ferramentas de Análise"
      description="Escolha uma ferramenta para começar."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
