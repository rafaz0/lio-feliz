export class ApplicationError extends Error {
  public readonly code: string;
  public readonly type: string;
  public readonly timestamp: Date;
  public readonly correlationId?: string;

  constructor(code: string, message: string, type: string = "APPLICATION_ERROR") {
    super(message);
    this.code = code;
    this.type = type;
    this.timestamp = new Date();
    this.name = this.constructor.name;
  }
}

export class ValidationError extends ApplicationError {
  public readonly fieldErrors: Record<string, string[]>;

  constructor(
    code: string = "VALIDATION_ERROR",
    message: string = "Dados de entrada inválidos",
    fieldErrors: Record<string, string[]> = {},
  ) {
    super(code, message, "VALIDATION_ERROR");
    this.fieldErrors = fieldErrors;
  }
}

export class NotFoundError extends ApplicationError {
  public readonly resourceType: string;
  public readonly resourceId: string;

  constructor(
    resourceType: string,
    resourceId: string,
    code: string = "NOT_FOUND",
    message?: string,
  ) {
    super(code, message ?? `${resourceType} '${resourceId}' não encontrado`, "NOT_FOUND_ERROR");
    this.resourceType = resourceType;
    this.resourceId = resourceId;
  }
}

export class AuthorizationError extends ApplicationError {
  constructor(
    code: string = "FORBIDDEN",
    message: string = "Usuário sem permissão para esta operação",
  ) {
    super(code, message, "AUTHORIZATION_ERROR");
  }
}

export class ConflictError extends ApplicationError {
  constructor(
    code: string = "CONFLICT",
    message: string = "Concorrência ou estado inválido detectado",
  ) {
    super(code, message, "CONFLICT_ERROR");
  }
}

export class InternalError extends ApplicationError {
  public readonly originalError?: Error;

  constructor(
    code: string = "INTERNAL_ERROR",
    message: string = "Erro interno inesperado",
    originalError?: Error,
  ) {
    super(code, message, "INTERNAL_ERROR");
    this.originalError = originalError;
  }
}
