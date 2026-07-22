import { ValueObject } from "../value-object";
import { UserProgressId, type StepStatus } from "./onboarding-types";

export type UserProgressProps = {
  id: UserProgressId;
  userId: string;
  currentStep: number;
  status: StepStatus;
  startedAt: Date;
  completedAt?: Date;
};

export class UserProgress extends ValueObject<UserProgressProps> {
  private constructor(props: UserProgressProps) { super(props); }
  static create(props: UserProgressProps): UserProgress { return new UserProgress(props); }
  get id(): UserProgressId { return this.props.id; }
  get userId(): string { return this.props.userId; }
  get currentStep(): number { return this.props.currentStep; }
  get status(): StepStatus { return this.props.status; }
  get startedAt(): Date { return this.props.startedAt; }
  get completedAt(): Date | undefined { return this.props.completedAt; }
  get isCompleted(): boolean { return this.props.status === "COMPLETED"; }
  get isSkipped(): boolean { return this.props.status === "SKIPPED"; }
}
