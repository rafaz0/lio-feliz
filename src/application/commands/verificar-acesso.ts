export interface VerificarAcessoCommand {
  readonly type: "VerificarAcessoCommand";
  readonly userId: string;
  readonly capability: string;
}
