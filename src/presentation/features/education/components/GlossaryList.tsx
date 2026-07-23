import type { GlossaryTermViewModel } from "../viewmodels/education.view-model";

interface GlossaryListProps {
  terms: GlossaryTermViewModel[];
  onSelect: (term: GlossaryTermViewModel) => void;
}

export function GlossaryList({ terms, onSelect }: GlossaryListProps) {
  if (terms.length === 0) return null;

  const grouped: Record<string, GlossaryTermViewModel[]> = {};
  for (const t of terms) {
    if (!grouped[t.category]) grouped[t.category] = [];
    grouped[t.category].push(t);
  }

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([category, categoryTerms]) => (
        <div key={category}>
          <h3 className="text-xs font-medium uppercase text-muted-foreground mb-2">
            {categoryTerms[0].categoryLabel}
          </h3>
          <div className="space-y-1">
            {categoryTerms.map((term) => (
              <button
                key={term.id}
                onClick={() => onSelect(term)}
                className="w-full text-left rounded-md px-3 py-2 text-sm hover:bg-muted transition"
              >
                {term.term}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
