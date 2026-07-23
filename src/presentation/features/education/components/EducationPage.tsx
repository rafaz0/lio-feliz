import { useState } from "react";
import { useSearchGlossaryQuery } from "../hooks/use-education-query";
import { GlossaryList } from "./GlossaryList";
import { TermDetail } from "./TermDetail";
import { EducationLoading } from "./EducationLoading";
import { EducationEmpty } from "./EducationEmpty";
import { EducationError } from "./EducationError";
import type { GlossaryTermViewModel } from "../viewmodels/education.view-model";

export function EducationPage() {
  const [search, setSearch] = useState("");
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTermViewModel | null>(null);

  const { data: results, isLoading, isError, refetch } = useSearchGlossaryQuery(search);

  if (selectedTerm) {
    return <TermDetail term={selectedTerm} onBack={() => setSelectedTerm(null)} />;
  }

  return (
    <div data-testid="education-page" className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Glossario</h1>
        <p className="text-sm text-muted-foreground">Termos e conceitos do mercado financeiro.</p>
      </div>

      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar termo..." className="w-full rounded-md border px-3 py-2 text-sm" />

      {isLoading && <EducationLoading />}
      {isError && <EducationError message="Erro ao carregar glossario" onRetry={refetch} />}
      {search && results && results.length === 0 && <EducationEmpty />}
      {results && results.length > 0 && <GlossaryList terms={results} onSelect={(t) => setSelectedTerm(t)} />}
      {!search && !results && (
        <div className="py-8 text-center text-sm text-muted-foreground">Digite ao menos 2 caracteres para buscar.</div>
      )}
    </div>
  );
}
