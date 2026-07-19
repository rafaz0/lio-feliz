import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OperationTable } from "./OperationTable";
import { OperationFilters } from "./OperationFilters";
import type { OperationViewModel, OperationFiltersViewModel } from "../types/operations.view-model";
import { filterOperations } from "../types/operations.view-model";

interface OperationHistoryProps {
  operations: OperationViewModel[];
}

export function OperationHistory({ operations }: OperationHistoryProps) {
  const [filtros, setFiltros] = useState<OperationFiltersViewModel>({
    termo: "",
    tipo: "TODOS",
  });

  const visiveis = useMemo(() => filterOperations(operations, filtros), [operations, filtros]);

  return (
    <Card data-testid="operation-history">
      <CardHeader>
        <CardTitle>Histórico de Operações</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <OperationFilters filtros={filtros} onFiltroChange={setFiltros} />
        <OperationTable operations={visiveis} />
      </CardContent>
    </Card>
  );
}
