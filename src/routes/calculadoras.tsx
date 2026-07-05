import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calculator, DollarSign, PiggyBank, TrendingUp, Target, Landmark } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/format";

export const Route = createFileRoute("/calculadoras")({
  head: () => ({
    meta: [
      { title: "Calculadoras — Investidor Pro" },
      { name: "description", content: "Calculadoras financeiras: DCF, Preço Teto, CDB, Juros Compostos e Reserva Emergencial." },
    ],
  }),
  component: CalculatorsPage,
});

type CalcTab = "compound" | "emergency" | "dcf" | "priceTarget" | "cdb";

function CalculatorsPage() {
  const [tab, setTab] = useState<CalcTab>("compound");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-[900px] px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Calculator className="size-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Calculadoras</h1>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <Button variant={tab === "compound" ? "default" : "outline"} size="sm" onClick={() => setTab("compound")}>
            <PiggyBank className="mr-1.5 size-3.5" /> Juros Compostos
          </Button>
          <Button variant={tab === "emergency" ? "default" : "outline"} size="sm" onClick={() => setTab("emergency")}>
            <DollarSign className="mr-1.5 size-3.5" /> Reserva
          </Button>
          <Button variant={tab === "dcf" ? "default" : "outline"} size="sm" onClick={() => setTab("dcf")}>
            <TrendingUp className="mr-1.5 size-3.5" /> DCF
          </Button>
          <Button variant={tab === "priceTarget" ? "default" : "outline"} size="sm" onClick={() => setTab("priceTarget")}>
            <Target className="mr-1.5 size-3.5" /> Preço Teto
          </Button>
          <Button variant={tab === "cdb" ? "default" : "outline"} size="sm" onClick={() => setTab("cdb")}>
            <Landmark className="mr-1.5 size-3.5" /> CDB
          </Button>
        </div>

        {tab === "compound" && <CompoundInterest />}
        {tab === "emergency" && <EmergencyFund />}
        {tab === "dcf" && <DcfCalculator />}
        {tab === "priceTarget" && <PriceTarget />}
        {tab === "cdb" && <CdbCalculator />}
      </main>
    </div>
  );
}

function ResultCard({ label, value, variant }: { label: string; value: string; variant?: "positive" | "negative" | "neutral" }) {
  const color = variant === "positive" ? "text-positive" : variant === "negative" ? "text-negative" : "";
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={"tabular mt-1 text-base font-semibold " + color}>{value}</div>
    </div>
  );
}

function NumberInput({ label, value, onChange, step, suffix, placeholder }: {
  label: string; value: number; onChange: (v: number) => void; step?: string; suffix?: string; placeholder?: string;
}) {
  return (
    <div>
      <Label>{label}{suffix ? ` (${suffix})` : ""}</Label>
      <Input type="number" step={step ?? "1"} value={value || ""} placeholder={placeholder ?? "0"} onChange={(e) => onChange(Number(e.target.value) || 0)} />
    </div>
  );
}

/* ── Juros Compostos ── */
function CompoundInterest() {
  const [initial, setInitial] = useState(1000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(1);
  const [months, setMonths] = useState(120);

  let totalInvested = initial;
  let finalValue = initial;
  for (let i = 0; i < months; i++) {
    finalValue = finalValue * (1 + rate / 100) + monthly;
    totalInvested += monthly;
  }
  const earnings = finalValue - totalInvested;
  const returnPct = totalInvested > 0 ? ((finalValue - totalInvested) / totalInvested) * 100 : 0;

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-6 flex items-center gap-2"><PiggyBank className="size-5 text-primary" /><h2 className="text-lg font-semibold">Juros Compostos</h2></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberInput label="Valor inicial" value={initial} onChange={setInitial} suffix="R$" />
        <NumberInput label="Aporte mensal" value={monthly} onChange={setMonthly} suffix="R$" />
        <NumberInput label="Taxa mensal" value={rate} onChange={setRate} suffix="%" step="0.1" />
        <NumberInput label="Período" value={months} onChange={setMonths} suffix="meses" />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 rounded-md bg-surface-2 p-4 sm:grid-cols-4">
        <ResultCard label="Total investido" value={formatBRL(totalInvested)} />
        <ResultCard label="Valor final" value={formatBRL(finalValue)} />
        <ResultCard label="Rendimento" value={formatBRL(earnings)} variant="positive" />
        <ResultCard label="Rentabilidade" value={`${returnPct.toFixed(1)}%`} variant="positive" />
      </div>
    </div>
  );
}

