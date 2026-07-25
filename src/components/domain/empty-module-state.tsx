import type { LucideIcon } from "lucide-react";
import { EmptyState } from "@/components/empty-state";

interface EmptyModuleStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
}

export function EmptyModuleState({
  icon,
  title = "Nenhum dado disponível",
  description = "Esta seção será exibida quando houver dados para apresentar.",
}: EmptyModuleStateProps) {
  return <EmptyState icon={icon} title={title} description={description} />;
}
