import { useState } from "react";
import { CalendarRange } from "lucide-react";
import { cn } from "@/presentation/shared/utils/cn";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TIME_RANGE_OPTIONS } from "./types";
import type { TimeRangeId, CustomMonthRange } from "./types";

const MONTH_LABELS = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

interface TimeRangeSelectorProps {
  selected: TimeRangeId;
  onSelect: (id: TimeRangeId) => void;
  customRange?: CustomMonthRange | null;
  onSelectCustom?: (range: CustomMonthRange) => void;
  /** Ano mais antigo permitido no seletor personalizado (ex: ano da primeira operação). */
  earliestYear?: number;
  disabled?: boolean;
  className?: string;
}

export function TimeRangeSelector({
  selected,
  onSelect,
  customRange,
  onSelectCustom,
  earliestYear,
  disabled = false,
  className,
}: TimeRangeSelectorProps) {
  const nowYear = new Date().getFullYear();
  const nowMonth = new Date().getMonth() + 1;
  const minYear = earliestYear ?? nowYear - 15;
  const years = Array.from({ length: nowYear - minYear + 1 }, (_, i) => nowYear - i);

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<CustomMonthRange>(
    customRange ?? {
      startMonth: nowMonth,
      startYear: nowYear,
      endMonth: nowMonth,
      endYear: nowYear,
    },
  );

  const customLabel =
    selected === "CUSTOM" && customRange
      ? `${MONTH_LABELS[customRange.startMonth - 1]}/${customRange.startYear} – ${MONTH_LABELS[customRange.endMonth - 1]}/${customRange.endYear}`
      : null;

  function applyCustom() {
    const startKey = draft.startYear * 12 + draft.startMonth;
    const endKey = draft.endYear * 12 + draft.endMonth;
    const normalized =
      startKey <= endKey
        ? draft
        : {
            startMonth: draft.endMonth,
            startYear: draft.endYear,
            endMonth: draft.startMonth,
            endYear: draft.startYear,
          };
    onSelectCustom?.(normalized);
    setOpen(false);
  }

  return (
    <div
      className={cn(
        "inline-flex min-w-0 max-w-full items-center gap-0.5 overflow-x-auto rounded-lg bg-muted p-0.5",
        className,
      )}
      role="radiogroup"
      aria-label="Selecionar período"
    >
      {TIME_RANGE_OPTIONS.map((opt) => {
        const isActive = selected === opt.id;
        return (
          <button
            key={opt.id}
            role="radio"
            aria-checked={isActive}
            aria-label={`Período ${opt.label}`}
            disabled={disabled}
            onClick={() => onSelect(opt.id)}
            className={cn(
              "rounded-md px-2 py-1 text-xs font-medium tabular-nums transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
              disabled && "pointer-events-none opacity-50",
            )}
          >
            {opt.label}
          </button>
        );
      })}
      {onSelectCustom && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              role="radio"
              aria-checked={selected === "CUSTOM"}
              aria-label="Período personalizado"
              disabled={disabled}
              className={cn(
                "flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium tabular-nums transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected === "CUSTOM"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
                disabled && "pointer-events-none opacity-50",
              )}
            >
              <CalendarRange className="size-3.5" />
              {customLabel ?? "Personalizado"}
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-72 space-y-3">
            <p className="text-xs font-medium text-muted-foreground">Selecionar período</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground">De</p>
                <div className="flex gap-1">
                  <Select
                    value={String(draft.startMonth)}
                    onValueChange={(v) => setDraft((d) => ({ ...d, startMonth: Number(v) }))}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTH_LABELS.map((m, i) => (
                        <SelectItem key={m} value={String(i + 1)}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={String(draft.startYear)}
                    onValueChange={(v) => setDraft((d) => ({ ...d, startYear: Number(v) }))}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((y) => (
                        <SelectItem key={y} value={String(y)}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground">Até</p>
                <div className="flex gap-1">
                  <Select
                    value={String(draft.endMonth)}
                    onValueChange={(v) => setDraft((d) => ({ ...d, endMonth: Number(v) }))}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTH_LABELS.map((m, i) => (
                        <SelectItem key={m} value={String(i + 1)}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={String(draft.endYear)}
                    onValueChange={(v) => setDraft((d) => ({ ...d, endYear: Number(v) }))}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((y) => (
                        <SelectItem key={y} value={String(y)}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <Button size="sm" className="w-full" onClick={applyCustom}>
              Aplicar
            </Button>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
