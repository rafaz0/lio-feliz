import { describe, it, expect } from "vitest";
import { Quantity } from "@/core/domain";

describe("Quantity", () => {
  describe("creation", () => {
    it("creates a positive quantity", () => {
      const qty = Quantity.create(100);
      expect(qty.getValue()).toBe(100);
    });

    it("creates zero quantity", () => {
      const qty = Quantity.create(0);
      expect(qty.getValue()).toBe(0);
    });

    it("creates decimal quantity", () => {
      const qty = Quantity.create(10.5);
      expect(qty.getValue()).toBe(10.5);
    });

    it("creates integer quantity", () => {
      const qty = Quantity.create(42);
      expect(qty.getValue()).toBe(42);
    });
  });

  describe("validation", () => {
    it("rejects negative numbers", () => {
      expect(Quantity.isValid(-1)).toBe(false);
    });

    it("rejects NaN", () => {
      expect(Quantity.isValid(NaN)).toBe(false);
    });

    it("rejects Infinity", () => {
      expect(Quantity.isValid(Infinity)).toBe(false);
    });

    it("rejects -Infinity", () => {
      expect(Quantity.isValid(-Infinity)).toBe(false);
    });

    it("accepts zero", () => {
      expect(Quantity.isValid(0)).toBe(true);
    });

    it("accepts positive numbers", () => {
      expect(Quantity.isValid(1)).toBe(true);
      expect(Quantity.isValid(999)).toBe(true);
    });

    it("rejects non-number types", () => {
      expect(Quantity.isValid("5" as unknown as number)).toBe(false);
    });
  });

  describe("equality", () => {
    it("equal quantities are equal", () => {
      const a = Quantity.create(100);
      const b = Quantity.create(100);
      expect(a.equals(b)).toBe(true);
    });

    it("different quantities are not equal", () => {
      const a = Quantity.create(100);
      const b = Quantity.create(200);
      expect(a.equals(b)).toBe(false);
    });
  });

  describe("value", () => {
    it("returns the stored value", () => {
      const qty = Quantity.create(42.5);
      expect(qty.getValue()).toBe(42.5);
    });

    it("props value matches getter", () => {
      const qty = Quantity.create(7);
      expect(qty.props.value).toBe(7);
      expect(qty.getValue()).toBe(7);
    });
  });
});
