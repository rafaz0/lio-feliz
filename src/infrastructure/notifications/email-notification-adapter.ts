import type { INotificationPort } from "@/application/ports";

export class EmailNotificationAdapter implements INotificationPort {
  async Notificar(usuarioId: string, titulo: string, mensagem: string): Promise<void> {
    console.info(`[EmailNotification] NOT_IMPLEMENTED: would send in-app to ${usuarioId}: ${titulo}`);
  }

  async NotificarEmail(usuarioId: string, assunto: string, corpo: string): Promise<void> {
    console.info(`[EmailNotification] NOT_IMPLEMENTED: would send email to ${usuarioId}: ${assunto}`);
  }
}
