import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/presentation/shared/components/layout/AuthLayout";
import { GuestRoute } from "@/presentation/features/auth";
import { ForgotPasswordForm } from "@/presentation/features/auth";

export const Route = createFileRoute("/__auth/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <GuestRoute>
      <AuthLayout title="Recuperar senha" description="Enviaremos um link para o seu e-mail">
        <ForgotPasswordForm />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          <Link to="/login" className="text-primary hover:underline">
            Voltar ao login
          </Link>
        </p>
      </AuthLayout>
    </GuestRoute>
  );
}
