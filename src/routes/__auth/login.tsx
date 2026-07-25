import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { AuthLayout } from "@/presentation/shared/components/layout/AuthLayout";
import { GuestRoute } from "@/presentation/features/auth";
import { LoginForm } from "@/presentation/features/auth";
import { Button } from "@/components/ui/button";
import { createDemoSession } from "@/seed/demo-session";

export const Route = createFileRoute("/__auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();

  function startDemo() {
    createDemoSession();
    router.invalidate();
    window.location.href = "/dashboard";
  }

  return (
    <GuestRoute>
      <AuthLayout title="Entrar" description="Acesse sua conta do Lio Feliz">
        <LoginForm onSuccess={() => void (window.location.href = "/dashboard")} />
        <div className="mt-4 flex flex-col items-center gap-3">
          <div className="flex w-full items-center gap-2 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            <span>ou</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <Button variant="outline" className="w-full gap-2" onClick={startDemo}>
            <Sparkles className="size-4" /> Experimentar sem cadastro
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
