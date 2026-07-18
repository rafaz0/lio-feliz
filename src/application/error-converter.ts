import type { DomainError } from "@/core/domain";
import { InternalError } from "./errors/application-error";
import type { ApplicationError } from "./errors/application-error";

export interface ConversionResult {
  error: ApplicationError;
  originalMessage: string;
}

export function convertDomainError(
  domainError: DomainError,
  correlationId?: string,
): ConversionResult {
  const err = new InternalError(domainError.code, sanitizeMessage(domainError.message));
  if (correlationId) {
    (err as { correlationId?: string }).correlationId = correlationId;
  }
  return { error: err, originalMessage: domainError.message };
}

function sanitizeMessage(raw: string): string {
  const patterns = [
    /^\[INVARIANT\]\s*/i,
    /^\[VALIDATION\]\s*/i,
    /^Erro de domínio:\s*/i,
    /^Domain Error:\s*/i,
    /-\s*Valor recebido:\s*[^-]+/gi,
    /-\s*Valor esperado:\s*[^-]+/gi,
    /\(contexto:\s*[^)]+\)/gi,
  ];

  let sanitized = raw;
  for (const pattern of patterns) {
    sanitized = sanitized.replace(pattern, "");
  }

  return sanitized.trim() || "Erro interno na operação solicitada";
}

export function convertInfrastructureError(error: Error, correlationId?: string): InternalError {
  const err = new InternalError("INFRASTRUCTURE_ERROR", "Erro interno inesperado", error);
  if (correlationId) {
    (err as { correlationId?: string }).correlationId = correlationId;
  }
  return err;
}

export function convertUnexpectedError(error: unknown, correlationId?: string): InternalError {
  const original = error instanceof Error ? error : new Error(String(error));
  const err = new InternalError("UNEXPECTED_ERROR", "Erro interno inesperado", original);
  if (correlationId) {
    (err as { correlationId?: string }).correlationId = correlationId;
  }
  return err;
}
