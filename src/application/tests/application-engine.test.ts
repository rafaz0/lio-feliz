import { describe, it, expect, vi } from "vitest";
import { DispatcherImpl } from "@/application/dispatcher-impl";
import { Validator, validateRequiredFields } from "@/application/validator";
import type { ICommand, IQuery } from "@/application/types";
import type { IUnitOfWork } from "@/application/ports/unit-of-work";
import {
  ApplicationError,
  ValidationError,
  NotFoundError,
  InternalError,
} from "@/application/errors/application-error";
import {
  convertDomainError,
  convertInfrastructureError,
  convertUnexpectedError,
} from "@/application/error-converter";
import { DomainError } from "@/core/domain";

const FIXTURA_PORTFOLIO = "018f3a6d-9b3a-7c4e-9a1b-2c3d4e5f6789";

describe("Validator", () => {
  describe("validateRequiredFields", () => {
    it("returns null when all required fields present", () => {
      const result = validateRequiredFields({ portfolioId: FIXTURA_PORTFOLIO, tipo: "BUY" }, [
        "portfolioId",
        "tipo",
      ]);
      expect(result).toBeNull();
    });

    it("returns ValidationError when field is missing", () => {
      const result = validateRequiredFields({ portfolioId: FIXTURA_PORTFOLIO }, [
        "portfolioId",
        "tipo",
      ]);
      expect(result).toBeInstanceOf(ValidationError);
      expect(result!.fieldErrors.tipo).toBeDefined();
    });

    it("returns ValidationError when field is null", () => {
      const result = validateRequiredFields({ portfolioId: null }, ["portfolioId"]);
      expect(result).toBeInstanceOf(ValidationError);
    });

    it("returns ValidationError when field is undefined", () => {
      const result = validateRequiredFields({ portfolioId: undefined }, ["portfolioId"]);
      expect(result).toBeInstanceOf(ValidationError);
    });

    it("reports multiple missing fields", () => {
      const result = validateRequiredFields({}, ["fieldA", "fieldB", "fieldC"]);
      expect(result).toBeInstanceOf(ValidationError);
      expect(Object.keys(result!.fieldErrors)).toHaveLength(3);
    });

    it("empty required list returns null", () => {
      const result = validateRequiredFields({}, []);
      expect(result).toBeNull();
    });
  });

  describe("Validator class", () => {
    it("validates required field with type rule", () => {
      const validator = new Validator();
      const result = validator.validate({ portfolioId: FIXTURA_PORTFOLIO }, [
        { field: "portfolioId", required: true },
      ]);
      expect(result).toBeNull();
    });

    it("rejects missing required field with custom message", () => {
      const validator = new Validator();
      const result = validator.validate({}, [
        { field: "portfolioId", required: true, message: "ID do portfolio é obrigatório" },
      ]);
      expect(result).toBeInstanceOf(ValidationError);
      expect(result!.fieldErrors.portfolioId).toContain("ID do portfolio é obrigatório");
    });
  });
});

