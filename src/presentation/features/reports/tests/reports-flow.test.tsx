import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReportsPage } from "../components/ReportsPage";
import { createFakeDispatcher, renderWithReportsProviders } from "./test-utils";
import type { DadosExportadosDto } from "@/application/dtos/exportacao";

describe("reports flow", () => {
  it("renderiza a lista de relatórios", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithReportsProviders(<ReportsPage portfolioId="p1" />, dispatcher);
    expect(await screen.findByTestId("report-filters")).toBeDefined();
    expect((await screen.findAllByTestId("report-card")).length).toBeGreaterThan(0);
  });

  it("filtra relatórios por termo", async () => {
    const dispatcher = createFakeDispatcher();
    renderWithReportsProviders(<ReportsPage portfolioId="p1" />, dispatcher);

    await screen.findByTestId("report-card");
    await userEvent.type(await screen.findByTestId("report-filter-termo"), "inexistente-xyz");
    expect(await screen.findByTestId("reports-empty")).toBeDefined();
  });

  it("seleciona relatório e exporta com sucesso", async () => {
    const dto: DadosExportadosDto = {
      formato: "csv",
      conteudo: "ticker,nome",
      nomeArquivo: "carteira-p1.csv",
    };
    const dispatcher = createFakeDispatcher({ exportarDados: () => dto });
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});

    renderWithReportsProviders(<ReportsPage portfolioId="p1" />, dispatcher);

    await userEvent.click(await screen.findByTestId("report-card-select"));
    expect(screen.getByTestId("export-submit")).toBeDefined();

    await userEvent.click(screen.getByTestId("export-submit"));

    expect(await screen.findByTestId("export-result")).toBeDefined();
    expect(screen.getByText(/carteira-p1\.csv/)).toBeDefined();
    clickSpy.mockRestore();
  });
});
