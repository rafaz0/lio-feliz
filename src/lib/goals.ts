import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "investidor-pro-goals";

interface Goals {
  monthlyTarget: number;
}

let cached: Goals | null = null;

function getStored(): Goals {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: Goals = raw ? JSON.parse(raw) : { monthlyTarget: 0 };
    if (!cached || JSON.stringify(cached) !== JSON.stringify(parsed)) {
      cached = parsed;
    }
    return cached!;
  } catch {
    if (!cached) cached = { monthlyTarget: 0 };
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
  setMonthlyTarget: (value: number) => void;
} {
  const goals = useSyncExternalStore(subscribe, getStored, getStored);

  const setMonthlyTarget = useCallback((value: number) => {
    store({ monthlyTarget: Math.max(0, value) });
    emit();
  }, []);

  return { goals, setMonthlyTarget };
}
