import type { EntityId } from "./entity-id";

export abstract class Entity<TId extends EntityId> {
  public readonly id: TId;

  constructor(id: TId) {
    this.id = id;
  }

  equals(other: unknown): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (this.constructor.name !== (other as object).constructor.name) {
      return false;
    }
    if (!(other instanceof Entity)) {
      return false;
    }
    return this.id.equals(other.id);
  }
}