describe("DispatcherImpl", () => {
  function createDispatcher(uow?: IUnitOfWork): DispatcherImpl {
    return new DispatcherImpl(uow);
  }

  describe("DispatchCommand", () => {
    it("routes command to registered handler and returns DTO", async () => {
      const dispatcher = createDispatcher();
      dispatcher.RegisterCommand("TestCommand", async (cmd) => ({
        operacaoId: "abc-123",
        status: "CONFIRMED",
      }));

      const cmd: ICommand = { type: "TestCommand", portfolioId: FIXTURA_PORTFOLIO } as ICommand;
      const result = await dispatcher.DispatchCommand<Record<string, string>>(cmd);

      expect(result).not.toBeInstanceOf(ApplicationError);
      expect((result as Record<string, string>).operacaoId).toBe("abc-123");
    });

    it("returns NotFoundError when no handler registered", async () => {
      const dispatcher = createDispatcher();
      const cmd: ICommand = { type: "UnknownCommand" } as ICommand;
      const result = await dispatcher.DispatchCommand(cmd);

      expect(result).toBeInstanceOf(NotFoundError);
      expect((result as NotFoundError).resourceType).toBe("Command");
    });

    it("returns InternalError when handler is registered for query", async () => {
      const dispatcher = createDispatcher();
      dispatcher.RegisterQuery("TestQuery", async () => ({}));
      const cmd: ICommand = { type: "TestQuery" } as ICommand;
      const result = await dispatcher.DispatchCommand(cmd);

      expect(result).toBeInstanceOf(InternalError);
    });
  });

  describe("DispatchQuery", () => {
    it("routes query to registered handler and returns DTO", async () => {
      const dispatcher = createDispatcher();
      dispatcher.RegisterQuery("TestQuery", async () => ({
        patrimonioTotal: 500000,
        moeda: "BRL",
      }));

      const query: IQuery = { type: "TestQuery" } as IQuery;
      const result = await dispatcher.DispatchQuery<Record<string, unknown>>(query);

      expect(result).not.toBeInstanceOf(ApplicationError);
      expect((result as Record<string, unknown>).patrimonioTotal).toBe(500000);
    });

    it("returns NotFoundError when no handler registered", async () => {
      const dispatcher = createDispatcher();
      const query: IQuery = { type: "UnknownQuery" } as IQuery;
      const result = await dispatcher.DispatchQuery(query);

      expect(result).toBeInstanceOf(NotFoundError);
    });

    it("routes correctly when multiple handlers registered", async () => {
      const dispatcher = createDispatcher();
      dispatcher.RegisterCommand("Cmd1", async () => ({ result: "cmd1" }));
      dispatcher.RegisterQuery("Qry1", async () => ({ result: "qry1" }));

      const queryResult = await dispatcher.DispatchQuery<Record<string, string>>({
        type: "Qry1",
      } as IQuery);
      const cmdResult = await dispatcher.DispatchCommand<Record<string, string>>({
        type: "Cmd1",
      } as ICommand);

      expect((queryResult as Record<string, string>).result).toBe("qry1");
      expect((cmdResult as Record<string, string>).result).toBe("cmd1");
    });
  });

  describe("Unit of Work integration", () => {
    it("calls Commit on successful command", async () => {
      const commit = vi.fn().mockResolvedValue(undefined);
      const rollback = vi.fn().mockResolvedValue(undefined);
      const uow: IUnitOfWork = {
        IniciarTransacao: vi.fn().mockResolvedValue(undefined),
        Commit: commit,
        Rollback: rollback,
      };

      const dispatcher = createDispatcher(uow);
      dispatcher.RegisterCommand("TestCmd", async () => ({ ok: true }));

      await dispatcher.DispatchCommand({ type: "TestCmd" } as ICommand);

      expect(uow.IniciarTransacao).toHaveBeenCalledOnce();
      expect(commit).toHaveBeenCalledOnce();
      expect(rollback).not.toHaveBeenCalled();
    });

    it("calls Rollback when handler returns ApplicationError", async () => {
      const commit = vi.fn().mockResolvedValue(undefined);
      const rollback = vi.fn().mockResolvedValue(undefined);
      const uow: IUnitOfWork = {
        IniciarTransacao: vi.fn().mockResolvedValue(undefined),
        Commit: commit,
        Rollback: rollback,
      };

      const dispatcher = createDispatcher(uow);
      dispatcher.RegisterCommand("FailCmd", async () => new ValidationError("ERR", "Falhou"));

      const result = await dispatcher.DispatchCommand({ type: "FailCmd" } as ICommand);

      expect(result).toBeInstanceOf(ValidationError);
      expect(commit).not.toHaveBeenCalled();
      expect(rollback).toHaveBeenCalledOnce();
    });

    it("calls Rollback when handler throws", async () => {
      const commit = vi.fn().mockResolvedValue(undefined);
      const rollback = vi.fn().mockResolvedValue(undefined);
      const uow: IUnitOfWork = {
        IniciarTransacao: vi.fn().mockResolvedValue(undefined),
        Commit: commit,
        Rollback: rollback,
      };

      const dispatcher = createDispatcher(uow);
      dispatcher.RegisterCommand("ThrowCmd", async () => {
        throw new Error("Falha inesperada");
      });

      const result = await dispatcher.DispatchCommand({ type: "ThrowCmd" } as ICommand);

      expect(result).toBeInstanceOf(InternalError);
      expect(commit).not.toHaveBeenCalled();
      expect(rollback).toHaveBeenCalledOnce();
    });

    it("does not use UoW when not provided", async () => {
      const dispatcher = createDispatcher();
      dispatcher.RegisterCommand("NoUoW", async () => ({ ok: true }));

      const result = await dispatcher.DispatchCommand({ type: "NoUoW" } as ICommand);

      expect(result).toEqual({ ok: true });
    });
  });
});

