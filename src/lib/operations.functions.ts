import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Operation } from "./portfolio";

const operationInput = z.object({
  ticker: z.string().trim().min(1).max(10).transform((s) => s.toUpperCase()),
  side: z.enum(["buy", "sell"]),
  quantity: z.number().positive(),
  price: z.number().nonnegative(),
  traded_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  notes: z.string().max(500).optional().nullable(),
});

export const listOperations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Operation[]> => {
    const { data, error } = await context.supabase
      .from("portfolio_operations")
      .select("id, ticker, side, quantity, price, traded_at, source, notes, created_at")
      .order("traded_at", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((r) => ({
      id: r.id as string,
      ticker: r.ticker as string,
      side: r.side as "buy" | "sell",
      quantity: Number(r.quantity),
      price: Number(r.price),
      traded_at: r.traded_at as string,
      source: r.source as "manual" | "b3_import" | "pluggy",
      notes: (r.notes as string | null) ?? null,
      created_at: r.created_at as string,
    }));
  });

export const createOperation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator(operationInput)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("portfolio_operations").insert({
      user_id: context.userId,
      ticker: data.ticker,
      side: data.side,
      quantity: data.quantity,
      price: data.price,
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
    const { error } = await context.supabase
      .from("portfolio_operations")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
