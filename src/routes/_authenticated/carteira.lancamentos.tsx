import { createFileRoute } from "@tanstack/react-router";
import { OperationsContent } from "@/components/operations-content";
import { APP_NAME } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/carteira/lancamentos")({
  head: () => ({
    meta: [{ title: `Lançamentos — ${APP_NAME}` }, { name: "robots", content: "noindex" }],
  }),
  component: OperationsContent,
});
