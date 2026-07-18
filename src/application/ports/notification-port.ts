export interface INotificationPort {
  Notificar(usuarioId: string, titulo: string, mensagem: string): Promise<void>;
  NotificarEmail(usuarioId: string, assunto: string, corpo: string): Promise<void>;
}
