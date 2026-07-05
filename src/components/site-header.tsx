import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BarChart3, ChevronDown, FileText, LineChart, LogOut, Search, TrendingUp, User, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { ASSETS } from "@/lib/mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SiteHeader() {
  const navigate = useNavigate();
  const router = useRouter();
  const { user } = useSession();
  const [q, setQ] = useState("");
  const [matches, setMatches] = useState<typeof ASSETS>([]);

  useEffect(() => {
    const term = q.trim().toUpperCase();
    if (!term) return setMatches([]);
    setMatches(
      ASSETS.filter(
        (a) => a.ticker.startsWith(term) || a.name.toUpperCase().includes(term),
      ).slice(0, 6),
    );
  }, [q]);

  async function signOut() {
    await supabase.auth.signOut();
    await router.invalidate();
    navigate({ to: "/", replace: true });
  }

  function submitSearch() {
    const term = q.trim().toUpperCase();
    if (!term) return;
    const first = matches[0]?.ticker ?? term;
    navigate({ to: "/ativo/$ticker", params: { ticker: first } });
    setQ("");
    setMatches([]);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4 text-base">
        <Link to="/" className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <LineChart className="size-5 text-primary" />
          <span>Investidor Pro</span>
        </Link>

        <nav className="hidden items-center gap-1 text-base text-muted-foreground md:flex">
          <Link
            to="/"
            className="rounded px-3 py-1.5 transition hover:bg-secondary hover:text-foreground [&.active]:text-foreground"
            activeOptions={{ exact: true }}
          >
            Mercado
          </Link>
          <Link
            to="/carteira"
            className="rounded px-3 py-1.5 transition hover:bg-secondary hover:text-foreground [&.active]:text-foreground"
          >
            Carteira
          </Link>
          <Link
            to="/dividendos"
            className="rounded px-3 py-1.5 transition hover:bg-secondary hover:text-foreground [&.active]:text-foreground"
          >
            Dividendos
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
                <BarChart3 className="size-4" /> Análise
                <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              <DropdownMenuItem asChild>
                <Link to="/fiis" className="flex items-center gap-2">
                  <Sparkles className="size-4" /> FIIs
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/rankings" className="flex items-center gap-2">
                  <TrendingUp className="size-4" /> Rankings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/setores" className="flex items-center gap-2">
                  <BarChart3 className="size-4" /> Setores
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/comparar" className="flex items-center gap-2">
                  <FileText className="size-4" /> Comparar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/watchlist" className="flex items-center gap-2">
                  <Sparkles className="size-4" /> Watchlist
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/calculadoras" className="flex items-center gap-2">
                  <Sparkles className="size-4" /> Calculadoras
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/provisionador" className="flex items-center gap-2">
                  <Sparkles className="size-4" /> Provisionador
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/metas" className="flex items-center gap-2">
                  <Sparkles className="size-4" /> Metas
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/carteiras-recomendadas" className="flex items-center gap-2">
                  <Sparkles className="size-4" /> Recomendadas
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/noticias" className="flex items-center gap-2">
                  <Search className="size-4" /> Notícias
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="relative ml-auto w-full max-w-[180px]">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitSearch();
              if (e.key === "Escape") setQ("");
            }}
            placeholder="Buscar ticker (PETR4, VALE3…)"
            className="h-9 pl-8 uppercase placeholder:normal-case"
          />
          {matches.length > 0 && (
            <div className="absolute inset-x-0 top-11 z-50 overflow-hidden rounded-md border border-border bg-popover shadow-lg">
              {matches.map((m) => (
                <button
                  key={m.ticker}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    navigate({ to: "/ativo/$ticker", params: { ticker: m.ticker } });
                    setQ("");
                    setMatches([]);
                  }}
                  className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-secondary"
                >
                  <span className="flex items-baseline gap-2">
                    <span className="font-semibold">{m.ticker}</span>
                    <span className="truncate text-xs text-muted-foreground">{m.name}</span>
                  </span>
                  <span
                    className={
                      "tabular text-xs " +
                      (m.changeDayPct >= 0 ? "text-positive" : "text-negative")
                    }
                  >
                    {m.changeDayPct >= 0 ? "+" : ""}
                    {m.changeDayPct.toFixed(2)}%
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {user ? (
          <>
            <ThemeToggle />
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <span className="grid size-7 place-items-center rounded-full bg-primary/15 text-primary">
                  <User className="size-4" />
                </span>
                <span className="hidden text-sm md:inline">
                  {user.user_metadata?.display_name ?? user.email?.split("@")[0]}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/carteira" className="flex items-center gap-2">
                  <TrendingUp className="size-4" /> Minha carteira
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/irpf" className="flex items-center gap-2">
                  <FileText className="size-4" /> IRPF
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut} className="gap-2 text-destructive">
                <LogOut className="size-4" /> Sair
              </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <ThemeToggle />
            <Button asChild size="sm">
              <Link to="/auth">Entrar</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
