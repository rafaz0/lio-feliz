import { EntityId } from "../entity-id";

export class GlossaryTermId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): GlossaryTermId {
    return new GlossaryTermId(value);
  }

  static generate(): GlossaryTermId {
    return new GlossaryTermId(`gt-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export class TooltipId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): TooltipId {
    return new TooltipId(value);
  }

  static generate(): TooltipId {
    return new TooltipId(`tt-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export class LearningPathId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): LearningPathId {
    return new LearningPathId(value);
  }

  static generate(): LearningPathId {
    return new LearningPathId(`lp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export type TermCategory = "CONCEITO" | "TIPO_ATIVO" | "INDICADOR" | "ESTRATEGIA" | "TRIBUTACAO" | "MERCADO";

export type DifficultyLevel = "BASIC" | "INTERMEDIATE" | "ADVANCED";
