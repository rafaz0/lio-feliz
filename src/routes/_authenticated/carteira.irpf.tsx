import { createFileRoute } from "@tanstack/react-router";
import { IrpfContent } from "@/components/irpf-content";

export const Route = createFileRoute("/_authenticated/carteira/irpf")({
  head: () => ({
    meta: [{ title: "IRPF — Investidor Pro" }, { name: "robots", content: "noindex" }],
  }),
  component: IrpfContent,
});
