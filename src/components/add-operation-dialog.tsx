import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { format, addYears } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { createOperation } from "@/lib/operations.functions";
import type { AssetType, Currency } from "@/lib/portfolio";

const EXAMPLES: Record<AssetType, { ticker: string; name: string }[]> = {
  stock: [
    { ticker: "PETR4", name: "Petrobras" },
    { ticker: "VALE3", name: "Vale" },
    { ticker: "ITUB4", name: "Itaú Unibanco" },
    { ticker: "BBDC4", name: "Bradesco" },
    { ticker: "BBAS3", name: "Banco do Brasil" },
    { ticker: "ABEV3", name: "Ambev" },
    { ticker: "WEGE3", name: "WEG" },
    { ticker: "RENT3", name: "Localiza" },
    { ticker: "GOAU4", name: "Gerdau" },
    { ticker: "GGBR4", name: "Gerdau Metalúrgica" },
    { ticker: "CSNA3", name: "CSN" },
    { ticker: "USIM5", name: "Usiminas" },
    { ticker: "CMIG4", name: "Cemig" },
    { ticker: "ELET3", name: "Eletrobras" },
    { ticker: "EMBR3", name: "Embraer" },
    { ticker: "JBSS3", name: "JBS" },
    { ticker: "BRFS3", name: "BRF" },
    { ticker: "B3SA3", name: "B3" },
    { ticker: "RADL3", name: "Raia Drogasil" },
    { ticker: "HAPV3", name: "Hapvida" },
    { ticker: "RAIL3", name: "Rumo Logística" },
    { ticker: "SUZB3", name: "Suzano" },
    { ticker: "LREN3", name: "Lojas Renner" },
    { ticker: "MGLU3", name: "Magazine Luiza" },
    { ticker: "AZUL4", name: "Azul" },
    { ticker: "MRFG3", name: "Marfrig" },
    { ticker: "BEEF3", name: "Minerva" },
    { ticker: "TOTS3", name: "Totvs" },
    { ticker: "SBSP3", name: "Sabesp" },
    { ticker: "EGIE3", name: "Engie" },
    { ticker: "CPFE3", name: "CPFL" },
    { ticker: "PRIO3", name: "PetroRio" },
    { ticker: "ENGI11", name: "Energisa" },
    { ticker: "KLBN11", name: "Klabin" },
    { ticker: "SLCE3", name: "SLC Agrícola" },
  ],
  fii: [
    { ticker: "HGLG11", name: "CSHG Logística" },
    { ticker: "KNRI11", name: "Kinea Renda Imobiliária" },
    { ticker: "XPLG11", name: "XP Logística" },
    { ticker: "MXRF11", name: "Maxi Renda" },
    { ticker: "IRDM11", name: "Iridium" },
    { ticker: "BCFF11", name: "BTG Pactual Fundo" },
    { ticker: "HGBS11", name: "Hedge Brasil Shopping" },
    { ticker: "VISC11", name: "Vinci Shopping" },
    { ticker: "CPTS11", name: "Capitânia Securities" },
    { ticker: "KNIP11", name: "Kinea Índice de Preços" },
    { ticker: "RBRR11", name: "RBR Rendimentos" },
    { ticker: "HGCR11", name: "CSHG Real Estate" },
    { ticker: "HSML11", name: "Hispano Shopping" },
    { ticker: "XPML11", name: "XP Malls" },
    { ticker: "VILG11", name: "Vinci Logística" },
    { ticker: "TORD11", name: "Tordesilhas" },
  ],
  bdr: [
    { ticker: "AAPL34", name: "Apple BDR" },
    { ticker: "MSFT34", name: "Microsoft BDR" },
    { ticker: "AMZO34", name: "Amazon BDR" },
    { ticker: "NVDC34", name: "NVIDIA BDR" },
    { ticker: "GOOG34", name: "Google/Alphabet BDR" },
    { ticker: "TSLA34", name: "Tesla BDR" },
    { ticker: "MELI34", name: "Mercado Libre BDR" },
    { ticker: "KEPL34", name: "Kepco BDR" },
  ],
  etf: [
    { ticker: "BOVA11", name: "iShares Ibovespa ETF" },
    { ticker: "SMAL11", name: "iShares Small Cap ETF" },
    { ticker: "HASH11", name: "Hashdex Nasdaq Crypto ETF" },
    { ticker: "IVVB11", name: "iShares S&P 500 ETF" },
    { ticker: "WRLD11", name: "Global X ETF" },
    { ticker: "BBSD11", name: "BB Ações ESG" },
    { ticker: "FIND11", name: "Índice Financeiro" },
    { ticker: "GOLD11", name: "Trends Ouro ETF" },
  ],
  etf_internacional: [
    { ticker: "VT", name: "Vanguard Total World Stock ETF" },
    { ticker: "VTI", name: "Vanguard Total Stock Market ETF" },
    { ticker: "VOO", name: "Vanguard S&P 500 ETF" },
    { ticker: "BND", name: "Vanguard Total Bond Market ETF" },
    { ticker: "SPY", name: "SPDR S&P 500 ETF" },
    { ticker: "QQQ", name: "Invesco QQQ Trust" },
    { ticker: "IVV", name: "iShares Core S&P 500 ETF" },
    { ticker: "VXUS", name: "Vanguard Total International Stock ETF" },
    { ticker: "IEFA", name: "iShares Core MSCI EAFE ETF" },
    { ticker: "EEM", name: "iShares MSCI Emerging Markets ETF" },
    { ticker: "GLD", name: "SPDR Gold Shares" },
    { ticker: "SCHD", name: "Schwab US Dividend Equity ETF" },
  ],
  stock_us: [
    { ticker: "AAPL", name: "Apple Inc." },
    { ticker: "MSFT", name: "Microsoft Corp." },
    { ticker: "GOOGL", name: "Alphabet Inc." },
    { ticker: "AMZN", name: "Amazon.com Inc." },
    { ticker: "NVDA", name: "NVIDIA Corp." },
    { ticker: "META", name: "Meta Platforms Inc." },
    { ticker: "TSLA", name: "Tesla Inc." },
    { ticker: "JPM", name: "JPMorgan Chase & Co." },
    { ticker: "V", name: "Visa Inc." },
    { ticker: "KO", name: "Coca-Cola Co." },
    { ticker: "PEP", name: "PepsiCo Inc." },
    { ticker: "DIS", name: "Walt Disney Co." },
  ],
  reit: [
    { ticker: "O", name: "Realty Income Corp." },
    { ticker: "PLD", name: "Prologis Inc." },
    { ticker: "AMT", name: "American Tower Corp." },
    { ticker: "WELL", name: "Welltower Inc." },
    { ticker: "EQIX", name: "Equinix Inc." },
    { ticker: "SPG", name: "Simon Property Group" },
    { ticker: "VNQ", name: "Vanguard Real Estate ETF" },
  ],
  crypto: [
    { ticker: "BTC-USD", name: "Bitcoin" },
    { ticker: "ETH-USD", name: "Ethereum" },
    { ticker: "SOL-USD", name: "Solana" },
    { ticker: "ADA-USD", name: "Cardano" },
    { ticker: "DOT-USD", name: "Polkadot" },
    { ticker: "XRP-USD", name: "Ripple" },
  ],
  fixed_income: [
    { ticker: "TESOURO_SELIC_2027", name: "Tesouro Selic 2027" },
    { ticker: "TESOURO_IPCA_2035", name: "Tesouro IPCA+ 2035" },
    { ticker: "TESOURO_PREFIXADO_2028", name: "Tesouro Prefixado 2028" },
    { ticker: "CDB_100_CDI", name: "CDB 100% CDI" },
    { ticker: "CDB_120_CDI", name: "CDB 120% CDI" },
    { ticker: "LCI_90_CDI", name: "LCI 90% CDI" },
  ],
  other: [
    { ticker: "OURO", name: "Ouro" },
    { ticker: "PRATA", name: "Prata" },
  ],
};
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type FormLayout = "default" | "fixed_income" | "usd";

