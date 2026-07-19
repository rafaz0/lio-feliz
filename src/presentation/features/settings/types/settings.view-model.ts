import type {
  ConfiguracoesDto,
  EstrategiaConfiguradaDto,
  MetaProgressoDto,
} from "@/presentation/shared/types/application-layer";

export interface StrategySettingsViewModel {
  readonly moeda: string;
  readonly toleranciaRebalanceamento: number;
  readonly percentuais: Record<string, number>;
}

export interface GoalsSettingsViewModel {
  readonly metas: MetaProgressoDto[];
}

export interface NotificationSettingsViewModel {
  readonly receberProventos: boolean;
  readonly receberRebalanceamento: boolean;
  readonly canal: "EMAIL" | "PUSH";
}

export interface SettingsViewModel {
  readonly usuarioId: string;
  readonly estrategia: StrategySettingsViewModel | null;
  readonly metas: MetaProgressoDto[];
  readonly notificacoes: NotificationSettingsViewModel;
  readonly tema: "claro" | "escuro" | "sistema";
}

export function toStrategyViewModel(
  estrategia: EstrategiaConfiguradaDto | null,
): StrategySettingsViewModel | null {
  if (!estrategia) return null;
  return {
    moeda: estrategia.moeda,
    toleranciaRebalanceamento: estrategia.toleranciaRebalanceamento,
    percentuais: estrategia.percentuais,
  };
}

export function toGoalsViewModel(metas: MetaProgressoDto[]): GoalsSettingsViewModel {
  return { metas };
}

export function toSettingsViewModel(
  dto: ConfiguracoesDto,
  notificacoes: NotificationSettingsViewModel = {
    receberProventos: true,
    receberRebalanceamento: true,
    canal: "EMAIL",
  },
  tema: SettingsViewModel["tema"] = "sistema",
): SettingsViewModel {
  return {
    usuarioId: dto.usuarioId,
    estrategia: toStrategyViewModel(dto.estrategia),
    metas: dto.metas,
    notificacoes,
    tema,
  };
}
