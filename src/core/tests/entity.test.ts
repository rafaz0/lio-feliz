import { describe, it, expect } from "vitest";
import { EntityId, Entity } from "@/core/domain";

class TestId extends EntityId<string> {
  constructor(value: string) {
    super(value);
  }
}

class TestNumericId extends EntityId<number> {
  constructor(value: number) {
    super(value);
  }
}

class TestEntity extends Entity<TestId> {
  constructor(
    id: TestId,
    public name: string,
  ) {
    super(id);
  }
}

class TestOtherEntity extends Entity<TestId> {
  constructor(id: TestId) {
    super(id);
  }
}

describe("EntityId", () => {
  describe("creation", () => {
    it("creates an EntityId with a value", () => {
      const id = new TestId("abc-123");
      expect(id.value).toBe("abc-123");
    });

    it("accepts non-string types", () => {
      const id = new TestNumericId(42);
      expect(id.value).toBe(42);
    });
  });

  describe("equals", () => {
    it("returns true for identical values", () => {
      const a = new TestId("abc");
      const b = new TestId("abc");
      expect(a.equals(b)).toBe(true);
    });

    it("returns false for different values", () => {
      const a = new TestId("abc");
      const b = new TestId("xyz");
      expect(a.equals(b)).toBe(false);
    });

    it("returns false when comparing with null", () => {
      const id = new TestId("abc");
      expect(id.equals(null)).toBe(false);
    });

    it("returns false when comparing with undefined", () => {
      const id = new TestId("abc");
      expect(id.equals(undefined)).toBe(false);
    });
  });

  describe("immutability", () => {
    it("freezes the instance", () => {
      const id = new TestId("abc");
      expect(() => {
        (id as { value: string }).value = "xyz";
      }).toThrow();
    });

    it("prevents adding new properties", () => {
      const id = new TestId("abc");
      expect(() => {
        (id as Record<string, unknown>).extra = true;
      }).toThrow();
    });
  });
});

describe("Entity", () => {
  describe("equality by id", () => {
    it("returns true for identical IDs", () => {
      const id = new TestId("abc");
      const a = new TestEntity(id, "Alice");
      const b = new TestEntity(id, "Alice");
      expect(a.equals(b)).toBe(true);
    });

    it("returns true for separate instances with same ID value", () => {
      const a = new TestEntity(new TestId("abc"), "Alice");
      const b = new TestEntity(new TestId("abc"), "Bob");
      expect(a.equals(b)).toBe(true);
    });

    it("returns false for different IDs", () => {
      const a = new TestEntity(new TestId("abc"), "Alice");
      const b = new TestEntity(new TestId("xyz"), "Alice");
      expect(a.equals(b)).toBe(false);
    });

    it("state changes do not affect equality", () => {
      const a = new TestEntity(new TestId("abc"), "Alice");
      const b = new TestEntity(new TestId("abc"), "Bob");
      const c = new TestEntity(new TestId("xyz"), "Alice");
      expect(a.equals(b)).toBe(true);
      expect(a.equals(c)).toBe(false);
      expect(b.equals(c)).toBe(false);
    });
  });

  describe("type safety", () => {
    it("returns false for different entity types", () => {
      const id = new TestId("abc");
      const entity = new TestEntity(id, "Alice");
      const other = new TestOtherEntity(id);
      expect(entity.equals(other)).toBe(false);
    });
  });

  describe("null/undefined", () => {
    it("returns false when comparing with null", () => {
      const entity = new TestEntity(new TestId("abc"), "Alice");
      expect(entity.equals(null)).toBe(false);
    });

    it("returns false when comparing with undefined", () => {
      const entity = new TestEntity(new TestId("abc"), "Alice");
      expect(entity.equals(undefined)).toBe(false);
    });
  });

  describe("id access", () => {
    it("exposes the id", () => {
      const id = new TestId("abc");
      const entity = new TestEntity(id, "Alice");
      expect(entity.id.equals(id)).toBe(true);
      expect(entity.id.value).toBe("abc");
    });
  });
});
