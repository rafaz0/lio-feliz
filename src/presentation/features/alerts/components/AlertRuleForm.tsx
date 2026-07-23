import { useState } from "react";

interface AlertRuleFormProps {
  onSave: (input: { name: string; eventType: string; daysBefore: number; assetFilter: string }) => void;
  isPending: boolean;
}

export function AlertRuleForm({ onSave, isPending }: AlertRuleFormProps) {
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState("dividend");
  const [daysBefore, setDaysBefore] = useState("5");
  const [assetFilter, setAssetFilter] = useState("");

  const handleSave = () => {
    onSave({ name, eventType, daysBefore: Number.parseInt(daysBefore) || 5, assetFilter });
    setName(""); setEventType("dividend"); setDaysBefore("5"); setAssetFilter("");
  };

  return (
    <div data-testid="alert-rule-form" className="rounded-lg border p-4 space-y-3">
      <h3 className="text-sm font-semibold">Nova Regra de Alerta</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome da regra" className="w-full rounded-md border px-3 py-2 text-sm" />
      <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="w-full rounded-md border px-3 py-2 text-sm">
        <option value="dividend">Dividendo</option><option value="exDate">Data Ex</option><option value="earnings">Resultado</option><option value="maturity">Vencimento</option>
      </select>
      <div className="flex gap-2">
        <input type="number" value={daysBefore} onChange={(e) => setDaysBefore(e.target.value)} placeholder="Dias antes" className="w-24 rounded-md border px-3 py-2 text-sm" />
        <input value={assetFilter} onChange={(e) => setAssetFilter(e.target.value)} placeholder="Filtro tickers (opcional)" className="flex-1 rounded-md border px-3 py-2 text-sm" />
      </div>
      <button onClick={handleSave} disabled={isPending || !name} className="rounded-md bg-foreground px-3 py-2 text-sm text-background disabled:opacity-50">Criar Regra</button>
    </div>
  );
}
