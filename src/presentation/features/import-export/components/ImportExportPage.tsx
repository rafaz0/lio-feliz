import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useImportHistoryQuery } from "../hooks/use-import-history-query";
import { useImportMutation } from "../hooks/use-import-mutation";
import { useExportMutation } from "../hooks/use-export-mutation";
import { toImportJobViewModels } from "../types/import-export.view-model";

interface ImportExportPageProps {
  usuarioId: string;
  portfolioId: string;
}

export function ImportExportPage({ usuarioId, portfolioId }: ImportExportPageProps) {
  const [activeTab, setActiveTab] = useState<"import" | "export">("import");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: historicoData, isLoading, isError, error } = useImportHistoryQuery(usuarioId);
  const importMutation = useImportMutation();
  const exportMutation = useExportMutation();

  const jobs = historicoData?.jobs ? toImportJobViewModels(historicoData.jobs) : [];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleImportFile = async (formato: string) => {
    if (!selectedFile) return;

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

      await importMutation.mutateAsync({
        usuarioId,
        origem: formato,
        formato,
        arquivo: base64,
        arquivoSize: selectedFile.size,
        portfolioId,
        observacoes: `Importado de ${selectedFile.name}`,
      });

      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {}
  };

  return (
    <section data-testid="import-export-page" aria-label="Importação e Exportação" className="space-y-6">
      <div className="flex gap-4 border-b pb-2">
        <button
          className={`px-4 py-2 ${activeTab === "import" ? "border-b-2 border-primary font-bold" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("import")}
        >
          Importar Dados
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "export" ? "border-b-2 border-primary font-bold" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("export")}
        >
          Exportar Relatórios
        </button>
      </div>

      {activeTab === "import" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Importar Operações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Selecione um arquivo CSV, Excel ou JSON para importar.
              </p>

              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls,.json"
                  onChange={handleFileSelect}
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  data-testid="file-input"
                />
              </div>

              {selectedFile && (
                <div className="text-sm text-muted-foreground">
                  Arquivo selecionado: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                </div>
              )}

              <div className="flex gap-2">
                <button
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md disabled:opacity-50"
                  onClick={() => handleImportFile("CSV")}
                  disabled={importMutation.isPending || !selectedFile}
                  data-testid="import-csv-btn"
                >
                  {importMutation.isPending ? "Importando..." : "Importar CSV"}
                </button>
                <button
                  className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md disabled:opacity-50"
                  onClick={() => handleImportFile("EXCEL")}
                  disabled={importMutation.isPending || !selectedFile}
                  data-testid="import-excel-btn"
                >
                  Importar Excel
                </button>
                <button
                  className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md disabled:opacity-50"
                  onClick={() => handleImportFile("JSON")}
                  disabled={importMutation.isPending || !selectedFile}
                  data-testid="import-json-btn"
                >
                  Importar JSON
                </button>
              </div>

              {importMutation.data && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md text-sm">
                  {importMutation.data.operacoesImportadas} operações importadas, {importMutation.data.operacoesRejeitadas} rejeitadas
                </div>
              )}
              {importMutation.isError && importMutation.error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                  Erro ao importar: {importMutation.error.message}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Importações</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && <div className="text-sm text-muted-foreground">Carregando...</div>}
              {isError && <div className="text-sm text-red-500">Erro ao carregar histórico: {error?.message}</div>}
              {!isLoading && !isError && jobs.length === 0 && (
                <div className="text-sm text-muted-foreground">Nenhuma importação realizada</div>
              )}
              {!isLoading && jobs.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="py-2 pr-4">Arquivo</th>
                        <th className="py-2 pr-4">Formato</th>
                        <th className="py-2 pr-4">Status</th>
                        <th className="py-2 pr-4">Progresso</th>
                        <th className="py-2 pr-4">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map(job => (
                        <tr key={job.id} className="border-b">
                          <td className="py-2 pr-4">{job.fileName}</td>
                          <td className="py-2 pr-4">{job.format}</td>
                          <td className="py-2 pr-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              job.status === "COMPLETED" ? "bg-green-100 text-green-700" :
                              job.status === "FAILED" ? "bg-red-100 text-red-700" :
                              job.status === "PROCESSING" ? "bg-yellow-100 text-yellow-700" :
                              "bg-gray-100 text-gray-700"
                            }`}>
                              {job.status}
                            </span>
                          </td>
                          <td className="py-2 pr-4">{job.progressPercent}%</td>
                          <td className="py-2 pr-4">{new Date(job.createdAt).toLocaleDateString("pt-BR")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "export" && (
        <Card>
          <CardHeader>
            <CardTitle>Exportar Relatórios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Exporte seus dados em formato CSV ou JSON.
            </p>
            <div className="flex gap-2">
              <button
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
                onClick={() => {
                  exportMutation.mutateAsync({
                    portfolioId,
                    formato: "CSV",
                    templateId: "carteira-completa",
                  }).catch(() => {});
                }}
                disabled={exportMutation.isPending}
              >
                {exportMutation.isPending ? "Exportando..." : "Exportar Carteira (CSV)"}
              </button>
              <button
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md"
                onClick={() => {
                  exportMutation.mutateAsync({
                    portfolioId,
                    formato: "CSV",
                    templateId: "proventos",
                  }).catch(() => {});
                }}
                disabled={exportMutation.isPending}
              >
                Exportar Proventos
              </button>
              <button
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md"
                onClick={() => {
                  exportMutation.mutateAsync({
                    portfolioId,
                    formato: "CSV",
                    templateId: "operacoes",
                  }).catch(() => {});
                }}
                disabled={exportMutation.isPending}
              >
                Exportar Operações
              </button>
            </div>
            {exportMutation.data && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md text-sm">
                Relatório exportado: {exportMutation.data.fileName}
                {exportMutation.data.fileUrl && (
                  <a href={exportMutation.data.fileUrl} className="ml-2 text-primary underline" target="_blank" rel="noreferrer">Download</a>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </section>
  );
}
