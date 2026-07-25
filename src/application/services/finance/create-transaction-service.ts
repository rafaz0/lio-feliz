import { ValidationError, NotFoundError } from "@/application/errors/application-error";
import { TransactionId, CashTransaction, TransactionType } from "@/core/domain/finance";
import type { IBankAccountRepository, ICashTransactionRepository } from "@/core/domain/finance";
import type { IApplicationService } from "@/application/application-service";
import type { CreateTransactionCommand } from "@/application/commands/finance";
import type { BankAccountDto } from "@/application/dtos/finance";
import type { ApplicationError } from "@/application/errors/application-error";

export class CreateTransactionService implements IApplicationService<
  CreateTransactionCommand,
  BankAccountDto
> {
  constructor(
    private readonly accountRepo: IBankAccountRepository,
    private readonly txRepo: ICashTransactionRepository,
  ) {}

  async Execute(command: CreateTransactionCommand): Promise<BankAccountDto | ApplicationError> {
    if (!command.accountId) return new ValidationError("VALID_ERROR", "Conta é obrigatória");
    if (command.amount <= 0) return new ValidationError("VALID_ERROR", "Valor deve ser positivo");

    const txType = Object.values(TransactionType).includes(
      command.transactionType as TransactionType,
    )
      ? (command.transactionType as TransactionType)
      : TransactionType.INCOME;

    const account = await this.accountRepo.findById(command.accountId);
    if (!account) return new NotFoundError("BankAccount", command.accountId);

    const txResult = CashTransaction.create(
      TransactionId.generate(),
      command.accountId,
      txType,
      command.amount,
      command.description,
      command.category,
      command.date ? new Date(command.date) : undefined,
    );

    if (txResult.isFailure) return txResult.error as ApplicationError;

    const tx = txResult.value;

    let updatedAccount = account;
    if (txType === TransactionType.INCOME) {
      const result = account.deposit(command.amount);
      if (result.isSuccess) updatedAccount = result.value;
    } else {
      const result = account.withdraw(command.amount);
      if (result.isFailure) return result.error as ApplicationError;
      updatedAccount = result.value;
    }

    await this.txRepo.save(tx);
    await this.accountRepo.update(updatedAccount);

    return {
      id: updatedAccount.id.value,
      name: updatedAccount.name,
      institution: updatedAccount.institution,
      type: updatedAccount.type,
      balance: updatedAccount.balance,
      currency: updatedAccount.currency,
      createdAt: updatedAccount.createdAt.toISOString(),
      updatedAt: updatedAccount.updatedAt.toISOString(),
    };
  }
}
