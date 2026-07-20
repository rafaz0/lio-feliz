import type {
  AllocationData,
  AllocationDifferenceData,
  SuggestedActionData,
  RebalancingProposalData,
} from "./rebalancing-types";
import * as Types from "./rebalancing-types";
import {
  normalisePercentages,
  AllocationTargetCollection,
  AllocationTarget,
} from "./allocation-target";
import {
  NoAllocationTargetsError,
  NoPositionsForRebalancingError,
  InvalidToleranceError,
} from "./errors";

export class RebalancingService {
  calculateCurrentAllocation(positions: { className: string; value: number }[]): {
    allocations: AllocationData[];
    totalValue: number;
  } {
    if (positions.length === 0) {
      return { allocations: [], totalValue: 0 };
    }

    const groups = new Map<string, number>();
    for (const pos of positions) {
      groups.set(pos.className, (groups.get(pos.className) ?? 0) + pos.value);
    }

    const totalValue = Array.from(groups.values()).reduce((s, v) => s + v, 0);
    const allocations: AllocationData[] = Array.from(groups.entries())
      .map(([className, value]) => ({
        className,
        percentage:
          totalValue > 0
            ? parseFloat(((value / totalValue) * 100).toFixed(Types.PERCENTAGE_PRECISION))
            : 0,
        value,
      }))
      .sort((a, b) => b.percentage - a.percentage);

    return { allocations, totalValue };
  }

  calculateDifferences(
    currentAllocations: AllocationData[],
    targets: readonly AllocationTarget[],
    tolerance: number,
  ): AllocationDifferenceData[] {
    const differences: AllocationDifferenceData[] = [];

    for (const target of targets) {
      const current = currentAllocations.find((a) => a.className === target.className);
      const currentPercentage = current?.percentage ?? 0;
      const diff = parseFloat(
        (currentPercentage - target.percentage).toFixed(Types.PERCENTAGE_PRECISION),
      );

      const effectiveTolerance =
        target.percentage > 0 ? Math.min(tolerance, target.percentage) : tolerance;

      differences.push({
        className: target.className,
        currentPercentage,
        targetPercentage: target.percentage,
        difference: diff,
        withinTolerance: Math.abs(diff) <= effectiveTolerance,
      });
    }

    for (const current of currentAllocations) {
      if (!targets.some((t) => t.className === current.className)) {
        differences.push({
          className: current.className,
          currentPercentage: current.percentage,
          targetPercentage: 0,
          difference: current.percentage,
          withinTolerance: false,
        });
      }
    }

    return differences;
  }

  generateProposal(
    currentAllocations: AllocationData[],
    targetPercentages: Record<string, number>,
    tolerance: number,
    contributionValue?: number,
  ): RebalancingProposalData {
    if (Object.keys(targetPercentages).length === 0) {
      throw new NoAllocationTargetsError();
    }

    const { allocations: current, totalValue } = this.calculateCurrentAllocation(
      currentAllocations.map((a) => ({ className: a.className, value: a.value })),
    );

    if (current.length === 0) {
      throw new NoPositionsForRebalancingError();
    }

    if (tolerance < Types.MIN_TOLERANCE || tolerance > Types.MAX_TOLERANCE) {
      throw new InvalidToleranceError(tolerance);
    }

    const normalised = normalisePercentages(targetPercentages);
    const targetCollection = new AllocationTargetCollection(
      Object.entries(normalised).map(([cn, pct]) => new AllocationTarget(cn, pct)),
    );

    const differences = this.calculateDifferences(current, targetCollection.targets, tolerance);
    const needsRebalancing = differences.some((d) => !d.withinTolerance);

    const method = this.determineMethod(contributionValue);
    const suggestions = this.calculateSuggestions(
      differences,
      totalValue,
      contributionValue,
      method,
    );

    return {
      differences,
      suggestions,
      totalPortfolioValue: totalValue,
      needsRebalancing,
      method,
      tolerance,
    };
  }

