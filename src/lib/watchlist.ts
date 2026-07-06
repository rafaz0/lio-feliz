import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "investidor-pro-watchlist";

let cached: string[] | null = null;

function getStored(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: string[] = raw ? JSON.parse(raw) : [];
    if (!cached || cached.length !== parsed.length || cached.some((v, i) => v !== parsed[i])) {
      cached = parsed;
    }
    return cached!;
  } catch {
    if (!cached) cached = [];
    return cached;
  }
}

function store(tickers: string[]) {
  cached = tickers;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickers));
}

let listeners: (() => void)[] = [];

function subscribe(cb: () => void) {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

function emit() {
  for (const cb of listeners) cb();
}

export function useWatchlist(): {
  tickers: string[];
  isWatching: (t: string) => boolean;
  toggle: (t: string) => void;
  add: (t: string) => void;
  remove: (t: string) => void;
} {
  const tickers = useSyncExternalStore(subscribe, getStored, getStored);

  const isWatching = useCallback((t: string) => tickers.includes(t.toUpperCase()), [tickers]);

  const add = useCallback((t: string) => {
    const upper = t.toUpperCase();
    const cur = getStored();
    if (!cur.includes(upper)) {
      store([...cur, upper]);
      emit();
    }
  }, []);

  const remove = useCallback((t: string) => {
    const upper = t.toUpperCase();
    store(getStored().filter((x) => x !== upper));
    emit();
  }, []);

  const toggle = useCallback(
    (t: string) => {
      const upper = t.toUpperCase();
      if (tickers.includes(upper)) remove(upper);
      else add(upper);
    },
    [tickers, add, remove],
  );

  return { tickers, isWatching, toggle, add, remove };
}
