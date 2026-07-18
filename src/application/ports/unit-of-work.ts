export interface IUnitOfWork {
  IniciarTransacao(): Promise<void>;
  Commit(): Promise<void>;
  Rollback(): Promise<void>;
}
