import { ValueObject } from "../value-object";
import { ComparisonSetId, type ComparisonScope } from "./comparison-types";
import type { ComparisonEntry } from "./comparison-entry";

export type ComparisonSetProps = {
  id: ComparisonSetId;
  name: string;
  entries: ComparisonEntry[];
  scope: ComparisonScope;
  userId: string;
  createdAt: Date;
};

export class ComparisonSet extends ValueObject<ComparisonSetProps> {
  private constructor(props: ComparisonSetProps) {
    super(props);
  }

  static create(props: ComparisonSetProps): ComparisonSet {
    return new ComparisonSet(props);
  }

  get id(): ComparisonSetId {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get entries(): ComparisonEntry[] {
    return this.props.entries;
  }

  get scope(): ComparisonScope {
    return this.props.scope;
  }

  get userId(): string {
    return this.props.userId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  cacheHash(): string {
    const tickers = this.props.entries.map((e) => e.assetTicker).sort().join(",");
    return `${this.props.id.value}:${tickers}`;
  }
}
