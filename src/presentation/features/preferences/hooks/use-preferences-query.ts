import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type { ApplicationError, UserPreferencesDto, ThemeConfigDto } from "@/presentation/shared/types/application-layer";
import { PREFERENCES_QUERY_KEYS } from "../queries";
import { toPreferencesViewModel, type PreferencesViewModel } from "../viewmodels/preferences.view-model";

export function usePreferencesQuery(userId: string) {
  const dispatcher = useDispatcher();
  return useQuery({
    queryKey: PREFERENCES_QUERY_KEYS.prefs(userId),
    enabled: Boolean(userId),
    queryFn: async (): Promise<UserPreferencesDto> => {
      const r = await dispatcher.DispatchQuery<UserPreferencesDto>({ type: "ObterPreferenciasQuery", userId } as IQuery);
      if (r instanceof Error) throw r; return r;
    },
    select: (data): PreferencesViewModel => toPreferencesViewModel(data),
  });
}

export function useThemeQuery(userId: string) {
  const dispatcher = useDispatcher();
  return useQuery({
    queryKey: PREFERENCES_QUERY_KEYS.theme(userId),
    enabled: Boolean(userId),
    queryFn: async (): Promise<ThemeConfigDto> => {
      const r = await dispatcher.DispatchQuery<ThemeConfigDto>({ type: "ObterTemaQuery", userId } as IQuery);
      if (r instanceof Error) throw r; return r;
    },
  });
}