const LAYOUT: Record<AssetType, FormLayout> = {
  stock: "default",
  fii: "default",
  bdr: "default",
  etf: "default",
  fixed_income: "fixed_income",
  crypto: "usd",
  etf_internacional: "usd",
  stock_us: "usd",
  reit: "usd",
  other: "default",
};

const ASSET_TYPE_LABELS: Record<AssetType, string> = {
  stock: "Ações",
  fii: "FIIs",
  bdr: "BDRs",
  etf: "ETFs",
  fixed_income: "Renda Fixa (CDB/LCI/LCA/LC/LF/RDB)",
  crypto: "Criptomoedas",
  etf_internacional: "ETFs Internacionais",
  stock_us: "Stocks (EUA)",
  reit: "REITs (EUA)",
  other: "Outros",
};

const EMISSORES = [
  "Banco do Brasil", "Bradesco", "Itaú", "Santander", "Caixa",
  "BTG Pactual", "Safra", "Inter", "C6 Bank", "Nubank",
  "XP Investimentos", "Banrisul", "Daycoval", "ABC Brasil",
  "Outro",
];

const TIPOS_RF = ["CDB", "LCI", "LCA", "LC", "LF", "RDB", "CRI", "CRA", "Debênture", "Outro"];

const INDEXADORES = ["CDI", "IPCA", "IGP-M", "IPCA+", "Prefixado", "Selic", "Outro"];

