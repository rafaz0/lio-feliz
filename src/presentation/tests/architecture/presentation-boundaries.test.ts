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
      "ObterConfiguracoesService",
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

  it("DividendsPage usa useDividendsQuery e não instancia Application Services", () => {
    const dividendsPage = files.find((f) =>
      f.getFilePath().endsWith("features/dividends/components/DividendsPage.tsx"),
    );
    expect(dividendsPage, "DividendsPage deve existir").toBeDefined();
    const text = dividendsPage!.getFullText();
    expect(
      text.includes("useDividendsQuery"),
      "DividendsPage deve consumir useDividendsQuery",
    ).toBe(true);
    expect(
      text.match(
        /new (AcompanharProventosService|ConsultarPatrimonioService|ConsultarPosicaoService)/,
      ),
      "DividendsPage não deve instanciar Application Services",
    ).toBeNull();
  });

  it("feature dividends não importa src/infrastructure nem src/integrations/supabase", () => {
    const dividendsFiles = files.filter((f) => f.getFilePath().includes("features/dividends/"));
    expect(dividendsFiles.length).toBeGreaterThan(0);
    for (const file of dividendsFiles) {
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

  it("DividendsPage não contém regras de negócio da Application Layer", () => {
    const page = files.find((f) =>
      f.getFilePath().endsWith("features/dividends/components/DividendsPage.tsx"),
    );
    expect(page, "DividendsPage deve existir").toBeDefined();
    const text = page!.getFullText();
    expect(
      text.includes("@/core/domain") || text.includes("@/infrastructure"),
      "DividendsPage não deve importar domínio nem infraestrutura",
    ).toBe(false);
  });

  it("HistoryPage usa hooks de histórico e não instancia Application Services", () => {
    const historyPage = files.find((f) =>
      f.getFilePath().endsWith("features/history/components/HistoryPage.tsx"),
    );
    expect(historyPage, "HistoryPage deve existir").toBeDefined();
    const text = historyPage!.getFullText();
    expect(
      text.includes("useHistoricoQuery") && text.includes("useRentabilidadeQuery"),
      "HistoryPage deve consumir useHistoricoQuery e useRentabilidadeQuery",
    ).toBe(true);
    expect(
      text.match(
        /new (ConsultarRentabilidadeService|ObterHistoricoPatrimonialService|AcompanharProventosService)/,
      ),
      "HistoryPage não deve instanciar Application Services",
    ).toBeNull();
  });

  it("feature history não importa src/infrastructure nem src/integrations/supabase", () => {
    const historyFiles = files.filter((f) => f.getFilePath().includes("features/history/"));
    expect(historyFiles.length).toBeGreaterThan(0);
    for (const file of historyFiles) {
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

  it("HistoryPage não contém regras de negócio da Application Layer", () => {
    const page = files.find((f) =>
      f.getFilePath().endsWith("features/history/components/HistoryPage.tsx"),
    );
    expect(page, "HistoryPage deve existir").toBeDefined();
    const text = page!.getFullText();
    expect(
      text.includes("@/core/domain") || text.includes("@/infrastructure"),
      "HistoryPage não deve importar domínio nem infraestrutura",
    ).toBe(false);
  });

  it("RebalancingPage usa useRebalancingQuery e não instancia Application Services", () => {
    const rebalancingPage = files.find((f) =>
      f.getFilePath().endsWith("features/rebalancing/components/RebalancingPage.tsx"),
    );
    expect(rebalancingPage, "RebalancingPage deve existir").toBeDefined();
    const text = rebalancingPage!.getFullText();
    expect(
      text.includes("useRebalancingQuery"),
      "RebalancingPage deve consumir useRebalancingQuery",
    ).toBe(true);
    expect(
      text.match(
        /new (CalcularRebalanceamentoService|ConsultarPatrimonioService|ConsultarPosicaoService)/,
      ),
      "RebalancingPage não deve instanciar Application Services",
    ).toBeNull();
  });

  it("feature rebalancing não importa src/infrastructure nem src/integrations/supabase", () => {
    const rebalancingFiles = files.filter((f) => f.getFilePath().includes("features/rebalancing/"));
    expect(rebalancingFiles.length).toBeGreaterThan(0);
    for (const file of rebalancingFiles) {
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

  it("RebalancingPage não contém regras de negócio da Application Layer", () => {
    const page = files.find((f) =>
      f.getFilePath().endsWith("features/rebalancing/components/RebalancingPage.tsx"),
    );
    expect(page, "RebalancingPage deve existir").toBeDefined();
    const text = page!.getFullText();
    expect(
      text.includes("@/core/domain") || text.includes("@/infrastructure"),
      "RebalancingPage não deve importar domínio nem infraestrutura",
    ).toBe(false);
  });

  it("TaxPage usa useTaxReportQuery e não instancia Application Services", () => {
    const taxPage = files.find((f) =>
      f.getFilePath().endsWith("features/tax/components/TaxPage.tsx"),
    );
    expect(taxPage, "TaxPage deve existir").toBeDefined();
    const text = taxPage!.getFullText();
    expect(text.includes("useTaxReportQuery"), "TaxPage deve consumir useTaxReportQuery").toBe(
      true,
    );
    expect(
      text.match(
        /new (GerarRelatorioFiscalService|ConsultarPatrimonioService|ConsultarPosicaoService)/,
      ),
      "TaxPage não deve instanciar Application Services",
    ).toBeNull();
  });

  it("feature tax não importa src/infrastructure nem src/integrations/supabase", () => {
    const taxFiles = files.filter((f) => f.getFilePath().includes("features/tax/"));
    expect(taxFiles.length).toBeGreaterThan(0);
    for (const file of taxFiles) {
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

  it("TaxPage não contém regras de negócio da Application Layer", () => {
    const page = files.find((f) => f.getFilePath().endsWith("features/tax/components/TaxPage.tsx"));
    expect(page, "TaxPage deve existir").toBeDefined();
    const text = page!.getFullText();
    expect(
      text.includes("@/core/domain") || text.includes("@/infrastructure"),
      "TaxPage não deve importar domínio nem infraestrutura",
    ).toBe(false);
  });

  it("SettingsPage usa hooks de configuração e não instancia Application Services", () => {
    const settingsPage = files.find((f) =>
      f.getFilePath().endsWith("features/settings/components/SettingsPage.tsx"),
    );
    expect(settingsPage, "SettingsPage deve existir").toBeDefined();
    const text = settingsPage!.getFullText();
    expect(
      text.includes("useSettingsQuery") && text.includes("useUpdateSettingsMutation"),
      "SettingsPage deve consumir useSettingsQuery e useUpdateSettingsMutation",
    ).toBe(true);
    expect(
      text.match(
        /new (ObterConfiguracoesService|ConfigurarEstrategiaService|ConsultarPatrimonioService)/,
      ),
      "SettingsPage não deve instanciar Application Services",
    ).toBeNull();
  });

  it("feature settings não importa src/infrastructure nem src/integrations/supabase", () => {
    const settingsFiles = files.filter((f) => f.getFilePath().includes("features/settings/"));
    expect(settingsFiles.length).toBeGreaterThan(0);
    for (const file of settingsFiles) {
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

  it("SettingsPage não contém regras de negócio da Application Layer", () => {
    const page = files.find((f) =>
      f.getFilePath().endsWith("features/settings/components/SettingsPage.tsx"),
    );
    expect(page, "SettingsPage deve existir").toBeDefined();
    const text = page!.getFullText();
    expect(
      text.includes("@/core/domain") || text.includes("@/infrastructure"),
      "SettingsPage não deve importar domínio nem infraestrutura",
    ).toBe(false);
  });
});
