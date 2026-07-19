import { useMutation } from "@tanstack/react-query";
import { useDispatcher } from "@/presentation/shared/hooks/use-dispatcher";
import type { ICommand } from "@/application/types";
import type {
  OperacaoRegistradaDto,
  ApplicationError,
} from "@/presentation/shared/types/application-layer";
import type { RegistrarOperacaoCommand } from "@/application/commands/registrar-operacao";

export interface RegisterOperationInput {
  portfolioId: string;
  tipo: string;
  ativoId: string;
  quantidade: number;
  valor: number;
  data: Date;
  observacao?: string;
}

interface UseRegisterOperationMutationResult {
  mutate: (input: RegisterOperationInput) => void;
  mutateAsync: (input: RegisterOperationInput) => Promise<OperacaoRegistradaDto>;
  isPending: boolean;
  isError: boolean;
  error: ApplicationError | null;
  data: OperacaoRegistradaDto | null;
}

export function useRegisterOperationMutation(): UseRegisterOperationMutationResult {
  const dispatcher = useDispatcher();

  const mutation = useMutation({
    mutationFn: async (input: RegisterOperationInput): Promise<OperacaoRegistradaDto> => {
      const command: RegistrarOperacaoCommand = {
        type: "RegistrarOperacaoCommand",
        portfolioId: input.portfolioId,
        tipo: input.tipo,
        ativoId: input.ativoId,
        quantidade: input.quantidade,
        valor: input.valor,
        data: input.data,
        observacao: input.observacao,
      };

      const result = await dispatcher.DispatchCommand<OperacaoRegistradaDto>(
        command as unknown as ICommand,
      );

      if (result instanceof Error) {
        throw result;
      }

      return result;
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: (mutation.error as ApplicationError | null) ?? null,
    data: (mutation.data as OperacaoRegistradaDto | null) ?? null,
  };
}
