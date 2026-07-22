import type { DashboardLayout } from "@/core/domain/preferences";

export interface SalvarLayoutDashboardCommand {
  readonly type: "SalvarLayoutDashboardCommand";
  readonly userId: string;
  readonly layout: DashboardLayout;
}
