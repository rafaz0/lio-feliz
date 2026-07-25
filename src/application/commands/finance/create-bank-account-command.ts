export interface CreateBankAccountCommand {
  type: "CreateBankAccountCommand";
  userId: string;
  name: string;
  institution: string;
  accountType: string;
  currency?: string;
}
