import { describe, it, expect } from "vitest";
import { Position } from "@/core/domain/portfolio";
import { Ticker, Quantity, Money } from "@/core/domain";

describe("Position", () => {
  describe("creation", () => {
    it("creates a position with ticker, quantity, avgCost and totalCost", () => {
      const ticker = Ticker.create("PETR4");
      const quantity = Quantity.create(100);
      const avgCost = Money.create(25.5);
      const totalCost = Money.create(2550);
      const position = Position.create(ticker, quantity, avgCost, totalCost);
      expect(position.getTicker().equals(ticker)).toBe(true);
      expect(position.getQuantity().equals(quantity)).toBe(true);
      expect(position.getAvgCost().equals(avgCost)).toBe(true);
      expect(position.getTotalCost().equals(totalCost)).toBe(true);
    });

    it("creates a position with zero values", () => {
      const ticker = Ticker.create("PETR4");
      const quantity = Quantity.create(0);
      const avgCost = Money.create(0);
      const totalCost = Money.create(0);
      const position = Position.create(ticker, quantity, avgCost, totalCost);
      expect(position.getQuantity().getValue()).toBe(0);
      expect(position.getTotalCost().getValue()).toBe(0);
    });
  });

  describe("immutability", () => {
    it("freezes the instance", () => {
      const ticker = Ticker.create("PETR4");
      const position = Position.create(
        ticker,
        Quantity.create(100),
        Money.create(25.5),
        Money.create(2550),
      );
      expect(() => {
        (position as Record<string, unknown>).extra = true;
      }).toThrow();
    });

    it("props are frozen", () => {
      const ticker = Ticker.create("PETR4");
      const position = Position.create(
        ticker,
        Quantity.create(100),
        Money.create(25.5),
        Money.create(2550),
      );
      expect(Object.isFrozen(position.props)).toBe(true);
    });
  });

  describe("equality", () => {
    it("positions with same values are equal", () => {
      const ticker = Ticker.create("PETR4");
      const qty = Quantity.create(100);
      const cost = Money.create(25.5);
      const total = Money.create(2550);
      const a = Position.create(ticker, qty, cost, total);
      const b = Position.create(
        Ticker.create("PETR4"),
        Quantity.create(100),
        Money.create(25.5),
        Money.create(2550),
      );
      expect(a.equals(b)).toBe(true);
    });

    it("positions with different values are not equal", () => {
      const ticker = Ticker.create("PETR4");
      const a = Position.create(
        ticker,
        Quantity.create(100),
        Money.create(25.5),
        Money.create(2550),
      );
      const b = Position.create(
        ticker,
        Quantity.create(200),
        Money.create(25.5),
        Money.create(5100),
      );
      expect(a.equals(b)).toBe(false);
    });
  });

  describe("accessors", () => {
    it("returns ticker via getTicker", () => {
      const ticker = Ticker.create("VALE3");
      const position = Position.create(
        ticker,
        Quantity.create(50),
        Money.create(60),
        Money.create(3000),
      );
      expect(position.getTicker().getValue()).toBe("VALE3");
    });

    it("returns quantity via getQuantity", () => {
      const position = Position.create(
        Ticker.create("VALE3"),
        Quantity.create(50),
        Money.create(60),
        Money.create(3000),
      );
      expect(position.getQuantity().getValue()).toBe(50);
    });

    it("returns avgCost via getAvgCost", () => {
      const position = Position.create(
        Ticker.create("VALE3"),
        Quantity.create(50),
        Money.create(60),
        Money.create(3000),
      );
      expect(position.getAvgCost().getValue()).toBe(60);
    });

    it("returns totalCost via getTotalCost", () => {
      const position = Position.create(
        Ticker.create("VALE3"),
        Quantity.create(50),
        Money.create(60),
        Money.create(3000),
      );
      expect(position.getTotalCost().getValue()).toBe(3000);
    });
  });

  describe("validation via composed VOs", () => {
    it("rejects negative quantity", () => {
      expect(Quantity.isValid(-1)).toBe(false);
    });

    it("rejects negative monetary values", () => {
      expect(Money.isValid(-10)).toBe(false);
    });

    it("accepts valid positions", () => {
      const ticker = Ticker.create("ITUB4");
      const qty = Quantity.create(100);
      const cost = Money.create(30);
      const total = Money.create(3000);
      expect(Ticker.isValid("ITUB4")).toBe(true);
      expect(Quantity.isValid(100)).toBe(true);
      expect(Money.isValid(30)).toBe(true);
      expect(Money.isValid(3000)).toBe(true);
      const position = Position.create(ticker, qty, cost, total);
      expect(position).toBeInstanceOf(Position);
    });
  });
});
