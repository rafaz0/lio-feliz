import type { AlertaDto, AlertRuleDto } from "@/application/dtos/alerta";

export interface AlertViewModel {
  readonly id: string;
  readonly assetTicker: string;
  readonly message: string;
  readonly severity: string;
  readonly severityLabel: string;
  readonly eventDate: string;
  readonly ack: boolean;
  readonly isConfirmed: boolean;
}

export interface AlertRuleViewModel {
  readonly id: string;
  readonly name: string;
  readonly eventType: string;
  readonly daysBefore: number;
  readonly enabled: boolean;
}

const SEVERITY_LABELS: Record<string, string> = {
  info: "Informativo", warning: "Atencao", critical: "Critico",
};

export function toAlertViewModel(dto: AlertaDto): AlertViewModel {
  return {
    id: dto.id,
    assetTicker: dto.assetTicker,
    message: dto.message,
    severity: dto.severity,
    severityLabel: SEVERITY_LABELS[dto.severity] ?? dto.severity,
    eventDate: new Date(dto.eventDate).toLocaleDateString("pt-BR"),
    ack: dto.ack,
    isConfirmed: dto.ack,
  };
}

export function toAlertViewModels(dtos: AlertaDto[]): AlertViewModel[] {
  return dtos.map(toAlertViewModel);
}

export function toAlertRuleViewModel(dto: AlertRuleDto): AlertRuleViewModel {
  return {
    id: dto.id,
    name: dto.name,
    eventType: dto.triggerWhen.eventType,
    daysBefore: dto.triggerWhen.daysBefore,
    enabled: dto.enabled,
  };
}

export function toAlertRuleViewModels(dtos: AlertRuleDto[]): AlertRuleViewModel[] {
  return dtos.map(toAlertRuleViewModel);
}
