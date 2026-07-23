import type { UserPreferencesDto } from "@/application/dtos/preferencias";

export interface PreferencesViewModel {
  readonly theme: string;
  readonly themeLabel: string;
  readonly notifications: boolean;
  readonly language: string;
}

const THEME_LABELS: Record<string, string> = {
  LIGHT: "Claro",
  DARK: "Escuro",
  SYSTEM: "Sistema",
};

export function toPreferencesViewModel(dto: UserPreferencesDto): PreferencesViewModel {
  return {
    theme: dto.theme,
    themeLabel: THEME_LABELS[dto.theme] ?? dto.theme,
    notifications: dto.notifications,
    language: dto.language,
  };
}
