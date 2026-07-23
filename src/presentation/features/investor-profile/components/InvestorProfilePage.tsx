import { useState } from "react";
import { useProfileQuery, useQuestionnaireQuery } from "../hooks/use-profile-query";
import { toProfileViewModel } from "../viewmodels/investor-profile.view-model";
import type { Answer } from "@/core/domain/investor-profile";

interface InvestorProfilePageProps {
  userId: string;
}

export function InvestorProfilePage({ userId }: InvestorProfilePageProps) {
  const { data: profile, isLoading: profileLoading } = useProfileQuery(userId);
  const { data: questions, isLoading: questionsLoading } = useQuestionnaireQuery();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    const answerList: Answer[] = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value,
      weight: 1,
    }));
    if (answerList.length !== 8) return;
    setSubmitted(true);
  };

  if (profileLoading || questionsLoading) {
    return (
      <div data-testid="profile-loading" className="py-8 text-center text-sm text-muted-foreground">
        Carregando...
      </div>
    );
  }

  if (profile && !submitted) {
    return (
      <div data-testid="investor-profile-page" className="space-y-6">
        <h1 className="text-xl font-semibold">Perfil do Investidor</h1>
        <div className="rounded-lg border p-4">
          <p>
            Perfil: <strong>{profile.riskLevelLabel}</strong>
          </p>
          <p className="text-sm text-muted-foreground">Horizonte: {profile.horizonLabel}</p>
          <p className="text-sm text-muted-foreground">Score: {profile.score}</p>
        </div>
      </div>
    );
  }

  if (!questions) {
    return (
      <div data-testid="profile-empty" className="py-8 text-center text-sm text-muted-foreground">
        Nenhuma pergunta disponivel.
      </div>
    );
  }

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div data-testid="investor-profile-page" className="space-y-6">
      <h1 className="text-xl font-semibold">Questionario de Perfil</h1>
      <p className="text-sm text-muted-foreground">
        Responda as 8 perguntas para descobrir seu perfil de investidor.
      </p>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div key={q.id} className="rounded-lg border p-4">
            <p className="mb-2 text-sm font-medium">
              {idx + 1}. {q.text}
            </p>
            <div className="space-y-1">
              {q.options.map((opt, optIdx) => (
                <label key={optIdx} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name={q.id}
                    value={optIdx}
                    checked={answers[q.id] === optIdx}
                    onChange={() => handleAnswer(q.id, optIdx)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!allAnswered}
        className="rounded-md bg-foreground px-4 py-2 text-sm text-background disabled:opacity-50"
      >
        {allAnswered ? "Calcular Perfil" : "Responda todas as 8 perguntas"}
      </button>

      {submitted && profile && (
        <div className="rounded-lg border p-4 bg-green-50">
          <p>
            Perfil: <strong>{profile.riskLevelLabel}</strong>
          </p>
          <p className="text-sm">Score: {profile.score}</p>
        </div>
      )}
    </div>
  );
}
