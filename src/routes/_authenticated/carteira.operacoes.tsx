import { createFileRoute } from "@tanstack/react-router";
import { OperationsContent } from "@/components/operations-content";

export const Route = createFileRoute("/_authenticated/carteira/operacoes")({
  head: () => ({
    meta: [
      { title: "Operações — Investidor Pro" },
      {
        name: "description",
        content:
          "Histórico de operações da sua carteira: compras, vendas e dividendos registrados.",
      },
    ],
  }),
  component: OperationsContent,
});