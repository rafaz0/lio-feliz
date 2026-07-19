import { describe, it, expect, beforeEach } from "vitest";
import { ImportInterpreter } from "@/infrastructure/interpreters/import-interpreter";
import {
  BuyEvent,
  SellEvent,
  DividendEvent,
  JcpEvent,
  BonusEvent,
  SplitEvent,
  GroupingEvent,
  AmortizationEvent,
  AdjustmentEvent,
} from "@/core/domain/portfolio";

describe("ImportInterpreter", () => {
  let interpreter: ImportInterpreter;
  const portfolioId = "portfolio-1";
  const correlationId = "corr-1";

  beforeEach(() => {
    interpreter = new ImportInterpreter();
  });

  describe("InterpretarOperacao", () => {
    it("converts BUY to BuyEvent", () => {
      const op = { tipo: "BUY", ativo: "PETR4", quantidade: 100, valor: 25.50, data: new Date() };
      const event = interpreter.InterpretarOperacao(op, portfolioId, correlationId);

      expect(event).toBeInstanceOf(BuyEvent);
      expect(event.assetId).toBe("PETR4");
      expect(event.quantity).toBe(100);
      expect(event.price).toBe(25.50);
    });

    it("converts SELL to SellEvent", () => {
      const op = { tipo: "SELL", ativo: "VALE3", quantidade: 50, valor: 78.30, data: new Date() };
      const event = interpreter.InterpretarOperacao(op, portfolioId, correlationId);

      expect(event).toBeInstanceOf(SellEvent);
      expect(event.assetId).toBe("VALE3");
      expect(event.quantity).toBe(50);
    });

    it("converts DIVIDEND to DividendEvent", () => {
      const op = { tipo: "DIVIDEND", ativo: "PETR4", quantidade: 100, valor: 2.50, data: new Date() };
      const event = interpreter.InterpretarOperacao(op, portfolioId, correlationId);

      expect(event).toBeInstanceOf(DividendEvent);
      expect(event.assetId).toBe("PETR4");
      expect(event.shares).toBe(100);
      expect(event.amountPerShare).toBe(2.50);
    });

    it("converts JCP to JcpEvent", () => {
      const op = { tipo: "JCP", ativo: "PETR4", quantidade: 100, valor: 1.50, data: new Date() };
      const event = interpreter.InterpretarOperacao(op, portfolioId, correlationId);

      expect(event).toBeInstanceOf(JcpEvent);
    });

    it("converts BONUS to BonusEvent", () => {
      const op = { tipo: "BONUS", ativo: "PETR4", quantidade: 100, valor: 0.1, data: new Date() };
      const event = interpreter.InterpretarOperacao(op, portfolioId, correlationId);

      expect(event).toBeInstanceOf(BonusEvent);
      expect(event.sharesHeld).toBe(100);
      expect(event.bonusRatio).toBe(0.1);
    });

    it("converts SPLIT to SplitEvent", () => {
      const op = { tipo: "SPLIT", ativo: "PETR4", quantidade: 1, valor: 2, data: new Date() };
      const event = interpreter.InterpretarOperacao(op, portfolioId, correlationId);

      expect(event).toBeInstanceOf(SplitEvent);
      expect(event.oldQuantity).toBe(1);
      expect(event.newQuantity).toBe(2);
    });

    it("converts GROUPING to GroupingEvent", () => {
      const op = { tipo: "GROUPING", ativo: "PETR4", quantidade: 10, valor: 1, data: new Date() };
      const event = interpreter.InterpretarOperacao(op, portfolioId, correlationId);

      expect(event).toBeInstanceOf(GroupingEvent);
      expect(event.oldQuantity).toBe(10);
      expect(event.newQuantity).toBe(1);
    });

    it("converts AMORTIZATION to AmortizationEvent", () => {
      const op = { tipo: "AMORTIZATION", ativo: "PETR4", quantidade: 100, valor: 0.50, data: new Date() };
      const event = interpreter.InterpretarOperacao(op, portfolioId, correlationId);

      expect(event).toBeInstanceOf(AmortizationEvent);
    });

    it("converts ADJUSTMENT to AdjustmentEvent", () => {
      const op = { tipo: "ADJUSTMENT", ativo: "PETR4", quantidade: 100, valor: 500, data: new Date(), observacao: "Correcao" };
      const event = interpreter.InterpretarOperacao(op, portfolioId, correlationId);

      expect(event).toBeInstanceOf(AdjustmentEvent);
      expect(event.description).toBe("Correcao");
    });

    it("uppercases ativo and tipo", () => {
      const op = { tipo: "buy", ativo: "petr4", quantidade: 10, valor: 25, data: new Date() };
      const event = interpreter.InterpretarOperacao(op, portfolioId, correlationId);

      expect(event).toBeInstanceOf(BuyEvent);
      expect(event.assetId).toBe("PETR4");
    });

    it("throws for unknown tipo", () => {
      const op = { tipo: "UNKNOWN", ativo: "XXX", quantidade: 0, valor: 0, data: new Date() };

      expect(() => interpreter.InterpretarOperacao(op, portfolioId, correlationId)).toThrow(
        "Tipo de operacao desconhecido: UNKNOWN",
      );
    });

    it("uses default description for ADJUSTMENT when observacao is empty", () => {
      const op = { tipo: "ADJUSTMENT", ativo: "PETR4", quantidade: 10, valor: 100, data: new Date() };
      const event = interpreter.InterpretarOperacao(op, portfolioId, correlationId) as AdjustmentEvent;

      expect(event.description).toBe("Ajuste manual");
    });
  });
});
