import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SyncForm } from "./SyncForm";
import { SyncButton } from "./SyncButton";
import { SyncResultCard } from "./SyncResultCard";
import { SyncLoading } from "./SyncLoading";
import { SyncError } from "./SyncError";
import { SyncEmpty } from "./SyncEmpty";
import { useSyncMutation } from "../hooks/use-sync-mutation";
import { useAuth } from "@/presentation/features/auth/hooks/use-auth";
import { toSyncResultViewModel, type SyncResultViewModel } from "../types/sync.view-model";

interface SyncPageProps {
  fonteInicial?: string;
}

export function SyncPage({ fonteInicial = "b3-csv" }: SyncPageProps) {
  const { user } = useAuth();
  const usuarioId = user?.id ?? "";
  const [fonte, setFonte] = useState(fonteInicial);
  const [resultado, setResultado] = useState<SyncResultViewModel | null>(null);

  const { mutateAsync, isPending, isError, error } = useSyncMutation();

  const handleSync = () => {
    if (!usuarioId) return;
    setResultado(null);
    mutateAsync({ usuarioId, fonte })
      .then((dto) => setResultado(toSyncResultViewModel(dto)))
      .catch(() => {});
  };

  if (isPending) {
    return (
      <section data-testid="sync-page" aria-label="Sincronização" className="grid gap-4">
        <SyncLoading />
      </section>
    );
  }

  if (isError) {
    return (
      <section data-testid="sync-page" aria-label="Sincronização" className="grid gap-4">
        <SyncError message={(error as { message?: string })?.message ?? "Falha na sincronização"} />
      </section>
    );
  }

  return (
    <section data-testid="sync-page" aria-label="Sincronização" className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Sincronização de dados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SyncForm fonte={fonte} onFonteChange={setFonte} />
          <SyncButton isPending={isPending} onSync={handleSync} disabled={!usuarioId} />
        </CardContent>
      </Card>

      {resultado ? <SyncResultCard resultado={resultado} /> : <SyncEmpty />}
    </section>
  );
}
