export type TimeRangeId = "1M" | "3M" | "6M" | "12M" | "2A" | "5A" | "10A" | "MAX" | "CUSTOM";

export interface CustomMonthRange {
  /** 1-12 */
  startMonth: number;
  startYear: number;
  /** 1-12 */
  endMonth: number;
  endYear: number;
}

/** Primeiro dia do mes inicial, ate o ultimo dia do mes final, formato ISO (yyyy-mm-dd). */
export function customRangeToDates(range: CustomMonthRange): { from: string; to: string } {
  const from = `${range.startYear}-${String(range.startMonth).padStart(2, "0")}-01`;
  const lastDay = new Date(range.endYear, range.endMonth, 0).getDate();
  const to = `${range.endYear}-${String(range.endMonth).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
  return { from, to };
}

export interface TimeRangeOption {
  id: TimeRangeId;
  label: string;
  months: number | null;
}

export const TIME_RANGE_OPTIONS: TimeRangeOption[] = [
  { id: "1M", label: "1M", months: 1 },
  { id: "3M", label: "3M", months: 3 },
  { id: "6M", label: "6M", months: 6 },
  { id: "12M", label: "12M", months: 12 },
  { id: "2A", label: "2A", months: 24 },
  { id: "5A", label: "5A", months: 60 },
  { id: "10A", label: "10A", months: 120 },
  { id: "MAX", label: "Máx", months: null },
];

export const DEFAULT_TIME_RANGE: TimeRangeId = "12M";

export function getTimeRangeById(id: TimeRangeId): TimeRangeOption {
  return TIME_RANGE_OPTIONS.find((o) => o.id === id) ?? TIME_RANGE_OPTIONS[3];
}

export function getCutoffDate(range: TimeRangeOption): Date | null {
  if (range.months === null) return null;
  const date = new Date();
  date.setMonth(date.getMonth() - range.months);
  date.setHours(0, 0, 0, 0);
  return date;
}
