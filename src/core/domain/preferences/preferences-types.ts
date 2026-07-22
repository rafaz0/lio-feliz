import { EntityId } from "../entity-id";

export class UserPreferencesId extends EntityId {
  private constructor(value: string) { super(value); }
  static create(value: string): UserPreferencesId { return new UserPreferencesId(value); }
  static generate(): UserPreferencesId { return new UserPreferencesId(`upref-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`); }
}

export type ThemeMode = "LIGHT" | "DARK" | "SYSTEM";

export type WidgetPosition = {
  widgetId: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type DashboardLayout = {
  widgets: WidgetPosition[];
  columns: number;
  compactMode: boolean;
};

export type ThemeConfig = {
  mode: ThemeMode;
  primaryColor: string;
  fontSize: number;
};
