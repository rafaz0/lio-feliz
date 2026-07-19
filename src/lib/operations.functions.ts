import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { AssetType, Currency, Operation, OperationSide } from "./portfolio";
import { inferAssetType } from "./portfolio";
import { fetchYahooDividends, fetchBRAPIDividends, fetchBRAPIStockDividends } from "./yahoo.server";

const assetTypeSchema = z.enum([
  "stock",
  "fii",
  "bdr",
  "etf",
  "fixed_income",
  "crypto",
  "etf_internacional",
  "stock_us",
  "reit",
  "other",
]);

const operationInput = z.object({
  ticker: z
    .string()
    .trim()
    .min(1)
    .max(15)
    .transform((s) => s.toUpperCase()),
  asset_type: assetTypeSchema.optional(),
  currency: z.enum(["BRL", "USD"]).optional(),
  side: z.enum(["buy", "sell", "dividend", "bonus"]),
  quantity: z.number().positive(),
  price: z.number().nonnegative(),
  fee: z.number().nonnegative().default(0),
  irrf: z.number().nonnegative().default(0),
  other_costs: z.number().nonnegative().default(0),
  metadata: z.record(z.unknown()).optional().nullable(),
  traded_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  notes: z.string().max(500).optional().nullable(),
});

// Dev mode in-memory store (ephemeral, survives server restarts during dev)
const DEV_STORE: Operation[] = [];

export const listOperations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Operation[]> => {
    if (process.env.DEV_MODE === "true") return DEV_STORE;

    const { data, error } = await context.supabase
      .from("portfolio_operations")
      .select(
        "id, ticker, asset_type, currency, side, quantity, price, fee, irrf, other_costs, metadata, traded_at, source, notes, created_at",
      )
      .order("traded_at", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((r: Record<string, unknown>) => ({
      id: r.id as string,
      ticker: r.ticker as string,
      asset_type: (r.asset_type ?? inferAssetType(r.ticker as string)) as AssetType,
      currency: (r.currency ?? "BRL") as Currency,
      side: r.side as OperationSide,
      quantity: Number(r.quantity),
      price: Number(r.price),
      fee: Number(r.fee ?? 0),
      irrf: Number(r.irrf ?? 0),
      other_costs: Number(r.other_costs ?? 0),
      metadata: (r.metadata as Record<string, unknown> | null) ?? null,
      traded_at: r.traded_at as string,
      source: r.source as Operation["source"],
      notes: (r.notes as string | null) ?? null,
      created_at: r.created_at as string,
    }));
  });

