import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Newspaper } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { getFii } from "@/lib/fii-mock-data";
import { fetchYahooNews, type YahooNewsItem } from "@/lib/yahoo.server";

const FALLBACK_NEWS: YahooNewsItem[] = [
  { title: "Petrobras aprova pagamento de R$ 15 bilhões em dividendos", summary: "", source: "Investidor Pro", date: "", link: "", tickers: ["PETR4"] },
  { title: "Vale anuncia investimento recorde de R$ 12 bilhões em 2026", summary: "", source: "Investidor Pro", date: "", link: "", tickers: ["VALE3"] },
  { title: "Banco Central mantém Selic em 14,75% ao ano", summary: "", source: "Investidor Pro", date: "", link: "", tickers: [] },
  { title: "IFIX sobe 0,8% com recuperação de FIIs de tijolo", summary: "", source: "Investidor Pro", date: "", link: "", tickers: ["HGRE11", "RBRF11", "JSRE11"] },
  { title: "WEG expande fábrica nos EUA para atender demanda", summary: "", source: "Investidor Pro", date: "", link: "", tickers: ["WEGE3"] },
  { title: "BTG Pactual projeta IBOV em 145 mil pontos no fim de 2026", summary: "", source: "Investidor Pro", date: "", link: "", tickers: [] },
  { title: "Magazine Luiza reporta crescimento de 12% no GMV do 2T26", summary: "", source: "Investidor Pro", date: "", link: "", tickers: ["MGLU3"] },
  { title: "Taesa é aprovada para novo leilão de transmissão", summary: "", source: "Investidor Pro", date: "", link: "", tickers: ["TAEE11"] },
];

const YAHOO_TICKERS = ["PETR4", "VALE3", "WEGE3", "MGLU3", "ITUB4", "BBDC4", "ABEV3", "BBAS3"];

export const Route = createFileRoute("/noticias")({
  loader: async () => {
    const yahooNews: YahooNewsItem[] = [];

    for (const t of YAHOO_TICKERS) {
      if (yahooNews.length >= 12) break;
      try {
        const items = await fetchYahooNews(t);
        for (const item of items) {
          const key = item.title.slice(0, 80);
          if (!yahooNews.some((n) => n.title.slice(0, 80) === key)) {
            yahooNews.push(item);
          }
        }
      } catch {
        // skip failed ticker
      }
    }

    const news = yahooNews.length > 0 ? yahooNews : FALLBACK_NEWS;
    return { news };
  },
  head: () => ({
    meta: [
      { title: "Notícias — Investidor Pro" },
      { name: "description", content: "Notícias do mercado financeiro brasileiro." },
    ],
  }),
  component: NewsPage,
});

const today = () => new Date().toLocaleDateString("pt-BR");

function NewsPage() {
  const { news } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-[900px] px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Newspaper className="size-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Notícias do Mercado</h1>
        </div>

        {news.length === 0 && (
          <p className="text-sm text-muted-foreground">Nenhuma notícia encontrada no momento.</p>
        )}

        <div className="space-y-4">
          {news.map((item, i) => (
            <article key={i} className="rounded-lg border border-border bg-card p-5 transition hover:bg-surface">
              <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{item.source}</span>
                <span>·</span>
                <span>{item.date || today()}</span>
              </div>
              <h2 className="text-base font-semibold leading-snug">{item.title}</h2>
              {item.tickers.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.tickers.map((t) => (
                    <Link
                      key={t}
                      to={getFii(t) ? "/fii/$ticker" : "/ativo/$ticker"}
                      params={{ ticker: t }}
                      className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-xs font-medium hover:text-primary"
                    >
                      {t} <ExternalLink className="size-3" />
                    </Link>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
