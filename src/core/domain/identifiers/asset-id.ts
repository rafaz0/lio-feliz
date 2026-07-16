import { EntityId } from "@/core/domain";

const UUID_V7_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class AssetId extends EntityId<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): AssetId {
    return new AssetId(value);
  }

  getValue(): string {
    return this.value;
  }

  static isValid(value: string): boolean {
    if (typeof value !== "string") return false;
    return UUID_V7_REGEX.test(value);
  }
}
