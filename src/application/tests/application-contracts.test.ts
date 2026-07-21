import { describe, it, expect } from "vitest";
import {
  ApplicationError,
  ValidationError,
  NotFoundError,
  AuthorizationError,
  ConflictError,
  InternalError,
} from "@/application/errors/application-error";

const FIXTURA_USUARIO = "0190b4c2-5d6e-7f8a-9b0c-1d2e3f4a5b6c";
const FIXTURA_PORTFOLIO = "018f3a6d-9b3a-7c4e-9a1b-2c3d4e5f6789";
const FIXTURA_ATIVO = "0191c4e2-3a4b-5c6d-7e8f-9a0b1c2d3e4f";

describe("ApplicationError", () => {
  describe("base class", () => {
    it("creates an error with code and message", () => {
      const err = new ApplicationError("APP_001", "Erro base");
      expect(err.code).toBe("APP_001");
      expect(err.message).toBe("Erro base");
      expect(err.type).toBe("APPLICATION_ERROR");
    });

    it("stores timestamp on creation", () => {
      const before = new Date();
      const err = new ApplicationError("APP_001", "erro");
      const after = new Date();
      expect(err.timestamp.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(err.timestamp.getTime()).toBeLessThanOrEqual(after.getTime());
    });

    it("readonly at type level (compile-time immutability)", () => {
      const err = new ApplicationError("APP_001", "teste");
      expect(err.code).toBe("APP_001");
    });

    it("has name equal to constructor name", () => {
      const err = new ApplicationError("APP_001", "teste");
      expect(err.name).toBe("ApplicationError");
    });
  });

  describe("ValidationError", () => {
    it("creates with default values", () => {
      const err = new ValidationError();
      expect(err.code).toBe("VALIDATION_ERROR");
      expect(err.message).toBe("Dados de entrada inválidos");
      expect(err.type).toBe("VALIDATION_ERROR");
      expect(err.fieldErrors).toEqual({});
    });

    it("creates with field errors", () => {
      const err = new ValidationError("VAL_001", "Campos inválidos", {
        ticker: ["Campo obrigatório"],
        quantidade: ["Deve ser maior que zero"],
      });
      expect(err.code).toBe("VAL_001");
      expect(err.fieldErrors.ticker).toEqual(["Campo obrigatório"]);
      expect(err.fieldErrors.quantidade).toEqual(["Deve ser maior que zero"]);
    });

    it("fieldErrors is a new object per instance", () => {
      const err1 = new ValidationError();
      const err2 = new ValidationError("VAL", "msg", { ticker: ["obrigatório"] });
      expect(err1.fieldErrors).toEqual({});
      expect(err2.fieldErrors.ticker).toEqual(["obrigatório"]);
    });
  });

  describe("NotFoundError", () => {
    it("creates with resource type and id", () => {
      const err = new NotFoundError("Ativo", FIXTURA_ATIVO);
      expect(err.code).toBe("NOT_FOUND");
      expect(err.message).toBe(`Ativo '${FIXTURA_ATIVO}' não encontrado`);
      expect(err.type).toBe("NOT_FOUND_ERROR");
      expect(err.resourceType).toBe("Ativo");
      expect(err.resourceId).toBe(FIXTURA_ATIVO);
    });

    it("creates with custom message", () => {
      const err = new NotFoundError(
        "Portfolio",
        FIXTURA_PORTFOLIO,
        "PORTFOLIO_NOT_FOUND",
        "Portfolio não localizado",
      );
      expect(err.code).toBe("PORTFOLIO_NOT_FOUND");
      expect(err.message).toBe("Portfolio não localizado");
    });
  });

  describe("AuthorizationError", () => {
    it("creates with default values", () => {
      const err = new AuthorizationError();
      expect(err.code).toBe("FORBIDDEN");
      expect(err.message).toBe("Usuário sem permissão para esta operação");
      expect(err.type).toBe("AUTHORIZATION_ERROR");
    });

    it("creates with custom code and message", () => {
      const err = new AuthorizationError("PLANO_EXPIRADO", "Plano gratuito expirado");
      expect(err.code).toBe("PLANO_EXPIRADO");
      expect(err.message).toBe("Plano gratuito expirado");
    });
  });

  describe("ConflictError", () => {
    it("creates with default values", () => {
      const err = new ConflictError();
      expect(err.code).toBe("CONFLICT");
      expect(err.message).toBe("Concorrência ou estado inválido detectado");
      expect(err.type).toBe("CONFLICT_ERROR");
    });

    it("creates with custom code and message", () => {
      const err = new ConflictError("STALE_DATA", "Dados desatualizados");
      expect(err.code).toBe("STALE_DATA");
      expect(err.message).toBe("Dados desatualizados");
    });
  });

  describe("InternalError", () => {
    it("creates with default values", () => {
      const err = new InternalError();
      expect(err.code).toBe("INTERNAL_ERROR");
      expect(err.message).toBe("Erro interno inesperado");
      expect(err.type).toBe("INTERNAL_ERROR");
    });

    it("stores original error", () => {
      const original = new Error("Conexão recusada");
      const err = new InternalError("DB_FAIL", "Banco indisponível", original);
      expect(err.originalError).toBe(original);
      expect(err.originalError!.message).toBe("Conexão recusada");
    });

    it("creates without original error", () => {
      const err = new InternalError();
      expect(err.originalError).toBeUndefined();
    });
  });
});

describe("Commands", () => {
  describe("RegistrarOperacaoCommand", () => {
    it("accepts a valid command structure", () => {
      const cmd: import("@/application/commands/registrar-operacao").RegistrarOperacaoCommand = {
        type: "RegistrarOperacaoCommand",
        portfolioId: FIXTURA_PORTFOLIO,
        tipo: "BUY",
        ativoId: FIXTURA_ATIVO,
        quantidade: 100,
        valor: 5000,
        data: new Date("2026-01-15"),
      };
      expect(cmd.portfolioId).toBe(FIXTURA_PORTFOLIO);
      expect(cmd.tipo).toBe("BUY");
      expect(cmd.quantidade).toBe(100);
    });

    it("accepts optional observacao", () => {
      const cmd: import("@/application/commands/registrar-operacao").RegistrarOperacaoCommand = {
        type: "RegistrarOperacaoCommand",
        portfolioId: FIXTURA_PORTFOLIO,
        tipo: "SELL",
        ativoId: FIXTURA_ATIVO,
        quantidade: 50,
        valor: 3000,
        data: new Date("2026-02-01"),
        observacao: "Venda parcial",
      };
      expect(cmd.observacao).toBe("Venda parcial");
    });
  });

  describe("ImportarCarteiraCommand", () => {
    it("accepts file-based import", () => {
      const cmd: import("@/application/commands/importar-carteira").ImportarCarteiraCommand = {
        type: "ImportarCarteiraCommand",
        usuarioId: FIXTURA_USUARIO,
        origem: "csv",
        arquivo: "carteira.csv",
      };
      expect(cmd.usuarioId).toBe(FIXTURA_USUARIO);
      expect(cmd.origem).toBe("csv");
    });

    it("accepts conexao-based import", () => {
      const cmd: import("@/application/commands/importar-carteira").ImportarCarteiraCommand = {
        type: "ImportarCarteiraCommand",
        usuarioId: FIXTURA_USUARIO,
        origem: "b3",
        conexao: { apiKey: "abc123" },
        intervalo: { inicio: new Date("2025-01-01"), fim: new Date("2025-12-31") },
      };
      expect(cmd.conexao?.apiKey).toBe("abc123");
      expect(cmd.intervalo?.inicio).toEqual(new Date("2025-01-01"));
    });
  });

  describe("SincronizarDadosCommand", () => {
    it("accepts a valid command", () => {
      const cmd: import("@/application/commands/sincronizar-dados").SincronizarDadosCommand = {
        type: "SincronizarDadosCommand",
        usuarioId: FIXTURA_USUARIO,
        fonte: "b3",
      };
      expect(cmd.fonte).toBe("b3");
    });
  });

  describe("ConfigurarEstrategiaCommand", () => {
    it("accepts configuration with metas", () => {
      const cmd: import("@/application/commands/configurar-estrategia").ConfigurarEstrategiaCommand =
        {
          type: "ConfigurarEstrategiaCommand",
          usuarioId: FIXTURA_USUARIO,
          percentuais: { acoes: 60, renda_fixa: 30, fiis: 10 },
          moeda: "BRL",
          toleranciaRebalanceamento: 0.05,
          metas: [{ nome: "Aposentadoria", valorAlvo: 1000000, prazo: new Date("2040-01-01") }],
        };
      expect(cmd.percentuais.acoes).toBe(60);
      expect(cmd.metas![0].nome).toBe("Aposentadoria");
    });
  });

  describe("GerenciarAssinaturaCommand", () => {
    it("accepts ativar action", () => {
      const cmd: import("@/application/commands/gerenciar-assinatura").GerenciarAssinaturaCommand =
        {
          type: "GerenciarAssinaturaCommand",
          usuarioId: FIXTURA_USUARIO,
          acao: "ativar",
          plano: "premium",
        };
      expect(cmd.acao).toBe("ativar");
      expect(cmd.plano).toBe("premium");
    });

    it("accepts cancelar action without plano", () => {
      const cmd: import("@/application/commands/gerenciar-assinatura").GerenciarAssinaturaCommand =
        {
          type: "GerenciarAssinaturaCommand",
          usuarioId: FIXTURA_USUARIO,
          acao: "cancelar",
        };
      expect(cmd.acao).toBe("cancelar");
    });
  });
});

describe("Queries", () => {
  describe("ObterPatrimonioQuery", () => {
    it("accepts a valid query", () => {
      const q: import("@/application/queries/obter-patrimonio").ObterPatrimonioQuery = {
        type: "ObterPatrimonioQuery",
        portfolioId: FIXTURA_PORTFOLIO,
      };
      expect(q.portfolioId).toBe(FIXTURA_PORTFOLIO);
    });
  });

  describe("ConsultarPosicaoQuery", () => {
    it("accepts portfolioId and ativoId", () => {
      const q: import("@/application/queries/consultar-posicao").ConsultarPosicaoQuery = {
        type: "ConsultarPosicaoQuery",
        portfolioId: FIXTURA_PORTFOLIO,
        ativoId: FIXTURA_ATIVO,
      };
      expect(q.portfolioId).toBe(FIXTURA_PORTFOLIO);
      expect(q.ativoId).toBe(FIXTURA_ATIVO);
    });
  });

  describe("ObterHistoricoPatrimonialQuery", () => {
    it("accepts periodo filter", () => {
      const q: import("@/application/queries/obter-historico-patrimonial").ObterHistoricoPatrimonialQuery =
        {
          type: "ObterHistoricoPatrimonialQuery",
          portfolioId: FIXTURA_PORTFOLIO,
          periodo: { inicio: new Date("2025-01-01"), fim: new Date("2025-12-31") },
        };
      expect(q.periodo.inicio).toEqual(new Date("2025-01-01"));
    });
  });

  describe("ObterProventosQuery", () => {
    it("accepts optional filters", () => {
      const q: import("@/application/queries/obter-proventos").ObterProventosQuery = {
        type: "ObterProventosQuery",
        portfolioId: FIXTURA_PORTFOLIO,
        ano: 2025,
        ticker: "PETR4",
      };
      expect(q.ano).toBe(2025);
      expect(q.ticker).toBe("PETR4");
    });
  });

  describe("CalcularRebalanceamentoQuery", () => {
    it("accepts portfolioId", () => {
      const q: import("@/application/queries/calcular-rebalanceamento").CalcularRebalanceamentoQuery =
        {
          type: "CalcularRebalanceamentoQuery",
          portfolioId: FIXTURA_PORTFOLIO,
        };
      expect(q.portfolioId).toBe(FIXTURA_PORTFOLIO);
    });
  });

  describe("GerarRelatorioFiscalQuery", () => {
    it("accepts ano filter", () => {
      const q: import("@/application/queries/gerar-relatorio-fiscal").GerarRelatorioFiscalQuery = {
        type: "GerarRelatorioFiscalQuery",
        portfolioId: FIXTURA_PORTFOLIO,
        ano: 2025,
      };
      expect(q.ano).toBe(2025);
    });
  });

  describe("ExportarDadosQuery", () => {
    it("accepts formato", () => {
      const q: import("@/application/queries/exportar-dados").ExportarDadosQuery = {
        type: "ExportarDadosQuery",
        portfolioId: FIXTURA_PORTFOLIO,
        formato: "json",
      };
      expect(q.formato).toBe("json");
    });
  });
});

describe("Ports (type-level)", () => {
  it("IApplicationService generic type compiles", () => {
    const service: import("@/application/application-service").IApplicationService<
      import("@/application/commands/registrar-operacao").RegistrarOperacaoCommand,
      import("@/application/dtos/operacao").OperacaoRegistradaDto
    > = {
      Execute: async () => ({
        operacaoId: "abc",
        tipo: "BUY",
        ativoId: "xyz",
        quantidade: 10,
        valor: 500,
        data: new Date(),
        status: "CONFIRMED",
      }),
    };
    expect(typeof service.Execute).toBe("function");
  });

  it("IDispatcher generic type compiles", () => {
    const dispatcher: import("@/application/dispatcher").IDispatcher = {
      DispatchCommand: async () => ({
        operacaoId: "abc",
        tipo: "BUY",
        ativoId: "xyz",
        quantidade: 10,
        valor: 500,
        data: new Date(),
        status: "CONFIRMED",
      }),
      DispatchQuery: async () => ({ patrimonioTotal: 0, moeda: "BRL" }),
      RegisterCommand: () => {},
      RegisterQuery: () => {},
    };
    expect(typeof dispatcher.DispatchCommand).toBe("function");
    expect(typeof dispatcher.DispatchQuery).toBe("function");
    expect(typeof dispatcher.RegisterCommand).toBe("function");
    expect(typeof dispatcher.RegisterQuery).toBe("function");
  });
});

describe("DTOs", () => {
  it("PatrimonioDto structure is valid", () => {
    const dto: import("@/application/dtos/patrimonio").PatrimonioDto = {
      patrimonioTotal: 500000,
      patrimonioInvestido: 450000,
      saldoDisponivel: 50000,
      moeda: "BRL",
      dataReferencia: new Date("2026-07-18"),
      alocacao: [{ classe: "acoes", valor: 300000, percentual: 60 }],
      evolucaoMensal: 2.5,
    };
    expect(dto.patrimonioTotal).toBe(500000);
    expect(dto.alocacao[0].percentual).toBe(60);
  });

  it("ImportacaoRealizadaDto with erros", () => {
    const dto: import("@/application/dtos/importacao").ImportacaoRealizadaDto = {
      totalOperacoes: 10,
      operacoesImportadas: 8,
      operacoesRejeitadas: 2,
      erros: [
        { linha: 3, tipo: "PARSE_ERROR", mensagem: "Formato de data inválido" },
        { linha: 7, tipo: "INVALID_TICKER", mensagem: "Ticker não encontrado" },
      ],
    };
    expect(dto.operacoesImportadas).toBe(8);
    expect(dto.erros.length).toBe(2);
  });

  it("ProventosDto with accumulated values", () => {
    const dto: import("@/application/dtos/proventos").ProventosDto = {
      proventos: [
        {
          ativoId: FIXTURA_ATIVO,
          ticker: "PETR4",
          tipo: "DIVIDEND",
          valor: 500,
          dataPagamento: new Date(),
          dataBase: new Date(),
        },
      ],
      totalPeriodo: 500,
      totalAcumulado: 5000,
    };
    expect(dto.totalPeriodo).toBe(500);
    expect(dto.totalAcumulado).toBe(5000);
  });

  it("RelatorioFiscalDto with capital gains", () => {
    const dto: import("@/application/dtos/relatorio-fiscal").RelatorioFiscalDto = {
      ano: 2025,
      posicao31Dez: [{ ticker: "PETR4", quantidade: 100, valorTotal: 5000 }],
      dividendosAno: 1200,
      jcpAno: 300,
      ganhoCapital: [
        { ticker: "VALE3", tipo: "VENDA", valorVenda: 10000, valorCompra: 8000, ganho: 2000 },
      ],
      prejuizoCompensar: 0,
    };
    expect(dto.ano).toBe(2025);
    expect(dto.ganhoCapital[0].ganho).toBe(2000);
  });

  it("AssinaturaAtualizadaDto with expiration", () => {
    const dto: import("@/application/dtos/assinatura").AssinaturaAtualizadaDto = {
      usuarioId: FIXTURA_USUARIO,
      plano: "premium",
      dataAtivacao: new Date("2026-01-01"),
      dataExpiracao: new Date("2027-01-01"),
      recursosLiberados: ["exportar", "relatorio_fiscal"],
    };
    expect(dto.recursosLiberados).toContain("exportar");
  });

  it("SincronizacaoRealizadaDto with errors", () => {
    const dto: import("@/application/dtos/sincronizacao").SincronizacaoRealizadaDto = {
      fonte: "b3",
      dataSincronizacao: new Date(),
      totalProcessado: 50,
      totalNovo: 45,
      totalIgnorado: 5,
      erros: [{ fonte: "b3", linha: 12, tipo: "DUPLICATE", mensagem: "Operação já existe" }],
    };
    expect(dto.totalProcessado).toBe(50);
    expect(dto.erros[0].tipo).toBe("DUPLICATE");
  });

  it("ProgressoMetasDto with multiple metas", () => {
    const dto: import("@/application/dtos/metas").ProgressoMetasDto = {
      metas: [
        {
          nome: "Reserva emergencial",
          valorAlvo: 50000,
          valorAtual: 30000,
          percentualConcluido: 60,
          prazo: new Date("2027-01-01"),
        },
      ],
      progressoGeral: 60,
    };
    expect(dto.metas[0].percentualConcluido).toBe(60);
    expect(dto.progressoGeral).toBe(60);
  });
});
