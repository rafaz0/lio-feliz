import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReportCard } from "../components/ReportCard";
import { ReportList } from "../components/ReportList";
import { ReportError } from "../components/ReportError";
import { ReportLoading } from "../components/ReportLoading";
import { ReportExecutionItem } from "../components/ReportExecutionItem";
import type { ReportTemplateCardViewModel, ReportExecutionHistoryViewModel } from "../types/report.view-model";

const mockTemplate: ReportTemplateCardViewModel = {
  id: "carteira-consolidada",
  name: "Carteira Consolidada",
  description: "Posicao por ativo e alocacao",
  category: "CARTEIRA",
  supportedFormats: ["PDF", "CSV", "JSON"],
  icon: "briefcase",
  isBuiltIn: true,
};

const mockExecution: ReportExecutionHistoryViewModel = {
  id: "exec-1",
  templateName: "Carteira Consolidada",
  status: "COMPLETED",
  format: "PDF",
  requestedAt: "2026-07-19T10:00:00Z",
  completedAt: "2026-07-19T10:01:00Z",
  fileUrl: "/api/reports/exec-1/download",
};

describe("ReportCard", () => {
  it("renders template name and description", () => {
    render(<ReportCard template={mockTemplate} />);
    expect(screen.getByText("Carteira Consolidada")).toBeDefined();
    expect(screen.getByText("Posicao por ativo e alocacao")).toBeDefined();
  });

  it("renders supported format badges", () => {
    render(<ReportCard template={mockTemplate} />);
    expect(screen.getByText("PDF")).toBeDefined();
    expect(screen.getByText("CSV")).toBeDefined();
    expect(screen.getByText("JSON")).toBeDefined();
  });

  it("calls onGenerate when button is clicked", () => {
    const onGenerate = vi.fn();
    render(<ReportCard template={mockTemplate} onGenerate={onGenerate} />);
    screen.getByText("Gerar Relat\u00f3rio").click();
    expect(onGenerate).toHaveBeenCalledWith("carteira-consolidada");
  });
});

describe("ReportList", () => {
  it("renders all templates", () => {
    render(
      <ReportList
        templates={[mockTemplate, { ...mockTemplate, id: "proventos", name: "Proventos" }]}
      />,
    );
    expect(screen.getByText("Carteira Consolidada")).toBeDefined();
    expect(screen.getByText("Proventos")).toBeDefined();
  });

  it("shows empty message when no templates", () => {
    render(<ReportList templates={[]} />);
    expect(screen.getByText(/nenhum template/i)).toBeDefined();
  });
});

describe("ReportError", () => {
  it("renders error message and retry button", () => {
    const onRetry = vi.fn();
    render(<ReportError message="Erro de teste" onRetry={onRetry} />);
    expect(screen.getByText("Erro de teste")).toBeDefined();
    screen.getByText("Tentar novamente").click();
    expect(onRetry).toHaveBeenCalled();
  });
});

describe("ReportLoading", () => {
  it("renders skeleton", () => {
    const { container } = render(<ReportLoading />);
    expect(container.querySelector('[data-testid="report-loading"]')).toBeDefined();
  });
});

describe("ReportExecutionItem", () => {
  it("renders execution details", () => {
    render(<ReportExecutionItem execution={mockExecution} />);
    expect(screen.getByText("Carteira Consolidada")).toBeDefined();
    expect(screen.getByText("Conclu\u00eddo")).toBeDefined();
    expect(screen.getByText("Download")).toBeDefined();
  });

  it("shows error message when execution failed", () => {
    const failedExecution: ReportExecutionHistoryViewModel = {
      ...mockExecution,
      status: "FAILED",
      error: "Falha ao gerar relatorio",
      fileUrl: undefined,
    };
    render(<ReportExecutionItem execution={failedExecution} />);
    expect(screen.getByText("Falhou")).toBeDefined();
    expect(screen.getByText("Falha ao gerar relatorio")).toBeDefined();
    expect(screen.queryByText("Download")).toBeNull();
  });
});
