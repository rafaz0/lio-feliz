import type { Alert, AlertRule, AlertDelivery } from "@/core/domain/alerts";

export interface IAlertRepository {
  saveRule(rule: AlertRule): Promise<void>;
  findRuleById(ruleId: string): Promise<AlertRule | null>;
  findRulesByUser(userId: string): Promise<AlertRule[]>;
  findEnabledRules(): Promise<AlertRule[]>;
  deleteRule(ruleId: string): Promise<void>;

  saveAlert(alert: Alert): Promise<void>;
  saveAlertsBatch(alerts: Alert[]): Promise<void>;
  findAlertById(alertId: string): Promise<Alert | null>;
  findAlertsByUser(userId: string): Promise<Alert[]>;
  findAlertKeysByRun(runId: string): Promise<Set<string>>;

  saveDelivery(delivery: AlertDelivery): Promise<void>;
  findDeliveryByAlert(alertId: string): Promise<AlertDelivery | null>;
  findDeliveriesByUser(userId: string): Promise<AlertDelivery[]>;
  updateDeliveryAck(alertId: string): Promise<void>;
}
