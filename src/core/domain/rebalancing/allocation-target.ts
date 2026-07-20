import { InvalidAllocationPercentageError, AllocationTotalMustSum100Error } from "./errors";
import { PERCENTAGE_PRECISION } from "./rebalancing-types";

export class AllocationTarget {
  public readonly className: string;
  public readonly percentage: number;

  constructor(className: string, percentage: number) {
    const rounded = parseFloat(percentage.toFixed(PERCENTAGE_PRECISION));
    if (rounded < 0 || rounded > 100) {
      throw new InvalidAllocationPercentageError(className, percentage);
    }
    this.className = className;
    this.percentage = rounded;
    Object.freeze(this);
  }
}

export class AllocationTargetCollection {
  public readonly targets: readonly AllocationTarget[];

  constructor(targets: AllocationTarget[]) {
    const total = parseFloat(
      targets.reduce((sum, t) => sum + t.percentage, 0).toFixed(PERCENTAGE_PRECISION),
    );
    if (Math.abs(total - 100) > 0.01) {
      throw new AllocationTotalMustSum100Error(total);
    }
    this.targets = Object.freeze([...targets]);
    Object.freeze(this);
  }

  getTargetForClass(className: string): AllocationTarget | undefined {
    return this.targets.find((t) => t.className === className);
  }

  includesClass(className: string): boolean {
    return this.targets.some((t) => t.className === className);
  }
}

export function normalisePercentages(percentages: Record<string, number>): Record<string, number> {
  const entries = Object.entries(percentages);
  const sum = entries.reduce((s, [, v]) => s + v, 0);

  if (Math.abs(sum - 100) < 0.01) return { ...percentages };

  const normalised: Record<string, number> = {};
  for (const [key, value] of entries) {
    normalised[key] = parseFloat(((value / sum) * 100).toFixed(PERCENTAGE_PRECISION));
  }

  const finalSum = Object.values(normalised).reduce((s, v) => s + v, 0);
  const diff = parseFloat((100 - finalSum).toFixed(PERCENTAGE_PRECISION));
  const keys = Object.keys(normalised);
  if (keys.length > 0 && Math.abs(diff) > 0.001) {
    normalised[keys[keys.length - 1]] = parseFloat(
      (normalised[keys[keys.length - 1]] + diff).toFixed(PERCENTAGE_PRECISION),
    );
  }

  return normalised;
}
