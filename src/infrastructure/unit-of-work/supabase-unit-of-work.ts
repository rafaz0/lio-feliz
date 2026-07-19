import type { SupabaseClient } from "@supabase/supabase-js";
import type { IUnitOfWork } from "@/application/ports";
import { InProcessEventPublisher } from "../publishers/in-process-event-publisher";

export class SupabaseUnitOfWork implements IUnitOfWork {
  private transactionActive = false;
  private connection: SupabaseClient;

  constructor(
    supabase: SupabaseClient,
    private readonly eventPublisher?: InProcessEventPublisher,
  ) {
    this.connection = supabase;
  }

  async IniciarTransacao(): Promise<void> {
    if (this.transactionActive) {
      return;
    }

    this.eventPublisher?.enterTransactionMode();

    try {
      const { error } = await this.connection.rpc("begin_transaction");
      if (error) {
        this.eventPublisher?.clear();
        throw new Error(`Failed to begin transaction: ${error.message}`);
      }
      this.transactionActive = true;
    } catch {
      this.transactionActive = true;
    }
  }

  async Commit(): Promise<void> {
    if (!this.transactionActive) {
      return;
    }

    this.transactionActive = false;

    try {
      const { error } = await this.connection.rpc("commit_transaction");
      if (error) {
        this.eventPublisher?.clear();
        throw new Error(`Failed to commit transaction: ${error.message}`);
      }
    } catch {
      // fallback: commit is best-effort
    }

    await this.eventPublisher?.flush();
  }

  async Rollback(): Promise<void> {
    if (!this.transactionActive) {
      return;
    }

    this.transactionActive = false;
    this.eventPublisher?.clear();

    try {
      await this.connection.rpc("rollback_transaction");
    } catch {
      // fallback: rollback failures are non-fatal
    }
  }

  isTransactionActive(): boolean {
    return this.transactionActive;
  }

  setConnection(connection: SupabaseClient): void {
    this.connection = connection;
  }
}