/* ── Reserva Emergencial ── */
function EmergencyFund() {
  const [monthlyExpense, setMonthlyExpense] = useState(3000);
  const [monthsCover, setMonthsCover] = useState(6);
  const [currentSavings, setCurrentSavings] = useState(5000);
  const [monthlySaving, setMonthlySaving] = useState(1000);

  const target = monthlyExpense * monthsCover;
  const remaining = Math.max(0, target - currentSavings);
  const timeToGoal = monthlySaving > 0 ? Math.ceil(remaining / monthlySaving) : 0;

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-6 flex items-center gap-2"><DollarSign className="size-5 text-primary" /><h2 className="text-lg font-semibold">Reserva Emergencial</h2></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberInput label="Gasto mensal" value={monthlyExpense} onChange={setMonthlyExpense} suffix="R$" />
        <NumberInput label="Meses de cobertura" value={monthsCover} onChange={setMonthsCover} />
        <NumberInput label="Guardado hoje" value={currentSavings} onChange={setCurrentSavings} suffix="R$" />
        <NumberInput label="Poupança mensal" value={monthlySaving} onChange={setMonthlySaving} suffix="R$" />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 rounded-md bg-surface-2 p-4 sm:grid-cols-4">
        <ResultCard label="Meta" value={formatBRL(target)} />
        <ResultCard label="Já guardado" value={formatBRL(currentSavings)} />
        <ResultCard label="Falta" value={formatBRL(remaining)} variant={remaining > 0 ? "negative" : "positive"} />
        <ResultCard label="Tempo" value={timeToGoal > 0 ? `${timeToGoal} meses` : "Meta atingida!"} variant={timeToGoal > 0 ? "neutral" : "positive"} />
      </div>
    </div>
  );
}

