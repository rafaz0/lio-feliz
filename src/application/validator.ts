import { ValidationError } from "./errors/application-error";

export interface ValidationRule {
  field: string;
  required?: boolean;
  type?: "string" | "number" | "object" | "boolean" | "Date";
  min?: number;
  max?: number;
  pattern?: RegExp;
  message?: string;
}

export class Validator {
  validate(input: Record<string, unknown>, rules: ValidationRule[]): ValidationError | null {
    const fieldErrors: Record<string, string[]> = {};

    for (const rule of rules) {
      const value = input[rule.field];
      const errors: string[] = [];

      if (rule.required && (value === undefined || value === null)) {
        errors.push(rule.message ?? `${rule.field} é obrigatório`);
      }

      if (value !== undefined && value !== null) {
        if (rule.type === "Date" && !(value instanceof Date)) {
          errors.push(`${rule.field} deve ser uma data válida`);
        }
      }

      if (errors.length > 0) {
        fieldErrors[rule.field] = errors;
      }
    }

    if (Object.keys(fieldErrors).length > 0) {
      return new ValidationError("VALIDATION_ERROR", "Dados de entrada inválidos", fieldErrors);
    }

    return null;
  }
}

export function validateRequiredFields(
  input: Record<string, unknown>,
  requiredFields: string[],
): ValidationError | null {
  const fieldErrors: Record<string, string[]> = {};
  for (const field of requiredFields) {
    if (input[field] === undefined || input[field] === null) {
      fieldErrors[field] = [`${field} é obrigatório`];
    }
  }
  if (Object.keys(fieldErrors).length > 0) {
    return new ValidationError("VALIDATION_ERROR", "Dados de entrada inválidos", fieldErrors);
  }
  return null;
}
