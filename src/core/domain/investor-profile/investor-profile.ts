import { ValueObject } from "../value-object";
import { InvestorProfileId, type RiskLevel, type InvestmentHorizon } from "./profile-types";

export type InvestorProfileProps = {
  id: InvestorProfileId;
  userId: string;
  riskLevel: RiskLevel;
  investmentHorizon: InvestmentHorizon;
  totalPortfolioValue: number;
  createdAt: Date;
  updatedAt: Date;
};

export class InvestorProfile extends ValueObject<InvestorProfileProps> {
  private constructor(props: InvestorProfileProps) {
    super(props);
  }
  static create(props: InvestorProfileProps): InvestorProfile {
    return new InvestorProfile(props);
  }
  get id(): InvestorProfileId {
    return this.props.id;
  }
  get userId(): string {
    return this.props.userId;
  }
  get riskLevel(): RiskLevel {
    return this.props.riskLevel;
  }
  get investmentHorizon(): InvestmentHorizon {
    return this.props.investmentHorizon;
  }
  get totalPortfolioValue(): number {
    return this.props.totalPortfolioValue;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
