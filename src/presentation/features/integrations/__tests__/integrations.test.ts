import { describe, it, expect } from "vitest";
import { toIntegrationViewModel, toIntegrationViewModels } from "../types/integration.view-model";
import type { IntegrationConfigDto } from "@/application/dtos/integracao";

const mockDto: IntegrationConfigDto = {
  id: "int-001",
  provider: "BRAPI",
  name: "Minha API BRAPI",
  authType: "API_KEY",
  status: "ACTIVE",
  lastSyncAt: "2026-07-19T10:00:00Z",
  errorMessage: undefined,
  createdAt: "2026-07-01T00:00:00Z",
  updatedAt: "2026-07-19T10:00:00Z",
};

describe("IntegrationConfigViewModel", () => {
  it("mapeia dto ativo para view model com cor verde", () => {
    const vm = toIntegrationViewModel(mockDto);
    expect(vm.id).toBe("int-001");
    expect(vm.provider).toBe("BRAPI");
    expect(vm.name).toBe("Minha API BRAPI");
    expect(vm.authType).toBe("API_KEY");
    expect(vm.status).toBe("ACTIVE");
    expect(vm.statusColor).toBe("text-green-600");
  });

  it("mapeia status ERROR para cor vermelha", () => {
    const dto: IntegrationConfigDto = {
      ...mockDto,
      status: "ERROR",
      errorMessage: "Falha de conexão",
    };
    const vm = toIntegrationViewModel(dto);
    expect(vm.statusColor).toBe("text-red-600");
    expect(vm.errorMessage).toBe("Falha de conexão");
  });

  it("mapeia status INACTIVE para cor cinza", () => {
    const dto: IntegrationConfigDto = { ...mockDto, status: "INACTIVE" };
    const vm = toIntegrationViewModel(dto);
    expect(vm.statusColor).toBe("text-gray-400");
  });

  it("mapeia status PENDING para cor amarela", () => {
    const dto: IntegrationConfigDto = { ...mockDto, status: "PENDING" };
    const vm = toIntegrationViewModel(dto);
    expect(vm.statusColor).toBe("text-yellow-600");
  });

  it("lida com lastSyncAt ausente", () => {
    const dto: IntegrationConfigDto = { ...mockDto, lastSyncAt: undefined };
    const vm = toIntegrationViewModel(dto);
    expect(vm.lastSyncAt).toBeUndefined();
  });

  it("converte lista de dtos para view models", () => {
    const vms = toIntegrationViewModels([
      mockDto,
      { ...mockDto, id: "int-002", provider: "YAHOO_FINANCE" },
    ]);
    expect(vms).toHaveLength(2);
    expect(vms[0].provider).toBe("BRAPI");
    expect(vms[1].provider).toBe("YAHOO_FINANCE");
  });
});
