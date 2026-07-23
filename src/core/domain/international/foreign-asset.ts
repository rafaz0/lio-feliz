import { ValueObject } from "../value-object";
import { ForeignAssetId, type ForeignAssetType } from "./foreign-asset-id";

export type ForeignAssetProps = {
  id: ForeignAssetId;
  ticker: string;
  name: string;
  exchange: string;
  currency: string;
  assetType: ForeignAssetType;
};

export class ForeignAsset extends ValueObject<ForeignAssetProps> {
  private constructor(props: ForeignAssetProps) {
    super(props);
  }
  static create(props: ForeignAssetProps): ForeignAsset {
    return new ForeignAsset(props);
  }
  get id(): ForeignAssetId {
    return this.props.id;
  }
  get ticker(): string {
    return this.props.ticker;
  }
  get name(): string {
    return this.props.name;
  }
  get exchange(): string {
    return this.props.exchange;
  }
  get currency(): string {
    return this.props.currency;
  }
  get assetType(): ForeignAssetType {
    return this.props.assetType;
  }
}
