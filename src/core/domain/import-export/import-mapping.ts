import { ValueObject } from "../value-object";

export type NormalizedOperationSide = "buy" | "sell" | "dividend" | "bonus";

export interface ImportRecordNormalized {
  assetId: string;
  ticker: string;
  operation: NormalizedOperationSide;
  quantity: number;
  unitPrice: number;
  date: Date;
  settlementDate?: Date;
  currency: string;
  brokerageCode?: string;
  accountGroup?: string;
  strategy?: string;
  notes?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  normalizedData?: ImportRecordNormalized;
}

export type ValidationRule = (record: any) => ValidationResult;
export type FieldTransformer = (data: Partial<ImportRecordNormalized>) => void;

export class ImportMapping extends ValueObject<ImportMapping> {
  private constructor(
    private readonly _source: string,
    private readonly _fieldMappings: Record<string, string>,
    private readonly _validationRules: ValidationRule[],
    private readonly _transformers: FieldTransformer[],
  ) {
    super();
  }

  get source(): string { return this._source; }
  get fieldMappings(): Record<string, string> { return this._fieldMappings; }
  get validationRules(): ValidationRule[] { return this._validationRules; }
  get transformers(): FieldTransformer[] { return this._transformers; }

  static create(props: {
    source: string;
    fieldMappings: Record<string, string>;
    validationRules: ValidationRule[];
    transformers: FieldTransformer[];
  }): ImportMapping {
    return new ImportMapping(
      props.source,
      props.fieldMappings,
      props.validationRules,
      props.transformers,
    );
  }

  validate(record: any): ValidationResult {
    const errors: string[] = [];
    for (const rule of this._validationRules) {
      const ruleResult = rule(record);
      if (!ruleResult.isValid) {
        errors.push(...ruleResult.errors);
      }
    }
    return {
      isValid: errors.length === 0,
      errors,
      normalizedData: this.transform(record),
    };
  }

  transform(record: any): ImportRecordNormalized {
    const normalized: Partial<ImportRecordNormalized> = {};
    for (const [sourceField, targetField] of Object.entries(this._fieldMappings)) {
      (normalized as any)[targetField] = record[sourceField];
    }
    for (const transformer of this._transformers) {
      transformer(normalized);
    }
    return normalized as ImportRecordNormalized;
  }
}
