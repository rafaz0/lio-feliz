import { ValueObject } from "../value-object";
import { ExportTemplateId, type ExportFormatType } from "./export-types";

export type ExportTemplateProps = {
  id: ExportTemplateId;
  name: string;
  description: string;
  format: ExportFormatType;
  version: string;
  schema: Record<string, unknown>;
  isBuiltIn: boolean;
};

export class ExportTemplate extends ValueObject<ExportTemplateProps> {
  private constructor(props: ExportTemplateProps) { super(props); }
  static create(props: ExportTemplateProps): ExportTemplate { return new ExportTemplate(props); }

  get id(): ExportTemplateId { return this.props.id; }
  get name(): string { return this.props.name; }
  get description(): string { return this.props.description; }
  get format(): ExportFormatType { return this.props.format; }
  get version(): string { return this.props.version; }
  get schema(): Record<string, unknown> { return this.props.schema; }
  get isBuiltIn(): boolean { return this.props.isBuiltIn; }
}
