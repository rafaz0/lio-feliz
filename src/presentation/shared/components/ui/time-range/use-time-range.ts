import { useState, useCallback, useMemo } from "react";
import type { TimeRangeId, TimeRangeOption } from "./types";
import { getTimeRangeById, DEFAULT_TIME_RANGE, getCutoffDate } from "./types";

export interface UseTimeRangeReturn {
  selected: TimeRangeId;
  selectedOption: TimeRangeOption;
  cutoffDate: Date | null;
  setRange: (id: TimeRangeId) => void;
  reset: () => void;
  isSelected: (id: TimeRangeId) => boolean;
}

export function useTimeRange(initial?: TimeRangeId): UseTimeRangeReturn {
  const [selected, setSelected] = useState<TimeRangeId>(initial ?? DEFAULT_TIME_RANGE);

  const selectedOption = useMemo(() => getTimeRangeById(selected), [selected]);

  const cutoffDate = useMemo(() => getCutoffDate(selectedOption), [selectedOption]);

  const setRange = useCallback((id: TimeRangeId) => {
    setSelected(id);
  }, []);

  const reset = useCallback(() => {
    setSelected(DEFAULT_TIME_RANGE);
  }, []);

  const isSelected = useCallback((id: TimeRangeId) => selected === id, [selected]);

  return { selected, selectedOption, cutoffDate, setRange, reset, isSelected };
}
