import { createFileRoute } from "@tanstack/react-router";
import { ProventosContent } from "@/components/proventos-content";

export const Route = createFileRoute("/_authenticated/carteira/proventos")({
  head: () => ({
    meta: [
      { title: "Proventos — Investidor Pro" },
      {
        name: "description",
        content:
          "Proventos recebidos, projetados, cobertura de despesas e calendário de dividendos da sua carteira.",
      },
    ],
  }),
  component: ProventosContent,
});