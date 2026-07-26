import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );
    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }
    if (
      isNewSupabaseApiKey(supabaseKey) &&
      headers.get("Authorization") === `Bearer ${supabaseKey}`
    ) {
      headers.delete("Authorization");
    }
    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};
  return Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const idx = c.indexOf("=");
      if (idx === -1) return [c.trim(), ""];
      return [c.slice(0, idx).trim(), c.slice(idx + 1).trim()];
    }),
  );
}

/**
 * Custom auth middleware with demo session detection.
 *
 * Auth resolution order:
 *   1. `lio_demo_session` cookie → demo mode (no Supabase needed)
 *   2. Authorization header (Bearer token) — API clients, SSR
 *   3. `lio-auth-token` cookie — browser-based auth fallback
 *   4. DEV_MODE=true — dev bypass (local development)
 *
 * Provides context: { supabase, userId, claims, demoSessionId }
 */
export const requireAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;
  const DEV_MODE = process.env.DEV_MODE === "true";

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    const missing = [
      ...(!SUPABASE_URL ? ["SUPABASE_URL"] : []),
      ...(!SUPABASE_PUBLISHABLE_KEY ? ["SUPABASE_PUBLISHABLE_KEY"] : []),
    ].join(", ");
    throw new Error(`Missing Supabase environment variable(s): ${missing}.`);
  }

  const request = getRequest();
  let demoSessionId = "";

  // Check demo session cookie first (works in all environments, no Supabase needed)
  if (request) {
    const cookies = parseCookies(request.headers.get("cookie"));
    demoSessionId = cookies["lio_demo_session"] ?? "";
    if (demoSessionId && demoSessionId.startsWith("demo-")) {
      return next({
        context: {
          supabase: createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
            global: { fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY) },
          }),
          userId: demoSessionId,
          claims: { sub: demoSessionId },
          demoSessionId,
        } as any,
      });
    }
  }

  // DEV_MODE bypass
  if (DEV_MODE) {
    return next({
      context: {
        supabase: createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
          global: { fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY) },
        }),
        userId: "dev-user-0000",
        claims: { sub: "dev-user-0000" },
      } as any,
    });
  }

  // Extract token from Authorization header or cookie
  let token = "";

  if (request) {
    const authHeader = request.headers.get("authorization") ?? "";
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.replace("Bearer ", "");
    }

    if (!token) {
      const cookies = parseCookies(request.headers.get("cookie"));
      token = cookies["lio-auth-token"] ?? "";
    }
  }

  if (!token) {
    throw new Error("Unauthorized: No authentication token provided");
  }

  if (token.split(".").length !== 3) {
    throw new Error("Unauthorized: Invalid token format");
  }

  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: {
      fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY),
      headers: { Authorization: `Bearer ${token}` },
    },
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase.auth.getClaims(token);
  if (error || !data?.claims) {
    throw new Error("Unauthorized: Invalid or expired token");
  }
  if (!data.claims.sub) {
    throw new Error("Unauthorized: No user ID found in token claims");
  }

  return next({
    context: { supabase, userId: data.claims.sub, claims: { sub: data.claims.sub } } as any,
  });
});