  private determineMethod(contributionValue?: number): Types.RebalancingMethod {
    if (contributionValue !== undefined && contributionValue > 0) {
      return Types.REBALANCING_METHOD.BY_CONTRIBUTION;
    }
    return Types.REBALANCING_METHOD.BY_SELL;
  }

  private calculateSuggestions(
    differences: AllocationDifferenceData[],
    totalValue: number,
    contributionValue?: number,
    method?: Types.RebalancingMethod,
  ): SuggestedActionData[] {
    const usedMethod = method ?? this.determineMethod(contributionValue);
    const hasContribution = contributionValue !== undefined && contributionValue > 0;
    const newTotal = hasContribution ? totalValue + contributionValue! : totalValue;

    const suggestions: SuggestedActionData[] = [];

    const underweight = differences
      .filter((d) => d.difference < 0 && !d.withinTolerance)
      .sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference));

    const overweight = differences
      .filter((d) => d.difference > 0 && !d.withinTolerance)
      .sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference));

    if (usedMethod === Types.REBALANCING_METHOD.BY_CONTRIBUTION && hasContribution) {
      let remainingContribution = contributionValue!;

      for (const diff of underweight) {
        const targetValue = (diff.targetPercentage / 100) * newTotal;
        const currentValue = (diff.currentPercentage / 100) * totalValue;
        const neededValue = Math.max(
          0,
          parseFloat((targetValue - currentValue).toFixed(Types.PERCENTAGE_PRECISION)),
        );

        if (remainingContribution >= neededValue) {
          suggestions.push({
            className: diff.className,
            action: Types.REBALANCING_ACTION.APORTE,
            suggestedValue: neededValue,
          });
          remainingContribution -= neededValue;
        } else if (remainingContribution > 0) {
          suggestions.push({
            className: diff.className,
            action: Types.REBALANCING_ACTION.APORTE,
            suggestedValue: remainingContribution,
          });
          remainingContribution = 0;
        }
      }

      if (remainingContribution > 0) {
        const sorted = [...differences]
          .filter((d) => d.difference < 0)
          .sort(
            (a, b) =>
              Math.abs(b.difference) * b.targetPercentage -
              Math.abs(a.difference) * a.targetPercentage,
          );
        for (const diff of sorted) {
          if (remainingContribution <= 0) break;
          const idx = suggestions.findIndex((s) => s.className === diff.className);
          if (idx >= 0) {
            suggestions[idx] = {
              ...suggestions[idx],
              suggestedValue: parseFloat(
                (suggestions[idx].suggestedValue + remainingContribution).toFixed(
                  Types.PERCENTAGE_PRECISION,
                ),
              ),
            };
            remainingContribution = 0;
          }
        }
      }
    } else if (usedMethod === Types.REBALANCING_METHOD.BY_SELL) {
      for (const diff of overweight) {
        const currentValue = (diff.currentPercentage / 100) * totalValue;
        const targetValue = (diff.targetPercentage / 100) * totalValue;
        const sellValue = Math.max(
          0,
          parseFloat((currentValue - targetValue).toFixed(Types.PERCENTAGE_PRECISION)),
        );
        suggestions.push({
          className: diff.className,
          action: Types.REBALANCING_ACTION.VENDER,
          suggestedValue: sellValue,
        });
      }
    }

    for (const diff of differences) {
      if (!suggestions.some((s) => s.className === diff.className)) {
        suggestions.push({
          className: diff.className,
          action: Types.REBALANCING_ACTION.MANTER,
          suggestedValue: 0,
        });
      }
    }

    return suggestions;
  }

  checkNeedsRebalancing(
    currentAllocations: AllocationData[],
    targets: readonly AllocationTarget[],
    tolerance: number,
  ): boolean {
    const differences = this.calculateDifferences(currentAllocations, targets, tolerance);
    return differences.some((d) => !d.withinTolerance);
  }
}
