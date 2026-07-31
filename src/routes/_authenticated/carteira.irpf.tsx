import { createFileRoute } from "@tanstack/react-router";
import { IrpfContent } from "@/components/irpf-content";
import { APP_NAME } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/carteira/irpf")({
  head: () => ({
    meta: [{ title: `IRPF — ${APP_NAME}` }, { name: "robots", content: "noindex" }],
  }),
  component: IrpfContent,
});
