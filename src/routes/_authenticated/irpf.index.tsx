import { createFileRoute } from "@tanstack/react-router";
import { IrpfContent } from "@/components/irpf-content";

export const Route = createFileRoute("/_authenticated/irpf/")({
  head: () => ({
    meta: [
      { title: "IRPF Helper — Investidor Pro" },
      {
        name: "description",
        content:
          "Apuração mensal de ganho de capital para IRPF: ações (15%), FIIs (20%), day-trade, isenção R$ 20k e compensação de prejuízos.",
      },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-5xl p-6">
      <IrpfContent />
    </div>
  ),
});