describe("ErrorConverter", () => {
  describe("convertDomainError", () => {
    it("converts DomainError to InternalError with sanitized message", () => {
      const domainErr = new DomainError(
        "PORTFOLIO_OUT_OF_ORDER",
        "[INVARIANT] Evento fora de ordem - Valor recebido: 2026-05-01 - Valor esperado: anterior a 2026-03-01 (contexto: validação de ordem)",
        "INVARIANT_VIOLATION",
      );

      const { error, originalMessage } = convertDomainError(domainErr);

      expect(error).toBeInstanceOf(InternalError);
      expect(error.code).toBe("PORTFOLIO_OUT_OF_ORDER");
      expect(originalMessage).toBe(domainErr.message);
      expect(error.message).not.toContain("[INVARIANT]");
      expect(error.message).not.toContain("Valor recebido:");
      expect(error.message).not.toContain("Valor esperado:");
      expect(error.message).not.toContain("contexto:");
    });

    it("preserves semantic description after sanitization", () => {
      const domainErr = new DomainError(
        "PORTFOLIO_OUT_OF_ORDER",
        "Evento fora de ordem - datas não sequenciais",
      );

      const { error } = convertDomainError(domainErr);

      expect(error.message).toContain("Evento fora de ordem");
    });
  });

  describe("convertInfrastructureError", () => {
    it("wraps Error in InternalError with original preserved", () => {
      const original = new Error("Timeout de conexão");
      const result = convertInfrastructureError(original);

      expect(result).toBeInstanceOf(InternalError);
      expect(result.code).toBe("INFRASTRUCTURE_ERROR");
      expect(result.message).toBe("Erro interno inesperado");
      expect(result.originalError).toBe(original);
    });
  });

  describe("convertUnexpectedError", () => {
    it("converts Error object", () => {
      const result = convertUnexpectedError(new Error("Algo inesperado"));
      expect(result).toBeInstanceOf(InternalError);
      expect(result.originalError!.message).toBe("Algo inesperado");
    });

    it("converts string as unknown error", () => {
      const result = convertUnexpectedError("erro qualquer");
      expect(result).toBeInstanceOf(InternalError);
    });

    it("converts null as unknown error", () => {
      const result = convertUnexpectedError(null);
      expect(result).toBeInstanceOf(InternalError);
    });
  });
});

describe("Dispatcher Integration with ErrorConverter", () => {
  it("wraps thrown errors from handler as InternalError", async () => {
    const dispatcher = new DispatcherImpl();
    dispatcher.RegisterCommand("CrashCmd", async () => {
      throw new Error("Erro grave");
    });

    const result = await dispatcher.DispatchCommand({ type: "CrashCmd" } as ICommand);

    expect(result).toBeInstanceOf(InternalError);
    expect((result as InternalError).originalError).toBeDefined();
  });

  it("wraps thrown errors from UoW methods", async () => {
    const uow: IUnitOfWork = {
      IniciarTransacao: async () => {
        throw new Error("Falha na transação");
      },
      Commit: async () => {},
      Rollback: async () => {},
    };

    const dispatcher = new DispatcherImpl(uow);
    dispatcher.RegisterCommand("UoWFail", async () => ({ ok: true }));

    const result = await dispatcher.DispatchCommand({ type: "UoWFail" } as ICommand);

    expect(result).toBeInstanceOf(InternalError);
  });
});
