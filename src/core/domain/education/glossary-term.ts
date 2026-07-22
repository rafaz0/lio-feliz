import { ValueObject } from "../value-object";
import { GlossaryTermId, type TermCategory } from "./education-types";

export type GlossaryTermProps = {
  id: GlossaryTermId;
  term: string;
  definition: string;
  category: TermCategory;
  synonyms: string[];
  relatedTerms: string[];
};

export class GlossaryTerm extends ValueObject<GlossaryTermProps> {
  private constructor(props: GlossaryTermProps) {
    super(props);
  }

  static create(props: GlossaryTermProps): GlossaryTerm {
    return new GlossaryTerm(props);
  }

  get id(): GlossaryTermId {
    return this.props.id;
  }

  get term(): string {
    return this.props.term;
  }

  get definition(): string {
    return this.props.definition;
  }

  get category(): TermCategory {
    return this.props.category;
  }

  get synonyms(): string[] {
    return this.props.synonyms;
  }

  get relatedTerms(): string[] {
    return this.props.relatedTerms;
  }
}
