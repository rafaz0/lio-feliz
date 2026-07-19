import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SyncForm } from "../components/SyncForm";
import { SyncButton } from "../components/SyncButton";
import { SyncResultCard } from "../components/SyncResultCard";
import { SyncLoading } from "../components/SyncLoading";
import { SyncError } from "../components/SyncError";
import { SyncEmpty } from "../components/SyncEmpty";
import { toSyncResultViewModel } from "../types/sync.view-model";
import type {
  SincronizacaoRealizadaDto,
  SincronizacaoErroDto,
} from "@/application/dtos/sincronizacao";

const erroDto: SincronizacaoErroDto = {
  fonte: "b3-csv",
  linha: 3,
  tipo: "DOMAIN_ERROR",
  mensagem: "Ativo inválido",
};

const dto: SincronizacaoRealizadaDto = {
  fonte: "b3-csv",
  dataSincronizacao: new Date("2026-07-19T10:00:00"),
  totalProcessado: 10,
  totalNovo: 7,
  totalIgnorado: 3,
  erros: [erroDto],
};

describe("sync components", () => {
  it("SyncForm expõe fonte acessível", () => {
    render(<SyncForm fonte="b3-csv" onFonteChange={() => {}} />);
    expect(screen.getByTestId("sync-form")).toBeDefined();
    expect(screen.getByLabelText("Fonte de dados")).toBeDefined();
    expect(screen.getByTestId("sync-fonte-select")).toBeDefined();
  });

  it("SyncButton expõe disparo e estado de carregamento", () => {
    const { rerender } = render(<SyncButton isPending={false} onSync={() => {}} />);
    expect(screen.getByTestId("sync-submit")).toBeDefined();
    expect(screen.getByTestId("sync-submit").textContent).toContain("Sincronizar");

    rerender(<SyncButton isPending onSync={() => {}} />);
    expect(screen.getByTestId("sync-submit").getAttribute("aria-busy")).toBe("true");
  });

  it("SyncLoading expõe estado de carregamento", () => {
    render(<SyncLoading />);
    expect(screen.getByTestId("sync-loading")).toBeDefined();
    expect(screen.getByTestId("sync-loading").getAttribute("aria-busy")).toBe("true");
  });

  it("SyncError expõe retry acessível", () => {
    render(<SyncError message="falhou" onRetry={() => {}} />);
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByTestId("sync-retry")).toBeDefined();
  });

  it("SyncEmpty renderiza estado vazio", () => {
    render(<SyncEmpty />);
    expect(screen.getByTestId("sync-empty")).toBeDefined();
    expect(screen.getByText("Nenhuma sincronização realizada ainda.")).toBeDefined();
  });

  it("SyncResultCard lista métricas e erros", () => {
    render(<SyncResultCard resultado={toSyncResultViewModel(dto)} />);
    expect(screen.getByTestId("sync-result")).toBeDefined();
    expect(screen.getByTestId("sync-result-processado").textContent).toContain("10");
    expect(screen.getByTestId("sync-result-novas").textContent).toContain("7");
    expect(screen.getByTestId("sync-result-ignoradas").textContent).toContain("3");
    expect(screen.getByTestId("sync-result-erros")).toBeDefined();
  });

  it("SyncResultCard sem erros não expõe bloco de erros", () => {
    render(<SyncResultCard resultado={toSyncResultViewModel({ ...dto, erros: [] })} />);
    expect(screen.queryByTestId("sync-result-erros")).toBeNull();
  });
});
