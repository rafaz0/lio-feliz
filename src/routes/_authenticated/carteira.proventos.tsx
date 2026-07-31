import { createFileRoute } from "@tanstack/react-router";
import { ProventosContent } from "@/components/proventos-content";
import { APP_NAME } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/carteira/proventos")({
  head: () => ({
    meta: [
      { title: `Proventos — ${APP_NAME}` },
      {
        name: "description",
        content:
          "Proventos recebidos, projetados, cobertura de despesas e calendário de dividendos da sua carteira.",
      },
    ],
  }),
  component: ProventosContent,
});
