import { describe, it, expect } from "vitest";
import { getPresentationSourceFiles, getImports } from "./utils";

const FORBIDDEN_PREFIXES = ["@/core/domain", "@/infrastructure", "@/integrations/supabase"];

describe("Architecture Tests — Presentation Layer Boundaries (R-10)", () => {
  const files = getPresentationSourceFiles();

  it("apresenta arquivos de presentation para validar", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it("presentation não importa directamente o domínio (src/core/domain)", () => {
    for (const file of files) {
      const imports = getImports(file);
      const violations = imports.filter((i) => i.startsWith("@/core/domain"));
      expect(violations, `${file.getFilePath()} não deve importar domínio`).toEqual([]);
    }
  });

  it("presentation não importa directamente a infraestrutura (src/infrastructure)", () => {
    for (const file of files) {
      const imports = getImports(file);
      const violations = imports.filter((i) => i.startsWith("@/infrastructure"));
      expect(violations, `${file.getFilePath()} não deve importar infraestrutura`).toEqual([]);
    }
  });

  it("presentation não acessa directamente o cliente Supabase", () => {
    for (const file of files) {
      const imports = getImports(file);
      const violations = imports.filter((i) => i.startsWith("@/integrations/supabase"));
      expect(violations, `${file.getFilePath()} não deve importar supabase`).toEqual([]);
    }
  });

  it("nenhum componente instancia Application Service directamente", () => {
    const serviceNames = [
      "RegistrarOperacaoService",
      "ImportarCarteiraService",
      "SincronizarDadosService",
      "ConfigurarEstrategiaService",
      "GerenciarAssinaturaService",
      "ConsultarPatrimonioService",
      "ConsultarPosicaoService",
      "AcompanharProventosService",
      "ObterHistoricoPatrimonialService",
      "ConsultarRentabilidadeService",
      "CalcularRebalanceamentoService",
      "GerarRelatorioFiscalService",
      "ExportarDadosService",
      "ConsultarProgressoMetasService",
    ];
    for (const file of files) {
      const text = file.getFullText();
      const violations = serviceNames.filter((name) => text.includes(`new ${name}`));
      expect(violations, `${file.getFilePath()} não deve instanciar Application Services`).toEqual(
        [],
      );
    }
  });

  it("nenhum arquivo da presentation instancia o adapter Supabase (AuthService deve ser injetado)", () => {
    for (const file of files) {
      const text = file.getFullText();
      const violations = text.includes("new SupabaseAuthService");
      expect(
        violations,
        `${file.getFilePath()} não deve instanciar SupabaseAuthService diretamente`,
      ).toBe(false);
    }
  });

  it("AuthProvider depende apenas da interface AuthService (port), não do Supabase", () => {
    const authProvider = files.find((f) => f.getFilePath().endsWith("providers/AuthProvider.tsx"));
    expect(authProvider, "AuthProvider deve existir").toBeDefined();
    const text = authProvider!.getFullText();
    expect(
      text.includes("@/integrations/supabase"),
      "AuthProvider não deve importar supabase",
    ).toBe(false);
    expect(
      text.includes("AuthService"),
      "AuthProvider deve referenciar a interface AuthService",
    ).toBe(true);
  });

  it("todos os imports proibidos estão ausentes (verificação agregada)", () => {
    const allViolations: string[] = [];
    for (const file of files) {
      for (const imp of getImports(file)) {
        if (FORBIDDEN_PREFIXES.some((p) => imp.startsWith(p))) {
          allViolations.push(`${file.getFilePath()} -> ${imp}`);
        }
      }
    }
    expect(allViolations).toEqual([]);
  });
});
