import { createFileRoute } from "@tanstack/react-router";
import { OperationsContent } from "@/components/operations-content";

export const Route = createFileRoute("/_authenticated/carteira/lancamentos")({
  head: () => ({
    meta: [{ title: "Lançamentos — Investidor Pro" }, { name: "robots", content: "noindex" }],
  }),
  component: OperationsContent,
});