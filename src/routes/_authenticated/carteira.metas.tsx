import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/carteira/metas")({
  head: () => ({
    meta: [{ title: "Metas — Investidor Pro" }, { name: "robots", content: "noindex" }],
  }),
  component: () => <Navigate to="/metas" />,
});
