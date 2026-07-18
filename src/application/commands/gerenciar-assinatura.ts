export type AcaoAssinatura = "ativar" | "cancelar" | "alterar";

export interface GerenciarAssinaturaCommand {
  readonly type: "GerenciarAssinaturaCommand";
  readonly usuarioId: string;
  readonly acao: AcaoAssinatura;
  readonly plano?: string;
}
