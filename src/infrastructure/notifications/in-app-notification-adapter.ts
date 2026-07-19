import type { SupabaseClient } from "@supabase/supabase-js";
import type { INotificationPort } from "@/application/ports";

export class InAppNotificationAdapter implements INotificationPort {
  constructor(private readonly supabase: SupabaseClient) {}

  async Notificar(usuarioId: string, titulo: string, mensagem: string): Promise<void> {
    const { error } = await this.supabase.from("notificacoes").insert({
      usuario_id: usuarioId,
      titulo,
      mensagem,
      tipo: "in-app",
    });

    if (error) {
      console.error(`[InAppNotification] Failed to store notification: ${error.message}`);
    }
  }

  async NotificarEmail(usuarioId: string, assunto: string, corpo: string): Promise<void> {
    const { error } = await this.supabase.from("notificacoes").insert({
      usuario_id: usuarioId,
      titulo: assunto,
      mensagem: corpo,
      tipo: "email",
      assunto,
    });

    if (error) {
      console.error(`[InAppNotification] Failed to store email notification: ${error.message}`);
    }
  }
}
