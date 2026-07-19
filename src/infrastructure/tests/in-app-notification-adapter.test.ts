import { describe, it, expect, vi, beforeEach } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { InAppNotificationAdapter } from "@/infrastructure/notifications/in-app-notification-adapter";

function createMockSupabase() {
  const mockFrom = vi.fn().mockReturnThis();
  const mockInsert = vi.fn().mockReturnThis();
  return {
    from: vi.fn().mockReturnValue({ insert: mockInsert }),
  } as unknown as SupabaseClient;
}

describe("InAppNotificationAdapter", () => {
  let adapter: InAppNotificationAdapter;
  let mockInsert: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    const supabase = createMockSupabase();
    mockInsert = (supabase.from as ReturnType<typeof vi.fn>)().insert;
    adapter = new InAppNotificationAdapter(supabase);
    vi.clearAllMocks();
  });

  describe("Notificar", () => {
    it("inserts in-app notification into notificacoes table", async () => {
      mockInsert.mockResolvedValue({ error: null });

      await adapter.Notificar("user-1", "Titulo", "Mensagem");

      expect(mockInsert).toHaveBeenCalledOnce();
      const arg = mockInsert.mock.calls[0][0];
      expect(arg.usuario_id).toBe("user-1");
      expect(arg.titulo).toBe("Titulo");
      expect(arg.mensagem).toBe("Mensagem");
      expect(arg.tipo).toBe("in-app");
    });

    it("does not throw when insert fails", async () => {
      mockInsert.mockResolvedValue({ error: { message: "db error" } });

      await expect(adapter.Notificar("user-1", "T", "M")).resolves.toBeUndefined();
    });
  });

  describe("NotificarEmail", () => {
    it("inserts email notification into notificacoes table", async () => {
      mockInsert.mockResolvedValue({ error: null });

      await adapter.NotificarEmail("user-1", "Assunto", "Corpo");

      const arg = mockInsert.mock.calls[0][0];
      expect(arg.tipo).toBe("email");
      expect(arg.assunto).toBe("Assunto");
      expect(arg.mensagem).toBe("Corpo");
    });
  });
});