const FORMAS = ["Pós-fixado", "Prefixado", "Híbrido"];

const TESOURO_OPTIONS = [
  { ticker: "TESOURO_SELIC_2027", name: "Tesouro Selic 2027" },
  { ticker: "TESOURO_SELIC_2029", name: "Tesouro Selic 2029" },
  { ticker: "TESOURO_PREFIXADO_2028", name: "Tesouro Prefixado 2028" },
  { ticker: "TESOURO_PREFIXADO_2031", name: "Tesouro Prefixado 2031" },
  { ticker: "TESOURO_IPCA_2029", name: "Tesouro IPCA+ 2029" },
  { ticker: "TESOURO_IPCA_2035", name: "Tesouro IPCA+ 2035" },
  { ticker: "TESOURO_IPCA_2045", name: "Tesouro IPCA+ 2045" },
  { ticker: "TESOURO_RENDA_2030", name: "Tesouro Renda+ 2030" },
  { ticker: "TESOURO_RENDA_2040", name: "Tesouro Renda+ 2040" },
  { ticker: "TESOURO_EDUC_2028", name: "Tesouro Educa+ 2028" },
];

interface Props {
  trigger: React.ReactNode;
  defaultTicker?: string;
  defaultPrice?: number;
}

type DialogMode = "operation" | "dividend" | "bonus";

