export abstract class EntityId<T = string> {
  public readonly value: T;

  constructor(value: T) {
    this.value = value;
    Object.freeze(this);
  }

  equals(other: unknown): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (this.constructor.name !== (other as object).constructor.name) {
      return false;
    }
    if (!(other instanceof EntityId)) {
      return false;
    }
    return this.value === other.value;
  }
}
