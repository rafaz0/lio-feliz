import { useEffect, useState } from "react";

export type Theme = "dark" | "light";
const KEY = "lio.theme";

function apply(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("light", theme === "light");
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved === "light") {
        setTheme("light");
        document.documentElement.classList.add("light");
      }
    } catch {
      // ignore
    }
  }, []);

  function setAndPersist(next: Theme) {
    setTheme(next);
    apply(next);
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      // ignore
    }
  }

  const toggle = () => setAndPersist(theme === "dark" ? "light" : "dark");
  return { theme, toggle };
}
