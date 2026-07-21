import { ValueObject } from "../value-object";
import { EntityId } from "../entity-id";

export class IntegrationConfigId extends EntityId {
  private constructor(value: string) {
    super(value);
  }
  static create(value?: string): IntegrationConfigId {
    return new IntegrationConfigId(value ?? crypto.randomUUID());
  }
}

export type IntegrationProvider = "BRAPI" | "YAHOO_FINANCE" | "BANCO_INTER" | "XP_INVESTIMENTOS" | "CUSTOM";
export type IntegrationAuthType = "API_KEY" | "OAUTH2" | "BASIC_AUTH" | "NONE";
export type IntegrationStatus = "ACTIVE" | "INACTIVE" | "ERROR" | "PENDING";

export interface IntegrationConfigProps {
  id: IntegrationConfigId;
  provider: IntegrationProvider;
  name: string;
  authType: IntegrationAuthType;
  status: IntegrationStatus;
  lastSyncAt?: Date;
  errorMessage?: string;
  configData: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

export class IntegrationConfig extends ValueObject<IntegrationConfig> {
  private constructor(private readonly props: IntegrationConfigProps) { super(); }

  get id(): IntegrationConfigId { return this.props.id; }
  get provider(): IntegrationProvider { return this.props.provider; }
  get name(): string { return this.props.name; }
  get authType(): IntegrationAuthType { return this.props.authType; }
  get status(): IntegrationStatus { return this.props.status; }
  get lastSyncAt(): Date | undefined { return this.props.lastSyncAt; }
  get errorMessage(): string | undefined { return this.props.errorMessage; }
  get configData(): Record<string, string> { return { ...this.props.configData }; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }

  static create(props: {
    provider: IntegrationProvider;
    name: string;
    authType: IntegrationAuthType;
    configData: Record<string, string>;
  }): IntegrationConfig {
    return new IntegrationConfig({
      id: IntegrationConfigId.create(),
      provider: props.provider,
      name: props.name,
      authType: props.authType,
      status: "PENDING",
      configData: props.configData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  activate(): void {
    this.props.status = "ACTIVE";
    this.props.updatedAt = new Date();
  }

  deactivate(): void {
    this.props.status = "INACTIVE";
    this.props.updatedAt = new Date();
  }

  markError(message: string): void {
    this.props.status = "ERROR";
    this.props.errorMessage = message;
    this.props.updatedAt = new Date();
  }

  recordSync(): void {
    this.props.lastSyncAt = new Date();
    this.props.status = "ACTIVE";
    this.props.errorMessage = undefined;
    this.props.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.props.id.value,
      provider: this.props.provider,
      name: this.props.name,
      authType: this.props.authType,
      status: this.props.status,
      lastSyncAt: this.props.lastSyncAt?.toISOString(),
      errorMessage: this.props.errorMessage,
      configData: this.props.configData,
      createdAt: this.props.createdAt.toISOString(),
      updatedAt: this.props.updatedAt.toISOString(),
    };
  }

  static fromJSON(data: ReturnType<IntegrationConfig["toJSON"]>): IntegrationConfig {
    const instance = Object.create(IntegrationConfig.prototype);
    instance.props = {
      id: IntegrationConfigId.create(data.id),
      provider: data.provider,
      name: data.name,
      authType: data.authType,
      status: data.status,
      lastSyncAt: data.lastSyncAt ? new Date(data.lastSyncAt) : undefined,
      errorMessage: data.errorMessage,
      configData: { ...data.configData },
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
    return instance;
  }
}
