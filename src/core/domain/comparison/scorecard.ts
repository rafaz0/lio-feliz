import { ValueObject } from "../value-object";
import { ScorecardId, type ComparisonMetric } from "./comparison-types";

export type ScorecardProps = {
  id: ScorecardId;
  comparisonSetId: string;
  metrics: ComparisonMetric[];
  generatedAt: Date;
};

export class Scorecard extends ValueObject<ScorecardProps> {
  private constructor(props: ScorecardProps) {
    super(props);
  }

  static create(props: ScorecardProps): Scorecard {
    return new Scorecard(props);
  }

  get id(): ScorecardId {
    return this.props.id;
  }

  get comparisonSetId(): string {
    return this.props.comparisonSetId;
  }

  get metrics(): ComparisonMetric[] {
    return this.props.metrics;
  }

  get generatedAt(): Date {
    return this.props.generatedAt;
  }

  metricsByAsset(assetTicker: string): ComparisonMetric[] {
    return this.props.metrics.filter((m) => m.assetTicker === assetTicker);
  }

  metricByType(assetTicker: string, metricType: string): ComparisonMetric | undefined {
    return this.props.metrics.find(
      (m) => m.assetTicker === assetTicker && m.metricType === metricType,
    );
  }
}
