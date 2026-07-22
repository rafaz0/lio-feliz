import type { IAlertRepository } from "@/application/ports/alert-repository";
import { Alert, AlertRule, AlertDelivery, AlertId, AlertRuleId, AlertDeliveryId } from "@/core/domain/alerts";

export class FakeAlertRepository implements IAlertRepository {
  private rules = new Map<string, AlertRule>();
  private alerts = new Map<string, Alert>();
  private deliveries = new Map<string, AlertDelivery>();

  async saveRule(rule: AlertRule): Promise<void> {
    this.rules.set(rule.id.value, rule);
  }

  async findRuleById(ruleId: string): Promise<AlertRule | null> {
    return this.rules.get(ruleId) ?? null;
  }

  async findRulesByUser(userId: string): Promise<AlertRule[]> {
    return Array.from(this.rules.values()).filter((r) => r.userId === userId);
  }

  async findEnabledRules(): Promise<AlertRule[]> {
    return Array.from(this.rules.values()).filter((r) => r.enabled);
  }

  async deleteRule(ruleId: string): Promise<void> {
    this.rules.delete(ruleId);
  }

  async saveAlert(alert: Alert): Promise<void> {
    this.alerts.set(alert.id.value, alert);
  }

  async saveAlertsBatch(alerts: Alert[]): Promise<void> {
    for (const a of alerts) {
      this.alerts.set(a.id.value, a);
    }
  }

  async findAlertById(alertId: string): Promise<Alert | null> {
    return this.alerts.get(alertId) ?? null;
  }

  async findAlertsByUser(userId: string): Promise<Alert[]> {
    const userRules = await this.findRulesByUser(userId);
    const ruleIds = new Set(userRules.map((r) => r.id.value));
    return Array.from(this.alerts.values()).filter((a) => ruleIds.has(a.ruleId));
  }

  async findAlertKeysByRun(runId: string): Promise<Set<string>> {
    const keys = new Set<string>();
    for (const alert of this.alerts.values()) {
      if (alert.runId === runId) {
        keys.add(alert.dedupKey());
      }
    }
    return keys;
  }

  async saveDelivery(delivery: AlertDelivery): Promise<void> {
    this.deliveries.set(delivery.id.value, delivery);
  }

  async findDeliveryByAlert(alertId: string): Promise<AlertDelivery | null> {
    return Array.from(this.deliveries.values()).find((d) => d.alertId === alertId) ?? null;
  }

  async findDeliveriesByUser(userId: string): Promise<AlertDelivery[]> {
    const userAlerts = await this.findAlertsByUser(userId);
    const alertIds = new Set(userAlerts.map((a) => a.id.value));
    return Array.from(this.deliveries.values()).filter((d) => alertIds.has(d.alertId));
  }

  async updateDeliveryAck(alertId: string): Promise<void> {
    const delivery = await this.findDeliveryByAlert(alertId);
    if (delivery) {
      this.deliveries.set(delivery.id.value, delivery.confirm());
    }
  }

  reset(): void {
    this.rules.clear();
    this.alerts.clear();
    this.deliveries.clear();
  }
}
