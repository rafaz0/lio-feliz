import type { Answer } from "@/core/domain/investor-profile";

export interface ResponderQuestionarioCommand {
  readonly type: "ResponderQuestionarioCommand";
  readonly userId: string;
  readonly answers: Answer[];
}
