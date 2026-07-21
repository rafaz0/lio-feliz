import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIntegrationsQuery } from "../hooks/use-integrations-query";
import { useSyncMutation } from "../hooks/use-sync-mutation";
import { toIntegrationViewModels } from "../types/integration.view-model";

const PROVIDERS = [
  { value: "BRAPI", label: "BRAPI" },
  { value: "YAHOO_FINANCE", label: "Yahoo Finance" },
  { value: "CUSTOM", label: "Personalizado" },
] as const;

export function IntegrationsPage() {
  const { data, isLoading, isError, error, refetch } = useIntegrationsQuery();
  const syncMutation = useSyncMutation();
  const [showConfig, setShowConfig] = useState(false);
  const [configForm, setConfigForm] = useState({
    provider: "BRAPI",
    name: "",
    authType: "API_KEY",
    configData: {} as Record<string, string>,
  });

  const integrations = data?.integrations ? toIntegrationViewModels(data.integrations) : [];

  const handleSaveConfig = async () => {
    if (!configForm.name.trim()) return;
    setShowConfig(false);
    setTimeout(() => refetch(), 500);
  };

  return (
    <section data-testid="integrations-page" aria-label="Integrações" className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Integrações</h2>
        <button
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm"
          onClick={() => setShowConfig(!showConfig)}
          data-testid="config-integration-btn"
        >
          {showConfig ? "Cancelar" : "Nova Integração"}
        </button>
      </div>

      {showConfig && (
        <Card data-testid="config-form">
          <CardHeader>
            <CardTitle>Configurar Integração</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Provedor</label>
              <select
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={configForm.provider}
                onChange={e => setConfigForm(f => ({ ...f, provider: e.target.value }))}
              >
                {PROVIDERS.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 text-sm"
                placeholder="Minha API BRAPI"
                value={configForm.name}
                onChange={e => setConfigForm(f => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tipo de Autenticação</label>
              <select
                className="w-full border rounded-md px-3 py-2 text-sm"
                value={configForm.authType}
                onChange={e => setConfigForm(f => ({ ...f, authType: e.target.value }))}
              >
                <option value="API_KEY">Chave de API</option>
                <option value="NONE">Pública</option>
              </select>
            </div>
            {configForm.authType === "API_KEY" && (
              <div>
                <label className="block text-sm font-medium mb-1">API Key</label>
                <input
                  type="password"
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  placeholder="Sua chave de API"
                  onChange={e => setConfigForm(f => ({ ...f, configData: { ...f.configData, apiKey: e.target.value } }))}
                />
              </div>
            )}
            <button
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm"
              onClick={handleSaveConfig}
              disabled={!configForm.name.trim()}
            >
              Salvar
            </button>
          </CardContent>
        </Card>
      )}

      {isLoading && <div className="text-muted-foreground">Carregando integrações...</div>}
      {isError && <div className="text-red-500">Erro ao carregar integrações: {error?.message}</div>}

      {!isLoading && !isError && integrations.length === 0 && !showConfig && (
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
                data-testid={`sync-btn-${integration.id}`}
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
