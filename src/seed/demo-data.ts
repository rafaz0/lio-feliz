import type { Operation } from "@/shared/types/portfolio";
import { DEMO_OPERATIONS } from "./demo-operations";

export interface DemoSessionStore {
  operations: Operation[];
}

export function createDemoStore(): DemoSessionStore {
  return {
    operations: [...DEMO_OPERATIONS],
  };
}
