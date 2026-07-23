import type { ThemeMode, DashboardLayout } from "./preferences-types";

const DEFAULT_LAYOUT: DashboardLayout = {
  widgets: [
    { widgetId: "patrimonio-total", x: 0, y: 0, w: 6, h: 2 },
    { widgetId: "alocacao-classe", x: 6, y: 0, w: 6, h: 2 },
    { widgetId: "ultimos-proventos", x: 0, y: 2, w: 4, h: 2 },
    { widgetId: "rentabilidade", x: 4, y: 2, w: 4, h: 2 },
    { widgetId: "metas", x: 8, y: 2, w: 4, h: 2 },
  ],
  columns: 12,
  compactMode: false,
};

export class PreferencesService {
  mergeDefaults(
    prefs: Partial<{
      theme: ThemeMode;
      dashboardLayout: DashboardLayout;
      notifications: boolean;
      language: string;
    }>,
  ): {
    theme: ThemeMode;
    dashboardLayout: DashboardLayout;
    notifications: boolean;
    language: string;
  } {
    return {
      theme: prefs.theme ?? "SYSTEM",
      dashboardLayout: prefs.dashboardLayout ?? DEFAULT_LAYOUT,
      notifications: prefs.notifications ?? true,
      language: prefs.language ?? "pt-BR",
    };
  }

  validateTheme(theme: string): boolean {
    return ["LIGHT", "DARK", "SYSTEM"].includes(theme);
  }

  getDefaultLayout(): DashboardLayout {
    return DEFAULT_LAYOUT;
  }
}
