import { ValidationError } from "@/application/errors/application-error";
import { BankAccountId, BankAccount, AccountType } from "@/core/domain/finance";
import type { IBankAccountRepository } from "@/core/domain/finance";
import type { IApplicationService } from "@/application/application-service";
import type { CreateBankAccountCommand } from "@/application/commands/finance";
import type { BankAccountDto } from "@/application/dtos/finance";
import type { ApplicationError } from "@/application/errors/application-error";

export class CreateBankAccountService implements IApplicationService<
  CreateBankAccountCommand,
  BankAccountDto
> {
  constructor(private readonly repo: IBankAccountRepository) {}

  async Execute(command: CreateBankAccountCommand): Promise<BankAccountDto | ApplicationError> {
    if (!command.name?.trim())
      return new ValidationError("VALID_ERROR", "Nome da conta é obrigatório");
    if (!command.institution?.trim())
      return new ValidationError("VALID_ERROR", "Instituição é obrigatória");

    const accountType = Object.values(AccountType).includes(command.accountType as AccountType)
      ? (command.accountType as AccountType)
      : AccountType.CHECKING;

    const account = BankAccount.create(
      BankAccountId.generate(),
      command.name.trim(),
      command.institution.trim(),
      accountType,
      command.currency ?? "BRL",
    );

    await this.repo.save(account);

    return {
      id: account.id.value,
      name: account.name,
      institution: account.institution,
      type: account.type,
      balance: account.balance,
      currency: account.currency,
      createdAt: account.createdAt.toISOString(),
      updatedAt: account.updatedAt.toISOString(),
    };
  }
}
