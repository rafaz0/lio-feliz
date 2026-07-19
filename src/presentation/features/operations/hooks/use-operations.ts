import { useState, useCallback } from "react";
import type { OperacaoRegistradaDto } from "@/application/dtos/operacao";
import { toOperationViewModels, type OperationViewModel } from "../types/operations.view-model";

interface UseOperationsResult {
  operations: OperationViewModel[];
  addOperation: (dto: OperacaoRegistradaDto) => void;
  clear: () => void;
}

/**
 * Mantém o histórico de operações em client state (acumulado a partir das
 * mutations de registro). A Application Layer congelada não expõe query de
 * listagem; a apresentação não inventa contrato — a lista reflete o que foi
 * registrado nesta sessão.
 */
export function useOperations(): UseOperationsResult {
  const [dtos, setDtos] = useState<OperacaoRegistradaDto[]>([]);

  const addOperation = useCallback((dto: OperacaoRegistradaDto) => {
    setDtos((prev) => [dto, ...prev]);
  }, []);

  const clear = useCallback(() => setDtos([]), []);

  return {
    operations: toOperationViewModels(dtos),
    addOperation,
    clear,
  };
}
