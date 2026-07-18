import { describe, it, expect, vi } from "vitest";
import { ConfigurarEstrategiaService } from "@/application/services/configurar-estrategia-service";
import type { ConfigurarEstrategiaCommand } from "@/application/commands/configurar-estrategia";
import type { IConfigurationRepository } from "@/application/ports/configuration-repository";
import { ApplicationError, ValidationError } from "@/application/errors/application-error";

const FIXTURA_USUARIO = "user-018f";

function createService(configRepo?: IConfigurationRepository): ConfigurarEstrategiaService {
  return new ConfigurarEstrategiaService(
    configRepo ?? {
      ObterEstrategia: vi.fn(),
      SalvarEstrategia: vi.fn(),
      ObterMetas: vi.fn(),
      SalvarMetas: vi.fn(),
    },
  );
}

function createCommand(
  overrides?: Partial<ConfigurarEstrategiaCommand>,
): ConfigurarEstrategiaCommand {
  return {
    type: "ConfigurarEstrategiaCommand",
    usuarioId: FIXTURA_USUARIO,
    percentuais: { stock: 60, fii: 30, fixed_income: 10 },
    moeda: "BRL",
    toleranciaRebalanceamento: 5,
    ...overrides,
  };
}

describe("ConfigurarEstrategiaService", () => {
  describe("Execute", () => {
    it("saves strategy and returns DTO", async () => {
      const salvarEstrategia = vi.fn().mockResolvedValue(undefined);
      const salvarMetas = vi.fn().mockResolvedValue(undefined);
      const repo: IConfigurationRepository = {
        ObterEstrategia: vi.fn(),
        SalvarEstrategia: salvarEstrategia,
        ObterMetas: vi.fn(),
        SalvarMetas: salvarMetas,
      };
      const service = createService(repo);
      const command = createCommand({
        metas: [{ nome: "Reserva", valorAlvo: 100000, prazo: new Date("2027-12-31") }],
      });

      const result = await service.Execute(command);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/estrategia").EstrategiaConfiguradaDto;
      expect(dto.usuarioId).toBe(FIXTURA_USUARIO);
      expect(dto.percentuais.stock).toBe(60);
      expect(dto.moeda).toBe("BRL");
      expect(salvarEstrategia).toHaveBeenCalledOnce();
      expect(salvarMetas).toHaveBeenCalledOnce();
    });

    it("saves strategy without metas when not provided", async () => {
      const salvarEstrategia = vi.fn().mockResolvedValue(undefined);
      const salvarMetas = vi.fn().mockResolvedValue(undefined);
      const repo: IConfigurationRepository = {
        ObterEstrategia: vi.fn(),
        SalvarEstrategia: salvarEstrategia,
        ObterMetas: vi.fn(),
        SalvarMetas: salvarMetas,
      };
      const service = createService(repo);
      const command = createCommand({ metas: undefined });

      const result = await service.Execute(command);

      expect(result).not.toBeInstanceOf(ApplicationError);
      expect(salvarEstrategia).toHaveBeenCalledOnce();
      expect(salvarMetas).not.toHaveBeenCalled();
    });

    it("returns ValidationError when usuarioId is empty", async () => {
      const service = createService();
      const command = createCommand({ usuarioId: "" });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(ValidationError);
    });

    it("returns ValidationError when percentuais is empty", async () => {
      const service = createService();
      const command = createCommand({ percentuais: {} });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(ValidationError);
    });

    it("returns ValidationError when toleranciaRebalanceamento is out of range", async () => {
      const service = createService();
      const command = createCommand({ toleranciaRebalanceamento: 150 });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(ValidationError);
    });

    it("returns ValidationError when meta has empty nome", async () => {
      const service = createService();
      const command = createCommand({
        metas: [{ nome: "", valorAlvo: 50000, prazo: new Date() }],
      });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(ValidationError);
    });
  });
});