/* ── DCF (Fluxo de Caixa Descontado) ── */
function DcfCalculator() {
  const [fcfPerShare, setFcfPerShare] = useState(8);
  const [growth1, setGrowth1] = useState(10);
  const [growth2, setGrowth2] = useState(5);
  const [terminalGrowth, setTerminalGrowth] = useState(3);
  const [wacc, setWacc] = useState(12);
  const [years1, setYears1] = useState(5);
  const [years2, setYears2] = useState(5);
  const [currentPrice, setCurrentPrice] = useState(0);

  const g1 = growth1 / 100;
  const g2 = growth2 / 100;
  const tg = terminalGrowth / 100;
  const d = wacc / 100;

  let pvFcf = 0;
  let cf = fcfPerShare;
  for (let y = 1; y <= years1; y++) {
    cf *= (1 + g1);
    pvFcf += cf / Math.pow(1 + d, y);
  }
  for (let y = 1; y <= years2; y++) {
    cf *= (1 + g2);
    pvFcf += cf / Math.pow(1 + d, years1 + y);
  }

  const terminalValue = cf * (1 + tg) / (d - tg);
  const pvTerminal = terminalValue / Math.pow(1 + d, years1 + years2);
  const fairValue = pvFcf + pvTerminal;
  const upside = currentPrice > 0 ? ((fairValue - currentPrice) / currentPrice) * 100 : 0;

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-6 flex items-center gap-2"><TrendingUp className="size-5 text-primary" /><h2 className="text-lg font-semibold">DCF — Fluxo de Caixa Descontado</h2></div>
      <p className="mb-4 text-xs text-muted-foreground">Valuation pelo método DCF. Preencha o FCF por ação e as premissas de crescimento.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberInput label="FCF por ação" value={fcfPerShare} onChange={setFcfPerShare} suffix="R$" step="0.1" />
        <NumberInput label="Crescimento (anos 1–5)" value={growth1} onChange={setGrowth1} suffix="%" step="0.5" />
        <NumberInput label="Período 1" value={years1} onChange={setYears1} suffix="anos" />
        <NumberInput label="Crescimento (anos 6–10)" value={growth2} onChange={setGrowth2} suffix="%" step="0.5" />
        <NumberInput label="Período 2" value={years2} onChange={setYears2} suffix="anos" />
        <NumberInput label="Crescimento terminal" value={terminalGrowth} onChange={setTerminalGrowth} suffix="%" step="0.1" />
        <NumberInput label="WACC (Taxa de desconto)" value={wacc} onChange={setWacc} suffix="%" step="0.5" />
        <NumberInput label="Preço atual (opcional)" value={currentPrice} onChange={setCurrentPrice} suffix="R$" step="0.1" />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 rounded-md bg-surface-2 p-4 sm:grid-cols-4">
        <ResultCard label="Valor Justo" value={formatBRL(fairValue)} variant="positive" />
        <ResultCard label="FCF + Terminal PV" value={formatBRL(pvFcf)} />
        <ResultCard label="PV Terminal" value={formatBRL(pvTerminal)} />
        <ResultCard label="% Terminal" value={`${fairValue > 0 ? (pvTerminal / fairValue * 100).toFixed(1) : 0}%`} />
        {currentPrice > 0 && (
          <ResultCard label="Margem de Segurança" value={`${upside >= 0 ? "+" : ""}${upside.toFixed(1)}%`} variant={upside >= 0 ? "positive" : "negative"} />
        )}
      </div>
    </div>
  );
}

