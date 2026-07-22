import type { ThemeMode, DashboardLayout } from "@/core/domain/preferences";

export interface UserPreferencesDto {
  readonly theme: ThemeMode;
  readonly notifications: boolean;
  readonly language: string;
  readonly layout: DashboardLayout;
}

export interface ThemeConfigDto {
  readonly theme: ThemeMode;
}
