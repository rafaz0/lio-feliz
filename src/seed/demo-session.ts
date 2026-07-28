import { useEffect, useState } from "react";

const DEMO_SESSION_KEY = "lio_demo_session";
const DEMO_EXPIRY_KEY = "lio_demo_expires";
const DEMO_EXPIRED_FLAG = "lio_demo_expired";

export interface DemoSession {
  sessionId: string;
  expiresAt: number;
}

function setDemoCookie(sessionId: string, expiresAt: number): void {
  const maxAge = Math.round((expiresAt - Date.now()) / 1000);
  document.cookie = `lio_demo_session=${sessionId}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function removeDemoCookie(): void {
  document.cookie = "lio_demo_session=; path=/; max-age=0; SameSite=Lax";
}

export function isDemoSession(): boolean {
  if (typeof window === "undefined") return false;
  const sessionId = window.localStorage.getItem(DEMO_SESSION_KEY);
  const expires = window.localStorage.getItem(DEMO_EXPIRY_KEY);
  if (!sessionId || !expires) return false;
  if (Date.now() > Number(expires)) {
    clearDemoSession();
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DEMO_EXPIRED_FLAG, "true");
    }
    return false;
  }
  return true;
}

export function wasDemoSessionExpired(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(DEMO_EXPIRED_FLAG) === "true";
}

export function clearDemoExpiredFlag(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(DEMO_EXPIRED_FLAG);
  }
}

export function createDemoSession(): DemoSession {
  const sessionId = crypto.randomUUID();
  const expiresAt = Date.now() + 30 * 60 * 1000; // 30 min
  if (typeof window !== "undefined") {
    window.localStorage.setItem(DEMO_SESSION_KEY, sessionId);
    window.localStorage.setItem(DEMO_EXPIRY_KEY, String(expiresAt));
    setDemoCookie(sessionId, expiresAt);
  }
  return { sessionId, expiresAt };
}

export function clearDemoSession(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(DEMO_SESSION_KEY);
    window.localStorage.removeItem(DEMO_EXPIRY_KEY);
    window.localStorage.removeItem(DEMO_EXPIRED_FLAG);
    removeDemoCookie();
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
