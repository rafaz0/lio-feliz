import type { GlossaryTermViewModel } from "../viewmodels/education.view-model";

interface TermDetailProps { term: GlossaryTermViewModel; onBack: () => void }

export function TermDetail({ term, onBack }: TermDetailProps) {
  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-xs text-muted-foreground hover:text-foreground">&larr; Voltar</button>
      <div className="rounded-lg border p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold">{term.term}</h2>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{term.categoryLabel}</span>
        </div>
        <p className="text-sm leading-relaxed">{term.definition}</p>
        {term.synonyms.length > 0 && (
          <div><span className="text-xs font-medium text-muted-foreground">Sinonimos: </span>
            <span className="text-xs">{term.synonyms.join(", ")}</span></div>
        )}
        {term.relatedTerms.length > 0 && (
          <div><span className="text-xs font-medium text-muted-foreground">Termos relacionados: </span>
            <span className="text-xs">{term.relatedTerms.join(", ")}</span></div>
        )}
      </div>
    </div>
  );
}
