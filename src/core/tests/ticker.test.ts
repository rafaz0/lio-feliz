import { describe, it, expect } from "vitest";
import { Ticker } from "@/core/domain";

describe("Ticker", () => {
  describe("creation", () => {
    it("creates a valid ticker", () => {
      const ticker = Ticker.create("PETR4");
      expect(ticker.getValue()).toBe("PETR4");
      expect(ticker.props.value).toBe("PETR4");
    });

    it("normalizes to uppercase", () => {
      const ticker = Ticker.create("vale3");
      expect(ticker.getValue()).toBe("VALE3");
    });

    it("trims spaces", () => {
      const ticker = Ticker.create("  itub4  ");
      expect(ticker.getValue()).toBe("ITUB4");
    });

    it("handles mixed case and spaces", () => {
      const ticker = Ticker.create("  Mxrf11  ");
      expect(ticker.getValue()).toBe("MXRF11");
    });

    it("accepts US tickers", () => {
      const ticker = Ticker.create("AAPL");
      expect(ticker.getValue()).toBe("AAPL");
    });

    it("accepts FII tickers", () => {
      const ticker = Ticker.create("knri11");
      expect(ticker.getValue()).toBe("KNRI11");
    });

    it("accepts BDR tickers", () => {
      const ticker = Ticker.create("aapl34");
      expect(ticker.getValue()).toBe("AAPL34");
    });
  });

  describe("validation", () => {
    it("rejects empty string", () => {
      expect(Ticker.isValid("")).toBe(false);
    });

    it("rejects whitespace-only string", () => {
      expect(Ticker.isValid("   ")).toBe(false);
    });

    it("rejects tickers with special characters", () => {
      expect(Ticker.isValid("PETR$")).toBe(false);
      expect(Ticker.isValid("VA.LE")).toBe(false);
      expect(Ticker.isValid("ITUB-4")).toBe(false);
    });

    it("rejects tickers with spaces inside", () => {
      expect(Ticker.isValid("PE TR4")).toBe(false);
    });

    it("accepts alphanumeric tickers", () => {
      expect(Ticker.isValid("PETR4")).toBe(true);
      expect(Ticker.isValid("VALE3")).toBe(true);
      expect(Ticker.isValid("BOVA11")).toBe(true);
      expect(Ticker.isValid("AAPL")).toBe(true);
    });
  });

  describe("equality", () => {
    it("equal tickers are equal", () => {
      const a = Ticker.create("PETR4");
      const b = Ticker.create("PETR4");
      expect(a.equals(b)).toBe(true);
    });

    it("different tickers are not equal", () => {
      const a = Ticker.create("PETR4");
      const b = Ticker.create("VALE3");
      expect(a.equals(b)).toBe(false);
    });

    it("normalization preserves equality", () => {
      const a = Ticker.create("petr4");
      const b = Ticker.create("PETR4");
      expect(a.equals(b)).toBe(true);
    });

    it("trimmed ticker equals non-trimmed", () => {
      const a = Ticker.create("ITUB4");
      const b = Ticker.create("  itub4  ");
      expect(a.equals(b)).toBe(true);
    });
  });

  describe("value", () => {
    it("returns the normalized value", () => {
      const ticker = Ticker.create("  vale3  ");
      expect(ticker.getValue()).toBe("VALE3");
    });
  });
});
