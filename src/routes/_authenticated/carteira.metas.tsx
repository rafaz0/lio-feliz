import { createFileRoute } from "@tanstack/react-router";
import { MetasContent } from "@/components/metas-content";
import { APP_NAME } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/carteira/metas")({
  head: () => ({
    meta: [{ title: `Metas — ${APP_NAME}` }, { name: "robots", content: "noindex" }],
  }),
  component: MetasContent,
});