export function AddOperationDialog({ trigger, defaultTicker, defaultPrice }: Props) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<DialogMode>("operation");
  const [assetType, setAssetType] = useState<AssetType>("stock");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [ticker, setTicker] = useState(defaultTicker ?? "");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(defaultPrice ? String(defaultPrice) : "");
  const [otherCosts, setOtherCosts] = useState("");
  const [tradedAt, setTradedAt] = useState(new Date());
  const [focused, setFocused] = useState(false);

  const layout = LAYOUT[assetType];
  const isUsd = layout === "usd";
  const isRf = layout === "fixed_income";

  // RF-specific fields
  const [emissor, setEmissor] = useState("");
  const [tipoRf, setTipoRf] = useState("CDB");
  const [indexador, setIndexador] = useState("CDI");
  const [taxaIndexador, setTaxaIndexador] = useState("");
  const [forma, setForma] = useState("Pós-fixado");
  const [valorRf, setValorRf] = useState("");
  const [vencimento, setVencimento] = useState(addYears(new Date(), 1));
  const [liquidezDiaria, setLiquidezDiaria] = useState(true);

  // Dividend-specific fields
  const [dividendType, setDividendType] = useState<"dividendo" | "jcp">("dividendo");

  const currency: Currency = isUsd ? "USD" : "BRL";

  const isDividend = mode === "dividend";
  const isBonus = mode === "bonus";

  const total = useMemo(() => {
    if (isRf) return Number(valorRf) || 0;
    const q = Number(quantity);
    const p = Number(price);
    return q * p;
  }, [isRf, quantity, price, valorRf]);

  const totalCosts = total + (Number(otherCosts) || 0);

  const suggestions = useMemo(() => {
    const examples = EXAMPLES[assetType] ?? [];
    if (!ticker.trim()) return examples;
    const term = ticker.trim().toUpperCase();
    return examples.filter(
      (a) => a.ticker.startsWith(term) || a.name.toUpperCase().includes(term),
    );
  }, [ticker, assetType]);

  const qc = useQueryClient();
  const create = useServerFn(createOperation);
  const mut = useMutation({
    mutationFn: (input: Parameters<typeof create>[0]["data"]) => create({ data: input }),
    onSuccess: () => {
      toast.success("Operação registrada");
      qc.invalidateQueries({ queryKey: ["operations"] });
      setOpen(false);
      resetForm();
    },
    onSettled: () => setTradedAt(new Date()),
    onError: (e: Error) => toast.error(e.message),
  });

  function resetForm(resetMode = true) {
    setTicker(defaultTicker ?? "");
    setQuantity("");
    setPrice(defaultPrice ? String(defaultPrice) : "");
    setOtherCosts("");
    setEmissor("");
    setTipoRf("CDB");
    setIndexador("CDI");
    setTaxaIndexador("");
    setForma("Pós-fixado");
    setValorRf("");
    setVencimento(addYears(new Date(), 1));
    setLiquidezDiaria(true);
    setDividendType("dividendo");
    if (resetMode) setMode("operation");
    setSide("buy");
    setAssetType("stock");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const costs = Number(otherCosts) || 0;

    if (isDividend) {
      const q = Number(quantity);
      const p = Number(price);
      if (!ticker || !q || p < 0) {
        toast.error("Preencha ticker, quantidade e valor por cota");
        return;
      }
      mut.mutate({
        ticker: ticker.toUpperCase(),
        asset_type: assetType,
        currency,
        side: "dividend",
        quantity: q,
        price: p,
        fee: 0,
        irrf: 0,
        other_costs: costs,
        metadata: { tipo_provento: dividendType },
        traded_at: format(tradedAt, "yyyy-MM-dd"),
      });
      return;
    }

    if (isBonus) {
      const q = Number(quantity);
      if (!ticker || !q) {
        toast.error("Preencha ticker e quantidade recebida");
        return;
      }
      mut.mutate({
        ticker: ticker.toUpperCase(),
        asset_type: assetType,
        currency,
        side: "bonus",
        quantity: q,
        price: 0,
        fee: 0,
        irrf: 0,
        other_costs: 0,
        traded_at: format(tradedAt, "yyyy-MM-dd"),
      });
      return;
    }

    if (isRf) {
      const amt = Number(valorRf);
      if (!amt) {
        toast.error("Preencha o valor investido");
        return;
      }
      const rfTicker = ticker || `${tipoRf}_${emissor || "OUTRO"}_${new Date().getFullYear()}`;
      mut.mutate({
        ticker: rfTicker.toUpperCase(),
        asset_type: "fixed_income",
        currency: "BRL",
        side: "buy",
        quantity: 1,
        price: amt,
        fee: 0,
        irrf: 0,
        other_costs: costs,
        metadata: {
          emissor: emissor || null,
          tipo_titulo: tipoRf,
          indexador,
          taxa: taxaIndexador || null,
          forma: forma,
          liquidez_diaria: liquidezDiaria,
          data_vencimento: format(vencimento, "yyyy-MM-dd"),
        },
        traded_at: format(tradedAt, "yyyy-MM-dd"),
      });
      return;
    }

    const q = Number(quantity);
    const p = Number(price);
    if (!ticker || !q || p < 0) {
      toast.error("Preencha ticker, quantidade e preço");
      return;
    }
    mut.mutate({
      ticker: ticker.toUpperCase(),
      asset_type: assetType,
      currency,
      side,
      quantity: q,
      price: p,
      fee: 0,
      irrf: 0,
      other_costs: costs,
      traded_at: format(tradedAt, "yyyy-MM-dd"),
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle>Adicionar Lançamento</DialogTitle>
        </DialogHeader>
        <div className="flex gap-1 rounded-lg border border-border bg-muted/30 p-1">
          {(["operation", "dividend", "bonus"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => { setMode(m); resetForm(false); }}
              className={
                "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors " +
                (mode === m
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {m === "operation" ? "Operação" : m === "dividend" ? "Provento" : "Bonificação"}
            </button>
          ))}
        </div>
        <form onSubmit={submit} className="grid gap-4">
          {!isDividend && !isBonus && (
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label>Operação</Label>
                <Select value={side} onValueChange={(v) => setSide(v as "buy" | "sell")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">Compra</SelectItem>
                    <SelectItem value="sell">Venda</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Tipo de ativo</Label>
                <Select
                  value={assetType}
                  onValueChange={(v) => {
                    setAssetType(v as AssetType);
                    setTicker("");
                    setQuantity("");
                    setPrice("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stock">Ações</SelectItem>
                    <SelectItem value="fii">FIIs</SelectItem>
                    <SelectItem value="bdr">BDRs</SelectItem>
                    <SelectItem value="etf">ETFs</SelectItem>
                    <SelectItem value="etf_internacional">ETFs Internacionais</SelectItem>
                    <SelectItem value="stock_us">Stocks (EUA)</SelectItem>
                    <SelectItem value="reit">REITs (EUA)</SelectItem>
                    <SelectItem value="fixed_income">Renda Fixa</SelectItem>
                    <SelectItem value="crypto">Criptomoedas</SelectItem>
                    <SelectItem value="other">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {isRf ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="emissor">Emissor</Label>
                  <Select value={emissor} onValueChange={setEmissor}>
                    <SelectTrigger id="emissor">
                      <SelectValue placeholder="Selecionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {EMISSORES.map((e) => (
                        <SelectItem key={e} value={e}>{e}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tipoRf">Tipo de título</Label>
                  <Select value={tipoRf} onValueChange={setTipoRf}>
                    <SelectTrigger id="tipoRf">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIPOS_RF.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="indexador">Indexador</Label>
                  <Select value={indexador} onValueChange={setIndexador}>
                    <SelectTrigger id="indexador">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {INDEXADORES.map((i) => (
                        <SelectItem key={i} value={i}>{i}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="taxa">Taxa do {indexador === "Prefixado" ? "título" : indexador}</Label>
                  <div className="relative">
                    <Input
                      id="taxa"
                      type="number"
                      min="0"
                      step="0.01"
                      value={taxaIndexador}
                      onChange={(e) => setTaxaIndexador(e.target.value)}
                      placeholder="0,00"
                      autoComplete="off"
                      className="pr-7"
                    />
                    <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">%</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="forma">Forma</Label>
                  <Select value={forma} onValueChange={setForma}>
                    <SelectTrigger id="forma">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FORMAS.map((f) => (
                        <SelectItem key={f} value={f}>{f}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="valorRf">Valor (R$)</Label>
                  <Input
                    id="valorRf"
                    type="number"
                    min="0"
                    step="0.01"
                    value={valorRf}
                    onChange={(e) => setValorRf(e.target.value)}
                    placeholder="0,00"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label>Data da transação</Label>
                  <DatePicker value={tradedAt} onChange={setTradedAt} />
                </div>
                <div className="grid gap-2">
                  <Label>Data de vencimento</Label>
                  <DatePicker value={vencimento} onChange={setVencimento} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="liquidez"
                  checked={liquidezDiaria}
                  onCheckedChange={(v) => setLiquidezDiaria(v as boolean)}
                />
                <Label htmlFor="liquidez" className="text-sm font-normal">Liquidez diária</Label>
              </div>
            </>
          ) : (
            <>
              {(isDividend || isBonus) && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label>Tipo de ativo</Label>
                    <Select value={assetType} onValueChange={(v) => setAssetType(v as AssetType)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stock">Ações</SelectItem>
                        <SelectItem value="fii">FIIs</SelectItem>
                        <SelectItem value="bdr">BDRs</SelectItem>
                        <SelectItem value="etf">ETFs</SelectItem>
                        <SelectItem value="etf_internacional">ETFs Internacionais</SelectItem>
                        <SelectItem value="stock_us">Stocks (EUA)</SelectItem>
                        <SelectItem value="reit">REITs (EUA)</SelectItem>
                        <SelectItem value="crypto">Criptomoedas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {isDividend && (
                    <div className="grid gap-2">
                      <Label>Tipo de provento</Label>
                      <Select value={dividendType} onValueChange={(v) => setDividendType(v as "dividendo" | "jcp")}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dividendo">Dividendo</SelectItem>
                          <SelectItem value="jcp">JCP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              )}
              <div className="relative grid gap-2">
                <Label htmlFor="ticker">Ativo</Label>
                <Input
                  id="ticker"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value.toUpperCase())}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 150)}
                  placeholder="Digite ou selecione um ativo"
                  autoComplete="off"
                  required
                />
                {focused && suggestions && suggestions.length > 0 && (
                  <div className="absolute inset-x-0 top-[68px] z-50 overflow-hidden rounded-md border border-border bg-popover shadow-lg">
                    {(suggestions ?? []).map((a) => (
                      <button
                        key={a.ticker}
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setTicker(a.ticker);
                          setFocused(false);
                        }}
                        className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-secondary"
                      >
                        <span className="flex items-baseline gap-2">
                          <span className="font-semibold">{a.ticker}</span>
                          <span className="truncate text-xs text-muted-foreground">{a.name}</span>
                        </span>

                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="qty">{isDividend ? "Quantidade de cotas" : isBonus ? "Quantidade recebida" : "Quantidade"}</Label>
                  <Input
                    id="qty"
                    type="number"
                    min="0"
                    step={isUsd && !isBonus ? "0.00000001" : "1"}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">
                    {isDividend ? "Valor por cota" : isBonus ? " " : `Preço (${currency === "USD" ? "US$" : "R$"})`}
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    autoComplete="off"
                    required={!isBonus}
                    disabled={isBonus}
                    className={isBonus ? "opacity-50" : ""}
                  />
                </div>
              </div>
            </>
          )}

          {!isBonus && !isRf && (
            <div className="grid gap-2">
              <Label htmlFor="otherCosts">Outros custos <span className="text-xs text-muted-foreground">(Opcional)</span></Label>
              <Input
                id="otherCosts"
                type="number"
                min="0"
                step="0.01"
                value={otherCosts}
                onChange={(e) => setOtherCosts(e.target.value)}
                placeholder="0,00"
                autoComplete="off"
              />
            </div>
          )}

          {!isRf && (
            <div className="grid gap-2">
              <Label>Data</Label>
              <DatePicker value={tradedAt} onChange={setTradedAt} />
            </div>
          )}

          {total > 0 && (
            <div className="rounded-md border bg-muted/30 px-3 py-2.5 text-right text-sm">
              <span className="text-xs text-muted-foreground">{isDividend ? "Total do provento" : isBonus ? " " : "Valor total"}</span>
              <div className="text-lg font-bold tabular-nums">
                {currency === "USD" ? "US$" : "R$"}
                {totalCosts.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          )}

          {isUsd && (
            <div className="flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
              <span className="inline-flex size-3.5 shrink-0 items-center justify-center rounded-full bg-blue-200 text-[10px] font-bold leading-none text-blue-700 dark:bg-blue-700 dark:text-blue-200">i</span>
              <span>Ativo em dólar — convertido usando a cotação do dia no cálculo patrimonial.</span>
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={mut.isPending}>
              {mut.isPending ? "Salvando…" : isDividend ? "Registrar Provento" : isBonus ? "Registrar Bonificação" : "Adicionar Lançamento"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DatePicker({ value, onChange }: { value: Date; onChange: (d: Date) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("justify-start text-left font-normal", !value && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 size-4" />
          {value ? format(value, "P", { locale: ptBR }) : "Selecionar"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(d) => d && onChange(d)}
          locale={ptBR}
          captionLayout="dropdown"
          fromYear={2000}
          toYear={new Date().getFullYear() + 30}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
