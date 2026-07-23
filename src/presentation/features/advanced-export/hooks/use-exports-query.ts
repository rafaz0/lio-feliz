import { useQuery } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { IQuery } from "@/application/types";
import type { ApplicationError, ExportJobListDto, ExportTemplateDto } from "@/presentation/shared/types/application-layer";
import { EXPORTS_QUERY_KEYS } from "../queries";
import { toExportTemplateViewModels, toExportJobViewModels, type ExportTemplateViewModel, type ExportJobViewModel } from "../viewmodels/exports.view-model";

export function useExportTemplatesQuery() {
  const dispatcher = useDispatcher();
  return useQuery({
    queryKey: EXPORTS_QUERY_KEYS.templates(),
    queryFn: async (): Promise<ExportTemplateDto[]> => {
      const r = await dispatcher.DispatchQuery<ExportTemplateDto[]>({ type: "ListarExportTemplatesQuery" } as IQuery);
      if (r instanceof Error) throw r; return r;
    },
    select: (data): ExportTemplateViewModel[] => toExportTemplateViewModels(data),
  });
}

export function useExportJobsQuery(portfolioId: string) {
  const dispatcher = useDispatcher();
  return useQuery({
    queryKey: EXPORTS_QUERY_KEYS.jobs(portfolioId),
    enabled: Boolean(portfolioId),
    queryFn: async (): Promise<ExportJobListDto> => {
      const r = await dispatcher.DispatchQuery<ExportJobListDto>({ type: "ListarExportTemplatesQuery", portfolioId } as IQuery);
      if (r instanceof Error) throw r; return r;
    },
    select: (data): ExportJobViewModel[] => toExportJobViewModels(data.jobs),
  });
}
