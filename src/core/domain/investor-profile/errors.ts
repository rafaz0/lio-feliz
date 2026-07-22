import { DomainError } from "../errors";

export class ProfileNotFoundError extends DomainError {
  constructor(userId: string) {
    super("PROFILE_NOT_FOUND", `Perfil do investidor "${userId}" nao encontrado`);
  }
}

export class QuestionnaireNotFoundError extends DomainError {
  constructor(profileId: string) {
    super("QUESTIONNAIRE_NOT_FOUND", `Questionario "${profileId}" nao encontrado`);
  }
}

export class InvalidAnswerError extends DomainError {
  constructor(message: string) {
    super("INVALID_ANSWER", `Resposta invalida: ${message}`);
  }
}

export class RiskClassificationError extends DomainError {
  constructor(message: string) {
    super("RISK_CLASSIFICATION", `Falha na classificacao de risco: ${message}`);
  }
}
