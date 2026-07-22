import { DomainError } from "../errors";

export class GlossaryTermNotFoundError extends DomainError {
  constructor(term: string) {
    super("GLOSSARY_TERM_NOT_FOUND", `Termo "${term}" nao encontrado no glossario`);
  }
}

export class DuplicateTermError extends DomainError {
  constructor(term: string) {
    super("DUPLICATE_TERM", `Termo "${term}" ja existe no glossario`);
  }
}

export class TooltipNotFoundError extends DomainError {
  constructor(tooltipId: string) {
    super("TOOLTIP_NOT_FOUND", `Tooltip "${tooltipId}" nao encontrado`);
  }
}

export class LearningPathNotFoundError extends DomainError {
  constructor(pathId: string) {
    super("LEARNING_PATH_NOT_FOUND", `Trilha de aprendizado "${pathId}" nao encontrada`);
  }
}
