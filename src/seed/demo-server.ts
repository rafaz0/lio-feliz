import { createServerFn } from "@tanstack/react-start";
import { initDemoStore, clearDemoStore } from "@/lib/operations.functions";
import { createDemoStore } from "@/seed/demo-data";

/**
 * Server function to initialize a demo session store with seed data.
 * Called from the client after createDemoSession().
 */
export const initDemoSessionStore = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { sessionId: string })
  .handler(async ({ data }) => {
    const { sessionId } = data;
    const demoData = createDemoStore();
    initDemoStore(sessionId, demoData.operations);
    return { ok: true };
  });

/**
 * Server function to clear a demo session store.
 */
export const destroyDemoSessionStore = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { sessionId: string })
  .handler(async ({ data }) => {
    clearDemoStore(data.sessionId);
    return { ok: true };
  });
