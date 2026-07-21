import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import type {
  ApplicationError,
  RendaFixaDto,
  RegistrarCupomCommand,
} from "@/presentation/shared/types/application-layer";
import { FIXED_INCOME_QUERY_KEYS } from "../queries";
import { toRendaFixaViewModel, type RendaFixaViewModel } from "../types/fixed-income.view-model";

export interface RegistrarCupomInput {
  portfolioId: string;
  ticker: string;
  name: string;
  institution: string;
  productType: RegistrarCupomCommand["productType"];
  nominalValue: number;
  rate: number;
  rateType: RegistrarCupomCommand["rateType"];
  issueDate: Date;
  maturityDate: Date;
}

interface UseRegistrarCupomMutationResult {
  mutate: (
    input: RegistrarCupomInput,
    options?: { onSuccess?: () => void },
  ) => void;
  mutateAsync: (input: RegistrarCupomInput) => Promise<RendaFixaViewModel>;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: ApplicationError | null;
}

export function useRegistrarCupomMutation(): UseRegistrarCupomMutationResult {
  const dispatcher = useDispatcher();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: RegistrarCupomInput): Promise<RendaFixaViewModel> => {
      const command: RegistrarCupomCommand = {
        type: "RegistrarCupomCommand",
        portfolioId: input.portfolioId,
        ticker: input.ticker,
        name: input.name,
        institution: input.institution,
        productType: input.productType,
        nominalValue: input.nominalValue,
        rate: input.rate,
        rateType: input.rateType,
        issueDate: input.issueDate,
        maturityDate: input.maturityDate,
      };

      const result = await dispatcher.DispatchCommand<RendaFixaDto>(command as unknown as ICommand);

      if (result instanceof Error) {
        throw result;
      }

      return toRendaFixaViewModel(result);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: FIXED_INCOME_QUERY_KEYS.rendaFixa(variables.portfolioId),
      });
      queryClient.invalidateQueries({
        queryKey: FIXED_INCOME_QUERY_KEYS.cronograma(variables.portfolioId),
      });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: (mutation.error as ApplicationError | null) ?? null,
  };
}
