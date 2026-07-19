import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/presentation/shared/components/layout/AuthLayout";
import { GuestRoute } from "@/presentation/features/auth";
import { LoginForm } from "@/presentation/features/auth";

export const Route = createFileRoute("/__auth/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <GuestRoute>
      <AuthLayout title="Entrar" description="Acesse sua conta do Lio Feliz">
        <LoginForm onSuccess={() => void (window.location.href = "/dashboard")} />
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
