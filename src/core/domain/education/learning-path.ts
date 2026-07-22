import { ValueObject } from "../value-object";
import { LearningPathId, type DifficultyLevel } from "./education-types";

export type LearningPathProps = {
  id: LearningPathId;
  name: string;
  description: string;
  steps: string[];
  difficulty: DifficultyLevel;
};

export class LearningPath extends ValueObject<LearningPathProps> {
  private constructor(props: LearningPathProps) {
    super(props);
  }

  static create(props: LearningPathProps): LearningPath {
    return new LearningPath(props);
  }

  get id(): LearningPathId {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get steps(): string[] {
    return this.props.steps;
  }

  get difficulty(): DifficultyLevel {
    return this.props.difficulty;
  }
}