export const createOperation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(operationInput)
  .handler(async ({ data, context }) => {
    const asset_type: AssetType = data.asset_type ?? inferAssetType(data.ticker);
    const currency: Currency = data.currency ?? "BRL";

    if (process.env.DEV_MODE === "true") {
      DEV_STORE.unshift({
        id: crypto.randomUUID(),
        ticker: data.ticker,
        asset_type,
        currency,
        side: data.side,
        quantity: data.quantity,
        price: data.price,
        fee: data.fee ?? 0,
        irrf: data.irrf ?? 0,
        other_costs: data.other_costs ?? 0,
        metadata: (data.metadata ?? null) as Operation["metadata"],
        traded_at: data.traded_at,
        source: "manual",
        notes: data.notes ?? null,
        created_at: new Date().toISOString(),
      });
      return { ok: true };
    }

    const { error } = await context.supabase.from("portfolio_operations").insert({
      user_id: context.userId,
      ticker: data.ticker,
      asset_type,
      currency,
      side: data.side,
      quantity: data.quantity,
      price: data.price,
      fee: data.fee ?? 0,
      irrf: data.irrf ?? 0,
      other_costs: data.other_costs ?? 0,
      metadata: (data.metadata ?? null) as Operation["metadata"],
      traded_at: data.traded_at,
      notes: data.notes ?? null,
      source: "manual" as const,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteOperation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data, context }) => {
    if (process.env.DEV_MODE === "true") {
      const idx = DEV_STORE.findIndex((o) => o.id === data.id);
      if (idx >= 0) DEV_STORE.splice(idx, 1);
      return { ok: true };
    }

    const { error } = await context.supabase
      .from("portfolio_operations")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const syncPendingDividends = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const ops =
      process.env.DEV_MODE === "true"
        ? [...DEV_STORE]
        : await (async () => {
            const { data } = await context.supabase
              .from("portfolio_operations")
              .select("*")
              .order("traded_at");
            return (data ?? []) as Operation[];
          })();

    const tickers = new Set<string>();
    for (const op of ops) {
      if (op.side === "buy" || op.side === "bonus") tickers.add(op.ticker);
    }

    const created: string[] = [];

    for (const ticker of tickers) {
      const asset_type = inferAssetType(ticker);
      const currency =
        asset_type === "stock_us" ||
        asset_type === "etf_internacional" ||
        asset_type === "reit" ||
        asset_type === "crypto"
          ? "USD"
          : "BRL";

      // Get all buy/sell/bonus operations for this ticker (for position calculation)
      const opsForTicker = ops.filter(
        (o) => o.ticker === ticker && (o.side === "buy" || o.side === "sell" || o.side === "bonus"),
      );

      let currentQty = 0;
      for (const op of opsForTicker) {
        if (op.side === "buy") currentQty += op.quantity;
        else if (op.side === "sell") currentQty = Math.max(0, currentQty - op.quantity);
        else if (op.side === "bonus") currentQty += op.quantity;
      }
      if (currentQty <= 0) continue;

      const existingDivDates = new Set(
        ops.filter((o) => o.ticker === ticker && o.side === "dividend").map((o) => o.traded_at),
      );
      const existingBonusLabels = new Set(
        ops.filter((o) => o.ticker === ticker && o.side === "bonus").map((o) => o.traded_at),
      );

      // --- Dividends ---
      // Brazilian stocks: try BRAPI first (more accurate), fall back to Yahoo
      const isBR =
        asset_type === "stock" ||
        asset_type === "fii" ||
        asset_type === "bdr" ||
        asset_type === "etf";
      const divs = isBR
        ? ((await fetchBRAPIDividends(ticker)) ?? (await fetchYahooDividends(ticker)))
        : await fetchYahooDividends(ticker);

      if (divs) {
        for (const div of divs) {
          if (existingDivDates.has(div.paidAt)) continue;

          let sharesAtDiv = 0;
          for (const op of opsForTicker) {
            if (op.traded_at > div.paidAt) continue;
            if (op.side === "buy") sharesAtDiv += op.quantity;
            else if (op.side === "sell") sharesAtDiv = Math.max(0, sharesAtDiv - op.quantity);
            else if (op.side === "bonus") sharesAtDiv += op.quantity;
          }
          if (sharesAtDiv <= 0) continue;

          const divRec = {
            quantity: sharesAtDiv,
            price: div.amount,
            metadata: {
              tipo_provento: "label" in div ? div.label : "dividendo",
              auto_sync: true,
            } as Operation["metadata"],
          };

          if (process.env.DEV_MODE === "true") {
            DEV_STORE.unshift({
              id: crypto.randomUUID(),
              ticker,
              asset_type,
              currency,
              side: "dividend",
              fee: 0,
              irrf: 0,
              other_costs: 0,
              traded_at: div.paidAt,
              source: "sync",
              notes: null,
              created_at: new Date().toISOString(),
              ...divRec,
            });
          } else {
            await context.supabase.from("portfolio_operations").insert({
              user_id: context.userId,
              ticker,
              asset_type,
              currency,
              side: "dividend",
              fee: 0,
              irrf: 0,
              other_costs: 0,
              traded_at: div.paidAt,
              source: "sync",
              ...divRec,
            });
          }
          created.push(
            `dividendo:${ticker} ${div.paidAt} (R$${(sharesAtDiv * div.amount).toFixed(2)}, R$${div.amount.toFixed(4)}/cota)`,
          );
        }
      }

      // --- Bonuses & Splits ---
      if (isBR) {
        const stockDivs = await fetchBRAPIStockDividends(ticker);
        if (stockDivs) {
          for (const sd of stockDivs) {
            if (existingBonusLabels.has(sd.paidAt)) continue;

            // For splits: factor > 1 means each share becomes factor shares (desdobramento)
            // For reverse splits: factor < 1 (grupamento)
            // For bonuses: factor > 1, shares increase
            if (sd.label === "split" || sd.label === "reverse_split") {
              // Split: adjust buy/sell quantities retroactively
              // e.g. factor=1.5 means each 1 share becomes 1.5 shares
              // We create a bonus operation to reflect the increase
              const factor = sd.label === "reverse_split" ? sd.factor : sd.factor - 1;

              if (factor > 0) {
                // Calculate shares held at split date
                let sharesAtSplit = 0;
                for (const op of opsForTicker) {
                  if (op.traded_at > sd.paidAt) continue;
                  if (op.side === "buy") sharesAtSplit += op.quantity;
                  else if (op.side === "sell")
                    sharesAtSplit = Math.max(0, sharesAtSplit - op.quantity);
                  else if (op.side === "bonus") sharesAtSplit += op.quantity;
                }
                if (sharesAtSplit <= 0) continue;

                const bonusShares =
                  sd.label === "reverse_split"
                    ? Math.round(sharesAtSplit * factor) - sharesAtSplit // reverse: shares decrease
                    : Math.round(sharesAtSplit * factor);

                // Only create if resulting qty is >= 0 and different
                if (bonusShares > 0 && bonusShares !== sharesAtSplit) {
                  if (process.env.DEV_MODE === "true") {
                    DEV_STORE.unshift({
                      id: crypto.randomUUID(),
                      ticker,
                      asset_type,
                      currency,
                      side: "bonus",
                      quantity: bonusShares - sharesAtSplit,
                      price: 0,
                      fee: 0,
                      irrf: 0,
                      other_costs: 0,
                      metadata: {
                        tipo: sd.label,
                        factor: sd.factor,
                        auto_sync: true,
                      } as Operation["metadata"],
                      traded_at: sd.paidAt,
                      source: "sync",
                      notes: null,
                      created_at: new Date().toISOString(),
                    });
                  } else {
                    await context.supabase.from("portfolio_operations").insert({
                      user_id: context.userId,
                      ticker,
                      asset_type,
                      currency,
                      side: "bonus",
                      quantity: bonusShares - sharesAtSplit,
                      price: 0,
                      fee: 0,
                      irrf: 0,
                      other_costs: 0,
                      metadata: { tipo: sd.label, factor: sd.factor, auto_sync: true },
                      traded_at: sd.paidAt,
                      source: "sync",
                    });
                  }
                  created.push(
                    `bonus:${ticker} ${sd.paidAt} (${sd.label}, +${bonusShares - sharesAtSplit} cotas)`,
                  );
                }
              }
            } else if (sd.label === "bonus") {
              // Bonificação: factor is the multiplier (e.g. 1.1 = +10%)
              if (sd.factor > 0) {
                let sharesAtBonus = 0;
                for (const op of opsForTicker) {
                  if (op.traded_at > sd.paidAt) continue;
                  if (op.side === "buy") sharesAtBonus += op.quantity;
                  else if (op.side === "sell")
                    sharesAtBonus = Math.max(0, sharesAtBonus - op.quantity);
                  else if (op.side === "bonus") sharesAtBonus += op.quantity;
                }
                if (sharesAtBonus <= 0) continue;
                const newShares = Math.round(sharesAtBonus * sd.factor);
                const increase = newShares - sharesAtBonus;
                if (increase > 0) {
                  if (process.env.DEV_MODE === "true") {
                    DEV_STORE.unshift({
                      id: crypto.randomUUID(),
                      ticker,
                      asset_type,
                      currency,
                      side: "bonus",
                      quantity: increase,
                      price: 0,
                      fee: 0,
                      irrf: 0,
                      other_costs: 0,
                      metadata: {
                        tipo: "bonificacao",
                        fator: sd.factor,
                        auto_sync: true,
                      } as Operation["metadata"],
                      traded_at: sd.paidAt,
                      source: "sync",
                      notes: null,
                      created_at: new Date().toISOString(),
                    });
                  } else {
                    await context.supabase.from("portfolio_operations").insert({
                      user_id: context.userId,
                      ticker,
                      asset_type,
                      currency,
                      side: "bonus",
                      quantity: increase,
                      price: 0,
                      fee: 0,
                      irrf: 0,
                      other_costs: 0,
                      metadata: { tipo: "bonificacao", fator: sd.factor, auto_sync: true },
                      traded_at: sd.paidAt,
                      source: "sync",
                    });
                  }
                  created.push(
                    `bonus:${ticker} ${sd.paidAt} (bonificação ${sd.factor}x, +${increase} cotas)`,
                  );
                }
              }
            }
          }
        }
      }
    }

    return { ok: true, count: created.length, details: created };
  });
