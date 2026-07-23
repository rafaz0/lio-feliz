export { InvestorProfile, type InvestorProfileProps } from "./investor-profile";
export { RiskQuestionnaire, type RiskQuestionnaireProps } from "./risk-questionnaire";
export { RiskResult, type RiskResultProps } from "./risk-result";
export { RiskClassifier, QUESTIONARIO_PADRAO } from "./risk-classifier";
export {
  InvestorProfileId,
  RiskQuestionnaireId,
  RiskResultId,
  type RiskLevel,
  type InvestmentHorizon,
  type Answer,
} from "./profile-types";
export {
  ProfileNotFoundError,
  QuestionnaireNotFoundError,
  InvalidAnswerError,
  RiskClassificationError,
} from "./errors";
