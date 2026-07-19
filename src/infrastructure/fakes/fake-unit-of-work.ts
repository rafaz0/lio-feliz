import type { IUnitOfWork } from "@/application/ports";

export class FakeUnitOfWork implements IUnitOfWork {
  private transactionActive = false;
  private committed = false;
  private rolledBack = false;

  async IniciarTransacao(): Promise<void> {
    this.transactionActive = true;
    this.committed = false;
    this.rolledBack = false;
  }

  async Commit(): Promise<void> {
    this.committed = true;
    this.transactionActive = false;
  }

  async Rollback(): Promise<void> {
    this.rolledBack = true;
    this.transactionActive = false;
  }

  isTransactionActive(): boolean {
    return this.transactionActive;
  }

  wasCommitted(): boolean {
    return this.committed;
  }

  wasRolledBack(): boolean {
    return this.rolledBack;
  }

  reset(): void {
    this.transactionActive = false;
    this.committed = false;
    this.rolledBack = false;
  }
}
