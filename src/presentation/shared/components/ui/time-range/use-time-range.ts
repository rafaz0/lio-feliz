import { useState, useCallback, useMemo } from "react";
import type { TimeRangeId, TimeRangeOption, CustomMonthRange } from "./types";
import { getTimeRangeById, DEFAULT_TIME_RANGE, getCutoffDate, customRangeToDates } from "./types";

export interface UseTimeRangeReturn {
  selected: TimeRangeId;
  selectedOption: TimeRangeOption;
  cutoffDate: Date | null;
  customRange: CustomMonthRange | null;
  setRange: (id: TimeRangeId) => void;
  setCustomRange: (range: CustomMonthRange) => void;
  reset: () => void;
  isSelected: (id: TimeRangeId) => boolean;
}

export function useTimeRange(initial?: TimeRangeId): UseTimeRangeReturn {
  const [selected, setSelected] = useState<TimeRangeId>(initial ?? DEFAULT_TIME_RANGE);
  const [customRange, setCustomRangeState] = useState<CustomMonthRange | null>(null);

  const selectedOption = useMemo(() => getTimeRangeById(selected), [selected]);

  const cutoffDate = useMemo(() => {
    if (selected === "CUSTOM" && customRange) {
      const { from } = customRangeToDates(customRange);
      return new Date(from);
    }
    return getCutoffDate(selectedOption);
  }, [selectedOption, selected, customRange]);

  const setRange = useCallback((id: TimeRangeId) => {
    setSelected(id);
  }, []);

  const setCustomRange = useCallback((range: CustomMonthRange) => {
    setCustomRangeState(range);
    setSelected("CUSTOM");
  }, []);

  const reset = useCallback(() => {
    setSelected(DEFAULT_TIME_RANGE);
    setCustomRangeState(null);
  }, []);

  const isSelected = useCallback((id: TimeRangeId) => selected === id, [selected]);

  return {
    selected,
    selectedOption,
    cutoffDate,
    customRange,
    setRange,
    setCustomRange,
    reset,
    isSelected,
  };
}
