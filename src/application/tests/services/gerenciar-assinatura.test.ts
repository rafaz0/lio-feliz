import { describe, it, expect, vi } from "vitest";
import { GerenciarAssinaturaService } from "@/application/services/gerenciar-assinatura-service";
import type { GerenciarAssinaturaCommand } from "@/application/commands/gerenciar-assinatura";
import type { ISubscriptionRepository } from "@/application/ports/subscription-repository";
import type { INotificationPort } from "@/application/ports/notification-port";
import {
  ApplicationError,
  ValidationError,
  AuthorizationError,
  NotFoundError,
} from "@/application/errors/application-error";

const FIXTURA_USUARIO = "user-018f";

function createService(
  subscriptionRepo?: ISubscriptionRepository,
  notificationPort?: INotificationPort,
): GerenciarAssinaturaService {
  return new GerenciarAssinaturaService(
    subscriptionRepo ?? {
      ObterPlanoAtivo: vi.fn(),
      Salvar: vi.fn(),
      ListarPlanosDisponiveis: vi.fn().mockResolvedValue([
        {
          planoId: "gratuito",
          nome: "Grátis",
          descricao: "Plano gratuito",
          precoMensal: 0,
          recursos: ["basico"],
        },
        {
          planoId: "premium",
          nome: "Premium",
          descricao: "Plano premium",
          precoMensal: 29.9,
          recursos: ["basico", "avancado", "relatorios"],
        },
      ]),
    },
    notificationPort ?? {
      Notificar: vi.fn(),
      NotificarEmail: vi.fn(),
    },
  );
}

function createCommand(
  overrides?: Partial<GerenciarAssinaturaCommand>,
): GerenciarAssinaturaCommand {
  return {
    type: "GerenciarAssinaturaCommand",
    usuarioId: FIXTURA_USUARIO,
    acao: "ativar",
    plano: "premium",
    ...overrides,
  };
}

describe("GerenciarAssinaturaService", () => {
  describe("Execute", () => {
    it("activates a plan and returns DTO", async () => {
      const salvar = vi.fn().mockResolvedValue(undefined);
      const notificar = vi.fn().mockResolvedValue(undefined);
      const repo: ISubscriptionRepository = {
        ObterPlanoAtivo: vi.fn().mockResolvedValue(null),
        Salvar: salvar,
        ListarPlanosDisponiveis: vi
          .fn()
          .mockResolvedValue([
            {
              planoId: "premium",
              nome: "Premium",
              descricao: "Premium",
              precoMensal: 29.9,
              recursos: ["basico", "avancado"],
            },
          ]),
      };
      const notification: INotificationPort = {
        Notificar: notificar,
        NotificarEmail: vi.fn(),
      };
      const service = createService(repo, notification);
      const command = createCommand();

      const result = await service.Execute(command);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/assinatura").AssinaturaAtualizadaDto;
      expect(dto.usuarioId).toBe(FIXTURA_USUARIO);
      expect(dto.plano).toBe("premium");
      expect(dto.recursosLiberados).toContain("basico");
      expect(salvar).toHaveBeenCalledOnce();
      expect(notificar).toHaveBeenCalledOnce();
    });

    it("cancels an active subscription", async () => {
      const salvar = vi.fn().mockResolvedValue(undefined);
      const repo: ISubscriptionRepository = {
        ObterPlanoAtivo: vi.fn().mockResolvedValue({
          usuarioId: FIXTURA_USUARIO,
          plano: "premium",
          dataAtivacao: new Date("2026-01-01"),
          dataExpiracao: null,
          recursosLiberados: ["basico", "avancado"],
        }),
        Salvar: salvar,
        ListarPlanosDisponiveis: vi.fn().mockResolvedValue([]),
      };
      const notification: INotificationPort = {
        Notificar: vi.fn(),
        NotificarEmail: vi.fn(),
      };
      const service = createService(repo, notification);
      const command = createCommand({ acao: "cancelar", plano: undefined });

      const result = await service.Execute(command);

      expect(result).not.toBeInstanceOf(ApplicationError);
      const dto = result as import("@/application/dtos/assinatura").AssinaturaAtualizadaDto;
      expect(dto.plano).toBe("premium");
      expect(dto.dataExpiracao).toBeInstanceOf(Date);
    });

    it("returns AuthorizationError when user has no active plan (CL-005-009)", async () => {
      const repo: ISubscriptionRepository = {
        ObterPlanoAtivo: vi.fn().mockResolvedValue(null),
        Salvar: vi.fn(),
        ListarPlanosDisponiveis: vi
          .fn()
          .mockResolvedValue([
            {
              planoId: "premium",
              nome: "Premium",
              descricao: "Premium",
              precoMensal: 29.9,
              recursos: [],
            },
          ]),
      };
      const service = createService(repo);
      const command = createCommand({ acao: "cancelar", plano: undefined });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(AuthorizationError);
      expect((result as AuthorizationError).code).toBe("SEM_ASSINATURA");
    });

    it("returns ValidationError when acao is invalid", async () => {
      const service = createService();
      const command = createCommand({ acao: "bloquear" as "ativar" });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(ValidationError);
    });

    it("returns ValidationError when plano is missing for ativar", async () => {
      const service = createService();
      const command = createCommand({ plano: undefined });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(ValidationError);
    });

    it("returns NotFoundError when plano does not exist", async () => {
      const repo: ISubscriptionRepository = {
        ObterPlanoAtivo: vi.fn().mockResolvedValue(null),
        Salvar: vi.fn(),
        ListarPlanosDisponiveis: vi.fn().mockResolvedValue([]),
      };
      const service = createService(repo);
      const command = createCommand({ plano: "plano_inexistente" });

      const result = await service.Execute(command);

      expect(result).toBeInstanceOf(NotFoundError);
    });

    it("sends notification after subscription change", async () => {
      const notificar = vi.fn().mockResolvedValue(undefined);
      const repo: ISubscriptionRepository = {
        ObterPlanoAtivo: vi.fn().mockResolvedValue(null),
        Salvar: vi.fn(),
        ListarPlanosDisponiveis: vi
          .fn()
          .mockResolvedValue([
            {
              planoId: "premium",
              nome: "Premium",
              descricao: "Premium",
              precoMensal: 29.9,
              recursos: [],
            },
          ]),
      };
      const notification: INotificationPort = {
        Notificar: notificar,
        NotificarEmail: vi.fn(),
      };
      const service = createService(repo, notification);

      await service.Execute(createCommand());

      expect(notificar).toHaveBeenCalledWith(
        FIXTURA_USUARIO,
        "Assinatura Atualizada",
        expect.stringContaining("ativada"),
      );
    });
  });
});
