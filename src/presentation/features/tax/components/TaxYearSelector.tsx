interface TaxYearSelectorProps {
  ano: number;
  anos: number[];
  onChange: (ano: number) => void;
}

export function TaxYearSelector({ ano, anos, onChange }: TaxYearSelectorProps) {
  return (
    <div data-testid="tax-year-selector" className="flex items-center gap-2">
      <label htmlFor="tax-ano" className="text-sm font-medium">
        Ano
      </label>
      <select
        id="tax-ano"
        data-testid="tax-ano-select"
        value={ano}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded-md border px-2 py-1 text-sm"
      >
        {anos.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
    </div>
  );
}
