import { describe, it, expect } from "vitest";
import { ValueObject } from "@/core/domain";

class TestName extends ValueObject<{ first: string; last: string }> {
  constructor(first: string, last: string) {
    super({ first, last });
  }

  get fullName(): string {
    return `${this.props.first} ${this.props.last}`;
  }
}

class TestAge extends ValueObject<{ age: number }> {
  constructor(age: number) {
    super({ age });
  }
}

class TestNested extends ValueObject<{ name: TestName; score: number }> {
  constructor(name: TestName, score: number) {
    super({ name, score });
  }
}

class TestWithDates extends ValueObject<{ created: Date; label: string }> {
  constructor(created: Date, label: string) {
    super({ created, label });
  }
}

describe("ValueObject", () => {
  describe("creation", () => {
    it("creates a ValueObject with props", () => {
      const name = new TestName("John", "Doe");
      expect(name.props.first).toBe("John");
      expect(name.props.last).toBe("Doe");
    });

    it("exposes fullName via getter", () => {
      const name = new TestName("John", "Doe");
      expect(name.fullName).toBe("John Doe");
    });

    it("props are readonly", () => {
      const name = new TestName("John", "Doe");
      expect(() => {
        (name.props as { first: string }).first = "Jane";
      }).toThrow();
    });
  });

  describe("equals", () => {
    it("returns true for identical values", () => {
      const a = new TestName("John", "Doe");
      const b = new TestName("John", "Doe");
      expect(a.equals(b)).toBe(true);
    });

    it("returns false for different values", () => {
      const a = new TestName("John", "Doe");
      const b = new TestName("Jane", "Doe");
      expect(a.equals(b)).toBe(false);
    });

    it("returns false for different types", () => {
      const name = new TestName("John", "Doe");
      const age = new TestAge(30);
      expect(name.equals(age)).toBe(false);
    });

    it("returns true for separate instances with same content", () => {
      const a = new TestName("Alice", "Smith");
      const b = new TestName("Alice", "Smith");
      expect(a === b).toBe(false);
      expect(a.equals(b)).toBe(true);
    });

    it("returns false when comparing with null", () => {
      const name = new TestName("John", "Doe");
      expect(name.equals(null)).toBe(false);
    });

    it("returns false when comparing with undefined", () => {
      const name = new TestName("John", "Doe");
      expect(name.equals(undefined)).toBe(false);
    });

    it("returns false when comparing with a plain object", () => {
      const name = new TestName("John", "Doe");
      expect(name.equals({ first: "John", last: "Doe" })).toBe(false);
    });

    it("compares nested ValueObjects by value", () => {
      const name1 = new TestName("John", "Doe");
      const name2 = new TestName("John", "Doe");
      const a = new TestNested(name1, 100);
      const b = new TestNested(name2, 100);
      expect(a.equals(b)).toBe(true);
    });

    it("returns false for nested ValueObjects with different inner values", () => {
      const name1 = new TestName("John", "Doe");
      const name2 = new TestName("Jane", "Doe");
      const a = new TestNested(name1, 100);
      const b = new TestNested(name2, 100);
      expect(a.equals(b)).toBe(false);
    });

    it("compares Date values correctly", () => {
      const d1 = new Date("2024-01-01");
      const d2 = new Date("2024-01-01");
      const d3 = new Date("2024-06-15");
      const a = new TestWithDates(d1, "test");
      const b = new TestWithDates(d2, "test");
      const c = new TestWithDates(d3, "test");
      expect(a.equals(b)).toBe(true);
      expect(a.equals(c)).toBe(false);
    });

    it("compares arrays correctly", () => {
      class WithArray extends ValueObject<{ tags: string[] }> {
        constructor(tags: string[]) {
          super({ tags });
        }
      }
      const a = new WithArray(["a", "b"]);
      const b = new WithArray(["a", "b"]);
      const c = new WithArray(["a", "c"]);
      expect(a.equals(b)).toBe(true);
      expect(a.equals(c)).toBe(false);
    });
  });

  describe("immutability", () => {
    it("freezes the instance", () => {
      const name = new TestName("John", "Doe");
      expect(() => {
        (name as { fullName: string }).fullName = "Changed";
      }).toThrow();
    });

    it("freezes the props object", () => {
      const name = new TestName("John", "Doe");
      expect(() => {
        (name.props as { first: string }).first = "Jane";
      }).toThrow();
    });

    it("prevents adding new properties", () => {
      const name = new TestName("John", "Doe");
      expect(() => {
        (name as Record<string, unknown>).extra = true;
      }).toThrow();
    });
  });
});
