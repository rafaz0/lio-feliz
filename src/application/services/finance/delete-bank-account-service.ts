import { NotFoundError } from "@/application/errors/application-error";
import type { IBankAccountRepository } from "@/core/domain/finance";
import type { IApplicationService } from "@/application/application-service";
import type { DeleteBankAccountCommand } from "@/application/commands/finance";
import type { ApplicationError } from "@/application/errors/application-error";

export class DeleteBankAccountService implements IApplicationService<
  DeleteBankAccountCommand,
  void
> {
  constructor(private readonly repo: IBankAccountRepository) {}

  async Execute(command: DeleteBankAccountCommand): Promise<void | ApplicationError> {
    const account = await this.repo.findById(command.accountId);
    if (!account) return new NotFoundError("BankAccount", command.accountId);
    await this.repo.delete(command.accountId);
  }
}
