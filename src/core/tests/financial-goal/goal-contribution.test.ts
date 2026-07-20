import { describe, it, expect } from "vitest";
import { GoalContribution, ContributionId, ContributionType } from "@/core/domain";
import { DomainError, Result } from "@/core/domain";

describe("ContributionId", () => {
  it("creates with a valid value", () => {
    const id = ContributionId.create("contrib-001");
    expect(id.value).toBe("contrib-001");
  });

  it("equals with same value", () => {
    const a = ContributionId.create("contrib-001");
    const b = ContributionId.create("contrib-001");
    expect(a.equals(b)).toBe(true);
  });

  it("does not equal with different value", () => {
    const a = ContributionId.create("contrib-001");
    const b = ContributionId.create("contrib-002");
    expect(a.equals(b)).toBe(false);
  });
});

describe("GoalContribution", () => {
  it("creates a contribution with valid parameters", () => {
    const id = ContributionId.create("c1");
    const result = GoalContribution.create(id, "goal-1", 500, new Date(), ContributionType.MANUAL);
    expect(result.isSuccess).toBe(true);
    expect(result.value!.amount).toBe(500);
    expect(result.value!.goalId).toBe("goal-1");
    expect(result.value!.type).toBe(ContributionType.MANUAL);
  });

  it("rounds amount to 2 decimal places", () => {
    const id = ContributionId.create("c1");
    const result = GoalContribution.create(id, "goal-1", 100.456, new Date());
    expect(result.value!.amount).toBe(100.46);
  });

  it("rejects zero amount", () => {
    const id = ContributionId.create("c1");
    const result = GoalContribution.create(id, "goal-1", 0, new Date());
    expect(result.isFailure).toBe(true);
    expect(result.error!.code).toBe("INVALID_CONTRIBUTION_AMOUNT");
  });

  it("rejects negative amount", () => {
    const id = ContributionId.create("c1");
    const result = GoalContribution.create(id, "goal-1", -50, new Date());
    expect(result.isFailure).toBe(true);
    expect(result.error!.code).toBe("INVALID_CONTRIBUTION_AMOUNT");
  });

  it("rejects future date", () => {
    const id = ContributionId.create("c1");
    const future = new Date();
    future.setDate(future.getDate() + 10);
    const result = GoalContribution.create(id, "goal-1", 100, future);
    expect(result.isFailure).toBe(true);
    expect(result.error!.code).toBe("FUTURE_CONTRIBUTION_DATE");
  });
});
