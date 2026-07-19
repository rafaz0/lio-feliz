import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterOperationMutation } from "../hooks/use-register-operation-mutation";
import type { OperacaoRegistradaDto } from "@/presentation/shared/types/application-layer";
import { tipoToLabel } from "../types/operations.view-model";

const schema = z.object({
  tipo: z.enum(["BUY", "SELL", "DIVIDEND", "JCP"], {
    errorMap: () => ({ message: "Selecione o tipo de operação" }),
  }),
  ativoId: z.string().min(1, "Informe o ativo"),
  quantidade: z.coerce.number().positive("Quantidade deve ser maior que zero"),
  valor: z.coerce.number().positive("Valor deve ser maior que zero"),
  data: z.string().min(1, "Informe a data"),
});

type FormValues = z.infer<typeof schema>;

interface OperationFormProps {
  portfolioId: string;
  onSuccess: (dto: OperacaoRegistradaDto) => void;
}

const TIPOS = ["BUY", "SELL", "DIVIDEND", "JCP"] as const;

export function OperationForm({ portfolioId, onSuccess }: OperationFormProps) {
  const mutation = useRegisterOperationMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { tipo: "BUY", ativoId: "", quantidade: 0, valor: 0, data: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    const dto = await mutation.mutateAsync({
      portfolioId,
      tipo: values.tipo,
      ativoId: values.ativoId,
      quantidade: values.quantidade,
      valor: values.valor,
      data: new Date(values.data),
    });
    onSuccess(dto);
    reset({ tipo: "BUY", ativoId: "", quantidade: 0, valor: 0, data: "" });
  });

  return (
    <form data-testid="operation-form" onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="tipo">Tipo</Label>
        <select
          id="tipo"
          aria-label="Tipo de operação"
          className="h-9 rounded-md border bg-background px-3 text-sm"
          {...register("tipo")}
        >
          {TIPOS.map((t) => (
            <option key={t} value={t}>
              {tipoToLabel(t)}
            </option>
          ))}
        </select>
        {errors.tipo && <p className="text-xs text-destructive">{errors.tipo.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="ativoId">Ativo</Label>
        <Input id="ativoId" aria-label="Ativo" placeholder="PETR4" {...register("ativoId")} />
        {errors.ativoId && <p className="text-xs text-destructive">{errors.ativoId.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="quantidade">Quantidade</Label>
          <Input
            id="quantidade"
            type="number"
            step="0.0001"
            aria-label="Quantidade"
            {...register("quantidade")}
          />
          {errors.quantidade && (
            <p className="text-xs text-destructive">{errors.quantidade.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="valor">Valor (R$)</Label>
          <Input id="valor" type="number" step="0.01" aria-label="Valor" {...register("valor")} />
          {errors.valor && <p className="text-xs text-destructive">{errors.valor.message}</p>}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="data">Data</Label>
        <Input id="data" type="date" aria-label="Data" {...register("data")} />
        {errors.data && <p className="text-xs text-destructive">{errors.data.message}</p>}
      </div>

      {mutation.isError && mutation.error ? (
        <p role="alert" className="text-xs text-destructive">
          {mutation.error.message}
        </p>
      ) : null}

      <Button type="submit" disabled={mutation.isPending} data-testid="operation-submit">
        {mutation.isPending ? "Registrando..." : "Registrar operação"}
      </Button>
    </form>
  );
}
