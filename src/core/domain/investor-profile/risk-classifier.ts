import { Result } from "../result";
import { RiskResult } from "./risk-result";
import { RiskResultId, RiskQuestionnaireId } from "./profile-types";
import { RiskQuestionnaire } from "./risk-questionnaire";
import type { Answer, RiskLevel } from "./profile-types";
import { InvalidAnswerError, RiskClassificationError } from "./errors";

type QuestionTemplate = {
  id: string;
  text: string;
  options: string[];
};

export const QUESTIONARIO_PADRAO: QuestionTemplate[] = [
  { id: "q1", text: "Qual o seu objetivo principal com os investimentos?", options: ["Preservar patrimonio", "Gerar renda", "Crescimento moderado", "Crescimento agressivo", "Maximo retorno"] },
  { id: "q2", text: "Em quanto tempo voce pretende utilizar os recursos investidos?", options: ["< 1 ano", "1-2 anos", "2-5 anos", "5-10 anos", "> 10 anos"] },
  { id: "q3", text: "Qual percentual do seu patrimonio esta em renda variavel?", options: ["Nao invisto", "Ate 25%", "25-50%", "50-75%", "Acima de 75%"] },
  { id: "q4", text: "Como voce reagiria a uma queda de 20% na sua carteira?", options: ["Venderia tudo", "Venderia parte", "Manteria", "Compraria mais", "Compraria muito mais"] },
  { id: "q5", text: "Qual seu nivel de conhecimento sobre investimentos?", options: ["Nenhum", "Basico", "Intermediario", "Avancado", "Profissional"] },
  { id: "q6", text: "Qual a origem dos recursos que voce investe?", options: ["Reserva de emergencia", "Excedente pequeno", "Excedente regular", "Renda estavel", "Patrimonio consolidado"] },
  { id: "q7", text: "Com que frequencia voce acompanha seus investimentos?", options: ["Nao acompanho", "Anualmente", "Mensalmente", "Semanalmente", "Diariamente"] },
  { id: "q8", text: "Qual sua tolerancia a oscilacoes de curto prazo?", options: ["Muito baixa", "Baixa", "Moderada", "Alta", "Muito alta"] },
];

export class RiskClassifier {
  classify(answers: Answer[], totalPortfolioValue?: number): Result<RiskResult> {
    if (answers.length !== 8) {
      return Result.fail(new InvalidAnswerError("O questionario deve ter exatamente 8 respostas"));
    }

    for (const a of answers) {
      if (a.value < 0 || a.value > 4) {
        return Result.fail(new InvalidAnswerError(`Valor da resposta ${a.questionId} deve estar entre 0 e 4`));
      }
      if (a.weight <= 0) {
        return Result.fail(new InvalidAnswerError(`Peso da resposta ${a.questionId} deve ser maior que zero`));
      }
    }

    let weightedSum = 0;
    let totalWeight = 0;
    for (const a of answers) {
      weightedSum += a.value * a.weight;
      totalWeight += a.weight;
    }

    if (totalWeight === 0) {
      return Result.fail(new RiskClassificationError("Peso total zero"));
    }

    const rawScore = (weightedSum / (totalWeight * 4)) * 100;
    const score = Math.round(Math.min(100, Math.max(0, rawScore)));

    const riskLevel = this.scoreToLevel(score);

    const riskResult = RiskResult.create({
      id: RiskResultId.generate(),
      profileId: "",
      riskLevel,
      score,
      generatedAt: new Date(),
    });

    return Result.ok(riskResult);
  }

  createQuestionnaire(profileId: string, answers: Answer[], riskLevel: RiskLevel, totalScore: number): RiskQuestionnaire {
    return RiskQuestionnaire.create({
      id: RiskQuestionnaireId.generate(),
      profileId,
      answers,
      totalScore,
      riskLevel,
    });
  }

  getQuestions(): QuestionTemplate[] {
    return QUESTIONARIO_PADRAO;
  }

  inferHorizon(answers: Answer[]): string {
    const q2 = answers.find((a) => a.questionId === "q2");
    if (!q2) return "MEDIO_PRAZO";
    if (q2.value <= 1) return "CURTO_PRAZO";
    if (q2.value <= 2) return "MEDIO_PRAZO";
    return "LONGO_PRAZO";
  }

  private scoreToLevel(score: number): RiskLevel {
    if (score <= 33) return "CONSERVADOR";
    if (score <= 66) return "MODERADO";
    return "ARROJADO";
  }
}
