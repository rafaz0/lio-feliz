import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import { PROFILE_QUERY_KEYS } from "../queries";
import type { IQuery } from "@/application/types";
import type { InvestidorPerfilCompletoDto, QuestionarioPerguntasDto } from "@/presentation/shared/types/application-layer";
import { toProfileViewModel, type ProfileViewModel } from "../viewmodels/investor-profile.view-model";

export function useProfileQuery(userId: string) {
  const dispatcher = useDispatcher();
  return useQuery({
    queryKey: PROFILE_QUERY_KEYS.perfil(userId),
    enabled: Boolean(userId),
    queryFn: async (): Promise<InvestidorPerfilCompletoDto> => {
      const r = await dispatcher.DispatchQuery<InvestidorPerfilCompletoDto>({ type: "ObterPerfilQuery", userId } as IQuery);
      if (r instanceof Error) throw r; return r;
    },
    select: (data): ProfileViewModel | null => data ? toProfileViewModel(data.profile, data.lastResult) : null,
  });
}

export function useQuestionnaireQuery() {
  const dispatcher = useDispatcher();
  return useQuery({
    queryKey: PROFILE_QUERY_KEYS.questionario(),
    queryFn: async (): Promise<QuestionarioPerguntasDto[]> => {
      const r = await dispatcher.DispatchQuery<QuestionarioPerguntasDto[]>({ type: "ObterQuestionarioQuery" } as IQuery);
      if (r instanceof Error) throw r; return r;
    },
  });
}
