import { ValueObject } from "../value-object";
import { ComparisonEntryId } from "./comparison-types";

export type ComparisonEntryProps = {
  id: ComparisonEntryId;
  comparisonSetId: string;
  assetTicker: string;
  assetType: string;
  weight: number;
};

export class ComparisonEntry extends ValueObject<ComparisonEntryProps> {
  private constructor(props: ComparisonEntryProps) {
    super(props);
  }

  static create(props: ComparisonEntryProps): ComparisonEntry {
    return new ComparisonEntry(props);
  }

  get id(): ComparisonEntryId {
    return this.props.id;
  }

  get comparisonSetId(): string {
    return this.props.comparisonSetId;
  }

  get assetTicker(): string {
    return this.props.assetTicker;
  }

  get assetType(): string {
    return this.props.assetType;
  }

  get weight(): number {
    return this.props.weight;
  }
}
