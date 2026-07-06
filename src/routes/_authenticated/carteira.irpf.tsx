import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/carteira/irpf")({
  head: () => ({
    meta: [{ title: "IRPF — Investidor Pro" }, { name: "robots", content: "noindex" }],
  }),
  component: () => <Navigate to="/irpf" />,
});
