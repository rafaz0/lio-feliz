import { DomainError } from "../errors";

export class PreferencesNotFoundError extends DomainError {
  constructor(userId: string) { super("PREFERENCES_NOT_FOUND", `Preferencias para "${userId}" nao encontradas`); }
}

export class InvalidThemeError extends DomainError {
  constructor(theme: string) { super("INVALID_THEME", `Tema invalido: "${theme}"`); }
}

export class InvalidLayoutError extends DomainError {
  constructor(message: string) { super("INVALID_LAYOUT", `Layout invalido: ${message}`); }
}
