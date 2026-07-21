import { ValueObject } from "../value-object";
import { EntityId } from "../entity-id";

export class ReportTemplateId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): ReportTemplateId {
    return new ReportTemplateId(value);
  }
}

export type ReportCategory =
  | "CARTEIRA"
  | "PROVENTOS"
  | "RENTABILIDADE"
  | "FISCAL"
  | "PATRIMONIO"
  | "METAS"
  | "REBALANCEAMENTO";

export type ReportExportFormat = "PDF" | "CSV" | "JSON";

export type ReportTemplateProps = {
  id: ReportTemplateId;
  name: string;
  description: string;
  category: ReportCategory;
  supportedFormats: ReportExportFormat[];
  icon: string;
  isBuiltIn: boolean;
}

export class ReportTemplate extends ValueObject<ReportTemplateProps> {
  private constructor(props: ReportTemplateProps) {
    super(props);
  }

  static create(props: ReportTemplateProps): ReportTemplate {
    return new ReportTemplate(props);
  }

  get id(): ReportTemplateId {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get category(): ReportCategory {
    return this.props.category;
  }

  get supportedFormats(): ReportExportFormat[] {
    return this.props.supportedFormats;
  }

  get icon(): string {
    return this.props.icon;
  }

  get isBuiltIn(): boolean {
    return this.props.isBuiltIn;
  }

  supportsFormat(format: ReportExportFormat): boolean {
    return this.props.supportedFormats.includes(format);
  }
}

export const BUILT_IN_TEMPLATES: ReportTemplateProps[] = [
  {
    id: ReportTemplateId.create("carteira-consolidada"),
    name: "Carteira Consolidada",
    description: "Posicao por ativo, alocacao por tipo e valor total da carteira",
    category: "CARTEIRA",
    supportedFormats: ["PDF", "CSV", "JSON"],
    icon: "briefcase",
    isBuiltIn: true,
  },
  {
    id: ReportTemplateId.create("proventos"),
    name: "Proventos",
    description: "Dividendos e JCP recebidos no periodo",
    category: "PROVENTOS",
    supportedFormats: ["PDF", "CSV"],
    icon: "dollar-sign",
    isBuiltIn: true,
  },
  {
    id: ReportTemplateId.create("rentabilidade"),
    name: "Rentabilidade",
    description: "Retorno acumulado por periodo comparado a benchmarks",
    category: "RENTABILIDADE",
    supportedFormats: ["PDF", "JSON"],
    icon: "trending-up",
    isBuiltIn: true,
  },
  {
    id: ReportTemplateId.create("posicao-fiscal"),
    name: "Posicao Fiscal",
    description: "IRPF mensal, ganho de capital e operacoes day-trade",
    category: "FISCAL",
    supportedFormats: ["CSV", "JSON"],
    icon: "file-text",
    isBuiltIn: true,
  },
  {
    id: ReportTemplateId.create("evolucao-patrimonial"),
    name: "Evolucao Patrimonial",
    description: "Valor total, invested e lucro acumulado em serie temporal",
    category: "PATRIMONIO",
    supportedFormats: ["PDF", "CSV", "JSON"],
    icon: "bar-chart",
    isBuiltIn: true,
  },
  {
    id: ReportTemplateId.create("metas"),
    name: "Metas",
    description: "Progressao de metas financeiras",
    category: "METAS",
    supportedFormats: ["PDF", "CSV"],
    icon: "target",
    isBuiltIn: true,
  },
  {
    id: ReportTemplateId.create("rebalanceamento"),
    name: "Rebalanceamento",
    description: "Alocacao atual vs. alvo e sugestoes de aporte",
    category: "REBALANCEAMENTO",
    supportedFormats: ["PDF", "CSV"],
    icon: "pie-chart",
    isBuiltIn: true,
  },
];
