import { Alert, AlertId, type AlertProps } from "./alert";
import { AlertRule } from "./alert-rule";
import { AlertDelivery, AlertDeliveryId } from "./alert-delivery";
import type { AlertSeverityLevel } from "./alert-types";

export type AlertResult = {
  alert: Alert;
  delivery: AlertDelivery;
};

export class AlertEvaluator {
  evaluate(
    rule: AlertRule,
    runId: string,
    events: Array<{
      assetTicker: string;
      eventDate: Date;
      eventType: string;
      message: string;
      severity: AlertSeverityLevel;
      positionPercentage?: number;
    }>,
    existingKeys: Set<string>,
  ): AlertResult[] {
    if (!rule.enabled) return [];

    const results: AlertResult[] = [];

    for (const event of events) {
      const key = `${rule.id.value}:${runId}:${event.assetTicker}:${event.eventDate.toISOString().split("T")[0]}`;

      if (existingKeys.has(key)) continue;

      const alert = Alert.create({
        id: AlertId.generate(),
        ruleId: rule.id.value,
        runId,
        assetTicker: event.assetTicker,
        eventDate: event.eventDate,
        message: event.message,
        severity: event.severity,
        createdAt: new Date(),
      });

      const delivery = AlertDelivery.create({
        id: AlertDeliveryId.generate(),
        alertId: alert.id.value,
        channel: rule.channel,
        sentAt: new Date(),
        ack: false,
      });

      results.push({ alert, delivery });
    }

    return results;
  }

  calculateSeverity(
    eventType: string,
    positionPercentage?: number,
  ): AlertSeverityLevel {
    if (eventType === "maturity") {
      return "critical";
    }

    if (eventType === "dividend" && positionPercentage && positionPercentage > 5) {
      return "critical";
    }

    if (eventType === "dividend" || eventType === "exDate") {
      return "warning";
    }

    return "info";
  }

  isWithinWindow(eventDate: Date, daysBefore: number): boolean {
    const now = new Date();
    const diffMs = eventDate.getTime() - now.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= daysBefore;
  }
}
