import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OperationForm } from "./OperationForm";
import { OperationHistory } from "./OperationHistory";
import { OperationEmpty } from "./OperationEmpty";
import { OperationError } from "./OperationError";
import { useOperations } from "../hooks/use-operations";

interface OperationPageProps {
  portfolioId: string;
}

export function OperationPage({ portfolioId }: OperationPageProps) {
  const { operations, addOperation } = useOperations();
  const [erro, setErro] = useState<string | null>(null);

  if (erro) {
    return <OperationError message={erro} onRetry={() => setErro(null)} />;
  }

  return (
    <section data-testid="operation-page" aria-label="Operações" className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Registrar Operação</CardTitle>
        </CardHeader>
        <CardContent>
          <OperationForm
            portfolioId={portfolioId}
            onSuccess={(dto) => {
              setErro(null);
              addOperation(dto);
            }}
          />
        </CardContent>
      </Card>

      {operations.length === 0 ? <OperationEmpty /> : <OperationHistory operations={operations} />}
    </section>
  );
}
