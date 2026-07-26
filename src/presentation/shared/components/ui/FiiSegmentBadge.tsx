import { cn } from "@/presentation/shared/utils/cn";

const SEGMENT_CONFIG: Record<string, { label: string; className: string }> = {
  "Fundo de Papel": {
    label: "Papel",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  "Fundo de Tijolo": {
    label: "Tijolo",
    className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  },
  "Fundo Híbrido": {
    label: "Híbrido",
    className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  },
  Desenvolvimento: {
    label: "Desenvolvimento",
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  },
  Logística: {
    label: "Logística",
    className: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  },
  Shoppings: {
    label: "Shoppings",
    className: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  },
  "Lajes Corporativas": {
    label: "Lajes",
    className: "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300",
  },
  Hospital: {
    label: "Hospital",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  },
  Educação: {
    label: "Educação",
    className: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  },
};

export function FiiSegmentBadge({ segment }: { segment: string }) {
  const cfg = SEGMENT_CONFIG[segment] ?? {
    label: segment,
    className: "bg-muted text-muted-foreground",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded px-1 py-0.5 text-[9px] font-medium leading-none",
        cfg.className,
      )}
    >
      {cfg.label}
    </span>
  );
}
