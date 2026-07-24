import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckoutForm } from "@/presentation/features/checkout";
import { useAuth } from "@/presentation/features/auth";
import { RouteErrorBoundary, NotFoundState } from "@/components/error-state";

export const Route = createFileRoute("/_authenticated/checkout")({
  component: CheckoutPage,
  errorComponent: RouteErrorBoundary,
  notFoundComponent: () => <NotFoundState />,
});

function CheckoutPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userId = user?.id ?? "dev-user-0000";

  return (
    <main className="container mx-auto p-4 py-6">
      <CheckoutForm
        userId={userId}
        onSuccess={() => navigate({ to: "/_authenticated/dashboard" })}
      />
    </main>
  );
}
