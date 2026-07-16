import { describe, it, expect } from "vitest";
import { Money } from "@/core/domain";

describe("Money", () => {
  describe("creation", () => {
    it("creates money with valid amount", () => {
      const money = Money.create(100.5);
      expect(money.getValue()).toBe(100.5);
    });

    it("defaults to BRL currency", () => {
      const money = Money.create(50);
      expect(money.getCurrency()).toBe("BRL");
    });

    it("accepts custom currency", () => {
      const money = Money.create(200, "USD");
      expect(money.getCurrency()).toBe("USD");
    });

    it("normalizes currency to uppercase", () => {
      const money = Money.create(10, "usd");
      expect(money.getCurrency()).toBe("USD");
    });

    it("creates zero money", () => {
      const money = Money.create(0);
      expect(money.getValue()).toBe(0);
    });
  });

  describe("rounding", () => {
    it("rounds to 2 decimal places", () => {
      const money = Money.create(10.456);
      expect(money.getValue()).toBe(10.46);
    });

    it("rounds down correctly", () => {
      const money = Money.create(10.453);
      expect(money.getValue()).toBe(10.45);
    });

    it("preserves 2 decimal places when already rounded", () => {
      const money = Money.create(99.99);
      expect(money.getValue()).toBe(99.99);
    });

    it("handles integer values", () => {
      const money = Money.create(42);
      expect(money.getValue()).toBe(42);
    });
  });

  describe("validation", () => {
    it("rejects NaN", () => {
      expect(Money.isValid(NaN)).toBe(false);
    });

    it("rejects Infinity", () => {
      expect(Money.isValid(Infinity)).toBe(false);
    });

    it("rejects -Infinity", () => {
      expect(Money.isValid(-Infinity)).toBe(false);
    });

    it("rejects negative amounts", () => {
      expect(Money.isValid(-1)).toBe(false);
    });

    it("rejects empty currency", () => {
      expect(Money.isValid(100, "")).toBe(false);
    });

    it("accepts valid values", () => {
      expect(Money.isValid(0)).toBe(true);
      expect(Money.isValid(1)).toBe(true);
      expect(Money.isValid(999.99)).toBe(true);
    });

    it("accepts valid custom currency", () => {
      expect(Money.isValid(100, "USD")).toBe(true);
      expect(Money.isValid(100, "EUR")).toBe(true);
    });
  });

  describe("equality", () => {
    it("equal amounts and currencies are equal", () => {
      const a = Money.create(100, "BRL");
      const b = Money.create(100, "BRL");
      expect(a.equals(b)).toBe(true);
    });

    it("different amounts are not equal", () => {
      const a = Money.create(100);
      const b = Money.create(200);
      expect(a.equals(b)).toBe(false);
    });

    it("different currencies are not equal", () => {
      const a = Money.create(100, "BRL");
      const b = Money.create(100, "USD");
      expect(a.equals(b)).toBe(false);
    });

    it("rounded value preserves equality", () => {
      const a = Money.create(10.456);
      const b = Money.create(10.46);
      expect(a.equals(b)).toBe(true);
    });
  });

  describe("accessors", () => {
    it("getValue returns the amount", () => {
      const money = Money.create(150.75);
      expect(money.getValue()).toBe(150.75);
    });

    it("getCurrency returns the currency", () => {
      const money = Money.create(50, "USD");
      expect(money.getCurrency()).toBe("USD");
    });

    it("props reflect constructor arguments after rounding", () => {
      const money = Money.create(10.456, "brl");
      expect(money.props.value).toBe(10.46);
      expect(money.props.currency).toBe("BRL");
    });
  });
});
