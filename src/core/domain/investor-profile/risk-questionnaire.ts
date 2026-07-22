import { ValueObject } from "../value-object";
import { RiskQuestionnaireId, type RiskLevel, type Answer } from "./profile-types";

export type RiskQuestionnaireProps = {
  id: RiskQuestionnaireId;
  profileId: string;
  answers: Answer[];
  totalScore: number;
  riskLevel: RiskLevel;
};

export class RiskQuestionnaire extends ValueObject<RiskQuestionnaireProps> {
  private constructor(props: RiskQuestionnaireProps) { super(props); }
  static create(props: RiskQuestionnaireProps): RiskQuestionnaire { return new RiskQuestionnaire(props); }
  get id(): RiskQuestionnaireId { return this.props.id; }
  get profileId(): string { return this.props.profileId; }
  get answers(): Answer[] { return this.props.answers; }
  get totalScore(): number { return this.props.totalScore; }
  get riskLevel(): RiskLevel { return this.props.riskLevel; }
}
