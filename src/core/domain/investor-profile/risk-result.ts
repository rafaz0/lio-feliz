import { ValueObject } from "../value-object";
import { RiskResultId, type RiskLevel } from "./profile-types";

export type RiskResultProps = {
  id: RiskResultId;
  profileId: string;
  riskLevel: RiskLevel;
  score: number;
  generatedAt: Date;
};

export class RiskResult extends ValueObject<RiskResultProps> {
  private constructor(props: RiskResultProps) { super(props); }
  static create(props: RiskResultProps): RiskResult { return new RiskResult(props); }
  get id(): RiskResultId { return this.props.id; }
  get profileId(): string { return this.props.profileId; }
  get riskLevel(): RiskLevel { return this.props.riskLevel; }
  get score(): number { return this.props.score; }
  get generatedAt(): Date { return this.props.generatedAt; }
}
