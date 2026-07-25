import type { Operation } from "@/lib/portfolio/models";
import { DEMO_OPERATIONS } from "./demo-operations";

export interface DemoSessionStore {
  operations: Operation[];
}

export function createDemoStore(): DemoSessionStore {
  return {
    operations: [...DEMO_OPERATIONS],
  };
}
