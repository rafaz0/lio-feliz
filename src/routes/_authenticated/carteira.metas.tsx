import { createFileRoute } from "@tanstack/react-router";
import { MetasContent } from "@/components/metas-content";

export const Route = createFileRoute("/_authenticated/carteira/metas")({
  head: () => ({
    meta: [{ title: "Metas — Investidor Pro" }, { name: "robots", content: "noindex" }],
  }),
  component: MetasContent,
});