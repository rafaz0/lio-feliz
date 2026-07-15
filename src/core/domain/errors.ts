export class DomainError {
  public readonly code: string;
  public readonly message: string;
  public readonly type: string;

  constructor(code: string, message: string, type: string = "DOMAIN_ERROR") {
    this.code = code;
    this.message = message;
    this.type = type;
    Object.freeze(this);
  }

  equals(other: DomainError): boolean {
    return this.code === other.code && this.message === other.message && this.type === other.type;
  }
}
