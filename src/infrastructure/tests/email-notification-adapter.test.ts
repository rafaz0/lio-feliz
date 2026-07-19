import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { EmailNotificationAdapter } from "@/infrastructure/notifications/email-notification-adapter";

describe("EmailNotificationAdapter", () => {
  let adapter: EmailNotificationAdapter;
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    adapter = new EmailNotificationAdapter();
    consoleSpy = vi.spyOn(console, "info").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe("Notificar", () => {
    it("logs a message indicating not implemented", async () => {
      await adapter.Notificar("user-1", "Titulo", "Mensagem");

      expect(consoleSpy).toHaveBeenCalledOnce();
      expect(consoleSpy.mock.calls[0][0]).toContain("[EmailNotification]");
      expect(consoleSpy.mock.calls[0][0]).toContain("NOT_IMPLEMENTED");
    });
  });

  describe("NotificarEmail", () => {
    it("logs a message indicating not implemented", async () => {
      await adapter.NotificarEmail("user-1", "Assunto", "Corpo");

      expect(consoleSpy).toHaveBeenCalledOnce();
      expect(consoleSpy.mock.calls[0][0]).toContain("[EmailNotification]");
      expect(consoleSpy.mock.calls[0][0]).toContain("NOT_IMPLEMENTED");
    });
  });
});
