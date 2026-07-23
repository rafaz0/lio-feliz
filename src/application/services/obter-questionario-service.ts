import type { ObterQuestionarioQuery } from "@/application/queries/obter-questionario";
import type { QuestionarioPerguntasDto } from "@/application/dtos/investidor-perfil";
import type { IApplicationService } from "@/application/application-service";
import type { ApplicationError } from "@/application/errors/application-error";
import { RiskClassifier } from "@/core/domain/investor-profile";

export class ObterQuestionarioService implements IApplicationService<
  ObterQuestionarioQuery,
  QuestionarioPerguntasDto[]
> {
  private readonly classifier = new RiskClassifier();

  async Execute(
    _query: ObterQuestionarioQuery,
  ): Promise<QuestionarioPerguntasDto[] | ApplicationError> {
    return this.classifier.getQuestions().map((q) => ({
      id: q.id,
      text: q.text,
      options: q.options,
    }));
  }
}
