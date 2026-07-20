export class GoalProgress {
  public readonly percentage: number;
  public readonly currentAmount: number;
  public readonly targetAmount: number;
  public readonly remainingAmount: number;
  public readonly projectedDate: Date | null;
  public readonly monthlyAverage: number | null;
  public readonly remainingMonths: number | null;
  public readonly onTrack: boolean | null;

  constructor(
    percentage: number,
    currentAmount: number,
    targetAmount: number,
    remainingAmount: number,
    projectedDate: Date | null,
    monthlyAverage: number | null,
    remainingMonths: number | null,
    onTrack: boolean | null,
  ) {
    this.percentage = percentage;
    this.currentAmount = currentAmount;
    this.targetAmount = targetAmount;
    this.remainingAmount = remainingAmount;
    this.projectedDate = projectedDate;
    this.monthlyAverage = monthlyAverage;
    this.remainingMonths = remainingMonths;
    this.onTrack = onTrack;
    Object.freeze(this);
  }
}
