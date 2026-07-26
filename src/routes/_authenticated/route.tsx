import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AuthenticatedRoute } from "@/presentation/features/auth";
import { MobileNav } from "@/components/mobile-nav";
import { isDemoSession } from "@/seed/demo-session";

const DEMO_SESSION_KEY = "lio_demo_session";

function isLocalDev(): boolean {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  return h === "localhost" || h === "127.0.0.1";
}

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    if (isLocalDev()) return { user: { id: "dev-user-0000", email: "dev@localhost" } };

    if (isDemoSession()) {
      const sessionId =
        typeof window !== "undefined" ? window.localStorage.getItem(DEMO_SESSION_KEY) : null;
      return {
        user: {
          id: sessionId ?? "demo-user",
          email: "demo@localhost",
          user_metadata: { display_name: "Modo Demo" },
        },
      };
    }

    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/login" });
    return { user: data.user };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <AuthenticatedRoute>
      <div className="pb-16 md:pb-0">
        <Outlet />
        <MobileNav />
      </div>
    </AuthenticatedRoute>
  );
}
