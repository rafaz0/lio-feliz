import { EntityId } from "../entity-id";

export class InvestorProfileId extends EntityId {
  private constructor(value: string) {
    super(value);
  }
  static create(value: string): InvestorProfileId {
    return new InvestorProfileId(value);
  }
  static generate(): InvestorProfileId {
    return new InvestorProfileId(`ip-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export class RiskQuestionnaireId extends EntityId {
  private constructor(value: string) {
    super(value);
  }
  static create(value: string): RiskQuestionnaireId {
    return new RiskQuestionnaireId(value);
  }
  static generate(): RiskQuestionnaireId {
    return new RiskQuestionnaireId(
      `rq-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    );
  }
}

export class RiskResultId extends EntityId {
  private constructor(value: string) {
    super(value);
  }
  static create(value: string): RiskResultId {
    return new RiskResultId(value);
  }
  static generate(): RiskResultId {
    return new RiskResultId(`rr-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export type RiskLevel = "CONSERVADOR" | "MODERADO" | "ARROJADO";
export type InvestmentHorizon = "CURTO_PRAZO" | "MEDIO_PRAZO" | "LONGO_PRAZO";

export type Answer = {
  questionId: string;
  value: number;
  weight: number;
};
