import type { SupabaseClient } from "@supabase/supabase-js";
import type { IAlertRepository } from "@/application/ports/alert-repository";
import {
  Alert,
  AlertRule,
  AlertDelivery,
  AlertId,
  AlertRuleId,
  AlertDeliveryId,
  type AlertSeverityLevel,
  type TriggerWhen,
  type AlertChannel,
} from "@/core/domain/alerts";

interface SerializedRule {
  id: string;
  name: string;
  triggerWhen: TriggerWhen;
  assetFilter: string[];
  channel: AlertChannel;
  enabled: boolean;
  userId: string;
  createdAt: string;
  lastTriggeredAt?: string;
}

interface SerializedAlert {
  id: string;
  ruleId: string;
  runId: string;
  assetTicker: string;
  eventDate: string;
  message: string;
  severity: string;
  createdAt: string;
}

interface SerializedDelivery {
  id: string;
  alertId: string;
  channel: AlertChannel;
  sentAt: string;
  ack: boolean;
}

export class SupabaseAlertRepository implements IAlertRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async saveRule(rule: AlertRule): Promise<void> {
    const serialized: SerializedRule = {
      id: rule.id.value,
      name: rule.name,
      triggerWhen: rule.triggerWhen,
      assetFilter: rule.assetFilter,
      channel: rule.channel,
      enabled: rule.enabled,
      userId: rule.userId,
      createdAt: rule.createdAt.toISOString(),
      lastTriggeredAt: rule.lastTriggeredAt?.toISOString(),
    };
    const { error } = await this.supabase.from("alert_rules").upsert(
      { id: rule.id.value, dados: serialized, updated_at: new Date().toISOString() },
      { onConflict: "id" },
    );
    if (error) throw new Error(`Falha ao salvar regra de alerta: ${error.message}`);
  }

  async findRuleById(ruleId: string): Promise<AlertRule | null> {
    const { data, error } = await this.supabase
      .from("alert_rules")
      .select("dados")
      .eq("id", ruleId)
      .single();
    if (error || !data) return null;
    return this.deserializeRule(data.dados as SerializedRule);
  }

  async findRulesByUser(userId: string): Promise<AlertRule[]> {
    const { data, error } = await this.supabase.from("alert_rules").select("dados");
    if (error || !data) return [];
    const all = data.map((d: { dados: SerializedRule }) => d.dados);
    return all.filter((r) => r.userId === userId).map((r) => this.deserializeRule(r));
  }

  async findEnabledRules(): Promise<AlertRule[]> {
    const { data, error } = await this.supabase.from("alert_rules").select("dados");
    if (error || !data) return [];
    const all = data.map((d: { dados: SerializedRule }) => d.dados);
    return all.filter((r) => r.enabled).map((r) => this.deserializeRule(r));
  }

  async deleteRule(ruleId: string): Promise<void> {
    await this.supabase.from("alert_rules").delete().eq("id", ruleId);
  }

  async saveAlert(alert: Alert): Promise<void> {
    const serialized: SerializedAlert = {
      id: alert.id.value,
      ruleId: alert.ruleId,
      runId: alert.runId,
      assetTicker: alert.assetTicker,
      eventDate: alert.eventDate.toISOString(),
      message: alert.message,
      severity: alert.severity,
      createdAt: alert.createdAt.toISOString(),
    };
    const { error } = await this.supabase.from("alerts").upsert(
      { id: alert.id.value, dados: serialized, dedup_key: alert.dedupKey(), updated_at: new Date().toISOString() },
      { onConflict: "dedup_key" },
    );
    if (error) throw new Error(`Falha ao salvar alerta: ${error.message}`);
  }

  async saveAlertsBatch(alerts: Alert[]): Promise<void> {
    for (const alert of alerts) {
      await this.saveAlert(alert);
    }
  }

  async findAlertById(alertId: string): Promise<Alert | null> {
    const { data, error } = await this.supabase
      .from("alerts")
      .select("dados")
      .eq("id", alertId)
      .single();
    if (error || !data) return null;
    return this.deserializeAlert(data.dados as SerializedAlert);
  }

  async findAlertsByUser(userId: string): Promise<Alert[]> {
    const userRules = await this.findRulesByUser(userId);
    const ruleIds = new Set(userRules.map((r) => r.id));
    if (ruleIds.size === 0) return [];
    const { data, error } = await this.supabase.from("alerts").select("dados");
    if (error || !data) return [];
    return data
      .map((d: { dados: SerializedAlert }) => d.dados)
      .filter((a) => ruleIds.has(a.ruleId))
      .map((a) => this.deserializeAlert(a));
  }

  async findAlertKeysByRun(runId: string): Promise<Set<string>> {
    const { data, error } = await this.supabase
      .from("alerts")
      .select("dedup_key")
      .filter("dados->>runId", "eq", runId);
    if (error || !data) return new Set();
    return new Set(data.map((d: { dedup_key: string }) => d.dedup_key));
  }

  async saveDelivery(delivery: AlertDelivery): Promise<void> {
    const serialized: SerializedDelivery = {
      id: delivery.id.value,
      alertId: delivery.alertId,
      channel: delivery.channel,
      sentAt: delivery.sentAt.toISOString(),
      ack: delivery.ack,
    };
    const { error } = await this.supabase.from("alert_deliveries").upsert(
      { id: delivery.id.value, dados: serialized, updated_at: new Date().toISOString() },
      { onConflict: "id" },
    );
    if (error) throw new Error(`Falha ao salvar entrega: ${error.message}`);
  }

  async findDeliveryByAlert(alertId: string): Promise<AlertDelivery | null> {
    const { data, error } = await this.supabase
      .from("alert_deliveries")
      .select("dados")
      .filter("dados->>alertId", "eq", alertId)
      .single();
    if (error || !data) return null;
    return this.deserializeDelivery(data.dados as SerializedDelivery);
  }

  async findDeliveriesByUser(userId: string): Promise<AlertDelivery[]> {
    const userAlerts = await this.findAlertsByUser(userId);
    const alertIds = new Set(userAlerts.map((a) => a.id.value));
    if (alertIds.size === 0) return [];
    const { data, error } = await this.supabase.from("alert_deliveries").select("dados");
    if (error || !data) return [];
    return data
      .map((d: { dados: SerializedDelivery }) => d.dados)
      .filter((d) => alertIds.has(d.alertId))
      .map((d) => this.deserializeDelivery(d));
  }

  async updateDeliveryAck(alertId: string): Promise<void> {
    const delivery = await this.findDeliveryByAlert(alertId);
    if (delivery) {
      const updated = delivery.confirm();
      await this.saveDelivery(updated);
    }
  }

  private deserializeRule(s: SerializedRule): AlertRule {
    return AlertRule.create({
      id: AlertRuleId.create(s.id),
      name: s.name,
      triggerWhen: s.triggerWhen,
      assetFilter: s.assetFilter,
      channel: s.channel,
      enabled: s.enabled,
      userId: s.userId,
      createdAt: new Date(s.createdAt),
      lastTriggeredAt: s.lastTriggeredAt ? new Date(s.lastTriggeredAt) : undefined,
    });
  }

  private deserializeAlert(s: SerializedAlert): Alert {
    return Alert.create({
      id: AlertId.create(s.id),
      ruleId: s.ruleId,
      runId: s.runId,
      assetTicker: s.assetTicker,
      eventDate: new Date(s.eventDate),
      message: s.message,
      severity: s.severity as AlertSeverityLevel,
      createdAt: new Date(s.createdAt),
    });
  }

  private deserializeDelivery(s: SerializedDelivery): AlertDelivery {
    return AlertDelivery.create({
      id: AlertDeliveryId.create(s.id),
      alertId: s.alertId,
      channel: s.channel,
      sentAt: new Date(s.sentAt),
      ack: s.ack,
    });
  }
}
