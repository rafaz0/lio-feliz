import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { createOperation } from "@/lib/operations.functions";
import { ASSETS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  trigger: React.ReactNode;
  defaultTicker?: string;
  defaultPrice?: number;
}

export function AddOperationDialog({ trigger, defaultTicker, defaultPrice }: Props) {
  const [open, setOpen] = useState(false);
  const [ticker, setTicker] = useState(defaultTicker ?? "");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(defaultPrice ? String(defaultPrice) : "");
  const [tradedAt, setTradedAt] = useState(new Date().toISOString().slice(0, 10));
  const [focused, setFocused] = useState(false);

  const suggestions = useMemo(() => {
    const term = ticker.trim().toUpperCase();
    if (!term || term.length < 1) return [];
    return ASSETS.filter(
      (a) => a.ticker.startsWith(term) || a.name.toUpperCase().includes(term),
    ).slice(0, 6);
  }, [ticker]);

  const qc = useQueryClient();
  const create = useServerFn(createOperation);
  const mut = useMutation({
    mutationFn: (input: {
      ticker: string;
      side: "buy" | "sell";
      quantity: number;
      price: number;
      traded_at: string;
    }) => create({ data: input }),
    onSuccess: () => {
      toast.success("Operação registrada");
      qc.invalidateQueries({ queryKey: ["operations"] });
      setOpen(false);
      setTicker(defaultTicker ?? "");
      setQuantity("");
      setPrice(defaultPrice ? String(defaultPrice) : "");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = Number(quantity);
    const p = Number(price);
    if (!ticker || !q || p < 0) {
      toast.error("Preencha ticker, quantidade e preço");
      return;
    }
    mut.mutate({ ticker: ticker.toUpperCase(), side, quantity: q, price: p, traded_at: tradedAt });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova operação</DialogTitle>
          <DialogDescription>Registre uma compra ou venda na sua carteira.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative grid gap-2">
              <Label htmlFor="ticker">Ticker</Label>
              <Input
                id="ticker"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                placeholder="PETR4"
                required
              />
              {focused && suggestions.length > 0 && (
                <div className="absolute inset-x-0 top-[68px] z-50 overflow-hidden rounded-md border border-border bg-popover shadow-lg">
                  {suggestions.map((a) => (
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
                      <span
                        className={
                          "tabular text-xs " +
                          (a.changeDayPct >= 0 ? "text-positive" : "text-negative")
                        }
                      >
                        {a.changeDayPct >= 0 ? "+" : ""}
                        {a.changeDayPct.toFixed(2)}%
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="side">Tipo</Label>
              <Select value={side} onValueChange={(v) => setSide(v as "buy" | "sell")}>
                <SelectTrigger id="side">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Compra</SelectItem>
                  <SelectItem value="sell">Venda</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="qty">Quantidade</Label>
              <Input
                id="qty"
                type="number"
                min="0"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Preço unitário (R$)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Data da operação</Label>
            <Input
              id="date"
              type="date"
              value={tradedAt}
              onChange={(e) => setTradedAt(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={mut.isPending}>
              {mut.isPending ? "Salvando…" : "Salvar operação"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
