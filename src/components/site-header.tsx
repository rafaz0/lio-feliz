import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BarChart3,
  ChevronDown,
  FileText,
  LineChart,
  LogOut,
  Menu,
  Search,
  Sparkles,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { clearDemoSession, isDemoSession } from "@/seed/demo-session";
import { useSession } from "@/hooks/use-session";
import { DemoBadge } from "@/components/demo-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { searchTickers, type TickerSuggestion } from "@/lib/data-functions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SyncIndicator } from "@/components/sync-indicator";
import { NotificationPanel } from "@/components/notification-panel";
import { useAlertsQuery, useConfirmAlertMutation } from "@/presentation/features/alerts";
import { useSyncStatus } from "@/presentation/features/sync/hooks/use-sync-status";
import { PlanBadge } from "@/presentation/features/licensing";
import { SubscriptionStatusBadge } from "@/presentation/features/subscriptions";
import { useSubscriptionQuery } from "@/presentation/features/subscriptions";

export function SiteHeader() {
  const navigate = useNavigate();
  const router = useRouter();
  const { user } = useSession();
  const [q, setQ] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const search = useServerFn(searchTickers);
  const { data: suggestions } = useQuery({
    queryKey: ["ticker-search", q],
    queryFn: () => search({ data: { q } }),
    staleTime: 300_000,
  });
  const matches = suggestions ?? [];

  async function signOut() {
    await supabase.auth.signOut();
    clearDemoSession();
    document.cookie = "lio-auth-token=; path=/; max-age=0; SameSite=Lax; Secure";
    await router.invalidate();
    navigate({ to: "/", replace: true });
  }

  function submitSearch() {
    const term = q.trim().toUpperCase();
    if (!term) return;
    const first = matches[0]?.ticker ?? term;
    navigate({ to: "/ativo/$ticker", params: { ticker: first } });
    setQ("");
  }

  function closeMobile() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-12 max-w-[1400px] items-center gap-1.5 px-3 text-sm md:gap-3 md:px-4">
        <Link to="/" className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
          <LineChart className="size-4 text-primary" />
          <span>Investidor Pro</span>
        </Link>

        {/* Mobile hamburger trigger — wraps only trigger + content so
            Radix Dialog context doesn't interfere with DropdownMenu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <span className="font-semibold">Navegação</span>
                <Button variant="ghost" size="icon" onClick={closeMobile}>
                  <X className="size-5" />
                </Button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  <p className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Mercado
                  </p>
                  <MobileNavLink to="/dividendos" onClick={closeMobile}>
                    Dividendos
                  </MobileNavLink>
                  <MobileNavLink to="/fiis" onClick={closeMobile}>
                    FIIs
                  </MobileNavLink>
                  <MobileNavLink to="/rankings" onClick={closeMobile}>
                    Rankings
                  </MobileNavLink>
                  <MobileNavLink to="/setores" onClick={closeMobile}>
                    Setores
                  </MobileNavLink>
                  <MobileNavLink to="/comparar" onClick={closeMobile}>
                    Comparar
                  </MobileNavLink>
                </div>
                <div className="space-y-1">
                  <p className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Ferramentas
                  </p>
                  <MobileNavLink to="/watchlist" onClick={closeMobile}>
                    Watchlist
                  </MobileNavLink>
                  <MobileNavLink to="/calculadoras" onClick={closeMobile}>
                    Calculadoras
                  </MobileNavLink>
                  <MobileNavLink to="/carteiras-recomendadas" onClick={closeMobile}>
                    Carteiras Recomendadas
                  </MobileNavLink>
                  <MobileNavLink to="/noticias" onClick={closeMobile}>
                    Notícias
                  </MobileNavLink>
                </div>
                {user && (
                  <div className="mt-4 space-y-1 border-t border-border pt-4">
                    <p className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Carteira
                    </p>
                    <MobileNavLink to="/carteira" onClick={closeMobile}>
                      Carteira
                    </MobileNavLink>
                    <MobileNavLink to="/assinaturas" onClick={closeMobile}>
                      Meu Plano
                    </MobileNavLink>
                    <MobileNavLink to="/metas" onClick={closeMobile}>
                      Metas
                    </MobileNavLink>
                    <MobileNavLink to="/provisionador" onClick={closeMobile}>
                      Provisionador
                    </MobileNavLink>
                  </div>
                )}
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop nav — outside Sheet so DropdownMenu is not inside Dialog context */}
        <nav className="hidden items-center gap-0.5 text-sm text-muted-foreground md:flex">
          {user && (
            <Link
              to="/dashboard"
              className="rounded px-2 py-1 transition hover:bg-secondary hover:text-foreground [&.active]:bg-secondary/60 [&.active]:font-semibold [&.active]:text-foreground"
              activeOptions={{ exact: false }}
            >
              Dashboard
            </Link>
          )}
          {user && (
            <Link
              to="/assinaturas"
              className="rounded px-2 py-1 transition hover:bg-secondary hover:text-foreground [&.active]:bg-secondary/60 [&.active]:font-semibold [&.active]:text-foreground"
              activeOptions={{ exact: false }}
            >
              Meu Plano
            </Link>
          )}
          <Link
            to="/carteira"
            className="rounded px-2 py-1 transition hover:bg-secondary hover:text-foreground [&.active]:bg-secondary/60 [&.active]:font-semibold [&.active]:text-foreground"
            activeOptions={{ exact: false }}
          >
            Carteira
          </Link>
          <Link
            to="/dividendos"
            className="rounded px-2 py-1 transition hover:bg-secondary hover:text-foreground [&.active]:bg-secondary/60 [&.active]:font-semibold [&.active]:text-foreground"
          >
            Dividendos
          </Link>
          <Link
            to="/analise"
            className="rounded px-2 py-1 transition hover:bg-secondary hover:text-foreground [&.active]:bg-secondary/60 [&.active]:font-semibold [&.active]:text-foreground"
            activeOptions={{ exact: false }}
          >
            Análise
          </Link>
        </nav>

        <div className="relative ml-auto w-full max-w-[120px] md:max-w-[150px]">
          <Search className="pointer-events-none absolute left-2 top-2 size-3.5 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitSearch();
              if (e.key === "Escape") setQ("");
            }}
            placeholder="Buscar ticker (PETR4, VALE3…)"
            autoComplete="off"
            className="h-8 pl-7 text-xs uppercase placeholder:normal-case"
          />
          {q.trim() && matches.length > 0 && (
            <div className="absolute inset-x-0 top-11 z-50 overflow-hidden rounded-md border border-border bg-popover shadow-lg">
              {matches.map((m) => (
                <button
                  key={m.ticker}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    navigate({ to: "/ativo/$ticker", params: { ticker: m.ticker } });
                    setQ("");
                  }}
                  className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-secondary"
                >
                  <span className="flex items-baseline gap-2">
                    <span className="font-semibold">{m.ticker}</span>
                    <span className="truncate text-xs text-muted-foreground">{m.name}</span>
                  </span>
                  {m.changePct != null && (
                    <span
                      className={
                        "tabular text-xs " + (m.changePct >= 0 ? "text-positive" : "text-negative")
                      }
                    >
                      {m.changePct >= 0 ? "+" : ""}
                      {m.changePct.toFixed(2)}%
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {user && !isDemoSession() ? (
          <>
            <HeaderSubscriptionStatus userId={user?.id ?? "dev-user-0000"} />
            <SyncIndicatorConnected userId={user?.id ?? "dev-user-0000"} />
            <NotificationPanelWrapper userId={user?.id ?? "dev-user-0000"} />
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
                <DropdownMenuLabel className="flex items-center gap-2 truncate">
                  {user.email}
                  <PlanBadge capability="carteira:read" />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/carteira/proventos" className="flex items-center gap-2">
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
        ) : user && isDemoSession() ? (
          <>
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <DemoBadge />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <span className="hidden text-sm md:inline">Modo Demo</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    Sessão demonstrativa
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      clearDemoSession();
                      window.location.href = "/register";
                    }}
                    className="gap-2"
                  >
                    <User className="size-4" /> Criar Conta
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      clearDemoSession();
                      window.location.href = "/login";
                    }}
                    className="gap-2"
                  >
                    <LogOut className="size-4" /> Entrar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="gap-2 text-destructive">
                    <LogOut className="size-4" /> Sair da Demonstração
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : (
          <>
            <ThemeToggle />
            <Button asChild size="sm">
              <Link to="/login">Entrar</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}

function SyncIndicatorConnected({ userId }: { userId: string }) {
  const { lastSyncAt, isSyncing, hasError, triggerSync } = useSyncStatus(userId);
  return (
    <SyncIndicator
      onSync={triggerSync}
      lastSync={lastSyncAt}
      isSyncing={isSyncing}
      hasError={hasError}
      className="hidden md:flex"
    />
  );
}

function NotificationPanelWrapper({ userId }: { userId: string }) {
  const { data: alerts, isLoading } = useAlertsQuery(userId);
  const confirmMutation = useConfirmAlertMutation(userId);
  return (
    <NotificationPanel
      alerts={alerts ?? []}
      isLoading={isLoading}
      onConfirm={(alertId) => confirmMutation.mutate(alertId)}
    />
  );
}

function HeaderSubscriptionStatus({ userId }: { userId: string }) {
  const { data: sub } = useSubscriptionQuery(userId);

  if (!sub) return null;

  return (
    <a
      href="/assinaturas"
      className="hidden items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition hover:bg-secondary md:flex"
    >
      <span>{sub.planName}</span>
      <SubscriptionStatusBadge status={sub.status} isActive={sub.isActive} />
    </a>
  );
}

function MobileNavLink({
  to,
  onClick,
  children,
}: {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to as any}
      onClick={onClick}
      className="flex rounded-lg px-3 py-2 text-sm transition hover:bg-secondary hover:text-foreground [&.active]:bg-secondary/60 [&.active]:font-semibold [&.active]:text-foreground"
      activeOptions={{ exact: to === "/" }}
    >
      {children}
    </Link>
  );
}
