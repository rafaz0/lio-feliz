import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIntegrationsQuery } from "../hooks/use-integrations-query";
import { useSyncMutation } from "../hooks/use-sync-mutation";
import { toIntegrationViewModels } from "../types/integration.view-model";

export function IntegrationsPage() {
  const { data, isLoading, isError, error } = useIntegrationsQuery();
  const syncMutation = useSyncMutation();

  const integrations = data?.integrations ? toIntegrationViewModels(data.integrations) : [];

  return (
    <section data-testid="integrations-page" aria-label="Integrações" className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Integrações</h2>
      </div>

      {isLoading && <div className="text-muted-foreground">Carregando integrações...</div>}
      {isError && <div className="text-red-500">Erro ao carregar integrações: {error?.message}</div>}

      {!isLoading && !isError && integrations.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            <p className="text-lg mb-2">Nenhuma integração configurada</p>
            <p className="text-sm">Conecte-se a corretoras e plataformas para sincronizar automaticamente suas operações.</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {integrations.map(integration => (
          <Card key={integration.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground">{integration.provider}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${integration.statusColor} bg-opacity-10`}>
                  {integration.status}
                </span>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                <span>Auth: {integration.authType}</span>
                {integration.lastSyncAt && (
                  <span>Última sincronização: {new Date(integration.lastSyncAt).toLocaleDateString("pt-BR")}</span>
                )}
              </div>
              {integration.errorMessage && (
                <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
                  {integration.errorMessage}
                </div>
              )}
              <button
                className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm"
                onClick={() => {
                  syncMutation.mutateAsync({ integrationId: integration.id, type: "MANUAL" }).catch(() => {});
                }}
                disabled={syncMutation.isPending}
              >
                {syncMutation.isPending ? "Sincronizando..." : "Sincronizar Agora"}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
