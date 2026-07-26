import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, TimerOff } from "lucide-react";
import { AuthLayout } from "@/presentation/shared/components/layout/AuthLayout";
import { GuestRoute } from "@/presentation/features/auth";
import { LoginForm } from "@/presentation/features/auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  createDemoSession,
  wasDemoSessionExpired,
  clearDemoExpiredFlag,
} from "@/seed/demo-session";
import { initDemoSessionStore } from "@/seed/demo-server";

export const Route = createFileRoute("/__auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const [expiredBanner, setExpiredBanner] = useState(false);
  const [demoPending, setDemoPending] = useState(false);
  const seedStore = useServerFn(initDemoSessionStore);

  useEffect(() => {
    if (wasDemoSessionExpired()) {
      setExpiredBanner(true);
      clearDemoExpiredFlag();
    }
  }, []);

  async function startDemo() {
    setDemoPending(true);
    const { sessionId } = createDemoSession();
    try {
      await seedStore({ data: { sessionId } });
    } catch {
      // Seed is best-effort; demo still works with empty store
    }
    router.invalidate();
    window.location.href = "/dashboard";
  }

  return (
    <GuestRoute>
      <AuthLayout title="Entrar" description="Acesse sua conta do Lio Feliz">
        {expiredBanner && (
          <Alert className="mb-4 border-amber-500/50 bg-amber-500/5 text-amber-600 [&>svg]:text-amber-500">
            <TimerOff className="size-4" />
            <AlertDescription>
              Sua sessão demo expirou. Crie uma nova ou faça login para continuar.
            </AlertDescription>
          </Alert>
        )}
        <LoginForm onSuccess={() => void (window.location.href = "/dashboard")} />
        <div className="mt-4 flex flex-col items-center gap-3">
          <div className="flex w-full items-center gap-2 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            <span>ou</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <Button variant="outline" className="w-full gap-2" onClick={startDemo} disabled={demoPending}>
            <Sparkles className="size-4" /> {demoPending ? "Preparando..." : "Experimentar sem cadastro"}
          </Button>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Não tem conta?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Cadastre-se
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          <Link to="/forgot-password" className="text-primary hover:underline">
            Esqueceu a senha?
          </Link>
        </p>
      </AuthLayout>
    </GuestRoute>
  );
}
