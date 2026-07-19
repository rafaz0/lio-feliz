import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/presentation/shared/components/layout/AuthLayout";
import { GuestRoute } from "@/presentation/features/auth";
import { RegisterForm } from "@/presentation/features/auth";

export const Route = createFileRoute("/__auth/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <GuestRoute>
      <AuthLayout title="Criar conta" description="Cadastre-se no Lio Feliz">
        <RegisterForm onSuccess={() => void (window.location.href = "/dashboard")} />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Já tem conta?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Entrar
          </Link>
        </p>
      </AuthLayout>
    </GuestRoute>
  );
}
