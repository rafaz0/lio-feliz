export interface DeleteBankAccountCommand {
  type: "DeleteBankAccountCommand";
  userId: string;
  accountId: string;
}
