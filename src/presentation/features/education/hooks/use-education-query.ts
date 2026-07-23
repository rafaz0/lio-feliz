import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type { ApplicationError, GlossaryTermDto, GlossarySearchDto } from "@/presentation/shared/types/application-layer";
import { EDUCATION_QUERY_KEYS } from "../queries";
import { toGlossaryTermViewModel, type GlossaryTermViewModel } from "../viewmodels/education.view-model";

export function useGlossaryQuery(term: string) {
  const dispatcher = useDispatcher();
  return useQuery({
    queryKey: EDUCATION_QUERY_KEYS.term(term),
    enabled: Boolean(term),
    queryFn: async (): Promise<GlossaryTermDto> => {
      const r = await dispatcher.DispatchQuery<GlossaryTermDto>({ type: "ObterTermoQuery", term } as IQuery);
      if (r instanceof Error) throw r; return r;
    },
    select: (data): GlossaryTermViewModel => toGlossaryTermViewModel(data),
  });
}

export function useSearchGlossaryQuery(query: string) {
  const dispatcher = useDispatcher();
  return useQuery({
    queryKey: EDUCATION_QUERY_KEYS.search(query),
    enabled: Boolean(query && query.length >= 2),
    queryFn: async (): Promise<GlossarySearchDto> => {
      const r = await dispatcher.DispatchQuery<GlossarySearchDto>({ type: "BuscarGlossarioQuery", query } as IQuery);
      if (r instanceof Error) throw r; return r;
    },
    select: (data): GlossaryTermViewModel[] =>
      data.results.map((dto: GlossaryTermDto) => toGlossaryTermViewModel(dto)),
  });
}
