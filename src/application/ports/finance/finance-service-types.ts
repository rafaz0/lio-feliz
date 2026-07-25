import type { CreateBankAccountCommand } from "@/application/commands/finance";
import type { CreateTransactionCommand } from "@/application/commands/finance";
import type { DeleteBankAccountCommand } from "@/application/commands/finance";
import type { ListAccountsQuery } from "@/application/queries/finance";
import type { GetCashSummaryQuery } from "@/application/queries/finance";
import type { BankAccountDto, CashSummaryDto } from "@/application/dtos/finance";

export type ICreateBankAccountService = {
  Execute(command: CreateBankAccountCommand): Promise<BankAccountDto | Error>;
};

export type ICreateTransactionService = {
  Execute(command: CreateTransactionCommand): Promise<BankAccountDto | Error>;
};

export type IDeleteBankAccountService = {
  Execute(command: DeleteBankAccountCommand): Promise<void | Error>;
};

export type IListAccountsService = {
  Execute(query: ListAccountsQuery): Promise<BankAccountDto[] | Error>;
};

export type IGetCashSummaryService = {
  Execute(query: GetCashSummaryQuery): Promise<CashSummaryDto | Error>;
};
