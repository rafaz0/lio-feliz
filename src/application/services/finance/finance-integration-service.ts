import type { IFinanceIntegrationService } from "./ifinance-integration-service";
import type { SyncOperationEvent, SyncResult } from "@/core/domain/finance";
import type { FinanceIntegrationConfig } from "@/core/domain/finance";
import type { IBankAccountRepository, ICashTransactionRepository } from "@/core/domain/finance";
import { TransactionId, CashTransaction, TransactionType } from "@/core/domain/finance";

export class FinanceIntegrationService implements IFinanceIntegrationService {
  readonly isEnabled: boolean;

  constructor(
    private readonly config: FinanceIntegrationConfig,
    private readonly accountRepo: IBankAccountRepository,
    private readonly txRepo: ICashTransactionRepository,
  ) {
    this.isEnabled = config.enabled;
  }

  async onOperationRegistered(event: SyncOperationEvent): Promise<SyncResult> {
    if (!this.isEnabled) {
      console.log("[FinanceIntegration] Skipped — integração desabilitada");
      return { success: true, operationId: event.operationId, message: "Integração desabilitada" };
    }

    console.log(`[FinanceIntegration] Iniciando sincronização para operação ${event.operationId}`);

    try {
      if (event.side === "buy") {
        await this.handleBuy(event);
      } else if (event.side === "sell") {
        await this.handleSell(event);
      } else if (event.side === "dividend") {
        await this.handleDividend(event);
      }

      console.log(`[FinanceIntegration] Sincronização concluída para ${event.operationId}`);
      return { success: true, operationId: event.operationId };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido";
      console.error(`[FinanceIntegration] Falha na sincronização: ${message}`);
      return { success: false, operationId: event.operationId, message };
    }
  }

  private async handleBuy(event: SyncOperationEvent): Promise<void> {
    const accounts = await this.accountRepo.findByUserId(event.userId);
    const cashAccount =
      accounts.find((a) => a.type === "cash") ?? (await this.ensureCashAccount(event.userId));

    const txId = TransactionId.generate();
    const txResult = CashTransaction.create(
      txId,
      cashAccount.id.value,
      TransactionType.EXPENSE,
      event.total,
      `Compra ${event.ticker} — ${event.quantity} cotas`,
      "Investimentos",
      new Date(event.tradedAt),
    );
    if (txResult.isFailure) throw new Error(txResult.error?.message ?? "Erro ao criar transação");

    const withdrawResult = cashAccount.withdraw(event.total);
    if (withdrawResult.isFailure)
      throw new Error(withdrawResult.error?.message ?? "Saldo insuficiente");

    await this.accountRepo.update(withdrawResult.value);
    await this.txRepo.save(txResult.value);
  }

  private async handleSell(event: SyncOperationEvent): Promise<void> {
    const accounts = await this.accountRepo.findByUserId(event.userId);
    const cashAccount =
      accounts.find((a) => a.type === "cash") ?? (await this.ensureCashAccount(event.userId));

    const txId = TransactionId.generate();
    const txResult = CashTransaction.create(
      txId,
      cashAccount.id.value,
      TransactionType.INCOME,
      event.total,
      `Venda ${event.ticker} — ${event.quantity} cotas`,
      "Investimentos",
      new Date(event.tradedAt),
    );
    if (txResult.isFailure) throw new Error(txResult.error?.message ?? "Erro ao criar transação");

    const depositResult = cashAccount.deposit(event.total);
    if (depositResult.isFailure)
      throw new Error(depositResult.error?.message ?? "Erro ao depositar");

    await this.accountRepo.update(depositResult.value);
    await this.txRepo.save(txResult.value);
  }

  private async handleDividend(event: SyncOperationEvent): Promise<void> {
    const accounts = await this.accountRepo.findByUserId(event.userId);
    const cashAccount =
      accounts.find((a) => a.type === "cash") ?? (await this.ensureCashAccount(event.userId));

    const txId = TransactionId.generate();
    const txResult = CashTransaction.create(
      txId,
      cashAccount.id.value,
      TransactionType.INCOME,
      event.total,
      `Dividendo ${event.ticker}`,
      "Investimentos",
      new Date(event.tradedAt),
    );
    if (txResult.isFailure) throw new Error(txResult.error?.message ?? "Erro ao criar transação");

    const depositResult = cashAccount.deposit(event.total);
    if (depositResult.isFailure)
      throw new Error(depositResult.error?.message ?? "Erro ao depositar");

    await this.accountRepo.update(depositResult.value);
    await this.txRepo.save(txResult.value);
  }

  private async ensureCashAccount(userId: string) {
    const { BankAccountId, BankAccount, AccountType } = await import("@/core/domain/finance");
    const account = BankAccount.create(
      BankAccountId.generate(),
      "Caixa",
      "Gestão Financeira",
      AccountType.CASH,
    );
    await this.accountRepo.save(account);
    return account;
  }
}
