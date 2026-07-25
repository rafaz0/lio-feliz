import { useEffect, useState } from "react";

const DEMO_SESSION_KEY = "lio_demo_session";
const DEMO_EXPIRY_KEY = "lio_demo_expires";

export interface DemoSession {
  sessionId: string;
  expiresAt: number;
}

export function isDemoSession(): boolean {
  if (typeof window === "undefined") return false;
  const sessionId = window.localStorage.getItem(DEMO_SESSION_KEY);
  const expires = window.localStorage.getItem(DEMO_EXPIRY_KEY);
  if (!sessionId || !expires) return false;
  if (Date.now() > Number(expires)) {
    clearDemoSession();
    return false;
  }
  return true;
}

export function createDemoSession(): DemoSession {
  const sessionId = `demo-${crypto.randomUUID()}`;
  const expiresAt = Date.now() + 30 * 60 * 1000; // 30 min
  if (typeof window !== "undefined") {
    window.localStorage.setItem(DEMO_SESSION_KEY, sessionId);
    window.localStorage.setItem(DEMO_EXPIRY_KEY, String(expiresAt));
  }
  return { sessionId, expiresAt };
}

export function clearDemoSession(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(DEMO_SESSION_KEY);
    window.localStorage.removeItem(DEMO_EXPIRY_KEY);
  }
}

export function getDemoSession(): DemoSession | null {
  if (!isDemoSession()) return null;
  const sessionId = window.localStorage.getItem(DEMO_SESSION_KEY)!;
  const expiresAt = Number(window.localStorage.getItem(DEMO_EXPIRY_KEY));
  return { sessionId, expiresAt };
}

export function useDemoSession(): { isDemo: boolean; session: DemoSession | null } {
  const [session, setSession] = useState<DemoSession | null>(null);

  useEffect(() => {
    const s = getDemoSession();
    setSession(s);
  }, []);

  return { isDemo: !!session, session };
}
