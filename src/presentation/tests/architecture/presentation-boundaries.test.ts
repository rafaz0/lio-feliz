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

  it("DashboardView consome os hooks da feature (que usam o dispatcher) e não instancia Application Services", () => {
    const dashboardView = files.find((f) =>
      f.getFilePath().endsWith("features/dashboard/components/DashboardView.tsx"),
    );
    expect(dashboardView, "DashboardView deve existir").toBeDefined();
    const text = dashboardView!.getFullText();
    expect(
      text.includes("useDashboardQuery"),
      "DashboardView deve consumir useDashboardQuery",
    ).toBe(true);
    expect(
      text.match(/new (ConsultarPatrimonioService|ObterHistoricoPatrimonialService)/),
      "DashboardView não deve instanciar Application Services",
    ).toBeNull();
  });

  it("feature dashboard não importa src/infrastructure nem src/integrations/supabase", () => {
    const dashboardFiles = files.filter((f) => f.getFilePath().includes("features/dashboard/"));
    expect(dashboardFiles.length).toBeGreaterThan(0);
    for (const file of dashboardFiles) {
      const imports = getImports(file);
      const violations = imports.filter(
        (i) => i.startsWith("@/infrastructure") || i.startsWith("@/integrations/supabase"),
      );
      expect(
        violations,
        `${file.getFilePath()} não deve importar infraestrutura nem supabase`,
      ).toEqual([]);
    }
  });

  it("adapter de dispatcher (composition root) reside fora da presentation", () => {
    const violating = files.filter((f) =>
      f.getFilePath().includes("presentation/integrations/dispatcher"),
    );
    expect(violating, "o dispatcher adapter não deve estar dentro de src/presentation").toEqual([]);
  });

  it("PortfolioPage consome os hooks da feature (useDispatcher) e não instancia Application Services", () => {
    const portfolioPage = files.find((f) =>
      f.getFilePath().endsWith("features/portfolio/components/PortfolioPage.tsx"),
    );
    expect(portfolioPage, "PortfolioPage deve existir").toBeDefined();
    const text = portfolioPage!.getFullText();
    expect(
      text.includes("usePortfolioQuery"),
      "PortfolioPage deve consumir usePortfolioQuery",
    ).toBe(true);
    expect(
      text.match(
        /new (ConsultarPatrimonioService|ConsultarPosicaoService|ObterHistoricoPatrimonialService)/,
      ),
      "PortfolioPage não deve instanciar Application Services",
    ).toBeNull();
  });

  it("feature portfolio não importa src/infrastructure nem src/integrations/supabase", () => {
    const portfolioFiles = files.filter((f) => f.getFilePath().includes("features/portfolio/"));
    expect(portfolioFiles.length).toBeGreaterThan(0);
    for (const file of portfolioFiles) {
      const imports = getImports(file);
      const violations = imports.filter(
        (i) => i.startsWith("@/infrastructure") || i.startsWith("@/integrations/supabase"),
      );
      expect(
        violations,
        `${file.getFilePath()} não deve importar infraestrutura nem supabase`,
      ).toEqual([]);
    }
  });

  it("dispatcher adapter registra ConsultarPosicaoQuery (fora da presentation)", () => {
    const violating = files.filter((f) =>
      f.getFilePath().includes("presentation/integrations/dispatcher"),
    );
    expect(violating, "o dispatcher adapter não deve estar dentro de src/presentation").toEqual([]);
  });

  it("OperationPage compõe OperationForm/OperationHistory e não instancia Application Services", () => {
    const operationPage = files.find((f) =>
      f.getFilePath().endsWith("features/operations/components/OperationPage.tsx"),
    );
    expect(operationPage, "OperationPage deve existir").toBeDefined();
    const text = operationPage!.getFullText();
    expect(
      text.includes("<OperationForm") && text.includes("<OperationHistory"),
      "OperationPage deve compor OperationForm e OperationHistory",
    ).toBe(true);
    expect(
      text.match(
        /new (RegistrarOperacaoService|ConsultarPatrimonioService|ConsultarPosicaoService)/,
      ),
      "OperationPage não deve instanciar Application Services",
    ).toBeNull();
  });

  it("feature operations não importa src/infrastructure nem src/integrations/supabase", () => {
    const operationsFiles = files.filter((f) => f.getFilePath().includes("features/operations/"));
    expect(operationsFiles.length).toBeGreaterThan(0);
    for (const file of operationsFiles) {
      const imports = getImports(file);
      const violations = imports.filter(
        (i) => i.startsWith("@/infrastructure") || i.startsWith("@/integrations/supabase"),
      );
      expect(
        violations,
        `${file.getFilePath()} não deve importar infraestrutura nem supabase`,
      ).toEqual([]);
    }
  });

  it("OperationForm valida via zod e não contém regra de negócio da Application Layer", () => {
    const form = files.find((f) =>
      f.getFilePath().endsWith("features/operations/components/OperationForm.tsx"),
    );
    expect(form, "OperationForm deve existir").toBeDefined();
    const text = form!.getFullText();
    expect(text.includes("zodResolver"), "OperationForm deve usar zod para validação de UI").toBe(
      true,
    );
    expect(
      text.includes("@/core/domain") || text.includes("@/infrastructure"),
      "OperationForm não deve importar domínio nem infraestrutura",
    ).toBe(false);
  });
});
