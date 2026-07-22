import { ValueObject } from "../value-object";
import { TooltipId, type DifficultyLevel } from "./education-types";

export type TooltipProps = {
  id: TooltipId;
  targetComponent: string;
  termKey: string;
  text: string;
  difficulty: DifficultyLevel;
};

export class Tooltip extends ValueObject<TooltipProps> {
  private constructor(props: TooltipProps) {
    super(props);
  }

  static create(props: TooltipProps): Tooltip {
    return new Tooltip(props);
  }

  get id(): TooltipId {
    return this.props.id;
  }

  get targetComponent(): string {
    return this.props.targetComponent;
  }

  get termKey(): string {
    return this.props.termKey;
  }

  get text(): string {
    return this.props.text;
  }

  get difficulty(): DifficultyLevel {
    return this.props.difficulty;
  }
}
