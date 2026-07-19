import type { INotificationPort } from "@/application/ports";

export interface NotificacaoRegistrada {
  usuarioId: string;
  titulo: string;
  mensagem: string;
  tipo: "in-app" | "email";
  assunto?: string;
  data: Date;
}

export class FakeNotificationPort implements INotificationPort {
  private notificacoes: NotificacaoRegistrada[] = [];

  async Notificar(usuarioId: string, titulo: string, mensagem: string): Promise<void> {
    this.notificacoes.push({
      usuarioId,
      titulo,
      mensagem,
      tipo: "in-app",
      data: new Date(),
    });
  }

  async NotificarEmail(usuarioId: string, assunto: string, corpo: string): Promise<void> {
    this.notificacoes.push({
      usuarioId,
      titulo: assunto,
      mensagem: corpo,
      assunto,
      tipo: "email",
      data: new Date(),
    });
  }

  getNotificacoes(): NotificacaoRegistrada[] {
    return this.notificacoes;
  }

  reset(): void {
    this.notificacoes = [];
  }
}
