export abstract class ValueObject<T extends Record<string, unknown>> {
  public readonly props: Readonly<T>;

  constructor(props: T) {
    this.props = Object.freeze({ ...props }) as Readonly<T>;
    Object.freeze(this);
  }

  equals(other: unknown): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (this.constructor.name !== (other as object).constructor.name) {
      return false;
    }
    if (!(other instanceof ValueObject)) {
      return false;
    }
    return ValueObject.deepEquals(this.props, other.props);
  }

  private static deepEquals(a: unknown, b: unknown): boolean {
    if (a === b) return true;
    if (a === null || b === null || a === undefined || b === undefined) return false;
    if (typeof a !== typeof b) return false;
    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((val, idx) => ValueObject.deepEquals(val, b[idx]));
    }
    if (typeof a === "object" && typeof b === "object") {
      if (Array.isArray(a) || Array.isArray(b)) return false;
      const keysA = Object.keys(a as Record<string, unknown>);
      const keysB = Object.keys(b as Record<string, unknown>);
      if (keysA.length !== keysB.length) return false;
      return keysA.every((key) =>
        ValueObject.deepEquals(
          (a as Record<string, unknown>)[key],
          (b as Record<string, unknown>)[key],
        ),
      );
    }
    return a === b;
  }
}
