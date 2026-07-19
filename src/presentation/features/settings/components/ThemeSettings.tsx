import { useTheme } from "@/presentation/providers/ThemeProvider";

interface ThemeSettingsProps {
  onTemaChange?: (tema: "claro" | "escuro") => void;
}

export function ThemeSettings({ onTemaChange }: ThemeSettingsProps) {
  const { theme, toggle } = useTheme();

  return (
    <div data-testid="theme-settings" className="rounded-xl border p-4">
      <h3 className="text-sm font-medium">Aparência</h3>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Tema atual</span>
        <span data-testid="theme-atual">{theme}</span>
      </div>
      <button
        type="button"
        data-testid="theme-toggle"
        onClick={() => {
          toggle();
          onTemaChange?.(theme === "dark" ? "claro" : "escuro");
        }}
        className="mt-3 rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
      >
        Alternar tema
      </button>
    </div>
  );
}
