import { useEffect, useState } from "react";

export type Theme = "dark" | "light";
const KEY = "lio.theme";

function apply(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("light", theme === "light");
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const saved = window.localStorage.getItem(KEY) as Theme | null;
    return saved === "light" ? "light" : "dark";
  });

  useEffect(() => {
    apply(theme);
    window.localStorage.setItem(KEY, theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggle };
}
