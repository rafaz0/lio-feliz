import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/carteira/lancamentos")({
  head: () => ({
    meta: [{ title: "Lançamentos — Investidor Pro" }, { name: "robots", content: "noindex" }],
  }),
  component: () => <Navigate to="/carteira/operacoes" />,
});