/* ── Preço Teto / Price Target ── */
function PriceTarget() {
  const [method, setMethod] = useState<"pl" | "pvp" | "dy">("pl");
  const [currentPrice, setCurrentPrice] = useState(35);
  const [lpa, setLpa] = useState(4.5);
  const [vpa, setVpa] = useState(25);
  const [dy, setDy] = useState(6);
  const [targetPl, setTargetPl] = useState(10);
  const [targetPvp, setTargetPvp] = useState(1.5);
  const [targetDy, setTargetDy] = useState(5);

  let targetPrice = 0;
  let label = "";
  switch (method) {
    case "pl":
      targetPrice = lpa * targetPl;
      label = "P/L";
      break;
    case "pvp":
      targetPrice = vpa * targetPvp;
      label = "P/VP";
      break;
    case "dy":
      targetPrice = lpa > 0 ? (lpa * (dy / 100)) / (targetDy / 100) : 0;
      label = "Dividend Yield";
      break;
  }

  const upside = currentPrice > 0 ? ((targetPrice - currentPrice) / currentPrice) * 100 : 0;

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-6 flex items-center gap-2"><Target className="size-5 text-primary" /><h2 className="text-lg font-semibold">Preço Teto</h2></div>
      <p className="mb-4 text-xs text-muted-foreground">Calcule o preço justo com base em múltiplos ou dividend yield esperado.</p>

      <div className="mb-4 flex gap-2">
        {(["pl", "pvp", "dy"] as const).map((m) => (
          <Button key={m} variant={method === m ? "default" : "outline"} size="sm" onClick={() => setMethod(m)}>
            {m === "pl" ? "P/L" : m === "pvp" ? "P/VP" : "Dividend Yield"}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <NumberInput label="Preço atual" value={currentPrice} onChange={setCurrentPrice} suffix="R$" step="0.1" />
        {method === "pl" && (
          <>
            <NumberInput label="LPA" value={lpa} onChange={setLpa} suffix="R$" step="0.1" />
            <NumberInput label={`P/L alvo`} value={targetPl} onChange={setTargetPl} step="0.5" />
          </>
        )}
        {method === "pvp" && (
          <>
            <NumberInput label="VPA" value={vpa} onChange={setVpa} suffix="R$" step="0.1" />
            <NumberInput label={`P/VP alvo`} value={targetPvp} onChange={setTargetPvp} step="0.1" />
          </>
        )}
        {method === "dy" && (
          <>
            <NumberInput label="DY atual" value={dy} onChange={setDy} suffix="%" step="0.5" />
            <NumberInput label="LPA" value={lpa} onChange={setLpa} suffix="R$" step="0.1" />
            <NumberInput label={`DY alvo`} value={targetDy} onChange={setTargetDy} suffix="%" step="0.5" />
          </>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 rounded-md bg-surface-2 p-4 sm:grid-cols-4">
        <ResultCard label={`Preço Teto (${label})`} value={formatBRL(targetPrice)} variant="positive" />
        <ResultCard label="Preço Atual" value={formatBRL(currentPrice)} />
        <ResultCard label="Upside / Downside" value={`${upside >= 0 ? "+" : ""}${upside.toFixed(1)}%`} variant={upside >= 0 ? "positive" : "negative"} />
        <ResultCard label="Recomendação" value={upside >= 20 ? "COMPRA" : upside >= 0 ? "NEUTRA" : "VENDA"} variant={upside >= 20 ? "positive" : upside >= 0 ? "neutral" : "negative"} />
      </div>
    </div>
  );
}

/* ── CDB / Renda Fixa ── */
function CdbCalculator() {
  const [amount, setAmount] = useState(10000);
  const [cdiRate, setCdiRate] = useState(13.65);
  const [spread, setSpread] = useState(100);
  const [days, setDays] = useState(365);

  const annualRate = cdiRate * (spread / 100);
  const grossReturn = amount * Math.pow(1 + annualRate / 100, days / 365) - amount;

  let irRate = 0;
  if (days <= 180) irRate = 22.5;
  else if (days <= 360) irRate = 20;
  else if (days <= 720) irRate = 17.5;
  else irRate = 15;

  const irValue = grossReturn * (irRate / 100);
  const netReturn = grossReturn - irValue;
  const netRate = amount > 0 ? (Math.pow(1 + netReturn / amount, 365 / days) - 1) * 100 : 0;

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-6 flex items-center gap-2"><Landmark className="size-5 text-primary" /><h2 className="text-lg font-semibold">Simulador de CDB</h2></div>
      <p className="mb-4 text-xs text-muted-foreground">Simule a rentabilidade de um CDB com base no % do CDI e prazo.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberInput label="Valor investido" value={amount} onChange={setAmount} suffix="R$" />
        <NumberInput label="CDI anual" value={cdiRate} onChange={setCdiRate} suffix="%" step="0.1" />
        <NumberInput label="% do CDI" value={spread} onChange={setSpread} suffix="%" step="1" />
        <NumberInput label="Prazo" value={days} onChange={setDays} suffix="dias" />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 rounded-md bg-surface-2 p-4 sm:grid-cols-4">
        <ResultCard label="Taxa bruta anual" value={`${annualRate.toFixed(2)}%`} />
        <ResultCard label="Rendimento bruto" value={formatBRL(grossReturn)} variant="positive" />
        <ResultCard label={`IR (${irRate}%)`} value={`-${formatBRL(irValue)}`} variant="negative" />
        <ResultCard label="Rendimento líquido" value={formatBRL(netReturn)} variant="positive" />
        <ResultCard label="Taxa líquida anual" value={`${netRate.toFixed(2)}%`} />
        <ResultCard label="Valor final líquido" value={formatBRL(amount + netReturn)} variant="positive" />
      </div>
    </div>
  );
}
