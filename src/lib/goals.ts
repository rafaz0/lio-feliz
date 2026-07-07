import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "investidor-pro-goals";

interface Goals {
  monthlyDividendTarget: number;
  patrimonyTarget: number;
  monthlySavingsTarget: number;
}

let cached: Goals | null = null;

function getStored(): Goals {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: Goals = raw ? JSON.parse(raw) : { monthlyDividendTarget: 0, patrimonyTarget: 0, monthlySavingsTarget: 0 };
    if (!cached || JSON.stringify(cached) !== JSON.stringify(parsed)) {
      cached = parsed;
    }
    return cached!;
  } catch {
    if (!cached) cached = { monthlyDividendTarget: 0, patrimonyTarget: 0, monthlySavingsTarget: 0 };
    return cached;
  }
}

function store(goals: Goals) {
  cached = goals;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
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

export function useGoals(): {
  goals: Goals;
  setDividendTarget: (value: number) => void;
  setPatrimonyTarget: (value: number) => void;
  setSavingsTarget: (value: number) => void;
} {
  const goals = useSyncExternalStore(subscribe, getStored, getStored);

  const setDividendTarget = useCallback((value: number) => {
    store({ ...getStored(), monthlyDividendTarget: Math.max(0, value) });
    emit();
  }, []);

  const setPatrimonyTarget = useCallback((value: number) => {
    store({ ...getStored(), patrimonyTarget: Math.max(0, value) });
    emit();
  }, []);

  const setSavingsTarget = useCallback((value: number) => {
    store({ ...getStored(), monthlySavingsTarget: Math.max(0, value) });
    emit();
  }, []);

  return { goals, setDividendTarget, setPatrimonyTarget, setSavingsTarget };
}